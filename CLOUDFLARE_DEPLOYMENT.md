# 🚀 Cloudflare Pages Deployment Guide

## 🌐 Live URLs

- **Primary Domain**: https://dhakacommute.sqatesting.com
- **Cloudflare Pages**: https://dhaka-commute.pages.dev

## ✅ Current Status

✅ **Build**: Successful  
✅ **Cloudflare Configuration**: Ready  
✅ **DNS**: Needs configuration  

## 📋 Cloudflare Pages Setup

### Step 1: Connect Repository

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com
2. **Navigate to**: Workers & Pages → Create application → Pages → Connect to Git
3. **Select Repository**: `mejbaurbahar/Dhaka-Commute`
4. **Authorize**: Grant Cloudflare access to your GitHub repository

### Step 2: Configure Build Settings

Use these exact settings:

```
Project name: dhaka-commute
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

### Step 3: Environment Variables (Optional)

If you need the Gemini API key:

1. Go to **Settings** → **Environment variables**
2. Add variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Environment**: Production

### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://dhaka-commute.pages.dev`

## 🌍 Custom Domain Setup

### Option 1: Using Cloudflare DNS (Recommended)

If your domain `sqatesting.com` is already on Cloudflare:

1. **Go to**: Workers & Pages → dhaka-commute → Custom domains
2. **Click**: Set up a custom domain
3. **Enter**: `dhakacommute.sqatesting.com`
4. **Click**: Activate domain
5. Cloudflare will automatically create the DNS record
6. SSL is automatic ✅

### Option 2: External DNS (GoDaddy, etc.)

If your domain is NOT on Cloudflare:

1. **In Cloudflare Pages**:
   - Go to: Custom domains → Set up a custom domain
   - Enter: `dhakacommute.sqatesting.com`
   - Copy the CNAME target provided

2. **In Your DNS Provider** (e.g., GoDaddy):
   - Type: `CNAME`
   - Name: `dhakacommute`
   - Value: `dhaka-commute.pages.dev`
   - TTL: `600` seconds (or 1 hour)

3. **Wait**: 5-15 minutes for DNS propagation
4. **Verify**: https://dhakacommute.sqatesting.com

## 🔧 Build Configuration Files

### wrangler.toml
```toml
name = "dhaka-commute"
compatibility_date = "2025-11-27"

[site]
bucket = "./dist"

pages_build_output_dir = "dist"
```

### public/_headers
Security and caching headers are automatically applied.

### public/_redirects
SPA routing is configured to redirect all routes to `index.html`.

## 🚀 Automatic Deployments

Every push to `main` branch triggers automatic deployment:

1. **Push code**: `git push origin main`
2. **Cloudflare builds**: Automatically runs `npm run build`
3. **Deploy**: Live in ~2 minutes
4. **Rollback**: Previous deployments are saved

## 🐛 Troubleshooting

### Build Fails: "Missing package from lock file"

**Solution**:
```bash
# Regenerate package-lock.json
rm package-lock.json
npm install

# Commit and push
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
```

### Build Fails: "npm ci" error

**Cloudflare Build Settings**:
- Change build command from `npm ci && npm run build` to just `npm run build`
- Or ensure `package-lock.json` is up to date

### Custom Domain Not Working

1. **Check DNS**: https://dnschecker.org
   - Enter: `dhakacommute.sqatesting.com`
   - Should show: `dhaka-commute.pages.dev` (CNAME)

2. **Clear Cache**:
   - Browser: Ctrl+Shift+R
   - Cloudflare: Purge cache in dashboard

3. **Verify SSL**:
   - Go to: Custom domains in Cloudflare
   - Status should be "Active"

### 503 Service Unavailable

**Cause**: Custom domain not added to Cloudflare Pages  
**Solution**: Follow "Custom Domain Setup" steps above

## 📊 Cloudflare Pages vs Netlify

| Feature | Cloudflare Pages | Netlify |
|---------|-----------------|---------|
| **Free Builds** | Unlimited | 300 min/month |
| **Bandwidth** | Unlimited | 100 GB/month |
| **Requests** | Unlimited | Limited |
| **SSL** | Free (automatic) | Free (automatic) |
| **Global CDN** | ✅ 275+ cities | ✅ |
| **Build Time** | ~2 min | ~2 min |
| **Custom Domains** | Unlimited | Unlimited |

## 📝 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔒 Environment Variables

Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Add your API keys and configuration.

## ✅ Deployment Checklist

- [x] Repository connected to Cloudflare Pages
- [x] Build settings configured
- [x] Build successful
- [x] wrangler.toml created
- [x] _headers and _redirects configured
- [ ] Custom domain added in Cloudflare
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Site accessible via custom domain

## 🆘 Support

**Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/  
**Community**: https://community.cloudflare.com/  

If you encounter issues:
1. Check Cloudflare Pages build logs
2. Verify DNS configuration
3. Clear browser cache
4. Check this guide's troubleshooting section

## 🎯 Migration from Netlify

If migrating from Netlify:

1. ✅ Remove `netlify.toml` (optional, won't interfere)
2. ✅ Update DNS to point to Cloudflare Pages
3. ✅ Configure custom domain in Cloudflare
4. ✅ Update documentation references

---

**Last Updated**: November 27, 2025  
**Platform**: Cloudflare Pages  
**Status**: Ready for deployment 🚀
