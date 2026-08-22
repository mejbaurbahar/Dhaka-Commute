import React, { useEffect, useRef, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KJ_TOKENS, T, SANS, BEN, N, Fare, Tokens, Lang } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { Pill } from '../components/Pill';
import { BD_TRAIN_ROUTES, TRAIN_STATIONS, BDTrainRoute } from '../../../data/bangladeshTrainData';
import { useDocumentTitle, setCanonicalUrl, setMetaTag, setPropertyMetaTag, setJsonLd } from '../utils/useDocumentTitle';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

const slugify = (v: string) => v.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stationName = (id: string) => TRAIN_STATIONS[id]?.name ?? id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const stationBnName = (id: string) => TRAIN_STATIONS[id]?.bnName ?? stationName(id);

function fmtT(v?: string | null) {
  if (!v) return '';
  return v.replace(' BST', '').trim();
}

function fmtHalt(h: string) {
  if (!h || h === 'None' || h === 'undefined') return '';
  const n = parseInt(h);
  if (isNaN(n)) return h;
  return `${n} min`;
}

// ── Schedule-based live position tracker ─────────────────────────────────────
function parseStopMin(t: string | undefined | null): number | null {
  if (!t) return null;
  const m = t.match(/(\d+):(\d+)\s*(am|pm)/i);
  if (!m) return null;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  if (m[3].toLowerCase() === 'pm' && h !== 12) h += 12;
  if (m[3].toLowerCase() === 'am' && h === 12) h = 0;
  return h * 60 + min;
}

function bstNow(): number {
  const d = new Date();
  return ((d.getUTCHours() + 6) % 24) * 60 + d.getUTCMinutes();
}

