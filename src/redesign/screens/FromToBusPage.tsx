import React, { useEffect } from 'react';
import { KJ_TOKENS, T, N, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot } from '../components/AdSlot';
import { BUS_DATA, STATIONS } from '../../../constants';
import { BUS_PAIRS, findPair, pairPath, findInterchange, interchangePath } from '../busPairs';
import { findTransitGroups, TransitGroup } from '../utils/localBusRouting';
import { trackBusSearch } from '../../../services/analyticsService';
import { cancelPushEvent } from '../../services/pushService';
import { setCanonicalUrl, setMetaTag, setPropertyMetaTag, setJsonLd, useDocumentTitle } from '../utils/useDocumentTitle';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string,p?:Record<string,string>)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

// Bus ids use underscores (e.g. '13_no') but public URLs use dash slugs.
const busUrlSlug = (id: string) => id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const stopDisplay = (sid: string): { en: string; bn: string } => {
  const st = STATIONS[sid];
  return st ? { en: st.name, bn: st.bnName } : { en: sid.replace(/_/g, ' '), bn: sid.replace(/_/g, ' ') };
};

export function FromToBusPage(props: Props) {
  const { theme, device, lang, params, onNav } = props;
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (r=16): React.CSSProperties => ({ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:r,padding:16 });

  const from = params?.from ?? '';
  const to = params?.to ?? '';
  const pair = findPair(from, to);
  const interchange = findInterchange(from, to);

  // Dynamic transit search — works for any Dhaka city stop pair
  const transitResult = React.useMemo(() => findTransitGroups(from, to), [from, to]);

  const via = params?.via ?? interchange?.via ?? '';
  // Prefer dynamic direct buses; fall back to hardcoded pair match
  const dynamicDirect = transitResult.directBuses;
  const buses = dynamicDirect.length > 0
    ? dynamicDirect
    : pair
      ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(pair.from)) && b.stops.some(s => s.startsWith(pair.to)))
      : [];
  const fromName = pair ? { en: pair.fromEn, bn: pair.fromBn } : { en: from.replace(/_/g, ' '), bn: from.replace(/_/g, ' ') };
  const toName = pair ? { en: pair.toEn, bn: pair.toBn } : { en: to.replace(/_/g, ' '), bn: to.replace(/_/g, ' ') };

  // Transit groups from dynamic routing (all possible 1-transfer options)
  const transitGroups = transitResult.groups;
  // Fall back to legacy interchange for known hardcoded pairs
  const viaName = interchange
    ? { en: interchange.viaEn, bn: interchange.viaBn }
    : { en: via.replace(/_/g, ' '), bn: via.replace(/_/g, ' ') };
  const leg1Buses = interchange
    ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(interchange.from)) && b.stops.some(s => s.startsWith(interchange.via)))
    : [];
  const leg2Buses = interchange
    ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(interchange.via)) && b.stops.some(s => s.startsWith(interchange.to)))
    : [];
  // Use dynamic transit groups when available, else fall back to hardcoded interchange
  const hasTransitGroups = transitGroups.length > 0;
  const isInterchange = (hasTransitGroups || (Boolean(interchange) && buses.length === 0)) && buses.length === 0;

  useDocumentTitle(lang === 'bn'
    ? `${fromName.bn} থেকে ${toName.bn} বাস${isInterchange ? ` — ${viaName.bn} এ বাস বদল` : ''}`
    : `${fromName.en} to ${toName.en} bus${isInterchange ? ` — change at ${viaName.en}` : ''} — which bus goes there`);

  useEffect(() => {
    if (isInterchange && interchange) {
      setCanonicalUrl(interchangePath(interchange));
      const desc = `No direct bus from ${fromName.en} to ${toName.en}. Take ${leg1Buses.length} bus${leg1Buses.length === 1 ? '' : 'es'} to ${viaName.en}, then ${leg2Buses.length} bus${leg2Buses.length === 1 ? '' : 'es'} to ${toName.en}. Step-by-step guide on KoyJabo.`;
      setMetaTag('description', desc);
      setPropertyMetaTag('og:description', desc);
      setPropertyMetaTag('og:title', `How to Go from ${fromName.en} to ${toName.en} by Bus? | কই যাবো`);
      setPropertyMetaTag('og:image', 'https://koyjabo.com/og-image.png');
      setJsonLd('faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is there a direct bus from ${fromName.en} to ${toName.en}?`,
            acceptedAnswer: { '@type': 'Answer', text: `No direct bus runs from ${fromName.en} to ${toName.en}. The fastest way is to take a ${fromName.en} bus to ${viaName.en} and change there for a ${toName.en} bus.` },
          },
          {
            '@type': 'Question',
            name: `How do I go from ${fromName.en} to ${toName.en} by bus?`,
            acceptedAnswer: { '@type': 'Answer', text: `Take any of ${leg1Buses.length} buses from ${fromName.en} to ${viaName.en}, get off at ${viaName.en}, then take one of ${leg2Buses.length} buses to ${toName.en}.` },
          },
          {
            '@type': 'Question',
            name: `How much is the bus fare from ${fromName.en} to ${toName.en}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The fare is the sum of two legs: ${fromName.en}→${viaName.en} plus ${viaName.en}→${toName.en}, typically ৳20–৳60 in total. Use the KoyJabo fare calculator for the exact amount.` },
          },
        ],
      });
      return;
    }
    if (!pair) return;
    setCanonicalUrl(pairPath(pair));
    const count = buses.length;
    const desc = `Which bus goes from ${fromName.en} to ${toName.en} in Dhaka? ${count} bus${count === 1 ? '' : 'es'} cover this route. Stops, fares & live location. Free KoyJabo guide.`;
    setMetaTag('description', desc);
    setPropertyMetaTag('og:description', desc);
    setPropertyMetaTag('og:title', `${fromName.en} to ${toName.en} Bus | কই যাবো`);
    setPropertyMetaTag('og:image', 'https://koyjabo.com/og-image.png');
    setJsonLd('faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Which bus goes from ${fromName.en} to ${toName.en} in Dhaka?`,
          acceptedAnswer: { '@type': 'Answer', text: `${count} bus${count === 1 ? '' : 'es'} on KoyJabo cover the ${fromName.en} to ${toName.en} route: ${buses.slice(0, 8).map(b => b.name).join(', ')}. Tap any bus for its full stop list, fare and live location.` },
        },
        {
          '@type': 'Question',
          name: `How much is the bus fare from ${fromName.en} to ${toName.en}?`,
          acceptedAnswer: { '@type': 'Answer', text: `The bus fare from ${fromName.en} to ${toName.en} is distance-based (typically ৳10–৳40 depending on bus type and distance). Open any bus listed above and use the fare calculator for the exact amount.` },
        },
        {
          '@type': 'Question',
          name: `How many buses run from ${fromName.en} to ${toName.en}?`,
          acceptedAnswer: { '@type': 'Answer', text: `${count} bus${count === 1 ? '' : 'es'} cover the ${fromName.en} to ${toName.en} route on KoyJabo. See the full list above with stops and schedules.` },
        },
      ],
    });
  }, [pair, interchange, buses, leg1Buses, leg2Buses, fromName.en, fromName.bn, toName.en, toName.bn, viaName.en, viaName.bn]);

  // ── Dynamic multi-option transit UI ──────────────────────────────────────
  if (isInterchange && hasTransitGroups) {
    const busChip = (bus: (typeof BUS_DATA)[0], fromId: string, toId: string) => (
      <button key={bus.id}
        onClick={() => { trackBusSearch(bus.id, bus.name); cancelPushEvent('search-check'); cancelPushEvent('search-tomorrow'); onNav('bus-detail', { busId: bus.id, from: fromId, to: toId }); }}
        style={{
          display: 'inline-flex', alignItems: 'center',
          background: `${tk.primary}15`, border: `1px solid ${tk.primary}35`,
          borderRadius: 999, padding: '4px 10px', cursor: 'pointer',
          fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: 700,
          color: tk.primary, whiteSpace: 'nowrap', flexShrink: 0,
        }}>
        {lang === 'bn' ? bus.bnName : bus.name}
      </button>
    );

    const transitGroupCard = (group: TransitGroup, idx: number) => (
      <div key={group.id} style={{ ...card(16), marginBottom: 14 }}>
        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: tk.primary, color: '#fff', borderRadius: 999,
              width: 22, height: 22, display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', fontFamily: SANS, fontSize: 11, fontWeight: 800, flexShrink: 0,
            }}>{idx + 1}</span>
            <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 15, fontWeight: 800, color: tk.text }}>
              {lang === 'bn'
                ? `${group.leg1FromBnLabel} → ${group.viaBnLabel} → ${group.leg2ToBnLabel}`
                : `Via ${group.viaLabel}`}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textDim, background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 999, padding: '3px 8px' }}>
              ~৳{group.approxFare}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textDim, background: tk.panelMuted, border: `1px solid ${tk.line}`, borderRadius: 999, padding: '3px 8px' }}>
              ~{group.approxMinutes}{T(lang, 'মি', 'm')}
            </span>
          </div>
        </div>

        {/* Leg 1 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: 700, color: tk.textDim, marginBottom: 8 }}>
            {lang === 'bn'
              ? `ধাপ ১: ${group.leg1FromBnLabel} → ${group.viaBnLabel} (যেকোনো বাসে)`
              : `Step 1: ${group.leg1FromLabel} → ${group.viaLabel} (take any bus)`}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {group.leg1Buses.slice(0, 8).map(bus => busChip(bus, from, group.viaId))}
            {group.leg1Buses.length > 8 && (
              <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, alignSelf: 'center' }}>
                +{group.leg1Buses.length - 8} {T(lang, 'আরও', 'more')}
              </span>
            )}
          </div>
        </div>

        {/* Transfer badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0',
          padding: '8px 12px', borderRadius: 10,
          background: `${tk.primary}10`, border: `1px solid ${tk.primary}30`,
        }}>
          <span style={{ fontSize: 16 }}>⇅</span>
          <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: 700, color: tk.primary }}>
            {lang === 'bn'
              ? `${group.viaBnLabel} এ নামুন — বাস বদল করুন`
              : `Get off at ${group.viaLabel} — change bus`}
          </span>
        </div>

        {/* Leg 2 */}
        <div>
          <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 12, fontWeight: 700, color: tk.textDim, marginBottom: 8 }}>
            {lang === 'bn'
              ? `ধাপ ২: ${group.viaBnLabel} → ${group.leg2ToBnLabel} (যেকোনো বাসে)`
              : `Step 2: ${group.viaLabel} → ${group.leg2ToLabel} (take any bus)`}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {group.leg2Buses.slice(0, 8).map(bus => busChip(bus, group.viaId, to))}
            {group.leg2Buses.length > 8 && (
              <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, alignSelf: 'center' }}>
                +{group.leg2Buses.length - 8} {T(lang, 'আরও', 'more')}
              </span>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <PageShell {...props}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? 16 : 32 }}>
          {/* Route header */}
          <div style={card()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 22, fontWeight: 800 }}>
                {T(lang, `${fromName.bn} → ${toName.bn}`, `${fromName.en} → ${toName.en}`)}
              </span>
              <span style={{ color: tk.textDim, fontSize: 13 }}>
                {T(lang, 'সরাসরি বাস নেই — বাস বদল করুন', 'No direct bus — change buses')}
              </span>
            </div>
            <p style={{ color: tk.textDim, margin: '8px 0 0', fontSize: 13 }}>
              {lang === 'bn'
                ? `${fromName.bn} থেকে ${toName.bn} সরাসরি কোনো বাস নেই। নিচে ${N(transitGroups.length, lang)}টি সম্ভাব্য বাস বদলের পথ দেওয়া হয়েছে। যেটা সুবিধাজনক সেটা বেছে নিন।`
                : `No direct bus from ${fromName.en} to ${toName.en}. ${N(transitGroups.length, lang)} possible transit routes are shown below — pick the one that works for you.`}
            </p>
          </div>

          {/* Transit option cards */}
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 15, margin: '0 0 12px', color: tk.textDim }}>
              {T(lang, 'বাস বদলের সম্ভাব্য পথ', 'Possible transit routes')}
            </h2>
            {transitGroups.map((group, idx) => transitGroupCard(group, idx))}
          </div>

          <div style={{ marginTop: 12 }}>
            <AdSlot tk={tk} lang={lang} />
          </div>

          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 17, margin: '0 0 10px' }}>
              {T(lang, 'আরও জনপ্রিয় রুট', 'More popular routes')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
              {BUS_PAIRS.slice(0, 8).map(p => (
                <a key={`${p.from}-${p.to}`} href={pairPath(p)}
                  onClick={(e) => { e.preventDefault(); onNav('from-to-bus', { from: p.from, to: p.to }); }}
                  style={{ ...card(12), textDecoration: 'none', color: tk.text, fontSize: 13, fontWeight: 600 }}>
                  {T(lang, `${p.fromBn} → ${p.toBn}`, `${p.fromEn} → ${p.toEn}`)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  // ── Legacy single-interchange (hardcoded SEO pairs fallback) ──────────────
  if (isInterchange && interchange) {
    const leg = (title: string, list: typeof BUS_DATA, src: { en: string; bn: string }, dst: { en: string; bn: string }, srcId: string, dstId: string) => (
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontWeight: 700, fontSize: 14, margin: '0 0 8px' }}>
          {title}
        </div>
        {list.length === 0 && (
          <div style={{ color: tk.textDim, fontSize: 13, marginBottom: 8 }}>
            {T(lang, 'কোনো সরাসরি বাস পাওয়া যায়নি।', 'No direct bus found.')}
          </div>
        )}
        {list.map(bus => {
          const approxFare = bus.type === 'AC' ? 60 : bus.type === 'Double-Decker' ? 50 : 30;
          return (
            <button key={bus.id} onClick={() => { trackBusSearch(bus.id, bus.name); cancelPushEvent('search-check'); cancelPushEvent('search-tomorrow'); onNav('bus-detail', { busId: bus.id, from: srcId, to: dstId }); }}
              style={{ ...card(14), display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 10, color: tk.text }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontWeight: 800, fontFamily: lang === 'bn' ? BEN : SANS }}>
                  {lang === 'bn' ? bus.bnName : bus.name}
                </span>
                <span style={{ fontSize: 12, color: tk.textDim, background: `${tk.primary}18`, border: `1px solid ${tk.primary}40`, borderRadius: 999, padding: '2px 8px' }}>
                  ~৳{approxFare}
                </span>
              </div>
              <div style={{ fontSize: 13, color: tk.textDim, marginTop: 6 }}>
                {T(lang, `${stopDisplay(bus.stops[0]).bn} ⇄ ${stopDisplay(bus.stops[bus.stops.length - 1]).bn}`, `${stopDisplay(bus.stops[0]).en} ⇄ ${stopDisplay(bus.stops[bus.stops.length - 1]).en}`)}
                <span style={{ marginLeft: 8, fontSize: 11 }}>{bus.type} · {bus.hours}</span>
              </div>
            </button>
          );
        })}
      </div>
    );
    return (
      <PageShell {...props}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? 16 : 32 }}>
          <div style={card()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 22, fontWeight: 800 }}>
                {T(lang, `${fromName.bn} → ${toName.bn}`, `${fromName.en} → ${toName.en}`)}
              </span>
              <span style={{ color: tk.textDim, fontSize: 13 }}>
                {T(lang, 'সরাসরি বাস নেই — বাস বদল করুন', 'No direct bus — change buses')}
              </span>
            </div>
            <p style={{ color: tk.textDim, margin: '8px 0 0', fontSize: 13 }}>
              {lang === 'bn'
                ? `${fromName.bn} থেকে ${viaName.bn} যান, তারপর ${viaName.bn} থেকে ${toName.bn} বাস নিন। নিচে দুই ধাপের বাস তালিকা।`
                : `No direct bus from ${fromName.en} to ${toName.en}. Go to ${viaName.en} first, then take a ${toName.en} bus. Two-leg plan below.`}
            </p>
          </div>

          <div style={{ marginTop: 16 }}>
            {leg(
              T(lang, `ধাপ ১: ${fromName.bn} → ${viaName.bn} (${N(leg1Buses.length, lang)}টি বাস)`, `Step 1: ${fromName.en} → ${viaName.en} (${N(leg1Buses.length, lang)} buses)`),
              leg1Buses, fromName, viaName, interchange.from, interchange.via
            )}
            <div style={{ ...card(12), marginBottom: 10, background: `${tk.primary}10`, borderColor: `${tk.primary}40` }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>
                {lang === 'bn'
                  ? `⇅ ${viaName.bn} এ নামুন এবং বাস বদল করুন`
                  : `⇅ Get off at ${viaName.en} and change bus`}
              </span>
            </div>
            {leg(
              T(lang, `ধাপ ২: ${viaName.bn} → ${toName.bn} (${N(leg2Buses.length, lang)}টি বাস)`, `Step 2: ${viaName.en} → ${toName.en} (${N(leg2Buses.length, lang)} buses)`),
              leg2Buses, viaName, toName, interchange.via, interchange.to
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <AdSlot tk={tk} lang={lang} />
          </div>

          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 17, margin: '0 0 10px' }}>
              {T(lang, 'সাধারণ প্রশ্ন', 'Common questions')}
            </h2>
            <div style={{ ...card(12), marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                {T(lang, `${fromName.bn} থেকে ${toName.bn} সরাসরি বাস আছে কি?`, `Is there a direct bus from ${fromName.en} to ${toName.en}?`)}
              </div>
              <div style={{ color: tk.textDim, fontSize: 13 }}>
                {lang === 'bn'
                  ? `না, ${fromName.bn} থেকে ${toName.bn} সরাসরি বাস নেই। ${fromName.bn} বাসে ${viaName.bn} গিয়ে সেখানে ${toName.bn} গামী বাস ধরতে হবে।`
                  : `No direct bus runs from ${fromName.en} to ${toName.en}. Take a ${fromName.en} bus to ${viaName.en} and change there for a ${toName.en} bus.`}
              </div>
            </div>
            <div style={{ ...card(12), marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                {T(lang, `${fromName.bn} থেকে ${toName.bn} বাস ভাড়া কত?`, `How much is the bus fare from ${fromName.en} to ${toName.en}?`)}
              </div>
              <div style={{ color: tk.textDim, fontSize: 13 }}>
                {lang === 'bn'
                  ? `${fromName.bn}→${viaName.bn} এবং ${viaName.bn}→${toName.bn} দুই ধাপ মিলিয়ে মোট ভাড়া সাধারণত ৳২০–৳৬০।`
                  : `Fare is the sum of two legs: ${fromName.en}→${viaName.en} plus ${viaName.en}→${toName.en}, typically ৳20–৳60 in total.`}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 17, margin: '0 0 10px' }}>
              {T(lang, 'আরও জনপ্রিয় রুট', 'More popular routes')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
              {BUS_PAIRS.slice(0, 8).map(p => (
                <a key={`${p.from}-${p.to}`} href={pairPath(p)}
                  onClick={(e) => { e.preventDefault(); onNav('from-to-bus', { from: p.from, to: p.to }); }}
                  style={{ ...card(12), textDecoration: 'none', color: tk.text, fontSize: 13, fontWeight: 600 }}>
                  {T(lang, `${p.fromBn} → ${p.toBn}`, `${p.fromEn} → ${p.toEn}`)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  if (!pair) {
    return (
      <PageShell {...props}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? 16 : 32 }}>
          <div style={card()}>
            <h1 style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 22, margin: '0 0 8px' }}>{T(lang, 'বাস খুঁজুন', 'Find a bus')}</h1>
            <p style={{ color: tk.textDim, margin: 0 }}>{T(lang, 'কোন বাসে যাবেন তা জানতে নিচের জনপ্রিয় রুট দেখুন।', 'See popular routes below to find the right bus.')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10, marginTop: 16 }}>
            {BUS_PAIRS.map(p => (
              <a key={`${p.from}-${p.to}`} href={pairPath(p)}
                onClick={(e) => { e.preventDefault(); onNav('from-to-bus', { from: p.from, to: p.to }); }}
                style={{ ...card(14), textDecoration: 'none', color: tk.text, display: 'block' }}>
                <span style={{ fontWeight: 700, fontFamily: lang === 'bn' ? BEN : SANS }}>
                  {T(lang, `${p.fromBn} → ${p.toBn}`, `${p.fromEn} → ${p.toEn}`)}
                </span>
                <span style={{ color: tk.textDim, fontSize: 12 }}> — {T(lang, 'কোন বাসে যাবেন', 'which bus')}</span>
              </a>
            ))}
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell {...props}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? 16 : 32 }}>
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 24, fontWeight: 800 }}>
              {T(lang, `${fromName.bn} → ${toName.bn}`, `${fromName.en} → ${toName.en}`)}
            </span>
            <span style={{ color: tk.textDim, fontSize: 13 }}>
              {T(lang, `${N(buses.length, lang)}টি বাস এই রুটে চলাচল করে`, `${N(buses.length, lang)} bus${buses.length === 1 ? '' : 'es'} on this route`)}
            </span>
          </div>
          <p style={{ color: tk.textDim, margin: '8px 0 0', fontSize: 13 }}>
            {lang === 'bn'
              ? `${fromName.bn} থেকে ${toName.bn} যেতে কোন বাস নেবেন — নিচের তালিকা থেকে বাস বাছুন।`
              : `Which bus goes from ${fromName.en} to ${toName.en}? Pick a bus below for its full stop list, fare and live location.`}
          </p>
        </div>

        <div style={{ marginTop: 16 }}>
          {buses.map((bus, i) => {
            const startName = stopDisplay(bus.stops[0]);
            const endName = stopDisplay(bus.stops[bus.stops.length - 1]);
            const approxFare = bus.type === 'AC' ? 60 : bus.type === 'Double-Decker' ? 50 : 30;
            return (
              <button key={bus.id} onClick={() => { trackBusSearch(bus.id, bus.name); cancelPushEvent('search-check'); cancelPushEvent('search-tomorrow'); onNav('bus-detail', { busId: bus.id, from: pair.from, to: pair.to }); }}
                style={{ ...card(14), display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 10, color: tk.text }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 800, fontFamily: lang === 'bn' ? BEN : SANS }}>
                    {lang === 'bn' ? bus.bnName : bus.name}
                  </span>
                  <span style={{ fontSize: 12, color: tk.textDim, background: `${tk.primary}18`, border: `1px solid ${tk.primary}40`, borderRadius: 999, padding: '2px 8px' }}>
                    {T(lang, `~৳${approxFare}`, `~৳${approxFare}`)}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: tk.textDim, marginTop: 6 }}>
                  {T(lang, `${startName.bn} ⇄ ${endName.bn}`, `${startName.en} ⇄ ${endName.en}`)}
                  <span style={{ marginLeft: 8, fontSize: 11 }}>{bus.type} · {bus.hours}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <AdSlot tk={tk} lang={lang} />
        </div>

        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: 17, margin: '0 0 10px' }}>
            {T(lang, 'আরও জনপ্রিয় রুট', 'More popular routes')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
            {BUS_PAIRS.filter(p => p.from !== pair.from || p.to !== pair.to).map(p => (
              <a key={`${p.from}-${p.to}`} href={pairPath(p)}
                onClick={(e) => { e.preventDefault(); onNav('from-to-bus', { from: p.from, to: p.to }); }}
                style={{ ...card(12), textDecoration: 'none', color: tk.text, fontSize: 13, fontWeight: 600 }}>
                {T(lang, `${p.fromBn} → ${p.toBn}`, `${p.fromEn} → ${p.toEn}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
