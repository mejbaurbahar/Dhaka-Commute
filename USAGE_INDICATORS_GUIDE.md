# Usage Indicators Implementation Guide

## ✅ Created Component: `components/UsageIndicators.tsx`

This file contains two components:
- `AIUsageIndicator` - Shows AI chat usage (X/2 queries)
- `IntercityUsageIndicator` - Shows intercity search usage (X/2 searches)

---

## 📍 Where to Add Them:

### 1. AI Chat Page (`App.tsx`)

**Location**: Around line 987, in the AI chat header

**Add import**:
```typescript
import { AIUsageIndicator } from './components/UsageIndicators';
```

**Add component** (after the Online/Offline status):
```tsx
// Around line 990, after the online status paragraph
<p className={`text-xs font-bold flex items-center gap-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span> {isOnline ? 'Online' : 'Offline'}
</p>
<AIUsageIndicator />  {/* ADD THIS LINE */}
```

---

### 2. Intercity Page (`intercity/App.tsx`)

**Copy the component first**:
```bash
Copy-Item "h:\Dhaka-Commute\components\UsageIndicators.tsx" -Destination "h:\Dhaka-Commute\intercity\components\UsageIndicators.tsx"
```

**Add import** (top of file):
```typescript
import { IntercityUsageIndicator } from './components/UsageIndicators';
```

**Add component** (in the sticky search header, around line 518):
```tsx
// After the search button, before closing the form div
<div className="mt-2 flex justify-center">
  <IntercityUsageIndicator />
</div>
```

---

### 3. History Page - API Usage Stats

**Location**: `App.tsx` - in the `renderHistory` function

**Find the History rendering section** and add this at the top:

```tsx
{/* API Usage Statistics */}
<div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white p-6 rounded-2xl mb-6 shadow-xl">
  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
    <Sparkles className="w-5 h-5" />
    Today's API Usage
  </h3>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <p className="text-xs opacity-80 mb-1">AI Chat</p>
      <p className="text-3xl font-bold">
        {(() => {
          const stats = getTotalUsageStats();
          return stats.totalAiChatToday;
        })()}/2
      </p>
      <p className="text-xs mt-1">
        {(() => {
          const remaining = getRemainingUses();
          return `${remaining.aiChat} remaining`;
        })()}
      </p>
    </div>
    
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <p className="text-xs opacity-80 mb-1">Intercity Search</p>
      <p className="text-3xl font-bold">
        {(() => {
          const stats = getTotalUsageStats();
          return stats.totalIntercitySearchToday;
        })()}/2
      </p>
      <p className="text-xs mt-1">
        {(() => {
          const remaining = getRemainingUses();
          return `${remaining.intercitySearch} remaining`;
        })()}
      </p>
    </div>
  </div>
  
  <div className="mt-4 pt-4 border-t border-white/20">
    <p className="text-xs opacity-70">
      Resets in: {getTimeUntilReset()}
    </p>
    <p className="text-xs opacity-50 mt-1">
      Want unlimited? Add your own API key in Settings!
    </p>
  </div>
</div>
```

---

## 🎨 Visual Preview:

### AI Chat Header:
```
┌────────────────────────────────────┐
│ 🤖 Dhaka AI Guide                  │
│ 🟢 Online  │ 2/2 free queries today│
└────────────────────────────────────┘
```

### Intercity Search:
```
┌─────────────────────────────────────┐
│ [Search Button]                     │
│ 🔍 1/2 free searches today          │
└─────────────────────────────────────┘
```

### History Page:
```
┌──────────────────────────────────────┐
│ ✨ Today's API Usage                 │
│                                      │
│  AI Chat          Intercity Search  │
│  2/2              1/2               │
│  0 remaining      1 remaining       │
│                                      │
│  Resets in: 3h 45m                  │
│  Want unlimited? Add your own key!  │
└──────────────────────────────────────┘
```

---

## ✅ Quick Implementation Steps:

1. **Copy intercity component**:
   ```bash
   cd h:\Dhaka-Commute
   Copy-Item "components\UsageIndicators.tsx" -Destination "intercity\components\UsageIndicators.tsx"
   ```

2. **Update App.tsx** (main app):
   - Add import: `import { AIUsageIndicator } from './components/UsageIndicators';`
   - Add `<AIUsageIndicator />` in AI chat header

3. **Update intercity/App.tsx**:
   - Add import: `import { IntercityUsageIndicator } from './components/UsageIndicators';`
   - Add `<IntercityUsageIndicator />` after search button

4. **Update History section** in main `App.tsx`:
   - Add the API Usage Statistics block shown above

---

## 🎯 Result:

Users will now see:
- ✅ How many free queries/searches they have left
- ✅ When their limit resets
- ✅ Total usage for today on History page
- ✅ Clear upgrade path (add own key)

**This creates transparency and encourages responsible usage!** 🎉
