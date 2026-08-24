// Analytics Service - Tracks user activity and global statistics
// History data: localStorage (per-user key) + synced to private GitHub repo
// Global stats (visits): stored in GitHub koyjabo repo, updated via GitHub Actions
import { enqueueEvent } from './offlineEventsService';
import { phTrack } from './posthogService';

export interface CommunityFeatureRecord {
    feature: string;
    timestamp: number;
    date: string;
    userId?: string;
}

export interface UserHistory {
    busSearches: BusSearchRecord[];
    routeSearches: RouteSearchRecord[];
    intercitySearches: IntercitySearchRecord[];
    trainSearches: TrainSearchRecord[];
    metroSearches: MetroSearchRecord[];
    flightSearches: FlightSearchRecord[];
    launchSearches: LaunchSearchRecord[];
    truckSearches: TruckSearchRecord[];
    fareCalcSearches: FareCalcRecord[];
    mostUsedBuses: Record<string, number>; // busId -> count
    mostUsedRoutes: Record<string, number>; // "from-to" -> count
    mostUsedIntercity: Record<string, number>; // "from-to" -> count
    mostUsedTrains: Record<string, number>; // trainId -> count
    todayBuses: string[]; // busIds searched today
    todayRoutes: string[]; // routes searched today
    todayIntercity: string[]; // intercity routes searched today
    todayTrains: string[]; // trainIds viewed today
    lastResetDate: string; // ISO date string for daily reset
    communityFeatureUsage: Record<string, number>; // feature -> total open count
    communityFeatureHistory: CommunityFeatureRecord[]; // per-open log
    destinationViews?: DestinationViewRecord[]; // discover feature (Phase 4+)
    itineraryGenerated?: ItineraryGenerateRecord[]; // plan generator
}

export interface DestinationViewRecord {
    destId: string;
    destName: string;
    timestamp: number;
    date: string; // YYYY-MM-DD
}

