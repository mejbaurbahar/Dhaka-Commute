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

import { isNativePlatform } from '../utils/platformDetect';
import type { Lang } from '../redesign/tokens';

const VAPID_PUBLIC_KEY =
  'BPWRfKooYJr8MkcJaOFw2PF3g5OBlikB5uZCcEiS1kGbhOXKTiG-_0rTau28lT2K0tluU4eQ6NByPsnT00sSEV8';
const PUSH_SW_URL = '/push/push-sw.js';
const PUSH_SW_SCOPE = '/push/';

const KEY_ENABLED = 'koyjabo_push_enabled';
const KEY_ENDPOINT = 'koyjabo_push_endpoint';
const KEY_SERVER_CONFIRMED = 'koyjabo_push_server_confirmed';
const KEY_FIRST_VISIT = 'koyjabo_first_visit_at';
const KEY_INSTALL_SCHEDULED = 'koyjabo_install_reminder_scheduled';

export type PushEventType = 'install' | 'search-check' | 'search-tomorrow' | 'save' | 'dormant' | 'search-start' | 'route-view' | 'trip-eta';

/** Diagnostic log — silent unless a worker URL is configured (offline-first design). */
function logPush(...args: unknown[]): void {
  if (!apiBase()) return;
  console.warn('[push]', ...args);
}

