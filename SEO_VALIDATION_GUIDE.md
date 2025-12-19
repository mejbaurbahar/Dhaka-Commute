# 🔍 SEO Validation & Testing Commands
## কই যাবো - Quick Reference Guide

**Purpose:** Instant validation commands and tools  
**Date:** December 19, 2025

---

## 🎯 IMMEDIATE VALIDATION STEPS

### 1. **Test Structured Data (Rich Results)**
```
URL: https://search.google.com/test/rich-results
Test URL: https://koyjabo.com
```

**Expected Results:**
- ✅ WebApplication
- ✅ Organization
- ✅ FAQPage
- ✅ BreadcrumbList
- ✅ LocalBusiness
- ✅ HowTo
- ✅ SoftwareApplication

### 2. **Mobile-Friendly Test**
```
URL: https://search.google.com/test/mobile-friendly
Test URL: https://koyjabo.com
```

**Expected Results:**
- ✅ Page is mobile-friendly
- ✅ Text is readable
- ✅ Tap targets are sized appropriately
- ✅ Content is sized to viewport

### 3. **PageSpeed Insights**
```
URL: https://pagespeed.web.dev/
Test URL: https://koyjabo.com
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 4. **Facebook Debugger**
```
URL: https://developers.facebook.com/tools/debug/
Test URL: https://koyjabo.com
```

**Actions:**
1. Enter URL
2. Click "Debug"
3. Check OG tags
4. Click "Scrape Again" if needed

### 5. **Twitter Card Validator**
```
URL: https://cards-dev.twitter.com/validator
Test URL: https://koyjabo.com
```

**Expected:**
- ✅ Summary card preview
- ✅ Image displays
- ✅ Description shows

---

## 🌐 GOOGLE SEARCH COMMANDS

### Site Indexation Check
```
site:koyjabo.com
```
**Shows:** All indexed pages

### Specific Page Check
```
site:koyjabo.com/intercity
```
**Shows:** If intercity page is indexed

### Title Search
```
intitle:কই যাবো
```
**Shows:** Pages with brand name in title

### Exact Match
```
"কই যাবো"
```
**Shows:** Exact brand mentions

### Cache Check
```
cache:koyjabo.com
```
**Shows:** Google's cached version

### Related Sites
```
related:koyjabo.com
```
**Shows:** Similar websites

### Info Check
```
info:koyjabo.com
```
**Shows:** Information Google has about site

---

## 📊 GOOGLE SEARCH CONSOLE QUERIES

### In GSC Search Bar:

#### Check Impressions
```
Filter: Last 28 days
Query: কই যাবো
```

#### Mobile vs Desktop
```
Device: Mobile
Compare to: Desktop
```

#### Top Queries
```
Performance > Search results
Sort by: Impressions DESC
```

#### Coverage Issues
```
Coverage > Error
Fix and request indexing
```

---

## 🛠️ CURL COMMANDS (Technical Test)

### Check Headers
```bash
curl -I https://koyjabo.com
```

**Look for:**
- Status: 200 OK
- Content-Type: text/html
- Cache-Control headers

### Check robots.txt
```bash
curl https://koyjabo.com/robots.txt
```

**Verify:**
- Proper User-agent rules
- Sitemap URL present
- No disallow of important pages

### Check Sitemap
```bash
curl https://koyjabo.com/sitemap.xml
```

**Verify:**
- Valid XML structure
- All URLs present
- Recent lastmod dates

### Check Manifest
```bash
curl https://koyjabo.com/manifest.json
```

**Verify:**
- Valid JSON
- Name, icons present
- PWA metadata correct

---

## 🔗 BACKLINK CHECKING

### Free Tools

#### 1. Google Search Console
```
Links > External Links
See: Who links to your site
```

#### 2. Bing Webmaster Tools
```
Site Explorer > Inbound Links
```

#### 3. Public Backlink Checkers
- Ahrefs Free Backlink Checker
- Moz Link Explorer (Free)
- Ubersuggest Backlink Checker

---

## 📈 ANALYTICS VALIDATION

### Check If Analytics Working

#### Vercel Analytics
```
Dashboard > Analytics
Check: Real-time visitors
```

#### Google Analytics (if added)
```
Realtime > Overview
Test: Visit site in incognito
```

---

## 🎨 SCHEMA VALIDATION

### JSON-LD Validator
```
URL: https://validator.schema.org/
Paste: Your JSON-LD code
```

**Test Each Schema:**
1. WebApplication
2. Organization  
3. LocalBusiness
4. FAQPage
5. HowTo
6. SoftwareApplication

---

## 🔐 SECURITY & HTTPS

### SSL Check
```
URL: https://www.ssllabs.com/ssltest/
Test: koyjabo.com
```

**Target:** A+ rating

### Mixed Content Check
```
URL: https://www.whynopadlock.com/
Test: koyjabo.com
```

**Ensure:** No mixed content errors

---

## 📱 PWA VALIDATION

### Lighthouse Audit
```
Chrome DevTools > Lighthouse
Categories: Performance, PWA, SEO
```

**PWA Checklist:**
- ✅ Registers a service worker
- ✅ Responds with 200 when offline
- ✅ Has a manifest
- ✅ Is installable
- ✅ Uses HTTPS

### PWA Testing
```
Chrome DevTools > Application
Check:
- Service Workers (active)
- Manifest (valid)
- Storage (caching works)
```

---

## 🌍 INTERNATIONAL SEO

### Hreflang Validator
```
URL: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
```

**If implementing multi-regional:**
- Validate hreflang tags
- Check x-default tag

---

## 🎯 COMPETITOR ANALYSIS

### Compare with Competitors
```
Google Search: "Dhaka bus routes"
Analyze: Top 5 results
```

**Check Their:**
- Meta descriptions
- Title tags
- Content length
- Structured data
- Page speed

### SEO Comparison Tools
- Similarweb (traffic estimates)
- Ahrefs Site Explorer
- Moz Domain Overview

---

## 📊 RANK TRACKING

### Manual Check
```
Google Search (Incognito):
- "Dhaka bus routes"
- "Bangladesh transport app"
- "কই যাবো"
- "MRT Line 6 guide"
```

**Note:** Position for each query

### Rank Tracking Tools
- Google Search Console (positions)
- Bing Webmaster Tools
- SERPWatcher (free trial)
- AccuRanker (paid)

---

## 🚀 PERFORMANCE MONITORING

### Core Web Vitals Check
```
PageSpeed Insights > koyjabo.com
Look for:
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
```

### WebPageTest
```
URL: https://www.webpagetest.org/
Test: koyjabo.com
Location: Choose closest server
```

---

## 📧 SUBMIT TO SEARCH ENGINES

### Google
```
1. Google Search Console
2. Sitemaps > Add sitemap
3. URL: https://koyjabo.com/sitemap.xml
4. Submit
```

### Bing
```
1. Bing Webmaster Tools
2. Sitemaps > Submit Sitemap
3. URL: https://koyjabo.com/sitemap.xml
4. Submit
```

### Yandex (Russian)
```
1. Yandex Webmaster
2. Indexing > Sitemap files
3. Add: https://koyjabo.com/sitemap.xml
```

### Baidu (Chinese - if relevant)
```
1. Baidu Webmaster Tools
2. Submit sitemap: https://koyjabo.com/sitemap.xml
```

---

## 🔔 SET UP ALERTS

### Google Search Console Alerts
```
Settings > Email preferences
Enable: All notifications
```

### Uptime Monitoring
Free options:
- UptimeRobot.com
- StatusCake.com
- Pingdom (basic)

**Monitor:**
- https://koyjabo.com
- https://koyjabo.com/intercity

---

## 📝 CONTENT QUALITY CHECKS

### Readability
```
URL: https://readable.com/
Test: Page content
Target: 8th grade level or lower
```

### Grammar/Spelling
```
Tools:
- Grammarly
- LanguageTool
- Hemingway Editor
```

### Duplicate Content
```
Google Search: "exact sentence from your page"
Ensure: No duplicates
```

---

## 🎨 IMAGE SEO

### Image Optimization Check
```
Tools:
- TinyPNG.com (compression)
- ImageOptim (desktop)
- Squoosh.app (online)
```

### Alt Text Validation
```
Chrome DevTools > Elements
Search for: <img
Check: All have alt attributes
```

---

## 🏆 FINAL VALIDATION CHECKLIST

### Run These Tests Now:
- [ ] Rich Results Test
- [ ] Mobile-Friendly Test
- [ ] PageSpeed Insights
- [ ] Facebook Debugger
- [ ] Twitter Card Validator
- [ ] Schema Validator
- [ ] SSL Test
- [ ] Lighthouse Audit (PWA)
- [ ] Check robots.txt
- [ ] Verify sitemap
- [ ] Test 404 page
- [ ] Check meta tags (View Source)

### Weekly Checks:
- [ ] Google Search Console
- [ ] Bing Webmaster
- [ ] Core Web Vitals
- [ ] Uptime status
- [ ] Rank positions

### Monthly Reviews:
- [ ] Full SEO audit
- [ ] Backlink profile
- [ ] Content freshness
- [ ] Sitemap updates
- [ ] Performance metrics

---

## ⚡ QUICK WIN CHECKLIST

### Do These Now (30 minutes):
1. [ ] Submit sitemap to GSC
2. [ ] Request indexing for homepage
3. [ ] Test with Rich Results Tool
4. [ ] Share on social media (test OG tags)
5. [ ] Check mobile-friendly
6. [ ] Run PageSpeed Insights
7. [ ] Verify analytics working
8. [ ] Set up GSC email alerts

---

## 📚 BOOKMARK THESE URLS

### Testing Tools
```
- Rich Results: https://search.google.com/test/rich-results
- Mobile Test: https://search.google.com/test/mobile-friendly
- PageSpeed: https://pagespeed.web.dev/
- Schema Validator: https://validator.schema.org/
- FB Debugger: https://developers.facebook.com/tools/debug/
- Twitter Validator: https://cards-dev.twitter.com/validator
- SSL Test: https://www.ssllabs.com/ssltest/
```

### Search Console
```
- Google: https://search.google.com/search-console
- Bing: https://www.bing.com/webmasters
```

### Documentation
```
- Schema.org: https://schema.org/
- Google SEO: https://developers.google.com/search/docs
- Web.dev: https://web.dev/
```

---

## 🎯 SUCCESS METRICS

### Track These Weekly:
1. **Organic Traffic**
   - Sessions from Google
   - New users
   - Pages/session

2. **Rankings**
   - Position for top keywords
   - Featured snippets
   - Local pack ranking

3. **Technical**
   - Core Web Vitals
   - Index coverage
   - Mobile usability

4. **Engagement**
   - Bounce rate
   - Time on site
   - Conversions

---

## 🚀 READY TO LAUNCH!

Your SEO is **production-ready** with:
- ✅ Advanced structured data
- ✅ Optimized technical SEO
- ✅ Mobile-first approach
- ✅ Social media optimization
- ✅ Performance excellence

**Next step:** Execute the validation checklist above!

---

**Created:** December 19, 2025  
**Purpose:** Quick reference for SEO testing & validation  
**Use:** Before and after deployments
