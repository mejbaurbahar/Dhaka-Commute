#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const file = process.argv[2];

if (!file) {
  console.error('Usage: node scripts/analyze-gsc-blog-opportunities.mjs path/to/gsc-export.csv');
  process.exit(1);
}

const csvPath = path.resolve(file);
const raw = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (quoted && ch === '"' && next === '"') {
      cell += '"';
      i++;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (!quoted && ch === ',') {
      row.push(cell);
      cell = '';
    } else if (!quoted && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && next === '\n') i++;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }

  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function keyFor(headers, candidates) {
  const normalized = headers.map(h => h.trim().toLowerCase());
  for (const candidate of candidates) {
    const idx = normalized.indexOf(candidate);
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function toNumber(value) {
  if (value == null) return 0;
  const cleaned = String(value).replace(/[%,"\s]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function expectedCtr(position) {
  if (position <= 1.5) return 0.28;
  if (position <= 2.5) return 0.15;
  if (position <= 3.5) return 0.10;
  if (position <= 5) return 0.07;
  if (position <= 8) return 0.04;
  if (position <= 10) return 0.025;
  if (position <= 20) return 0.012;
  return 0.005;
}

const rows = parseCsv(raw);
const headers = rows.shift();

const pageKey = keyFor(headers, ['page', 'pages', 'top pages', 'url', 'landing page']);
const clicksKey = keyFor(headers, ['clicks']);
const impressionsKey = keyFor(headers, ['impressions']);
const positionKey = keyFor(headers, ['position', 'average position']);

if (!pageKey || !clicksKey || !impressionsKey || !positionKey) {
  console.error(`Missing required columns. Found: ${headers.join(', ')}`);
  console.error('Need at least Page/URL, Clicks, Impressions, and Position.');
  process.exit(1);
}

const byPage = new Map();

for (const row of rows) {
  const item = Object.fromEntries(headers.map((h, i) => [h, row[i] ?? '']));
  const page = item[pageKey];
  if (!/\/blog(\/|$)/.test(page)) continue;

  const clicks = toNumber(item[clicksKey]);
  const impressions = toNumber(item[impressionsKey]);
  const position = toNumber(item[positionKey]);
  const existing = byPage.get(page) ?? { page, clicks: 0, impressions: 0, weightedPosition: 0 };
  existing.clicks += clicks;
  existing.impressions += impressions;
  existing.weightedPosition += position * Math.max(impressions, 1);
  byPage.set(page, existing);
}

const opportunities = [...byPage.values()]
  .map(item => {
    const ctr = item.impressions ? item.clicks / item.impressions : 0;
    const position = item.weightedPosition / Math.max(item.impressions, 1);
    const targetCtr = expectedCtr(position);
    const missedClicks = Math.max(0, Math.round((targetCtr - ctr) * item.impressions));
    const buckets = [];

    if (item.impressions >= 100 && ctr < targetCtr * 0.65) buckets.push('seen_not_clicked');
    if (item.impressions >= 50 && position >= 8 && position <= 20) buckets.push('striking_distance');
    if (item.impressions >= 100 && position <= 5 && ctr < targetCtr * 0.75) buckets.push('ranking_leaking_clicks');

    return {
      ...item,
      ctr,
      position,
      targetCtr,
      missedClicks,
      buckets,
      opportunityScore: missedClicks + (position >= 8 && position <= 20 ? item.impressions * 0.02 : 0),
    };
  })
  .filter(item => item.buckets.length)
  .sort((a, b) => b.opportunityScore - a.opportunityScore);

const outDir = path.join(path.dirname(csvPath), 'gsc-opportunities');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'blog-opportunities.csv');

const outputHeaders = ['bucket', 'page', 'clicks', 'impressions', 'ctr', 'position', 'expectedCtr', 'missedClicks', 'recommendedFix'];
const fixes = {
  seen_not_clicked: 'Rewrite title for clearer benefit, number, freshness, or Bangladesh-specific intent.',
  striking_distance: 'Add/strengthen H2 for target query, improve intro, add internal links from related pages.',
  ranking_leaking_clicks: 'Rewrite meta description and title promise to match search intent.',
};

const lines = [
  outputHeaders.join(','),
  ...opportunities.map(item => [
    item.buckets.join('|'),
    item.page,
    item.clicks,
    item.impressions,
    `${(item.ctr * 100).toFixed(2)}%`,
    item.position.toFixed(1),
    `${(item.targetCtr * 100).toFixed(2)}%`,
    item.missedClicks,
    item.buckets.map(b => fixes[b]).join(' '),
  ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')),
];

fs.writeFileSync(outFile, `${lines.join('\n')}\n`, 'utf8');

console.log(`Analyzed ${byPage.size} blog pages from ${csvPath}`);
console.log(`Found ${opportunities.length} optimization opportunities`);
console.log(`Wrote ${outFile}`);
console.table(opportunities.slice(0, 12).map(item => ({
  bucket: item.buckets.join('|'),
  page: item.page.replace(/^https?:\/\/[^/]+/, ''),
  clicks: item.clicks,
  impressions: item.impressions,
  ctr: `${(item.ctr * 100).toFixed(2)}%`,
  position: item.position.toFixed(1),
  missedClicks: item.missedClicks,
})));
