/*
 * KoyJabo push notification service worker.
 *
 * Lives at /push/push-sw.js with scope /push/ — GitHub Pages cannot send SW
 * scope headers, so this subpath worker avoids clashing with the workbox SW
 * (sw.js) at the root. A subpath-scoped SW still receives push events for its
 * subscription, even when no /push/ page is open.
 *
 * Keep this file dependency-free and small — it is served raw (not bundled).
 */

const ICON = self.location.origin + '/icon-192x192.png';

// Keep in sync with src/services/pushService.ts (VAPID_PUBLIC_KEY).
const VAPID_PUBLIC_KEY =
  'BPWRfKooYJr8MkcJaOFw2PF3g5OBlikB5uZCcEiS1kGbhOXKTiG-_0rTau28lT2K0tluU4eQ6NByPsnT00sSEV8';

// Config injected at registration time: the page registers this SW as
// push-sw.js?api=<worker url>&lang=<bn|en>. This SW is served raw (not
// bundled), so hardcoding the API origin here would drift from the deployed
// VITE_PUSH_API_URL — reading it from scriptURL keeps one source of truth.
const cfg = (() => {
  try {
    const u = new URL(self.registration.scriptURL);
    return {
      api: (u.searchParams.get('api') || '').replace(/\/$/, ''),
      lang: u.searchParams.get('lang') === 'bn' ? 'bn' : 'en',
    };
  } catch {
    return { api: '', lang: 'en' };
  }
})();

// Chrome expires push subscriptions (~3 months). The browser fires this when
// the old sub dies — without a handler the device silently stops receiving
// pushes forever. Re-subscribe, tell the worker, and notify any open tab so
// the page stops pushing events at the dead endpoint. (The page also re-syncs
// on every visit, so this is a belt-and-braces path for never-visited tabs.)
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const reg = self.registration;
        const oldSub = await reg.pushManager.getSubscription();
        if (oldSub) {
          try {
            await oldSub.unsubscribe();
          } catch {
            /* already gone */
          }
        }
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToU8(VAPID_PUBLIC_KEY),
        });
        const json = sub.toJSON();
        if (cfg.api) {
          await fetch(cfg.api + '/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: sub.endpoint, keys: json.keys, lang: cfg.lang }),
          });
        }
        const clients = await self.clients.matchAll({ type: 'window' });
        for (const client of clients) {
          try {
            client.postMessage({ type: 'koyjabo-push-endpoint', endpoint: sub.endpoint });
          } catch {
            /* tab closed mid-send */
          }
        }
      } catch {
        /* offline or permission revoked — next page visit re-syncs */
      }
    })()
  );
});

function urlB64ToU8(b64) {
  const pad = '='.repeat((4 - (b64.length % 4)) % 4);
  const s = (b64 + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = null;
  try {
    data = event.data ? event.data.json() : null;
  } catch {
    data = null;
  }
  const title = (data && data.title) || 'Koy Jabo';
  const options = {
    body: (data && data.body) || '',
    icon: ICON,
    badge: ICON,
    data: data && data.url ? { url: data.url } : undefined,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  event.waitUntil(openOrFocus(url));
});

async function openOrFocus(url) {
  const target = url ? new URL(url, self.location.origin).href : self.location.origin + '/';
  const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const win of windows) {
    if (new URL(win.url).origin === self.location.origin) {
      await win.focus();
      try {
        await win.navigate(target);
      } catch {
        // navigate() can reject if the page is cross-origin — just focus then.
      }
      return;
    }
  }
  return self.clients.openWindow(target);
}