export interface ItineraryGenerateRecord {
    dayCount: number;
    variantId: string;
    timestamp: number;
    date: string; // YYYY-MM-DD
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

export interface TrainSearchRecord {
    trainId: string;
    trainName: string;
    trainNumber: string;
    from: string; // station name
    to: string;   // station name
    timestamp: number;
    date: string; // YYYY-MM-DD
}

export interface MetroSearchRecord {
    from: string;
    to: string;
    fare: number;
    timestamp: number;
    date: string;
}

export interface FlightSearchRecord {
    from: string;
    to: string;
    timestamp: number;
    date: string;
}

export interface LaunchSearchRecord {
    from: string;
    to: string;
    nameSearch: string;
    timestamp: number;
    date: string;
}

export interface TruckSearchRecord {
    from: string;
    to: string;
    timestamp: number;
    date: string;
}

export interface FareCalcRecord {
    from: string;
    to: string;
    mode: string;
    fare: number;
    timestamp: number;
    date: string;
}

export interface GlobalStats {
    totalVisits: number;
    todayVisits: number;
    activeUsers: number; // Not tracked in real-time; kept for UI compat
    uniqueVisitors: number;
    locations?: Record<string, { count: number }>;
    lastUpdated?: number;
}

// ── Storage keys ──────────────────────────────────────────────────────────────
const ANON_HISTORY_KEY = 'dhaka_commute_user_history';
const GLOBAL_STATS_KEY = 'dhaka_commute_global_stats';
const VISITOR_ID_KEY   = 'dhaka_commute_visitor_id';

// No accounts — history always uses the anonymous per-device key.
const getHistoryKey = (): string => ANON_HISTORY_KEY;

/** Load externally-fetched history into the current user's localStorage slot.
 *  Merges remote arrays with local ones so locally-written entries (e.g. from
 *  the intercity sub-app) are never overwritten by a stale GitHub snapshot. */
export const loadHistoryData = (data: Partial<UserHistory>): void => {
    try {
        const current = getUserHistory();

        // Union merge: combine local + remote, dedup by timestamp, keep newest 100
        const mergeArr = <T extends { timestamp: number }>(
            local: T[],
            remote: T[] | undefined
        ): T[] => {
            if (!remote || remote.length === 0) return local;
            const seen = new Set(local.map(x => x.timestamp));
            const combined = [...local, ...remote.filter(x => !seen.has(x.timestamp))];
            combined.sort((a, b) => a.timestamp - b.timestamp);
            return combined.slice(-100);
        };

        // For count maps: take the max count per key so both sides contribute
        const mergeCounts = (
            local: Record<string, number>,
            remote: Record<string, number> | undefined
        ): Record<string, number> => {
            if (!remote) return local;
            const result = { ...local };
            for (const [key, count] of Object.entries(remote)) {
                result[key] = Math.max(result[key] || 0, count);
            }
            return result;
        };

        const merged: UserHistory = {
            ...current,
            busSearches:       mergeArr(current.busSearches,       data.busSearches as BusSearchRecord[]),
            routeSearches:     mergeArr(current.routeSearches,     data.routeSearches as RouteSearchRecord[]),
            intercitySearches: mergeArr(current.intercitySearches, data.intercitySearches as IntercitySearchRecord[]),
            trainSearches:     mergeArr(current.trainSearches,     data.trainSearches as TrainSearchRecord[]),
            mostUsedBuses:     mergeCounts(current.mostUsedBuses,     data.mostUsedBuses),
            mostUsedRoutes:    mergeCounts(current.mostUsedRoutes,    data.mostUsedRoutes),
            mostUsedIntercity: mergeCounts(current.mostUsedIntercity, data.mostUsedIntercity),
            mostUsedTrains:    mergeCounts(current.mostUsedTrains,    data.mostUsedTrains),
        };
        localStorage.setItem(getHistoryKey(), JSON.stringify(merged));
    } catch {
        // best-effort
    }
};

// ── Server proxy endpoints (token/repo never in browser) ─────────────────────
const PROXY = (import.meta.env.VITE_API_PROXY as string | undefined)
    || 'https://koyjabo-auth-proxy.fagun115946.workers.dev';
const STATS_PATH = 'data/stats/global.json';

// ── Date helper ───────────────────────────────────────────────────────────────
// Local date, not UTC — at 00:00–06:00 Dhaka time (UTC+6) the UTC date is still yesterday
const getTodayDate = (): string => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// ── Visitor ID ────────────────────────────────────────────────────────────────
const getVisitorId = (): string => {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
        id = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
};

// ── Local stats cache ─────────────────────────────────────────────────────────
export const getGlobalStats = (): GlobalStats => {
    try {
        const stored = localStorage.getItem(GLOBAL_STATS_KEY);
        if (!stored) {
            return { totalVisits: 0, todayVisits: 0, activeUsers: 0, uniqueVisitors: 0, lastUpdated: Date.now() };
        }
        const stats: GlobalStats = JSON.parse(stored);
        // If cached todayDate is stale, reset todayVisits
        const cached = stats as GlobalStats & { todayDate?: string };
        if (cached.todayDate && cached.todayDate !== getTodayDate()) {
            stats.todayVisits = 0;
        }
        return stats;
    } catch {
        return { totalVisits: 0, todayVisits: 0, activeUsers: 0, uniqueVisitors: 0, lastUpdated: Date.now() };
    }
};

const saveGlobalStats = (stats: GlobalStats): void => {
    try {
        localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(stats));
        window.dispatchEvent(new CustomEvent('globalStatsUpdated', { detail: stats }));
    } catch {
        // ignore
    }
};

// ── GitHub reads ──────────────────────────────────────────────────────────────

