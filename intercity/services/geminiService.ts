import { RoutingResponse } from "../types";
import { canUseIntercitySearch, trackIntercitySearchUsage } from "./apiKeyManager";

// Backend API Configuration
const BACKEND_API_URL = 'https://koyjabo-backend.onrender.com';

// --- Cache Configuration ---
const CACHE_TTL = 1000 * 60 * 30; // 30 Minutes for "Fresh" data
const CACHE_PREFIX = 'bdt_route_v2_'; // Changed version to avoid conflicts

const getCacheKey = (origin: string, destination: string) =>
  `${CACHE_PREFIX}${origin.trim().toLowerCase()}_${destination.trim().toLowerCase()}`;

export const getTravelRoutes = async (origin: string, destination: string): Promise<RoutingResponse | null> => {
  const cacheKey = getCacheKey(origin, destination);

  try {
    // 1. Check Persistent Cache (LocalStorage) First
    const cachedString = localStorage.getItem(cacheKey);
    if (cachedString) {
      const cached = JSON.parse(cachedString);
      const isOffline = !navigator.onLine;
      const isFresh = (Date.now() - cached.timestamp < CACHE_TTL);

      // Return cached data if we are offline OR if the cache is still fresh
      if (isOffline || isFresh) {
        console.log("🚀 Serving from Persistence Cache:", cacheKey);
        return cached.data;
      }
    }

    // 2. Check Network Status
    if (!navigator.onLine) {
      throw new Error("No internet connection and no cached route found for this journey.");
    }

    // 3. Check usage limit before making API call
    if (!canUseIntercitySearch()) {
      throw new Error('⏰ Daily Limit Reached\n\nYou\'ve used your 2 free Intercity searches for today. The limit resets at midnight. Come back tomorrow!');
    }

    // 4. Call Backend API
    console.log('📡 Calling Backend Intercity Route API...');

    const response = await fetch(`${BACKEND_API_URL}/api/routes/intercity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: origin,
        to: destination
      })
    });

    // Handle rate limiting (backend)
    if (response.status === 429) {
      throw new Error('⏰ Daily Limit Reached\n\nYou\'ve used your 2 free Intercity searches for today. The limit resets at midnight. Come back tomorrow!');
    }

    // Handle server errors
    if (response.status === 500) {
      throw new Error('⚠️ Service Temporarily Unavailable\n\nOur routing service is experiencing issues. Please try again in a few minutes.');
    }

    // Handle service overload
    if (response.status === 503) {
      throw new Error('⏳ Service Busy\n\nToo many requests right now. Please wait 5 seconds and try again.');
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const resultJson = await response.json();

    // Transform backend response to match frontend format if needed
    let routingResponse: RoutingResponse;

    // Check if response is in old format {routes: [...]} or new format {options: [...]}
    if (resultJson.routes && !resultJson.options) {
      console.log('🔄 Transforming backend routes format to frontend format...');

      // Transform {routes: [...]} to {options: [...]}
      const transformedOptions: any[] = resultJson.routes.map((route: any, index: number) => {
        return {
          id: `route_${index}`,
          type: route.type?.toUpperCase() || 'BUS',
          title: `${route.type || 'Route'} - ${route.operator || 'Unknown'}`,
          summary: `${route.duration || 'N/A'} • ${route.cost || 'N/A'}`,
          totalDuration: route.duration || 'N/A',
          totalCostRange: route.cost || 'N/A',
          recommended: index === 0,
          steps: [{
            mode: route.type?.toUpperCase() || 'BUS',
            from: origin,
            to: destination,
            instruction: `Travel by ${route.type || 'transport'} with ${route.operator || 'operator'}`,
            duration: route.duration || 'N/A',
            cost: route.cost || 'N/A',
            details: {
              operator: route.operator,
              departureTime: route.departureTime,
              arrivalTime: route.arrivalTime
            }
          }]
        };
      });

      routingResponse = {
        origin,
        destination,
        options: transformedOptions
      };
    } else if (resultJson.options) {
      // Already in correct format
      routingResponse = resultJson;
    } else {
      throw new Error("Invalid response format from server - missing routes or options.");
    }

    if (!routingResponse || !routingResponse.options || routingResponse.options.length === 0) {
      throw new Error("No routes found. Please try different locations.");
    }

    // 5. Track usage after successful response
    trackIntercitySearchUsage();

    // 6. Save to Persistent Cache
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        data: routingResponse,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn("Could not save route to local storage cache", e);
    }

    console.log('✅ Routes received and transformed:', routingResponse);
    return routingResponse;

  } catch (error: any) {
    console.error("Error generating routes:", error);

    const errorMsg = error.message || 'Unknown error';

    // Network errors
    if (errorMsg.includes('fetch') || errorMsg.includes('network')) {
      throw new Error("🌐 Connection Error\n\nCouldn't reach the server. Please check your internet connection and try again.");
    }

    // Re-throw other errors (like rate limiting messages)
    throw error;
  }
};
