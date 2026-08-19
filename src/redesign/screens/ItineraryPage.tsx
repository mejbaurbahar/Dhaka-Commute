import React, { useEffect, useMemo, useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, chipBtn } from '../tokens';
import { PageShell, PageShellProps } from './PageShell';
import { DestinationCard } from '../components/DestinationCard';
import { ALL_PLACES } from '../../../data/bangladeshPlaces';
import {
  generateItinerary, itineraryVariants, enrichItinerary, itineraryToText,
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
  const [tipsLoading, setTipsLoading] = useState(false);
  const [tips, setTips] = useState<{ tipsEn: string[]; tipsBn: string[] } | null>(null);
  const [copied, setCopied] = useState(false);

  useDocumentTitle(T(lang, 'ভ্রমণ পরিকল্পনা', 'Itinerary Planner'));
  setCanonicalUrl('/itinerary');

  const variants = useMemo(() => itineraryVariants(days), [days]);

  const itinerary: Itinerary | null = useMemo(() => generateItinerary(days, variantId), [days, variantId]);

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

        {/* Variants */}
        {variants.length > 1 && (
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
            {T(lang, 'এই দিনের জন্য প্ল্যান পাওয়া যায়নি', 'No plan available for this duration')}
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
