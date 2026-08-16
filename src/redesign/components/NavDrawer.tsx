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
  favorites: '❤️',
  history: '🕐',
  settings: '⚙️',
  why: '💡',
  about: 'ℹ️',
  blogs: '📰',
  qa: '❓',
  contact: '✉️',
  release: '🆕',
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
  isLoggedIn?: boolean;
}

export function NavDrawer({ open, onClose, onNav, theme, lang, activeRoute }: NavDrawerProps) {
  const tk = KJ_TOKENS[theme] as Tokens;

  const handleNav = (route: string) => {
    onNav(route);
    onClose();
  };

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
            ? 'linear-gradient(180deg, rgba(7,14,32,0.98) 0%, rgba(4,8,20,0.99) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(238,243,247,0.99) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: `1px solid ${tk.line}`,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(105%)',
          transition: 'transform 0.28s cubic-bezier(.2,.8,.2,1)',
          height: '100dvh',
          maxHeight: '100dvh',
          overflow: 'hidden',
          boxShadow: open ? '-24px 0 80px rgba(0,0,0,0.45)' : 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 18px 12px',
            borderBottom: `1px solid ${tk.line}`,
            background: `linear-gradient(135deg, ${tk.primarySoft} 0%, ${tk.accentSoft ?? tk.panelMuted} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo tk={tk} size={32} />
            <span style={{ fontFamily: "'Hind Siliguri', system-ui, sans-serif", fontWeight: 800, fontSize: 17 }}>
              <span style={{ color: theme === 'dark' ? '#FF5A6E' : '#D91F35' }}>কই</span>
              <span style={{ color: theme === 'dark' ? '#00C081' : '#008355' }}> যাবো</span>
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: tk.panelMuted,
              border: `1px solid ${tk.line}`,
              borderRadius: 999,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: tk.textDim,
              fontSize: 16,
            }}
            aria-label={T(lang, 'মেনু বন্ধ করুন', 'Close menu')}
          >
            ✕
          </button>
        </div>

        {/* Nav groups */}
        <div style={{
          padding: '8px 0 28px',
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}>
          {GROUPS.map((group) => (
            <div key={group.heading.en} style={{ marginBottom: 4 }}>
              {/* Group heading */}
              <div style={{
                padding: '12px 20px 6px',
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                color: group.color ?? tk.textFaint,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{
                  width: 16, height: 2, borderRadius: 999,
                  background: group.color ?? tk.textFaint,
                }} />
                {T(lang, group.heading.bn, group.heading.en)}
              </div>

              {/* Links */}
              {group.links.map((link) => {
                const isActive = activeRoute === link.route;
                const emoji = ROUTE_ICONS[link.route] ?? '→';
                return (
                  <button
                    key={link.route}
                    onClick={() => handleNav(link.route)}
                    style={{
                      width: '100%',
                      background: isActive ? tk.primarySoft : 'none',
                      border: 'none',
                      borderLeft: isActive ? `3px solid ${tk.primary}` : '3px solid transparent',
                      padding: '9px 20px 9px 17px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.13s',
                    }}
                  >
                    {/* Emoji icon chip */}
                    <span style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      background: isActive ? tk.primarySoft : tk.panelMuted,
                      border: `1px solid ${isActive ? tk.primary + '50' : tk.line}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 15,
                      flexShrink: 0,
                      transition: 'background 0.13s',
                    }}>
                      {emoji}
                    </span>

                    <span style={{
                      flex: 1,
                      fontFamily: lang === 'bn' ? BEN : SANS,
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? tk.primary : tk.text,
                      transition: 'color 0.13s',
                    }}>
                      {T(lang, link.bn, link.en)}
                    </span>

                    {isActive && (
                      <span style={{ color: tk.primary, opacity: 0.7 }}>
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
          KoyJabo · v2.0 · koyjabo.com
        </div>
      </div>
      </div>
    </>
  );
}
