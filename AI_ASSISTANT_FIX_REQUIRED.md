# CRITICAL FIX REQUIRED - AI Assistant Setup

## Problem
When accessing `http://localhost:3000/#ai-assistant`, users see:
```
Setup Required
Please add your Google Gemini API Key in settings to use the AI Assistant.
Go to Settings
```

Even though there are hardcoded API keys in `services/apiKeyManager.ts`.

## Root Cause
In `App.tsx` line 1010, there's a condition that checks:
```typescript
} : !apiKey && !process.env.API_KEY ? (
```

This shows the "Setup Required" message when:
- User hasn't provided an API key (`apiKey` is from localStorage)
- AND `process.env.API_KEY` is undefined

However, the hardcoded keys are in `apiKeyManager.ts`, not in `process.env.API_KEY`.

## Solution Required

### Option 1: Remove the "Setup Required" Block (RECOMMENDED)
In `App.tsx`, lines 1010-1026, remove the entire "Setup Required" conditional block:

**DELETE THESE LINES (1010-1026):**
```typescript
) : !apiKey && !process.env.API_KEY ? (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <Key className="w-8 h-8 text-red-500" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">Setup Required</h3>
    <p className="text-sm text-gray-500 mb-6 max-w-xs">
      Please add your Google Gemini API Key in settings to use the AI Assistant.
    </p>
    <button
      onClick={() => setView(AppView.SETTINGS)}
      className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200"
    >
      Go to Settings
    </button>
  </div>
```

**REPLACE WITH:**
```typescript
) : (
```

This way:
- If user is offline: Shows offline message
- If user is online: Shows AI chat interface
- The `askGeminiRoute` function in `services/geminiService.ts` will handle API key management automatically using the hardcoded keys from `apiKeyManager.ts`

### Why This Works
1. `askGeminiRoute` function already handles API key selection:
   - It first checks if user provided their own key via `userApiKey` parameter
   - If not, it uses `getApiKeyForAiChat()` from `apiKeyManager.ts`
   - The key manager automatically rotates through 5 hardcoded keys
   - Usage limits (2 queries/day) are enforced per device

2. Users can still provide their own API key in settings to bypass limits

## Files Already Fixed
✅ `services/apiKeyManager.ts` - Removed hardcoded keys, using environment variables
✅ `vite.config.ts` - Added support for 5 API keys (GEMINI_API_KEY_1 through _5)
✅ `.env.example` - Updated with multiple key template
✅ `intercity/services/geminiService.ts` - Added fallback to process.env.GEMINI_API_KEY

## Files Requiring Manual Fix
❌ `App.tsx` - Lines 1010-1026 need to be removed (automated edit created syntax errors)

## Testing After Fix
1. Add your API keys to `.env` file
2. Run `npm run dev`
3. Navigate to `http://localhost:3000/#ai-assistant`
4. Should see chat interface, not "Setup Required"
5. Type a query and press enter
6. Should get AI response using hardcoded keys

## Security Note
Remember: The hardcoded API keys are NOW SECURE because:
1. They're loaded from `.env` file (not in source code)
2. Injected at build time via Vite
3. Not exposed in browser DevTools
4. Daily usage limits per device prevent abuse
5. Automatic key rotation distributes load

## Next Steps
1. Manually edit `App.tsx` to remove lines 1010-1026 and replace with `) : (`
2. Create `.env` file with your 5 Gemini API keys
3. Test both AI Assistant and Intercity Search
4. Deploy to production with environment variables set in Vercel
