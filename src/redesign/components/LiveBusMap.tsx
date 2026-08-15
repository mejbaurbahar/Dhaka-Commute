import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { T, N } from '../tokens';
import { STATIONS } from '../../../constants';
import { getNearestStopName, type CommunityBus } from '../../../services/busLiveService';

const DHAKA_CENTER: [number, number] = [23.8103, 90.4125];

function statusColor(status: string): string {
  if (status === 'moving') return '#10b981';
  if (status === 'idle') return '#f59e0b';
  return '#9ca3af';
}

function statusLabel(status: string, lang: 'bn' | 'en'): string {
  if (status === 'moving') return T(lang, 'চলছে', 'Moving');
  if (status === 'idle') return T(lang, 'অপেক্ষায়', 'Idle');
  return T(lang, 'পুরনো ডেটা', 'Stale');
}

function busIconHtml(color: string, highlighted: boolean): string {
  const base = 'width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:-18px 0 0 -18px';
  const hl = highlighted
    ? ';background:#3b82f6;border:3px solid white;box-shadow:0 0 0 5px rgba(59,130,246,.45),0 2px 10px rgba(0,0,0,.35)'
    : `;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3)`;
  return `<div style="${base}${hl}">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`;
}

interface Props {
  tk: Record<string, string>;
  lang: 'bn' | 'en';
  isMobile: boolean;
  height?: number;
  routeStops: Array<{ lat: number; lng: number; name: string; bnName: string }>;
  stopIds: string[];
  buses: CommunityBus[];
  selectedNumber: string | null;
  sharingBusNumber: string | null;
  onMarkerClick?: (busNumber: string) => void;
  /** User GPS location + nearest stop on this route (index into routeStops) — draws a dashed line + blue dot */
  userProximity?: { lat: number; lng: number; stopIndex: number; distanceKm: number } | null;
}

function userIconHtml(): string {
  return `<div style="width:26px;height:26px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 0 0 6px rgba(59,130,246,.4),0 2px 8px rgba(0,0,0,.35);margin:-13px 0 0 -13px;animation:kjPulse 1.6s infinite"></div>`;
}

/**
 * Leaflet map of live buses on a route — status-colored markers (green moving /
 * amber idle / gray stale), blue-ring highlight for the selected or own bus,
 * click → popup (bus number, nearest stop, status, speed, contributors, ago).
 */
