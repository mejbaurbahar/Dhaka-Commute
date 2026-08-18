/**
 * Offline Events Queue — web PWA twin of the mobile offline sync engine.
 *
 * User actions (searches, feature usage) are queued in localStorage while
 * the page is offline; when the browser fires `online` (or the tab becomes
 * visible again, or the page loads online) the queue flushes to the
 * Cloudflare worker `sync-events` action, which dedupes by client event id
 * and stores per-day in the koyjabo data repo. Accepted events leave the
 * queue; anything that fails stays queued for the next flush.
 *
 * Same endpoint + same event shape as the mobile app
 * (services/offlineSyncService.ts) — one collection pipeline for both.
 */

const QUEUE_KEY = 'kj_offline_events';
const VISITOR_KEY = 'kj_oe_visitor';
const PROXY = (import.meta.env.VITE_API_PROXY as string | undefined)
    || 'https://koyjabo-auth-proxy.fagun115946.workers.dev';
const MAX_QUEUE = 500;
const BATCH_SIZE = 50;

interface SyncEvent {
  /** Client-generated id — server dedupes on this */
  id: string;
  type: string;
  ts: number;
  payload: Record<string, unknown>;
}

const newId = (): string => {
  try {
    if (crypto.randomUUID) return crypto.randomUUID();
  } catch { /* non-secure context */ }
  // Fallback for http/older browsers — 36-char hex pattern the worker accepts
  const hex = '0123456789abcdef';
  let s = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) s += '-';
    else if (i === 14) s += '4';
    else if (i === 19) s += hex[8 + Math.floor(Math.random() * 4)];
    else s += hex[Math.floor(Math.random() * 16)];
  }
  return s;
};

const visitorId = (): string => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = `web_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return 'web_unknown';
  }
};

const readQueue = (): SyncEvent[] => {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const queue: SyncEvent[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(queue) ? queue : [];
  } catch {
    return [];
  }
};

const writeQueue = (queue: SyncEvent[]): void => {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Storage full/unavailable — drop silently; local history still works.
  }
};

/**
 * Record an event. Offline it queues; online it flushes immediately.
 * Safe to call from any analytics tracker — fire-and-forget.
 */
export const enqueueEvent = (type: string, payload: Record<string, unknown>): void => {
  const queue = readQueue();
  writeQueue([...queue.slice(-(MAX_QUEUE - 1)), { id: newId(), type, ts: Date.now(), payload }]);
  void flushOfflineEvents();
};

/** Send up to BATCH_SIZE queued events to the worker; keep failures queued. */
export const flushOfflineEvents = async (): Promise<void> => {
  const queue = readQueue();
  if (!queue.length) return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  const batch = queue.slice(0, BATCH_SIZE);
  try {
    const res = await fetch(`${PROXY}/gh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: newId(),
        action: 'sync-events',
        data: JSON.stringify({
          events: batch.map((e) => ({ ...e, device: visitorId() })),
        }),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return; // keep queue, retry next flush
    const body = await res.json().catch(() => null);
    if (!body?.success || !Array.isArray(body.accepted)) return;

    const accepted = new Set(body.accepted as string[]);
    writeQueue(queue.filter((e) => !accepted.has(e.id)));
  } catch {
    // Network failure or timeout — keep queue for next flush
  }
};

/** Start the sync engine: flush on load, on reconnect, and on tab focus. */
export const initOfflineEventsSync = (): void => {
  window.addEventListener('online', () => { void flushOfflineEvents(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void flushOfflineEvents();
  });
  void flushOfflineEvents();
};
