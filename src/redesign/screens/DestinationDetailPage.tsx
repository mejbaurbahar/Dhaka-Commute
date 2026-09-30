import React, { useEffect, useMemo, useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, chipBtn } from '../tokens';
import { PageShell, PageShellProps } from './PageShell';
import { DestinationCard } from '../components/DestinationCard';
import { DestinationMap } from '../components/DestinationMap';
import { DestinationRating } from '../components/DestinationRating';
import { DestinationPhotoGallery } from '../components/DestinationPhotoGallery';
import { ALL_PLACES, Place } from '../../../data/bangladeshPlaces';
import { DESTINATION_ENRICHMENT } from '../../../data/destinationEnrichment';
import { DESTINATION_THINGS_TO_DO } from '../../../data/destinationThingsToDo';
import { buildLegOptions, ItineraryLeg, destinationSearchParams, nearestHubDistrict, DISTRICT_BN as DISTRICT_BN_LOCAL } from '../../../services/itineraryEngine';
import { trackDestinationView } from '../../../services/analyticsService';
import { useDocumentTitle, setCanonicalUrl, setMetaTag, setPropertyMetaTag, setJsonLd } from '../utils/useDocumentTitle';

type Props = Omit<PageShellProps, 'children'> & { params?: Record<string, string> };

// Must mirror scripts/generate-sitemap.mjs slugify — deep links from the sitemap
// land here as the URL slug and have to resolve back to the place.
const slugify = (v: string) => (v || '')
  .toLowerCase()
  .replace(/paribahan/g, '')
  .replace(/&/g, ' and ')
  .replace(/['’]/g, '')
  .normalize('NFKD')
  .replace(/[^\w\sঀ-৿-]/g, ' ')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const TYPE_LABEL: Record<string, [string, string]> = {
  tourist: ['পর্যটন', 'Tourist'], historical: ['ঐতিহাসিক', 'Historical'],
  landmark: ['ল্যান্ডমার্ক', 'Landmark'], airport: ['বিমানবন্দর', 'Airport'],
};

const MODE_ICON: Record<string, string> = { bus: '🚌', train: '🚆', flight: '✈️', launch: '⛴️' };

const TABS: { key: string; icon: string; bn: string; en: string }[] = [
  { key: 'overview', icon: 'ℹ️', bn: 'পরিচিতি', en: 'Overview' },
  { key: 'go', icon: '🚌', bn: 'কীভাবে যাবেন', en: 'How to go' },
  { key: 'things', icon: '🎯', bn: 'কী করবেন', en: 'Things to do' },
  { key: 'photos', icon: '📷', bn: 'ছবি', en: 'Photos' },
  { key: 'reviews', icon: '⭐', bn: 'রিভিউ', en: 'Reviews' },
  { key: 'map', icon: '🗺️', bn: 'ম্যাপ', en: 'Map' },
];

function fmtDur(min: number, lang: Lang): string {
  if (min >= 60) return T(lang, `${Math.floor(min / 60)}ঘ ${min % 60}মি`, `${Math.floor(min / 60)}h ${min % 60}m`);
  return `${min}m`;
}

function Fact({ tk, font, label, value }: { tk: Tokens; font: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
      <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</span>
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: tk.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}

function LegRow({ leg, tk, lang, onOptionClick }: { leg: ItineraryLeg; tk: Tokens; lang: Lang; onOptionClick?: (mode: string) => void }) {
  const font = lang === 'bn' ? BEN : SANS;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: tk.textFaint, margin: 0 }}>
        {T(lang, `${leg.fromLabelBn} → ${leg.toLabelBn}`, `${leg.fromLabelEn} → ${leg.toLabelEn}`)}
      </p>
      {leg.options.map((o, i) => (
        <div
          key={i}
          onClick={onOptionClick ? () => onOptionClick(o.mode) : undefined}
          style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 14, padding: '12px 14px', ...(onOptionClick ? { cursor: 'pointer' } : {}) }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>{MODE_ICON[o.mode] ?? '🚌'}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: tk.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lang === 'bn' ? o.labelBn : o.labelEn}
              </p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, margin: '2px 0 0' }}>
                {fmtDur(o.durationMin, lang)}
                {o.depTime ? ` · ${o.depTime}` : ''}
                {o.boardingEn ? ` · ${lang === 'bn' ? o.boardingBn ?? o.boardingEn : o.boardingEn}` : ''}
              </p>
            </div>
            <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: tk.primary, whiteSpace: 'nowrap' }}>
              {lang === 'bn' ? o.fareLabelBn : o.fareLabelEn}
            </span>
            {onOptionClick && <span style={{ color: tk.textFaint, fontSize: 16 }}>›</span>}
          </div>
        </div>
      ))}
      {onOptionClick && (
        <p style={{ fontFamily: font, fontSize: 10, color: tk.textFaint, margin: 0, textAlign: 'center' }}>
          {T(lang, 'ভাড়া দেখতে একটি অপশনে ক্লিক করুন', 'Tap an option to see fares')}
        </p>
      )}
    </div>
  );
}

