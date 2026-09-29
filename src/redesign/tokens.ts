// KoyJabo Design Tokens — exact values from KoyJabo App Standalone.html
import { DICT } from './i18n/dictionary';
export const KJ_TOKENS = {
  light: {
    bg: '#f5f5f7',
    pageBg: '#f5f5f7',
    panel: 'rgba(255,255,255,0.82)',
    panelSolid: '#ffffff',
    panelMuted: 'rgba(0,0,0,0.04)',
    line: 'rgba(0,0,0,0.08)',
    text: '#1d1d1f',
    textDim: '#6e6e73',
    textFaint: '#86868b',
    chipBg: 'rgba(0,0,0,0.05)',
    chipText: '#1d1d1f',
    inputBg: 'rgba(255,255,255,0.92)',
    primary: '#0071e3',
    primaryInk: '#ffffff',
    primarySoft: 'rgba(0,113,227,0.10)',
    primaryDeep: '#005bb5',
    accent: '#ff375f',
    accentSoft: 'rgba(255,55,95,0.10)',
    amber: '#ff9500',
    amberSoft: 'rgba(255,149,0,0.12)',
    metroBg: '#141416',
    shadow: '0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)',
    shadowLg: '0 4px 16px rgba(0,0,0,0.06), 0 24px 64px -12px rgba(0,0,0,0.12)',
  },
  dark: {
    bg: '#000000',
    pageBg: '#08080a',
    panel: 'rgba(28,28,30,0.82)',
    panelSolid: '#1c1c1e',
    panelMuted: 'rgba(44,44,46,0.65)',
    line: 'rgba(255,255,255,0.12)',
    text: '#f5f5f7',
    textDim: '#a1a1a6',
    textFaint: '#86868b',
    chipBg: 'rgba(255,255,255,0.08)',
    chipText: '#f5f5f7',
    inputBg: 'rgba(38,38,42,0.75)',
    primary: '#2997ff',
    primaryInk: '#001124',
    primarySoft: 'rgba(41,151,255,0.16)',
    primaryDeep: '#0071e3',
    accent: '#ff375f',
    accentSoft: 'rgba(255,55,95,0.16)',
    amber: '#ff9f0a',
    amberSoft: 'rgba(255,159,10,0.16)',
    metroBg: '#0c0c0e',
    shadow: '0 2px 12px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.7)',
    shadowLg: '0 4px 20px rgba(0,0,0,0.6), 0 30px 80px rgba(0,0,0,0.85)',
  },
} as const;

export type Theme = 'dark' | 'light';
import type { UiLang as Lang } from './i18n/languageDetect';
export type { UiLang as Lang } from './i18n/languageDetect';
export type Device = 'auto' | 'mobile' | 'desktop';
// Wide type: accepts both light and dark themes
export type Tokens = { [K in keyof typeof KJ_TOKENS.dark]: string };

export const SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", -system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';
export const BEN = "'Hind Siliguri', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro', sans-serif";

export const T = (lang: Lang, bn: string, en: string): string => {
  if (lang === 'bn') return bn;
  if (lang === 'en') return en;
  return DICT[lang]?.[en] ?? en;
};

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
/** Convert digits to Bengali numerals when lang === 'bn' */
export const N = (value: string | number, lang: Lang): string => {
  if (lang !== 'bn') return String(value);
  return String(value).replace(/[0-9]/g, d => BN_DIGITS[+d]);
};
/** Format fare with Bengali numerals: ৳405 or ৳৪০৫ */
export const Fare = (amount: string | number, lang: Lang): string =>
  '৳' + N(String(amount).replace(/^৳/, ''), lang);

export const chipBtn = (tk: Tokens): React.CSSProperties => ({
  background: tk.panelMuted,
  border: `1px solid ${tk.line}`,
  borderRadius: 999,
  padding: '6px 12px',
  fontFamily: SANS,
  fontWeight: 500,
  fontSize: 12,
  color: tk.text,
  display: 'inline-flex' as const,
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
});
