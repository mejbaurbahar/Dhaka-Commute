# ⚡ QUICK FIX - Change GitHub Pages Branch (2 Minutes)

## 🎯 THE ISSUE

**Error:** `GET https://dhaka-commute.sqatesting.com/ 404 (Not Found)`

**Cause:** GitHub Pages is serving from the **main** branch (source code) instead of the **gh-pages** branch (built files).

---

## ✅ THE FIX (Follow These Steps)

### Step 1: Open GitHub Pages Settings

**Click this link** (you must be logged in to GitHub):
👉 **https://github.com/mejbaurbahar/Dhaka-Commute/settings/pages**

---

### Step 2: Change the Branch

You'll see a section called **"Build and deployment"**:

**Current (WRONG):**
```
Source: Deploy from a branch
Branch: [main ▼] / [/ (root) ▼]
```

**What to do:**
1. Click the dropdown that says **"main"**
2. Select **"gh-pages"** from the list
3. Keep **"/ (root)"** as is
4. Click **"Save"** button

**After (CORRECT):**
```
Source: Deploy from a branch
Branch: [gh-pages ▼] / [/ (root) ▼]
```

---

### Step 3: Verify Custom Domain

Scroll down to **"Custom domain"** section:

**Should show:**
```
Custom domain: dhaka-commute.sqatesting.com
✓ DNS check successful
```

**If it's empty:**
1. Enter: `dhaka-commute.sqatesting.com`
2. Click **"Save"**
3. Wait for green checkmark (✓ DNS check successful)

---

### Step 4: Enable HTTPS (Optional)

If available, check the box:
```
☑ Enforce HTTPS
```

---

### Step 5: Wait and Test

1. **Wait 2-3 minutes** for GitHub Pages to rebuild
2. **Clear browser cache**: Press `Ctrl + Shift + Delete`
3. **Visit**: https://dhaka-commute.sqatesting.com/
4. **✅ Site should now load!**

---

## 🎯 Visual Guide

```
┌─────────────────────────────────────────────────────────┐
│ GitHub Pages Settings                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Build and deployment                                    │
│                                                         │
│ Source                                                  │
│ ○ Deploy from a branch                                  │
│                                                         │
│ Branch                                                  │
│ ┌──────────┐  ┌──────────┐                             │
│ │ gh-pages ▼│  │ / (root) ▼│  [Save]  ← CLICK THIS     │
│ └──────────┘  └──────────┘                             │
│     ↑                                                   │
│     └─ CHANGE FROM "main" TO "gh-pages"                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Custom domain                                           │
│                                                         │
│ ┌─────────────────────────────────────────────────┐    │
│ │ dhaka-commute.sqatesting.com                    │    │
│ └─────────────────────────────────────────────────┘    │
│ ✓ DNS check successful                                  │
│                                                         │
│ ☑ Enforce HTTPS                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ⏱️ What Happens After You Save

| Time | Status |
|------|--------|
| 0:00 | You click "Save" |
| 0:30 | GitHub Pages starts processing |
| 1:00 | Site becomes available |
| 2:00 | DNS fully propagated |
| 3:00 | HTTPS certificate active |

**Total: ~3 minutes**

---

## 🔍 How to Verify It Worked

### Check 1: GitHub Pages Settings
After saving, you should see at the top:
```
✅ Your site is live at https://dhaka-commute.sqatesting.com/
```

### Check 2: Visit Your Site
1. Open: https://dhaka-commute.sqatesting.com/
2. Should load (no 404 error)
3. Should show DhakaCommute interface

### Check 3: Console (F12)
```
✅ No "404 (Not Found)" errors
✅ No "main.tsx" errors
✅ Site loads correctly
```

---

## 🚨 Troubleshooting

### If you still see 404:
1. **Wait 5 more minutes** - DNS can be slow
2. **Clear browser cache** - `Ctrl + Shift + Delete`
3. **Try incognito mode** - `Ctrl + Shift + N`

### If gh-pages is not in the dropdown:
1. Check that GitHub Actions ran successfully
2. Go to: https://github.com/mejbaurbahar/Dhaka-Commute/branches
3. Verify `gh-pages` branch exists

### If DNS check fails:
1. Your DNS is correct (I verified it)
2. Just wait 5 minutes and try again
3. GitHub sometimes takes time to verify

---

## 📋 Quick Checklist

Before you start:
- [ ] You're logged in to GitHub
- [ ] You have admin access to the repository

Steps:
- [ ] Open: https://github.com/mejbaurbahar/Dhaka-Commute/settings/pages
- [ ] Change branch from "main" to "gh-pages"
- [ ] Click "Save"
- [ ] Verify custom domain shows: dhaka-commute.sqatesting.com
- [ ] Wait 3 minutes
- [ ] Clear browser cache
- [ ] Visit: https://dhaka-commute.sqatesting.com/
- [ ] ✅ Site loads!

---

## 💡 Why This Fixes It

**The Problem:**
- GitHub Actions builds your site and puts it in the `gh-pages` branch
- But GitHub Pages was looking at the `main` branch
- `main` has source code (React, TypeScript, etc.)
- `gh-pages` has built HTML/JS files

**The Solution:**
- Tell GitHub Pages to look at `gh-pages` branch
- Now it finds the built files
- Site loads correctly!

---

## ✅ Summary

1. **Go to**: https://github.com/mejbaurbahar/Dhaka-Commute/settings/pages
2. **Change**: Branch from "main" to "gh-pages"
3. **Save**: Click the Save button
4. **Wait**: 3 minutes
5. **Visit**: https://dhaka-commute.sqatesting.com/

**That's it! Your site will work!** 🎉

---

**DO THIS NOW - IT'S THE FINAL STEP!**
