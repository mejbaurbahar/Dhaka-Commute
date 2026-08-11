# KoyJabo Push — free web push via Cloudflare Worker

DIY push notifications, no Firebase cost. Architecture:

- **Browser** (`src/services/pushService.ts`) — registers `/push/push-sw.js`
  (subpath scope; GitHub Pages can't send SW scope headers), subscribes with
  VAPID, and reports engagement events (install / search / save).
- **Service worker** (`public/push/push-sw.js`) — shows notifications, opens
  the app on click.
- **Delivery worker** (`scripts/push-worker/worker.js`) — stores subscriptions
  + scheduled events in KV, a cron delivers due pushes every 10 min.

## Notification scenarios

| Scenario | Trigger | Delivered |
|---|---|---|
| "Installed but didn't use it" | First visit (24h later, cancelled by any return visit) | +24h |
| "Searched but didn't see details" | Route search (cancelled when user opens a result / detail) | +1h |
| "Yesterday you searched — what today?" | Route search (replaced by each new search) | next day 09:00 |
| "Don't forget your saved route" | Bus/route favorited | +48h |
| "Forgot KoyJabo? Come back" | Every app visit re-arms a 48h watch | +48h of silence (max 3 nudges) |

All notifications are bilingual (Bangla/English, follows the app's
`app-language` setting). One push per user per tick — never spam.

## Deploy (one-time, ~5 min)

Prereq: `npx wrangler login` (or `npm i -g wrangler`).

```bash
cd scripts/push-worker

# 1. Create the KV namespace for subscriptions
npx wrangler kv namespace create PUSH_SUBS
#   → copy the id into wrangler.toml (REPLACE_WITH_KV_NAMESPACE_ID)

# 2. Set the VAPID private key as a secret
#    value lives in repo root .env → VITE_VAPID_PRIVATE_KEY
npx wrangler secret put VAPID_PRIVATE_KEY

# 3. Deploy
npx wrangler deploy
#   → prints https://koyjabo-push.<your-subdomain>.workers.dev

# 4. Sanity check
curl https://koyjabo-push.<your-subdomain>.workers.dev/api/health   # → {"ok":true}
```

## Point the web app at the worker

In repo root `.env` (gitignored — never commit):

```
VITE_PUSH_API_URL=https://koyjabo-push.<your-subdomain>.workers.dev
```

Then deploy the web app (CI push). Until this var is set, the app is a
no-op: no permission prompt, no errors, no notifications.

## Test end-to-end

1. Open koyjabo.com, Settings → enable "Push notifications" (grants
   permission, subscribes).
2. Do a route search → worker stores `search-check` (+1h) and
   `search-tomorrow` (next 09:00) events.
3. To test delivery immediately instead of waiting: `wrangler tail` to watch
   the cron, or POST a test event with a past fireAt:
   ```bash
   curl -X POST https://koyjabo-push.<subdomain>.workers.dev/api/event \
     -H 'Content-Type: application/json' \
     -d '{"endpoint":"<endpoint-from-browser>","type":"search-check","fireAt":<past-ms>}'
   ```
   The next cron tick (≤10 min) delivers it.
4. Android app (Capacitor WebView): `Notification` API unavailable → feature
   silently off. Real Android push = FCM later, after Play production.

## Troubleshooting

- **Nothing arrives**: check `wrangler tail`, then `/api/health`, then that
  `VITE_PUSH_API_URL` is set and the app was redeployed.
- **Push service rejects (401/403)**: wrong VAPID private key or subject —
  re-run `wrangler secret put VAPID_PRIVATE_KEY` with the key from `.env`.
- **404/410**: subscription died (browser uninstalled push) — worker deletes
  it automatically.
- **cron not firing**: `wrangler deploy` after editing `[triggers]`; cron
  triggers require the Workers Paid plan or the free plan's 10k/day quota
  (this worker pushes ≤ tens/day — fine).
