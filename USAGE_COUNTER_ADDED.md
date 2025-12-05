# ✅ USAGE COUNTER ADDED - AI Assistant

## Feature Implemented

Added a **usage counter** display in the AI Assistant header that shows users how many queries they've used out of their daily limit.

## What You'll See

### Location
The usage counter appears in the **top-right corner** of the AI Assistant header, next to "Dhaka AI Guide - Online"

### Display Format
```
Dhaka AI Guide          Usage
Online                   0/2
```

Or after using some queries:
```
Dhaka AI Guide          Usage
Online                   1/2
```

Or when limit is reached:
```
Dhaka AI Guide          Usage
Online                   2/2
```

## How It Works

### For Users WITHOUT Their Own API Key:
- **Shows**: Usage counter (e.g., "0/2", "1/2", "2/2")
- **Daily Limit**: 2 AI chat queries per day
- **Resets**: At midnight (00:00)
- **Tracked**: Per device using fingerprinting

### For Users WITH Their Own API Key:
- **Shows**: No usage counter (unlimited usage)
- **Unlimited**: They can ask as many questions as they want
- **No Limits**: Their own API key has no restrictions from our system

## Visual Design

- **Label**: "Usage" in small gray text
- **Counter**: Large blue bold numbers (e.g., "1/2")
- **Position**: Top-right of header
- **Mobile**: Visible on mobile devices
- **Desktop**: Visible on desktop too

## Files Modified

1. **App.tsx**:
   - Added import for `getTotalUsageStats` and `USAGE_LIMITS`
   - Updated mobile header (lines 967-989)
   - Updated desktop header (lines 982-1001)
   - Added conditional rendering: Shows counter only when user hasn't added their own API key

2. **services/apiKeyManager.ts**:
   - Exported `USAGE_LIMITS` constant so it can be used in UI

## Technical Details

### How Usage is Tracked:
```typescript
// Get current usage stats
const stats = getTotalUsageStats();
// stats.totalAiChatToday = number of queries used today
// stats.totalIntercitySearchToday = number of intercity searches used today
// stats.deviceId = unique device identifier

// Get limits
USAGE_LIMITS.AI_CHAT_PER_DAY = 2
USAGE_LIMITS.INTERCITY_SEARCH_PER_DAY = 2
```

### Display Logic:
- ✅ Shows counter when: User is using your hardcoded API keys (no personal key added)
- ❌ Hides counter when: User has added their own API key in settings

## Test It Now!

1. **Refresh** your browser at `http://localhost:3000`
2. **Go to AI Assistant**
3. **Look at top-right** - You should see "Usage 0/2"
4. **Ask a question** - Counter should update to "1/2"
5. **Ask another question** - Counter should update to "2/2"
6. **Try a third question** - Should get daily limit message

## User Experience

This provides transparency to users:
- They know how many free queries they have left
- They can see when they're about to hit the limit
- They understand they can add their own key for unlimited use
- Encourages responsible usage of your shared API keys

## Next Day

- Counter automatically resets to "0/2" at midnight
- Users can make 2 more queries
- No manual reset needed
