import React, { useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

const AFFILIATE_URL = 'https://rkmri.co/00oMTAyRMISe/';
const AFFILIATE_IMAGE = '/images/spoken-english-affiliate.jpg';
const FALLBACK_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ggR7qjHddhAVpSNO0vzd3EFe8z1eguVWSBoxogYKZg&s=10';

export interface AffiliateBannerProps {
  tk: Tokens;
  lang: Lang;
  variant?: 'hero' | 'mid' | 'compact';
  compact?: boolean; // backwards compatibility
  className?: string;
}

export function AffiliateBanner({
  tk,
  lang,
  variant,
  compact = false,
  className = '',
}: AffiliateBannerProps) {
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(AFFILIATE_IMAGE);

  const activeVariant = variant || (compact ? 'compact' : 'mid');

  const handleClick = () => {
    window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleImgError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  if (activeVariant === 'hero') {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`kj-affiliate-hero ${className}`}
        style={{
          cursor: 'pointer',
          borderRadius: 20,
          overflow: 'hidden',
          background: hovered
            ? 'linear-gradient(135deg, #09132e 0%, #0d214d 50%, #092e5c 100%)'
            : 'linear-gradient(135deg, #050b1a 0%, #081738 50%, #062247 100%)',
          border: `2px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.3)'}`,
          boxShadow: hovered
            ? '0 12px 40px rgba(0,240,255,0.3), 0 0 20px rgba(0,240,255,0.15)'
            : '0 6px 24px rgba(0,0,0,0.4)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          padding: '16px',
          transform: hovered ? 'translateY(-2px)' : 'none',
        }}
      >
        {/* Glow ambient background */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Course Thumbnail Image */}
          <div
            style={{
              position: 'relative',
              width: 130,
              height: 95,
              borderRadius: 14,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 6px 18px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
              background: '#09152b',
            }}
          >
            <img
              src={imgSrc}
              onError={handleImgError}
              alt="ঘরে বসে Spoken English by মুনজেরিন শহীদ"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: 6,
                left: 6,
                background: '#ff2a6d',
                color: '#fff',
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 4,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              BESTSELLER
            </span>
          </div>

          {/* Details */}
          <div style={{ flex: '1 1 200px', minWidth: 0 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(0,240,255,0.12)',
                border: '1px solid rgba(0,240,255,0.3)',
                borderRadius: 999,
                padding: '3px 10px',
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00f0ff',
                  boxShadow: '0 0 8px #00f0ff',
                  animation: 'kj-affiliate-pulse 1.5s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: '#00f0ff',
                  textTransform: 'uppercase',
                }}
              >
                {T(lang, 'স্পনসরড ডিল · 10 Minute School', 'SPONSORED OFFER · 10 MINUTE SCHOOL')}
              </span>
            </div>

            <h3
              style={{
                fontFamily: BEN,
                fontWeight: 800,
                fontSize: 17,
                color: '#ffffff',
                lineHeight: 1.25,
                margin: '0 0 4px 0',
              }}
            >
              {T(lang, 'ঘরে বসে Spoken English', 'Spoken English at Home')}
            </h3>

            <p
              style={{
                fontFamily: BEN,
                fontSize: 13,
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              Grammar শেখা ছাড়াই ইংরেজি বলার উপায় — <span style={{ color: '#00f0ff', fontWeight: 700 }}>by মুনজেরিন শহীদ</span>
            </p>
          </div>

          {/* Action button */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={handleClick}
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, #00f0ff 0%, #0070f0 100%)'
                  : 'linear-gradient(135deg, #00c8f0 0%, #0050d0 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 20px',
                fontFamily: BEN,
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,200,240,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              <span>{T(lang, 'এখনই ভর্তি হন', 'Enroll Now')}</span>
              <span style={{ fontSize: 16 }}>➔</span>
            </button>
          </div>
        </div>
        <style>{`
          @keyframes kj-affiliate-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
          }
        `}</style>
      </div>
    );
  }

  if (activeVariant === 'mid') {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`kj-affiliate-mid ${className}`}
        style={{
          cursor: 'pointer',
          borderRadius: 16,
          overflow: 'hidden',
          background: hovered
            ? 'linear-gradient(135deg, #0c1836 0%, #0e2754 100%)'
            : 'linear-gradient(135deg, #081026 0%, #0a1b3d 100%)',
          border: `1.5px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.25)'}`,
          boxShadow: hovered
            ? '0 8px 30px rgba(0,240,255,0.22)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.22s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '12px 16px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          transform: hovered ? 'translateY(-1px)' : 'none',
        }}
      >
        {/* Course Thumbnail Image */}
        <div
          style={{
            position: 'relative',
            width: 80,
            height: 60,
            borderRadius: 10,
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            background: '#09152b',
          }}
        >
          <img
            src={imgSrc}
            onError={handleImgError}
            alt="Spoken English by Munzereen Shahid"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'rgba(0,240,255,0.12)',
              border: '1px solid rgba(0,240,255,0.25)',
              borderRadius: 999,
              padding: '2px 7px',
              marginBottom: 3,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#00f0ff',
              }}
            />
            <span
              style={{
                fontFamily: SANS,
                fontSize: 9,
                fontWeight: 800,
                color: '#00f0ff',
                letterSpacing: 0.8,
              }}
            >
              {T(lang, 'স্পনসরড', 'SPONSORED')}
            </span>
          </div>

          <div
            style={{
              fontFamily: BEN,
              fontWeight: 800,
              fontSize: 14,
              color: '#ffffff',
              lineHeight: 1.25,
            }}
          >
            {T(lang, 'ঘরে বসে Spoken English', 'Spoken English at Home')}
          </div>

          <div
            style={{
              fontFamily: BEN,
              fontSize: 12,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.3,
            }}
          >
            Grammar শেখা ছাড়াই ইংরেজি বলুন — by মুনজেরিন শহীদ
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ flexShrink: 0 }}>
          <span
            style={{
              background: hovered ? '#00f0ff' : 'rgba(0,240,255,0.18)',
              color: hovered ? '#050b1a' : '#00f0ff',
              border: `1px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.4)'}`,
              borderRadius: 10,
              padding: '8px 14px',
              fontFamily: BEN,
              fontWeight: 800,
              fontSize: 13,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.2s ease',
            }}
          >
            {T(lang, 'অফার দেখুন', 'View Offer')} ➔
          </span>
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`kj-affiliate-compact ${className}`}
      style={{
        cursor: 'pointer',
        borderRadius: 12,
        overflow: 'hidden',
        background: hovered
          ? 'linear-gradient(135deg, #0d1b3a 0%, #0d2959 100%)'
          : 'linear-gradient(135deg, #091229 0%, #0a1d42 100%)',
        border: `1px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.25)'}`,
        boxShadow: hovered
          ? '0 6px 20px rgba(0,240,255,0.2)'
          : '0 3px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={imgSrc}
        onError={handleImgError}
        alt="Spoken English by Munzereen Shahid"
        style={{
          width: 50,
          height: 40,
          borderRadius: 8,
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: BEN,
            fontWeight: 800,
            fontSize: 13,
            color: '#ffffff',
            lineHeight: 1.2,
            truncate: 'ellipsis',
          }}
        >
          {T(lang, 'ঘরে বসে Spoken English', 'Spoken English at Home')}
        </div>
        <div
          style={{
            fontFamily: BEN,
            fontSize: 11,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          by মুনজেরিন শহীদ
        </div>
      </div>
      <div
        style={{
          color: '#00f0ff',
          fontSize: 16,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        ➔
      </div>
    </div>
  );
}
