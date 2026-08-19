import React, { useEffect, useRef, useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';
import { Icon } from './Icons';

// Section groups — a tab is "active" if activeRoute matches any of its routes.
// 5 tabs: every major mode reachable in one tap; everything else lives in More.
// Discover sits in the middle — styled with Bangladesh flag colors (green+red)
// so foreign visitors spot the exploration entry instantly.
const TABS = [
  {
    bn: 'হোম', en: 'Home',
    route: 'home' as const,
    icon: 'home' as const,
    routes: ['home', 'itinerary'],
  },
  {
    bn: 'বাস', en: 'Bus',
    route: 'bus-hub' as const,
    icon: 'bus' as const,
    routes: ['bus-hub', 'results', 'bus-detail', 'from-to-bus', 'bus-live-map', 'dtca-bus-detail'],
  },
  {
    bn: 'আবিষ্কার', en: 'Discover',
    route: 'discover' as const,
    icon: 'compass' as const,
    routes: ['discover', 'destination-detail'],
  },
  {
    bn: 'ট্রেন', en: 'Train',
    route: 'train-hub' as const,
    icon: 'train' as const,
    routes: ['train-hub', 'train-detail'],
  },
] as const;

// Bangladesh flag colors for the Discover (middle) tab
const BD_GREEN = '#006a4e';
const BD_RED = '#f42a41';

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
        gridTemplateColumns: 'repeat(5, 1fr)',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: 58,
      }}
    >
      {TABS.map((tab, idx) => {
        const active = (tab.routes as readonly string[]).includes(activeRoute ?? '');
        const IconComp = Icon[tab.icon];
        const isDiscover = tab.route === 'discover';
        // Discover = Bangladesh flag colors: green field, red circle
        const pillBg = active ? (isDiscover ? BD_GREEN : tk.primarySoft)
          : (isDiscover ? `${BD_GREEN}1f` : 'transparent');
        const iconColor = active ? (isDiscover ? '#fff' : tk.primary)
          : (isDiscover ? BD_GREEN : tk.textFaint);
        const glowColor = active ? (isDiscover ? BD_RED : tk.primary) : 'transparent';

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
              color: active ? (isDiscover ? BD_GREEN : tk.primary) : (isDiscover ? BD_GREEN : tk.textFaint),
              position: 'relative',
              minHeight: 54,
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label={T(lang, tab.bn, tab.en)}
            aria-current={active ? 'page' : undefined}
          >
            {/* Active glow dot above the icon — red dot on Discover (flag circle) */}
            <span style={{
              position: 'absolute', top: 5, width: 4, height: 4, borderRadius: 999,
              background: glowColor,
              boxShadow: glowColor !== 'transparent' ? `0 0 8px ${glowColor}` : 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }} />
            {/* Icon — pill wraps the icon exactly (bg always aligned with button content) */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              transform: active ? 'scale(1.12)' : 'scale(1)',
              transition: 'transform 0.2s cubic-bezier(.2,.7,.25,1)',
              padding: '0 10px',
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              background: pillBg,
              color: active && isDiscover ? BD_RED : undefined, // red circle on green field
              boxShadow: active && isDiscover ? `0 0 14px ${BD_GREEN}66, inset 0 0 0 1.5px ${BD_RED}55` : undefined,
              animation: active ? 'kjTabPop .22s cubic-bezier(.2,.7,.25,1) both' : undefined,
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
        <div style={{
          position: 'relative',
          zIndex: 1,
          transform: moreActive ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(.2,.7,.25,1)',
          padding: '0 10px',
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          background: moreActive ? tk.primarySoft : 'transparent',
          animation: moreActive ? 'kjTabPop .22s cubic-bezier(.2,.7,.25,1) both' : undefined,
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
