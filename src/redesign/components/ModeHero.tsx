import React from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';
import { Bus3D, Train3D, Plane3D, Launch3D, Truck3D } from './Vehicles3D';

type VehicleKind = 'bus' | 'train' | 'plane' | 'launch' | 'truck';

interface Stat { v: string; l: string; }

interface ModeHeroProps {
  tk: Tokens;
  isMobile: boolean;
  lang: Lang;
  kind: VehicleKind;
  gradient: string;
  title: string;
  subtitle: string;
  stats: Stat[];
}

function Vehicle3D({ kind, size }: { kind: VehicleKind; size: number }) {
  if (kind === 'bus') return <Bus3D size={size}/>;
  if (kind === 'train') return <Train3D size={size}/>;
  if (kind === 'plane') return <Plane3D size={size}/>;
  if (kind === 'truck') return <Truck3D size={size}/>;
  return <Launch3D size={size}/>;
}

const KIND_LABEL: Record<VehicleKind, { bn: string; en: string }> = {
  bus:    { bn: 'লোকাল বাস', en: 'LOCAL BUS' },
  train:  { bn: 'ট্রেন',    en: 'TRAIN' },
  plane:  { bn: 'বিমান',    en: 'FLIGHTS' },
  launch: { bn: 'লঞ্চ',     en: 'LAUNCH' },
  truck:  { bn: 'ট্রাক',    en: 'TRUCK' },
};

export function ModeHero({ tk, isMobile, lang, kind, gradient, title, subtitle, stats }: ModeHeroProps) {
  const kindLbl = KIND_LABEL[kind];

  return (
    <div style={{
      borderRadius: 24, overflow: 'hidden', position: 'relative',
      background: gradient, color: '#fff',
      padding: isMobile ? '20px 18px 0' : '32px 32px 0',
      marginBottom: 18, boxShadow: tk.shadowLg,
      minHeight: isMobile ? 220 : 270,
    }}>
      {/* Grid overlay — futuristic depth */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', right: -60, top: -70, width: 260, height: 260,
        borderRadius: 999, background: 'rgba(255,255,255,0.12)',
        animation: 'kjpulse 3.5s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', left: '35%', bottom: -90, width: 220, height: 220,
        borderRadius: 999, background: 'rgba(255,255,255,0.07)',
        pointerEvents: 'none',
      }}/>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px', minWidth: 0 }} className="kj-enter-1">
          {/* Mode breadcrumb */}
          <span style={{
            fontFamily: SANS, fontSize: 10, fontWeight: 800,
            letterSpacing: 1.8, opacity: 0.8, textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              display: 'inline-block',
            }}/>
            KoyJabo · {T(lang, kindLbl.bn, kindLbl.en)}
          </span>

          {/* Title */}
          <h1 className="kj-hero-title" style={{
            fontFamily: BEN,
            fontSize: isMobile ? 24 : 36,
            fontWeight: 700,
            margin: '8px 0 10px',
            letterSpacing: -0.6,
            lineHeight: 1.15,
            color: '#fff',
          }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: BEN,
            fontSize: isMobile ? 12 : 13,
            opacity: 0.88,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 460,
          }}>
            {subtitle}
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 0, marginTop: 20,
            background: 'rgba(0,0,0,0.18)',
            borderRadius: 14, overflow: 'hidden',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            width: 'fit-content',
            maxWidth: '100%',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? '10px 14px' : '12px 18px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                minWidth: isMobile ? 60 : 80,
              }}>
                <div className="kj-stat" style={{
                  fontFamily: SANS, fontWeight: 800,
                  fontSize: isMobile ? 16 : 20,
                  letterSpacing: -0.5,
                  lineHeight: 1,
                  color: '#fff',
                }}>{s.v}</div>
                <div style={{
                  fontFamily: SANS, fontSize: 9, fontWeight: 700,
                  letterSpacing: 0.8, opacity: 0.75,
                  textTransform: 'uppercase', marginTop: 4,
                  color: '#fff',
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D vehicle — bottom-right, peeking out */}
        <div style={{
          flexShrink: 0, alignSelf: 'flex-end',
          marginBottom: isMobile ? -18 : -8,
          overflow: 'hidden', opacity: 0.92,
        }}>
          <Vehicle3D kind={kind} size={isMobile ? 150 : 260}/>
        </div>
      </div>
    </div>
  );
}
