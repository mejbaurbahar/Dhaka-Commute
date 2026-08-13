import React, { useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot } from '../components/AdSlot';
import { BUS_DATA, STATIONS } from '../../../constants';
import { BUS_PAIRS, findPair, pairPath, findInterchange, interchangePath } from '../busPairs';
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
  const via = params?.via ?? interchange?.via ?? '';
  const buses = pair
    ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(pair.from)) && b.stops.some(s => s.startsWith(pair.to)))
    : [];
  const fromName = pair ? { en: pair.fromEn, bn: pair.fromBn } : { en: from, bn: from };
  const toName = pair ? { en: pair.toEn, bn: pair.toBn } : { en: to, bn: to };

  const viaName = interchange
    ? { en: interchange.viaEn, bn: interchange.viaBn }
    : { en: via.replace(/_/g, ' '), bn: via.replace(/_/g, ' ') };
  const leg1Buses = interchange
    ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(interchange.from)) && b.stops.some(s => s.startsWith(interchange.via)))
    : [];
  const leg2Buses = interchange
    ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(interchange.via)) && b.stops.some(s => s.startsWith(interchange.to)))
    : [];
  const isInterchange = Boolean(interchange) && buses.length === 0;

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

  if (isInterchange && interchange) {
    const leg = (title: string, list: typeof BUS_DATA, src: { en: string; bn: string }, dst: { en: string; bn: string }, srcId: string, dstId: string) => (
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontWeight: 700, fontSize: 14, margin: '0 0 8px' }}>
          {title}
        </div>
        {list.length === 0 && (
          <div style={{ color: tk.textDim, fontSize: 13, marginBottom: 8 }}>
            {lang === 'bn' ? 'কোনো সরাসরি বাস পাওয়া যায়নি।' : 'No direct bus found.'}
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
                {lang === 'bn' ? `${stopDisplay(bus.stops[0]).bn} ⇄ ${stopDisplay(bus.stops[bus.stops.length - 1]).bn}` : `${stopDisplay(bus.stops[0]).en} ⇄ ${stopDisplay(bus.stops[bus.stops.length - 1]).en}`}
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
                {lang === 'bn' ? `${fromName.bn} → ${toName.bn}` : `${fromName.en} → ${toName.en}`}
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
              lang === 'bn' ? `ধাপ ১: ${fromName.bn} → ${viaName.bn} (${leg1Buses.length}টি বাস)` : `Step 1: ${fromName.en} → ${viaName.en} (${leg1Buses.length} buses)`,
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
              lang === 'bn' ? `ধাপ ২: ${viaName.bn} → ${toName.bn} (${leg2Buses.length}টি বাস)` : `Step 2: ${viaName.en} → ${toName.en} (${leg2Buses.length} buses)`,
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
                {lang === 'bn' ? `${fromName.bn} থেকে ${toName.bn} সরাসরি বাস আছে কি?` : `Is there a direct bus from ${fromName.en} to ${toName.en}?`}
              </div>
              <div style={{ color: tk.textDim, fontSize: 13 }}>
                {lang === 'bn'
                  ? `না, ${fromName.bn} থেকে ${toName.bn} সরাসরি বাস নেই। ${fromName.bn} বাসে ${viaName.bn} গিয়ে সেখানে ${toName.bn} গামী বাস ধরতে হবে।`
                  : `No direct bus runs from ${fromName.en} to ${toName.en}. Take a ${fromName.en} bus to ${viaName.en} and change there for a ${toName.en} bus.`}
              </div>
            </div>
            <div style={{ ...card(12), marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                {lang === 'bn' ? `${fromName.bn} থেকে ${toName.bn} বাস ভাড়া কত?` : `How much is the bus fare from ${fromName.en} to ${toName.en}?`}
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
                  {lang === 'bn' ? `${p.fromBn} → ${p.toBn}` : `${p.fromEn} → ${p.toEn}`}
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
                  {lang === 'bn' ? `${p.fromBn} → ${p.toBn}` : `${p.fromEn} → ${p.toEn}`}
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
              {lang === 'bn' ? `${fromName.bn} → ${toName.bn}` : `${fromName.en} → ${toName.en}`}
            </span>
            <span style={{ color: tk.textDim, fontSize: 13 }}>
              {T(lang, `${buses.length}টি বাস এই রুটে চলাচল করে`, `${buses.length} bus${buses.length === 1 ? '' : 'es'} on this route`)}
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
                  {lang === 'bn' ? `${startName.bn} ⇄ ${endName.bn}` : `${startName.en} ⇄ ${endName.en}`}
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
                {lang === 'bn' ? `${p.fromBn} → ${p.toBn}` : `${p.fromEn} → ${p.toEn}`}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
