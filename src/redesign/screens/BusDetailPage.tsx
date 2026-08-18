import React, { useEffect, useMemo, useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN, chipBtn, N, Fare } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { GovAdBanner } from '../components/GovAdBanner';
import { LiveBusMap } from '../components/LiveBusMap';
import { Pill } from '../components/Pill';
import { BUS_DATA, STATIONS } from '../../../constants';
import BusRating from '../../../components/BusRating';
import BusPhotoGallery from '../../../components/BusPhotoGallery';
import EmergencyHelplineModal from '../../../components/EmergencyHelplineModal';
import { getBusRatings, BusRatingSummary, submitBusPlate, PLATE_REGEX } from '../../../services/communityDataService';
import { getBuses as getCommunityBuses, getSharingState, getNearestStopName, type CommunityBus } from '../../../services/busLiveService';
import { resolveStationIds } from '../../../services/searchService';
import { findTransitRoutes, getBusesForLeg } from '../../../services/transitPlanner';
import { earnCoins } from '../utils/koyCoinService';
import type { UserLocation } from '../../../types';
import { getFavoriteBusIds, toggleFavoriteBus } from '../utils/favorites';
import { useDocumentTitle, setCanonicalUrl, setMetaTag, setPropertyMetaTag, setJsonLd } from '../utils/useDocumentTitle';
import { inHours, trackPushEvent } from '../../services/pushService';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string,p?:Record<string,string>)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