/** Fetch global stats via server-side proxy (token/repo names stay on server). */
export const fetchGlobalStats = async (): Promise<void> => {
    try {
        const res = await fetch(
            `${PROXY}/gh?r=d&p=${encodeURIComponent(STATS_PATH)}`,
            { credentials: 'omit', signal: AbortSignal.timeout(6000) }
        );
        if (!res.ok) return;
        const ghStats = await res.json() as GlobalStats & { todayDate?: string };
        // Reset todayVisits if the date has changed
        if (ghStats.todayDate && ghStats.todayDate !== getTodayDate()) {
            ghStats.todayVisits = 0;
        }
        const today = getTodayDate();
        // Only reset todayVisits if todayDate is explicitly set AND differs from today
        // If todayDate is missing, trust the stored todayVisits value
        const todayVisitsValue =
            ghStats.todayDate && ghStats.todayDate !== today
                ? 0
                : (ghStats.todayVisits || 0);
        const merged: GlobalStats = {
            totalVisits:    Math.max(ghStats.totalVisits || 0, getGlobalStats().totalVisits || 0),
            todayVisits:    todayVisitsValue,
            activeUsers:    0,
            uniqueVisitors: ghStats.uniqueVisitors || 0,
            lastUpdated:    Date.now()
        };
        saveGlobalStats(merged);
    } catch {
        // silently fail — cached data is used
    }
};

// ── Visit recording (fire-and-forget via GitHub Actions) ──────────────────────

/** Record this browser session as a visit. Called once per session. */
export const incrementVisitCount = async (userId?: string): Promise<void> => {
    const SESSION_KEY = 'dhaka_commute_session_init';
    if (sessionStorage.getItem(SESSION_KEY)) {
        return;
    }
    sessionStorage.setItem(SESSION_KEY, 'true');

    // Fetch current stats from GitHub first (non-blocking)
    fetchGlobalStats().catch(() => {});

    // Fire-and-forget via proxy (no token in browser)
    const visitorId = getVisitorId();
    fetch(`${PROXY}/gh`, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            requestId: crypto.randomUUID(),
            action: 'record-visit',
            data: JSON.stringify({ visitorId }),
        }),
    }).catch(() => {}); // Non-critical, ignore errors
};

// ── User history ──────────────────────────────────────────────────────────────

export const getUserHistory = (): UserHistory => {
    try {
        const stored = localStorage.getItem(getHistoryKey());
        if (!stored) {
            return {
                busSearches: [], routeSearches: [], intercitySearches: [], trainSearches: [],
                metroSearches: [], flightSearches: [], launchSearches: [], truckSearches: [], fareCalcSearches: [],
                mostUsedBuses: {}, mostUsedRoutes: {}, mostUsedIntercity: {}, mostUsedTrains: {},
                todayBuses: [], todayRoutes: [], todayIntercity: [], todayTrains: [],
                lastResetDate: getTodayDate(),
                communityFeatureUsage: {}, communityFeatureHistory: [],
            };
        }

        const history: UserHistory = JSON.parse(stored);

        // Reset today's data if it's a new day
        const today = getTodayDate();
        if (history.lastResetDate !== today) {
            history.todayBuses = [];
            history.todayRoutes = [];
            history.todayIntercity = [];
            history.todayTrains = [];
            history.lastResetDate = today;
            localStorage.setItem(getHistoryKey(), JSON.stringify(history));
        }

        // Safety: ensure all fields exist for older data
        if (!history.mostUsedBuses)     history.mostUsedBuses = {};
        if (!history.mostUsedRoutes)    history.mostUsedRoutes = {};
        if (!history.mostUsedIntercity) history.mostUsedIntercity = {};
        if (!history.mostUsedTrains)    history.mostUsedTrains = {};
        if (!history.busSearches)       history.busSearches = [];
        if (!history.routeSearches)     history.routeSearches = [];
        if (!history.intercitySearches) history.intercitySearches = [];
        if (!history.trainSearches)     history.trainSearches = [];
        if (!history.todayBuses)        history.todayBuses = [];
        if (!history.todayRoutes)       history.todayRoutes = [];
        if (!history.todayIntercity)    history.todayIntercity = [];
        if (!history.todayTrains)       history.todayTrains = [];
        if (!history.communityFeatureUsage)   history.communityFeatureUsage = {};
        if (!history.communityFeatureHistory) history.communityFeatureHistory = [];
        if (!history.metroSearches)    history.metroSearches = [];
        if (!history.flightSearches)   history.flightSearches = [];
        if (!history.launchSearches)   history.launchSearches = [];
        if (!history.truckSearches)    history.truckSearches = [];
        if (!history.fareCalcSearches) history.fareCalcSearches = [];

        return history;
    } catch {
        return {
            busSearches: [], routeSearches: [], intercitySearches: [], trainSearches: [],
            metroSearches: [], flightSearches: [], launchSearches: [], truckSearches: [], fareCalcSearches: [],
            mostUsedBuses: {}, mostUsedRoutes: {}, mostUsedIntercity: {}, mostUsedTrains: {},
            todayBuses: [], todayRoutes: [], todayIntercity: [], todayTrains: [],
            lastResetDate: getTodayDate(),
            communityFeatureUsage: {}, communityFeatureHistory: [],
        };
    }
};

