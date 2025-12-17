import { RoutingResponse, TravelOption, TransportMode } from "../types";
import { parseMarkdownToOptions } from '../utils/markdownParser';
import { canUseIntercitySearch, trackIntercitySearchUsage } from "./apiKeyManager";

// Backend API Configuration (Updated parser with fallback)
const BACKEND_API_URL = 'https://koyjabo-backend.onrender.com';

// --- Cache Configuration ---
const CACHE_TTL = 1000 * 60 * 30; // 30 Minutes for "Fresh" data
const CACHE_PREFIX = 'bdt_route_v2_'; // Changed version to avoid conflicts

const getCacheKey = (origin: string, destination: string) =>
  `${CACHE_PREFIX}${origin.trim().toLowerCase()}_${destination.trim().toLowerCase()}`;

export const getTravelRoutes = async (origin: string, destination: string, date?: string): Promise<RoutingResponse | null> => {
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

    const requestBody: any = {
      from: origin,
      to: destination
    };

    // Add optional date parameter
    if (date) {
      requestBody.date = date;
    }

    const response = await fetch(`${BACKEND_API_URL}/api/routes/intercity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
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



    // ... (existing imports)

    // ... (existing code)

    // NEW FORMAT: Backend returns markdown text
    // Check if response is in new markdown format {result: string, source: string, from: string, to: string, date: string}
    if (resultJson.result && typeof resultJson.result === 'string' && resultJson.source) {
      console.log('📝 Received Markdown format from backend');

      // Track usage after successful response
      trackIntercitySearchUsage();

      // Attempt to parse Markdown into structured options
      try {
        const parsedOptions = parseMarkdownToOptions(resultJson.result, origin, destination);

        if (parsedOptions.length > 0) {
          console.log('✅ Successfully parsed Markdown into options:', parsedOptions.length);

          const structuredResponse: RoutingResponse = {
            origin,
            destination,
            options: parsedOptions,
            // Add metadata that might be useful
            enhancedData: {
              tips: {
                best_option: 'AI Generated Route'
              }
            }
          } as any;

          // Save to cache
          try {
            localStorage.setItem(cacheKey, JSON.stringify({
              data: structuredResponse,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn("Could not save route to local storage cache", e);
          }

          return structuredResponse;
        }
      } catch (parseError) {
        console.warn('Failed to parse markdown to options, falling back to text view', parseError);
      }

      // Return the markdown result directly - let the component handle rendering
      const markdownResponse = {
        isMarkdown: true,
        content: resultJson.result,
        source: resultJson.source,
        from: resultJson.from || origin,
        to: resultJson.to || destination,
        date: resultJson.date,
        origin,
        destination,
        options: [] // Empty for compatibility, components will check isMarkdown
      };

      // Save to cache
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: markdownResponse,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn("Could not save route to local storage cache", e);
      }

      console.log('✅ Markdown routes received (Parsing skipped/failed)');
      return markdownResponse as any;
    }

    // OLD FORMAT: Transform backend response to match frontend format if needed
    let routingResponse: RoutingResponse;

    // Check if response is in old enhanced format {from, to, date, results: {...}}
    if (resultJson.results && (resultJson.from || resultJson.to)) {
      console.log('🔄 Transforming enhanced backend format to frontend format...');
      routingResponse = transformEnhancedResponse(resultJson, origin, destination);
    }
    // Check if response is in old format {routes: [...]}
    else if (resultJson.routes && !resultJson.options) {
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
    }
    // Already in correct format {options: [...]}
    else if (resultJson.options) {
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

// Transform enhanced API response to RoutingResponse format
function transformEnhancedResponse(data: any, origin: string, destination: string): RoutingResponse {
  const options: TravelOption[] = [];
  const results = data.results || {};

  // Transform buses
  if (results.bus && results.bus.length > 0) {
    results.bus.forEach((bus: any, index: number) => {
      options.push({
        id: `bus_${index}`,
        type: 'BUS',
        title: `${bus.operator} - ${bus.type}`,
        summary: `${bus.duration} • ৳${bus.price}`,
        totalDuration: bus.duration,
        totalCostRange: `৳${bus.price}`,
        recommended: index === 0 && options.length === 0,
        steps: [{
          mode: TransportMode.BUS,
          from: origin,
          to: destination,
          instruction: `Travel by ${bus.type} bus with ${bus.operator}`,
          duration: bus.duration,
          cost: `৳${bus.price}`,
          details: {
            operator: bus.operator,
            departureTime: bus.departure,
            arrivalTime: bus.arrival,
            busCounter: bus.boarding,
            counterPhone: bus.contact,
            ticketType: bus.type,
            schedules: [{
              operator: bus.operator,
              type: bus.type,
              departureTime: bus.departure,
              arrivalTime: bus.arrival,
              price: `৳${bus.price}`,
              counter: bus.boarding,
              contactNumber: bus.contact
            }]
          }
        }],
        enhancedData: { bus }
      } as any);
    });
  }

  // Transform trains
  if (results.train && results.train.length > 0) {
    results.train.forEach((train: any, index: number) => {
      const classes = train.classes || {};
      const prices = Object.values(classes).filter((p: any) => typeof p === 'number') as number[];
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
      const priceRange = minPrice === maxPrice ? `৳${minPrice}` : `৳${minPrice} - ৳${maxPrice}`;

      options.push({
        id: `train_${index}`,
        type: 'TRAIN',
        title: `${train.name} (${train.number})`,
        summary: `${train.duration} • ${priceRange}`,
        totalDuration: train.duration,
        totalCostRange: priceRange,
        recommended: index === 0 && options.length === 0,
        steps: [{
          mode: TransportMode.TRAIN,
          from: origin,
          to: destination,
          instruction: `Travel by train ${train.name}`,
          duration: train.duration,
          cost: priceRange,
          details: {
            trainName: train.name,
            departureTime: train.departure,
            arrivalTime: train.arrival,
            operator: `Train No. ${train.number}`,
            schedules: Object.entries(classes).map(([className, price]) => ({
              operator: train.name,
              type: className.replace('_', ' '),
              departureTime: train.departure,
              arrivalTime: train.arrival,
              price: `৳${price}`,
              counter: train.booking,
              contactNumber: train.booking
            }))
          }
        }],
        enhancedData: { train }
      } as any);
    });
  }

  // Transform flights
  if (results.flight && results.flight.length > 0) {
    results.flight.forEach((flight: any, index: number) => {
      options.push({
        id: `flight_${index}`,
        type: 'AIR',
        title: `${flight.airline} - ${flight.flight_no}`,
        summary: `${flight.total_time} • ৳${flight.price}`,
        totalDuration: flight.total_time,
        totalCostRange: `৳${flight.price}`,
        recommended: index === 0 && options.length === 0,
        steps: [{
          mode: TransportMode.AIR,
          from: `${origin} (${flight.from_airport})`,
          to: `${destination} (${flight.to_airport})`,
          instruction: `Flight with ${flight.airline}`,
          duration: flight.total_time,
          cost: `৳${flight.price}`,
          details: {
            flightName: `${flight.airline} ${flight.flight_no}`,
            departureTime: flight.departure,
            arrivalTime: flight.arrival,
            operator: flight.airline,
            schedules: [{
              operator: flight.airline,
              type: flight.flight_no,
              departureTime: flight.departure,
              arrivalTime: flight.arrival,
              price: `৳${flight.price}`,
              counter: flight.from_airport,
              contactNumber: ''
            }]
          }
        }],
        enhancedData: { flight }
      } as any);
    });
  }

  // Transform driving info
  if (results.driving) {
    const driving = results.driving;
    const totalCost = (driving.fuel_cost || 0) + (driving.toll || 0);
    options.push({
      id: 'driving',
      type: 'BUS', // Using BUS as a placeholder since driving isn't a standard type
      title: `🚗 Drive Yourself`,
      summary: `${driving.duration} • ৳${totalCost}`,
      totalDuration: driving.duration,
      totalCostRange: `৳${totalCost}`,
      recommended: false,
      steps: [{
        mode: TransportMode.CNG, // Using CNG as closest transport mode
        from: origin,
        to: destination,
        instruction: `Drive yourself via ${driving.route}`,
        duration: driving.duration,
        distance: `${driving.distance_km} km`,
        cost: `৳${totalCost}`,
        details: {
          operator: 'Self Drive',
          schedules: []
        }
      }],
      enhancedData: { driving }
    } as any);
  }

  // Add tips as metadata if available
  const responseWithTips = {
    origin,
    destination,
    options,
    enhancedData: {
      tips: results.tips,
      distance_km: data.distance_km,
      date: data.date
    }
  } as any;

  return responseWithTips;
}
