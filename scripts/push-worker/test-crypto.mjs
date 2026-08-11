/**
 * RFC 8291/8292/8188 crypto roundtrip test — run BEFORE deploying:
 *
 *   node scripts/push-worker/test-crypto.mjs
 *
 * Verifies: (1) the worker's encrypt path produces a message the receive-side
 * derivation (what a browser does) can decrypt; (2) the VAPID JWT signature is
 * valid DER-encoded ES256. Self-contained — generates its own throwaway keys.
 * Returns exit code 1 on failure.
 */
import { webcrypto as crypto } from 'node:crypto';
import { generateKeyPairSync, createPublicKey, verify as rsVerify } from 'node:crypto';

const enc = new TextEncoder();

function urlB64Decode(str) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
  const bin = Buffer.from(b64, 'base64');
  return new Uint8Array(bin.buffer, bin.byteOffset, bin.byteLength);
}

function urlB64Encode(bytes) {
  const b = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function concatBytes(...arrays) {
  const total = arrays.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrays) {
    out.set(a, off);
    off += a.length;
  }
  return out;
}

async function hkdf(ikmBytes, saltBytes, infoBytes, lengthBits) {
  const ikm = await crypto.subtle.importKey('raw', ikmBytes, { name: 'HKDF' }, false, ['deriveBits']);
  return crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt: saltBytes, info: infoBytes },
    ikm,
    lengthBits
  );
}

// ── send side (mirrors worker.js encryptPayload) ──────────────────

async function encryptPayload(plaintext, subPubRaw, authRaw) {
  const ephem = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const ephemPub = new Uint8Array(await crypto.subtle.exportKey('raw', ephem.publicKey));
  const uaPub = await crypto.subtle.importKey('raw', subPubRaw, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const ecdhSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: uaPub }, ephem.privateKey, 256);

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const rs = 4096;
  const header = concatBytes(
    salt,
    new Uint8Array([(rs >>> 24) & 255, (rs >>> 16) & 255, (rs >>> 8) & 255, rs & 255]),
    new Uint8Array([65]),
    ephemPub
  );

  const keyInfo = concatBytes(enc.encode('WebPush: info'), new Uint8Array([0]), subPubRaw, ephemPub);
  const prkKey = await hkdf(ecdhSecret, authRaw, new Uint8Array(0), 256);
  const ikm = await hkdf(prkKey, new Uint8Array(0), concatBytes(keyInfo, new Uint8Array([1])), 256);
  const prk = await hkdf(ikm, salt, new Uint8Array(0), 256);
  const cek = await hkdf(prk, new Uint8Array(0), concatBytes(enc.encode('Content-Encoding: aes128gcm'), new Uint8Array([0, 1])), 128);
  const nonce = await hkdf(prk, new Uint8Array(0), concatBytes(enc.encode('Content-Encoding: nonce'), new Uint8Array([0, 1])), 96);

  const key = await crypto.subtle.importKey('raw', cek, { name: 'AES-GCM' }, false, ['encrypt']);
  const padded = concatBytes(plaintext, new Uint8Array([2]));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, key, padded));
  return concatBytes(header, ciphertext);
}

// ── receive side (what a browser does — RFC 8291 §3.4) ────────────

async function decryptPayload(body, uaPrivJwk, uaPubRaw, authRaw) {
  const header = body.slice(0, 86);
  const salt = header.slice(0, 16);
  const ephemPub = header.slice(21, 86); // skip salt(16) + rs(4) + idlen(1)
  const ciphertext = body.slice(86);

  const uaPriv = await crypto.subtle.importKey('jwk', uaPrivJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits']);
  const asPub = await crypto.subtle.importKey('raw', ephemPub, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const ecdhSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: asPub }, uaPriv, 256);

  const keyInfo = concatBytes(enc.encode('WebPush: info'), new Uint8Array([0]), uaPubRaw, ephemPub);
  const prkKey = await hkdf(ecdhSecret, authRaw, new Uint8Array(0), 256);
  const ikm = await hkdf(prkKey, new Uint8Array(0), concatBytes(keyInfo, new Uint8Array([1])), 256);
  const prk = await hkdf(ikm, salt, new Uint8Array(0), 256);
  const cek = await hkdf(prk, new Uint8Array(0), concatBytes(enc.encode('Content-Encoding: aes128gcm'), new Uint8Array([0, 1])), 128);
  const nonce = await hkdf(prk, new Uint8Array(0), concatBytes(enc.encode('Content-Encoding: nonce'), new Uint8Array([0, 1])), 96);

  const key = await crypto.subtle.importKey('raw', cek, { name: 'AES-GCM' }, false, ['decrypt']);
  const padded = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: nonce }, key, ciphertext));
  return padded.slice(0, padded.length - 1); // strip 0x02 delimiter
}

