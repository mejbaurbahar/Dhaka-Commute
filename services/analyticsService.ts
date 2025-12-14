// Analytics Service - Tracks user activity and global statistics
// All data is stored in localStorage and persists across sessions
// "Real" Global stats are fetched from the KoyJabo backend

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
    activeUsers: number;
    uniqueVisitors: number; // Count of unique visitors
    locations?: Record<string, { count: number }>;
    lastUpdated?: number;
}

const HISTORY_KEY = 'dhaka_commute_user_history';
const GLOBAL_STATS_KEY = 'dhaka_commute_global_stats';
const VISITOR_ID_KEY = 'dhaka_commute_visitor_id';

// API Configuration for Real Global Stats
const API_BASE_URL = 'https://koyjabo-backend.onrender.com';
const WS_URL = 'wss://koyjabo-backend.onrender.com';

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

let wsConnection: WebSocket | null = null;
let wsReconnectTimer: NodeJS.Timeout | null = null;
let isConnecting = false;

// Initialize Real-time connection
const initRealTimeConnection = () => {
    if (wsConnection || isConnecting) return;

    isConnecting = true;

    try {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log('Connected to KoyJabo Analytics Stream');
            isConnecting = false;
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'visitor_update' && data.stats) {
                    updateGlobalStatsFromApi(data.stats);
                }
            } catch (e) {
                console.error('Error parsing WS message:', e);
            }
        };

        ws.onclose = () => {
            console.log('WS Connection closed');
            wsConnection = null;
            isConnecting = false;
            // Reconnect after delay
            if (!wsReconnectTimer) {
                wsReconnectTimer = setTimeout(() => {
                    wsReconnectTimer = null;
                    initRealTimeConnection();
                }, 5000);
            }
        };

        ws.onerror = (err) => {
            console.error('WS Error:', err);
            // Close will trigger reconnect
        };

        wsConnection = ws;
    } catch (e) {
        console.error('Failed to init WS:', e);
        isConnecting = false;
    }
};

const updateGlobalStatsFromApi = (apiStats: any) => {
    try {
        // Get current API stats - use these values DIRECTLY (no baseline/cumulative logic)
        const apiTotal = apiStats.totalVisitors ?? apiStats.totalVisits ?? 0;
        const apiToday = apiStats.todayVisits ?? apiStats.todayVisitors ?? 0;
        const apiActive = apiStats.activeUsers ?? 1;
        const apiUnique = apiStats.uniqueVisitors ?? apiStats.totalVisitors ?? 0;

        // Use backend stats DIRECTLY - no accumulation, no baseline
        // This ensures frontend always matches backend exactly
        const newStats: GlobalStats = {
            totalVisits: apiTotal,           // Direct from backend
            todayVisits: apiToday,           // Direct from backend
            activeUsers: apiActive,          // Direct from backend
            uniqueVisitors: apiUnique,       // Direct from backend
            locations: apiStats.locations || {},
            lastUpdated: Date.now()
        };

        saveGlobalStats(newStats);

        console.log(`📊 Stats synced with backend - Total: ${newStats.totalVisits}, Today: ${newStats.todayVisits}, Active: ${newStats.activeUsers}`);
    } catch (e) {
        console.error('Error updating stats from API:', e);
    }
}

// Fetch global stats from external API
export const fetchGlobalStats = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        if (response.ok) {
            const data = await response.json();
            // Data format might be { ...stats } or { result: ... } depending on API impl
            // Assuming direct object based on "Success Response Schema" style usually
            updateGlobalStatsFromApi(data);
        }
    } catch (e) {
        console.warn('Failed to fetch global stats:', e);
    }
};

// Get global statistics (Sync - returns cached data)
export const getGlobalStats = (): GlobalStats => {
    try {
        // Clean up old baseline keys (no longer used)
        localStorage.removeItem('dhaka_commute_stats_baseline');
        localStorage.removeItem('dhaka_commute_last_api_total');

        const stored = localStorage.getItem(GLOBAL_STATS_KEY);

        let stats: GlobalStats;

        if (!stored) {
            stats = {
                totalVisits: 0,
                todayVisits: 0,
                activeUsers: 1,
                uniqueVisitors: 0,
                lastUpdated: Date.now()
            };
        } else {
            stats = JSON.parse(stored);
        }

        return stats;
    } catch (e) {
        return {
            totalVisits: 0,
            todayVisits: 0,
            activeUsers: 1,
            uniqueVisitors: 0,
            lastUpdated: Date.now()
        };
    }
};

// Save global statistics
const saveGlobalStats = (stats: GlobalStats): void => {
    try {
        localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(stats));

        // Broadcast the update
        window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: stats }));
    } catch (e) {
        console.error('Error saving global stats:', e);
    }
};

// Increment visit count (Triggers WS connection)
export const incrementVisitCount = async (): Promise<void> => {
    // We don't manually increment anymore, we just ensure we are connected/fetched 
    // The backend handles the actual "counting" based on connections/requests

    const SESSION_KEY = 'dhaka_commute_session_init';
    const hasInitialized = sessionStorage.getItem(SESSION_KEY);

    if (!hasInitialized) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        // Initial fetch
        fetchGlobalStats();
    }

    // Ensure WS is running
    initRealTimeConnection();
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
    // IMPORTANT: This intentionally does NOT remove global stats
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
