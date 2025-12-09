import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, TrendingUp, Calendar, Users, Eye, Trash2, Bus, MapPin, ArrowRight } from 'lucide-react';
import {
    getUserHistory,
    getGlobalStats,
    getMostUsedBuses,
    getMostUsedRoutes,
    getTodayBusSearches,
    getTodayRouteSearches,
    getRecentBusSearches,
    getRecentRouteSearches,
    getRecentIntercitySearches,
    clearUserHistory,
    subscribeToGlobalStats,
    initStorageListener,
    fetchGlobalStats,
    GlobalStats
} from '../services/analyticsService';
import { BUS_DATA, STATIONS } from '../constants';
import { BusRoute } from '../types';

interface HistoryViewProps {
    onBack: () => void;
    onBusSelect: (bus: BusRoute, fromHistory?: boolean) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onBack, onBusSelect }) => {
    const [activeTab, setActiveTab] = useState<'personal' | 'global'>('personal');
    const [globalStats, setGlobalStats] = useState<GlobalStats>(getGlobalStats());
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [history, setHistory] = useState(getUserHistory());
    const [mostUsedBuses, setMostUsedBuses] = useState(getMostUsedBuses(5));
    const [mostUsedRoutes, setMostUsedRoutes] = useState(getMostUsedRoutes(5));
    const [todayBuses, setTodayBuses] = useState(getTodayBusSearches());
    const [todayRoutes, setTodayRoutes] = useState(getTodayRouteSearches());
    const [recentBusSearches, setRecentBusSearches] = useState(getRecentBusSearches(10));
    const [recentRouteSearches, setRecentRouteSearches] = useState(getRecentRouteSearches(10));
    const [recentIntercitySearches, setRecentIntercitySearches] = useState(getRecentIntercitySearches(10));

    // Subscribe to real-time updates
    useEffect(() => {
        // Initial fetch from API
        fetchGlobalStats();

        // Subscribe to custom events from same tab
        const unsubscribe = subscribeToGlobalStats((stats) => {
            setGlobalStats(stats);
        });

        // Listen for storage changes from other tabs
        const unsubscribeStorage = initStorageListener(() => {
            setGlobalStats(getGlobalStats());
            refreshHistoryData();
        });

        // Refresh stats every 5 seconds (polling for real-time updates)
        const interval = setInterval(() => {
            fetchGlobalStats(); // Poll API
            refreshHistoryData();
        }, 5000);

        return () => {
            unsubscribe();
            unsubscribeStorage();
            clearInterval(interval);
        };
    }, []);

    const refreshHistoryData = () => {
        setHistory(getUserHistory());
        setMostUsedBuses(getMostUsedBuses(5));
        setMostUsedRoutes(getMostUsedRoutes(5));
        setTodayBuses(getTodayBusSearches());
        setTodayRoutes(getTodayRouteSearches());
        setRecentBusSearches(getRecentBusSearches(10));
        setRecentRouteSearches(getRecentRouteSearches(10));
        setRecentIntercitySearches(getRecentIntercitySearches(10));
        setRefreshKey(prev => prev + 1);
    };

    const handleClearHistory = () => {
        setShowClearConfirm(true);
    };

    const confirmClearHistory = () => {
        clearUserHistory();
        refreshHistoryData();
        setShowClearConfirm(false);
    };

    const getBusById = (busId: string): BusRoute | undefined => {
        return BUS_DATA.find(bus => bus.id === busId);
    };

    const getStationName = (stationId: string): string => {
        return STATIONS[stationId]?.name || stationId;
    };

    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-y-auto w-full relative">
            {/* Confirmation Modal */}
            {showClearConfirm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Clear History?</h3>
                        <p className="text-gray-500 text-center text-sm mb-6">
                            Are you sure you want to clear all your search history? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmClearHistory}
                                className="flex-1 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                Yes, Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header - Fixed on mobile with proper padding */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10 pt-16 md:pt-0">
                <div className="p-4 md:p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-dhaka-green" />
                        History & Analytics
                    </h1>

                    {/* Tabs */}
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('personal')}
                            className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'personal'
                                ? 'bg-white text-dhaka-green shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Clock className="w-4 h-4" />
                                My History
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('global')}
                            className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'global'
                                ? 'bg-white text-dhaka-green shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Users className="w-4 h-4" />
                                Global Stats
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-6 pb-24 md:pb-6">
                {activeTab === 'personal' ? (
                    <>
                        {/* Clear History Button */}
                        {(recentBusSearches.length > 0 || recentRouteSearches.length > 0 || recentIntercitySearches.length > 0) && (
                            <div className="flex justify-end">
                                <button
                                    onClick={handleClearHistory}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All History
                                </button>
                            </div>
                        )}

                        {/* Today's Activity */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                Today's Activity
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl">
                                    <div className="text-3xl font-bold text-blue-600">{todayBuses.length}</div>
                                    <div className="text-sm text-gray-600 mt-1">Buses Searched</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl">
                                    <div className="text-3xl font-bold text-indigo-600">{todayRoutes.length}</div>
                                    <div className="text-sm text-gray-600 mt-1">Routes Searched</div>
                                </div>
                            </div>
                        </div>

                        {/* Most Used Buses */}
                        {mostUsedBuses.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-dhaka-green" />
                                    Most Used Buses
                                </h2>
                                <div className="space-y-3">
                                    {(mostUsedBuses || []).map((item, idx) => {
                                        if (!item) return null;
                                        const { busId, count } = item;
                                        const bus = getBusById(busId);
                                        if (!bus) return null;
                                        return (
                                            <div
                                                key={`bus-${idx}-${busId}`}
                                                onClick={() => onBusSelect(bus, true)}
                                                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-dhaka-green rounded-lg flex items-center justify-center">
                                                        <Bus className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 group-hover:text-dhaka-green transition-colors">
                                                            {bus.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-bengali">{bus.bnName}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-dhaka-green/10 text-dhaka-green rounded-full text-sm font-bold">
                                                        {count}x
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-dhaka-green transition-colors" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Most Used Routes */}
                        {mostUsedRoutes.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-dhaka-red" />
                                    Most Used Routes
                                </h2>
                                <div className="space-y-3">
                                    {(mostUsedRoutes || []).map((item, index) => {
                                        if (!item) return null;
                                        const { from, to, count } = item;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                            >
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-10 h-10 bg-dhaka-red rounded-lg flex items-center justify-center">
                                                        <MapPin className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <span className="font-bold text-gray-900 truncate">{getStationName(from)}</span>
                                                            <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                            <span className="font-bold text-gray-900 truncate">{getStationName(to)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-dhaka-red/10 text-dhaka-red rounded-full text-sm font-bold ml-2">
                                                    {count}x
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Recent Bus Searches */}
                        {recentBusSearches.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                    Recent Bus Searches
                                </h2>
                                <div className="space-y-2">
                                    {recentBusSearches.map((record, index) => {
                                        const bus = getBusById(record.busId);
                                        if (!bus) return null;
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => onBusSelect(bus, true)}
                                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Bus className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <div className="font-bold text-sm text-gray-900 group-hover:text-dhaka-green transition-colors">
                                                            {record.busName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">{formatDate(record.timestamp)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Recent Route Searches */}
                        {recentRouteSearches.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                    Recent Route Searches
                                </h2>
                                <div className="space-y-2">
                                    {recentRouteSearches.map((record, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <div className="flex items-center gap-2 text-sm min-w-0">
                                                    <span className="font-bold text-gray-900 truncate">{getStationName(record.from)}</span>
                                                    <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                    <span className="font-bold text-gray-900 truncate">{getStationName(record.to)}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500 ml-2">{formatDate(record.timestamp)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Intercity Searches */}
                        {(recentIntercitySearches || []).length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-purple-600" />
                                    Recent Intercity Trips
                                </h2>
                                <div className="space-y-2">
                                    {recentIntercitySearches.map((record, index) => {
                                        // Safely handle potentially incomplete records
                                        if (!record || !record.from || !record.to) return null;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        {record.transportType === 'AIR' ? <TrendingUp className="w-4 h-4 text-purple-600" /> : <Bus className="w-4 h-4 text-purple-600" />}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm min-w-0">
                                                        <span className="font-bold text-gray-900 truncate">{record.from}</span>
                                                        <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                        <span className="font-bold text-gray-900 truncate">{record.to}</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500 ml-2">{formatDate(record.timestamp || Date.now())}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {recentBusSearches.length === 0 && recentRouteSearches.length === 0 && recentIntercitySearches.length === 0 && (
                            <div className="text-center py-12">
                                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No History Yet</h3>
                                <p className="text-gray-500">
                                    Start searching for buses and routes to see your history here
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* Global Statistics */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-600" />
                                Community Statistics
                                <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Live
                                </span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Eye className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-green-600">
                                                {globalStats.totalVisits.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">Total Visits</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        Since {new Date(globalStats.firstVisitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-blue-600">
                                                {globalStats.todayVisits.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">Today's Visits</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        Updated in real-time
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl md:col-span-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Users className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-purple-600">
                                                {globalStats.uniqueVisitors.size.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">Unique Visitors</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Daily Activity Log */}
                                <div className="bg-white p-6 rounded-xl md:col-span-2">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-gray-600" />
                                        Daily Activity Log
                                    </h3>
                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {globalStats.dailyVisits && Object.keys(globalStats.dailyVisits).length > 0 ? (
                                            Object.entries(globalStats.dailyVisits)
                                                .sort((a, b) => b[0].localeCompare(a[0]))
                                                .map(([date, count], idx) => (
                                                    <div key={date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                                                                {idx === 0 ? 'Today' : new Date(date).getDate()}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900 text-sm">
                                                                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                </div>
                                                                {idx === 0 && <div className="text-xs text-blue-600 font-medium">Current Session</div>}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-gray-900">{count.toLocaleString()}</span>
                                                            <span className="text-xs text-gray-500">visits</span>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 text-sm">No historical data available</div>
                                        )}
                                    </div>
                                </div>
                                {/* Live Verified Counter */}
                                <div className="bg-white p-6 rounded-xl md:col-span-2 border border-gray-100 flex flex-col items-center justify-center gap-3 mt-4">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Live Verified Counter
                                    </div>
                                    <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-200">
                                        <iframe
                                            src="/visitor-counter.html"
                                            width="150"
                                            height="40"
                                            className="overflow-hidden border-0"
                                            title="Visitor Counter"
                                            scrolling="no"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 text-center max-w-xs">
                                        Verified by FreeVisitorCounters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Real-time Updates</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        These statistics are updated in real-time and shared across all users.
                                        The data persists across sessions and updates automatically when other users visit the app.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Community Impact */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Community Impact</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bus className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Helping Commuters</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Together, we've helped thousands of people find their way around Dhaka
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Growing Community</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Every search helps us improve the app for everyone
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HistoryView;
