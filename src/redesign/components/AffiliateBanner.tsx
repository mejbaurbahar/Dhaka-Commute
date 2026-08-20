import React, { useState, useEffect } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

// Build-time platform check — Vite statically replaces this with a literal.
const NATIVE_BUILD = import.meta.env.VITE_PLATFORM === 'android';

export type AffiliateCourseId = 'spoken-english' | 'vocabulary' | 'deer-scooter' | 'oneplus-headphone' | 'riversong-watch';

export interface CourseData {
  id: AffiliateCourseId;
  titleBn: string;
  titleEn: string;
  subBn: string;
  subEn: string;
  url: string;
  localImg: string;
  fallbackImg: string;
  badge: string;
  rating: string;
  learners: string;
  btnTextBn?: string;
  btnTextEn?: string;
}

export const COURSES: CourseData[] = [
  {
    id: 'spoken-english',
    titleBn: 'ঘরে বসে Spoken English',
    titleEn: 'Spoken English at Home',
    subBn: 'Grammar শেখা ছাড়াই ইংরেজি বলার উপায় — by মুনজেরিন শহীদ',
    subEn: 'Speak English without learning grammar — by Munzereen Shahid',
    url: 'https://rkmri.co/00oMTAyRMISe/',
    localImg: '/images/spoken-english-affiliate.jpg',
    fallbackImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ggR7qjHddhAVpSNO0vzd3EFe8z1eguVWSBoxogYKZg&s=10',
    badge: 'BESTSELLER',
    rating: '4.9 ★',
    learners: '১৫ লক্ষ+ শিক্ষার্থী',
    btnTextBn: 'এখনই ভর্তি হন',
    btnTextEn: 'Enroll Now',
  },
  {
    id: 'vocabulary',
    titleBn: 'সবার জন্য Vocabulary',
    titleEn: 'Vocabulary for Everyone',
    subBn: 'মুখস্থ করা ছাড়াই Vocabulary শিখুন — by মুনজেরিন শহীদ',
    subEn: 'Learn Vocabulary without memorizing — by Munzereen Shahid',
    url: 'https://rkmri.co/pol0oM0MEoey/',
    localImg: '/images/vocabulary-affiliate.jpg',
    fallbackImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmXmgbu_8kA5DQ4ZrPpxxIEeUDlJM0kbdJzobzNa3kw&s=10',
    badge: 'POPULAR',
    rating: '4.8 ★',
    learners: '১০ লক্ষ+ শিক্ষার্থী',
    btnTextBn: 'এখনই ভর্তি হন',
    btnTextEn: 'Enroll Now',
  },
  {
    id: 'deer-scooter',
    titleBn: 'DEER Pogo Scooter Slip Resistance',
    titleEn: 'DEER Pogo Scooter Slip Resistance',
    subBn: 'Brand: DEER — আরামদায়ক ও নিরাপদ ট্রাভেল স্কুটার',
    subEn: 'Brand: DEER — Comfortable & Safe Travel Scooter',
    url: 'https://rkmri.co/meoyI5TNe0Al/',
    localImg: '/images/pogo-scooter-affiliate.png',
    fallbackImg: 'https://rokbucket.rokomari.io/ProductNew20190903/45X64/DEER_Pogo_Scooter_Slip_Resistance-DEER-a941a-285145.png',
    badge: 'HOT DEAL',
    rating: '4.9 ★',
    learners: 'প্রিমিয়াম কোয়ালিটি',
    btnTextBn: 'এখনই কিনুন',
    btnTextEn: 'Buy Now',
  },
  {
    id: 'oneplus-headphone',
    titleBn: 'OnePlus Bullets Wireless Z2',
    titleEn: 'OnePlus Bullets Wireless Z2',
    subBn: 'Brand: OnePlus — Beyond Bassic Acoustic Red',
    subEn: 'Brand: OnePlus — Beyond Bassic Acoustic Red',
    url: 'https://rkmri.co/EeMNl2epReyl/',
    localImg: 'https://rokbucket.rokomari.io/ProductNew20190903/45X64/OnePlus_Bullets_Wireless_Z2_In_Ear_Headp-OnePlus-c05a7-274115.jpg',
    fallbackImg: 'https://rokbucket.rokomari.io/ProductNew20190903/45X64/OnePlus_Bullets_Wireless_Z2_In_Ear_Headp-OnePlus-c05a7-274115.jpg',
    badge: 'NEW',
    rating: '4.7 ★',
    learners: 'ব্র্যান্ড ফেভারিট',
    btnTextBn: 'এখনই কিনুন',
    btnTextEn: 'Buy Now',
  },
  {
    id: 'riversong-watch',
    titleBn: 'RIVERSONG Motive 3 PRO SW46',
    titleEn: 'RIVERSONG Motive 3 PRO SW46',
    subBn: 'Brand: Riversong — Waterproof Smart Watch Black',
    subEn: 'Brand: Riversong — Waterproof Smart Watch Black',
    url: 'https://rkmri.co/lp0R2EESARoo/',
    localImg: 'https://rokbucket.rokomari.io/ProductNew20190903/45X64/RIVERSONG_Motive_3_PRO_SW46_Waterproof_S-Riversong-eaa15-274341.png',
    fallbackImg: 'https://rokbucket.rokomari.io/ProductNew20190903/45X64/RIVERSONG_Motive_3_PRO_SW46_Waterproof_S-Riversong-eaa15-274341.png',
    badge: 'TRENDING',
    rating: '4.8 ★',
    learners: 'ওয়াটারপ্রুফ স্মার্টওয়াচ',
    btnTextBn: 'এখনই কিনুন',
    btnTextEn: 'Buy Now',
  },
];

