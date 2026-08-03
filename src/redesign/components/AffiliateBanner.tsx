import React, { useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

/**
 * AffiliateBanner — Munzeerin Shahid "ঘরে বসে Spoken English" affiliate card.
 * Renders a premium card-style banner with the affiliate link.
 * Preserves all Google AdSense / fixed ad slots — this is additive only.
 */
export function AffiliateBanner({
  tk,
  lang,
  compact = false,
}: {
  tk: Tokens;
  lang: Lang;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const AFFILIATE_URL = 'https://rkmri.co/00oMTAyRMISe/';

  const handleClick = () => {
    window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        borderRadius: compact ? 14 : 18,
        overflow: 'hidden',
        background: hovered
          ? 'linear-gradient(135deg, #1a1060 0%, #0f2a5e 40%, #0c3f7a 100%)'
          : 'linear-gradient(135deg, #0d0a2e 0%, #0a1f4e 40%, #0a3166 100%)',
        border: `1.5px solid ${hovered ? '#00c8f0' : 'rgba(0,200,240,0.25)'}`,
        boxShadow: hovered
          ? '0 8px 32px rgba(0,200,240,0.25), 0 2px 8px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.35)',
        transition: 'all 0.22s ease',
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 10 : 14,
        padding: compact ? '10px 14px' : '14px 18px',
        width: '100%',
        boxSizing: 'border-box' as const,
        position: 'relative' as const,
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,240,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Book / English icon badge */}
      <div
        style={{
          flexShrink: 0,
          width: compact ? 44 : 52,
          height: compact ? 44 : 52,
          borderRadius: compact ? 10 : 14,
          background: 'linear-gradient(135deg, #00c8f0 0%, #0070c0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: compact ? 20 : 24,
          boxShadow: '0 4px 12px rgba(0,200,240,0.35)',
        }}
      >
        📚
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(0,200,240,0.15)',
            border: '1px solid rgba(0,200,240,0.3)',
            borderRadius: 999,
            padding: '2px 8px',
            marginBottom: 4,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#00c8f0',
              display: 'inline-block',
              animation: 'kj-affiliate-blink 1.5s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: SANS,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: 'uppercase' as const,
              color: '#00c8f0',
            }}
          >
            {T(lang, 'স্পনসরড', 'Sponsored')}
          </span>
        </div>

        <div
          style={{
            fontFamily: BEN,
            fontWeight: 800,
            fontSize: compact ? 13 : 14,
            color: '#ffffff',
            lineHeight: 1.25,
            marginBottom: 3,
          }}
        >
          {T(lang, 'ঘরে বসে Spoken English', 'ঘরে বসে Spoken English')}
        </div>

        <div
          style={{
            fontFamily: BEN,
            fontSize: compact ? 11 : 12,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.35,
          }}
        >
          {T(
            lang,
            'Grammar ছাড়াই ইংরেজি বলার উপায় — by মুনজেরিন শহীদ',
            'Grammar ছাড়াই ইংরেজি বলার উপায় — by মুনজেরিন শহীদ',
          )}
        </div>
      </div>

      {/* CTA Arrow */}
      <div
        style={{
          flexShrink: 0,
          width: compact ? 32 : 38,
          height: compact ? 32 : 38,
          borderRadius: compact ? 8 : 10,
          background: hovered
            ? 'linear-gradient(135deg, #00c8f0, #0070c0)'
            : 'rgba(0,200,240,0.15)',
          border: `1px solid ${hovered ? 'transparent' : 'rgba(0,200,240,0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00c8f0',
          fontSize: 16,
          fontWeight: 800,
          transition: 'all 0.22s ease',
        }}
      >
        <span style={{ color: hovered ? '#fff' : '#00c8f0' }}>→</span>
      </div>

      {/* Keyframe for blinking dot */}
      <style>{`
        @keyframes kj-affiliate-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
