/**
 * Applies OSM-verified coordinates to specific STATIONS in constants.ts.
 * Each correction is sourced from OpenStreetMap Overpass API data.
 * Only applies corrections where the OSM position is verified and differs
 * significantly from the current (OSRM-snapped) value.
 *
 * Usage: node scripts/apply-osm-corrections.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dir, '..', 'constants.ts');

// OSM-verified corrections: { id, lat, lng, osmNode, distM (approx meters from current) }
// Only includes stops where OSM data clearly places the stop in a different position.
const CORRECTIONS = [
  // Signboard (~2km longitude error — was placed west of Chittagong road)
  { id: 'signboard',     lat: 23.693583, lng: 90.480441, osmNode: 6119642723, distM: 2100 },
  // Pagla (~2.4km — was placed in Fatullah, actual stop is on Narayanganj Rd)
  { id: 'pagla',         lat: 23.660968, lng: 90.456800, osmNode: 5197389431, distM: 2400 },
  // Kanchpur (~1.3km — Kanchpur bridge bus stand further east)
  { id: 'kanchpur',      lat: 23.705841, lng: 90.521740, osmNode: 5116388691, distM: 1300 },
  // Shanir Akhra (~900m — actual stop further east on Chittagong road)
  { id: 'shanir_akhra',  lat: 23.702873, lng: 90.450406, osmNode: 3522844764, distM: 900 },
  // Motijheel (~730m — official Motijheel Jatri Chauni shelter position)
  { id: 'motijheel',     lat: 23.727400, lng: 90.421947, osmNode: 6988065952, distM: 730 },
  // Narayanganj (~700m — verified bus terminal position)
  { id: 'narayanganj',   lat: 23.616908, lng: 90.505384, osmNode: 5195481519, distM: 700 },
  // Savar (~840m — Savar bus stand on Dhaka-Aricha highway)
  { id: 'savar',         lat: 23.847126, lng: 90.260232, osmNode: 640446972,  distM: 840 },
  // Abdullahpur (~770m — actual stop west of Uttara, not east)
  { id: 'abdullahpur',   lat: 23.879679, lng: 90.392514, osmNode: 4737692732, distM: 770 },
  // Airport (~550m — Hazrat Shahjalal terminal entry point)
  { id: 'airport',       lat: 23.851601, lng: 90.407337, osmNode: 3572490148, distM: 550 },
  // Postagola (~340m)
  { id: 'postagola',     lat: 23.692086, lng: 90.432528, osmNode: 4462332797, distM: 340 },
  // Gulistan (~530m lat — terminal area south of current position)
  { id: 'gulistan',      lat: 23.722767, lng: 90.411873, osmNode: 0,          distM: 530 },
  // Kalabagan (~310m)
  { id: 'kalabagan',     lat: 23.747662, lng: 90.380398, osmNode: 5733123126, distM: 310 },
  // Fulbaria (~210m)
  { id: 'fulbaria',      lat: 23.722795, lng: 90.410336, osmNode: 4907273834, distM: 210 },
  // Demra (~255m)
  { id: 'demra',         lat: 23.720269, lng: 90.493284, osmNode: 5217577838, distM: 255 },
  // Hemayetpur (~120m — more precise OSM bus stop node)
  { id: 'hemayetpur',    lat: 23.793368, lng: 90.271220, osmNode: 5238881879, distM: 120 },
  // Gabtoli (~115m)
  { id: 'gabtoli',       lat: 23.783075, lng: 90.345265, osmNode: 5498025624, distM: 115 },
];

const src = readFileSync(SRC, 'utf8');
let result = src;
let applied = 0;

for (const c of CORRECTIONS) {
  // Match the station line by its id field, then replace lat/lng values
  // Pattern: 'id': { id: 'id', name: '...', bnName: '...', lat: OLD, lng: OLD }
  // We use a regex that captures the id prefix and replaces lat/lng
  const re = new RegExp(
    `('${c.id}':\\s*\\{[^}]*lat:\\s*)[\\d.]+,\\s*(lng:\\s*)[\\d.]+`,
    'g'
  );
  const newSrc = result.replace(re, (_, latPre, lngPre) => {
    return `${latPre}${c.lat}, ${lngPre}${c.lng}`;
  });
  if (newSrc === result) {
    console.warn(`  SKIP (no match): ${c.id}`);
    continue;
  }
  console.log(`  ✓ ${c.id}: ~${c.distM}m correction (OSM node ${c.osmNode || 'manual'})`);
  result = newSrc;
  applied++;
}

writeFileSync(SRC, result, 'utf8');
console.log(`\nDone. ${applied}/${CORRECTIONS.length} corrections applied.`);
