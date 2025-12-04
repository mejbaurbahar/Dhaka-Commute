import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RouteStep } from '../types';

interface RouteMapProps {
  steps: RouteStep[];
}

export const RouteMap: React.FC<RouteMapProps> = ({ steps }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // 1. Initialize Map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([23.8103, 90.4125], 7); // Default to Dhaka
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // 2. Clear existing layers (except tiles)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // 3. Define Icons
    const startIcon = L.divIcon({
      className: 'bg-blue-600 rounded-full border-2 border-white shadow-md',
      iconSize: [12, 12],
    });

    const endIcon = L.divIcon({
      className: 'bg-dhaka-red rounded-full border-2 border-white shadow-md',
      iconSize: [14, 14],
    });

    const midIcon = L.divIcon({
      className: 'bg-gray-400 rounded-full border-2 border-white shadow-md',
      iconSize: [8, 8],
    });

    // 4. Plot Route
    const latLngs: L.LatLngExpression[] = [];
    
    steps.forEach((step, index) => {
      if (step.startCoordinates && step.endCoordinates) {
        const start = [step.startCoordinates.lat, step.startCoordinates.lng] as L.LatLngExpression;
        const end = [step.endCoordinates.lat, step.endCoordinates.lng] as L.LatLngExpression;

        latLngs.push(start);
        
        // Add marker for start of this step
        if (index === 0) {
            L.marker(start, { icon: startIcon })
             .addTo(map)
             .bindTooltip(step.from, { 
                permanent: true, 
                direction: 'top',
                className: 'font-bold text-blue-700 bg-white border border-blue-200 shadow-lg px-2 py-0.5 rounded text-xs opacity-90',
                offset: [0, -10]
             });
        } else {
            // Intermediate stops (Transit points)
            L.marker(start, { icon: midIcon })
             .addTo(map)
             .bindTooltip(step.from, {
                direction: 'auto',
                className: 'text-gray-600 bg-white border border-gray-200 px-1 py-0 rounded text-[10px]'
             });
        }

        // Always add point to path
        latLngs.push(end);

        // Add marker for end of this step if it's the last one
        if (index === steps.length - 1) {
            L.marker(end, { icon: endIcon })
             .addTo(map)
             .bindTooltip(step.to, { 
                permanent: true, 
                direction: 'bottom',
                className: 'font-bold text-red-700 bg-white border border-red-200 shadow-lg px-2 py-0.5 rounded text-xs opacity-90',
                offset: [0, 10]
             });
        }
      }
    });

    // 5. Draw Polyline and Fit Bounds
    if (latLngs.length > 0) {
      const polyline = L.polyline(latLngs, { color: '#3b82f6', weight: 4, opacity: 0.8, dashArray: '10, 5' }).addTo(map);
      try {
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      } catch (e) {
        // Handle invalid bounds gracefully
      }
    }

    // Cleanup on unmount
    return () => {
       // We only clean up if the component is actually unmounting to avoid flickering,
       // but strictly handling refs is good practice.
    };
  }, [steps]);

  // Clean up strictly on unmount
  useEffect(() => {
      return () => {
          if (mapInstanceRef.current) {
              mapInstanceRef.current.remove();
              mapInstanceRef.current = null;
          }
      }
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 relative z-0">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls Overlay (Optional) */}
      <div className="absolute bottom-2 right-2 z-[400] bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] text-gray-500 shadow-sm border border-white">
         Hold Shift + Drag to Zoom
      </div>
    </div>
  );
};