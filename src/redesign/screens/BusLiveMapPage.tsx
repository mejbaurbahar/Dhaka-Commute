import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KJ_TOKENS, T, SANS, BEN, N } from '../tokens';
import { PageShell } from './PageShell';
import { BUS_DATA, STATIONS } from '../../../constants';
import {
  CommunityBus,
  getBuses,
  isSharing,
  getSharingState,
  startSharing,
  stopSharing,
  setDestinationStop,
  subscribe,
  setSharingCallbacks,
  normalizeBusNumber,
  isBusNumberValid,
  getNearestStopName,
  SharingState,
} from '../../../services/busLiveService';

interface Props {
  theme: 'dark' | 'light';
  device: 'desktop' | 'mobile';
  lang: 'bn' | 'en';
  route: string;
  canBack: boolean;
  onNav: (r: string, p?: Record<string, string>) => void;
  onNavTab?: (r: string) => void;
  onBack: () => void;
  onLang: () => void;
  onTheme: () => void;
  onMenu: () => void;
  params?: Record<string, string>;
}

const DHAKA_CENTER: [number, number] = [23.8103, 90.4125];
const POLL_MS = 15000;

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

function busIconHtml(color: string, ring = false): string {
  const ringStyle = ring ? ';box-shadow:0 0 0 4px rgba(59,130,246,.35),0 2px 8px rgba(0,0,0,.3)' : ';box-shadow:0 2px 8px rgba(0,0,0,.3)';
  return `<div style="width:36px;height:36px;background:${color};border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:-18px 0 0 -18px${ringStyle}">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`;
}

