# Visitor Count Synchronization Fix

## Problem
Different devices were showing different visitor counts (e.g., 5, 7, 1000) even though the backend reported 8693 total visits. This was because each device was caching visitor data in localStorage, which is device-specific and can become stale.

## Root Cause
1. **Device-specific localStorage**: Each browser/device has its own localStorage, leading to different cached values
2. **Stale cache**: Old cached data wasn't being invalidated aggressively enough
3. **Insufficient polling frequency**: 5-second polling interval was too slow for real-time sync
4. **No cache invalidation on startup**: Old data persisted across sessions

## Solution Implemented

### 1. Aggressive Cache Invalidation
- **On page load**: Automatically clears cache older than 10 seconds
- **On data fetch**: Checks if cached data is older than 30 seconds and triggers fresh fetch
- **Location**: `services/analyticsService.ts`

```typescript
// In getGlobalStats()
const dataAge = Date.now() - (stats.lastUpdated || 0);
const isStale = dataAge &gt; 30000; // 30 seconds

if (isStale) {
    console.log(`⚠️ Cached data is stale (${Math.round(dataAge/1000)}s old)`);
    fetchGlobalStats(); // Trigger fresh fetch
}
```

### 2. Immediate Fresh Fetch on First Visit
Every new session immediately clears stale cache and fetches fresh data from backend:

```typescript
// In incrementVisitCount()
if (!hasInitialized) {
    console.log('🆕 First visit - clearing stale cache...');
    
    // Clear stale cache (older than 10 seconds)
    const dataAge = Date.now() - (stats.lastUpdated || 0);
    if (dataAge &gt; 10000) {
        localStorage.removeItem(GLOBAL_STATS_KEY);
    }
    
    // Immediately fetch fresh data
    await fetchGlobalStats();
}
```

### 3. Increased Polling Frequency
Reduced polling interval from **5 seconds** to **2 seconds** for more aggressive sync:

```typescript
// In HistoryView.tsx
const interval = setInterval(() =&gt; {
    fetchGlobalStats(); // Poll API for latest backend data
    refreshHistoryData();
}, 2000); // Changed from 5000ms
```

### 4. Enhanced Logging
Added detailed logging to track data sources and sync operations:

```typescript
console.log(`📊 Backend sync - Total: ${total}, Active: ${active} [Source: totalVisitors]`);
```

## Backend Connection Details

### WebSocket
- **URL**: `wss://koyjabo-backend.onrender.com`
- **Message Type**: `visitor_update`
- **Payload**:
```json
{
  "type": "visitor_update",
  "stats": {
    "activeUsers": 5,
    "totalVisitors": 8693,
    "todayVisits": 1024,
    "locations": { "Dhaka, BD": { "count": 2 } }
  }
}
```

### REST API
- **URL**: `https://koyjabo-backend.onrender.com/api/stats`
- **Method**: GET
- **Response**: Same format as WebSocket stats object

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Page Load (First Visit)                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ Check localStorage│
                    │   for cached data  │
                    └────────┬───────────┘
                             │
                    ┌────────▼───────────┐
                    │ Is cache &gt; 10s old?│
                    └────────┬───────────┘
                             │
                    ┌────────▼────────┐
                    │  YES: Clear it  │
                    └────────┬────────┘
                             │
              ┌──────────────▼──────────────┐
              │ Fetch fresh data from backend│
              │  via /api/stats endpoint     │
              └──────────────┬───────────────┘
                             │
              ┌──────────────▼──────────────┐
              │  Connect to WebSocket for    │
              │  real-time updates           │
              └──────────────┬───────────────┘
                             │
              ┌──────────────▼──────────────┐
              │  Poll API every 2 seconds    │
              │  for backup sync             │
              └──────────────────────────────┘
```

## Testing

### Test Page
Open `visitor-sync-test.html` in multiple browsers/devices to verify:
1. All devices show the same visitor count
2. WebSocket connects successfully
3. Updates happen in real-time
4. Stale cache is cleared on page load

### Console Logs to Watch For
- ✅ `🆕 First visit in this session - clearing stale cache...`
- ✅ `📊 Backend sync - Total: 8693, Active: 5...`
- ✅ `Connected to KoyJabo Analytics Stream` (WebSocket)
- ⚠️ `⚠️ Cached data is stale (45s old). Triggering fresh fetch...`

### Verification Steps
1. Open the app on Device A
2. Note the total visitor count
3. Open the app on Device B
4. Verify both devices show the **exact same number**
5. Wait 2 seconds and verify they sync together

## Expected Behavior

### ✅ CORRECT
- All devices show **8693** (or current backend value)
- Updates happen within **2 seconds** across all devices
- Fresh data is fetched on **every page load**
- WebSocket provides **instant updates** when available

### ❌ INCORRECT (Old Behavior)
- Device A shows **5 visitors**
- Device B shows **1000 visitors**
- Device C shows **7 visitors**
- Backend shows **8693 visitors** ❌ **MISMATCH**

## Files Modified
1. `services/analyticsService.ts`
   - Enhanced `updateGlobalStatsFromApi()` with better logging
   - Added stale cache detection in `getGlobalStats()`
   - Implemented aggressive cache clearing in `incrementVisitCount()`

2. `components/HistoryView.tsx`
   - Reduced polling interval from 5s to 2s

3. `visitor-sync-test.html` (NEW)
   - Comprehensive test page for debugging sync issues

## Performance Impact
- **Increased API calls**: From 12/min to 30/min per user
- **Network usage**: Minimal (~1KB per request)
- **Backend load**: Acceptable for render.com hosting
- **User experience**: 🚀 **Much better** - always shows accurate data

## Troubleshooting

### Issue: Still seeing different numbers
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for `📊 Backend sync` messages
4. Verify the number matches backend
5. Clear localStorage manually: `localStorage.clear()`
6. Refresh the page

### Issue: WebSocket not connecting
1. Check console for errors
2. Verify backend URL: `wss://koyjabo-backend.onrender.com`
3. Check if backend is running (may be sleeping on Render free tier)
4. REST API will continue to work as fallback

### Issue: Numbers update slowly
1. Check polling interval in console logs
2. Should see updates every 2 seconds
3. Verify network connection is stable
4. Check backend response time (may be slow if cold start)

## Backend Considerations
The backend at `koyjabo-backend.onrender.com` must:
1. Return `totalVisitors` field in stats object
2. Maintain WebSocket connection for real-time updates
3. Handle CORS for API requests
4. Not rate-limit frontend requests (30/min per user)

## Future Improvements
1. Add exponential backoff for WebSocket reconnection
2. Implement Service Worker for background sync
3. Add visual indicator when data is stale
4. Show "last updated X seconds ago" timestamp
5. Add retry logic for failed API calls
6. Implement optimistic UI updates
