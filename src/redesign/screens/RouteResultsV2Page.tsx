import React, { useState, useMemo } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { KJ_TOKENS, SANS, BEN, T, N, Tokens, Lang } from '../tokens';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { GovAdBanner } from '../components/GovAdBanner';
import { PageShell } from './PageShell';
import { BUS_DATA, STATIONS } from '../../../constants';
import { trackBusSearch } from '../../../services/analyticsService';
import { inHours, nextMorning, trackPushEvent } from '../../services/pushService';
import { getFavoriteBusIds, toggleFavoriteBus } from '../utils/favorites';
import { Icon } from '../components/Icons';
import { enhancedBusSearch } from '../../../services/searchService';
import { DTCABusListSection } from '../components/DTCABusListSection';
import { findTransitRoutes, fuzzyMatchStop } from '../../../services/transitPlanner';

const DTCA_STOPPAGES = ['agora','banani','dcc','gulshan 1','gulshan 2','gulshan1','gulshan2','nabisco mor','notun bazar','natun bazar','police plaza','shanta tower'];
const DTCA_OPERATOR_TERMS = ['dhakar chaka','dhaka chaka','chaka','ঢাকার চাকা','ঢাকা চাকা','gulshan chaka','গুলশান চাকা'];
function matchesDtcaRoute(q: string): boolean {
  if (!q) return false;
  const lq = q.toLowerCase().trim();
  return DTCA_STOPPAGES.some(s => lq.includes(s)) || DTCA_OPERATOR_TERMS.some(t => lq.includes(t));
}

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:Lang; route:string; canBack:boolean; onNav:(r:string,p?:Record<string,string>)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

const normQ = (s: string) => s.toLowerCase().replace(/[\s\-\.]/g,'');

function busMatchesRoute(r: typeof BUS_DATA[0], from: string, to: string): boolean {
  if (!from && !to) return true;
  const rf = normQ(from); const rt = normQ(to);
  const matchF = !from || r.routeString.toLowerCase().includes(from.toLowerCase()) || r.stops.some(s=>normQ(s).includes(rf));
  const matchT = !to || r.routeString.toLowerCase().includes(to.toLowerCase()) || r.stops.some(s=>normQ(s).includes(rt));
  return matchF && matchT;
}

const TYPE_COLOR: Record<string, string> = {
  'AC': '#006a4e', 'Local': '#1e3a8a', 'Double-Decker': '#7c3aed',
  'Semi-Sitting': '#0c4a6e', 'Sitting': '#b45309',
};

const BUS_FARE: Record<string, number> = { 'AC': 60, 'Double-Decker': 50 };
function getFare(r: typeof BUS_DATA[0]): number { return BUS_FARE[r.type] ?? 30; }

// Get unique operators from BUS_DATA (top 8 by count)
const TOP_OPERATORS = (() => {
  const counts: Record<string, number> = {};
  for (const b of BUS_DATA) {
    const op = b.name.split(' ')[0];
    counts[op] = (counts[op] || 0) + 1;
  }
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([op])=>op);
})();

