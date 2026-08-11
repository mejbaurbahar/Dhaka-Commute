# KoyJabo Facebook Page — Full Setup Checklist

Two tiers: **A (no-code, 30 min, start today)** and **B (bot, one-time deploy)**.

---

## A. No-code setup — do this first

### 1. Page basics (10 min)
- **Category**: Public Transport / Local Service — set in Page → About
- **About / bio**: "Bangladesh's free transport guide — 450+ bus routes, live bus tracking, metro, train & launch schedules. ১০০% ফ্রি।" + link koyjabo.com
- **Profile photo**: `public/logo.png` (already in repo)
- **Cover photo**: from `public/images/` or a bus/city shot — make one free at canva.com
- **CTA button**: Add Button → **Message** (sends people to Messenger) or **Learn More** → koyjabo.com

### 2. Instant Reply — free auto-reply, zero code (10 min)
Meta Business Suite → Inbox → **Automated greetings** (or Page → Settings → Messaging):
- **Instant reply**: "Thanks for messaging KoyJabo! We reply fast. Meanwhile: search any bus route free at koyjabo.com 🚌 | ধন্যবাদ! দ্রুত উত্তর দিচ্ছি। এর মধ্যে রুট খুঁজে নিন: koyjabo.com"
- **Away message**: same text when you're offline
- **Welcome message**: greeting + link

This alone gives users an instant reply. The Worker bot (tier B) replaces it with smarter answers.

### 3. Schedule the 1-month calendar (30-45 min)
1. Open [Meta Business Suite](https://business.facebook.com) → **Planning** → **Create post**
2. Pick date + time, paste post text from `marketing/facebook-posts.md`, add image suggestion from the file
3. **60 posts, 2/day at 09:30 and 19:30** (peak commuter hours — best for transport content)
4. Free scheduling covers the full month. Repeat once a month.

**Posting rhythm**: 09:30 (morning commute) + 19:30 (evening commute), 7 days/week.

### 4. Weekly (10 min)
- Business Suite → Insights: check reach + follows; boost what works (more posts like the winners)
- Reply to comments within 24h — the algorithm boosts active pages

---

## B. Messenger auto-reply bot (once)

Full bilingual keyword bot on Cloudflare Workers — free forever. Follow `scripts/messenger-bot/README.md`:
1. Create Meta app → get Page token
2. `wrangler deploy` the worker
3. Connect webhook → done

Bot answers routes/metro/fares/hours instantly with quick-reply buttons, in Bangla + English.

---

## C. What I can't do for you (needs your login)

| Step | Why |
|------|-----|
| Logging into Facebook | No credentials — you must log in yourself |
| Scheduling posts | Business Suite login required |
| Generating Page token | Meta Developer app requires your account |

All content, code, and checklists are ready in this repo — the login + paste steps are yours.
