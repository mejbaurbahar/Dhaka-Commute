/**
 * KoyJabo push delivery worker (Cloudflare) — free web push, no Firebase.
 *
 * API (CORS, no auth — the endpoint itself is the secret capability):
 *   POST /api/subscribe   { endpoint, keys:{p256dh,auth}, lang }
 *   POST /api/unsubscribe { endpoint }
 *   POST /api/event       { endpoint, type, fireAt, data, lang }   types: install | search-check | search-tomorrow | save | dormant
 *   POST /api/cancel      { endpoint, type }
 *   GET  /api/health
 *
 * Cron (every 10 minutes): delivers due events from KV. One push per subscription
 * per tick (anti-spam); a 404/410 from the push service deletes the sub.
 *
 * Crypto: RFC 8292 VAPID (ES256 JWT) + RFC 8291 aes128gcm content encryption,
 * all via WebCrypto — no npm dependencies.
 *
 * Secrets (wrangler secret put): VAPID_PRIVATE_KEY (raw base64url d, from
 * scripts/generate-vapid-keys.mjs / .env), VAPID_SUBJECT (mailto:).
 * Vars (wrangler.toml): VAPID_PUBLIC_KEY (uncompressed point), VAPID_SUBJECT.
 */

const SUB_PREFIX = 'sub:';
const TYPES = ['install', 'search-check', 'search-tomorrow', 'save', 'dormant'];
const MAX_EVENTS = 10;
const DORMANT_MAX_NUDGES = 3; // "forgot KoyJabo" fires at most 3 times (every 48h of silence)

// Vars/secrets arrive via env bindings (module workers) — set per entry.
let CFG = {};

const NOTIFICATIONS = {
  install: {
    bn: {
      title: 'KoyJabo ইনস্টল করেছেন, ব্যবহার করছেন না?',
      body: 'আপনি KoyJabo ইনস্টল করেছেন কিন্তু এখনো ব্যবহার করেননি। সম্পূর্ণ ফ্রি — এখনই এক্সপ্লোর করুন!',
      url: '/',
    },
    en: {
      title: 'Installed KoyJabo but have not used it?',
      body: 'You installed KoyJabo but still did not use it. Explore it fully free!',
      url: '/',
    },
  },
  'search-check': {
    bn: {
      title: 'আপনার সার্চের ফলাফল দেখুন',
      body: (d) =>
        d && d.from && d.to
          ? `আপনি KoyJabo-তে ${d.from} থেকে ${d.to} সার্চ করেছিলেন — বিস্তারিত ফলাফল দেখুন!`
          : 'আপনি KoyJabo-তে সার্চ করেছিলেন — ফলাফল দেখে নিন!',
      url: (d) => (d && d.url) || '/search',
    },
    en: {
      title: 'Check your search results',
      body: (d) =>
        d && d.from && d.to
          ? `You did search on KoyJabo From ${d.from} to To: ${d.to} — checkout the result!`
          : 'You searched on KoyJabo — check out the result!',
      url: (d) => (d && d.url) || '/search',
    },
  },
  'search-tomorrow': {
    bn: {
      title: 'আজ কোথায় যাবেন?',
      body: (d) =>
        d && d.from && d.to
          ? `গতকাল আপনি ${d.from} → ${d.to} খুঁজেছিলেন। আজকের প্ল্যান কী?`
          : 'গতকাল আপনি KoyJabo-তে সার্চ করেছিলেন। আজকের প্ল্যান কী?',
      url: (d) => (d && d.url) || '/search',
    },
    en: {
      title: 'Where are you going today?',
      body: (d) =>
        d && d.from && d.to
          ? `Yesterday you searched ${d.from} → ${d.to}. What is today's plan?`
          : 'Yesterday you searched on KoyJabo. What is today\'s plan?',
      url: (d) => (d && d.url) || '/search',
    },
  },
  save: {
    bn: {
      title: 'আপনার সেভ করা রুট ভুলে যাবেন না!',
      body: (d) =>
        `আপনি ${(d && d.name) || 'একটি রুট'} সেভ করেছেন — যাত্রার আগে দেখে নিন!`,
      url: () => '/favorites',
    },
    en: {
      title: 'Do not forget your saved route!',
      body: (d) =>
        `You saved ${(d && d.name) || 'a route'} — check it before you travel!`,
      url: () => '/favorites',
    },
  },
  dormant: {
    bn: {
      title: 'KoyJabo ব্যবহার করতে ভুলে গেছেন?',
      body: '২ দিন ধরে ব্যবহার করেননি! বাস, ট্রেন, মেট্রো, লঞ্চ সব ফ্রি — এখনই ফিরে আসুন!',
      url: () => '/',
    },
    en: {
      title: 'Forgot to use KoyJabo?',
      body: "You have not used KoyJabo for 2 days! Buses, trains, metro — all free. Come back now!",
      url: () => '/',
    },
  },
};

