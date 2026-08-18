import React from 'react';
import { T, SANS, BEN, Tokens, Lang } from '../tokens';
import { BUS_DATA } from '../../../constants';

interface Props {
  tk: Tokens;
  lang: Lang;
  onBusClick: (busId: string) => void;
}

const CHAKA_BUS_IDS = new Set(['dhakar_chaka_1', 'dhakar_chaka_2', 'gulshan_chaka']);

/**
 * Static ঢাকার চাকা / গুলশান চাকা route list, shown under the live-bus
 * section for operator searches. The live feed (when upstream is healthy)
 * shows the actual numbered buses; this list guarantees the user still sees
 * every known Dhaka Chaka route when the live feed is down (upstream 403).
 * Labeled স্ট্যাটিক so it can't be mistaken for live data.
 */
export function ChakaStaticRoutes({ tk, lang, onBusClick }: Props) {
  const routes = BUS_DATA.filter(r => CHAKA_BUS_IDS.has(r.id) && r.active !== false);
  if (!routes.length) return null;

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
    </div>
  );
}
