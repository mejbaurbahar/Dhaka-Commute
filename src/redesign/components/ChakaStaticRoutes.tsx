import React from 'react';
import { T, SANS, BEN, N, Tokens, Lang } from '../tokens';
import { BUS_DATA } from '../../../constants';
import { CHAKA_BUS_SNAPSHOT, CHAKA_ROUTE_PLANS } from '../../../data/chakaBuses';

interface Props {
  tk: Tokens;
  lang: Lang;
  onBusClick: (busId: string) => void;
  onDtcaBusClick?: (identifier: string, vrn: string) => void;
}

const CHAKA_BUS_IDS = new Set(['dhakar_chaka_1', 'dhakar_chaka_2', 'gulshan_chaka']);

function busStatusColor(b: (typeof CHAKA_BUS_SNAPSHOT.buses)[number]): string {
  if (b.speedKmh > 0) return '#10b981';
  if (b.engineOn) return '#f59e0b';
  return '#9ca3af';
}

/**
 * Static ঢাকার চাকা / গুলশান চাকা route list, shown under the live-bus
 * section for operator searches. The live feed (when upstream is healthy)
 * shows the actual numbered buses; this list guarantees the user still sees
 * every known Dhaka Chaka route when the live feed is down (upstream 403).
 * The numbered fleet is a labeled snapshot (`CHAKA_BUS_SNAPSHOT`), not live —
 * labeled স্ট্যাটিক so it can't be mistaken for live data.
 */
export function ChakaStaticRoutes({ tk, lang, onBusClick, onDtcaBusClick }: Props) {
  const routes = BUS_DATA.filter(r => CHAKA_BUS_IDS.has(r.id) && r.active !== false);
  if (!routes.length && !CHAKA_BUS_SNAPSHOT.buses.length) return null;

  return (
    <div
      style={{
        background: tk.panel,
        border: `1px solid ${tk.line}`,
        borderRadius: 16,
        padding: 16,
        marginTop: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 14 }}>🚌</span>
        <span style={{ fontFamily: BEN, fontWeight: 700, fontSize: 14, color: tk.text }}>
          {T(lang, 'ঢাকার চাকা রুটসমূহ', 'Dhaka Chaka Routes')}
        </span>
      </div>
      <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginBottom: 10 }}>
        {T(
          lang,
          'স্ট্যাটিক রুট — লাইভ তথ্য পাওয়া না গেলে এই রুটগুলোই চলাচল করে',
          'Static routes — these run even when live tracking is unavailable',
        )}
      </div>
      {routes.map((r, i) => (
        <button
          key={r.id}
          onClick={() => onBusClick(r.id)}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            borderTop: i ? `1px dashed ${tk.line}` : 'none',
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            textAlign: 'left' as const,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${tk.primary}, ${tk.primaryDeep})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 800,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, fontWeight: 600, color: tk.text }}>
              {lang === 'bn' ? r.bnName : r.name}
            </div>
            <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, color: tk.textDim }}>
              {r.routeString}
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <span style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 6, padding: '3px 8px' }}>
              {r.type} · {r.hours}
            </span>
          </div>
        </button>
      ))}

      {CHAKA_BUS_SNAPSHOT.buses.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 4 }}>
            <span style={{ fontSize: 14 }}>🚌</span>
            <span style={{ fontFamily: BEN, fontWeight: 700, fontSize: 14, color: tk.text }}>
              {T(lang, 'ঢাকার চাকা নম্বর বাস তালিকা', 'Dhaka Chaka Numbered Buses')}
            </span>
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginBottom: 6 }}>
            {T(lang, CHAKA_BUS_SNAPSHOT.capturedAtLabel.bn, CHAKA_BUS_SNAPSHOT.capturedAtLabel.en)}
            {' · '}
            {T(lang, 'লাইভ নয় — ডিটিসিএ স্ন্যাপশট', 'Not live — DTCA snapshot')}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginBottom: 8 }}>
            {T(lang, `${N(CHAKA_BUS_SNAPSHOT.buses.length, lang)}টি নম্বর বাস — চালু থাকা সবগুলো ঢাকার চাকা বাস`, `${N(CHAKA_BUS_SNAPSHOT.buses.length, lang)} numbered buses — all active Dhaka Chaka fleet`)}
          </div>
          {CHAKA_ROUTE_PLANS.map((plan) => {
            const planBuses = CHAKA_BUS_SNAPSHOT.buses.filter(b => b.routeId === plan.routeId);
            if (!planBuses.length) return null;
            const routeLine = plan.stops.map(s => s.name).join(' → ');
            return (
              <div key={plan.routeId} style={{ marginTop: 8 }}>
                <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontWeight: 700, fontSize: 13, color: tk.text }}>
                  🚏 {plan.name}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textDim, marginTop: 2 }}>
                  {routeLine}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginTop: 1 }}>
                  {T(lang, `${N(plan.stops.length, lang)}টি স্টপ · ${N(plan.totalDistanceKm, lang)} কিমি · ${N(planBuses.length, lang)}টি বাস`, `${N(plan.stops.length, lang)} stops · ${N(plan.totalDistanceKm, lang)} km · ${N(planBuses.length, lang)} buses`)}
                </div>
                {planBuses.map((bus, i) => {
                  const col = busStatusColor(bus);
                  return (
                    <button
                      key={bus.id}
                      onClick={() => onDtcaBusClick?.(bus.id, bus.vrn)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        borderTop: i ? `1px dashed ${tk.line}` : 'none',
                        padding: '8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: onDtcaBusClick ? 'pointer' : 'default',
                        textAlign: 'left' as const,
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: 999, background: col, boxShadow: `0 0 0 3px ${col}22`, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: tk.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {bus.vrn}
                        </div>
                        {bus.landmark ? (
                          <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>
                            📍 {bus.landmark}
                          </div>
                        ) : null}
                      </div>
                      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: col, flexShrink: 0 }}>
                        {N(bus.speedKmh, lang)} {T(lang, 'কিমি/ঘ', 'km/h')}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
