import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { T, Tokens, Lang } from '../tokens';
import { getJourneyWaypoints, type Journey, type TransitMode } from '../../../services/intercityTransitService';

interface Props {
  journey: Journey;
  tk: Tokens;
  lang: Lang;
}

const MODE_COLORS: Record<TransitMode, string> = {
  bus: '#10b981',
  train: '#6366f1',
  flight: '#f59e0b',
  launch: '#06b6d4',
};

/**
 * Leaflet map of a transit journey: polyline per leg (mode-colored, flight
 * dashed), start marker (green), transfer markers (amber), destination (red).
 * District-level waypoints in travel order — shows the whole way, not just
 * endpoints.
 */
export function TransitJourneyMap({ journey, tk, lang }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const waypoints = getJourneyWaypoints(journey);
      if (waypoints.length < 2) return;
      const map = L.map(containerRef.current, { zoomControl: true, attributionControl: false })
        .setView([waypoints[0].lat, waypoints[0].lng], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
      setTimeout(() => map.invalidateSize(), 300);

      // Two-finger pan on touch devices
      if ('ontouchstart' in window) {
        map.dragging.disable();
        const el = containerRef.current!;
        const onTouchStart = (e: TouchEvent) => { if (e.touches.length >= 2) map.dragging.enable(); };
        const onTouchEnd = () => map.dragging.disable();
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
      }

      // One polyline per leg, colored by mode. Waypoints are 1 per leg boundary
      // (merged hubs keep position), so leg i spans waypoints i..i+1.
      const coords: [number, number][] = waypoints.map(w => [w.lat, w.lng]);
      const transferIdx = journey.legs.slice(0, -1).map((_, i) => i + 1);
      for (let i = 0; i < journey.legs.length; i++) {
        const leg = journey.legs[i];
        const pts = [coords[i], coords[i + 1]];
        if (pts[1] === undefined || (pts[0][0] === pts[1][0] && pts[0][1] === pts[1][1])) break;
        L.polyline(pts, {
          color: MODE_COLORS[leg.mode],
          weight: 5,
          opacity: 0.85,
          dashArray: leg.mode === 'flight' ? '8 6' : undefined,
        }).addTo(map);
      }

      // Markers: start green, transfers amber, end red
      waypoints.forEach((w, idx) => {
        const isStart = idx === 0;
        const isEnd = idx === waypoints.length - 1;
        const isTransfer = !isStart && !isEnd && transferIdx.includes(idx);
        const fill = isStart ? '#16a34a' : isTransfer ? '#f97316' : isEnd ? '#dc2626' : '#10b981';
        L.circleMarker([w.lat, w.lng], {
          radius: isStart || isEnd ? 9 : isTransfer ? 8 : 5,
          fillColor: fill,
          color: 'white',
          weight: 2.5,
          opacity: 1,
          fillOpacity: 1,
        })
          .bindTooltip(
            isStart
              ? `<b>🟢 ${lang === 'bn' ? w.labelBn : w.labelEn}</b><br><small>${T(lang, 'শুরু', 'Start')}</small>`
              : isTransfer
                ? `<b>🔀 ${lang === 'bn' ? w.labelBn : w.labelEn}</b><br><small>${T(lang, 'বদল পয়েন্ট', 'Transfer point')}</small>`
                : `<b>🔴 ${lang === 'bn' ? w.labelBn : w.labelEn}</b><br><small>${T(lang, 'গন্তব্য', 'Destination')}</small>`,
            { direction: 'top', offset: [0, -8] }
          )
          .addTo(map);
      });

      map.fitBounds(L.latLngBounds(coords), { padding: [36, 36] });

      cleanup = () => map.remove();
    }, 120);
    return () => { clearTimeout(timer); cleanup?.(); };
  }, [journey, lang]);

  return (
    <div style={{ marginTop: 10, borderRadius: 12, overflow: 'hidden', border: `1px solid ${tk.line}` }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: 210, background: '#eef2f6' }}
      />
      {/* Legend */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
        padding: '7px 12px', background: tk.panelMuted, borderTop: `1px solid ${tk.line}`,
        fontFamily: lang === 'bn' ? 'inherit' : 'inherit', fontSize: 11, color: tk.textDim,
      }}>
        {journey.legs.map((leg, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              display: 'inline-block', width: 14, height: 4, borderRadius: 2,
              background: MODE_COLORS[leg.mode],
              ...(leg.mode === 'flight' ? { backgroundImage: `repeating-linear-gradient(90deg, ${MODE_COLORS[leg.mode]} 0 5px, transparent 5px 9px)` } : {}),
            }} />
            {T(lang, `${leg.mode === 'bus' ? 'বাস' : leg.mode === 'train' ? 'ট্রেন' : leg.mode === 'flight' ? 'ফ্লাইট' : 'লঞ্চ'}`, leg.mode === 'bus' ? 'Bus' : leg.mode === 'train' ? 'Train' : leg.mode === 'flight' ? 'Flight' : 'Launch')}
            <span style={{ color: tk.textFaint }}>·</span>
            {leg.nameEn}
          </span>
        ))}
      </div>
    </div>
  );
}
