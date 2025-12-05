# Quick Fix - Update Intercity Error Message

## File: `intercity/services/geminiService.ts`

### Line 514 - Replace This Line:

**Find**:
```typescript
throw new Error('⚠️ Daily Limit Reached\\n\\nYou\\'ve used your 2 free intercity searches for today. Your limit will reset in a few hours.\\n\\n📧 Need more searches? Contact the Developer:\\n🔗 LinkedIn: https://linkedin.com/in/mejbaur/');
```

**Replace with**:
```typescript
throw new Error('⚠️ Daily limit reached. Come back later to continue your searches.');
```

---

## What This Does:

**Before** (When limit is 2/2):
```
Title: No Routes Found
Message: An error occurred while planning your trip. 
         Please try again.
```

**After** (When limit is 2/2):
```
Title: Daily Usage Limit Reached (orange warning)
Message: ⚠️ Daily limit reached. Come back later to 
         continue your searches.
```

---

## Why It Will Work:

The error detection in `intercity/App.tsx` already checks for:
- `error.includes('Daily Limit Reached')`
- `error.includes('Daily limit')`  ✅ This will match!
- `error.includes('usage limit')`

So the new message "Daily limit reached..." will trigger:
- Orange background instead of red ✅
- Clock icon instead of error icon ✅  
- "Daily Usage Limit Reached" as title ✅

---

## Manual Edit:

Open `intercity/services/geminiService.ts` line 514 and make the change above.

**Result**: Clean, simple error message that users understand!