export function LiveBusMap({ tk, lang, isMobile, height, routeStops, stopIds, buses, selectedNumber, sharingBusNumber, onMarkerClick, userProximity }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busLayerRef = useRef<L.LayerGroup | null>(null);
  const userLayerRef = useRef<L.LayerGroup | null>(null);
  const fittedUserRef = useRef(false);
  const flownRef = useRef<string | null>(null);

  function ago(ts: number): string {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return `${s}s`;
    if (s < 3600) return `${Math.floor(s / 60)}m`;
    return `${Math.floor(s / 3600)}h`;
  }

  // init map (deferred 150ms) + route polyline + stops
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;
      const map = L.map(mapContainerRef.current, { zoomControl: true, attributionControl: false })
        .setView(DHAKA_CENTER, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
      mapRef.current = map;
      busLayerRef.current = L.layerGroup().addTo(map);
      userLayerRef.current = L.layerGroup().addTo(map);
      setTimeout(() => map.invalidateSize(), 300);

      if (routeStops.length > 1) {
        const coords: [number, number][] = routeStops.map(s => [s.lat, s.lng]);
        L.polyline(coords, { color: '#10b981', weight: 4, opacity: 0.7 }).addTo(map);
        routeStops.forEach((stop, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === routeStops.length - 1;
          L.circleMarker([stop.lat, stop.lng], {
            radius: isFirst || isLast ? 9 : 6,
            fillColor: isFirst || isLast ? '#006a4e' : '#10b981',
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 1,
          })
            .bindTooltip(`<b>${lang === 'bn' ? stop.bnName : stop.name}</b>`, { permanent: false, direction: 'top', offset: [0, -8] })
            .addTo(map);
        });
        map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] });
      }

      cleanup = () => {
        map.remove();
        mapRef.current = null;
        busLayerRef.current = null;
        userLayerRef.current = null;
        flownRef.current = null;
      };
    }, 150);
    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopIds.join('|')]);

  // bus markers — status color, selected/own highlighted, click → popup
  useEffect(() => {
    const map = mapRef.current;
    const layer = busLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    buses.forEach(b => {
      const highlighted = b.busNumber !== '' && (b.busNumber === selectedNumber || b.busNumber === sharingBusNumber);
      const icon = L.divIcon({
        className: '',
        html: busIconHtml(statusColor(b.status), highlighted),
      });
      const nearestId = getNearestStopName(b.lat, b.lng, stopIds);
      const nearest = STATIONS[nearestId];
      const locationName = nearest ? (lang === 'bn' ? nearest.bnName : nearest.name) : '—';
      const label = `<b>${b.busNumber || ''}</b>${b.contributors > 1 ? ` &nbsp;👥 ${b.contributors}` : ''}`;
      const popupHtml =
        `<div style="font-family:'Segoe UI',sans-serif;min-width:170px">` +
        `<div style="font-weight:800;font-size:15px;margin-bottom:4px">🚌 ${b.busNumber || ''}</div>` +
        `<div style="font-size:12px;color:#555;line-height:1.7">📍 ${locationName}<br/>` +
        `${statusLabel(b.status, lang)} · ${b.speed > 1 ? `${Math.round(b.speed * 3.6)} km/h` : '0 km/h'}` +
        `${b.contributors > 1 ? ` · 👥 ${N(b.contributors, lang)}` : ''} · ${ago(b.updatedAt)} ${lang === 'bn' ? 'আগে' : 'ago'}</div>` +
        `</div>`;
      L.marker([b.lat, b.lng], { icon })
        .bindTooltip(label, { permanent: false, direction: 'top', offset: [0, -10] })
        .bindPopup(popupHtml, { autoClose: true })
        .on('click', () => { if (b.busNumber) onMarkerClick?.(b.busNumber); })
        .addTo(layer);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buses, selectedNumber, sharingBusNumber]);

  // user GPS dot + dashed line to their nearest stop on this route.
  // Redraws on every position update; fits the view once so the user can see
  // both their location and the nearest stop (e.g. Hemayetpur → Technical).
  useEffect(() => {
    const map = mapRef.current;
    const layer = userLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    if (!userProximity) {
      fittedUserRef.current = false;
      return;
    }
    const { lat, lng, stopIndex, distanceKm } = userProximity;
    const stop = routeStops[stopIndex];
    if (stop) {
      const kmText = `${N(distanceKm.toFixed(1), lang)} ${lang === 'bn' ? 'কিমি' : 'km'}`;
      L.polyline([[lat, lng], [stop.lat, stop.lng]], {
        color: '#ef4444',
        weight: 3,
        dashArray: '8 8',
        opacity: 0.85,
      })
        .bindTooltip(`📏 ${kmText}`, { permanent: true, direction: 'center', className: 'kj-userline-tip' })
        .addTo(layer);
    }
    L.marker([lat, lng], { icon: L.divIcon({ className: '', html: userIconHtml() }), zIndexOffset: 1000 })
      .bindTooltip(`<b>${T(lang, 'আপনি এখানে', 'You are here')}</b>`, { permanent: false, direction: 'top', offset: [0, -12] })
      .addTo(layer);
    if (!fittedUserRef.current) {
      fittedUserRef.current = true;
      const pts: [number, number][] = [[lat, lng]];
      if (stop) pts.push([stop.lat, stop.lng]);
      map.fitBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 16 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProximity, routeStops, stopIds.join('|')]);

  // fly to the selected bus (once per selection, not per poll)
  useEffect(() => {
    if (!selectedNumber) return;
    const b = buses.find(x => x.busNumber === selectedNumber);
    if (b && mapRef.current && flownRef.current !== selectedNumber) {
      flownRef.current = selectedNumber;
      mapRef.current.flyTo([b.lat, b.lng], Math.max(mapRef.current.getZoom(), 14), { duration: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumber, buses]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: height ?? (isMobile ? 320 : 420), borderRadius: 16, overflow: 'hidden', background: '#0d1117', border: `1px solid ${tk.line}` }}
    />
  );
}
