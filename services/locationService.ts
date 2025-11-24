
import { UserLocation, Station } from '../types';
import { STATIONS } from '../constants';

export const getCurrentLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      console.warn(`Geolocation High Accuracy Failed: ${error.message} (${error.code})`);
      
      // If high accuracy fails (timeout or unavailable), try low accuracy with loose constraints
      if (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE) {
        console.log("Attempting low accuracy fallback...");
        navigator.geolocation.getCurrentPosition(
          successHandler,
          (err) => {
            console.error(`Geolocation Fallback Failed: ${err.message} (${err.code})`);
            // Custom error messages for better user experience
            if (err.code === err.TIMEOUT) {
              reject(new Error("Location request timed out. Please ensure GPS is enabled and you have a clear view of the sky."));
            } else if (err.code === err.PERMISSION_DENIED) {
              reject(new Error("Location permission denied. Please allow location access in your browser settings."));
            } else if (err.code === err.POSITION_UNAVAILABLE) {
              reject(new Error("Location unavailable. Your device cannot determine its position right now."));
            } else {
              reject(new Error(`Location error: ${err.message}`));
            }
          },
          { 
            enableHighAccuracy: false, 
            timeout: 20000, // 20 seconds for fallback
            maximumAge: 60000 // Accept cached positions up to 1 minute old (helps significantly on mobile)
          } 
        );
      } else {
        // Immediate failure (like Permission Denied)
        if (error.code === error.PERMISSION_DENIED) {
             reject(new Error("Location permission denied. Please allow location access in your browser settings."));
        } else {
             reject(error);
        }
      }
    };

    // First try: High Accuracy (GPS)
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      { 
        enableHighAccuracy: true, 
        timeout: 15000, // Increased to 15 seconds to allow GPS warmup
        maximumAge: 5000 // Accept positions up to 5 seconds old
      }
    );
  });
};

// Calculate Haversine distance in meters
export const getDistance = (loc1: UserLocation, loc2: UserLocation): number => {
  const R = 6371e3; // metres
  const φ1 = (loc1.lat * Math.PI) / 180;
  const φ2 = (loc2.lat * Math.PI) / 180;
  const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const Δλ = ((loc2.lng - loc1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const findNearestStation = (
  userLoc: UserLocation,
  routeStationIds: string[]
): { station: Station; index: number; distance: number } | null => {
  let nearest: { station: Station; index: number; distance: number } | null = null;
  let minDistance = Infinity;

  routeStationIds.forEach((sid, index) => {
    const station = STATIONS[sid];
    if (station) {
      const dist = getDistance(userLoc, { lat: station.lat, lng: station.lng });
      // Consider "at the station" if within reasonable range, but for tracking just find absolute nearest
      if (dist < minDistance) {
        minDistance = dist;
        nearest = { station, index, distance: dist };
      }
    }
  });

  return nearest;
};