export interface AffiliateBannerProps {
  tk: Tokens;
  lang: Lang;
  course?: AffiliateCourseId | 'all';
  variant?: 'auto' | 'slider' | 'glass-stack' | 'spotlight' | 'strip' | 'grid' | 'hero' | 'mid' | 'compact';
  route?: string;
  compact?: boolean;
  className?: string;
}

// ── 1. Slider / Carousel Banner — slides left-to-right every 1 second ────────
function AffiliateSlider({ tk, lang }: { tk: Tokens; lang: Lang }) {
  const total = COURSES.length;
  // We keep track of which slide the track is currently showing (0-based)
  const [current, setCurrent] = useState(0);
  // sliding: true while the CSS transition is in progress
  const [sliding, setSliding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgSrcs, setImgSrcs] = useState<string[]>(COURSES.map((c) => c.localImg));

  // Auto-advance every 4 seconds (paused on hover)
  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(() => {
      setSliding(true);
    }, 4000);
    return () => clearInterval(timer);
  }, [hovered]);

  // When sliding starts, after transition ends (0.5s) update the index
  useEffect(() => {
    if (!sliding) return;
    const t = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total);
      setSliding(false);
    }, 500);
    return () => clearTimeout(t);
  }, [sliding, total]);

  const handleImgError = (i: number) => {
    setImgSrcs((prev) => {
      const next = [...prev];
      next[i] = COURSES[i].fallbackImg;
      return next;
    });
  };

  const goTo = (i: number) => {
    if (i === current) return;
    setCurrent(i);
  };

  const course = COURSES[current];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #050b1a 0%, #081738 50%, #062247 100%)',
        border: '2px solid rgba(0,240,255,0.3)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Sliding track — holds all slides in a row */}
      <div
        style={{
          display: 'flex',
          width: `${total * 100}%`,
          transform: `translateX(-${(current * 100) / total}%)`,
          transition: sliding ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
        }}
      >
        {COURSES.map((c, i) => (
          <div
            key={c.id}
            onClick={() => window.open(c.url, '_blank', 'noopener,noreferrer')}
            style={{
              width: `${100 / total}%`,
              flexShrink: 0,
              cursor: 'pointer',
              padding: '16px 20px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                position: 'relative',
                width: 120,
                height: 90,
                borderRadius: 14,
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
              }}
            >
              <img
                src={imgSrcs[i]}
                onError={() => handleImgError(i)}
                alt={c.titleBn}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 6,
                  left: 6,
                  background:
                    c.badge === 'BESTSELLER' ? '#ff2a6d'
                    : c.badge === 'HOT DEAL' ? '#ff9900'
                    : '#00c8f0',
                  color: '#fff',
                  fontFamily: SANS,
                  fontWeight: 900,
                  fontSize: 8,
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                {T(lang, c.badge, c.badge)}
              </span>
            </div>

            {/* Text */}
            <div style={{ flex: '1 1 180px', minWidth: 0 }}>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#00f0ff',
                  letterSpacing: 1,
                  marginBottom: 2,
                }}
              >
                {c.rating} · {c.learners}
              </div>
              <h3
                style={{
                  fontFamily: BEN,
                  fontWeight: 800,
                  fontSize: 18,
                  color: '#fff',
                  margin: '0 0 4px',
                }}
              >
                {T(lang, c.titleBn, c.titleEn)}
              </h3>
              <p
                style={{
                  fontFamily: BEN,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.85)',
                  margin: 0,
                }}
              >
                {T(lang, c.subBn, c.subEn)}
              </p>
            </div>

            {/* CTA */}
            <div style={{ flexShrink: 0 }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(c.url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0070f0 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '10px 18px',
                  fontFamily: BEN,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,240,255,0.35)',
                  whiteSpace: 'nowrap',
                }}
              >
                {T(lang, c.btnTextBn || 'দেখুন', c.btnTextEn || 'View')} ➔
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          paddingBottom: 12,
        }}
      >
        {COURSES.map((c, i) => (
          <button
            key={i}
            type="button"
            aria-label={T(lang, c.titleBn, c.titleEn)}
            aria-current={i === current}
            onClick={() => goTo(i)}
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span
              style={{
                width: i === current ? 22 : 7,
                height: 7,
                borderRadius: 999,
                background: i === current ? '#00f0ff' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                display: 'block',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── 2. Glassmorphic Card Stack ─────────────────────────────────────────────
function GlassStack({ tk, lang }: { tk: Tokens; lang: Lang }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 14,
        width: '100%',
      }}
    >
      {COURSES.map((course) => (
        <div
          key={course.id}
          onClick={() => window.open(course.url, '_blank', 'noopener,noreferrer')}
          style={{
            cursor: 'pointer',
            borderRadius: 18,
            padding: 16,
            background: 'rgba(10, 25, 55, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,240,255,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            transition: 'transform 0.2s ease, border-color 0.2s ease',
          }}
        >
          <img
            src={course.localImg}
            onError={(e) => {
              (e.target as HTMLImageElement).src = course.fallbackImg;
            }}
            alt={course.titleBn}
            style={{
              width: 85,
              height: 65,
              borderRadius: 10,
              objectFit: 'contain',
              background: '#ffffff',
              padding: 2,
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 9,
                fontWeight: 900,
                color: '#00f0ff',
                letterSpacing: 0.8,
              }}
            >
              {T(lang, course.badge, course.badge)} · {course.rating}
            </span>
            <div
              style={{
                fontFamily: BEN,
                fontWeight: 800,
                fontSize: 15,
                color: '#fff',
                margin: '2px 0 3px',
              }}
            >
              {T(lang, course.titleBn, course.titleEn)}
            </div>
            <p
              style={{
                fontFamily: BEN,
                fontSize: 11,
                color: 'rgba(255,255,255,0.75)',
                margin: 0,
              }}
            >
              {T(lang, course.subBn, course.subEn)}
            </p>
          </div>
          <span style={{ color: '#00f0ff', fontWeight: 800, fontSize: 16 }}>➔</span>
        </div>
      ))}
    </div>
  );
}

// ── 3. Spotlight Showcase ──────────────────────────────────────────────────
function SpotlightShowcase({ tk, lang }: { tk: Tokens; lang: Lang }) {
  const course = COURSES[2] || COURSES[0]; // DEER Scooter
  return (
    <div
      onClick={() => window.open(course.url, '_blank', 'noopener,noreferrer')}
      style={{
        cursor: 'pointer',
        borderRadius: 20,
        background: 'linear-gradient(135deg, #130a38 0%, #061c47 100%)',
        border: '2px solid rgba(0,240,255,0.3)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: '1 1 240px' }}>
        <img
          src={course.localImg}
          onError={(e) => {
            (e.target as HTMLImageElement).src = course.fallbackImg;
          }}
          alt={course.titleBn}
          style={{ width: 90, height: 75, borderRadius: 12, objectFit: 'contain', background: '#fff', padding: 4 }}
        />
        <div>
          <span style={{ color: '#ff9900', fontSize: 10, fontWeight: 900, fontFamily: SANS }}>
            {T(lang, '🔥 প্রস্তাবিত ভ্রমণ পণ্য', '🔥 FEATURED TRAVEL PRODUCT')}
          </span>
          <h3 style={{ fontFamily: BEN, fontWeight: 800, fontSize: 17, color: '#fff', margin: '2px 0' }}>
            {T(lang, course.titleBn, course.titleEn)}
          </h3>
          <p style={{ fontFamily: BEN, fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
            {T(lang, course.subBn, course.subEn)}
          </p>
        </div>
      </div>
      <button
        type="button"
        style={{
          background: 'linear-gradient(135deg, #00f0ff, #0070f0)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '10px 18px',
          fontFamily: BEN,
          fontWeight: 800,
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        {T(lang, 'এখনই কিনুন ➔', 'Buy Now ➔')}
      </button>
    </div>
  );
}

// ── 4. Slim Strip ──────────────────────────────────────────────────────────
function SlimStrip({ tk, lang }: { tk: Tokens; lang: Lang }) {
  const course = COURSES[2];
  return (
    <div
      onClick={() => window.open(course.url, '_blank', 'noopener,noreferrer')}
      style={{
        cursor: 'pointer',
        borderRadius: 14,
        background: 'linear-gradient(90deg, #071530 0%, #0d2859 100%)',
        border: '1px solid rgba(0,240,255,0.25)',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <img
          src={course.localImg}
          onError={(e) => {
            (e.target as HTMLImageElement).src = course.fallbackImg;
          }}
          alt={course.titleBn}
          style={{ width: 44, height: 34, borderRadius: 6, objectFit: 'contain', background: '#fff', padding: 2, flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: BEN,
              fontWeight: 800,
              fontSize: 13,
              color: '#fff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {T(lang, course.titleBn, course.titleEn)}
          </div>
          <div style={{ fontFamily: BEN, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            Brand: DEER
          </div>
        </div>
      </div>
      <span style={{ color: '#00f0ff', fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap' }}>
        {T(lang, 'কিনুন ➔', 'Buy ➔')}
      </span>
    </div>
  );
}

// ── Main Exported AffiliateBanner ────────────────────────────────────────────
export function AffiliateBanner({
  tk,
  lang,
  course = 'all',
  variant = 'auto',
  route,
  compact = false,
  className = '',
}: AffiliateBannerProps) {
  // No ads in the Android app — web/AdSense only. Tree-shaken by rollup in the app build.
  if (NATIVE_BUILD) return null;

  // Determine effective variant when 'auto' is passed
  let resolvedVariant = variant;
  if (resolvedVariant === 'auto') {
    if (route === 'home' || !route) resolvedVariant = 'slider';
    else if (route.includes('bus')) resolvedVariant = 'spotlight';
    else if (route.includes('metro')) resolvedVariant = 'glass-stack';
    else if (route.includes('train')) resolvedVariant = 'slider';
    else if (route.includes('launch')) resolvedVariant = 'strip';
    else if (route.includes('air') || route.includes('flight')) resolvedVariant = 'grid';
    else resolvedVariant = 'glass-stack';
  }

  if (compact) resolvedVariant = 'strip';

  if (resolvedVariant === 'slider') {
    return <AffiliateSlider tk={tk} lang={lang} />;
  }

  if (resolvedVariant === 'glass-stack') {
    return <GlassStack tk={tk} lang={lang} />;
  }

  if (resolvedVariant === 'spotlight') {
    return <SpotlightShowcase tk={tk} lang={lang} />;
  }

  if (resolvedVariant === 'strip' || resolvedVariant === 'compact') {
    return <SlimStrip tk={tk} lang={lang} />;
  }

  // Default to glass stack grid
  return <GlassStack tk={tk} lang={lang} />;
}