const LIVE_LIST_INITIAL = 6;

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
// Must mirror KoyJaboApp slugify: strip "paribahan", match sitemap/static SEO pages.
const slugify = (v: string) => v.toLowerCase().trim().replace(/paribahan/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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
    setCanonicalUrl(`/bus/${slugify(bus?.name || busId)}`);
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

  // Schedule a travel reminder 3h after viewing a route — fires only if the
  // user closes the app without saving the route; favourites.ts cancels it on save.
  useEffect(() => {
    if (!bus) return;
    trackPushEvent('route-view', { name: bus.name, url: `/bus/${slugify(bus.name)}` }, inHours(3));
  }, [busId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if user's from→to direction is reverse of the bus route order
  // e.g. bus goes Gabtoli(0)→Gulshan(5), user searched Gulshan→Gabtoli → isReversed=true
  const fromIdx = bus ? bus.stops.indexOf(fromId) : -1;
  const toIdx = bus ? bus.stops.indexOf(toId) : -1;
  const isRouteReversed = fromIdx > toIdx && fromIdx !== -1 && toIdx !== -1;

  // Transit: show alternate plan when from/to params are given but not both on this bus
  const needsTransit = !!(params?.from && params?.to && bus && (fromIdx === -1 || toIdx === -1));

  const transitRoutes = useMemo(() => {
    if (!needsTransit) return [];
    return findTransitRoutes(fromId, toId);
  }, [needsTransit, fromId, toId]);

  // For transit: build combined stop list + transfer index for the unified map
  const transitMapData = useMemo(() => {
    if (!needsTransit || !transitRoutes[0] || transitRoutes[0].legs.length < 2) return null;
    const leg1 = transitRoutes[0].legs[0];
    const leg2 = transitRoutes[0].legs[1];
    const allStopIds = [...leg1.stops, ...leg2.stops.slice(1)];
    const stops = allStopIds.map(sid => {
      const st = STATIONS[sid];
      if (!st || typeof st.lat !== 'number' || typeof st.lng !== 'number') return null;
      return { lat: st.lat as number, lng: st.lng as number, name: st.name ?? sid, bnName: st.bnName ?? sid };
    }).filter((s): s is NonNullable<typeof s> => s !== null);
    return { stops, transferIndex: leg1.stops.length - 1, stopIds: allStopIds };
  }, [needsTransit, transitRoutes]);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteBusIds());
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);
  const [plateInput, setPlateInput] = useState('');
  const [plateSubmitting, setPlateSubmitting] = useState(false);
  const [plateFeedback, setPlateFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  // Rating / photo views swap the page content in place — reset scroll so the
  // user lands at the top instead of keeping the detail page's scroll position.
  useEffect(() => {
    if (showRating || showPhotos) {
      const sc = document.querySelector('[data-app-scroller]') as HTMLElement | null;
      if (sc) sc.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }, [showRating, showPhotos]);
  const [ratingSummary, setRatingSummary] = useState<BusRatingSummary | null>(null);
  const [communityBuses, setCommunityBuses] = useState<CommunityBus[]>([]);
  const [selectedLiveBus, setSelectedLiveBus] = useState<string | null>(null);
  const [showAllLive, setShowAllLive] = useState(false);

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

  // Community live buses on this route (koyjabo-bus-live worker) — 30s poll
  useEffect(() => {
    if (!bus) return;
    const fetchBuses = () => { if (document.visibilityState === 'visible') void getCommunityBuses(bus.id).then(setCommunityBuses); };
    void fetchBuses();
    const timer = setInterval(fetchBuses, 30_000);
    return () => clearInterval(timer);
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
  // Live list: first N, or all when expanded; selected bus always pinned on top
  const liveBusList = (() => {
    const list = showAllLive ? communityBuses : communityBuses.slice(0, LIVE_LIST_INITIAL);
    const sel = communityBuses.find(b => b.busNumber === selectedLiveBus);
    if (sel && !list.some(b => b.busNumber === selectedLiveBus)) return [sel, ...list];
    return list;
  })();

  // Helper: get all buses for a transit leg (for showing alternatives)
  const legBuses = (legFromId: string, legToId: string) => getBusesForLeg(legFromId, legToId);

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'16px 16px 24px':'28px 40px 80px', maxWidth:1180, margin:'0 auto' }}>

        {/* ── Transit panel: shown when from/to params are not both on this bus ── */}
        {needsTransit && (
          <div style={{ background: theme === 'dark' ? '#1a0d00' : '#fff7ed', border: '1.5px solid #f97316', borderRadius: 18, padding: '18px 18px 14px', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>🔀</span>
              <div>
                <div style={{ fontFamily: BEN, fontWeight: 700, fontSize: 16, color: '#f97316' }}>
                  {T(lang, 'সরাসরি বাস নেই — ট্রানজিট প্রয়োজন', 'No Direct Bus — Transit Required')}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textFaint, marginTop: 2 }}>
                  {STATIONS[fromId]
                    ? (lang === 'bn' ? STATIONS[fromId].bnName : STATIONS[fromId].name) ?? params?.from
                    : params?.from}
                  {' → '}
                  {STATIONS[toId]
                    ? (lang === 'bn' ? STATIONS[toId].bnName : STATIONS[toId].name) ?? params?.to
                    : params?.to}
                </div>
              </div>
            </div>

            {transitRoutes.length === 0 ? (
              <div style={{ fontFamily: BEN, fontSize: 14, color: tk.textDim, padding: '10px 0' }}>
                {T(lang, 'কোনো ট্রানজিট রুট পাওয়া যায়নি। অন্য রুট খুঁজুন।', 'No transit routes found. Try searching another route.')}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {transitRoutes.slice(0, 2).map((route, ri) => (
                  <div key={ri} style={{ background: tk.bg, border: `1px solid ${tk.line}`, borderRadius: 14, padding: '14px 16px' }}>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginBottom: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
                      {T(lang, `বিকল্প ${ri + 1}`, `Option ${ri + 1}`)}
                      {route.transferAt && (
                        <> &nbsp;·&nbsp; {T(lang, 'ট্রান্সফার:', 'Transfer at:')} <span style={{ color: tk.primary, fontWeight: 700 }}>
                          {lang === 'bn' && route.transferAtBn ? route.transferAtBn : route.transferAt}
                        </span></>
                      )}
                    </div>
                    {route.legs.map((leg, li) => {
                      const altBuses = legBuses(leg.fromId, leg.toId).filter(b => b.id !== leg.busId).slice(0, 3);
                      const legColor = li === 0 ? tk.primary : '#f59e0b';
                      return (
                        <div key={li}>
                          {/* Leg row */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: altBuses.length > 0 ? 6 : li < route.legs.length - 1 ? 12 : 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3, flexShrink: 0 }}>
                              <div style={{ width: 10, height: 10, borderRadius: '50%', background: legColor, border: `2px solid ${legColor}` }} />
                              {li < route.legs.length - 1 && (
                                <div style={{ width: 2, height: 28, background: `linear-gradient(${legColor}, #f59e0b)`, margin: '3px 0' }} />
                              )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ background: legColor, color: '#fff', borderRadius: 6, padding: '3px 10px', fontFamily: SANS, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                                  {li + 1}. {lang === 'bn' ? leg.busBn : leg.bus}
                                </span>
                                <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, color: tk.text }}>
                                  {lang === 'bn' ? `${leg.fromBn} → ${leg.toBn}` : `${leg.from} → ${leg.to}`}
                                </span>
                                {leg.stopsBetween > 0 && (
                                  <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, background: tk.panelMuted, borderRadius: 4, padding: '2px 6px' }}>
                                    {N(leg.stopsBetween, lang)} {T(lang, 'স্টপ', 'stops')}
                                  </span>
                                )}
                              </div>
                              {/* Stop dots strip for this leg */}
                              {leg.stops.length > 2 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                                  {leg.stops.slice(0, 8).map((sid, si) => {
                                    const st = STATIONS[sid];
                                    const isEnd = si === 0 || si === leg.stops.length - 1 || si === Math.min(7, leg.stops.length - 1);
                                    return (
                                      <React.Fragment key={sid}>
                                        <span title={st?.name ?? sid} style={{ fontSize: isEnd ? 11 : 8, fontFamily: SANS, color: isEnd ? legColor : tk.textFaint, fontWeight: isEnd ? 600 : 400, whiteSpace: 'nowrap' }}>
                                          {isEnd ? (lang === 'bn' && st?.bnName ? st.bnName : st?.name ?? sid.replace(/_/g, ' ')) : '•'}
                                        </span>
                                        {si < Math.min(7, leg.stops.length - 1) && (
                                          <span style={{ fontSize: 9, color: tk.textFaint, margin: '0 1px' }}>—</span>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                  {leg.stops.length > 8 && (
                                    <span style={{ fontSize: 10, color: tk.textFaint }}>+{N(leg.stops.length - 8, lang)}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Alternative buses for this leg */}
                          {altBuses.length > 0 && (
                            <div style={{ marginLeft: 20, marginBottom: li < route.legs.length - 1 ? 10 : 0, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, alignSelf: 'center' }}>
                                {T(lang, 'বিকল্প:', 'Alt:')}
                              </span>
                              {altBuses.map(b => (
                                <button
                                  key={b.id}
                                  onClick={() => props.onNav('bus-detail', { busId: b.id, from: leg.fromId, to: leg.toId })}
                                  style={{ fontFamily: BEN, fontSize: 11, color: legColor, background: 'transparent', border: `1px solid ${legColor}40`, borderRadius: 6, padding: '2px 8px', cursor: 'pointer' }}
                                >
                                  {lang === 'bn' ? b.bnName : b.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 12, fontFamily: SANS, fontSize: 12, color: tk.textFaint, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>💡</span>
              <span>{T(lang, 'প্রথম বাসে উঠুন, ট্রান্সফার পয়েন্টে নামুন, তারপর দ্বিতীয় বাসে উঠুন।', 'Board the first bus, alight at the transfer stop, then take the second bus.')}</span>
            </div>
          </div>
        )}

        {/* Map: transit (two-color legs) or regular single-bus route */}
        <div style={{ height:isMobile?320:430,borderRadius:16,overflow:'hidden',position:'relative',marginBottom:18,background:'#0a1f14',border:`1px solid ${needsTransit ? '#f97316' : tk.line}` }}>
          {needsTransit && transitMapData && (
            <div style={{ position:'absolute',top:8,left:8,zIndex:1000,display:'flex',gap:6,pointerEvents:'none' }}>
              <span style={{ background:'#10b981',color:'#fff',borderRadius:6,padding:'3px 8px',fontSize:11,fontFamily:'sans-serif',fontWeight:700 }}>① {transitRoutes[0]?.legs[0]?.bus}</span>
              <span style={{ background:'#f59e0b',color:'#fff',borderRadius:6,padding:'3px 8px',fontSize:11,fontFamily:'sans-serif',fontWeight:700 }}>② {transitRoutes[0]?.legs[1]?.bus}</span>
            </div>
          )}
          <LiveBusMap
            tk={tk}
            lang={lang}
            isMobile={isMobile}
            height={isMobile ? 320 : 430}
            routeStops={transitMapData ? transitMapData.stops : realStops
              .filter(s => typeof s.lat === 'number' && typeof s.lng === 'number')
              .map(s => ({ lat: s.lat as number, lng: s.lng as number, name: s.en, bnName: s.bn }))}
            stopIds={transitMapData ? transitMapData.stopIds : bus.stops}
            buses={communityBuses}
            selectedNumber={selectedLiveBus}
            sharingBusNumber={getSharingState()?.busNumber ?? null}
            onMarkerClick={setSelectedLiveBus}
            userProximity={!needsTransit && nearest && userLocation ? { lat: userLocation.lat, lng: userLocation.lng, stopIndex: nearest.index, distanceKm: nearest.distance } : null}
            transferStopIndex={transitMapData?.transferIndex}
          />
        </div>

        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          <button onClick={() => setFavoriteIds(toggleFavoriteBus(bus.id, bus.name))} style={{ ...chipBtn(tk), borderRadius:12, padding:'10px 16px', color:isFavorite?tk.accent:tk.text, flex:1, justifyContent:'center' }}>
            {isFavorite?'♥':'♡'} {T(lang,'সেভ','Save')}
          </button>
          <button onClick={() => setShowRating(true)} style={{ ...chipBtn(tk), borderRadius:12, padding:'10px 16px', flex:1, justifyContent:'center' }}>
            ★ {T(lang,'রেট','Rate')}
          </button>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'1.35fr 0.8fr',gap:20 }}>
          <div>
            <div className="kj-enter-1" style={{ ...card(18),marginBottom:16 }}>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:14 }}>
                <div style={{ width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${colPair[0]},${colPair[1]})`,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:SANS,fontWeight:800,fontSize:15 }}>{badge}</div>
                <div style={{ flex:1 }}>
                  <h1 style={{ fontFamily:BEN,fontWeight:700,fontSize:16,color:tk.text,margin:0 }}>{lang==='bn'?bus.bnName:bus.name}</h1>
                  <div style={{ display:'flex',alignItems:'center',gap:6,marginTop:2,flexWrap:'wrap' }}>
                    {ratingSummary && ratingSummary.count > 0 ? (
                      <>
                        <span style={{ color:'#f59e0b',fontSize:12 }}>★ {N(ratingSummary.average.toFixed(1), lang)}</span>
                        <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>{N(ratingSummary.count, lang)} {T(lang,'রিভিউ','reviews')}</span>
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
                  {v:N(bus.stops.length, lang),l:T(lang,'স্টপ','stops'),grad:`linear-gradient(135deg,${colPair[0]}33,${colPair[1]}55)`,fg:colPair[1]},
                  {v:Fare(fareAmt, lang),l:T(lang,'ভাড়া','fare'),grad:'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.3))',fg:'#10b981'},
                  {v:bus.type,l:T(lang,'ধরন','type'),grad:'linear-gradient(135deg,rgba(162,89,255,0.12),rgba(162,89,255,0.25))',fg:'#a259ff'},
                ].map((s,i)=>(
                  <div key={i} className="kj-stat" style={{ background:s.grad,border:`1px solid ${s.fg}33`,borderRadius:12,padding:'10px 6px',textAlign:'center' }}>
                    <div style={{ fontFamily:SANS,fontWeight:800,fontSize:14,color:s.fg }}>{s.v}</div>
                    <div style={{ fontFamily:SANS,fontSize:10,color:tk.textFaint,marginTop:2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {needsTransit && transitRoutes[0] ? (
              transitRoutes[0].legs.map((leg, li) => {
                const legColor = li === 0 ? tk.primary : '#f59e0b';
                return (
                  <div key={li} className="kj-enter-2" style={{ ...card(18), marginBottom:16, border:`1.5px solid ${legColor}55` }}>
                    <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:14 }}>
                      <span style={{ background:legColor,color:'#fff',borderRadius:6,padding:'3px 10px',fontFamily:SANS,fontSize:12,fontWeight:700,flexShrink:0 }}>
                        {li === 0 ? '①' : '②'} {lang==='bn'?leg.busBn:leg.bus}
                      </span>
                      <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text }}>
                        {T(lang,'স্টপসমূহ','Stops')} <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>({N(leg.stops.length, lang)})</span>
                      </div>
                    </div>
                    {leg.stops.map((sid, i) => {
                      const st = STATIONS[sid];
                      const isFirst = i === 0;
                      const isLast = i === leg.stops.length - 1;
                      const isEnd = isFirst || isLast;
                      const dotColor = isFirst ? legColor : isLast ? (li === 0 ? '#f59e0b' : tk.accent) : tk.line;
                      return (
                        <div key={sid} style={{ display:'flex',gap:14,paddingBottom:i<leg.stops.length-1?14:0,position:'relative',animation:'kjStopIn 0.4s ease-out both',animationDelay:`${Math.min(i*45,900)}ms` }}>
                          <div style={{ width:22,flexShrink:0,position:'relative',display:'flex',justifyContent:'center' }}>
                            {i < leg.stops.length - 1 && (
                              <div style={{ position:'absolute',top:18,bottom:-6,width:3,borderRadius:3,background:legColor,opacity:0.14,overflow:'hidden' }}>
                                <div style={{ position:'absolute',left:0,right:0,height:'45%',background:`linear-gradient(180deg,transparent,${legColor}cc,transparent)`,animation:'kjLineFlow 1.6s linear infinite' }}/>
                              </div>
                            )}
                            <div style={{ position:'relative',marginTop:2 }}>
                              {isEnd && <div style={{ position:'absolute',inset:-7,borderRadius:999,background:dotColor,opacity:0.35,animation:'kjPulseRing 2s ease-out infinite' }}/>}
                              <div style={{ width:isEnd?16:11,height:isEnd?16:11,borderRadius:999,border:`2.5px solid ${isEnd?dotColor:tk.line}`,background:isFirst?legColor:isLast?(li===0?'#f59e0b':tk.accent):tk.panel,boxShadow:isEnd?`0 0 12px ${dotColor}66`:undefined,position:'relative',zIndex:1 }}/>
                            </div>
                          </div>
                          <div style={{ flex:1,display:'flex',alignItems:'center',gap:6,flexWrap:'wrap' }}>
                            <span style={{ fontFamily:BEN,fontWeight:isEnd?700:500,fontSize:14,color:tk.text }}>
                              {lang==='bn'&&st?.bnName?st.bnName:st?.name??sid.replace(/_/g,' ')}
                            </span>
                            {isFirst && <Pill tk={tk} tone="primary">{T(lang,'বোর্ডিং','Boarding')}</Pill>}
                            {isLast && li === 0 && <Pill tk={tk} tone="mute">{T(lang,'ট্রান্সফার','Transfer')}</Pill>}
                            {isLast && li === transitRoutes[0].legs.length - 1 && <Pill tk={tk} tone="accent">{T(lang,'গন্তব্য','Destination')}</Pill>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <div className="kj-enter-2" style={{ ...card(18),marginBottom:16 }}>
                <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text,marginBottom:14 }}>{T(lang,'স্টপসমূহ','Stops')} <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>({N(realStops.length, lang)})</span></div>
                {realStops.map((s,i)=>{
                  const isNearest = nearest?.index === i;
                  const showHelp = isNearest && nearest.distance <= 1.5;
                  const isEnd = s.isFrom || s.isTo || isNearest;
                  const dotColor = isNearest ? '#38bdf8' : s.isFrom ? tk.primary : tk.accent;
                  return (
                    <div key={s.id} style={{ display:'flex',gap:14,paddingBottom:i<realStops.length-1?14:0,position:'relative',animation:'kjStopIn 0.4s ease-out both',animationDelay:`${Math.min(i*45,900)}ms` }}>
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
                          {isNearest && nearest && (nearest.distance <= 1.5
                            ? <Pill tk={tk} tone="mute">{T(lang,'আপনি এখানে','You are here')}</Pill>
                            : <Pill tk={tk} tone="mute">{N(nearest.distance.toFixed(1), lang)} {T(lang,'কিমি দূরে','km away')}</Pill>
                          )}
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
            )}

            <NativeAdCard
              tk={tk}
              lang={lang}
              kind={isMobile?'mob-banner':'leaderboard'}
              title={T(lang, 'এই রুটের জন্য অফার', 'Offers along this route')}
              icon="🎯"
            />
          </div>

          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <div className="kj-enter-1" style={{ ...card(16),background:`linear-gradient(135deg,${colPair[0]},${colPair[1]})`,color:'#fff',border:'none',position:'relative',overflow:'hidden' }}>
              {/* grid overlay */}
              <div style={{ position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',backgroundSize:'24px 24px',maskImage:'linear-gradient(135deg,transparent 0%,rgba(0,0,0,0.4) 100%)',WebkitMaskImage:'linear-gradient(135deg,transparent 0%,rgba(0,0,0,0.4) 100%)'}}/>
              <div style={{ position:'relative',zIndex:1 }}>
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
            </div>
            <div className="kj-enter-2" style={card(16)}>
              <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text,marginBottom:10 }}>{T(lang,'কমিউনিটি','Community')}</div>
              <button onClick={() => setShowRating(true)} style={{ ...chipBtn(tk),width:'100%',justifyContent:'center',marginBottom:8 }}>
                ★ {T(lang,'রিভিউ দিন','Rate & review')}
              </button>
              <button onClick={() => setShowPhotos(true)} style={{ ...chipBtn(tk),width:'100%',justifyContent:'center' }}>
                {T(lang,'ছবি দেখুন / আপলোড','Photos / upload')}
              </button>
            </div>

            {/* ── Bus Plate Numbers ───────────────────────────────────── */}
            {bus && (() => {
              const plates: string[] = (bus as unknown as { plates?: string[] }).plates ?? [];
              const hasPlates = plates.length > 0;
              const plateValid = PLATE_REGEX.test(plateInput.trim());
              const handlePlateSubmit = async () => {
                if (!plateValid || plateSubmitting) return;
                setPlateSubmitting(true);
                setPlateFeedback(null);
                const result = await submitBusPlate(bus.id, bus.name, plateInput.trim());
                setPlateSubmitting(false);
                if (result.ok) {
                  setPlateFeedback({ ok: true, msg: T(lang, 'ধন্যবাদ! আপনার প্লেট নম্বর জমা হয়েছে।', 'Thanks! Plate submitted for review.') });
                  setPlateInput('');
                } else {
                  setPlateFeedback({ ok: false, msg: result.error ?? T(lang, 'জমা দেওয়া যায়নি। আবার চেষ্টা করুন।', 'Could not submit. Try again.') });
                }
              };
              return (
                <div className="kj-enter-3" style={card(16)}>
                  <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:10 }}>
                    <span style={{ fontSize:16 }}>🚍</span>
                    <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text }}>
                      {T(lang,'বাসের প্লেট নম্বর','Bus Plate Numbers')}
                    </div>
                  </div>
                  {hasPlates ? (
                    <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:12 }}>
                      {plates.map(p => (
                        <span key={p} style={{ background:`${tk.primary}18`,border:`1px solid ${tk.primary}44`,borderRadius:8,padding:'4px 10px',fontFamily:SANS,fontWeight:700,fontSize:12,color:tk.primary,letterSpacing:0.5 }}>
                          DMB {p}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontFamily:BEN,fontSize:12,color:tk.textFaint,marginBottom:10 }}>
                      {T(lang,'এই বাসের প্লেট নম্বর এখনো যোগ হয়নি।','No plate numbers added yet for this bus.')}
                    </div>
                  )}
                  <div style={{ fontFamily:BEN,fontSize:12,color:tk.textDim,marginBottom:8 }}>
                    {T(lang,'আপনার বাসের প্লেট দেখুন এবং যোগ করুন:','Spot a bus? Add its plate:')}
                  </div>
                  <div style={{ display:'flex',gap:8 }}>
                    <input
                      value={plateInput}
                      onChange={e => { setPlateInput(e.target.value.toUpperCase()); setPlateFeedback(null); }}
                      onKeyDown={e => { if (e.key === 'Enter') void handlePlateSubmit(); }}
                      placeholder="DMB 12-3814"
                      maxLength={12}
                      style={{ flex:1,background:tk.panelMuted,border:`1.5px solid ${plateInput&&!plateValid?'#ef4444':tk.line}`,borderRadius:10,padding:'9px 12px',fontFamily:SANS,fontSize:13,color:tk.text,outline:'none' }}
                    />
                    <button
                      onClick={() => void handlePlateSubmit()}
                      disabled={!plateValid || plateSubmitting}
                      style={{ background:plateValid&&!plateSubmitting?tk.primary:tk.line,color:'#fff',border:'none',borderRadius:10,padding:'9px 14px',fontFamily:SANS,fontWeight:700,fontSize:13,cursor:plateValid&&!plateSubmitting?'pointer':'not-allowed',flexShrink:0,transition:'background 0.2s' }}
                    >
                      {plateSubmitting ? '...' : T(lang,'যোগ করুন','Add')}
                    </button>
                  </div>
                  {plateInput && !plateValid && (
                    <div style={{ fontFamily:SANS,fontSize:11,color:'#ef4444',marginTop:4 }}>
                      {T(lang,'ফরম্যাট: DMB 12-3814','Format: DMB 12-3814')}
                    </div>
                  )}
                  {plateFeedback && (
                    <div style={{ fontFamily:BEN,fontSize:12,color:plateFeedback.ok?'#10b981':'#ef4444',marginTop:6,padding:'6px 10px',background:plateFeedback.ok?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.1)',borderRadius:8 }}>
                      {plateFeedback.msg}
                    </div>
                  )}
                </div>
              );
            })()}

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

        {/* Community live buses — koyjabo-bus-live (see services/busLiveService.ts) */}
        <div style={{ ...card(18), marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', animation: 'kjPulse 1.6s infinite' }} />
              <div>
                <div style={{ fontFamily: BEN, fontWeight: 700, fontSize: 15, color: tk.text }}>
                  {T(lang, 'এই রুটে লাইভ বাস', 'Live buses on this route')}
                  {communityBuses.length > 0 && <span style={{ fontFamily: SANS, fontSize: 12, color: '#10b981' }}> ({N(communityBuses.length, lang)})</span>}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginTop: 2 }}>
                  {T(lang, 'যাত্রীরা নিজেদের বাস শেয়ার করছে', 'Passengers sharing their buses')}
                </div>
              </div>
            </div>
            <button
              onClick={() => props.onNav('bus-live-map', { busId: bus.id, share: '1' })}
              style={{ ...chipBtn(tk), borderRadius: 12, padding: '10px 16px', flexShrink: 0, background: tk.primary, color: '#fff' }}
            >
              {T(lang, 'আমি এই বাসে আছি', "I'm on this bus")}
            </button>
          </div>

          {communityBuses.length === 0 ? (
            <div style={{ background: tk.panelMuted, borderRadius: 12, padding: '14px 16px', marginTop: 10 }}>
              <div style={{ fontFamily: BEN, fontSize: 13, color: tk.textDim, marginBottom: 10 }}>
                {T(lang, 'এই মুহূর্তে কেউ বাস শেয়ার করছে না। আপনি প্রথম ব্যক্তি হোন!', 'Nobody is sharing a bus right now. Be the first!')}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => props.onNav('bus-live-map', { busId: bus.id, share: '1' })}
                  style={{ ...chipBtn(tk), borderRadius: 12, padding: '10px 16px', flex: 1, minWidth: 160, justifyContent: 'center', background: tk.primary, color: '#fff' }}
                >
                  {T(lang, 'আমি এই বাসে আছি', "I'm on this bus")}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 12 }}>
              {liveBusList.map(b => {
                const nearestId = getNearestStopName(b.lat, b.lng, bus.stops);
                const nearest = STATIONS[nearestId];
                const isOwn = getSharingState()?.busNumber === b.busNumber;
                const isSel = b.busNumber !== '' && b.busNumber === selectedLiveBus;
                const statusColor = b.status === 'moving' ? '#10b981' : b.status === 'idle' ? '#f59e0b' : '#9ca3af';
                const agoSec = Math.max(0, Math.floor((Date.now() - b.updatedAt) / 1000));
                const ago = agoSec < 60 ? `${agoSec}s` : `${Math.floor(agoSec / 60)}m`;
                return (
                  <div
                    key={b.busNumber || `${b.lat}-${b.lng}`}
                    onClick={() => { if (b.busNumber) setSelectedLiveBus(b.busNumber); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', borderBottom: '1px solid ' + tk.line, cursor: 'pointer', background: isSel ? 'rgba(59,130,246,.12)' : 'transparent', borderRadius: 10 }}
                  >
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, color: tk.text }}>
                        {b.busNumber || bus.name}
                        {b.busNumber && <span style={{ fontSize: 12, color: tk.textDim, marginLeft: 6 }}>{b.busNumber}</span>}
                        {!b.busNumber && <span style={{ fontSize: 12, color: tk.textFaint, marginLeft: 6 }}>{T(lang, 'নম্বর নেই', 'no number')}</span>}
                        {isOwn && <span style={{ fontSize: 11, color: '#3b82f6', marginLeft: 6 }}>{T(lang, 'আপনার বাস', 'Your bus')}</span>}
                      </div>
                      <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim }}>
                        {nearest ? (lang === 'bn' ? nearest.bnName : nearest.name) : ''} · {b.status === 'moving' ? T(lang, 'চলছে', 'Moving') : b.status === 'idle' ? T(lang, 'অপেক্ষায়', 'Idle') : T(lang, 'পুরনো ডেটা', 'Stale')}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textDim }}>
                        {b.contributors > 1 ? `👥 ${N(b.contributors, lang)} · ` : ''}{ago}
                      </div>
                      <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textFaint }}>
                        {b.speed > 1 ? `${Math.round(b.speed * 3.6)} km/h` : '0 km/h'}
                      </div>
                    </div>
                  </div>
                );
              })}
              {!showAllLive && communityBuses.length > LIVE_LIST_INITIAL && (
                <button
                  onClick={() => setShowAllLive(true)}
                  style={{ width: '100%', marginTop: 10, padding: '10px', fontFamily: SANS, fontWeight: 700, fontSize: 14, color: tk.primary, background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 12, cursor: 'pointer' }}
                >
                  {T(lang, `আরও দেখুন (${N(communityBuses.length - LIVE_LIST_INITIAL, lang)})`, `See more (${N(communityBuses.length - LIVE_LIST_INITIAL, lang)})`)}
                </button>
              )}
            </div>
          )}
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
