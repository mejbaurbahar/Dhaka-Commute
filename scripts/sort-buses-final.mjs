import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const constantsPath = path.join(__dirname, '..', 'constants.ts');
const content = fs.readFileSync(constantsPath, 'utf8');

const busDataStart = content.indexOf('export const BUS_DATA: BusRoute[] = [');
const busDataEnd = content.indexOf('export const METRO_STATIONS', busDataStart);
const busDataContent = content.substring(busDataStart, busDataEnd > 0 ? busDataEnd : content.length);

const busMatches = busDataContent.matchAll(/\{\s*id:\s*'([^']+)',[\s\S]*?\},(?=\s*(?:\{|];))/g);
// Note: regex matches object ending with }, followed by { or ];
// We must handle the last item carefully or trailing comments.

// Simpler approach: Extract all blocks
const buses = [];
const regex = /\{\s*id:\s*'([^']+)',[\s\S]*?\}(?=\s*,|\s*];)/g;
// Actually, let's just find each object by counting braces if regex is hard?
// Or trust the previous script logic which worked.

// Previous logic was:
// const busMatches = busDataContent.matchAll(/\{\s*id:\s*'[^']+',[\s\S]*?\},(?=\s*(?:\{|];))/g);
// But previously `BUS_DATA` was cleaner. Now I have comments between buses.
// Comments will be LOST if I extract only objects.

// If I sort, I lose the grouping comments (e.g. // ===== MAWA ROUTE BUSES =====).
// This is acceptable if we want strict A-Z.
// If we want to keep comments, we shouldn't sort A-Z.
// But user ASKED "All Buses make bus name like A to Z format".
// So strict A-Z is priority. Comments can go.

const matches = busDataContent.matchAll(/(\{\s*id:\s*'[^']+',[\s\S]*?\})(?:,\s*|\s*)/g);
const busObjects = [];
for (const m of matches) {
    busObjects.push(m[1]);
}

// Parse names
const busesWithNames = busObjects.map(busStr => {
    const nameMatch = busStr.match(/name:\s*'([^']+)'/);
    const name = nameMatch ? nameMatch[1] : '';
    return { text: busStr, name: name };
});

busesWithNames.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const sortedBuses = busesWithNames.map(b => b.text).join(',\n  ');
const newBusData = `export const BUS_DATA: BusRoute[] = [\n  ${sortedBuses}\n];\n\n`;

const newContent = content.substring(0, busDataStart) + newBusData + content.substring(busDataEnd > 0 ? busDataEnd : content.length);

fs.writeFileSync(constantsPath, newContent, 'utf8');
console.log(`Sorted ${busesWithNames.length} buses.`);
