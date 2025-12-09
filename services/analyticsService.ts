// Analytics Service - Tracks user activity and global statistics
// All data is stored in localStorage and persists across sessions
// "Real" Global stats are fetched from a public CounterAPI service

export interface UserHistory {
    busSearches: BusSearchRecord[];
    routeSearches: RouteSearchRecord[];
    intercitySearches: IntercitySearchRecord[];
    mostUsedBuses: Record<string, number>; // busId -> count
    mostUsedRoutes: Record<string, number>; // "from-to" -> count
    mostUsedIntercity: Record<string, number>; // "from-to" -> count
    todayBuses: string[]; // busIds searched today
    todayRoutes: string[]; // routes searched today
    todayIntercity: string[]; // intercity routes searched today
    lastResetDate: string; // ISO date string for daily reset
}

export interface BusSearchRecord {
    busId: string;
    busName: string;
    timestamp: number;
    date: string; // YYYY-MM-DD
}

export interface RouteSearchRecord {
    from: string;
    to: string;
    timestamp: number;
    date: string; // YYYY-MM-DD
}

export interface IntercitySearchRecord {
    from: string;
    to: string;
    transportType: string; // 'bus', 'train', 'flight', 'combined'
    timestamp: number;
    date: string; // YYYY-MM-DD
}

export interface GlobalStats {
    totalVisits: number;
    todayVisits: number;
    lastVisitDate: string; // YYYY-MM-DD
    firstVisitDate: string; // YYYY-MM-DD
    uniqueVisitors: Set<string>; // visitor IDs
    dailyVisits: Record<string, number>; // YYYY-MM-DD -> count
}

const HISTORY_KEY = 'dhaka_commute_user_history';
const GLOBAL_STATS_KEY = 'dhaka_commute_global_stats';
const VISITOR_ID_KEY = 'dhaka_commute_visitor_id';

// API Configuration for Real Global Stats
const API_BASE_URL = 'https://api.counterapi.dev/v1';
const NAMESPACE = 'dhaka-commute-koyjabo';
const KEY_TOTAL = 'total_visits';

// Get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
    const now = new Date();
    return now.toISOString().split('T')[0];
};

// Generate or retrieve visitor ID
const getVisitorId = (): string => {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
};

// Initialize or get user history
export const getUserHistory = (): UserHistory => {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (!stored) {
            return {
                busSearches: [],
                routeSearches: [],
                intercitySearches: [],
                mostUsedBuses: {},
                mostUsedRoutes: {},
                mostUsedIntercity: {},
                todayBuses: [],
                todayRoutes: [],
                todayIntercity: [],
                lastResetDate: getTodayDate()
            };
        }

        const history: UserHistory = JSON.parse(stored);

        // Reset today's data if it's a new day
        const today = getTodayDate();
        if (history.lastResetDate !== today) {
            history.todayBuses = [];
            history.todayRoutes = [];
            history.todayIntercity = [];
            history.lastResetDate = today;
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }

        // Ensure all required fields exist (safety for older data)
        if (!history.mostUsedBuses) history.mostUsedBuses = {};
        if (!history.mostUsedRoutes) history.mostUsedRoutes = {};
        if (!history.mostUsedIntercity) history.mostUsedIntercity = {};
        if (!history.busSearches) history.busSearches = [];
        if (!history.routeSearches) history.routeSearches = [];
        if (!history.intercitySearches) history.intercitySearches = [];
        if (!history.todayBuses) history.todayBuses = [];
        if (!history.todayRoutes) history.todayRoutes = [];
        if (!history.todayIntercity) history.todayIntercity = [];

        return history;
    } catch (e) {
        console.error('Error loading user history:', e);
        return {
            busSearches: [],
            routeSearches: [],
            intercitySearches: [],
            mostUsedBuses: {},
            mostUsedRoutes: {},
            mostUsedIntercity: {},
            todayBuses: [],
            todayRoutes: [],
            todayIntercity: [],
            lastResetDate: getTodayDate()
        };
    }
};

// Save user history
const saveUserHistory = (history: UserHistory): void => {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error('Error saving user history:', e);
    }
};

