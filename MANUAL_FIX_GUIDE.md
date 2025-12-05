# MANUAL FIX REQUIRED - AI Assistant and Intercity Bus Setup

## ✅ Already Completed
1. **services/apiKeyManager.ts** - Your 5 API keys are restored and ready to use
2. **vite.config.ts** - Configured for API key injection  
3. **.env.example** - Updated with multi-key template

## ⚠️ Manual Edits Required (Automated edits created syntax errors)

### 1. Fix `App.tsx` - Remove "Setup Required" Block

**Location**: Lines 1010-1026

**Find this code:**
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
      ) : (
```

**Replace with:**
```typescript
      ) : (
```

**Why**: This removes the check that blocks users from using the AI when they don't have their own API key. Your hardcoded keys will be used automatically.

---

### 2. Fix `intercity/services/geminiService.ts` - Use API Key Manager

**Step A**: Add import at the top of the file (around lines 1-3)

**Find:**
```typescript
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RoutingResponse } from "../types";
```

**Replace with:**
```typescript
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RoutingResponse } from "../types";
import { getApiKeyForIntercitySearch } from "../../services/apiKeyManager";
```

**Step B**: Update the API key logic (around lines 507-515)

**Find:**
```typescript
  try {
    // Get API key from localStorage
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      throw new Error('API key not found. Please set your Gemini API key in settings.');
    }

    // Create AI instance with user's API key  
    const ai = new GoogleGenAI({ apiKey });
```

**Replace with:**
```typescript
  try {
    // Get API key - priority: user's key > managed keys (automatic rotation)
    let apiKey = localStorage.getItem('gemini_api_key');
    
    // If no user key, use managed API keys with usage limits
    if (!apiKey || apiKey.trim() === '') {
      apiKey = getApiKeyForIntercitySearch();
      
      if (!apiKey) {
        throw new Error('Daily search limit reached. Your limit will reset tomorrow. For unlimited searches, you can add your own API key in settings.');
      }
    }
    
    const ai = new GoogleGenAI({ apiKey });
```

**Why**: This makes intercity search automatically use your 5 API keys when users don't provide their own.

---

## 🔧 How Your System Will Work After These Fixes

1. **AI Assistant** (`http://localhost:3000/#ai-assistant`):
   - Will show chat interface immediately (no "Setup Required")
   - Uses your 5 API keys automatically with rotation
   - Daily limit: 2 chats per device
   - Users can add their own key in settings for unlimited use

2. **Intercity Bus Search** (`http://localhost:3000/#intercity`):
   - Works automatically with your 5 API keys
   - Daily limit: 2 searches per device  
   - Users can add their own key in settings for unlimited use

3. **API Key Rotation**:
   - Automatically cycles through your 5 keys
   - Tracks usage per device using fingerprinting
   - Resets daily limits at midnight

## 📝 Testing After Manual Fix

1. Make the edits above
2. Refresh your browser (`http://localhost:3000`)
3. Go to AI Assistant - should show chat interface
4. Type a question - should get a response  
5. Go to Intercity - search "Dhaka to Cox's Bazar" - should work

## ⚡ Your 5 API Keys (Already Active in apiKeyManager.ts)
- AIzaSyAUATfDS1vbTWWcHjpSQ3_7GR-zB1GNnQU
- AIzaSyD_8TTAF5DZtZhwb9qoAsyu0mObWR6arRM
- AIzaSyAfmELE0-ExlyIGYAORmvYVlnwDlk0JUQ4
- AIzaSyByWBx5dRtb6s-yRx_iUdIkXS5Ii-QiSc0
- AIzaSyDM8F8Yi55Ci4LAThxW99TNFQWacWZOJc0

These keys are hardcoded in `services/apiKeyManager.ts` and ready to use!
