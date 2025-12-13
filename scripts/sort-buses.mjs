import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the constants.ts file
const constantsPath = path.join(__dirname, '..', 'constants.ts');
const content = fs.readFileSync(constantsPath, 'utf8');

// Find the BUS_DATA array
const busDataStart = content.indexOf('export const BUS_DATA: BusRoute[] = [');
const busDataEnd = content.indexOf('];', busDataStart) + 2;

if (busDataStart === -1 || busDataEnd === -1) {
    console.error('Could not find BUS_DATA array');
    process.exit(1);
}

const beforeBusData = content.substring(0, busDataStart);
const busDataContent = content.substring(busDataStart, busDataEnd);
const afterBusData = content.substring(busDataEnd);

// Extract individual bus objects
const busMatches = busDataContent.matchAll(/\{\s*id:\s*'[^']+',[\s\S]*?\},(?=\s*(?:\{|];))/g);
const buses = Array.from(busMatches).map(match => match[0]);

// Parse bus names for sorting
const busesWithNames = buses.map(busStr => {
    const nameMatch = busStr.match(/name:\s*'([^']+)'/);
    const name = nameMatch ? nameMatch[1] : '';
    return { text: busStr, name: name };
});

// Sort alphabetically by name (case-insensitive)
busesWithNames.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

// Reconstruct the BUS_DATA array
const sortedBuses = busesWithNames.map(b => b.text).join('\n  ');
const newBusData = `export const BUS_DATA: BusRoute[] = [\n  ${sortedBuses}\n];`;

// Write back to file
const newContent = beforeBusData + newBusData + afterBusData;
fs.writeFileSync(constantsPath, newContent, 'utf8');

console.log(`✅ Sorted ${busesWithNames.length} buses alphabetically!`);
console.log('\nFirst 10 buses:');
busesWithNames.slice(0, 10).forEach((b, i) => {
    console.log(`  ${i + 1}. ${b.name}`);
});
