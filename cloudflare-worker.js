/**
 * KoyJabo Auth Proxy — Cloudflare Worker
 *
 * Deploy at: api.koyjabo.com  (or koyjabo-auth-proxy.mejbaur-bahar.workers.dev)
 * Environment variables (set in Cloudflare dashboard):
 *   GH_TOKEN          — fine-grained PAT: actions:write on koyjabo-core + contents:read on koyjabo
 *   DATA_TOKEN        — classic PAT with contents:write on koyjabo (used for direct data writes)
 *   APP_OWNER         — mejbaurbahar
 *   APP_REPO          — Dhaka-Commute
 *   DATA_OWNER        — mejbaurbahar
 *   DATA_REPO         — koyjabo
 *   TURNSTILE_SECRET  — Cloudflare Turnstile secret key
 *   JWT_SECRET        — random 32+ byte secret used to HMAC session tokens (same as workflow)
 *
 * What this hides from browser DevTools:
 *   - Private repo name (koyjabo)
 *   - File paths inside the private repo
 *   - GitHub token (never reaches the browser)
 *   - Raw GitHub API metadata (sha, html_url, git_url, _links, etc.)
 *   - bcryptHash (compared server-side via /gh action=auth-login, never returned)
 *
 * Users see only: GET/POST https://api.koyjabo.com/gh (your domain)
 */

import bcrypt from 'bcryptjs';

const ALLOWED_ORIGINS = [
  'https://koyjabo.com',
  'https://www.koyjabo.com',
  'https://dev.koyjabo.com',
  'http://localhost:5173',
  'http://localhost:3000',
  // Capacitor Android WebView origin — the app fetches the proxy from here.
  'https://localhost',
];

const ALLOWED_ACTIONS = new Set([
  'signup', 'login', 'change-password', 'forgot-password', 'verify-otp', 'reset-password',
  'update-profile', 'save-history', 'record-device', 'logout-device',
  'upload-avatar', 'record-visit', 'save-data', 'record-query', 'delete-data',
  'google-signup', 'set-google-password',
  // New server-side auth helpers — bcrypt + session token issuance never leak to client
  'auth-login', 'auth-google-lookup', 'auth-reset-status',
]);

// Paths whose READ must never be exposed via /gh?r=d&p=...
// Forces login + reset-status lookups through dedicated POST actions that
// strip bcryptHash/sensitive metadata before responding.
const READ_DENY_PATTERNS = [
  /^data\/users\/index\.json$/,
  /^data\/users\/[^/]+\.json$/,
  /^data\/password_resets\//,
  /^data\/auth\//,
];

// save-data / delete-data path whitelist. Each entry pairs a regex with an
// optional `userBound` flag — when true, the userId capture group must equal
// the session-owned userId.
const WRITE_PATH_RULES = [
  // User-bound (require valid session token whose userId matches)
  { re: /^data\/history\/([\w-]+)\.json$/,            userBound: true },
  { re: /^data\/devices\/([\w-]+)\.json$/,            userBound: true },
  { re: /^data\/avatars\/([\w-]+)\.json$/,            userBound: true },
  { re: /^data\/reminders\/([\w-]+)\.json$/,          userBound: true },
  { re: /^data\/chat\/([\w-]+)\/sessions\.json$/,     userBound: true },
  // Community writes — no userId binding, gated by rate limit + Turnstile when sensitive
  { re: /^data\/ratings\/[\w-]+\.json$/,              userBound: false },
  { re: /^data\/photos\/[\w-]+\.json$/,               userBound: false, turnstile: true },
  { re: /^data\/train-ratings\/[\w-]+\.json$/,        userBound: false },
  { re: /^data\/train-photos\/[\w-]+\.json$/,         userBound: false, turnstile: true },
  { re: /^data\/traffic\/\d{4}-\d{2}-\d{2}\.json$/,   userBound: false },
  { re: /^data\/bus-locations\/[\w-]+\.json$/,        userBound: false },
  { re: /^data\/feedback\/\d{4}-\d{2}-\d{2}\.json$/,  userBound: false },
  { re: /^data\/learning\/queries\/\d{4}-\d{2}-\d{2}\.json$/, userBound: false },
  // anonymous chat backup (no auth)
  { re: /^data\/chat\/anonymous\/sessions\.json$/,    userBound: false },
];

// Paths explicitly blocked from save-data/delete-data — these must never be
// writable from the public worker even though they live under data/.
// Admin scripts that need to mutate these must call the GitHub API directly
// from a privileged context (CI, CLI), NOT via the public proxy.
const WRITE_DENY_PATTERNS = [
  /^data\/users\//,        // user records — only the workflow may create / mutate
  /^data\/transport\//,    // static transport datasets
  /^data\/ai\//,           // AI learning index
  /^data\/stats\//,        // global stats
  /^data\/results\//,      // workflow result inbox
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function ghHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'koyjabo-proxy/1.0',
  };
}

// ── Session token helpers (HMAC-SHA256, no storage required) ─────────────────
// Token format: `${userId}.${expiryMs}.${hexHmac}`
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

