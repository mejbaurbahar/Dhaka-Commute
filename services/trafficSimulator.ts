import { STATIONS } from '../constants';

// Traffic congestion levels
export type TrafficLevel = 'free' | 'moderate' | 'heavy' | 'severe';

// Known congestion-prone areas in Dhaka
const CONGESTION_ZONES = {
    // Major commercial areas
    motijheel: ['motijheel', 'dilkusha', 'paltan'],
    gulshan: ['gulshan1', 'gulshan2', 'banani'],
    dhanmondi: ['dhanmondi', 'dhanmondi_27', 'science_lab'],
    mirpur: ['mirpur1', 'mirpur10', 'mirpur11', 'mirpur12'],

    // Major intersections
    farmgate: ['farmgate', 'karwan_bazar'],
    shahbag: ['shahbag', 'tsc'],
    mohakhali: ['mohakhali', 'wireless_gate'],

    // Industrial/busy areas
    tejgaon: ['tejgaon', 'mogbazar'],
    uttara: ['uttara', 'abdullahpur', 'jasimuddin'],
};

// Get traffic level based on time and location
export function getTrafficLevel(stationId: string, currentTime: Date = new Date()): TrafficLevel {
    const hour = currentTime.getHours();
    const dayOfWeek = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Friday & Saturday

    // Check if station is in a congestion zone
    const isInCongestionZone = Object.values(CONGESTION_ZONES).some(zone =>
        zone.includes(stationId)
    );

    // Rush hour periods (8-10 AM, 5-8 PM on weekdays)
    const isMorningRush = hour >= 8 && hour < 10 && !isWeekend;
    const isEveningRush = hour >= 17 && hour < 20 && !isWeekend;
    const isRushHour = isMorningRush || isEveningRush;

    // Late night (11 PM - 6 AM)
    const isLateNight = hour >= 23 || hour < 6;

    // Weekend traffic is generally lighter
    const weekendFactor = isWeekend ? 0.6 : 1.0;

    // Calculate base congestion score
    let congestionScore = 0;

    if (isLateNight) {
        congestionScore = 0; // Free flow at night
    } else if (isRushHour && isInCongestionZone) {
        congestionScore = 0.9 * weekendFactor; // Severe during rush hour in congestion zones
    } else if (isRushHour) {
        congestionScore = 0.6 * weekendFactor; // Heavy during rush hour elsewhere
    } else if (isInCongestionZone) {
        congestionScore = 0.5 * weekendFactor; // Moderate in congestion zones off-peak
    } else {
        congestionScore = 0.2 * weekendFactor; // Light traffic elsewhere
    }

    // Add some randomness for realism (±15%)
    const randomFactor = 0.85 + Math.random() * 0.3;
    congestionScore *= randomFactor;

    // Map score to traffic level
    if (congestionScore < 0.25) return 'free';
    if (congestionScore < 0.5) return 'moderate';
    if (congestionScore < 0.75) return 'heavy';
    return 'severe';
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

// Get traffic level for a segment between two stations
export function getSegmentTrafficLevel(
    fromStationId: string,
    toStationId: string,
    currentTime: Date = new Date()
): TrafficLevel {
    // Get traffic level for both stations
    const fromLevel = getTrafficLevel(fromStationId, currentTime);
    const toLevel = getTrafficLevel(toStationId, currentTime);

    // Use the worse (higher) traffic level for the segment
    const levels: TrafficLevel[] = ['free', 'moderate', 'heavy', 'severe'];
    const fromIndex = levels.indexOf(fromLevel);
    const toIndex = levels.indexOf(toLevel);

    return levels[Math.max(fromIndex, toIndex)];
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
            return 1.0; // No delay
        case 'moderate':
            return 1.3; // 30% slower
        case 'heavy':
            return 1.8; // 80% slower
        case 'severe':
            return 2.5; // 150% slower
        default:
            return 1.0;
    }
}
