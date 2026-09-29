import React from 'react';
import { Theme, Lang, Tokens, SANS, BEN, T } from '../tokens';
import { KJ_TOKENS } from '../tokens';
import { Logo } from './Logo';
import { Icon } from './Icons';

type DrawerLink = { bn: string; en: string; route: string; icon?: string };

// Transport icons for Explore group
const ROUTE_ICONS: Record<string, string> = {
  home: '🏠',
  'bus-hub': '🚌',
  'metro-hub': '🚇',
  'train-hub': '🚆',
  intercity: '🧭',
  'launch-hub': '⛴️',
  'flights-hub': '✈️',
  'truck-hub': '🚛',
  fare: '💰',
  ai: '🤖',
  discover: '🧭',
  itinerary: '🗓️',
  'bus-live-map': '🛰️',
  install: '📲',
  favorites: '❤️',
  history: '🕐',
  settings: '⚙️',
  why: '💡',
  about: 'ℹ️',
  blogs: '📰',
  qa: '❓',
  contact: '✉️',
  release: '🆕',
  advertise: '📣',
  privacy: '🔒',
  terms: '📋',
};

const GROUPS: { heading: { bn: string; en: string }; links: DrawerLink[]; color?: string }[] = [
  {
    heading: { bn: 'এক্সপ্লোর', en: 'Explore' },
    color: '#00b8d9',
    links: [
      { bn: 'হোম', en: 'Home', route: 'home' },
      { bn: 'লোকাল বাস', en: 'Local Bus', route: 'bus-hub' },
      { bn: 'মেট্রো', en: 'Metro', route: 'metro-hub' },
      { bn: 'ট্রেন', en: 'Train', route: 'train-hub' },
      { bn: 'আন্তঃজেলা', en: 'Intercity', route: 'intercity' },
      { bn: 'লঞ্চ', en: 'Launch', route: 'launch-hub' },
      { bn: 'ফ্লাইট', en: 'Flights', route: 'flights-hub' },
      { bn: 'ট্রাক', en: 'Truck', route: 'truck-hub' },
      { bn: 'ভাড়া', en: 'Fare', route: 'fare' },
      { bn: 'AI সহায়ক', en: 'AI Assistant', route: 'ai' },
      { bn: 'ডিসকভার বাংলাদেশ', en: 'Discover Bangladesh', route: 'discover' },
      { bn: 'ভ্রমণ পরিকল্পনা', en: 'Itinerary', route: 'itinerary' },
      { bn: 'লাইভ বাস ম্যাপ', en: 'Live Bus Map', route: 'bus-live-map' },
      { bn: 'অ্যাপ ইনস্টল', en: 'Install App', route: 'install' },
    ],
  },
  {
    heading: { bn: 'আমার', en: 'My' },
    color: '#ff2a6d',
    links: [
      { bn: 'সেভড', en: 'Favorites', route: 'favorites' },
      { bn: 'ইতিহাস', en: 'History', route: 'history' },
      { bn: 'সেটিংস', en: 'Settings', route: 'settings' },
    ],
  },
  {
    heading: { bn: 'কোম্পানি', en: 'Company' },
    color: '#a259ff',
    links: [
      { bn: 'কেন কই যাবো', en: 'Why KoyJabo', route: 'why' },
      { bn: 'আমাদের সম্পর্কে', en: 'About', route: 'about' },
      { bn: 'ব্লগ', en: 'Blog', route: 'blogs' },
      { bn: 'প্রশ্নোত্তর', en: 'Q&A', route: 'qa' },
      { bn: 'যোগাযোগ', en: 'Contact', route: 'contact' },
      { bn: 'রিলিজ', en: 'Release', route: 'release' },
      { bn: 'বিজ্ঞাপন', en: 'Advertise', route: 'advertise' },
    ],
  },
  {
    heading: { bn: 'আইনি', en: 'Legal' },
    color: '#8da4c4',
    links: [
      { bn: 'গোপনীয়তা', en: 'Privacy', route: 'privacy' },
      { bn: 'শর্তাবলী', en: 'Terms', route: 'terms' },
    ],
  },
];

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  onNav: (route: string) => void;
  theme: Theme;
  lang: Lang;
  activeRoute?: string;
}

