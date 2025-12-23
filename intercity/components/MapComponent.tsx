import React, { useEffect, useRef } from 'react';
import { DISTRICT_COORDINATES } from '../constants';

interface MapComponentProps {
  from: string;
  to: string;
  via?: string[];
  modeTitle?: string; // e.g., "By Bus + Ship", "By Air + Road + Ship"
}

declare global {
  interface Window {
    L: any;
  }
}

// Icon dictionary
const MODE_ICONS: { [key: string]: string } = {
  'Bus': '🚌',
  'বাস': '🚌',
  'Train': '🚂',
  'ট্রেন': '🚂',
  'Air': '✈️',
  'বিমান': '✈️',
  'Flight': '✈️',
  'Plane': '✈️',
  'Ship': '🚢',
  'জাহাজ': '🚢',
  'Launch': '🚢',
  'লঞ্চ': '🚢',
  'Ferry': '🚢',
  'ফেরি': '🚢',
  'Car': '🚗',
  'কার': '🚗',
  'Taxi': '🚕',
  'ট্যাক্সি': '🚕',
  'Road': '🚗',
  'সড়ক': '🚗',
  'Default': '📍'
};

const BENGALI_TO_ENGLISH_NAMES: { [key: string]: string } = {
  "ঢাকা": "Dhaka", "চট্টগ্রাম": "Chattogram", "রাজশাহী": "Rajshahi", "খুলনা": "Khulna",
  "বরিশাল": "Barishal", "সিলেট": "Sylhet", "রংপুর": "Rangpur", "ময়মনসিংহ": "Mymensingh",
  "কক্সবাজার": "Cox's Bazar", "সেন্টমার্টিন": "Saint Martin's Island", "টেকনাফ": "Teknaf",
  "কুমিল্লা": "Cumilla", "নোয়াখালী": "Noakhali", "ফেনী": "Feni", "বগুড়া": "Bogura",
  "সিরাজগঞ্জ": "Sirajganj", "টাঙ্গাইল": "Tangail", "গাজীপুর": "Gazipur", "সাভার": "Savar",
  "মাদারীপুর": "Madaripur", "শরীয়তপুর": "Shariatpur", "গোপালগঞ্জ": "Gopalganj",
  "ফরিদপুর": "Faridpur", "মুন্সীগঞ্জ": "Munshiganj", "নারায়ণগঞ্জ": "Narayanganj",
  "নরসিংদী": "Narsingdi", "কিশোরগঞ্জ": "Kishoreganj", "ব্রাহ্মণবাড়িয়া": "Brahmanbaria",
  "চাঁদপুর": "Chandpur", "লক্ষ্মীপুর": "Lakshmipur", "রাঙ্গামাটি": "Rangamati",
  "বান্দরবান": "Bandarban", "খাগড়াছড়ি": "Khagrachari", "নাটোর": "Natore",
  "পাবনা": "Pabna", "নওগাঁ": "Naogaon", "চাঁপাইনবাবগঞ্জ": "Chapainawabganj",
  "জয়পুরহাট": "Joypurhat", "কুষ্টিয়া": "Kushtia", "যশোর": "Jashore", "ঝিনাইদহ": "Jhenaidah",
  "মাগুরা": "Magura", "নড়াইল": "Narail", "বাগেরহাট": "Bagerhat", "সাতক্ষীরা": "Satkhira",
  "মেহেরপুর": "Meherpur", "চুয়াডাঙ্গা": "Chuadanga", "ভোলা": "Bhola", "পটুয়াখালী": "Patuakhali",
  "বরগুনা": "Barguna", "ঝালকাঠি": "Jhalokati", "পিরোজপুর": "Pirojpur", "হবিগঞ্জ": "Habiganj",
  "মৌলভীবাজার": "Moulvibazar", "সুনামগঞ্জ": "Sunamganj", "দিনাজপুর": "Dinajpur",
  "কুড়িগ্রাম": "Kurigram", "লালমনিরহাট": "Lalmonirhat", "নীলফামারী": "Nilphamari",
  "পঞ্চগড়": "Panchagarh", "ঠাকুরগাঁও": "Thakurgaon", "গাইবান্ধা": "Gaibandha",
  "শেরপুর": "Sherpur", "জামালপুর": "Jamalpur", "নেত্রকোনা": "Netrokona",
  "সাজেক": "Sajek Valley", "কুয়াকাটা": "Kuakata", "শ্রীমঙ্গল": "Sreemangal",
  "মাওয়া": "Mawa", "আরিচা": "Aricha", "পাটুরিয়া": "Paturia", "দৌলতদিয়া": "Daulatdia"
};