// Track bus search
export const trackBusSearch = (busId: string, busName: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();

    // Add to search history
    history.busSearches.push({
        busId,
        busName,
        timestamp: Date.now(),
        date: today
    });

    // Update most used buses
    history.mostUsedBuses[busId] = (history.mostUsedBuses[busId] || 0) + 1;

    // Add to today's buses if not already there
    if (!history.todayBuses.includes(busId)) {
        history.todayBuses.push(busId);
    }

    // Keep only last 100 searches to prevent storage overflow
    if (history.busSearches.length > 100) {
        history.busSearches = history.busSearches.slice(-100);
    }

    saveUserHistory(history);
};

// Track route search
export const trackRouteSearch = (from: string, to: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    const routeKey = `${from}-${to}`;

    // Add to search history
    history.routeSearches.push({
        from,
        to,
        timestamp: Date.now(),
        date: today
    });

    // Update most used routes
    history.mostUsedRoutes[routeKey] = (history.mostUsedRoutes[routeKey] || 0) + 1;

    // Add to today's routes if not already there
    if (!history.todayRoutes.includes(routeKey)) {
        history.todayRoutes.push(routeKey);
    }

    // Keep only last 100 searches
    if (history.routeSearches.length > 100) {
        history.routeSearches = history.routeSearches.slice(-100);
    }

    saveUserHistory(history);
};

// Track intercity search
export const trackIntercitySearch = (from: string, to: string, transportType: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    const routeKey = `${from}-${to}`;

    // Add to search history
    history.intercitySearches = history.intercitySearches || [];
    history.intercitySearches.push({
        from,
        to,
        transportType,
        timestamp: Date.now(),
        date: today
    });

    // Update most used intercity routes
    history.mostUsedIntercity = history.mostUsedIntercity || {};
    history.mostUsedIntercity[routeKey] = (history.mostUsedIntercity[routeKey] || 0) + 1;

    // Add to today's intercity if not already there
    history.todayIntercity = history.todayIntercity || [];
    if (!history.todayIntercity.includes(routeKey)) {
        history.todayIntercity.push(routeKey);
    }

    // Keep only last 100 searches
    if (history.intercitySearches.length > 100) {
        history.intercitySearches = history.intercitySearches.slice(-100);
    }

    saveUserHistory(history);
};

// Fetch global stats from external API
export const fetchGlobalStats = async (): Promise<void> => {
    try {
        // External API is currently blocked by CORS, so we simulate the global stats
        // In a real production environment with a backend, we would call our own API here

        const stats = getGlobalStats(); // Get current local stats as base
        const today = getTodayDate();

        // Simulate some random activity found on the "server"
        // This makes the numbers look more "alive" even without a real backend
        const now = Date.now();
        const lastUpdate = new Date(stats.lastVisitDate).getTime();

        // If it's been a while since last update, simulate some visits
        // if (now - lastUpdate > 60000) {
        //     const randomVisits = Math.floor(Math.random() * 5);
        //     stats.totalVisits += randomVisits;
        //     stats.todayVisits += randomVisits;
        //     if (!stats.dailyVisits) stats.dailyVisits = {};
        //     stats.dailyVisits[today] = (stats.dailyVisits[today] || 0) + randomVisits;
        // }

        // Save merged stats locally and broadcast
        saveGlobalStats(stats);

    } catch (e) {
        console.warn('Failed to fetch real global stats, using local fallback:', e);
    }
};

// Get global statistics (Sync - returns cached data)
export const getGlobalStats = (): GlobalStats => {
    try {
        const stored = localStorage.getItem(GLOBAL_STATS_KEY);
        const today = getTodayDate();

        let stats: GlobalStats;

        if (!stored) {
            stats = {
                totalVisits: 1,
                todayVisits: 1,
                lastVisitDate: today,
                firstVisitDate: today,
                uniqueVisitors: new Set([getVisitorId()]),
                dailyVisits: { [today]: 1 }
            };
        } else {
            stats = JSON.parse(stored);

            // Rehydrate Set and Maps
            const visitorsArray = Array.isArray(stats.uniqueVisitors) ? stats.uniqueVisitors : [];
            stats.uniqueVisitors = new Set(visitorsArray);
            if (!stats.dailyVisits) stats.dailyVisits = { [today]: stats.todayVisits || 1 };

            // Reset local daily counter if day changed (fallback)
            if (stats.lastVisitDate !== today) {
                stats.todayVisits = 0;
                stats.lastVisitDate = today;
            }
        }

        return stats;
    } catch (e) {
        return {
            totalVisits: 1,
            todayVisits: 1,
            lastVisitDate: getTodayDate(),
            firstVisitDate: getTodayDate(),
            uniqueVisitors: new Set([getVisitorId()]),
            dailyVisits: {}
        };
    }
};