/** Web push needs SW + PushManager; the Android app uses native FCM (Capacitor). */
export function pushSupported(): boolean {
  if (isNativePlatform()) return true;
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

/** Push is ON by default; only an explicit user opt-out stores '0'. */
export function pushEnabled(): boolean {
  try {
    if (localStorage.getItem(KEY_ENABLED) === '0') return false;
    // M2: a denied permission can never deliver — don't keep POSTing events
    // the worker will throw away for a dead subscription.
    if (typeof Notification !== 'undefined' && Notification.permission === 'denied') return false;
    return true;
  } catch {
    return true;
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

function currentLang(): Lang {
  try {
    // The redesign stores language as 'kj-language'; the legacy screens write
    // 'app-language'. Reading both keeps pushes in the user's actual language.
    const v = localStorage.getItem('kj-language') ?? localStorage.getItem('app-language');
    return v === 'bn' ? 'bn' : 'en';
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

/** Fire-and-forget POST — never throws. keepalive lets it flush during unload. */
function post(path: string, body: unknown): void {
  const base = apiBase();
  if (!base) return;
  fetch(base + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify(body),
  }).catch(() => {});
}

/** POST that resolves true only when the delivery worker accepted (2xx). */
async function postAwait(path: string, body: unknown): Promise<boolean> {
  const base = apiBase();
  if (!base) return false;
  try {
    const res = await fetch(base + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (error) {
    logPush('worker unreachable', path, error);
    return false;
  }
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
    // C2: pass the worker URL + current language as query params so the SW
    // re-subscribes (pushsubscriptionchange) to the right worker in the
    // user's language — no hardcoded origin inside the SW.
    const swUrl =
      PUSH_SW_URL +
      '?api=' + encodeURIComponent(apiBase()) +
      '&lang=' + currentLang();
    const reg = await navigator.serviceWorker.register(swUrl, { scope: PUSH_SW_SCOPE });
    await navigator.serviceWorker.ready;
    reg.update().catch(() => {}); // pick up push-sw.js changes promptly
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    return sub;
  } catch (error) {
    logPush('subscribe failed', error);
    return null;
  }
}

/**
 * C1: persist the endpoint always, but only mark the feature enabled (and
 * server-confirmed) after the delivery worker accepted the subscription.
 * An endpoint the worker never heard of is a silent dead push — on failure
 * the next visit (initPush) re-syncs it.
 */
function persist(sub: PushSubscription, confirmed: boolean): void {
  try {
    localStorage.setItem(KEY_ENDPOINT, sub.endpoint);
    if (confirmed) {
      localStorage.setItem(KEY_ENABLED, '1');
      localStorage.setItem(KEY_SERVER_CONFIRMED, '1');
    } else {
      localStorage.setItem(KEY_SERVER_CONFIRMED, '0');
    }
  } catch {
    /* private mode */
  }
}

function subKeys(sub: PushSubscription): Record<string, string> | null {
  const json = sub.toJSON() as any;
  return json?.keys ?? null;
}

let nativeListeners = false;

/** Native (app) branch: Capacitor PushNotifications → FCM token → worker. */
async function enableNativePush(): Promise<boolean> {
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    const perm = await PushNotifications.checkPermissions();
    if (perm.receive !== 'granted') {
      const req = await PushNotifications.requestPermissions();
      if (req.receive !== 'granted') return false;
    }
    if (!nativeListeners) {
      nativeListeners = true;
      PushNotifications.addListener('registration', (data) => {
        const token = data.value;
        if (!token) return;
        try {
          localStorage.setItem(KEY_ENABLED, '1');
          localStorage.setItem(KEY_ENDPOINT, token);
        } catch { /* private mode */ }
        post('/api/subscribe', { endpoint: token, lang: currentLang() });
      });
      PushNotifications.addListener('registrationError', () => { /* silent */ });
      // FCM only auto-displays notifications when the app is in the BACKGROUND.
      // Foreground messages arrive here — show them as a local notification so
      // the user sees pushes while using the app too.
      PushNotifications.addListener('pushNotificationReceived', async (notification) => {
        try {
          const { LocalNotifications } = await import('@capacitor/local-notifications');
          await LocalNotifications.requestPermissions();
          await LocalNotifications.schedule({
            notifications: [{
              id: Math.abs((notification.data?.eventCreatedAt || Date.now()) % 2_000_000_000) || 1,
              title: notification.title || 'কই যাবো',
              body: notification.body || '',
              data: notification.data || {},
              smallIcon: 'kj_push_icon',
              iconColor: '#00c2ff',
            } as unknown as import('@capacitor/local-notifications').LocalNotificationSchema],
          });
        } catch { /* silent */ }
      });
    }
    // Listener must attach BEFORE register — the plugin can emit the token
    // immediately on register (cold start), so a listener added after would
    // miss it and the device would never be subscribed.
    await PushNotifications.register();
    const existing = localStorage.getItem(KEY_ENDPOINT);
    if (existing) post('/api/subscribe', { endpoint: existing, lang: currentLang() });
    return true;
  } catch {
    return false;
  }
}

/** Ask permission + subscribe + tell the worker. Returns true when subscribed. */
export async function enablePush(): Promise<boolean> {
  if (!apiBase()) return false;
  if (isNativePlatform()) return enableNativePush();
  if (!pushSupported()) return false;
  let perm = Notification.permission;
  if (perm !== 'granted') {
    perm = await Notification.requestPermission();
  }
  if (perm !== 'granted') {
    logPush('permission not granted:', perm);
    return false;
  }
  const sub = await subscribeOnDevice();
  if (!sub) return false;
  // C1: server-confirm before calling it enabled (see persist()).
  const ok = await postAwait('/api/subscribe', {
    endpoint: sub.endpoint, keys: subKeys(sub), lang: currentLang(),
  });
  persist(sub, ok);
  if (!ok) logPush('server did not confirm subscription — will retry next visit');
  return ok;
}

export async function disablePush(): Promise<void> {
  if (isNativePlatform()) {
    const token = localStorage.getItem(KEY_ENDPOINT);
    if (token && apiBase()) post('/api/unsubscribe', { endpoint: token });
  }
  try {
    localStorage.removeItem(KEY_ENABLED);
    localStorage.removeItem(KEY_ENDPOINT);
    localStorage.removeItem(KEY_INSTALL_SCHEDULED);
  } catch {
    /* private mode */
  }
  if (isNativePlatform()) return;
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

// ── Trip ETA reminder ("~5 minutes to reach") ─────────────────────

/**
 * "Almost there!" reminder — fires ~5 minutes before the user reaches a
 * destination (earlier for very short trips, clamped to min 2 minutes).
 * Same type replaces any previous trip-eta for this device.
 */
export function scheduleTripEta(name: string, url: string, etaMinutes: number): void {
  const minutes = Math.max(2, etaMinutes - 5);
  trackPushEvent('trip-eta', { name, url, minutes: '5' }, Date.now() + minutes * 60_000);
}

/** Cancel the pending arrival reminder for this device. */
export function cancelTripEta(): void {
  cancelPushEvent('trip-eta');
}

// ── SW ↔ page sync (C2) ───────────────────────────────────────────

/**
 * The SW re-subscribes on pushsubscriptionchange (browser expires subs ~3
 * months). It posts the NEW endpoint here so the page never keeps pushing
 * events at a dead subscription. Only possible while a tab is open; the
 * next visit's initPush() reconcile covers the rest.
 */
if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
    const msg = event.data as { type?: string; endpoint?: string } | null;
    if (msg?.type === 'koyjabo-push-endpoint' && msg.endpoint) {
      try {
        localStorage.setItem(KEY_ENDPOINT, msg.endpoint);
      } catch {
        /* private mode */
      }
    }
  });
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
  if (!apiBase()) return;

  // Android app: native FCM — register once, then schedule reminders.
  if (isNativePlatform()) {
    if (pushEnabled()) {
      await enablePush();
      const firstVisit = localStorage.getItem(KEY_FIRST_VISIT);
      if (!firstVisit) {
        localStorage.setItem(KEY_FIRST_VISIT, String(Date.now()));
        if (!localStorage.getItem(KEY_INSTALL_SCHEDULED)) {
          localStorage.setItem(KEY_INSTALL_SCHEDULED, '1');
          trackPushEvent('install', {}, inHours(24));
        }
      } else if (localStorage.getItem(KEY_INSTALL_SCHEDULED)) {
        localStorage.removeItem(KEY_INSTALL_SCHEDULED);
        cancelPushEvent('install');
      }
      trackPushEvent('dormant', {}, inHours(48));
    }
    return;
  }

  if (!pushSupported()) return;

  // Push is ON by default, but H1: never request permission at page load.
  // iOS Safari drops non-gesture prompts, and most browsers only show the
  // prompt once — spending it on load permanently kills the feature. If the
  // user already granted, silently re-sync; otherwise the Settings toggle
  // (inside a click gesture) is the only path that prompts.
  if (!pushEnabled()) return; // user explicitly opted out
  if (Notification.permission !== 'granted') return;
  const ok = await enablePush(); // already granted → no prompt, pure re-sync
  if (!ok) {
    // Permission granted but subscribe POST failed (worker down, push service
    // reset) — re-sync the subscription on this visit.
    const sub = await subscribeOnDevice();
    if (sub) {
      post('/api/subscribe', { endpoint: sub.endpoint, keys: subKeys(sub), lang: currentLang() });
      localStorage.setItem(KEY_ENDPOINT, sub.endpoint);
    }
  } else if (localStorage.getItem(KEY_SERVER_CONFIRMED) === '0') {
    // C1: the worker was unreachable when the user enabled push — confirm now
    // (handleSubscribe rejects web endpoints without keys).
    const sub = await subscribeOnDevice();
    if (sub) {
      const confirmed = await postAwait('/api/subscribe', {
        endpoint: sub.endpoint, keys: subKeys(sub), lang: currentLang(),
      });
      if (confirmed) localStorage.setItem(KEY_SERVER_CONFIRMED, '1');
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
