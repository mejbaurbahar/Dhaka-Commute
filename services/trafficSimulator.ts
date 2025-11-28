import { STATIONS } from '../constants';

// TomTom API Configuration
const TOMTOM_API_KEYS = [
    '3iPB0lMafzBAx7dCUXdxcNhOKFzwfgQc',
    'teRApTUBTgGWfwNZJNNMgQv1MFvcNoS1'
];

let currentKeyIndex = 0;

function getTomTomApiKey(): string {
    return TOMTOM_API_KEYS[currentKeyIndex];
}

function switchToNextKey() {
    currentKeyIndex = (currentKeyIndex + 1) % TOMTOM_API_KEYS.length;
}

// Traffic congestion levels
export type TrafficLevel = 'free' | 'moderate' | 'heavy' | 'severe';

// Cache for traffic data to avoid excessive API calls
interface TrafficCache {
    data: Map<string, TrafficLevel>;
    timestamp: number;
}

const trafficCache: TrafficCache = {
    data: new Map(),
    timestamp: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Known congestion-prone areas in Dhaka (fallback for simulation)
const CONGESTION_ZONES = {
    motijheel: ['motijheel', 'dilkusha', 'paltan'],
    gulshan: ['gulshan1', 'gulshan2', 'banani'],
    dhanmondi: ['dhanmondi', 'dhanmondi_27', 'science_lab'],
    mirpur: ['mirpur1', 'mirpur10', 'mirpur11', 'mirpur12'],
    farmgate: ['farmgate', 'karwan_bazar'],
    shahbag: ['shahbag', 'tsc'],
    mohakhali: ['mohakhali', 'wireless_gate'],
    tejgaon: ['tejgaon', 'mogbazar'],
    uttara: ['uttara', 'abdullahpur', 'jasimuddin'],
};

// Fetch real-time traffic data from TomTom API
async function fetchTomTomTraffic(lat: number, lng: number): Promise<TrafficLevel | null> {
    try {
        const apiKey = getTomTomApiKey();
        const zoom = 15; // Zoom level for traffic flow
        const thickness = 10; // Line thickness

        // TomTom Traffic Flow Segment Data API
        const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lng}&unit=KMPH&key=${apiKey}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.status === 403) {
            // API key limit reached, switch to next key
            switchToNextKey();
            return null;
        }

        if (!response.ok) {
            console.warn('TomTom API error:', response.status);
            return null;
        }

        const data = await response.json();

        if (!data.flowSegmentData) {
            return null;
        }

        const flowData = data.flowSegmentData;
        const currentSpeed = flowData.currentSpeed || 0;
        const freeFlowSpeed = flowData.freeFlowSpeed || 50;
        const confidence = flowData.confidence || 0.5;

        // Calculate speed ratio (how much slower than free flow)
        const speedRatio = currentSpeed / freeFlowSpeed;

        // Determine traffic level based on speed ratio
        // Only trust the data if confidence is reasonable
        if (confidence < 0.3) {
            return null; // Low confidence, use fallback
        }

        if (speedRatio >= 0.8) return 'free';      // 80%+ of free flow speed
        if (speedRatio >= 0.5) return 'moderate';  // 50-80% of free flow speed
        if (speedRatio >= 0.3) return 'heavy';     // 30-50% of free flow speed
        return 'severe';                            // <30% of free flow speed

    } catch (error) {
        console.error('Error fetching TomTom traffic:', error);
        return null;
    }
}

// Fallback simulation (used when API fails)
function getSimulatedTrafficLevel(stationId: string, currentTime: Date = new Date()): TrafficLevel {
    const hour = currentTime.getHours();
    const dayOfWeek = currentTime.getDay();
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

    const isInCongestionZone = Object.values(CONGESTION_ZONES).some(zone =>
        zone.includes(stationId)
    );

    const isMorningRush = hour >= 8 && hour < 10 && !isWeekend;
    const isEveningRush = hour >= 17 && hour < 20 && !isWeekend;
    const isRushHour = isMorningRush || isEveningRush;
    const isLateNight = hour >= 23 || hour < 6;

    const weekendFactor = isWeekend ? 0.6 : 1.0;

    let congestionScore = 0;

    if (isLateNight) {
        congestionScore = 0;
    } else if (isRushHour && isInCongestionZone) {
        congestionScore = 0.9 * weekendFactor;
    } else if (isRushHour) {
        congestionScore = 0.6 * weekendFactor;
    } else if (isInCongestionZone) {
        congestionScore = 0.5 * weekendFactor;
    } else {
        congestionScore = 0.2 * weekendFactor;
    }

    const randomFactor = 0.85 + Math.random() * 0.3;
    congestionScore *= randomFactor;

    if (congestionScore < 0.25) return 'free';
    if (congestionScore < 0.5) return 'moderate';
    if (congestionScore < 0.75) return 'heavy';
    return 'severe';
}

