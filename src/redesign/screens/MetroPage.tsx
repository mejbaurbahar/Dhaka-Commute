import React, { useState, useRef, useMemo, useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN, chipBtn, N, Fare } from '../tokens';
import { PageShell } from './PageShell';
import { useDocumentTitle, setMetaTag, setCanonicalUrl } from '../utils/useDocumentTitle';
import { trackMetroSearch } from '../../../services/analyticsService';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { GovServiceCards } from '../components/GovServiceCards';
import { GovAdBanner } from '../components/GovAdBanner';
import { PromoBanner } from '../components/PromoBanner';
import { SectionHeader } from '../components/SectionHeader';
import { Icon } from '../components/Icons';
import { ModeHero } from '../components/ModeHero';
import { METRO_STATIONS, METRO_LINES } from '../../../constants';
import { SuggestionDropdown, Suggestion } from '../components/SuggestionDropdown';
import { MetroMapView } from '../components/MetroMapView';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

// MRT-6 stations in order with fare from Uttara North
// NOTE: the constant is keyed 'mrt6' — 'mrt_6' silently fell back to the
// hardcoded table below and made the calculator contradict the fare map.
const MRT6_LINE = METRO_LINES['mrt6'];
const STATIONS = MRT6_LINE
  ? MRT6_LINE.stations.map((id, i) => {
      const s = METRO_STATIONS[id];
      const fare = i === 0 ? 0 : Math.min(20 + Math.floor(i / 2) * 10, 100);
      return { id, bn: s?.bnName ?? id, en: (s?.name ?? id).replace(' Metro Station',''), fare, desc: s?.description ?? '', lat: s?.lat, lng: s?.lng };
    })
  : [
      {id:'uttara-north',bn:'উত্তরা উত্তর',en:'Uttara North',fare:0,desc:'',lat:23.8759,lng:90.3795},{id:'uttara-center',bn:'উত্তরা কেন্দ্র',en:'Uttara Center',fare:20,desc:'',lat:23.8706,lng:90.3842},
      {id:'uttara-south',bn:'উত্তরা দক্ষিণ',en:'Uttara South',fare:20,desc:'',lat:23.8631,lng:90.3891},{id:'pallabi',bn:'পল্লবী',en:'Pallabi',fare:30,desc:'',lat:23.8268,lng:90.3654},
      {id:'mirpur-11',bn:'মিরপুর ১১',en:'Mirpur 11',fare:40,desc:'',lat:23.8190,lng:90.3659},{id:'mirpur-10',bn:'মিরপুর ১০',en:'Mirpur 10',fare:50,desc:'',lat:23.8067,lng:90.3686},
      {id:'kazipara',bn:'কাজীপাড়া',en:'Kazipara',fare:60,desc:'',lat:23.7981,lng:90.3712},{id:'shewrapara',bn:'শেওড়াপাড়া',en:'Shewrapara',fare:60,desc:'',lat:23.7904,lng:90.3752},
      {id:'agargaon',bn:'আগারগাঁও',en:'Agargaon',fare:70,desc:'',lat:23.7783,lng:90.3808},{id:'bijoy-sarani',bn:'বিজয় সরণি',en:'Bijoy Sarani',fare:80,desc:'',lat:23.766569,lng:90.383082},
      {id:'farmgate',bn:'ফার্মগেট',en:'Farmgate',fare:80,desc:'',lat:23.759056,lng:90.387059},{id:'karwan-bazar',bn:'কারওয়ান বাজার',en:'Karwan Bazar',fare:90,desc:'',lat:23.7516,lng:90.3930},
      {id:'shahbagh',bn:'শাহবাগ',en:'Shahbagh',fare:90,desc:'',lat:23.7384,lng:90.3957},{id:'du',bn:'ঢাবি',en:'DU',fare:90,desc:'',lat:23.7337,lng:90.3939},
      {id:'secretariat',bn:'সচিবালয়',en:'Secretariat',fare:100,desc:'',lat:23.7297,lng:90.4069},{id:'motijheel',bn:'মতিঝিল',en:'Motijheel',fare:100,desc:'',lat:23.7330,lng:90.4172},
      {id:'kamalapur',bn:'কমলাপুর',en:'Kamalapur',fare:100,desc:'',lat:23.7320,lng:90.4262},
    ];

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function MetroPage(props: Props) {
  const { theme, device, lang, onNav } = props;
  useDocumentTitle(T(lang, 'ঢাকা মেট্রো রেল MRT-6 ভাড়া ও সময়সূচী', 'Dhaka Metro Rail MRT-6 Fares & Schedule'));
  setMetaTag('description', T(lang, 'MRT-6 এর ১৭টি স্টেশন, ভাড়া (৳২০–১০০) ও পূর্ণ সময়সূচী বাংলায়।', 'All 17 MRT-6 stations, fares (৳20–100) and full schedule for Dhaka Metro Rail.'));
  setCanonicalUrl('/metro');
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (p=16): React.CSSProperties => ({ background:tk.panel, border:`1px solid ${tk.line}`, borderRadius:16, padding:p });

  const [fareFrom, setFareFrom] = useState(props.params?.from ?? '');
  const [fareTo, setFareTo] = useState(props.params?.to ?? '');
  const [hasSearched, setHasSearched] = useState(!!(props.params?.from || props.params?.to));

  // Home-search passes a single "A থেকে B" / "A to B" string in params.search —
  // split it into from/to so the metro-mode search isn't discarded.
  useEffect(() => {
    const p = props.params;
    if ((p?.from || p?.to) || !p?.search) return;
    const m = p.search.trim().match(/^(.+?)\s*(?:থেকে|to|→|->)\s*(.+)$/i);
    if (!m) return;
    // Resolve free-typed names (en/bn, exact then prefix) to exact en station names
    const resolve = (q: string): string => {
      const lq = q.trim().toLowerCase();
      if (!lq) return q.trim();
      const st = STATIONS.find(s => s.en.toLowerCase() === lq) ||
        STATIONS.find(s => s.bn.toLowerCase() === lq) ||
        STATIONS.find(s => s.en.toLowerCase().startsWith(lq)) ||
        STATIONS.find(s => s.bn.toLowerCase().startsWith(lq));
      return st?.en ?? q.trim();
    };
    setFareFrom(resolve(m[1]));
    setFareTo(resolve(m[2]));
    setHasSearched(true);
  }, [props.params]);
  const [fromFocus, setFromFocus] = useState(false);
  const [toFocus, setToFocus] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'checking' | 'ready' | 'blocked' | 'unsupported'>('checking');
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const stationSuggestions: Suggestion[] = useMemo(() =>
    STATIONS.map(s => ({ id: s.en, label: s.en, sub: s.bn + (s.fare > 0 ? ` · ৳${s.fare}` : ' · Start') })), []
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      return;
    }
    if (localStorage.getItem('kj-location-consent') !== 'yes') return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus('ready');
      },
      () => setLocationStatus('blocked'),
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 300000 }
    );
  }, []);

  const nearestMetro = useMemo(() => {
    if (!userLocation) return null;
    return STATIONS
      .filter(s => typeof s.lat === 'number' && typeof s.lng === 'number')
      .map((s, index) => ({ ...s, index, distance: distanceKm(userLocation, { lat: s.lat as number, lng: s.lng as number }) }))
      .sort((a, b) => a.distance - b.distance)[0] ?? null;
  }, [userLocation]);

  const filterStations = (q: string) => {
    if (!q.trim()) return stationSuggestions;
    const lq = q.toLowerCase();
    return stationSuggestions.filter(s => s.label.toLowerCase().includes(lq) || (s.sub ?? '').toLowerCase().includes(lq));
  };

  // Calculate fare between two stations
  const calcFare = useMemo(() => {
    const fi = STATIONS.findIndex(s => s.en.toLowerCase() === fareFrom.toLowerCase());
    const ti = STATIONS.findIndex(s => s.en.toLowerCase() === fareTo.toLowerCase());
    if (fi < 0 || ti < 0 || fi === ti) return null;
    const diff = Math.abs(fi - ti);
    // Fare = the farther station's fare from Uttara North (matches the fare
    // map; the old step-formula understated 8 of 17 stations).
    const fare = Math.max(STATIONS[fi].fare, STATIONS[ti].fare);
    return { fare, stops: diff };
  }, [fareFrom, fareTo]);

  const nearestName = nearestMetro ? T(lang, nearestMetro.bn, nearestMetro.en) : T(lang, 'নিকটতম স্টেশন', 'nearest station');
  const nearestDistance = nearestMetro ? (nearestMetro.distance < 1 ? `${N(Math.round(nearestMetro.distance * 1000), lang)} m` : `${N(nearestMetro.distance.toFixed(1), lang)} km`) : '';

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'0 0 80px':'0 0 48px' }}>
        <ModeHero tk={tk} isMobile={isMobile} lang={lang} kind="train"
          gradient="linear-gradient(135deg, #00130e 0%, #00543c 50%, #10b981 100%)"
          title={T(lang,'ঢাকা মেট্রো · MRT-6 লাইভ','Dhaka Metro · MRT-6 live')}
          subtitle={T(lang,'উত্তরা থেকে মতিঝিল পর্যন্ত ১৬টি সক্রিয় স্টেশন · পিক সময়ে প্রতি ৩ মি ৩০ সে · ~৩৩ মিনিটে পুরো লাইন।','16 active stations from Uttara to Motijheel · trains every 3m 30s peak · ~33 min end-to-end.')}
          stats={[{v:N(16,lang),l:T(lang,'সক্রিয় স্টেশন','Active Stations')},{v:'3m 30s',l:T(lang,'পিক ফ্রিকোয়েন্সি','Peak Frequency')},{v:'৳ '+N('20',lang)+'-'+N(100,lang),l:T(lang,'ভাড়া','Fare range')},{v:N('6:30',lang)+'–'+N('10:10',lang),l:T(lang,'চলমান','Operating')}]}
        />

        <div style={{ padding:isMobile?'0 16px':'0 40px' }}>
          {/* Next train + ticket cards */}
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.4fr 1fr', gap:14, marginBottom:18 }}>
            <div style={{ background:'linear-gradient(135deg,#00130e,#00543c)', borderRadius:18, padding:20, color:'#fff', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', right:-40, top:-40, width:160, height:160, borderRadius:999, background:'rgba(16,185,129,0.25)' }} className="kj-anim-pulse"/>
              <div style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:1.4, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', marginBottom:8 }}>{T(lang,'পরবর্তী ট্রেন (সম্ভাব্য)','Next train (approx)')} · {nearestName}</div>
              <div style={{ fontFamily:SANS, fontWeight:800, fontSize:isMobile?48:56, color:'#fff', letterSpacing:-2, lineHeight:1 }}>{N('2:15', lang)}</div>
              <div style={{ fontFamily:BEN, fontSize:13, color:'rgba(255,255,255,0.7)', marginTop:6 }}>{T(lang,'উত্তরা উত্তর → মতিঝিল','Uttara North → Motijheel')}</div>
              <div style={{ display:'flex', gap:12, marginTop:14 }}>
                {[{l:T(lang,'পরের ট্রেন','After'),v:N('10:08',lang)},{l:T(lang,'তার পর','Then'),v:N('10:16',lang)}].map((t,i)=>(
                  <div key={i} style={{ background:'rgba(255,255,255,0.12)', borderRadius:10, padding:'8px 12px' }}>
                    <div style={{ fontFamily:SANS, fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:1 }}>{t.l}</div>
                    <div style={{ fontFamily:SANS, fontWeight:800, fontSize:14, color:'#fff' }}>{t.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { bg:`linear-gradient(135deg,${tk.primary},${tk.primaryDeep})`, ink:tk.primaryInk, label:T(lang,'একক যাত্রা টোকেন','Single journey token'), route:'metro-token', sub:T(lang,'৳ ২০ – ১০০','৳ '+N(20,lang)+' – '+N(100,lang)) },
                { bg:`linear-gradient(135deg,#7c3aed,#5b21b6)`, ink:'#fff', label:T(lang,'র‍্যাপিড পাস','MRT Rapid Pass'), route:'metro-pass', sub:T(lang,'১০% ছাড়','10% discount') },
              ].map((c,i)=>(
                <button key={i} onClick={()=>onNav(c.route)} style={{ background:c.bg, color:c.ink, border:0, borderRadius:14, padding:'14px 18px', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontFamily:BEN, fontWeight:700, fontSize:14 }}>{c.label}</div>
                    <div style={{ fontFamily:SANS, fontSize:12, opacity:0.85, marginTop:2 }}>{c.sub}</div>
                  </div>
                  <Icon.arrowR s={18}/>
                </button>
              ))}
            </div>
          </div>

          {/* Fare calculator with real station picker */}
          <div style={{ ...card(16), marginBottom:18 }}>
            <div style={{ fontFamily:BEN, fontWeight:700, fontSize:14, color:tk.text, marginBottom:14 }}>{T(lang,'ভাড়া ক্যালকুলেটর','Fare Calculator')} 🎫</div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr auto', gap:10 }}>
              <div ref={fromRef} style={{ background:tk.inputBg, border:`1px solid ${fromFocus?tk.primary:tk.line}`, borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, transition:'border-color 0.15s' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:tk.primarySoft, color:tk.primaryDeep, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:16 }}>🚇</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, color:tk.textFaint, textTransform:'uppercase', letterSpacing:1.2 }}>{T(lang,'থেকে','From station')}</div>
                  <input value={fareFrom} onChange={e=>setFareFrom(e.target.value)} onFocus={()=>setFromFocus(true)} onBlur={()=>setTimeout(()=>setFromFocus(false),150)} placeholder={T(lang,'উত্তরা উত্তর','Uttara North')} style={{ background:'transparent', border:'none', outline:'none', fontFamily:BEN, fontSize:14, fontWeight:600, color:tk.text, width:'100%', marginTop:2 }}/>
                </div>
              </div>
              <div ref={toRef} style={{ background:tk.inputBg, border:`1px solid ${toFocus?tk.accent:tk.line}`, borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, transition:'border-color 0.15s' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:tk.accentSoft, color:tk.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:16 }}>📍</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, color:tk.textFaint, textTransform:'uppercase', letterSpacing:1.2 }}>{T(lang,'পর্যন্ত','To station')}</div>
                  <input value={fareTo} onChange={e=>setFareTo(e.target.value)} onFocus={()=>setToFocus(true)} onBlur={()=>setTimeout(()=>setToFocus(false),150)} placeholder={T(lang,'মতিঝিল','Motijheel')} style={{ background:'transparent', border:'none', outline:'none', fontFamily:BEN, fontSize:14, fontWeight:600, color:tk.text, width:'100%', marginTop:2 }}/>
                </div>
              </div>
              {hasSearched && calcFare ? (
                <div style={{ background:`linear-gradient(135deg,${tk.primary},${tk.primaryDeep})`, color:tk.primaryInk, borderRadius:14, padding:'10px 18px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:100 }}>
                  <div style={{ fontFamily:SANS, fontWeight:800, fontSize:22, letterSpacing:-0.5 }}>{Fare(calcFare.fare, lang)}</div>
                  <div style={{ fontFamily:SANS, fontSize:10, fontWeight:700, opacity:0.8, letterSpacing:1 }}>{N(calcFare.stops, lang)} {T(lang,'স্টেশন','STOPS')}</div>
                </div>
              ) : (
                <button disabled={!(fareFrom && fareTo)} onClick={()=>{ if (fareFrom && fareTo) { trackMetroSearch(fareFrom, fareTo, calcFare?.fare ?? 0); setHasSearched(true); } }}
                  style={{ background: fareFrom && fareTo ? `linear-gradient(135deg,${tk.primary},${tk.primaryDeep})` : tk.panelMuted, border: fareFrom && fareTo ? 'none' : `1px solid ${tk.line}`, borderRadius:14, padding:'10px 18px', cursor: fareFrom && fareTo ? 'pointer' : 'not-allowed', minWidth:100, color: fareFrom && fareTo ? tk.primaryInk : tk.textFaint, fontFamily:SANS, fontSize:12, fontWeight:700, textAlign:'center', opacity: fareFrom && fareTo ? 1 : 0.6 }}>
                  {T(lang,'ভাড়া দেখুন','Check Fare')}
                </button>
              )}
            </div>
            {fromFocus && <SuggestionDropdown suggestions={filterStations(fareFrom)} onSelect={s=>{setFareFrom(s.label);setFromFocus(false);setHasSearched(false);}} onDismiss={()=>setFromFocus(false)} tk={tk} lang={lang} anchorRef={fromRef}/>}
            {toFocus && <SuggestionDropdown suggestions={filterStations(fareTo)} onSelect={s=>{setFareTo(s.label);setToFocus(false);setHasSearched(false);}} onDismiss={()=>setToFocus(false)} tk={tk} lang={lang} anchorRef={toRef}/>}
          </div>

          {/* Metro network map — below fare calc so from/to pins are visible */}
          <div style={{ ...card(18), marginBottom:18 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:12, flexWrap:'wrap' }}>
              <div style={{ fontFamily:BEN, fontWeight:700, fontSize:14, color:tk.text }}>
                {T(lang,'মেট্রো নেটওয়ার্ক ম্যাপ','Metro Network Map')}
              </div>
              {nearestMetro && (
                <div style={{ fontFamily:BEN, fontSize:11, color:tk.primary, background:tk.primarySoft, border:`1px solid ${tk.primary}`, borderRadius:999, padding:'4px 10px', whiteSpace:'nowrap' }}>
                  📍 {T(lang, `নিকটতম: ${nearestMetro.bn}`, `Nearest: ${nearestMetro.en}`)} · {nearestDistance}
                </div>
              )}
            </div>
            <MetroMapView
              theme={theme}
              lang={lang}
              tk={tk}
              isMobile={isMobile}
              fareFromName={hasSearched && fareFrom ? fareFrom : undefined}
              fareToName={hasSearched && fareTo ? fareTo : undefined}
            />
          </div>

          <NativeAdCard
            tk={tk}
            lang={lang}
            kind="in-article"
            title={T(lang, 'সংশ্লিষ্ট বিষয়বস্তু', 'Related content')}
            subtitle={T(lang, 'মেট্রো ও গণপরিবহন', 'Metro & public transit')}
            icon="📰"
          />

          {/* Info grid — DMTCL April 2026 data */}
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:10, marginBottom:10 }}>
            {[
              {ic:'⏰',t:T(lang,'অপারেটিং','Operating'),v:N('6:30',lang)+' AM – '+N('10:10',lang)+' PM'},
              {ic:'🗓',t:T(lang,'শুক্রবার','Friday'),v:N('3:00',lang)+' PM – '+N('9:40',lang)+' PM'},
              {ic:'🎫',t:T(lang,'ভাড়া','Fare'),v:'৳ '+N(20,lang)+' – '+N(100,lang)},
              {ic:'⚡',t:T(lang,'সর্বোচ্চ গতি','Top speed'),v:N(110,lang)+' km/h'},
              {ic:'🚇',t:T(lang,'সক্রিয় স্টেশন','Active Stations'),v:N(16,lang)+' '+T(lang,'টি','')},
              {ic:'🔄',t:T(lang,'পিক হেডওয়ে','Peak Headway'),v:'3 '+T(lang,'মি','min')+' 30 '+T(lang,'সে','sec')},
              {ic:'🛤️',t:T(lang,'লাইনের দৈর্ঘ্য','Line Length'),v:N('21.26',lang)+' km'},
              {ic:'💳',t:T(lang,'র‍্যাপিড পাস','Rapid Pass'),v:T(lang,'১০% ছাড়','10% off')},
            ].map((s,i)=>(
              <div key={i} style={card(14)}>
                <div style={{ fontSize:22 }}>{s.ic}</div>
                <div style={{ fontFamily:SANS, fontSize:10, fontWeight:700, color:tk.textFaint, letterSpacing:1.2, textTransform:'uppercase', marginTop:6 }}>{s.t}</div>
                <div style={{ fontFamily:BEN, fontWeight:700, fontSize:14, color:tk.text, marginTop:2 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <NativeAdCard
            tk={tk}
            lang={lang}
            kind={isMobile?'mob-banner':'leaderboard'}
            title={T(lang, 'মেট্রো যাত্রীদের জন্য অফার', 'Offers for metro riders')}
            icon="🚇"
          />

          <PromoBanner tk={tk} lang={lang} page="metro" onNav={onNav}/>
          <NativeAdCard
            tk={tk}
            lang={lang}
            kind="multiplex"
            title={T(lang, 'আরও দেখুন', 'You might also like')}
            subtitle={T(lang, 'সম্পর্কিত ভ্রমণ ও পরিবহন', 'Related travel & transport')}
            icon="🧭"
          />
        </div>
      </div>
          <div style={{ padding: isMobile ? '0 16px 8px' : '0 0 8px' }}>
            <div style={{ marginBottom: 14 }}>
              <GovAdBanner lang={lang} height={isMobile ? 200 : 230} ids={['mygov', 'brta', 'railway']} />
            </div>
            <GovServiceCards tk={tk} lang={lang} isMobile={isMobile} cards={['mygov', 'brta']} compact />
          </div>
          <AdCluster tk={tk} lang={lang} count={2} isMobile={isMobile}/>
    </PageShell>
  );
}
