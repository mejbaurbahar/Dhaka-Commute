import React, { useEffect, useState, useCallback, useRef } from 'react';
import type { Lang } from '../tokens';
import { T, SANS, BEN, N } from '../tokens';
import { getDtcaAllVehicleLocationCached, DtcaVehicleLocation } from '../../../services/dtcaTrackerService';

interface Props {
  tk: any;
  lang: Lang;
  onBusClick: (identifier: string, vrn: string) => void;
}

type State = 'loading' | 'loaded' | 'error' | 'stopped';

function busStatusColor(path: DtcaVehicleLocation['path']): string {
  const p = path?.[0];
  if (!p) return '#9ca3af';
  if (p.engine_status && p.speed_status > 0) return '#10b981';
  if (p.engine_status) return '#f59e0b';
  return '#9ca3af';
}

export function DTCABusListSection({ tk, lang, onBusClick }: Props) {
  const [buses, setBuses] = useState<DtcaVehicleLocation[]>([]);
  const [state, setState] = useState<State>('loading');
  // DTCA upstream returns 403 with an empty body when its token is stale —
  // stop auto-polling after 2 consecutive failures instead of hammering it
  // forever. Manual Retry (and any later success) re-arms polling.
  const failCountRef = useRef(0);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const res = await getDtcaAllVehicleLocationCached();
      failCountRef.current = 0;
      setBuses(res.vehicles ?? []);
      setState('loaded');
    } catch {
      failCountRef.current += 1;
      setState(failCountRef.current >= 2 ? 'stopped' : 'error');
    }
  }, []);

  useEffect(() => {
    void load();
    // Skip polls while the tab is hidden (background tabs waste requests/CPU),
    // and stop entirely after persistent upstream failures.
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible' && failCountRef.current < 2) void load();
    }, 30_000);
    return () => clearInterval(interval);
  }, [load]);

  const card: React.CSSProperties = {
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 16,
    padding: 16,
  };

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#10b981', flexShrink: 0 }} className="kj-anim-pulse" />
        <span style={{ fontFamily: BEN, fontWeight: 700, fontSize: 14, color: tk.text, flex: 1 }}>
          {T(lang, 'ঢাকা চাকা · লাইভ বাস', 'Dhaka Chaka · Live Buses')}
        </span>
      </div>

      {state === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: tk.line, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 12, borderRadius: 6, background: tk.line, width: '60%', marginBottom: 4 }} />
                <div style={{ height: 10, borderRadius: 6, background: tk.line, width: '40%' }} />
              </div>
              <div style={{ width: 36, height: 12, borderRadius: 6, background: tk.line }} />
            </div>
          ))}
        </div>
      )}

      {state === 'error' && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <button
            onClick={() => void load()}
            style={{ background: tk.primarySoft, color: tk.primary, border: `1px solid ${tk.primary}`, borderRadius: 8, padding: '5px 12px', fontFamily: SANS, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
          >
            {T(lang, 'আবার চেষ্টা করুন', 'Retry')}
          </button>
        </div>
      )}

      {state === 'stopped' && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim, marginBottom: 8 }}>
            {T(lang, 'লাইভ তথ্য সাময়িকভাবে পাওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।', 'Live data is temporarily unavailable. Try again later.')}
          </div>
          <button
            onClick={() => void load()}
            style={{ background: tk.primarySoft, color: tk.primary, border: `1px solid ${tk.primary}`, borderRadius: 8, padding: '5px 12px', fontFamily: SANS, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
          >
            {T(lang, 'আবার চেষ্টা করুন', 'Retry')}
          </button>
        </div>
      )}

      {state === 'loaded' && buses.length === 0 && (
        <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textFaint, padding: '8px 0', textAlign: 'center' }}>
          {T(lang, 'কোনো বাস পাওয়া যায়নি', 'No buses found')}
        </div>
      )}

      {state === 'loaded' && buses.map((bus, i) => {
        const col = busStatusColor(bus.path);
        const p = bus.path?.[0];
        const speed = p?.speed_status ?? 0;
        const loc = p?.nearby_l_name ?? '';
        const statusLabel = p?.engine_status && p.speed_status > 0
          ? T(lang, 'চলমান', 'Moving')
          : p?.engine_status ? T(lang, 'ইঞ্জিন চালু', 'Engine on') : T(lang, 'বন্ধ', 'Stopped');
        return (
          <div
            key={bus.id ?? i}
            onClick={() => onBusClick(bus.v_identifier, bus.v_vrn)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i ? `1px dashed ${tk.line}` : '', cursor: 'pointer' }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: col, boxShadow: `0 0 0 4px ${col}22`, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 12, color: tk.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {bus.v_vrn || bus.v_identifier}
                </span>
                <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: col, background: `${col}1a`, borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {statusLabel}
                </span>
              </div>
              {loc ? (
                <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 3 }}>
                  📍 {loc}
                </div>
              ) : null}
            </div>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 11, color: col, background: `${col}14`, borderRadius: 8, padding: '4px 8px', whiteSpace: 'nowrap' }}>
                {N(speed, lang)} {T(lang, 'কিমি/ঘ', 'km/h')}
              </span>
              <span style={{ color: tk.textFaint, fontSize: 16 }}>›</span>
            </div>
          </div>
        );
      })}

      {state === 'loaded' && buses.length > 0 && (
        <button
          onClick={() => void load()}
          style={{ marginTop: 10, width: '100%', background: 'transparent', border: `1px solid ${tk.line}`, borderRadius: 10, padding: 8, fontFamily: SANS, fontSize: 12, fontWeight: 700, color: tk.text, cursor: 'pointer' }}
        >
          {T(lang, 'আপডেট করুন', 'Refresh')} ↻
        </button>
      )}
    </div>
  );
}
