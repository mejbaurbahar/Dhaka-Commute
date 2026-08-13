// koyjabo-bus-live — community live bus GPS
//
// KV schema (all keys in BUS_LIVE namespace):
//   live:${busId}:${busNumber}:${deviceId}  → checkin payload, TTL 900 (15 min)
//   reg:bus:${busNumber}                     → display-only registry entry, no TTL
//   rl:${ip}:${minute}                       → rate-limit counter, TTL 120
//
// Privacy: per-device keys, blind writes (no read-modify-write races).
// GET /api/buses aggregates server-side — deviceIds never leave the worker.
// Multiple passengers in the same bus merge into ONE entry (contributors count).

const DAY = 24 * 3_600_000;

const ORIGIN_ALLOWLIST = new Set([
  'https://koyjabo.com',
  'https://www.koyjabo.com',
  'https://dev.koyjabo.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://localhost', // Capacitor Android WebView origin
]);

const RATE_LIMIT_PER_MINUTE = 120;
const CHECKIN_THROTTLE_MS = 5_000; // per-device, enforced server-side
const LIVE_TTL_S = 900; // 15 min — refreshed on every checkin
const STALE_AFTER_MS = 120_000; // >2 min without update → stale
const MOVING_KMH = 6; // >6 km/h counts as moving
const MAX_BODY = 16 * 1024;

let CFG;

function json(resp) {
  return resp.json().catch(() => ({}));
}

function cors(resp) {
  const r = new Response(resp.body, resp);
  r.headers.set('Access-Control-Allow-Origin', '*');
  r.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  r.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  r.headers.set('Cache-Control', 'no-store');
  return r;
}

// ── validation ────────────────────────────────────────────────────

function normalizeBusNumber(raw) {
  return String(raw || '').toUpperCase().replace(/\s+/g, ' ').trim();
}

function isBusNumberValid(v) {
  // BD plate: optional district (DA/DHA/CHA…) + series letter + class digits + 2-4-digit number.
  // e.g. "DA M 12-0080", "M 12-2467", "12-2467". Trailing junk like "DA M 12-0080NHB HB" fails.
  return /^([A-Z]{1,5} )?([A-Z] )?\d{1,2}[- ]\d{2,4}$/.test(v);
}

function isBusIdValid(v) {
  return /^[a-z0-9_]{1,48}$/.test(v);
}

function isDeviceIdValid(v) {
  return /^[A-Za-z0-9_-]{4,64}$/.test(v);
}

function numIn(v, min, max) {
  return typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
}

function validateCheckin(b) {
  const busNumber = normalizeBusNumber(b.busNumber);
  if (busNumber && !isBusNumberValid(busNumber)) return { error: 'bad busNumber' };
  if (!isBusIdValid(b.busId)) return { error: 'bad busId' };
  if (!isDeviceIdValid(b.deviceId)) return { error: 'bad deviceId' };
  if (!numIn(b.lat, -90, 90) || !numIn(b.lng, -180, 180)) return { error: 'bad coords' };
  if (!numIn(b.speed ?? 0, 0, 200)) return { error: 'bad speed' };
  if (!numIn(b.heading ?? 0, 0, 360)) return { error: 'bad heading' };
  if (!numIn(b.accuracy ?? 0, 0, 10_000)) return { error: 'bad accuracy' };
  const operatorName = String(b.operatorName || '').trim().slice(0, 60);
  const destStopId = String(b.destStopId || '').trim().slice(0, 48);
  return { ok: true, v: { busNumber, busId: b.busId, deviceId: b.deviceId, lat: b.lat, lng: b.lng, speed: b.speed ?? 0, heading: b.heading ?? 0, accuracy: b.accuracy ?? 0, operatorName, destStopId } };
}

function validateRegistry(b) {
  const busNumber = normalizeBusNumber(b.busNumber);
  if (busNumber && !isBusNumberValid(busNumber)) return { error: 'bad busNumber' };
  if (!isBusIdValid(b.busId)) return { error: 'bad busId' };
  const operatorName = String(b.operatorName || '').trim().slice(0, 60);
  return { ok: true, v: { busNumber, busId: b.busId, operatorName } };
}

// ── KV helpers ────────────────────────────────────────────────────

function liveKey(busId, busNumber, deviceId) {
  return `live:${busId}:${busNumber}:${deviceId}`;
}

