import React, { useState } from 'react';
import { SANS, BEN, T, N, Fare, Tokens, Lang } from '../tokens';
import { formatDurMin } from '../../../services/intercityTransitService';
import type { TransportCardData } from '../../../types';

interface Props {
  card: TransportCardData;
  tk: Tokens;
  lang: Lang;
  onNav: (r: string, params?: Record<string, string>) => void;
}

const MODE_ICONS: Record<string, string> = { bus: '🚌', train: '🚆', flight: '✈️', launch: '⛴️', metro: '🚇' };

function isIntercity(card: TransportCardData): boolean {
  return card.kind === 'transit' && (
    // Intercity cards always carry a graph journeyId — even a direct-bus
    // journey (Dhaka → Benapole bus) must deep-link to the intercity Transit
    // view, never the local-bus results screen.
    card.journeyId !== undefined ||
    card.legs.some(l => l.mode !== 'bus' && l.mode !== 'metro')
  );
}

/**
 * AI chat transport result card — data comes from real transport engines
 * (never the LLM). Collapsed row shows from → to, duration, fare and transfer
 * count; expanded body shows each leg; buttons deep-link into the app.
 */
export function TransportResultCard({ card, tk, lang, onNav }: Props) {
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  const [open, setOpen] = useState(false);
  const intercity = isIntercity(card);

  const from = card.from;
  const to = card.to;
  const durationMin = card.kind === 'bus' ? card.durationMin : card.totalMin;
  const fare = card.kind === 'bus' ? card.fare : card.totalFare;
  const transfers = card.transfers;
  const titleEn = card.kind === 'bus' ? card.nameEn : `${from} → ${to}`;
  const titleBn = card.kind === 'bus' ? card.nameBn : `${from} → ${to}`;
  const legModeIcons = card.kind === 'transit'
    ? card.legs.map(l => MODE_ICONS[l.mode] ?? '🚌').join('')
    : '🚌';

  return (
    <div style={{
      background: tk.panel,
      border: `1px solid ${tk.line}`,
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: tk.shadow,
    }}>
      {/* Collapsed row */}
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px' }}
      >
        <div style={{ fontSize: 16, flexShrink: 0 }}>{legModeIcons}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, fontWeight: 700, color: tk.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {lbl(titleEn, titleBn)}
            </span>
            {card.kind === 'transit' && card.badge === 'fastest' && (
              <span style={{ fontFamily: SANS, fontSize: 8, fontWeight: 800, color: '#047857', background: '#d1fae5', borderRadius: 4, padding: '1px 5px', flexShrink: 0 }}>
                ⚡ {lbl('FASTEST', 'দ্রুততম')}
              </span>
            )}
            {card.kind === 'transit' && card.badge === 'cheapest' && (
              <span style={{ fontFamily: SANS, fontSize: 8, fontWeight: 800, color: '#b45309', background: '#fef3c7', borderRadius: 4, padding: '1px 5px', flexShrink: 0 }}>
                💰 {lbl('CHEAPEST', 'সস্তা')}
              </span>
            )}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginTop: 1 }}>
            {transfers > 0 ? `${lbl('Transfers', 'বদল')}: ${N(transfers, lang)}` : lbl('Direct', 'সরাসরি')}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, color: tk.primary }}>{formatDurMin(durationMin, lang)}</div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textDim }}>{Fare(fare, lang)}</div>
        </div>
        <div style={{ color: tk.textFaint, fontSize: 11, flexShrink: 0 }}>{open ? '▴' : '▾'}</div>
      </div>

      {/* Expanded legs */}
      {open && card.kind === 'transit' && (
        <div style={{ padding: '0 13px 10px', borderTop: `1px dashed ${tk.line}` }}>
          {card.legs.map((leg, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0 2px', fontFamily: SANS, fontSize: 10, color: tk.textDim }}>
                  <span>🔀</span>
                  <span>{lbl('Transfer at', 'বদল')} {leg.from}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: i === card.legs.length - 1 ? 'none' : `1px dashed ${tk.line}` }}>
                <div style={{ fontSize: 14, width: 22, textAlign: 'center', flexShrink: 0 }}>{MODE_ICONS[leg.mode] ?? '🚌'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: tk.text }}>{lbl(leg.nameEn, leg.nameBn)}</span>
                    {leg.estimated && (
                      <span style={{ fontFamily: SANS, fontSize: 8, fontWeight: 700, color: '#b45309', background: '#fef3c7', borderRadius: 4, padding: '1px 4px' }}>
                        {lbl('Estimated', 'আনুমানিক')}
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 11, color: tk.textDim, marginTop: 1 }}>{leg.from} → {leg.to}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: tk.text }}>{formatDurMin(leg.durationMin, lang)}</div>
                  <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textDim }}>{Fare(leg.fare, lang)}</div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, padding: '9px 13px 11px', borderTop: `1px solid ${tk.line}` }}>
        <button
          onClick={() => {
            if (card.kind === 'bus') onNav('bus-detail', { busId: card.busId, from: card.from, to: card.to });
            else if (intercity && card.kind === 'transit') onNav('intercity', { from: card.from, to: card.to, chip: 'Transit', journeyId: card.journeyId });
            else onNav('results', { from: card.from, to: card.to });
          }}
          style={{
            flex: 1, background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 999,
            padding: '7px 10px', cursor: 'pointer', fontFamily: lang === 'bn' ? BEN : SANS,
            fontSize: 11, fontWeight: 700, color: tk.textDim,
          }}
        >
          🗺 {lbl('View Route', 'রুট দেখুন')}
        </button>
        <button
          onClick={() => {
            if (intercity && card.kind === 'transit') onNav('intercity', { from: card.from, to: card.to, chip: 'Transit', journeyId: card.journeyId });
            else onNav('results', { from: card.from, to: card.to });
          }}
          style={{
            flex: 1, background: `linear-gradient(135deg,${tk.primary},${tk.accent})`, border: 0, borderRadius: 999,
            padding: '7px 10px', cursor: 'pointer', fontFamily: lang === 'bn' ? BEN : SANS,
            fontSize: 11, fontWeight: 700, color: '#fff',
          }}
        >
          {lbl('Use This', 'এই রুট ব্যবহার করুন')}
        </button>
      </div>
    </div>
  );
}
