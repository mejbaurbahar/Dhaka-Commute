/**
 * copy-intercity.mjs
 * Copies the built intercity sub-app from intercity/dist into the main dist/intercity folder.
 * Runs after both the intercity and main vite builds complete.
 */

import { cpSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const intercityDist = join(__dirname, 'intercity', 'dist');
const mainDistIntercity = join(__dirname, 'dist', 'intercity');

if (!existsSync(intercityDist)) {
  console.error(`❌ intercity/dist not found at: ${intercityDist}`);
  console.error('   Did the intercity build succeed?');
  process.exit(1);
}

mkdirSync(mainDistIntercity, { recursive: true });

cpSync(intercityDist, mainDistIntercity, { recursive: true });

console.log('✅ Intercity build copied to dist/intercity/');
