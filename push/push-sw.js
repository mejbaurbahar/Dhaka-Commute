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
