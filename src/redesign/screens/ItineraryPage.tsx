import React, { useEffect, useMemo, useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, chipBtn } from '../tokens';
import { PageShell, PageShellProps } from './PageShell';
import { DestinationCard } from '../components/DestinationCard';
import { ALL_PLACES } from '../../../data/bangladeshPlaces';
import {
  generateItinerary, buildCustomItinerary, itineraryVariants, enrichItinerary, itineraryToText,
  Itinerary, LegOption,
} from '../../../services/itineraryEngine';
import { trackItineraryGenerate } from '../../../services/analyticsService';
import { useDocumentTitle, setCanonicalUrl } from '../utils/useDocumentTitle';

type Props = Omit<PageShellProps, 'children'> & { params?: Record<string, string> };

const DAY_OPTIONS = [1, 2, 3, 4, 5, 7];
const MODE_ICON: Record<string, string> = { bus: '🚌', train: '🚆', flight: '✈️', launch: '⛴️' };

function fmtDur(min: number, lang: Lang): string {
  if (min >= 60) return T(lang, `${Math.floor(min / 60)}ঘ ${min % 60}মি`, `${Math.floor(min / 60)}h ${min % 60}m`);
  return `${min}m`;
}

const F = (n: number) => `৳${n.toLocaleString('en-US')}`;

function LegOptionRow({ o, tk, lang }: { o: LegOption; tk: Tokens; lang: Lang }) {
  const font = lang === 'bn' ? BEN : SANS;
  return (
    <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 12, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 15 }}>{MODE_ICON[o.mode] ?? '🚌'}</span>
        <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: tk.text, margin: 0, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {lang === 'bn' ? o.labelBn : o.labelEn}
        </p>
        <span style={{ fontFamily: SANS, fontSize: 12, color: tk.textFaint, whiteSpace: 'nowrap' }}>
          {fmtDur(o.durationMin, lang)}{o.depTime ? ` · ${o.depTime}` : ''}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: tk.primary, whiteSpace: 'nowrap' }}>
          {lang === 'bn' ? o.fareLabelBn : o.fareLabelEn}
        </span>
      </div>
      {o.boardingEn && (
        <p style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, margin: '4px 0 0 23px' }}>
          {lang === 'bn' ? o.boardingBn ?? o.boardingEn : o.boardingEn}
        </p>
      )}
    </div>
  );
}

