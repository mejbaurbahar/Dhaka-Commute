import React from 'react';
import { Tokens, Lang, Theme, SANS, BEN, T } from '../tokens';
import { Logo } from './Logo';
import { Icon } from './Icons';

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
  user?: { displayName?: string; username?: string; avatarUrl?: string } | null;
  onLogout?: () => void;
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
          padding: isMobile ? '0 12px' : '0 24px',
          height: isMobile ? 52 : 60,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 8 : 16,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNav('home')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
          aria-label={T(lang, 'কই যাবো', 'Koy Jabo')}
        >
          <Logo tk={tk} size={isMobile ? 42 : 48} />
          <span
            style={{
              fontFamily: BEN,
              fontWeight: 800,
              fontSize: isMobile ? 15 : 18,
              letterSpacing: lang === 'bn' ? -0.5 : 0,
              whiteSpace: 'nowrap',
            }}
          >
            {/* Bangladesh-flag colors: red কই + green যাবো */}
            <span style={{ color: '#F42A41' }}>কই</span>
            <span style={{ color: '#00A86B' }}> যাবো</span>
          </span>
        </button>

        {/* Desktop nav — pushed to right side with marginLeft: auto */}
        {!isMobile && (
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginLeft: 'auto',  // pushes nav to the right
              marginRight: 12,
              minWidth: 0,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              flexShrink: 1,
            }}
          >
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
        )}

        {/* Spacer on mobile */}
        {isMobile && <div style={{ flex: 1 }} />}

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {/* Menu button — desktop */}
          {!isMobile && (
            <button onClick={onMenu} style={iconBtn} title="Menu">
              <Icon.menu s={18} />
            </button>
          )}

          {/* Lang toggle */}
          <button onClick={onLang} style={controlBtn}>
            <Icon.globe s={14}/>
            <span>{lang === 'bn' ? 'বাং' : 'EN'}</span>
          </button>

          {/* Theme toggle */}
          <button onClick={onTheme} style={iconBtn} aria-label="Toggle theme">
            {theme === 'dark' ? <Icon.sun s={16} /> : <Icon.moon s={16} />}
          </button>

          {/* Install button — desktop only */}
          {!isMobile && (
            <button
              onClick={() => onNav('install')}
              style={{ ...iconBtn, background: tk.text, color: tk.bg, border: 'none' }}
              title={T(lang, 'অ্যাপ ইনস্টল', 'Install app')}
            >
              <Icon.download s={16} />
            </button>
          )}

          {/* Menu button — mobile only */}
          {isMobile && (
            <button onClick={onMenu} style={iconBtn} aria-label="Open menu">
              <Icon.menu s={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
