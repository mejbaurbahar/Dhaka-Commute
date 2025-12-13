import { BusRoute, UserLocation } from '../types';
import { STATIONS } from '../constants';
import { findNearestStation, getDistance } from './locationService';

/**
 * Sort buses by relevance to user's current location
 * Prioritizes buses that:
 * 1. Pass through stations near user's current location
 * 2. Can actually be caught from nearby
 */
export const sortBusesByLocation = (
    buses: BusRoute[],
    userLocation: UserLocation | null,
    destinationStationIds: string[] = []
): BusRoute[] => {
    if (!userLocation || buses.length === 0) {
        return buses; // Return unsorted if no location
    }

    // Find nearest station to user
    const nearestResult = findNearestStation(userLocation, Object.keys(STATIONS));
    if (!nearestResult) return buses;

    const userStationId = nearestResult.station.id;
    const userStation = nearestResult.station;

    // Score each bus based on:
    // - Does it pass through user's nearest station? (High priority)
    // - How close is the closest stop to user? (Distance-based)
    // - Does it go to the destination? (if specified)
    const scoredBuses = buses.map(bus => {
        let score = 0;
        let closestStopDistance = Infinity;
        let passesNearUser = false;
        let goesToDestination = false;

        // Check if bus passes through user's nearest station
        if (bus.stops.includes(userStationId)) {
            score += 1000; // Highest priority
            passesNearUser = true;
            closestStopDistance = nearestResult.distance;
        } else {
            // Find closest stop on this bus route to user
            bus.stops.forEach(stopId => {
                const stop = STATIONS[stopId];
                if (stop) {
                    const distance = getDistance(
                        userLocation,
                        { lat: stop.lat, lng: stop.lng }
                    );
                    if (distance < closestStopDistance) {
                        closestStopDistance = distance;
                    }
                    // If within 2km, consider it catchable
                    if (distance < 2000) {
                        passesNearUser = true;
                    }
                }
            });

            // Score based on distance (closer = higher score)
            // Max 500 points for very close (< 500m), decreasing with distance
            if (closestStopDistance < Infinity) {
                const distanceScore = Math.max(0, 500 - (closestStopDistance / 4));
                score += distanceScore;
            }
        }

        // Check if bus goes to any of the destination stations
        if (destinationStationIds.length > 0) {
            const goesToAnyDestination = bus.stops.some(stopId =>
                destinationStationIds.includes(stopId)
            );
            if (goesToAnyDestination) {
                score += 300; // Bonus for going to destination
                goesToDestination = true;
            }
        }

        // Bonus for direct route (no need to transfer)
        if (passesNearUser && goesToDestination) {
            score += 200; // Direct route bonus!
        }

        return {
            bus,
            score,
            closestStopDistance,
            passesNearUser,
            goesToDestination
        };
    });

    // Sort by score (highest first)
    scoredBuses.sort((a, b) => b.score - a.score);

    // Return just the buses in sorted order
    return scoredBuses.map(item => item.bus);
};

/**
 * Get IDs of destination stations from search query
 * This helps identify which buses actually go to the searched destination
 */
export const getDestinationStationIds = (query: string): string[] => {
    if (!query || query.trim().length === 0) return [];

    const lowerQuery = query.toLowerCase().trim();
    const matchingStations = Object.values(STATIONS).filter(station => {
        const englishMatch = station.name.toLowerCase().includes(lowerQuery);
        const bengaliMatch = station.bnName?.includes(query.trim());
        return englishMatch || bengaliMatch;
    });

    return matchingStations.map(s => s.id);
};
