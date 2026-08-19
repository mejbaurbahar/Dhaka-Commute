import React, { useState } from 'react';
import { Tokens, Lang, T, SANS } from '../tokens';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.koyjabo.app';
const HIDE_KEY = 'kj-playstore-hidden';

/** True when the user is already using the installed PWA (standalone) or the
 *  native app (Capacitor) — the Play Store prompt must not show for them. */
export function appAlreadyInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  if ((window as unknown as { Capacitor?: unknown }).Capacitor) return true;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

/** Slim Play Store download bar for phone web visitors who don't have the
 *  app yet. Dismiss is remembered per device; the banner reappears only if
 *  the PWA storage is cleared. */
export function PlayStoreBanner({ tk, lang }: { tk: Tokens; lang: Lang }) {
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(HIDE_KEY) === '1' || appAlreadyInstalled(); } catch { return appAlreadyInstalled(); }
  });
  if (hidden) return null;

  return (
    <div style={{
      position: 'fixed', left: 10, right: 10, bottom: 'calc(64px + env(safe-area-inset-bottom))',
      zIndex: 210, display: 'flex', alignItems: 'center', gap: 10,
      background: tk.panelSolid, border: `1px solid ${tk.primary}`,
      borderRadius: 16, padding: '10px 12px', boxShadow: tk.shadowLg,
      animation: 'kjSlideUp 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, ${tk.primary}, ${tk.primaryDeep})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>📲</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: tk.text }}>
          {T(lang, 'কই যাবো অ্যাপ', 'KoyJabo app')}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginTop: 1 }}>
          {T(lang, 'প্লে স্টোর থেকে ডাউনলোড করুন', 'Download from Play Store')}
        </div>
      </div>
      <button onClick={() => window.open(PLAY_STORE_URL, '_blank', 'noopener')} style={{
        background: tk.primary, color: tk.primaryInk, border: 'none', borderRadius: 999,
        padding: '8px 16px', fontFamily: SANS, fontSize: 13, fontWeight: 700, cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}>{T(lang, 'ডাউনলোড', 'Get app')}</button>
      <button onClick={() => { try { localStorage.setItem(HIDE_KEY, '1'); } catch { /* private mode */ } setHidden(true); }}
        style={{ background: 'transparent', border: 'none', color: tk.textFaint, cursor: 'pointer', fontSize: 14, padding: 4 }}
        aria-label="Dismiss">✕</button>
    </div>
  );
}
