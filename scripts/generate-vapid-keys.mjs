/**
 * Generate a VAPID keypair for Web Push (RFC 8292).
 *
 *   node scripts/generate-vapid-keys.mjs
 *
 * Prints PUBLIC_KEY (safe to embed in app code — it's public) and
 * PRIVATE_KEY (SECRET — store only in .env / wrangler secrets, never commit).
 */
import { generateKeyPairSync } from 'node:crypto';

function urlBase64(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

const { publicKey, privateKey } = generateKeyPairSync('ec', {
  namedCurve: 'prime256v1',
});

// Public key in uncompressed point format (65 bytes: 0x04 || X || Y)
const pubJwk = publicKey.export({ format: 'jwk' });
const x = Buffer.from(pubJwk.x, 'base64url');
const y = Buffer.from(pubJwk.y, 'base64url');
const uncompressed = Buffer.concat([Buffer.from([0x04]), x, y]);

// Private key raw bytes (32 bytes)
const privJwk = privateKey.export({ format: 'jwk' });
const privRaw = Buffer.from(privJwk.d, 'base64url');

console.log('PUBLIC_KEY=' + urlBase64(uncompressed));
console.log('PRIVATE_KEY=' + urlBase64(privRaw));
console.log('');
console.log('public  → src/services/pushService.ts  (VAPID_PUBLIC_KEY const, safe to commit)');
console.log('private → worker secret VAPID_PRIVATE_KEY (wrangler secret put — NEVER commit)');
