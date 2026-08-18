import React from 'react';
import { Tokens, Lang, Theme, SANS, BEN, T } from '../tokens';
import { Logo } from './Logo';
import { Icon } from './Icons';
import { isNativePlatform } from '../../utils/platformDetect';

type Device = 'auto' | 'mobile' | 'desktop';

const NAV_ITEMS = [
  { bn: 'হোম', en: 'Home', route: 'home', ic: 'home' },
  { bn: 'লোকাল বাস', en: 'Local Bus', route: 'bus-hub', ic: 'bus' },
  { bn: 'মেট্রো', en: 'Metro', route: 'metro-hub', ic: 'metro' },
  { bn: 'ট্রেন', en: 'Train', route: 'train-hub', ic: 'train' },
  { bn: 'আন্তঃজেলা', en: 'Intercity', route: 'intercity', ic: 'compass' },
  { bn: 'লঞ্চ', en: 'Launch', route: 'launch-hub', ic: 'boat' },
  { bn: 'ফ্লাইট', en: 'Flights', route: 'flights-hub', ic: 'plane' },
  { bn: 'ট্রাক', en: 'Truck', route: 'truck-hub', ic: 'truck' },
] as const;

const ROUTE_TITLES: Record<string, { bn: string; en: string }> = {
  'bus-hub':         { bn: 'লোকাল বাস',        en: 'Local Bus' },
  'metro-hub':       { bn: 'মেট্রো',            en: 'Metro' },
  'train-hub':       { bn: 'ট্রেন',             en: 'Train' },
  'launch-hub':      { bn: 'লঞ্চ',              en: 'Launch' },
  'flights-hub':     { bn: 'ফ্লাইট',            en: 'Flights' },
  'truck-hub':       { bn: 'ট্রাক',             en: 'Truck' },
  intercity:         { bn: 'আন্তঃজেলা',          en: 'Intercity' },
  fare:              { bn: 'ভাড়া ক্যালকুলেটর',  en: 'Fare Calculator' },
  results:           { bn: 'রুট ফলাফল',          en: 'Route Results' },
  'bus-detail':      { bn: 'বাসের তথ্য',         en: 'Bus Details' },
  'bus-live-map':    { bn: 'লাইভ ম্যাপ',         en: 'Live Map' },
  'from-to-bus':     { bn: 'রুট',               en: 'Route' },
  'dtca-bus-detail': { bn: 'লাইভ বাস',           en: 'Live Bus' },
  'metro-detail':    { bn: 'মেট্রো স্টেশন',      en: 'Metro Station' },
  'metro-token':     { bn: 'মেট্রো টোকেন',       en: 'Metro Token' },
  'metro-pass':      { bn: 'মেট্রো পাস',         en: 'Metro Pass' },
  'train-detail':    { bn: 'ট্রেনের তথ্য',       en: 'Train Details' },
  'intercity-detail':{ bn: 'বাসের তথ্য',         en: 'Bus Details' },
  vehicle:           { bn: 'লঞ্চের তথ্য',        en: 'Launch Details' },
  'flight-detail':   { bn: 'ফ্লাইটের তথ্য',     en: 'Flight Details' },
  'rate-review':     { bn: 'রেটিং ও রিভিউ',     en: 'Rate & Review' },
  favorites:         { bn: 'সেভড',              en: 'Saved' },
  history:           { bn: 'ইতিহাস',            en: 'History' },
  settings:          { bn: 'সেটিংস',            en: 'Settings' },
  why:               { bn: 'কেন কই যাবো',       en: 'Why KoyJabo' },
  about:             { bn: 'আমাদের সম্পর্কে',    en: 'About' },
  blogs:             { bn: 'ব্লগ',              en: 'Blog' },
  'blog-detail':     { bn: 'ব্লগ',              en: 'Blog' },
  qa:                { bn: 'প্রশ্নোত্তর',        en: 'Q&A' },
  faq:               { bn: 'প্রশ্নোত্তর',        en: 'FAQ' },
  contact:           { bn: 'যোগাযোগ',           en: 'Contact' },
  release:           { bn: 'রিলিজ নোটস',        en: 'Release Notes' },
  privacy:           { bn: 'গোপনীয়তা নীতি',     en: 'Privacy Policy' },
  terms:             { bn: 'শর্তাবলী',           en: 'Terms of Service' },
  install:           { bn: 'অ্যাপ ইনস্টল',      en: 'Install App' },
  advertise:         { bn: 'বিজ্ঞাপন',           en: 'Advertise' },
  ai:                { bn: 'AI সহায়ক',           en: 'AI Assistant' },
};

interface TopBarProps {
  tk: Tokens;
  lang: Lang;
  theme: Theme;
  device: Device;
  activeRoute?: string;
  onNav: (route: string) => void;
  onLang: () => void;
  onTheme: () => void;
  onMenu: () => void;
  canBack?: boolean;
  onBack?: () => void;
}


