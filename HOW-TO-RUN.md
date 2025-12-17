# Running the Application

## To Test the Complete App with Intercity

You need to run **BOTH** servers:

### 1. Start Main App (Port 3000)
```bash
cd E:\Dhaka-Commute
npm run dev
```

### 2. Start Intercity Route Finder (Port 3002)
```bash
cd E:\Dhaka-Commute\intercity-route-finder
npm run dev
```

## How It Works

- **Main App** runs on `http://localhost:3000`
- **Intercity Route Finder** runs on `http://localhost:3002`
- When you click "Intercity" from the main app, it proxies to port 3002

## Access Points

1. **Main Landing Page**: http://localhost:3000
   - Click on "Intercity" from navbar → redirects to `/intercity` (proxied to port 3002)

2. **Direct Intercity Access**: http://localhost:3002/intercity
   - Direct access to the new intercity UI

## Production

In production (Vercel), both apps are deployed separately:
- Main app: https://koyjabo.com
- Intercity: https://koyjabo.com/intercity (handled by Vercel routing)