export function DestinationDetailPage({ theme, lang, params, ...rest }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const font = lang === 'bn' ? BEN : SANS;
  const [tab, setTab] = useState('overview');
  // Nearest hub district to the user's GPS position (default Dhaka). Resolved
  // when the how-to-go tab opens, so we never prompt for location on page load.
  const [fromDistrict, setFromDistrict] = useState<string>('Dhaka');
  const [fromResolved, setFromResolved] = useState(false);

  const place: Place | undefined = useMemo(
    () => ALL_PLACES.find(p => p.id === params?.id) ?? ALL_PLACES.find(p => slugify(p.en) === (params?.id ?? '')),
    [params?.id]
  );

  const enr = place ? DESTINATION_ENRICHMENT[place.id] : undefined;
  const slug = place ? slugify(place.en) : 'place';

  useDocumentTitle(place ? `${place.en} — ${place.bn}` : 'Place not found — কই যাবো');
  setCanonicalUrl(`/places/${slug}/`);
  if (place) {
    setMetaTag('description', lang === 'bn' ? (place.descriptionBn ?? place.description ?? '') : (place.description ?? place.descriptionBn ?? ''));
    const photo = enr?.photos?.[0];
    if (photo) {
      setPropertyMetaTag('og:image', photo);
      setMetaTag('twitter:image', photo);
    }
    setJsonLd('tourist-attraction', {
      '@type': 'TouristAttraction',
      name: place.en,
      description: place.description,
      url: `https://koyjabo.com/places/${slug}/`,
      address: { '@type': 'PostalAddress', addressLocality: place.district, addressRegion: place.division, addressCountry: 'BD' },
      geo: { '@type': 'GeoCoordinates', latitude: enr?.lat ?? place.lat, longitude: enr?.lng ?? place.lng },
      ...(enr?.gmRating ? {
        aggregateRating: { '@type': 'AggregateRating', ratingValue: enr.gmRating, ratingCount: enr.gmReviewCount ?? 0 },
      } : {}),
    });
  }

  useEffect(() => {
    if (place) trackDestinationView(place.id, place.en);
  }, [place?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setTab('overview'); }, [params?.id]);

  // Resolve the user's origin once when the how-to-go tab opens. Geolocation
  // denied/slow → Dhaka. The nearest hub (e.g. Hemayetpur → Dhaka) becomes the
  // `from` of every click-through search.
  useEffect(() => {
    if (tab !== 'go' || fromResolved) return;
    setFromResolved(true);
    if (!('geolocation' in navigator)) { setFromDistrict('Dhaka'); return; }
    const fallback = setTimeout(() => setFromDistrict('Dhaka'), 5000);
    navigator.geolocation.getCurrentPosition(
      pos => { clearTimeout(fallback); setFromDistrict(nearestHubDistrict(pos.coords.latitude, pos.coords.longitude)); },
      () => { clearTimeout(fallback); setFromDistrict('Dhaka'); },
      { enableHighAccuracy: false, timeout: 4000, maximumAge: 15 * 60 * 1000 }
    );
    return () => clearTimeout(fallback);
  }, [tab, fromResolved]);

  const related = useMemo(() => {
    if (!place) return [];
    return ALL_PLACES
      .filter(p => p.id !== place.id && p.division === place.division && p.type !== 'airport')
      .slice(0, 3);
  }, [place]);

  const leg = useMemo(() => {
    if (!place) return null;
    const dhakaHub = ALL_PLACES.find(p => p.district === 'Dhaka');
    if (!dhakaHub) return null;
    return buildLegOptions(dhakaHub.id, place.id);
  }, [place]);

  // Click-through endpoints for the how-to-go rows: `to` is always the place's
  // district hub per mode (station / IATA / terminal / city) — the raw place
  // name like "Inani Beach" has no station, airport or terminal.
  const searchParams = useMemo(
    () => (place ? destinationSearchParams(place, fromDistrict) : null),
    [place, fromDistrict]
  );

  if (!place) {
    return (
      <PageShell {...rest} theme={theme} lang={lang}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 20px', textAlign: 'center', fontFamily: font }}>
          <div style={{ fontSize: 48 }}>🏝️</div>
          <h1 style={{ color: tk.text, fontSize: 22, margin: '16px 0 8px' }}>
            {T(lang, 'স্থানটি পাওয়া যায়নি', 'Place not found')}
          </h1>
          <p style={{ color: tk.textFaint, fontSize: 14, margin: '0 0 24px' }}>
            {T(lang, 'আপনি যে স্থানটি খুঁজছেন সেটি পাওয়া যায়নি।', 'The place you are looking for could not be found.')}
          </p>
          <button onClick={() => rest.onNav('discover')} style={{ ...chipBtn(tk), background: tk.primary, color: tk.primaryInk, border: 'none', padding: '12px 22px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
            {T(lang, 'সব স্থান দেখুন', 'Browse all places')}
          </button>
        </div>
      </PageShell>
    );
  }

  const photo = enr?.photos?.[0];
  const things = DESTINATION_THINGS_TO_DO[place.id];

  return (
    <PageShell {...rest} theme={theme} lang={lang}>
      <div style={{ maxWidth: 760, margin: '0 auto', paddingBottom: 64, fontFamily: font }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 220, background: tk.panelMuted, overflow: 'hidden' }}>
          {photo ? (
            <img src={photo} alt={place.en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72 }}>
              {place.type === 'historical' ? '🏛️' : place.type === 'landmark' ? '🗼' : '🏖️'}
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65))' }} />
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: 999, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
                {TYPE_LABEL[place.type] ? T(lang, TYPE_LABEL[place.type][0], TYPE_LABEL[place.type][1]) : place.type}
              </span>
              {enr?.gmRating && (
                <span style={{ background: 'rgba(0,0,0,0.5)', color: '#ffd54f', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: 999, fontFamily: SANS, fontSize: 11, fontWeight: 700 }}>
                  ★ {enr.gmRating.toFixed(1)}{enr.gmReviewCount ? ` (${enr.gmReviewCount.toLocaleString('en-US')})` : ''}
                </span>
              )}
            </div>
            <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 800, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,.5)' }}>
              {lang === 'bn' ? (place.bn || place.en) : place.en}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: '4px 0 0', fontFamily: SANS }}>
              {[place.district, place.division].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>

        {/* Info chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px 16px 4px' }}>
          {place.entryFee && (
            <span style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: tk.textDim, fontFamily: SANS }}>
              🎫 {T(lang, 'প্রবেশ', 'Entry')}: {place.entryFee}
            </span>
          )}
          {enr?.gmHours && (
            <span style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: tk.textDim, fontFamily: SANS }}>
              🕐 {enr.gmHours}
            </span>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '14px 16px 10px', scrollbarWidth: 'none' }}>
          {TABS.map(t => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  whiteSpace: 'nowrap', fontFamily: font, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  padding: '8px 14px', borderRadius: 999, border: `1px solid ${active ? 'transparent' : tk.line}`,
                  background: active ? tk.primary : tk.panel, color: active ? tk.primaryInk : tk.textDim,
                  flexShrink: 0, transition: 'all .18s',
                }}
              >
                {t.icon} {T(lang, t.bn, t.en)}
              </button>
            );
          })}
        </div>

        <div style={{ padding: '4px 16px' }}>
          {tab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: tk.text, fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                {lang === 'bn' ? (place.descriptionBn ?? place.description ?? '') : (place.description ?? place.descriptionBn ?? '')}
              </p>

              {/* Quick facts */}
              <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '12px 14px' }}>
                <p style={{ fontFamily: font, fontSize: 13.5, fontWeight: 700, color: tk.text, margin: '0 0 10px' }}>
                  {T(lang, '📌 দ্রুত তথ্য', '📌 Quick facts')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
                  {place.district && (
                    <Fact tk={tk} font={font} label={T(lang, 'জেলা', 'District')} value={lang === 'bn' ? (DISTRICT_BN_LOCAL[place.district.split('/')[0]] ?? place.district) : place.district} />
                  )}
                  {place.division && <Fact tk={tk} font={font} label={T(lang, 'বিভাগ', 'Division')} value={place.division} />}
                  {TYPE_LABEL[place.type] && <Fact tk={tk} font={font} label={T(lang, 'ধরন', 'Type')} value={T(lang, TYPE_LABEL[place.type][0], TYPE_LABEL[place.type][1])} />}
                  {place.entryFee && <Fact tk={tk} font={font} label={T(lang, 'প্রবেশমূল্য', 'Entry fee')} value={place.entryFee} />}
                  {enr?.gmHours && <Fact tk={tk} font={font} label={T(lang, 'খোলা থাকে', 'Open hours')} value={enr.gmHours} />}
                  {enr?.gmRating && (
                    <Fact tk={tk} font={font} label={T(lang, 'রেটিং', 'Rating')}
                      value={`★ ${enr.gmRating.toFixed(1)}${enr.gmReviewCount ? ` (${enr.gmReviewCount.toLocaleString('en-US')})` : ''}`} />
                  )}
                </div>
              </div>

              {/* How to go shortcut */}
              <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: tk.text, margin: 0 }}>
                  {T(lang, '🚌 কীভাবে যাবেন — আসল ভাড়া ও সময়', '🚌 How to go — real fares & times')}
                </p>
                <button onClick={() => setTab('go')} style={{
                  fontFamily: font, fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                  padding: '7px 14px', borderRadius: 999,
                  border: 'none', background: tk.primary, color: tk.primaryInk,
                  display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                }}>
                  {T(lang, 'দেখুন ›', 'View ›')}
                </button>
              </div>

              {/* Things to do preview */}
              {things && things.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: tk.text, margin: 0 }}>
                      {T(lang, '🎯 কী করবেন', '🎯 Things to do')}
                    </p>
                    <button onClick={() => setTab('things')} style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: tk.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {T(lang, 'সব দেখুন ›', 'See all ›')}
                    </button>
                  </div>
                  {things.slice(0, 3).map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 4px', borderBottom: i < Math.min(3, things.length) - 1 ? `1px solid ${tk.line}` : 'none' }}>
                      <span style={{ fontSize: 14, marginTop: 1 }}>{i + 1}.</span>
                      <p style={{ fontFamily: font, fontSize: 13.5, color: tk.text, margin: 0, lineHeight: 1.6 }}>
                        {lang === 'bn' ? t.bn : t.en}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: tk.text, margin: 0 }}>
                  {T(lang, '📍 অবস্থান', '📍 Location')}
                </p>
                <button onClick={() => setTab('map')} style={{
                  fontFamily: font, fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                  padding: '7px 14px', borderRadius: 999,
                  border: 'none', background: tk.primary, color: tk.primaryInk,
                  display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                }}>
                  {T(lang, '🗺️ মানচিত্র', '🗺️ Map')}
                </button>
              </div>
              {related.length > 0 && (
                <div>
                  <p style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: tk.text, margin: '0 0 10px' }}>
                    {T(lang, 'একই বিভাগের আরও স্থান', 'More places in same division')}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
                    {related.map(p => (
                      <DestinationCard key={p.id} place={p} theme={theme} lang={lang} onClick={() => rest.onNav('destination-detail', { id: p.id })} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'go' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ color: tk.textDim, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                {fromDistrict !== 'Dhaka'
                  ? T(lang, `${DISTRICT_BN_LOCAL[fromDistrict] ?? fromDistrict} থেকে কীভাবে যাবেন — আসল ভাড়া ও সময় (২০২৬)। আপনার অবস্থান থেকে নিকটতম হাবটি শুরুর পয়েন্ট হিসেবে নেওয়া হয়েছে।`, `How to go from ${fromDistrict} — real fares & durations (2026). Your nearest hub is used as the starting point.`)
                  : T(lang, 'ঢাকা থেকে কীভাবে যাবেন — আসল ভাড়া ও সময় (২০২৬)।', 'How to go from Dhaka — real fares & durations (2026).')}
              </p>
              {leg ? (
                <LegRow
                  leg={leg}
                  tk={tk}
                  lang={lang}
                  onOptionClick={mode => {
                    // Click-through: jump straight to the matching search page with
                    // the user's nearest hub → the place's district hub pre-filled;
                    // hubs auto-search on params and back always returns here.
                    const sp = searchParams;
                    if (!sp) return;
                    if (mode === 'bus') rest.onNav('results', { from: sp.fromCity, to: sp.toCity });
                    else if (mode === 'train') rest.onNav('train-hub', { from: sp.fromTrain, to: sp.toTrain });
                    else if (mode === 'launch') rest.onNav('launch-hub', { from: sp.fromTerminal, to: sp.toTerminal });
                    else if (mode === 'flight') rest.onNav('flights-hub', { from: sp.fromIATA, to: sp.toIATA });
                  }}
                />
              ) : (
                <p style={{ color: tk.textFaint, fontSize: 13 }}>{T(lang, 'রুট তথ্য পাওয়া যায়নি', 'Route info unavailable')}</p>
              )}
            </div>
          )}

          {tab === 'things' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(things ?? []).map((t, i) => (
                <div key={i} style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, marginTop: 1 }}>{i + 1}. </span>
                  <p style={{ fontFamily: font, fontSize: 14, color: tk.text, margin: 0, lineHeight: 1.6 }}>
                    {lang === 'bn' ? t.bn : t.en}
                  </p>
                </div>
              ))}
              {(!things || things.length === 0) && (
                <p style={{ color: tk.textFaint, fontSize: 13 }}>{T(lang, 'কিছু পাওয়া যায়নি', 'Nothing available yet')}</p>
              )}
            </div>
          )}

          {tab === 'photos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {enr && enr.photos.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {enr.photos.slice(1).map((src, i) => (
                    <div key={i}>
                      <img src={src} alt={`${place.en} ${i + 2}`} loading="lazy" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 10 }} />
                    </div>
                  ))}
                </div>
              )}
              <div>
                <p style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: tk.text, margin: '0 0 10px' }}>
                  {T(lang, 'ভ্রমণকারীদের ছবি', 'Traveller photos')}
                </p>
                <DestinationPhotoGallery destId={place.id} destName={place.en} theme={theme} lang={lang} />
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {enr?.gmRating && (
                <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 26 }}>⭐</span>
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: tk.text, margin: 0 }}>
                      ★ {enr.gmRating.toFixed(1)} <span style={{ color: tk.textFaint, fontWeight: 400 }}>
                        {T(lang, `${enr.gmReviewCount ?? 0}টি রিভিউ`, `${enr.gmReviewCount ?? 0} reviews`)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <DestinationRating destId={place.id} destName={place.en} theme={theme} lang={lang} />
            </div>
          )}

          {tab === 'map' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <DestinationMap
                lat={enr?.lat ?? place.lat}
                lng={enr?.lng ?? place.lng}
                nameEn={place.en}
                nameBn={place.bn ?? place.en}
                theme={theme}
                lang={lang}
              />
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
