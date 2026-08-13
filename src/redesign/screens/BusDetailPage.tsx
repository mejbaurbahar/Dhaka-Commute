import React, { useEffect, useMemo, useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN, chipBtn, N, Fare } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { GovAdBanner } from '../components/GovAdBanner';
import { Pill } from '../components/Pill';
import { BUS_DATA, STATIONS } from '../../../constants';
import BusRouteMap from '../../../components/BusRouteMap';
import BusRating from '../../../components/BusRating';
import BusPhotoGallery from '../../../components/BusPhotoGallery';
import BusLiveTracking from '../../../components/BusLiveTracking';
import EmergencyHelplineModal from '../../../components/EmergencyHelplineModal';
import { getBusRatings, BusRatingSummary, getBusLiveLocation, type BusLocationData } from '../../../services/communityDataService';
import { resolveStationIds } from '../../../services/searchService';
import { earnCoins } from '../utils/koyCoinService';
import type { UserLocation } from '../../../types';
import { getFavoriteBusIds, toggleFavoriteBus } from '../utils/favorites';
import { useDocumentTitle, setCanonicalUrl, setMetaTag, setPropertyMetaTag, setJsonLd } from '../utils/useDocumentTitle';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string,p?:Record<string,string>)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

const TYPE_COLOR: Record<string, [string,string]> = {
  'AC': ['#006a4e','#10b981'], 'Local': ['#1e3a8a','#3b82f6'],
  'Double-Decker': ['#5b21b6','#7c3aed'], 'Semi-Sitting': ['#0c4a6e','#0ea5e9'],
  'Sitting': ['#92400e','#f59e0b'], 'Metro Rail': ['#00543c','#10b981'],
};

