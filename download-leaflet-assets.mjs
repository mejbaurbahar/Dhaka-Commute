
import fs from 'fs';
import https from 'https';
import path from 'path';

const files = [
    { name: 'marker-icon.png', url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' },
    { name: 'marker-icon-2x.png', url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png' },
    { name: 'marker-shadow.png', url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png' }
];

const dest = path.join(process.cwd(), 'public', 'images', 'leaflet');

files.forEach(file => {
    const fileStream = fs.createWriteStream(path.join(dest, file.name));
    https.get(file.url, (response) => {
        response.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${file.name}`);
        });
    });
});
