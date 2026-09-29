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
}

/**
 * Global AI chat popup — opens over ANY page without navigating away.
 * Mobile: full-screen overlay. Desktop: centered dialog card.
 * Close via × button, Escape key, or backdrop click.
 */
export function AIChatModal({ theme, lang, isMobile, onClose, initialQ }: AIChatModalProps) {
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
      flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 18px', borderBottom: `1px solid ${tk.line}`,
      background: 'transparent',
    }}>
      <AvatarAI tk={tk} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>
          <span style={{ color: theme === 'dark' ? '#ff375f' : '#d91f35' }}>Koy</span><span style={{ color: theme === 'dark' ? '#30d158' : '#008355' }}>Jabo</span> <span style={{ color: tk.text }}>AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759', display: 'inline-block' }} />
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
          fontFamily: BEN, fontSize: 12, fontWeight: 600, color: tk.textDim,
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        💬 {T(lang, 'ইতিহাস', 'History')}
        {chat.allRecents.length > 0 && (
          <span style={{
            background: tk.primary, color: '#fff', borderRadius: 999,
            minWidth: 16, height: 16, display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 10, fontWeight: 700, padding: '0 4px',
          }}>{chat.allRecents.length}</span>
        )}
      </button>
      <button
        onClick={onClose}
        aria-label={T(lang, 'বন্ধ করুন', 'Close chat')}
        style={{
          width: 32, height: 32, borderRadius: 999, border: `1px solid ${tk.line}`,
          background: tk.panelMuted, color: tk.textDim, cursor: 'pointer', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, lineHeight: 1,
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
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : 24,
        animation: 'kjFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: isMobile ? '100%' : 'min(580px, calc(100vw - 48px))',
          height: cardHeight,
          maxWidth: '100%',
          background: theme === 'dark' ? 'rgba(20, 20, 24, 0.92)' : 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: isMobile ? 0 : `1px solid ${tk.line}`,
          borderRadius: isMobile ? '24px 24px 0 0' : 24,
          boxShadow: theme === 'dark' ? '0 24px 64px rgba(0,0,0,0.7)' : '0 24px 64px rgba(0,0,0,0.14)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          position: 'relative',
          animation: isMobile ? 'kjSheetUp 0.32s cubic-bezier(0.16, 1, 0.3, 1)' : 'kjModalIn 0.26s cubic-bezier(0.16, 1, 0.3, 1)',
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 0px)' : 0,
          boxSizing: 'border-box',
          ...(isMobile ? { marginBottom: kbPad, transition: 'margin-bottom 0.15s ease' } : {}),
        }}
      >
        {header}
        {/* No autoFocus — let the user see the modal first, then tap the input */}
        <AIChatBody tk={tk} lang={lang} isMobile={isMobile} chat={chat} hideHistoryBtn />
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
