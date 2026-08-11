import React from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';
import { Logo } from './Logo';

const COLS = [
  {
    h: { bn: 'এক্সপ্লোর', en: 'Explore' },
    items: [
      { bn: 'লোকাল বাস', en: 'Local bus', route: 'bus-hub' },
      { bn: 'মেট্রো রেল', en: 'Metro Rail', route: 'metro-hub' },
      { bn: 'ট্রেন', en: 'Train', route: 'train-hub' },
      { bn: 'ফ্লাইট', en: 'Flights', route: 'flights-hub' },
      { bn: 'লঞ্চ', en: 'Launch', route: 'launch-hub' },
      { bn: 'ট্রাক', en: 'Truck', route: 'truck-hub' },
      { bn: 'ভাড়া ক্যালকুলেটর', en: 'Fare calculator', route: 'fare' },
    ],
  },
  {
    h: { bn: 'আমার', en: 'My' },
    items: [
      { bn: 'প্রিয়', en: 'Favorites', route: 'favorites' },
      { bn: 'যাত্রার ইতিহাস', en: 'Trip history', route: 'history' },
      { bn: 'সেটিংস', en: 'Settings', route: 'settings' },
    ],
  },
  {
    h: { bn: 'কোম্পানি', en: 'Company' },
    items: [
      { bn: 'কেন কই যাবো', en: 'Why KoyJabo', route: 'why' },
      { bn: 'আমাদের সম্পর্কে', en: 'About', route: 'about' },
      { bn: 'ব্লগ', en: 'Blog', route: 'blogs' },
      { bn: 'প্রশ্নোত্তর', en: 'Q & A', route: 'qa' },
      { bn: 'যোগাযোগ', en: 'Contact', route: 'contact' },
    ],
  },
  {
    h: { bn: 'আইনি', en: 'Legal' },
    items: [
      { bn: 'গোপনীয়তা', en: 'Privacy', route: 'privacy' },
      { bn: 'শর্তাবলি', en: 'Terms', route: 'terms' },
      { bn: 'রিলিজ নোট', en: 'Release notes', route: 'release' },
    ],
  },
];

const SOCIAL = [
  {
    title: 'Facebook', href: 'https://www.facebook.com/koyjabo/',
    bg: '#1877F2',
    path: 'M13.5 22v-8h-2.7v-3.1h2.7V8.6c0-2.7 1.6-4.1 4-4.1 1.1 0 2.1.08 2.4.12v2.8h-1.6c-1.3 0-1.55.62-1.55 1.53v2h3.1l-.4 3.1h-2.7v8h-3.25z',
  },
  {
    title: 'Instagram', href: 'https://www.instagram.com/fagun018/',
    bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    path: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 5.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5zM16.2 8.1a.82.82 0 1 1-1.64 0 .82.82 0 0 1 1.64 0zM12 6c-1.6 0-1.8 0-2.43.04-.62.03-1.05.13-1.42.27a2.9 2.9 0 0 0-1.05.68 2.9 2.9 0 0 0-.68 1.05c-.14.37-.24.8-.27 1.42C6.01 10.2 6 10.4 6 12s0 1.8.04 2.43c.03.62.13 1.05.27 1.42.15.4.36.75.68 1.05.3.32.65.53 1.05.68.37.14.8.24 1.42.27.63.03.83.04 2.43.04s1.8 0 2.43-.04c.62-.03 1.05-.13 1.42-.27.4-.15.75-.36 1.05-.68a2.9 2.9 0 0 0 .68-1.05c.14-.37.24-.8.27-1.42.03-.63.04-.83.04-2.43s0-1.8-.04-2.43c-.03-.62-.13-1.05-.27-1.42a2.9 2.9 0 0 0-.68-1.05 2.9 2.9 0 0 0-1.05-.68c-.37-.14-.8-.24-1.42-.27C13.8 6 13.6 6 12 6z',
  },
  {
    title: 'LinkedIn', href: 'https://www.linkedin.com/company/koy-jabo/',
    bg: '#0A66C2',
    path: 'M8.3 9.6H5.6V18h2.7V9.6zM6.95 8.4a1.57 1.57 0 1 0 0-3.14 1.57 1.57 0 0 0 0 3.14zM18.4 13.5c0-2.3-1.23-3.37-2.87-3.37-1.3 0-1.88.71-2.2 1.21V9.6H10.6V18h2.72v-4.21c0-1.11.21-2.18 1.59-2.18 1.36 0 1.49 1.26 1.49 2.25V18H18.4v-4.5z',
  },
];

