import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Layers, Navigation, Map as MapIcon, Globe, Wifi, WifiOff } from 'lucide-react';
import { UserLocation, BusRoute } from '../types';

// Fix for default marker icons using local assets for offline support
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
    iconUrl: '/images/leaflet/marker-icon.png',
    shadowUrl: '/images/leaflet/marker-shadow.png',
});

interface LiveLocationMapProps {
    isOpen: boolean;
    onClose: () => void;
    userLocation: UserLocation | null;
    selectedRoute?: BusRoute | null;
    currentStation?: Station | null;
    tripPlan?: any;
}
// ... (rest of imports/interfaces same)

// ...


const LiveLocationMap: React.FC<LiveLocationMapProps> = ({
    isOpen,
    onClose,
    userLocation,
    selectedRoute,
}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const userMarkerRef = useRef<L.Marker | null>(null);
    const accuracyCircleRef = useRef<L.Circle | null>(null);
    const routeLayerRef = useRef<L.LayerGroup | null>(null);

    const [activeLayer, setActiveLayer] = useState<MapLayer>('standard');
    const [showLayerMenu, setShowLayerMenu] = useState(false);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    // Monitor online status
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Initialize Map
    useEffect(() => {
        if (!isOpen || !mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
            // Default center: Dhaka
            const dhakaCenter: [number, number] = [23.8103, 90.4125];
            const initialCenter = userLocation
                ? [userLocation.lat, userLocation.lng] as [number, number]
                : dhakaCenter;

            const map = L.map(mapContainerRef.current, {
                zoomControl: false,
                attributionControl: false
            }).setView(initialCenter, 13);

            mapInstanceRef.current = map;

            // Add Zoom Control at bottom right
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            // Add Attribution
            L.control.attribution({ position: 'bottomright' }).addTo(map);
        }

        // Cleanup on unmount (only if complete unmount, but here we usually keep instance if modal toggles? 
        // No, better to remove if modal closes to save resources, or keep hidden)
        // For now, we'll keep it simple and just init. 
        // If we want to destroy: 
        // return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null; };
        // But tearing down Leaflet can be buggy with React strict mode. Let's see.
        // Given the modal nature, destroying might be safer for memory.

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [isOpen]);

    // Update Layers
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        const map = mapInstanceRef.current;

        // Clear existing tile layers
        map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });

        let tileUrl = '';
        let attribution = '';
        let maxZoom = 19;

        switch (activeLayer) {
            case 'satellite':
                // Google Hybrid
                tileUrl = 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}';
                attribution = '&copy; Google Maps';
                // Subdomains for Google
                (L.TileLayer.prototype as any).options.subdomains = ['mt0', 'mt1', 'mt2', 'mt3'];
                break;
            case 'terrain':
                // Google Terrain
                tileUrl = 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
                attribution = '&copy; Google Maps';
                (L.TileLayer.prototype as any).options.subdomains = ['mt0', 'mt1', 'mt2', 'mt3'];
                break;
            case 'traffic':
                // Google Traffic
                tileUrl = 'https://mt1.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}';
                attribution = '&copy; Google Maps';
                break;
            case 'dark':
                // CartoDB Dark Matter
                tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
                attribution = '&copy; OpenStreetMap &copy; CARTO';
                (L.TileLayer.prototype as any).options.subdomains = ['a', 'b', 'c', 'd'];
                break;
            case 'standard':
            default:
                // OSM
                tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                attribution = '&copy; OpenStreetMap contributors';
                (L.TileLayer.prototype as any).options.subdomains = ['a', 'b', 'c'];
                break;
        }

        L.tileLayer(tileUrl, {
            maxZoom,
            attribution,
            subdomains: (L.TileLayer.prototype as any).options.subdomains || ['a', 'b', 'c']
        }).addTo(map);

    }, [activeLayer, isOpen]);

    const [hasCentered, setHasCentered] = useState(false);

    // Update User Location
    useEffect(() => {
        if (!mapInstanceRef.current) return;
        const map = mapInstanceRef.current;

        if (userLocation) {
            const latLng: [number, number] = [userLocation.lat, userLocation.lng];

            // Initial Center on User
            if (!hasCentered) {
                map.setView(latLng, 15);
                setHasCentered(true);
            }

            // User Marker Icon
            const userIcon = L.divIcon({
                className: 'bg-transparent border-none',
                html: `<div class="relative w-6 h-6 flex items-center justify-center">
                 <div class="absolute w-full h-full bg-blue-500/50 rounded-full animate-ping"></div>
                 <div class="relative w-4 h-4 bg-blue-600 border-[3px] border-white rounded-full shadow-lg"></div>
               </div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            if (userMarkerRef.current) {
                userMarkerRef.current.setLatLng(latLng);
                userMarkerRef.current.setIcon(userIcon);
            } else {
                userMarkerRef.current = L.marker(latLng, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
            }

            // Accuracy Circle
            const accuracy = (userLocation as any).accuracy || 50; // meters

            if (accuracyCircleRef.current) {
                accuracyCircleRef.current.setLatLng(latLng);
                accuracyCircleRef.current.setRadius(accuracy);
            } else {
                accuracyCircleRef.current = L.circle(latLng, {
                    radius: accuracy,
                    color: '#3b82f6',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.15,
                    weight: 1
                }).addTo(map);
            }

        }
    }, [userLocation, isOpen, hasCentered]);

    // Handle Geolocation Watch
    useEffect(() => {
        if (!isOpen || !navigator.geolocation) return;

        // Offline Optimization: Accept older cached positions when offline
        const geoOptions: PositionOptions = {
            enableHighAccuracy: true,
            maximumAge: isOffline ? Infinity : 2000,
            timeout: 15000
        };

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                if (mapInstanceRef.current) {
                    const { latitude, longitude, accuracy } = pos.coords;
                    const latLng: [number, number] = [latitude, longitude];

                    if (userMarkerRef.current) userMarkerRef.current.setLatLng(latLng);
                    if (accuracyCircleRef.current) {
                        accuracyCircleRef.current.setLatLng(latLng);
                        accuracyCircleRef.current.setRadius(accuracy);
                    }
                }
            },
            (err) => console.error("Watch Position Error", err),
            geoOptions
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [isOpen, isOffline]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row">

                {/* Map Container */}
                <div ref={mapContainerRef} className="flex-1 w-full h-full relative z-0 bg-gray-100" />

                {/* Floating Controls */}
                <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-200/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 relative">
                                {isOffline ? <WifiOff className="w-5 h-5 text-gray-400" /> : <Wifi className="w-5 h-5" />}
                                {userLocation && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-bounce"></div>}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">Live Location</h3>
                                <p className="text-[10px] text-gray-500 font-medium">
                                    {userLocation ? 'GPS Signal Active' : 'Acquiring Signal...'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layer Switcher */}
                <div className="absolute top-4 right-16 z-[400]">
                    <button
                        onClick={() => setShowLayerMenu(!showLayerMenu)}
                        className="bg-white/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-gray-200/50 hover:bg-gray-50 text-gray-700 transition-all active:scale-95"
                    >
                        <Layers className="w-6 h-6" />
                    </button>

                    {showLayerMenu && (
                        <div className="absolute top-14 right-0 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-gray-200/50 w-40 flex flex-col gap-1 animate-in slide-in-from-top-2">
                            <button onClick={() => setActiveLayer('standard')} className={`text-xs font-bold px-3 py-2 rounded-lg text-left flex items-center gap-2 ${activeLayer === 'standard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <MapIcon className="w-4 h-4" /> Standard
                            </button>
                            <button onClick={() => setActiveLayer('satellite')} className={`text-xs font-bold px-3 py-2 rounded-lg text-left flex items-center gap-2 ${activeLayer === 'satellite' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <Globe className="w-4 h-4" /> Satellite
                            </button>
                            <button onClick={() => setActiveLayer('terrain')} className={`text-xs font-bold px-3 py-2 rounded-lg text-left flex items-center gap-2 ${activeLayer === 'terrain' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <MapIcon className="w-4 h-4" /> Terrain
                            </button>
                            <button onClick={() => setActiveLayer('traffic')} className={`text-xs font-bold px-3 py-2 rounded-lg text-left flex items-center gap-2 ${activeLayer === 'traffic' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <Navigation className="w-4 h-4" /> Traffic
                            </button>
                            <button onClick={() => setActiveLayer('dark')} className={`text-xs font-bold px-3 py-2 rounded-lg text-left flex items-center gap-2 ${activeLayer === 'dark' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <MapIcon className="w-4 h-4" /> Dark Mode
                            </button>
                        </div>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-gray-200/50 hover:bg-red-50 text-gray-700 hover:text-red-500 transition-all active:scale-95"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Recenter Button */}
                <button
                    onClick={() => {
                        if (userLocation && mapInstanceRef.current) {
                            mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 1.5 });
                        }
                    }}
                    className="absolute bottom-8 right-4 z-[400] bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center"
                >
                    <Navigation className="w-6 h-6" />
                </button>

            </div>
        </div>
    );
};

export default LiveLocationMap;
