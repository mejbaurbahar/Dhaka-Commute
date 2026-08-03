import React, { useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

export interface CourseData {
  id: 'spoken-english' | 'vocabulary';
  titleBn: string;
  titleEn: string;
  subBn: string;
  subEn: string;
  url: string;
  localImg: string;
  fallbackImg: string;
  badge: string;
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
  },
];

export interface AffiliateBannerProps {
  tk: Tokens;
  lang: Lang;
  course?: 'spoken-english' | 'vocabulary' | 'both';
  variant?: 'hero' | 'mid' | 'compact';
  compact?: boolean;
  className?: string;
}

function CourseCard({
  course,
  tk,
  lang,
  variant,
}: {
  course: CourseData;
  tk: Tokens;
  lang: Lang;
  variant: 'hero' | 'mid' | 'compact';
}) {
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(course.localImg);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(course.url, '_blank', 'noopener,noreferrer');
  };

  const handleImgError = () => {
    if (imgSrc !== course.fallbackImg) {
      setImgSrc(course.fallbackImg);
    }
  };

  if (variant === 'hero') {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: 'pointer',
          borderRadius: 18,
          overflow: 'hidden',
          background: hovered
            ? 'linear-gradient(135deg, #09132e 0%, #0d214d 50%, #092e5c 100%)'
            : 'linear-gradient(135deg, #050b1a 0%, #081738 50%, #062247 100%)',
          border: `2px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.3)'}`,
          boxShadow: hovered
            ? '0 10px 32px rgba(0,240,255,0.3), 0 0 16px rgba(0,240,255,0.15)'
            : '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          padding: '14px 16px',
          transform: hovered ? 'translateY(-2px)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              position: 'relative',
              width: 110,
              height: 82,
              borderRadius: 12,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              background: '#09152b',
            }}
          >
            <img
              src={imgSrc}
              onError={handleImgError}
              alt={course.titleBn}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: 5,
                left: 5,
                background: course.badge === 'BESTSELLER' ? '#ff2a6d' : '#00c8f0',
                color: '#fff',
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: 8,
                padding: '2px 5px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}
            >
              {course.badge}
            </span>
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontFamily: BEN,
                fontWeight: 800,
                fontSize: 16,
                color: '#ffffff',
                lineHeight: 1.25,
                margin: '0 0 4px 0',
              }}
            >
              {T(lang, course.titleBn, course.titleEn)}
            </h3>

            <p
              style={{
                fontFamily: BEN,
                fontSize: 12,
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              {T(lang, course.subBn, course.subEn)}
            </p>
          </div>

          {/* CTA */}
          <div style={{ flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleClick}
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, #00f0ff 0%, #0070f0 100%)'
                  : 'linear-gradient(135deg, #00c8f0 0%, #0050d0 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 16px',
                fontFamily: BEN,
                fontWeight: 800,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,200,240,0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{T(lang, 'এখনই ভর্তি হন', 'Enroll Now')}</span>
              <span style={{ fontSize: 14 }}>➔</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mid or Compact variant
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        borderRadius: 14,
        overflow: 'hidden',
        background: hovered
          ? 'linear-gradient(135deg, #0c1836 0%, #0e2754 100%)'
          : 'linear-gradient(135deg, #081026 0%, #0a1b3d 100%)',
        border: `1.5px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.25)'}`,
        boxShadow: hovered
          ? '0 6px 24px rgba(0,240,255,0.22)'
          : '0 4px 14px rgba(0,0,0,0.3)',
        transition: 'all 0.22s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        width: '100%',
        boxSizing: 'border-box',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <img
        src={imgSrc}
        onError={handleImgError}
        alt={course.titleBn}
        style={{
          width: 70,
          height: 52,
          borderRadius: 8,
          objectFit: 'cover',
          flexShrink: 0,
          boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: BEN,
            fontWeight: 800,
            fontSize: 14,
            color: '#ffffff',
            lineHeight: 1.25,
            marginBottom: 2,
          }}
        >
          {T(lang, course.titleBn, course.titleEn)}
        </div>

        <div
          style={{
            fontFamily: BEN,
            fontSize: 11,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.3,
          }}
        >
          {T(lang, course.subBn, course.subEn)}
        </div>
      </div>

      <div style={{ flexShrink: 0 }}>
        <span
          style={{
            background: hovered ? '#00f0ff' : 'rgba(0,240,255,0.18)',
            color: hovered ? '#050b1a' : '#00f0ff',
            border: `1px solid ${hovered ? '#00f0ff' : 'rgba(0,240,255,0.4)'}`,
            borderRadius: 8,
            padding: '6px 12px',
            fontFamily: BEN,
            fontWeight: 800,
            fontSize: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {T(lang, 'অফার দেখুন', 'View Offer')} ➔
        </span>
      </div>
    </div>
  );
}

export function AffiliateBanner({
  tk,
  lang,
  course = 'both',
  variant,
  compact = false,
  className = '',
}: AffiliateBannerProps) {
  const activeVariant = variant || (compact ? 'compact' : 'mid');

  const selectedCourses =
    course === 'both'
      ? COURSES
      : COURSES.filter((c) => c.id === course);

  return (
    <div
      className={`kj-affiliate-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns:
          selectedCourses.length > 1
            ? 'repeat(auto-fit, minmax(300px, 1fr))'
            : '1fr',
        gap: 12,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {selectedCourses.map((c) => (
        <CourseCard
          key={c.id}
          course={c}
          tk={tk}
          lang={lang}
          variant={activeVariant}
        />
      ))}
    </div>
  );
}
