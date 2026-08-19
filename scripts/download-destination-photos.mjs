// Downloads all destination photos locally (public/destination-photos/) so the
// app never depends on short-lived googleusercontent gps-cs-s URLs (they
// expire and Chrome gets 400s). Rewrites destinationEnrichment.ts in place.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data/destinationEnrichment.ts');
const OUT = join(ROOT, 'public/destination-photos');
mkdirSync(OUT, { recursive: true });

const src = readFileSync(DATA, 'utf8');
const urlRe = /https:\/\/lh3\.googleusercontent\.com\/gps-cs-s\/[A-Za-z0-9_-]+(?:=w\d+(?:-h\d+)?)?(?:-(?:p-)?k-no)?(?:-pi-?[\d.]+-ya[\d.]+-ro-?[\d.]+-fo[\d.]+)?/g;
const urls = [...new Set(src.match(urlRe) || [])];
console.log(`unique photos: ${urls.length}`);

const hash = (u) => {
  let h = 0;
  for (const c of u) h = (h * 31 + c.charCodeAt(0)) | 0;
  return (h >>> 0).toString(36);
};

let ok = 0, fail = 0;
const map = {};
for (const u of urls) {
  const name = `${hash(u)}.jpg`;
  const dest = join(OUT, name);
  if (!existsSync(dest)) {
    try {
      execSync(`curl -s -o "${dest}" -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36" -e "https://www.google.com/" --max-time 20 "${u}"`, { timeout: 30000 });
      const size = existsSync(dest) ? execSync(`wc -c < "${dest}"`).toString().trim() : '0';
      if (+size < 1000) { execSync(`rm -f "${dest}"`); throw new Error('too small'); }
      ok++;
    } catch (e) { fail++; continue; }
  } else ok++;
  map[u] = `/destination-photos/${name}`;
}
console.log(`downloaded ok=${ok} fail=${fail}`);

const out = src.replace(urlRe, (u) => map[u] || u);
writeFileSync(DATA, out);
console.log(`rewritten ${DATA} — ${Object.keys(map).length} local paths`);
