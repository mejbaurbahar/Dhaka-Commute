import React, { useState, useEffect, useMemo } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, chipBtn } from '../tokens';
import { PageShell, PageShellProps } from './PageShell';
import { DestinationCard } from '../components/DestinationCard';
import { ALL_PLACES, Place } from '../../../data/bangladeshPlaces';
import { DESTINATION_ENRICHMENT } from '../../../data/destinationEnrichment';
import { trackFeatureUsage } from '../../../services/analyticsService';
import { useDocumentTitle, setCanonicalUrl } from '../utils/useDocumentTitle';

type Props = Omit<PageShellProps, 'children'> & { params?: Record<string, string> };

interface Cluster {
  key: string;
  icon: string;
  bn: string;
  en: string;
}

const CLUSTERS: Cluster[] = [
  { key: 'sea', icon: '🏖️', bn: 'সমুদ্র ও দ্বীপ', en: 'Sea & Islands' },
  { key: 'hills', icon: '⛰️', bn: 'পাহাড়', en: 'Hill Tracts' },
  { key: 'tea', icon: '🍃', bn: 'সিলেট ও চা', en: 'Sylhet & Tea' },
  { key: 'heritage', icon: '🏛️', bn: 'ঐতিহ্য', en: 'Heritage' },
  { key: 'dhaka', icon: '🏙️', bn: 'ঢাকা শহর', en: 'Dhaka City' },
  { key: 'other', icon: '📍', bn: 'আরও', en: 'More' },
];

const SEA_DISTRICTS = new Set(["Cox's Bazar", 'Patuakhali', 'Noakhali', 'Bhola']);
const HILL_DISTRICTS = new Set(['Bandarban', 'Rangamati', 'Khagrachhari']);
const TEA_DISTRICTS = new Set(['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj']);

function clusterOf(p: Place): string {
  const d = p.district ?? '';
  if (SEA_DISTRICTS.has(d)) return 'sea';
  if (HILL_DISTRICTS.has(d)) return 'hills';
  if (TEA_DISTRICTS.has(d)) return 'tea';
  if (p.type === 'historical' || p.type === 'landmark') return 'heritage';
  if (d === 'Dhaka') return 'dhaka';
  return 'other';
}

function searchable(p: Place): string {
  return `${p.en} ${p.bn} ${p.district ?? ''} ${p.division ?? ''}`.toLowerCase();
}

export function DiscoverPage({ theme, lang, params, ...rest }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const font = lang === 'bn' ? BEN : SANS;
  const [query, setQuery] = useState('');
  const [openCluster, setOpenCluster] = useState<string | null>('sea');

  useDocumentTitle(T(lang, 'ঘুরতে যাবেন কোথায়? — ডিসকভার বাংলাদেশ', 'Where to go? — Discover Bangladesh'));
  setCanonicalUrl('/discover');

  useEffect(() => { trackFeatureUsage('discover'); }, []);

  const places = useMemo(
    () => ALL_PLACES.filter(p => p.type === 'tourist' || p.type === 'historical' || p.type === 'landmark'),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return places.filter(p => searchable(p).includes(q));
  }, [query, places]);

  const grouped = useMemo(() => {
    const map = new Map<string, Place[]>();
    for (const c of CLUSTERS) map.set(c.key, []);
    for (const p of places) map.get(clusterOf(p))?.push(p);
    for (const arr of map.values()) {
      arr.sort((a, b) => (DESTINATION_ENRICHMENT[b.id]?.gmRating ?? 0) - (DESTINATION_ENRICHMENT[a.id]?.gmRating ?? 0));
    }
    return map;
  }, [places]);

  const toggleCluster = (key: string) => setOpenCluster(v => (v === key ? null : key));

  return (
    <PageShell {...rest} theme={theme} lang={lang}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '8px 16px 48px', fontFamily: font }}>
        {/* Hero */}
        <div style={{ padding: '18px 4px 20px' }}>
          <p style={{ fontSize: 26, fontWeight: 800, color: tk.text, margin: 0, lineHeight: 1.3 }}>
            {T(lang, 'কোথায় ঘুরবেন? 🗺️', 'Where to go? 🗺️')}
          </p>
          <p style={{ fontSize: 14, color: tk.textDim, margin: '6px 0 0', lineHeight: 1.6 }}>
            {T(lang, 'বাংলাদেশের সেরা পর্যটন স্থান — কীভাবে যাবেন, খরচ, ছবি, রিভিউ সব এক জায়গায়।', 'Best tourist spots in Bangladesh — how to go, cost, photos & reviews in one place.')}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 18 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={T(lang, '🔍 খুঁজুন — যেমন "সিলেট", "বিচ", "Sundarbans"…', '🔍 Search — e.g. "Sylhet", "beach", "Sundarbans"…')}
            style={{
              width: '100%', boxSizing: 'border-box', background: tk.panel, border: `1px solid ${tk.line}`,
              borderRadius: 14, padding: '12px 14px', color: tk.text, fontFamily: font, fontSize: 14,
              outline: 'none', boxShadow: '0 8px 24px -16px rgba(0,0,0,0.3)',
            }}
          />
        </div>

        {results ? (
          <div>
            <p style={{ fontSize: 12, color: tk.textFaint, margin: '0 0 10px', fontFamily: SANS }}>
              {T(lang, `${results.length}টি ফলাফল`, `${results.length} results`)}
            </p>
            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: tk.textFaint, fontFamily: font, fontSize: 14 }}>
                {T(lang, 'কিছু পাওয়া যায়নি — অন্য নাম চেষ্টা করুন', 'Nothing found — try another name')}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {results.map(p => (
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
          </div>
        ) : (
          CLUSTERS.map(c => {
            const list = grouped.get(c.key) ?? [];
            if (!list.length) return null;
            const open = openCluster === c.key;
            return (
              <div key={c.key} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => toggleCluster(c.key)}
                  aria-expanded={open}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 14,
                    padding: '13px 14px', cursor: 'pointer', fontFamily: font,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{c.icon}</span>
                  <span style={{ flex: 1, textAlign: 'left', fontWeight: 700, fontSize: 15, color: tk.text }}>
                    {T(lang, c.bn, c.en)}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: tk.textFaint }}>{list.length}</span>
                  <span style={{ color: tk.textFaint, fontSize: 12, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
                </button>
                {open && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, padding: '12px 2px' }}>
                    {list.map(p => (
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
              </div>
            );
          })
        )}

        {/* Itinerary CTA */}
        <button
          onClick={() => rest.onNav('itinerary')}
          style={{
            ...chipBtn(tk), width: '100%', marginTop: 18, background: tk.primary, color: tk.primaryInk,
            border: 'none', borderRadius: 14, padding: '14px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: font,
            boxShadow: '0 10px 30px -10px var(--kj-primary, rgba(0,184,217,.6))',
          }}
        >
          {T(lang, '🧭 ভ্রমণ পরিকল্পনা তৈরি করুন', '🧭 Build my travel plan')}
        </button>
      </div>
    </PageShell>
  );
}
