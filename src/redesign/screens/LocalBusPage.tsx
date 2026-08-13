import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN, chipBtn, N } from '../tokens';
import { PageShell } from './PageShell';
import { useDocumentTitle, setMetaTag, setCanonicalUrl } from '../utils/useDocumentTitle';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { GovAdBanner } from '../components/GovAdBanner';
import { GovServiceCards } from '../components/GovServiceCards';
import { PromoBanner } from '../components/PromoBanner';
import { SectionHeader } from '../components/SectionHeader';
import { Pill } from '../components/Pill';
import { Icon } from '../components/Icons';
import { ModeHero } from '../components/ModeHero';
import { Stars } from '../components/Stars';
import { BUS_DATA, STATIONS } from '../../../constants';
import { SuggestionDropdown, Suggestion } from '../components/SuggestionDropdown';
import { useLocationSearch } from '../../../hooks/useLocationSearch';
import { trackBusSearch, trackRouteSearch, getUserHistory } from '../../../services/analyticsService';
import { enhancedBusSearch } from '../../../services/searchService';
import { earnCoins } from '../utils/koyCoinService';
import { DTCABusListSection } from '../components/DTCABusListSection';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string,p?:Record<string,string>)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

function routeColor(type: string): string {
  if (type === 'AC') return '#7c3aed';
  if (type === 'Local') return '#10b981';
  if (type === 'Double-Decker') return '#3b82f6';
  return '#f59e0b';
}


const OP_COLORS = ['#10b981','#3b82f6','#ef4444','#f59e0b','#7c3aed','#a855f7'];

// Derive real top operators: user search history first, then BUS_DATA by coverage
function buildTopOperators(): Array<{ l: string; n: string; c: string; busId: string }> {
  try {
    const searches = getUserHistory().busSearches || [];
    if (searches.length >= 3) {
      const freq = new Map<string, { name: string; count: number }>();
      for (const s of [...searches].reverse()) {
        const ex = freq.get(s.busId);
        if (ex) ex.count++;
        else freq.set(s.busId, { name: s.busName, count: 1 });
      }
      const top = [...freq.entries()]
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 6);
      if (top.length >= 3) {
        return top.map(([id, v], i) => ({
          l: v.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || v.name.slice(0, 2).toUpperCase(),
          n: v.name,
          c: OP_COLORS[i % OP_COLORS.length],
          busId: id,
        }));
      }
    }
  } catch {}
  // Fallback: real buses from BUS_DATA sorted by stop coverage (widest routes first)
  return BUS_DATA
    .filter(b => (b as any).active !== false && b.stops.length >= 10)
    .sort((a, b) => b.stops.length - a.stops.length)
    .slice(0, 6)
    .map((bus, i) => ({
      l: bus.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || bus.name.slice(0, 2).toUpperCase(),
      n: bus.name,
      c: OP_COLORS[i % OP_COLORS.length],
      busId: bus.id,
    }));
}