// ── small helpers ─────────────────────────────────────────────────

const enc = new TextEncoder();
const HOUR = 3_600_000;
const DAY = 24 * HOUR;

function json(resp) {
  return resp.json().catch(() => ({}));
}

function cors(resp) {
  const r = new Response(resp.body, resp);
  r.headers.set('Access-Control-Allow-Origin', '*');
  r.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  r.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return r;
}

// ── base64url ─────────────────────────────────────────────────────

function urlB64Decode(str) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function urlB64Encode(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function concatBytes(...arrays) {
  const total = arrays.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrays) {
    out.set(a, off);
    off += a.length;
  }
  return out;
}

// ── VAPID (RFC 8292) ──────────────────────────────────────────────

async function vapidSigner() {
  const privRaw = urlB64Decode(CFG.VAPID_PRIVATE_KEY || '');
  const pubRaw = urlB64Decode(CFG.VAPID_PUBLIC_KEY || ''); // uncompressed point 0x04||X||Y
  const jwk = {
    kty: 'EC',
    crv: 'P-256',
    x: urlB64Encode(pubRaw.slice(1, 33)),
    y: urlB64Encode(pubRaw.slice(33, 65)),
    d: urlB64Encode(privRaw),
    ext: true,
  };
  return crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
}

/** P1363 (r||s, 32+32) → DER (ASN.1) — VAPID requires DER. */
function intToDer(bytes) {
  let start = 0;
  while (start < bytes.length - 1 && bytes[start] === 0) start++;
  let b = bytes.slice(start);
  if (b[0] & 0x80) b = concatBytes(new Uint8Array([0]), b);
  return concatBytes(new Uint8Array([0x02, b.length]), b);
}

function p1363ToDer(sig) {
  const r = intToDer(sig.slice(0, 32));
  const s = intToDer(sig.slice(32, 64));
  const body = concatBytes(r, s);
  return concatBytes(new Uint8Array([0x30, body.length]), body);
}

async function vapidJwt(aud) {
  const signer = await vapidSigner();
  const header = urlB64Encode(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = urlB64Encode(
    enc.encode(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: CFG.VAPID_SUBJECT }))
  );
  const input = enc.encode(`${header}.${payload}`);
  const p1363 = new Uint8Array(await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, signer, input));
  return `${header}.${payload}.${urlB64Encode(p1363ToDer(p1363))}`;
}

// ── aes128gcm content encryption (RFC 8291 + RFC 8188) ────────────

async function hkdf(ikmBytes, saltBytes, infoBytes, lengthBits) {
  const ikm = await crypto.subtle.importKey('raw', ikmBytes, { name: 'HKDF' }, false, ['deriveBits']);
  return crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt: saltBytes, info: infoBytes },
    ikm,
    lengthBits
  );
}

