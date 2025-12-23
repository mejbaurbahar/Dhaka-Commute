# ✅ NAVIGATION UI - TRANSLATION APPLICATION GUIDE

## 📋 **Marked Elements from Image - Translation Keys Ready!**

All translation keys have been added to `i18n/translations.ts` (lines 143-150).  
Now they need to be applied to the UI components.

### ✅ **Translation Keys Available:**

| Element | Bangla | English | Key |
|---------|--------|---------|-----|
| Start Navigation | নেভিগেশন শুরু করুন | Start Navigation | `liveNav.startNavigation` |
| Layers | লেয়ার | Layers | `liveNav.layers` |
| NONSTOP | নন-স্টপ | NONSTOP | `liveNav.nonstop` |
| STOP | স্টপ | STOP | `liveNav.stop` |
| DESTINATION | গন্তব্য | DESTINATION | `liveNav.destinationLabel` |
| Help | সাহায্য | Help | `liveNav.help` |
| HOME-FROM | হোম-থেকে | HOME-FROM | `liveNav.homeFrom` |
| HOME-TO | হোম-পর্যন্ত | HOME-TO | `liveNav.homeTo` |

### 📝 **Required Changes in App.tsx:**

#### **1. Add useLanguage Hook (if not already present)**

At the top of the App component (around line 600-700), add:
```typescript
const { t } = useLanguage();
```

#### **2. Apply Translations:**

**Line 2363** - Start Navigation Button:
```typescript
// Before:
Start Navigation

// After:
{t('liveNav.startNavigation')}
```

**Line 2342** - Aria Label:
```typescript
// Before:
aria-label="Start Navigation"

// After:
aria-label={t('liveNav.startNavigation')}
```

### 🔍 **Files to Search For Other Elements:**

1. **"Layers"** - Look in LiveTracker.tsx or map-related components
2. **"NONSTOP", "STOP", "DESTINATION"** badges - Look in LiveTracker.tsx or route display components
3. **"Help"** button - Look in LiveTracker.tsx or EmergencyHelplineModal.tsx
4. **"HOME-FROM", "HOME-TO"** labels - Look in navigation/trip planning components

### 📦 **Quick Search Commands:**

```bash
# Find "Layers" text
grep -n "Layers" components/*.tsx App.tsx

# Find NONSTOP badge
grep -n "NONSTOP\|Nonstop" components/*.tsx App.tsx

# Find STOP badge
grep -n "STOP\|Stop" components/*.tsx App.tsx

# Find DESTINATION badge
grep -n "DESTINATION\|Destination" components/*.tsx App.tsx

# Find Help button
grep -n "Help" components/*.tsx App.tsx

# Find HOME labels
grep -n "HOME-FROM\|HOME-TO" components/*.tsx App.tsx
```

### ✅ **Status:**

- ✅ Translation keys added to `i18n/translations.ts`
- ✅ `useLanguage` hook imported in App.tsx (line 31)
- ⏳ Translations need to be applied to UI components
- ⏳ Need to add `const { t } = useLanguage();` in App component
- ⏳ Need to find and translate other marked elements

### 🎯 **Next Steps:**

1. Add `const { t } = useLanguage();` to App component
2. Replace "Start Navigation" text with `{t('liveNav.startNavigation')}`
3. Find and translate other marked elements (Layers, badges, Help button)
4. Test language switching

---

**All translation keys are ready and waiting to be applied!** 🌍🇧🇩✨
