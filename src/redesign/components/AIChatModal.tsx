import React, { useEffect, useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang } from '../tokens';
import { useAIChat } from '../hooks/useAIChat';
import { AIChatBody, AvatarAI } from './AIChatBody';
import { ChatHistoryDrawer } from './ChatHistoryDrawer';

interface AIChatModalProps {
  theme: 'dark' | 'light';
  lang: Lang;
  isMobile: boolean;
  onClose: () => void;
  initialQ?: string;
  onNav?: (r: string, params?: Record<string, string>) => void;
}

/**
 * Global AI chat popup — opens over ANY page without navigating away.
 * Mobile: full-screen overlay. Desktop: centered dialog card.
 * Close via × button, Escape key, or backdrop click.
 */
export function AIChatModal({ theme, lang, isMobile, onClose, initialQ, onNav }: AIChatModalProps) {
  const tk: Tokens = KJ_TOKENS[theme];
  const chat = useAIChat(lang, initialQ);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // On-screen keyboard: lift the mobile sheet above the keyboard (visualViewport
  // is the only reliable signal on iOS Safari).
  const [kbPad, setKbPad] = useState(0);
  useEffect(() => {
    if (!isMobile || !window.visualViewport) return;
    const onVp = () => {
      const vv = window.visualViewport!;
      const kb = (window.innerHeight - vv.height) - vv.offsetTop;
      setKbPad(kb > 80 ? kb : 0);
    };
    window.visualViewport.addEventListener('resize', onVp);
    return () => window.visualViewport!.removeEventListener('resize', onVp);
  }, [isMobile]);

  const header = (
    <div style={{
      flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', borderBottom: `1px solid ${tk.line}`,
      background: `linear-gradient(135deg,${tk.primarySoft} 0%,${tk.accentSoft ?? tk.panelMuted} 100%)`,
    }}>
      <AvatarAI tk={tk} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 800 }}>
          <span style={{ color: theme === 'dark' ? '#FF5A6E' : '#D91F35' }}>Koy</span><span style={{ color: theme === 'dark' ? '#00C081' : '#008355' }}>Jabo</span> <span style={{ color: tk.text }}>AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'kjpulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: BEN, fontSize: 11, color: tk.textDim }}>{T(lang, 'যেকোনো পরিবহন প্রশ্ন করুন', 'Ask any transport question')}</span>
        </div>
      </div>
      {/* History button — shows count badge when there are past sessions */}
      <button
        onClick={() => setHistoryOpen(true)}
        aria-label={T(lang, 'চ্যাট ইতিহাস', 'Chat history')}
        style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', gap: 5,
          background: tk.panelMuted, border: `1px solid ${tk.line}`,
          borderRadius: 999, padding: '6px 12px',
          fontFamily: BEN, fontSize: 11, fontWeight: 700, color: tk.textDim,
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        💬 {T(lang, 'ইতিহাস', 'History')}
        {chat.allRecents.length > 0 && (
          <span style={{
            background: tk.primary, color: tk.primaryInk, borderRadius: 999,
            minWidth: 17, height: 17, display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 10, fontWeight: 800, padding: '0 4px',
          }}>{chat.allRecents.length}</span>
        )}
      </button>
      <button
        onClick={onClose}
        aria-label={T(lang, 'বন্ধ করুন', 'Close chat')}
        style={{
          width: 34, height: 34, borderRadius: 999, border: `1px solid ${tk.line}`,
          background: tk.panel, color: tk.text, cursor: 'pointer', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );

  // ~72% of screen height, blurred backdrop, rounded card.
  // Mobile: bottom sheet (lifted above the keyboard when it opens).
  // Desktop: centered.
  const cardHeight = isMobile ? `min(72dvh, calc(100dvh - ${kbPad}px))` : '72dvh';
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
          position: 'relative',
          animation: isMobile ? 'kjSheetUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)' : 'kjModalIn 0.22s ease-out',
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 0px)' : 0,
          boxSizing: 'border-box',
          ...(isMobile ? { marginBottom: kbPad, transition: 'margin-bottom 0.15s ease' } : {}),
        }}
      >
        {header}
        {/* No autoFocus — let the user see the modal first, then tap the input */}
        <AIChatBody tk={tk} lang={lang} isMobile={isMobile} chat={chat} hideHistoryBtn onNav={onNav} />
        {historyOpen && (
          <ChatHistoryDrawer
            open={historyOpen}
            onClose={() => setHistoryOpen(false)}
            chat={chat}
            tk={tk}
            lang={lang}
            contained
          />
        )}
      </div>
    </div>
  );
}
