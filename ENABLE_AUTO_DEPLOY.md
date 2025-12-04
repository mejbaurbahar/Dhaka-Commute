# IMPORTANT: How to Enable Auto-Deployment

## GitHub Actions Disabled
The GitHub Actions workflow has been removed because it requires manual setup of secrets.

## Use Vercel's Native Git Integration Instead

This is **MUCH EASIER** and requires no configuration!

### Steps to Enable Auto-Deploy (2 minutes):

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Login if needed

2. **Select Your Project**
   - Find and click on your project (koyjabo or Dhaka-Commute)

3. **Go to Settings**
   - Click "Settings" tab at the top

4. **Connect to GitHub**
   - Click "Git" in the left sidebar
   - Look for "Git Repository" section
   
5. **If NOT Connected:**
   - Click "Connect Git Repository" button
   - Select "GitHub"
   - Authorize Vercel (if prompted)
   - Select repository: `mejbaurbahar/Dhaka-Commute`
   - Click "Connect"

6. **Configure Production Branch**
   - Set "Production Branch" to: `main`
   - Save changes

7. **Verify Auto-Deploy is Enabled**
   - Should see: ✅ "Auto-deploy enabled for main branch"

### That's It!

From now on, **every push to `main` will automatically deploy to Vercel**.

## Test It

```bash
# Make a small change
echo "# Auto-deploy test" >> README.md

# Commit and push
git add README.md
git commit -m "Test: Verify auto-deploy"
git push origin main

# Check Vercel dashboard - should see new deployment!
```

## If You Still Want GitHub Actions

If you prefer GitHub Actions over Vercel's native integration:

1. **Get Vercel Token**
   - Go to: https://vercel.com/account/tokens
   - Create new token
   - Copy it

2. **Get Project Info**
   ```bash
   npm i -g vercel
   vercel login
   cd h:\Dhaka-Commute
   vercel link
   cat .vercel/project.json
   ```
   - Copy `orgId` and `projectId`

3. **Add GitHub Secrets**
   - Go to: https://github.com/mejbaurbahar/Dhaka-Commute/settings/secrets/actions
   - Click "New repository secret"
   - Add:
     - Name: `VERCEL_TOKEN`, Value: your token
     - Name: `VERCEL_ORG_ID`, Value: your org ID  
     - Name: `VERCEL_PROJECT_ID`, Value: your project ID

4. **Re-enable Workflow**
   - The workflow file is in the commit history
   - Or recreate it from `VERCEL_AUTO_DEPLOY_GUIDE.md`

## Recommended Approach

**Use Vercel's Native Git Integration** - It's:
- ✅ Easier to set up (2 minutes)
- ✅ No secrets needed
- ✅ No GitHub Actions quota usage
- ✅ Better integration with Vercel features
- ✅ Automatic preview deployments for PRs

## Current Status

- ❌ GitHub Actions: Disabled (requires secrets)
- ⏳ Vercel Git Integration: **Needs to be connected**

## Next Step

**Go to Vercel dashboard and connect your GitHub repository NOW!**

https://vercel.com/dashboard

Once connected, all your recent commits will deploy automatically! 🚀
