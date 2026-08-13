import React from 'react';
import { Tokens, Lang, SANS, T } from '../tokens';

interface PageSkeletonProps {
  tk: Tokens;
  lang: Lang;
  isMobile: boolean;
}

const pulse = (tk: Tokens): React.CSSProperties => ({
  background: tk.panelMuted,
  borderRadius: 12,
  animation: 'kjpulse 1.6s ease-in-out infinite',
});

/**
 * Route-transition placeholder — shown for ~160ms while a new screen mounts
 * (KoyJaboApp sets showSkeleton during nav()). Prevents white flash.
 */
export function PageSkeleton({ tk, lang, isMobile }: PageSkeletonProps) {
  return (
    <div style={{ padding: isMobile ? '16px 14px 18px' : '24px 24px 32px', maxWidth: 1120, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Title line */}
      <div style={{ ...pulse(tk), width: isMobile ? '55%' : 220, height: 26, marginBottom: 18 }} />

      {/* Search card */}
      <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 20, padding: isMobile ? 16 : 20, marginBottom: 20 }}>
        <div style={{ ...pulse(tk), height: isMobile ? 52 : 48, width: '100%', marginBottom: 10 }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ ...pulse(tk), height: 44, flex: 1 }} />
          <div style={{ ...pulse(tk), height: 44, flex: 1 }} />
        </div>
      </div>

      {/* Feature tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 12 }}>
        {Array.from({ length: isMobile ? 6 : 8 }, (_, i) => (
          <div key={i} style={{ ...pulse(tk), height: isMobile ? 92 : 110 }} />
        ))}
      </div>

      {/* Section list rows */}
      <div style={{ marginTop: 22 }}>
        {Array.from({ length: isMobile ? 4 : 6 }, (_, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
            <div style={{ ...pulse(tk), width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ ...pulse(tk), width: '70%', height: 14, marginBottom: 8 }} />
              <div style={{ ...pulse(tk), width: '40%', height: 12 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, opacity: 0.6 }}>
          {T(lang, 'লোড হচ্ছে...', 'Loading...')}
        </span>
      </div>
    </div>
  );
}
