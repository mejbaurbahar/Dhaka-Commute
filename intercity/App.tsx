
import React, { useState, useEffect, useRef } from 'react';
import { getTravelRoutes } from './services/geminiService';
import { RoutingResponse } from './types';
import { RouteCard } from './components/RouteCard';
import { RouteDetail } from './components/RouteDetail';
import { LocationInput, POPULAR_LOCATIONS } from './components/LocationInput';
import { Search, Loader2, Map as MapIcon, Info, Plane, Bus, Train, User, MapPin, Flag, Compass, ArrowRightLeft, WifiOff, Sparkles, Menu, X, Bot, FileText, Settings, Clock, Download, Shield } from 'lucide-react';

// Import analytics tracking from main app
const trackIntercitySearch = (from: string, to: string, transportType: string) => {
  try {
    const history = JSON.parse(localStorage.getItem('dhaka_commute_user_history') || '{}');
    const today = new Date().toISOString().split('T')[0];
    const routeKey = `${from}-${to}`;

    history.intercitySearches = history.intercitySearches || [];
    history.intercitySearches.push({
      from,
      to,
      transportType,
      timestamp: Date.now(),
      date: today
    });

    history.mostUsedIntercity = history.mostUsedIntercity || {};
    history.mostUsedIntercity[routeKey] = (history.mostUsedIntercity[routeKey] || 0) + 1;

    history.todayIntercity = history.todayIntercity || [];
    if (!history.todayIntercity.includes(routeKey)) {
      history.todayIntercity.push(routeKey);
    }

    if (history.intercitySearches.length > 100) {
      history.intercitySearches = history.intercitySearches.slice(-100);
    }

    localStorage.setItem('dhaka_commute_user_history', JSON.stringify(history));
  } catch (e) {
    console.error('Failed to track intercity search:', e);
  }
};

const SEARCH_MESSAGES = [
  { title: "Connecting to Transport Grids...", sub: "Fetching real-time data from bus and train networks" },
  { title: "Scanning Bus Schedules...", sub: "Checking Green Line, Hanif, Ena, and Shohoz availability" },
  { title: "Querying Train Database...", sub: "Looking up Bangladesh Railway seats and off-days" },
  { title: "Checking Domestic Flights...", sub: "Scanning US-Bangla, Novoair, and Biman schedules" },
  { title: "Optimizing Local Transit...", sub: "Finding the best Dhaka Metro & Local Bus connections" },
  { title: "Finalizing Your Itinerary...", sub: "Calculating total costs and travel duration" }
];