export function BusLiveMapPage(props: Props) {
  const { theme, device, lang, params } = props;
  const busId = params?.busId ?? '';
  const autoShare = params?.share === '1';
  const prefillNumber = params?.busNumber ?? '';
  useDocumentTitle(T(lang, 'লাইভ বাস মানচিত্র', 'Live Bus Map'));
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';

  const bus = useMemo(() => BUS_DATA.find(b => b.id === busId), [busId]);
  const routeStops = useMemo(() => (bus?.stops ?? []).map(id => STATIONS[id]).filter(Boolean), [bus]);
  const stopIds = useMemo(() => (bus?.stops ?? []), [bus]);

  const [buses, setBuses] = useState<CommunityBus[]>([]);
  const [sharing, setSharing] = useState<SharingState | null>(getSharingState());
  const [busNumberInput, setBusNumberInput] = useState(prefillNumber);
  const [operatorInput, setOperatorInput] = useState('');
  const [shareError, setShareError] = useState<string | null>(null);
  const [approachBanner, setApproachBanner] = useState<string | null>(null);
  const [leaveSuggestion, setLeaveSuggestion] = useState(false);
  const [userLatLng, setUserLatLng] = useState<[number, number] | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const ownBusMarkerRef = useRef<string | null>(null);

  const card = (p = 16): React.CSSProperties => ({
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 16,
    padding: p,
    marginBottom: 14,
  });

  // ── poll live buses (visibility-gated, like DTCA page) ──
  useEffect(() => {
    if (!busId) return;
    const fetchBuses = () => { if (document.visibilityState === 'visible') void getBuses(busId).then(setBuses); };
    void fetchBuses();
    const timer = setInterval(fetchBuses, POLL_MS);
    return () => clearInterval(timer);
  }, [busId]);

  // ── sharing state subscription ──
  useEffect(() => subscribe(s => setSharing(s)), []);

  // ── detectors: approach banner + auto get-off dialog ──
  useEffect(() => {
    setSharingCallbacks({
      onApproach: stopId => {
        const s = STATIONS[stopId];
        setApproachBanner(s ? (lang === 'bn' ? `আপনি ${s.bnName} এর কাছে — নামার প্রস্তুতি নিন` : `Approaching ${s.name} — get ready to get off`) : '');
      },
      onAutoLeaveSuggestion: () => setLeaveSuggestion(true),
    });
  }, [lang]);

  // ── user location dot while sharing ──
  useEffect(() => {
    if (!isSharing() || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      pos => {
        const latLng: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLatLng(latLng);
        const map = mapRef.current;
        if (!map) return;
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng(latLng);
        } else {
          const icon = L.divIcon({
            className: '',
            html: `<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,.2);margin:-8px 0 0 -8px"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
          userMarkerRef.current = L.marker(latLng, { icon })
            .bindTooltip(T(lang, 'আপনি এখানে', 'You are here'), { permanent: false })
            .addTo(map);
        }
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
    return () => { navigator.geolocation.clearWatch(watchId); userMarkerRef.current = null; };
  }, [sharing?.busNumber]);

  // ── init Leaflet map (deferred 150ms) + route polyline + stops ──
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;
      const map = L.map(mapContainerRef.current, { zoomControl: true, attributionControl: false })
        .setView(DHAKA_CENTER, 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
      mapRef.current = map;
      busLayerRef.current = L.layerGroup().addTo(map);
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
        userMarkerRef.current = null;
      };
    }, 150);
    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busId]);

  // ── render bus markers (LayerGroup diffing) ──
  useEffect(() => {
    const map = mapRef.current;
    const layer = busLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    ownBusMarkerRef.current = null;
    buses.forEach(b => {
      const icon = L.divIcon({
        className: '',
        html: busIconHtml(statusColor(b.status), b.busNumber === sharing?.busNumber),
      });
      const label = `<b>${b.busNumber}</b>${b.contributors > 1 ? ` &nbsp;👥 ${b.contributors}` : ''}`;
      L.marker([b.lat, b.lng], { icon })
        .bindTooltip(label, { permanent: false, direction: 'top', offset: [0, -10] })
        .addTo(layer);
      if (b.busNumber === sharing?.busNumber) ownBusMarkerRef.current = b.busNumber;
    });
  }, [buses, sharing?.busNumber]);

  const onStartSharing = async () => {
    setShareError(null);
    const bn = normalizeBusNumber(busNumberInput);
    if (!isBusNumberValid(bn)) {
      setShareError(T(lang, 'সঠিক বাস নম্বর দিন (যেমন: DA M 12-2467)', 'Enter a valid bus number (e.g. DA M 12-2467)'));
      return;
    }
    if (!navigator.geolocation) {
      setShareError(T(lang, 'এই ডিভাইসে GPS নেই', 'This device has no GPS'));
      return;
    }
    const ok = await startSharing({ busId, busNumber: bn, operatorName: operatorInput || undefined, destStopId: null });
    if (!ok) setShareError(T(lang, 'GPS চালু করুন এবং আবার চেষ্টা করুন', 'Enable GPS and try again'));
  };

  const onGotOff = async () => {
    if (window.confirm(T(lang, 'আপনি কি বাস থেকে নেমেছেন?', 'Did you get off the bus?'))) {
      await stopSharing({ leave: true });
    }
  };

  const onConfirmAutoLeave = () => {
    void stopSharing({ leave: true });
    setLeaveSuggestion(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: SANS,
    fontSize: 15,
    color: tk.text,
    background: tk.panelMuted,
    border: `1px solid ${tk.line}`,
    borderRadius: 12,
    padding: '11px 14px',
    marginBottom: 10,
    outline: 'none',
  };

  const btn = (bg: string, fg: string): React.CSSProperties => ({
    width: '100%',
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: 15,
    color: fg,
    background: bg,
    border: 'none',
    borderRadius: 12,
    padding: '12px 16px',
    cursor: 'pointer',
  });

  const ago = (ts: number): string => {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return `${s}s`;
    if (s < 3600) return `${Math.floor(s / 60)}m`;
    return `${Math.floor(s / 3600)}h`;
  };

  return (
    <PageShell {...props}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 14px 24px' }}>
        <div style={card(0)}>
          <div ref={mapContainerRef} style={{ height: isMobile ? 320 : 420, borderRadius: 16, overflow: 'hidden', background: '#0d1117' }} />
        </div>

        {approachBanner && (
          <div style={{ ...card(), background: tk.primary, borderColor: tk.primary, color: '#fff' }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15 }}>📍 {approachBanner}</div>
          </div>
        )}

        {sharing ? (
          <div style={card()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', animation: 'kjPulse 1.6s infinite' }} />
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: tk.text }}>
                {T(lang, 'Sharing:', 'শেয়ার হচ্ছে:')} {sharing.busNumber}
              </div>
            </div>
            <select
              value={sharing.destStopId ?? ''}
              onChange={e => setDestinationStop(e.target.value || null)}
              style={{ ...inputStyle, marginBottom: 12, cursor: 'pointer' }}
            >
              <option value="">{T(lang, 'গন্তব্য স্টপ (ঐচ্ছিক)', 'Destination stop (optional)')}</option>
              {stopIds.map(id => {
                const s = STATIONS[id];
                if (!s) return null;
                return <option key={id} value={id}>{lang === 'bn' ? s.bnName : s.name}</option>;
              })}
            </select>
            <button onClick={onGotOff} style={btn('#ef4444', '#fff')}>
              {T(lang, 'আমি বাস থেকে নেমেছি', "I got off")}
            </button>
          </div>
        ) : (
          <div style={card()}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: tk.text, marginBottom: 4 }}>
              {T(lang, 'আপনি কি এই বাসে আছেন?', 'Are you on this bus?')}
            </div>
            <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim, marginBottom: 12 }}>
              {T(lang, 'বাস নম্বর শেয়ার করুন — সবাই রুটের প্রতিটি বাস লাইভ দেখতে পারবে। পরিচয় গোপন থাকে।', 'Share your bus number — everyone sees every bus on this route live. Your identity stays private.')}
            </div>
            <input
              placeholder="DA M 12-2467"
              value={busNumberInput}
              onChange={e => setBusNumberInput(e.target.value)}
              style={inputStyle}
              autoCapitalize="characters"
            />
            <input
              placeholder={T(lang, 'পরিবহন নাম (ঐচ্ছিক)', 'Operator name (optional)')}
              value={operatorInput}
              onChange={e => setOperatorInput(e.target.value)}
              style={inputStyle}
            />
            {shareError && <div style={{ fontFamily: BEN, fontSize: 12, color: '#ef4444', marginBottom: 10 }}>{shareError}</div>}
            <button onClick={onStartSharing} style={btn(tk.primary, '#fff')}>
              {T(lang, 'শেয়ার করা শুরু করুন', 'Start sharing')}
            </button>
          </div>
        )}

        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: tk.text }}>
              {T(lang, 'এই রুটে লাইভ বাস', 'Live buses on this route')}
              {buses.length > 0 && <span style={{ color: '#10b981' }}> ({N(buses.length, lang)})</span>}
            </div>
            <button
              onClick={() => { if (document.visibilityState === 'visible') void getBuses(busId).then(setBuses); }}
              style={{ fontFamily: SANS, fontSize: 13, color: tk.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              ↻ {T(lang, 'রিফ্রেশ', 'Refresh')}
            </button>
          </div>
          {buses.length === 0 ? (
            <div style={{ fontFamily: BEN, fontSize: 13, color: tk.textDim, padding: '8px 0' }}>
              {T(lang, 'এই মুহূর্তে কেউ বাস শেয়ার করছে না। প্রথম ব্যক্তি হয়ে আপনার বাস নম্বর যোগ করুন।', 'Nobody is sharing a bus right now. Be the first to add your bus number.')}
            </div>
          ) : (
            buses.map(b => {
              const nearestId = getNearestStopName(b.lat, b.lng, stopIds);
              const nearest = STATIONS[nearestId];
              const isOwn = b.busNumber === sharing?.busNumber;
              return (
                <div
                  key={b.busNumber}
                  onClick={() => props.onNav('bus-live-map', { busId, share: '1', busNumber: b.busNumber })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 4px',
                    borderBottom: '1px solid ' + tk.line,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor(b.status), flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, color: tk.text }}>
                      {b.busNumber}
                      {isOwn && <span style={{ fontSize: 11, color: '#3b82f6', marginLeft: 6 }}>{T(lang, 'আপনার বাস', 'Your bus')}</span>}
                    </div>
                    <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim }}>
                      {nearest ? (lang === 'bn' ? nearest.bnName : nearest.name) : ''} · {statusLabel(b.status, lang)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textDim }}>
                      {b.contributors > 1 ? `👥 ${N(b.contributors, lang)}` : ''} · {ago(b.updatedAt)}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textFaint }}>
                      {b.speed > 1 ? `${Math.round(b.speed * 3.6)} km/h` : '0 km/h'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={{ fontFamily: BEN, fontSize: 11, color: tk.textFaint, textAlign: 'center', marginTop: 4 }}>
          {T(lang, 'অবস্থান ১৫ মিনিট পর স্বয়ংক্রিয়ভাবে মুছে যায়। ব্যক্তিগত পরিচয় কখনও প্রকাশ হয় না।', 'Locations expire after 15 minutes. Personal identity is never shown.')}
        </div>
      </div>

      {/* auto get-off suggestion dialog */}
      {leaveSuggestion && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1200, padding: 20,
        }}>
          <div style={{ ...card(), maxWidth: 360, width: '100%', marginBottom: 0 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: tk.text, marginBottom: 6 }}>
              {T(lang, 'আপনি কি বাস থেকে নেমেছেন?', 'Did you get off the bus?')}
            </div>
            <div style={{ fontFamily: BEN, fontSize: 13, color: tk.textDim, marginBottom: 14 }}>
              {T(lang, 'আপনার অবস্থান কিছুক্ষণ ধরে একই জায়গায়, কিন্তু বাস চলছে।', 'You have been stationary for a while, but the bus is moving.')}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setLeaveSuggestion(false)} style={{ ...btn(tk.panelMuted, tk.text), flex: 1 }}>
                {T(lang, 'আমি বাসে আছি', "I'm still inside")}
              </button>
              <button onClick={onConfirmAutoLeave} style={{ ...btn(tk.primary, '#fff'), flex: 1 }}>
                {T(lang, 'নেমে গেছি', 'I got off')}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
