# Play Store Upload Guide — Koy Jabo

All files ready. `play-store-assets/` contains:
- `app-release.aab` — at `android/app/build/outputs/bundle/release/app-release.aab` (28MB, signed)
- `1-home.png` … `5-flights.png` — 5 phone screenshots (1080x2400)
- `feature-graphic.png` — 1024x500
- `play-listing.md` — copy-paste text for every form field

---

## Step 1 — Finish developer account ($25)

1. In your open Play Console signup tab, pay the one-time **$25 registration fee**
2. Complete the tax/account details form (name, address, country = Bangladesh)
3. Wait for verification email (usually instant, sometimes 1-2 days)

## Step 2 — Create the app

1. Play Console → **All apps → Create app**
2. App name: `কই যাবো` (add "Koy Jabo" in description — or use `কই যাবো - Koy Jabo` as the name)
3. Default language: **Bangla (bn)**
4. App or game: **App**
5. Free or paid: **Free**
6. **Declarations: check both** (privacy policy + ads declaration)
7. Create → you land in the App dashboard

## Step 3 — Set up the app (left menu, in this order)

### 3a. App content → Privacy policy
- Privacy policy URL: `https://koyjabo.com/privacy/` (already live, verified)
- "Does your app collect data?" → **Yes**

### 3b. App content → Ads
- "Does your app contain ads?" → **Yes** → Google AdMob

### 3c. App content → Data safety
Copy answers from `play-listing.md` → "Data safety form answers" table.

**Key answers:** location (approx + precise) collected, NOT shared · app activity collected, NOT shared · no data sold · ads = yes.

### 3d. App content → App access
- "Does your app require or use limited access to any restricted permissions?" → **No** (location is not a restricted permission for this questionnaire)

### 3e. App content → Audience
- Target audience: **All ages (including children)** — it's a transport utility. The questionnaire will then ask about ads: select **"Advertising in my app is not designed specifically for children"** → "No" to "targeted ads for kids" → "Children <13 can install" → yes (no accounts, no data collection of kids, no ads targeting kids)

### 3f. App content → Content rating
Fill the IARC questionnaire per `play-listing.md` → all categories **No** → result should be **Everyone (3+)**

### 3g. App content → News apps
- **No** (not a news app)

### 3h. App content → Government apps
- **No**

### 3i. App content → Health & fitness apps
- **No**

## Step 4 — Upload the AAB

**Production → Create new release → Upload bundle:**
`android/app/build/outputs/bundle/release/app-release.aab`

- Release name: `1.0 (1)`
- Release notes (English):
  ```
  First release. 2,400+ Dhaka bus routes, metro rail live status, train schedules, launch & ferry routes, domestic flights, offline maps and AI travel assistant.
  ```
- Release notes (Bangla):
  ```
  প্রথম রিলিজ। ঢাকার ২,৪০০+ বাস রুট, মেট্রো রেল লাইভ স্ট্যাটাস, ট্রেনের সময়সূচি, লঞ্চ ও ফেরির রুট, অভ্যন্তরীণ ফ্লাইট, অফলাইন ম্যাপ ও এআই ভ্রমণ সহকারী।
  ```
- **Save → Review → Send to review** (you can start here, but see Step 6 first — new accounts need closed testing)

## Step 5 — Store listing (left menu → Store presence → Main store listing)

| Field | Value |
|---|---|
| Short description | copy from `play-listing.md` |
| Full description | copy from `play-listing.md` (EN + BN) |
| App icon | Android app icon is auto-generated from the AAB — nothing to upload |
| Feature graphic | upload `play-store-assets/feature-graphic.png` |
| Phone screenshots | upload `1-home.png` … `5-flights.png` (order: 1-home, 2-route-results, 3-bus, 4-metro, 5-flights) |
| Category | Travel & Local → Transportation |
| Tags | `transport bus metro train launch flight bangladesh dhaka fare offline` |
| Contact email | your email |
| Website | https://koyjabo.com |

## Step 6 — ⚠️ Closed testing (REQUIRED for new accounts)

**Your developer account is new (created Aug 2026). Google requires new accounts to complete a closed test before production: ≥20 testers active for 14 consecutive days.**

Do this while review of the listing runs:

1. **Testing → Closed testing → Create track** → pick "Closed testing", name `alpha`
2. Upload the SAME `app-release.aab`
3. Under **Testers**, create an email list: add your Google account + 19 more (friends, family, colleagues — anyone with a Google account)
4. Copy the opt-in link, send to the 20 testers. They must:
   - Open the link on an Android phone (Android 7+)
   - Accept the invitation
   - **Open the app at least once per week for 14 days** (counts as "active tester")
5. After 14 days with ≥20 active testers: **Testing → Closed testing → Promote to production** (or Production → Create new release with the same AAB)
6. Then Production review: typically 2-7 days. App goes live on Play Store.

> **Shortcut:** also enable **Internal testing** track (same AAB) — lets YOU install instantly via opt-in link for your own testing while closed testing counts down. Testers on internal don't count toward the 20 — use closed testers for that.

## Step 7 — Link AdMob

1. AdMob console → **Apps → Koy Jabo - Bangladesh Transport** (ID `6362427006`)
2. After the app is live, use **Link to Play Store** (or Play Console → Monetize → "App set up" → confirm the AdMob app ID `ca-app-pub-9650038259132247~6362427006`)
3. Ad units are already in the APK (banner `8457393290`). Once linked and serving, real fill starts.

## Common rejection pitfalls to avoid

- ❌ Missing privacy policy → we have it live
- ❌ App crashes on launch → verified working on emulator
- ❌ No screenshots → we have 5 clean ones
- ❌ "Declared functionality not found" → the app has native splash, geolocation permission, and bundled assets (not a webview-only shell)
- ❌ Ads declared but policy missing → AdMob consent covered by privacy policy + ads declaration

## After approval

- First update: bump `versionCode` to 2 in `android/app/build.gradle`, run `npm run build:aab`, upload to Production
- Keep `dev` branch in sync with `main`
