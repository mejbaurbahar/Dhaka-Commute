
import React, { useEffect, useState, useRef } from 'react';
import { BusRoute } from '../types';
import { STATIONS } from '../constants';
import { MapPin, Bus, Plus, Minus, Navigation, AlertCircle } from 'lucide-react';

interface MapVisualizerProps {
  route: BusRoute | null;
  userStationIndex?: number;
  userDistance?: number;
}

const MapVisualizer: React.FC<MapVisualizerProps> = ({ route, userStationIndex = -1, userDistance = Infinity }) => {
  const [simulationStep, setSimulationStep] = useState(0);
  const [zoom, setZoom] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const isUserFar = userDistance > 2000; // 2km threshold
  const showUserOnNode = userStationIndex !== -1 && !isUserFar;

  // Auto-scroll to user location when detected and on route
  useEffect(() => {
    if (showUserOnNode && scrollContainerRef.current && route) {
      const stations = route.stops.map(id => STATIONS[id]).filter(Boolean);
      // Dimensions matching the render logic below
      const baseWidth = Math.max(stations.length * 80, 800);
      const padding = 40;
      
      // Calculate position of the user's station
      const x = (userStationIndex / (stations.length - 1)) * (baseWidth - (padding * 2)) + padding;
      
      // Calculate scroll position to center the node (approximate)
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scaledX = x * zoom;
      const scrollPos = scaledX - (containerWidth / 2);

      scrollContainerRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [userStationIndex, zoom, route, showUserOnNode]);

  if (!route) return (
    <div className="w-full h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
      <p>No route data available</p>
    </div>
  );

  const stations = route.stops.map(id => STATIONS[id]).filter(Boolean);
  
  // Simulation Logic
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
    const walkX = (x - startX) * 1.5; // Scroll speed multiplier
    const walkY = (y - startY) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
    scrollContainerRef.current.scrollTop = scrollTop - walkY;
  };

  if (stations.length === 0) return <div>No station data</div>;

  const lats = stations.map(s => s.lat);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const normalizeLat = (val: number) => (val - minLat) / (maxLat - minLat || 1);

  // Fixed base height for the SVG coordinate system
  const height = 250; 
  const padding = 40;
  const baseWidth = Math.max(stations.length * 80, 800); 
  
  // Dynamic dimensions based on zoom
  const zoomedWidth = baseWidth * zoom;
  const zoomedHeight = height * zoom;

  const nodePositions = stations.map((s, i) => {
    const x = (i / (stations.length - 1)) * (baseWidth - (padding * 2)) + padding;
    const y = height - (normalizeLat(s.lat) * (height - (padding * 2)) + padding);
    return { x, y };
  });

  const totalSegments = stations.length - 1;
  const exactProgress = simulationStep * totalSegments;
  const currentSegmentIndex = Math.floor(exactProgress);
  const segmentProgress = exactProgress - currentSegmentIndex;

  let busX = 0;
  let busY = 0;

  if (currentSegmentIndex >= 0 && currentSegmentIndex < totalSegments) {
    const startNode = nodePositions[currentSegmentIndex];
    const endNode = nodePositions[currentSegmentIndex + 1];
    busX = startNode.x + (endNode.x - startNode.x) * segmentProgress;
    busY = startNode.y + (endNode.y - startNode.y) * segmentProgress;
  }

  const googleMapsUrl = React.useMemo(() => {
    if (stations.length < 2) return '';
    const origin = `${stations[0].lat},${stations[0].lng}`;
    const destination = `${stations[stations.length - 1].lat},${stations[stations.length - 1].lng}`;
    const midPoints = stations.slice(1, -1)
      .filter((_, i) => i % Math.ceil(stations.length / 8) === 0)
      .map(s => `${s.lat},${s.lng}`).join('|');
    
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${midPoints}&travelmode=transit`;
  }, [stations]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="w-full h-64 md:h-96 bg-slate-50 border-t border-b border-gray-100 relative group overflow-hidden">
      
      {/* Distance Warning if Far */}
      {isUserFar && userStationIndex !== -1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-orange-50/90 backdrop-blur border border-orange-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
           <AlertCircle className="w-4 h-4 text-orange-600" />
           <p className="text-xs font-bold text-orange-800">
             {(userDistance / 1000).toFixed(1)}km from nearest stop ({stations[userStationIndex].name})
           </p>
        </div>
      )}

      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-10">
        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-blue-600 shadow-sm flex items-center gap-1 hover:bg-blue-50 transition-colors"
        >
          <Navigation className="w-3 h-3" /> Real Map
        </a>
      </div>

      {/* Bottom Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-1 bg-white/90 backdrop-blur rounded-lg border border-gray-200 shadow-sm p-1">
          <button 
            onClick={handleZoomOut} 
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 text-gray-600 transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-px bg-gray-200 my-1"></div>
          <button 
            onClick={handleZoomIn} 
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 text-gray-600 transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
      </div>
      
      {/* Scrollable Container with Fixed Height */}
      <div 
        ref={scrollContainerRef}
        className={`w-full h-full overflow-auto no-scrollbar scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div style={{ width: `${zoomedWidth}px`, height: `${zoomedHeight}px` }} className="relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] transition-all duration-300 origin-top-left">
          <svg className="w-full h-full block select-none pointer-events-none" viewBox={`0 0 ${baseWidth} ${height}`}>
            {/* Future Path (Colored) */}
            <polyline
              points={nodePositions.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#006a4e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-100"
            />
            
            {/* Past Path (Greyed Out) if user location is known AND near */}
            {showUserOnNode && (
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

              let fill = "white";
              let stroke = "#006a4e";
              let r = 5;

              if (isCurrent) {
                fill = "#f42a41";
                stroke = "#f42a41";
                r = 8;
              } else if (isNearestButFar) {
                 fill = "#fb923c"; // Orange for "Nearest but Far"
                 stroke = "#c2410c";
                 r = 7;
              } else if (isPassed) {
                fill = "#e2e8f0";
                stroke = "#cbd5e1";
              } else if (isStart || isEnd) {
                r = 7;
                stroke = "#1f2937";
              }

              return (
                <g key={s.id} className="cursor-pointer group/node pointer-events-auto">
                  {/* Hover Hit Area */}
                  <circle cx={x} cy={y} r={20} fill="transparent" />
                  
                  {/* Current Location Ripple Effect */}
                  {isCurrent && (
                     <circle cx={x} cy={y} r={20} fill="#f42a41" opacity="0.2">
                        <animate attributeName="r" from="8" to="30" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
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
                  <foreignObject 
                    x={x - 60} 
                    y={idx % 2 === 0 ? y + 15 : y - 45} 
                    width="120" 
                    height="40"
                    className="pointer-events-none"
                  >
                     <div className={`text-center text-[10px] font-medium leading-tight flex flex-col items-center justify-center h-full ${isCurrent ? 'text-dhaka-red font-bold' : isPassed ? 'text-gray-400' : 'text-gray-600'}`}>
                       <span className={`px-2 py-0.5 rounded backdrop-blur-sm truncate max-w-full shadow-sm border ${isCurrent ? 'bg-red-50 border-red-100 text-red-600 scale-110' : isNearestButFar ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-white/80 border-gray-100/50'}`}>
                         {s.name}
                         {isCurrent && <span className="block text-[8px] uppercase font-bold mt-0.5">You are here</span>}
                         {isNearestButFar && <span className="block text-[8px] uppercase font-bold mt-0.5">Nearest</span>}
                       </span>
                     </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Simulated Bus - Only show if not passed or in demo mode */}
             <g style={{ transform: `translate(${busX}px, ${busY}px)` }} className="transition-transform duration-75 ease-linear pointer-events-none">
                <circle r="14" fill="#f42a41" className="shadow-lg opacity-20 animate-ping" />
                <circle r="10" fill="white" stroke="#f42a41" strokeWidth="2" />
                <foreignObject x="-6" y="-6" width="12" height="12">
                   <Bus className="w-3 h-3 text-dhaka-red" />
                </foreignObject>
             </g>

          </svg>
        </div>
      </div>
    </div>
  );
};

export default MapVisualizer;
