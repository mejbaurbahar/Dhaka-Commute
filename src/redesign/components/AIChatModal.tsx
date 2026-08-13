import React, { useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang } from '../tokens';
import { useAIChat } from '../hooks/useAIChat';
import { AIChatBody, AvatarAI } from './AIChatBody';

interface AIChatModalProps {
  theme: 'dark' | 'light';
  lang: 'bn' | 'en';
  isMobile: boolean;
  onClose: () => void;
  initialQ?: string;
}

/**
 * Global AI chat popup — opens over ANY page without navigating away.
 * Mobile: full-screen overlay. Desktop: centered dialog card.
 * Close via × button, Escape key, or backdrop click.
 */
export function AIChatModal({ theme, lang, isMobile, onClose, initialQ }: AIChatModalProps) {
  const tk: Tokens = KJ_TOKENS[theme];
  const chat = useAIChat(lang, initialQ);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const header = (
    <div style={{
      flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px', borderBottom: `1px solid ${tk.line}`,
      background: `linear-gradient(135deg,${tk.primarySoft} 0%,${tk.accentSoft ?? tk.panelMuted} 100%)`,
    }}>
      <AvatarAI tk={tk} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 800, color: tk.text }}>KoyJabo AI</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ fontFamily: BEN, fontSize: 11, color: tk.textDim }}>{T(lang, 'যেকোনো পরিবহন প্রশ্ন করুন', 'Ask any transport question')}</span>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label={T(lang, 'বন্ধ করুন', 'Close chat')}
        style={{
          width: 36, height: 36, borderRadius: 999, border: `1px solid ${tk.line}`,
          background: tk.panel, color: tk.text, cursor: 'pointer', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, lineHeight: 1, transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = tk.panelMuted; }}
        onMouseLeave={e => { e.currentTarget.style.background = tk.panel; }}
      >
        ✕
      </button>
    </div>
  );

  // 60% of screen height, blurred backdrop, rounded card.
  // Mobile: bottom sheet. Desktop: centered.
  const cardHeight = '60dvh';
  return (
    <div
      role="dialog" aria-modal="true" aria-label={T(lang, 'কই যাবো AI চ্যাট', 'KoyJabo AI chat')}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9500,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : 24,
        animation: 'kjFadeIn 0.18s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: isMobile ? '100%' : 'min(560px, calc(100vw - 48px))',
          height: cardHeight,
          maxWidth: '100%',
          background: tk.bg,
          border: isMobile ? 0 : `1px solid ${tk.line}`,
          borderRadius: isMobile ? '24px 24px 0 0' : 20,
          boxShadow: `0 32px 90px -20px rgba(0,0,0,0.6), 0 0 0 1px ${tk.primary}22`,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          animation: isMobile ? 'kjSheetUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)' : 'kjModalIn 0.22s ease-out',
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 0px)' : 0,
          boxSizing: 'border-box',
        }}
      >
        {header}
        <AIChatBody tk={tk} lang={lang} isMobile={isMobile} chat={chat} autoFocusInput />
      </div>
    </div>
  );
}
