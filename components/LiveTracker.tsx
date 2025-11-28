
import React, { useEffect, useState, useRef } from 'react';
import { BusRoute, UserLocation, Station } from '../types';
import { getCurrentLocation, findNearestStation, getDistance } from '../services/locationService';
import { STATIONS } from '../constants';
import { Navigation, Clock, MapPin, AlertCircle, RefreshCw, Compass, Gauge, Flag } from 'lucide-react';

interface LiveTrackerProps {
  bus: BusRoute;
  highlightStartIdx?: number;
  highlightEndIdx?: number;
}

const LiveTracker: React.FC<LiveTrackerProps> = ({ bus, highlightStartIdx, highlightEndIdx }) => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nearestIndex, setNearestIndex] = useState<number>(-1);
  const [distanceToStation, setDistanceToStation] = useState<number>(Infinity);
  const [globalNearest, setGlobalNearest] = useState<{ station: Station, distance: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const watchIdRef = useRef<number | null>(null);

  const processLocation = (loc: UserLocation, speedVal: number | null) => {
    setLocation(loc);
    setSpeed(speedVal);

    // Nearest on Route
    const nearest = findNearestStation(loc, bus.stops);
    if (nearest) {
      setNearestIndex(nearest.index);
      setDistanceToStation(nearest.distance);
    }

    // Nearest Global (Real Location Name)
    const allStationIds = Object.keys(STATIONS);
    const gNearest = findNearestStation(loc, allStationIds);
    if (gNearest) {
      setGlobalNearest({ station: gNearest.station, distance: gNearest.distance });
    }

    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    setLoading(true);

    // Initial fetch
    getCurrentLocation().then(loc => {
      processLocation(loc, null);
    }).catch(err => {
      console.error("Initial Loc Error", err);
    });

    // Start Watch
    if ('geolocation' in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, speed: rawSpeed } = position.coords;
          // rawSpeed is m/s. Convert to km/h.
          const speedKmh = rawSpeed ? rawSpeed * 3.6 : 0;
          processLocation({ lat: latitude, lng: longitude }, speedKmh);
        },
        (err) => {
          console.error("Watch Error", err);
          // Don't set error state here to avoid blocking UI if initial fetch worked
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000
        }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [bus]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Location Needed</h3>
        <p className="mb-6 text-sm">{error}. We need your location to show which stop you are at.</p>
        <button
          onClick={() => { setLoading(true); window.location.reload(); }}
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

  // Calculate Trip Stats (If destination selected)
  let distToDest = 0;
  let etaMinutes = 0;
  let hasDestination = highlightEndIdx !== undefined && highlightEndIdx !== -1;
  let destStationName = "";

  if (hasDestination && location && highlightEndIdx !== undefined) {
    const destStation = STATIONS[bus.stops[highlightEndIdx]];
    if (destStation) {
      destStationName = destStation.name;
      distToDest = getDistance(location, { lat: destStation.lat, lng: destStation.lng });

      // Calculate ETA
      // Use current speed if > 5km/h, otherwise assume average bus speed of 20km/h
      const calcSpeed = (speed && speed > 5) ? speed : 20;
      etaMinutes = (distToDest / 1000) / calcSpeed * 60;
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      {/* Status Card - Now part of flex layout, not absolute */}
      <div className="bg-white rounded-b-3xl shadow-sm border-b border-gray-100 p-5 z-20 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {isAtStation ? "CURRENT STOP" : "NEAREST STOP"}
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

        {/* Trip Stats Grid */}
        {hasDestination ? (
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
            <div className="bg-blue-50 p-2 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Gauge className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase">Speed</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{(speed || 0).toFixed(0)} <span className="text-[10px] font-normal text-blue-600">km/h</span></p>
            </div>
            <div className="bg-purple-50 p-2 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                <Flag className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase">Dist</span>
              </div>
              <p className="text-lg font-bold text-purple-900">{(distToDest / 1000).toFixed(1)} <span className="text-[10px] font-normal text-purple-600">km</span></p>
            </div>
            <div className="bg-green-50 p-2 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase">ETA</span>
              </div>
              <p className="text-lg font-bold text-green-900">{etaMinutes.toFixed(0)} <span className="text-[10px] font-normal text-green-600">min</span></p>
            </div>
          </div>
        ) : (
          nextStopId ? (
            <div className="pt-3 border-t border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-dhaka-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Next Stop In</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-800">{(distToNext / 1000 * 3 + 2).toFixed(0)} min</span>
                  <span className="text-xs text-gray-400">({(distToNext / 1000).toFixed(1)} km)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-gray-100 text-sm text-green-600 font-bold">
              You have reached the destination!
            </div>
          )
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth">
        <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider ml-11">Route Timeline</h4>
        <div className="relative border-l-2 border-dashed border-gray-300 ml-3 space-y-0 pb-20">
          {bus.stops.map((stopId, idx) => {
            const station = STATIONS[stopId];
            if (!station) return null;

            const isPassed = nearestIndex !== -1 && idx < nearestIndex && isAtStation;
            const isCurrent = nearestIndex !== -1 && idx === nearestIndex;

            // Highlight Logic
            const isStart = highlightStartIdx !== undefined && idx === highlightStartIdx;
            const isEnd = highlightEndIdx !== undefined && idx === highlightEndIdx;
            const isInRange = highlightStartIdx !== undefined && highlightEndIdx !== undefined && idx >= highlightStartIdx && idx <= highlightEndIdx;

            return (
              <div key={stopId} className={`relative pl-10 pb-10 ${isPassed ? 'opacity-40 grayscale blur-[0.5px]' : 'opacity-100'}`}>
                {/* Highlight Line Segment */}
                {isInRange && idx < highlightEndIdx! && (
                  <div className="absolute left-[-2px] top-0 bottom-[-40px] w-1 bg-green-500 z-0"></div>
                )}

                {/* Node */}
                <div
                  className={`absolute -left-[9px] top-0 rounded-full transition-all duration-500
                    ${isCurrent && isAtStation
                      ? 'bg-dhaka-red border-4 border-white shadow-[0_0_0_4px_rgba(244,42,65,0.2)] w-6 h-6 -left-[11px] z-10'
                      : isCurrent // Nearest but far
                        ? 'bg-orange-400 border-4 border-white w-5 h-5 -left-[9px] z-10'
                        : isStart
                          ? 'bg-green-600 border-4 border-white w-5 h-5 -left-[9px] z-10 ring-2 ring-green-200'
                          : isEnd
                            ? 'bg-red-600 border-4 border-white w-5 h-5 -left-[9px] z-10 ring-2 ring-red-200'
                            : isInRange
                              ? 'bg-green-400 border-4 border-white w-4 h-4 -left-[7px] z-0'
                              : isPassed
                                ? 'bg-gray-400 w-4 h-4 border-2 border-white'
                                : 'bg-white border-4 border-dhaka-green w-5 h-5 -left-[9px]'
                    }`}
                >
                </div>

                {/* Content */}
                <div className={`${isCurrent ? '-mt-1.5' : '-mt-1'}`}>
                  <p className={`font-medium ${isCurrent ? 'text-dhaka-dark text-xl font-bold' : isInRange ? 'text-green-800 font-bold' : 'text-gray-700'}`}>
                    {station.name}
                  </p>
                  {isCurrent && isAtStation && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-dhaka-red text-white text-[10px] rounded font-bold uppercase tracking-wide shadow-sm">
                      Current Location
                    </span>
                  )}
                  {isStart && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded font-bold uppercase tracking-wide shadow-sm mr-2">
                      Start
                    </span>
                  )}
                  {isEnd && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded font-bold uppercase tracking-wide shadow-sm">
                      Destination
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