const saveUserHistory = (history: UserHistory): void => {
    try {
        localStorage.setItem(getHistoryKey(), JSON.stringify(history));
    } catch {
        // ignore
    }
};

// Fire a GA4 custom event if GA4 is configured (window.gtag exists).
// Every tracked action also mirrors into PostHog (journeys + funnels).
const ga4 = (eventName: string, params: Record<string, string | number>) => {
    try { (window as any).gtag?.('event', eventName, params); } catch { /**/ }
    phTrack(eventName, params);
};

export const trackBusSearch = (busId: string, busName: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('bus_search', { bus_id: busId, bus_name: busName });
    history.busSearches.push({ busId, busName, timestamp: Date.now(), date: today });
    history.mostUsedBuses[busId] = (history.mostUsedBuses[busId] || 0) + 1;
    if (!history.todayBuses.includes(busId)) history.todayBuses.push(busId);
    if (history.busSearches.length > 100) history.busSearches = history.busSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('bus_search', { busId, busName });
};

export const trackRouteSearch = (from: string, to: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    const routeKey = `${from}${ROUTE_KEY_SEP}${to}`;
    ga4('route_search', { from_location: from, to_location: to });
    history.routeSearches.push({ from, to, timestamp: Date.now(), date: today });
    history.mostUsedRoutes[routeKey] = (history.mostUsedRoutes[routeKey] || 0) + 1;
    if (!history.todayRoutes.includes(routeKey)) history.todayRoutes.push(routeKey);
    if (history.routeSearches.length > 100) history.routeSearches = history.routeSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('route_search', { from, to });
};

export const trackIntercitySearch = (from: string, to: string, transportType: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    const routeKey = `${from}${ROUTE_KEY_SEP}${to}`;
    history.intercitySearches = history.intercitySearches || [];
    ga4('intercity_search', { from_location: from, to_location: to, transport_type: transportType });
    history.intercitySearches.push({ from, to, transportType, timestamp: Date.now(), date: today });
    history.mostUsedIntercity = history.mostUsedIntercity || {};
    history.mostUsedIntercity[routeKey] = (history.mostUsedIntercity[routeKey] || 0) + 1;
    history.todayIntercity = history.todayIntercity || [];
    if (!history.todayIntercity.includes(routeKey)) history.todayIntercity.push(routeKey);
    if (history.intercitySearches.length > 100) history.intercitySearches = history.intercitySearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('intercity_search', { from, to, transportType });
};