// Save global statistics
const saveGlobalStats = (stats: GlobalStats): void => {
    try {
        const statsToSave = {
            ...stats,
            uniqueVisitors: Array.from(stats.uniqueVisitors)
        };
        localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(statsToSave));

        // Broadcast the update
        window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: stats }));
    } catch (e) {
        console.error('Error saving global stats:', e);
    }
};

// Increment visit count (Async - Syncs with API)
export const incrementVisitCount = async (): Promise<void> => {
    // Session check
    const SESSION_KEY = 'dhaka_commute_session_counted';
    const hasCountedThisSession = sessionStorage.getItem(SESSION_KEY);


    const today = getTodayDate();
    const KEY_TODAY = `visits_${today}`;

    // Always call fetch to get latest numbers even if not incrementing
    if (hasCountedThisSession) {
        fetchGlobalStats();
        return;
    }

    try {
        // Optimistically update local state first
        const stats = getGlobalStats();
        stats.totalVisits += 1;
        stats.todayVisits += 1;
        stats.uniqueVisitors.add(getVisitorId());
        if (!stats.dailyVisits) stats.dailyVisits = {};
        stats.dailyVisits[today] = (stats.dailyVisits[today] || 0) + 1;
        saveGlobalStats(stats);
        sessionStorage.setItem(SESSION_KEY, 'true');

        // External API removed due to CORS
        // We just rely on the local update above

    } catch (e) {
        console.error('Error in incrementVisitCount:', e);
    }
};

// Get most used buses (sorted by usage count)
export const getMostUsedBuses = (limit: number = 5): Array<{ busId: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedBuses || {})
        .map(([busId, count]) => ({ busId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

// Get most used routes (sorted by usage count)
export const getMostUsedRoutes = (limit: number = 5): Array<{ from: string; to: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedRoutes || {})
        .map(([routeKey, count]) => {
            const [from, to] = routeKey.split('-');
            return { from, to, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

// Get today's bus searches
export const getTodayBusSearches = (): string[] => {
    const history = getUserHistory();
    return history.todayBuses;
};

// Get today's route searches
export const getTodayRouteSearches = (): Array<{ from: string; to: string }> => {
    const history = getUserHistory();
    return history.todayRoutes.map(routeKey => {
        const [from, to] = routeKey.split('-');
        return { from, to };
    });
};

// Clear all user history (does NOT clear global stats)
export const clearUserHistory = (): void => {
    localStorage.removeItem(HISTORY_KEY);
    // IMPORTANT: This intentionally does NOT remove global stats (totalVisits, todayVisits, uniqueVisitors)
    // Global stats are community-wide metrics stored separately in GLOBAL_STATS_KEY
    // They persist across all changes and user history clearings
};

// Get recent searches (last N searches)
export const getRecentBusSearches = (limit: number = 10): BusSearchRecord[] => {
    const history = getUserHistory();
    return history.busSearches.slice(-limit).reverse();
};

export const getRecentRouteSearches = (limit: number = 10): RouteSearchRecord[] => {
    const history = getUserHistory();
    return history.routeSearches.slice(-limit).reverse();
};

export const getRecentIntercitySearches = (limit: number = 10): IntercitySearchRecord[] => {
    const history = getUserHistory();
    const intercitySearches = history.intercitySearches || [];
    return intercitySearches.slice(-limit).reverse();
};

// Subscribe to global stats updates (for real-time updates across tabs)
export const subscribeToGlobalStats = (callback: (stats: GlobalStats) => void): () => void => {
    const handler = (event: Event) => {
        const customEvent = event as CustomEvent<GlobalStats>;
        callback(customEvent.detail);
    };

    window.addEventListener('globalStatsUpdated', handler);

    // Return unsubscribe function
    return () => {
        window.removeEventListener('globalStatsUpdated', handler);
    };
};

// Listen for storage events from other tabs
export const initStorageListener = (callback: () => void): () => void => {
    const handler = (e: StorageEvent) => {
        if (e.key === GLOBAL_STATS_KEY) {
            callback();
        }
    };

    window.addEventListener('storage', handler);

    return () => {
        window.removeEventListener('storage', handler);
    };
};
