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
        borderRadius: 20,
        overflow: 'hidden',
        background: tk.panel,
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: `1px solid ${tk.line}`,
        boxShadow: tk.shadow,
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      <div style={{ position: 'relative', height: 132, background: tk.panelMuted }}>
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
              background: 'rgba(0,0,0,0.65)', color: '#ffb800',
              padding: '3px 9px', borderRadius: 999,
              fontFamily: SANS, fontSize: 11, fontWeight: 700,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            ★ {rating.toFixed(1)}
          </span>
        )}
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <p style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: tk.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: -0.2 }}>
          {lang === 'bn' ? (place.bn || place.en) : place.en}
        </p>
        <p style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, margin: '4px 0 0' }}>
          {[place.district, place.division].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  );
}