export const trackTrainSearch = (
    trainId: string, trainName: string, trainNumber: string,
    from: string, to: string
): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    history.trainSearches = history.trainSearches || [];
    history.mostUsedTrains = history.mostUsedTrains || {};
    history.todayTrains = history.todayTrains || [];
    ga4('train_search', { train_id: trainId, train_name: trainName, from_location: from, to_location: to });
    history.trainSearches.push({ trainId, trainName, trainNumber, from, to, timestamp: Date.now(), date: today });
    history.mostUsedTrains[trainId] = (history.mostUsedTrains[trainId] || 0) + 1;
    if (!history.todayTrains.includes(trainId)) history.todayTrains.push(trainId);
    if (history.trainSearches.length > 100) history.trainSearches = history.trainSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('train_search', { trainId, trainName, trainNumber, from, to });
};

export const trackFeatureUsage = (feature: string): void => {
    const history = getUserHistory();
    history.communityFeatureUsage = history.communityFeatureUsage || {};
    history.communityFeatureHistory = history.communityFeatureHistory || [];
    ga4('feature_open', { feature_name: feature });
    history.communityFeatureUsage[feature] = (history.communityFeatureUsage[feature] || 0) + 1;
    history.communityFeatureHistory.push({
        feature,
        timestamp: Date.now(),
        date: getTodayDate(),
    });
    if (history.communityFeatureHistory.length > 200) {
        history.communityFeatureHistory = history.communityFeatureHistory.slice(-200);
    }
    saveUserHistory(history);
    enqueueEvent('feature_open', { feature });
};

export const trackDestinationView = (destId: string, destName: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('destination_view', { destination_id: destId, destination_name: destName });
    history.destinationViews = history.destinationViews || [];
    history.destinationViews.push({ destId, destName, timestamp: Date.now(), date: today });
    if (history.destinationViews.length > 200) history.destinationViews = history.destinationViews.slice(-200);
    saveUserHistory(history);
    enqueueEvent('destination_view', { destId, destName });
};

export const trackItineraryGenerate = (dayCount: number, variantId: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('itinerary_generate', { days: dayCount, variant: variantId });
    history.itineraryGenerated = history.itineraryGenerated || [];
    history.itineraryGenerated.push({ dayCount, variantId, timestamp: Date.now(), date: today });
    if (history.itineraryGenerated.length > 100) history.itineraryGenerated = history.itineraryGenerated.slice(-100);
    saveUserHistory(history);
    enqueueEvent('itinerary_generate', { days: dayCount, variant: variantId });
};

export const trackMetroSearch = (from: string, to: string, fare: number): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('metro_search', { from_station: from, to_station: to });
    history.metroSearches = history.metroSearches || [];
    history.metroSearches.push({ from, to, fare, timestamp: Date.now(), date: today });
    if (history.metroSearches.length > 100) history.metroSearches = history.metroSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('metro_search', { from, to, fare });
};

export const trackFlightSearch = (from: string, to: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('flight_search', { from_airport: from, to_airport: to });
    history.flightSearches = history.flightSearches || [];
    history.flightSearches.push({ from, to, timestamp: Date.now(), date: today });
    if (history.flightSearches.length > 100) history.flightSearches = history.flightSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('flight_search', { from, to });
};

export const trackLaunchSearch = (from: string, to: string, nameSearch: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('launch_search', { from_terminal: from, to_terminal: to });
    history.launchSearches = history.launchSearches || [];
    history.launchSearches.push({ from, to, nameSearch, timestamp: Date.now(), date: today });
    if (history.launchSearches.length > 100) history.launchSearches = history.launchSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('launch_search', { from, to, nameSearch });
};

export const trackTruckSearch = (from: string, to: string): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('truck_search', { from_location: from, to_location: to });
    history.truckSearches = history.truckSearches || [];
    history.truckSearches.push({ from, to, timestamp: Date.now(), date: today });
    if (history.truckSearches.length > 100) history.truckSearches = history.truckSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('truck_search', { from, to });
};

export const trackFareCalc = (from: string, to: string, mode: string, fare: number): void => {
    const history = getUserHistory();
    const today = getTodayDate();
    ga4('fare_calc', { from_station: from, to_station: to, mode, fare });
    history.fareCalcSearches = history.fareCalcSearches || [];
    history.fareCalcSearches.push({ from, to, mode, fare, timestamp: Date.now(), date: today });
    if (history.fareCalcSearches.length > 100) history.fareCalcSearches = history.fareCalcSearches.slice(-100);
    saveUserHistory(history);
    enqueueEvent('fare_calc', { from, to, mode, fare });
};

