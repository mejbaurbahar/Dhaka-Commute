# Testing Guide for Enhanced Intercity Search

## 🧪 How to Test the Enhanced Frontend

### Option 1: Mock the Backend Response (Quick Test)

Create a simple mock in your browser console or add temporary code to `geminiService.ts`:

```javascript
// Temporary mock response for testing
const mockEnhancedResponse = {
  "from": "Dhaka",
  "to": "Chittagong",
  "date": "2025-12-25",
  "distance_km": 250,
  "results": {
    "bus": [
      {
        "operator": "Shyamoli Paribahan",
        "type": "AC",
        "departure": "07:30",
        "arrival": "15:30",
        "duration": "8h",
        "price": 1200,
        "boarding": "Gabtoli",
        "dropping": "Chittagong Terminal",
        "contact": "16374",
        "booking_url": "https://shohoz.com"
      },
      {
        "operator": "Green Line",
        "type": "Non-AC",
        "departure": "08:00",
        "arrival": "16:00",
        "duration": "8h",
        "price": 800,
        "boarding": "Sayedabad",
        "dropping": "Chittagong GRC",
        "contact": "09678774411",
        "booking_url": "https://bdtickets.com"
      }
    ],
    "train": [
      {
        "name": "Suborno Express",
        "number": "702",
        "departure": "06:40",
        "arrival": "12:30",
        "duration": "5h 50m",
        "route_via": "via Padma Bridge",
        "classes": {
          "Shovon": 350,
          "AC_Chair": 750,
          "AC_Berth": 1200
        },
        "off_day": "None",
        "booking": "16318 or railway.gov.bd"
      }
    ],
    "flight": [
      {
        "airline": "US-Bangla Airlines",
        "flight_no": "BS211",
        "departure": "15:30",
        "arrival": "16:15",
        "from_airport": "DAC",
        "to_airport": "CGP",
        "price": 4800,
        "ground_transfer": "N/A",
        "total_time": "45 min"
      }
    ],
    "driving": {
      "distance_km": 250,
      "duration": "5h 30m",
      "route": "Dhaka → Comilla → Feni → Chittagong",
      "fuel_cost": 2200,
      "toll": 850,
      "alternative_route": "Via Sylhet Highway (300 km, 6h 30m)"
    },
    "tips": {
      "best_option": "Train (fastest)",
      "cheapest": "Bus Non-AC (৳800)",
      "booking_sites": ["shohoz.com", "bdtickets.com", "railway.gov.bd"],
      "peak_times": "Friday-Sunday, Eid holidays"
    }
  }
};
```

### Option 2: Update Your Backend

Your backend needs to update the `/api/routes/intercity` endpoint to return the new format.

**Before (Old Format):**
```javascript
{
  "routes": [
    { "type": "Bus", "operator": "Hanif", "cost": "550 BDT", "duration": "8h" }
  ]
}
```

**After (New Format):**
```javascript
{
  "from": "Dhaka",
  "to": "Chittagong",
  "date": "2025-12-25",
  "distance_km": 250,
  "results": {
    "bus": [...],
    "train": [...],
    "flight": [...],
    "driving": {...},
    "tips": {...}
  }
}
```

### Option 3: Test with Network Interceptor

Use browser DevTools to intercept network requests:

1. Open DevTools (F12)
2. Go to Network tab
3. Enable "Request blocking" or use a browser extension like "ModHeader"
4. Intercept the `/api/routes/intercity` request
5. Return the mock JSON response above

---

## 📋 Visual Checklist

When testing, you should see:

### ✅ Bus Cards
- [ ] Operator name displayed (e.g., "Shyamoli Paribahan")
- [ ] Bus type badge (AC/Non-AC)
- [ ] Departure time and boarding point
- [ ] Arrival time and dropping point
- [ ] Duration in the middle
- [ ] Price in BDT (৳)
- [ ] Green "Book Now" button
- [ ] Phone number (clickable)
- [ ] Card has green left border
- [ ] Hover effect works (card lifts slightly)

### ✅ Train Cards
- [ ] Train name and number
- [ ] Off-day indicator (if applicable)
- [ ] Departure and arrival times
- [ ] "Route via" information
- [ ] Grid of ticket classes (Shovon, AC Chair, etc.)
- [ ] Individual prices for each class
- [ ] Booking contact info
- [ ] Card has orange left border
- [ ] Hover effect works

### ✅ Flight Cards
- [ ] Airline name and flight number
- [ ] Airport codes (DAC, CGP, etc.)
- [ ] Departure and arrival times
- [ ] Flight duration
- [ ] Price
- [ ] Ground transfer info (if any)
- [ ] Card has blue left border
- [ ] Hover effect works

### ✅ Driving Card
- [ ] "Drive Yourself" title with car emoji
- [ ] Distance and duration
- [ ] Route path
- [ ] Fuel cost breakdown
- [ ] Toll charges
- [ ] Total cost (fuel + toll)
- [ ] Alternative route (if available)
- [ ] Card has gray left border
- [ ] Hover effect works

### ✅ Tips Section
- [ ] Purple gradient background
- [ ] "Best Option" recommendation
- [ ] "Cheapest" option indicator
- [ ] Peak times warning
- [ ] Booking site links (clickable)
- [ ] Links open in new tab
- [ ] Glassmorphism effect visible

---

## 🐛 Expected Behavior

### Backward Compatibility
The app should **still work** with the old API format:
```javascript
{
  "routes": [...]  // Old format
}
```

The `transformEnhancedResponse` only activates when it detects:
```javascript
if (resultJson.results && (resultJson.from || resultJson.to))
```

### Graceful Degradation
- If only buses are available → Only bus cards show
- If only tips are available → Only tips section shows
- If old format is used → Falls back to original UI

---

## 🎯 Quick Test Script

You can temporarily add this to `geminiService.ts` for testing (remove after testing):

```typescript
// TEMPORARY TEST CODE - Remove after testing
export const getTravelRoutes = async (origin: string, destination: string, date?: string): Promise<RoutingResponse | null> => {
  // ... existing code ...

  // MOCK RESPONSE FOR TESTING
  if (origin.toLowerCase() === 'dhaka' && destination.toLowerCase() === 'chittagong') {
    const mockResponse = {
      from: "Dhaka",
      to: "Chittagong",
      date: date || new Date().toISOString().split('T')[0],
      distance_km: 250,
      results: {
        bus: [
          {
            operator: "Shyamoli Paribahan",
            type: "AC",
            departure: "07:30",
            arrival: "15:30",
            duration: "8h",
            price: 1200,
            boarding: "Gabtoli",
            dropping: "Chittagong Terminal",
            contact: "16374",
            booking_url: "https://shohoz.com"
          }
        ],
        tips: {
          best_option: "Train (fastest)",
          cheapest: "Bus Non-AC",
          booking_sites: ["shohoz.com", "bdtickets.com"],
          peak_times: "Friday-Sunday, Eid holidays"
        }
      }
    };
    
    return transformEnhancedResponse(mockResponse, origin, destination);
  }

  // ... rest of existing code ...
};
```

---

## 🚀 Production Deployment

Once backend is ready:

1. Remove any mock/test code
2. Build the production bundle: `npm run build`
3. The `dist` folder contains the production-ready files
4. Deploy to your hosting platform (Vercel, Netlify, etc.)

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify network tab shows correct API response
3. Ensure backend returns the new format exactly as specified
4. Check that all imports are correct (VS Code should show no TypeScript errors)

---

**Status:** ✅ Build Successful - Ready for Testing!
