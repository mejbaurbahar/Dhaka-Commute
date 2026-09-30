import React, { useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

const FAB_STYLES = `
/* Positioned by the fixed wrapper in KoyJaboApp (anchor-ad aware bottom) */
.kj-ai-fab {
  display: flex;
  align-items: center;
  gap: 10px;
}
@keyframes kjAiFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes kjAiRing {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.7); opacity: 0; }
}
@keyframes kjAiThink {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes kj-ai-eye-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
@keyframes kj-ai-eye2-blink {
  0%, 85%, 100% { transform: scaleY(1); }
  90% { transform: scaleY(0.1); }
}
`;

let fabStylesInjected = false;
function injectFabStyles() {
  if (fabStylesInjected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = FAB_STYLES;
  document.head.appendChild(el);
  fabStylesInjected = true;
}

interface AIFabProps {
  tk: Tokens;
  lang: Lang;
  onNav: () => void;
}

export function AIFab({ tk, lang, onNav }: AIFabProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="kj-ai-fab" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Hover label */}
      <div
        style={{
          background: tk.panel,
          border: `1px solid ${tk.line}`,
          borderRadius: 999,
          padding: '6px 14px',
          fontFamily: lang === 'bn' ? BEN : SANS,
          fontSize: 12,
          fontWeight: 600,
          color: tk.text,
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: tk.shadowMuted,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
          transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        {T(lang, 'AI সহায়ক · জিজ্ঞাসা করুন', 'AI Assistant · ask me')}
      </div>

      {/* FAB button */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {/* Apple Intelligence subtle ambient aura */}
        <div
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 999,
            background: 'linear-gradient(135deg, rgba(0,113,227,0.4), rgba(168,85,247,0.4), rgba(255,55,95,0.4))',
            filter: 'blur(8px)',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />

        {/* Main button */}
        <button
          onClick={onNav}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={T(lang, 'AI সহায়ক', 'AI Assistant')}
          style={{
            width: 54,
            height: 54,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            background: 'linear-gradient(145deg, #0071e3 0%, #7c3aed 50%, #ff375f 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 113, 227, 0.35)',
            position: 'relative',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        >
          {/* Apple Intelligence Sparkle Glyph */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
