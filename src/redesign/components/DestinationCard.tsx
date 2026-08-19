import React from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang } from '../tokens';
import { DESTINATION_ENRICHMENT } from '../../../data/destinationEnrichment';
import type { Place } from '../../../data/bangladeshPlaces';

const TYPE_ICON: Record<string, string> = { tourist: '🏖️', historical: '🏛️', landmark: '🗼' };

interface Props {
  place: Place;
  theme: 'dark' | 'light';
  lang: Lang;
  onClick: () => void;
}

export function DestinationCard({ place, theme, lang, onClick }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const font = lang === 'bn' ? BEN : SANS;
  const enr = DESTINATION_ENRICHMENT[place.id];
  const photo = enr?.photos?.[0];
  const rating = enr?.gmRating;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter') onClick(); }}
      aria-label={`${place.en} — ${place.bn}`}
      style={{
        cursor: 'pointer',
        borderRadius: 18,
        overflow: 'hidden',
        background: tk.panel,
        border: `1px solid ${tk.line}`,
        boxShadow: '0 8px 24px -12px rgba(0,0,0,0.25)',
        transition: 'transform .18s ease, box-shadow .18s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      <div style={{ position: 'relative', height: 128, background: tk.panelMuted }}>
        {photo ? (
          <img
            src={photo}
            alt={place.en}
            loading="lazy"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>
            {TYPE_ICON[place.type] ?? '📍'}
          </div>
        )}
        {rating && (
          <span
            style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(0,0,0,0.55)', color: '#ffd54f',
              padding: '3px 8px', borderRadius: 999,
              fontFamily: SANS, fontSize: 12, fontWeight: 700,
              backdropFilter: 'blur(6px)',
            }}
          >
            ★ {rating.toFixed(1)}
          </span>
        )}
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: tk.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {lang === 'bn' ? (place.bn || place.en) : place.en}
        </p>
        <p style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, margin: '3px 0 0' }}>
          {[place.district, place.division].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  );
}
