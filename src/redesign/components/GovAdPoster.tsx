/**
 * GovAdPoster — native-feeling government service hub.
 * Looks like a built-in koyjabo.com feature, not an ad.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

// ── Service definitions ────────────────────────────────────────────────────

interface ServiceDef {
  id: string;
  icon: string;
  color: string;          // accent color for icon bg and CTA
  colorText: string;      // text on accent bg
  nameEn: string; nameBn: string;
  tagEn: string; tagBn: string;
  featuresEn: string[]; featuresBn: string[];
  ctaEn: string; ctaBn: string;
  ctaUrl: string;
  secondUrl?: string; secondEn?: string; secondBn?: string;
}

const SERVICES: Record<string, ServiceDef> = {
  brta: {
    id: 'brta', icon: '🚗',
    color: '#047857', colorText: '#fff', // 700 shade — 5.48:1 on white text
    nameEn: 'BRTA', nameBn: 'BRTA',
    tagEn: 'Road Transport Authority', tagBn: 'সড়ক পরিবহন কর্তৃপক্ষ',
    featuresEn: ['Driving license check', 'Vehicle registration', 'Fitness certificate'],
    featuresBn: ['ড্রাইভিং লাইসেন্স যাচাই', 'গাড়ির রেজিস্ট্রেশন', 'ফিটনেস সার্টিফিকেট'],
    ctaEn: 'Check License', ctaBn: 'লাইসেন্স যাচাই',
    ctaUrl: 'https://bsp.brta.gov.bd',
    secondUrl: 'https://bsp.brta.gov.bd', secondEn: 'Vehicle Check', secondBn: 'গাড়ি যাচাই',
  },
  railway: {
    id: 'railway', icon: '🚂',
    color: '#2563eb', colorText: '#fff',
    nameEn: 'Bangladesh Railway', nameBn: 'বাংলাদেশ রেলওয়ে',
    tagEn: 'Train Tickets & Schedule', tagBn: 'ট্রেন টিকিট ও সময়সূচি',
    featuresEn: ['Online ticket booking', 'Live train schedule', 'PNR status — 440+ stations'],
    featuresBn: ['অনলাইন টিকিট বুকিং', 'লাইভ ট্রেনের সময়সূচি', 'PNR স্ট্যাটাস — ৪৪০+ স্টেশন'],
    ctaEn: 'Book Tickets', ctaBn: 'টিকিট বুক করুন',
    ctaUrl: 'https://eticket.railway.gov.bd',
    secondUrl: 'https://railway.gov.bd', secondEn: 'Schedule', secondBn: 'সময়সূচি',
  },
  dmtcl: {
    id: 'dmtcl', icon: '🚇',
    color: '#0e7490', colorText: '#fff', // 700 shade — 5.36:1 on white text
    nameEn: 'DMTCL Metro Rail', nameBn: 'ঢাকা মেট্রোরেল',
    tagEn: 'Dhaka Mass Transit Co. Ltd.', tagBn: 'ঢাকা ম্যাস ট্রানজিট',
    featuresEn: ['MRT Line-6 info & fares', 'Station guide & map', 'Rapid Pass smart card'],
    featuresBn: ['MRT লাইন-৬ তথ্য ও ভাড়া', 'স্টেশন গাইড ও ম্যাপ', 'র‍্যাপিড পাস স্মার্ট কার্ড'],
    ctaEn: 'DMTCL Portal', ctaBn: 'DMTCL পোর্টাল',
    ctaUrl: 'https://dmtcl.gov.bd',
    secondUrl: 'https://www.rapidpass.com.bd', secondEn: 'Rapid Pass', secondBn: 'র‍্যাপিড পাস',
  },
  biwtc: {
    id: 'biwtc', icon: '⛴️',
    color: '#0369a1', colorText: '#fff',
    nameEn: 'BIWTC Launch', nameBn: 'BIWTC লঞ্চ সেবা',
    tagEn: 'Inland Water Transport', tagBn: 'অভ্যন্তরীণ নৌ-পরিবহন',
    featuresEn: ['Sadarghat schedules', 'Launch routes & fares', 'Terminal information'],
    featuresBn: ['সদরঘাট সময়সূচি', 'লঞ্চ রুট ও ভাড়া', 'টার্মিনাল তথ্য'],
    ctaEn: 'View Schedules', ctaBn: 'সময়সূচি দেখুন',
    ctaUrl: 'https://biwtc.gov.bd',
  },
  biman: {
    id: 'biman', icon: '✈️',
    color: '#dc2626', colorText: '#fff',
    nameEn: 'Biman Bangladesh', nameBn: 'বিমান বাংলাদেশ',
    tagEn: 'National Airline', tagBn: 'জাতীয় বিমান সংস্থা',
    featuresEn: ['Domestic & international flights', 'Web check-in', 'Flight status'],
    featuresBn: ['দেশ-বিদেশে ফ্লাইট', 'ওয়েব চেক-ইন', 'ফ্লাইট স্ট্যাটাস'],
    ctaEn: 'Book Flight', ctaBn: 'ফ্লাইট বুক করুন',
    ctaUrl: 'https://www.biman-airlines.com',
    secondUrl: 'https://www.biman-airlines.com/flight-status', secondEn: 'Flight Status', secondBn: 'ফ্লাইট স্ট্যাটাস',
  },
  mygov: {
    id: 'mygov', icon: '🏛️',
    color: '#047857', colorText: '#fff',
    nameEn: 'MyGov Bangladesh', nameBn: 'মাইগভ বাংলাদেশ',
    tagEn: '500+ Govt. Services', tagBn: '৫০০+ সরকারি সেবা',
    featuresEn: ['Birth certificate & NID', 'Passport application', 'Land records & tax'],
    featuresBn: ['জন্ম নিবন্ধন ও NID', 'পাসপোর্ট আবেদন', 'ভূমি তথ্য ও ট্যাক্স'],
    ctaEn: 'Browse Services', ctaBn: 'সেবা দেখুন',
    ctaUrl: 'https://www.mygov.bd',
    secondUrl: 'https://www.mygov.bd/en/application-status', secondEn: 'App. Status', secondBn: 'আবেদনের অবস্থা',
  },
  nid: {
    id: 'nid', icon: '🪪',
    color: '#7c3aed', colorText: '#fff',
    nameEn: 'NID / Smart Card', nameBn: 'NID / স্মার্ট কার্ড',
    tagEn: 'National Identity Services', tagBn: 'জাতীয় পরিচয়পত্র সেবা',
    featuresEn: ['NID verification online', 'Smart card delivery status', 'Correction request'],
    featuresBn: ['NID যাচাই অনলাইনে', 'স্মার্ট কার্ড স্ট্যাটাস', 'সংশোধন আবেদন'],
    ctaEn: 'NID Portal', ctaBn: 'NID পোর্টাল',
    ctaUrl: 'https://services.nidw.gov.bd',
    secondUrl: 'https://everify.bdris.gov.bd', secondEn: 'Verify NID', secondBn: 'NID যাচাই',
  },
  passport: {
    id: 'passport', icon: '🛂',
    color: '#1d4ed8', colorText: '#fff',
    nameEn: 'e-Passport / MRP', nameBn: 'ই-পাসপোর্ট সেবা',
    tagEn: 'Apply & Track Passport', tagBn: 'পাসপোর্ট আবেদন ও ট্র্যাক',
    featuresEn: ['New & renewal application', 'Delivery tracking', 'Enrollment center finder'],
    featuresBn: ['নতুন ও নবায়ন আবেদন', 'ডেলিভারি ট্র্যাকিং', 'নথিভুক্তি কেন্দ্র'],
    ctaEn: 'Apply Online', ctaBn: 'অনলাইনে আবেদন',
    ctaUrl: 'https://www.epassport.gov.bd',
    secondUrl: 'https://www.epassport.gov.bd/authorization/application-status', secondEn: 'Track Status', secondBn: 'স্ট্যাটাস ট্র্যাক',
  },
  land: {
    id: 'land', icon: '🗺️',
    color: '#b45309', colorText: '#fff',
    nameEn: 'Land Services', nameBn: 'ভূমি সেবা',
    tagEn: 'Bangladesh Land Portal', tagBn: 'বাংলাদেশ ভূমি পোর্টাল',
    featuresEn: ['Land ownership (Khatian)', 'Mutation / Namjari', 'Plot map & deed'],
    featuresBn: ['জমির মালিকানা (খতিয়ান)', 'নামজারি আবেদন', 'মৌজা ম্যাপ ও দলিল'],
    ctaEn: 'Land Portal', ctaBn: 'ভূমি পোর্টাল',
    ctaUrl: 'https://land.gov.bd',
  },
  dghs: {
    id: 'dghs', icon: '🏥',
    color: '#0f766e', colorText: '#fff',
    nameEn: 'DGHS Health', nameBn: 'স্বাস্থ্য সেবা',
    tagEn: 'Directorate General of Health', tagBn: 'স্বাস্থ্য অধিদপ্তর',
    featuresEn: ['Hospital & doctor finder', 'Medicine price check', 'Hotline: 16000'],
    featuresBn: ['হাসপাতাল ও ডাক্তার', 'ওষুধের দাম যাচাই', 'হটলাইন: ১৬০০০'],
    ctaEn: 'Health Services', ctaBn: 'স্বাস্থ্য সেবা',
    ctaUrl: 'https://www.dghs.gov.bd',
    secondUrl: 'tel:16000', secondEn: 'Hotline 16000', secondBn: 'হটলাইন ১৬০০০',
  },
  bpsc: {
    id: 'bpsc', icon: '📝',
    color: '#c2410c', colorText: '#fff',
    nameEn: 'BPSC — Govt. Jobs', nameBn: 'BPSC — সরকারি চাকরি',
    tagEn: 'Bangladesh Public Service Commission', tagBn: 'বাংলাদেশ কর্ম কমিশন',
    featuresEn: ['BCS circular & results', 'Exam schedule & admit card', 'Online application'],
    featuresBn: ['BCS বিজ্ঞপ্তি ও ফলাফল', 'পরীক্ষার সূচি ও এডমিট', 'অনলাইন আবেদন'],
    ctaEn: 'BPSC Portal', ctaBn: 'BPSC পোর্টাল',
    ctaUrl: 'http://www.bpsc.gov.bd',
    secondUrl: 'https://bpsc.teletalk.com.bd', secondEn: 'Apply Now', secondBn: 'আবেদন করুন',
  },
  nbr: {
    id: 'nbr', icon: '💰',
    color: '#0369a1', colorText: '#fff',
    nameEn: 'NBR — Tax & VAT', nameBn: 'জাতীয় রাজস্ব বোর্ড',
    tagEn: 'National Board of Revenue', tagBn: 'ট্যাক্স ও ভ্যাট সেবা',
    featuresEn: ['Income tax e-return filing', 'TIN certificate', 'VAT registration'],
    featuresBn: ['আয়কর ই-রিটার্ন দাখিল', 'TIN সার্টিফিকেট', 'ভ্যাট নিবন্ধন'],
    ctaEn: 'NBR Portal', ctaBn: 'NBR পোর্টাল',
    ctaUrl: 'https://www.nbr.gov.bd',
    secondUrl: 'https://etaxnbr.gov.bd', secondEn: 'File e-Return', secondBn: 'ই-রিটার্ন দাখিল',
  },
  btcl: {
    id: 'btcl', icon: '📞',
    color: '#0e7490', colorText: '#fff', // 700 shade — 5.36:1 on white text
    nameEn: 'BTCL', nameBn: 'বিটিসিএল',
    tagEn: 'Bangladesh Telecom Co. Ltd.', tagBn: 'বাংলাদেশ টেলিযোগাযোগ',
    featuresEn: ['Landline bill payment', 'Broadband internet', 'PSTN directory'],
    featuresBn: ['ল্যান্ডলাইন বিল পেমেন্ট', 'ব্রডব্যান্ড ইন্টারনেট', 'PSTN ডিরেক্টরি'],
    ctaEn: 'BTCL Portal', ctaBn: 'BTCL পোর্টাল',
    ctaUrl: 'https://www.btcl.gov.bd',
  },
};

export const POSTER_IDS_ALL = [
  'brta', 'railway', 'dmtcl', 'biwtc', 'biman',
  'mygov', 'nid', 'passport', 'land', 'dghs', 'bpsc', 'nbr', 'btcl',
];

// ── Quick-access chip row (horizontal scroll) ──────────────────────────────

function QuickChips({ defs, lang, tk }: { defs: ServiceDef[]; lang: Lang; tk: Tokens }) {
  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    } as React.CSSProperties}>
      {defs.map(d => (
        <a
          key={d.id}
          href={d.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            flexShrink: 0, textDecoration: 'none',
            width: 64,
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 16, flexShrink: 0,
            background: `${d.color}18`,
            border: `1.5px solid ${d.color}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
            boxShadow: `0 2px 8px ${d.color}15`,
            transition: 'transform 0.15s ease',
          }}>
            {d.icon}
          </div>
          <span style={{
            fontFamily: font, fontSize: 10, fontWeight: 600,
            color: tk.textDim, textAlign: 'center', lineHeight: 1.25,
            width: 64, overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}>
            {T(lang, d.nameBn, d.nameEn)}
          </span>
        </a>
      ))}
    </div>
  );
}

// ── Detail card ────────────────────────────────────────────────────────────

function ServiceCard({ d, lang, tk }: { d: ServiceDef; lang: Lang; tk: Tokens }) {
  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;

  return (
    <div style={{
      background: tk.panelSolid,
      border: `1px solid ${tk.line}`,
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: tk.shadow,
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow 0.2s ease',
    }}>
      {/* Color accent strip */}
      <div style={{ height: 3, background: d.color, opacity: 0.85 }} />

      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Icon */}
        <div style={{
          width: 46, height: 46, borderRadius: 13, flexShrink: 0,
          background: `${d.color}14`,
          border: `1.5px solid ${d.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          {d.icon}
        </div>

        {/* Name + tag */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{
            fontFamily: font, fontWeight: 700, fontSize: 14,
            color: tk.text, lineHeight: 1.2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {T(lang, d.nameBn, d.nameEn)}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', marginTop: 4,
            background: `${d.color}12`, borderRadius: 999, padding: '2px 8px',
            border: `1px solid ${d.color}20`,
          }}>
            <span style={{
              fontFamily: SANS, fontSize: 9.5, fontWeight: 600,
              color: d.color, letterSpacing: 0.2,
            }}>
              {T(lang, d.tagBn, d.tagEn)}
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <ul style={{ margin: '12px 0 0', padding: '0 16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {d.featuresEn.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
              background: d.color, opacity: 0.7, marginTop: 5,
            }} />
            <span style={{
              fontFamily: font, fontSize: 12, color: tk.textDim, lineHeight: 1.4,
            }}>
              {T(lang, d.featuresBn[i] ?? f, f)}
            </span>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div style={{ margin: '12px 16px 0', height: 1, background: tk.line }} />

      {/* CTA buttons */}
      <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        <a
          href={d.ctaUrl}
          target={d.ctaUrl.startsWith('tel:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          style={{
            background: d.color, color: d.colorText,
            borderRadius: 999, padding: '7px 16px',
            fontFamily: font, fontWeight: 700, fontSize: 12,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5,
            boxShadow: `0 3px 12px ${d.color}35`,
            whiteSpace: 'nowrap',
          }}
        >
          {T(lang, d.ctaBn, d.ctaEn)}
          <span style={{ fontSize: 13, opacity: 0.85 }}>→</span>
        </a>
        {d.secondUrl && (
          <a
            href={d.secondUrl}
            target={d.secondUrl.startsWith('tel:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            style={{
              background: `${d.color}12`,
              color: d.color,
              border: `1px solid ${d.color}25`,
              borderRadius: 999, padding: '7px 14px',
              fontFamily: font, fontWeight: 600, fontSize: 12,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
              whiteSpace: 'nowrap',
            }}
          >
            {T(lang, d.secondBn, d.secondEn)}
          </a>
        )}
      </div>
    </div>
  );
}

// ── GovServiceCarousel — codepen myRBYmd replica (accordion slider) ─────────
// Desktop: horizontal snap track; cards 5rem → 30rem on activate with
// translateY(-6px) + shadow; title vertical-rl closed → big horizontal active;
// thumb/desc/Details revealed on active; dot nav. Mobile: vertical column,
// 80px → 300px, full-width controls, dots hidden. Interactions: click, hover
// (hover-capable only), prev/next buttons, keyboard arrows, touch swipe,
// resize re-center. "Same to same" as the codepen animation.

function isDarkToken(bg: string): boolean {
  const m = bg.match(/[0-9a-f]{6}/i);
  if (!m) return true;
  const v = parseInt(m[0], 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
}

const GOV_SLIDER_CSS = `
/* exact codepen myRBYmd structure — 13 cards, so --closed 4rem so the
   closed row fits (pen's 5rem × 5 cards). Scroller = .slider (overflow hidden
   still scrolls programmatically); track overflow visible. */
.kj-gov-slider { --gap: 1.25rem; --speed: 0.55s cubic-bezier(.25,.46,.45,.94); --closed: 4rem; --open: 30rem; }
.kj-gov-slider .head {
  max-width: 1400px; margin: 0 auto; padding: 30px 20px 24px;
  display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem;
}
.kj-gov-slider .head h2 {
  margin: 0; font: 400 1.5rem/1.2 inherit; color: var(--kj-head);
}
@media (min-width: 1024px) {
  .kj-gov-slider .head h2 { font-size: 2.25rem; }
}
.kj-gov-slider .controls { display: flex; gap: .5rem; flex-shrink: 0; }
.kj-gov-slider .nav-btn {
  width: 2.5rem; height: 2.5rem; border: none; border-radius: 50%;
  background: var(--kj-btn-bg); color: var(--kj-btn-fg);
  font-size: 1.5rem; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background .3s;
}
.kj-gov-slider .nav-btn:hover { background: var(--kj-accent); }
.kj-gov-slider .nav-btn:disabled { opacity: .3; cursor: default; }
.kj-gov-slider .slider {
  position: relative; max-width: 1400px; margin: 0 auto;
  overflow: hidden; scroll-snap-type: x mandatory;
}
.kj-gov-slider .track {
  display: flex; gap: var(--gap);
  align-items: flex-start; justify-content: flex-start;
  scroll-behavior: smooth; padding-bottom: 40px;
}
.kj-gov-slider .track::-webkit-scrollbar { display: none; }
.kj-gov-slider .project-card {
  position: relative; flex: 0 0 var(--closed); min-height: 26rem;
  border-radius: 1rem; overflow: hidden; cursor: pointer;
  scroll-snap-align: center;
  transition: flex-basis var(--speed), transform var(--speed);
}
.kj-gov-slider .project-card[data-active] {
  flex-basis: var(--open); transform: translateY(-6px);
  box-shadow: rgba(0,0,0,.45) 0 18px 55px;
}
.kj-gov-slider .art {
  position: absolute; inset: 0; width: 100%; height: 100%;
  filter: brightness(.75) saturate(75%);
  transition: filter .3s, transform var(--speed);
}
.kj-gov-slider .project-card:hover .art { filter: brightness(.9) saturate(100%); transform: scale(1.06); }
.kj-gov-slider .art-mark {
  position: absolute; right: -8px; bottom: -24px; font-size: 150px; line-height: 1;
  opacity: .16; transform: rotate(-12deg); pointer-events: none;
}
.kj-gov-slider .content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  gap: .7rem; padding: 0;
  background: linear-gradient(transparent 40%, rgba(0,0,0,.85) 100%);
  z-index: 2;
}
.kj-gov-slider .title {
  color: #fff; font-weight: 700; font-size: 1.35rem; line-height: 1.15;
  writing-mode: vertical-rl; transform: rotate(180deg);
  white-space: nowrap; margin: 0;
}
.kj-gov-slider .thumb, .kj-gov-slider .desc, .kj-gov-slider .details-btn { display: none; }
.kj-gov-slider .project-card[data-active] .content {
  flex-direction: row; align-items: center; padding: 1.2rem 2rem; gap: 1.1rem;
}
.kj-gov-slider .project-card[data-active] .title {
  writing-mode: horizontal-tb; transform: none; font-size: 2.4rem;
}
.kj-gov-slider .thumb {
  width: 133px; height: 269px; border-radius: .45rem;
  object-fit: cover; box-shadow: rgba(0,0,0,.4) 0 4px 10px;
  flex-shrink: 0;
}
.kj-gov-slider .desc {
  color: #ddd; font-size: 1rem; line-height: 1.4; max-width: 16rem;
}
.kj-gov-slider .details-btn {
  padding: .55rem 1.3rem; border: none; border-radius: 9999px;
  background: var(--kj-accent); color: #fff;
  font-size: .9rem; font-weight: 600; cursor: pointer;
  text-decoration: none; font-family: inherit;
}
.kj-gov-slider .details-btn:hover { filter: brightness(1.15); }
.kj-gov-slider .project-card[data-active] .thumb,
.kj-gov-slider .project-card[data-active] .desc,
.kj-gov-slider .project-card[data-active] .details-btn { display: block; }
.kj-gov-slider .project-card[data-active] .thumb { display: flex; align-items: center; justify-content: center; }
.kj-gov-slider .dots { display: flex; gap: .4rem; justify-content: center; padding: 16px 0; }
.kj-gov-slider .dot {
  width: 7px; height: 7px; min-width: 0; min-height: 0; border-radius: 50%;
  background: var(--kj-dot); border: none; cursor: pointer; padding: 0;
  transition: background .3s, transform .3s;
}
.kj-gov-slider .dot.active { background: var(--kj-accent); transform: scale(1.3); }

@media (max-width: 767px) {
  .kj-gov-slider { --closed: 100%; --open: 100%; --gap: .8rem; }
  .kj-gov-slider .head {
    padding: 30px 15px 20px; flex-direction: column; align-items: flex-start; gap: 1rem;
  }
  .kj-gov-slider .slider { padding: 0 15px; scroll-snap-type: y mandatory; }
  .kj-gov-slider .track {
    flex-direction: column; scroll-snap-type: y mandatory;
    gap: .8rem; padding-bottom: 20px;
  }
  .kj-gov-slider .project-card {
    height: auto; min-height: 80px; flex: 0 0 auto; width: 100%;
    scroll-snap-align: start;
  }
  .kj-gov-slider .project-card[data-active] {
    min-height: 500px; transform: none;
    box-shadow: rgba(0,0,0,.3) 0 8px 25px;
  }
  .kj-gov-slider .content {
    flex-direction: row; justify-content: flex-start;
    padding: 1rem; align-items: center; gap: 1rem;
  }
  .kj-gov-slider .title {
    writing-mode: horizontal-tb; transform: none;
    font-size: 1.2rem; margin-right: auto;
  }
  .kj-gov-slider .thumb, .kj-gov-slider .desc, .kj-gov-slider .details-btn { display: none; }
  .kj-gov-slider .project-card[data-active] .content {
    flex-direction: column; align-items: flex-start; padding: 1.5rem;
  }
  .kj-gov-slider .project-card[data-active] .title {
    font-size: 1.6rem; margin: 0 0 .6rem;
  }
  .kj-gov-slider .project-card[data-active] .thumb {
    width: 160px; height: 214px; border-radius: .35rem; margin-bottom: 1rem;
  }
  .kj-gov-slider .project-card[data-active] .desc {
    font-size: .95rem; max-width: 100%; margin-bottom: 1rem;
  }
  .kj-gov-slider .project-card[data-active] .details-btn {
    align-self: center; width: 100%; text-align: center; padding: .7rem;
  }
  .kj-gov-slider .dots { display: none; }
  .kj-gov-slider .controls {
    width: 100%; justify-content: space-between; padding: 0 15px 20px;
  }
  .kj-gov-slider .nav-btn { position: static; transform: none; }
}
`;

export function GovServiceCarousel({
  tk,
  lang,
  ids = POSTER_IDS_ALL,
  label = true,
}: {
  tk: Tokens;
  lang: Lang;
  ids?: string[];
  label?: boolean;
}) {
  const defs = ids.map(id => SERVICES[id]).filter(Boolean);
  if (!defs.length) return null;

  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;
  const dark = isDarkToken(tk.bg);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);

  const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  // scroll the active card to the center of the slider (like the codepen)
  const center = useCallback((i: number) => {
    const wrap = wrapRef.current;
    const card = trackRef.current?.children[i] as HTMLElement | undefined;
    if (!wrap || !card) return;
    const mobile = isMobile();
    const opt: ScrollToOptions = { behavior: 'smooth' };
    if (mobile) opt.top = card.offsetTop - wrap.clientHeight / 2 + card.offsetHeight / 2;
    else opt.left = card.offsetLeft - wrap.clientWidth / 2 + card.offsetWidth / 2;
    wrap.scrollTo(opt);
  }, []);

  // currentRef mirrors state so rapid clicks/keypresses never use a stale index
  const activate = useCallback((i: number) => {
    if (i === currentRef.current) return;
    currentRef.current = i;
    setCurrent(i);
    center(i);
  }, [center]);

  const go = (step: number) => {
    const next = currentRef.current + step;
    if (next >= 0 && next < defs.length) activate(next);
  };

  // center the first card once layout is ready
  useEffect(() => {
    const t = setTimeout(() => center(0), 150);
    return () => clearTimeout(t);
  }, [center]);

  // keyboard arrows (desktop only)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isMobile()) return;
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // re-center on resize
  useEffect(() => {
    const onResize = () => center(current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [current, center]);

  // touch swipe: vertical on mobile, horizontal on desktop
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    const mobile = isMobile();
    if ((mobile && Math.abs(dy) > 60) || (!mobile && Math.abs(dx) > 60)) {
      go(Math.sign(mobile ? dy : -dx));
    }
  };

  const vars = {
    '--kj-accent': tk.primary,
    '--kj-head': tk.text,
    '--kj-dot': dark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.35)',
    '--kj-btn-bg': dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)',
    '--kj-btn-fg': dark ? '#fff' : '#222',
  } as React.CSSProperties;

  return (
    <div className="kj-gov-slider" style={{ width: '100%', boxSizing: 'border-box', ...vars }}>
      <style>{GOV_SLIDER_CSS}</style>

      <div className="head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ width: 3, height: 20, borderRadius: 2, background: tk.primary, flexShrink: 0 }} />
          <h2 style={{ fontFamily: font, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {label ? T(lang, 'সরকারি সেবা', 'Government Services') : T(lang, 'সেবা', 'Services')}
          </h2>
          <div style={{
            background: tk.primarySoft, borderRadius: 999, padding: '2px 10px',
            fontFamily: SANS, fontSize: 9.5, fontWeight: 700,
            color: tk.primary, letterSpacing: 0.3, flexShrink: 0,
          }}>
            {T(lang, 'অফিসিয়াল', 'Official')}
          </div>
        </div>
        <div className="controls">
          <button className="nav-btn" disabled={current === 0} onClick={() => go(-1)} aria-label={T(lang, 'আগের সেবা', 'Previous service')}>‹</button>
          <button className="nav-btn" disabled={current === defs.length - 1} onClick={() => go(1)} aria-label={T(lang, 'পরের সেবা', 'Next service')}>›</button>
        </div>
      </div>

      <div className="slider" ref={wrapRef}>
        <div
          className="track"
          ref={trackRef}
          onTouchStart={e => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchEnd={onTouchEnd}
        >
          {defs.map((d, i) => {
            const c = d.color;
            const art = `radial-gradient(120% 90% at 85% 10%, ${c}59 0%, transparent 55%), linear-gradient(165deg, ${c}ad 0%, ${c}40 50%, #0b1322 100%)`;
            const thumbBg = `linear-gradient(160deg, ${c}dd 0%, ${c}55 100%)`;
            const descText = `${T(lang, d.tagBn, d.tagEn)} · ${d.featuresEn.slice(0, 2).map((f, i) => T(lang, d.featuresBn[i] ?? f, f)).join(' · ')}`;
            const name = T(lang, d.nameBn, d.nameEn);
            const cta = T(lang, d.ctaBn, d.ctaEn);
            return (
              <div
                key={d.id}
                className="project-card"
                data-active={i === current ? '' : undefined}
                onMouseEnter={canHover ? () => activate(i) : undefined}
                onClick={() => activate(i)}
              >
                <div className="art" style={{ background: art }}>
                  <div className="art-mark">{d.icon}</div>
                </div>
                <div className="content">
                  <div className="thumb" style={{ background: thumbBg, fontSize: 56 }}>
                    {d.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 className="title">{name}</h3>
                    <p className="desc">{descText}</p>
                    <a
                      className="details-btn"
                      href={d.ctaUrl}
                      target={d.ctaUrl.startsWith('tel:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                    >
                      {cta} <span style={{ fontSize: 13, opacity: 0.85 }}>→</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="dots">
        {defs.map((d, i) => (
          <button
            key={d.id}
            className={'dot' + (i === current ? ' active' : '')}
            onClick={() => activate(i)}
            aria-label={T(lang, 'সেবা', 'Service') + ' ' + (i + 1)}
          />
        ))}
      </div>
    </div>
  );
}

// ── GovAdPoster — the public component ────────────────────────────────────

export function GovAdPoster({
  tk,
  lang,
  ids = POSTER_IDS_ALL,
  columns = 2,
  label = true,
  quickRow = false,
}: {
  tk: Tokens;
  lang: Lang;
  ids?: string[];
  columns?: 1 | 2 | 3;
  label?: boolean;
  quickRow?: boolean;
}) {
  const defs = ids.map(id => SERVICES[id]).filter(Boolean);
  if (!defs.length) return null;

  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Section header */}
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 3, height: 20, borderRadius: 2, background: tk.primary, flexShrink: 0 }} />
          <span style={{
            fontFamily: font, fontSize: 13, fontWeight: 700,
            color: tk.text, letterSpacing: -0.2,
          }}>
            {T(lang, 'সরকারি সেবা', 'Government Services')}
          </span>
          <div style={{
            marginLeft: 4,
            background: tk.primarySoft,
            borderRadius: 999, padding: '2px 10px',
            fontFamily: SANS, fontSize: 9.5, fontWeight: 700,
            color: tk.primary, letterSpacing: 0.3,
          }}>
            {T(lang, 'অফিসিয়াল', 'Official')}
          </div>
        </div>
      )}

      {/* Quick-access row */}
      {quickRow && (
        <div style={{ marginBottom: 16 }}>
          <QuickChips defs={defs} lang={lang} tk={tk} />
        </div>
      )}

      {/* Detail cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 12,
      }}>
        {defs.map(d => (
          <ServiceCard key={d.id} d={d} lang={lang} tk={tk} />
        ))}
      </div>
    </div>
  );
}
