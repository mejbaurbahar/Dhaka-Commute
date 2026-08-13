import React, { useEffect, useRef } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang } from '../tokens';
import { useAIChat, SUGGESTIONS } from '../hooks/useAIChat';
import { Icon } from './Icons';

export function AvatarAI({ tk }: { tk: Tokens }) {
  return (
    <div style={{ width: 32, height: 32, borderRadius: 999, background: `linear-gradient(135deg,${tk.primary},${tk.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg viewBox="0 0 32 32" width="32" height="32">
        <rect x="8" y="10" width="16" height="14" rx="5" fill="rgba(255,255,255,0.9)" />
        <circle cx="13" cy="16" r="1.8" fill={tk.primaryDeep} className="kj-ai-eye" />
        <circle cx="19" cy="16" r="1.8" fill={tk.primaryDeep} className="kj-ai-eye2" />
        <path d="M13 21 Q16 23 19 21" stroke={tk.accent} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ChatBubble({ msg, tk, lang, userAvatarUrl, userInitials }: { msg: any; tk: Tokens; lang: Lang; userAvatarUrl?: string; userInitials?: string }) {
  const isUser = msg.isUser;
  if (msg.rich === 'greeting') {
    return (
      <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start', maxWidth: '80%' }}>
        <AvatarAI tk={tk} />
        <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '12px 16px', color: tk.text }}>
          <div style={{ fontFamily: BEN, fontSize: 14, lineHeight: 1.6 }}>
            {T(lang, 'হ্যালো! আমি কই যাবো AI। বাংলাদেশের যেকোনো পরিবহন সম্পর্কে জিজ্ঞেস করুন।', 'Hello! I\'m KoyJabo AI. Ask me anything about transport in Bangladesh.')}
          </div>
        </div>
      </div>
    );
  }
  if (msg.rich === 'table') {
    return (
      <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start', maxWidth: '90%' }}>
        <AvatarAI tk={tk} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '12px 16px', color: tk.text, fontFamily: BEN, fontSize: 14, lineHeight: 1.6 }}>
            {T(lang, 'গুলশান → মতিঝিল রুটে ৩টি বিকল্প আছে:', 'Gulshan → Motijheel has 3 options:')}
          </div>
          <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: SANS, fontSize: 12 }}>
              <thead>
                <tr style={{ background: tk.primarySoft }}>
                  {[T(lang, 'মাধ্যম', 'Mode'), T(lang, 'সময়', 'Time'), T(lang, 'ভাড়া', 'Fare'), T(lang, 'রেটিং', 'Rating')].map((h, i) => (
                    <th key={i} style={{ padding: '8px 10px', textAlign: 'left', color: tk.text, fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { m: '🚌 Green Line', t: '48 min', f: '৳ 60', r: '★4.2', best: true },
                  { m: '🚇 Metro', t: '32 min', f: '৳ 40', r: '★5.0', best: false },
                  { m: '🚕 CNG', t: '35 min', f: '৳ 120', r: '★3.8', best: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${tk.line}`, background: row.best ? tk.primarySoft : 'transparent' }}>
                    <td style={{ padding: '8px 10px', color: tk.text, fontWeight: row.best ? 700 : 400 }}>{row.m}</td>
                    <td style={{ padding: '8px 10px', color: tk.textDim }}>{row.t}</td>
                    <td style={{ padding: '8px 10px', color: tk.text, fontWeight: 700 }}>{row.f}</td>
                    <td style={{ padding: '8px 10px', color: '#f59e0b' }}>{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[T(lang, '🗺 রুট দেখুন', '🗺 See route'), T(lang, '📊 তুলনা', '📊 Compare'), T(lang, '⭐ রিভিউ', '⭐ Reviews')].map((c, i) => (
              <button key={i} style={{ border: 'none', background: tk.primarySoft, color: tk.primary, borderRadius: 999, padding: '6px 12px', fontFamily: BEN, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{c}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (msg.rich === 'coxs') {
    return (
      <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start', maxWidth: '85%' }}>
        <AvatarAI tk={tk} />
        <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: '12px 16px', color: tk.text, fontFamily: BEN, fontSize: 14, lineHeight: 1.7 }}>
          {T(lang,
            "কক্সবাজার যাওয়ার ৩টি উপায়:\n\n🚌 বাস (গ্রীন লাইন/হানিফ): ৳৯০০–২৫০০, রাতে ছাড়ে, ১০–১২ ঘণ্টা\n🚆 ট্রেন (কক্সবাজার এক্সপ্রেস): ৳২০০–১২০০, রাত ১০টায় ছাড়ে, ৯ ঘণ্টা\n✈️ ফ্লাইট (বিমান/ইউএস বাংলা): ৳৪৫০০+, ৫৫ মিনিট",
            "3 ways to reach Cox's Bazar:\n\n🚌 Bus (Green Line/Hanif): ৳900–2500, overnight, 10–12h\n🚆 Train (Cox's Bazar Express): ৳200–1200, 10PM, 9h\n✈️ Flight (Biman/US-Bangla): ৳4500+, 55 min"
          )}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 10, alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '80%', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && <AvatarAI tk={tk} />}
      {isUser && (userAvatarUrl
        ? <img src={userAvatarUrl} alt={userInitials} style={{ width: 32, height: 32, borderRadius: 999, objectFit: 'cover', flexShrink: 0, border: `1.5px solid ${tk.primarySoft}` }} />
        : <div style={{ width: 32, height: 32, borderRadius: 999, background: tk.accentSoft, color: tk.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SANS, fontWeight: 700, fontSize: 12 }}>{userInitials || 'KJ'}</div>
      )}
      <div style={{ background: isUser ? tk.primary : tk.panel, color: isUser ? tk.primaryInk : tk.text, border: isUser ? 0 : `1px solid ${tk.line}`, borderRadius: 16, padding: '12px 16px', fontFamily: BEN, fontSize: 14, lineHeight: 1.6 }}>
        {isUser ? msg.text : renderMd(msg.text, tk)}
      </div>
    </div>
  );
}

export function renderMd(text: string, tk: Tokens) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} style={{ height: 10 }} />;
    if (/^─{3,}$/.test(trimmed)) return <div key={i} style={{ borderTop: `1px solid ${tk.line}`, margin: '18px 0 14px' }} />;

    const parseBold = (s: string) => {
      const parts = s.split(/\*\*(.+?)\*\*/);
      return parts.map((p, j) => j % 2 === 1
        ? <strong key={j} style={{ fontWeight: 700, color: tk.text }}>{p}</strong>
        : p);
    };

    const isRouteTag = /^[🏆⚡💸🚌]/.test(trimmed) && trimmed.includes('**') && trimmed.length < 80;
    const isFlow = trimmed.startsWith('📍');
    const isSummary = trimmed.startsWith('⏱️');
    const isStep = /^\s*🚌|^\s*🚇|^\s*🚂|^\s*🚶|^\s*✈️/.test(trimmed);
    const isReason = trimmed.startsWith('💡');
    const isHeader = /^🗺️/.test(trimmed);

    let bg = 'transparent';
    let borderL = 'none';
    let pl = 0;
    let mb = 3;

    if (isRouteTag) { bg = `${tk.primarySoft}44`; pl = 8; mb = 4; }
    if (isFlow) { bg = `${tk.panelMuted}`; pl = 8; mb = 4; }
    if (isStep) { pl = 12; mb = 3; borderL = `2px solid ${tk.line}`; }
    if (isReason) { bg = `${tk.accentSoft}22`; pl = 8; mb = 2; }
    if (isHeader) { mb = 6; }

    return (
      <div key={i} style={{
        marginBottom: mb,
        paddingLeft: pl,
        paddingTop: isRouteTag ? 6 : isReason ? 4 : 0,
        paddingBottom: isRouteTag ? 4 : 0,
        paddingRight: (isRouteTag || isFlow || isReason) ? 8 : 0,
        background: bg,
        borderLeft: borderL,
        borderRadius: (isRouteTag || isFlow || isReason) ? 8 : 0,
      }}>
        {parseBold(trimmed)}
      </div>
    );
  });
}

