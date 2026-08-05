import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KJ_TOKENS, T, SANS, BEN, N } from '../tokens';
import { PageShell } from './PageShell';
import { getDtcaLiveLocation, DtcaLiveLocationResponse } from '../../../services/dtcaTrackerService';

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
const OFFICIAL_URL = 'https://buskothay.com/single-dtca-bus-tracking?identifier=';

function statusColor(status?: string): string {
  if (!status) return '#9ca3af';
  const s = status.toLowerCase();
  if (s.includes('moving') || s.includes('running')) return '#10b981';
  if (s.includes('idle') || s.includes('stopped')) return '#f59e0b';
  return '#9ca3af';
}

function statusLabel(status: string | undefined, lang: 'bn' | 'en'): string {
  if (!status) return T(lang, 'অজানা', 'Unknown');
  const s = status.toLowerCase();
  if (s.includes('moving') || s.includes('running')) return T(lang, 'চলছে', 'Moving');
  if (s.includes('idle')) return T(lang, 'অপেক্ষায়', 'Idle');
  if (s.includes('stopped')) return T(lang, 'থেমে আছে', 'Stopped');
  return status;
}

function stoppageStatusDot(status?: string): string {
  if (!status) return '#9ca3af';
  const s = status.toLowerCase();
  if (s === 'passed') return '#10b981';
  if (s === 'next') return '#3b82f6';
  return '#d1d5db';
}

