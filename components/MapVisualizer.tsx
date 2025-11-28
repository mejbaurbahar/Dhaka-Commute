
import React, { useEffect, useState, useRef } from 'react';
import { BusRoute, UserLocation } from '../types';
import { STATIONS, METRO_STATIONS, RAILWAY_STATIONS, AIRPORTS } from '../constants';
import { findNearestStation } from '../services/locationService';
import { getSegmentTrafficLevel, getTrafficColor } from '../services/trafficSimulator';
import { MapPin, Bus, Plus, Minus, Navigation, AlertCircle, Grip, ArrowUpRight, Train, Plane } from 'lucide-react';

interface MapVisualizerProps {
  route: BusRoute | null;
  userStationIndex?: number;
  userDistance?: number;
  highlightStartIdx?: number;
  highlightEndIdx?: number;
  isReversed?: boolean;
  userLocation?: UserLocation | null;
}

const MapVisualizer: React.FC<MapVisualizerProps> = ({
  route,
  userStationIndex = -1,
  userDistance = Infinity,
  highlightStartIdx = -1,
  highlightEndIdx = -1,
  isReversed = false,
  userLocation
}) => {
  const [simulationStep, setSimulationStep] = useState(0);
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

  // Layer visibility toggles - Metro off by default, others off
  const [showMetro, setShowMetro] = useState(false);
  const [showRailway, setShowRailway] = useState(false);
  const [showAirport, setShowAirport] = useState(false);

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

  // Auto-scroll to user location or start of highlight
  useEffect(() => {
    if (scrollContainerRef.current && route) {
      const stations = route.stops.map(id => STATIONS[id]).filter(Boolean);
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
  const padding = 120; // Increased to prevent edge cutoff
  const baseWidth = Math.max(stations.length * 120, 1000);

  // Dynamic dimensions based on zoom
  const zoomedWidth = baseWidth * zoom;
  const zoomedHeight = height * zoom;

  const nodePositions = stations.map((s, i) => {
    const x = (i / (stations.length - 1)) * (baseWidth - (padding * 2)) + padding;
    // Map lat to Y, centering it in the large height
    const mapContentHeight = 200;
    const y = (height - mapContentHeight) / 2 + (mapContentHeight - (normalizeLat(s.lat) * mapContentHeight));
    return { x, y };
  });

  // Calculate nearby metro stations and their positions
  const metroConnections = React.useMemo(() => {
    const connections: Array<{
      metroStation: typeof METRO_STATIONS[string];
      busStopIndex: number;
      distance: number;
      metroX: number;
      metroY: number;
    }> = [];

    Object.values(METRO_STATIONS).forEach(metroStation => {
      let closestDistance = Infinity;
      let closestIndex = -1;

      stations.forEach((busStation, idx) => {
        const R = 6371e3;
        const φ1 = (busStation.lat * Math.PI) / 180;
        const φ2 = (metroStation.lat * Math.PI) / 180;
        const Δφ = ((metroStation.lat - busStation.lat) * Math.PI) / 180;
        const Δλ = ((metroStation.lng - busStation.lng) * Math.PI) / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      // Only show metros within 2km of route
      if (closestDistance < 2000 && closestIndex !== -1) {
        connections.push({
          metroStation,
          busStopIndex: closestIndex,
          distance: closestDistance,
          metroX: 0, // Will be calculated after grouping
          metroY: 0
        });
      }
    });

    // Group metros by their nearest bus stop to prevent overlap
    const groupedByStop: Record<number, typeof connections> = {};
    connections.forEach(conn => {
      if (!groupedByStop[conn.busStopIndex]) {
        groupedByStop[conn.busStopIndex] = [];
      }
      groupedByStop[conn.busStopIndex].push(conn);
    });

    // Position metros to avoid overlap
    Object.entries(groupedByStop).forEach(([stopIdx, metros]) => {
      const busStopPos = nodePositions[parseInt(stopIdx)];
      const metroCount = metros.length;

      metros.forEach((metro, idx) => {
        if (metroCount === 1) {
          // Single metro - position above or below based on stop index
          const offsetY = parseInt(stopIdx) % 2 === 0 ? -100 : 100;
          metro.metroX = busStopPos.x;
          metro.metroY = busStopPos.y + offsetY;
        } else if (metroCount === 2) {
          // Two metros - spread horizontally with more space
          const offsetX = idx === 0 ? -120 : 120;
          const offsetY = parseInt(stopIdx) % 2 === 0 ? -100 : 100;
          metro.metroX = busStopPos.x + offsetX;
          metro.metroY = busStopPos.y + offsetY;
        } else if (metroCount === 3) {
          // Three metros - wider horizontal spread
          const positions = [-150, 0, 150]; // Left, center, right
          const offsetX = positions[idx];
          const offsetY = -110; // All above, slightly higher
          metro.metroX = busStopPos.x + offsetX;
          metro.metroY = busStopPos.y + offsetY;
        } else {
          // Four or more metros - wider arc pattern
          const angleStep = 80 / (metroCount - 1); // Spread across 80 degrees
          const startAngle = -40; // Start from -40 degrees
          const angle = (startAngle + (angleStep * idx)) * (Math.PI / 180);
          const radius = 140; // Larger radius
          const offsetX = Math.sin(angle) * radius;
          const offsetY = -Math.abs(Math.cos(angle)) * radius - 20; // Higher up
          metro.metroX = busStopPos.x + offsetX;
          metro.metroY = busStopPos.y + offsetY;
        }
      });
    });

    return connections;
  }, [stations, nodePositions]);

  // Calculate nearby railway stations and their positions
  const railwayConnections = React.useMemo(() => {
    const connections: Array<{
      railwayStation: typeof RAILWAY_STATIONS[string];
      busStopIndex: number;
      distance: number;
      railwayX: number;
      railwayY: number;
    }> = [];

    Object.values(RAILWAY_STATIONS).forEach(railwayStation => {
      let closestDistance = Infinity;
      let closestIndex = -1;

      stations.forEach((busStation, idx) => {
        const R = 6371e3;
        const φ1 = (busStation.lat * Math.PI) / 180;
        const φ2 = (railwayStation.lat * Math.PI) / 180;
        const Δφ = ((railwayStation.lat - busStation.lat) * Math.PI) / 180;
        const Δλ = ((railwayStation.lng - busStation.lng) * Math.PI) / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      // Only show railway stations within 3km of route
      if (closestDistance < 3000 && closestIndex !== -1) {
        connections.push({
          railwayStation,
          busStopIndex: closestIndex,
          distance: closestDistance,
          railwayX: 0,
          railwayY: 0
        });
      }
    });

    // Group railways by their nearest bus stop
    const groupedByStop: Record<number, typeof connections> = {};
    connections.forEach(conn => {
      if (!groupedByStop[conn.busStopIndex]) {
        groupedByStop[conn.busStopIndex] = [];
      }
      groupedByStop[conn.busStopIndex].push(conn);
    });

    // Position railways to avoid overlap with metros
    Object.entries(groupedByStop).forEach(([stopIdx, railways]) => {
      const busStopPos = nodePositions[parseInt(stopIdx)];
      const railwayCount = railways.length;

      // Check if there are metros at this same stop
      const hasMetrosAtStop = metroConnections.some(m => m.busStopIndex === parseInt(stopIdx));

      railways.forEach((railway, idx) => {
        if (railwayCount === 1) {
          // If metros exist at this stop, position railway further away
          if (hasMetrosAtStop) {
            const offsetY = parseInt(stopIdx) % 2 === 0 ? 140 : -140; // Further away
            const offsetX = 60; // Shift horizontally too
            railway.railwayX = busStopPos.x + offsetX;
            railway.railwayY = busStopPos.y + offsetY;
          } else {
            const offsetY = parseInt(stopIdx) % 2 === 0 ? 100 : -100;
            railway.railwayX = busStopPos.x;
            railway.railwayY = busStopPos.y + offsetY;
          }
        } else if (railwayCount === 2) {
          const offsetX = idx === 0 ? -120 : 120;
          const offsetY = hasMetrosAtStop ?
            (parseInt(stopIdx) % 2 === 0 ? 140 : -140) :
            (parseInt(stopIdx) % 2 === 0 ? 100 : -100);
          railway.railwayX = busStopPos.x + offsetX;
          railway.railwayY = busStopPos.y + offsetY;
        } else {
          const positions = [-150, 0, 150];
          const offsetX = positions[idx] || 0;
          const offsetY = hasMetrosAtStop ? 140 : 110;
          railway.railwayX = busStopPos.x + offsetX;
          railway.railwayY = busStopPos.y + offsetY;
        }
      });
    });

    return connections;
  }, [stations, nodePositions, metroConnections]);

  // Calculate nearby airports and their positions
  const airportConnections = React.useMemo(() => {
    const connections: Array<{
      airport: typeof AIRPORTS[string];
      busStopIndex: number;
      distance: number;
      airportX: number;
      airportY: number;
    }> = [];

    Object.values(AIRPORTS).forEach(airport => {
      let closestDistance = Infinity;
      let closestIndex = -1;

      stations.forEach((busStation, idx) => {
        const R = 6371e3;
        const φ1 = (busStation.lat * Math.PI) / 180;
        const φ2 = (airport.lat * Math.PI) / 180;
        const Δφ = ((airport.lat - busStation.lat) * Math.PI) / 180;
        const Δλ = ((airport.lng - busStation.lng) * Math.PI) / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      // Only show airports within 5km of route
      if (closestDistance < 5000 && closestIndex !== -1) {
        connections.push({
          airport,
          busStopIndex: closestIndex,
          distance: closestDistance,
          airportX: 0,
          airportY: 0
        });
      }
    });

    // Group airports by their nearest bus stop
    const groupedByStop: Record<number, typeof connections> = {};
    connections.forEach(conn => {
      if (!groupedByStop[conn.busStopIndex]) {
        groupedByStop[conn.busStopIndex] = [];
      }
      groupedByStop[conn.busStopIndex].push(conn);
    });

    // Position airports to avoid overlap with metros and railways
    Object.entries(groupedByStop).forEach(([stopIdx, airports]) => {
      const busStopPos = nodePositions[parseInt(stopIdx)];
      const airportCount = airports.length;

      // Check if there are metros or railways at this same stop
      const hasMetrosAtStop = metroConnections.some(m => m.busStopIndex === parseInt(stopIdx));
      const hasRailwaysAtStop = railwayConnections.some(r => r.busStopIndex === parseInt(stopIdx));

      airports.forEach((airport, idx) => {
        if (airportCount === 1) {
          // Position airports on the side, away from metros and railways
          let offsetX = 180; // Far to the right
          let offsetY = 0;

          if (hasMetrosAtStop || hasRailwaysAtStop) {
            offsetX = 200; // Even further if other stations present
            offsetY = parseInt(stopIdx) % 2 === 0 ? -60 : 60;
          }

          airport.airportX = busStopPos.x + offsetX;
          airport.airportY = busStopPos.y + offsetY;
        } else {
          // Multiple airports - stack vertically on the right
          const offsetX = 180;
          const offsetY = (idx - (airportCount - 1) / 2) * 80;
          airport.airportX = busStopPos.x + offsetX;
          airport.airportY = busStopPos.y + offsetY;
        }
      });
    });

    return connections;
  }, [stations, nodePositions, metroConnections, railwayConnections]);

  // Bus animation - move within highlighted segment if fare is selected
  let totalSegments = stations.length - 1;
  let animationStartIdx = 0;
  let animationEndIdx = totalSegments;

  // If there's a highlighted segment (fare selected), animate only within that segment
  if (hasHighlight) {
    animationStartIdx = highlightStartIdx;
    animationEndIdx = highlightEndIdx;
    totalSegments = animationEndIdx - animationStartIdx;
  }

  const exactProgress = simulationStep * totalSegments;
  const currentSegmentIndex = Math.floor(exactProgress);
  const segmentProgress = exactProgress - currentSegmentIndex;

  let busX = 0;
  let busY = 0;

  if (hasHighlight) {
    // Animate within the highlighted segment
    let actualSegmentIdx: number;
    let actualProgress: number;

    if (isReversed) {
      // Reverse animation: start from end, move to start
      actualSegmentIdx = animationEndIdx - 1 - currentSegmentIndex;
      actualProgress = 1 - segmentProgress; // Reverse the progress within segment
    } else {
      // Normal animation: start to end
      actualSegmentIdx = animationStartIdx + currentSegmentIndex;
      actualProgress = segmentProgress;
    }

    if (actualSegmentIdx >= animationStartIdx && actualSegmentIdx < animationEndIdx) {
      const startNode = nodePositions[actualSegmentIdx];
      const endNode = nodePositions[actualSegmentIdx + 1];
      busX = startNode.x + (endNode.x - startNode.x) * actualProgress;
      busY = startNode.y + (endNode.y - startNode.y) * actualProgress;
    }
  } else {
    // Animate across the entire route
    if (currentSegmentIndex >= 0 && currentSegmentIndex < totalSegments) {
      const startNode = nodePositions[currentSegmentIndex];
      const endNode = nodePositions[currentSegmentIndex + 1];
      busX = startNode.x + (endNode.x - startNode.x) * segmentProgress;
      busY = startNode.y + (endNode.y - startNode.y) * segmentProgress;
    }
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  // Calculate relative user position for connection line
  let userRelativeX = 0;
  let userRelativeY = 0;
  let nearestNodeX = 0;
  let nearestNodeY = 0;

  if (isUserFar && userStationIndex !== -1 && nodePositions[userStationIndex]) {
    nearestNodeX = nodePositions[userStationIndex].x;
    nearestNodeY = nodePositions[userStationIndex].y;
    // We visually offset the user based on the distance, but cap it so it fits in view
    // A simple heuristic: If distance is huge, put user "below" the node
    const offsetAmount = Math.min(userDistance / 20, 150); // Scale pixels
    userRelativeX = nearestNodeX;
    userRelativeY = nearestNodeY + offsetAmount;
  }

  return (
    <div className="w-full h-80 md:h-[500px] bg-slate-50 border-t border-b border-gray-100 relative group overflow-hidden">

      {/* Connection Line Info Badge */}
      {isUserFar && userStationIndex !== -1 && (
        <div className="absolute top-4 left-4 z-20 bg-orange-50/90 backdrop-blur border border-orange-200 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-pulse max-w-[200px]">
          <ArrowUpRight className="w-5 h-5 text-orange-600 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-orange-800 uppercase">Outside Route</p>
            <p className="text-xs font-medium text-orange-900 leading-tight">
              Go {(userDistance / 1000).toFixed(1)}km to start at <b>{stations[userStationIndex].name}</b>
            </p>
            {globalNearestName && (
              <p className="text-[10px] text-orange-800 mt-1 border-t border-orange-200 pt-1">
                Near: <b>{globalNearestName}</b>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-blue-600 shadow-sm flex items-center gap-1 hover:bg-blue-50 transition-colors"
        >
          <Navigation className="w-3 h-3" /> Real Map
        </a>
        <div className="md:hidden bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 shadow-sm flex items-center gap-1">
          <Grip className="w-3 h-3" /> Drag Map
        </div>
      </div>

      {/* Bottom Left - Layer Toggles */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur rounded-lg border border-gray-200 shadow-lg p-2 max-w-[180px]">
        <p className="text-[10px] font-bold text-gray-600 uppercase mb-2 px-1">Map Layers</p>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
            <input
              type="checkbox"
              checked={showMetro}
              onChange={(e) => setShowMetro(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <Train className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] font-medium text-gray-700">Metro Stations</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
            <input
              type="checkbox"
              checked={showRailway}
              onChange={(e) => setShowRailway(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0"
            />
            <Train className="w-3.5 h-3.5 text-green-700" />
            <span className="text-[11px] font-medium text-gray-700">Railway Stations</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
            <input
              type="checkbox"
              checked={showAirport}
              onChange={(e) => setShowAirport(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
            />
            <Plane className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[11px] font-medium text-gray-700">Airports</span>
          </label>
        </div>

        {/* Traffic Legend */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-[10px] font-bold text-gray-600 uppercase mb-2 px-1">Traffic Status</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-1">
              <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: '#34A853' }}></div>
              <span className="text-[10px] text-gray-600">Free flow</span>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: '#FBBC04' }}></div>
              <span className="text-[10px] text-gray-600">Moderate</span>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: '#EA4335' }}></div>
              <span className="text-[10px] text-gray-600">Heavy</span>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: '#9C27B0' }}></div>
              <span className="text-[10px] text-gray-600">Severe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right - Zoom Controls */}
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
        <div style={{ width: `${zoomedWidth}px`, height: `${zoomedHeight}px` }} className="relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] transition-all duration-500 ease-out origin-top-left">
          <svg className="w-full h-full block select-none pointer-events-none" viewBox={`0 0 ${baseWidth} ${height}`}>

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

              const fromStationId = route.stops[idx];
              const toStationId = route.stops[idx + 1];
              const trafficLevel = getSegmentTrafficLevel(fromStationId, toStationId);
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
                  className="opacity-100 transition-all duration-300"
                />
              );
            })}

            {/* Highlighted Segment Path (Green) */}
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

            {/* Connection Line for Far Users */}
            {isUserFar && userStationIndex !== -1 && (
              <g>
                <line
                  x1={nearestNodeX}
                  y1={nearestNodeY}
                  x2={userRelativeX}
                  y2={userRelativeY}
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeDasharray="8,6"
                  className="animate-pulse opacity-70"
                />
                {/* User Node */}
                <g transform={`translate(${userRelativeX}, ${userRelativeY})`}>
                  <circle r="12" fill="#fb923c" fillOpacity="0.2" className="animate-ping" />
                  <circle r="6" fill="#f97316" stroke="white" strokeWidth="2" />
                  <text y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c">
                    {globalNearestName || "You"}
                  </text>
                  <text y="32" textAnchor="middle" fontSize="10" fill="#9a3412" className="uppercase font-bold">
                    {((userDistance) / 1000).toFixed(1)}km
                  </text>
                </g>
              </g>
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
                  {isNearestButFar && (
                    <circle cx={x} cy={y} r={20} fill="#f97316" opacity="0.2">
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
                  <foreignObject
                    x={x - 60}
                    y={idx % 2 === 0 ? y + 15 : y - 45}
                    width="120"
                    height="40"
                    className="pointer-events-none"
                  >
                    <div className={`text-center text-[10px] font-medium leading-tight flex flex-col items-center justify-center h-full ${isCurrent && !hasHighlight ? 'text-dhaka-red font-bold' : (isPassed && !hasHighlight) || (hasHighlight && !isHighlighted) ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className={`px-2 py-0.5 rounded backdrop-blur-sm truncate max-w-full shadow-sm border 
                         ${isCurrent && !hasHighlight ? 'bg-red-50 border-red-100 text-red-600 scale-110'
                          : isNearestButFar ? 'bg-orange-50 border-orange-200 text-orange-700 font-bold'
                            : isHighlighted ? 'bg-green-50 border-green-200 text-green-800 font-bold'
                              : 'bg-white/80 border-gray-100/50'}`}>
                        {s.name}
                        {isCurrent && !hasHighlight && <span className="block text-[8px] uppercase font-bold mt-0.5">You are here</span>}
                        {isNearestButFar && !hasHighlight && <span className="block text-[8px] uppercase font-bold mt-0.5">Start Here</span>}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

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
                    y={metroY > busStopPos.y ? metroY + 15 : metroY - 55}
                    width="200"
                    height="50"
                    className="pointer-events-none overflow-visible"
                  >
                    <div className="text-center text-[10px] font-medium leading-tight flex flex-col items-center justify-center h-full">
                      <span className="px-2 py-1 rounded backdrop-blur-sm shadow-md border bg-purple-50 border-purple-200 text-purple-900 font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          <Train className="w-3 h-3" />
                          <span>{metroStation.name}</span>
                        </div>
                        <span className="block text-[8px] text-purple-700 mt-0.5">
                          {(distance / 1000).toFixed(2)}km from {stations[busStopIndex].name}
                        </span>
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Railway Stations */}
            {showRailway && railwayConnections.map((connection, idx) => {
              const { railwayStation, busStopIndex, distance, railwayX, railwayY } = connection;
              const busStopPos = nodePositions[busStopIndex];

              return (
                <g key={railwayStation.id} className="pointer-events-auto">
                  {/* Connection Line to Bus Stop */}
                  <line
                    x1={busStopPos.x}
                    y1={busStopPos.y}
                    x2={railwayX}
                    y2={railwayY}
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-60"
                  />

                  {/* Railway Station Node */}
                  <circle
                    cx={railwayX}
                    cy={railwayY}
                    r="18"
                    fill="#99f6e4"
                    className="opacity-30"
                  >
                    <animate attributeName="r" from="18" to="25" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>

                  <circle
                    cx={railwayX}
                    cy={railwayY}
                    r="10"
                    fill="#14b8a6"
                    stroke="white"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:r-12 transition-all"
                  />

                  {/* Train Icon */}
                  <foreignObject x={railwayX - 6} y={railwayY - 6} width="12" height="12" className="pointer-events-none">
                    <Train className="w-3 h-3 text-white" />
                  </foreignObject>

                  {/* Railway Station Label */}
                  <foreignObject
                    x={railwayX - 100}
                    y={railwayY > busStopPos.y ? railwayY + 15 : railwayY - 55}
                    width="200"
                    height="50"
                    className="pointer-events-none overflow-visible"
                  >
                    <div className="text-center text-[10px] font-medium leading-tight flex flex-col items-center justify-center h-full">
                      <span className="px-2 py-1 rounded backdrop-blur-sm shadow-md border bg-teal-50 border-teal-200 text-teal-900 font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          <Train className="w-3 h-3" />
                          <span>{railwayStation.name}</span>
                        </div>
                        <span className="block text-[8px] text-teal-700 mt-0.5">
                          {(distance / 1000).toFixed(2)}km from {stations[busStopIndex].name}
                        </span>
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Airports */}
            {showAirport && airportConnections.map((connection, idx) => {
              const { airport, busStopIndex, distance, airportX, airportY } = connection;
              const busStopPos = nodePositions[busStopIndex];

              return (
                <g key={airport.id} className="pointer-events-auto">
                  {/* Connection Line to Bus Stop */}
                  <line
                    x1={busStopPos.x}
                    y1={busStopPos.y}
                    x2={airportX}
                    y2={airportY}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-60"
                  />

                  {/* Airport Node */}
                  <circle
                    cx={airportX}
                    cy={airportY}
                    r="18"
                    fill="#bfdbfe"
                    className="opacity-30"
                  >
                    <animate attributeName="r" from="18" to="25" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>

                  <circle
                    cx={airportX}
                    cy={airportY}
                    r="10"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:r-12 transition-all"
                  />

                  {/* Plane Icon */}
                  <foreignObject x={airportX - 6} y={airportY - 6} width="12" height="12" className="pointer-events-none">
                    <Plane className="w-3 h-3 text-white" />
                  </foreignObject>

                  {/* Airport Label */}
                  <foreignObject
                    x={airportX - 100}
                    y={airportY > busStopPos.y ? airportY + 15 : airportY - 55}
                    width="200"
                    height="50"
                    className="pointer-events-none overflow-visible"
                  >
                    <div className="text-center text-[10px] font-medium leading-tight flex flex-col items-center justify-center h-full">
                      <span className="px-2 py-1 rounded backdrop-blur-sm shadow-md border bg-blue-50 border-blue-200 text-blue-900 font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          <Plane className="w-3 h-3" />
                          <span>{airport.name}</span>
                        </div>
                        <span className="block text-[8px] text-blue-700 mt-0.5">
                          {(distance / 1000).toFixed(2)}km from {stations[busStopIndex].name}
                        </span>
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Simulated Bus */}
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