async function encryptPayload(plaintext, subPubRaw, authRaw) {
  // 1. ECDH shared secret with an ephemeral app-server key.
  const ephem = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const ephemPub = new Uint8Array(await crypto.subtle.exportKey('raw', ephem.publicKey));
  const uaPub = await crypto.subtle.importKey('raw', subPubRaw, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const ecdhSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: uaPub }, ephem.privateKey, 256);

  // 2. Record header: salt(16) || rs(4) || idlen(1) || id(ephemeral pubkey).
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const rs = 4096;
  const header = concatBytes(salt, new Uint8Array([(rs >>> 24) & 255, (rs >>> 16) & 255, (rs >>> 8) & 255, rs & 255]), new Uint8Array([65]), ephemPub);

  // 3. HKDF chain per RFC 8291 §3.3/§3.4.
  const keyInfo = concatBytes(enc.encode('WebPush: info'), new Uint8Array([0]), subPubRaw, ephemPub);
  const prkKey = await hkdf(ecdhSecret, authRaw, new Uint8Array(0), 256); // salt = auth secret
  const ikm = await hkdf(prkKey, new Uint8Array(0), concatBytes(keyInfo, new Uint8Array([1])), 256);
  const prk = await hkdf(ikm, salt, new Uint8Array(0), 256); // salt = header salt
  const cek = await hkdf(prk, new Uint8Array(0), concatBytes(enc.encode('Content-Encoding: aes128gcm'), new Uint8Array([0, 1])), 128);
  const nonce = await hkdf(prk, new Uint8Array(0), concatBytes(enc.encode('Content-Encoding: nonce'), new Uint8Array([0, 1])), 96);

  // 4. AES-128-GCM — AAD is a zero-length sequence per RFC 8188 §2.1
  //    (the record header is NOT AAD). Plaintext = payload + 0x02 padding
  //    delimiter (final record, no zero padding).
  const key = await crypto.subtle.importKey('raw', cek, { name: 'AES-GCM' }, false, ['encrypt']);
  const padded = concatBytes(plaintext, new Uint8Array([2]));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, key, padded)
  );
  return concatBytes(header, ciphertext);
}

// ── notifications ─────────────────────────────────────────────────

function notificationFor(sub, event) {
  const lang = sub.lang === 'bn' ? 'bn' : 'en';
  const spec = NOTIFICATIONS[event.type] || NOTIFICATIONS.install;
  const n = spec[lang];
  return {
    title: n.title,
    body: typeof n.body === 'function' ? n.body(event.data) : n.body,
    url: typeof n.url === 'function' ? n.url(event.data) : n.url,
  };
}

async function deliver(sub, event) {
  const endpoint = sub.endpoint;
  const jwt = await vapidJwt(new URL(endpoint).origin);
  const payload = JSON.stringify(notificationFor(sub, event));
  const body = await encryptPayload(enc.encode(payload), urlB64Decode(sub.keys.p256dh), urlB64Decode(sub.keys.auth));
  // TTL: cover the event window, min 1h, max 7 days.
  const secondsUntil = Math.ceil((event.fireAt - Date.now()) / 1000);
  const ttl = Math.min(7 * DAY / 1000, Math.max(3600, secondsUntil + 3600));
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      TTL: String(ttl),
      Authorization: `vapid t=${jwt}, k=${CFG.VAPID_PUBLIC_KEY}`,
    },
    body,
  });
  return resp.status;
}

// ── KV helpers ────────────────────────────────────────────────────

function subKey(endpoint) {
  return SUB_PREFIX + endpoint;
}

async function loadSub(endpoint) {
  const raw = await CFG.PUSH_SUBS.get(subKey(endpoint), 'json');
  return raw && raw.endpoint === endpoint ? raw : null;
}

async function saveSub(sub) {
  await CFG.PUSH_SUBS.put(subKey(sub.endpoint), JSON.stringify(sub));
}

// ── handlers ──────────────────────────────────────────────────────

async function handleSubscribe(body) {
  if (!body || typeof body.endpoint !== 'string' || !/^https:\/\//.test(body.endpoint)) {
    return Response.json({ ok: false, error: 'bad endpoint' }, { status: 400 });
  }
  const keys = body.keys || {};
  if (typeof keys.p256dh !== 'string' || typeof keys.auth !== 'string') {
    return Response.json({ ok: false, error: 'missing keys' }, { status: 400 });
  }
  let existing = await loadSub(body.endpoint);
  const sub = {
    endpoint: body.endpoint,
    keys: { p256dh: keys.p256dh, auth: keys.auth },
    lang: body.lang === 'bn' ? 'bn' : 'en',
    events: existing ? existing.events || [] : [],
    updatedAt: Date.now(),
  };
  await saveSub(sub);
  return Response.json({ ok: true });
}