export function ItineraryPage({ theme, lang, ...rest }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const font = lang === 'bn' ? BEN : SANS;
  const [days, setDays] = useState(5);
  const [variantId, setVariantId] = useState<string | undefined>();
  const [mode, setMode] = useState<'template' | 'custom'>('template');
  const [selected, setSelected] = useState<string[]>([]);
  const [placeQuery, setPlaceQuery] = useState('');
  const [openDistrict, setOpenDistrict] = useState<string | null>(null);
  const [tipsLoading, setTipsLoading] = useState(false);
  const [tips, setTips] = useState<{ tipsEn: string[]; tipsBn: string[] } | null>(null);
  const [copied, setCopied] = useState(false);

  useDocumentTitle(T(lang, 'ভ্রমণ পরিকল্পনা', 'Itinerary Planner'));
  setCanonicalUrl('/itinerary');

  const variants = useMemo(() => itineraryVariants(days), [days]);

  // All districts that have places in our data (click one to expand its places).
  const districts = useMemo(() => {
    const set = new Set<string>();
    for (const p of ALL_PLACES) {
      if (p.type === 'airport') continue;
      const d = (p.district ?? '').split('/')[0];
      if (d) set.add(d);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const districtPlaces = (d: string) => ALL_PLACES.filter(p => p.type !== 'airport' && (p.district ?? '').split('/')[0] === d);
  const districtSelectedCount = (d: string) => districtPlaces(d).filter(p => selected.includes(p.id)).length;

  const toggleDistrict = (d: string) => {
    setOpenDistrict(prev => prev === d ? null : d);
  };

  const addAllDistrict = (d: string) => {
    const ids = districtPlaces(d).map(p => p.id);
    const allOn = ids.every(id => selected.includes(id));
    setSelected(prev => allOn ? prev.filter(id => !ids.includes(id)) : [...prev, ...ids.filter(id => !prev.includes(id))]);
    setTips(null);
  };

  const placeMatches = useMemo(() => {
    const q = placeQuery.trim().toLowerCase();
    const list = q
      ? ALL_PLACES.filter(p =>
          p.type !== 'airport' && (p.en.toLowerCase().includes(q) || (p.bn ?? '').includes(q) ||
            (p.district ?? '').toLowerCase().includes(q)))
      : ALL_PLACES.filter(p => p.type !== 'airport').slice(0, 12);
    return list.slice(0, 10);
  }, [placeQuery]);

  const togglePlace = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setTips(null);
  };

  const itinerary: Itinerary | null = useMemo(
    () => mode === 'custom' ? buildCustomItinerary(selected, days) : generateItinerary(days, variantId),
    [mode, selected, days, variantId]
  );

  const pickDays = (d: number) => {
    setDays(d);
    setVariantId(undefined);
    setTips(null);
  };

  const pickVariant = (id: string) => {
    setVariantId(id);
    setTips(null);
  };

  useEffect(() => { trackItineraryGenerate(days, itinerary?.variantId ?? ''); }, [days, itinerary?.variantId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadTips = async () => {
    if (!itinerary) return;
    setTipsLoading(true);
    const res = await enrichItinerary(itinerary, lang);
    setTips(res);
    setTipsLoading(false);
  };

  const copyPlan = async () => {
    if (!itinerary) return;
    try {
      await navigator.clipboard.writeText(itineraryToText(itinerary, lang));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard blocked */ }
  };

  const dayFare = (legs: Itinerary['days'][0]['legs']) =>
    legs.reduce((s, l) => s + Math.min(...l.options.map(o => o.fareMin)), 0);

  const tipFor = (day: number): string | undefined => {
    if (!tips) return undefined;
    const list = lang === 'bn' ? tips.tipsBn : tips.tipsEn;
    return list.find(s => s.startsWith(`Day ${day}:`)) ?? list.find(s => s.startsWith(`Day ${day} `));
  };

  return (
    <PageShell {...rest} theme={theme} lang={lang}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '8px 16px 56px', fontFamily: font }}>
        {/* Hero */}
        <div style={{ padding: '18px 4px 14px' }}>
          <p style={{ fontSize: 26, fontWeight: 800, color: tk.text, margin: 0, lineHeight: 1.3 }}>
            {T(lang, '🧭 আপনার বাংলাদেশ ভ্রমণ', '🧭 Your Bangladesh Journey')}
          </p>
          <p style={{ fontSize: 14, color: tk.textDim, margin: '6px 0 0', lineHeight: 1.6 }}>
            {T(lang, 'দিন বাছুন — আমরা রেডি করে দেবো রুট, ভাড়া, সময় আর করণীয়। অফলাইনেও কাজ করে!', 'Pick your days — we plan routes, fares, times & things to do. Works offline!')}
          </p>
        </div>

        {/* Mode: template vs my own plan */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button
            onClick={() => { setMode('template'); setTips(null); }}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontFamily: font, fontWeight: 700, fontSize: 13,
              background: mode === 'template' ? tk.primary : tk.panel,
              color: mode === 'template' ? tk.primaryInk : tk.textDim,
              border: `1px solid ${mode === 'template' ? 'transparent' : tk.line}`,
            }}
          >
            📋 {T(lang, 'রেডি প্ল্যান', 'Ready plans')}
          </button>
          <button
            onClick={() => { setMode('custom'); setTips(null); }}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontFamily: font, fontWeight: 700, fontSize: 13,
              background: mode === 'custom' ? tk.primary : tk.panel,
              color: mode === 'custom' ? tk.primaryInk : tk.textDim,
              border: `1px solid ${mode === 'custom' ? 'transparent' : tk.line}`,
            }}
          >
            🛠️ {T(lang, 'আমার প্ল্যান', 'My plan')}
          </button>
        </div>

        {/* Custom: pick places to visit */}
        {mode === 'custom' && (
          <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 14, marginBottom: 14 }}>
            <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: tk.text, margin: '0 0 8px' }}>
              {T(lang, '১) জেলা বাছুন — ক্লিক করলে তার সব স্থান দেখাবে', '1) Pick a district — tap to see all its places')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10, maxHeight: 132, overflowY: 'auto' }}>
              {districts.map(d => {
                const cnt = districtSelectedCount(d);
                const open = openDistrict === d;
                return (
                  <button
                    key={d}
                    onClick={() => toggleDistrict(d)}
                    style={{
                      fontFamily: font, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 999, cursor: 'pointer',
                      background: open || cnt > 0 ? tk.primarySoft : tk.panelMuted,
                      color: open || cnt > 0 ? tk.primary : tk.textDim,
                      border: `1px solid ${open || cnt > 0 ? tk.primary : tk.line}`,
                    }}
                  >
                    {d}{cnt > 0 ? ` · ${cnt}` : ''} {open ? '▲' : '▼'}
                  </button>
                );
              })}
            </div>
            {openDistrict && (() => {
              const places = districtPlaces(openDistrict);
              return (
                <div style={{ background: tk.panelMuted, borderRadius: 12, padding: 10, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: tk.text, margin: 0, flex: 1 }}>
                      {T(lang, `${openDistrict} — ${places.length}টি স্থান`, `${openDistrict} — ${places.length} places`)}
                    </p>
                    <button
                      onClick={() => addAllDistrict(openDistrict)}
                      style={{ fontFamily: font, fontSize: 11, fontWeight: 700, color: tk.primary, background: `${tk.primary}1a`, border: 'none', borderRadius: 999, padding: '4px 10px', cursor: 'pointer' }}
                    >
                      {districtSelectedCount(openDistrict) === places.length
                        ? T(lang, 'সব বাদ দিন', 'Remove all')
                        : T(lang, 'সব বাছুন', 'Pick all')}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {places.map(p => {
                      const on = selected.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePlace(p.id)}
                          style={{
                            fontFamily: font, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 999, cursor: 'pointer',
                            background: on ? tk.primary : tk.panel,
                            color: on ? tk.primaryInk : tk.textDim,
                            border: `1px solid ${on ? 'transparent' : tk.line}`,
                          }}
                        >
                          {on ? '✓ ' : ''}{lang === 'bn' ? p.bn || p.en : p.en}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: tk.textFaint, margin: '0 0 8px' }}>
              {T(lang, 'অথবা খুঁজে বাছুন —', 'Or search & pick —')}
            </p>
            <input
              value={placeQuery}
              onChange={e => setPlaceQuery(e.target.value)}
              placeholder={T(lang, 'স্থান খুঁজুন (ইংরেজি/বাংলা)…', 'Search places (EN/BN)…')}
              style={{ width: '100%', boxSizing: 'border-box', fontFamily: font, fontSize: 14, color: tk.text, background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 10, padding: '10px 12px', outline: 'none', marginBottom: 8 }}
            />
            {placeMatches.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                {placeMatches.map(p => {
                  const on = selected.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlace(p.id)}
                      style={{
                        textAlign: 'left', padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontFamily: font,
                        background: on ? tk.primarySoft : tk.panelMuted,
                        border: `1px solid ${on ? tk.primary : tk.line}`,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 14, color: tk.primary, flexShrink: 0 }}>{on ? '✓' : '+'}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: tk.text, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lang === 'bn' ? p.bn || p.en : p.en}
                      </span>
                      <span style={{ fontSize: 11, color: tk.textFaint, flexShrink: 0 }}>{p.district}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {selected.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selected.map(id => {
                  const p = ALL_PLACES.find(x => x.id === id);
                  if (!p) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => togglePlace(id)}
                      title={T(lang, 'বাদ দিন', 'Remove')}
                      style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: tk.primary, background: `${tk.primary}1a`, border: 'none', borderRadius: 999, padding: '5px 10px', cursor: 'pointer' }}
                    >
                      {lang === 'bn' ? p.bn || p.en : p.en} ✕
                    </button>
                  );
                })}
              </div>
            )}
            <p style={{ fontFamily: font, fontSize: 12, color: tk.textFaint, margin: '10px 0 0', lineHeight: 1.6 }}>
              {T(lang, '২) নিচে দিন সংখ্যা বাছুন — আমরা ঢাকা থেকে শুরু করে আপনার বাছাই করা জায়গাগুলো নিয়ে পূর্ণ ভ্রমণসূচি বানাবো।', '2) Pick days below — we build a full tour from Dhaka covering your picks.')}
            </p>
          </div>
        )}

        {/* Day chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {DAY_OPTIONS.map(d => (
            <button
              key={d}
              onClick={() => pickDays(d)}
              style={{
                padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: font, fontWeight: 700, fontSize: 14,
                background: days === d ? tk.primary : tk.panel,
                color: days === d ? tk.primaryInk : tk.textDim,
                border: `1px solid ${days === d ? 'transparent' : tk.line}`,
              }}
            >
              {T(lang, `${d} দিন`, d === 1 ? '1 day' : `${d} days`)}
            </button>
          ))}
        </div>

        {/* Variants (template mode only) */}
        {mode === 'template' && variants.length > 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: tk.textFaint, margin: 0 }}>
              {T(lang, 'কোন প্ল্যানটি চান?', 'Which plan do you want?')}
            </p>
            {variants.map(v => (
              <button
                key={v.id}
                onClick={() => pickVariant(v.id)}
                style={{
                  textAlign: 'left', padding: '12px 14px', borderRadius: 14, cursor: 'pointer', fontFamily: font,
                  background: variantId === v.id ? tk.primarySoft : tk.panel,
                  border: `1px solid ${variantId === v.id ? tk.primary : tk.line}`,
                }}
              >
                <p style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: tk.text, margin: 0 }}>
                  {lang === 'bn' ? v.titleBn : v.titleEn}
                </p>
                <p style={{ fontFamily: font, fontSize: 12, color: tk.textFaint, margin: '3px 0 0' }}>
                  {lang === 'bn' ? v.summaryBn : v.summaryEn}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Plan */}
        {!itinerary ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: tk.textFaint, fontSize: 14 }}>
            {mode === 'custom'
              ? T(lang, 'উপরে অন্তত একটি স্থান বাছুন — তারপর দিন সংখ্যা বাছুন', 'Pick at least one place above — then choose your days')
              : T(lang, 'এই দিনের জন্য প্ল্যান পাওয়া যায়নি', 'No plan available for this duration')}
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div style={{ background: `linear-gradient(135deg, ${tk.primary}, ${tk.primaryDeep})`, borderRadius: 18, padding: 16, color: tk.primaryInk, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <p style={{ fontFamily: font, fontSize: 16, fontWeight: 800, margin: 0 }}>
                  {lang === 'bn' ? itinerary.titleBn : itinerary.titleEn}
                </p>
                <p style={{ fontFamily: SANS, fontSize: 12, opacity: 0.85, margin: '3px 0 0' }}>
                  {T(lang, `আনুমানিক বাজেট`, `Est. budget`)}: {F(itinerary.budgetMin)}–{F(itinerary.budgetMax)}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={copyPlan}
                  style={{ ...chipBtn(tk), background: 'rgba(255,255,255,0.18)', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: font }}
                >
                  {copied ? T(lang, '✓ কপি হয়েছে', '✓ Copied') : T(lang, '📋 কপি', '📋 Copy')}
                </button>
                <button
                  onClick={loadTips}
                  disabled={tipsLoading || !!tips}
                  style={{ ...chipBtn(tk), background: 'rgba(255,255,255,0.18)', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: font }}
                >
                  {tipsLoading ? T(lang, 'লোড হচ্ছে…', 'Loading…') : tips ? T(lang, '✓ টিপস', '✓ Tips') : T(lang, '🤖 AI টিপস', '🤖 AI tips')}
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {itinerary.days.map(d => {
                const places = d.placeIds.map(id => ALL_PLACES.find(p => p.id === id)).filter(Boolean);
                const fare = dayFare(d.legs);
                const tip = tipFor(d.day);
                return (
                  <div key={d.day} style={{ position: 'relative', paddingLeft: 26 }}>
                    {/* connector */}
                    {d.day > 1 && (
                      <div style={{ position: 'absolute', left: 8, top: -16, bottom: '100%', width: 2, background: tk.line }} />
                    )}
                    <div style={{ position: 'absolute', left: 0, top: 4, width: 18, height: 18, borderRadius: '50%', background: tk.primary, color: tk.primaryInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: 10, fontWeight: 800 }}>
                      {d.day}
                    </div>

                    <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <p style={{ fontFamily: font, fontSize: 15, fontWeight: 800, color: tk.text, margin: 0, flex: 1 }}>
                          {T(lang, 'দিন', 'Day')} {d.day} — {lang === 'bn' ? d.titleBn : d.titleEn}
                        </p>
                        {fare > 0 && (
                          <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>
                            {T(lang, 'ভাড়া', 'fare')} ~{F(fare)}
                          </span>
                        )}
                      </div>

                      {/* legs */}
                      {d.legs.map((l, i) => (
                        <div key={i} style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: tk.textFaint, margin: 0 }}>
                            {T(lang, 'যাতায়াত', 'Travel')} · {T(lang, `${l.fromLabelBn} → ${l.toLabelBn}`, `${l.fromLabelEn} → ${l.toLabelEn}`)}
                          </p>
                          {l.options.map((o, j) => <LegOptionRow key={j} o={o} tk={tk} lang={lang} />)}
                        </div>
                      ))}

                      {/* places */}
                      {places.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginTop: 4 }}>
                          {places.map(p => p && (
                            <DestinationCard
                              key={p.id}
                              place={p}
                              theme={theme}
                              lang={lang}
                              onClick={() => rest.onNav('destination-detail', { id: p.id })}
                            />
                          ))}
                        </div>
                      )}

                      {(lang === 'bn' ? d.notesBn : d.notesEn) && (
                        <p style={{ fontFamily: font, fontSize: 12, color: tk.textFaint, margin: '8px 0 0', lineHeight: 1.6 }}>
                          💡 {lang === 'bn' ? d.notesBn : d.notesEn}
                        </p>
                      )}
                      {tip && (
                        <p style={{ fontFamily: font, fontSize: 12, color: tk.textDim, margin: '8px 0 0', lineHeight: 1.6, background: tk.primarySoft, borderRadius: 10, padding: '8px 10px' }}>
                          {tip}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {tips === null && !tipsLoading && (
              <p style={{ fontFamily: font, fontSize: 12, color: tk.textFaint, textAlign: 'center', margin: '16px 0 0' }}>
                {T(lang, '💡 AI টিপস পেতে উপরের বাটনে চাপুন (ইন্টারনেট লাগবে)', '💡 Tap "AI tips" above for local advice (needs internet)')}
              </p>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
