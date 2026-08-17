import React, { useEffect, useRef, useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';
import { Icon } from './Icons';

// Section groups — a tab is "active" if activeRoute matches any of its routes
const TABS = [
  {
    bn: 'হোম', en: 'Home',
    route: 'home' as const,
    icon: 'home' as const,
    routes: ['home'],
  },
  {
    bn: 'বাস', en: 'Bus',
    route: 'bus-hub' as const,
    icon: 'bus' as const,
    routes: ['bus-hub', 'results', 'bus-detail', 'from-to-bus', 'bus-live-map', 'dtca-bus-detail'],
  },
  {
    bn: 'সেভড', en: 'Saved',
    route: 'favorites' as const,
    icon: 'star' as const,
    routes: ['favorites'],
  },
] as const;

interface MobileTabBarProps {
  tk: Tokens;
  lang: Lang;
  activeRoute?: string;
  onNav: (route: string) => void;
  onMenu: () => void;
}

export function MobileTabBar({ tk, lang, activeRoute, onNav, onMenu }: MobileTabBarProps) {
  const activeIndex = TABS.findIndex(tab =>
    (tab.routes as readonly string[]).includes(activeRoute ?? '')
  );
  // -1 means "More" tab is conceptually active (drawer page)
  const moreActive = activeIndex === -1;

  // Track previous index for animation direction
  const prevIdx = useRef(activeIndex);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (prevIdx.current !== activeIndex) {
      prevIdx.current = activeIndex;
      setAnimKey(k => k + 1);
    }
  }, [activeIndex]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        background: tk.panel,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: `1px solid ${tk.line}`,
        padding: '0 4px',
        paddingBottom: 'env(safe-area-inset-bottom)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: 58,
      }}
    >
      {TABS.map((tab, idx) => {
        const active = (tab.routes as readonly string[]).includes(activeRoute ?? '');
        const IconComp = Icon[tab.icon];

        return (
          <button
            key={tab.route}
            onClick={() => onNav(tab.route)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '10px 0 8px',
              color: active ? tk.primary : tk.textFaint,
              position: 'relative',
              minHeight: 54,
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label={T(lang, tab.bn, tab.en)}
            aria-current={active ? 'page' : undefined}
          >
            {/* Floating pill indicator */}
            {active && (
              <div
                key={`pill-${animKey}`}
                style={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 44,
                  height: 32,
                  borderRadius: 12,
                  background: tk.primarySoft,
                  animation: 'kjTabPop .22s cubic-bezier(.2,.7,.25,1) both',
                }}
              />
            )}

            {/* Icon — scales up when active */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              transform: active ? 'scale(1.12)' : 'scale(1)',
              transition: 'transform 0.2s cubic-bezier(.2,.7,.25,1)',
            }}>
              <IconComp s={active ? 22 : 21} />
            </div>

            <span style={{
              fontFamily: lang === 'bn' ? BEN : SANS,
              fontSize: 10,
              fontWeight: active ? 700 : 400,
              lineHeight: 1,
              position: 'relative',
              zIndex: 1,
              letterSpacing: active ? -0.2 : 0,
              transition: 'font-weight 0.15s, color 0.15s',
            }}>
              {T(lang, tab.bn, tab.en)}
            </span>
          </button>
        );
      })}

      {/* More tab — opens nav drawer */}
      <button
        onClick={onMenu}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          padding: '10px 0 8px',
          color: moreActive ? tk.primary : tk.textFaint,
          minHeight: 54,
          position: 'relative',
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label={T(lang, 'আরও', 'More')}
      >
        {moreActive && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 44,
              height: 32,
              borderRadius: 12,
              background: tk.primarySoft,
              animation: 'kjTabPop .22s cubic-bezier(.2,.7,.25,1) both',
            }}
          />
        )}
        <div style={{
          position: 'relative',
          zIndex: 1,
          transform: moreActive ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(.2,.7,.25,1)',
        }}>
          <Icon.menu s={moreActive ? 22 : 21} />
        </div>
        <span style={{
          fontFamily: lang === 'bn' ? BEN : SANS,
          fontSize: 10,
          fontWeight: moreActive ? 700 : 400,
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          letterSpacing: moreActive ? -0.2 : 0,
          transition: 'font-weight 0.15s, color 0.15s',
        }}>
          {T(lang, 'আরও', 'More')}
        </span>
      </button>
    </div>
  );
}