// Get traffic level with API + fallback
export async function getTrafficLevel(stationId: string, currentTime: Date = new Date()): Promise<TrafficLevel> {
    const station = STATIONS[stationId];
    if (!station) {
        return 'free';
    }

    // Try to get from API
    const apiLevel = await fetchTomTomTraffic(station.lat, station.lng);

    if (apiLevel) {
        return apiLevel;
    }

    // Fallback to simulation
    return getSimulatedTrafficLevel(stationId, currentTime);
}

// Get traffic level for a segment (synchronous version for rendering)
export function getSegmentTrafficLevel(
    fromStationId: string,
    toStationId: string,
    currentTime: Date = new Date()
): TrafficLevel {
    // Check cache first
    const cacheKey = `${fromStationId}-${toStationId}`;
    const now = Date.now();

    if (now - trafficCache.timestamp < CACHE_DURATION && trafficCache.data.has(cacheKey)) {
        return trafficCache.data.get(cacheKey)!;
    }

    // Use simulation for immediate rendering (API calls happen in background)
    const fromLevel = getSimulatedTrafficLevel(fromStationId, currentTime);
    const toLevel = getSimulatedTrafficLevel(toStationId, currentTime);

    const levels: TrafficLevel[] = ['free', 'moderate', 'heavy', 'severe'];
    const fromIndex = levels.indexOf(fromLevel);
    const toIndex = levels.indexOf(toLevel);

    const result = levels[Math.max(fromIndex, toIndex)];

    // Cache the result
    trafficCache.data.set(cacheKey, result);
    trafficCache.timestamp = now;

    // Fetch real data in background for next render
    const fromStation = STATIONS[fromStationId];
    const toStation = STATIONS[toStationId];

    if (fromStation && toStation) {
        const midLat = (fromStation.lat + toStation.lat) / 2;
        const midLng = (fromStation.lng + toStation.lng) / 2;

        fetchTomTomTraffic(midLat, midLng).then(apiLevel => {
            if (apiLevel) {
                trafficCache.data.set(cacheKey, apiLevel);
                trafficCache.timestamp = Date.now();
            }
        });
    }

    return result;
}

// Get color for traffic level (Google Maps style)
export function getTrafficColor(level: TrafficLevel): string {
    switch (level) {
        case 'free':
            return '#34A853'; // Green
        case 'moderate':
            return '#FBBC04'; // Yellow/Orange
        case 'heavy':
            return '#EA4335'; // Red
        case 'severe':
            return '#9C27B0'; // Dark Red/Purple
        default:
            return '#006a4e'; // Default green
    }
}

// Get human-readable traffic description
export function getTrafficDescription(level: TrafficLevel): string {
    switch (level) {
        case 'free':
            return 'Free flow';
        case 'moderate':
            return 'Moderate traffic';
        case 'heavy':
            return 'Heavy traffic';
        case 'severe':
            return 'Severe congestion';
        default:
            return 'Unknown';
    }
}

// Get estimated delay multiplier based on traffic
export function getDelayMultiplier(level: TrafficLevel): number {
    switch (level) {
        case 'free':
            return 1.0;
        case 'moderate':
            return 1.3;
        case 'heavy':
            return 1.8;
        case 'severe':
            return 2.5;
        default:
            return 1.0;
    }
}

// Prefetch traffic data for a route
export async function prefetchRouteTraffic(stationIds: string[]): Promise<void> {
    const promises = stationIds.map(async (stationId, idx) => {
        if (idx === stationIds.length - 1) return;

        const fromId = stationId;
        const toId = stationIds[idx + 1];
        const cacheKey = `${fromId}-${toId}`;

        const fromStation = STATIONS[fromId];
        const toStation = STATIONS[toId];

        if (fromStation && toStation) {
            const midLat = (fromStation.lat + toStation.lat) / 2;
            const midLng = (fromStation.lng + toStation.lng) / 2;

            const level = await fetchTomTomTraffic(midLat, midLng);
            if (level) {
                trafficCache.data.set(cacheKey, level);
                trafficCache.timestamp = Date.now();
            }
        }
    });

    await Promise.all(promises);
}
