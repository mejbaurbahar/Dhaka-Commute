import { BusRoute, Station } from '../types';
import { BUS_DATA, STATIONS } from '../constants';
import { findNearbyStations, getNearbyStationNames } from './nearbyStationsService';

/**
 * Enhanced Search Service for Bus & Station Search
 * Supports Bengali text, station names, and bus names/numbers
 */

export interface SearchSuggestion {
    type: 'bus' | 'station';
    id: string;
    name: string;
    bnName?: string;
    subtitle?: string;
}

export interface SearchResult {
    buses: BusRoute[];
    matchType: 'bus_name' | 'destination' | 'fuzzy';
    searchContext?: string;
}

/**
 * Generate autocomplete suggestions based on user input
 */
export const generateSearchSuggestions = (query: string): SearchSuggestion[] => {
    if (!query || query.trim().length < 1) return [];

    const lowerQuery = query.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    // Search stations (both English and Bengali names)
    Object.values(STATIONS).forEach(station => {
        const englishMatch = station.name.toLowerCase().includes(lowerQuery);
        const bengaliMatch = station.bnName?.includes(query.trim());

        if (englishMatch || bengaliMatch) {
            suggestions.push({
                type: 'station',
                id: station.id,
                name: station.name,
                bnName: station.bnName,
                subtitle: station.bnName || station.name
            });
        }
    });

    // Search bus names/numbers
    BUS_DATA.forEach(bus => {
        const nameMatch = bus.name.toLowerCase().includes(lowerQuery);
        const bnNameMatch = bus.bnName?.includes(query.trim());
        const idMatch = bus.id.toLowerCase().includes(lowerQuery);

        if (nameMatch || bnNameMatch || idMatch) {
            suggestions.push({
                type: 'bus',
                id: bus.id,
                name: bus.name,
                bnName: bus.bnName,
                subtitle: bus.routeString
            });
        }
    });

    // Return top 10 suggestions (5 stations + 5 buses preferred)
    const stationSuggestions = suggestions.filter(s => s.type === 'station').slice(0, 6);
    const busSuggestions = suggestions.filter(s => s.type === 'bus').slice(0, 4);

    return [...stationSuggestions, ...busSuggestions];
};

/**
 * Enhanced search that handles:
 * 1. Bus name/number search
 * 2. Destination/station search (finds buses going to that station)
 * 3. Bengali text search
 */
