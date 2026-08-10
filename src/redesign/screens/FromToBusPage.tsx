import React, { useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot } from '../components/AdSlot';
import { BUS_DATA, STATIONS } from '../../../constants';
import { BUS_PAIRS, findPair, pairPath } from '../busPairs';
import { trackBusSearch } from '../../../services/analyticsService';
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
  const buses = pair
    ? BUS_DATA.filter(b => b.stops.some(s => s.startsWith(pair.from)) && b.stops.some(s => s.startsWith(pair.to)))
    : [];
  const fromName = pair ? { en: pair.fromEn, bn: pair.fromBn } : { en: from, bn: from };
  const toName = pair ? { en: pair.toEn, bn: pair.toBn } : { en: to, bn: to };

  useDocumentTitle(lang === 'bn'
    ? `${fromName.bn} থেকে ${toName.bn} বাস — কোন বাসে যাবেন | কই যাবো`
    : `${fromName.en} to ${toName.en} bus — which bus goes there | KoyJabo`);

  useEffect(() => {
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
  }, [pair, buses, fromName.en, fromName.bn, toName.en, toName.bn]);

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
              <button key={bus.id} onClick={() => { trackBusSearch(bus.id, bus.name); onNav('bus-detail', { busId: bus.id, from: pair.from, to: pair.to }); }}
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
