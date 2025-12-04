# Vercel Auto-Deployment Setup Guide

## Current Status
Your `vercel.json` is correctly configured with:
```json
"git": {
  "deploymentEnabled": {
    "main": true,
    "gh-pages": false
  }
}
```

## Why Auto-Deploy Might Not Be Working

### 1. **Vercel Git Integration Not Connected**
The most common reason is that Vercel isn't connected to your GitHub repository.

### 2. **Previous Build Failures**
Vercel pauses auto-deploy after repeated build failures.

### 3. **Wrong Branch Configuration**
Vercel might be watching a different branch.

## How to Fix Auto-Deployment

### Option 1: Reconnect Vercel to GitHub (RECOMMENDED)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Check Git Integration**
   - Go to: Settings → Git
   - Look for "Connected Git Repository"
   
3. **If Not Connected:**
   - Click "Connect Git Repository"
   - Select GitHub
   - Authorize Vercel
   - Select `mejbaurbahar/Dhaka-Commute`
   - Set Production Branch: `main`

4. **Verify Settings:**
   - ✅ Production Branch: `main`
   - ✅ Auto-deploy: Enabled
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `dist`

### Option 2: Use GitHub Actions (BACKUP)

I've created a GitHub Actions workflow that will deploy to Vercel automatically.

**Setup Steps:**

1. **Get Vercel Tokens**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Link project
   cd h:\Dhaka-Commute
   vercel link
   ```

2. **Get Required Secrets**
   ```bash
   # Get Org ID
   cat .vercel/project.json
   # Copy "orgId"
   
   # Get Project ID
   cat .vercel/project.json
   # Copy "projectId"
   
   # Get Token
   # Go to: https://vercel.com/account/tokens
   # Create new token
   ```

3. **Add Secrets to GitHub**
   - Go to: https://github.com/mejbaurbahar/Dhaka-Commute/settings/secrets/actions
   - Click "New repository secret"
   - Add these secrets:
     - `VERCEL_TOKEN` = Your Vercel token
     - `VERCEL_ORG_ID` = Your org ID
     - `VERCEL_PROJECT_ID` = Your project ID

4. **Push to GitHub**
   - The workflow will run automatically on push to `main`

### Option 3: Manual Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option 4: Manual Deploy via Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on latest deployment
5. Or click "Deploy" → "Deploy from GitHub"

## Verify Auto-Deploy is Working

After reconnecting:

1. **Make a small change**
   ```bash
   echo "# Test" >> README.md
   git add README.md
   git commit -m "Test: Verify auto-deploy"
   git push origin main
   ```

2. **Check Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - You should see a new deployment starting
   - Status should change from "Building" → "Ready"

3. **Check Deployment Logs**
   - Click on the deployment
   - View build logs
   - Ensure no errors

## Common Issues & Solutions

### Issue: "No deployments triggered"
**Solution:** Reconnect GitHub integration (Option 1)

### Issue: "Build fails repeatedly"
**Solution:** 
- Check build logs in Vercel dashboard
- Fix any build errors
- Push fix to GitHub
- Manually trigger one deployment
- Auto-deploy should resume

### Issue: "Deployment stuck in queue"
**Solution:**
- Check Vercel status: https://www.vercel-status.com/
- Wait a few minutes
- If still stuck, cancel and redeploy

### Issue: "Wrong branch deploying"
**Solution:**
- Settings → Git → Production Branch
- Change to `main`
- Save

## Current Deployment Commits

All these commits are ready to deploy:
- `e6b4042` - Service worker fix
- `1b28057` - Deployment trigger
- `a0de75f` - Documentation
- `b8ca557` - Build script fix
- `d01417c` - Navigation fix

## Next Steps

1. **Reconnect Vercel to GitHub** (if not connected)
2. **Verify auto-deploy is enabled**
3. **Check latest deployment status**
4. **If still not working, use GitHub Actions** (Option 2)

## Files Created

- `.github/workflows/vercel-deploy.yml` - GitHub Actions workflow (backup)
- `vercel.json` - Already configured correctly
- `.vercel-trigger` - Trigger file for forcing deployments

**After following these steps, every push to `main` will automatically deploy to Vercel!** 🚀
