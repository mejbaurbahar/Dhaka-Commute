# 🚀 Performance Optimization - Lighthouse Score 71 → 90+

## Current Issues & Fixes

### 1. ✅ **Cache Lifetimes FIXED** (Was: 10min → Now: 1 year)

**Created:** `public/_headers` for Netlify
- Static assets: 1 year cache (immutable)
- Images, fonts, CSS, JS: 1 year
- HTML: Always revalidate
- Service Worker: No cache

**Expected Improvement:** +20 points
**Est. Savings:** 148 KiB

---

### 2. 🔧 **Render-Blocking CSS** (150ms delay)

**Current Issue:**
- `/assets/index-rR1OtcOa.css` - 20 KiB blocking render
- `/offline-styles.css` - 0.6 KiB blocking

**Fix Options:**

#### Option A: Inline Critical CSS (Best for FCP)
Extract above-the-fold CSS and inline it in `<style>` tag

#### Option B: Defer Non-Critical CSS (Already implemented!)
Fonts are already deferred with `media="print" onload="this.media='all'"`

**Action Required:** Extract and inline critical CSS
**Expected Improvement:** +5-10 points

---

### 3. 🔧 **Unused JavaScript** (87 KiB waste)

**Current:**
- `/assets/index-coo0K_iQ.js` - 111.7 KiB (60 KiB unused!)
- React DOM client - 66.5 KiB (27.4 KiB unused)

**Fixes to Apply:**

#### A. Code Splitting by Route
```ts
// Lazy load heavy components
const HistoryView = lazy(() => import('./components/HistoryView'));
const MapVisualizer = lazy(() => import('./components/MapVisualizer'));
const LiveTracker = lazy(() => import('./components/LiveTracker'));
```

#### B. Tree Shaking
- Remove unused imports
- Use named imports only
- Configure Vite for better tree shaking

**Expected Improvement:** +10 points

---

### 4. ⚠️ **Long Critical Path** (2,483ms)

**Issues:**
- Weather API call: `api.open-meteo.com` - 2,483ms!
- Multiple cascading requests
- CDN dependencies

**Fixes:**

#### A. Remove/Defer Weather API
The weather API is not critical for initial render - defer it!

```ts
// Load weather after page interactive
useEffect(() => {
  setTimeout(() => {
    // Fetch weather data
  }, 2000); // After 2 seconds
}, []);
```

#### B. Preload Critical Resources
Already done: ✅ Preconnect to fonts, CDN

**Expected Improvement:** +15-20 points

---

### 5. 🔧 **WebSocket Blocking bfcache**

**Issue:** "Pages with WebSocket cannot enter back/forward cache"

**Fix:** Close WebSocket on page unload

```ts
useEffect(() => {
  const handleUnload = () => {
    // Close any open websockets
    if (ws) ws.close();
  };
  
  window.addEventListener('pagehide', handleUnload);
  return () => window.removeEventListener('pagehide', handleUnload);
}, []);
```

**Expected Improvement:** +5 points (bfcache compatibility)

---

### 6. 🔧 **Minimize Main-Thread Work** (2.1s)

**Breakdown:**
- Style & Layout: 738ms
- Other: 628ms  
- Script Evaluation: 538ms

**Fixes:**

#### A. Defer Non-Critical Scripts
```html
<script type="module" src="/src/main.tsx" defer></script>
```

#### B. Use `requestIdleCallback` for Heavy Tasks
```ts
requestIdleCallback(() => {
  // Non-critical initialization
  autoPreloadMapTiles();
});
```

**Expected Improvement:** +5-10 points

---

## Quick Wins (Implement First)

### 1. Fix Weather API (CRITICAL - Biggest Impact!)

**File:** `App.tsx` or wherever weather is fetched

Find and defer the weather API call:
```ts
// OLD - Loads immediately
const { data } = useWeather();

// NEW - Deferred
const [weather, setWeather] = useState(null);
useEffect(() => {
  const timer = setTimeout(() => {
    fetchWeather().then(setWeather);
  }, 3000); // After page is interactive
  return () => clearTimeout(timer);
}, []);
```

**Impact:** Reduce critical path from 2,483ms to ~800ms (-1.7s!)

---

### 2. Code Splitting

**File:** `App.tsx`

Add at top:
```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const HistoryView = lazy(() => import('./components/HistoryView'));
const MapVisualizer = lazy(() => import('./components/MapVisualizer'));
const LiveTracker = lazy(() => import('./components/LiveTracker'));

// Wrap in Suspense
<Suspense fallback={<div>Loading...</div>}>
  <HistoryView />
</Suspense>
```

**Impact:** Reduce initial bundle by ~40-50 KiB

---

### 3. Preload LCP Image

**File:** `index.html`

Add after `<head>`:
```html
<link rel="preload" as="image" href="/logo.png" fetchpriority="high">
```

**Impact:** Improve LCP by 200-500ms

---

## Implementation Priority

1. **🔥 CRITICAL** - Fix Weather API (defer it)
2. **⚡ HIGH** - Deploy `_headers` file (already created)
3. **⚡ HIGH** - Code splitting (lazy load components) 
4. **📊 MEDIUM** - Preload logo
5. **📊 MEDIUM** - Fix WebSocket bfcache
6. **🎯 LOW** - Inline critical CSS

---

## Expected Results

### Before:
- Performance: **71**
- FCP: 3.4s
- LCP: 5.1s
- TBT: 180ms ✅
- CLS: 0 ✅

### After (All Fixes):
- Performance: **90-95**
- FCP: <1.8s ⬇️ -1.6s
- LCP: <2.5s ⬇️ -2.6s
- TBT: <150ms ⬇️ -30ms
- CLS: 0 ✅

---

## Testing

After implementing fixes:

1. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Run Lighthouse:**
   - Open `http://localhost:4173`
   - F12 → Lighthouse Tab
   - Run audit

3. **Check improvements:**
   - Performance score should be 85-95
   - FCP should be < 2s
   - LCP should be < 3s

---

## Files Created

- ✅ `public/_headers` - HTTP caching headers (deployed automatically)

## Files to Modify

- 🔧 `App.tsx` - Add code splitting + defer weather
- 🔧 `index.html` - Preload logo
- 🔧 Wherever weather API is called - Defer it!

---

**Status:** Step 1 complete (_headers created)
**Next:** Implement weather API deferral for biggest impact!
