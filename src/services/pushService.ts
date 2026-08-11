/**
 * KoyJabo push notifications — browser client.
 *
 * Registers the push service worker at /push/push-sw.js (subpath scope: GitHub
 * Pages cannot send SW scope headers, and a subpath worker avoids clashing
 * with the workbox sw.js at the root). Tracks engagement events and reports
 * them to the push delivery worker (scripts/push-worker).
 *
 * Everything is a no-op unless VITE_PUSH_API_URL points at the deployed
 * Cloudflare Worker — no errors, no console noise, offline-first app stays
 * quiet until the admin completes the deploy steps in scripts/push-worker/README.md.
 */

const VAPID_PUBLIC_KEY =
  'BPWRfKooYJr8MkcJaOFw2PF3g5OBlikB5uZCcEiS1kGbhOXKTiG-_0rTau28lT2K0tluU4eQ6NByPsnT00sSEV8';
const PUSH_SW_URL = '/push/push-sw.js';
const PUSH_SW_SCOPE = '/push/';

const KEY_ENABLED = 'koyjabo_push_enabled';
const KEY_ENDPOINT = 'koyjabo_push_endpoint';
const KEY_FIRST_VISIT = 'koyjabo_first_visit_at';
const KEY_INSTALL_SCHEDULED = 'koyjabo_install_reminder_scheduled';

export type PushEventType = 'install' | 'search-check' | 'search-tomorrow' | 'save' | 'dormant';

export function pushSupported(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      typeof Notification !== 'undefined'
    );
  } catch {
    return false;
  }
}

export function pushEnabled(): boolean {
  try {
    return localStorage.getItem(KEY_ENABLED) === '1';
  } catch {
    return false;
  }
}

function apiBase(): string {
  try {
    const base = (import.meta as any).env?.VITE_PUSH_API_URL as string | undefined;
    return base ? base.replace(/\/$/, '') : '';
  } catch {
    return '';
  }
}

function currentLang(): 'bn' | 'en' {
  try {
    return localStorage.getItem('app-language') === 'bn' ? 'bn' : 'en';
  } catch {
    return 'en';
  }
}

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const pad = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = window.atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/** Fire-and-forget POST — never throws, never logs. */
function post(path: string, body: unknown): void {
  const base = apiBase();
  if (!base) return;
  fetch(base + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {});
}

async function getPushRegistration(): Promise<ServiceWorkerRegistration | null> {
  try {
    return await navigator.serviceWorker.getRegistration(PUSH_SW_SCOPE);
  } catch {
    return null;
  }
}

async function subscribeOnDevice(): Promise<PushSubscription | null> {
  if (!pushSupported() || !apiBase()) return null;
  try {
    const reg = await navigator.serviceWorker.register(PUSH_SW_URL, { scope: PUSH_SW_SCOPE });
    await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    return sub;
  } catch {
    return null;
  }
}

function persist(sub: PushSubscription): void {
  try {
    localStorage.setItem(KEY_ENABLED, '1');
    localStorage.setItem(KEY_ENDPOINT, sub.endpoint);
  } catch {
    /* private mode */
  }
}

function subKeys(sub: PushSubscription): Record<string, string> | null {
  const json = sub.toJSON() as any;
  return json?.keys ?? null;
}

/** Ask permission + subscribe + tell the worker. Returns true when subscribed. */
export async function enablePush(): Promise<boolean> {
  if (!pushSupported() || !apiBase()) return false;
  let perm = Notification.permission;
  if (perm !== 'granted') {
    perm = await Notification.requestPermission();
  }
  if (perm !== 'granted') return false;
  const sub = await subscribeOnDevice();
  if (!sub) return false;
  persist(sub);
  post('/api/subscribe', { endpoint: sub.endpoint, keys: subKeys(sub), lang: currentLang() });
  return true;
}

export async function disablePush(): Promise<void> {
  try {
    localStorage.removeItem(KEY_ENABLED);
    localStorage.removeItem(KEY_ENDPOINT);
    localStorage.removeItem(KEY_INSTALL_SCHEDULED);
  } catch {
    /* private mode */
  }
  if (!pushSupported() || !apiBase()) return;
  const reg = await getPushRegistration();
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (sub) {
    post('/api/unsubscribe', { endpoint: sub.endpoint });
    try {
      await sub.unsubscribe();
    } catch {
      /* already gone */
    }
  }
}

/**
 * Schedule (or replace — same type = replace) a reminder event.
 * Events are stored server-side in KV and delivered by the worker's cron.
 */
export function trackPushEvent(type: PushEventType, data?: Record<string, string>, fireAt?: number): void {
  if (!pushEnabled() || !apiBase()) return;
  const endpoint = localStorage.getItem(KEY_ENDPOINT);
  if (!endpoint) return;
  post('/api/event', { endpoint, type, fireAt, data, lang: currentLang() });
}

/** Drop all pending events of a type for this device. */
export function cancelPushEvent(type: PushEventType): void {
  if (!pushEnabled() || !apiBase()) return;
  const endpoint = localStorage.getItem(KEY_ENDPOINT);
  if (!endpoint) return;
  post('/api/cancel', { endpoint, type });
}

// ── Timing helpers ────────────────────────────────────────────────

export function inHours(hours: number): number {
  return Date.now() + hours * 3_600_000;
}

/** Tomorrow at 09:00 local time. */
export function nextMorning(): number {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d.getTime();
}

// ── Install-reminder lifecycle (called once from main.tsx) ────────

/**
 * "You installed KoyJabo but still did not use it" reminder:
 * first visit schedules a +24h nudge; every later visit cancels it
 * (the visitor is clearly using the app).
 */
export async function initPush(): Promise<void> {
  if (!pushSupported() || !apiBase()) return;

  // Push is ON by default: auto-subscribe on first visit (the browser shows
  // its permission prompt once; a later visit never re-prompts after deny).
  // The Settings toggle remains for users who want to turn it off.
  if (!pushEnabled()) {
    const ok = await enablePush();
    if (!ok) return;
  }

  // Re-sync the subscription when permission was already granted
  // (e.g. after a browser update reset the push service).
  if (Notification.permission === 'granted') {
    const sub = await subscribeOnDevice();
    if (sub) {
      persist(sub);
      post('/api/subscribe', { endpoint: sub.endpoint, keys: subKeys(sub), lang: currentLang() });
    }
  }

  const firstVisit = localStorage.getItem(KEY_FIRST_VISIT);
  if (!firstVisit) {
    localStorage.setItem(KEY_FIRST_VISIT, String(Date.now()));
    if (pushEnabled() && !localStorage.getItem(KEY_INSTALL_SCHEDULED)) {
      localStorage.setItem(KEY_INSTALL_SCHEDULED, '1');
      trackPushEvent('install', {}, inHours(24));
    }
  } else if (localStorage.getItem(KEY_INSTALL_SCHEDULED)) {
    localStorage.removeItem(KEY_INSTALL_SCHEDULED);
    cancelPushEvent('install');
  }

  // "Forgot KoyJabo?" nudge: re-arm a 48h watch on every visit. Each visit
  // replaces the event (worker keeps latest per type), so it only fires when
  // the user is truly absent for 2+ days; the worker re-arms it up to 3 times.
  if (pushEnabled()) {
    trackPushEvent('dormant', {}, inHours(48));
  }
}
