# KoyJabo Messenger Auto-Reply Bot (Cloudflare Worker)

Free Messenger bot for the KoyJabo Facebook page. Runs on Cloudflare Workers free tier (100k requests/day — far beyond what a page bot needs). No server, no cost.

## What it does

- Auto-replies to every message on the page — instant, 24/7, in Bangla + English
- Keyword answers: bus routes, metro, fares, hours, trains, launches, app install, advertising
- Quick-reply buttons (Routes / Metro / Fares / Hours) on greeting & fallback
- Handles the Messenger webhook verification handshake

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
5. Under **Webhook fields**: subscribe to `messages` and `messaging_postbacks`

### 4. Test

Open facebook.com/koyjabo in an incognito window → click **Message** → send "metro" or "hello". Bot should reply within a second.

## Notes

- Token expires rarely (60 days) but may be re-generated anytime in the Messenger settings. If the bot stops replying, regenerate the token and re-run `wrangler secret put PAGE_ACCESS_TOKEN`.
- To change bot answers, edit `worker.js` → `wrangler deploy` again.
- No app review needed: page-admin bots replying to page messages work without review. If the page grows past 5k followers, Messenger Platform may require business verification for some features — not for basic auto-replies.
