/**
 * Google Indexing API bulk submitter
 * Reads all URLs from sitemap.xml and submits each via the Indexing API.
 *
 * SETUP (one-time, ~5 min):
 * 1. Go to https://console.cloud.google.com → New project (or pick existing)
 * 2. APIs & Services → Enable "Web Search Indexing API"
 * 3. APIs & Services → Credentials → Create Service Account → download JSON key
 * 4. Open Google Search Console → Settings → Users & permissions
 *    → Add user → paste service account email → set role to "Owner"
 * 5. Save the JSON key file as: scripts/gsc-service-account.json
 *
 * RUN:
 *   node scripts/index-urls.mjs
 *
 * Quota: 200 URLs/day on free tier. Script batches with 1s delay.
 * Run again next day to continue (it skips already-submitted in same run).
 */

import { readFileSync } from 'fs';
import { createSign } from 'crypto';

const SITEMAP_PATH = new URL('../public/sitemap.xml', import.meta.url).pathname;
const KEY_PATH = new URL('./gsc-service-account.json', import.meta.url).pathname;
const DAILY_QUOTA = 200;
const DELAY_MS = 500; // 0.5s between requests

// ─── Load service account key ────────────────────────────────────────────────
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(KEY_PATH, 'utf8'));
} catch {
  console.error('❌  Key file not found: scripts/gsc-service-account.json');
  console.error('    Follow the SETUP instructions in this file header.');
  process.exit(1);
}

// ─── Parse sitemap URLs ───────────────────────────────────────────────────────
const sitemapXml = readFileSync(SITEMAP_PATH, 'utf8');
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
console.log(`📋  Found ${urls.length} URLs in sitemap`);

// ─── JWT / OAuth2 token (no external deps) ───────────────────────────────────
function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
  const payload = base64url(Buffer.from(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })));
  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const sig = base64url(sign.sign(serviceAccount.private_key));
  const jwt = `${header}.${payload}.${sig}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`OAuth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

// ─── Submit one URL ───────────────────────────────────────────────────────────
async function submitUrl(token, url) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  return { status: res.status, body: await res.json() };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log('🔑  Getting OAuth2 token…');
  const token = await getAccessToken();
  console.log('✅  Token OK\n');

  const batch = urls.slice(0, DAILY_QUOTA);
  console.log(`🚀  Submitting ${batch.length} URLs (daily quota ${DAILY_QUOTA})…\n`);

  let ok = 0, fail = 0;
  for (let i = 0; i < batch.length; i++) {
    const url = batch[i];
    try {
      const { status, body } = await submitUrl(token, url);
      if (status === 200) {
        ok++;
        process.stdout.write(`\r✅  ${ok} submitted, ${fail} failed  [${i + 1}/${batch.length}]`);
      } else {
        fail++;
        console.error(`\n❌  ${status} — ${url}`);
        console.error('    ', JSON.stringify(body));
      }
    } catch (e) {
      fail++;
      console.error(`\n⚠️  Network error — ${url}: ${e.message}`);
    }
    if (i < batch.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\n\n📊  Done: ${ok} OK, ${fail} failed`);
  if (urls.length > DAILY_QUOTA) {
    console.log(`ℹ️  ${urls.length - DAILY_QUOTA} URLs remain. Run again tomorrow.`);
  }
})();
