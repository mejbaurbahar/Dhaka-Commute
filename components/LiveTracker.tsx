
import React, { useEffect, useState } from 'react';
import { BusRoute, UserLocation } from '../types';
import { getCurrentLocation, findNearestStation, getDistance } from '../services/locationService';
import { STATIONS } from '../constants';
import { Navigation, Clock, MapPin, AlertCircle, RefreshCw, Compass } from 'lucide-react';

interface LiveTrackerProps {
  bus: BusRoute;
}

const LiveTracker: React.FC<LiveTrackerProps> = ({ bus }) => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nearestIndex, setNearestIndex] = useState<number>(-1);
  const [distanceToStation, setDistanceToStation] = useState<number>(Infinity);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
      const nearest = findNearestStation(loc, bus.stops);
      if (nearest) {
        setNearestIndex(nearest.index);
        setDistanceToStation(nearest.distance);
      }
      setLoading(false);
      setError(null);
    } catch (err: any) {
      console.error("Loc Error", err);
      // Even if location fails, we might want to let them see the list, 
      // but for "Live Nav" it's critical.
      setError(err.message || "Location access denied.");
      setLoading(false);
    }
  };

  // Trigger immediately on mount
  useEffect(() => {
    setLoading(true);
    fetchLocation();
    const interval = setInterval(fetchLocation, 5000); // More frequent updates for "Live" feel
    return () => clearInterval(interval);
  }, [bus]); // Re-run if bus changes

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Location Needed</h3>
        <p className="mb-6 text-sm">{error}. We need your location to show which stop you are at.</p>
        <button 
          onClick={() => { setLoading(true); fetchLocation(); }}
          className="px-6 py-3 bg-dhaka-green text-white rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95 transition-transform"
        >
          Enable Location
        </button>
      </div>
    );
  }

  if (loading && !location) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-dhaka-green border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <Compass className="w-8 h-8 text-dhaka-green animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Finding Satellite...</h3>
        <p className="text-sm text-gray-400 mt-2">Detecting your position on the bus</p>
      </div>
    );
  }

  const currentStation = nearestIndex !== -1 ? STATIONS[bus.stops[nearestIndex]] : null;
  const nextStopId = nearestIndex !== -1 && nearestIndex < bus.stops.length - 1 ? bus.stops[nearestIndex + 1] : null;
  
  // Is the user actually AT the station (within 500m)?
  const isAtStation = distanceToStation < 500;
  
  // Calculate dist to next stop
  let distToNext = 0;
  if (nextStopId && location) {
    const nextStation = STATIONS[nextStopId];
    distToNext = getDistance(location, { lat: nextStation.lat, lng: nextStation.lng });
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      {/* Floating Status Card */}
      <div className="absolute top-4 left-4 right-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-5 z-10">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
             <MapPin className="w-3 h-3" /> {isAtStation ? "CURRENT STATION" : "NEAREST STATION"}
           </span>
           <span className="flex items-center gap-1 text-[10px] text-dhaka-green bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
             <RefreshCw className="w-3 h-3 animate-spin" /> Live
           </span>
        </div>
        <h2 className="text-2xl font-bold text-dhaka-dark flex items-center gap-2">
          {currentStation?.name || "Unknown Location"}
        </h2>
        {!isAtStation && (
           <p className="text-xs font-bold text-orange-600 bg-orange-50 inline-block px-2 py-0.5 rounded mt-1">
             You are {(distanceToStation / 1000).toFixed(1)} km away
           </p>
        )}
        <p className="text-xs text-gray-500 font-bengali mt-1 mb-3 ml-0.5">{currentStation?.bnName}</p>
        
        {nextStopId ? (
          <div className="pt-3 border-t border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-dhaka-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Next Stop In</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-800">{(distToNext / 1000 * 3 + 2).toFixed(0)} min</span>
                <span className="text-xs text-gray-400">({(distToNext/1000).toFixed(1)} km)</span>
              </div>
            </div>
          </div>
        ) : (
           <div className="pt-3 border-t border-gray-100 text-sm text-green-600 font-bold">
             You have reached the destination!
           </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto pt-52 pb-10 px-6">
        <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider ml-11">Route Timeline</h4>
        <div className="relative border-l-2 border-dashed border-gray-300 ml-3 space-y-0 pb-12">
          {bus.stops.map((stopId, idx) => {
            const station = STATIONS[stopId];
            if (!station) return null;
            
            const isPassed = nearestIndex !== -1 && idx < nearestIndex && isAtStation;
            const isCurrent = nearestIndex !== -1 && idx === nearestIndex;

            return (
              <div key={stopId} className={`relative pl-10 pb-10 ${isPassed ? 'opacity-40 grayscale blur-[0.5px]' : 'opacity-100'}`}>
                {/* Node */}
                <div 
                  className={`absolute -left-[9px] top-0 rounded-full transition-all duration-500
                    ${isCurrent && isAtStation
                      ? 'bg-dhaka-red border-4 border-white shadow-[0_0_0_4px_rgba(244,42,65,0.2)] w-6 h-6 -left-[11px] z-10' 
                      : isCurrent // Nearest but far
                        ? 'bg-orange-400 border-4 border-white w-5 h-5 -left-[9px] z-10'
                        : isPassed 
                          ? 'bg-gray-400 w-4 h-4 border-2 border-white' 
                          : 'bg-white border-4 border-dhaka-green w-5 h-5 -left-[9px]'
                    }`}
                >
                </div>

                {/* Content */}
                <div className={`${isCurrent ? '-mt-1.5' : '-mt-1'}`}>
                  <p className={`font-medium ${isCurrent ? 'text-dhaka-dark text-xl font-bold' : 'text-gray-700'}`}>
                    {station.name}
                  </p>
                  {isCurrent && isAtStation && (
                     <span className="inline-block mt-1 px-2 py-0.5 bg-dhaka-red text-white text-[10px] rounded font-bold uppercase tracking-wide shadow-sm">
                       Current Location
                     </span>
                  )}
                   {isCurrent && !isAtStation && (
                     <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] rounded font-bold uppercase tracking-wide shadow-sm">
                       Nearest Stop ({(distanceToStation / 1000).toFixed(1)} km)
                     </span>
                  )}
                  {!isCurrent && (
                    <p className="text-xs text-gray-400 mt-0.5">{station.bnName}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LiveTracker;
