# Mobile Testing Checklist 📱

## Quick Test Guide
Access the app at: **http://localhost:3000/**

## Priority 1: Offline Live Location Map

### Test Steps:
1. ✅ **Enable airplane mode** or disconnect from internet
2. ✅ Navigate to Live Location Map (click the location icon)
3. ✅ **Expected Result:** You should see:
   - A large WiFi-off icon
   - "Map Unavailable Offline" heading
   - Clear explanation message
   - Blue tip box with helpful instructions
   
4. ❌ **Old Behavior (Fixed):** Blank/gray map with no message

### Screenshot Comparison:
**Before:** ![Blank gray map]
**After:** Helpful offline message with context

---

## Priority 2: Touch & Scroll Performance

### Scrolling Tests:
1. ✅ **Scroll through bus list** - Should feel smooth (60fps)
2. ✅ **Momentum scrolling** - Flick scroll should continue with inertia
3. ✅ **No horizontal scroll** - Should never scroll left/right accidentally

### Touch Target Tests:
1. ✅ **Tap buttons** - All buttons should be easy to tap (min 44x44px)
2. ✅ **No misclicks** - Buttons should have enough spacing
3. ✅ **Instant feedback** - No 300ms delay, immediate response

### Input Field Tests:
1. ✅ **Focus on input** - Page should NOT zoom in automatically
2. ✅ **Type smoothly** - No lag or stutter while typing  
3. ✅ **Keyboard doesn't cover content** - Bottom nav should adjust

---

## Priority 3: Device-Specific Tests

### iPhone Tests (Safari):
- [ ] **iPhone SE (375px)** - Small screen
- [ ] **iPhone 12/13/14 (390px)** - Standard
- [ ] **iPhone 14 Pro Max (428px)** - Large  
- [ ] **iPhone X - notch support** - Content not cut off

### Android Tests (Chrome):
- [ ] **Small Android (360px)** - Minimum recommended
- [ ] **Pixel 5 (393px)** - Standard
- [ ] **Samsung Galaxy (412px)** - Large

### Tablet Tests:
- [ ] **iPad Mini (768px)** - Should switch to MD layout
- [ ] **iPad Pro (1024px)** - Desktop-like experience

---

## Feature Testing Matrix

| Feature | Online | Offline | Notes |
|---------|--------|---------|-------|
| Bus Search | ✅ | ✅ | Should work offline |
| Route View | ✅ | ✅ | Cached data |
| Live Location Map | ✅ | 🟡 | Shows offline message |
| AI Assistant | ✅ | ❌ | Requires internet (with message) |
| Intercity Search | ✅ | ❌ | Requires internet (with message) |
| History | ✅ | ✅ | Local storage |
| Favorites | ✅ | ✅ | Local storage |

---

## Performance Benchmarks

### Target Metrics:
- **First Contentful Paint:** < 1.8s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.8s
- **Scroll FPS:** 55-60 fps
- **Touch Response:** < 100ms

### Testing Tools:
1. **Chrome DevTools:**
   - Open DevTools (F12)
   - Toggle Device Toolbar (Ctrl+Shift+M)
   - Select device: iPhone 12 Pro
   - Test offline: Network tab > Offline
   
2. **Lighthouse:**
   ```bash
   # Run Lighthouse audit
   npm run build
   npx serve dist
   # Then run Lighthouse in Chrome DevTools
   ```

3. **Mobile Simulation:**
   - **Responsive mode** in browser
   - **Throttling:** Fast 3G or Slow 4G
   - **Reduce motion:** Browser settings

---

## Visual Regression Testing

### Key Screens to Check:
1. ✅ **Home Screen:**
   - Logo displays correctly
   - Search bar is prominent
   - Bottom nav visible and clickable
   
2. ✅ **Bus List:**
   - Cards are readable
   - Touch targets are large enough
   - Scrolling is smooth

3. ✅ **Bus Details:**
   - Route map displays correctly
   - Back button works
   - Fare calculator loads

4. ✅ **Live Location Map:**
   - **Online:** Map loads, user marker shows
   - **Offline:** Clear message displays (NEW!)

5. ✅ **AI Chat:**
   - Messages display correctly
   - Input field doesn't trigger zoom
   - Keyboard doesn't hide send button

6. ✅ **Intercity Search:**
   - Dropdowns work smoothly
   - Results display nicely
   - Mobile layout is compact

---

## Accessibility Tests

### Keyboard Navigation:
- [ ] Tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Enter/Space activates buttons

### Screen Reader:
- [ ] VoiceOver (iOS) reads elements correctly
- [ ] TalkBack (Android) announces properly
- [ ] ARIA labels are present

### Motion Sensitivity:
- [ ] Enable "Reduce Motion" in iOS settings
- [ ] Animations should be minimal
- [ ] App still functions correctly

---

## Network Condition Tests

### Test Scenarios:
1. **Good WiFi (50+ Mbps):**
   - All features work perfectly
   - AI responds quickly
   - Maps load instantly

2. **Slow 4G (~4 Mbps):**
   - Progressive loading
   - Cached content available
   - Loading indicators show

3. **Slow 3G (~1.5 Mbps):**
   - Basic features work
   - Heavy features may timeout
   - Offline fallbacks activate

4. **Offline:**
   - Local bus search works
   - History/favorites work
   - Live map shows offline message ✅ (NEW!)
   - AI/Intercity show clear messages

---

## Bug Reporting Template

### If you find issues:

```markdown
## Issue: [Brief description]

**Device:** [e.g., iPhone 13, Android Pixel 5]
**Browser:** [e.g., Safari 17, Chrome 120]
**Network:** [e.g., WiFi, 4G, Offline]

### Steps to Reproduce:
1. 
2. 
3. 

### Expected Behavior:
[What should happen]

### Actual Behavior:
[What actually happens]

### Screenshot:
[Attach if possible]
```

---

## Quick Fixes Applied

### ✅ Offline Map Issue - FIXED
**Before:** Blank gray screen when offline
**After:** Helpful message with WiFi icon and tips

### ✅ Touch Performance - OPTIMIZED  
**Added:**
- Hardware acceleration for animations
- Momentum scrolling
- No tap delay (touch-action: manipulation)

### ✅ Input Zoom - FIXED
**Before:** Safari would zoom when focusing inputs
**After:** Font-size: 16px prevents unwanted zoom

### ✅ Safe Areas - SUPPORTED
**Added:** Support for iPhone notches (X series and newer)

### ✅ Horizontal Scroll - PREVENTED
**Added:** overscroll-behavior-x: none

---

## Developer Testing Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Test on mobile device (same network)
# Use Network URL: http://192.168.0.200:3000/
```

---

## Success Criteria

### ✅ All tests pass when:
1. Offline Live Map shows helpful message (not blank)
2. Touch interactions feel instant (no delays)
3. Scrolling is buttery smooth (60fps)
4. No unwanted zoom on input focus  
5. Works on screens from 320px to 1024px+
6. Notched devices display correctly
7. Reduced motion users see minimal animations

### 🎉 Ready for Production!

Once all tests pass, the app is fully optimized for mobile users and ready to deploy.

---

**Testing Date:** December 12, 2025  
**Tested By:** [Your Name]  
**Status:** ✅ Ready for testing
