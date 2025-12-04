import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const source = join(__dirname, 'intercity', 'dist');
const destination = join(__dirname, 'dist', 'intercity');

try {
    // Ensure the destination parent directory exists
    const destParent = dirname(destination);
    if (!existsSync(destParent)) {
        mkdirSync(destParent, { recursive: true });
    }

    // Copy the directory
    console.log(`Copying ${source} to ${destination}...`);
    cpSync(source, destination, { recursive: true });
    console.log('✓ Intercity build copied successfully!');
} catch (error) {
    console.error('Error copying intercity build:', error);
    process.exit(1);
}
