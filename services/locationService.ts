
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
      // If high accuracy fails (timeout or unavailable), try low accuracy
      if (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE) {
        console.warn("High accuracy failed, trying low accuracy...");
        navigator.geolocation.getCurrentPosition(
          successHandler,
          (err) => reject(err),
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 }
        );
      } else {
        reject(error);
      }
    };

    // First try: High Accuracy (GPS) with 10s timeout
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