export function NavDrawer({ open, onClose, onNav, theme, lang, activeRoute }: NavDrawerProps) {
  const tk = KJ_TOKENS[theme] as Tokens;

  const handleNav = (route: string) => {
    onNav(route);
    onClose();
  };

  // Flat index across groups → staggered slide-in when the drawer opens
  let flatIdx = -1;
  const nextIdx = () => { flatIdx += 1; return flatIdx; };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 249,
          background: 'rgba(0,0,0,0.52)',
          backdropFilter: open ? 'blur(6px)' : 'none',
          WebkitBackdropFilter: open ? 'blur(6px)' : 'none',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.28s cubic-bezier(.2,.8,.2,1)',
        }}
      />

      {/* Clipping wrapper */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 250, overflow: 'hidden', overscrollBehavior: 'contain', pointerEvents: open ? 'auto' : 'none' }}
      >

      {/* Drawer panel */}
      <div
        onClick={event => event.stopPropagation()}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(340px, 86vw)',
          background: theme === 'dark'
            ? 'rgba(18, 18, 20, 0.88)'
            : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(32px) saturate(190%)',
          WebkitBackdropFilter: 'blur(32px) saturate(190%)',
          borderLeft: `1px solid ${tk.line}`,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(105%)',
          transition: 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1)',
          height: '100dvh',
          maxHeight: '100dvh',
          overflow: 'hidden',
          boxShadow: open ? (theme === 'dark' ? '-16px 0 48px rgba(0,0,0,0.6)' : '-16px 0 48px rgba(0,0,0,0.12)') : 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px 14px',
            borderBottom: `1px solid ${tk.line}`,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo tk={tk} size={32} />
            <span style={{ fontFamily: BEN, fontWeight: 700, fontSize: 17, letterSpacing: -0.2 }}>
              <span style={{ color: theme === 'dark' ? '#ff375f' : '#d91f35' }}>কই</span>
              <span style={{ color: theme === 'dark' ? '#30d158' : '#008355' }}> যাবো</span>
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: tk.panelMuted,
              border: `1px solid ${tk.line}`,
              borderRadius: 999,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: tk.textDim,
              fontSize: 14,
              transition: 'background 0.15s ease, transform 0.15s ease',
            }}
            aria-label={T(lang, 'মেনু বন্ধ করুন', 'Close menu')}
          >
            ✕
          </button>
        </div>

        {/* Nav groups */}
        <div style={{
          padding: '10px 8px 32px',
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}>
          {GROUPS.map((group) => (
            <div key={group.heading.en} style={{ marginBottom: 12 }}>
              {/* Group heading */}
              <div style={{
                padding: '8px 12px 6px',
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: tk.textDim,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                {T(lang, group.heading.bn, group.heading.en)}
              </div>

              {/* Links */}
              {group.links.map((link) => {
                const isActive = activeRoute === link.route;
                const emoji = ROUTE_ICONS[link.route] ?? '→';
                const idx = nextIdx();
                return (
                  <button
                    key={link.route}
                    onClick={() => handleNav(link.route)}
                    style={{
                      width: '100%',
                      background: isActive ? (theme === 'dark' ? 'rgba(0, 113, 227, 0.18)' : 'rgba(0, 113, 227, 0.1)') : 'transparent',
                      border: 'none',
                      borderRadius: 10,
                      padding: '8px 12px',
                      margin: '1px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                      transform: open ? 'translateX(0)' : 'translateX(16px)',
                      opacity: open ? 1 : 0,
                      transitionDelay: open ? `${Math.min(idx, 14) * 20}ms` : '0ms',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Emoji icon chip */}
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: isActive ? (theme === 'dark' ? 'rgba(0, 113, 227, 0.3)' : 'rgba(0, 113, 227, 0.15)') : tk.panelMuted,
                      border: `1px solid ${isActive ? 'rgba(0, 113, 227, 0.4)' : tk.line}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      flexShrink: 0,
                    }}>
                      {emoji}
                    </span>

                    <span style={{
                      flex: 1,
                      fontFamily: lang === 'bn' ? BEN : SANS,
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 450,
                      color: isActive ? tk.primary : tk.text,
                      letterSpacing: -0.1,
                    }}>
                      {T(lang, link.bn, link.en)}
                    </span>

                    {isActive && (
                      <span style={{ color: tk.primary, opacity: 0.85 }}>
                        <Icon.arrowR s={13} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer version */}
        <div style={{
          padding: '10px 20px',
          borderTop: `1px solid ${tk.line}`,
          fontFamily: SANS,
          fontSize: 10,
          color: tk.textFaint,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}>
          <Logo tk={tk} size={16} />
          KoyJabo · v2.2 · koyjabo.com
        </div>
      </div>
      </div>
    </>
  );
}