interface KJFooterProps {
  tk: Tokens;
  lang: Lang;
  isMobile: boolean;
  onNav: (route: string) => void;
}

export function KJFooter({ tk, lang, isMobile, onNav }: KJFooterProps) {
  const cols = COLS;

  return (
    <footer
      style={{
        marginTop: 28,
        background: tk.panelMuted,
        borderTop: `1px solid ${tk.line}`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative blob — top-right, pulsing glow */}
      <div
        className="kj-anim-pulse"
        style={{
          position: 'absolute',
          right: -60,
          top: -60,
          width: 260,
          height: 260,
          borderRadius: 999,
          background: `radial-gradient(circle, ${tk.primary}28 0%, ${tk.primary}08 60%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Decorative blob — bottom-left, offset phase */}
      <div
        className="kj-anim-glow"
        style={{
          position: 'absolute',
          left: -80,
          bottom: -80,
          width: 200,
          height: 200,
          borderRadius: 999,
          background: `radial-gradient(circle, ${tk.accent}18 0%, ${tk.accent}06 60%, transparent 100%)`,
          pointerEvents: 'none',
          animationDelay: '1.2s',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1120,
          margin: '0 auto',
          padding: isMobile ? '28px 18px 18px' : '40px 40px 22px',
          display: 'grid',
          gap: isMobile ? 26 : 32,
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1.5fr repeat(4, 1fr)',
        }}
      >
        {/* Brand block */}
        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, cursor: 'pointer' }}
            onClick={() => onNav('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNav('home')}
          >
            <Logo tk={tk} size={40} />
            <div>
              <div style={{ fontFamily: BEN, fontWeight: 700, fontSize: 19, color: tk.text, lineHeight: 1 }}>
                কই যাবো
              </div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 9, letterSpacing: 2, color: tk.textFaint, marginTop: 4 }}>
                KOYJABO · BD
              </div>
            </div>
          </div>
          <p style={{ fontFamily: BEN, fontSize: 13, color: tk.textDim, lineHeight: 1.6, margin: '0 0 16px', maxWidth: 320 }}>
            {T(
              lang,
              'বাংলাদেশের সব গণপরিবহন — বাস, মেট্রো, ট্রেন, লঞ্চ ও ফ্লাইট — এক অ্যাপে। অফলাইনেও কাজ করে।',
              "All of Bangladesh's public transport — bus, metro, train, launch & flights — in one app. Works offline.",
            )}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SOCIAL.map((s) => (
              <a
                key={s.title}
                title={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: s.bg,
                  boxShadow: `0 0 12px ${s.bg === tk.line ? tk.line : s.bg + '55'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {cols.map((col, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 700,
                color: tk.textFaint,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {T(lang, col.h.bn, col.h.en)}
            </div>
            {col.items.map((item) => (
              <FooterLink key={item.route} tk={tk} lang={lang} item={item} onNav={onNav} />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'relative',
          borderTop: `1px solid ${tk.line}`,
          padding: isMobile ? '14px 18px' : '16px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: SANS,
          fontSize: 11,
          color: tk.textFaint,
        }}
      >
        <span>
          {T(lang, '© ২০২৬ KoyJabo · সর্বস্বত্ব সংরক্ষিত', '© 2026 KoyJabo · All rights reserved')}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span
            className="kj-anim-blink"
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: tk.primary,
              display: 'inline-block',
            }}
          />
          {T(lang, 'ঢাকায় তৈরি, বাংলাদেশের জন্য', 'Made in Dhaka for Bangladesh')}
        </span>
      </div>
    </footer>
  );
}

function FooterLink({
  tk,
  lang,
  item,
  onNav,
}: {
  tk: Tokens;
  lang: Lang;
  item: { bn: string; en: string; route: string };
  onNav: (route: string) => void;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={() => onNav(item.route)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: 'none',
        border: 0,
        padding: '4px 0',
        textAlign: 'left',
        fontFamily: BEN,
        fontSize: 13,
        color: hovered ? tk.primary : tk.textDim,
        cursor: 'pointer',
        transition: 'color .15s ease',
        width: '100%',
      }}
    >
      {T(lang, item.bn, item.en)}
    </button>
  );
}
