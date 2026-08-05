import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KJ_TOKENS, T, SANS, BEN, N } from '../tokens';
import { PageShell } from './PageShell';
import {
  getDtcaLiveLocation,
  getDtcaRouteDetails,
  DtcaLiveLocationData,
  DtcaRouteDetailsData,
} from '../../../services/dtcaTrackerService';

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
const POLL_MS = 10000;

function statusColor(status: string): string {
  if (status === 'moving') return '#10b981';
  if (status === 'idle') return '#f59e0b';
  return '#9ca3af';
}

function statusLabel(status: string, lang: 'bn' | 'en'): string {
  if (status === 'moving') return T(lang, 'চলছে', 'Moving');
  if (status === 'engine_off') return T(lang, 'ইঞ্জিন বন্ধ', 'Engine Off');
  if (status === 'idle') return T(lang, 'অপেক্ষায়', 'Idle');
  return status;
}

export function DTCABusDetailPage(props: Props) {
  const { theme, device, lang, params } = props;
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';

  const identifier = params?.identifier ?? '';
  const initialVrn = params?.vrn ?? '';

  const [liveData, setLiveData] = useState<DtcaLiveLocationData | null>(null);
  const [routeData, setRouteData] = useState<DtcaRouteDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firstLoad = useRef(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const card = (p = 16): React.CSSProperties => ({
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 16,
    padding: p,
    marginBottom: 14,
  });

  const fetchLive = async () => {
    if (!identifier) return;
    try {
      const res = await getDtcaLiveLocation(identifier);
      setLiveData(res.data);
      setError(null);
    } catch (err: any) {
      if (firstLoad.current) setError(err?.message || 'Failed to load');
    } finally {
      if (firstLoad.current) { setLoading(false); firstLoad.current = false; }
    }
  };

  useEffect(() => {
    if (!identifier) return;
    void getDtcaRouteDetails(identifier)
      .then(res => setRouteData(res.data))
      .catch(() => {});
    void fetchLive();
    const timer = setInterval(() => { void fetchLive(); }, POLL_MS);
    return () => clearInterval(timer);
  }, [identifier]);

  // Init Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = L.map(mapContainerRef.current, { zoomControl: true, attributionControl: false })
      .setView(DHAKA_CENTER, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 300);
    return () => {
      map.remove();
      mapRef.current = null;
      busMarkerRef.current = null;
      routePolylineRef.current = null;
      userMarkerRef.current = null;
    };
  }, []);

  // Track user location on map
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      pos => {
        const map = mapRef.current;
        if (!map) return;
        const latLng: [number, number] = [pos.coords.latitude, pos.coords.longitude];
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
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Draw route polyline when routeData loads
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !routeData?.path?.length) return;
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }
    const coords: [number, number][] = routeData.path.map(p => [p.latitude, p.longitude]);
    routePolylineRef.current = L.polyline(coords, { color: '#10b981', weight: 4, opacity: 0.7 }).addTo(map);
    if (!liveData) map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] });
  }, [routeData]);

  // Update bus marker on live data
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !liveData?.latitude || !liveData?.longitude) return;
    const latLng: [number, number] = [liveData.latitude, liveData.longitude];
    if (busMarkerRef.current) {
      busMarkerRef.current.setLatLng(latLng);
    } else {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:36px;height:36px;background:#10b981;border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3);margin:-18px 0 0 -18px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
      busMarkerRef.current = L.marker(latLng, { icon }).addTo(map);
      map.flyTo(latLng, 15, { duration: 1 });
    }
  }, [liveData]);

  const vrn = routeData?.vehicle?.vehicleNumber || initialVrn || identifier;
  const routeName = routeData?.routeName ?? '';
  const stoppages = routeData?.stoppages ?? [];
  const passedIds = new Set(liveData?.passedStoppageIds ?? []);
  const nextId = liveData?.nextStoppage?.id;
  const speed = liveData?.speedKph ?? 0;
  const busStatus = liveData?.status ?? '';
  const nextStopName = liveData?.nextStoppage?.name ?? T(lang, 'তথ্য নেই', 'N/A');
  const etaMins = liveData?.estimatedArrivalMinutes;
  const remaining = liveData?.remainingStoppages ?? 0;

  return (
    <PageShell {...props}>
      <div style={{ padding: isMobile ? '0 0 80px' : '0 0 48px' }}>
        <div style={{ padding: isMobile ? '0 16px' : '0 40px', paddingTop: 16 }}>

          {loading && !liveData && (
            <div style={{ ...card(), display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: tk.line }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 16, borderRadius: 8, background: tk.line, width: '55%', marginBottom: 8 }} />
                <div style={{ height: 12, borderRadius: 6, background: tk.line, width: '40%' }} />
              </div>
            </div>
          )}

          {error && !liveData && (
            <div style={{ ...card(), textAlign: 'center' }}>
              <div style={{ fontFamily: SANS, fontSize: 13, color: '#ef4444', marginBottom: 10 }}>
                {T(lang, 'লাইভ ডেটা লোড হয়নি', 'Live data could not be loaded')}
              </div>
            </div>
          )}

          {/* Header */}
          <div style={card()}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#006a4e,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/>
                  <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/>
                  <circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: tk.text, marginBottom: 3 }}>{vrn}</div>
                {routeName ? (
                  <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{routeName}</div>
                ) : null}
                <div style={{ fontFamily: BEN, fontSize: 11, color: tk.textFaint }}>
                  {T(lang, 'ঢাকা পরিবহন সমন্বয় কর্তৃপক্ষ', 'Dhaka Transport Coordination Authority')}
                </div>
              </div>
              {busStatus ? (
                <div style={{ background: `${statusColor(busStatus)}22`, color: statusColor(busStatus), borderRadius: 8, padding: '4px 10px', fontFamily: SANS, fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                  {statusLabel(busStatus, lang)}
                </div>
              ) : null}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 14 }}>
              {[
                { label: T(lang, 'গতি', 'Speed'), value: `${N(speed, lang)} ${T(lang, 'কিমি/ঘ', 'km/h')}`, color: '#10b981' },
                { label: T(lang, 'পরবর্তী স্টপ', 'Next stop'), value: nextStopName, color: tk.primary },
                { label: T(lang, 'ইটিএ', 'ETA'), value: etaMins != null ? `${N(etaMins, lang)} ${T(lang, 'মিনিট', 'min')}` : '—', color: '#f59e0b' },
                { label: T(lang, 'স্টপ বাকি', 'Stops left'), value: `${N(remaining, lang)}`, color: tk.textDim },
              ].map((stat, i) => (
                <div key={i} style={{ background: tk.panelMuted, borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: stat.color, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ ...card(0), overflow: 'hidden', height: 300 }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Journey progress */}
          {stoppages.length > 0 && (
            <div style={card()}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 12 }}>
                {T(lang, 'যাত্রাপথ', 'Journey Progress')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {stoppages.map((stop, idx) => {
                  const isPassed = passedIds.has(stop.id);
                  const isNext = stop.id === nextId;
                  const dotColor = isPassed ? '#9ca3af' : isNext ? '#3b82f6' : tk.line;
                  return (
                    <div key={stop.id ?? idx} style={{ display: 'flex', gap: 14 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, flexShrink: 0 }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: 999, background: dotColor,
                          border: `2px solid ${tk.bg}`, flexShrink: 0, marginTop: 4,
                          boxShadow: isNext ? `0 0 0 3px ${dotColor}55` : 'none',
                        }} />
                        {idx < stoppages.length - 1 && (
                          <div style={{ width: 2, flex: 1, background: `${dotColor}44`, minHeight: 16, marginTop: 2 }} />
                        )}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: BEN, fontWeight: isNext ? 700 : 500, fontSize: 13, color: isNext ? tk.primary : isPassed ? tk.textFaint : tk.text }}>
                            {stop.name}
                          </span>
                          {isNext && (
                            <span style={{ background: `${tk.primary}22`, color: tk.primary, borderRadius: 6, padding: '1px 7px', fontFamily: SANS, fontWeight: 700, fontSize: 10 }}>
                              {T(lang, 'পরবর্তী', 'Next')}
                            </span>
                          )}
                          {isPassed && (
                            <span style={{ background: '#9ca3af18', color: '#9ca3af', borderRadius: 6, padding: '1px 7px', fontFamily: SANS, fontWeight: 700, fontSize: 10 }}>
                              {T(lang, 'পার হয়েছে', 'Passed')}
                            </span>
                          )}
                        </div>
                        {stop.scheduledArrivalTime ? (
                          <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginTop: 1 }}>{stop.scheduledArrivalTime}</div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </PageShell>
  );
}