export function DTCABusDetailPage(props: Props) {
  const { theme, device, lang, params } = props;
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';

  const identifier = params?.identifier ?? '';
  const initialVrn = params?.vrn ?? '';

  const [liveData, setLiveData] = useState<DtcaLiveLocationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);

  const card = (p = 16): React.CSSProperties => ({
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 16,
    padding: p,
    marginBottom: 14,
  });

  const fetchData = async () => {
    if (!identifier) return;
    try {
      const data = await getDtcaLiveLocation(identifier);
      setLiveData(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    const timer = setInterval(() => { void fetchData(); }, POLL_MS);
    return () => clearInterval(timer);
  }, [identifier]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView(DHAKA_CENTER, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OSM',
    }).addTo(map);

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 300);

    return () => {
      map.remove();
      mapRef.current = null;
      busMarkerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const lat = liveData?.vehicle?.lat;
    const lng = liveData?.vehicle?.lng;
    if (!map || !lat || !lng) return;

    const latLng: [number, number] = [lat, lng];
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
      map.setView(latLng, 15);
    }
  }, [liveData]);

  const vrn = liveData?.vehicle?.v_vrn || initialVrn || identifier;
  const routeName = liveData?.route_plan?.name ?? '';
  const fromStop = liveData?.route_plan?.from_stoppage_name ?? '';
  const toStop = liveData?.route_plan?.to_stoppage_name ?? '';
  const deviceStatus = liveData?.vehicle?.device_status;
  const speed = liveData?.vehicle?.speed ?? liveData?.vehicle?.speed_status ?? 0;
  const nearbyLoc = liveData?.vehicle?.nearby_l_name ?? '';
  const nextStop = liveData?.next_stoppage?.name ?? '';
  const etaMins = liveData?.next_stoppage?.eta_minutes;
  const distKm = liveData?.next_stoppage?.distance_km ?? liveData?.next_stoppage?.distance;
  const remaining = liveData?.remaining_stoppages_count;
  const stoppages = liveData?.stoppages ?? [];
  const customerName = liveData?.vehicle?.customer_name ?? 'Dhaka Transport Coordination Authority';

  return (
    <PageShell {...props}>
      <div style={{ padding: isMobile ? '0 0 80px' : '0 0 48px' }}>
        <div style={{ padding: isMobile ? '0 16px' : '0 40px', paddingTop: 16 }}>

          {loading && !liveData && (
            <div style={{ ...card(), display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: tk.line }} />
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
              <button
                onClick={() => { setLoading(true); void fetchData(); }}
                style={{ background: tk.primarySoft, color: tk.primary, border: `1px solid ${tk.primary}`, borderRadius: 8, padding: '6px 16px', fontFamily: SANS, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
              >
                {T(lang, 'আবার চেষ্টা', 'Retry')}
              </button>
            </div>
          )}

          {/* Header card */}
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
                <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, color: tk.text, marginBottom: 3 }}>
                  {vrn}
                </div>
                {routeName ? (
                  <div style={{ fontFamily: BEN, fontSize: 13, color: tk.textDim, marginBottom: 4 }}>
                    {routeName}{fromStop && toStop ? ` · ${fromStop} → ${toStop}` : ''}
                  </div>
                ) : null}
                <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>{customerName}</div>
              </div>
              {deviceStatus ? (
                <div style={{ background: `${statusColor(deviceStatus)}22`, color: statusColor(deviceStatus), borderRadius: 8, padding: '4px 10px', fontFamily: SANS, fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                  {statusLabel(deviceStatus, lang)}
                </div>
              ) : null}
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 14 }}>
              {[
                { label: T(lang, 'গতি', 'Speed'), value: `${N(speed, lang)} ${T(lang, 'কিমি/ঘ', 'km/h')}`, color: '#10b981' },
                { label: T(lang, 'পরবর্তী স্টপ', 'Next stop'), value: nextStop || T(lang, '—', '—'), color: tk.primary },
                { label: T(lang, 'ETA', 'ETA'), value: etaMins != null ? `${N(etaMins, lang)} ${T(lang, 'মিনিট', 'min')}` : T(lang, '—', '—'), color: '#f59e0b' },
                { label: T(lang, 'দূরত্ব', 'Distance'), value: distKm != null ? `${N(distKm, lang)} ${T(lang, 'কিমি', 'km')}` : T(lang, '—', '—'), color: tk.textDim },
              ].map((stat, i) => (
                <div key={i} style={{ background: tk.panelMuted, borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: stat.color, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {nearbyLoc ? (
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint }}>📍</span>
                <span style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim }}>{nearbyLoc}</span>
                {remaining != null ? (
                  <span style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 11, color: tk.primary, fontWeight: 700 }}>
                    {N(remaining, lang)} {T(lang, 'স্টপ বাকি', 'stops left')}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Leaflet Map */}
          <div style={{ ...card(0), overflow: 'hidden', height: 300 }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Journey progress */}
          {stoppages.length > 0 && (
            <div style={card()}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 12 }}>
                {T(lang, 'যাত্রাপথ', 'Journey progress')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {stoppages.map((stop, idx) => {
                  const isNext = stop.status?.toLowerCase() === 'next';
                  const isPassed = stop.status?.toLowerCase() === 'passed';
                  const dotColor = stoppageStatusDot(stop.status);
                  return (
                    <div key={idx} style={{ display: 'flex', gap: 14, paddingBottom: idx < stoppages.length - 1 ? 0 : 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, flexShrink: 0 }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: 999, background: dotColor,
                          border: `2px solid ${tk.bg}`, flexShrink: 0, marginTop: 4,
                          boxShadow: isNext ? `0 0 0 3px ${dotColor}44` : 'none',
                        }} />
                        {idx < stoppages.length - 1 && (
                          <div style={{ width: 2, flex: 1, background: `${dotColor}44`, minHeight: 16, marginTop: 2 }} />
                        )}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: BEN, fontWeight: isNext ? 700 : 500, fontSize: 13, color: isNext ? tk.primary : isPassed ? tk.textFaint : tk.text }}>
                            {stop.name ?? `Stop ${(stop.sequence ?? idx + 1)}`}
                          </span>
                          {isNext && (
                            <span style={{ background: `${tk.primary}22`, color: tk.primary, borderRadius: 6, padding: '1px 7px', fontFamily: SANS, fontWeight: 700, fontSize: 10 }}>
                              {T(lang, 'পরবর্তী', 'Next')}
                            </span>
                          )}
                          {isPassed && (
                            <span style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint }}>✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Open official link */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <a
              href={`${OFFICIAL_URL}${encodeURIComponent(identifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: `linear-gradient(135deg,#006a4e,#10b981)`, color: '#fff', borderRadius: 12, padding: '12px 16px', fontFamily: SANS, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
            >
              {T(lang, 'অফিসিয়াল ট্র্যাকারে দেখুন', 'View on official tracker')} ↗
            </a>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
