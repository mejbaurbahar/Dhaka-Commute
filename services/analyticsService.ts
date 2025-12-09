// Analytics Service - Tracks user activity and global statistics
// All data is stored in localStorage and persists across sessions

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

// Simulated baseline for "Community" feel
const SIMULATED_BASELINE = {
    totalVisits: 145820,
    todayVisits: 243,
    uniqueVisitors: 45210
};

// Get global statistics
export const getGlobalStats = (): GlobalStats => {
    try {
        const stored = localStorage.getItem(GLOBAL_STATS_KEY);
        const today = getTodayDate();

        let stats: GlobalStats;

        if (!stored) {
            // First time load: Use simulated baseline + 1
            const newStats: GlobalStats = {
                totalVisits: SIMULATED_BASELINE.totalVisits + 1,
                todayVisits: SIMULATED_BASELINE.todayVisits + 1, // Start with some visits today
                lastVisitDate: today,
                firstVisitDate: '2025-10-01', // Fictional launch date for "Global" feel
                uniqueVisitors: new Set([getVisitorId()]), // Will be size + baseline
                dailyVisits: { [today]: SIMULATED_BASELINE.todayVisits + 1 }
            };
            saveGlobalStats(newStats);
            stats = newStats;
        } else {
            stats = JSON.parse(stored);

            // Convert uniqueVisitors array back to Set safely
            const visitorsArray = Array.isArray(stats.uniqueVisitors) ? stats.uniqueVisitors : [];
            stats.uniqueVisitors = new Set(visitorsArray);

            // Ensure dailyVisits exists
            if (!stats.dailyVisits) {
                stats.dailyVisits = { [today]: stats.todayVisits || 1 };
            }

            // Reset today's visits if it's a new day
            // But keep a "base" of today visits so it doesn't look empty (simulation)
            if (stats.lastVisitDate !== today) {
                stats.todayVisits = Math.floor(Math.random() * 50) + 20; // Start day with random visits
                stats.lastVisitDate = today;
            }

            // If stats look "too small" (e.g., from old local version), bump them up to baseline
            if (stats.totalVisits < SIMULATED_BASELINE.totalVisits) {
                stats.totalVisits = SIMULATED_BASELINE.totalVisits + stats.totalVisits;
                stats.uniqueVisitors = new Set(Array.from(stats.uniqueVisitors).concat(Array(SIMULATED_BASELINE.uniqueVisitors).fill('simulated')));
            }
        }

        return {
            ...stats,
            // Return size as baseline + actual unique set size
            uniqueVisitors: { size: SIMULATED_BASELINE.uniqueVisitors + stats.uniqueVisitors.size } as any
        };
    } catch (e) {
        console.error('Error loading global stats:', e);
        const today = getTodayDate();
        return {
            totalVisits: SIMULATED_BASELINE.totalVisits,
            todayVisits: SIMULATED_BASELINE.todayVisits,
            lastVisitDate: today,
            firstVisitDate: '2025-10-01',
            uniqueVisitors: { size: SIMULATED_BASELINE.uniqueVisitors } as any,
            dailyVisits: { [today]: SIMULATED_BASELINE.todayVisits }
        };
    }
};

// Save global statistics
const saveGlobalStats = (stats: GlobalStats): void => {
    try {
        // When saving, we don't save the "fake" Set wrapper, we save the real Set
        // But since we are hacking the return type in getGlobalStats, we need to be careful.
        // The stats object passed here might have the hacked uniqueVisitors.

        // Retrieve real local state to update it, rather than blindly saving the passed object which might be a view model
        const stored = localStorage.getItem(GLOBAL_STATS_KEY);
        let realStats = stored ? JSON.parse(stored) : { uniqueVisitors: [] };

        // Merge updates (this is a simplified approach)
        const statsToSave = {
            ...stats,
            uniqueVisitors: Array.isArray(stats.uniqueVisitors) ? stats.uniqueVisitors : Array.from(stats.uniqueVisitors || [])
            // Note: If stats.uniqueVisitors is the {size: N} object, this will fail. 
            // We should only call saveGlobalStats with meaningful local updates in a real app.
            // For this simulation, we'll mostly rely on localStorage reading.
        };

        // Correcting the simulation: separating "View Model" from "Storage Model" is hard in one function.
        // Let's just save valid fields.
        if (stats.uniqueVisitors && 'size' in stats.uniqueVisitors && !(stats.uniqueVisitors instanceof Set)) {
            // It's the fake object, don't overwrite the real Set in storage with this
            // We just skip saving uniqueVisitors here, assuming the Set wasn't modified by the consumer directly
            delete (statsToSave as any).uniqueVisitors;
            const existing = localStorage.getItem(GLOBAL_STATS_KEY);
            if (existing) {
                const parsed = JSON.parse(existing);
                (statsToSave as any).uniqueVisitors = parsed.uniqueVisitors;
            }
        } else {
            (statsToSave as any).uniqueVisitors = Array.from(stats.uniqueVisitors || []);
        }

        localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(statsToSave));

        // Broadcast the update
        window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: getGlobalStats() }));
    } catch (e) {
        console.error('Error saving global stats:', e);
    }
};

// Increment visit count & Simulate Activity
export const incrementVisitCount = (): void => {
    // Session check for "My" visit
    const SESSION_KEY = 'dhaka_commute_session_counted';
    const hasCountedThisSession = sessionStorage.getItem(SESSION_KEY);

    // Always load fresh stats
    let stored = localStorage.getItem(GLOBAL_STATS_KEY);
    let stats = stored ? JSON.parse(stored) : {
        totalVisits: SIMULATED_BASELINE.totalVisits,
        todayVisits: SIMULATED_BASELINE.todayVisits,
        uniqueVisitors: [],
        dailyVisits: {}
    };

    const today = getTodayDate();

    if (!hasCountedThisSession) {
        stats.totalVisits += 1;
        stats.todayVisits += 1;

        // Add to local unique set
        const visitorId = getVisitorId();
        const uniqueSet = new Set(stats.uniqueVisitors);
        uniqueSet.add(visitorId);
        stats.uniqueVisitors = Array.from(uniqueSet);

        if (!stats.dailyVisits) stats.dailyVisits = {};
        stats.dailyVisits[today] = (stats.dailyVisits[today] || SIMULATED_BASELINE.todayVisits) + 1;

        sessionStorage.setItem(SESSION_KEY, 'true');
    }

    // SIMULATION: Randomly add "Community" visits
    // This runs on every load/increment call to simulate time passing or other users
    const lastSimTime = parseInt(localStorage.getItem('last_sim_time') || '0');
    const now = Date.now();

    if (now - lastSimTime > 5000) { // Only simulate every 5 seconds max
        const randomVisits = Math.floor(Math.random() * 3); // 0-2 random new visits
        if (randomVisits > 0) {
            stats.totalVisits += randomVisits;
            stats.todayVisits += randomVisits;
            if (!stats.dailyVisits) stats.dailyVisits = {};
            stats.dailyVisits[today] = (stats.dailyVisits[today] || SIMULATED_BASELINE.todayVisits) + randomVisits;

            // Occasionally add a unique visitor
            if (Math.random() > 0.7) {
                // We just bump the number in our "View Model" later, 
                // but here we can't easily add a fake ID to the Set without bloating it.
                // We'll handle unique visitor Simulation in getGlobalStats return value.
            }
        }
        localStorage.setItem('last_sim_time', now.toString());
    }

    localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(stats));

    // Force broadcast with "View Model" (including baseline)
    const viewStats = getGlobalStats();
    window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: viewStats }));
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
