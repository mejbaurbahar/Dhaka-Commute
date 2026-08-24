import React, { useState } from 'react';
import { SANS, BEN, T, N, Fare, Tokens, Lang } from '../tokens';
import { NativeAdCard } from './AdSlot';
import { TransitJourneyMap } from './TransitJourneyMap';
import {
  sortJourneys,
  formatDurMin,
  MODE_ICONS,
  TRANSFER_WAIT_MIN,
  type TransitSearchResult,
  type TransitSortKey,
  type Journey,
  type JourneyLeg,
} from '../../../services/intercityTransitService';

interface Props {
  result: TransitSearchResult | null;
  sort: TransitSortKey;
  onSort: (k: TransitSortKey) => void;
  tk: Tokens;
  lang: Lang;
  isMobile: boolean;
  /** Journey to auto-expand + scroll into view (deep-link from AI chat cards). */
  focusJourneyId?: string;
}

const SORT_KEYS: { key: TransitSortKey; en: string; bn: string }[] = [
  { key: 'recommended', en: 'Recommended', bn: 'সেরা বিকল্প' },
  { key: 'fastest', en: 'Fastest', bn: 'দ্রুততম' },
  { key: 'direct', en: 'Direct', bn: 'সরাসরি' },
  { key: 'cheapest', en: 'Cheapest', bn: 'সস্তা' },
  { key: 'fewest', en: 'Fewest transfers', bn: 'সবচেয়ে কম বদল' },
];

const SECTION_TITLES: { transfers: number; en: string; bn: string }[] = [
  { transfers: 0, en: 'Direct', bn: 'সরাসরি' },
  { transfers: 1, en: '1 Transfer', bn: '১টি বদল' },
  { transfers: 2, en: '2 Transfers', bn: '২টি বদল' },
];

function LegRow({ leg, tk, lang, last }: { leg: JourneyLeg; tk: Tokens; lang: Lang; last: boolean }) {
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  return (
    <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: last ? 'none' : `1px dashed ${tk.line}` }}>
      <div style={{ fontSize: 18, width: 26, textAlign: 'center', flexShrink: 0 }}>{MODE_ICONS[leg.mode]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: tk.text }}>{lbl(leg.nameEn, leg.nameBn)}</span>
          {leg.estimated && (
            <span style={{
              fontFamily: SANS, fontSize: 9, fontWeight: 700, letterSpacing: 0.3,
              color: '#b45309', background: '#fef3c7', borderRadius: 4, padding: '1px 5px',
            }}>
              {lbl('Estimated', 'আনুমানিক')}
            </span>
          )}
        </div>
        <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, color: tk.textDim, marginTop: 2 }}>
          {lbl(leg.fromLabelEn, leg.fromLabelBn)} → {lbl(leg.toLabelEn, leg.toLabelBn)}
        </div>
        {(leg.dep || leg.arr) && (
          <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginTop: 1 }}>
            {leg.dep && <span>{leg.dep} → {leg.arr}</span>}
          </div>
        )}
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: tk.text }}>{formatDurMin(leg.durationMin, lang)}</div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textDim }}>{Fare(leg.fare, lang)}</div>
      </div>
    </div>
  );
}

function JourneyCard({ j, tk, lang, isBest, open, onToggle, elId }: { j: Journey; tk: Tokens; lang: Lang; isBest: boolean; open: boolean; onToggle: () => void; elId?: string }) {
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  const fromLabel = j.legs[0].fromLabelEn;
  const toLabel = j.legs[j.legs.length - 1].toLabelEn;
  const fromLabelBn = j.legs[0].fromLabelBn;
  const toLabelBn = j.legs[j.legs.length - 1].toLabelBn;
  return (
    <div id={elId} style={{
      background: tk.panel, border: `1px solid ${isBest ? tk.primary : tk.line}`,
      borderRadius: 14, padding: '12px 14px', boxShadow: isBest ? `0 0 0 1px ${tk.primary}22, ${tk.shadow}` : tk.shadow,
    }}>
      <div
        onClick={onToggle}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          {j.legs.map((l, i) => (
            <span key={i} style={{ fontSize: 15 }}>{MODE_ICONS[l.mode]}</span>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 13, fontWeight: 700, color: tk.text }}>
              {lbl(fromLabel, fromLabelBn)} → {lbl(toLabel, toLabelBn)}
            </span>
            {isBest && (
              <span style={{
                fontFamily: SANS, fontSize: 9, fontWeight: 800, letterSpacing: 0.4,
                background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#fff',
                borderRadius: 999, padding: '2px 8px',
              }}>
                ⭐ {lbl('Recommended', 'সেরা বিকল্প')}
              </span>
            )}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginTop: 1 }}>
            {j.transfers > 0 ? `${lbl('Transfers', 'বদল')}: ${N(j.transfers, lang)}` : lbl('Direct', 'সরাসরি')}
            {j.legs.some(l => l.estimated) ? ` · ${lbl('Some fares estimated', 'কিছু ভাড়া আনুমানিক')}` : ''}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 800, color: tk.primary }}>{formatDurMin(j.totalMin, lang)}</div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textDim }}>{Fare(j.totalFare, lang)}</div>
        </div>
        <div style={{ color: tk.textFaint, fontSize: 12, flexShrink: 0 }}>{open ? '▴' : '▾'}</div>
      </div>

      {open && (
        <div style={{ marginTop: 8 }}>
          {j.legs.map((leg, i) => (
            <React.Fragment key={i}>
              <LegRow leg={leg} tk={tk} lang={lang} last={i === j.legs.length - 1} />
              {i < j.legs.length - 1 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 0 2px', fontFamily: SANS, fontSize: 11, color: tk.textDim,
                }}>
                  <span>🔀</span>
                  <span>
                    {lbl('Transfer at', 'বদল')} {lbl(leg.toLabelEn, leg.toLabelBn)} · {lbl('Wait', 'অপেক্ষা')} ~{formatDurMin(TRANSFER_WAIT_MIN, lang)}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
          {/* Full journey map: start → transfers → destination */}
          <TransitJourneyMap journey={j} tk={tk} lang={lang} />
        </div>
      )}
    </div>
  );
}

