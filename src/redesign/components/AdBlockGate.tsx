import React, { useCallback, useEffect, useState } from 'react';
import { Lang, Theme, KJ_TOKENS, BEN, SANS, T } from '../tokens';

// Build-time platform check — Vite statically replaces this with a literal.
const NATIVE_BUILD = import.meta.env.VITE_PLATFORM === 'android';

interface Props {
  lang: Lang;
  theme: Theme;
}

export function AdBlockGate({ lang, theme }: Props) {
  const tk = KJ_TOKENS[theme];
  const [blocked, setBlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  // Dismissible — a locked full-screen wall risks AdSense policy issues and
  // blocks legit users from transport info (emergency use case).
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('koyjabo_adblock_dismissed') === '1'
  );

  const checkAdBlock = useCallback(() => {
    setChecking(true);
    const bait = document.createElement('div');
    bait.className = 'adsbox ad-banner ad-unit adsbygoogle pub_300x250';
    bait.setAttribute('aria-hidden', 'true');
    bait.style.cssText = [
      'position:absolute',
      'left:-10000px',
      'top:-10000px',
      'width:1px',
      'height:1px',
      'pointer-events:none',
    ].join(';');
    document.body.appendChild(bait);

    window.setTimeout(() => {
      const style = window.getComputedStyle(bait);
      const rect = bait.getBoundingClientRect();
      const hidden = style.display === 'none' || style.visibility === 'hidden' || rect.height === 0 || rect.width === 0;
      bait.remove();
      setBlocked(hidden);
      setChecking(false);
    }, 650);
  }, []);

  useEffect(() => {
    checkAdBlock();
  }, [checkAdBlock]);

  useEffect(() => {
    if (!blocked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [blocked]);

  if (dismissed) return null;

  // Native (Android): no adblockers exist in a Capacitor WebView — never gate.
  // Expression ternary so the bait-check JSX (contains "adsbygoogle" bait class)
  // is tree-shaken out of the app build entirely.
  if (!blocked) return null;

  return NATIVE_BUILD ? null : (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={T(lang, 'অ্যাড ব্লকার বন্ধ করুন', 'Disable ad blocker')}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 12000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        background: 'rgba(2,8,23,0.86)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          position: 'relative',
          borderRadius: 22,
          border: `1px solid ${tk.line}`,
          background: tk.panel,
          boxShadow: tk.shadowLg,
          padding: 24,
          textAlign: 'center',
          fontFamily: lang === 'bn' ? BEN : SANS,
        }}
      >
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: tk.accentSoft,
          color: tk.accent,
          fontSize: 30,
          fontFamily: SANS,
          fontWeight: 900,
        }}>
          AD
        </div>
        <h2 style={{ margin: '0 0 10px', color: tk.text, fontSize: 22, fontWeight: 900 }}>
          {T(lang, 'অ্যাড ব্লকার বন্ধ করুন', 'Please disable your ad blocker')}
        </h2>
        <p style={{ margin: '0 0 20px', color: tk.textDim, fontSize: 14, lineHeight: 1.65 }}>
          {T(
            lang,
            'কই যাবো ফ্রি রাখতে বিজ্ঞাপন সাহায্য করে। সাইট ব্যবহার করতে অ্যাড ব্লকার বন্ধ করে আবার চেক করুন।',
            'Ads help keep KoyJabo free. Please turn off your ad blocker for this site, then check again.'
          )}
        </p>
        <button
          onClick={() => {
            localStorage.setItem('koyjabo_adblock_dismissed', '1');
            setDismissed(true);
          }}
          aria-label={T(lang, 'বন্ধ করুন', 'Dismiss')}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            border: 0,
            background: 'transparent',
            color: tk.textDim,
            fontSize: 18,
            cursor: 'pointer',
            padding: 4,
          }}
        >
          ✕
        </button>
        <button
          onClick={checkAdBlock}
          disabled={checking}
          style={{
            width: '100%',
            border: 0,
            borderRadius: 14,
            padding: '13px 18px',
            background: tk.primary,
            color: tk.primaryInk,
            fontFamily: lang === 'bn' ? BEN : SANS,
            fontSize: 14,
            fontWeight: 900,
            cursor: checking ? 'wait' : 'pointer',
            opacity: checking ? 0.7 : 1,
          }}
        >
          {checking ? T(lang, 'চেক হচ্ছে...', 'Checking...') : T(lang, 'আমি বন্ধ করেছি, আবার চেক করুন', 'I disabled it, check again')}
        </button>
      </div>
    </div>
  );
}