export const enhancedBusSearch = (query: string): SearchResult => {
    if (!query || query.trim().length === 0) {
        return {
            buses: BUS_DATA,
            matchType: 'fuzzy'
        };
    }

    const lowerQuery = query.toLowerCase().trim();
    const queryTrimmed = query.trim();

    // STEP 1: Search for bus by name/number/ID
    const busByName = BUS_DATA.filter(bus => {
        const nameMatch = bus.name.toLowerCase().includes(lowerQuery);
        const bnNameMatch = bus.bnName?.includes(queryTrimmed);
        const idMatch = bus.id.toLowerCase().includes(lowerQuery);
        const routeMatch = bus.routeString?.toLowerCase().includes(lowerQuery);

        return nameMatch || bnNameMatch || idMatch || routeMatch;
    });

    if (busByName.length > 0) {
        return {
            buses: busByName,
            matchType: 'bus_name',
            searchContext: `Bus matching "${query}"`
        };
    }

    // STEP 2: Search for stations matching the query
    const matchingStations = Object.values(STATIONS).filter(station => {
        const englishMatch = station.name.toLowerCase().includes(lowerQuery);
        const bengaliMatch = station.bnName?.includes(queryTrimmed);

        return englishMatch || bengaliMatch;
    });

    if (matchingStations.length > 0) {
        // Find all buses that stop at any of these matching stations
        const busesGoingThere: BusRoute[] = [];
        const stationIds = matchingStations.map(s => s.id);

        BUS_DATA.forEach(bus => {
            const goesToStation = bus.stops.some(stopId => stationIds.includes(stopId));
            if (goesToStation) {
                busesGoingThere.push(bus);
            }
        });

        if (busesGoingThere.length > 0) {
            const stationName = matchingStations[0].bnName || matchingStations[0].name;
            return {
                buses: busesGoingThere,
                matchType: 'destination',
                searchContext: `Buses going to ${stationName}`
            };
        }

        // STEP 2.5: If no direct buses found, search nearby stations
        // This helps when a place doesn't have direct bus service
        const firstStation = matchingStations[0];
        const nearbyStationIds = findNearbyStations(firstStation.id, 2000); // Within 2km

        if (nearbyStationIds.length > 0) {
            const busesGoingNearby: BusRoute[] = [];

            BUS_DATA.forEach(bus => {
                const goesToNearby = bus.stops.some(stopId => nearbyStationIds.includes(stopId));
                if (goesToNearby) {
                    busesGoingNearby.push(bus);
                }
            });

            if (busesGoingNearby.length > 0) {
                const stationName = firstStation.bnName || firstStation.name;
                const nearbyNames = getNearbyStationNames(nearbyStationIds, 3);

                return {
                    buses: busesGoingNearby,
                    matchType: 'destination',
                    searchContext: `Buses going near ${stationName} (via ${nearbyNames})`
                };
            }
        }
    }

    // STEP 3: Fuzzy search as fallback (search route descriptions, etc.)
    const fuzzyResults = BUS_DATA.filter(bus => {
        const routeMatch = bus.routeString?.toLowerCase().includes(lowerQuery);
        const typeMatch = bus.type?.toLowerCase().includes(lowerQuery);

        return routeMatch || typeMatch;
    });

    return {
        buses: fuzzyResults.length > 0 ? fuzzyResults : [],
        matchType: 'fuzzy',
        searchContext: fuzzyResults.length > 0 ? `Search results for "${query}"` : undefined
    };
};

/**
 * Get all stations sorted alphabetically for dropdowns
 */
export const getAllStationsSorted = (): Station[] => {
    return Object.values(STATIONS).sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get all buses sorted by name
 */
export const getAllBusesSorted = (): BusRoute[] => {
    return [...BUS_DATA].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Filter buses by area
 */
export const filterBusesByArea = (area: string): BusRoute[] => {
    const areaLower = area.toLowerCase();

    return BUS_DATA.filter(bus => {
        const routeMatch = bus.routeString?.toLowerCase().includes(areaLower);
        const stopsInArea = bus.stops.some(stopId => {
            const station = STATIONS[stopId];
            return station?.name.toLowerCase().includes(areaLower);
        });

        return routeMatch || stopsInArea;
    });
};

/**
 * Filter buses by type (AC, Non-AC, etc.)
 */
export const filterBusesByType = (type: string): BusRoute[] => {
    return BUS_DATA.filter(bus =>
        bus.type?.toLowerCase().includes(type.toLowerCase())
    );
};

/**
 * Get popular search suggestions (pre-defined)
 */
export const getPopularSearches = (): SearchSuggestion[] => {
    return [
        { type: 'station', id: 'dhaka_university', name: 'Dhaka University', bnName: 'ঢাকা বিশ্ববিদ্যালয়' },
        { type: 'station', id: 'shahbag', name: 'Shahbag', bnName: 'শাহবাগ' },
        { type: 'station', id: 'uttara', name: 'Uttara', bnName: 'উত্তরা' },
        { type: 'station', id: 'mohakhali', name: 'Mohakhali', bnName: 'মহাখালী' },
        { type: 'station', id: 'gulistan', name: 'Gulistan', bnName: 'গুলিস্তান' },
        { type: 'station', id: 'farmgate', name: 'Farmgate', bnName: 'ফার্মগেট' },
        { type: 'station', id: 'mirpur10', name: 'Mirpur 10', bnName: 'মিরপুর ১০' },
        { type: 'station', id: 'dhanmondi', name: 'Dhanmondi', bnName: 'ধানমন্ডি' },
    ];
};