// key = live:${busId}:${busNumber}:${deviceId}; busNumber can't contain ':' (regex).
// Empty busNumber → live:${busId}::${deviceId} → busNumber ''.
function parseLiveKey(key, busId) {
  const rest = key.slice(`live:${busId}:`.length);
  if (rest.startsWith(':')) return { busNumber: '', deviceId: rest.slice(1) };
  const idx = rest.lastIndexOf(':');
  if (idx <= 0) return null;
  return { busNumber: rest.slice(0, idx), deviceId: rest.slice(idx + 1) };
}

// Registry writes are throttled to once per busNumber per 60 s (in-memory
// seen-set) — keeps daily KV write quota from being burned by 10 s checkins.
const registrySeen = new Map(); // busNumber → last write ts
async function updateRegistry(env, entry) {
  const now = Date.now();
  if (registrySeen.has(entry.busNumber) && now - registrySeen.get(entry.busNumber) < 60_000) return;
  registrySeen.set(entry.busNumber, now);
  const name = `reg:bus:${entry.busNumber}`;
  try {
    const cur = await env.BUS_LIVE.get(name, 'json').catch(() => null);
    await env.BUS_LIVE.put(
      name,
      JSON.stringify({
        busNumber: entry.busNumber,
        busId: entry.busId,
        operatorName: entry.operatorName || (cur && cur.operatorName) || '',
        firstSeen: (cur && cur.firstSeen) || now,
        lastSeen: now,
        reportCount: (cur && cur.reportCount || 0) + 1,
      })
    );
  } catch (err) {
    // Registry is display-only — never fail the request for it.
    console.error('registry update failed', err && err.message);
  }
}

// In-memory rate limiter (per-isolate Map). KV free tier = 1,000 writes/day;
// a KV counter per request would burn the whole quota on GET polls alone.
// Approximate across isolates — acceptable for this scale.
const rateBuckets = new Map(); // "ip:minute" → count
function rateLimited(request) {
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (!ip) return false;
  const minute = Math.floor(Date.now() / 60_000);
  const key = `${ip}:${minute}`;
  const cur = rateBuckets.get(key) || 0;
  if (cur >= RATE_LIMIT_PER_MINUTE) return true;
  rateBuckets.set(key, cur + 1);
  if (rateBuckets.size > 10_000) {
    // prune entries older than 2 minutes
    for (const [k] of rateBuckets) {
      if (Number(k.split(':').pop()) < minute - 2) rateBuckets.delete(k);
    }
  }
  return false;
}

// ── handlers ──────────────────────────────────────────────────────

async function handleBuses(env, busId) {
  if (!isBusIdValid(busId)) {
    return Response.json({ ok: false, error: 'bad busId' }, { status: 400 });
  }
  const prefix = `live:${busId}:`;
  const { keys } = await env.BUS_LIVE.list({ prefix });
  const now = Date.now();
  const groups = new Map();
  for (const k of keys) {
    const parts = parseLiveKey(k.name, busId);
    if (!parts) continue;
    const rec = await env.BUS_LIVE.get(k.name, 'json').catch(() => null);
    if (!rec) continue;
    let g = groups.get(parts.busNumber);
    if (!g) {
      g = { busNumber: parts.busNumber, operatorName: rec.operatorName || '', lat: 0, lng: 0, speed: 0, heading: rec.heading || 0, updatedAt: 0, contributors: 0, status: 'stale' };
      groups.set(parts.busNumber, g);
    }
    g.lat += rec.lat;
    g.lng += rec.lng;
    g.speed = Math.max(g.speed, rec.speed || 0);
    g.updatedAt = Math.max(g.updatedAt, rec.updatedAt || 0);
    g.contributors += 1;
    if (rec.operatorName) g.operatorName = rec.operatorName;
  }
  const buses = [];
  for (const g of groups.values()) {
    g.lat /= g.contributors;
    g.lng /= g.contributors;
    const age = now - g.updatedAt;
    g.status = age > STALE_AFTER_MS ? 'stale' : g.speed > MOVING_KMH / 3.6 ? 'moving' : 'idle';
    buses.push(g);
  }
  buses.sort((a, b) => b.updatedAt - a.updatedAt);
  return Response.json({ ok: true, buses, ts: now });
}

