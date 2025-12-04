# Intercity API Key Issue Resolution

## Problem
The user was experiencing an issue where the "Intercity Bus Search" feature would repeatedly ask for an API key, even after it had been added in the settings.

## Root Cause
The application consists of two separate Vite projects:
1. Main App running on port 3000.
2. Intercity App running on port 3002.

The main app has a proxy configured to forward `/intercity` requests to `http://localhost:3002`. However, the navigation links in `App.tsx` (both desktop and mobile) contained hardcoded logic for localhost development that bypassed this proxy:

```typescript
href={window.location.hostname === 'localhost' ? 'http://localhost:3002' : '/intercity'}
```

This caused the browser to perform a full navigation to a different origin (`http://localhost:3002`). Since `localStorage` is scoped by origin (protocol + domain + port), the API key saved on `http://localhost:3000` was not accessible to the application running on `http://localhost:3002`.

## Solution
We updated the navigation links in `App.tsx` to always use the relative path `/intercity`. This ensures that:
1. The user stays on the `http://localhost:3000` origin.
2. The request is handled by the Vite proxy in the main app, which forwards it to the intercity app.
3. `localStorage` remains accessible, allowing the intercity app to read the saved API key.

We also updated `intercity/App.tsx` to use relative paths (`/`) for navigating back to the main app, replacing hardcoded `http://localhost:3003` links.

## Files Modified
- `h:\Dhaka-Commute\App.tsx`: Updated desktop and mobile navigation links.
- `h:\Dhaka-Commute\intercity\App.tsx`: Updated back links to the main app.

## Verification
The user should now be able to:
1. Add the API key in the main app settings.
2. Click "Intercity Bus Search".
3. Be navigated to `/intercity` (staying on port 3000).
4. Successfully use the search feature without being prompted for the key again.