export function TopBar({
  tk,
  lang,
  theme,
  device,
  activeRoute,
  onNav,
  onLang,
  onTheme,
  onMenu,
  canBack,
  onBack,
}: TopBarProps) {
  const isMobile = device === 'mobile';

  const controlBtn: React.CSSProperties = {
    background: tk.panelMuted,
    border: `1px solid ${tk.line}`,
    borderRadius: 999,
    padding: '5px 10px',
    fontFamily: SANS,
    fontSize: 12,
    fontWeight: 600,
    color: tk.text,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    whiteSpace: 'nowrap',
  };

  const iconBtn: React.CSSProperties = {
    background: tk.panelMuted,
    border: `1px solid ${tk.line}`,
    borderRadius: 999,
    width: 40,
    height: 40,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: tk.text,
    flexShrink: 0,
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        // Edge-to-edge Android: status bar (clock/battery) overlays the WebView —
        // pad the top bar down so content never hides under it.
        paddingTop: 'env(safe-area-inset-top)',
        background: tk.panel,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${tk.line}`,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          padding: isMobile ? '0 4px 0 0' : '0 24px',
          height: isMobile ? 52 : 60,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 0 : 16,
        }}
      >
        {/* ── Mobile: back mode (navigated into a sub-page) ─────────────── */}
        {isMobile && canBack ? (
          <>
            {/* Back arrow — 48×48 touch target (44px minimum per Material) */}
            <button
              onClick={onBack}
              aria-label={T(lang, 'পিছনে যান', 'Go back')}
              style={{
                background: 'none',
                border: 'none',
                width: 48,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tk.text,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            {/* Page title */}
            <span
              style={{
                fontFamily: lang === 'bn' ? BEN : SANS,
                fontWeight: 700,
                fontSize: lang === 'bn' ? 16 : 17,
                color: tk.text,
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                paddingLeft: 2,
              }}
            >
              {T(lang,
                ROUTE_TITLES[activeRoute ?? '']?.bn ?? '',
                ROUTE_TITLES[activeRoute ?? '']?.en ?? ''
              )}
            </span>

            {/* Theme toggle — only action shown in back mode */}
            <button
              onClick={onTheme}
              aria-label={T(lang, 'থিম পরিবর্তন', 'Toggle theme')}
              style={{
                background: 'none',
                border: 'none',
                width: 48,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tk.textDim,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? <Icon.sun s={20} /> : <Icon.moon s={20} />}
            </button>
          </>
        ) : isMobile ? (
          /* ── Mobile: home mode (top-level page) ───────────────────────── */
          <>
            {/* Logo + brand */}
            <button
              onClick={() => onNav('home')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                flexShrink: 0,
                height: 52,
              }}
            >
              <Logo tk={tk} size={34} />
              <span style={{ fontFamily: BEN, fontWeight: 800, fontSize: 16, letterSpacing: lang === 'bn' ? -0.5 : 0, whiteSpace: 'nowrap' }}>
                <span style={{ color: theme === 'dark' ? '#FF5A6E' : '#D91F35' }}>কই</span>
                <span style={{ color: theme === 'dark' ? '#00C081' : '#008355' }}> যাবো</span>
              </span>
            </button>

            <div style={{ flex: 1 }} />

            {/* Lang toggle */}
            <button onClick={onLang} style={{ ...controlBtn, marginRight: 4 }}>
              <Icon.globe s={13}/>
              <span>{lang === 'bn' ? 'বাং' : 'EN'}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={onTheme}
              aria-label={T(lang, 'থিম', 'Theme')}
              style={{
                background: 'none',
                border: 'none',
                width: 44,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tk.textDim,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? <Icon.sun s={19} /> : <Icon.moon s={19} />}
            </button>

            {/* Notification / menu — only show menu on mobile home */}
            <button
              onClick={onMenu}
              aria-label={T(lang, 'মেনু', 'Menu')}
              style={{
                background: 'none',
                border: 'none',
                width: 48,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tk.text,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <Icon.menu s={22} />
            </button>
          </>
        ) : (
          /* ── Desktop layout (unchanged) ────────────────────────────────── */
          <>
            {/* Logo */}
            <button
              onClick={() => onNav('home')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
            >
              <Logo tk={tk} size={48} />
              <span style={{ fontFamily: BEN, fontWeight: 800, fontSize: 18, letterSpacing: lang === 'bn' ? -0.5 : 0, whiteSpace: 'nowrap' }}>
                <span style={{ color: theme === 'dark' ? '#FF5A6E' : '#D91F35' }}>কই</span>
                <span style={{ color: theme === 'dark' ? '#00C081' : '#008355' }}> যাবো</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 'auto', marginRight: 12, minWidth: 0, overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 1 }}>
              {NAV_ITEMS.map((item) => {
                const active = activeRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => onNav(item.route)}
                    style={{
                      background: active ? tk.primarySoft : 'none',
                      border: `1px solid ${active ? tk.primary + '60' : 'transparent'}`,
                      borderRadius: 8,
                      padding: '6px 7px',
                      fontFamily: lang === 'bn' ? BEN : SANS,
                      fontSize: 12,
                      fontWeight: active ? 700 : 500,
                      color: active ? tk.primary : tk.textDim,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s',
                    }}
                  >
                    {(() => { const I = Icon[item.ic]; return <I s={14} />; })()}
                    {T(lang, item.bn, item.en)}
                  </button>
                );
              })}
            </nav>

            {/* Desktop right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <button onClick={onMenu} style={iconBtn} title="Menu"><Icon.menu s={18} /></button>
              <button onClick={onLang} style={controlBtn}><Icon.globe s={14}/><span>{lang === 'bn' ? 'বাং' : 'EN'}</span></button>
              <button onClick={onTheme} style={iconBtn} aria-label="Toggle theme">
                {theme === 'dark' ? <Icon.sun s={16} /> : <Icon.moon s={16} />}
              </button>
              {!isNativePlatform() && (
                <button onClick={() => onNav('install')} style={{ ...iconBtn, background: tk.text, color: tk.bg, border: 'none' }} title={T(lang, 'অ্যাপ ইনস্টল', 'Install app')}>
                  <Icon.download s={16} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
