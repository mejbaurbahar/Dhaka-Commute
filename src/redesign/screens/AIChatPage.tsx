import React from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang } from '../tokens';
import { PageShell } from './PageShell';
import { useDocumentTitle, setMetaTag, setCanonicalUrl } from '../utils/useDocumentTitle';
import { useAIChat } from '../hooks/useAIChat';
import { AIChatBody } from '../components/AIChatBody';
import { formatChatTimestamp } from '../../../services/chatHistoryManager';

interface Props { theme: 'dark' | 'light'; device: 'desktop' | 'mobile'; lang: Lang; route: string; canBack: boolean; onNav: (r: string, params?: Record<string, string>) => void; onNavTab?: (r: string) => void; onBack: () => void; onLang: () => void; onTheme: () => void; onMenu: () => void; params?: Record<string, string>; }

export function AIChatPage(props: Props) {
  const { theme, device, lang } = props;
  useDocumentTitle(T(lang, 'কই যাবো AI — যাতায়াত সহায়ক চ্যাট', 'KoyJabo AI — Transport Chat Assistant'));
  setMetaTag('description', T(lang, 'বাংলা বা ইংরেজিতে রুট, ভাড়া ও যাতায়াত প্রশ্নের জবাব দেয় কই যাবো AI।', 'Ask KoyJabo AI about routes, fares and travel in English or Bengali.'));
  setCanonicalUrl('/ai');
  const tk: Tokens = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const chat = useAIChat(lang, props.params?.q);

  return (
    <PageShell {...props}>
      <div style={{ display: 'flex', height: isMobile ? 'calc(100dvh - 52px - 60px)' : 'calc(100vh - 60px)', overflow: 'hidden', background: tk.bg }}>

        {/* ── Desktop sidebar ── */}
        {!isMobile && (
          <div style={{ width: 300, flexShrink: 0, borderRight: `1px solid ${tk.line}`, display: 'flex', flexDirection: 'column', background: tk.panel }}>

            {/* Sidebar AI branding header */}
            <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${tk.line}`, background: `linear-gradient(135deg,${tk.primarySoft} 0%,${tk.accentSoft ?? tk.panelMuted} 100%)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${tk.primary},${tk.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 32 32" width="20" height="20"><rect x="8" y="10" width="16" height="14" rx="5" fill="rgba(255,255,255,0.9)" /><circle cx="13" cy="16" r="1.8" fill={tk.primaryDeep} /><circle cx="19" cy="16" r="1.8" fill={tk.primaryDeep} /></svg>
                </div>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800 }}>
                    <span style={{ color: theme === 'dark' ? '#FF5A6E' : '#D91F35' }}>Koy</span><span style={{ color: theme === 'dark' ? '#00C081' : '#008355' }}>Jabo</span> <span style={{ color: tk.text }}>AI</span>
                  </div>
                  <div style={{ fontFamily: BEN, fontSize: 10, color: tk.textDim }}>{T(lang, 'পরিবহন সহায়ক', 'Transport Assistant')}</div>
                </div>
              </div>
              <button onClick={chat.startNew} style={{ width: '100%', padding: '7px 12px', borderRadius: 10, border: `1px solid ${tk.primary}40`, background: tk.primarySoft, color: tk.primary, fontFamily: BEN, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span>✦</span> {T(lang, 'নতুন কথোপকথন', 'New conversation')}
              </button>
            </div>

            {/* Recent conversations */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 0' }}>
              <div style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: tk.textFaint, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>
                {T(lang, 'সাম্প্রতিক', 'Recents')}
              </div>
              {chat.recents.length > 0 ? (
                <>
                  {chat.recents.map((r) => (
                    <div key={r.id} onClick={() => chat.loadSession(r.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 12, cursor: 'pointer', fontFamily: BEN, fontSize: 12, color: chat.sessionId === r.id ? tk.primary : tk.textDim, marginBottom: 2, background: chat.sessionId === r.id ? tk.primarySoft : 'transparent', border: `1px solid ${chat.sessionId === r.id ? tk.primary + '30' : 'transparent'}`, transition: 'all 0.15s' }}
                      onMouseEnter={e => { if (chat.sessionId !== r.id) (e.currentTarget.style.background = tk.chipBg); }}
                      onMouseLeave={e => { if (chat.sessionId !== r.id) (e.currentTarget.style.background = 'transparent'); }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>💬</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
                        <span style={{ display: 'block', fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginTop: 1 }}>
                          {formatChatTimestamp(r.lastUpdated, lang)}
                        </span>
                      </span>
                      <button onClick={e => chat.handleDeleteSession(r.id, e)} style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, fontSize: 16, padding: '0 2px', lineHeight: 1, opacity: 0.6 }}>×</button>
                    </div>
                  ))}
                  {chat.allRecents.length > 5 && (
                    <button onClick={() => chat.setShowAllRecents(v => !v)} style={{ width: '100%', background: 'none', border: `1px solid ${tk.line}`, borderRadius: 8, padding: '5px', fontFamily: SANS, fontSize: 11, color: tk.textFaint, cursor: 'pointer', marginTop: 4 }}>
                      {chat.showAllRecents ? T(lang, 'কম দেখুন', 'Show less') : T(lang, `আরও ${chat.allRecents.length - 5}টি`, `+${chat.allRecents.length - 5} more`)}
                    </button>
                  )}
                </>
              ) : (
                <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textFaint, lineHeight: 1.6, padding: '6px 4px', textAlign: 'center', marginTop: 12 }}>
                  {T(lang, 'এখনো কোনো কথোপকথন নেই।', 'No conversations yet.')}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ── Main chat column ── */}
        <AIChatBody tk={tk} lang={lang} isMobile={isMobile} chat={chat} onNav={props.onNav} />
      </div>
    </PageShell>
  );
}
