import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const constantsPath = path.join(__dirname, '..', 'constants.ts');
const content = fs.readFileSync(constantsPath, 'utf8');

const matches = content.matchAll(/name:\s*'([^']+)'/g);
const buses = [];
for (const m of matches) {
    buses.push(m[1]);
}

console.log(`Found ${buses.length} buses.`);
console.log(buses.sort().join('\n'));
