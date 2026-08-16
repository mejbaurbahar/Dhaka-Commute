import React from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, N } from '../tokens';
import { PageShell, PageShellProps } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { BLOG_POSTS } from '../../../data/blogPosts';

// Category → gradient colors
const CAT_COLORS: Record<string, [string, string]> = {
  Metro:     ['#1e3a8a', '#3b82f6'],
  Intercity: ['#064e3b', '#10b981'],
  Launch:    ['#075985', '#0ea5e9'],
  Tips:      ['#b45309', '#f59e0b'],
  Train:     ['#5b21b6', '#8b5cf6'],
  Flights:   ['#b91c1c', '#ef4444'],
  Guide:     ['#065f46', '#34d399'],
  News:      ['#1e3a8a', '#6366f1'],
};

function catColors(category: string): [string, string] {
  return CAT_COLORS[category] ?? ['#374151', '#6b7280'];
}

// Map BLOG_POSTS to the shape expected by BlogCard
const BLOGS = BLOG_POSTS.map(p => {
  const [from, to] = catColors(p.category);
  return {
    id: p.slug,
    titleEn: p.title,
    titleBn: p.bnTitle || p.title,
    dateTs: new Date(p.publishDate).getTime(),
    category: p.category,
    readTime: p.readTime,
    tags: p.keywords?.slice(0, 3) ?? [],
    from,
    to,
    coverImage: p.coverImage || null,
  };
});

function BlogCard({
  blog,
  tk,
  lang,
  onNav,
}: {
  blog: typeof BLOGS[0];
  tk: Tokens;
  lang: Lang;
  onNav: (r: string, p?: Record<string, string>) => void;
}) {
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  const dateStr = new Date(blog.dateTs).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric' });
  return (
    <div
      onClick={() => onNav('blog-detail', { slug: blog.id })}
      className="kj-card"
      style={{
        background: tk.panel,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${tk.line}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onNav('blog-detail', { slug: blog.id })}
    >
      {/* Cover image or gradient hero thumbnail */}
      <div
        style={{
          background: blog.coverImage
            ? `url(${blog.coverImage}) center/cover no-repeat, linear-gradient(135deg, ${blog.from} 0%, ${blog.to} 100%)`
            : `linear-gradient(135deg, ${blog.from} 0%, ${blog.to} 100%)`,
          height: 140,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '12px 14px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent 100%)' }} />
        <span
          style={{
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderRadius: 6,
            padding: '3px 9px',
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: 0.3,
          }}
        >
          {blog.category}
        </span>
      </div>

      <div style={{ padding: '16px 16px 18px' }}>
        <h3
          style={{
            fontFamily: lang === 'bn' ? BEN : SANS,
            fontSize: 14,
            fontWeight: 700,
            color: tk.text,
            margin: '0 0 8px',
            lineHeight: 1.45,
          }}
        >
          {lbl(blog.titleEn, blog.titleBn)}
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              color: tk.textFaint,
            }}
          >
            {dateStr}
          </span>
          <span style={{ color: tk.line, fontSize: 10 }}>·</span>
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              color: tk.textFaint,
            }}
          >
            {blog.readTime} {lbl('read', 'পড়া')}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: tk.chipBg,
                borderRadius: 6,
                padding: '2px 8px',
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 500,
                color: tk.chipText,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogsPage(props: PageShellProps) {
  const { theme, lang, device } = props;
  useDocumentTitle(lang === 'bn' ? 'পরিবহন ব্লগ' : 'Transport Blog');
  const tk: Tokens = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  const firstRow = BLOGS.slice(0, 3);
  const secondRow = BLOGS.slice(3);

  return (
    <PageShell {...props}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px 80px' : '0 40px 80px' }}>

        {/* Hero banner */}
        <div className="kj-enter-1" style={{
          borderRadius: 22, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #0f2d4a 0%, #1e3a8a 50%, #5b21b6 100%)',
          color: '#fff', padding: isMobile ? '28px 20px 22px' : '40px 40px 32px',
          marginBottom: 28, marginTop: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        }}>
          {/* grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)',
          }} />
          {/* blob */}
          <div style={{ position: 'absolute', right: -50, top: -50, width: 220, height: 220, borderRadius: 999, background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 800, letterSpacing: 1.8, opacity: 0.75, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              📰 {lbl('KoyJabo · Blog', 'কই যাবো · ব্লগ')}
            </span>
            <h1 style={{ fontFamily: BEN, fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.15 }}>
              {lbl('Transport Blog', 'পরিবহন ব্লগ')}
            </h1>
            <p style={{ fontFamily: lang === 'bn' ? BEN : SANS, fontSize: isMobile ? 13 : 14, opacity: 0.85, margin: 0, maxWidth: 500 }}>
              {lbl('Guides, tips and transport news from Bangladesh', 'বাংলাদেশের পরিবহন গাইড, টিপস ও সংবাদ')}
            </p>
            {/* frosted stat strip */}
            <div style={{
              marginTop: 18, display: 'inline-flex', gap: 0,
              background: 'rgba(0,0,0,0.18)', borderRadius: 12, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}>
              {[
                { v: N(BLOGS.length, lang), l: lbl('Articles', 'আর্টিকেল') },
                { v: N(5, lang) + ' min', l: lbl('Avg read', 'গড় পড়া') },
                { v: N(8, lang), l: lbl('Topics', 'বিষয়') },
              ].map((s, i) => (
                <div key={i} style={{ padding: '10px 16px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div className="kj-stat" style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, letterSpacing: -0.5, color: '#fff' }}>{s.v}</div>
                  <div style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, opacity: 0.7, textTransform: 'uppercase', marginTop: 3, color: '#fff' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* First row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {firstRow.map((b, idx) => (
            <div key={b.id} className={`kj-enter-${idx + 1}`}>
              <BlogCard blog={b} tk={tk} lang={lang} onNav={props.onNav} />
            </div>
          ))}
        </div>

        {/* Native ad between rows */}
        <div style={{ marginBottom: 24 }}>
          <NativeAdCard
            tk={tk}
            lang={lang}
            kind={isMobile ? 'mob-banner' : 'mid-rect'}
            title={T(lang, 'পাঠকদের জন্য সুপারিশ', 'Recommended for readers')}
            subtitle={T(lang, 'ভ্রমণ ও পরিবহন', 'Travel & transport')}
            icon="📚"
            compact
          />
        </div>

        {/* Second row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {secondRow.map((b, idx) => (
            <div key={b.id} className={`kj-enter-${(idx % 3) + 1}`}>
              <BlogCard blog={b} tk={tk} lang={lang} onNav={props.onNav} />
            </div>
          ))}
        </div>

        {/* Footer ad */}
        <NativeAdCard
          tk={tk}
          lang={lang}
          kind={isMobile ? 'mob-banner' : 'leaderboard'}
          title={T(lang, 'আরও পড়ুন', 'More reads')}
          icon="📖"
        />
      </div>
          <AdCluster tk={tk} lang={lang} count={3} isMobile={isMobile}/>
    </PageShell>
  );
}
