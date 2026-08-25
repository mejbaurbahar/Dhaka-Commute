import React, { useEffect, useState } from 'react';
import { Tokens, Lang, SANS, T } from '../tokens';
import { STATIONS } from '../../../constants';

// Home-page location chip. Shows the detected area when the user has allowed
// location; otherwise shows an "enable location" button that runs the same
// nearest-station resolution as the consent modal in KoyJaboApp.
export function LocationChip({ tk, lang }: { tk: Tokens; lang: Lang }) {
  const [consent, setConsent] = useState<string | null>(() => localStorage.getItem('kj-location-consent'));
  const [area, setArea] = useState<string | null>(() => localStorage.getItem('kj-location-area'));
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const onStorage = () => {
      setConsent(localStorage.getItem('kj-location-consent'));
      setArea(localStorage.getItem('kj-location-area'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Resolve GPS coords to the nearest bus stop (same logic as enable()).
  const resolveArea = (lat: number, lng: number): string => {
    type Geo = { lat: number; lng: number; name: string };
    const stList = Object.values(STATIONS).filter((s) => Boolean((s as Geo).lat && (s as Geo).lng)) as unknown as Geo[];
    let best = stList[0];
    let bestD = Infinity;
    for (const s of stList) {
      const d = (s.lat - lat) ** 2 + (s.lng - lng) ** 2;
      if (d < bestD) { bestD = d; best = s; }
    }
    return best?.name || 'Dhaka';
  };

  // Once the user has consented, keep the area in sync with their GPS —
  // watchPosition fires continuously as they move, so the header never
  // shows a stale area from a previous visit.
  useEffect(() => {
    if (consent !== 'yes' || typeof navigator === 'undefined' || !navigator.geolocation) return;
    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        const name = resolveArea(pos.coords.latitude, pos.coords.longitude);
        localStorage.setItem('kj-location-area', name);
        setArea(name);
      },
      () => {
        // Permission lost / GPS unavailable — keep the last known area.
      },
      { timeout: 15000, maximumAge: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, [consent]);

  const enable = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      localStorage.setItem('kj-location-consent', 'no');
      setConsent('no');
      return;
    }
    setLocating(true);
    localStorage.setItem('kj-location-consent', 'yes');
    setConsent('yes');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const name = resolveArea(pos.coords.latitude, pos.coords.longitude);
        localStorage.setItem('kj-location-area', name);
        setArea(name);
        setLocating(false);
      },
      () => {
        localStorage.setItem('kj-location-consent', 'no');
        setConsent('no');
        setLocating(false);
      },
      { timeout: 8000, maximumAge: 0 }
    );
  };

  if (consent === 'yes' && area) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: tk.textFaint }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tk.accent, animation: 'kjpulse 1.5s ease-in-out infinite', display: 'inline-block' }} />
          📍 {T(lang, `আপনার এলাকা: ${area}`, `Your area: ${area}`)}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <button
        onClick={enable}
        disabled={locating}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: `${tk.primary}14`, border: `1px solid ${tk.primaryDeep}55`,
          borderRadius: 999, padding: '5px 12px', cursor: 'pointer',
          fontFamily: lang === 'bn' ? 'inherit' : SANS, fontSize: 12, fontWeight: 600,
          color: tk.primaryDeep,
        }}
      >
        {locating ? T(lang, 'অবস্থান খোঁজা হচ্ছে…', 'Locating…') : T(lang, '📍 অবস্থান চালু করুন', '📍 Enable location')}
      </button>
    </div>
  );
}
