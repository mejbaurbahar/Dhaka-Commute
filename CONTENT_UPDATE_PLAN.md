# Content Update Plan - Remove Google Gemini API & Update Pages

## Summary
Remove all Google Gemini API key references and replace with Koy Jabo Official AI Agent. Update all content pages to reflect current app state.

## Files to Update

### 1. App.tsx - Main Application File

#### Locations of "Google Gemini" or "Gemini API" References:

**Line 332:** Settings page - "Google Gemini API Key" header
**Line 335:** Settings page - Instructions text
**Line 1655:** Privacy Policy - API Key mention
**Line 1662:** Privacy Policy - Google Gemini AI section
**Line 1770:** Terms - Google Gemini AI section
**Line 2103:** FAQ - AI Assistant description

#### Changes Needed:

1. **Settings Section (Lines 329-415)**: 
   - REMOVE entire API Key management section
   - Replace with simple message: "AI Assistant powered by Koy Jabo Official AI Agent - No API key required!"

2. **Privacy Policy (Line 1655)**:
   - Remove mention of "Google Gemini API key"
   - Update to: "Your search history and preferences (stored locally on your device)"

3. **Privacy Policy (Line 1662)**:
   - Replace "Google Gemini AI" section with:
   - "Koy Jabo AI Assistant: Our built-in AI assistant processes your queries to help you find the best routes. Your questions are handled securely and are not stored permanently."

4. **Terms of Service (Line 1770)**:
   - Replace "Google Gemini AI" with:
   - "Koy Jabo AI Assistant: Our AI assistant is provided as-is to help you navigate Bangladesh more easily."

5. **FAQ (Line 2103)**:
   - Replace "The AI Assistant is powered by Google Gemini" with:
   - "The AI Assistant is powered by Koy Jabo Official AI Agent, our intelligent route-finding system"

6. **About Page & Why Use Page**:
   - Verify these pages highlight all current features:
     - 280+ Local Bus Routes
     - 80+ BRTC Services (Local, Intercity, Regional)
     - Metro Rail (MRT Line 6)
     - Railway & Airport Finder
     - Emergency Helplines (999, 100, 102, 199, 109)
     - 80+ Emergency Services across Bangladesh
     - Live Navigation with GPS
     - Offline Support
     - AI Assistant (Koy Jabo Official)
     - Bilingual (English/Bengali)
     - Dark Mode
     - Install as PWA

### 2. components/ApiKeyManagement.tsx

**Lines to Update:**
- Line 43: Remove "AIzaSy" validation
- Line 137: "Manage your Gemini API key" → Update messaging
- Line 359: "Enter Your Gemini API Key" → Update or remove

**Action**: This entire component should be deprecated or repurposed to remove API key management.

### 3. services/geminiService.ts (probably exists)

**Action**: Check if this file exists and update to use official backend API instead of user-provided keys.

### 4. test-api-key.js

**Action**: Delete this file as it's no longer needed.

## New Content to Add

### Updated Feature List (for About/Why Use pages):

**Core Features:**
- 🚌 280+ Dhaka local bus routes with live updates
- 🚃 Dhaka Metro Rail (MRT Line 6) with real-time fare calculation
- 🚍 80+ BRTC bus services (Local, Intercity, Regional Intercity)
- 🚂 Railway station & airport finder  
- 📍 Live GPS navigation with real-time tracking

**Smart Features:**
- 🤖 AI-powered route assistant (Koy Jabo Official AI Agent)
- 🔍 Intelligent search (English & Bengali)
- 🗺️ Interactive route visualization
- 💰 Accurate fare calculator (2024 government rates)
- ⭐ Favorite routes & search history
- 📱 Works offline - all data stored locally

**Safety & Emergency:**
- 🚨 One-tap emergency helplines (999, 100, 102, 199, 109)  
- 🏥 80+ Emergency Services (Hospitals, Police, Fire Stations) across Bangladesh
- 📍 Location-based emergency service finder

**User Experience:**
- 🌙 Dark mode support
- 📲 Install as mobile app (PWA)
- 🔒 Privacy-first - no data collection
- 🌐 Completely free - no ads, no registration

## Implementation Priority

1. ✅ HIGH: Remove all Google Gemini API references in App.tsx
2. ✅ HIGH: Update Privacy Policy
3. ✅ HIGH: Update Terms of Service  
4. ✅ HIGH: Update FAQ
5. ✅ MEDIUM: Update About page content
6. ✅ MEDIUM: Update Why Use page content
7. ✅ LOW: Handle ApiKeyManagement.tsx component
8. ✅ LOW: Delete test-api-key.js

## Notes

- Keep all content bilingual where appropriate
- Maintain the same friendly, helpful tone
- Emphasize "free", "privacy-first", and "no registration required"
- Highlight that this is an official service with built-in AI
