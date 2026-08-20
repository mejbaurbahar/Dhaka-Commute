/**
 * Analyzes dhakatc_all_routes.json against STATIONS in constants.ts.
 * Outputs:
 *  1. All unique stop names from dhakatc (sorted)
 *  2. Which ones match STATIONS IDs (by normalized name)
 *  3. Which ones are unmatched (potential missing stops)
 *  4. Which STATIONS IDs are used in routes vs what dhakatc uses
 *
 * Usage: node scripts/analyze-dhakatc-stops.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));

const routes = JSON.parse(readFileSync(join(__dir, '..', 'dhakatc_all_routes.json'), 'utf8'));
const src = readFileSync(join(__dir, '..', 'constants.ts'), 'utf8');

// Extract all station IDs and names from constants.ts
const stationRe = /['"]([a-z0-9_]+)['"]:\s*\{\s*id:\s*['"][^'"]+['"],\s*name:\s*'([^']+)'/g;
const stations = {};
let m;
while ((m = stationRe.exec(src)) !== null) {
  stations[m[1]] = m[2]; // id -> name
}

// Build a normalize function
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[–—\-]/g, ' ')   // dashes to space
    .replace(/[^a-z0-9\s]/g, '')          // remove non-alphanumeric
    .replace(/\s+/g, ' ')
    .trim()
    // normalize common variants
    .replace(/\bst quarter\b/, 'staff quarter')
    .replace(/\bbazaar\b/, 'bazar')
    .replace(/\bbishwa road\b/, '')
    .replace(/\bkuril\b/, 'kuril')
    .replace(/\bjashimuddin\b/, 'jashimuddin')
    .replace(/\bsony cinema hall\b/, 'sony cinema')
    .replace(/\bsony hall\b/, 'sony cinema')
    .replace(/\bgolshan\b/, 'gulshan')
    .replace(/\bmalibag\b/, 'malibagh')
    .replace(/\bshonir akhra\b/, 'shanir akhra')
    .replace(/\bsayapabad\b/, 'sayedabad')
    .replace(/\bsaidabad\b/, 'sayedabad')
    .replace(/\bjanapoth\b/, 'janapath')
    .replace(/\bshishu mela\b/, 'shishu_mela')
    .replace(/\s+/g, ' ')
    .trim();
}

// Build reverse lookup: normalized name -> id
const nameToId = {};
for (const [id, name] of Object.entries(stations)) {
  nameToId[norm(name)] = id;
}

// Also add normalized IDs themselves as lookup
for (const id of Object.keys(stations)) {
  const idNorm = id.replace(/_/g, ' ');
  if (!nameToId[idNorm]) nameToId[idNorm] = id;
}

// Gather all unique stop names from routes
const stopSet = new Set();
for (const r of routes) {
  for (const s of (r.stops || [])) {
    stopSet.add(s.trim());
  }
}

const allStops = Array.from(stopSet).sort();
console.log(`\nTotal unique stops in dhakatc: ${allStops.length}\n`);

const matched = [];
const unmatched = [];

for (const stop of allStops) {
  const n = norm(stop);
  const id = nameToId[n];
  if (id) {
    matched.push({ stop, id, stationName: stations[id] });
  } else {
    // Try partial matches
    let partialId = null;
    for (const [nid, sid] of Object.entries(nameToId)) {
      if (n.length > 4 && (nid.includes(n) || n.includes(nid))) {
        partialId = sid;
        break;
      }
    }
    unmatched.push({ stop, norm: n, suggestedId: partialId });
  }
}

console.log(`=== MATCHED (${matched.length}) ===`);
for (const m of matched) {
  if (m.stationName !== m.stop) {
    console.log(`  "${m.stop}" → ${m.id} (name: "${m.stationName}")`);
  }
}

console.log(`\n=== UNMATCHED (${unmatched.length}) — potential missing stops ===`);
for (const u of unmatched) {
  console.log(`  "${u.stop}" [${u.norm}]${u.suggestedId ? ` → maybe: ${u.suggestedId}` : ''}`);
}

// Show which routes reference unmatched stops
console.log('\n=== ROUTES WITH UNMATCHED STOPS ===');
for (const r of routes) {
  const bad = (r.stops || []).filter(s => unmatched.some(u => u.stop === s.trim()));
  if (bad.length) {
    console.log(`  #${r.id} ${r.operator}: [${bad.join(', ')}]`);
  }
}
