# Vercel Auto-Deploy Setup Instructions

## ✅ Quick Setup (Recommended)

### Option 1: Connect GitHub to Vercel (Easiest)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New Project"**
3. **Import Git Repository**:
   - Select your GitHub account
   - Find "Dhaka-Commute" repository
   - Click "Import"
4. **Configure Project**:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Click "Deploy"**

✅ **Done!** Vercel will now automatically deploy on every push to main branch.

---

### Option 2: Using GitHub Actions (Alternative)

If you want to use the GitHub Actions workflow:

1. **Get Vercel Tokens**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project
   vercel link
   ```

2. **Get Required Values**:
   - Run: `vercel project ls` to get Project ID
   - Go to Vercel Settings → Tokens → Create new token
   - Get Org ID from: https://vercel.com/account

3. **Add GitHub Secrets**:
   - Go to: https://github.com/mejbaurbahar/Dhaka-Commute/settings/secrets/actions
   - Add these secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your organization ID
     - `VERCEL_PROJECT_ID`: Your project ID

4. **Push to GitHub** - Auto-deploy will trigger!

---

## 🔧 Vercel Dashboard Settings

### Enable Auto-Deploy:
1. Go to: Project Settings → Git
2. Enable: **"Production Branch"** = `main`
3. Enable: **"Deploy Hooks"**

### Add Custom Domain:
1. Go to: Project Settings → Domains
2. Add: `dhaka-commute.sqatesting.com`
3. Configure DNS:
   - Type: CNAME
   - Name: `dhaka-commute`
   - Value: `cname.vercel-dns.com`

---

## 📊 Analytics Setup

Analytics and Speed Insights are already configured in the code!

After deployment:
- **Analytics**: https://vercel.com/[your-project]/analytics
- **Speed Insights**: https://vercel.com/[your-project]/speed-insights

Data will appear within 30 seconds of visiting your site.

---

## ✅ Verification

After setup, test auto-deploy:
1. Make a small change to README.md
2. Commit and push to main
3. Check Vercel dashboard for new deployment
4. Visit your site to see changes

---

## 🚨 Troubleshooting

**Build fails?**
- Check `vercel.json` is present
- Verify `package.json` has correct scripts
- Check build logs in Vercel dashboard

**Not auto-deploying?**
- Verify GitHub integration is connected
- Check Production Branch is set to `main`
- Ensure you're pushing to the correct branch

**Analytics not showing?**
- Wait 30 seconds after visiting site
- Disable ad blockers
- Check browser console for errors

---

## 📝 Current Configuration

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (auto-detected)
- **Domain**: dhaka-commute.sqatesting.com
- **Analytics**: ✅ Enabled
- **Speed Insights**: ✅ Enabled