interface AIChatBodyProps {
  tk: Tokens;
  lang: Lang;
  isMobile: boolean;
  chat: ReturnType<typeof useAIChat>;
  autoFocusInput?: boolean;
}

/** Messages + suggestion chips + input bar. Parent owns height (page flex or modal). */
export function AIChatBody({ tk, lang, isMobile, chat, autoFocusInput }: AIChatBodyProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message whenever messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat.messages, chat.isLoading]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: `linear-gradient(180deg,${tk.bg} 0%,${tk.panelSolid ?? tk.panel} 100%)` }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, maxWidth: isMobile ? '100%' : 900, width: '100%', margin: '0 auto', flex: 1 }}>

        {/* Messages area */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: isMobile ? '14px 12px' : '20px 24px', display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 16 }}>
          {chat.messages.map(msg => <ChatBubble key={msg.id} msg={msg} tk={tk} lang={lang} userAvatarUrl={chat.userAvatarUrl} userInitials={chat.userInitials} />)}
          {chat.isLoading && (
            <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start', maxWidth: '80%' }}>
              <AvatarAI tk={tk} />
              <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 20, borderBottomLeftRadius: 4, padding: '14px 18px', boxShadow: `0 2px 8px ${tk.shadow ?? 'rgba(0,0,0,0.08)'}` }}>
                <span className="kj-ai-dots" style={{ fontFamily: SANS, fontSize: 20, letterSpacing: 6, color: tk.textDim }}>···</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} style={{ height: 1, flexShrink: 0 }} />
        </div>

        {/* Mobile suggestion chips */}
        {isMobile && (
          <div style={{ flexShrink: 0, display: 'flex', gap: 6, padding: '8px 12px', overflowX: 'auto', background: tk.panel, borderTop: `1px solid ${tk.line}`, scrollbarWidth: 'none' } as React.CSSProperties}>
            {SUGGESTIONS.slice(0, 4).map((s, i) => (
              <button key={i} onClick={() => chat.setInput(T(lang, s.bn, s.en))} style={{ flexShrink: 0, background: tk.primarySoft, border: `1px solid ${tk.primary}30`, borderRadius: 999, padding: '6px 14px', fontFamily: BEN, fontSize: 11, fontWeight: 600, color: tk.primary, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {T(lang, s.bn, s.en)}
              </button>
            ))}
          </div>
        )}

        {/* Input bar — sticky on mobile so it always floats above the page
            scroll (page scrolls 60+px on small screens; input must stay visible) */}
        <div style={{
          flexShrink: 0,
          padding: isMobile ? '10px 12px' : '14px 20px',
          paddingBottom: isMobile ? 'calc(10px + env(safe-area-inset-bottom, 0px))' : '14px',
          borderTop: `1px solid ${tk.line}`,
          background: tk.panel,
          display: 'flex', gap: 8, alignItems: 'center',
          ...(isMobile ? { position: 'sticky', bottom: 0, zIndex: 5, boxShadow: '0 -10px 24px rgba(0,0,0,0.10)' } : {}),
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: tk.inputBg, border: `1.5px solid ${tk.line}`, borderRadius: 999, padding: '0 16px', gap: 8, transition: 'border-color 0.2s' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🔍</span>
            <input
              value={chat.input} onChange={e => chat.setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && chat.send()}
              placeholder={T(lang, 'পরিবহন সম্পর্কে জিজ্ঞেস করুন...', 'Ask about transport in Bangladesh...')}
              autoFocus={autoFocusInput}
              style={{ flex: 1, background: 'transparent', border: 'none', padding: isMobile ? '14px 0' : '12px 0', fontFamily: BEN, fontSize: isMobile ? 16 : 14, color: tk.text, outline: 'none', minWidth: 0 }}
            />
          </div>
          <button onClick={() => chat.send()} disabled={chat.isLoading} aria-label={T(lang, 'পাঠান', 'Send message')} style={{ width: isMobile ? 46 : 48, height: isMobile ? 46 : 48, borderRadius: 999, background: chat.isLoading ? tk.panelMuted : `linear-gradient(135deg,${tk.primary},${tk.accent})`, color: '#fff', border: 0, cursor: chat.isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: chat.isLoading ? 'none' : `0 4px 14px ${tk.primary}55`, transition: 'all 0.2s' }}>
            <Icon.arrowR s={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
