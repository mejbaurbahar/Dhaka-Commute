import React, { useEffect, useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';
import { isNativePlatform } from '../../utils/platformDetect';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.koyjabo.app';

interface AppUpdateDialogProps {
  tk: Tokens;
  lang: Lang;
}

/**
 * Native app only: compares the installed Android versionCode (via
 * @capacitor/app) against the latest one published in /version.json.
 * If a newer Play Store release exists, show a popup that deep-links
 * the user to the Play Store. The website never shows this — the PWA
 * updates itself silently (SW + /version.json poll in main.tsx).
 */
export function AppUpdateDialog({ tk, lang }: AppUpdateDialogProps) {
  const [show, setShow] = useState(false);
  const [newVersion, setNewVersion] = useState('');

  useEffect(() => {
    if (!isNativePlatform()) return;
    let cancelled = false;
    (async () => {
      try {
        const { App } = await import('@capacitor/app');
        const info = await App.getInfo();
        const r = await fetch(`/version.json?ts=${Date.now()}`, { cache: 'no-store' });
        if (!r.ok) throw new Error('no version file');
        const j = await r.json();
        const remote = Number(j.androidVersionCode);
        // Android: AppInfo.build is the versionCode (numeric build number)
        const installed = Number(info.build);
        if (remote && installed && remote > installed && !cancelled) {
          setNewVersion(String(remote));
          setShow(true);
        }
      } catch {
        // Offline or non-Capacitor runtime — never popup
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!show) return null;

  const goToStore = () => {
    window.open(PLAY_STORE_URL, '_system');
    setShow(false);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={() => setShow(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: tk.panel,
          border: `1px solid ${tk.line}`,
          borderRadius: 20,
          padding: 24,
          maxWidth: 340,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          fontFamily: lang === 'bn' ? BEN : SANS,
        }}
      >
        <div style={{ fontSize: 34, marginBottom: 8 }}>📲</div>
        <h3 style={{ margin: '0 0 8px', color: tk.text, fontSize: 17, fontWeight: 800 }}>
          {T(lang, 'নতুন সংস্করণ পাওয়া গেছে!', 'A new version is available!')}
        </h3>
        <p style={{ margin: '0 0 18px', color: tk.textFaint, fontSize: 13, lineHeight: 1.6 }}>
          {newVersion
            ? T(
                lang,
                `KoyJabo v${newVersion} এখন প্লে স্টোরে আছে। নতুন ফিচার পেতে আপডেট করুন।`,
                `KoyJabo v${newVersion} is now on the Play Store. Update to get the latest features.`,
              )
            : T(lang, 'নতুন ফিচার পেতে অ্যাপ আপডেট করুন।', 'Update the app to get the latest features.')}
        </p>
        <button
          onClick={goToStore}
          style={{
            width: '100%',
            background: tk.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 0',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 8,
          }}
        >
          {T(lang, 'প্লে স্টোরে আপডেট করুন', 'Update on Play Store')}
        </button>
        <button
          onClick={() => setShow(false)}
          style={{
            width: '100%',
            background: 'transparent',
            color: tk.textFaint,
            border: 'none',
            borderRadius: 12,
            padding: '10px 0',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {T(lang, 'পরে', 'Later')}
        </button>
      </div>
    </div>
  );
}
