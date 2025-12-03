
import { UserLocation } from '../types';
import { EmergencyService, EMERGENCY_SERVICES } from '../data/emergencyHelplines';
import { getDistance } from './locationService';

export interface NearestEmergencyService extends EmergencyService {
    distance: number; // in meters
}

/**
 * Find nearest emergency services of all types near a location
 * @param location User's current location
 * @param maxResults Maximum number of results to return (default: 10)
 * @param maxDistance Maximum distance in meters (default: 10000m = 10km)
 */
export const findNearestEmergencyServices = (
    location: UserLocation,
    maxResults: number = 10,
    maxDistance: number = 10000
): NearestEmergencyService[] => {
    const servicesWithDistance: NearestEmergencyService[] = EMERGENCY_SERVICES.map(service => ({
        ...service,
        distance: getDistance(location, { lat: service.lat, lng: service.lng })
    }));

    // Filter by max distance and sort by distance
    return servicesWithDistance
        .filter(service => service.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxResults);
};

/**
 * Find nearest emergency services grouped by type
 * @param location User's current location
 * @param perType Number of services per type (default: 2)
 */
export const findNearestEmergencyServicesByType = (
    location: UserLocation,
    perType: number = 2
): {
    police: NearestEmergencyService[];
    hospital: NearestEmergencyService[];
    fire: NearestEmergencyService[];
    other: NearestEmergencyService[];
} => {
    const servicesWithDistance: NearestEmergencyService[] = EMERGENCY_SERVICES.map(service => ({
        ...service,
        distance: getDistance(location, { lat: service.lat, lng: service.lng })
    }));

    const grouped = {
        police: servicesWithDistance
            .filter(s => s.type === 'police')
            .sort((a, b) => a.distance - b.distance)
            .slice(0, perType),
        hospital: servicesWithDistance
            .filter(s => s.type === 'hospital')
            .sort((a, b) => a.distance - b.distance)
            .slice(0, perType),
        fire: servicesWithDistance
            .filter(s => s.type === 'fire')
            .sort((a, b) => a.distance - b.distance)
            .slice(0, perType),
        other: servicesWithDistance
            .filter(s => s.type === 'other')
            .sort((a, b) => a.distance - b.distance)
            .slice(0, perType)
    };

    return grouped;
};

/**
 * Format distance for display
 */
export const formatDistance = (meters: number): string => {
    if (meters < 1000) {
        return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
};
