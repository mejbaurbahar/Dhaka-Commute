/**
 * IndexNow bulk submitter — notifies Bing, Yandex, Seznam instantly.
 * No API key or Google Cloud setup needed.
 *
 * RUN after the key file is deployed to koyjabo.com:
 *   node scripts/indexnow-submit.mjs
 */

import { readFileSync } from 'fs';

const KEY = '6c3096f0cdcb184619abf6b41a0259fb';
const HOST = 'koyjabo.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = new URL('../public/sitemap.xml', import.meta.url).pathname;

// Parse all URLs from sitemap
const xml = readFileSync(SITEMAP_PATH, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
console.log(`📋  ${urls.length} URLs found in sitemap`);

// IndexNow accepts up to 10,000 URLs per request
const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    const icon = res.status === 200 || res.status === 202 ? '✅' : '❌';
    console.log(`${icon}  ${endpoint} → HTTP ${res.status}${text ? ': ' + text.slice(0, 80) : ''}`);
  } catch (e) {
    console.error(`⚠️  ${endpoint} → ${e.message}`);
  }
}
