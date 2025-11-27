# 🔧 Fix 503 Error - Quick Guide

## Problem
`GET https://dhakacommute.sqatesting.com/ 503 (Service Unavailable)`

## Root Cause
Your DNS is correctly pointing to Netlify, but the custom domain `dhakacommute.sqatesting.com` hasn't been added to your Netlify site settings.

## ✅ Solution (5 minutes)

### Step 1: Login to Netlify
Go to: https://app.netlify.com

### Step 2: Navigate to Your Site
1. Click on **"dhaka-commute"** site
2. Go to **"Domain settings"** (or "Site settings" → "Domain management")

### Step 3: Add Custom Domain
1. Click **"Add custom domain"** or **"Add domain alias"**
2. Enter: `dhakacommute.sqatesting.com`
3. Click **"Verify"**
4. Click **"Add domain"** or **"Yes, add domain"**

### Step 4: Wait for SSL
- Netlify will automatically provision an SSL certificate
- This takes 1-2 minutes
- You'll see "HTTPS" with a green checkmark when ready

### Step 5: Test
1. Wait 2-3 minutes for DNS propagation
2. Visit: https://dhakacommute.sqatesting.com
3. Clear browser cache if needed (Ctrl+Shift+R)

## 🎯 Expected Result

✅ Site loads successfully  
✅ HTTPS enabled with valid certificate  
✅ No 503 errors  

## 📝 Notes

- Your DNS is already correctly configured:
  ```
  CNAME: dhakacommute → dhaka-commute.netlify.app
  ```
- Your build is successful (dist folder is ready)
- You just need to tell Netlify to serve this domain

## 🆘 Still Not Working?

1. **Check Netlify Build Status**
   - Go to: Deploys tab
   - Ensure latest deploy is "Published"

2. **Verify Domain in Netlify**
   - Go to: Domain settings
   - Confirm `dhakacommute.sqatesting.com` is listed

3. **Clear All Caches**
   - Browser cache (Ctrl+Shift+R)
   - Try incognito mode
   - Try different browser

4. **Check DNS Propagation**
   - Visit: https://dnschecker.org
   - Enter: `dhakacommute.sqatesting.com`
   - Should show: `dhaka-commute.netlify.app`

## 🚀 After Fix

Once working, you can:
- Remove old GitHub Pages workflow (`.github/workflows/`)
- Remove `CNAME` file from `public/` folder
- Update any documentation referencing GitHub Pages
