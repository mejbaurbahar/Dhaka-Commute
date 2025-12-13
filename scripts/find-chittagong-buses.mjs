import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const constantsPath = path.join(__dirname, '..', 'constants.ts');
const content = fs.readFileSync(constantsPath, 'utf8');

const busDataStart = content.indexOf('export const BUS_DATA: BusRoute[] = [');
// Use a safe end marker or just read until end of file if needed
const busDataEnd = content.indexOf('export const METRO_STATIONS', busDataStart);

const busDataContent = content.substring(busDataStart, busDataEnd > 0 ? busDataEnd : content.length);

const busMatches = busDataContent.matchAll(/\{\s*id:\s*'([^']+)',[\s\S]*?stops:\s*\[([\s\S]*?)\][\s\S]*?\}/g);

console.log("Buses going to Chittagong Road:");
for (const match of busMatches) {
    const id = match[1];
    const stops = match[2];
    if (stops.includes('chittagong_road') || stops.includes('signboard')) {
        console.log(`\nBUS: ${id}`);
        // Clean up stops string
        const cleanStops = stops.replace(/'/g, '').replace(/\s+/g, '').split(',');
        console.log(`Stops count: ${cleanStops.length}`);
        console.log(`Last 5 stops: ${cleanStops.slice(-5).join(', ')}`);
    }
}
