import React from 'react';
import { Tokens, Lang, SANS, T } from '../tokens';
import { SUPPORTED_LANGS, LANG_META } from '../i18n/languageDetect';

interface LanguagePickerProps {
  open: boolean;
  onClose: () => void;
  onLangTo: (l: Lang) => void;
  tk: Tokens;
  lang: Lang;
  font?: string;
}

/** Bottom-sheet list of all 10 UI languages (flag + native + English name).
 *  Click selects instantly; Arabic flips the app to RTL. */
export function LanguagePicker({ open, onClose, onLangTo, tk, lang, font }: LanguagePickerProps) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 400,
      background: 'rgba(2,8,18,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'kjFadeIn 0.2s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 480,
        background: tk.panelSolid, borderRadius: '20px 20px 0 0',
        padding: '18px 16px calc(20px + env(safe-area-inset-bottom))',
        borderTop: `1px solid ${tk.line}`, boxShadow: tk.shadowLg,
      }}>
        <div style={{ fontFamily: font ?? SANS, fontSize: 16, fontWeight: 600, color: tk.text, textAlign: 'center' }}>
          {T(lang, 'ভাষা নির্বাচন করুন', 'Choose language')}
        </div>
        <div style={{ height: 1, background: tk.line, margin: '12px 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxHeight: '55vh', overflowY: 'auto' }}>
          {SUPPORTED_LANGS.map(code => {
            const meta = LANG_META[code];
            const active = lang === code;
            return (
              <button key={code} onClick={() => { onLangTo(code); onClose(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                  borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                  background: active ? tk.primarySoft : tk.panelMuted,
                  border: `1px solid ${active ? tk.primary : tk.line}`,
                  color: tk.text, fontFamily: SANS,
                }}>
                <span style={{ fontSize: 20 }}>{meta.flag}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{meta.native}</span>
                  <span style={{ display: 'block', fontSize: 11, color: tk.textFaint }}>{meta.name}</span>
                </span>
                {active && <span style={{ marginLeft: 'auto', color: tk.primary, fontSize: 16 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