async function _hmacSha256Hex(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function issueSessionToken(userId, jwtSecret) {
  if (!jwtSecret) return '';
  // Same format verifySessionToken enforces — never mint an unverifiable token.
  if (!/^[\w-]{6,64}$/.test(String(userId || ''))) return '';
  const expiry = Date.now() + SESSION_TTL_MS;
  const sig = await _hmacSha256Hex(jwtSecret, `${userId}.${expiry}`);
  return `${userId}.${expiry}.${sig}`;
}

// Returns the userId if the token is valid + not expired, otherwise null.
async function verifySessionToken(token, jwtSecret) {
  if (!token || !jwtSecret) return null;
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  const [userId, expiryStr, sig] = parts;
  if (!/^[\w-]{6,64}$/.test(userId)) return null;
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return null;
  const expected = await _hmacSha256Hex(jwtSecret, `${userId}.${expiry}`);
  // constant-time-ish compare — short signature so timing leak is negligible
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0 ? userId : null;
}

// ── Turnstile verification helper ────────────────────────────────────────────
async function verifyTurnstile(token, ip, secret) {
  if (!token || !secret) return false;
  // NOTE: Cloudflare ships a public test keypair (dummy token + test secret)
  // that ALWAYS passes siteverify. It must never be honored in production —
  // hardcoding the test secret here would let anyone bypass every auth gate.
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip || '')}`,
    });
    const data = await res.json().catch(() => ({}));
    return data.success === true;
  } catch { return false; }
}

// ── Write path validation ────────────────────────────────────────────────────
function validateWritePath(path, sessionUserId) {
  if (typeof path !== 'string' || !path.startsWith('data/')) {
    return { ok: false, status: 400, message: 'Invalid path' };
  }
  if (!/^[\w/.-]+\.json$/.test(path) || path.includes('..')) {
    return { ok: false, status: 400, message: 'Invalid path' };
  }
  for (const deny of WRITE_DENY_PATTERNS) {
    if (deny.test(path)) return { ok: false, status: 403, message: 'Path not allowed' };
  }
  for (const rule of WRITE_PATH_RULES) {
    const m = path.match(rule.re);
    if (!m) continue;
    if (rule.userBound) {
      if (!sessionUserId) return { ok: false, status: 401, message: 'Session required' };
      if (m[1] !== sessionUserId) return { ok: false, status: 403, message: 'Session/path mismatch' };
    }
    return { ok: true, rule };
  }
  return { ok: false, status: 403, message: 'Path not whitelisted' };
}

function isReadDenied(path) {
  return READ_DENY_PATTERNS.some(re => re.test(path));
}

// ── Rate limiter ──────────────────────────────────────────────────────────────
// Per-isolate in-memory counter. Cloudflare often routes the same client IP
// to the same isolate via affinity, so this catches the common abuse cases,
// but it is NOT a global limit — a determined attacker can spread requests
// across isolates and bypass it. For production scale, bind a Cloudflare
// Rate Limiting binding in wrangler.toml:
//
//   [[unsafe.bindings]]
//   type = "ratelimit"
//   name = "RATE_LIMIT"
//   namespace_id = "<your-namespace-id>"
//   simple = { limit = 60, period = 60 }
//
// then call `await env.RATE_LIMIT.limit({ key: ip })` in the hot path. Until
// that is configured, the soft per-isolate limit below is the defence.
const reqCount = new Map();
const RATE_BUCKETS = {
  // Per-action ceilings layered on top of the global per-IP one. Tighter
  // ceilings on the high-risk endpoints (writes, auth) so a single attacker
  // can't loop quickly enough to brute-force or spam.
  'auth-login':         { limit: 10,  windowMs: 60_000 },
  'auth-google-lookup': { limit: 10,  windowMs: 60_000 },
  'auth-reset-status':  { limit: 30,  windowMs: 60_000 },
  signup:               { limit: 5,   windowMs: 60_000 },
  login:                { limit: 10,  windowMs: 60_000 },
  'forgot-password':    { limit: 5,   windowMs: 60_000 },
  'reset-password':     { limit: 5,   windowMs: 60_000 },
  'change-password':    { limit: 5,   windowMs: 60_000 },
  'save-data':          { limit: 30,  windowMs: 60_000 },
  'delete-data':        { limit: 30,  windowMs: 60_000 },
  'record-query':       { limit: 30,  windowMs: 60_000 },
  'upload-avatar':      { limit: 5,   windowMs: 60_000 },
  'google-signup':      { limit: 5,   windowMs: 60_000 },
};

function isRateLimited(ip, limit = 1800, windowMs = 60_000) {
  const now = Date.now();
  // Trim stale entries opportunistically — the map shouldn't leak unbounded.
  if (reqCount.size > 5000) {
    for (const [k, v] of reqCount) if (v.resetAt < now) reqCount.delete(k);
  }
  const entry = reqCount.get(ip);
  if (!entry || now > entry.resetAt) {
    reqCount.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

// ── DTCA proxy ─────────────────────────────────────────────────────────────
const DTCA_API = 'https://dtca-backend.bondstein.net/api/v1/passenger';
let _dtcaTokenOverride = null; // per-isolate live token (refreshed automatically)

const DTCA_HEADERS = {
  Accept: 'application/json',
  Origin: 'https://buskothay.com',
  Referer: 'https://buskothay.com/',
};

// Auto-login using stored credentials — no Turnstile needed from server-side
// NOTE: upstream now REQUIRES `public_key` (added ~Aug 2026). 'cf-chl-stage' is
// Cloudflare's staging key — accepted by the backend's presence check.
async function dtcaAutoLogin(env) {
  const phone = env.DTCA_PHONE || '';
  const name = env.DTCA_NAME || 'KoyJabo';
  if (!phone) return null;
  try {
    const res = await fetch(`${DTCA_API}/login`, {
      method: 'POST',
      headers: { ...DTCA_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone_number: phone, public_key: env.DTCA_PUBLIC_KEY || 'cf-chl-stage' }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.token || null;
  } catch {
    return null;
  }
}

async function dtcaFetch(path, env) {
  const token = _dtcaTokenOverride || env.DTCA_TOKEN || '';
  if (!token && !env.DTCA_PHONE) throw new Error('DTCA credentials not configured');

  // If no token at all, try login first
  const activeToken = token || (await dtcaAutoLogin(env));
  if (!activeToken) throw new Error('DTCA login failed — no token available');
  if (!token) _dtcaTokenOverride = activeToken;

  const res = await fetch(`${DTCA_API}/${path}`, {
    headers: { ...DTCA_HEADERS, Authorization: `Bearer ${activeToken}` },
  });

  // On 401/421 (stale or rejected token), auto-refresh and retry once
  if (res.status === 401 || res.status === 421) {
    const newToken = await dtcaAutoLogin(env);
    if (!newToken) return res; // login also failed — return the error as-is
    _dtcaTokenOverride = newToken;
    return fetch(`${DTCA_API}/${path}`, {
      headers: { ...DTCA_HEADERS, Authorization: `Bearer ${newToken}` },
    });
  }

  return res;
}

// ── DTCA response decryption ──────────────────────────────────────────────────
// Backend encrypts every data payload with the client's RSA public key
// (RSA-OAEP-wrapped AES-GCM). We logged in with our own keypair, so decrypt
// server-side and serve plaintext JSON to the app.
let _dtcaKeyCache = null; // imported CryptoKey, per-isolate

function b64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function dtcaPrivateKey(env) {
  if (_dtcaKeyCache) return _dtcaKeyCache;
  const pem = env.DTCA_PRIVATE_KEY || '';
  if (!pem) return null;
  const der = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n|\r/g, '');
  try {
    _dtcaKeyCache = await crypto.subtle.importKey(
      'pkcs8', b64ToBytes(der),
      { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt']
    );
  } catch {
    return null;
  }
  return _dtcaKeyCache;
}

// Decrypt one `{encrypted_key, iv, tag, data}` block → parsed JSON
async function dtcaDecryptBlock(block, env) {
  const priv = await dtcaPrivateKey(env);
  if (!priv) return block; // no key configured — pass through untouched
  try {
    const aesKeyRaw = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, priv, b64ToBytes(block.encrypted_key));
    const aesKey = await crypto.subtle.importKey('raw', aesKeyRaw, { name: 'AES-GCM' }, false, ['decrypt']);
    const data = b64ToBytes(block.data);
    const tag = b64ToBytes(block.tag);
    const cipher = new Uint8Array(data.length + tag.length);
    cipher.set(data);
    cipher.set(tag, data.length);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64ToBytes(block.iv), tagLength: 128 }, aesKey, cipher);
    return JSON.parse(new TextDecoder().decode(plain));
  } catch {
    return block; // decrypt failed — return raw so callers see the original
  }
}

// Recursively decrypt encrypted blocks in a response (vehicles / data / stoppages…)
async function dtcaDecryptPayload(value, env) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
  if (typeof value.encrypted_key === 'string' && typeof value.data === 'string') {
    return dtcaDecryptBlock(value, env);
  }
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = (typeof v === 'object' && v !== null && (k === 'vehicles' || k === 'data' || k === 'stoppages'))
      ? await dtcaDecryptPayload(v, env)
      : v;
  }
  return out;
}

// ── ETag + SHA in-memory cache ────────────────────────────────────────────────
// Per-isolate, fast. Also stores `sha` so writeDataFile can skip a redundant
// GitHub API read-before-write call.
// key: "owner/repo:path" → { etag, decoded, sha, cachedAt }
const etagCache = new Map();
const ETAG_MAX_AGE = 10 * 60 * 1000; // serve stale for up to 10 min

// Result-polling files must never be cached (they transition 404 → exists)
function isCacheable(path) {
  return !path.startsWith('data/results/');
}

// Cloudflare distributed cache key (survives isolate restarts, shared globally)
function cfCacheKey(owner, repo, path) {
  return `https://koyjabo-auth-proxy.mejbaur-bahar.workers.dev/cached/${owner}/${repo}/${path}`;
}