export const getMostUsedBuses = (limit: number = 5): Array<{ busId: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedBuses || {})
        .map(([busId, count]) => ({ busId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

export const getMostUsedRoutes = (limit: number = 5): Array<{ from: string; to: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedRoutes || {})
        .map(([routeKey, count]) => {
            const { from, to } = splitRouteKey(routeKey);
            return { from, to, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

export const getTodayBusSearches = (): string[] => getUserHistory().todayBuses;

// Route keys: "␟" separates from/to so stop names with hyphens (e.g. "Mirpur-10")
// don't break parsing. Legacy '-' keys are still read for old stored history.
export const ROUTE_KEY_SEP = '␟';
export const splitRouteKey = (routeKey: string): { from: string; to: string } => {
    if (routeKey.includes(ROUTE_KEY_SEP)) {
        const i = routeKey.indexOf(ROUTE_KEY_SEP);
        return { from: routeKey.slice(0, i), to: routeKey.slice(i + ROUTE_KEY_SEP.length) };
    }
    const i = routeKey.indexOf('-');
    return i < 0 ? { from: routeKey, to: '' } : { from: routeKey.slice(0, i), to: routeKey.slice(i + 1) };
};

export const getTodayRouteSearches = (): Array<{ from: string; to: string }> =>
    getUserHistory().todayRoutes.map(splitRouteKey);

export const clearUserHistory = (): void => {
    const empty: UserHistory = {
        busSearches: [], routeSearches: [], intercitySearches: [], trainSearches: [],
        metroSearches: [], flightSearches: [], launchSearches: [], truckSearches: [], fareCalcSearches: [],
        mostUsedBuses: {}, mostUsedRoutes: {}, mostUsedIntercity: {}, mostUsedTrains: {},
        todayBuses: [], todayRoutes: [], todayIntercity: [], todayTrains: [],
        lastResetDate: getTodayDate(),
        communityFeatureUsage: {}, communityFeatureHistory: [],
    };
    saveUserHistory(empty);
};

export const getRecentBusSearches = (limit: number = 10): BusSearchRecord[] =>
    getUserHistory().busSearches.slice(-limit).reverse();

export const getRecentRouteSearches = (limit: number = 10): RouteSearchRecord[] =>
    getUserHistory().routeSearches.slice(-limit).reverse();

export const getRecentIntercitySearches = (limit: number = 10): IntercitySearchRecord[] => {
    const history = getUserHistory();
    return (history.intercitySearches || []).slice(-limit).reverse();
};

export const getRecentTrainSearches = (limit: number = 10): TrainSearchRecord[] => {
    const history = getUserHistory();
    return (history.trainSearches || []).slice(-limit).reverse();
};

export const getMostUsedTrains = (limit: number = 5): Array<{ trainId: string; trainName: string; count: number }> => {
    const history = getUserHistory();
    return Object.entries(history.mostUsedTrains || {})
        .map(([trainId, count]) => {
            const record = (history.trainSearches || []).find(r => r.trainId === trainId);
            return { trainId, trainName: record?.trainName || trainId, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

// ── Cross-tab / cross-component stat sync ─────────────────────────────────────

export const subscribeToGlobalStats = (callback: (stats: GlobalStats) => void): () => void => {
    const handler = (event: Event) => {
        const customEvent = event as CustomEvent<GlobalStats>;
        callback(customEvent.detail);
    };
    window.addEventListener('globalStatsUpdated', handler);
    return () => window.removeEventListener('globalStatsUpdated', handler);
};

export const initStorageListener = (callback: () => void): () => void => {
    const handler = (e: StorageEvent) => {
        if (e.key === GLOBAL_STATS_KEY) callback();
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
};
