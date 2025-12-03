

import React, { useState, useEffect, useRef, useMemo, useCallback, useTransition } from 'react';
import { Search, Map as MapIcon, Navigation, Info, Bus, ArrowLeft, Bot, ExternalLink, MapPin, Heart, Shield, Zap, Users, FileText, AlertTriangle, Home, ChevronRight, CheckCircle2, User, Linkedin, Facebook, ArrowRightLeft, Settings, Save, Eye, EyeOff, Trash2, Key, Calculator, Coins, Train, Sparkles, X, Gauge, Flag, Clock, Menu, WifiOff, Plane, Phone } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BusRoute, AppView, UserLocation } from './types';
import { BUS_DATA, STATIONS, METRO_STATIONS } from './constants';
import MapVisualizer from './components/MapVisualizer';
import LiveTracker from './components/LiveTracker';
import DhakaAlive from './components/DhakaAlive';
import HistoryView from './components/HistoryView';
import EmergencyHelplineModal from './components/EmergencyHelplineModal';
import { askGeminiRoute } from './services/geminiService';
import { getCurrentLocation, findNearestStation, getDistance } from './services/locationService';
import { findNearestMetroStation } from './services/metroService';
import { planRoutes, SuggestedRoute } from './services/routePlanner';
import RouteSuggestions from './components/RouteSuggestions';
import { incrementVisitCount, trackBusSearch, trackRouteSearch } from './services/analyticsService';



interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const getStoredFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem('dhaka_commute_favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

const getStoredBus = (): BusRoute | null => {
  try {
    const stored = localStorage.getItem('dhaka_commute_selected_bus');
    if (!stored) return null;
    const busId = JSON.parse(stored);
    return BUS_DATA.find(bus => bus.id === busId) || null;
  } catch (e) {
    return null;
  }
};

const getStoredView = (): AppView => {
  try {
    const stored = localStorage.getItem('dhaka_commute_view');
    if (!stored) return AppView.HOME;
    const view = JSON.parse(stored);

    // Views that require a selected bus
    if (view === AppView.BUS_DETAILS || view === AppView.LIVE_NAV) {
      return getStoredBus() ? view : AppView.HOME;
    }

    return view;
  } catch (e) {
    return AppView.HOME;
  }
};

// --- Helper: Fare Calculator ---
const calculateFare = (route: BusRoute, fromId?: string, toId?: string): { min: number, max: number, distance: number } => {
  const validStations = route.stops
    .map(id => STATIONS[id])
    .filter((s): s is typeof STATIONS[string] => !!s);

  if (validStations.length < 2) return { min: 0, max: 0, distance: 0 };

  let startIndex = 0;
  let endIndex = validStations.length - 1;

  if (fromId && toId) {
    const sIdx = validStations.findIndex(s => s.id === fromId);
    const eIdx = validStations.findIndex(s => s.id === toId);

    // Handle bidirectional routes - swap if needed
    if (sIdx !== -1 && eIdx !== -1) {
      if (sIdx < eIdx) {
        startIndex = sIdx;
        endIndex = eIdx;
      } else if (eIdx < sIdx) {
        // Reverse direction - swap the indices
        startIndex = eIdx;
        endIndex = sIdx;
      } else {
        // Same station selected for both
        return { min: 0, max: 0, distance: 0 };
      }
    } else {
      return { min: 0, max: 0, distance: 0 };
    }
  }

  let totalDistance = 0;
  for (let i = startIndex; i < endIndex; i++) {
    totalDistance += getDistance(
      { lat: validStations[i].lat, lng: validStations[i].lng },
      { lat: validStations[i + 1].lat, lng: validStations[i + 1].lng }
    );
  }

  const distanceKm = totalDistance / 1000;

  // Official BRTA rate as of April 2, 2024
  const ratePerKm = 2.42; // Tk per kilometer for city buses
  const minFare = 10; // Minimum fare for buses

  let estimated = Math.ceil(distanceKm * ratePerKm);
  if (estimated < minFare) estimated = minFare;

  return {
    min: estimated,
    max: estimated + 5,
    distance: distanceKm
  };
};

// Helper: Format ETA
const formatETA = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${mins} min`;
};


// --- Sub-components ---

const SettingsView: React.FC<{
  onBack: () => void,
  onClearFavorites: () => void,
  apiKey: string,
  setApiKey: (key: string) => void
}> = ({ onBack, onClearFavorites, apiKey, setApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = () => {
    const trimmedKey = inputKey.trim();

    if (!trimmedKey || trimmedKey.length < 20) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return;
    }

    setApiKey(trimmedKey);
    localStorage.setItem('gemini_api_key', trimmedKey);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleClearKey = () => {
    setInputKey('');
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
    setSaveStatus('idle');
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 md:p-12 pt-20 md:pt-12 overflow-y-auto w-full">

      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6 text-gray-600" /> Settings
      </h1>

      <div className="space-y-8 max-w-xl">
        {/* API Key Section */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" /> Google Gemini API Key
          </h3>
          <p className="text-xs text-blue-700 mb-4">
            To use the AI Assistant, please provide your own Google Gemini API Key.
            It will be stored securely on your device and not shared.
          </p>

          <div className="relative mb-3">
            <input
              type={showKey ? "text" : "password"}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter your API Key"
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex gap-3 relative">
            <button
              onClick={handleSave}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 ${saveStatus === 'success' ? 'bg-green-600 text-white' :
                saveStatus === 'error' ? 'bg-red-600 text-white' :
                  'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              <Save className="w-4 h-4" />
              {saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Invalid' : 'Save Key'}
            </button>
            {apiKey && (
              <button
                onClick={handleClearKey}
                className="px-4 py-2 bg-white text-red-500 border border-red-100 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {saveStatus === 'error' && (
              <div className="absolute -bottom-12 left-0 right-0 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium animate-in fade-in">
                Please enter a valid API key (minimum 20 characters)
              </div>
            )}
            {saveStatus === 'success' && (
              <div className="absolute -bottom-12 left-0 right-0 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-xs font-medium animate-in fade-in">
                ✓ API Key saved! You can now use the AI Assistant.
              </div>
            )}
          </div>

          {!apiKey && (
            <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-600">
              <AlertTriangle className="w-3 h-3" /> AI feature unavailable without key
            </div>
          )}

          {/* API Key Instructions */}
          <div className="mt-4 bg-white p-4 rounded-xl border border-blue-100">
            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Info className="w-3 h-3 text-blue-600" /> How to Get Your API Key
            </h4>
            <ol className="text-xs text-gray-600 space-y-2 ml-4 list-decimal">
              <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Get API Key" or "Create API Key"</li>
              <li>Select "Create API key in new project" (or use existing)</li>
              <li>Copy the generated API key</li>
              <li>Paste it in the field above and click "Save Key"</li>
            </ol>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> Open Google AI Studio
            </a>
          </div>
        </div>

        {/* About the App */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" /> App Info
          </h3>
          <p className="text-sm text-gray-500">
            Version 1.0.0. Use this app to find routes and estimate fares in Dhaka City.
          </p>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  // Polyfill for requestIdleCallback (Safari support)
  const requestIdleCallback = window.requestIdleCallback || ((cb: IdleRequestCallback) => {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  });

  const [view, setView] = useState<AppView>(getStoredView);
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(getStoredBus);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchMode, setSearchMode] = useState<'TEXT' | 'ROUTE'>('TEXT');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');

  const [fareStart, setFareStart] = useState<string>('');
  const [fareEnd, setFareEnd] = useState<string>('');

  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites);
  const [listFilter, setListFilter] = useState<'ALL' | 'FAVORITES'>('ALL');
  const [isPending, startTransition] = useTransition();

  // Optimized filter handler to prevent UI blocking
  const handleFilterChange = useCallback((filter: 'ALL' | 'FAVORITES') => {
    startTransition(() => {
      setListFilter(filter);
    });
  }, []);

  // Allow user to store key locally
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('gemini_api_key') || '');

  // Offline detection
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [speed, setSpeed] = useState<number | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const [aiQuery, setAiQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const [nearestStopIndex, setNearestStopIndex] = useState<number>(-1);
  const [nearestStopDistance, setNearestStopDistance] = useState<number>(Infinity);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearestMetro, setNearestMetro] = useState<{ stationId: string; distance: number } | null>(null);
  const [suggestedRoutes, setSuggestedRoutes] = useState<SuggestedRoute[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<SuggestedRoute | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const globalNearestStationName = useMemo(() => {
    if (!userLocation) return null;
    const allStationIds = Object.keys(STATIONS);
    const nearest = findNearestStation(userLocation, allStationIds);
    return nearest ? nearest.station.name : null;
  }, [userLocation]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sortedStations = Object.values(STATIONS).sort((a, b) => a.name.localeCompare(b.name));

  const { fareInfo, fareStartIndex, fareEndIndex, isReversed, actualStartStation, actualEndStation } = useMemo(() => {
    if (!selectedBus) return { fareInfo: null, fareStartIndex: -1, fareEndIndex: -1, isReversed: false, actualStartStation: null, actualEndStation: null };

    // Filter out invalid stations first to get the "Drawable" list
    const validStopIds = selectedBus.stops.filter(id => !!STATIONS[id]);

    let startIdx = -1;
    let endIdx = -1;
    let info = null;
    let reversed = false;
    let actualStart = null;
    let actualEnd = null;

    if (fareStart && fareEnd) {
      startIdx = validStopIds.indexOf(fareStart);
      endIdx = validStopIds.indexOf(fareEnd);

      // Store the actual user-selected stations (Fix Issue #3)
      actualStart = STATIONS[fareStart];
      actualEnd = STATIONS[fareEnd];

      if (startIdx !== -1 && endIdx !== -1) {
        // Calculate fare (the calculateFare function handles bidirectional)
        info = calculateFare(selectedBus, fareStart, fareEnd);

        // Check if user selected in reverse order
        if (startIdx > endIdx) {
          reversed = true;
          // For visualization, ensure startIdx < endIdx by swapping
          const temp = startIdx;
          startIdx = endIdx;
          endIdx = temp;
        }
      }
    } else {
      info = calculateFare(selectedBus);
    }

    return { fareInfo: info, fareStartIndex: startIdx, fareEndIndex: endIdx, isReversed: reversed, actualStartStation: actualStart, actualEndStation: actualEnd };
  }, [selectedBus, fareStart, fareEnd]);

  // Track visit on mount
  useEffect(() => {
    incrementVisitCount();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') {
      setView(AppView.NOT_FOUND);
    }
  }, []);

  // Update document title based on view
  useEffect(() => {
    const baseTitle = "কই যাবো";
    let pageTitle = "";

    switch (view) {
      case AppView.HOME:
        pageTitle = "";
        break;
      case AppView.BUS_DETAILS:
        pageTitle = selectedBus ? `${selectedBus.name}` : "Bus Details";
        break;
      case AppView.LIVE_NAV:
        pageTitle = "Live Navigation";
        break;
      case AppView.AI_ASSISTANT:
        pageTitle = "AI Assistant";
        break;
      case AppView.ABOUT:
        pageTitle = "About";
        break;
      case AppView.SETTINGS:
        pageTitle = "App Settings";
        break;
      case AppView.HISTORY:
        pageTitle = "History & Analytics";
        break;
      case AppView.PRIVACY:
        pageTitle = "Privacy Policy";
        break;
      case AppView.TERMS:
        pageTitle = "Terms of Service";
        break;
      case AppView.NOT_FOUND:
        pageTitle = "Page Not Found";
        break;
      default:
        pageTitle = "";
    }

    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [view, selectedBus]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initial Location Fetch
  useEffect(() => {
    getCurrentLocation()
      .then(loc => {
        setUserLocation(loc);
        console.log("Initial location fetched:", loc);
      })
      .catch(err => console.log("Initial location fetch failed:", err));
  }, []);

  // Persist View and Selected Bus
  useEffect(() => {
    localStorage.setItem('dhaka_commute_view', JSON.stringify(view));
  }, [view]);

  useEffect(() => {
    if (selectedBus) {
      localStorage.setItem('dhaka_commute_selected_bus', JSON.stringify(selectedBus.id));
    } else {
      localStorage.removeItem('dhaka_commute_selected_bus');
    }
  }, [selectedBus]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [view]);

  useEffect(() => {
    if (view === AppView.AI_ASSISTANT && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, aiLoading, view]);

  // Improved Distance Calculation: Sum of segments
  const calculateRouteStats = (currentLoc: UserLocation, stops: string[], destIdx: number) => {
    if (!currentLoc || destIdx === -1) return { distance: 0, eta: 0 };

    // Find nearest stop index
    const nearest = findNearestStation(currentLoc, stops);
    if (!nearest) return { distance: 0, eta: 0 };

    let totalDist = 0;
    let startIndex = nearest.index;

    // Distance from User to Nearest Stop
    totalDist += nearest.distance;

    // If nearest stop is "behind" us (we are past it), we might want to skip it, 
    // but for simplicity, we'll just sum from nearest. 
    // A better heuristic: if dist(User, Stop[i+1]) < dist(Stop[i], Stop[i+1]), maybe we are closer to next.
    // For now, just sum segments from nearest to dest.

    // Sum distance between stops
    for (let i = startIndex; i < destIdx; i++) {
      const s1 = STATIONS[stops[i]];
      const s2 = STATIONS[stops[i + 1]];
      if (s1 && s2) {
        totalDist += getDistance({ lat: s1.lat, lng: s1.lng }, { lat: s2.lat, lng: s2.lng });
      }
    }

    // ETA Calculation
    // If speed is available and > 5km/h, use it. Else default to 15km/h (Dhaka traffic).
    const effectiveSpeed = (speed && speed > 5) ? speed : 15;
    const etaMin = (totalDist / 1000) / effectiveSpeed * 60;

    return { distance: totalDist / 1000, eta: etaMin };
  };

  useEffect(() => {
    if (selectedBus) {
      setNearestStopIndex(-1);
      setNearestStopDistance(Infinity);
      setNearestMetro(null);
      // Don't reset fare selection here if we want to keep it when switching views, 
      // but the requirement implies we might want to. 
      // For now, let's keep them if they exist, or reset if it's a *new* bus.
      // Actually the previous logic reset them. Let's keep that behavior for now 
      // unless we are just returning to the view.
      // setFareStart(''); 
      // setFareEnd(''); 

      // Start Watching Location
      if ('geolocation' in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude, speed: rawSpeed } = position.coords;
            const loc = { lat: latitude, lng: longitude };
            const speedKmh = rawSpeed ? rawSpeed * 3.6 : 0;

            setUserLocation(loc);
            setSpeed(speedKmh);

            // Update nearest stop logic
            const result = findNearestStation(loc, selectedBus.stops);
            if (result) {
              const validStopIds = selectedBus.stops.filter(id => !!STATIONS[id]);
              const stationId = selectedBus.stops[result.index];
              const filteredIndex = validStopIds.indexOf(stationId);

              if (filteredIndex !== -1) {
                setNearestStopIndex(filteredIndex);
                setNearestStopDistance(result.distance);
              }
            }

            // Metro logic
            const metroResult = findNearestMetroStation(loc);
            if (metroResult) setNearestMetro(metroResult);

          },
          (err) => console.error("Watch Error", err),
          { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 }
        );
      }
    } else {
      // Stop watching if no bus selected
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [selectedBus]);

  const filteredBuses = useMemo(() => BUS_DATA.filter(bus => {
    // Favorites tab: show ONLY favorites, ignore search
    if (listFilter === 'FAVORITES') {
      return favorites.includes(bus.id);
    }

    // Route search mode
    if (searchMode === 'ROUTE') {
      if (!fromStation || !toStation) return true;
      const stopsAtFrom = bus.stops.includes(fromStation);
      const stopsAtTo = bus.stops.includes(toStation);

      // Track route search if both stations are selected
      if (fromStation && toStation && stopsAtFrom && stopsAtTo) {
        // Use requestIdleCallback to avoid blocking
        requestIdleCallback(() => {
          trackRouteSearch(fromStation, toStation);
        });
      }

      return stopsAtFrom && stopsAtTo;
    }

    // Text search mode
    const query = searchQuery.trim();
    if (!query) return true;

    // Case-insensitive search that works with both English and Bengali
    const matchText = (text: string, searchTerm: string) => {
      return text.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const nameMatch = matchText(bus.name, query);
    const bnNameMatch = matchText(bus.bnName, query);
    const routeMatch = matchText(bus.routeString, query);
    const stopMatch = bus.stops.some(stopId => {
      const station = STATIONS[stopId];
      if (!station) return false;
      return matchText(station.name, query) || (station.bnName && matchText(station.bnName, query));
    });
    return nameMatch || bnNameMatch || routeMatch || stopMatch;
  }).sort((a, b) => a.name.localeCompare(b.name)), [listFilter, favorites, searchMode, fromStation, toStation, searchQuery]);

  const handleSearchCommit = () => {
    setSearchQuery(inputValue);
    (document.activeElement as HTMLElement)?.blur();

    // Scroll to top to show search results (Fix Issue #1)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    // Generate intelligent route suggestions
    if (inputValue.trim()) {
      const routes = planRoutes(userLocation, inputValue);
      setSuggestedRoutes(routes);
    } else {
      setSuggestedRoutes([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchCommit();
    }
  };

  const handleBusSelect = useCallback((bus: BusRoute, fromHistory: boolean = false) => {
    // Track bus search only if not from history
    if (!fromHistory) {
      trackBusSearch(bus.id, bus.name);
    }

    // Immediately update UI state (non-blocking)
    setSelectedBus(bus);
    setView(AppView.BUS_DETAILS);
    setNearestStopIndex(-1);
    setNearestStopDistance(Infinity);
    setSelectedTrip(null);

    // Defer location fetch to avoid blocking UI
    requestIdleCallback(() => {
      getCurrentLocation().then(loc => {
        setUserLocation(loc);
        const result = findNearestStation(loc, bus.stops);
        if (result) {
          const validStopIds = bus.stops.filter(id => !!STATIONS[id]);
          const stationId = bus.stops[result.index];
          const filteredIndex = validStopIds.indexOf(stationId);

          if (filteredIndex !== -1) {
            setNearestStopIndex(filteredIndex);
            setNearestStopDistance(result.distance);
          }
        }
      }).catch(console.error);
    }, { timeout: 2000 });
  }, []);

  const toggleFavorite = useCallback((e: React.MouseEvent, busId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavs = prev.includes(busId)
        ? prev.filter(id => id !== busId)
        : [...prev, busId];
      try {
        // Defer localStorage write to avoid blocking
        requestIdleCallback(() => {
          localStorage.setItem('dhaka_commute_favorites', JSON.stringify(newFavs));
        });
      } catch (err) { console.warn("Fav save failed"); }
      return newFavs;
    });
  }, [requestIdleCallback]);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || !isOnline) return;

    const userMessage: ChatMessage = { role: 'user', text: aiQuery };
    const queryToSend = aiQuery;

    setChatHistory(prev => [...prev, userMessage]);
    setAiQuery('');
    setAiLoading(true);

    let locationContext = "Dhaka, Bangladesh";
    try {
      const loc = await getCurrentLocation();
      let nearestStation = null;
      let minDist = Infinity;
      Object.values(STATIONS).forEach(station => {
        const dist = Math.sqrt(Math.pow(station.lat - loc.lat, 2) + Math.pow(station.lng - loc.lng, 2));
        if (dist < minDist) {
          minDist = dist;
          nearestStation = station;
        }
      });
      if (nearestStation) {
        locationContext = `User is near ${nearestStation.name} (${nearestStation.bnName})`;
      }
    } catch (e) {
      console.log("Location not available for AI context");
    }

    // Pass the user's API key if available
    const result = await askGeminiRoute(queryToSend + ` [Context: ${locationContext}]`, apiKey);

    const assistantMessage: ChatMessage = { role: 'assistant', text: result };
    setChatHistory(prev => [...prev, assistantMessage]);
    setAiLoading(false);
  };

  const handleStartNavigation = useCallback(() => {
    startTransition(() => {
      setView(AppView.LIVE_NAV);
    });
  }, []);

  const handleClearFavorites = () => {
    if (confirm('Are you sure you want to clear all favorite buses?')) {
      setFavorites([]);
      localStorage.removeItem('dhaka_commute_favorites');
    }
  };

  // --- Render Functions ---


  const EmptyState = () => <DhakaAlive />;

  const renderLiveNav = () => {
    if (!selectedBus) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <h2 className="text-xl font-bold text-dhaka-dark">No Bus Selected</h2>
          <button onClick={() => setView(AppView.HOME)} className="mt-4 text-dhaka-green font-bold">Go Home</button>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden relative w-full">
        {/* Mobile Header */}
        <div className="hidden md:hidden flex items-center gap-3 p-4 border-b border-gray-100 bg-white z-20 shrink-0 fixed top-0 left-0 right-0">
          <button onClick={() => setView(AppView.BUS_DETAILS)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-dhaka-dark flex items-center gap-2">
              Live Navigation
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </h2>
            <p className="text-xs text-gray-500">{selectedBus.name}</p>
          </div>
        </div>
        {/* Desktop Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white z-50 shrink-0 md:relative fixed top-0 left-0 right-0 md:top-0 pt-safe-top md:pt-4">
          <button onClick={() => setView(AppView.BUS_DETAILS)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-dhaka-dark flex items-center gap-2">
              Live Navigation
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </h2>
            <p className="text-xs text-gray-500">{selectedBus.name}</p>
          </div>
        </div>
        <div className="flex-1 relative min-h-0 pt-[80px] md:pt-0">
          <LiveTracker
            bus={selectedBus}
            highlightStartIdx={fareStartIndex}
            highlightEndIdx={fareEndIndex}
            userLocation={userLocation}
            speed={speed}
            onBack={() => setView(AppView.BUS_DETAILS)}
          />
        </div>
      </div>
    );
  };

  const renderAiAssistant = () => (
    <div className="flex flex-col h-full bg-slate-50 md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden w-full pt-[65px] md:pt-0">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b border-gray-200 shadow-sm z-20 absolute top-0 left-0 right-0 h-[65px]">
        <button onClick={() => setView(AppView.HOME)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className={`w-10 h-10 rounded-full ${isOnline ? 'bg-blue-600' : 'bg-gray-400'} flex items-center justify-center text-white shadow-lg ${isOnline ? 'shadow-blue-200' : 'shadow-gray-200'}`}>
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Dhaka AI Guide</h2>
          <p className={`text-xs font-bold flex items-center gap-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span> {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      {/* Desktop Header */}
      <div className="hidden md:flex items-center gap-3 p-4 bg-white border-b border-gray-200 shadow-sm z-20">
        <div className={`w-10 h-10 rounded-full ${isOnline ? 'bg-blue-600' : 'bg-gray-400'} flex items-center justify-center text-white shadow-lg ${isOnline ? 'shadow-blue-200' : 'shadow-gray-200'}`}>
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Dhaka AI Guide</h2>
          <p className={`text-xs font-bold flex items-center gap-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span> {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {!isOnline ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">You're Offline</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            AI Assistant requires an internet connection. You can still add or update your API key while offline.
          </p>
          <button
            onClick={() => setView(AppView.SETTINGS)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200"
          >
            Manage API Key
          </button>
        </div>
      ) : !apiKey && !process.env.API_KEY ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Setup Required</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Please add your Google Gemini API Key in settings to use the AI Assistant.
          </p>
          <button
            onClick={() => setView(AppView.SETTINGS)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200"
          >
            Go to Settings
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 pb-[140px] md:pb-4">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
                <Bot className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-sm font-medium text-gray-500">ঢাকার বাস সম্পর্কে কিছু জানতে চাইলে, আমাকে জিজ্ঞেস করুন</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <button onClick={() => setAiQuery("মিরপুর ১০ থেকে বনানী যাওয়ার উপায় কি?")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">মিরপুর ১০ থেকে বনানী?</button>
                  <button onClick={() => setAiQuery("ফার্মগেটের জন্য সেরা বাস কোনটি?")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">ফার্মগেটের জন্য সেরা বাস কোনটি?</button>
                </div>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-dhaka-dark text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                    <div className="whitespace-pre-wrap">{msg.text.replace(/\*\*/g, '')}</div>
                  </div>
                </div>
              ))
            )}

            {aiLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200 z-30 fixed md:relative bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0">
            {!isOnline && (
              <div className="mb-3 bg-orange-50 border border-orange-200 text-orange-700 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                You need to be online to use AI Assistant
              </div>
            )}
            <form onSubmit={handleAiSubmit} className="flex gap-2 relative">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder={isOnline ? "Ask about a route..." : "Connect to internet to use AI"}
                disabled={!isOnline}
                className="w-full bg-gray-100 border-0 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!aiQuery.trim() || aiLoading || !isOnline}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:bg-gray-400 transition-all hover:bg-blue-700"
              >
                <Navigation className="w-4 h-4 rotate-90" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );

  const renderAbout = () => (
    <div className="flex flex-col h-full bg-white p-6 md:p-12 pt-20 md:pt-12 overflow-y-auto w-full">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-dhaka-red rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-red-200 rotate-3 hover:rotate-6 transition-transform">
          <Bus className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🚍 Find Bus Routes Across Bangladesh</h1>
        <h2 className="text-2xl font-bold mb-2">কই<span className="text-dhaka-red ml-2">যাবো</span> <span className="text-gray-600 text-lg">(KoyJabo)</span></h2>
        <p className="text-gray-500 mb-8">Version 1.0.0</p>

        <div className="text-left space-y-6 bg-slate-50 p-8 rounded-3xl border border-gray-100">
          <p className="leading-relaxed text-gray-700 text-lg">
            Travel anywhere in Bangladesh with confidence. Whether you're moving between districts, cities, towns, or local areas,
            <span className="font-bold text-dhaka-green"> কই যাবো (KoyJabo)</span> helps you discover the best and most accurate route instantly.
          </p>

          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">✨ What You Get:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Nationwide bus route coverage</strong> across Bangladesh</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Inter-district, inter-city, local, and highway routes</strong></span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Fare, stops, timing, and distance</strong> — all in one place</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Metro, train, and launch guides</strong> (where available)</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Smart real-time route suggestions</strong></span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Built-in AI assistant</strong> — ask any route, get instant answers</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> <span><strong>Works offline</strong> — no internet needed for route search</span></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">👥 Who Is It For?</h3>
            <p className="text-gray-700 leading-relaxed">
              Daily commuters, students, office goers, travelers, and anyone who wants a smooth, stress-free travel plan across Bangladesh.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">🎯 Our Goal:</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Make travel across Bangladesh simpler, smarter, and more accessible for everyone.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/mejbaur/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">Developed by Mejbaur Bahar Fagun</p>
          </div>
        </div>


        <div className="mt-8 flex flex-col items-center gap-4 pb-20 md:pb-0">
          <div className="text-center w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Our Social Media</h3>
            <p className="text-sm text-gray-600 mb-4">Connect with us for updates and news</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.linkedin.com/company/koy-jabo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#0077b5] hover:bg-[#006396] text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/koyjabo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

  const renderPrivacyPolicy = () => (
    <div className="flex flex-col h-full bg-white overflow-y-auto w-full relative">
      <div className="max-w-3xl mx-auto p-6 md:p-12 pt-20 md:pt-20">

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: November 26, 2025</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">1. Introduction</h2>
            <p>Welcome to কই যাবো. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use our bus route finder application for traveling across Bangladesh.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">2. Data We Do NOT Collect</h2>
            <p>কই যাবো is designed with privacy in mind. We do NOT collect, store, or transmit:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Your location data to any server</li>
              <li>Your search history or route preferences</li>
              <li>Any browsing behavior or analytics</li>
              <li>Device information or IP addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">3. Local Data Processing</h2>
            <p><strong>Location Services:</strong> When you grant location permission, your GPS coordinates are processed entirely on your device to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Show your position on the route map</li>
              <li>Find the nearest bus stop to your current location</li>
              <li>Calculate distances to stations</li>
            </ul>
            <p className="mt-3">This data never leaves your device and is not stored permanently.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">4. Local Storage</h2>
            <p>We use your browser's local storage to save:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li><strong>Favorite buses:</strong> Your saved bus routes (stored locally on your device)</li>
              <li><strong>API Key:</strong> Your Google Gemini API key for the AI assistant (if provided, stored locally)</li>
            </ul>
            <p className="mt-3">You can clear this data anytime through your browser settings or the app's settings page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">5. Third-Party Services</h2>
            <p><strong>Google Gemini AI:</strong> If you use the AI Assistant feature with your own API key, your queries are sent to Google's Gemini API. Please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google's Privacy Policy</a> for how they handle this data.</p>
            <p className="mt-3"><strong>Google Maps:</strong> When you click "Real Map" to view routes in Google Maps, you'll be redirected to Google Maps. Google's privacy policy applies to that service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">6. Cookies</h2>
            <p>কই যাবো does not use cookies for tracking or analytics. We only use browser local storage for the features mentioned above.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">7. Children's Privacy</h2>
            <p>Our service is available to users of all ages. Since we don't collect any personal data, there are no special considerations for children's privacy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">8. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">9. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us through our <a href="https://linkedin.com/in/mejbaur/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn profile</a>.</p>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-8">
            <p className="text-sm font-bold text-green-800">✓ Privacy-First Design</p>
            <p className="text-sm text-green-700 mt-1">কই যাবো is built with your privacy as a top priority. All data processing happens on your device, and nothing is sent to our servers.</p>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="flex flex-col h-full bg-white overflow-y-auto w-full relative">
      <div className="max-w-3xl mx-auto p-6 md:p-12 pt-20 md:pt-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: November 26, 2025</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">1. Acceptance of Terms</h2>
            <p>By accessing and using কই যাবো, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">2. Service Description</h2>
            <p>কই যাবো is a free, web-based application that provides:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Bus route information across Bangladesh (inter-district, inter-city, local, and highway routes)</li>
              <li>Metro rail, train, and launch station information (where available)</li>
              <li>Fare estimation based on official rates</li>
              <li>Route visualization and mapping</li>
              <li>AI-powered route assistance (when you provide your own API key)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">3. No Warranty</h2>
            <p>কই যাবো is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either express or implied, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Accuracy of bus routes, schedules, or fare information</li>
              <li>Availability or reliability of the service</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">4. Data Accuracy</h2>
            <p><strong>Important Notice:</strong> Bus routes, stops, timings, and fares are subject to change by transport authorities without notice. We make reasonable efforts to keep information current, but:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Routes may be modified or discontinued</li>
              <li>Fares may change based on government regulations</li>
              <li>Bus schedules may vary due to traffic, weather, or other factors</li>
              <li>Station locations and names may be updated</li>
            </ul>
            <p className="mt-3">Always verify critical information with official sources or bus operators.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">5. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, কই যাবো and its developers shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Any direct, indirect, incidental, or consequential damages</li>
              <li>Loss of time, money, or opportunities due to inaccurate information</li>
              <li>Missed buses, wrong routes, or incorrect fare calculations</li>
              <li>Any damages arising from the use or inability to use the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">6. User Responsibilities</h2>
            <p>When using কই যাবো, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to reverse engineer or modify the application</li>
              <li>Not use automated systems to scrape or download data</li>
              <li>Verify important information with official sources</li>
              <li>Keep your API keys (if used) secure and confidential</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">7. Third-Party Services</h2>
            <p><strong>Google Gemini AI:</strong> If you use the AI Assistant with your own API key, you are subject to Google's terms of service and pricing.</p>
            <p className="mt-2"><strong>Google Maps:</strong> Links to Google Maps are provided for convenience and are subject to Google's terms of service.</p>
            <p className="mt-2">We are not responsible for the availability, accuracy, or terms of these third-party services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">8. Intellectual Property</h2>
            <p>The কই যাবো application, including its design, code, and content, is the property of its developers. Bus route data is compiled from publicly available sources and transport authority information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">9. Service Modifications</h2>
            <p>We reserve the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Modify or discontinue the service at any time</li>
              <li>Update features, routes, or information</li>
              <li>Change these terms of service</li>
            </ul>
            <p className="mt-3">Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">10. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">11. Contact Information</h2>
            <p>For questions about these terms, please contact us through our <a href="https://linkedin.com/in/mejbaur/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn profile</a>.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-8">
            <p className="text-sm font-bold text-blue-800">📱 Free & Open Service</p>
            <p className="text-sm text-blue-700 mt-1">কই যাবো is provided as a free public service to help Dhaka commuters navigate the city. Use it as a helpful guide, but always exercise your own judgment when traveling.</p>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );

  const renderNotFound = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-sky-50 overflow-hidden relative w-full">
      {/* Clouds */}
      <div className="absolute top-10 left-10 text-white/60 animate-cloud-1">
        <div className="w-20 h-8 bg-white rounded-full relative">
          <div className="w-10 h-10 bg-white rounded-full absolute -top-5 left-2"></div>
          <div className="w-8 h-8 bg-white rounded-full absolute -top-3 left-8"></div>
        </div>
      </div>
      <div className="absolute top-24 right-10 text-white/40 animate-cloud-2 scale-75">
        <div className="w-20 h-8 bg-white rounded-full relative">
          <div className="w-10 h-10 bg-white rounded-full absolute -top-5 left-2"></div>
          <div className="w-8 h-8 bg-white rounded-full absolute -top-3 left-8"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto aspect-video flex items-center justify-center mb-8">
        <div className="animate-drive animate-bounce-bus">
          <div className="text-dhaka-green filter drop-shadow-xl relative">
            <Bus className="w-32 h-32" />
            <div className="w-full h-2 bg-black/20 rounded-full blur-sm absolute bottom-0 translate-y-2"></div>
          </div>
        </div>
        {/* Road */}
        <div className="absolute bottom-6 left-0 right-0 h-20 bg-gray-700 w-full overflow-hidden border-t-4 border-gray-600 flex items-center -z-10">
          <div className="w-full h-2 bg-transparent border-t-2 border-dashed border-white/50 animate-road-move [background-size:40px_100%]"></div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-3">Off Route?</h1>
      <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
        Looks like you've wandered off the map. Don't worry, we can get you back on track!
      </p>
    </div>
  );

  const renderServerError = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-white">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-dhaka-dark mb-2">Server Error</h1>
      <p className="text-gray-500 mb-6">Something went wrong.</p>
      <button onClick={() => window.location.reload()} className="bg-dhaka-green text-white px-6 py-2 rounded-xl font-bold">Reload</button>
    </div>
  );

  const renderWhyUse = () => (
    <div className="flex flex-col h-full bg-white p-6 md:p-12 pt-20 md:pt-12 overflow-y-auto w-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">Why Use <span className="text-dhaka-green">কই যাবো</span>?</h1>
        <p className="text-gray-500 mb-8">Your smart companion for navigating Bangladesh's bus network</p>

        <div className="space-y-6">
          {/* Benefit 1 */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">⚡ Lightning Fast Search</h3>
                <p className="text-gray-700 leading-relaxed">
                  Find your bus route in seconds! Search in English or Bengali - our smart search understands both languages and finds the perfect bus for your journey.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <MapIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">🗺️ Complete Route Database</h3>
                <p className="text-gray-700 leading-relaxed">
                  Access 200+ bus routes covering all major areas of Dhaka. From Mirpur to Motijheel, Uttara to Sadarghat - we've got every route mapped out for you.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">🤖 AI-Powered Assistant</h3>
                <p className="text-gray-700 leading-relaxed">
                  Not sure which bus to take? Ask our AI assistant! Get personalized route suggestions, travel tips, and answers to all your commute questions in natural language.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">💰 Accurate Fare Calculator</h3>
                <p className="text-gray-700 leading-relaxed">
                  Know exactly how much your trip will cost before you board! Our fare calculator uses official 2022 rates and calculates based on actual distance traveled.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 5 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">🧭 Live Navigation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Never miss your stop again! Our live navigation feature tracks your location and shows you exactly where you are on the route, with real-time updates.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 6 */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">❤️ Save Your Favorites</h3>
                <p className="text-gray-700 leading-relaxed">
                  Take the same route every day? Save your favorite buses for quick access. Your daily commute just got a whole lot easier!
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Helpline */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">🚨 Emergency Helpline Access</h3>
                <p className="text-gray-700 leading-relaxed">
                  Travel with peace of mind! Access emergency services (Police, Hospitals, Fire Stations) near your current location during navigation. One-tap calling to 80+ verified emergency contacts across Bangladesh including national helplines (999, 100, 102) and location-based services in all major cities.
                </p>
              </div>
            </div>
          </div>

          {/* Offline Support */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <WifiOff className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">📡 Works Offline</h3>
                <p className="text-gray-700 leading-relaxed">
                  No internet? No problem! The entire bus route database is stored on your device, so you can search for routes and check bus details even without a data connection.
                </p>
              </div>
            </div>
          </div>

          {/* Metro Integration */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-2xl border border-indigo-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Train className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">🚇 Metro Rail Integration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Complete MRT Line 6 information included! Find the best combination of bus and metro for your journey across Dhaka.
                </p>
              </div>
            </div>
          </div>

          {/* Railway & Airport Locator */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">✈️ Railway & Airport Finder</h3>
                <p className="text-gray-700 leading-relaxed">
                  Easily locate the nearest railway station and airport from your current location. Perfect for planning intercity travel and catching flights on time!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Navigate Dhaka Like a Pro?</h2>
          <p className="mb-6 opacity-90">Join thousands of commuters who trust কই যাবো for their daily travels</p>
          <button
            onClick={() => setView(AppView.HOME)}
            className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
          >
            Start Finding Routes
          </button>
        </div>

        {/* Bottom padding for mobile */}
        <div className="h-20"></div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="flex flex-col h-full bg-white p-6 md:p-12 pt-20 md:pt-12 overflow-y-auto w-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">Frequently Asked Questions</h1>
        <p className="text-gray-500 mb-8">Everything you need to know about কই যাবো</p>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>What is কই যাবো?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> কই যাবো (Koi Jabo) means "Where to go?" in Bengali. It's a free web app that helps you find bus routes across Bangladesh. Simply search for your destination or starting point, and we'll show you which buses to take, their routes, and estimated fares - whether you're traveling within cities or between districts.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>How do I search for a bus route?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> You can search in two ways: (1) Type the name of a bus, station, or area in the search box (works in both English and Bengali), or (2) Use the Route Finder to select your starting point and destination from the dropdown menus.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>Is the app free to use?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Yes! কই যাবো is completely free. No registration, no subscription, no hidden fees. We built this app to help Dhaka commuters navigate the city more easily.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>Does it work offline?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Yes! All bus routes and station data are stored locally on your device, so you can search for routes even without an internet connection. The AI Assistant and live navigation features require internet connectivity.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>How accurate are the bus fares?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Our fare calculator uses the official 2022 government-approved fare structure for Dhaka buses. Fares are calculated based on actual distance traveled. However, actual fares may vary slightly depending on the bus operator and current regulations.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>What is the AI Assistant?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> The AI Assistant is powered by Google Gemini and can answer questions about bus routes, suggest the best routes for your journey, and provide travel tips. You can ask questions in natural language, just like talking to a friend!
            </p>
          </div>

          {/* FAQ 7 - Emergency Helpline */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-red-500">Q:</span>
              <span>How do I access Emergency Helplines?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> During live navigation, you'll see a red "Help Line" button beside your current location. Click it to access national emergency numbers (999, 100, 102, 199, 109) and nearest location-based services (Police Stations, Hospitals, Fire Stations). We cover 80+ emergency services across all major cities in Bangladesh with verified phone numbers for one-tap calling.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>How do I use Live Navigation?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Select a bus route, then click "Start Navigation". The app will use your device's GPS to show your current location on the route and alert you as you approach each stop. Make sure to allow location access when prompted.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>Can I search in Bengali?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Absolutely! You can search for buses and stations in both English and Bengali. For example, search "ফার্মগেট" or "Farmgate" - both will work perfectly.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>How many bus routes are included?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> We currently have 200+ bus routes covering all major areas of Dhaka, including popular services like Raida, Victor, Shyamoli, BRTC, and many more. We're constantly updating our database to include new routes.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>Does it include Metro Rail information?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Yes! We include complete information about Dhaka Metro Rail MRT Line 6, including all 16 stations from Uttara North to Motijheel. The app can suggest routes that combine both bus and metro for your journey.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>Is my location data private?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> Yes! Your location data is only used locally on your device for navigation purposes and is never sent to our servers or shared with third parties. Check our Privacy Policy for more details.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-emerald-500">Q:</span>
              <span>Who built this app?</span>
            </h3>
            <p className="text-gray-700 ml-6 leading-relaxed">
              <span className="font-semibold text-gray-900">A:</span> কই যাবো was developed by Mejbaur Bahar Fagun, a software engineer passionate about solving real-world problems for Dhaka commuters. Connect on <a href="https://linkedin.com/in/mejbaur/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>.
            </p>
          </div>
        </div>

        {/* Still have questions? */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">Try asking our AI Assistant or reach out to us!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setView(AppView.AI_ASSISTANT)}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5" />
              Ask AI Assistant
            </button>
            <a
              href="https://linkedin.com/in/mejbaur/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              Contact Developer
            </a>
          </div>
        </div>

        {/* Bottom padding for mobile */}
        <div className="h-20"></div>
      </div>
    </div>
  );

  const renderBusDetails = () => {
    if (!selectedBus) return null;

    const generalFareInfo = calculateFare(selectedBus);
    return (
      <div className="flex flex-col h-full bg-slate-50 overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="hidden md:hidden fixed top-0 w-full z-40">
          <div className="bg-white px-5 py-4 shadow-sm border-b border-gray-100 flex items-center justify-between">
            <button onClick={() => setView(AppView.HOME)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Go back to home">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 ml-3">
              <h2 className="text-lg font-bold text-dhaka-dark">{selectedBus.name}</h2>
              <p className="text-xs text-gray-500">{selectedBus.bnName}</p>
            </div>
            <button
              onClick={(e) => toggleFavorite(e, selectedBus.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={favorites.includes(selectedBus.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedBus.id) ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
            </button>
            <button
              onClick={() => setView(AppView.LIVE_NAV)}
              className="ml-2 bg-gradient-to-r from-dhaka-green to-[#005c44] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Navigate
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white z-50 shrink-0 md:relative fixed top-0 left-0 right-0 md:top-0 pt-safe-top md:pt-4">
          <button onClick={() => setView(AppView.HOME)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Go back to home">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-dhaka-dark">{selectedBus.name}</h2>
            <p className="text-xs text-gray-500">{selectedBus.bnName}</p>
          </div>
          <button
            onClick={() => setView(AppView.LIVE_NAV)}
            className="bg-dhaka-green text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-2 mr-2"
          >
            <Navigation className="w-4 h-4" />
            Start Navigation
          </button>
          <button
            onClick={(e) => toggleFavorite(e, selectedBus.id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={favorites.includes(selectedBus.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorites.includes(selectedBus.id) ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-[90px] md:pt-4 pb-24 md:pb-4">
          {/* Trip Plan (if selected from suggestions) */}
          {selectedTrip && (
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-3">Your Trip Plan</h3>
              <div className="space-y-3">
                {selectedTrip.steps.map((step, idx) => (
                  <div key={idx} className={`flex gap-3 ${step.type === 'bus' && step.busRoute?.id === selectedBus.id ? 'opacity-100' : 'opacity-70'}`}>
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                                      ${step.type === 'walk' ? 'bg-gray-200 text-gray-600' :
                          step.type === 'metro' ? 'bg-blue-200 text-blue-700' :
                            'bg-green-200 text-green-700'
                        }
                                    `}>
                        {idx + 1}
                      </div>
                      {idx < selectedTrip.steps.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1"></div>}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-semibold text-gray-800">{step.instruction}</p>
                      {step.type === 'bus' && step.busRoute?.id === selectedBus.id && (
                        <span className="inline-block mt-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Current Step</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-wider">Type</span>
              <span className="font-bold text-gray-800 text-sm mt-0.5">{selectedBus.type}</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-2">
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-wider">Stops</span>
              <span className="font-bold text-gray-800 text-sm mt-0.5">
                {fareStart && fareEnd ? (
                  Math.abs(selectedBus.stops.indexOf(fareEnd) - selectedBus.stops.indexOf(fareStart)) + 1
                ) : (
                  selectedBus.stops.length
                )}
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                <Coins className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-wider">{fareStart && fareEnd ? 'Fare' : 'Max Fare'}</span>
              <span className="font-bold text-gray-800 text-sm mt-0.5">
                {fareStart && fareEnd && fareInfo ? (
                  `৳${fareInfo.min}${fareInfo.max !== fareInfo.min ? ` - ${fareInfo.max}` : ''}`
                ) : (
                  `~৳${generalFareInfo.max}`
                )}
              </span>
            </div>
          </div>

          {/* Additional Stats when fare is selected */}
          {
            fareStart && fareEnd && (
              <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-4">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{userLocation ? 'Speed' : 'Stops'}</span>
                  <span className="font-bold text-gray-800 text-sm mt-0.5">
                    {userLocation ? (
                      `${(speed || 0).toFixed(0)} km/h`
                    ) : (
                      Math.abs(selectedBus.stops.indexOf(fareEnd) - selectedBus.stops.indexOf(fareStart)) + 1
                    )}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                    <Flag className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Distance</span>
                  <span className="font-bold text-gray-800 text-sm mt-0.5">
                    {fareInfo ? `${fareInfo.distance.toFixed(1)} km` : '-- km'}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">ETA</span>
                  <span className="font-bold text-gray-800 text-sm mt-0.5">
                    {fareInfo ? formatETA((fareInfo.distance / 15) * 60) : '--'}
                  </span>
                </div>
              </div>
            )
          }

          {/* Map Visualizer */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden w-full">
            <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Live View
              </h3>
              <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-medium hidden md:block">Click & Drag to pan</span>
              <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-medium md:hidden">Scroll to pan</span>
            </div>
            <div className="w-full">
              <MapVisualizer
                route={selectedBus}
                userStationIndex={nearestStopIndex}
                userDistance={nearestStopDistance}
                highlightStartIdx={fareStartIndex}
                highlightEndIdx={fareEndIndex}
                isReversed={isReversed}
                userLocation={userLocation}
              />
            </div>
          </div>

          {/* Fare Calculator */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
              <Coins className="w-4 h-4 text-yellow-500" /> Stop-to-Stop Fare
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">From</label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-dhaka-green/20"
                  value={fareStart}
                  onChange={e => {
                    const newStart = e.target.value;
                    setFareStart(newStart);
                    if (newStart && fareEnd) {
                      requestIdleCallback(() => trackRouteSearch(newStart, fareEnd));
                    }
                  }}
                >
                  <option value="">Select...</option>
                  {selectedBus.stops.map(id => {
                    const s = STATIONS[id];
                    return s ? <option key={id} value={id}>{s.name}</option> : null;
                  })}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">To</label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-dhaka-green/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  value={fareEnd}
                  onChange={e => {
                    const newEnd = e.target.value;
                    setFareEnd(newEnd);
                    if (fareStart && newEnd) {
                      requestIdleCallback(() => trackRouteSearch(fareStart, newEnd));
                    }
                  }}
                  disabled={!fareStart}
                >
                  <option value="">{fareStart ? 'Select...' : 'Select From first'}</option>
                  {selectedBus.stops.map(id => {
                    const s = STATIONS[id];
                    return s ? <option key={id} value={id}>{s.name}</option> : null;
                  })}
                </select>
              </div>
            </div>
            {fareInfo ? (
              <div className="bg-green-50 p-3 rounded-xl border border-green-100 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                <div>
                  <p className="text-[10px] text-green-600 font-bold uppercase">Estimated Cost</p>
                  <p className="text-xs text-green-600">Distance: {fareInfo.distance.toFixed(1)} km</p>
                </div>
                <span className="text-xl font-bold text-green-800">৳{fareInfo.min} - {fareInfo.max}</span>
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <p className="text-xs text-gray-400">Select start and end stops to calculate fare</p>
              </div>
            )}
          </div>

          {/* Full Route List */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            <h3 className="font-bold text-gray-700 px-4 py-3 border-b border-gray-100 bg-gray-50/30 text-sm">Full Route List</h3>
            <div className="relative">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100"></div>
              <div className="space-y-0">
                {selectedBus.stops.map((stopId, idx) => {
                  const station = STATIONS[stopId];
                  if (!station) return null;

                  // Check if this stop is highlighted (part of the selected route)
                  // Handle both forward and reverse directions
                  const fareStartIdx = fareStart ? selectedBus.stops.indexOf(fareStart) : -1;
                  const fareEndIdx = fareEnd ? selectedBus.stops.indexOf(fareEnd) : -1;

                  const isHighlighted = fareStartIdx !== -1 && fareEndIdx !== -1 &&
                    ((fareStartIdx <= idx && idx <= fareEndIdx) ||
                      (fareEndIdx <= idx && idx <= fareStartIdx));

                  // Check if this is the user's selected start or end station
                  const isUserStart = fareStart === stopId;
                  const isUserEnd = fareEnd === stopId;

                  const isLast = idx === selectedBus.stops.length - 1;
                  const isFirst = idx === 0;

                  const validStopIds = selectedBus.stops.filter(id => !!STATIONS[id]);
                  const filteredIdx = validStopIds.indexOf(stopId);
                  const isNearest = nearestStopIndex !== -1 && nearestStopIndex === filteredIdx;

                  const isWithinRange = nearestStopDistance < 2000;

                  return (
                    <div key={stopId} className={`px-4 py-3.5 hover:bg-gray-50 flex items-center gap-4 relative z-10 group border-b border-gray-50 last:border-0 transition-colors 
                      ${isNearest && isWithinRange ? 'bg-blue-50/50' : ''}
                      ${isHighlighted ? 'bg-green-50 border-l-4 border-l-green-500 -ml-[1px]' : ''}
                    `}>
                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0 transition-all
                        ${isNearest && isWithinRange
                          ? 'bg-dhaka-red w-6 h-6 ring-2 ring-red-100 animate-pulse'
                          : isUserStart || isUserEnd
                            ? 'bg-dhaka-green w-5 h-5 ring-2 ring-green-100 scale-110'
                            : isHighlighted
                              ? 'bg-dhaka-green w-5 h-5 ring-2 ring-green-100 scale-110'
                              : isFirst
                                ? 'bg-green-600 w-5 h-5 ring-2 ring-green-100'
                                : isLast
                                  ? 'bg-red-500 w-5 h-5 ring-2 ring-red-100'
                                  : isNearest
                                    ? 'bg-orange-400 w-5 h-5'
                                    : 'bg-gray-300'
                        }
                      `}>
                        {(isFirst || isLast) && !isNearest && !isHighlighted && !isUserStart && !isUserEnd && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        {isNearest && isWithinRange && <MapPin className="w-3 h-3 text-white" />}
                        {(isHighlighted || isUserStart || isUserEnd) && !isNearest && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm group-hover:text-dhaka-green transition-colors ${isFirst || isLast || isNearest || isHighlighted || isUserStart || isUserEnd ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} ${isNearest && isWithinRange && idx < (nearestStopIndex !== -1 ? selectedBus.stops.indexOf(validStopIds[nearestStopIndex]) : -1) ? 'text-gray-400 line-through decoration-gray-300' : ''}`}>
                            {station.name}
                            {isNearest && isWithinRange && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide">You</span>}
                            {isNearest && !isWithinRange && <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide">{(nearestStopDistance / 1000).toFixed(1)}km away from {globalNearestStationName || 'location'}</span>}
                            {isUserStart && <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide font-bold">Start</span>}
                            {isUserEnd && <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide font-bold">Destination</span>}
                          </p>
                          {/* Helpline Button - Show beside current location */}
                          {isNearest && isWithinRange && userLocation && (
                            <button
                              onClick={() => setShowEmergencyModal(true)}
                              className="shrink-0 bg-dhaka-red hover:bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1"
                              aria-label="Emergency Helplines"
                            >
                              <Phone className="w-3 h-3" />
                              Help Line
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Helpline Modal */}
        <EmergencyHelplineModal
          isOpen={showEmergencyModal}
          onClose={() => setShowEmergencyModal(false)}
          userLocation={userLocation}
          currentLocationName={globalNearestStationName || undefined}
        />
      </div>
    );
  };


  const renderHomeContent = () => (
    <div className="flex flex-col h-full w-full">
      {/* Sticky Top Section */}
      <div className="flex-none bg-white z-20">
        <div className="p-4 space-y-4">
          {/* Colorful Header with Tabs */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-[2rem] shadow-xl shadow-emerald-500/30 relative overflow-hidden text-white transition-all duration-300">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>

            {/* Text Content */}
            <div className="px-6 pt-6 pb-4 relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-bengali drop-shadow-lg">কোথায় যেতে চান?</h2>
                <p className="text-white/90 text-sm font-medium">এক ক্লিকে, আপনার বাসের সঠিক রুট</p>
              </div>
            </div>

            {/* Mode Toggle Removed as per request */}
            {/* <div className="flex px-6 pb-4 gap-4">...</div> */}

            <div className="px-6 pb-6">
              {searchMode === 'TEXT' ? (
                <div className="relative group flex items-center">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-dhaka-green transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Search bus or place..."
                    className="w-full pl-12 pr-12 py-3.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400/30 transition-all text-base shadow-sm font-medium placeholder:text-gray-400"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {inputValue || searchQuery ? (
                    <button
                      onClick={() => {
                        setInputValue('');
                        setSearchQuery('');
                        setSuggestedRoutes([]);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 transition-colors"
                      title="Clear Search"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSearchCommit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 rounded-lg text-dhaka-green hover:bg-green-50 transition-colors"
                      title="Click to Search"
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <select
                      value={fromStation}
                      onChange={(e) => setFromStation(e.target.value)}
                      className="w-full pl-3 pr-8 py-3.5 bg-white text-gray-800 rounded-xl text-sm font-medium appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="">From...</option>
                      {sortedStations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="flex-1 relative">
                    <select
                      value={toStation}
                      onChange={(e) => setToStation(e.target.value)}
                      className="w-full pl-3 pr-8 py-3.5 bg-white text-gray-800 rounded-xl text-sm font-medium appearance-none focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                      disabled={!fromStation}
                    >
                      <option value="">{fromStation ? 'To...' : 'Select From first'}</option>
                      {sortedStations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Button - Hidden on Mobile */}
          <button
            onClick={() => setView(AppView.AI_ASSISTANT)}
            className="hidden md:flex w-full items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl shadow-sm active:scale-[0.99] transition-all hover:border-blue-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-sm">Ask AI Assistant</h3>
                <p className="text-xs text-gray-500">Not sure which bus to take?</p>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-full">
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </button>

          {/* List Filter Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => handleFilterChange('ALL')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${listFilter === 'ALL' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}
            >
              All Buses
            </button>
            <button
              onClick={() => handleFilterChange('FAVORITES')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${listFilter === 'FAVORITES' ? 'bg-white shadow-sm text-red-500' : 'text-gray-700 hover:text-gray-900'}`}
            >
              <Heart className="w-3 h-3 fill-current" /> Favorites
            </button>
          </div>

          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-dhaka-dark text-lg">{listFilter === 'FAVORITES' ? 'Saved Routes' : 'All Buses'}</h3>
            <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full text-gray-600 font-bold">{filteredBuses.length}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 md:pb-4 space-y-3">

        {/* Intelligent Route Suggestions */}
        {searchMode === 'TEXT' && suggestedRoutes.length > 0 && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2 mb-3 px-1">
              <Sparkles className="w-4 h-4 text-dhaka-green fill-current" />
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Smart Suggestions</h3>
            </div>
            <RouteSuggestions
              routes={suggestedRoutes}
              onSelectRoute={(route) => {
                // If route has a bus segment, select that bus
                const busStep = route.steps.find(step => step.type === 'bus' && step.busRoute);
                if (busStep && busStep.busRoute) {
                  handleBusSelect(busStep.busRoute);

                  // Auto-populate fare calculator with route origin and destination
                  const bus = busStep.busRoute;
                  const originStation = busStep.from;
                  const destinationStation = busStep.to;

                  // Find the closest matching station IDs in the bus route
                  const findClosestStationId = (stationName: string): string => {
                    const nameLower = stationName.toLowerCase();
                    // First try exact match
                    for (const stopId of bus.stops) {
                      const station = STATIONS[stopId];
                      if (station && station.name.toLowerCase() === nameLower) {
                        return stopId;
                      }
                    }
                    // Then try partial match
                    for (const stopId of bus.stops) {
                      const station = STATIONS[stopId];
                      if (station && (station.name.toLowerCase().includes(nameLower) || nameLower.includes(station.name.toLowerCase()))) {
                        return stopId;
                      }
                    }
                    // Return first stop if no match
                    return bus.stops[0];
                  };

                  const fromStopId = findClosestStationId(originStation);
                  const toStopId = findClosestStationId(destinationStation);

                  // Set fare calculator values after a brief delay to ensure component is rendered
                  setTimeout(() => {
                    setFareStart(fromStopId);
                    setFareEnd(toStopId);

                    // Track this as a route search
                    requestIdleCallback(() => {
                      trackRouteSearch(fromStopId, toStopId);
                    });
                  }, 100);
                }
                // Override the null set by handleBusSelect
                setSelectedTrip(route);
              }}
              currentLocation={globalNearestStationName || undefined}
            />
            <div className="my-6 border-t border-gray-100 relative">
              <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-gray-50 px-2 text-xs font-bold text-gray-400">OR BROWSE ALL</span>
            </div>
          </div>
        )}
        {filteredBuses.map(bus => {
          const isFav = favorites.includes(bus.id);
          const estimatedFare = calculateFare(bus);

          return (
            <button
              key={bus.id}
              onClick={() => handleBusSelect(bus)}
              aria-label={`Select ${bus.name} bus route from ${bus.routeString}`}
              className={`w-full text-left bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border transition-all group relative overflow-hidden ${selectedBus?.id === bus.id ? 'border-dhaka-green ring-1 ring-dhaka-green' : 'border-transparent hover:border-green-100'}`}
            >
              {selectedBus?.id === bus.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-dhaka-green"></div>}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm shrink-0
                      ${bus.type === 'AC' ? 'bg-blue-100 text-blue-700' :
                      bus.type === 'Sitting' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {bus.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-gray-900 leading-tight group-hover:text-dhaka-green transition-colors">{bus.name}</h4>
                    <span className="text-xs font-bengali text-gray-600">{bus.bnName}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={(e) => toggleFavorite(e, bus.id)}
                    aria-label={isFav ? `Remove ${bus.name} from favorites` : `Add ${bus.name} to favorites`}
                    className="p-1.5 -mr-1.5 hover:bg-gray-100 rounded-full transition-colors z-20"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                  </button>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide
                      ${bus.type === 'Sitting' ? 'bg-purple-50 text-purple-600' :
                        bus.type === 'AC' ? 'bg-blue-50 text-blue-700' :
                          'bg-orange-50 text-orange-700'
                      }`}>
                      {bus.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative pl-3 border-l-2 border-gray-100 ml-5 space-y-1 py-1" role="presentation">
                <div className="text-xs text-gray-600 font-medium truncate pr-4">
                  <span className="text-gray-400 mr-1" aria-hidden="true">●</span> {bus.routeString.split('⇄')[0]}
                </div>
                <div className="text-xs text-gray-600 font-medium truncate pr-4">
                  <span className="text-gray-400 mr-1" aria-hidden="true">●</span> {bus.routeString.split('⇄').pop()}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md w-fit">
                <Coins className="w-3 h-3" />
                <span>Est. Fare: ৳{estimatedFare.min} - ৳{estimatedFare.max}</span>
              </div>
            </button>
          );
        })}
        {filteredBuses.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bus className="w-8 h-8 opacity-40" />
            </div>
            <p>No buses found {searchMode === 'ROUTE' ? `between selected stations` : listFilter === 'FAVORITES' ? 'in favorites' : `matching "${searchQuery}"`}</p>
            {inputValue && inputValue !== searchQuery && searchMode === 'TEXT' && (
              <button onClick={handleSearchCommit} className="mt-2 text-xs text-dhaka-green underline">
                Click to search for "{inputValue}"
              </button>
            )}
          </div>
        )}
      </div>


    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-gray-800 overflow-hidden">
      {/* Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-5 py-3 shadow-sm z-50 pt-safe-top md:hidden transition-transform duration-300 ${(view === AppView.BUS_DETAILS || view === AppView.LIVE_NAV) ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setView(AppView.HOME)}
            className="flex items-center gap-2.5 outline-none cursor-pointer"
            aria-label="Go to home"
          >
            <div className="w-9 h-9 bg-dhaka-red rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-red-200">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">কই <span className="text-dhaka-red">যাবো</span></h1>
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-white border-b border-gray-200 px-8 py-4 shadow-sm z-50 items-center justify-between shrink-0">
        <button
          onClick={() => setView(AppView.HOME)}
          className="flex items-center gap-3 cursor-pointer outline-none hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <div className="w-10 h-10 bg-dhaka-red rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-100">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">কই <span className="text-dhaka-red">যাবো</span></h1>
        </button>
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

      <main className="flex flex-1 overflow-hidden relative w-full mx-auto bg-slate-50 h-full">
        {/* Left Sidebar (Desktop) / Main View (Mobile Home) */}
        <div className={`
            ${'w-full md:w-1/3 md:min-w-[320px] md:max-w-md md:flex md:flex-col border-r border-gray-200 bg-white z-0 h-full'}
            ${view !== AppView.HOME && 'hidden md:flex'}
          `}>
          <div className="h-full pt-16 md:pt-0">
            {renderHomeContent()}
          </div>
        </div>

        {/* Right Content Area (Desktop) / Views (Mobile) */}
        <div className={`
            ${'w-full md:flex-1 bg-slate-50 md:bg-white relative h-full overflow-hidden'}
            ${view === AppView.HOME && 'hidden md:block'}
          `}>
          {view === AppView.HOME && <div className="hidden md:block h-full"><DhakaAlive /></div>}
          {view === AppView.BUS_DETAILS && renderBusDetails()}
          {view === AppView.LIVE_NAV && renderLiveNav()}
          {view === AppView.AI_ASSISTANT && renderAiAssistant()}
          {view === AppView.SETTINGS && (
            <SettingsView
              onBack={() => setView(AppView.HOME)}
              onClearFavorites={handleClearFavorites}
              apiKey={apiKey}
              setApiKey={setApiKey}
            />
          )}
          {view === AppView.ABOUT && renderAbout()}
          {view === AppView.WHY_USE && renderWhyUse()}
          {view === AppView.FAQ && renderFAQ()}
          {view === AppView.HISTORY && (
            <HistoryView
              onBack={() => setView(AppView.HOME)}
              onBusSelect={handleBusSelect}
            />
          )}
          {view === AppView.PRIVACY && renderPrivacyPolicy()}
          {view === AppView.TERMS && renderTerms()}
          {view === AppView.NOT_FOUND && renderNotFound()}
          {view === AppView.SERVER_ERROR && renderServerError()}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Show on all pages except BUS_DETAILS and LIVE_NAV */}
      {view !== AppView.BUS_DETAILS && view !== AppView.LIVE_NAV && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] md:hidden">
          <div className="grid grid-cols-3 h-16">
            <button
              onClick={() => setView(AppView.HOME)}
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.HOME ? 'border-dhaka-green text-dhaka-green bg-green-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <MapIcon className={`w-6 h-6 ${view === AppView.HOME ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">Routes</span>
            </button>
            <button
              onClick={() => setView(AppView.AI_ASSISTANT)}
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.AI_ASSISTANT ? 'border-dhaka-green text-dhaka-green bg-green-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <Sparkles className={`w-6 h-6 ${view === AppView.AI_ASSISTANT ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">AI Help</span>
            </button>
            <button
              onClick={() => setView(AppView.ABOUT)}
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.ABOUT ? 'border-dhaka-green text-dhaka-green bg-green-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <Info className={`w-6 h-6 ${view === AppView.ABOUT ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">About</span>
            </button>
          </div>
        </nav>
      )}
      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />

      {/* Menu Overlay - Works on all pages */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-dhaka-dark">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close menu">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-2 flex-1">
              <button
                onClick={() => { setView(AppView.AI_ASSISTANT); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Bot className="w-5 h-5 text-dhaka-green" /> AI Assistant
              </button>
              <button
                onClick={() => { setView(AppView.ABOUT); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Info className="w-5 h-5 text-green-500" /> About
              </button>
              <button
                onClick={() => { setView(AppView.WHY_USE); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Zap className="w-5 h-5 text-emerald-500" /> Why Use কই যাবো
              </button>
              <button
                onClick={() => { setView(AppView.FAQ); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <FileText className="w-5 h-5 text-cyan-500" /> Q&A
              </button>
              <button
                onClick={() => { setView(AppView.SETTINGS); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Settings className="w-5 h-5 text-blue-500" /> App Settings
              </button>
              <button
                onClick={() => { setView(AppView.HISTORY); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Clock className="w-5 h-5 text-amber-500" /> History
              </button>
              <button
                onClick={() => { setView(AppView.PRIVACY); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Shield className="w-5 h-5 text-purple-500" /> Privacy Policy
              </button>
              <button
                onClick={() => { setView(AppView.TERMS); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <FileText className="w-5 h-5 text-orange-500" /> Terms of Service
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400">
                কই যাবো v1.0.0
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