function fmtEta(mins: number): string {
  if (mins <= 0) return '0m';
  const h = Math.floor(mins / 60), m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function TrainLiveTracker({ train, tk, lang }: { train: BDTrainRoute; tk: Tokens; lang: Lang }) {
  const [nowMin, setNowMin] = useState(bstNow);
  useEffect(() => {
    const id = setInterval(() => setNowMin(bstNow()), 60000);
    return () => clearInterval(id);
  }, []);

  const stops = train.routeStops;
  if (!stops || stops.length < 2) return null;

  // Build flat timeline of milestone minutes
  type Milestone = { label: string; min: number };
  const milestones: Milestone[] = [];
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const arr = parseStopMin(s.arrival);
    const dep = parseStopMin(s.departure);
    if (i === 0) {
      if (dep !== null) milestones.push({ label: s.label, min: dep });
    } else if (i === stops.length - 1) {
      if (arr !== null) milestones.push({ label: s.label, min: arr });
    } else {
      if (arr !== null) milestones.push({ label: s.label, min: arr });
    }
  }
  if (milestones.length < 2) return null;

  // Fix midnight crossings (make monotonically increasing)
  for (let i = 1; i < milestones.length; i++) {
    if (milestones[i].min < milestones[i - 1].min) {
      for (let j = i; j < milestones.length; j++) milestones[j].min += 1440;
    }
  }

  const startMin = milestones[0].min;
  const endMin = milestones[milestones.length - 1].min;
  const totalDur = endMin - startMin;

  // Snap now into the correct 24h window
  let now = nowMin;
  if (now < startMin - 120) now += 1440;

  const color = train.color || '#6366f1';
  const notStarted = now < startMin;
  const finished = now > endMin + 15;

  if (notStarted || finished) {
    const minsTo = notStarted ? startMin - now : null;
    return (
      <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 18, padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: finished ? '#6b7280' : color, display: 'inline-block' }} />
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' as const, color: tk.textFaint }}>
            {T(lang, 'ট্রেনের অবস্থান', 'Train Position')}
          </span>
        </div>
        <div style={{ fontFamily: BEN, fontSize: 14, color: tk.text }}>
          {finished
            ? T(lang, `${train.bnName} আজকের যাত্রা শেষ করেছে।`, `${train.name} has completed today's journey.`)
            : T(lang, `${train.bnName} ${fmtEta(minsTo!)} পরে ছাড়বে।`, `${train.name} departs in ${fmtEta(minsTo!)}.`)}
        </div>
      </div>
    );
  }

  const progress = Math.min(100, ((now - startMin) / totalDur) * 100);

  // Find current segment
  let curIdx = milestones.length - 2;
  for (let i = 0; i < milestones.length - 1; i++) {
    if (now >= milestones[i].min && now < milestones[i + 1].min) { curIdx = i; break; }
  }
  const cur = milestones[curIdx];
  const next = milestones[curIdx + 1] ?? milestones[milestones.length - 1];
  const dest = milestones[milestones.length - 1];
  const minsToNext = next.min - now;
  const minsToDest = dest.min - now;

  return (
    <div style={{ background: tk.panel, border: `1px solid ${color}44`, borderRadius: 18, padding: 16, marginBottom: 16, position: 'relative' as const }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e99' }} />
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' as const, color: '#22c55e' }}>
          {T(lang, 'আনুমানিক অবস্থান', 'Estimated Position')}
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>
          {T(lang, `গন্তব্যে ${fmtEta(minsToDest)}`, `${fmtEta(minsToDest)} to destination`)}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative' as const, height: 8, background: tk.panelMuted, borderRadius: 99, marginBottom: 12, overflow: 'visible' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg,${color},${color}cc)`, borderRadius: 99, transition: 'width 1s' }} />
        {/* Train icon on progress bar */}
        <div style={{ position: 'absolute' as const, top: -7, left: `calc(${progress}% - 10px)`, fontSize: 18, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
          🚆
        </div>
      </div>

      {/* Station info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginBottom: 2 }}>{T(lang, 'বর্তমান স্টেশন', 'Current station')}</div>
          <div style={{ fontFamily: BEN, fontSize: 15, fontWeight: 700, color: tk.text }}>{cur.label}</div>
        </div>
        <div style={{ textAlign: 'right' as const }}>
          <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginBottom: 2 }}>{T(lang, 'পরবর্তী স্টেশন', 'Next station')}</div>
          <div style={{ fontFamily: BEN, fontSize: 15, fontWeight: 700, color: tk.text }}>{next.label}</div>
          <div style={{ fontFamily: SANS, fontSize: 11, color }}>~{fmtEta(minsToNext)}</div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ marginTop: 10, fontFamily: SANS, fontSize: 10, color: tk.textFaint, lineHeight: 1.5 }}>
        {T(lang,
          '⚠️ সময়সূচি অনুযায়ী আনুমানিক অবস্থান। বাস্তব পরিস্থিতি ভিন্ন হতে পারে।',
          '⚠️ Estimated from schedule only. Actual position may differ.'
        )}
      </div>
    </div>
  );
}

// ── Leaflet real-map route view ───────────────────────────────────────────────
function positionAlongPolyline(coords: [number, number][], frac: number): [number, number] {
  if (!coords.length) return [23.5, 90.4];
  const t = Math.max(0, Math.min(1, frac));
  if (coords.length === 1) return coords[0];
  const segs: number[] = [];
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const d = Math.hypot(coords[i + 1][0] - coords[i][0], coords[i + 1][1] - coords[i][1]);
    segs.push(d);
    total += d;
  }
  if (total === 0) return coords[0];
  const target = total * t;
  let cum = 0;
  for (let i = 0; i < segs.length; i++) {
    if (cum + segs[i] >= target) {
      const f = segs[i] > 0 ? (target - cum) / segs[i] : 0;
      return [coords[i][0] + (coords[i + 1][0] - coords[i][0]) * f,
              coords[i][1] + (coords[i + 1][1] - coords[i][1]) * f];
    }
    cum += segs[i];
  }
  return coords[coords.length - 1];
}

function getTrainPosApiBase(): string {
  try {
    const b = (import.meta as any).env?.VITE_PUSH_API_URL as string | undefined;
    return b ? b.replace(/\/$/, '') : '';
  } catch { return ''; }
}

function TrainLeafletMap({ train, tk, lang, theme, isMobile }: {
  train: BDTrainRoute; tk: Tokens; lang: Lang; theme: 'dark'|'light'; isMobile: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const liveMarkerRef = useRef<L.Marker | null>(null);
  const [nowMin, setNowMin] = useState(bstNow);
  // Live position from trainkothai.com via worker proxy (progress % along polyline)
  const [apiData, setApiData] = useState<{ progress: number; speed: number; delay: number; nextStation: string | null } | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNowMin(bstNow()), 60000);
    return () => clearInterval(id);
  }, []);

  // Poll worker every 5 minutes for real train position from trainkothai.com
  useEffect(() => {
    const base = getTrainPosApiBase();
    if (!base || !train.number) return;
    let cancelled = false;
    async function poll() {
      try {
        const resp = await fetch(`${base}/api/train-position?number=${train.number}`, { signal: AbortSignal.timeout(8000) });
        if (cancelled) return;
        if (resp.ok) {
          const data = await resp.json();
          if (data.ok && data.running && typeof data.progress === 'number') {
            setApiData({ progress: data.progress, speed: data.speed || 0, delay: data.delay || 0, nextStation: data.nextStation || null });
          } else if (data.ok && !data.running) {
            setApiData(null);
          }
        }
      } catch {}
    }
    poll();
    const id = setInterval(poll, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(id); };
  }, [train.number]);

  const stops = train.routeStops;
  const color = train.color || '#6366f1';

  // Stable coordinate + milestone data keyed to train identity
  const routeData = useMemo(() => {
    const raw: ([number, number] | null)[] = stops.map(s => {
      const st = TRAIN_STATIONS[s.city];
      return st ? [st.lat, st.lng] : null;
    });
    const coords: [number, number][] = raw.map((c, i) => {
      if (c) return c;
      let pi = i - 1; while (pi >= 0 && !raw[pi]) pi--;
      let ni = i + 1; while (ni < raw.length && !raw[ni]) ni++;
      const p = pi >= 0 ? raw[pi] : null;
      const n = ni < raw.length ? raw[ni] : null;
      if (!p && !n) return [23.5, 90.4];
      if (!p) return n!;
      if (!n) return p;
      const t = (i - pi) / (ni - pi);
      return [p[0] + (n[0] - p[0]) * t, p[1] + (n[1] - p[1]) * t];
    });
    const milestones: { min: number; coord: [number, number] }[] = [];
    stops.forEach((s, i) => {
      const t = i === 0 ? parseStopMin(s.departure) : parseStopMin(s.arrival);
      if (t !== null) milestones.push({ min: t, coord: coords[i] });
    });
    for (let i = 1; i < milestones.length; i++) {
      if (milestones[i].min < milestones[i - 1].min) {
        for (let j = i; j < milestones.length; j++) milestones[j].min += 1440;
      }
    }
    return { coords, raw, milestones };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [train.id]);

  // Live position: prefer trainkothai.com API progress, fall back to schedule interpolation
  const liveCoord = useMemo((): [number, number] | null => {
    const { coords, milestones } = routeData;
    if (apiData !== null) {
      return positionAlongPolyline(coords, apiData.progress / 100);
    }
    if (milestones.length < 2) return null;
    const start = milestones[0].min, end = milestones[milestones.length - 1].min;
    let now = nowMin;
    if (now < start - 120) now += 1440;
    if (now < start || now > end + 15) return null;
    let ci = milestones.length - 2;
    for (let i = 0; i < milestones.length - 1; i++) {
      if (now >= milestones[i].min && now < milestones[i + 1].min) { ci = i; break; }
    }
    const seg = milestones[ci], nxt = milestones[ci + 1];
    if (!seg || !nxt || nxt.min <= seg.min) return null;
    const t = (now - seg.min) / (nxt.min - seg.min);
    return [seg.coord[0] + (nxt.coord[0] - seg.coord[0]) * t, seg.coord[1] + (nxt.coord[1] - seg.coord[1]) * t];
  }, [routeData, nowMin, apiData]);

  // Map init — runs once per train
  useEffect(() => {
    if (!containerRef.current) return;
    const { coords, raw } = routeData;
    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const map = L.map(containerRef.current, {
        zoomControl: true, attributionControl: false, scrollWheelZoom: false,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

      if ('ontouchstart' in window) {
        map.dragging.disable();
        const el = containerRef.current!;
        const onTS = (e: TouchEvent) => { if (e.touches.length >= 2) map.dragging.enable(); };
        const onTE = () => map.dragging.disable();
        el.addEventListener('touchstart', onTS, { passive: true });
        el.addEventListener('touchend', onTE, { passive: true });
      }

      const cls = `kj-tr-${(train.id || String(train.number)).replace(/[^a-z0-9]/gi, '')}`;
      const style = document.createElement('style');
      style.textContent = `.${cls}{background:${color}!important;color:#fff!important;border:none!important;border-radius:4px!important;font-size:9px!important;font-weight:700!important;padding:2px 5px!important;box-shadow:0 1px 4px rgba(0,0,0,.4)!important;white-space:nowrap!important;opacity:1!important}.${cls}::before{display:none!important}`;
      document.head.appendChild(style);

      // Shadow + route polyline
      L.polyline(coords, { color, weight: 8, opacity: 0.15 }).addTo(map);
      L.polyline(coords, { color, weight: 4, opacity: 0.9 }).addTo(map);

      // Station markers with permanent name labels
      stops.forEach((s, i) => {
        const [lat, lng] = coords[i];
        const isFirst = i === 0, isLast = i === stops.length - 1;
        const isKnown = raw[i] !== null;
        const r = isFirst || isLast ? 7 : 4;
        const bg = isFirst ? color : isLast ? '#f59e0b' : (isKnown ? 'white' : 'rgba(255,255,255,0.4)');
        const brd = isFirst ? 'white' : isLast ? '#f59e0b' : color;
        const shadow = isFirst || isLast ? `0 0 8px ${color}88` : '0 1px 3px rgba(0,0,0,.3)';
        const icon = L.divIcon({
          className: '',
          iconAnchor: [r, r],
          html: `<div style="width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:${bg};border:${isFirst || isLast ? 3 : 2}px solid ${brd};box-shadow:${shadow}"></div>`,
        });
        L.marker([lat, lng], { icon })
          .bindTooltip(s.label || s.city.replace(/_/g, ' '), {
            permanent: true,
            direction: isFirst ? 'left' : 'right',
            offset: isFirst ? [-(r + 2), 0] : [r + 2, 0],
            className: cls,
          })
          .addTo(map);
      });

      map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
      setTimeout(() => map.invalidateSize(), 300);
      mapRef.current = map;

      // Draw initial live position marker if train is currently running
      if (liveCoord) {
        const liveIcon = L.divIcon({
          className: '', iconAnchor: [12, 12],
          html: `<div style="font-size:22px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5));line-height:1">🚆</div>`,
        });
        const tip = apiData
          ? `${apiData.speed}km/h${apiData.delay > 0 ? ` · +${apiData.delay}min` : ''}${apiData.nextStation ? ` → ${apiData.nextStation}` : ''}`
          : T(lang, 'আনুমানিক অবস্থান', 'Approx. position');
        liveMarkerRef.current = L.marker(liveCoord, { icon: liveIcon, zIndexOffset: 1000 })
          .bindTooltip(tip, { direction: 'top', offset: [0, -20] })
          .addTo(map);
      }

      cleanup = () => {
        style.remove();
        map.remove();
        mapRef.current = null;
        liveMarkerRef.current = null;
      };
    }, 150);

    return () => { clearTimeout(timer); cleanup?.(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [train.id, routeData]);

  // Update live position marker whenever liveCoord or apiData changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (liveMarkerRef.current) { map.removeLayer(liveMarkerRef.current); liveMarkerRef.current = null; }
    if (!liveCoord) return;
    const liveIcon = L.divIcon({
      className: '', iconAnchor: [12, 12],
      html: `<div style="font-size:22px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5));line-height:1">🚆</div>`,
    });
    const tip = apiData
      ? `${apiData.speed}km/h${apiData.delay > 0 ? ` · +${apiData.delay}min` : ''}${apiData.nextStation ? ` → ${apiData.nextStation}` : ''}`
      : T(lang, 'আনুমানিক অবস্থান', 'Approx. position');
    liveMarkerRef.current = L.marker(liveCoord, { icon: liveIcon, zIndexOffset: 1000 })
      .bindTooltip(tip, { direction: 'top', offset: [0, -20] }
      )
      .addTo(map);
  }, [liveCoord, apiData, lang]);

  return (
    <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 18, padding: 16, marginBottom: 16 }}>
      <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' as const, color: tk.textFaint, marginBottom: 10 }}>
        {T(lang, `রুট ম্যাপ — ${N(stops.length, lang)} স্টেশন`, `Route Map — ${N(stops.length, lang)} Stations`)}
      </div>
      <div ref={containerRef} style={{
        height: isMobile ? 280 : 350,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${tk.line}`,
        background: theme === 'dark' ? '#0d1117' : '#e8f0eb',
      }} />
    </div>
  );
}

export function TrainDetailPage(props: Props) {
  const { theme, device, lang, params } = props;
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (r=16): React.CSSProperties => ({ background:tk.panel, border:`1px solid ${tk.line}`, borderRadius:r, padding:16 });

  // URL is /train/<name-slug> — match by slug or id, never fall back to the
  // first train (that silently showed Kanchon Intercity on every train URL).
  const train = params?.trainId
    ? BD_TRAIN_ROUTES.find(t =>
        t.id === params.trainId ||
        slugify(t.name) === params.trainId ||
        slugify(String(t.number)) === params.trainId
      )
    : undefined;

  if (!train) {
    return (
      <PageShell {...props}>
        <div style={{ padding:isMobile?'24px 16px':'48px 40px', maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:44, marginBottom:12 }}>🚆</div>
          <h2 style={{ fontFamily:BEN, fontWeight:700, fontSize:isMobile?20:24, margin:0 }}>
            {T(lang, 'এই ট্রেনটি পাওয়া যায়নি', 'This train was not found')}
          </h2>
          <p style={{ fontFamily:SANS, fontSize:13, opacity:0.7, marginTop:8, marginBottom:20 }}>
            {T(lang, 'লিংকটি ভুল বা পুরনো হতে পারে।', 'The link may be wrong or outdated.')}
          </p>
          <button onClick={() => props.onNav('train-hub')} style={{ fontFamily:SANS, fontWeight:700, fontSize:13, padding:'10px 22px', borderRadius:999, background:tk.primary, color:'#fff', border:'none', cursor:'pointer' }}>
            {T(lang, 'সব ট্রেন দেখুন', 'See all trains')}
          </button>
        </div>
      </PageShell>
    );
  }

  const stops = train.routeStops;

  const fromName = stationName(stops[0]?.city ?? train.from);
  const toName = stationName(stops[stops.length - 1]?.city ?? train.to);
  const depTime = stops[0]?.departure ? fmtT(stops[0].departure) : train.dhakaDepart;
  const arrTime = stops[stops.length-1]?.arrival ? fmtT(stops[stops.length-1].arrival) : train.destinationArrive;
  const fromLabel = stops[0]?.label || stationName(train.from);
  const toLabel = stops[stops.length-1]?.label || stationName(train.to);

  useDocumentTitle(`${train.name} (${train.number}) Train: ${fromName} → ${toName} Schedule & Fare`);
  useEffect(() => {
    setCanonicalUrl(`/train/${slugify(train.name)}`);
    const minFareVal = train.fare.shuvan || train.fare.shuvanChair || '';
    const minFare = minFareVal ? ` from ৳${minFareVal}` : '';
    const desc = `${train.name}: ${fromName} to ${toName}. Departs ${depTime}, arrives ${arrTime}. Fares${minFare}. Stops, schedule & booking guide on KoyJabo.`;
    setMetaTag('description', desc);
    setPropertyMetaTag('og:description', desc);
    setPropertyMetaTag('og:title', `${train.name}: ${fromName} → ${toName} Train | কই যাবো`);
    setPropertyMetaTag('og:image', 'https://koyjabo.com/og-image.png');
    setJsonLd('faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the schedule of the ${train.name} train?`,
          acceptedAnswer: { '@type': 'Answer', text: `The ${train.name} train departs ${fromName} at ${depTime} and arrives ${toName} at ${arrTime}. Off day: ${train.offDay}. See the full station-by-station schedule on KoyJabo.` },
        },
        {
          '@type': 'Question',
          name: `What is the fare of the ${train.name} train?`,
          acceptedAnswer: { '@type': 'Answer', text: `${train.name} fares start from ৳${train.fare.shuvan || train.fare.shuvanChair || '—'} (Shuvan) with Shuvan Chair, Snigdha and berth classes available. Compare all class fares on KoyJabo.` },
        },
        {
          '@type': 'Question',
          name: `Which stations does the ${train.name} train stop at?`,
          acceptedAnswer: { '@type': 'Answer', text: `The ${train.name} train runs from ${fromName} to ${toName} stopping at ${stops.length} stations. See the complete stop list and timings on KoyJabo.` },
        },
      ],
    });
  }, [train.id, train.name, fromName, toName, depTime, arrTime, train.fare.shuvan, train.fare.shuvanChair, stops.length]);

  const coaches = [
    { l:'Shuvan', bn:'শোভন', c:'#6b7280', f:Fare(train.fare.shuvan, lang) },
    { l:'Shuvan Chair', bn:'শোভন চেয়ার', c:'#f59e0b', f:Fare(train.fare.shuvanChair, lang) },
    { l:'Snigdha', bn:'স্নিগ্ধা', c:'#3b82f6', f:Fare(train.fare.snigdha, lang) },
    train.fare.firstClassBerth ? { l:'First Class Berth', bn:'প্রথম শ্রেণি বার্থ', c:'#10b981', f:Fare(train.fare.firstClassBerth, lang) } : null,
    train.fare.acBerth ? { l:'AC Berth', bn:'এসি বার্থ', c:'#7c3aed', f:Fare(train.fare.acBerth, lang) } : null,
  ].filter((x): x is {l:string;bn:string;c:string;f:string} => !!x);


  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'16px 16px 48px':'28px 40px 48px', maxWidth:1000, margin:'0 auto' }}>

        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${train.color||'#1e1b4b'},#4338ca)`, borderRadius:22, padding:isMobile?18:24, marginBottom:20, color:'#fff' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <span style={{ fontSize:28 }}>🚆</span>
            <div>
              <div style={{ fontFamily:SANS, fontWeight:700, fontSize:12, opacity:0.8, letterSpacing:1 }}>
                {T(lang, 'বাংলাদেশ রেলওয়ে', 'BANGLADESH RAILWAY')} · #{train.number}
              </div>
              <h2 style={{ fontFamily:BEN, fontWeight:700, fontSize:isMobile?20:26, margin:0 }}>
                {T(lang, train.bnName, train.name)}
              </h2>
            </div>
          </div>

          {/* From → To */}
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:14, flexWrap:'wrap' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:SANS, fontWeight:800, fontSize:18 }}>{fromLabel.replace(/_/g,' ')}</div>
              <div style={{ fontFamily:SANS, fontSize:12, opacity:0.8 }}>{depTime}</div>
            </div>
            <div style={{ flex:1, textAlign:'center', minWidth:120 }}>
              {train.totalDuration && <div style={{ fontFamily:SANS, fontSize:11, opacity:0.7 }}>⏱ {train.totalDuration}</div>}
              <div style={{ height:2, background:'rgba(255,255,255,0.35)', borderRadius:999, margin:'6px 0' }}/>
              <div style={{ fontFamily:SANS, fontSize:10, opacity:0.6 }}>{N(stops.length, lang)} stations</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:SANS, fontWeight:800, fontSize:18 }}>{toLabel.replace(/_/g,' ')}</div>
              <div style={{ fontFamily:SANS, fontSize:12, opacity:0.8 }}>{arrTime}</div>
            </div>
          </div>

          {/* Chips */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {[
              train.type,
              train.totalDuration ? `⏱ ${train.totalDuration}` : `${train.distanceKm} km`,
              `${T(lang,'ছুটি','Off')}: ${train.offDay}`,
            ].map((s,i) => (
              <span key={i} style={{ background:'rgba(255,255,255,0.15)', padding:'5px 10px', borderRadius:999, fontFamily:SANS, fontSize:12, fontWeight:600 }}>{s}</span>
            ))}
            {train.runningDays?.length > 0 && (
              <span style={{ background:'rgba(255,255,255,0.15)', padding:'5px 10px', borderRadius:999, fontFamily:SANS, fontSize:12, fontWeight:600 }}>
                📅 {train.runningDays.join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* Route map */}
        <TrainLeafletMap train={train} tk={tk} lang={lang} theme={theme} isMobile={isMobile} />

        {/* Schedule-based estimated position */}
        <TrainLiveTracker train={train} tk={tk} lang={lang} />

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.4fr 1fr', gap:20 }}>
          <div>
            {/* Coach classes */}
            <div style={{ ...card(18), marginBottom:16 }}>
              <div style={{ fontFamily:BEN, fontWeight:700, fontSize:15, color:tk.text, marginBottom:14 }}>
                {T(lang,'কোচ ক্লাস ও ভাড়া','Coach classes')}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {coaches.map(c => (
                  <div key={c.l} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:12, background:tk.panelMuted, border:`1px solid ${tk.line}` }}>
                    <div style={{ width:12, height:12, borderRadius:3, background:c.c }}/>
                    <span style={{ flex:1, fontFamily:BEN, fontWeight:700, fontSize:14, color:tk.text }}>{T(lang,c.bn,c.l)}</span>
                    <span style={{ fontFamily:SANS, fontWeight:800, fontSize:15, color:c.c }}>{c.f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:12, padding:10, background:tk.amberSoft, borderRadius:10, fontFamily:BEN, fontSize:12, color:tk.amber }}>
                {T(lang,'ভাড়া বাংলাদেশ রেলওয়ে ডেটা থেকে। অতিরিক্ত: সার্ভিস চার্জ ৳২০ + ১৫% ভ্যাট।','Base fare from Bangladesh Railway. Add: ৳20 service charge + 15% VAT.')}
              </div>
            </div>
              <NativeAdCard
                tk={tk}
                lang={lang}
                kind="in-article"
                title={T(lang, 'সংশ্লিষ্ট ট্রেন অফার', 'Related train offers')}
                icon="🎫"
              />

            {/* Routes */}
            <div style={{ ...card(18), marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                <div style={{ fontFamily:BEN, fontWeight:700, fontSize:15, color:tk.text }}>
                  {T(lang,'রুট','Routes')}
                  <span style={{ fontFamily:SANS, fontSize:11, color:tk.textFaint, fontWeight:400, marginLeft:6 }}>({N(stops.length, lang)} {T(lang,'স্টেশন','stations')})</span>
                </div>
                {train.totalDuration && (
                  <span style={{ fontFamily:SANS, fontSize:12, color:tk.textFaint }}>
                    {T(lang,'মোট সময়','Total Duration')}: <strong style={{ color:tk.primary }}>{train.totalDuration}</strong>
                  </span>
                )}
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {stops.map((stop, i) => {
                  const isFirst = i === 0;
                  const isLast = i === stops.length - 1;
                  const label = stop.label || stop.city.replace(/_/g,' ');
                  const arrival = fmtT(stop.arrival);
                  const departure = fmtT(stop.departure);
                  const halt = fmtHalt(stop.halt);
                  const duration = stop.duration && stop.duration !== 'None' && stop.duration !== 'undefined' ? stop.duration : '';

                  return (
                    <div key={`${stop.city}-${i}`} style={{ display:'flex', gap:14, position:'relative', paddingBottom:16 }}>
                      {/* Timeline dot + line */}
                      <div style={{ width:20, flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center' }}>
                        <div style={{
                          width: isFirst||isLast ? 18 : 12,
                          height: isFirst||isLast ? 18 : 12,
                          borderRadius: 999,
                          background: isFirst ? tk.primary : isLast ? tk.accent : tk.panelMuted,
                          border: `2px solid ${isFirst ? tk.primary : isLast ? tk.accent : tk.primary}`,
                          marginTop: 3,
                          flexShrink: 0,
                          boxShadow: isFirst||isLast ? `0 0 0 3px ${isFirst?tk.primarySoft:tk.accentSoft}` : 'none',
                        }}/>
                        {!isLast && (
                          <div style={{ width:2, flex:1, background:tk.primary, opacity:0.25, marginTop:3 }}/>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ flex:1, minWidth:0, paddingBottom:isLast?0:4 }}>
                        {/* Station name + pills */}
                        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:6 }}>
                          <span style={{ fontFamily:SANS, fontWeight:isFirst||isLast?700:600, fontSize:14, color:tk.text }}>
                            {label}
                          </span>
                          {isFirst && <Pill tk={tk} tone="primary">{T(lang,'বোর্ডিং','BOARDING')}</Pill>}
                          {isLast && <Pill tk={tk} tone="accent">{T(lang,'গন্তব্য','DESTINATION')}</Pill>}
                        </div>

                        {/* Detail row — always show for all stops */}
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'4px 16px', background:tk.panelMuted, borderRadius:10, padding:'8px 12px' }}>
                          <div>
                            <span style={{ fontFamily:SANS, fontSize:10, color:tk.textFaint, display:'block' }}>
                              {T(lang,'আসে','Arrival')}
                            </span>
                            <span style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:arrival ? tk.text : tk.textFaint }}>
                              {arrival || '—'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontFamily:SANS, fontSize:10, color:tk.textFaint, display:'block' }}>
                              {T(lang,'বিরতি','Halt')}
                            </span>
                            <span style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:halt ? tk.text : tk.textFaint }}>
                              {halt || '—'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontFamily:SANS, fontSize:10, color:tk.textFaint, display:'block' }}>
                              {T(lang,'ছাড়ে','Departure')}
                            </span>
                            <span style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:departure ? tk.text : tk.textFaint }}>
                              {departure || '—'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontFamily:SANS, fontSize:10, color:tk.textFaint, display:'block' }}>
                              {T(lang,'সময়','Duration')}
                            </span>
                            <span style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:duration ? tk.primary : tk.textFaint }}>
                              {duration || '—'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total duration footer */}
              {train.totalDuration && (
                <div style={{ marginTop:8, padding:'10px 14px', background:`${tk.primary}15`, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:SANS, fontSize:12, color:tk.textFaint }}>{T(lang,'মোট যাত্রা সময়','Total journey time')}</span>
                  <span style={{ fontFamily:SANS, fontWeight:800, fontSize:15, color:tk.primary }}>{train.totalDuration}</span>
                </div>
              )}
            </div>

            <NativeAdCard
              tk={tk}
              lang={lang}
              kind={isMobile?'mob-banner':'leaderboard'}
              title={T(lang, 'রেল ভ্রমণের জন্য অফার', 'Offers for rail travel')}
              icon="🚆"
            />
            <NativeAdCard
              tk={tk}
              lang={lang}
              kind="multiplex"
              title={T(lang, 'আরও দেখুন', 'More like this')}
              subtitle={T(lang, 'সংশ্লিষ্ট রুট', 'Related routes')}
              icon="🧭"
            />
          </div>

          {/* Sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ ...card(16), background:'linear-gradient(135deg,#1e1b4b,#4338ca)', color:'#fff', border:'none' }}>
              <div style={{ fontFamily:BEN, fontWeight:700, fontSize:15, marginBottom:12 }}>
                {T(lang,'টিকেট কোথায় পাবেন','Where to buy ticket')}
              </div>
              {[
                { icon:'🌐', l:'eticket.railway.gov.bd', url:'https://eticket.railway.gov.bd' },
                { icon:'🏢', l:T(lang,'রেলওয়ে কাউন্টার','Railway counter'), url:'' },
                { icon:'📞', l:'131', url:'' },
              ].map((d,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ fontSize:16 }}>{d.icon}</span>
                  {d.url
                    ? <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily:BEN, fontSize:13, opacity:0.9, color:'#fff', textDecoration:'underline' }}>{d.l}</a>
                    : <span style={{ fontFamily:BEN, fontSize:13, opacity:0.9 }}>{d.l}</span>
                  }
                </div>
              ))}
              <p style={{ fontFamily:BEN, fontSize:11, opacity:0.7, marginTop:10 }}>
                {T(lang,'কই যাবো টিকেট বিক্রি করে না — শুধু তথ্য।','KoyJabo shows info only — no sales.')}
              </p>
            </div>

            {/* Senior citizen discount */}
            <div style={{ ...card(14), background:'linear-gradient(135deg,#065f4622,#10b98122)', borderColor:'#10b98144' }}>
              <div style={{ fontFamily:BEN, fontWeight:700, fontSize:13, color:tk.text, marginBottom:8 }}>
                👴 {T(lang,'প্রবীণ নাগরিক ছাড়','Senior Citizen Discount')}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                {[
                  [T(lang,'বয়স','Age'), N(65, lang)+'+'],
                  [T(lang,'ছাড়','Discount'), N(25, lang)+'%'],
                  [T(lang,'সাপ্তাহিক সীমা','Weekly limit'), T(lang,'২ যাত্রা',`${N(2,lang)} trips`)],
                  [T(lang,'সহযাত্রী','Co-passenger'), N(1, lang)],
                ].map(([l,v],i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', fontFamily:SANS, fontSize:12 }}>
                    <span style={{ color:tk.textFaint }}>{l}</span>
                    <span style={{ color:tk.text, fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees + Payment methods */}
            <div style={{ ...card(14) }}>
              <div style={{ fontFamily:BEN, fontWeight:700, fontSize:13, color:tk.text, marginBottom:8 }}>
                💳 {T(lang,'ফি ও পেমেন্ট','Fees & Payment')}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:10 }}>
                {[
                  [T(lang,'সার্ভিস চার্জ','Service charge'), Fare(20, lang)],
                  [T(lang,'ভ্যাট','VAT'), N(15, lang)+'%'],
                  [T(lang,'বিছানা ফি','Bedding fee'), Fare(50, lang)],
                  [T(lang,'সর্বোচ্চ টিকেট','Max tickets'), N(4, lang)],
                ].map(([l,v],i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', fontFamily:SANS, fontSize:12 }}>
                    <span style={{ color:tk.textFaint }}>{l}</span>
                    <span style={{ color:tk.text, fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily:SANS, fontSize:11, color:tk.textFaint, marginBottom:6 }}>{T(lang,'পেমেন্ট পদ্ধতি','Payment methods')}:</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                {['bKash','Nagad','Rocket','Visa','MasterCard','DBBL Nexus'].map(m => (
                  <span key={m} style={{ background:tk.panelMuted, border:`1px solid ${tk.line}`, borderRadius:6, padding:'3px 8px', fontFamily:SANS, fontSize:10, fontWeight:600, color:tk.textDim }}>{m}</span>
                ))}
              </div>
            </div>

            {!isMobile && (
              <NativeAdCard
                tk={tk}
                lang={lang}
                kind="mid-rect"
                title={T(lang, 'ভ্রমণ ও টিকেট অফার', 'Travel & ticket offers')}
                subtitle={T(lang, 'কার্ড ও প্ল্যাটফর্ম ডিল', 'Card & platform deals')}
                icon="🎁"
                compact
              />
            )}
          </div>
        </div>
      </div>
          <AdCluster tk={tk} lang={lang} count={1} isMobile={isMobile}/>
    </PageShell>
  );
}