export function RouteResultsV2Page(props: Props) {
  const { theme, device, lang, onNav, params } = props;
  useDocumentTitle(lang === 'bn' ? 'রুট ফলাফল' : 'Route Results');
  const isMobile = device === 'mobile';
  const tk: Tokens = KJ_TOKENS[theme];
  const lbl = (en: string, bn: string) => T(lang, bn, en);

  const fromQ = params?.from ?? '';
  const toQ = params?.to ?? '';
  const searchQ = params?.search ?? '';
  const sortParam = params?.sort ?? null;   // 'fastest'|'cheapest'|'non-ac'|'now'
  const showDtca = matchesDtcaRoute(fromQ) || matchesDtcaRoute(toQ) || matchesDtcaRoute(searchQ);

  // ── Filter state ─────────────────────────────────────────────────────────────
  const [activeTOD, setActiveTOD] = useState<string | null>(null);
  const [fareMin, setFareMin] = useState(20);
  const [fareMax, setFareMax] = useState(1200);
  const [selTypes, setSelTypes] = useState<Set<string>>(new Set());
  const [selOps, setSelOps] = useState<Set<string>>(new Set());
  const [selAmenities, setSelAmenities] = useState<Set<string>>(new Set());
  const [sortMode, setSortMode] = useState<'default'|'fastest'|'cheapest'>(
    sortParam === 'fastest' ? 'fastest' : sortParam === 'cheapest' ? 'cheapest' : 'default'
  );
  const [nonAcOnly, setNonAcOnly] = useState(sortParam === 'non-ac');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteBusIds());
  const [filterOpen, setFilterOpen] = useState(false); // mobile filter panel

  // Push reminders for this search: "check your results" (+1h) and
  // "yesterday you searched — what today?" (next morning). Replaced by
  // each new search; cancelled when the user opens a result/detail.
  React.useEffect(() => {
    if (!fromQ && !toQ && !searchQ) return;
    const url =
      `/local-bus/results?from=${encodeURIComponent(fromQ)}&to=${encodeURIComponent(toQ)}` +
      (searchQ ? `&search=${encodeURIComponent(searchQ)}` : '');
    trackPushEvent('search-check', { url, from: fromQ, to: toQ }, inHours(1));
    trackPushEvent('search-tomorrow', { url, from: fromQ, to: toQ }, nextMorning());
  }, [fromQ, toQ, searchQ]);

  // ── Transit routes (1-transfer) for when no direct bus is found ─────────────
  const transitRoutes = useMemo(() => {
    if (!fromQ || !toQ) return [];
    const fromId = fuzzyMatchStop(fromQ);
    const toId = fuzzyMatchStop(toQ);
    if (!fromId || !toId || fromId === toId) return [];
    return findTransitRoutes(fromId, toId);
  }, [fromQ, toQ]);

  // ── TOD hours mapping ─────────────────────────────────────────────────────────
  const todHours: Record<string, [number, number]> = {
    Morning: [5, 12],
    Afternoon: [12, 17],
    Evening: [17, 21],
    Night: [21, 24],
  };

  // ── Base filtered results ─────────────────────────────────────────────────────
  const RESULTS = useMemo(() => {
    let filtered = BUS_DATA.filter(r => r.active !== false);

    // Search/route filter
    if (searchQ) {
      const searchResult = enhancedBusSearch(searchQ);
      if (searchResult.buses.length > 0) {
        const ids = new Set(searchResult.buses.map(b => b.id));
        filtered = filtered.filter(r => ids.has(r.id));
      } else {
        filtered = [];
      }
    } else if (fromQ || toQ) {
      const combined = [fromQ, toQ].filter(Boolean).join(' to ');
      const searchResult = enhancedBusSearch(combined);
      if (searchResult.buses.length > 0) {
        const ids = new Set(searchResult.buses.map(b => b.id));
        filtered = filtered.filter(r => ids.has(r.id));
      } else {
        filtered = filtered.filter(r => busMatchesRoute(r, fromQ, toQ));
      }
    }

    // Non-AC chip (from home)
    if (nonAcOnly) {
      filtered = filtered.filter(r => r.type !== 'AC');
    }

    // Time of day filter
    if (activeTOD && todHours[activeTOD]) {
      const [hStart, hEnd] = todHours[activeTOD];
      filtered = filtered.filter(r => {
        if (!r.hours) return true; // no hours data → include
        const start = parseInt(r.hours.split('-')[0] || '0');
        return start >= hStart && start < hEnd;
      });
    }

    // Fare range filter
    filtered = filtered.filter(r => {
      const fare = getFare(r);
      return fare >= fareMin && fare <= fareMax;
    });

    // Bus type filter
    if (selTypes.size > 0) {
      filtered = filtered.filter(r => selTypes.has(r.type));
    }

    // Operator filter
    if (selOps.size > 0) {
      filtered = filtered.filter(r => {
        const op = r.name.split(' ')[0];
        return selOps.has(op);
      });
    }

    // Amenities filter
    if (selAmenities.has('AC')) filtered = filtered.filter(r => r.type === 'AC');
    if (selAmenities.has('Charger')) filtered = filtered.filter(r => r.type === 'AC' || r.type === 'Double-Decker');
    if (selAmenities.has('WiFi')) filtered = filtered.filter(r => r.type === 'AC');

    // Sorting
    if (sortMode === 'cheapest') {
      filtered = [...filtered].sort((a, b) => getFare(a) - getFare(b));
    } else if (sortMode === 'fastest') {
      // Fewer stops = faster. Was inverted (most stops ranked "fastest").
      filtered = [...filtered].sort((a, b) => (a.stops.length) - (b.stops.length));
    }

    return filtered.slice(0, 30).map((r) => {
      const stopNames = r.stops.map(sid => STATIONS[sid]?.name ?? sid.replace(/_/g,' ')).slice(0, 6);
      return {
        busId: r.id, badge: r.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
        name: r.name, nameBn: r.bnName,
        route: r.routeString, type: r.type, typeBn: r.type,
        badgeColor: TYPE_COLOR[r.type] ?? '#1e3a8a',
        fare: getFare(r), fareLabel: `৳${getFare(r)}`,
        stops: stopNames, hours: r.hours,
        isAC: r.type === 'AC',
      };
    });
  }, [fromQ, toQ, searchQ, activeTOD, fareMin, fareMax, selTypes, selOps, selAmenities, sortMode, nonAcOnly]);

  // ── Toggle helpers ─────────────────────────────────────────────────────────────
  const toggleSet = (s: Set<string>, val: string): Set<string> => {
    const n = new Set(s);
    n.has(val) ? n.delete(val) : n.add(val);
    return n;
  };

  // ── Active filter count ────────────────────────────────────────────────────────
  const activeFilterCount = (activeTOD ? 1 : 0) + (fareMin > 20 || fareMax < 1200 ? 1 : 0) +
    selTypes.size + selOps.size + selAmenities.size + (nonAcOnly ? 1 : 0);

  // ── Filter sidebar content ──────────────────────────────────────────────────────
  const FilterContent = () => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: tk.text }}>
          {lbl('Filters', 'ফিল্টার')} {activeFilterCount > 0 && <span style={{ background: tk.primary, color: tk.primaryInk, borderRadius: 999, padding: '1px 7px', fontSize: 11, marginLeft: 4 }}>{activeFilterCount}</span>}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={() => { setActiveTOD(null); setFareMin(20); setFareMax(1200); setSelTypes(new Set()); setSelOps(new Set()); setSelAmenities(new Set()); setNonAcOnly(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: SANS, fontSize: 11, color: tk.textFaint, textDecoration: 'underline' }}>
            {lbl('Clear all', 'সব মুছুন')}
          </button>
        )}
      </div>

      {/* Sort */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
          {lbl('Sort by', 'সাজান')}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[['default', lbl('Best match', 'সেরা')], ['cheapest', lbl('Cheapest', 'সস্তা')], ['fastest', lbl('Fastest', 'দ্রুত')]].map(([val, label]) => (
            <button key={val} onClick={() => setSortMode(val as any)}
              style={{ background: sortMode === val ? tk.primarySoft : tk.panelMuted, border: `1px solid ${sortMode === val ? tk.primary : tk.line}`, borderRadius: 8, padding: '5px 10px', cursor: 'pointer', fontFamily: SANS, fontSize: 11, fontWeight: sortMode === val ? 700 : 500, color: sortMode === val ? tk.primary : tk.textDim }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Non-AC toggle */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: SANS, fontSize: 13, color: tk.textDim }}>
          <input type="checkbox" checked={nonAcOnly} onChange={e => setNonAcOnly(e.target.checked)} style={{ accentColor: tk.primary, width: 14, height: 14 }} />
          {lbl('Non-AC only', 'নন-এসি শুধু')}
        </label>
      </div>

      {/* Time of day */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
          {lbl('Time of Day', 'সময়')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[{l:'Morning',b:'সকাল'},{l:'Afternoon',b:'দুপুর'},{l:'Evening',b:'সন্ধ্যা'},{l:'Night',b:'রাত'}].map(t => (
            <button key={t.l} onClick={() => setActiveTOD(activeTOD === t.l ? null : t.l)}
              style={{ background: activeTOD === t.l ? tk.primarySoft : tk.panelMuted, border: `1px solid ${activeTOD === t.l ? tk.primary : tk.line}`, borderRadius: 8, padding: '7px 4px', cursor: 'pointer', fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: activeTOD === t.l ? 700 : 500, color: activeTOD === t.l ? tk.primary : tk.textDim }}>
              {lbl(t.l, t.b)}
            </button>
          ))}
        </div>
      </div>

      {/* Fare range — real inputs */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
          {lbl('Fare Range', 'ভাড়া')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 12, color: tk.textDim, marginBottom: 6 }}>
          <span>৳{fareMin}</span><span>৳{fareMax}</span>
        </div>
        {/* Distribution bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36, marginBottom: 10 }}>
          {[20,30,40,60,80,100,120].map((f, i) => {
            const inRange = f >= fareMin && f <= fareMax;
            const h = f <= 30 ? 40 : f <= 60 ? 100 : f <= 100 ? 70 : 30;
            return <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: inRange ? tk.primary : tk.panelMuted, transition: 'background 0.15s' }} />;
          })}
        </div>
        <input type="range" min={20} max={1200} step={10} value={fareMin}
          onChange={e => setFareMin(Math.min(Number(e.target.value), fareMax - 10))}
          style={{ width: '100%', accentColor: tk.primary, marginBottom: 6 }} />
        <input type="range" min={20} max={1200} step={10} value={fareMax}
          onChange={e => setFareMax(Math.max(Number(e.target.value), fareMin + 10))}
          style={{ width: '100%', accentColor: tk.primary }} />
      </div>

      {/* Bus type */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{lbl('Bus Type', 'বাসের ধরন')}</div>
        {[['Local', lbl('Local','লোকাল')], ['AC', lbl('AC','এসি')], ['Double-Decker', lbl('Double Decker','ডবল ডেকার')]].map(([val, label]) => (
          <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, cursor: 'pointer', fontFamily: SANS, fontSize: 13, color: tk.textDim }}>
            <input type="checkbox" checked={selTypes.has(val)} onChange={() => setSelTypes(toggleSet(selTypes, val))} style={{ accentColor: tk.primary, width: 14, height: 14 }} />
            {label}
          </label>
        ))}
      </div>

      {/* Operator — from real BUS_DATA */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{lbl('Operator', 'অপারেটর')}</div>
        {TOP_OPERATORS.map(op => (
          <label key={op} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, cursor: 'pointer', fontFamily: SANS, fontSize: 13, color: tk.textDim }}>
            <input type="checkbox" checked={selOps.has(op)} onChange={() => setSelOps(toggleSet(selOps, op))} style={{ accentColor: tk.primary, width: 14, height: 14 }} />
            {op}
          </label>
        ))}
      </div>

      {/* Amenities */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{lbl('Amenities', 'সুবিধা')}</div>
        {[['AC', lbl('AC','এসি')], ['Charger', lbl('Charger','চার্জার')], ['WiFi', lbl('WiFi','ওয়াইফাই')]].map(([val, label]) => (
          <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, cursor: 'pointer', fontFamily: SANS, fontSize: 13, color: tk.textDim }}>
            <input type="checkbox" checked={selAmenities.has(val)} onChange={() => setSelAmenities(toggleSet(selAmenities, val))} style={{ accentColor: tk.primary, width: 14, height: 14 }} />
            {label}
          </label>
        ))}
      </div>
    </>
  );

  return (
    <PageShell {...props}>
    <div style={{ color: tk.text }}>
      {/* Hero bar */}
      <div style={{ background: tk.panel, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${tk.line}`, padding: isMobile ? '16px' : '16px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* From → To */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <div style={{ background: tk.inputBg, border: `1px solid ${tk.line}`, borderRadius: 10, padding: '8px 12px', fontFamily: SANS, fontSize: 14, fontWeight: 600, color: tk.text, minWidth: 120 }}>
              {fromQ || lbl('Any origin', 'যেকোনো')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: SANS, fontSize: 12, color: tk.textFaint, whiteSpace: 'nowrap' }}>
              <div style={{ width: 28, height: 1, background: tk.line }} />
              <span>→</span>
              <div style={{ width: 28, height: 1, background: tk.line }} />
            </div>
            <div style={{ background: tk.inputBg, border: `1px solid ${tk.line}`, borderRadius: 10, padding: '8px 12px', fontFamily: SANS, fontSize: 14, fontWeight: 600, color: tk.text, minWidth: 120 }}>
              {toQ || lbl('Any destination', 'যেকোনো')}
            </div>
            <button onClick={() => onNav('bus-hub', { from: toQ, to: fromQ })} aria-label={lbl('Swap origin and destination', 'যাত্রা শুরু ও গন্তব্য অদলবদল')}
              style={{ background: tk.primarySoft, border: `1px solid ${tk.primary}`, borderRadius: 8, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Icon.swap s={16} /></button>
          </div>

          {/* Stat chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 999, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: SANS, fontSize: 12 }}>
              <span>🚌</span>
              <span style={{ color: tk.textDim }}>{lbl('Results', 'ফলাফল')}</span>
              <span style={{ color: tk.text, fontWeight: 700 }}>{N(RESULTS.length, lang)}</span>
            </div>
            {activeFilterCount > 0 && (
              <div style={{ background: tk.primarySoft, border: `1px solid ${tk.primary}`, borderRadius: 999, padding: '6px 14px', fontFamily: SANS, fontSize: 12, color: tk.primary, fontWeight: 600 }}>
                {activeFilterCount} {lbl('filter(s) active', 'ফিল্টার চালু')}
              </div>
            )}
            {/* Mobile filter toggle */}
            {isMobile && (
              <button onClick={() => setFilterOpen(!filterOpen)}
                style={{ marginLeft: 'auto', background: filterOpen ? tk.primarySoft : tk.panelMuted, border: `1px solid ${filterOpen ? tk.primary : tk.line}`, borderRadius: 999, padding: '6px 14px', cursor: 'pointer', fontFamily: SANS, fontSize: 12, color: filterOpen ? tk.primary : tk.textDim, fontWeight: filterOpen ? 700 : 500 }}>
                🔧 {lbl('Filters', 'ফিল্টার')} {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            )}
          </div>

          {/* Mobile filter panel */}
          {isMobile && filterOpen && (
            <div style={{ marginTop: 16, background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 16 }}>
              <FilterContent />
            </div>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '16px' : '24px 32px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        {/* Filter sidebar — desktop only */}
        {!isMobile && (
          <div style={{ width: 260, flexShrink: 0, background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 20, boxShadow: tk.shadow, position: 'sticky', top: 76, alignSelf: 'flex-start', height: 'fit-content' }}>
            <FilterContent />
          </div>
        )}

        {/* Results list */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* DTCA live buses — shown when search matches Dhaka local stoppage names */}
          {showDtca && (
            <DTCABusListSection
              tk={tk}
              lang={lang}
              onBusClick={(identifier, vrn) => onNav('dtca-bus-detail', { identifier, vrn })}
            />
          )}

          {RESULTS.length === 0 && (
            <>
              <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 16, fontWeight: 700, color: tk.text, marginBottom: 8 }}>
                  {lbl('No direct bus found', 'সরাসরি বাস পাওয়া যায়নি')}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: tk.textFaint }}>
                  {lbl('Try adjusting filters or changing From/To', 'ফিল্টার পরিবর্তন করুন বা রুট বদলান')}
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={() => { setActiveTOD(null); setFareMin(20); setFareMax(1200); setSelTypes(new Set()); setSelOps(new Set()); setSelAmenities(new Set()); setNonAcOnly(false); }}
                    style={{ marginTop: 16, background: tk.primarySoft, border: `1px solid ${tk.primary}`, borderRadius: 10, padding: '8px 18px', cursor: 'pointer', fontFamily: SANS, fontSize: 13, color: tk.primary, fontWeight: 600 }}>
                    {lbl('Clear all filters', 'সব ফিল্টার মুছুন')}
                  </button>
                )}
              </div>

              {/* Transit route suggestions — clickable cards with full detail + map */}
              {transitRoutes.length > 0 && (
                <div style={{ background: tk.panel, border: `1.5px solid #f97316`, borderRadius: 16, padding: '18px 18px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 20 }}>🔀</span>
                    <div>
                      <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 15, fontWeight: 700, color: '#f97316' }}>
                        {lbl('Transit Required — No Direct Bus', 'সরাসরি বাস নেই — ট্রানজিট করুন')}
                      </div>
                      <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textFaint, marginTop: 2 }}>
                        {lbl('Tap a route below to see the full map & all stops', 'নিচের রুটে ট্যাপ করুন — পুরো ম্যাপ ও স্টপ দেখতে')}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {transitRoutes.map((r, ri) => {
                      const leg1 = r.legs[0];
                      const leg2 = r.legs[1];
                      const handleClick = () => {
                        if (leg1) props.onNav('bus-detail', { busId: leg1.busId, from: leg1.fromId, to: leg1.toId });
                      };
                      return (
                        <button
                          key={ri}
                          onClick={handleClick}
                          style={{ background: tk.bg, border: `1px solid ${tk.line}`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left' as const, width: '100%', transition: 'border-color 0.15s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#f97316'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = tk.line; }}
                        >
                          {r.legs.length === 1 ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              <span style={{ background: tk.primary, color: '#fff', borderRadius: 6, padding: '3px 10px', fontFamily: SANS, fontSize: 12, fontWeight: 700 }}>{leg1.bus}</span>
                              <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, color: tk.text }}>{lang === 'bn' ? `${leg1.fromBn} → ${leg1.toBn}` : `${leg1.from} → ${leg1.to}`}</span>
                              <span style={{ fontFamily: SANS, fontSize: 11, color: '#10b981', marginLeft: 'auto', fontWeight: 700 }}>{lbl('Direct ›', 'সরাসরি ›')}</span>
                            </div>
                          ) : (
                            <>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>
                                  {lbl('Transfer at', 'বদলান')} <strong style={{ color: '#f97316' }}>{lang === 'bn' && r.transferAtBn ? r.transferAtBn : r.transferAt}</strong>
                                </div>
                                <span style={{ fontFamily: SANS, fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>{lbl('View map & stops ›', 'ম্যাপ ও স্টপ দেখুন ›')}</span>
                              </div>
                              {r.legs.map((leg, li) => (
                                <div key={li} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: li < r.legs.length - 1 ? 8 : 0 }}>
                                  <span style={{ background: li === 0 ? tk.primary : '#f59e0b', color: '#fff', borderRadius: 6, padding: '3px 10px', fontFamily: SANS, fontSize: 12, fontWeight: 700 }}>
                                    {li === 0 ? '①' : '②'} {lang === 'bn' ? leg.busBn : leg.bus}
                                  </span>
                                  <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, color: tk.text }}>
                                    {lang === 'bn' ? `${leg.fromBn} → ${leg.toBn}` : `${leg.from} → ${leg.to}`}
                                  </span>
                                  {leg.stopsBetween > 0 && (
                                    <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, background: tk.panelMuted, borderRadius: 4, padding: '2px 6px' }}>{leg.stopsBetween} {lbl('stops', 'স্টপ')}</span>
                                  )}
                                </div>
                              ))}
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 12, fontFamily: SANS, fontSize: 12, color: tk.textFaint, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>💡</span>
                    <span>{lbl('Board the first bus, alight at the transfer stop, then take the second bus.', 'প্রথম বাসে চড়ুন, ট্রান্সফার পয়েন্টে নামুন, তারপর দ্বিতীয় বাসে উঠুন।')}</span>
                  </div>
                </div>
              )}

              <NativeAdCard
                tk={tk}
                lang={lang}
                kind="in-article"
                title={lbl('Related travel options', 'সংশ্লিষ্ট ভ্রমণ বিকল্প')}
                subtitle={lbl('Alternate routes & deals', 'বিকল্প রুট ও ডিল')}
                icon="🧭"
              />
            </>
          )}

          {RESULTS.map((r, idx) => (
            <React.Fragment key={r.busId}>
              {idx === 2 && !isMobile && (
                <NativeAdCard
                  tk={tk}
                  lang={lang}
                  kind="leaderboard"
                  title={lbl('Related deals for this route', 'এই রুটের জন্য সংশ্লিষ্ট ডিল')}
                  icon="🎯"
                />
              )}
              {idx === 5 && (
                <NativeAdCard
                  tk={tk}
                  lang={lang}
                  kind="in-article"
                  title={lbl('You might also consider', 'আপনি এগুলিও দেখতে পারেন')}
                  subtitle={lbl('Alternate operators & fares', 'বিকল্প অপারেটর ও ভাড়া')}
                  icon="💡"
                />
              )}
              <div className={`kj-card kj-enter-${Math.min(idx + 1, 6)}`} style={{ background: tk.panel, border: `1px solid ${r.isAC ? '#10b981' : tk.line}`, borderRadius: 18, overflow: 'hidden', boxShadow: tk.shadow }}>
                {r.isAC && (
                  <div style={{ background: 'linear-gradient(135deg,#10b981,#059669)', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>❄️</span>
                    <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: '#fff' }}>AC</span>
                    <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', borderRadius: 4, padding: '2px 8px', fontFamily: SANS, fontSize: 11, color: '#fff' }}>
                      {sortMode === 'cheapest' ? '💰 ' + lbl('Cheapest', 'সস্তা') : sortMode === 'fastest' ? '⚡ ' + lbl('Fastest', 'দ্রুত') : lbl('Best match', 'সেরা')}
                    </span>
                  </div>
                )}
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg,${r.badgeColor},${r.badgeColor}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: 13, fontWeight: 800, color: '#fff' }}>
                      {r.badge}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 15, fontWeight: 700, color: tk.text }}>
                          {lbl(r.name, r.nameBn)}
                        </div>
                        <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: '#10b981' }}>৳{r.fare}</span>
                      </div>
                      <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, color: tk.textDim, marginTop: 2 }}>{r.route}</div>
                      {/* Stop pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, overflowX: 'auto' }}>
                        {r.stops.map((stop, si) => (
                          <React.Fragment key={stop}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                              <div style={{ width: si === 0 || si === r.stops.length-1 ? 10 : 7, height: si === 0 || si === r.stops.length-1 ? 10 : 7, borderRadius: '50%', background: si === 0 || si === r.stops.length-1 ? r.badgeColor : tk.primary, border: `2px solid ${tk.bg}`, boxShadow: `0 0 0 1px ${si === 0 || si === r.stops.length-1 ? r.badgeColor : tk.primary}` }} />
                              {!isMobile && <span style={{ fontFamily: SANS, fontSize: 9, color: tk.textFaint, whiteSpace: 'nowrap' }}>{stop}</span>}
                            </div>
                            {si < r.stops.length-1 && <div style={{ flex: 1, height: 2, background: tk.line, minWidth: 16, flexShrink: 1 }} />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 6, padding: '3px 8px', fontFamily: SANS, fontSize: 12, color: tk.textDim }}>
                            {lbl(r.type, r.typeBn)}
                          </span>
                          {r.stops.length > 0 && <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>{N(r.stops.length, lang)} {lbl('stops', 'স্টপ')}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <button onClick={() => setFavoriteIds(toggleFavoriteBus(r.busId, r.name))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: favoriteIds.includes(r.busId) ? tk.accent : tk.textFaint }}>
                            {favoriteIds.includes(r.busId) ? '♥' : '♡'}
                          </button>
                          <button onClick={() => { trackBusSearch(r.busId, r.name); onNav('bus-detail', { busId: r.busId, from: fromQ, to: toQ }); }}
                            style={{ background: tk.primarySoft, border: `1px solid ${tk.primary}`, borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: 600, color: tk.primary }}>
                            {lbl('View details', 'বিস্তারিত')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <AdSlot tk={tk} lang={lang} kind={isMobile ? 'mob-banner' : 'leaderboard'} />
          </div>
        </div>
      </div>
    </div>
          <div style={{ padding: isMobile ? '16px 16px 0' : '16px 40px 0' }}>
            <GovAdBanner lang={lang} height={isMobile ? 200 : 230} ids={['brta','mygov','railway','biman','biwtc']} />
          </div>
          <AdCluster tk={tk} lang={lang} count={1} isMobile={isMobile}/>
    </PageShell>
  );
}
