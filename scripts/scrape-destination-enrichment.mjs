/**
 * Google Maps enrichment scraper for koyjabo destinations.
 *
 * Usage:
 *   node scripts/scrape-destination-enrichment.mjs            # all places
 *   node scripts/scrape-destination-enrichment.mjs 0 10       # chunk: indices 0-9
 *
 * Extracts per place (public data only): rating, review count, coordinates,
 * up to 4 photo URLs, hours (best-effort). Writes incrementally to
 * data/generated/destination-enrichment-raw.json (crash-safe: one upsert per
 * place, file rewritten each time).
 *
 * Exit codes: 0 = done, 2 = captcha/blocked (resume later), 1 = other error.
 * Rate-limit strategy: jittered 4-9s sleeps, longer pause every 12 places,
 * save progress immediately so interrupted runs resume cleanly.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLACES_SRC = path.join(__dirname, '../data/bangladeshPlaces.ts');
const OUT_FILE = path.join(__dirname, '../data/generated/destination-enrichment-raw.json');

const PLACE_RE = /{\s*id: '([^']+)',\s*en: (?:'([^']+)'|"([^"]+)"),\s*bn: (?:'([^']+)'|"([^"]+)"),\s*type: '([^']+)',[^}]*?lat: ([\d.]+), lng: ([\d.-]+),/g;

function parsePlaces() {
  const src = fs.readFileSync(PLACES_SRC, 'utf8');
  const places = [];
  // A lone (?:district: ...)? group is unreachable between two [^}]*? segments —
  // the engine always lets the second segment absorb the district text. Match
  // districts separately and pair them to entries by offset instead.
  const DRE = /district: (?:'([^']+)'|"([^"]+)")/g;
  const districts = [];
  let dm;
  while ((dm = DRE.exec(src)) !== null) districts.push({ off: dm.index, name: dm[1] || dm[2] });
  let m;
  while ((m = PLACE_RE.exec(src)) !== null) {
    const end = m.index + m[0].length;
    let district = '';
    for (const d of districts) {
      if (d.off >= m.index && d.off < end) { district = d.name; break; }
    }
    places.push({
      id: m[1],
      en: m[2] || m[3],
      bn: m[4] || m[5],
      type: m[6],
      district,
      lat: +m[7],
      lng: +m[8],
    });
  }
  return places;
}

function loadRaw() {
  try { return JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')); }
  catch { return {}; }
}

function saveRaw(raw) {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(raw, null, 2));
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const jitter = (min, max) => Math.floor(min + Math.random() * (max - min));

function parseCoordsFromUrl(url) {
  // https://www.google.com/maps/place/.../@23.7816,91.9888,17z/
  const at = url.match(/@(-?[\d.]+),(-?[\d.]+),(\d+)z/);
  if (at) return { lat: +at[1], lng: +at[2] };
  // ...!3d23.7816!4d91.9888...
  const d3 = url.match(/!3d(-?[\d.]+)/);
  const d4 = url.match(/!4d(-?[\d.]+)/);
  if (d3 && d4) return { lat: +d3[1], lng: +d4[1] };
  return null;
}

const BN_DIGITS = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
const toEnDigits = (s) => s.replace(/[০-৯]/g, d => BN_DIGITS[d]);

function parseRatingFromLabel(label) {
  // "4.5 stars · 12,345 reviews", "4.5 stars · No reviews", or bare "4.5"
  const m = label.match(/([\d.]+)\s*stars?[^\d]*([\d,]+)?\s*reviews?/i);
  if (m) return { rating: +m[1], reviews: m[2] ? +m[2].replace(/,/g, '') : 0 };
  const bare = label.match(/([\d.]+)/);
  if (bare) return { rating: +bare[1], reviews: 0 };
  return null;
}

function parseRatingFromBody(bodyText) {
  // Place page body starts with the name, then the rating on the next line:
  // "...আহ্সান মঞ্জিল জাদুঘর\n৪.৪\nঐতিহাসিক..." or "...\n4.4\n..."
  const norm = toEnDigits(bodyText.slice(0, 2000));
  const m = norm.match(/\n(\d[.,]\d)(?:\n| \()/);
  if (m) return { rating: +m[1].replace(',', '.'), reviews: 0 };
  const m2 = norm.match(/\n(\d[.,]\d)\n/);
  if (m2) return { rating: +m2[1].replace(',', '.'), reviews: 0 };
  return null;
}

const toRad = (deg) => (deg * Math.PI) / 180;
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

async function collectPhotos(page) {
  return page.evaluate(() => {
    const seen = new Set();
    const out = [];
    for (const img of document.querySelectorAll('img[src*="googleusercontent"]')) {
      let src = img.src;
      if (!src || seen.has(src)) continue;
      seen.add(src);
      // place photos: /p/ segments, /photo, or gps-cs-s (Maps CDN)
      if (src.includes('/p/') || src.includes('/photo') || src.includes('gps-cs-s')) {
        src = src.replace(/(=w\d+(-h\d+)?)/, '=w800-h600');
        out.push(src);
      }
      if (out.length >= 6) break;
    }
    return out;
  }).catch(() => []);
}

async function collectHours(page) {
  return page.evaluate(() => {
    const els = [...document.querySelectorAll('div')]
      .filter(d => d.childElementCount === 0)
      .map(d => d.textContent?.trim() || '')
      .filter(t => /^(Open|Closed|Closes|Opens)($| ·| until| at)/i.test(t));
    return els[0] || '';
  }).catch(() => '');
}

async function checkBlocked(page) {
  const bodyText = await page.evaluate(() => document.body?.innerText?.slice(0, 500) || '');
  if (/unusual traffic|captcha|verify you're a human|are you a robot/i.test(bodyText)) {
    return true;
  }
  return false;
}

async function fillResult(result, page, finalUrl) {
  const coords = parseCoordsFromUrl(finalUrl);
  if (coords) { result.lat = coords.lat; result.lng = coords.lng; }
  if (finalUrl.includes('/maps/place/')) {
    result.gmUrl = decodeURIComponent(finalUrl.split('/maps/place/')[1]?.split('/')[0] || '');
  }
  result.photos = (await collectPhotos(page)).slice(0, 4);
  result.hours = await collectHours(page);
}

async function extractFromPage(page, place) {
  // NOTE: search by the English name ALONE. Appending "Dhaka Bangladesh"
  // biases Google toward admin areas (e.g. Lalbagh Fort → Lalbagh thana).
  const searchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(place.en);
  const result = { photos: [], hours: '' };
  let finalUrl, coords;

  const matchesKnown = (c) => {
    if (!c) return false;
    return haversineKm(c.lat, c.lng, place.lat, place.lng) <= 2;
  };

  // Google can redirect to a place page whose coords differ from our
  // hand-authored ones by 2+ km (we've seen 2.36km for Himchari). A match
  // between the place-page URL slug and the place's en/bn name is stronger
  // evidence of the right entity than coordinates — accept those too, but
  // only when the page isn't hundreds of km away (short generic names like
  // "Nilachal" can redirect to a same-named entity in another district).
  // Google renames some places ("Chittagong Zoo" → "Chattogram Zoo"); apply
  // aliases on both sides so slug↔name matching tolerates them.
  const ALIASES = { chittagong: 'chattogram', chattogram: 'chittagong' };
  const norm = (s) => {
    // NFKC: precomposed Bangla letters (ড় U+09DC) decompose to base+nukta
    // (ড় U+09A1+U+09BC), so spelling variants match.
    let n = (s || '').normalize('NFKC').toLowerCase().replace(/[\s+_\-/.'"()[\]]/g, '');
    for (const [a, b] of Object.entries(ALIASES)) n = n.replaceAll(a, b);
    return n;
  };
  const nameMatches = (u) => {
    const slug = decodeURIComponent((u.split('/maps/place/')[1] || '').split('/')[0] || '');
    const n = norm(slug);
    if (!n) return false;
    const en = norm(place.en), bn = norm(place.bn);
    const nameOk = (en && (n.includes(en) || en.includes(n))) || (bn && (n.includes(bn) || bn.includes(n)));
    if (!nameOk) return false;
    const c = parseCoordsFromUrl(u);
    return !c || !place.lat || haversineKm(c.lat, c.lng, place.lat, place.lng) < 30;
  };

  // 1) Name search — may auto-redirect to the place page
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(10000); // let Maps settle / auto-redirect
  if (await checkBlocked(page)) return { blocked: true };
  finalUrl = page.url();
  coords = parseCoordsFromUrl(finalUrl);

  if (finalUrl.includes('/maps/place/')) {
    const parsed = parseRatingFromBody(await page.evaluate(() => document.body?.innerText || ''));
    const exact = coords && haversineKm(coords.lat, coords.lng, place.lat, place.lng) < 0.25;
    // Accept when coords match and the entity either has a rating (2km) or is
    // within 250m of our known position — rating-less pages are usually admin
    // areas (thana/upazila) that share the same name. Name matches (URL slug
    // vs en/bn) are accepted regardless of distance. A rated page within 30km
    // is also accepted — Bangla spellings differ across sources (সেমেট্রি vs
    // সিমেট্রি) so the name check can miss the right redirect.
    const nearRated = parsed && coords && haversineKm(coords.lat, coords.lng, place.lat, place.lng) < 30;
    if ((matchesKnown(coords) && (parsed || exact)) || nameMatches(finalUrl) || nearRated) {
      result.gmRating = parsed?.rating;
      result.gmReviewCount = parsed?.reviews;
      await fillResult(result, page, finalUrl);
      return result;
    }
  }

  // 2) Wrong entity or result list — iterate cards, verify each against known coords
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);
  if (await checkBlocked(page)) return { blocked: true };

  let cards = page.locator('a[href*="/maps/place/"]');
  let cardCount = 0;
  try { cardCount = await cards.count(); } catch { cardCount = 0; }
  // Name-only query returned nothing (throttle or overly-ambiguous name) —
  // retry once with district + country appended before giving up.
  if (cardCount === 0 && place.district) {
    const scoped = `${place.en} ${place.district} Bangladesh`;
    console.log(`    (name-only empty — retrying with: "${scoped}")`);
    await page.goto('https://www.google.com/maps/search/' + encodeURIComponent(scoped), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(10000);
    if (await checkBlocked(page)) return { blocked: true };
    try { cardCount = await cards.count(); } catch { cardCount = 0; }
  }
  // Google intermittently serves an empty result list (soft throttle) — wait
  // and retry once before giving up.
  if (cardCount === 0) {
    await sleep(jitter(15000, 20000));
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(8000);
    if (await checkBlocked(page)) return { blocked: true };
    finalUrl = page.url();
    if (finalUrl.includes('/maps/place/') && nameMatches(finalUrl)) {
      const parsed = parseRatingFromBody(await page.evaluate(() => document.body?.innerText || ''));
      if (parsed) { result.gmRating = parsed.rating; result.gmReviewCount = parsed.reviews; }
      await fillResult(result, page, finalUrl);
      return result;
    }
    try { cardCount = await cards.count(); } catch { cardCount = 0; }
  }
  // Last resort: the Bangla name often redirects where the English one gets
  // an empty list (Google's canonical entry is bn-titled).
  if (cardCount === 0 && place.bn && norm(place.bn) !== norm(place.en)) {
    console.log(`    (retrying with bn: "${place.bn}")`);
    await page.goto('https://www.google.com/maps/search/' + encodeURIComponent(place.bn), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(9000);
    if (await checkBlocked(page)) return { blocked: true };
    finalUrl = page.url();
    if (finalUrl.includes('/maps/place/') && nameMatches(finalUrl)) {
      const parsed = parseRatingFromBody(await page.evaluate(() => document.body?.innerText || ''));
      if (parsed) { result.gmRating = parsed.rating; result.gmReviewCount = parsed.reviews; }
      await fillResult(result, page, finalUrl);
      return result;
    }
    try { cardCount = await cards.count(); } catch { cardCount = 0; }
  }
  if (cardCount === 0) return { error: 'no-result' };

  for (let i = 0; i < Math.min(cardCount, 6); i++) {
    const card = cards.nth(i);
    const label = await card.getAttribute('aria-label').catch(() => null) || '';
    const parsed = parseRatingFromLabel(toEnDigits(label));
    await card.click().catch(() => {});
    await sleep(jitter(4500, 5500));
    finalUrl = page.url();
    coords = parseCoordsFromUrl(finalUrl);
    // The place-page body always shows the rating — fall back to it when the
    // list-card label had none (labels often omit ratings on smaller screens).
    const bodyParsed = parseRatingFromBody(await page.evaluate(() => document.body?.innerText || '').catch(() => ''));
    const effective = parsed || bodyParsed;
    // Accept when the entity sits near our known position (3km — Maps URL
    // coords are the viewport anchor and can sit a little off the POI pin),
    // when the card's place-page URL slug matches the place name, or when a
    // rated page sits within 30km (Bangla spelling variants defeat slug match).
    const near = coords && effective && haversineKm(coords.lat, coords.lng, place.lat, place.lng);
    if ((near !== false && near < 30) || nameMatches(finalUrl)) {
      result.gmRating = effective?.rating;
      result.gmReviewCount = effective?.reviews;
      await fillResult(result, page, finalUrl);
      return result;
    }
    // wrong entity — go back to the list and try the next card
    await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
    await sleep(jitter(1200, 2000));
  }

  // No card matched our coords — keep the first card's data anyway (better than nothing)
  result.error = 'coord-mismatch';
  finalUrl = page.url();
  const firstLabel = parseRatingFromLabel(toEnDigits(await cards.first().getAttribute('aria-label').catch(() => null) || ''));
  const firstBody = parseRatingFromBody(await page.evaluate(() => document.body?.innerText || '').catch(() => ''));
  const firstParsed = firstLabel || firstBody;
  if (firstParsed) { result.gmRating = firstParsed.rating; result.gmReviewCount = firstParsed.reviews; }
  await fillResult(result, page, finalUrl);
  return result;
}

async function main() {
  const places = parsePlaces();
  const startIdx = process.argv[2] !== undefined ? +process.argv[2] : 0;
  const endIdx = process.argv[3] !== undefined ? +process.argv[3] : places.length;
  const chunk = places.slice(startIdx, endIdx);
  console.log(`Places ${startIdx}-${endIdx - 1} of ${places.length} (${chunk.length} to scrape)`);

  const raw = loadRaw();
  // KJ_CDP: attach to a real (headed) Chrome via CDP — Google soft-throttles
  // headless Chrome on Maps search (empty result lists, no captcha). Real
  // Chrome auto-redirects to place pages and returns cards normally.
  let browser;
  let context;
  if (process.env.KJ_CDP) {
    browser = await chromium.connectOverCDP(process.env.KJ_CDP);
    context = browser.contexts()[0] ?? await browser.newContext({
      viewport: { width: 1280, height: 800 },
      locale: 'en-US',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
    });
  } else {
    browser = await chromium.launch({
      channel: 'chrome', // uses installed Google Chrome — no download, better bot evasion
      headless: true,
      args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
    });
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      locale: 'en-US',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    });
  }
  const page = await context.newPage();

  let done = 0;
  try {
    for (const [i, place] of chunk.entries()) {
      if (raw[place.id]?.gmRating && raw[place.id]?.photos?.length) {
        console.log(`[skip] ${place.id} (already enriched)`);
        continue;
      }
      console.log(`[${i + 1}/${chunk.length}] ${place.id} — ${place.en}`);
      try {
        const data = await extractFromPage(page, place);
        if (data.blocked) {
          console.log('BLOCKED: captcha/unusual-traffic detected. Progress saved, resume later.');
          saveRaw(raw);
          process.exit(2);
        }
        if (data.error) {
          console.log(`  -> ${data.error}`);
          if (!raw[place.id]?.gmRating) raw[place.id] = { id: place.id, en: place.en, photos: [] };
        } else {
          raw[place.id] = { id: place.id, en: place.en, ...data };
          console.log(`  -> rating=${data.gmRating ?? '-'} reviews=${data.gmReviewCount ?? '-'} photos=${data.photos.length} coords=${data.lat ?? '-'},${data.lng ?? '-'}`);
        }
        saveRaw(raw);
        done++;
      } catch (e) {
        console.error(`  -> error: ${e.message}`);
        raw[place.id] = { id: place.id, en: place.en, photos: [] };
        saveRaw(raw);
      }
      if ((i + 1) % 12 === 0) {
        console.log('  ...pausing 20-40s to avoid rate limits');
        await sleep(jitter(20000, 40000));
      } else {
        await sleep(jitter(4000, 9000));
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`Done. ${done} scraped/updated. Raw output: ${OUT_FILE}`);
}

main().catch(e => { console.error(e); process.exit(1); });
