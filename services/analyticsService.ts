// Analytics Service - Tracks user activity and global statistics
// All data is stored in localStorage and persists across sessions

export interface UserHistory {
    busSearches: BusSearchRecord[];
    routeSearches: RouteSearchRecord[];
    mostUsedBuses: Record<string, number>; // busId -> count
    mostUsedRoutes: Record<string, number>; // "from-to" -> count
    todayBuses: string[]; // busIds searched today
    todayRoutes: string[]; // routes searched today
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

export interface GlobalStats {
    totalVisits: number;
    todayVisits: number;
    lastVisitDate: string; // YYYY-MM-DD
    firstVisitDate: string; // YYYY-MM-DD
    uniqueVisitors: Set<string>; // visitor IDs
}

const HISTORY_KEY = 'dhaka_commute_user_history';
const GLOBAL_STATS_KEY = 'dhaka_commute_global_stats';
const VISITOR_ID_KEY = 'dhaka_commute_visitor_id';

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
                mostUsedBuses: {},
                mostUsedRoutes: {},
                todayBuses: [],
                todayRoutes: [],
                lastResetDate: getTodayDate()
            };
        }

        const history: UserHistory = JSON.parse(stored);

        // Reset today's data if it's a new day
        const today = getTodayDate();
        if (history.lastResetDate !== today) {
            history.todayBuses = [];
            history.todayRoutes = [];
            history.lastResetDate = today;
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }

        return history;
    } catch (e) {
        console.error('Error loading user history:', e);
        return {
            busSearches: [],
            routeSearches: [],
            mostUsedBuses: {},
            mostUsedRoutes: {},
            todayBuses: [],
            todayRoutes: [],
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

// Get global statistics
export const getGlobalStats = (): GlobalStats => {
    try {
        const stored = localStorage.getItem(GLOBAL_STATS_KEY);
        const today = getTodayDate();

        if (!stored) {
            const newStats: GlobalStats = {
                totalVisits: 1,
                todayVisits: 1,
                lastVisitDate: today,
                firstVisitDate: today,
                uniqueVisitors: new Set([getVisitorId()])
            };
            saveGlobalStats(newStats);
            return newStats;
        }

        const stats = JSON.parse(stored);

        // Convert uniqueVisitors array back to Set
        stats.uniqueVisitors = new Set(stats.uniqueVisitors || []);

        // Reset today's visits if it's a new day
        if (stats.lastVisitDate !== today) {
            stats.todayVisits = 0;
            stats.lastVisitDate = today;
        }

        return stats;
    } catch (e) {
        console.error('Error loading global stats:', e);
        const today = getTodayDate();
        return {
            totalVisits: 1,
            todayVisits: 1,
            lastVisitDate: today,
            firstVisitDate: today,
            uniqueVisitors: new Set([getVisitorId()])
        };
    }
};

// Save global statistics
const saveGlobalStats = (stats: GlobalStats): void => {
    try {
        // Convert Set to Array for JSON serialization
        const statsToSave = {
            ...stats,
            uniqueVisitors: Array.from(stats.uniqueVisitors)
        };
        localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(statsToSave));

        // Broadcast the update to other tabs
        window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: stats }));
    } catch (e) {
        console.error('Error saving global stats:', e);
    }
};

// Increment visit count
export const incrementVisitCount = (): void => {
    // Check if this is a new session (not just a page refresh)
    const SESSION_KEY = 'dhaka_commute_session_counted';
    const hasCountedThisSession = sessionStorage.getItem(SESSION_KEY);

    // If we've already counted this session, don't increment again
    if (hasCountedThisSession) {
        return;
    }

    const stats = getGlobalStats();
    const visitorId = getVisitorId();

    stats.totalVisits += 1;
    stats.todayVisits += 1;
    stats.uniqueVisitors.add(visitorId);

    saveGlobalStats(stats);

    // Mark this session as counted (will be cleared when browser tab/window is closed)
    sessionStorage.setItem(SESSION_KEY, 'true');

    // Force a broadcast to ensure all listeners are notified
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: stats }));
    }, 100);
};

// Get most used buses (sorted by usage count)
export const getMostUsedBuses = (limit: number = 5): Array<{ busId: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedBuses)
        .map(([busId, count]) => ({ busId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

// Get most used routes (sorted by usage count)
export const getMostUsedRoutes = (limit: number = 5): Array<{ from: string; to: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedRoutes)
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

// Clear all user history
export const clearUserHistory = (): void => {
    localStorage.removeItem(HISTORY_KEY);
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