// ── VAPID JWT (mirrors worker.js) + DER verification ──────────────

function intToDer(bytes) {
  let start = 0;
  while (start < bytes.length - 1 && bytes[start] === 0) start++;
  let b = bytes.slice(start);
  if (b[0] & 0x80) b = concatBytes(new Uint8Array([0]), b);
  return concatBytes(new Uint8Array([0x02, b.length]), b);
}

function p1363ToDer(sig) {
  const r = intToDer(sig.slice(0, 32));
  const s = intToDer(sig.slice(32, 64));
  const body = concatBytes(r, s);
  return concatBytes(new Uint8Array([0x30, body.length]), body);
}

async function makeVapidJwt(pubPointB64, privDB64) {
  const pubRaw = urlB64Decode(pubPointB64);
  const jwk = {
    kty: 'EC',
    crv: 'P-256',
    x: urlB64Encode(pubRaw.slice(1, 33)),
    y: urlB64Encode(pubRaw.slice(33, 65)),
    d: privDB64,
    ext: true,
  };
  const signer = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const header = urlB64Encode(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = urlB64Encode(enc.encode(JSON.stringify({ aud: 'https://fcm.googleapis.com', exp: Math.floor(Date.now() / 1000) + 43200, sub: 'mailto:test@example.com' })));
  const input = enc.encode(`${header}.${payload}`);
  const sig = new Uint8Array(await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, signer, input));
  return { jwt: `${header}.${payload}.${urlB64Encode(p1363ToDer(sig))}`, input };
}

// ── run ────────────────────────────────────────────────────────────

const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
const pubJwk = publicKey.export({ format: 'jwk' });
const privJwk = privateKey.export({ format: 'jwk' });
const pubPoint = concatBytes(
  new Uint8Array([4]),
  urlB64Decode(pubJwk.x),
  urlB64Decode(pubJwk.y)
);

// Subscription keypair (simulates the browser)
const sub = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
const subPubRaw = new Uint8Array(await crypto.subtle.exportKey('raw', sub.publicKey));
const subPrivJwk = await crypto.subtle.exportKey('jwk', sub.privateKey);
const authRaw = crypto.getRandomValues(new Uint8Array(16));

// 1. Encrypt → decrypt roundtrip
const payload = '{"title":"Test","body":"বাংলা ও English","url":"/"}';
const body = await encryptPayload(enc.encode(payload), subPubRaw, authRaw);
const decrypted = await decryptPayload(body, subPrivJwk, subPubRaw, authRaw);
const dec = new TextDecoder().decode(decrypted);
if (dec !== payload) {
  console.error('FAIL: decrypted ≠ payload');
  console.error(' got:', dec);
  process.exit(1);
}
console.log('PASS: aes128gcm encrypt → decrypt roundtrip');

// 2. VAPID JWT — valid DER + verifiable with Node crypto
const { jwt, input } = await makeVapidJwt(urlB64Encode(pubPoint), privJwk.d);
const [, , s] = jwt.split('.');
const der = urlB64Decode(s);
// Wrap the raw point in an SPKI structure (P-256 EC prefix) for verification.
const SPKI_PREFIX = Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex');
const spki = Buffer.concat([SPKI_PREFIX, Buffer.from(pubPoint)]);
const pub = createPublicKey({ key: spki, format: 'der', type: 'spki' });
const ok = rsVerify('sha256', Buffer.from(input), pub, Buffer.from(der));
if (!ok) {
  console.error('FAIL: VAPID signature did not verify');
  process.exit(1);
}
console.log('PASS: VAPID ES256 JWT (DER) verifies');

console.log('All crypto checks passed.');