export function LocalBusPage(props: Props) {
  const { theme, device, lang, onNav } = props;
  useDocumentTitle(lang === 'bn' ? 'ঢাকা লোকাল বাস রুট ও ভাড়া ২০২৬' : 'Dhaka Local Bus Routes & Fares 2026');
  setMetaTag('description', lang === 'bn' ? 'ঢাকার ২০০+ লোকাল বাসের রুট, স্টপ ও ভাড়া খুঁজুন বাংলা ও ইংরেজিতে — ফ্রি, অফলাইনে চলে।' : 'Find 200+ Dhaka local bus routes, stops and fares in English or বাংলা. Free and works offline.');
  setCanonicalUrl('/local-bus');
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (p=16): React.CSSProperties => ({ background:tk.panel, border:`1px solid ${tk.line}`, borderRadius:16, padding:p });

  const [searchQuery, setSearchQuery] = useState(props.params?.search ?? '');
  const [fromInput, setFromInput] = useState(props.params?.from ?? '');
  const [toInput, setToInput] = useState(props.params?.to ?? '');
  // Only show results after search button click
  const [hasSearched, setHasSearched] = useState(!!(props.params?.from || props.params?.to || props.params?.search));
  const [fromFocus, setFromFocus] = useState(false);
  const [toFocus, setToFocus] = useState(false);
  const [searchAttr, setSearchAttr] = useState<'name' | 'route' | 'type'>('name');
  const [quickFastest, setQuickFastest] = useState(false);
  const [quickAC, setQuickAC] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Real top operators: from user search history or BUS_DATA coverage fallback
  const topOperators = useMemo(() => buildTopOperators(), []);

  // Comprehensive location search — 729 Dhaka stops + 14K OSM locations
  const { suggestions: fromSuggestions } = useLocationSearch(fromInput, { limit: 20, categories: ['bus_stop', 'railway_station', 'ferry_terminal'] });
  const { suggestions: toSuggestions } = useLocationSearch(toInput, { limit: 20, categories: ['bus_stop', 'railway_station', 'ferry_terminal'] });

  const filterStations = (q: string, side: 'from' | 'to') => {
    const suggs = side === 'from' ? fromSuggestions : toSuggestions;
    return suggs as Suggestion[];
  };

  // Normalize station name for matching (remove spaces/punctuation for stop ID matching)
  const norm = (s: string) => s.toLowerCase().replace(/[\s\-\.]/g, '');

  const matchesStation = (r: typeof BUS_DATA[0], query: string) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const qNorm = norm(query);
    return r.routeString.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      (r.bnName?.toLowerCase() ?? '').includes(q) ||
      r.stops.some(s => s.toLowerCase().includes(qNorm) || s.toLowerCase().includes(q));
  };

  // Real bus route filtering — only active after search button click
  const filteredRoutes = useMemo(() => {
    // Quick filters/sort applied to whatever list is produced below
    const applyQuick = (list: typeof BUS_DATA) => {
      let out = [...list];
      if (quickAC) out = out.filter(r => r.type === 'AC');
      if (quickFastest) out = out.sort((a, b) => a.stops.length - b.stops.length);
      return out;
    };

    if (!hasSearched) return applyQuick(BUS_DATA.filter(r => r.active !== false && r.name.length > 3).slice(0, 10));
    const q = searchQuery.trim();
    const f = fromInput.trim();
    const t = toInput.trim();

    if (q) {
      if (searchAttr === 'route') {
        return applyQuick(BUS_DATA.filter(r => r.routeString.toLowerCase().includes(q.toLowerCase())).slice(0, 20));
      }
      if (searchAttr === 'type') {
        return applyQuick(BUS_DATA.filter(r => r.type.toLowerCase().includes(q.toLowerCase())).slice(0, 20));
      }
      const result = enhancedBusSearch(q);
      if (result.buses.length > 0) {
        return applyQuick(result.buses.filter(r => r.active !== false).slice(0, 20));
      }
      const lowered = q.toLowerCase();
      return applyQuick(BUS_DATA.filter(r =>
        r.name.toLowerCase().includes(lowered) ||
        (r.bnName?.toLowerCase() ?? '').includes(lowered) ||
        r.routeString.toLowerCase().includes(lowered) ||
        r.type.toLowerCase().includes(lowered) ||
        r.stops.some(s => s.toLowerCase().includes(norm(lowered)))
      ).slice(0, 20));
    }

    if (f && t) {
      // Strict two-stop match only — operator alias search (enhancedBusSearch)
      // would match e.g. "gulshan" against the "gulshan chaka" alias and list
      // Dhakar Chaka buses that don't serve the requested destination.
      const results = BUS_DATA.filter(r => matchesStation(r, f) && matchesStation(r, t)).slice(0, 20);
      if (results.length) return applyQuick(results);
    }
    if (f) {
      const result = enhancedBusSearch(f);
      if (result.buses.length > 0) {
        return applyQuick(result.buses.filter(r => r.active !== false).slice(0, 15));
      }
      return applyQuick(BUS_DATA.filter(r => matchesStation(r, f)).slice(0, 15));
    }
    if (t) {
      const result = enhancedBusSearch(t);
      if (result.buses.length > 0) {
        return applyQuick(result.buses.filter(r => r.active !== false).slice(0, 15));
      }
      return applyQuick(BUS_DATA.filter(r => matchesStation(r, t)).slice(0, 15));
    }
    return applyQuick(BUS_DATA.filter(r => r.active !== false && r.name.length > 3).slice(0, 10));
  }, [searchQuery, fromInput, toInput, hasSearched, searchAttr, quickFastest, quickAC]);

  const DTCA_TERMS = ['dhakar chaka','dhaka chaka','chaka','ঢাকার চাকা','ঢাকা চাকা','gulshan chaka','গুলশান চাকা'];
  const showInlineDtca = hasSearched && DTCA_TERMS.some(t =>
    searchQuery.toLowerCase().includes(t) ||
    fromInput.toLowerCase().includes(t) ||
    toInput.toLowerCase().includes(t)
  );

  const [mode, setMode] = useState<'buses'|'transit'>('buses');

  type Leg = { kind:'walk'|'bus'|'metro'; label:string; from:string; to:string; min:number; col:string; detail?:string; };
  type Journey = { id:number; total:string; fare:string; from:string; to:string; legs:Leg[]; };

  const TRANSIT_ROUTES: Journey[] = [
    {
      id:1, total:'52 min', fare:'৳ 30', from:T(lang,'গুলশান ২','Gulshan 2'), to:T(lang,'মতিঝিল','Motijheel'),
      legs:[
        {kind:'walk',label:T(lang,'হাঁটুন','Walk'),from:T(lang,'গুলশান ২','Gulshan 2'),to:T(lang,'গুলশান ১ স্টপ','Gulshan 1 stop'),min:3,col:'#6b7280'},
        {kind:'bus',label:'GL-5',from:T(lang,'গুলশান ১','Gulshan 1'),to:T(lang,'ফার্মগেট','Farmgate'),min:28,col:'#10b981',detail:T(lang,'গ্রীন লাইন · ৳১৫','Green Line · ৳15')},
        {kind:'walk',label:T(lang,'হাঁটুন','Walk'),from:T(lang,'ফার্মগেট','Farmgate'),to:T(lang,'ফার্মগেট বাস স্টপ','Farmgate bus stop'),min:3,col:'#6b7280'},
        {kind:'bus',label:'BRTC-8',from:T(lang,'ফার্মগেট','Farmgate'),to:T(lang,'মতিঝিল','Motijheel'),min:18,col:'#3b82f6',detail:T(lang,'BRTC দোতলা · ৳১৫','BRTC Double · ৳15')},
      ],
    },
    {
      id:2, total:'38 min', fare:'৳ 50', from:T(lang,'ফার্মগেট','Farmgate'), to:T(lang,'মিরপুর ১০','Mirpur 10'),
      legs:[
        {kind:'walk',label:T(lang,'হাঁটুন','Walk'),from:T(lang,'ফার্মগেট','Farmgate'),to:T(lang,'ফার্মগেট মেট্রো','Farmgate Metro'),min:4,col:'#6b7280'},
        {kind:'metro',label:T(lang,'মেট্রো MRT-6','Metro MRT-6'),from:T(lang,'ফার্মগেট','Farmgate'),to:T(lang,'মিরপুর ১০','Mirpur 10'),min:22,col:'#6d28d9',detail:T(lang,'MRT লাইন ৬ · ৳৩০','MRT Line 6 · ৳30')},
        {kind:'walk',label:T(lang,'হাঁটুন','Walk'),from:T(lang,'মিরপুর ১০ স্টেশন','Mirpur 10 station'),to:T(lang,'মিরপুর ১০','Mirpur 10'),min:4,col:'#6b7280'},
      ],
    },
    {
      id:3, total:'65 min', fare:'৳ 25', from:T(lang,'ধানমন্ডি','Dhanmondi'), to:T(lang,'উত্তরা','Uttara'),
      legs:[
        {kind:'bus',label:'SH-7',from:T(lang,'ধানমন্ডি','Dhanmondi'),to:T(lang,'বিমানবন্দর রোড','Airport Road'),min:40,col:'#f59e0b',detail:T(lang,'শ্যামলী · ৳২৫','Shyamoli · ৳25')},
        {kind:'walk',label:T(lang,'হাঁটুন','Walk'),from:T(lang,'বিমানবন্দর রোড','Airport Road'),to:T(lang,'উত্তরা','Uttara'),min:5,col:'#6b7280'},
      ],
    },
  ];

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'0 0 80px':'0 0 48px' }}>
        <ModeHero tk={tk} isMobile={isMobile} lang={lang} kind="bus"
          gradient="linear-gradient(135deg, #006a4e 0%, #10b981 60%, #fbbf24 100%)"
          title={T(lang,'ঢাকার সব বাস · এক অ্যাপে','Every Dhaka bus · in one app')}
          subtitle={T(lang,'২,৪১২টি লাইভ রুট, ১,০০০+ স্টপ, ১৪০+ অপারেটর — অফলাইনেও কাজ করে।','2,412 live routes, 1,000+ stops, 140+ operators — works offline too.')}
          stats={[{v:N('2,412',lang),l:T(lang,'রুট','Routes')},{v:N('1,043',lang),l:T(lang,'স্টপ','Stops')},{v:N(140,lang)+'+',l:T(lang,'অপারেটর','Operators')},{v:'★ '+N('4.4',lang),l:T(lang,'গড় রেটিং','Avg rating')}]}
        />

        <div style={{ padding:isMobile?'0 16px':'0 40px' }}>
          {/* Search card */}
          <div style={{ ...card(16), marginBottom:18, boxShadow:tk.shadow }}>
            <div style={{ background:tk.inputBg, border:`1px solid ${tk.line}`, borderRadius:14, padding:'12px 14px', display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${tk.primary},${tk.primaryDeep})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }} className="kj-anim-glow">
                <Icon.search s={14}/>
              </div>
              <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder={T(lang,'যেমন: গ্রীন লাইন, রাইদা ৭, BRTC দোতলা, রুট ৬...','e.g. Green Line, Raida #7, BRTC Double, Route 6...')} style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:BEN, fontSize:14, color:tk.text }}/>
            </div>
            <div style={{ display:'flex', gap:6, marginBottom:12 }}>
              {([{id:'name' as const,l:T(lang,'নাম','Name')},{id:'route' as const,l:T(lang,'রুট','Route')},{id:'type' as const,l:T(lang,'টাইপ','Type')}]).map((c)=>(
                <button key={c.id} onClick={()=>setSearchAttr(c.id)} style={{ ...chipBtn(tk), background:searchAttr===c.id?tk.primarySoft:tk.panelMuted, color:searchAttr===c.id?tk.primary:tk.textDim, borderColor:searchAttr===c.id?tk.primary:tk.line, fontWeight:searchAttr===c.id?700:500 }}>{c.l}</button>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr auto', gap:10 }}>
              {/* FROM field with suggestions via portal */}
              <div ref={fromRef} style={{ background:tk.inputBg, border:`1px solid ${fromFocus?tk.primary:tk.line}`, borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:12, transition:'border-color 0.15s' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:tk.primarySoft, color:tk.primaryDeep, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon.pin s={16}/></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, color:tk.textFaint, textTransform:'uppercase', letterSpacing:1.2 }}>{T(lang,'কোথা থেকে','From')}</div>
                  <input value={fromInput} onChange={e=>setFromInput(e.target.value)} onFocus={()=>setFromFocus(true)} onBlur={()=>setTimeout(()=>setFromFocus(false),150)} placeholder={T(lang,'গুলশান ১','Gulshan 1')} style={{ background:'transparent', border:'none', outline:'none', fontFamily:BEN, fontSize:15, fontWeight:600, color:tk.text, marginTop:2, width:'100%' }}/>
                </div>
              </div>
              {fromFocus && <SuggestionDropdown suggestions={filterStations(fromInput, 'from')} onSelect={s=>{setFromInput(s.label);setFromFocus(false);}} onDismiss={()=>setFromFocus(false)} tk={tk} lang={lang} anchorRef={fromRef}/>}
              {/* TO field with suggestions via portal */}
              <div ref={toRef} style={{ background:tk.inputBg, border:`1px solid ${toFocus?tk.accent:tk.line}`, borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:12, transition:'border-color 0.15s' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:tk.accentSoft, color:tk.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon.flag s={16}/></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, color:tk.textFaint, textTransform:'uppercase', letterSpacing:1.2 }}>{T(lang,'কোথায়','To')}</div>
                  <input value={toInput} onChange={e=>setToInput(e.target.value)} onFocus={()=>setToFocus(true)} onBlur={()=>setTimeout(()=>setToFocus(false),150)} placeholder={T(lang,'মতিঝিল','Motijheel')} style={{ background:'transparent', border:'none', outline:'none', fontFamily:BEN, fontSize:15, fontWeight:600, color:tk.text, marginTop:2, width:'100%' }}/>
                </div>
              </div>
              {toFocus && <SuggestionDropdown suggestions={filterStations(toInput, 'to')} onSelect={s=>{setToInput(s.label);setToFocus(false);}} onDismiss={()=>setToFocus(false)} tk={tk} lang={lang} anchorRef={toRef}/>}
              {(() => {
                const canSearch = !!(searchQuery.trim() || fromInput.trim() || toInput.trim());
                return (
                  <button disabled={!canSearch} onClick={()=>{ if (!canSearch) return; if (fromInput || toInput) trackRouteSearch(fromInput, toInput); setHasSearched(true); onNav('results', { from: fromInput, to: toInput, search: searchQuery }); }} style={{ background: canSearch?`linear-gradient(135deg,${tk.primary},${tk.primaryDeep})`:tk.panelMuted, color: canSearch?tk.primaryInk:tk.textFaint, border:0, borderRadius:14, padding:isMobile?'12px 16px':'0 22px', fontFamily:SANS, fontWeight:700, fontSize:14, cursor: canSearch?'pointer':'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', gap:8, minHeight:isMobile?48:'auto', boxShadow: canSearch?`0 8px 22px -10px ${tk.primary}`:'none', opacity: canSearch?1:0.6 }}>
                    <Icon.search s={16}/>{T(lang,'বাস খুঁজুন','Find bus')}
                  </button>
                );
              })()}
            </div>
            <div style={{ display:'flex', gap:6, marginTop:12, flexWrap:'wrap' }}>
              {[
                { id: 'fastest' as const, l: '⚡ ' + T(lang, 'দ্রুততম', 'Fastest') },
                { id: 'ac' as const, l: '❄️ AC' },
              ].map((c) => {
                const on = c.id === 'fastest' ? quickFastest : quickAC;
                return (
                  <button
                    key={c.id}
                    onClick={() => { if (c.id === 'fastest') setQuickFastest(v => !v); else setQuickAC(v => !v); }}
                    style={{ ...chipBtn(tk), background: on ? tk.text : tk.panelMuted, color: on ? tk.bg : tk.text, borderColor: on ? tk.text : tk.line, fontWeight: on ? 700 : 500 }}
                  >
                    {c.l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode tab switcher */}
          <div style={{ display:'flex', gap:6, marginBottom:16 }}>
            {([{k:'buses',bn:'🚌 বাস রুট',en:'🚌 Bus routes'},{k:'transit',bn:'🔀 ট্রানজিট',en:'🔀 Transit'}] as const).map(t=>(
              <button key={t.k} onClick={()=>setMode(t.k)} style={{ ...chipBtn(tk), background:mode===t.k?tk.primary:tk.panelMuted, color:mode===t.k?tk.primaryInk:tk.text, borderColor:mode===t.k?tk.primary:tk.line, fontWeight:mode===t.k?700:500, padding:'8px 16px', fontSize:13 }}>
                {T(lang,t.bn,t.en)}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.4fr 1fr', gap:isMobile?18:24 }}>
            {/* Main content — buses or transit */}
            <div>
              {mode === 'buses' ? (
                <>
                  {showInlineDtca && (
                    <div style={{ marginBottom: 14 }}>
                      <DTCABusListSection
                        tk={tk}
                        lang={lang}
                        onBusClick={(identifier, vrn) => onNav('dtca-bus-detail', { identifier, vrn })}
                      />
                    </div>
                  )}
                  <SectionHeader tk={tk} lang={lang}
                    title={hasSearched
                      ? T(lang, `${N(filteredRoutes.length,lang)}টি রুট পাওয়া গেছে`, `${N(filteredRoutes.length,lang)} routes found`)
                      : T(lang,'জনপ্রিয় বাস রুট','Popular bus routes')}
                    action={T(lang,'সব দেখুন','See all')}/>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {filteredRoutes.length === 0 && (
                      <div style={{ background:tk.panel, border:`1px dashed ${tk.line}`, borderRadius:16, padding:'28px 16px', textAlign:'center' }}>
                        <div style={{ fontSize:28, marginBottom:8 }}>🚌</div>
                        <div style={{ fontFamily:BEN, fontSize:14, fontWeight:600, color:tk.text, marginBottom:4 }}>{T(lang,'কোনো রুট পাওয়া যায়নি','No routes found')}</div>
                        <div style={{ fontFamily:SANS, fontSize:12, color:tk.textFaint }}>{T(lang,'অন্য নাম বা রুট দিয়ে খুঁজে দেখুন','Try a different name or route')}</div>
                      </div>
                    )}
                    {filteredRoutes.map((r,i)=>{
                      const col = routeColor(r.type);
                      const initials = r.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                      return (
                        <React.Fragment key={r.id||i}>
                          {i === 5 && !isMobile && (
                            <NativeAdCard
                              tk={tk}
                              lang={lang}
                              kind="leaderboard"
                              title={T(lang, 'এই রুটের জন্য অফার', 'Offers for this route')}
                              icon="🎯"
                            />
                          )}
                          <div onClick={()=>{ trackBusSearch(r.id, r.name); onNav('bus-detail', { busId: r.id, from: fromInput, to: toInput }); }} className="kj-card-hov" style={{ ...card(14), display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                            <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, background:`linear-gradient(135deg,${col}cc,${col})`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SANS, fontWeight:800, fontSize:13 }}>{initials}</div>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                                <span style={{ fontFamily:BEN, fontWeight:700, fontSize:14, color:tk.text }}>{lang==='bn'?r.bnName:r.name}</span>
                                {r.type==='AC' && <Pill tk={tk} tone="primary">AC</Pill>}
                              </div>
                              <div style={{ fontFamily:BEN, fontSize:12, color:tk.textDim, marginTop:2 }}>{r.routeString}</div>
                              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                                <span style={{ fontFamily:SANS, fontSize:10, color:tk.textFaint }}>{r.type}</span>
                                {r.hours && <span style={{ fontFamily:SANS, fontSize:10, color:tk.textFaint }}>· {r.hours}</span>}
                              </div>
                            </div>
                            <div style={{ textAlign:'right', flexShrink:0 }}><Icon.arrowR s={14}/></div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Transit journey planner */
                <>
                  <SectionHeader tk={tk} lang={lang} title={T(lang,'ট্রানজিট রুট · মাল্টি-লেগ যাত্রা','Transit routes · multi-leg journey')} action=""/>
                  <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                    {TRANSIT_ROUTES.map(journey=>(
                      <div key={journey.id} className="kj-card-hov" style={{ ...card(16), cursor:'pointer' }} onClick={()=>{ earnCoins(5, 'Transit search'); onNav('results', { from: fromInput||journey.from, to: toInput||journey.to }); }}>
                        {/* Journey header */}
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                          <div>
                            <div style={{ fontFamily:BEN, fontWeight:700, fontSize:14, color:tk.text }}>{journey.from} → {journey.to}</div>
                            <div style={{ display:'flex', gap:10, marginTop:4 }}>
                              <span style={{ fontFamily:SANS, fontWeight:700, fontSize:12, color:tk.primary }}>⏱ {journey.total}</span>
                              <span style={{ fontFamily:SANS, fontWeight:700, fontSize:12, color:'#10b981' }}>৳ {journey.fare.replace('৳ ','')}</span>
                            </div>
                          </div>
                          <div style={{ fontFamily:SANS, fontWeight:700, fontSize:11, color:tk.textFaint }}>{journey.legs.length} {T(lang,'লেগ','legs')}</div>
                        </div>
                        {/* Leg timeline */}
                        <div style={{ position:'relative' }}>
                          {journey.legs.map((leg,li)=>(
                            <div key={li} style={{ display:'flex', gap:12, paddingBottom: li<journey.legs.length-1?0:0 }}>
                              {/* Timeline spine */}
                              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:20, flexShrink:0 }}>
                                <div style={{ width:12, height:12, borderRadius:999, background:leg.col, border:`2px solid ${tk.bg}`, boxShadow:`0 0 0 2px ${leg.col}`, zIndex:1, marginTop:3, flexShrink:0 }}/>
                                {li < journey.legs.length-1 && <div style={{ width:2, flex:1, background:`${leg.col}44`, minHeight:20, marginTop:2 }}/>}
                              </div>
                              {/* Leg content */}
                              <div style={{ flex:1, paddingBottom:12 }}>
                                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                                  <span style={{ fontSize:13 }}>
                                    {leg.kind==='walk'?'🚶':leg.kind==='metro'?'🚇':'🚌'}
                                  </span>
                                  <span style={{ fontFamily:SANS, fontWeight:700, fontSize:13, color:leg.col }}>{leg.label}</span>
                                  <span style={{ fontFamily:SANS, fontSize:11, color:tk.textFaint, marginLeft:'auto' }}>{leg.min} {T(lang,'মিনিট','min')}</span>
                                </div>
                                <div style={{ fontFamily:BEN, fontSize:12, color:tk.textDim }}>{leg.from} → {leg.to}</div>
                                {leg.detail && <div style={{ fontFamily:SANS, fontSize:11, color:tk.textFaint, marginTop:2 }}>{leg.detail}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ borderTop:`1px dashed ${tk.line}`, paddingTop:10, display:'flex', justifyContent:'flex-end' }}>
                          <button style={{ background:tk.primarySoft, color:tk.primary, border:`1px solid ${tk.primary}`, borderRadius:8, padding:'6px 14px', fontFamily:SANS, fontWeight:700, fontSize:12, cursor:'pointer' }}>
                            {T(lang,'রুট দেখুন','View route')} →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {!showInlineDtca && (
                <DTCABusListSection
                  tk={tk}
                  lang={lang}
                  onBusClick={(identifier, vrn) => onNav('dtca-bus-detail', { identifier, vrn })}
                />
              )}
              <PromoBanner tk={tk} lang={lang} page="bus" onNav={onNav}/>
              {!isMobile && (
                <NativeAdCard
                  tk={tk}
                  lang={lang}
                  kind="mid-rect"
                  title={T(lang, 'ঢাকা যাত্রা অফার', 'Dhaka commute offers')}
                  subtitle={T(lang, 'রাইড ও পরিবহন ডিল', 'Ride & transit deals')}
                  icon="🛵"
                  compact
                />
              )}

              <div style={card(14)}>
                <div style={{ fontFamily:BEN, fontWeight:700, fontSize:13, color:tk.text, marginBottom:10 }}>
                  {T(lang, getUserHistory().busSearches?.length >= 3 ? 'আপনার সেরা বাস' : 'জনপ্রিয় বাস', getUserHistory().busSearches?.length >= 3 ? 'Your top buses' : 'Popular buses')}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
                  {topOperators.map((o,i)=>(
                    <div key={i} onClick={() => onNav('bus-detail', { busId: o.busId })} style={{ background:`${o.c}22`, borderRadius:10, padding:'10px 8px', textAlign:'center', cursor:'pointer' }}>
                      <div style={{ fontFamily:SANS, fontWeight:800, fontSize:13, color:o.c }}>{o.l}</div>
                      <div style={{ fontFamily:SANS, fontSize:9, color:tk.textFaint, marginTop:2, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{o.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!isMobile && (
            <NativeAdCard
              tk={tk}
              lang={lang}
              kind="leaderboard"
              title={T(lang, 'আরও ঢাকা যাত্রা টিপস', 'More Dhaka commute tips')}
              icon="🚏"
            />
          )}
        </div>
      </div>
          <div style={{ padding: isMobile ? '16px 16px 0' : '16px 40px 0' }}>
            <GovAdBanner lang={lang} height={isMobile ? 200 : 230} ids={['brta','mygov','railway']} />
            <div style={{ marginTop: 16 }}>
              <GovServiceCards tk={tk} lang={lang} isMobile={isMobile} cards={['brta','mygov']} variant="grid" compact />
            </div>
          </div>
          <AdCluster tk={tk} lang={lang} count={2} isMobile={isMobile}/>
    </PageShell>
  );
}
