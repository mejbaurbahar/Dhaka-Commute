import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KJ_TOKENS, T, SANS, BEN, N } from '../tokens';
import { PageShell } from './PageShell';
import { BUS_DATA, STATIONS } from '../../../constants';
import { resolveStationIds } from '../../../services/searchService';
import {
  CommunityBus,
  getBuses,
  getBusNumbers,
  isSharing,
  getSharingState,
  startSharing,
  stopSharing,
  subscribe,
  setSharingCallbacks,
  getNearestStopName,
  isBusNumberValid,
  normalizeBusNumber,
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
const LIST_INITIAL = 6;

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

export function BusLiveMapPage(props: Props) {
  const { theme, device, lang, params } = props;
  const busId = params?.busId ?? '';
  const prefillNumber = params?.busNumber ?? '';
  useDocumentTitle(T(lang, 'লাইভ বাস', 'Live Bus'));
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';

  const bus = useMemo(() => BUS_DATA.find(b => b.id === busId), [busId]);
  const routeStops = useMemo(() => (bus?.stops ?? []).map(id => STATIONS[id]).filter(Boolean), [bus]);
  const stopIds = useMemo(() => (bus?.stops ?? []), [bus]);

  // Destination comes from the search's `to` stop (already set in the URL) —
  // no separate destination picker on this page.
  const destStopId = useMemo(() => {
    const to = params?.to ?? '';
    if (!to) return null;
    const ids = resolveStationIds(to);
    return ids.length > 0 ? ids[0] : null;
  }, [params?.to]);

  const [buses, setBuses] = useState<CommunityBus[]>([]);
  const [sharing, setSharing] = useState<SharingState | null>(getSharingState());
  const [shareError, setShareError] = useState<string | null>(null);
  const [approachBanner, setApproachBanner] = useState<string | null>(null);
  const [busNumberInput, setBusNumberInput] = useState(prefillNumber);
  const [knownNumbers, setKnownNumbers] = useState<string[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busLayerRef = useRef<L.LayerGroup | null>(null);

  const card = (p = 16): React.CSSProperties => ({
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 16,
    padding: p,
    marginBottom: 14,
  });

  // ── poll live buses (visibility-gated) ──
  useEffect(() => {
    if (!busId) return;
    const fetchBuses = () => { if (document.visibilityState === 'visible') void getBuses(busId).then(setBuses); };
    void fetchBuses();
    const timer = setInterval(fetchBuses, POLL_MS);
    return () => clearInterval(timer);
  }, [busId]);

  // ── known bus numbers on this route (registry) for the select/add input ──
  useEffect(() => {
    if (!busId) return;
    let alive = true;
    void getBusNumbers(busId).then(entries => {
      if (alive) setKnownNumbers(entries.map(e => e.busNumber).filter(Boolean));
    });
    return () => { alive = false; };
  }, [busId]);

  // ── sharing state subscription ──
  useEffect(() => subscribe(s => setSharing(s)), []);

  // ── approach alert when nearing the destination stop (no popups) ──
  useEffect(() => {
    setSharingCallbacks({
      onApproach: stopId => {
        const s = STATIONS[stopId];
        setApproachBanner(s ? (lang === 'bn' ? `আপনি ${s.bnName} এর কাছে — নামার প্রস্তুতি নিন` : `Approaching ${s.name} — get ready to get off`) : '');
      },
    });
  }, [lang]);

  // ── init Leaflet map (deferred 150ms) + route polyline + stops ──
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
      };
    }, 150);
    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busId]);

  // ── render bus markers: status color, selected/own highlighted, click → popup ──
  useEffect(() => {
    const map = mapRef.current;
    const layer = busLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    buses.forEach(b => {
      const highlighted = b.busNumber !== '' && (b.busNumber === selectedNumber || b.busNumber === sharing?.busNumber);
      const icon = L.divIcon({
        className: '',
        html: busIconHtml(statusColor(b.status), highlighted),
      });
      const nearestId = getNearestStopName(b.lat, b.lng, stopIds);
      const nearest = STATIONS[nearestId];
      const locationName = nearest ? (lang === 'bn' ? nearest.bnName : nearest.name) : '—';
      const label = `<b>${b.busNumber || bus?.name || busId}</b>${b.contributors > 1 ? ` &nbsp;👥 ${b.contributors}` : ''}`;
      const popupHtml =
        `<div style="font-family:'Segoe UI',sans-serif;min-width:170px">` +
        `<div style="font-weight:800;font-size:15px;margin-bottom:4px">🚌 ${b.busNumber || bus?.name || busId}</div>` +
        `<div style="font-size:12px;color:#555;line-height:1.7">📍 ${locationName}<br/>` +
        `${statusLabel(b.status, lang)} · ${b.speed > 1 ? `${Math.round(b.speed * 3.6)} km/h` : '0 km/h'}` +
        `${b.contributors > 1 ? ` · 👥 ${N(b.contributors, lang)}` : ''} · ${ago(b.updatedAt)} আগে/ago</div>` +
        `</div>`;
      L.marker([b.lat, b.lng], { icon })
        .bindTooltip(label, { permanent: false, direction: 'top', offset: [0, -10] })
        .bindPopup(popupHtml, { autoClose: true })
        .on('click', () => { if (b.busNumber) setSelectedNumber(b.busNumber); })
        .addTo(layer);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buses, selectedNumber, sharing?.busNumber]);

  // ── select from list → highlight + fly to the bus on the map ──
  const selectBus = (b: CommunityBus) => {
    if (b.busNumber) setSelectedNumber(b.busNumber);
    const map = mapRef.current;
    if (map && b.lat && b.lng) map.flyTo([b.lat, b.lng], Math.max(map.getZoom(), 14), { duration: 0.8 });
  };

  const onStartSharing = async () => {
    setShareError(null);
    const num = normalizeBusNumber(busNumberInput);
    if (!num) {
      setShareError(T(lang, 'বাস নম্বর লিখুন — এটা আবশ্যক', 'Enter your bus number — it is required'));
      return;
    }
    if (!isBusNumberValid(num)) {
      setShareError(T(lang, 'ভুল বাস নম্বর — সঠিক ফরম্যাট: DA M 12-2467', 'Invalid bus number — correct format: DA M 12-2467'));
      return;
    }
    if (!navigator.geolocation) {
      setShareError(T(lang, 'এই ডিভাইসে GPS নেই', 'This device has no GPS'));
      return;
    }
    const ok = await startSharing({ busId, busNumber: num, destStopId });
    if (ok) setSelectedNumber(num);
    else setShareError(T(lang, 'GPS চালু করুন এবং আবার চেষ্টা করুন', 'Enable GPS and try again'));
  };

  const onGotOff = () => {
    void stopSharing({ leave: true });
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

  function ago(ts: number): string {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return `${s}s`;
    if (s < 3600) return `${Math.floor(s / 60)}m`;
    return `${Math.floor(s / 3600)}h`;
  }

  // visible list: first N, or all when expanded; selected bus always pinned on top
  const visibleBuses = useMemo(() => {
    const list = showAll ? buses : buses.slice(0, LIST_INITIAL);
    const sel = buses.find(b => b.busNumber === selectedNumber);
    if (sel && !list.some(b => b.busNumber === selectedNumber)) {
      return [sel, ...list];
    }
    return list;
  }, [buses, showAll, selectedNumber]);

  return (
    <PageShell {...props}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 14px 24px' }}>
        <div style={card(0)}>
          <div ref={mapContainerRef} style={{ height: isMobile ? 340 : 440, borderRadius: 16, overflow: 'hidden', background: '#0d1117' }} />
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
                {T(lang, 'শেয়ার হচ্ছে:', 'Sharing:')} {bus?.name || sharing.busNumber || busId}
                <span style={{ fontSize: 12, color: tk.textDim, marginLeft: 6 }}>{sharing.busNumber}</span>
              </div>
            </div>
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
              {T(lang, 'শেয়ার করুন — সবাই এই বাসটি এই পাতায় লাইভ দেখতে পারবে। পরিচয় গোপন থাকে।', 'Share — everyone sees this bus live on this page. Your identity stays private.')}
            </div>
            <input
              list="kj-bus-numbers"
              value={busNumberInput}
              onChange={e => { setBusNumberInput(e.target.value); setShareError(null); }}
              placeholder={T(lang, 'বাস নম্বর (আবশ্যক) — যেমন: DA M 12-2467', 'Bus number (required) — e.g. DA M 12-2467')}
              style={inputStyle}
            />
            {knownNumbers.length > 0 && (
              <datalist id="kj-bus-numbers">
                {knownNumbers.map(n => <option key={n} value={n} />)}
              </datalist>
            )}
            <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textFaint, marginBottom: 10 }}>
              {T(lang, 'তালিকায় আপনার নম্বর নেই? নিজের নম্বর লিখে শেয়ার করুন — সবাই দেখতে পাবে।', 'Not on the list? Type your own number to share it — everyone will see it.')}
            </div>
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
              {T(lang, 'এই মুহূর্তে কেউ বাস শেয়ার করছে না। প্রথম ব্যক্তি হয়ে বাস শেয়ার করুন।', 'Nobody is sharing a bus right now. Be the first to share.')}
            </div>
          ) : (
            visibleBuses.map(b => {
              const nearestId = getNearestStopName(b.lat, b.lng, stopIds);
              const nearest = STATIONS[nearestId];
              const isSel = b.busNumber !== '' && b.busNumber === selectedNumber;
              const isOwn = b.busNumber !== '' && b.busNumber === sharing?.busNumber;
              return (
                <div
                  key={b.busNumber || `${b.lat}-${b.lng}`}
                  onClick={() => selectBus(b)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 4px',
                    borderBottom: '1px solid ' + tk.line,
                    cursor: 'pointer',
                    background: isSel ? 'rgba(59,130,246,.12)' : 'transparent',
                    borderRadius: 10,
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor(b.status), flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, color: tk.text }}>
                      {b.busNumber || bus?.name || busId}
                      {b.busNumber && <span style={{ fontSize: 12, color: tk.textDim, marginLeft: 6 }}>{b.busNumber}</span>}
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
          {!showAll && buses.length > LIST_INITIAL && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: '100%',
                marginTop: 10,
                padding: '10px',
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: 14,
                color: tk.primary,
                background: tk.panelMuted,
                border: `1px solid ${tk.line}`,
                borderRadius: 12,
                cursor: 'pointer',
              }}
            >
              {T(lang, `আরও দেখুন (${N(buses.length - LIST_INITIAL, lang)})`, `See more (${N(buses.length - LIST_INITIAL, lang)})`)}
            </button>
          )}
        </div>

        <div style={{ fontFamily: BEN, fontSize: 11, color: tk.textFaint, textAlign: 'center', marginTop: 4 }}>
          {T(lang, 'অবস্থান ১৫ মিনিট পর স্বয়ংক্রিয়ভাবে মুছে যায়। ব্যক্তিগত পরিচয় কখনও প্রকাশ হয় না।', 'Locations expire after 15 minutes. Personal identity is never shown.')}
        </div>
      </div>
    </PageShell>
  );
}
