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

const busMatches = busDataContent.matchAll(/\{\s*id:\s*'([^']+)',[\s\S]*?routeString:\s*'([^']+)',[\s\S]*?stops:\s*\[([\s\S]*?)\][\s\S]*?\}/g);

console.log("=== TARGETED CORRIDOR ANALYSIS ===\n");

const corridors = {
    'Narayanganj': ['narayanganj', 'chashara', 'link_road', 'shibu_market'],
    'Mawa': ['mawa', 'maowa', 'sreenagar', 'kuchimura', 'ilish']
};

for (const match of busMatches) {
    const id = match[1];
    const routeString = match[2];
    const stopsStr = match[3].replace(/'/g, '').replace(/\s+/g, '');
    const stops = stopsStr.split(',').filter(s => s.length > 0);

    for (const [corridor, keywords] of Object.entries(corridors)) {
        const isRelevant = keywords.some(k => stops.includes(k) || routeString.toLowerCase().includes(k) || routeString.toLowerCase().includes(corridor.toLowerCase()) || id.includes(k));

        if (isRelevant) {
            console.log(`[${corridor}] Bus: ${id}`);
            console.log(`  Route: ${routeString}`);
            console.log(`  Stops: ${stops.join(', ')}`);

            if (corridor === 'Narayanganj') {
                const missing = [];
                if (!stops.includes('signboard')) missing.push('signboard');
                if (!stops.includes('chashara')) missing.push('chashara');
                if (!stops.includes('shibu_market')) missing.push('shibu_market');
                if (missing.length > 0) console.log(`  ⚠️  Missing: ${missing.join(', ')}`);
            }
            if (corridor === 'Mawa') {
                const missing = [];
                if (!stops.includes('jurain')) missing.push('jurain');
                if (!stops.includes('postagola')) missing.push('postagola');
                if (!stops.includes('kuchimura')) missing.push('kuchimura');
                if (!stops.includes('sreenagar')) missing.push('sreenagar');
                if (missing.length > 0) console.log(`  ⚠️  Missing: ${missing.join(', ')}`);
            }
            console.log('');
        }
    }
}
