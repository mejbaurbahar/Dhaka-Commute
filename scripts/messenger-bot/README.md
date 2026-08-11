# KoyJabo Messenger Bot + Social Auto-Poster (Cloudflare Worker)

Free Messenger bot **plus automatic Facebook page posting** for the KoyJabo Facebook page. Runs on Cloudflare Workers free tier (100k requests/day — far beyond what a page bot needs). No server, no cost.

## What it does

**Messenger bot**
- Auto-replies to every message on the page — instant, 24/7, in Bangla + English
- Keyword answers (Bangla + English + romanized Bangla): bus routes, metro, fares (vara/vora/koto vara), routes (kivabe jabo/kothay), trains, flights (air/plane), launches, hours, app install, advertising
- Quick-reply buttons (Routes / Metro / Fares / Hours) on greeting & fallback
- Handles the Messenger webhook verification handshake

**Comment auto-replies**
- Every comment on the page's posts gets a public Bangla reply automatically
- Reply is smart — same topic detection as Messenger (train comment → train info + koyjabo.com link)
- Skips the page's own replies (no loops)

**Auto-poster** (scheduled every 3h)
- Reads the newest blog post from `https://koyjabo.com/blog/feed.xml`
- Publishes it to the Koy Jabo Facebook page (`POST /{page-id}/feed` with link)
- Never posts the same article twice (KV dedupe, `POSTED` namespace)
- LinkedIn is already covered separately: the page auto-posts from the same RSS feed

## One-time setup (~20 min)

### 1. Create Meta app + get Page token

1. Go to [developers.facebook.com](https://developers.facebook.com) → **My Apps** → **Create App**
   - Use case: **Other** → type: **Business**
2. Add product **Messenger** to the app
3. In Messenger settings → **Access Tokens** → select the **KoyJabo** page → **Generate token**
   - Copy this **Page Access Token** (starts with `EAA...`). Keep it secret — never commit it.

### 2. Deploy worker

```bash
cd scripts/messenger-bot
npm i -g wrangler        # once
wrangler login           # once — opens browser, link your Cloudflare account
wrangler kv namespace create POSTED
#   → creates a KV namespace; paste the returned id into wrangler.toml (kv_namespaces → id)
wrangler deploy           # uses wrangler.toml (worker name, cron trigger, FB_PAGE_ID, KV)
wrangler secret put VERIFY_TOKEN
#   → paste any random string, e.g. koyjabo-9f2x7k (remember it)
wrangler secret put PAGE_ACCESS_TOKEN
#   → paste the EAA... token from step 1
```

Note the deployed URL: `https://koyjabo-messenger-bot.<your-subdomain>.workers.dev`

### 3. Connect webhook

1. In the Meta app → Messenger → **Webhooks**
2. Callback URL: `https://koyjabo-messenger-bot.<your-subdomain>.workers.dev/webhook`
3. Verify token: the same random string you set with `wrangler secret put VERIFY_TOKEN`
4. Click **Verify and save**
5. Under **Webhook fields**: subscribe to `messages`, `messaging_postbacks` and `feed` (feed = comment auto-replies)

### 5. Comment auto-replies — one warning

Business Suite's own "Comment to message" automation is keyword-based (only some comments trigger). This worker replies to **every** comment. If both are on, keyword comments get two public replies — so once the worker is deployed, turn the Suite automation off (Business Suite → Inbox → Automations → Comment to message → toggle off).

### 4. Test

Open facebook.com/koyjabo in an incognito window → click **Message** → send "metro" or "hello". Bot should reply within a second.

The auto-poster runs on its own (every 3h, off-minute) — no further setup. To force an immediate post: `wrangler tail` + trigger the cron in the Cloudflare dashboard → Workers → Triggers → Cron → "Trigger now". First run posts the newest article to the page (until a new article is published, later runs are no-ops).

## Notes

- Token expires rarely (60 days) but may be re-generated anytime in the Messenger settings. If the bot stops replying or posting, regenerate the token and re-run `wrangler secret put PAGE_ACCESS_TOKEN`.
- To change bot answers or the auto-post message, edit `worker.js` → `wrangler deploy` again.
- No app review needed: page-admin bots replying to page messages work without review. Auto-posting to your own page (`publish_pages`) also works without review for the app admin. If the page grows past 5k followers, Messenger Platform may require business verification for some features — not for basic auto-replies.
- **Instagram auto-posting** (future): possible via the same worker — `POST /{ig-user-id}/media` + `media_publish` — but needs `instagram_content_publish` permission (app review) and full business-portfolio access to the IG account. Not enabled yet.

## One-time setup (~20 min)

### 1. Create Meta app + get Page token

1. Go to [developers.facebook.com](https://developers.facebook.com) → **My Apps** → **Create App**
   - Use case: **Other** → type: **Business**
2. Add product **Messenger** to the app
3. In Messenger settings → **Access Tokens** → select the **KoyJabo** page → **Generate token**
   - Copy this **Page Access Token** (starts with `EAA...`). Keep it secret — never commit it.

### 2. Deploy worker

```bash
cd scripts/messenger-bot
npm i -g wrangler        # once
wrangler login           # once — opens browser, link your Cloudflare account
wrangler deploy worker.js --name koyjabo-messenger-bot
wrangler secret put VERIFY_TOKEN
#   → paste any random string, e.g. koyjabo-9f2x7k (remember it)
wrangler secret put PAGE_ACCESS_TOKEN
#   → paste the EAA... token from step 1
```

Note the deployed URL: `https://koyjabo-messenger-bot.<your-subdomain>.workers.dev`

### 3. Connect webhook

1. In the Meta app → Messenger → **Webhooks**
2. Callback URL: `https://koyjabo-messenger-bot.<your-subdomain>.workers.dev/webhook`
3. Verify token: the same random string you set with `wrangler secret put VERIFY_TOKEN`
4. Click **Verify and save**
5. Under **Webhook fields**: subscribe to `messages`, `messaging_postbacks` and `feed` (feed = comment auto-replies)

### 5. Comment auto-replies — one warning

Business Suite's own "Comment to message" automation is keyword-based (only some comments trigger). This worker replies to **every** comment. If both are on, keyword comments get two public replies — so once the worker is deployed, turn the Suite automation off (Business Suite → Inbox → Automations → Comment to message → toggle off).

### 4. Test

Open facebook.com/koyjabo in an incognito window → click **Message** → send "metro" or "hello". Bot should reply within a second.

## Notes

- Token expires rarely (60 days) but may be re-generated anytime in the Messenger settings. If the bot stops replying, regenerate the token and re-run `wrangler secret put PAGE_ACCESS_TOKEN`.
- To change bot answers, edit `worker.js` → `wrangler deploy` again.
- No app review needed: page-admin bots replying to page messages work without review. If the page grows past 5k followers, Messenger Platform may require business verification for some features — not for basic auto-replies.
