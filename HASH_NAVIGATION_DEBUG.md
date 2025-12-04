# 🔍 HASH NAVIGATION DEBUGGING GUIDE

## Issue Report
User reports that clicking menu items from intercity page redirects to wrong pages (e.g., "Why Use" goes to Settings).

## Current Implementation

### Hash Mapping (App.tsx ~line 418):
```tsx
const hashToView: Record<string, AppView> = {
  'ai-assistant': AppView.AI_ASSISTANT,
  'about': AppView.ABOUT,
  'why-use': AppView.WHY_USE,
  'faq': AppView.FAQ,
  'settings': AppView.SETTINGS,
  'history': AppView.HISTORY,
  'install': AppView.INSTALL_APP,
  'privacy': AppView.PRIVACY,
  'terms': AppView.TERMS
};
```

### Intercity Menu Links (intercity/App.tsx):
```tsx
<a href=".../#ai-assistant">AI Assistant</a>
<a href=".../#about">About</a>
<a href=".../#why-use">Why Use কই যাবো</a>
<a href=".../#faq">Q&A</a>
<a href=".../#settings">App Settings</a>
<a href=".../#history">History</a>
<a href=".../#install">Install App</a>
<a href=".../#privacy">Privacy Policy</a>
<a href=".../#terms">Terms of Service</a>
```

## Debugging Steps

### 1. Open Browser Console
Press F12 or Right-click → Inspect → Console tab

### 2. Test Each Link
From intercity page, click each menu item and check console output.

### 3. Expected Console Output
```
Hash detected: why-use → View: WHY_USE
Hash detected: about → View: ABOUT
Hash detected: faq → View: FAQ
etc.
```

### 4. Check What's Actually Happening
- Does the console show the correct hash?
- Does it show the correct view mapping?
- Does the page actually navigate to that view?

## Possible Issues

### Issue 1: Hash Not Being Detected
**Symptom**: No console output  
**Cause**: useEffect not running  
**Fix**: Check if component is mounting

### Issue 2: Wrong Hash Value
**Symptom**: Console shows different hash than expected  
**Cause**: URL encoding or typo in links  
**Fix**: Check intercity menu links

### Issue 3: Correct Hash, Wrong View
**Symptom**: Console shows correct hash but wrong view  
**Cause**: AppView enum mismatch  
**Fix**: Verify AppView values in types.ts

### Issue 4: View Changes Then Reverts
**Symptom**: Briefly shows correct view then changes  
**Cause**: Another useEffect or state change  
**Fix**: Check for conflicting state updates

## Manual Testing Checklist

Test each link from intercity page:

- [ ] AI Assistant → Should open AI_ASSISTANT view
- [ ] About → Should open ABOUT view
- [ ] Why Use কই যাবো → Should open WHY_USE view
- [ ] Q&A → Should open FAQ view
- [ ] App Settings → Should open SETTINGS view
- [ ] History → Should open HISTORY view
- [ ] Install App → Should open INSTALL_APP view
- [ ] Privacy Policy → Should open PRIVACY view
- [ ] Terms of Service → Should open TERMS view

## Quick Fix to Try

If all links go to the same view (e.g., Settings), try adding this temporary logging:

```tsx
// In App.tsx, around line 430
if (hash && hashToView[hash]) {
  console.log('Hash detected:', hash);
  console.log('Mapped to view:', hashToView[hash]);
  console.log('Current view before:', view);
  setView(hashToView[hash]);
  console.log('View set to:', hashToView[hash]);
}
```

This will help identify where the issue is occurring.

## Report Back

Please test and report:
1. What does the console show when clicking "Why Use"?
2. What page does it actually open?
3. Does it work for any of the other links?
4. Are all links going to the same wrong page, or different wrong pages?

This information will help pinpoint the exact issue.
