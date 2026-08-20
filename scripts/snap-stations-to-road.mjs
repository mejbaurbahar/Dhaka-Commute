/**
 * Snaps all STATIONS coordinates in constants.ts to the nearest drivable road
 * using the public OSRM nearest API.
 *
 * Usage: node scripts/snap-stations-to-road.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dir, '..', 'constants.ts');
const OSRM = 'https://router.project-osrm.org/nearest/v1/driving';
const MAX_SNAP_M = 150; // skip snapping if nearest road > 150m (data likely intentional)
const DELAY_MS = 120;   // be polite to public OSRM server

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function snapOne(lng, lat) {
  const url = `${OSRM}/${lng},${lat}?number=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const json = await res.json();
  const wp = json.waypoints?.[0];
  if (!wp || wp.distance > MAX_SNAP_M) return null;
  return { lat: wp.location[1], lng: wp.location[0], dist: wp.distance };
}

// Extract all lat/lng pairs from constants.ts using regex
// Pattern: id: 'xxx', ... lat: 23.xxx, lng: 90.xxx
// We match each STATION entry's lat and lng
const src = readFileSync(SRC, 'utf8');

// Find all occurrences of lat: X, lng: Y in object literals
const LAT_LNG_RE = /\blat:\s*([\d.]+),\s*lng:\s*([\d.]+)/g;

let match;
const patches = []; // { start, end, oldLat, oldLng }
while ((match = LAT_LNG_RE.exec(src)) !== null) {
  patches.push({
    start: match.index,
    end: match.index + match[0].length,
    oldLat: parseFloat(match[1]),
    oldLng: parseFloat(match[2]),
    origText: match[0],
  });
}

console.log(`Found ${patches.length} lat/lng pairs to check`);

// Deduplicate by coordinate to avoid calling same point twice
const seen = new Map(); // "lat,lng" -> snapped
let updated = 0, skipped = 0, unchanged = 0;

for (let i = 0; i < patches.length; i++) {
  const p = patches[i];
  const key = `${p.oldLat},${p.oldLng}`;
  if (!seen.has(key)) {
    try {
      const snapped = await snapOne(p.oldLng, p.oldLat);
      seen.set(key, snapped);
      if (snapped) {
        const dLat = Math.abs(snapped.lat - p.oldLat);
        const dLng = Math.abs(snapped.lng - p.oldLng);
        if (dLat < 0.000001 && dLng < 0.000001) {
          seen.set(key, null); // effectively no change
        }
      }
    } catch (e) {
      console.error(`  ERROR at [${p.oldLat},${p.oldLng}]: ${e.message}`);
      seen.set(key, null);
    }
    await sleep(DELAY_MS);
  }

  const snapped = seen.get(key);
  if (snapped) {
    const newText = `lat: ${snapped.lat.toFixed(6)}, lng: ${snapped.lng.toFixed(6)}`;
    patches[i].newText = newText;
    patches[i].dist = snapped.dist;
    updated++;
    if ((updated % 20) === 0) console.log(`  ${i+1}/${patches.length} — ${updated} updated`);
  } else {
    patches[i].newText = null;
    unchanged++;
  }
}

// Apply patches in reverse order so offsets stay valid
const sorted = patches.slice().sort((a, b) => b.start - a.start);
let result = src;
for (const p of sorted) {
  if (!p.newText) continue;
  result = result.slice(0, p.start) + p.newText + result.slice(p.end);
}

writeFileSync(SRC, result, 'utf8');
console.log(`\nDone. ${updated} snapped, ${unchanged} unchanged, ${skipped} skipped (>150m)`);
console.log('Largest snaps:');
patches
  .filter(p => p.newText && p.dist > 5)
  .sort((a, b) => b.dist - a.dist)
  .slice(0, 15)
  .forEach(p => console.log(`  [${p.oldLat},${p.oldLng}] → ${p.dist.toFixed(1)}m`));
