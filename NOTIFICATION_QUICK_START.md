# 🚀 QUICK START GUIDE - Frontend Notifications

## ⏱️ 2-Minute Setup

### Option 1: Production Mode (Default)
```bash
# No configuration needed!
npm run dev
```
Frontend will connect to: `https://koyjabo-backend.onrender.com/api`

### Option 2: Local Development Mode
```bash
# 1. Create .env file
echo "VITE_BACKEND_URL=http://localhost:3001/api" > .env

# 2. Start backend (in another terminal)
cd path/to/koyjabo-backend
npm start

# 3. Start frontend
npm run dev
```

---

## 🧪 Quick Test (30 seconds)

### Visual Check:
1. **Open app** in browser: `http://localhost:5173`
2. **Look for**:
   - 🔔 Bell icon in top-right corner
   - No JavaScript errors in console

### Network Check:
1. Open **DevTools** → **Network** tab
2. Look for request: `GET /api/notifications/active`
3. Response should be: `{ notifications: [...] }`

### Functional Check:
1. **Click bell icon** → Dropdown should open
2. **Create test notification** in admin panel (http://localhost:3001/admin)
3. **Wait 10-60 seconds** → New notification should appear

---

## 🎨 What You'll See

### High Priority (Banner at Top)
```
╔════════════════════════════════════════╗
║ 🚨 Heavy Rain Warning                  ║
║ Meteorological Dept warns of heavy... ║
╚════════════════════════════════════════╝
```

### Medium/Low Priority (Bell Dropdown)
```
🔔 (3) ← Badge with count
└─ Click to see dropdown with notifications
```

---

## 📊 Backend API Format

Your backend should return this format:
```json
{
  "notifications": [
    {
      "id": "auto_123_abc",
      "title": "Title Here",
      "message": "Message here",
      "type": "info|success|warning|error|announcement",
      "priority": "high|medium|low",
      "isActive": true,
      "createdAt": "2025-12-21T22:00:00Z",
      "expiresAt": "2025-12-22T04:00:00Z",
      "icon": "🚨",
      "link": "https://example.com"
    }
  ]
}
```

---

## 🐛 Quick Fixes

### "No notifications showing"
```bash
# Check API directly
curl http://localhost:3001/api/notifications/active

# OR in browser
# http://localhost:3001/api/notifications/active
```

### "CORS errors"
Add your frontend URL to backend CORS whitelist:
```javascript
// In backend server.js
const allowedOrigins = [
    'http://localhost:5173',  // Add this
    'http://localhost:3000',
    // ... existing origins
];
```

### "TypeScript errors"
```bash
# Restart TypeScript server
# VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Or restart dev server
npm run dev
```

---

## ✅ Success Checklist

- [ ] Bell icon visible in header
- [ ] No console errors
- [ ] API request successful (DevTools Network tab)
- [ ] Clicking bell opens dropdown
- [ ] High-priority notifications show in banner
- [ ] Auto-refresh works (wait 60s after creating new notification)

---

## 🎯 Next Steps

1. ✅ **Test locally** → You're ready!
2. 📝 **Create test notifications** in admin panel
3. 🚀 **Deploy to production** when satisfied

---

**Need more help?** See `FRONTEND_NOTIFICATION_INTEGRATION_COMPLETE.md` for detailed guide.