async function handleEvent(body) {
  if (!body || typeof body.endpoint !== 'string' || !TYPES.includes(body.type)) {
    return Response.json({ ok: false, error: 'bad event' }, { status: 400 });
  }
  const sub = await loadSub(body.endpoint);
  if (!sub) return Response.json({ ok: false, error: 'not subscribed' }, { status: 404 });
  const fireAt = typeof body.fireAt === 'number' ? body.fireAt : Date.now();
  const now = Date.now();
  if (fireAt > now + 90 * DAY || fireAt < now - HOUR) {
    return Response.json({ ok: false, error: 'fireAt out of range' }, { status: 400 });
  }
  sub.events = [
    ...sub.events.filter((e) => e.type !== body.type),
    { type: body.type, fireAt, data: body.data || {}, createdAt: now },
  ].slice(-MAX_EVENTS);
  if (body.lang === 'bn' || body.lang === 'en') sub.lang = body.lang;
  sub.updatedAt = now;
  await saveSub(sub);
  return Response.json({ ok: true });
}

async function handleCancel(body) {
  if (!body || typeof body.endpoint !== 'string' || !TYPES.includes(body.type)) {
    return Response.json({ ok: false, error: 'bad cancel' }, { status: 400 });
  }
  const sub = await loadSub(body.endpoint);
  if (!sub) return Response.json({ ok: true });
  sub.events = sub.events.filter((e) => e.type !== body.type);
  sub.updatedAt = Date.now();
  await saveSub(sub);
  return Response.json({ ok: true });
}

async function handleUnsubscribe(body) {
  if (!body || typeof body.endpoint !== 'string') {
    return Response.json({ ok: false, error: 'bad unsubscribe' }, { status: 400 });
  }
  await CFG.PUSH_SUBS.delete(subKey(body.endpoint));
  return Response.json({ ok: true });
}

// ── cron delivery ─────────────────────────────────────────────────

async function handleScheduled() {
  const list = await CFG.PUSH_SUBS.list({ prefix: SUB_PREFIX });
  const now = Date.now();
  for (const { name } of list.keys) {
    let sub;
    try {
      sub = await CFG.PUSH_SUBS.get(name, 'json');
    } catch {
      continue;
    }
    if (!sub) continue;

    const due = (sub.events || []).filter((e) => e.fireAt <= now).sort((a, b) => a.fireAt - b.fireAt);
    if (!due.length) {
      // Clean up subs that were replaced (endpoint changed) or went stale.
      if (sub.events && sub.events.length === 0 && now - (sub.updatedAt || 0) > 30 * DAY) {
        await CFG.PUSH_SUBS.delete(name);
      }
      continue;
    }

    const event = due[0];
    let status = 0;
    try {
      status = await deliver(sub, event);
    } catch {
      status = 0;
    }

    if (status === 404 || status === 410) {
      // Subscription no longer valid — drop the whole sub.
      await CFG.PUSH_SUBS.delete(name);
      continue;
    }
    if (status >= 200 && status < 300) {
      const nudges = (event.data && event.data.nudges) || 0;
      if (event.type === 'dormant' && nudges < DORMANT_MAX_NUDGES - 1) {
        // User still absent — re-arm the nudge for 48h later (capped total).
        sub.events = [
          ...(sub.events || []).filter((e) => e !== event),
          { type: 'dormant', fireAt: now + 2 * DAY, data: { ...(event.data || {}), nudges: nudges + 1 }, createdAt: now },
        ];
      } else {
        sub.events = (sub.events || []).filter((e) => e !== event);
      }
      sub.updatedAt = now;
      await saveSub(sub);
    }
    // Any other status: keep the event, retry next tick.
  }
  return new Response('ok');
}

// ── router ────────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    CFG = env;
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }));
    }
    if (url.pathname === '/api/health') {
      return cors(Response.json({ ok: true }));
    }
    if (request.method !== 'POST') {
      return cors(Response.json({ ok: false, error: 'method not allowed' }, { status: 405 }));
    }
    const body = await json(request);
    try {
      switch (url.pathname) {
        case '/api/subscribe':
          return cors(await handleSubscribe(body));
        case '/api/unsubscribe':
          return cors(await handleUnsubscribe(body));
        case '/api/event':
          return cors(await handleEvent(body));
        case '/api/cancel':
          return cors(await handleCancel(body));
        default:
          return cors(Response.json({ ok: false, error: 'not found' }, { status: 404 }));
      }
    } catch (err) {
      return cors(Response.json({ ok: false, error: 'internal' }, { status: 500 }));
    }
  },

  async scheduled(event, env, ctx) {
    CFG = env;
    return handleScheduled();
  },
};
