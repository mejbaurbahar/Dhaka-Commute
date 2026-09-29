import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KJ_TOKENS, SANS, BEN, Tokens, Lang } from '../tokens';
import { DESTINATION_ENRICHMENT } from '../../../data/destinationEnrichment';

interface Props {
  lat: number;
  lng: number;
  nameEn: string;
  nameBn: string;
  theme: 'dark' | 'light';
  lang: Lang;
  height?: number;
}

/** Plain Leaflet map for a single destination. Kept separate from LiveBusMap
 *  (bus-position specific) — OSM tiles, one marker with a bilingual popup. */
export function DestinationMap({ lat, lng, nameEn, nameBn, theme, lang, height = 280 }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const ref = React.useRef<HTMLDivElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || failed) return undefined;
    let map: L.Map | undefined;
    try {
      map = L.map(ref.current, { center: [lat, lng], zoom: 13, scrollWheelZoom: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      }).addTo(map);
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:34px;height:34px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;background:${tk.primary};border:3px solid #fff;box-shadow:0 6px 18px -4px rgba(0,0,0,.5)">📍</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });
      L.marker([lat, lng], { icon }).addTo(map).bindPopup(
        `<b>${nameEn}</b><br/>${nameBn}`,
        { closeButton: false }
      );
    } catch {
      setFailed(true);
    }
    return () => { try { map?.remove(); } catch { /* already gone */ } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, failed]);

  if (failed) return null;

  return (
    <div
      ref={ref}
      aria-label={`${nameEn} — map`}
      style={{ width: '100%', height, borderRadius: 16, overflow: 'hidden', border: `1px solid ${tk.line}`, zIndex: 0 }}
    />
  );
}
