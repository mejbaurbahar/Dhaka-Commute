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
    glow: 'rgba(24,119,242,.35)',
    path: 'M13.5 22v-8h-2.7v-3.1h2.7V8.6c0-2.7 1.6-4.1 4-4.1 1.1 0 2.1.08 2.4.12v2.8h-1.6c-1.3 0-1.55.62-1.55 1.53v2h3.1l-.4 3.1h-2.7v8h-3.25z',
  },
  {
    title: 'Instagram', href: 'https://www.instagram.com/fagun018/',
    bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    glow: 'rgba(220,39,67,.35)',
    // Official Instagram brand glyph (camera with circle + lens dot).
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  },
  {
    title: 'LinkedIn', href: 'https://www.linkedin.com/company/koy-jabo/',
    bg: '#0A66C2',
    glow: 'rgba(10,102,194,.35)',
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
            <Logo tk={tk} size={46} />
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
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: s.bg,
                  boxShadow: `0 0 14px ${s.glow}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">
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
