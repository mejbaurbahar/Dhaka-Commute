# Dhaka Commute - Deployment Guide

## 🌐 Live URLs

- **Primary Domain**: https://dhakacommute.sqatesting.com
- **Netlify Subdomain**: https://dhaka-commute.netlify.app

## 📋 Current Status

✅ **Build**: Successful  
✅ **DNS Configuration**: Correct  
✅ **SSL/TLS**: Enabled (Let's Encrypt)  
⚠️ **Custom Domain**: Needs Netlify configuration

## 🔧 Netlify Configuration

### DNS Records (Already Configured)
```
Type: CNAME
Name: dhakacommute
Value: dhaka-commute.netlify.app
TTL: 1 Hour
```

### Netlify Settings Required

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Navigate to**: Sites → dhaka-commute → Domain settings
3. **Add Custom Domain**:
   - Click "Add custom domain"
   - Enter: `dhakacommute.sqatesting.com`
   - Click "Verify"
   - Click "Add domain"

4. **Enable HTTPS**:
   - Netlify will automatically provision an SSL certificate
   - Wait 1-2 minutes for DNS propagation

### Build Settings (Already Configured in netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## 🚀 Deployment Process

### Automatic Deployment (Recommended)
1. Push to main branch
2. Netlify automatically builds and deploys
3. Changes live in ~2 minutes

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify (if using Netlify CLI)
netlify deploy --prod
```

## 🐛 Troubleshooting

### 503 Service Unavailable
**Cause**: Custom domain not added to Netlify site settings  
**Solution**: Follow "Netlify Settings Required" steps above

### Build Failures
**Cause**: Missing dependencies or build errors  
**Solution**: 
```bash
npm install
npm run build
```

### DNS Propagation Issues
**Cause**: DNS changes can take up to 48 hours  
**Solution**: 
- Wait 15-30 minutes
- Clear browser cache
- Use incognito mode
- Check DNS: https://dnschecker.org

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

## 📦 Project Structure

```
dist/               # Production build (auto-generated)
public/            # Static assets
src/               # Source code
components/        # React components
services/          # API services
utils/             # Utility functions
netlify.toml       # Netlify configuration
vite.config.ts     # Vite configuration
```

## ✅ Deployment Checklist

- [x] Build successful
- [x] DNS records configured
- [x] netlify.toml configured
- [ ] Custom domain added in Netlify dashboard
- [ ] SSL certificate provisioned
- [ ] Site accessible via custom domain

## 🆘 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify DNS configuration
3. Clear browser cache
4. Check this guide's troubleshooting section
