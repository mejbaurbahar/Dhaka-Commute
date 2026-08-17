import React from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang } from '../tokens';
import { useAIChat, RecentSession } from '../hooks/useAIChat';
import { formatChatTimestamp } from '../../../services/chatHistoryManager';

interface ChatHistoryDrawerProps {
  tk: Tokens;
  lang: Lang;
  chat: ReturnType<typeof useAIChat>;
  open: boolean;
  onClose: () => void;
  contained?: boolean;
}

/**
 * Mobile chat-history drawer — slide-in panel listing past conversations with
 * relative timestamps. Desktop uses the always-visible sidebar on /ai; this
 * covers the modal and mobile page where there is no sidebar.
 */
export function ChatHistoryDrawer({ tk, lang, chat, open, onClose, contained }: ChatHistoryDrawerProps) {
  const sessions: RecentSession[] = chat.allRecents;

  return (
    <div
      role="dialog" aria-modal="true" aria-label={T(lang, 'চ্যাট ইতিহাস', 'Chat history')}
      onClick={onClose}
      style={{
        position: contained ? 'absolute' : 'fixed', inset: 0, zIndex: 9600,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        display: open ? 'flex' : 'none',
        justifyContent: 'flex-end',
        animation: 'kjFadeIn 0.15s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(340px, 86vw)',
          height: '100%',
          background: tk.panel,
          borderLeft: `1px solid ${tk.line}`,
          display: 'flex', flexDirection: 'column',
          animation: 'kjDrawerIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.35)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '16px 16px 12px', borderBottom: `1px solid ${tk.line}`,
        }}>
          <span style={{ fontSize: 18 }}>💬</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 800, color: tk.text }}>
              {T(lang, 'চ্যাট ইতিহাস', 'Chat history')}
            </div>
            <div style={{ fontFamily: BEN, fontSize: 11, color: tk.textFaint }}>
              {T(lang, `${sessions.length}টি কথোপকথন`, `${sessions.length} conversations`)}
            </div>
          </div>
          <button onClick={onClose} aria-label={T(lang, 'বন্ধ করুন', 'Close')} style={{
            width: 32, height: 32, borderRadius: 999, border: `1px solid ${tk.line}`,
            background: tk.panelMuted, color: tk.text, cursor: 'pointer', fontSize: 15, lineHeight: 1,
          }}>✕</button>
        </div>

        {/* Session list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <div style={{ fontSize: 34, marginBottom: 10 }}>🗨️</div>
              <div style={{ fontFamily: BEN, fontSize: 13, color: tk.textDim, lineHeight: 1.7 }}>
                {T(lang, 'এখনো কোনো কথোপকথন নেই।\nপ্রথম প্রশ্ন করেই শুরু করুন!', 'No conversations yet.\nAsk your first question to start!')}
              </div>
            </div>
          ) : (
            sessions.map((s) => (
              <div key={s.id} onClick={() => { chat.loadSession(s.id); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 12, marginBottom: 6, cursor: 'pointer',
                  background: chat.sessionId === s.id ? tk.primarySoft : tk.panelMuted,
                  border: `1px solid ${chat.sessionId === s.id ? tk.primary + '40' : tk.line}`,
                }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>💬</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: BEN, fontSize: 13, color: tk.text, fontWeight: 600,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{s.title}</div>
                  <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, marginTop: 2 }}>
                    {formatChatTimestamp(s.lastUpdated, lang)}
                  </div>
                </div>
                <button
                  onClick={e => chat.handleDeleteSession(s.id, e as any)}
                  aria-label={T(lang, 'মুছুন', 'Delete')}
                  style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: 999,
                    background: 'none', border: `1px solid ${tk.line}`, cursor: 'pointer',
                    color: tk.textFaint, fontSize: 14, lineHeight: 1,
                  }}
                >×</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${tk.line}` }}>
          <button onClick={() => { chat.startNew(); onClose(); }} style={{
            width: '100%', padding: '11px 0', borderRadius: 12,
            background: `linear-gradient(135deg,${tk.primary},${tk.accent})`, color: '#fff',
            border: 0, fontFamily: SANS, fontWeight: 700, fontSize: 13, cursor: 'pointer',
          }}>
            ✦ {T(lang, 'নতুন কথোপকথন', 'New conversation')}
          </button>
        </div>
      </div>
    </div>
  );
}
