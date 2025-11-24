import React, { useState, useEffect, useRef } from 'react';
import { Search, Map as MapIcon, Navigation, Info, Bus, ArrowLeft, Bot, ExternalLink, MapPin, Heart, Shield, Zap, Users, FileText, AlertTriangle, Home, Settings, Lock, Key, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { BusRoute, AppView } from './types';
import { BUS_DATA, STATIONS } from './constants';
import MapVisualizer from './components/MapVisualizer';
import LiveTracker from './components/LiveTracker';
import { askGeminiRoute } from './services/geminiService';
import { getCurrentLocation, findNearestStation } from './services/locationService';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // API Key State
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('dhaka_commute_gemini_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');
  
  const [aiQuery, setAiQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [nearestStopIndex, setNearestStopIndex] = useState<number>(-1);
  const [nearestStopDistance, setNearestStopDistance] = useState<number>(Infinity);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to top of the container when view changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [view]);

  // Scroll to bottom of chat when history changes
  useEffect(() => {
    if (view === AppView.AI_ASSISTANT && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, aiLoading, view]);

  // Sync temp key when entering settings
  useEffect(() => {
    if (view === AppView.SETTINGS) {
      setTempApiKey(apiKey);
    }
  }, [view, apiKey]);

  // Fetch location when entering Bus Details to show "You are here" on the map
  useEffect(() => {
    if (selectedBus) {
      setNearestStopIndex(-1); // Reset first
      setNearestStopDistance(Infinity);
      getCurrentLocation()
        .then(loc => {
          const result = findNearestStation(loc, selectedBus.stops);
          if (result) {
            setNearestStopIndex(result.index);
            setNearestStopDistance(result.distance);
          }
        })
        .catch(err => console.log("Location access denied for map preview"));
    }
  }, [selectedBus]);

  // Filter buses based on search
  const filteredBuses = BUS_DATA.filter(bus => {
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
  });

  const handleBusSelect = (bus: BusRoute) => {
    setSelectedBus(bus);
    setView(AppView.BUS_DETAILS);
    // Trigger location check immediately
    setNearestStopIndex(-1);
    setNearestStopDistance(Infinity);
    getCurrentLocation().then(loc => {
      const result = findNearestStation(loc, bus.stops);
      if (result) {
        setNearestStopIndex(result.index);
        setNearestStopDistance(result.distance);
      }
    }).catch(console.error);
  };

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    localStorage.setItem('dhaka_commute_gemini_key', trimmed);
    setApiKey(trimmed);
    // Visual feedback handled by UI
    setView(AppView.HOME); // Or stay? Let's go home for now.
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    if (!apiKey) {
      setChatHistory(prev => [...prev, { role: 'assistant', text: "Please configure your Gemini API Key in Settings first." }]);
      return;
    }

    const userMessage: ChatMessage = { role: 'user', text: aiQuery };
    const queryToSend = aiQuery;
    
    // Optimistic update
    setChatHistory(prev => [...prev, userMessage]);
    setAiQuery(''); // Clear input immediately
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

    const result = await askGeminiRoute(queryToSend + ` [Context: ${locationContext}]`, apiKey);
    
    const assistantMessage: ChatMessage = { role: 'assistant', text: result };
    setChatHistory(prev => [...prev, assistantMessage]);
    setAiLoading(false);
  };

  const renderBusDetails = () => {
    if (!selectedBus) return <EmptyState />;
    return (
      <div className="flex flex-col h-full bg-slate-50 md:bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden relative w-full">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden bg-white px-5 py-4 shadow-sm border-b border-gray-100 fixed top-0 w-full z-40 flex items-center justify-between">
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
              <h1 className="text-lg font-bold text-dhaka-dark leading-none truncate max-w-[200px]">{selectedBus.name}</h1>
              <p className="text-xs text-gray-400 font-bengali mt-0.5">{selectedBus.bnName}</p>
            </div>
            <div className="w-10"></div> 
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex px-8 py-6 border-b border-gray-100 items-center justify-between bg-white/50 backdrop-blur z-20 sticky top-0 w-full">
           <div>
              <h1 className="text-2xl font-bold text-dhaka-dark leading-none">{selectedBus.name}</h1>
              <p className="text-sm text-gray-500 font-bengali mt-1">{selectedBus.bnName}</p>
           </div>
           <button 
              onClick={() => setView(AppView.LIVE_NAV)}
              className="bg-dhaka-green text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-800 transition-colors flex items-center gap-2"
           >
             <Navigation className="w-4 h-4" /> Start Navigation
           </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-32 md:pb-0 no-scrollbar md:px-8 md:py-6 pt-16 md:pt-0" ref={scrollContainerRef}>
          <div className="p-4 md:p-0 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Info className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Service Type</span>
                <span className="font-bold text-gray-800 text-sm mt-0.5">{selectedBus.type}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center">
                 <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-2">
                  <Bus className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Stops</span>
                <span className="font-bold text-gray-800 text-sm mt-0.5">{selectedBus.stops.length} Stations</span>
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
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
              <h3 className="font-bold text-gray-700 px-4 py-3 border-b border-gray-100 bg-gray-50/30 text-sm">Full Route List</h3>
              <div className="relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100"></div>
                <div className="space-y-0">
                  {selectedBus.stops.map((stopId, idx) => {
                    const station = STATIONS[stopId];
                    if(!station) return null;
                    const isLast = idx === selectedBus.stops.length - 1;
                    const isFirst = idx === 0;
                    const isNearest = idx === nearestStopIndex;
                    const isWithinRange = nearestStopDistance < 2000; // 2km range

                    return (
                      <div key={stopId} className={`px-4 py-3.5 hover:bg-gray-50 flex items-center gap-4 relative z-10 group border-b border-gray-50 last:border-0 transition-colors ${isNearest && isWithinRange ? 'bg-blue-50/50' : ''}`}>
                        <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0 
                          ${isNearest && isWithinRange
                            ? 'bg-dhaka-red w-6 h-6 ring-2 ring-red-100 animate-pulse' 
                            : isFirst 
                              ? 'bg-green-600 w-5 h-5 ring-2 ring-green-100' 
                              : isLast 
                                ? 'bg-red-500 w-5 h-5 ring-2 ring-red-100' 
                                : isNearest 
                                  ? 'bg-orange-400 w-5 h-5' // Closest but far
                                  : 'bg-gray-300'
                          }
                        `}>
                          {(isFirst || isLast) && !isNearest && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          {isNearest && isWithinRange && <MapPin className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm group-hover:text-dhaka-green transition-colors ${isFirst || isLast || isNearest ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} ${idx < nearestStopIndex && nearestStopIndex !== -1 && isWithinRange ? 'text-gray-400 line-through decoration-gray-300' : ''}`}>
                            {station.name}
                            {isNearest && isWithinRange && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide">You</span>}
                            {isNearest && !isWithinRange && <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide">{(nearestStopDistance/1000).toFixed(1)}km away</span>}
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

  const renderLiveNav = () => {
    if (!selectedBus) return <EmptyState />;
    return (
      <div className="flex flex-col h-full bg-slate-50 md:bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden relative w-full">
        <div className="flex-none bg-white px-4 py-3 border-b border-gray-200 shadow-sm z-20 flex justify-between items-center pb-safe-top pt-safe-top fixed md:sticky top-0 w-full">
          <button 
            onClick={() => setView(AppView.BUS_DETAILS)}
            className="flex items-center gap-1.5 text-red-600 font-bold text-xs bg-red-50 px-4 py-2 rounded-xl active:bg-red-100 transition-colors"
          >
            <div className="w-2 h-2 bg-red-500 rounded-sm"></div> STOP
          </button>
          <div className="text-right">
             <div className="text-xs font-bold text-dhaka-dark uppercase tracking-wide">Live Mode</div>
             <div className="text-[10px] text-gray-500 flex items-center justify-end gap-1.5 mt-0.5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span> 
               GPS Active
             </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden pt-16 md:pt-0">
          <LiveTracker bus={selectedBus} />
        </div>
      </div>
    );
  };

  const renderAiAssistant = () => (
    <div className="flex flex-col h-full bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden pt-16 md:pt-0 w-full">
      <div className="flex-none p-4 border-b border-gray-100 flex items-center gap-3 bg-white z-40 fixed md:sticky top-0 w-full">
        <button 
          onClick={() => setView(AppView.HOME)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-dhaka-dark flex items-center gap-2">
            AI Assistant
          </h2>
          <p className="text-[10px] text-gray-400">Powered by Gemini</p>
        </div>
      </div>
      
      {!apiKey ? (
         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-gray-500" />
             </div>
             <h3 className="text-xl font-bold text-gray-800 mb-2">Setup Required</h3>
             <p className="text-gray-500 max-w-xs mb-8">
               To use the AI Assistant, you need to provide your own Google Gemini API Key.
             </p>
             <button 
                onClick={() => setView(AppView.SETTINGS)}
                className="px-6 py-3 bg-dhaka-green text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-800 transition-colors flex items-center gap-2"
             >
                <Settings className="w-4 h-4" /> Open Settings
             </button>
         </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50" ref={scrollContainerRef}>
            {/* Welcome Message */}
            {chatHistory.length === 0 && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dhaka-green to-teal-600 flex items-center justify-center shrink-0 shadow-sm mt-1">
                   <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-700 max-w-[85%]">
                   <p className="font-bold text-gray-900 mb-2">Hello! 👋</p>
                   I can help you find bus routes in Dhaka. Try asking:
                   <div className="mt-3 space-y-2">
                     <button onClick={() => setAiQuery('How to go from Mirpur to Gulshan?')} className="block text-left w-full text-xs bg-gray-50 hover:bg-blue-50 hover:text-blue-600 p-2.5 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-600 transition-colors">
                       "How to go from Mirpur to Gulshan?"
                     </button>
                     <button onClick={() => setAiQuery('Direct bus to Airport?')} className="block text-left w-full text-xs bg-gray-50 hover:bg-blue-50 hover:text-blue-600 p-2.5 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-600 transition-colors">
                       "Direct bus to Airport?"
                     </button>
                   </div>
                </div>
              </div>
            )}
            
            {/* Chat History */}
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-dhaka-green to-teal-600'}`}>
                   {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                 </div>
                 <div className={`p-4 rounded-2xl shadow-sm border text-sm max-w-[90%] whitespace-pre-line leading-relaxed
                   ${msg.role === 'user' 
                     ? 'bg-blue-600 text-white border-blue-600 rounded-tr-none' 
                     : 'bg-white text-gray-800 border-gray-100 rounded-tl-none'
                   }
                 `}>
                   {msg.text.replace(/\*\*/g, '')}
                 </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {aiLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0 opacity-50 mt-1">
                   <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex-none p-4 border-t border-gray-100 bg-white pb-safe z-30">
            <form onSubmit={handleAiSubmit} className="relative">
              <input
                type="text"
                className="w-full bg-gray-100 border border-transparent rounded-2xl pl-5 pr-12 py-3.5 focus:bg-white focus:outline-none focus:border-dhaka-green focus:ring-1 focus:ring-dhaka-green transition-all shadow-inner text-sm placeholder:text-gray-400"
                placeholder="Type your question..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
              <button 
                type="submit"
                disabled={aiLoading || !aiQuery.trim()}
                className="absolute right-2 top-2 p-2 bg-dhaka-green text-white rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-200"
              >
                <Navigation className="w-4 h-4 rotate-90" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="flex flex-col h-full bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden pt-16 md:pt-0 w-full">
       <div className="flex-none p-4 border-b border-gray-100 flex items-center gap-3 bg-white z-40 fixed md:sticky top-0 w-full">
        <button onClick={() => setView(AppView.HOME)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
        <h2 className="text-lg font-bold text-dhaka-dark">Settings</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
             <Key className="w-5 h-5 text-dhaka-green" /> API Key Configuration
           </h3>
           <p className="text-sm text-gray-500 mb-6">
             To use the AI Assistant features, you must provide your own Google Gemini API Key. The key is stored locally on your device.
           </p>
           
           <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Gemini API Key</label>
           <input 
             type="password" 
             value={tempApiKey}
             onChange={(e) => setTempApiKey(e.target.value)}
             placeholder="AIzaSy..."
             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-dhaka-green focus:ring-1 focus:ring-dhaka-green transition-all mb-4 font-mono"
           />
           
           <button 
             onClick={handleSaveApiKey}
             disabled={!tempApiKey.trim()}
             className="w-full bg-dhaka-green text-white py-3 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
           >
             <CheckCircle2 className="w-4 h-4" /> Save Configuration
           </button>
           
           <div className="mt-6 pt-6 border-t border-gray-100">
             <a 
               href="https://aistudio.google.com/app/apikey" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-between text-sm text-blue-600 hover:underline bg-blue-50 px-4 py-3 rounded-xl"
             >
               <span>Get a Gemini API Key</span>
               <ExternalLink className="w-4 h-4" />
             </a>
           </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="flex flex-col h-full bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden pt-16 md:pt-0 w-full relative">
      <div className="flex-none p-4 border-b border-gray-100 flex items-center gap-3 bg-white z-40 fixed md:sticky top-0 w-full">
        <button onClick={() => setView(AppView.ABOUT)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
        <h2 className="text-lg font-bold text-dhaka-dark">Privacy Policy</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4 text-sm text-gray-700 pb-20">
        <p><strong>Last Updated: 2025</strong></p>
        <p>At DhakaCommute, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.</p>
        <h3 className="font-bold text-gray-900 mt-4">1. Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Location Data:</strong> We access your device's geolocation to provide real-time navigation and nearby bus station information. This data is processed locally on your device and is not stored on our servers.</li>
          <li><strong>API Keys:</strong> If you use the AI features, your Google Gemini API Key is stored securely in your browser's local storage and is sent directly to Google's servers only when making requests. We do not log or save your keys on our servers.</li>
        </ul>
        <h3 className="font-bold text-gray-900 mt-4">2. How We Use Your Information</h3>
        <p>We use your information solely to provide the core functionality of the app, such as calculating routes and showing your position on the map.</p>
      </div>
      {/* Sticky Back Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur border-t border-gray-100 z-50 pb-safe">
        <button 
          onClick={() => setView(AppView.ABOUT)}
          className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to About
        </button>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="flex flex-col h-full bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden pt-16 md:pt-0 w-full relative">
      <div className="flex-none p-4 border-b border-gray-100 flex items-center gap-3 bg-white z-40 fixed md:sticky top-0 w-full">
        <button onClick={() => setView(AppView.ABOUT)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
        <h2 className="text-lg font-bold text-dhaka-dark">Terms & Conditions</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4 text-sm text-gray-700 pb-20">
        <h3 className="font-bold text-gray-900">1. Acceptance of Terms</h3>
        <p>By accessing and using DhakaCommute, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h3 className="font-bold text-gray-900 mt-4">2. Use of Service</h3>
        <p>This service is provided for informational purposes only. While we strive for accuracy, bus routes and schedules in Dhaka are subject to change without notice.</p>
        <h3 className="font-bold text-gray-900 mt-4">3. Limitation of Liability</h3>
        <p>DhakaCommute shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
      </div>
      {/* Sticky Back Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur border-t border-gray-100 z-50 pb-safe">
        <button 
          onClick={() => setView(AppView.ABOUT)}
          className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to About
        </button>
      </div>
    </div>
  );

  const renderNotFound = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white md:rounded-l-3xl md:border-l md:border-gray-200 w-full">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-gray-400" />
      </div>
      <h1 className="text-4xl font-bold text-dhaka-dark mb-2">404</h1>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-xs mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button 
        onClick={() => setView(AppView.HOME)}
        className="px-6 py-3 bg-dhaka-green text-white rounded-xl font-bold hover:bg-green-800 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );

  const renderServerError = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white md:rounded-l-3xl md:border-l md:border-gray-200 w-full">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-4xl font-bold text-red-500 mb-2">500</h1>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Server Error</h2>
      <p className="text-gray-500 max-w-xs mb-8">
        Something went wrong on our end. Please try again later.
      </p>
      <button 
        onClick={() => setView(AppView.HOME)}
        className="px-6 py-3 bg-dhaka-green text-white rounded-xl font-bold hover:bg-green-800 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );

  const renderAbout = () => (
    <div className="flex flex-col h-full bg-white md:rounded-l-3xl md:border-l md:border-gray-200 overflow-hidden pt-16 md:pt-0 w-full">
       <div className="flex-none p-4 border-b border-gray-100 flex items-center gap-3 bg-white z-40 fixed md:sticky top-0 w-full">
        <button 
          onClick={() => setView(AppView.HOME)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-dhaka-dark">
            About Us
          </h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50 pb-20" ref={scrollContainerRef}>
         {/* Hero */}
         <div className="bg-gradient-to-b from-dhaka-green to-[#004d38] text-white py-12 px-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
            
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-dhaka-red font-bold text-4xl shadow-2xl mx-auto mb-6 relative z-10">
               D
            </div>
            <h1 className="text-3xl font-bold mb-2 relative z-10">DhakaCommute</h1>
            <p className="text-green-100 max-w-md mx-auto relative z-10">
              Simplifying public transport in Dhaka with real-time insights and smart navigation.
            </p>
         </div>

         <div className="px-4 -mt-8 relative z-10 pb-24 space-y-6">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
               <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                 <Heart className="w-5 h-5 text-red-500 fill-current" /> Our Mission
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 Dhaka is a vibrant city, but navigating its bus network can be challenging. Our goal is to empower every commuter with accurate, accessible, and easy-to-use information to make daily travel less stressful and more predictable.
               </p>
            </div>

             {/* Features */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <Zap className="w-6 h-6 text-yellow-500 mb-3" />
                  <h4 className="font-bold text-gray-800 text-sm mb-1">Fast Search</h4>
                  <p className="text-xs text-gray-500">Find routes instantly by name or location.</p>
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <Bot className="w-6 h-6 text-blue-500 mb-3" />
                  <h4 className="font-bold text-gray-800 text-sm mb-1">AI Guide</h4>
                  <p className="text-xs text-gray-500">Ask natural questions about your commute.</p>
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <Navigation className="w-6 h-6 text-dhaka-green mb-3" />
                  <h4 className="font-bold text-gray-800 text-sm mb-1">Live Nav</h4>
                  <p className="text-xs text-gray-500">Track your journey stop by stop.</p>
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <Users className="w-6 h-6 text-purple-500 mb-3" />
                  <h4 className="font-bold text-gray-800 text-sm mb-1">Crowdsourced</h4>
                  <p className="text-xs text-gray-500">Data updated by community insights.</p>
               </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
               <button onClick={() => setView(AppView.SETTINGS)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <Settings className="w-4 h-4 text-dhaka-green" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-gray-800 text-sm block">Settings</span>
                      <span className="text-[10px] text-gray-500 block">Manage API Keys & Preferences</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
               </button>
               <div className="h-px bg-gray-100 mx-4"></div>
               <button onClick={() => setView(AppView.PRIVACY)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Shield className="w-4 h-4 text-blue-500" />
                     </div>
                    <span className="font-bold text-gray-700 text-sm">Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
               </button>
               <div className="h-px bg-gray-100 mx-4"></div>
               <button onClick={() => setView(AppView.TERMS)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                        <FileText className="w-4 h-4 text-orange-500" />
                     </div>
                    <span className="font-bold text-gray-700 text-sm">Terms & Conditions</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
               </button>
            </div>
             
             {/* Version & Copyright (Clean Footer) */}
            <div className="text-center pt-6 opacity-60">
               <div className="flex justify-center items-center gap-2 mb-2">
                 <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs">D</div>
               </div>
               <p className="text-xs text-gray-400 font-medium">DhakaCommute v1.0.0</p>
               <p className="text-[10px] text-gray-300 mt-1">© 2025 All Rights Reserved</p>
            </div>
         </div>
      </div>
      
      {/* Sticky Back Button for About Page */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur border-t border-gray-100 z-50 pb-safe">
        <button 
          onClick={() => setView(AppView.HOME)}
          className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Back to Home
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50 md:rounded-l-3xl md:border-l md:border-gray-200 w-full">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <MapIcon className="w-10 h-10 text-dhaka-green" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a Route</h2>
      <p className="text-gray-500 max-w-xs">
        Choose a bus from the list to see the full route map, live tracking details, and station list.
      </p>
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
              <Info className="w-4 h-4"/>
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
                onClick={() => setView(AppView.SETTINGS)}
                className="text-sm font-bold text-gray-500 hover:text-dhaka-green transition-colors flex items-center gap-2"
             >
               <Settings className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setView(AppView.AI_ASSISTANT)}
                className="text-sm font-bold text-gray-600 hover:text-dhaka-green transition-colors"
             >
               AI Assistant
             </button>
             <button 
                onClick={() => setView(AppView.ABOUT)}
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-all flex items-center gap-2"
             >
                About <Info className="w-3 h-3"/>
             </button>
          </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative w-full mx-auto bg-slate-50 h-full">
        {/* Left Sidebar (Desktop) / Main View (Mobile Home) */}
        <div className={`
          ${'w-full md:w-1/3 md:min-w-[320px] md:max-w-md md:flex md:flex-col border-r border-gray-200 bg-white z-0 h-full'}
          ${view !== AppView.HOME && 'hidden md:flex'}
        `}>
           <div className="h-full overflow-y-auto no-scrollbar pt-16 md:pt-0">
             <div className="p-4 space-y-5">
                {/* Search Header */}
                 <div className="bg-gradient-to-br from-dhaka-green to-[#004d38] p-6 rounded-[2rem] shadow-lg shadow-green-900/20 relative overflow-hidden text-white mt-2">
                   <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                   <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                  <h2 className="text-3xl font-bold mb-1 font-bengali">কোথায় যেতে চান?</h2>
                  <p className="text-green-100 text-sm mb-5 opacity-90">Find your bus route in seconds</p>
                  <div className="relative group">
                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-dhaka-green transition-colors" />
                    <input
                      type="text"
                      placeholder="Search bus or place (e.g. Gulshan)"
                      className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400/30 transition-all text-base shadow-sm font-medium placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* AI Button */}
                <button 
                  onClick={() => setView(AppView.AI_ASSISTANT)}
                  className="w-full flex items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl shadow-sm active:scale-[0.99] transition-all hover:border-blue-200 group"
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

                {/* Bus List */}
                <div className="space-y-3 pb-24 md:pb-4">
                  <div className="flex items-center justify-between px-2 pt-2">
                    <h3 className="font-bold text-dhaka-dark text-lg">All Buses</h3>
                    <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full text-gray-600 font-bold">{filteredBuses.length}</span>
                  </div>
                  {filteredBuses.map(bus => (
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
                        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide
                          ${bus.type === 'Sitting' ? 'bg-purple-50 text-purple-600' :
                          bus.type === 'AC' ? 'bg-blue-50 text-blue-600' :
                          'bg-orange-50 text-orange-600'
                        }`}>
                          {bus.type}
                        </span>
                      </div>
                      <div className="relative pl-3 border-l-2 border-gray-100 ml-5 space-y-1 py-1">
                        <div className="text-xs text-gray-500 font-medium truncate pr-4">
                           <span className="text-gray-300 mr-1">●</span> {bus.routeString.split('⇄')[0]}
                        </div>
                        <div className="text-xs text-gray-500 font-medium truncate pr-4">
                           <span className="text-gray-300 mr-1">●</span> {bus.routeString.split('⇄').pop()}
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredBuses.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bus className="w-8 h-8 opacity-40" />
                      </div>
                      <p>No buses found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
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
           {view === AppView.ABOUT && renderAbout()}
           {view === AppView.PRIVACY && renderPrivacyPolicy()}
           {view === AppView.TERMS && renderTerms()}
           {view === AppView.SETTINGS && renderSettings()}
           {view === AppView.NOT_FOUND && renderNotFound()}
           {view === AppView.SERVER_ERROR && renderServerError()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {view === AppView.HOME && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] md:hidden">
          <div className="grid grid-cols-2 h-16">
            <button 
              onClick={() => setView(AppView.HOME)} 
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.HOME ? 'border-dhaka-green text-dhaka-green bg-green-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <MapIcon className={`w-6 h-6 ${view === AppView.HOME ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Routes</span>
            </button>
             <button 
              onClick={() => setView(AppView.AI_ASSISTANT)} 
              className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-all ${view === AppView.AI_ASSISTANT ? 'border-dhaka-green text-dhaka-green' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              <Bot className={`w-6 h-6 ${view === AppView.AI_ASSISTANT ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Assistant</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;