import { UserLocation } from '../types';
import { METRO_STATIONS } from '../constants';

/**
 * Finds the nearest metro station to a given location
 * @param location - User's current location
 * @returns Object with nearest metro station info and distance
 */
export const findNearestMetroStation = (location: UserLocation): { stationId: string; distance: number } | null => {
    let nearestStation: string | null = null;
    let minDistance = Infinity;

    Object.values(METRO_STATIONS).forEach(station => {
        const distance = getDistance(
            location,
            { lat: station.lat, lng: station.lng }
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearestStation = station.id;
        }
    });

    if (nearestStation) {
        return { stationId: nearestStation, distance: minDistance };
    }

    return null;
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export const getDistance = (
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (point1.lat * Math.PI) / 180;
    const φ2 = (point2.lat * Math.PI) / 180;
    const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
    const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};
