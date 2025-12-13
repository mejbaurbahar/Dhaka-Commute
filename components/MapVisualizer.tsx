import React, { useEffect, useState, useRef } from 'react';
import { BusRoute, UserLocation } from '../types';
import { STATIONS, METRO_STATIONS, RAILWAY_STATIONS, AIRPORTS } from '../constants';
import { findNearestStation, getDistance } from '../services/locationService';
import { getTrafficColor, TrafficLevel } from '../services/trafficSimulator';
import { MapPin, Bus, Plus, Minus, Navigation, AlertCircle, Grip, ArrowUpRight, Train, Plane, Layers, X } from 'lucide-react';

interface MapVisualizerProps {
  route: BusRoute | null;
  userStationIndex?: number;
  userDistance?: number;
  highlightStartIdx?: number;
  highlightEndIdx?: number;
  userLocation?: UserLocation | null;
  tripDestination?: string; // ID of the final destination station if different from route end
  tripTransferPoint?: string; // ID of the transfer point station
}

const MapVisualizer: React.FC<MapVisualizerProps> = ({
  route,
  userStationIndex = -1,
  userDistance = Infinity,
  highlightStartIdx = -1,
  highlightEndIdx = -1,
  isReversed = false,
  userLocation,
  tripDestination,
  tripTransferPoint
}) => {
  const [simulationStep, setSimulationStep] = useState(0);

  // Layer visibility toggles - Metro off by default, others off
  const [showMetro, setShowMetro] = useState(false);
  const [showRailway, setShowRailway] = useState(false);
  const [showAirport, setShowAirport] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  // Responsive initial zoom: smaller on mobile for better overview
  const [zoom, setZoom] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 0.5 : 0.8; // Mobile: 0.5, Desktop: 0.8
    }
    return 0.8;
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Pinch-to-zoom state for mobile
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 0.5 : 0.8;
    }
    return 0.8;
  });

  const isUserFar = userDistance > 1000; // 1km threshold for "Far" connection line
  const showUserOnNode = userStationIndex !== -1 && !isUserFar;
  const hasHighlight = highlightStartIdx !== -1 && highlightEndIdx !== -1 && highlightStartIdx < highlightEndIdx;

  // Calculate global nearest station for display
  const globalNearestName = React.useMemo(() => {
    if (!userLocation) return null;
    const allStationIds = Object.keys(STATIONS);
    const nearest = findNearestStation(userLocation, allStationIds);
    return nearest ? nearest.station.name : null;
  }, [userLocation]);

  /*
    DATA PREPARATION
    Resolve station IDs to actual station objects from all available sources
  */
  const stations = React.useMemo(() => {
    if (!route) return [];
    return route.stops
      .map(id => STATIONS[id] || METRO_STATIONS[id] || RAILWAY_STATIONS[id] || AIRPORTS[id])
      .filter(Boolean); // Filter out any undefined stations
  }, [route]);

  // Auto-scroll to user location or start of highlight
  useEffect(() => {
    if (scrollContainerRef.current && route) {
      const baseWidth = Math.max(stations.length * 100, 1000);
      const padding = 60;

      let targetIndex = -1;

      if (hasHighlight) {
        targetIndex = highlightStartIdx;
      } else if (userStationIndex !== -1) {
        targetIndex = userStationIndex;
      }

      if (targetIndex !== -1) {
        const x = (targetIndex / (stations.length - 1)) * (baseWidth - (padding * 2)) + padding;
        const containerWidth = scrollContainerRef.current.clientWidth;
        const containerHeight = scrollContainerRef.current.clientHeight;
        const scaledX = x * zoom;

        // Center Horizontally
        const scrollX = scaledX - (containerWidth / 2);

        // Center Vertically
        const scrollY = (600 * zoom - containerHeight) / 2;

        scrollContainerRef.current.scrollTo({
          left: scrollX,
          top: scrollY,
          behavior: 'smooth'
        });
      }
    }
  }, [userStationIndex, hasHighlight, highlightStartIdx, zoom, route, userLocation]);

  if (!route) return (
    <div className="w-full h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
      <p>No route data available</p>
    </div>
  );



  // Simulation Logic (Visual effect only)
  useEffect(() => {
    if (stations.length < 2) return;
    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        const next = prev + 0.002; // Speed of bus
        return next > 1 ? 0 : next; // Loop for demo
      });
    }, 50);
    return () => clearInterval(interval);
  }, [stations.length]);

  // Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setStartY(e.pageY - scrollContainerRef.current.offsetTop);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const y = e.pageY - scrollContainerRef.current.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
    scrollContainerRef.current.scrollTop = scrollTop - walkY;
  };

  if (stations.length === 0) return <div>No station data</div>;

  const lats = stations.map(s => s.lat);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const normalizeLat = (val: number) => (val - minLat) / (maxLat - minLat || 1);

  // Base Dimensions
  const height = 600;
  const padding = 180; // Increased to prevent edge cutoff
  const baseWidth = Math.max(stations.length * 120, 1000);



  const nodePositions = stations.map((s, i) => {
    const x = (i / (stations.length - 1)) * (baseWidth - (padding * 2)) + padding;
    // Map lat to Y, centering it in the large height
    const mapContentHeight = 200;
    const y = (height - mapContentHeight) / 2 + (mapContentHeight - (normalizeLat(s.lat) * mapContentHeight));
    return { x, y };
  });

  // Calculate User Position and Dynamic Map Bounds
  let userPos: { x: number, y: number } | null = null;
  let layout = { width: baseWidth, height: height, shiftX: 0, shiftY: 0 };
  let nearestStationPosForLine: { x: number, y: number } | null = null;

  if (userLocation) {
    const lngs = stations.map(s => s.lng);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Calculate projected position
    const uX = ((userLocation.lng - minLng) / (maxLng - minLng || 1)) * (baseWidth - (padding * 2)) + padding;
    const uY = (height - 200) / 2 + (200 - (normalizeLat(userLocation.lat) * 200));

    userPos = { x: uX, y: uY };

    // Find nearest station position
    if (userStationIndex >= 0 && userStationIndex < nodePositions.length) {
      nearestStationPosForLine = nodePositions[userStationIndex];
    }

    if (isUserFar) {
      // CLAMPING LOGIC: Shorten the visual distance
      if (nearestStationPosForLine) {
        const dx = uX - nearestStationPosForLine.x;
        const dy = uY - nearestStationPosForLine.y;
        const distance = Math.hypot(dx, dy);
        const maxVisualDistance = 150; // Much tighter clamp (150px) to prevent long scroll

        if (distance > maxVisualDistance) {
          const ratio = maxVisualDistance / distance;
          // Update userPos to be closer
          userPos = {
            x: nearestStationPosForLine.x + dx * ratio,
            y: nearestStationPosForLine.y + dy * ratio
          };
        }
      }

      // Re-calculate bounds based on the CLAMPED position
      const contentMinX = Math.min(0, userPos.x - padding);
      const contentMaxX = Math.max(baseWidth, userPos.x + padding);
      const contentMinY = Math.min(0, userPos.y - padding);
      const contentMaxY = Math.max(height, userPos.y + padding);

      layout = {
        width: contentMaxX - contentMinX,
        height: contentMaxY - contentMinY,
        shiftX: -contentMinX,
        shiftY: -contentMinY
      };
    }
  }

  // Adjusted dimensions for Zoom
  const zoomedWidth = layout.width * zoom;
  const zoomedHeight = layout.height * zoom;
  const metroConnections = React.useMemo(() => {
    const connections: Array<{
      metroStation: typeof METRO_STATIONS[keyof typeof METRO_STATIONS],
      busStopIndex: number,
      distance: number,
      metroX: number,
      metroY: number
    }> = [];

    Object.values(METRO_STATIONS).forEach(metro => {
      let minDistance = Infinity;
      let nearestBusStopIndex = -1;

      stations.forEach((station, idx) => {
        const d = Math.hypot(station.lat - metro.lat, station.lng - metro.lng);
        if (d < minDistance) {
          minDistance = d;
          nearestBusStopIndex = idx;
        }
      });

      // If close enough (approx < 2km), show connection
      if (minDistance < 0.02 && nearestBusStopIndex !== -1) {
        const busStopPos = nodePositions[nearestBusStopIndex];
        // Position metro relative to bus stop, but offset
        // We use a fixed offset direction for simplicity, or random based on ID
        const offsetX = (metro.lng > stations[nearestBusStopIndex].lng ? 1 : -1) * 60;
        const offsetY = (metro.lat > stations[nearestBusStopIndex].lat ? -1 : 1) * 60;

        connections.push({
          metroStation: metro,
          busStopIndex: nearestBusStopIndex,
          distance: minDistance,
          metroX: busStopPos.x + offsetX,
          metroY: busStopPos.y + offsetY
        });
      }
    });

    return connections;
  }, [stations, nodePositions]);

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  // Destination Logic

  const destStation = tripDestination ? STATIONS[tripDestination] : null;
  const isDestOnRoute = destStation && stations.some(s => s.id === tripDestination);
  const alightIdx = hasHighlight ? highlightEndIdx : (stations.length - 1);
  const alightPos = (alightIdx >= 0 && alightIdx < nodePositions.length) ? nodePositions[alightIdx] : null;

  return (
    <div className="w-full h-80 md:h-[500px] bg-slate-50 border-t border-b border-gray-100 relative group overflow-hidden">

      {/* Connection Line Info Badge */}
      {isUserFar && (userStationIndex !== -1 || hasHighlight) && (
        <div className="absolute top-4 left-4 z-20 bg-orange-50/90 backdrop-blur border border-orange-200 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-pulse max-w-[200px]">
          <ArrowUpRight className="w-5 h-5 text-orange-600 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-orange-800 uppercase">Outside Route</p>
            <p className="text-xs font-medium text-orange-900 leading-tight">
              Go {
                hasHighlight && highlightStartIdx !== -1 && userLocation && nodePositions[highlightStartIdx]
                  ? (getDistance(userLocation, stations[highlightStartIdx]) / 1000).toFixed(1)
                  : (userDistance / 1000).toFixed(1)
              }km to start at <b>{hasHighlight && highlightStartIdx !== -1 ? stations[highlightStartIdx].name : stations[userStationIndex].name}</b>
            </p>
            {globalNearestName && (
              <p className="text-[10px] text-orange-800 mt-1 border-t border-orange-200 pt-1">
                Near: <b>{globalNearestName}</b>
              </p>
            )}
          </div>
        </div>
      )}



      {/* Bottom Left - Layer Toggles */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 items-start">

        {/* Collapsible Panel */}
        {showLayers && (
          <div className="bg-white/95 backdrop-blur rounded-xl border border-gray-200 shadow-xl p-3 w-[180px] mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Map Layers</p>
              <button onClick={() => setShowLayers(false)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors group">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${showMetro ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'}`}>
                  {showMetro && <Train className="w-2.5 h-2.5 text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={showMetro}
                  onChange={(e) => setShowMetro(e.target.checked)}
                  className="hidden"
                />
                <span className="text-[11px] font-medium text-gray-700 group-hover:text-gray-900">Metro Rail</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors group">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${showRailway ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`}>
                  {showRailway && <Train className="w-2.5 h-2.5 text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={showRailway}
                  onChange={(e) => setShowRailway(e.target.checked)}
                  className="hidden"
                />
                <span className="text-[11px] font-medium text-gray-700 group-hover:text-gray-900">Railway</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors group">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${showAirport ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'}`}>
                  {showAirport && <Plane className="w-2.5 h-2.5 text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={showAirport}
                  onChange={(e) => setShowAirport(e.target.checked)}
                  className="hidden"
                />
                <span className="text-[11px] font-medium text-gray-700 group-hover:text-gray-900">Airports</span>
              </label>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setShowLayers(!showLayers)}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-lg transition-all duration-300 group ${showLayers
            ? 'bg-gray-900 border-gray-900 text-white'
            : 'bg-white/95 backdrop-blur border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
        >
          <Layers className={`w-4 h-4 ${!showLayers && 'group-hover:scale-110 transition-transform'}`} />
          <span className="text-xs font-bold">Layers</span>
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={`w-full h-full overflow-auto no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        // Touch events for mobile drag and pinch-to-zoom
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            // Single touch - drag
            const touch = e.touches[0];
            setStartX(touch.pageX - scrollContainerRef.current!.offsetLeft);
            setStartY(touch.pageY - scrollContainerRef.current!.offsetTop);
            setScrollLeft(scrollContainerRef.current!.scrollLeft);
            setScrollTop(scrollContainerRef.current!.scrollTop);
          } else if (e.touches.length === 2) {
            // Two fingers - pinch to zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
              touch2.pageX - touch1.pageX,
              touch2.pageY - touch1.pageY
            );
            setInitialPinchDistance(distance);
            setInitialZoom(zoom);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1 && initialPinchDistance === null) {
            // Single touch - drag
            const touch = e.touches[0];
            const x = touch.pageX - scrollContainerRef.current!.offsetLeft;
            const y = touch.pageY - scrollContainerRef.current!.offsetTop;
            const walkX = (x - startX) * 1.5;
            const walkY = (y - startY) * 1.5;
            scrollContainerRef.current!.scrollLeft = scrollLeft - walkX;
            scrollContainerRef.current!.scrollTop = scrollTop - walkY;
          } else if (e.touches.length === 2 && initialPinchDistance !== null) {
            // Two fingers - pinch to zoom
            e.preventDefault(); // Prevent default pinch behavior
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.hypot(
              touch2.pageX - touch1.pageX,
              touch2.pageY - touch1.pageY
            );
            const scale = currentDistance / initialPinchDistance;
            const newZoom = Math.max(0.5, Math.min(2.5, initialZoom * scale));
            setZoom(newZoom);
          }
        }}
        onTouchEnd={() => {
          setInitialPinchDistance(null);
        }}
      >
        <div style={{ width: `${zoomedWidth}px`, height: `${zoomedHeight}px` }} className="relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] transition-all duration-500 ease-out origin-top-left min-w-full">
          <svg className="w-full h-full block select-none pointer-events-none" viewBox={`0 0 ${layout.width} ${layout.height}`} preserveAspectRatio="xMinYMid meet">

            <g transform={`translate(${layout.shiftX}, ${layout.shiftY})`}>

              {/* Connection Line layer - Render Highlight FIRST (Below Route) */}
              {userPos && ((nearestStationPosForLine && isUserFar) || (hasHighlight && highlightStartIdx !== -1 && nodePositions[highlightStartIdx])) && (
                <g className="animate-in fade-in duration-700">
                  {/* Actual Dashed Line - Thinner and cleaner to avoid overlap */}
                  <line
                    x1={userPos.x}
                    y1={userPos.y}
                    x2={hasHighlight && highlightStartIdx !== -1 ? nodePositions[highlightStartIdx].x : nearestStationPosForLine!.x}
                    y2={hasHighlight && highlightStartIdx !== -1 ? nodePositions[highlightStartIdx].y : nearestStationPosForLine!.y}
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-60"
                  />
                </g>
              )}

              {/* Base Path (Grey) */}
              <polyline
                points={nodePositions.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-100"
              />

              {/* Traffic-Aware Route Segments */}
              {!hasHighlight && nodePositions.map((pos, idx) => {
                if (idx === nodePositions.length - 1) return null;

                // Always use 'free' traffic as requested
                const trafficLevel = 'free';
                const segmentColor = getTrafficColor(trafficLevel);

                return (
                  <line
                    key={`traffic-segment-${idx}`}
                    x1={pos.x}
                    y1={pos.y}
                    x2={nodePositions[idx + 1].x}
                    y2={nodePositions[idx + 1].y}
                    stroke={segmentColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-100 transition-all duration-500"
                  />
                );
              })}

              {hasHighlight && (
                <polyline
                  points={nodePositions.slice(highlightStartIdx, highlightEndIdx + 1).map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#006a4e"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-100 shadow-lg"
                />
              )}

              {/* Past Path (Greyed Out) */}
              {showUserOnNode && !hasHighlight && (
                <polyline
                  points={nodePositions.slice(0, userStationIndex + 1).map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-100"
                />
              )}

              {/* Stations */}
              {stations.map((s, idx) => {
                const { x, y } = nodePositions[idx];

                const isPassed = showUserOnNode && idx < userStationIndex;
                const isCurrent = showUserOnNode && idx === userStationIndex;
                const isNearestButFar = isUserFar && idx === userStationIndex;
                const isStart = idx === 0;
                const isEnd = idx === stations.length - 1;
                const isHighlighted = hasHighlight && idx >= highlightStartIdx && idx <= highlightEndIdx;

                const isHighlightStart = hasHighlight && idx === highlightStartIdx;
                const isHighlightEnd = hasHighlight && idx === highlightEndIdx;
                // "Start Here" suggestion when user is far
                const isUserConnectionStart = !hasHighlight && isUserFar && idx === userStationIndex;

                // Old Variable for compatibility with ripple logic if needed, but we'll update that too
                const isStartHereTarget = isHighlightStart || isUserConnectionStart;

                let fill = "white";
                let stroke = hasHighlight ? "#e5e7eb" : "#006a4e";
                let r = 5;

                if (isHighlighted) {
                  fill = "white";
                  stroke = "#006a4e";
                  r = 6;
                  if (idx === highlightStartIdx || idx === highlightEndIdx) {
                    fill = "#006a4e";
                    stroke = "white";
                    r = 8;
                  }
                } else if (!hasHighlight) {
                  if (isCurrent) {
                    fill = "#f42a41";
                    stroke = "#f42a41";
                    r = 8;
                  } else if (isNearestButFar) {
                    fill = "#fb923c";
                    stroke = "#c2410c";
                    r = 8;
                  } else if (isPassed) {
                    fill = "#e2e8f0";
                    stroke = "#cbd5e1";
                  } else if (isStart || isEnd) {
                    r = 7;
                    stroke = "#1f2937";
                  }
                }

                return (
                  <g key={s.id} className={`cursor-pointer group/node pointer-events-auto ${isHighlighted || !hasHighlight ? 'opacity-100' : 'opacity-50'}`}>
                    {/* Hover Hit Area */}
                    <circle cx={x} cy={y} r={25} fill="transparent" />

                    {/* Current Location Ripple */}
                    {isCurrent && !hasHighlight && (
                      <circle cx={x} cy={y} r={20} fill="#f42a41" opacity="0.2">
                        <animate attributeName="r" from="8" to="30" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Connect target ripple */}
                    {(isHighlightStart || isUserConnectionStart) && (
                      <circle cx={x} cy={y} r={20} fill={isHighlightStart ? "#16a34a" : "#f97316"} opacity="0.2">
                        <animate attributeName="r" from="8" to="25" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Visible Node */}
                    <circle
                      cx={x}
                      cy={y}
                      r={r}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="2.5"
                      className="transition-all duration-300 group-hover/node:r-8"
                    />

                    {/* Label */}
                    {/* SVG Label */}
                    <g className="transition-all duration-300 opacity-100">
                      {/* Background Pill */}
                      <rect
                        x={x - (s.name.length * 3 + 10)}
                        y={idx % 2 === 0 ? y + 14 : y - 34}
                        width={s.name.length * 6 + 20}
                        height="20"
                        rx="4"
                        fill="white"
                        stroke={isCurrent ? "#ef4444" : (isHighlightStart || isUserConnectionStart) ? (isHighlightStart ? "#16a34a" : "#f97316") : isHighlightEnd ? "#ef4444" : isHighlighted ? "#e5e7eb" : "#f1f5f9"}
                        strokeWidth="1"
                        className="drop-shadow-sm"
                      />

                      {/* Text Name */}
                      <text
                        x={x}
                        y={idx % 2 === 0 ? y + 28 : y - 20}
                        textAnchor="middle"
                        className={`text-[10px] font-bold fill-gray-700 pointer-events-none select-none`}
                        style={{ fontSize: '10px' }}
                      >
                        {s.name}
                      </text>

                      {/* Status Badge (You/Dest) */}
                      {isCurrent && (
                        <g transform={`translate(${x}, ${idx % 2 === 0 ? y + 42 : y - 48})`}>
                          <rect x="-14" y="-7" width="28" height="14" rx="3" fill="#ef4444" />
                          <text x="0" y="3" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">YOU</text>
                        </g>
                      )}

                      {/* TRANSIT Badge logic (Prioritized over Dest/Start for intermediate stops) */}
                      {tripTransferPoint === s.id && (
                        <g transform={`translate(${x}, ${idx % 2 === 0 ? y + 42 : y - 48})`}>
                          <rect x="-20" y="-7" width="40" height="14" rx="3" fill="#6366f1" />
                          <text x="0" y="3" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TRANSIT</text>
                        </g>
                      )}

                      {/* Destination Badge Logic: 
                          If NOT reversed: Destination is at highlightEndIdx
                          If reversed: Destination is at highlightStartIdx
                          Only show if NOT a transit point (unless it's the final trip destination)
                      */}
                      {(tripDestination === s.id || ((isReversed ? isHighlightStart : isHighlightEnd) && s.id !== tripTransferPoint)) && (
                        <g transform={`translate(${x}, ${idx % 2 === 0 ? y + 42 : y - 48})`}>
                          <rect x="-26" y="-7" width="52" height="14" rx="3" fill="#ef4444" />
                          <text x="0" y="3" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">DESTINATION</text>
                        </g>
                      )}

                      {/* Start Badge Logic:
                          If NOT reversed: Start is at highlightStartIdx
                          If reversed: Start is at highlightEndIdx
                          Only show if NOT a transit point.
                      */}
                      {((isReversed ? isHighlightEnd : isHighlightStart) && s.id !== tripTransferPoint) && (
                        <g transform={`translate(${x}, ${idx % 2 === 0 ? y + 42 : y - 48})`}>
                          <rect x="-18" y="-7" width="36" height="14" rx="3" fill="#16a34a" />
                          <text x="0" y="3" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">START</text>
                        </g>
                      )}

                      {isUserConnectionStart && (
                        <g transform={`translate(${x}, ${idx % 2 === 0 ? y + 42 : y - 48})`}>
                          <rect x="-24" y="-7" width="48" height="14" rx="3" fill="#f97316" />
                          <text x="0" y="3" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">START HERE</text>
                        </g>
                      )}
                    </g>


                  </g>
                );
              })}

              {/* Off-Route Destination Visualization */}
              {!isDestOnRoute && destStation && alightPos && (
                <g className="animate-in fade-in zoom-in duration-700">
                  {/* Dashed Line from Alight Stop to Destination */}
                  <line
                    x1={alightPos.x}
                    y1={alightPos.y}
                    x2={alightPos.x + 150} // 150px to the right
                    y2={alightPos.y}
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    className="opacity-60"
                  />
                  {/* Arrow head */}
                  <path d={`M${alightPos.x + 140},${alightPos.y - 4} L${alightPos.x + 150},${alightPos.y} L${alightPos.x + 140},${alightPos.y + 4}`} fill="#ef4444" opacity="0.6" />

                  {/* Destination Node */}
                  <g className="cursor-pointer group/dest">
                    <circle
                      cx={alightPos.x + 150}
                      cy={alightPos.y}
                      r={10}
                      fill="#ef4444"
                      stroke="white"
                      strokeWidth="3"
                      className="shadow-lg"
                    />
                    <foreignObject
                      x={alightPos.x + 150 - 60}
                      y={alightPos.y + 18}
                      width="120"
                      height="60"
                      className="overflow-visible"
                    >
                      <div className="flex flex-col items-center">
                        <div className="px-3 py-1.5 rounded-lg shadow-md bg-dhaka-red text-white border border-red-600 text-xs font-bold whitespace-nowrap mb-1">
                          {destStation.name}
                        </div>
                        <div className="text-[9px] font-bold text-red-600 bg-white/90 px-1.5 rounded-full border border-red-100 shadow-sm">
                          FINAL STOP
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                </g>
              )}

              {/* Metro Stations */}
              {showMetro && metroConnections.map((connection, idx) => {
                const { metroStation, busStopIndex, distance, metroX, metroY } = connection;
                const busStopPos = nodePositions[busStopIndex];

                return (
                  <g key={metroStation.id} className="pointer-events-auto">
                    {/* Connection Line to Bus Stop */}
                    <line
                      x1={busStopPos.x}
                      y1={busStopPos.y}
                      x2={metroX}
                      y2={metroY}
                      stroke="#9333ea"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-60"
                    />

                    {/* Metro Station Node */}
                    <circle
                      cx={metroX}
                      cy={metroY}
                      r="18"
                      fill="#f3e8ff"
                      className="opacity-30"
                    >
                      <animate attributeName="r" from="18" to="25" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>

                    <circle
                      cx={metroX}
                      cy={metroY}
                      r="10"
                      fill="#9333ea"
                      stroke="white"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:r-12 transition-all"
                    />

                    {/* Train Icon */}
                    <foreignObject x={metroX - 6} y={metroY - 6} width="12" height="12" className="pointer-events-none">
                      <Train className="w-3 h-3 text-white" />
                    </foreignObject>

                    {/* Metro Station Label */}
                    <foreignObject
                      x={metroX - 100}
                      y={metroY + 15}
                      width="200"
                      height="40"
                      className="pointer-events-none"
                    >
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold shadow-sm">
                          {metroStation.name}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Railway Stations (Fix Issue #6) */}
              {showRailway && Object.values(RAILWAY_STATIONS).map(station => {
                // Find nearest bus stop for positioning
                let minDist = Infinity;
                let nearestIdx = 0;
                stations.forEach((s, idx) => {
                  const d = Math.hypot(s.lat - station.lat, s.lng - station.lng);
                  if (d < minDist) {
                    minDist = d;
                    nearestIdx = idx;
                  }
                });

                if (minDist > 0.05) return null; // Too far from route

                const busPos = nodePositions[nearestIdx];
                const offsetX = (station.lng > stations[nearestIdx].lng ? 1 : -1) * 70;
                const offsetY = (station.lat > stations[nearestIdx].lat ? -1 : 1) * 70;
                const railX = busPos.x + offsetX;
                const railY = busPos.y + offsetY;

                return (
                  <g key={station.id} className="pointer-events-auto">
                    {/* Connection Line */}
                    <line
                      x1={busPos.x}
                      y1={busPos.y}
                      x2={railX}
                      y2={railY}
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-60"
                    />

                    {/* Railway Station Ripple */}
                    <circle cx={railX} cy={railY} r="18" fill="#dcfce7" className="opacity-30">
                      <animate attributeName="r" from="18" to="25" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Railway Station Node */}
                    <circle
                      cx={railX}
                      cy={railY}
                      r="10"
                      fill="#22c55e"
                      stroke="white"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:r-12 transition-all"
                    />

                    {/* Train Icon */}
                    <foreignObject x={railX - 6} y={railY - 6} width="12" height="12" className="pointer-events-none">
                      <Train className="w-3 h-3 text-white" />
                    </foreignObject>

                    {/* Label */}
                    <foreignObject x={railX - 100} y={railY + 15} width="200" height="40" className="pointer-events-none">
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <span className="px-2 py-0.5 rounded bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold shadow-sm">
                          {station.name}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Airports (Fix Issue #6) */}
              {showAirport && Object.values(AIRPORTS).map(airport => {
                // Find nearest bus stop for positioning
                let minDist = Infinity;
                let nearestIdx = 0;
                stations.forEach((s, idx) => {
                  const d = Math.hypot(s.lat - airport.lat, s.lng - airport.lng);
                  if (d < minDist) {
                    minDist = d;
                    nearestIdx = idx;
                  }
                });

                if (minDist > 0.1) return null; // Too far from route

                const busPos = nodePositions[nearestIdx];
                const offsetX = (airport.lng > stations[nearestIdx].lng ? 1 : -1) * 80;
                const offsetY = (airport.lat > stations[nearestIdx].lat ? -1 : 1) * 80;
                const airX = busPos.x + offsetX;
                const airY = busPos.y + offsetY;

                return (
                  <g key={airport.id} className="pointer-events-auto">
                    {/* Connection Line */}
                    <line
                      x1={busPos.x}
                      y1={busPos.y}
                      x2={airX}
                      y2={airY}
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-60"
                    />

                    {/* Airport Ripple */}
                    <circle cx={airX} cy={airY} r="18" fill="#ffedd5" className="opacity-30">
                      <animate attributeName="r" from="18" to="25" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Airport Node */}
                    <circle
                      cx={airX}
                      cy={airY}
                      r="10"
                      fill="#f97316"
                      stroke="white"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:r-12 transition-all"
                    />

                    {/* Plane Icon */}
                    <foreignObject x={airX - 6} y={airY - 6} width="12" height="12" className="pointer-events-none">
                      <Plane className="w-3 h-3 text-white" />
                    </foreignObject>

                    {/* Label */}
                    <foreignObject x={airX - 100} y={airY + 15} width="200" height="40" className="pointer-events-none">
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <span className="px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-bold shadow-sm">
                          {airport.name}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Simulation Bus */}
              {hasHighlight && (
                <g transform={`translate(${
                  // Interpolate position along the highlighted path
                  (() => {
                    const totalSegments = highlightEndIdx - highlightStartIdx;
                    const segmentIndex = Math.floor(simulationStep * totalSegments);
                    const segmentProgress = (simulationStep * totalSegments) % 1;

                    const currentIdx = highlightStartIdx + segmentIndex;
                    if (currentIdx >= highlightEndIdx) return nodePositions[highlightEndIdx].x;

                    const p1 = nodePositions[currentIdx];
                    const p2 = nodePositions[currentIdx + 1];
                    return p1.x + (p2.x - p1.x) * segmentProgress;
                  })()
                  }, ${(() => {
                    const totalSegments = highlightEndIdx - highlightStartIdx;
                    const segmentIndex = Math.floor(simulationStep * totalSegments);
                    const segmentProgress = (simulationStep * totalSegments) % 1;

                    const currentIdx = highlightStartIdx + segmentIndex;
                    if (currentIdx >= highlightEndIdx) return nodePositions[highlightEndIdx].y;

                    const p1 = nodePositions[currentIdx];
                    const p2 = nodePositions[currentIdx + 1];
                    return p1.y + (p2.y - p1.y) * segmentProgress;
                  })()
                  })`}>
                  <circle r="12" fill="#006a4e" className="animate-pulse opacity-50" />
                  <circle r="8" fill="#006a4e" stroke="white" strokeWidth="2" />
                  <foreignObject x="-6" y="-6" width="12" height="12">
                    <Bus className="w-3 h-3 text-white" />
                  </foreignObject>
                </g>
              )}

              {/* User GPS Marker: Only show if user is FAR from any station on the route (>1km) */}
              {userLocation && isUserFar && userPos && (() => {
                // Only render this separate GPS marker if user is far from route
                // If they're at a station, the red marker on the station is enough

                return (
                  <g>
                    {/* Pulsing Circle Animation */}
                    <circle cx={userPos?.x || 0} cy={userPos?.y || 0} r="15" fill="#3b82f6" className="opacity-30">
                      <animate attributeName="r" from="15" to="25" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>

                    {/* User Location Marker */}
                    <circle
                      cx={userPos?.x || 0}
                      cy={userPos?.y || 0}
                      r="8"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="3"
                      className="cursor-pointer"
                    />

                    {/* Inner dot */}
                    <circle
                      cx={userPos?.x || 0}
                      cy={userPos?.y || 0}
                      r="3"
                      fill="white"
                    />

                    {/* Label */}
                    <foreignObject
                      x={(userPos?.x || 0) - 80}
                      y={(userPos?.y || 0) + 15}
                      width="160"
                      height="40"
                      className="pointer-events-none"
                    >
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold shadow-lg truncate max-w-full">
                          {globalNearestName || "You are here"}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })()}

            </g>
          </svg>
        </div>
      </div>
    </div >
  );
};

export default MapVisualizer;