// ── ghFetch — reads a file with 3-layer caching ───────────────────────────────
// Layer 1: Cloudflare Cache API (global, 5 min TTL, survives isolate cold starts)
// Layer 2: In-memory ETag cache (per-isolate, 10 min, sends 304 to GitHub)
// Layer 3: Fresh GitHub API call
async function ghFetch(token, owner, repo, path, ctx) {
  // Layer 1: Cloudflare distributed cache
  if (isCacheable(path)) {
    try {
      const hit = await caches.default.match(cfCacheKey(owner, repo, path));
      if (hit) {
        const decoded = await hit.json();
        return { status: 200, decoded };
      }
    } catch { /* cold cache or storage error — fall through */ }
  }

  // Layer 2: In-memory ETag cache (send conditional request to GitHub)
  const memKey = `${owner}/${repo}:${path}`;
  const cached = etagCache.get(memKey);
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'koyjabo-proxy/1.0',
  };
  if (cached?.etag && (Date.now() - cached.cachedAt) < ETAG_MAX_AGE) {
    headers['If-None-Match'] = cached.etag;
  }

  // Layer 3: GitHub API
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers }
  );

  // 304 = not modified — return in-memory copy (free, no rate-limit cost)
  if (res.status === 304 && cached) {
    // Refresh CF cache from the still-valid in-memory copy
    if (isCacheable(path) && ctx) {
      ctx.waitUntil(_storeCfCache(owner, repo, path, cached.decoded));
    }
    return { status: 200, decoded: cached.decoded };
  }
  if (res.status === 404)  return { status: 404, decoded: null };
  // GitHub rate-limited but we have a stale copy — serve it rather than failing
  if ((res.status === 403 || res.status === 429) && cached) {
    return { status: 200, decoded: cached.decoded };
  }
  if (!res.ok) return { status: res.status, decoded: null };

  const data = await res.json();
  let rawContent = data.content;
  let sha = data.sha;

  // The contents API omits `content` for blobs >1 MiB (only metadata returned).
  // Fetch the blob directly by sha — needed for large datasets (e.g. bd-locations.json).
  if (!rawContent && data.sha) {
    const blobRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/blobs/${data.sha}`,
      { headers }
    );
    if (blobRes.ok) {
      const blob = await blobRes.json();
      rawContent = blob.content;
      sha = blob.sha;
    }
  }
  if (!rawContent) return { status: 404, decoded: null };

  const clean = rawContent.replace(/\n/g, '');
  const bytes = Uint8Array.from(atob(clean), c => c.charCodeAt(0));
  const text  = new TextDecoder().decode(bytes);
  let decoded;
  try { decoded = JSON.parse(text); } catch { return { status: 500, decoded: null }; }

  // Store in both caches
  const etag = res.headers.get('ETag');
  if (isCacheable(path)) {
    if (etag) {
      // Store sha alongside so writeDataFile can skip a second GitHub fetch
      etagCache.set(memKey, { etag, decoded, sha, cachedAt: Date.now() });
    }
    if (ctx) {
      ctx.waitUntil(_storeCfCache(owner, repo, path, decoded));
    }
  }

  return { status: 200, decoded };
}

async function _storeCfCache(owner, repo, path, decoded) {
  try {
    const resp = new Response(JSON.stringify(decoded), {
      headers: {
        'Content-Type': 'application/json',
        // 5-min TTL in Cloudflare's distributed cache
        'Cache-Control': 'public, max-age=300',
      },
    });
    await caches.default.put(cfCacheKey(owner, repo, path), resp);
  } catch { /* non-fatal */ }
}

async function _purgeCfCache(owner, repo, path) {
  try {
    await caches.default.delete(cfCacheKey(owner, repo, path));
  } catch { /* non-fatal */ }
}

// ── GitHub direct read/write helpers ─────────────────────────────────────────

async function readDataFile(token, owner, repo, path) {
  // Check ETag cache first — if sha is stored, skip the GitHub fetch
  const memKey = `${owner}/${repo}:${path}`;
  const cached = etagCache.get(memKey);
  if (cached?.sha && cached.decoded !== undefined) {
    return { content: cached.decoded, sha: cached.sha };
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'koyjabo-proxy/1.0' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.content) return null;
    const clean = data.content.replace(/\n/g, '');
    const bytes = Uint8Array.from(atob(clean), c => c.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    const content = JSON.parse(text);
    // Cache the sha for future writes
    const etag = res.headers.get('ETag');
    if (etag) {
      etagCache.set(memKey, { etag, decoded: content, sha: data.sha, cachedAt: Date.now() });
    }
    return { content, sha: data.sha };
  } catch { return null; }
}

async function writeDataFile(token, owner, repo, path, content, message, ctx) {
  try {
    const existing = await readDataFile(token, owner, repo, path);
    const json = JSON.stringify(content, null, 2);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    const body = { message: message || `Sync: ${path}`, content: encoded };
    if (existing?.sha) body.sha = existing.sha;
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'koyjabo-proxy/1.0' },
      body: JSON.stringify(body),
    });
    if (res.ok || res.status === 201) {
      // Invalidate both caches so next read returns fresh data
      const memKey = `${owner}/${repo}:${path}`;
      etagCache.delete(memKey);
      if (ctx) ctx.waitUntil(_purgeCfCache(owner, repo, path));
      return { ok: true };
    }
    const errBody = await res.json().catch(() => ({}));
    return { ok: false, status: res.status, message: errBody?.message || 'GitHub write failed' };
  } catch (e) { return { ok: false, status: 500, message: String(e) }; }
}

async function deleteDataFile(token, owner, repo, path, message, ctx) {
  try {
    const existing = await readDataFile(token, owner, repo, path);
    if (!existing?.sha) return { ok: false, status: 404, message: 'File not found' };
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'koyjabo-proxy/1.0' },
      body: JSON.stringify({ message: message || `Delete: ${path}`, sha: existing.sha }),
    });
    if (res.ok) {
      const memKey = `${owner}/${repo}:${path}`;
      etagCache.delete(memKey);
      if (ctx) ctx.waitUntil(_purgeCfCache(owner, repo, path));
      return { ok: true };
    }
    const errBody = await res.json().catch(() => ({}));
    return { ok: false, status: res.status, message: errBody?.message || 'GitHub delete failed' };
  } catch (e) { return { ok: false, status: 500, message: String(e) }; }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Ignore cached/ sub-path (used as CF Cache API keys — not real routes)
    if (url.pathname.startsWith('/cached/')) {
      return new Response('Not found', { status: 404 });
    }

    // ── GET /ip  — Return the caller's IP (CF edge knows it; saves a hop to a
    // third-party service like ipify and avoids leaking traffic outside the
    // Cloudflare boundary).
    if ((url.pathname === '/ip' || url.pathname === '/ip/') && request.method === 'GET') {
      const ip = request.headers.get('CF-Connecting-IP') || '';
      return new Response(JSON.stringify({ ip }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          ...corsHeaders(origin),
        },
      });
    }

    // ── POST /ai  — Cloudflare Workers AI (no token needed) ─────────────────
    if ((url.pathname === '/ai' || url.pathname === '/ai/') && request.method === 'POST') {
      if (!env.AI) {
        return new Response(JSON.stringify({ error: 'AI binding not configured' }), {
          status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }

      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (isRateLimited(ip + ':ai', 20, 60_000)) {
        return new Response(JSON.stringify({ error: 'Too many AI requests' }), {
          status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }

      let body;
      try { body = await request.json(); } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }

      const message = String(body.message || '').slice(0, 500);
      const history = Array.isArray(body.history) ? body.history.slice(-6) : [];
      if (!message) {
        return new Response(JSON.stringify({ error: 'Missing message' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }

      const SYSTEM_PROMPT = `You are KoyJabo AI (কই যাবো AI), Bangladesh's smartest transport assistant. Built by Mejbaur Bahar Fagun for koyjabo.com. Today is 10 August 2026.

LANGUAGE: Respond in Bangla if user writes in Bangla script. English or Banglish otherwise.

ACCURACY RULES (critical):
- Only quote fares, operators, trains, and times listed below. NEVER invent a fare, bus operator, train, launch name, or boarding point that is not in this data.
- For intercity buses, use ONLY the boarding points listed with each district below (e.g. Sayedabad, Mohakhali, Gabtoli, Gulistan). Never invent a boarding point.
- Dhaka city local bus fare: approx ৳10–40 depending on distance (short ৳10, long routes up to ৳40). If you don't know the exact local route, give the general range and say exact route may differ.
- If the user asks about a route, district, or service NOT covered here: admit you don't have exact data, give only a rough estimate labeled "approx", and suggest searching koyjabo.com for the exact route.
- If you are not sure about a schedule, say so. Never state a departure time you did not read from the data below.
- Do not mention past events (elections, fairs, protests) as if upcoming. Do not reference specific dates of events unless the user asks about today.

CORE KNOWLEDGE:
**Dhaka Metro (MRT-6):** Uttara North → Motijheel (16 stations: Uttara North, Uttara Center, Uttara South, Pallabi, Mirpur-11, Mirpur-10, Kazipara, Shewrapara, Agargaon, Bijoy Sarani, Farmgate, Karwan Bazar, Shahbag, Dhaka University, Secretariat, Motijheel). Fare ৳20–100. Hours: Sat–Thu 7:10AM–9:40PM; Friday 2:00PM–8:20PM (metro RUNS on Friday afternoon/evening, it is NOT fully closed).

**Major Dhaka Bus Hubs:** Gabtoli (Savar/Mirpur corridor), Mohakhali (North Dhaka), Gulistan (South/Old Dhaka), Sayedabad (Chittagong/South route), Kamalapur (Railway), Mirpur-10 (Mirpur area), Farmgate (Central), Technical (Mirpur-Dhanmondi junction).

**Savar Corridor Buses:** Baishakhi Paribahan (Savar→Gulshan), Labbayk (Hemayetpur→Gabtoli), Nilachal (Savar→Motijheel), Moumita (Savar→Sadarghat), Savar Paribahan, Turag Paribahan. All start from Gabtoli/Savar area.

**Intercity buses from Dhaka (non-AC / AC fare):**
- Chattogram: ৳680–700 / ৳1,050–2,050 (6–7h, from Sayedabad/Mohakhali). Ops: Shohagh, Soudia, Hanif, S.Alam, Shyamoli, BRTC
- Cox's Bazar: ৳1,000–1,100 / ৳1,400–2,900 (8–10h). Ops: Shohagh, Shyamoli, Hanif, Soudia, S.Alam
- Sylhet: ৳680–740 / ৳900–1,500 (6–7h). Ops: Shohagh, Hanif, Ena, Green Line
- Cumilla: ৳350 / ৳500. Ops: Tisha Plus, Asia Line, Ena
- Brahmanbaria: ৳350 / ৳500. Ops: Tisha, Ena
- Chandpur: ৳400 / ৳600. Ops: Padma Exclusive
- Feni: ৳450 / ৳650. Ops: Star Line, Ena, Soudia
- Noakhali: ৳500 / ৳700. Ops: Ekushey, Himachal
- Lakshmipur: ৳550 / ৳750. Ops: Ekhlas, Himachal
- Khagrachhari: ৳800–880 / ৳1,600–1,700
- Rangamati: ৳790–900 / ৳1,300–1,800 (via Chittagong)
- Bandarban: ৳830–900 / ৳1,300–1,800 (via Chittagong)
- Rajshahi: ৳730 / ৳850–1,300 (6–7h). Ops: Akota, Hanif, Evergreen
- Chapai Nawabganj: ৳800 / ৳1,200–1,500
- Natore: ৳600 / ৳950–1,200
- Naogaon: ৳650 / ৳1,000–1,300
- Pabna: ৳500–700 / ৳700–900
- Sirajganj: ৳450 / ৳700
- Bogura: ৳480–580 / ৳800–1,600 (5–6h). Ops: Shyamoli, Rongdhonu, Hanif, S.R Travels, Blue Line
- Joypurhat: ৳600 / ৳1,000–1,200
- Khulna: ৳600–690 / ৳850–1,250 (7–8h via Padma Bridge). Ops: Tungipara, Shohagh, Hanif, Green Line, BRTC
- Bagerhat: ৳650–680 / ৳1,000
- Satkhira: ৳700–820 / ৳920–1,000
- Jashore: ৳600–750 / ৳850–1,700
- Jhenaidah: ৳700–750 / ৳900–1,400
- Magura: ৳550 / ৳900
- Narail: ৳550 / ৳900
- Kushtia: ৳600 / ৳900+
- Chuadanga: ৳700 / ৳1,100
- Meherpur: ৳700–750 / ৳1,100
- Barishal: ৳550–700 / ৳850–1,250 (6–7h). Ops: Labiba Classic, Shohagh, Ena, Hanif
- Bhola: ৳600 / ৳800 (bus+launch or direct)
- Jhalokathi: ৳600 / ৳900
- Pirojpur: ৳600 / ৳900
- Patuakhali: ৳590–650 / ৳1,000
- Gazipur: ৳100–150 (Gulistan ⇄ Gazipur). Ops: Provati Banasree, Soukhin
- Narayanganj: ৳55–80 (Gulistan ⇄ Narayanganj). Ops: Bandhan, Utsab, Shital
- Narsingdi: ৳134 / ৳350 (Sayedabad ⇄ Narsingdi). Ops: PPL, Meghalaya, Badsha
- Manikganj: ৳134 / ৳250 (Gabtoli)
- Munshiganj: ৳66–97 (Gulistan)
- Tangail: ৳201 / ৳500 (Mohakhali ⇄ Tangail). Ops: Nirala Super, Dhaleshwari, Jhatika
- Faridpur: ৳314 / ৳600 (via Padma Bridge). Ops: Comfort Line, Golden Line, Hanif
- Gopalganj: ৳462 / ৳800 (via Faridpur)
- Madaripur: ৳300 / ৳600
- Rajbari: ৳311 / ৳700
- Shariatpur: ৳233 / ৳600 (Sayedabad)
- Kishoreganj: ৳312 / ৳600 (via Narsingdi). Ops: Ena, Anannya Classic
- Rangpur: ৳750–880 / ৳1,000–1,700 (from Gabtoli/Kalyanpur/Mohakhali). Ops: Shyamoli, Rongdhonu, Hanif, Nabil, S.R Travels
- Dinajpur: ৳700–970 / ৳1,200–1,700. Ops: Shyamoli, Hanif, Nabil
- Thakurgaon: ৳950–1,050 / ৳1,300–1,800. Ops: Hanif, Nabil, Shah Ali
- Panchagarh: ৳1,000 / ৳1,400–1,800
- Nilphamari: ৳850–1,000 / ৳1,200–1,600. Ops: Nabil, S.R Travels
- Lalmonirhat, Kurigram, Gaibandha: approx ৳700–900 non-AC / ৳1,000–1,600 AC (north routes, exact fare varies)
- Sherpur, Jamalpur, Netrokona, Moulvibazar, Habiganj, Sunamganj: approx ৳600–900 non-AC / ৳900–1,700 AC (exact fare varies)

**Trains from Dhaka (Kamalapur) — real schedules:**
- Chattogram: Suborno Express 701 (dep 7:00AM, arr 11:55AM, 4h55m) / 702 (dep 4:30PM, arr 9:25PM). Fare ৳405–1,591
- Sylhet: Upaban Express 739 (dep 10:00PM, arr 5:00AM, 7h). Fare ৳375–1,678
- Khulna: Sundarban Express 726 (dep 8:00AM, arr 3:40PM, 7h40m). Fare ৳310–1,285
- Rajshahi: Padma Express 760 (dep 4:00PM, arr 9:15PM, 5h15m). Fare ৳350–1,400

**Flights (approx):** Cox's Bazar 1h ৳4,500+; Sylhet 45min; Chattogram 45min. Book via Biman/US-Bangla.

**Launches:** Sadarghat → Barishal 7–8h ৳400–1,200. Do not name specific launch vessels unless certain.

**Route advice rules:**
1. Always check direct buses FIRST before suggesting transfers
2. Prefer routes locals actually use (Baishakhi/Labbayk for Savar corridor)
3. Metro is fastest for Uttara-Motijheel corridor, beats any bus
4. CNG/Rickshaw for short last-mile (<3km)
5. Avoid 3+ transfers — suggest simpler alternatives

**Format responses as:**
- Option 1 (Direct/Recommended): vehicle name, boarding point, drop point, time, fare
- Option 2 (Alternative): via [hub], vehicle names, time, fare
- Quick tip at end

If user mentions current location in [Context:...] tag, use it as their actual starting point.
If asked who built you: "Mejbaur Bahar Fagun, software engineer, Bangladesh."`;

      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.text || '').slice(0, 400) })),
        { role: 'user', content: message },
      ];

      try {
        const result = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
          messages,
          max_tokens: 800,
        });
        const text = result.response || '';
        return new Response(JSON.stringify({ text }), {
          status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'ai_failed', detail: String(e).slice(0, 100) }), {
          status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }
    }

    // ── POST /feedback — store route correction feedback ─────────────────────
    if ((url.pathname === '/feedback' || url.pathname === '/feedback/') && request.method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (isRateLimited(ip + ':fb', 10, 60_000)) {
        return new Response(JSON.stringify({ error: 'Rate limited' }), {
          status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }
      let body;
      try { body = await request.json(); } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }
      const feedback = {
        type: String(body.type || 'wrong_route').slice(0, 50),
        query: String(body.query || '').slice(0, 300),
        from: String(body.from || '').slice(0, 100),
        to: String(body.to || '').slice(0, 100),
        comment: String(body.comment || '').slice(0, 500),
        timestamp: Date.now(),
        ip: ip.slice(0, 15),
      };
      // Store in KV or write to data repo (currently: log to Cloudflare logs + return ok)
      console.log('[FEEDBACK]', JSON.stringify(feedback));
      // If DATA_TOKEN and DATA_REPO are set, store to GitHub data repo
      if (env.DATA_TOKEN) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const path = `data/feedback/${today}.json`;
          const existing = await readDataFile(env.DATA_TOKEN, env.DATA_OWNER || 'mejbaurbahar', env.DATA_REPO || 'koyjabo', path);
          const record = existing?.content || { date: today, entries: [] };
          record.entries.push(feedback);
          if (record.entries.length > 200) record.entries = record.entries.slice(-200);
          await writeDataFile(env.DATA_TOKEN, env.DATA_OWNER || 'mejbaurbahar', env.DATA_REPO || 'koyjabo', path, record, `Feedback: ${feedback.type} ${today}`);
        } catch { /* non-fatal */ }
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    // ── GET /bus-snapshot (alias: /dtca-snapshot) ────────────────────────────
    if (url.pathname === '/bus-snapshot' || url.pathname === '/bus-snapshot/' ||
        url.pathname === '/dtca-snapshot' || url.pathname === '/dtca-snapshot/') {
      const trackerUrl = 'https://buskothay.com/dtca-bus-tracking/';
      try {
        const upstream = await fetch(trackerUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KoyJabo/1.0; +https://koyjabo.com)' },
          redirect: 'follow',
        });
        const html = await upstream.text();
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch?.[1]?.trim() || 'DTCA Panel';
        const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');
        const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const snippet = plain.slice(0, 240) || 'Tracker page reachable.';
        const keywords = ['bus', 'route', 'live', 'track', 'location', 'dhaka', 'dtca']
          .filter(keyword => plain.toLowerCase().includes(keyword));
        const summary = keywords.length > 0
          ? `The DTCA tracker page updated successfully. The latest snapshot contains ${keywords.slice(0, 4).join(', ')} signals.`
          : 'The DTCA tracker page was reachable and a lightweight snapshot was generated.';
        return new Response(JSON.stringify({
          sourceUrl: trackerUrl,
          title,
          fetchedAt: Date.now(),
          fetchedAtLabel: new Date().toLocaleString(),
          status: upstream.ok ? 'ok' : 'unsupported',
          summary,
          busHints: [
            'Open the official DTCA tracker for the latest live map',
            'Use this snapshot as a quick shortcut while the source refreshes',
          ],
          snippet,
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      } catch {
        return new Response(JSON.stringify({
          sourceUrl: trackerUrl,
          title: 'DTCA Panel',
          fetchedAt: Date.now(),
          fetchedAtLabel: new Date().toLocaleString(),
          status: 'offline',
          summary: 'The DTCA tracker could not be reached right now, so the last saved snapshot is being reused.',
          busHints: [
            'Open the official DTCA tracker for the latest live map',
            'The app will retry automatically on the next refresh',
          ],
          snippet: 'Unable to fetch tracker snapshot at the moment.',
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }
    }

    // ── /bus (alias: /dtca) — proxy to DTCA backend ─────────────────────────
    if (url.pathname.startsWith('/bus') || url.pathname.startsWith('/dtca')) {
      const sub = url.pathname.replace(/^\/(bus|dtca)\/?/, '');
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (isRateLimited(ip + ':dtca', 120, 60_000)) {
        return new Response(JSON.stringify({ error: 'Rate limited' }), {
          status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }

      let dtcaPath;
      if (sub === 'vehicles' || sub === 'vehicles/') {
        dtcaPath = 'all-vehicle-location';
      } else if (sub === 'route-details' || sub === 'route-details/') {
        const id = url.searchParams.get('id') || '';
        if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } });
        dtcaPath = `route-plans/route-details?identifier=${encodeURIComponent(id)}`;
      } else if (sub === 'live-location' || sub === 'live-location/') {
        const id = url.searchParams.get('id') || '';
        if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } });
        dtcaPath = `route-plans/live-location?identifier=${encodeURIComponent(id)}`;
      } else if (sub === 'stoppages' || sub === 'stoppages/') {
        dtcaPath = 'route-plans/stoppage-list';
      } else {
        return new Response(JSON.stringify({ error: 'Unknown endpoint' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } });
      }

      try {
        const upstream = await dtcaFetch(dtcaPath, env);
        const data = await upstream.json().catch(() => ({}));
        // Data payloads arrive RSA/AES encrypted — decrypt server-side before serving
        const plain = (upstream.ok && data && typeof data === 'object')
          ? await dtcaDecryptPayload(data, env)
          : data;
        // live-location 404 = no active location right now (bus parked/offline) — not a server error
        const isLiveLoc = sub === 'live-location' || sub === 'live-location/';
        const status = (isLiveLoc && upstream.status === 404) ? 200 : (upstream.ok ? 200 : upstream.status);
        return new Response(JSON.stringify(plain), {
          status,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'DTCA proxy error', detail: String(e).slice(0, 100) }), {
          status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }
    }

    // Only serve /gh path
    if (url.pathname !== '/gh' && url.pathname !== '/gh/') {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    // Block requests not from our domain (in production). Exact match against
    // the same allowlist used for CORS — a startsWith check would let
    // https://koyjabo.com.evil.com pass the gate while CORS still rejects it.
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
    if (!isAllowedOrigin && origin !== '') {
      return new Response('Forbidden', { status: 403, headers: corsHeaders(origin) });
    }

    // Rate limit by IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60', ...corsHeaders(origin) } }
      );
    }

    const TOKEN = env.GH_TOKEN;
    const DATA_TOKEN = env.DATA_TOKEN || TOKEN;
    const APP_OWNER  = env.APP_OWNER  || 'mejbaurbahar';
    const APP_REPO   = env.APP_REPO   || 'Dhaka-Commute';
    const DATA_OWNER = env.DATA_OWNER || 'mejbaurbahar';
    const DATA_REPO  = env.DATA_REPO  || 'koyjabo';
    const CORE_REPO  = 'koyjabo-core';

    if (!TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Account service connection failed.' }),
        { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
      );
    }

    const REPOS = {
      d: { owner: DATA_OWNER, repo: DATA_REPO },
      a: { owner: APP_OWNER,  repo: APP_REPO  },
    };

    // ── GET /gh?r=d|a&p=<path>  (read a file, return only decoded content) ──
    if (request.method === 'GET') {
      const r = url.searchParams.get('r') || '';
      const p = url.searchParams.get('p') || '';
      const repo = REPOS[r];

      if (!repo || !p) {
        return new Response(
          JSON.stringify({ error: 'Bad request' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      // Validate: only allow safe JSON paths, no traversal
      if (!/^[\w/.-]+\.json$/.test(p) || p.includes('..')) {
        return new Response(
          JSON.stringify({ error: 'Invalid path' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      // Block reads of sensitive paths (user records, password reset blobs,
      // auth metadata). These must go through dedicated POST actions that
      // strip bcryptHash + verify intent. Enforced for BOTH repo branches —
      // the r=a fallback must not bypass the deny list.
      if (isReadDenied(p)) {
        return new Response(
          JSON.stringify({ error: 'Forbidden path' }),
          { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      // User-bound data (history/devices/reminders/avatars/chat sessions) is
      // private — reads require the matching session token, same as writes.
      // Without a token the file is treated as missing (404 null) so the
      // response reveals nothing about whether a userId exists.
      const userRule = WRITE_PATH_RULES.find((rule) => rule.userBound && rule.re.test(p));
      let sessionUserIdForRead = null;
      if (userRule) {
        const m = p.match(userRule.re);
        sessionUserIdForRead = await verifySessionToken(url.searchParams.get('t') || '', env.JWT_SECRET || '');
        if (!sessionUserIdForRead || m[1] !== sessionUserIdForRead) {
          return new Response('null', {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
          });
        }
      }

      // Primary fetch with 3-layer caching (CF cache → ETag → GitHub API)
      let result = await ghFetch(TOKEN, repo.owner, repo.repo, p, ctx);

      // Fallback: r=a (results) → try CORE_REPO if not in APP_REPO
      if (result.status === 404 && r === 'a') {
        result = await ghFetch(TOKEN, APP_OWNER, CORE_REPO, p, ctx);
      }

      // Fallback: r=d (user data) → try koyjabo-core for migrated users
      if (result.status === 404 && r === 'd') {
        result = await ghFetch(TOKEN, DATA_OWNER, CORE_REPO, p, ctx);
      }

      if (result.status === 404) {
        return new Response('null', {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        });
      }

      if (result.status !== 200 || result.decoded === null) {
        return new Response(
          JSON.stringify({ error: 'Account service connection failed.' }),
          { status: result.status >= 400 ? result.status : 502, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      const isUserData = p.startsWith('data/users/') || p.startsWith('data/results/') || !!userRule;

      // Inject a fresh session token into successful workflow result reads so
      // newly-signed-up users get a session immediately without a second
      // Turnstile challenge. The requestId in the path is an unguessable UUID
      // generated by the polling client, so only that client can pull this.
      let payload = result.decoded;
      if (isUserData && p.startsWith('data/results/') && payload && payload.success && payload.userId) {
        const sessionToken = await issueSessionToken(payload.userId, env.JWT_SECRET || '');
        if (sessionToken) payload = { ...payload, sessionToken };
      }

      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': isUserData ? 'no-store' : 'public, max-age=300, stale-while-revalidate=60',
          ...corsHeaders(origin),
        },
      });
    }

    // ── POST /gh  ────────────────────────────────────────────────────────────
    if (request.method === 'POST') {
      const contentType = request.headers.get('Content-Type') || '';
      if (!contentType.includes('application/json')) {
        return new Response(
          JSON.stringify({ error: 'Content-Type must be application/json' }),
          { status: 415, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(
          JSON.stringify({ error: 'Invalid JSON body' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      if (!body?.requestId || !body?.action) {
        return new Response(
          JSON.stringify({ error: 'Bad request' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      if (!ALLOWED_ACTIONS.has(body.action)) {
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      // Per-action rate limit (additional ceiling on top of the global one).
      const bucket = RATE_BUCKETS[body.action];
      if (bucket && isRateLimited(`${ip}:${body.action}`, bucket.limit, bucket.windowMs)) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
          { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60', ...corsHeaders(origin) } }
        );
      }

      // ── Cloudflare Turnstile verification for auth actions ─────────────────
      if (['signup', 'login', 'google-signup', 'auth-login', 'auth-google-lookup'].includes(body.action)) {
        const cfToken = body.cfToken || body.turnstileToken || '';
        const ipAddr = request.headers.get('CF-Connecting-IP') || '';
        if (!await verifyTurnstile(cfToken, ipAddr, env.TURNSTILE_SECRET)) {
          return new Response(
            JSON.stringify({ error: 'Security check failed. Please refresh and try again.' }),
            { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
      }

      if (!/^[0-9a-f-]{36}$/.test(body.requestId)) {
        return new Response(
          JSON.stringify({ error: 'Invalid requestId' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      // Resolve sessionUserId once — used by write-path validation below.
      const sessionUserId = await verifySessionToken(body.sessionToken || '', env.JWT_SECRET || '');

      // ── auth-login — bcrypt compare runs SERVER-SIDE, hash never leaves CF ─
      if (body.action === 'auth-login') {
        const emailHash = String(body.emailHash || '').trim();
        const passwordSha = String(body.passwordSha || '').trim();
        if (!/^[a-f0-9]{64}$/.test(emailHash) || !/^[a-f0-9]{64}$/.test(passwordSha)) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password.' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        // Read index → userId → user file (server-side only, bcryptHash stays in worker).
        const indexResult = await ghFetch(TOKEN, DATA_OWNER, DATA_REPO, 'data/users/index.json', ctx);
        const index = indexResult.status === 200 ? indexResult.decoded : null;
        const userId = index?.[emailHash];
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password.' }),
            { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        const userResult = await ghFetch(TOKEN, DATA_OWNER, DATA_REPO, `data/users/${userId}.json`, ctx);
        const user = userResult.status === 200 ? userResult.decoded : null;
        if (!user?.bcryptHash) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password.' }),
            { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        const ok = await bcrypt.compare(passwordSha, user.bcryptHash);
        if (!ok) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password.' }),
            { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        const sessionToken = await issueSessionToken(userId, env.JWT_SECRET || '');
        return new Response(
          JSON.stringify({
            success: true,
            userId,
            username: user.username,
            displayName: user.displayName,
            provider: user.provider || 'password',
            hasPassword: !!user.bcryptHash,
            sessionToken,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
        );
      }

      // ── auth-google-lookup — find an existing Google user without leaking
      // bcryptHash or arbitrary fields. Caller must have already verified the
      // Firebase ID-token client-side (this just maps email → userId).
      if (body.action === 'auth-google-lookup') {
        const emailHash = String(body.emailHash || '').trim();
        if (!/^[a-f0-9]{64}$/.test(emailHash)) {
          return new Response(
            JSON.stringify({ error: 'Bad request' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        const indexResult = await ghFetch(TOKEN, DATA_OWNER, DATA_REPO, 'data/users/index.json', ctx);
        const index = indexResult.status === 200 ? indexResult.decoded : null;
        const userId = index?.[emailHash];
        if (!userId) {
          return new Response(
            JSON.stringify({ exists: false }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
          );
        }
        const userResult = await ghFetch(TOKEN, DATA_OWNER, DATA_REPO, `data/users/${userId}.json`, ctx);
        const user = userResult.status === 200 ? userResult.decoded : null;
        if (!user) {
          return new Response(
            JSON.stringify({ exists: false }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
          );
        }
        const sessionToken = await issueSessionToken(userId, env.JWT_SECRET || '');
        return new Response(
          JSON.stringify({
            exists: true,
            userId,
            username: user.username,
            displayName: user.displayName,
            provider: user.provider || 'google',
            hasPassword: !!user.bcryptHash,
            sessionToken,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
        );
      }

      // ── auth-reset-status — gated read of password_resets/<tokenHash>.json
      // Returns only {used, expired, notFound}. Raw blob never leaves worker.
      if (body.action === 'auth-reset-status') {
        const tokenHash = String(body.tokenHash || '').trim();
        if (!/^[a-f0-9]{64}$/.test(tokenHash)) {
          return new Response(
            JSON.stringify({ used: false, expired: false, notFound: true }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
          );
        }
        const r = await ghFetch(TOKEN, DATA_OWNER, DATA_REPO, `data/password_resets/${tokenHash}.json`, ctx);
        if (r.status !== 200 || !r.decoded) {
          return new Response(
            JSON.stringify({ used: false, expired: false, notFound: true }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
          );
        }
        const data = r.decoded;
        return new Response(
          JSON.stringify({
            used: data.used === true,
            expired: typeof data.expiresAt === 'number' && data.expiresAt < Date.now(),
            notFound: false,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) } }
        );
      }

      // ── Direct data writes (no GitHub Actions needed) ─────────────────────
      if (body.action === 'save-data') {
        let payload = {};
        try { payload = JSON.parse(body.data || '{}'); } catch { /* ignore */ }
        const { path, content, message } = payload;
        if (content === undefined) {
          return new Response(
            JSON.stringify({ error: 'Invalid content for save-data' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        const check = validateWritePath(path, sessionUserId);
        if (!check.ok) {
          return new Response(
            JSON.stringify({ error: check.message }),
            { status: check.status, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        // Cap payload size — refuse anything bigger than 1MB to avoid abuse of
        // the free Worker tier or a runaway client (an avatar payload tops out
        // well under this once the canvas resize has run).
        const sizeOk = JSON.stringify(content).length <= 1_000_000;
        if (!sizeOk) {
          return new Response(
            JSON.stringify({ error: 'Payload too large' }),
            { status: 413, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        // Turnstile required for sensitive community writes (photos) — keeps
        // bot upload spam down. Other community writes are protected by the
        // per-IP rate limiter only.
        if (check.rule?.turnstile) {
          const ipAddr = request.headers.get('CF-Connecting-IP') || '';
          if (!await verifyTurnstile(body.cfToken || '', ipAddr, env.TURNSTILE_SECRET)) {
            return new Response(
              JSON.stringify({ error: 'Security check required' }),
              { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
            );
          }
        }
        const writeResult = await writeDataFile(DATA_TOKEN, DATA_OWNER, DATA_REPO, path, content, message, ctx);
        return new Response(
          JSON.stringify({ success: writeResult.ok, ...(writeResult.ok ? {} : { error: writeResult.message, status: writeResult.status }) }),
          { status: writeResult.ok ? 200 : (writeResult.status === 403 ? 403 : 500), headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      if (body.action === 'delete-data') {
        let payload = {};
        try { payload = JSON.parse(body.data || '{}'); } catch { /* ignore */ }
        const { path, message } = payload;
        const check = validateWritePath(path, sessionUserId);
        if (!check.ok) {
          return new Response(
            JSON.stringify({ error: check.message }),
            { status: check.status, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
          );
        }
        const delResult = await deleteDataFile(DATA_TOKEN, DATA_OWNER, DATA_REPO, path, message, ctx);
        return new Response(
          JSON.stringify({ success: delResult.ok, ...(delResult.ok ? {} : { error: delResult.message }) }),
          { status: delResult.ok ? 200 : (delResult.status === 404 ? 404 : 500), headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      if (body.action === 'record-query') {
        let payload = {};
        try { payload = JSON.parse(body.data || '{}'); } catch { /* ignore */ }
        const today = new Date().toISOString().split('T')[0];
        const path = `data/learning/queries/${today}.json`;
        const existing = await readDataFile(TOKEN, DATA_OWNER, DATA_REPO, path);
        const record = existing?.content || { date: today, queries: [] };
        record.queries.push({
          query: (payload.query || '').slice(0, 300),
          responseLen: (payload.response || '').length,
          intent: payload.intent || 'unknown',
          quality: payload.quality || 'unknown',
          lang: payload.lang || 'en',
          userId: body.userId || 'anonymous',
          timestamp: Date.now(),
        });
        if (record.queries.length > 500) record.queries = record.queries.slice(-500);
        const writeOk = await writeDataFile(DATA_TOKEN, DATA_OWNER, DATA_REPO, path, record, `Query record: ${(payload.query || '').slice(0, 30)}`, ctx);
        return new Response(
          JSON.stringify({ success: writeOk.ok }),
          { status: writeOk.ok ? 200 : 500, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      // ── Auth actions → dispatch GitHub Actions workflow ───────────────────
      const ghUrl = `https://api.github.com/repos/${APP_OWNER}/koyjabo-core/actions/workflows/auth.yml/dispatches`;
      const upstream = await fetch(ghUrl, {
        method: 'POST',
        headers: ghHeaders(TOKEN),
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            requestId:    body.requestId,
            action:       body.action,
            email:        body.email        || '',
            passwordHash: body.passwordHash || '',
            userId:       body.userId       || '',
            data:         body.data         || '{}',
          },
        }),
      });

      if (!upstream.ok) {
        return new Response(
          JSON.stringify({ error: 'Account service connection failed.' }),
          { status: upstream.status, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
        );
      }

      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
    );
  },

  // Cron trigger: refresh DTCA token every 6 hours so it never expires mid-session
  async scheduled(_event, env, _ctx) {
    const token = await dtcaAutoLogin(env);
    if (token) _dtcaTokenOverride = token;
  },
};
