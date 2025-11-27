

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Map as MapIcon, Navigation, Info, Bus, ArrowLeft, Bot, ExternalLink, MapPin, Heart, Shield, Zap, Users, FileText, AlertTriangle, Home, ChevronRight, CheckCircle2, User, Linkedin, ArrowRightLeft, Settings, Save, Eye, EyeOff, Trash2, Key, Calculator, Coins, Train, Sparkles, X } from 'lucide-react';
import { BusRoute, AppView, UserLocation } from './types';
import { BUS_DATA, STATIONS, METRO_STATIONS } from './constants';
import MapVisualizer from './components/MapVisualizer';
import LiveTracker from './components/LiveTracker';
import DhakaAlive from './components/DhakaAlive';
import { askGeminiRoute } from './services/geminiService';
import { getCurrentLocation, findNearestStation, getDistance } from './services/locationService';
import { findNearestMetroStation } from './services/metroService';



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


// --- Sub-components ---

const SettingsView: React.FC<{
  onBack: () => void,
  onClearFavorites: () => void,
  apiKey: string,
  setApiKey: (key: string) => void
}> = ({ onBack, onClearFavorites, apiKey, setApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    setApiKey(inputKey);
    localStorage.setItem('gemini_api_key', inputKey);
    alert('API Key saved successfully! You can now use the AI Assistant.');
  };

  const handleClearKey = () => {
    setInputKey('');
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 md:p-12 overflow-y-auto w-full">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-dhaka-dark">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

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

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Key
            </button>
            {apiKey && (
              <button
                onClick={handleClearKey}
                className="px-4 py-2 bg-white text-red-500 border border-red-100 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {!apiKey && (
            <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-600">
              <AlertTriangle className="w-3 h-3" /> AI feature unavailable without key
            </div>
          )}
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
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(null);

  const [searchMode, setSearchMode] = useState<'TEXT' | 'ROUTE'>('TEXT');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');

  const [fareStart, setFareStart] = useState<string>('');
  const [fareEnd, setFareEnd] = useState<string>('');

  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites);
  const [listFilter, setListFilter] = useState<'ALL' | 'FAVORITES'>('ALL');

  // Allow user to store key locally
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('gemini_api_key') || '');

  const [aiQuery, setAiQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const [nearestStopIndex, setNearestStopIndex] = useState<number>(-1);
  const [nearestStopDistance, setNearestStopDistance] = useState<number>(Infinity);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearestMetro, setNearestMetro] = useState<{ stationId: string; distance: number } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sortedStations = Object.values(STATIONS).sort((a, b) => a.name.localeCompare(b.name));

  const { fareInfo, fareStartIndex, fareEndIndex, isReversed } = useMemo(() => {
    if (!selectedBus) return { fareInfo: null, fareStartIndex: -1, fareEndIndex: -1, isReversed: false };

    // Filter out invalid stations first to get the "Drawable" list
    const validStopIds = selectedBus.stops.filter(id => !!STATIONS[id]);

    let startIdx = -1;
    let endIdx = -1;
    let info = null;
    let reversed = false;

    if (fareStart && fareEnd) {
      startIdx = validStopIds.indexOf(fareStart);
      endIdx = validStopIds.indexOf(fareEnd);

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

    return { fareInfo: info, fareStartIndex: startIdx, fareEndIndex: endIdx, isReversed: reversed };
  }, [selectedBus, fareStart, fareEnd]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') {
      setView(AppView.NOT_FOUND);
    }
  }, []);

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

  useEffect(() => {
    if (selectedBus) {
      setNearestStopIndex(-1);
      setNearestStopDistance(Infinity);
      setNearestMetro(null);
      setFareStart('');
      setFareEnd('');

      getCurrentLocation()
        .then(loc => {
          setUserLocation(loc);
          const result = findNearestStation(loc, selectedBus.stops);
          if (result) {
            // Map raw index to filtered index for visualizer
            const validStopIds = selectedBus.stops.filter(id => !!STATIONS[id]);
            const stationId = selectedBus.stops[result.index];
            const filteredIndex = validStopIds.indexOf(stationId);

            if (filteredIndex !== -1) {
              setNearestStopIndex(filteredIndex);
              setNearestStopDistance(result.distance);
            }
          }

          // Find nearest metro station
          const metroResult = findNearestMetroStation(loc);
          if (metroResult) {
            setNearestMetro(metroResult);
          }
        })
        .catch(err => console.log("Location access denied for map preview"));
    }
  }, [selectedBus]);

  const filteredBuses = BUS_DATA.filter(bus => {
    if (listFilter === 'FAVORITES' && !favorites.includes(bus.id)) {
      return false;
    }

    if (searchMode === 'ROUTE') {
      if (!fromStation || !toStation) return true;
      const stopsAtFrom = bus.stops.includes(fromStation);
      const stopsAtTo = bus.stops.includes(toStation);
      return stopsAtFrom && stopsAtTo;
    } else {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      const nameMatch = bus.name.toLowerCase().includes(query);
      const bnNameMatch = bus.bnName.includes(query);
      const routeMatch = bus.routeString.toLowerCase().includes(query);
      const stopMatch = bus.stops.some(stopId => {
        const station = STATIONS[stopId];
        if (!station) return false;
        return station.name.toLowerCase().includes(query) || (station.bnName && station.bnName.includes(query));
      });
      return nameMatch || bnNameMatch || routeMatch || stopMatch;
    }
  }).sort((a, b) => a.name.localeCompare(b.name));

  const handleSearchCommit = () => {
    setSearchQuery(inputValue);
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchCommit();
    }
  };

  const handleBusSelect = (bus: BusRoute) => {
    setSelectedBus(bus);
    setView(AppView.BUS_DETAILS);
    setNearestStopIndex(-1);
    setNearestStopDistance(Infinity);
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
  };

  const toggleFavorite = (e: React.MouseEvent, busId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavs = prev.includes(busId)
        ? prev.filter(id => id !== busId)
        : [...prev, busId];
      try {
        localStorage.setItem('dhaka_commute_favorites', JSON.stringify(newFavs));
      } catch (err) { console.warn("Fav save failed"); }
      return newFavs;
    });
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

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
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white z-20">
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
        <div className="flex-1 relative">
          <LiveTracker bus={selectedBus} />
        </div>
      </div>
    );
  };

  const renderAiAssistant = () => (
    <div className="flex flex-col h-full bg-slate-50 md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden w-full">
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200 shadow-sm z-20">
        <button onClick={() => setView(AppView.HOME)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors md:hidden">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Dhaka AI Guide</h2>
          <p className="text-xs text-green-600 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
          </p>
        </div>
      </div>

      {!apiKey && !process.env.API_KEY ? (
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
                <Bot className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-sm font-medium text-gray-500">Ask me anything about Dhaka buses!</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <button onClick={() => setAiQuery("How to go from Mirpur 10 to Banani?")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">Mirpur 10 to Banani?</button>
                  <button onClick={() => setAiQuery("Best bus for Farmgate?")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">Best bus for Farmgate?</button>
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

          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleAiSubmit} className="flex gap-2 relative">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask about a route..."
                className="w-full bg-gray-100 border-0 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!aiQuery.trim() || aiLoading}
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
    <div className="flex flex-col h-full bg-white p-6 md:p-12 overflow-y-auto w-full">
      <button onClick={() => setView(AppView.HOME)} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-dhaka-dark md:hidden">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-dhaka-red rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-red-200 rotate-3 hover:rotate-6 transition-transform">
          <Bus className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dhaka<span className="text-dhaka-red">Commute</span></h1>
        <p className="text-gray-500 mb-8">Version 1.0.0</p>

        <div className="text-left space-y-6 bg-slate-50 p-8 rounded-3xl border border-gray-100">
          <p className="leading-relaxed text-gray-700">
            DhakaCommute is your ultimate companion for navigating the chaotic but vibrant streets of Dhaka.
            Whether you need to find a local bus, check a route, or estimate travel time, we've got you covered.
          </p>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Offline-ready Route Database</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Live Navigation Simulation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> AI-Powered Route Assistant</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Official 2022 Fare Calculation</li>
            </ul>
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

        <div className="mt-8 flex flex-col items-center gap-3 pb-20 md:pb-0">
          <button
            onClick={() => setView(AppView.SETTINGS)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <Settings className="w-4 h-4" /> App Settings
          </button>
          <div className="flex flex-col md:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={() => setView(AppView.PRIVACY)}
              className="flex-1 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg transition-all border border-blue-200"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setView(AppView.TERMS)}
              className="flex-1 px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-bold text-xs rounded-lg transition-all border border-green-200"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="flex flex-col h-full bg-white overflow-y-auto w-full relative">
      <div className="max-w-3xl mx-auto p-6 md:p-12 pt-4 md:pt-20">
        {/* Back Button - Now inside container */}
        <button
          onClick={() => setView(AppView.ABOUT)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-dhaka-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to About
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: November 26, 2025</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">1. Introduction</h2>
            <p>Welcome to DhakaCommute. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use our bus route finder application.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">2. Data We Do NOT Collect</h2>
            <p>DhakaCommute is designed with privacy in mind. We do NOT collect, store, or transmit:</p>
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
            <p>DhakaCommute does not use cookies for tracking or analytics. We only use browser local storage for the features mentioned above.</p>
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
            <p className="text-sm text-green-700 mt-1">DhakaCommute is built with your privacy as a top priority. All data processing happens on your device, and nothing is sent to our servers.</p>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="flex flex-col h-full bg-white overflow-y-auto w-full relative">
      <div className="max-w-3xl mx-auto p-6 md:p-12 pt-4 md:pt-20">
        {/* Back Button - Now inside container */}
        <button
          onClick={() => setView(AppView.ABOUT)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-dhaka-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to About
        </button>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: November 26, 2025</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">1. Acceptance of Terms</h2>
            <p>By accessing and using DhakaCommute, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">2. Service Description</h2>
            <p>DhakaCommute is a free, web-based application that provides:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Bus route information for Dhaka city</li>
              <li>Metro rail station information</li>
              <li>Fare estimation based on official 2022 rates</li>
              <li>Route visualization and mapping</li>
              <li>AI-powered route assistance (when you provide your own API key)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">3. No Warranty</h2>
            <p>DhakaCommute is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either express or implied, including but not limited to:</p>
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
            <p>To the maximum extent permitted by law, DhakaCommute and its developers shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Any direct, indirect, incidental, or consequential damages</li>
              <li>Loss of time, money, or opportunities due to inaccurate information</li>
              <li>Missed buses, wrong routes, or incorrect fare calculations</li>
              <li>Any damages arising from the use or inability to use the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900">6. User Responsibilities</h2>
            <p>When using DhakaCommute, you agree to:</p>
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
            <p>The DhakaCommute application, including its design, code, and content, is the property of its developers. Bus route data is compiled from publicly available sources and transport authority information.</p>
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
            <p className="text-sm text-blue-700 mt-1">DhakaCommute is provided as a free public service to help Dhaka commuters navigate the city. Use it as a helpful guide, but always exercise your own judgment when traveling.</p>
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

  const renderBusDetails = () => {
    if (!selectedBus) return <EmptyState />;
    const isFav = favorites.includes(selectedBus.id);
    const generalFareInfo = calculateFare(selectedBus);

    return (
      <div className="flex flex-col h-full bg-slate-50 md:bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden relative w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-white px-5 py-4 shadow-sm border-b border-gray-100 fixed top-[57px] w-full z-40 flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedBus(null);
              setView(AppView.HOME);
            }}
            className="w-10 h-10 flex items-center justify-center -ml-2 hover:bg-gray-50 rounded-full text-gray-600 active:text-dhaka-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-dhaka-dark leading-none truncate max-w-[180px]">{selectedBus.name}</h1>
            <p className="text-xs text-gray-400 font-bengali mt-0.5">{selectedBus.bnName}</p>
          </div>
          <button
            onClick={(e) => toggleFavorite(e, selectedBus.id)}
            className="w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex px-8 py-6 border-b border-gray-100 items-center justify-between bg-white/50 backdrop-blur z-20 sticky top-0 w-full">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-dhaka-dark leading-none">{selectedBus.name}</h1>
              <p className="text-sm text-gray-500 font-bengali mt-1">{selectedBus.bnName}</p>
            </div>
            <button
              onClick={(e) => toggleFavorite(e, selectedBus.id)}
              className="w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors border border-gray-200 hover:border-red-200"
              title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
          <button
            onClick={() => setView(AppView.LIVE_NAV)}
            className="bg-dhaka-green text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-800 transition-colors flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" /> Start Navigation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-32 md:pb-0 no-scrollbar md:px-8 md:py-6 pt-[121px] md:pt-0" ref={scrollContainerRef}>
          <div className="p-4 md:p-0 space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Info className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Type</span>
                <span className="font-bold text-gray-800 text-sm mt-0.5">{selectedBus.type}</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-2">
                  <Bus className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Stops</span>
                <span className="font-bold text-gray-800 text-sm mt-0.5">{selectedBus.stops.length}</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                  <Coins className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Max Fare</span>
                <span className="font-bold text-gray-800 text-sm mt-0.5">~৳{generalFareInfo.max}</span>
              </div>
            </div>

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
                    onChange={e => setFareStart(e.target.value)}
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
                    onChange={e => setFareEnd(e.target.value)}
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

            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
              <h3 className="font-bold text-gray-700 px-4 py-3 border-b border-gray-100 bg-gray-50/30 text-sm">Full Route List</h3>
              <div className="relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100"></div>
                <div className="space-y-0">
                  {selectedBus.stops.map((stopId, idx) => {
                    const station = STATIONS[stopId];
                    if (!station) return null;

                    const isHighlighted = fareStart && fareEnd &&
                      selectedBus.stops.indexOf(fareStart) <= idx &&
                      selectedBus.stops.indexOf(fareEnd) >= idx &&
                      selectedBus.stops.indexOf(fareStart) !== -1;

                    const isLast = idx === selectedBus.stops.length - 1;
                    const isFirst = idx === 0;

                    // Use filtered indices for nearest calculation check
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
                          {(isFirst || isLast) && !isNearest && !isHighlighted && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          {isNearest && isWithinRange && <MapPin className="w-3 h-3 text-white" />}
                          {isHighlighted && !isNearest && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm group-hover:text-dhaka-green transition-colors ${isFirst || isLast || isNearest || isHighlighted ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} ${isNearest && isWithinRange && idx < (nearestStopIndex !== -1 ? selectedBus.stops.indexOf(validStopIds[nearestStopIndex]) : -1) ? 'text-gray-400 line-through decoration-gray-300' : ''}`}>
                            {station.name}
                            {isNearest && isWithinRange && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide">You</span>}
                            {isNearest && !isWithinRange && <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide">{(nearestStopDistance / 1000).toFixed(1)}km away</span>}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Sticky CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 border-t border-gray-200 pb-safe z-30 md:hidden">
          <button
            onClick={() => setView(AppView.LIVE_NAV)}
            className="w-full bg-gradient-to-r from-dhaka-green to-[#005c44] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Start Live Navigation
          </button>
        </div>
      </div>
    );
  };

  const renderHomeContent = () => (
    <div className="flex flex-col h-full w-full">
      {/* Sticky Top Section */}
      <div className="flex-none bg-white z-20">
        <div className="p-4 space-y-4">
          {/* Colorful Header with Tabs */}
          <div className="bg-gradient-to-br from-dhaka-green to-[#004d38] rounded-[2rem] shadow-lg shadow-green-900/20 relative overflow-hidden text-white transition-all duration-300">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

            <div className="p-6 pb-2">
              <h2 className="text-3xl font-bold mb-1 font-bengali">কোথায় যেতে চান?</h2>
              <p className="text-green-100 text-sm opacity-90">Find your bus route in seconds</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex px-6 pb-4 gap-4">
              <button
                onClick={() => setSearchMode('TEXT')}
                className={`text-xs font-bold uppercase tracking-wider py-2 border-b-2 transition-colors ${searchMode === 'TEXT' ? 'border-white text-white' : 'border-transparent text-green-200 hover:text-white'}`}
              >
                Search
              </button>
              <button
                onClick={() => setSearchMode('ROUTE')}
                className={`text-xs font-bold uppercase tracking-wider py-2 border-b-2 transition-colors ${searchMode === 'ROUTE' ? 'border-white text-white' : 'border-transparent text-green-200 hover:text-white'}`}
              >
                Route Finder
              </button>
            </div>

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
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 transition-colors"
                      title="Clear Search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSearchCommit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 rounded-lg text-dhaka-green hover:bg-green-50 transition-colors"
                      title="Click to Search"
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
              onClick={() => setListFilter('ALL')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${listFilter === 'ALL' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All Buses
            </button>
            <button
              onClick={() => setListFilter('FAVORITES')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${listFilter === 'FAVORITES' ? 'bg-white shadow-sm text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
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

      {/* Scrollable Bus List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 md:pb-4 space-y-3">
        {filteredBuses.map(bus => {
          const isFav = favorites.includes(bus.id);
          const estimatedFare = calculateFare(bus);

          return (
            <button
              key={bus.id}
              onClick={() => handleBusSelect(bus)}
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
                    <span className="text-xs font-bengali text-gray-400">{bus.bnName}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={(e) => toggleFavorite(e, bus.id)}
                    className="p-1.5 -mr-1.5 hover:bg-gray-100 rounded-full transition-colors z-20"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                  </button>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide
                      ${bus.type === 'Sitting' ? 'bg-purple-50 text-purple-600' :
                        bus.type === 'AC' ? 'bg-blue-50 text-blue-600' :
                          'bg-orange-50 text-orange-600'
                      }`}>
                      {bus.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative pl-3 border-l-2 border-gray-100 ml-5 space-y-1 py-1">
                <div className="text-xs text-gray-500 font-medium truncate pr-4">
                  <span className="text-gray-300 mr-1">●</span> {bus.routeString.split('⇄')[0]}
                </div>
                <div className="text-xs text-gray-500 font-medium truncate pr-4">
                  <span className="text-gray-300 mr-1">●</span> {bus.routeString.split('⇄').pop()}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md w-fit">
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
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-5 py-3 shadow-sm z-50 pt-safe-top md:hidden">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setView(AppView.HOME)}
            className="flex items-center gap-2.5 outline-none cursor-pointer"
          >
            <div className="w-9 h-9 bg-dhaka-red rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-red-200">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Dhaka<span className="text-dhaka-red">Commute</span></h1>
          </button>
          <button onClick={() => setView(AppView.ABOUT)} className="bg-gray-100 p-2.5 rounded-full text-gray-500 hover:text-dhaka-green hover:bg-green-50 transition-all">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-white border-b border-gray-200 px-8 py-4 shadow-sm z-50 items-center justify-between shrink-0">
        <button
          onClick={() => setView(AppView.HOME)}
          className="flex items-center gap-3 cursor-pointer outline-none hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-dhaka-red rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-100">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dhaka<span className="text-dhaka-red">Commute</span></h1>
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView(AppView.AI_ASSISTANT)}
            className="text-sm font-bold text-gray-600 hover:text-dhaka-green transition-colors"
          >
            AI Assistant
          </button>
          <button
            onClick={() => setView(AppView.SETTINGS)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView(AppView.ABOUT)}
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            About <Info className="w-3 h-3" />
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
          {view === AppView.HOME && <div className="hidden md:block h-full"><EmptyState /></div>}
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
              <span className="text-[10px] font-bold uppercase tracking-wide">Routes</span>
            </button>
            <button
              onClick={() => setView(AppView.AI_ASSISTANT)}
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.AI_ASSISTANT ? 'border-dhaka-green text-dhaka-green bg-green-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <Sparkles className={`w-6 h-6 ${view === AppView.AI_ASSISTANT ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide">AI Help</span>
            </button>
            <button
              onClick={() => setView(AppView.ABOUT)}
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.ABOUT || view === AppView.SETTINGS || view === AppView.PRIVACY || view === AppView.TERMS ? 'border-dhaka-green text-dhaka-green bg-green-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <Info className={`w-6 h-6 ${view === AppView.ABOUT || view === AppView.SETTINGS || view === AppView.PRIVACY || view === AppView.TERMS ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide">About</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