async function handleBusNumbers(env, busId) {
  if (!isBusIdValid(busId)) {
    return Response.json({ ok: false, error: 'bad busId' }, { status: 400 });
  }
  const { keys } = await env.BUS_LIVE.list({ prefix: 'reg:bus:' });
  const out = [];
  for (const k of keys) {
    const rec = await env.BUS_LIVE.get(k.name, 'json').catch(() => null);
    if (rec && rec.busId === busId) {
      out.push({ busNumber: rec.busNumber, busId: rec.busId, operatorName: rec.operatorName || '', firstSeen: rec.firstSeen, lastSeen: rec.lastSeen, reportCount: rec.reportCount || 0 });
    }
  }
  out.sort((a, b) => b.lastSeen - a.lastSeen);
  return Response.json({ ok: true, entries: out });
}

async function handleCheckin(env, body) {
  const chk = validateCheckin(body);
  if (chk.error) {
    return Response.json({ ok: false, error: chk.error }, { status: 400 });
  }
  const { v } = chk;
  const name = liveKey(v.busId, v.busNumber, v.deviceId);

  // Per-device throttle: read our own key — reject if we just wrote.
  const prev = await env.BUS_LIVE.get(name, 'json').catch(() => null);
  if (prev && prev.updatedAt && Date.now() - prev.updatedAt < CHECKIN_THROTTLE_MS) {
    return Response.json({ ok: false, error: 'throttled', throttled: true });
  }

  const now = Date.now();
  await env.BUS_LIVE.put(
    name,
    JSON.stringify({
      lat: v.lat,
      lng: v.lng,
      speed: v.speed,
      heading: v.heading,
      accuracy: v.accuracy,
      operatorName: v.operatorName,
      destStopId: v.destStopId,
      updatedAt: now,
    }),
    { expirationTtl: LIVE_TTL_S }
  );
  if (v.busNumber) {
    await updateRegistry(env, { busNumber: v.busNumber, busId: v.busId, operatorName: v.operatorName });
  }
  return Response.json({ ok: true, ts: now });
}

async function handleLeave(env, body) {
  const busNumber = normalizeBusNumber(body.busNumber);
  if (!isBusIdValid(body.busId) || (busNumber && !isBusNumberValid(busNumber)) || !isDeviceIdValid(body.deviceId)) {
    return Response.json({ ok: false, error: 'bad params' }, { status: 400 });
  }
  const name = liveKey(body.busId, busNumber, body.deviceId);
  await env.BUS_LIVE.delete(name);
  return Response.json({ ok: true });
}

async function handleRegisterBus(env, body) {
  const chk = validateRegistry(body);
  if (chk.error) {
    return Response.json({ ok: false, error: chk.error }, { status: 400 });
  }
  await updateRegistry(env, chk.v);
  return Response.json({ ok: true });
}

export default {
  async fetch(request, env) {
    CFG = env;
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }));
    }
    if (url.pathname === '/api/health') {
      return cors(Response.json({ ok: true }));
    }

    // Origin gate: only the app + site may talk to this worker.
    const origin = request.headers.get('Origin') || '';
    if (origin !== '' && !ORIGIN_ALLOWLIST.has(origin)) {
      return cors(Response.json({ ok: false, error: 'forbidden' }, { status: 403 }));
    }
    if (rateLimited(request)) {
      return cors(Response.json({ ok: false, error: 'rate limited' }, { status: 429 }));
    }

    if (url.pathname === '/api/buses') {
      return cors(await handleBuses(env, url.searchParams.get('busId') || ''));
    }
    if (url.pathname === '/api/bus-numbers') {
      return cors(await handleBusNumbers(env, url.searchParams.get('busId') || ''));
    }
    if (request.method !== 'POST') {
      return cors(Response.json({ ok: false, error: 'method not allowed' }, { status: 405 }));
    }
    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > MAX_BODY) {
      return cors(Response.json({ ok: false, error: 'body too large' }, { status: 413 }));
    }
    const body = await json(request);
    try {
      switch (url.pathname) {
        case '/api/checkin':
          return cors(await handleCheckin(env, body));
        case '/api/leave':
          return cors(await handleLeave(env, body));
        case '/api/register-bus':
          return cors(await handleRegisterBus(env, body));
        default:
          return cors(Response.json({ ok: false, error: 'not found' }, { status: 404 }));
      }
    } catch (err) {
      console.error('handler error', err && err.message);
      return cors(Response.json({ ok: false, error: 'internal' }, { status: 500 }));
    }
  },
};