function haversineKm(a: UserLocation, b: UserLocation) {
  const r = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function resolveStationId(value: string, fallback: string) {
  if (!value) return fallback;
  const resolvedIds = resolveStationIds(value);
  return resolvedIds.length > 0 ? resolvedIds[0] : fallback;
}

// Bus ids use underscores (e.g. '13_no') but public URLs use dash slugs (e.g. /bus/13-no/).
// Canonical must match the real URL to avoid duplicate-content signals.
const busUrlSlug = (id: string) => id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function BusDetailPage(props: Props) {
  const { theme, device, lang, params } = props;
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (r=16): React.CSSProperties => ({ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:r,padding:16 });

  const busId = params?.busId ?? '';
  const bus = BUS_DATA.find(b => b.id === busId) ?? null;
  const fromId = resolveStationId(params?.from ?? '', bus?.stops[0] ?? '');
  const toId = resolveStationId(params?.to ?? '', bus?.stops[bus.stops.length - 1] ?? '');

  const startName = bus ? (STATIONS[bus.stops[0]]?.name ?? bus.stops[0]) : '';
  const endName = bus ? (STATIONS[bus.stops[bus.stops.length - 1]]?.name ?? bus.stops[bus.stops.length - 1]) : '';
  useDocumentTitle(bus ? `${bus.name} Bus: ${startName} ⇄ ${endName} Route & Fare` : 'Bus Not Found — কই যাবো');
  useEffect(() => {
    setCanonicalUrl(`/bus/${busUrlSlug(busId)}`);
    if (!bus) return;
    const midStops = bus.stops.slice(1, -1).slice(0, 3).map(sid => STATIONS[sid]?.name ?? sid.replace(/_/g, ' ')).join(', ');
    const desc = `${bus.name} Dhaka bus route: ${startName} to ${endName}${midStops ? ` via ${midStops}` : ''}. Stops, fares & route map. Free KoyJabo guide.`;
    setMetaTag('description', desc);
    setPropertyMetaTag('og:description', desc);
    setPropertyMetaTag('og:title', `${bus.name}: ${startName} ⇄ ${endName} | কই যাবো`);
    setPropertyMetaTag('og:image', 'https://koyjabo.com/og-image.png');
    const approxFare = bus.type === 'AC' ? 60 : bus.type === 'Double-Decker' ? 50 : 30;
    setJsonLd('faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the route of the ${bus.name} bus in Dhaka?`,
          acceptedAnswer: { '@type': 'Answer', text: `The ${bus.name} bus runs from ${startName} to ${endName}${midStops ? ` via ${midStops}` : ''}. See the full stop list and route map on KoyJabo.` },
        },
        {
          '@type': 'Question',
          name: `What is the fare of the ${bus.name} bus?`,
          acceptedAnswer: { '@type': 'Answer', text: `The ${bus.name} bus fare is distance-based; the approximate full-route fare is ৳${approxFare}. Use the fare calculator on KoyJabo for an exact segment fare.` },
        },
        {
          '@type': 'Question',
          name: `How do I go from ${startName} to ${endName} by bus?`,
          acceptedAnswer: { '@type': 'Answer', text: `Take the ${bus.name} bus from ${startName}. See live bus location, stops and the route map on the KoyJabo ${bus.name} page.` },
        },
      ],
    });
  }, [busId, bus]);

  // Detect if user's from→to direction is reverse of the bus route order
  // e.g. bus goes Gabtoli(0)→Gulshan(5), user searched Gulshan→Gabtoli → isReversed=true
  const fromIdx = bus ? bus.stops.indexOf(fromId) : -1;
  const toIdx = bus ? bus.stops.indexOf(toId) : -1;
  const isRouteReversed = fromIdx > toIdx && fromIdx !== -1 && toIdx !== -1;
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteBusIds());
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);

  // Rating / photo views swap the page content in place — reset scroll so the
  // user lands at the top instead of keeping the detail page's scroll position.
  useEffect(() => {
    if (showRating || showPhotos) {
      const sc = document.querySelector('[data-app-scroller]') as HTMLElement | null;
      if (sc) sc.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }, [showRating, showPhotos]);
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [ratingSummary, setRatingSummary] = useState<BusRatingSummary | null>(null);
  const [liveLocationData, setLiveLocationData] = useState<BusLocationData | null>(null);
  const [liveLocationLoading, setLiveLocationLoading] = useState(true);

  const realStops = useMemo(() => {
    if (!bus) return [];
    const stopsInOrder = isRouteReversed ? [...bus.stops].reverse() : bus.stops;
    return stopsInOrder.map((sid, i) => {
      const st = STATIONS[sid];
      return {
        id: sid,
        en: st?.name ?? sid.replace(/_/g,' '),
        bn: st?.bnName ?? sid,
        lat: st?.lat,
        lng: st?.lng,
        isFrom: sid === fromId || (!params?.from && i === 0),
        isTo: sid === toId || (!params?.to && i === stopsInOrder.length - 1),
      };
    });
  }, [bus, fromId, toId, params?.from, params?.to, isRouteReversed]);

  const nearest = useMemo(() => {
    if (!userLocation) return null;
    return realStops.reduce<{ index: number; distance: number } | null>((best, stop, index) => {
      if (typeof stop.lat !== 'number' || typeof stop.lng !== 'number') return best;
      const distance = haversineKm(userLocation, { lat: stop.lat, lng: stop.lng });
      if (!best || distance < best.distance) return { index, distance };
      return best;
    }, null);
  }, [realStops, userLocation]);

  useEffect(() => {
    if (!bus) return;
    getBusRatings(bus.id).then(setRatingSummary).catch(() => setRatingSummary(null));
  }, [bus]);

  useEffect(() => {
    if (!bus) return;
    let alive = true;
    setLiveLocationLoading(true);
    getBusLiveLocation(bus.id)
      .then(data => {
        if (alive) setLiveLocationData(data);
      })
      .catch(() => {
        if (alive) setLiveLocationData(null);
      })
      .finally(() => {
        if (alive) setLiveLocationLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [bus]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    if (localStorage.getItem('kj-location-consent') !== 'yes') return;
    const id = navigator.geolocation.watchPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 },
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  if (!bus) return (
    <PageShell {...props} canBack>
      <div style={{ padding: isMobile ? '40px 20px' : '64px 24px', maxWidth: 640, margin: '0 auto', textAlign: 'center' as const }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, margin: '0 auto 20px', background: tk.panelMuted, border: `1px solid ${tk.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>🚌</div>
        <h1 style={{ fontFamily: BEN, fontSize: 22, fontWeight: 700, color: tk.text, margin: '0 0 10px' }}>{T(lang, 'বাস খুঁজে পাওয়া যায়নি', 'Bus not found')}</h1>
        <p style={{ fontFamily: SANS, fontSize: 14, color: tk.textFaint, lineHeight: 1.7, margin: '0 0 24px' }}>
          {T(lang, 'আপনি যে বাসটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি। অন্য রুট চেষ্টা করুন বা সব বাস দেখুন।', 'The bus you are looking for could not be found. Try another route or browse all Dhaka buses.')}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => props.onNav('bus-hub')} style={{ ...chipBtn(tk), background: tk.primary, color: tk.primaryInk, border: 'none', padding: '12px 22px', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            {T(lang, 'সব লোকাল বাস দেখুন', 'Browse Local Buses')}
          </button>
          <button onClick={() => props.onNav('home')} style={{ ...chipBtn(tk), background: 'transparent', color: tk.text, border: `1px solid ${tk.line}`, padding: '12px 22px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
            {T(lang, 'হোমে ফিরুন', 'Back to Home')}
          </button>
        </div>
      </div>
    </PageShell>
  );

  if (showRating) return (
    <PageShell {...props} canBack>
      <div style={{ padding:isMobile?'16px 12px 100px':'24px 40px 80px', maxWidth:920, margin:'0 auto' }}>
        <div style={{ ...card(18), padding:0, overflow:'hidden', minHeight:isMobile?'calc(100dvh - 150px)':'calc(100dvh - 190px)', display:'flex' }}>
          <BusRating busId={bus.id} busName={bus.name} onBack={() => { setShowRating(false); getBusRatings(bus.id).then(setRatingSummary).catch(() => setRatingSummary(null)); }} onSuccess={() => earnCoins(10, 'Bus review submitted')}/>
        </div>
      </div>
          <AdCluster tk={tk} lang={lang} count={isMobile?1:3} isMobile={isMobile}/>
    </PageShell>
  );
  if (showPhotos) return (
    <PageShell {...props} canBack>
      <div style={{ padding:isMobile?'16px 12px 100px':'24px 40px 80px', maxWidth:920, margin:'0 auto' }}>
        <div style={{ ...card(18), padding:0, overflow:'hidden' }}>
          <BusPhotoGallery busId={bus.id} busName={bus.name} busBnName={bus.bnName} onBack={() => setShowPhotos(false)} onSuccess={() => earnCoins(8, 'Bus photo uploaded')}/>
        </div>
      </div>
          <AdCluster tk={tk} lang={lang} count={isMobile?1:3} isMobile={isMobile}/>
    </PageShell>
  );

  if (showLiveTracking) return (
    <PageShell {...props} canBack>
      <div style={{ padding:isMobile?'16px 12px 100px':'24px 40px 80px', maxWidth:980, margin:'0 auto' }}>
        <div style={{ ...card(18), padding:0, overflow:'hidden', minHeight:isMobile?'calc(100dvh - 140px)':'calc(100dvh - 190px)', display:'flex' }}>
          <BusLiveTracking
            busId={bus.id}
            busName={lang === 'bn' ? bus.bnName : bus.name}
            stops={realStops.map(stop => ({ id: stop.id, name: lang === 'bn' ? stop.bn : stop.en }))}
            onBack={() => setShowLiveTracking(false)}
          />
        </div>
      </div>
      <AdCluster tk={tk} lang={lang} count={isMobile?1:3} isMobile={isMobile}/>
    </PageShell>
  );

  const colPair = TYPE_COLOR[bus.type] ?? ['#1e3a8a','#3b82f6'];
  const badge = bus.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const fareAmt = (() => {
    const f = bus.stops.indexOf(fromId);
    const t = bus.stops.indexOf(toId);
    if (f !== -1 && t !== -1 && f !== t) {
      const segment = bus.stops.slice(Math.min(f, t), Math.max(f, t) + 1);
      let km = 0;
      for (let i = 1; i < segment.length; i++) {
        const a = STATIONS[segment[i - 1]], b = STATIONS[segment[i]];
        km += (a?.lat && b?.lat) ? haversineKm({ lat: a.lat, lng: a.lng }, { lat: b.lat, lng: b.lng }) : 1.2;
      }
      if (km > 0) {
        const rate = bus.type === 'AC' ? 5.0 : bus.type === 'Double-Decker' ? 3.2 : 2.53;
        return Math.max(10, Math.ceil(km * rate));
      }
    }
    return bus.type === 'AC' ? 60 : bus.type === 'Double-Decker' ? 50 : 30;
  })();
  const isFavorite = favoriteIds.includes(bus.id);
  const nearestStopName = nearest ? realStops[nearest.index]?.en : undefined;

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'16px 16px 24px':'28px 40px 80px', maxWidth:1180, margin:'0 auto' }}>
        <div style={{ height:isMobile?320:430,borderRadius:16,overflow:'hidden',position:'relative',marginBottom:18,background:'#0a1f14',border:`1px solid ${tk.line}` }}>
          <BusRouteMap
            route={bus}
            userLocation={userLocation}
            highlightStartId={fromId}
            highlightEndId={toId}
            isReversed={isRouteReversed}
            height="100%"
          />
        </div>

        {!isMobile && (
          <div style={{ display:'flex', gap:10, marginBottom:20 }}>
            <button onClick={() => setFavoriteIds(toggleFavoriteBus(bus.id, bus.name))} style={{ ...chipBtn(tk), borderRadius:12, padding:'10px 16px', color:isFavorite?tk.accent:tk.text, flex:1, justifyContent:'center' }}>
              {isFavorite?'♥':'♡'} {T(lang,'সেভ','Save')}
            </button>
            <button onClick={() => setShowRating(true)} style={{ ...chipBtn(tk), borderRadius:12, padding:'10px 16px', flex:1, justifyContent:'center' }}>
              ★ {T(lang,'রেট','Rate')}
            </button>
          </div>
        )}

        <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'1.35fr 0.8fr',gap:20 }}>
          <div>
            <div style={{ ...card(18),marginBottom:16 }}>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:14 }}>
                <div style={{ width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${colPair[0]},${colPair[1]})`,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:SANS,fontWeight:800,fontSize:15 }}>{badge}</div>
                <div style={{ flex:1 }}>
                  <h1 style={{ fontFamily:BEN,fontWeight:700,fontSize:16,color:tk.text,margin:0 }}>{lang==='bn'?bus.bnName:bus.name}</h1>
                  <div style={{ display:'flex',alignItems:'center',gap:6,marginTop:2,flexWrap:'wrap' }}>
                    {ratingSummary && ratingSummary.count > 0 ? (
                      <>
                        <span style={{ color:'#f59e0b',fontSize:12 }}>★ {ratingSummary.average.toFixed(1)}</span>
                        <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>{ratingSummary.count} {T(lang,'রিভিউ','reviews')}</span>
                      </>
                    ) : (
                      <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>{T(lang,'এখনো কোনো রিভিউ নেই','No reviews yet')}</span>
                    )}
                    <Pill tk={tk} tone={bus.type==='AC'?'primary':'mute'}>{bus.type}</Pill>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily:BEN,fontSize:13,color:tk.textDim,marginBottom:12 }}>{bus.routeString}</div>
              <div style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint,marginBottom:12 }}>{bus.hours}</div>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
                {[
                  {v:N(bus.stops.length, lang),l:T(lang,'স্টপ','stops')},
                  {v:Fare(fareAmt, lang),l:T(lang,'ভাড়া','fare')},
                  {v:bus.type,l:T(lang,'ধরন','type')},
                ].map((s,i)=>(
                  <div key={i} style={{ background:tk.panelMuted,borderRadius:10,padding:'8px 6px',textAlign:'center' }}>
                    <div style={{ fontFamily:SANS,fontWeight:800,fontSize:14,color:tk.text }}>{s.v}</div>
                    <div style={{ fontFamily:SANS,fontSize:10,color:tk.textFaint }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...card(18),marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginBottom:12 }}>
                <div>
                  <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text }}>{T(lang,'লাইভ লোকেশন','Live location')}</div>
                  <div style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint,marginTop:2 }}>
                    {liveLocationLoading ? T(lang,'লোড হচ্ছে...','Loading...') : (liveLocationData?.reports?.length ? T(lang,'সর্বশেষ রিপোর্ট','Latest reported stop') : T(lang,'এখনও কোনো লাইভ রিপোর্ট নেই','No live reports yet'))}
                  </div>
                </div>
                <button
                  onClick={() => setShowLiveTracking(true)}
                  style={{ border:'none', borderRadius:999, padding:'8px 12px', background:tk.primary, color:'#fff', fontFamily:SANS, fontWeight:700, fontSize:12, cursor:'pointer' }}
                >
                  {T(lang,'দেখুন','View')}
                </button>
              </div>
              {liveLocationLoading ? (
                <div style={{ background:tk.panelMuted,borderRadius:12,padding:'10px 12px',color:tk.textFaint,fontFamily:SANS,fontSize:12 }}>{T(lang,'লাইভ অবস্থান লোড হচ্ছে...','Loading live location...')}</div>
              ) : liveLocationData?.reports?.length ? (
                <div style={{ background:tk.panelMuted,borderRadius:12,padding:'10px 12px',border:`1px solid ${tk.primary}22` }}>
                  <div style={{ fontFamily:BEN,fontWeight:700,color:tk.text }}>{liveLocationData.reports[liveLocationData.reports.length - 1].stopName}</div>
                  <div style={{ fontFamily:SANS,fontSize:12,color:tk.textDim,marginTop:6 }}>
                    {liveLocationData.reports[liveLocationData.reports.length - 1].heading ? `${T(lang,'দিকে','toward')} ${liveLocationData.reports[liveLocationData.reports.length - 1].heading} · ` : ''}
                    {new Date(liveLocationData.reports[liveLocationData.reports.length - 1].timestamp).toLocaleTimeString([], { hour:'numeric', minute:'2-digit' })}
                  </div>
                </div>
              ) : (
                <div style={{ background:tk.panelMuted,borderRadius:12,padding:'10px 12px',color:tk.textDim,fontFamily:SANS,fontSize:12 }}>{T(lang,'এই রুটে এখনো কেউ লাইভ অবস্থান শেয়ার করেনি।','No one has shared a live update for this route yet.')}</div>
              )}
            </div>

            <div style={{ ...card(18),marginBottom:16 }}>
              <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text,marginBottom:14 }}>{T(lang,'স্টপসমূহ','Stops')} <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>({N(realStops.length, lang)})</span></div>
              {realStops.map((s,i)=>{
                const isNearest = nearest?.index === i;
                const showHelp = isNearest && nearest.distance <= 1.5;
                const isEnd = s.isFrom || s.isTo || isNearest;
                const dotColor = isNearest ? '#38bdf8' : s.isFrom ? tk.primary : tk.accent;
                return (
                  <div key={s.id} style={{ display:'flex',gap:14,paddingBottom:i<realStops.length-1?14:0,position:'relative',animation:'kjStopIn 0.4s ease-out both',animationDelay:`${Math.min(i*45,900)}ms` }}>
                    {/* rail with flowing light */}
                    <div style={{ width:22,flexShrink:0,position:'relative',display:'flex',justifyContent:'center' }}>
                      {i<realStops.length-1 && (
                        <div style={{ position:'absolute',top:18,bottom:-6,width:3,borderRadius:3,background:tk.primary,opacity:0.14,overflow:'hidden' }}>
                          <div style={{ position:'absolute',left:0,right:0,height:'45%',background:`linear-gradient(180deg,transparent,${tk.primary}cc,transparent)`,animation:'kjLineFlow 1.6s linear infinite' }}/>
                        </div>
                      )}
                      <div style={{ position:'relative',marginTop:2 }}>
                        {isEnd && <div style={{ position:'absolute',inset:-7,borderRadius:999,background:dotColor,opacity:0.35,animation:'kjPulseRing 2s ease-out infinite' }}/>}
                        <div style={{ width:isEnd?16:11,height:isEnd?16:11,borderRadius:999,border:`2.5px solid ${dotColor}`,background:isNearest?'#0ea5e9':s.isFrom?tk.primary:s.isTo?tk.accent:tk.panel,boxShadow:isEnd?`0 0 12px ${dotColor}66`:undefined,position:'relative',zIndex:1 }}/>
                      </div>
                    </div>
                    <div style={{ flex:1,display:'flex',alignItems:'center',justifyContent:'space-between',gap:10 }}>
                      <div style={{ display:'flex',alignItems:'center',gap:6,flexWrap:'wrap' }}>
                        <span style={{ fontFamily:BEN,fontWeight:isEnd?700:500,fontSize:14,color:tk.text }}>{lang==='bn'?s.bn:s.en}</span>
                        {s.isFrom && <Pill tk={tk} tone="primary">{T(lang,'বোর্ডিং','Boarding')}</Pill>}
                        {s.isTo && <Pill tk={tk} tone="accent">{T(lang,'গন্তব্য','Destination')}</Pill>}
                        {isNearest && <Pill tk={tk} tone="mute">{T(lang,'আপনি এখানে','You are here')}</Pill>}
                      </div>
                      {showHelp && (
                        <button onClick={() => setShowHelpline(true)} style={{ background:tk.accentSoft,border:`1px solid ${tk.accent}55`,borderRadius:999,padding:'6px 10px',fontFamily:BEN,fontWeight:700,fontSize:12,color:tk.accent,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0 }}>
                          {T(lang,'হেল্পলাইন','Help line')}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <NativeAdCard
              tk={tk}
              lang={lang}
              kind={isMobile?'mob-banner':'leaderboard'}
              title={T(lang, 'এই রুটের জন্য অফার', 'Offers along this route')}
              icon="🎯"
            />
          </div>

          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <div style={{ ...card(16),background:`linear-gradient(135deg,${colPair[0]},${colPair[1]})`,color:'#fff',border:'none' }}>
              <div style={{ fontFamily:BEN,fontWeight:700,fontSize:16,marginBottom:12 }}>{T(lang,'বাস তথ্য','Bus info')}</div>
              {[
                {l:T(lang,'অপারেটর','Operator'),v:bus.name},
                {l:T(lang,'বাস আইডি','Bus ID'),v:bus.id},
                {l:T(lang,'ভাড়া','Fare'),v:'৳ '+N(fareAmt, lang)},
                {l:T(lang,'বাসের ধরন','Type'),v:bus.type},
                {l:T(lang,'সময়সূচি','Hours'),v:bus.hours},
              ].map((d,i)=>(
                <div key={i} style={{ display:'flex',justifyContent:'space-between',gap:12,paddingBottom:8,borderBottom:'1px solid rgba(255,255,255,0.12)',marginBottom:8 }}>
                  <span style={{ fontFamily:BEN,fontSize:13,opacity:0.8 }}>{d.l}</span>
                  <span style={{ fontFamily:SANS,fontWeight:700,fontSize:13,textAlign:'right' }}>{d.v}</span>
                </div>
              ))}
              {nearest && (
                <p style={{ fontFamily:BEN,fontSize:12,opacity:0.82,marginTop:8 }}>
                  {T(lang,'নিকটতম স্টপ','Nearest stop')}: {lang === 'bn' ? realStops[nearest.index]?.bn : realStops[nearest.index]?.en} · {N(nearest.distance.toFixed(1), lang)} km
                </p>
              )}
            </div>
            <div style={card(16)}>
              <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text,marginBottom:10 }}>{T(lang,'কমিউনিটি','Community')}</div>
              <button onClick={() => setShowRating(true)} style={{ ...chipBtn(tk),width:'100%',justifyContent:'center',marginBottom:8 }}>
                ★ {T(lang,'রিভিউ দিন','Rate & review')}
              </button>
              <button onClick={() => setShowPhotos(true)} style={{ ...chipBtn(tk),width:'100%',justifyContent:'center' }}>
                {T(lang,'ছবি দেখুন / আপলোড','Photos / upload')}
              </button>
            </div>
            <NativeAdCard
              tk={tk}
              lang={lang}
              kind="mid-rect"
              title={T(lang, 'যাত্রীদের জন্য অফার', 'For your journey')}
              subtitle={T(lang, 'রাইড, ফুড ও পার্সেল', 'Ride, food & parcel')}
              icon="🎁"
              compact
            />
          </div>
        </div>
      </div>

      <EmergencyHelplineModal
        isOpen={showHelpline}
        onClose={() => setShowHelpline(false)}
        userLocation={userLocation}
        currentLocationName={nearestStopName}
      />
          <div style={{ padding: isMobile ? '16px 16px 0' : '16px 40px 0' }}>
            <GovAdBanner lang={lang} height={isMobile ? 200 : 230} ids={['brta','mygov','railway']} />
          </div>
          <AdCluster tk={tk} lang={lang} count={isMobile?1:3} isMobile={isMobile}/>
    </PageShell>
  );
}