const MapComponent: React.FC<MapComponentProps> = ({ from, to, via = [], modeTitle = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const layerGroup = useRef<any>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.L || !mapRef.current) return;

    // Initialize Map only once
    if (!mapInstance.current) {
      mapInstance.current = window.L.map(mapRef.current).setView([23.8103, 90.4125], 7);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      layerGroup.current = window.L.layerGroup().addTo(mapInstance.current);
    }

    const layers = layerGroup.current;
    layers.clearLayers();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    // Helper to get coords
    const getCoords = (name: string): [number, number] | null => {
      // 1. Try direct match or Bengali mapping
      let searchName = name;
      const bnMatch = Object.keys(BENGALI_TO_ENGLISH_NAMES).find(bn => name.includes(bn));
      if (bnMatch) {
        searchName = BENGALI_TO_ENGLISH_NAMES[bnMatch];
      }

      // 2. Find in coordinates map
      const key = Object.keys(DISTRICT_COORDINATES).find(k =>
        searchName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(searchName.toLowerCase())
      );
      return key ? DISTRICT_COORDINATES[key] : null;
    };

    const startCoords = getCoords(from);
    const endCoords = getCoords(to);

    if (!startCoords || !endCoords) return;

    // --- 1. Intelligent Route Ordering (Geometric Sorting) ---
    // This fixes "Zig-Zag" issues by sorting Via points based on distance from Start.

    let sortedVia = [...via];

    // Get coords for sorting
    const viaWithCoords = sortedVia
      .map(v => ({ name: v, coords: getCoords(v) }))
      .filter(v => v.coords !== null) as { name: string, coords: [number, number] }[];

    // Heuristic: Sort by distance from start coordinate
    viaWithCoords.sort((a, b) => {
      const distA = mapInstance.current.distance(startCoords, a.coords);
      const distB = mapInstance.current.distance(startCoords, b.coords);
      return distA - distB;
    });

    const routePoints: [number, number][] = [startCoords];
    viaWithCoords.forEach(v => routePoints.push(v.coords));
    routePoints.push(endCoords);

    // --- 2. Determine Transport Modes per Segment ---
    const cleanTitle = modeTitle.replace('By ', '').replace(/\*\*/g, '');
    const modes = cleanTitle.split('+').map(m => m.trim());

    const segments: { p1: [number, number], p2: [number, number], mode: string, dist: number }[] = [];

    for (let i = 0; i < routePoints.length - 1; i++) {
      const p1 = routePoints[i];
      const p2 = routePoints[i + 1];
      const dist = mapInstance.current.distance(p1, p2);

      let segmentMode = 'Default';

      if (modes.length === 1) {
        segmentMode = modes[0];
      } else {
        const hasShip = modes.some(m => m.includes('Ship') || m.includes('Launch') || m.includes('জাহাজ') || m.includes('লঞ্চ'));
        const hasAir = modes.some(m => m.includes('Air') || m.includes('Flight') || m.includes('বিমান'));
        const hasBus = modes.some(m => m.includes('Bus') || m.includes('Road') || m.includes('Car') || m.includes('বাস') || m.includes('সড়ক'));
        const hasTrain = modes.some(m => m.includes('Train') || m.includes('ট্রেন'));

        if (i === routePoints.length - 2 && hasShip) {
          segmentMode = 'Ship';
        } else if (i === 0 && hasAir) {
          segmentMode = 'Air';
        } else if (hasBus) {
          segmentMode = 'Bus';
          if (hasTrain && !hasAir) segmentMode = 'Train';
        } else {
          segmentMode = modes[i % modes.length];
        }
      }

      segments.push({ p1, p2, mode: segmentMode, dist });
    }

    // --- 3. Draw Elements ---

    const addMarker = (coords: [number, number], label: string, color: string) => {
      const iconHtml = `
        <div style="
          background-color: ${color};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        "></div>
      `;
      const icon = window.L.divIcon({
        className: 'custom-div-icon',
        html: iconHtml,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      window.L.marker(coords, { icon }).bindPopup(label).addTo(layers);
    };

    addMarker(startCoords, `Start: ${from}`, '#22c55e'); // Green
    viaWithCoords.forEach(v => addMarker(v.coords, `Via: ${v.name}`, '#3b82f6')); // Blue
    addMarker(endCoords, `Destination: ${to}`, '#ef4444'); // Red

    // Draw Polyline - Enhanced Visibility
    const polyline = window.L.polyline(routePoints, {
      color: '#2563eb', // Brighter Blue (Tailwind blue-600)
      weight: 5,        // Thicker
      opacity: 0.9,     // More visible
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(layers);

    // Initial Bounds Fit with Padding
    // Increased padding to [80, 80] to handle "zoom out" request and mobile layouts
    mapInstance.current.fitBounds(polyline.getBounds(), { padding: [80, 80] });

    // Fix for Mobile Rendering: Force invalidateSize after transition
    setTimeout(() => {
      if (mapInstance.current) {
        mapInstance.current.invalidateSize();
        mapInstance.current.fitBounds(polyline.getBounds(), { padding: [80, 80] });
      }
    }, 400);

    // --- 4. Animation ---
    const vehicleIconDiv = window.L.divIcon({
      className: 'vehicle-anim-icon',
      html: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    const vehicleMarker = window.L.marker(startCoords, { icon: vehicleIconDiv, zIndexOffset: 1000 }).addTo(layers);

    const totalDist = segments.reduce((acc, s) => acc + s.dist, 0);
    // Slowed down animation: 12 seconds
    const duration = 12000;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      const currentDist = progress * totalDist;
      let accumulatedDist = 0;
      let currentSegment = segments[0];

      for (const seg of segments) {
        if (accumulatedDist + seg.dist >= currentDist) {
          currentSegment = seg;
          break;
        }
        accumulatedDist += seg.dist;
      }

      const segmentProgress = (currentDist - accumulatedDist) / currentSegment.dist;

      const lat = currentSegment.p1[0] + (currentSegment.p2[0] - currentSegment.p1[0]) * segmentProgress;
      const lng = currentSegment.p1[1] + (currentSegment.p2[1] - currentSegment.p1[1]) * segmentProgress;

      const rawMode = currentSegment.mode;
      let iconChar = '📍';
      for (const key of Object.keys(MODE_ICONS)) {
        if (rawMode.includes(key)) {
          iconChar = MODE_ICONS[key];
          break;
        }
      }

      const iconHtml = `<div style="font-size: 28px; line-height: 1; transform: translate(-50%, -50%); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); transition: all 0.2s;">${iconChar}</div>`;

      const newIcon = window.L.divIcon({
        className: 'vehicle-anim-icon',
        html: iconHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      vehicleMarker.setIcon(newIcon);
      vehicleMarker.setLatLng([lat, lng]);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

  }, [from, to, via, modeTitle]);

  return <div ref={mapRef} className="w-full h-full bg-slate-100" />;
};

export default MapComponent;