// --- Animated Loading/Landing Component ---
const LoadingAnimation = ({ isLanding = false }: { isLanding?: boolean }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (isLanding) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % SEARCH_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLanding]);

  return (
    <div className="flex flex-col items-center justify-center py-6 animate-fade-in w-full">
      <style>{`
      @keyframes fly-across {
        0% { transform: translate(-100%, 20px) rotate(5deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(500%, -30px) rotate(5deg); opacity: 0; }
      }
      @keyframes drive-right {
        0% { transform: translateX(-150%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateX(500%); opacity: 0; }
      }
      @keyframes drive-left {
        0% { transform: translateX(500%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateX(-150%); opacity: 0; }
      }
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.5; }
        100% { transform: scale(1.5); opacity: 0; }
      }
      /* Orbit Animations */
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `}</style>

      <div className={`relative w-full max-w-4xl ${isLanding ? 'h-64 md:h-80' : 'h-64 md:h-72'} bg-gradient-to-b from-blue-50/50 to-white/50 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/60 shadow-glass mb-8 transition-all duration-700`}>

        {/* Sky Elements */}
        <div className="absolute top-8 right-16 w-32 h-16 bg-white/40 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-20 w-24 h-12 bg-blue-100/30 rounded-full blur-2xl"></div>

        {isLanding ? (
          // --- LANDING MODE: SCENIC VIEW ---
          <>
            {/* Road/Ground */}
            <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-gray-50/80 to-transparent border-t border-white/20 backdrop-blur-sm">
              <div className="w-full h-full border-t-2 border-dashed border-gray-300/30 mt-8"></div>
            </div>

            {/* Plane Animation (Slower: 12s) */}
            <div className="absolute top-8 left-0 w-full" style={{ animation: 'fly-across 14s linear infinite' }}>
              <div className="relative">
                <Plane className="text-blue-500 w-14 h-14 drop-shadow-lg" fill="currentColor" fillOpacity={0.1} />
                <div className="absolute top-1/2 -right-4 w-12 h-0.5 bg-white/50 blur-[1px]"></div>
              </div>
            </div>

            {/* Bus Animation (Slower: 15s) */}
            <div className="absolute bottom-10 left-0 w-full" style={{ animation: 'drive-right 16s linear infinite', animationDelay: '0.5s' }}>
              <Bus className="text-emerald-500 w-16 h-16 drop-shadow-lg" fill="currentColor" fillOpacity={0.1} />
            </div>

            {/* Train Animation (Slower: 20s) */}
            <div className="absolute bottom-10 left-0 w-full" style={{ animation: 'drive-left 22s linear infinite', animationDelay: '2s' }}>
              <Train className="text-orange-500 w-20 h-20 drop-shadow-lg" fill="currentColor" fillOpacity={0.1} />
            </div>

            {/* Start Point */}
            <div className="absolute bottom-20 left-12 md:left-20 z-0 flex flex-col items-center opacity-40">
              <MapPin className="text-gray-400 w-8 h-8 mb-1" />
              <div className="w-16 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* End Point */}
            <div className="absolute bottom-20 right-12 md:right-20 z-0 flex flex-col items-center opacity-40">
              <Flag className="text-dhaka-red w-8 h-8 mb-1" />
              <div className="w-16 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Floating Central Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="absolute top-0 w-full h-full bg-blue-400/20 rounded-full z-0 blur-xl scale-150" style={{ animation: 'pulse-ring 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite' }}></div>
              <div className="relative z-10 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-soft border border-white">
                <Compass className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </>
        ) : (
          // --- SEARCHING MODE: ORBIT VIEW ---
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Orbits */}
            <div className="absolute w-48 h-48 md:w-72 md:h-72 border border-blue-100/50 rounded-full animate-[spin_12s_linear_infinite]"></div>
            <div className="absolute w-32 h-32 md:w-48 md:h-48 border border-emerald-100/50 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>

            {/* Orbiting Vehicles Container */}
            <div className="absolute w-48 h-48 md:w-64 md:h-64 animate-[spin_6s_linear_infinite]">
              {/* Plane Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin-reverse_6s_linear_infinite]">
                <div className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white">
                  <Plane className="text-blue-600 w-6 h-6" />
                </div>
              </div>
              {/* Bus Right */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 animate-[spin-reverse_6s_linear_infinite]">
                <div className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white">
                  <Bus className="text-emerald-600 w-6 h-6" />
                </div>
              </div>
              {/* Train Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin-reverse_6s_linear_infinite]">
                <div className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white">
                  <Train className="text-orange-600 w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Central User */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-10"></div>
              <div className="relative bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl border-4 border-white/50">
                <User className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center space-y-3">
        {isLanding ? (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight mb-2">Ready to explore Bangladesh?</h3>
            <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">Find the perfect route using local buses, trains, flights, and metro rail.</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-3">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">AI Processing</span>
            </div>

            <div className="min-h-[60px] transition-all duration-500">
              <h3 key={msgIndex} className="text-xl md:text-2xl font-bold text-gray-800 animate-fade-in-up">
                {SEARCH_MESSAGES[msgIndex].title}
              </h3>
              <p key={`sub-${msgIndex}`} className="text-sm text-gray-500 mt-1 font-medium animate-fade-in">
                {SEARCH_MESSAGES[msgIndex].sub}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RoutingResponse | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const detailsRef = useRef<HTMLDivElement>(null);

  // --- Offline Support & Data Persistence ---
  useEffect(() => {
    // 1. Check for saved routes on mount
    const savedData = localStorage.getItem('lastRoute');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.data) {
          setData(parsed.data);
          setOrigin(parsed.origin || '');
          setDestination(parsed.destination || '');
          if (parsed.data.options?.length > 0) {
            setSelectedOptionId(parsed.data.options[0].id);
          }
        }
      } catch (e) {
        console.error("Failed to load saved route", e);
      }
    }

    // 2. Network Listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;

    // Check if API key is set
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    // NOTE: We allow search attempt even if offline, because the service layer 
    // checks the persistent cache.

    setLoading(true);
    setError(null);
    setData(null);
    setSelectedOptionId(null);

    try {
      const result = await getTravelRoutes(origin, destination);
      if (result && result.options.length > 0) {
        setData(result);
        setSelectedOptionId(result.options[0].id); // Select first option by default

        // Save LAST route to Local Storage for quick resume on reload
        localStorage.setItem('lastRoute', JSON.stringify({
          data: result,
          origin,
          destination,
          timestamp: new Date().toISOString()
        }));

        // Track intercity search in history
        // Determine transport type from the first option
        const transportType = result.options[0]?.steps?.[0]?.mode || 'combined';
        trackIntercitySearch(origin, destination, transportType);

      } else {
        setError("No routes found. Please try different locations.");
      }
    } catch (err: any) {
      // If we are offline and cache missed, the service throws specific error
      if (isOffline) {
        setError("You are offline and no cached route exists for this journey. Please connect to the internet.");
      } else {
        setError("An error occurred while planning your trip. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (id: string) => {
    setSelectedOptionId(id);
    // On Mobile: Scroll to details with slight delay to allow rendering
    if (window.innerWidth < 1024 && detailsRef.current) {
      setTimeout(() => {
        // block: 'start' ensures the header is visible. 
        // We use scroll-mt (margin-top) on the element to account for the sticky header.
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Check if current inputs match allowed locations
  const isValidSearch =
    origin && destination &&
    POPULAR_LOCATIONS.includes(origin) &&
    POPULAR_LOCATIONS.includes(destination);

  const selectedOption = data?.options.find(o => o.id === selectedOptionId);

  return (
    <div className="min-h-screen text-dhaka-dark pb-12">
      {/* Fixed Header */}
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-5 py-3 shadow-sm z-[3000] pt-safe-top md:hidden">
        <div className="flex justify-between items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.top!.location.href = window.location.origin + '/';
            }}
            className="flex items-center gap-2.5 outline-none cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 bg-dhaka-red rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-red-200">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">কই <span className="text-dhaka-red">যাবো</span></h1>
          </a>
          <button onClick={() => setIsMenuOpen(true)} className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-8 py-4 shadow-sm z-[3000] items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.top!.location.href = window.location.origin + '/';
          }}
          className="flex items-center gap-3 cursor-pointer outline-none hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-dhaka-red rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-100">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">কই <span className="text-dhaka-red">যাবো</span></h1>
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[4000]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-dhaka-dark">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close menu">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-2 flex-1">
              {[
                { icon: Bot, label: 'AI Assistant', color: 'text-dhaka-green', hash: '#ai-assistant' },
                { icon: Info, label: 'About', color: 'text-purple-500', hash: '#about' },
                { icon: Sparkles, label: 'Why Use কই যাবো', color: 'text-pink-500', hash: '#why-use' },
                { icon: FileText, label: 'Q&A', color: 'text-cyan-500', hash: '#faq' },
                { icon: Settings, label: 'App Settings', color: 'text-blue-500', hash: '#settings' },
                { icon: Clock, label: 'History', color: 'text-amber-500', hash: '#history' },
                { icon: Download, label: 'Install App', color: 'text-emerald-600', hash: '#install' },
                { icon: Shield, label: 'Privacy Policy', color: 'text-purple-500', hash: '#privacy' },
                { icon: FileText, label: 'Terms of Service', color: 'text-orange-500', hash: '#terms' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={`${window.location.origin}/${item.hash}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.top!.location.href = `${window.location.origin}/${item.hash}`;
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} /> {item.label}
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400">
                কই যাবো v1.0.0
              </p>
            </div>
          </div>
        </div>
      )}

      {/* API Key Required Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowApiKeyModal(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">API Key Required</h2>
              <p className="text-gray-600 mb-6">
                To use the Intercity Bus Search feature, you need to set your Gemini API key first.
                This is the same API key used for the AI Assistant.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`${window.location.origin}/#settings`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.top!.location.href = `${window.location.origin}/#settings`;
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
                >
                  Go to Settings & Add API Key
                </a>
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Add top padding for fixed header */}
      {/* Main Content - Add top padding for fixed header */}
      <div className="pt-16 md:pt-20">
        {/* Page Title */}
        <div className="max-w-4xl mx-auto px-3 mt-6 mb-4">
          <h1 className="text-3xl font-bold mb-2 font-bengali drop-shadow-lg text-center text-gray-800">
            কোথায় যেতে চান?
          </h1>
        </div>

        {/* Floating Sticky Header */}
        <div className="sticky top-2 z-[2000] w-full px-2 md:px-0">
          <div className="max-w-4xl mx-auto">
            {/* Offline Indicator Overlay */}
            {isOffline && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-dhaka-red text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-red-500/30 animate-pulse border-2 border-white">
                <WifiOff size={12} /> You are offline
              </div>
            )}

            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-glass border border-white/50 p-3 md:p-4 transition-all duration-300">
              {/* items-end aligns the input boxes and button to the bottom, ignoring the top labels */}
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 md:gap-3 items-center md:items-end">

                <LocationInput
                  label="From"
                  value={origin}
                  onChange={setOrigin}
                  placeholder="Origin city..."
                  iconColorClass="text-gray-400"
                  ringColorClass="focus:ring-emerald-500/20"
                  disabled={loading}
                />

                {/* Swap Button Wrapper - Adjusted margins for mobile/desktop spacing */}
                <div className="relative z-10 -mt-3 -mb-8 md:my-0 md:mb-1 md:mx-2">
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    disabled={loading}
                    className={`bg-white hover:bg-emerald-50 p-2.5 rounded-full text-gray-500 hover:text-emerald-600 transition-all active:scale-95 border border-gray-100 shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Swap Locations"
                  >
                    <ArrowRightLeft className="w-4 h-4 rotate-90 md:rotate-0" />
                  </button>
                </div>

                <LocationInput
                  label="To"
                  value={destination}
                  onChange={setDestination}
                  placeholder="Destination city..."
                  iconColorClass="text-dhaka-red"
                  ringColorClass="focus:ring-red-500/20"
                  disabled={loading}
                />

                <div className="w-full md:w-auto mt-2 md:mt-0">
                  <button
                    type="submit"
                    disabled={loading || !isValidSearch}
                    className={`w-full md:w-auto h-[56px] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98] flex items-center justify-center gap-2 px-8 min-w-[130px] ${(loading || !isValidSearch) ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
                    {loading ? 'Searching' : 'Search'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-3 mt-4">

          {/* 1. Landing State */}
          {!loading && !data && !error && (
            <div className="mt-8">
              <LoadingAnimation isLanding={true} />
              {isOffline && (
                <div className="text-center text-gray-500 mt-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-white shadow-sm text-sm mx-auto max-w-sm">
                  Showing offline cached data.
                </div>
              )}
            </div>
          )}

          {/* 2. Loading State */}
          {loading && <div className="mt-8"><LoadingAnimation /></div>}

          {/* 3. Error State */}
          {!loading && error && (
            <div className="bg-white/80 backdrop-blur rounded-[2rem] border border-red-100 p-8 flex flex-col items-center justify-center text-center shadow-soft mt-8 gap-3 animate-fade-in">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-1">
                <Info className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">No Routes Found</h3>
              <p className="text-gray-500 max-w-xs leading-relaxed">{error}</p>
            </div>
          )}

          {/* 4. Results State */}
          {data && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 relative mt-4">

              {/* Left Column: Options List */}
              <div className="lg:col-span-1 animate-fade-in-up">
                <div className="lg:sticky lg:top-36 space-y-3 lg:space-y-4 max-h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar p-1">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-base font-bold text-gray-800">Available Routes</h2>
                    <span className="text-[10px] font-bold bg-white text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 shadow-sm">{data.options.length} found</span>
                  </div>

                  <div className="space-y-3">
                    {data.options.map((option) => (
                      <RouteCard
                        key={option.id}
                        option={option}
                        isSelected={selectedOptionId === option.id}
                        onClick={() => handleOptionClick(option.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed View */}
              {/* Added scroll-mt-32 to ensure the floating header doesn't cover the details when scrolled to */}
              <div className="lg:col-span-2 scroll-mt-32 md:scroll-mt-40" ref={detailsRef}>
                {selectedOption ? (
                  <div className="animate-slide-in">
                    <RouteDetail option={selectedOption} />
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 bg-white/50 backdrop-blur-sm gap-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                      <MapIcon className="w-8 h-8 opacity-40" />
                    </div>
                    <span className="font-medium">Select a route to view details</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] md:hidden">
        <div className="grid grid-cols-4 h-16">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.top!.location.href = window.location.origin + '/';
            }}
            className="flex flex-col items-center justify-center gap-1 border-t-2 border-transparent text-gray-400 hover:text-gray-600 transition-all"
          >
            <MapIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">Routes</span>
          </a>
          <a
            href={`${window.location.origin}/#ai-assistant`}
            onClick={(e) => {
              e.preventDefault();
              window.top!.location.href = `${window.location.origin}/#ai-assistant`;
            }}
            className="flex flex-col items-center justify-center gap-1 border-t-2 border-transparent text-gray-400 hover:text-gray-600 transition-all"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">AI Help</span>
          </a>
          <div className="flex flex-col items-center justify-center gap-1 border-t-2 border-dhaka-green text-dhaka-green bg-green-50/50 transition-all">
            <Train className="w-6 h-6 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">Intercity</span>
          </div>
          <a
            href={`${window.location.origin}/#about`}
            onClick={(e) => {
              e.preventDefault();
              window.top!.location.href = `${window.location.origin}/#about`;
            }}
            className="flex flex-col items-center justify-center gap-1 border-t-2 border-transparent text-gray-400 hover:text-gray-600 transition-all"
          >
            <Info className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">About</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default App;