export function TransitJourneyList({ result, sort, onSort, tk, lang, isMobile, focusJourneyId }: Props) {
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  // Single-open accordion: only one journey expanded at a time
  const [openId, setOpenId] = useState<string | null>(null);

  // Deep-link from AI chat: auto-expand the specific journey and scroll to it.
  React.useEffect(() => {
    if (!focusJourneyId || !result || result.kind === 'notfound' || result.kind === 'same') return;
    if (!result.journeys.some(j => j.id === focusJourneyId)) return;
    setOpenId(focusJourneyId);
    const el = document.getElementById(`journey-${focusJourneyId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusJourneyId, result]);

  // ── States ─────────────────────────────────────────────────────────────────
  if (!result || result.kind === 'notfound') {
    const q = result && result.kind === 'notfound' ? result.query : '';
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px', color: tk.textFaint, fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 14 }}>
        {result ? (
          <>
            <div>{lbl('Could not find district', 'জেলা খুঁজে পাওয়া যায়নি')}: <b style={{ color: tk.text }}>{q}</b></div>
            <div style={{ marginTop: 6, fontSize: 12 }}>{lbl('Try another district or use Bus/Train/Flight/Launch tabs', 'অন্য জেলা চেষ্টা করুন বা বাস/ট্রেন/ফ্লাইট/লঞ্চ ট্যাব ব্যবহার করুন')}</div>
          </>
        ) : null}
      </div>
    );
  }
  if (result.kind === 'same') {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px', color: tk.textFaint, fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 14 }}>
        {lbl('Same origin and destination', 'উৎস ও গন্তব্য একই')}
      </div>
    );
  }
  if (result.journeys.length === 0) {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '32px 16px', color: tk.textFaint, fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 14 }}>
          {lbl('No transit routes found. Try different locations.', 'কোনো ট্রানজিট রুট পাওয়া যায়নি।')}
        </div>
        <NativeAdCard
          tk={tk}
          lang={lang}
          kind="in-article"
          title={lbl('Alternative options', 'বিকল্প অপশন')}
          subtitle={lbl('Explore other travel routes', 'অন্যান্য ভ্রমণ রুট দেখুন')}
          icon="🔀"
        />
      </>
    );
  }

  const sorted = sortJourneys(result.journeys, sort);
  const bestScore = Math.min(...result.journeys.map(j => j.score));
  const bestId = result.journeys.find(j => j.score === bestScore)?.id;

  return (
    <div>
      {/* Sort pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {SORT_KEYS.map(s => (
          <button
            key={s.key}
            onClick={() => onSort(s.key)}
            style={{
              background: sort === s.key ? tk.primarySoft : tk.panelMuted,
              border: `1px solid ${sort === s.key ? tk.primary : tk.line}`,
              borderRadius: 999, padding: '5px 12px', cursor: 'pointer',
              fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: 500,
              color: sort === s.key ? tk.primary : tk.textDim,
              transition: 'all 0.15s ease',
            }}
          >
            {lbl(s.en, s.bn)}
          </button>
        ))}
      </div>

      {/* Sections: DIRECT → 1 TRANSFER → 2 TRANSFERS */}
      {SECTION_TITLES.map(sec => {
        const items = sorted.filter(j => j.transfers === sec.transfers);
        if (!items.length) return null;
        return (
          <div key={sec.transfers} style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: tk.textFaint, marginBottom: 10 }}>
              {sec.transfers === 0 ? '🟢' : '🔀'} {lbl(sec.en, sec.bn)} · {N(items.length, lang)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map(j => (
                <JourneyCard
                  key={j.id}
                  j={j}
                  tk={tk}
                  lang={lang}
                  isBest={j.id === bestId}
                  open={openId === j.id}
                  onToggle={() => setOpenId(openId === j.id ? null : j.id)}
                  elId={`journey-${j.id}`}
                />
              ))}
            </div>
          </div>
        );
      })}
      {isMobile && <div style={{ height: 8 }} />}
    </div>
  );
}
