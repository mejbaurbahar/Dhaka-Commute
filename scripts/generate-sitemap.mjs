/**
 * Generates public/sitemap.xml with entries for every bus route and train route.
 * Run: node scripts/generate-sitemap.mjs
 * Integrated into the build via package.json "build" script.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BUS_PAIRS, INTERCHANGE_PAIRS, pairPath, interchangePath } from './bus-pairs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const TODAY = new Date().toISOString().split('T')[0];
const BASE = 'https://koyjabo.com';

// Must mirror App.tsx slugify() exactly
function slugify(value) {
  return (value || '')
    .toLowerCase()
    .replace(/paribahan/g, '')
    .replace(/&/g, ' and ')
    .normalize('NFKD')
    .replace(/[^\w\sঀ-৿-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractBusSlugs() {
  const content = fs.readFileSync(path.join(root, 'constants.ts'), 'utf8');
  const start = content.indexOf('export const BUS_DATA');
  if (start === -1) return [];
  // Find the closing of the BUS_DATA array (next top-level export)
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport const ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;

  const slugs = new Set();
  // Match id + name pairs within each bus object
  for (const m of bounded.matchAll(/id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'/g)) {
    const slug = slugify(m[2] || m[1]);
    if (slug) slugs.add(slug);
  }
  return [...slugs];
}

function extractTrainSlugs() {
  const content = fs.readFileSync(path.join(root, 'data', 'bangladeshTrainData.ts'), 'utf8');
  const start = content.indexOf('export const BD_TRAIN_ROUTES');
  if (start === -1) return [];
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport const ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;

  const slugs = new Set();
  for (const m of bounded.matchAll(/id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'/g)) {
    const slug = slugify(m[2] || m[1]);
    if (slug) slugs.add(slug);
  }
  return [...slugs];
}

function extractOperatorSlugs() {
  // Intercity detail pages: /intercity/<name-slug> (canonical built from op.name).
  // Only top-level operator objects (they carry a shortName field) — stop names
  // also match `name: '...'`, so anchor on the id→name→bnName→shortName sequence.
  const content = fs.readFileSync(path.join(root, 'data', 'intercityOperatorData.ts'), 'utf8');
  const slugs = new Set();
  for (const m of content.matchAll(/id:\s*'[^']+'\s*,\s*name:\s*'([^']+)'\s*,\s*bnName:\s*'[^']+'\s*,\s*shortName:\s*'[^']+'/g)) {
    const slug = slugify(m[1]);
    if (slug) slugs.add(slug);
  }
  return [...slugs];
}

function extractBlogSlugs() {
  const content = fs.readFileSync(path.join(root, 'data', 'blogPosts.ts'), 'utf8');
  const slugs = [];
  const dates = [];
  for (const m of content.matchAll(/slug:\s*'([^']+)'/g)) {
    slugs.push(m[1]);
  }
  for (const m of content.matchAll(/publishDate:\s*'([^']+)'/g)) {
    dates.push(m[1]);
  }
  return slugs.map((slug, i) => ({ slug, date: dates[i] || TODAY }));
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function pageUrl(pathname) {
  const path = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  return `${BASE}${path}`;
}

const busSlugs = extractBusSlugs();
const trainSlugs = extractTrainSlugs();
const operatorSlugs = extractOperatorSlugs();
const blogEntries = extractBlogSlugs();

console.log(`Extracted ${busSlugs.length} bus slugs, ${trainSlugs.length} train slugs, ${operatorSlugs.length} operator slugs, ${blogEntries.length} blog entries`);

// Truthful lastmod: a file's mtime is when its content last changed, not "today"
function fileLastmod(file) {
  try {
    const st = fs.statSync(path.join(root, file));
    return st.mtime.toISOString().split('T')[0];
  } catch {
    return TODAY;
  }
}

const staticPages = [
  urlEntry(pageUrl('/'), TODAY, 'daily', '1.0'),
  urlEntry(pageUrl('/intercity'), TODAY, 'daily', '0.9'),
  urlEntry(pageUrl('/ai'), TODAY, 'weekly', '0.8'),
  urlEntry(pageUrl('/blog'), TODAY, 'daily', '0.8'),
  urlEntry(pageUrl('/why'), TODAY, 'monthly', '0.6'),
  urlEntry(pageUrl('/about'), TODAY, 'monthly', '0.7'),
  urlEntry(pageUrl('/qa'), TODAY, 'monthly', '0.6'),
  urlEntry(pageUrl('/faq'), TODAY, 'monthly', '0.7'),
  urlEntry(pageUrl('/daily-journey'), TODAY, 'weekly', '0.6'),
  urlEntry(pageUrl('/release'), TODAY, 'monthly', '0.4'),
  urlEntry(pageUrl('/privacy'), TODAY, 'monthly', '0.5'),
  urlEntry(pageUrl('/terms'), TODAY, 'monthly', '0.5'),
  urlEntry(pageUrl('/contact'), TODAY, 'monthly', '0.5'),
  urlEntry(pageUrl('/install'), TODAY, 'monthly', '0.4'),
  urlEntry(pageUrl('/history'), TODAY, 'monthly', '0.4'),
  urlEntry(pageUrl('/train'), TODAY, 'weekly', '0.8'),
  urlEntry(pageUrl('/local-bus'), TODAY, 'weekly', '0.8'),
  urlEntry(pageUrl('/metro'), TODAY, 'weekly', '0.8'),
  urlEntry(pageUrl('/launch'), TODAY, 'weekly', '0.7'),
  urlEntry(pageUrl('/air'), TODAY, 'weekly', '0.7'),
  urlEntry(pageUrl('/truck'), TODAY, 'weekly', '0.7'),
  urlEntry(pageUrl('/advertise'), TODAY, 'monthly', '0.5'),
  urlEntry(pageUrl('/fare'), TODAY, 'monthly', '0.6'),
  urlEntry(pageUrl('/discover'), TODAY, 'weekly', '0.8'),
  urlEntry(pageUrl('/itinerary'), TODAY, 'weekly', '0.7'),
];

// Destination detail pages: /places/<slug>/ from bangladeshPlaces.ts (tourist/historical/landmark only)
const destEntries = [];
{
  const content = fs.readFileSync(path.join(root, 'data', 'bangladeshPlaces.ts'), 'utf8');
  // Order-tolerant: parse each `{ id: ..., ... type: ... }` block separately,
  // because fields (district/division/desc) appear in varying order between id and type.
  const blockRe = /{([^{}]*)}/g;
  let m;
  while ((m = blockRe.exec(content)) !== null) {
    const block = m[1];
    const idM = block.match(/id:\s*'([^']+)'/);
    const typeM = block.match(/type:\s*'(tourist|historical|landmark)'/);
    if (!idM || !typeM) continue;
    const enM = block.match(/en:\s*(?:'([^']+)'|"([^"]+)")/);
    // Drop apostrophes first (matches the app's destSlug): coxs-bazar-beach, not cox-s-bazar-beach.
    const slug = slugify(enM ? (enM[1] || enM[2]) : idM[1]).replace(/['’]/g, '').replace(/-+/g, '-');
    destEntries.push(urlEntry(pageUrl(`/places/${slug}/`), fileLastmod('data/bangladeshPlaces.ts'), 'weekly', '0.7'));
  }
}
console.log(`... plus ${destEntries.length} destination pages`);

const blogPages = blogEntries.map(({ slug, date }) =>
  urlEntry(pageUrl(`/blog/${slug}`), date, 'monthly', '0.8')
);

const busPages = busSlugs.map(slug =>
  urlEntry(pageUrl(`/bus/${slug}`), fileLastmod('constants.ts'), 'monthly', '0.7')
);

const trainPages = trainSlugs.map(slug =>
  urlEntry(pageUrl(`/train/${slug}`), fileLastmod('data/bangladeshTrainData.ts'), 'monthly', '0.7')
);

const operatorPages = operatorSlugs.map(slug =>
  urlEntry(pageUrl(`/intercity/${slug}`), fileLastmod('data/intercityOperatorData.ts'), 'monthly', '0.7')
);

const fromToPages = BUS_PAIRS.map(pair =>
  urlEntry(pageUrl(pairPath(pair)), TODAY, 'weekly', '0.8')
);

const interchangePages = INTERCHANGE_PAIRS.map(pair =>
  urlEntry(pageUrl(interchangePath(pair)), TODAY, 'weekly', '0.7')
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  '  <!-- Main Pages -->',
  ...staticPages,
  '',
  '  <!-- Blog Posts -->',
  ...blogPages,
  '',
  `  <!-- Bus Routes (${busPages.length}) -->`,
  ...busPages,
  '',
  `  <!-- Train Routes (${trainPages.length}) -->`,
  ...trainPages,
  '',
  `  <!-- Intercity Operators (${operatorPages.length}) -->`,
  ...operatorPages,
  '',
  `  <!-- From→To Bus Answers (${fromToPages.length}) -->`,
  ...fromToPages,
  '',
  `  <!-- Interchange Routes (${interchangePages.length}) -->`,
  ...interchangePages,
  '',
  `  <!-- Destinations (${destEntries.length}) -->`,
  ...destEntries,
  '',
  '</urlset>',
].join('\n');

const out = path.join(root, 'public', 'sitemap.xml');
fs.writeFileSync(out, xml, 'utf8');
console.log(`✅ sitemap.xml written — ${staticPages.length} static, ${blogPages.length} blog, ${busPages.length} bus, ${trainPages.length} train, ${operatorPages.length} operator, ${destEntries.length} destination entries`);

// Generate /version.json — used by main.tsx to detect new deploys and
// silently reload long-lived tabs (no manual hard-refresh needed).
// androidVersionCode must be bumped to the Play Store release versionCode
// whenever a new Android build is published (see android/app/build.gradle).
const versionOut = path.join(root, 'public', 'version.json');
const buildVersion = process.env.BUILD_VERSION || `${Date.now()}`;
const androidVersionCode = Number(process.env.ANDROID_VERSION_CODE || 27);
fs.writeFileSync(versionOut, JSON.stringify({ version: buildVersion, builtAt: new Date().toISOString(), androidVersionCode }, null, 2), 'utf8');
console.log(`✅ version.json written — ${buildVersion} (androidVersionCode ${androidVersionCode})`);
