/**
 * GovAdPoster — fixed (non-slider) government service poster cards.
 * Styled like display ads / feature posters. Each card is a self-contained
 * visual unit with gradient background, icon, key info, and CTA links.
 */
import React from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

interface PosterDef {
  id: string;
  icon: string;
  gradA: string; gradB: string;
  accent: string;
  nameEn: string; nameBn: string;
  tagEn: string; tagBn: string;
  bulletEn: string[]; bulletBn: string[];
  links: { en: string; bn: string; url: string; primary?: boolean }[];
}

const ALL_POSTERS: Record<string, PosterDef> = {
  /* ── Transport ── */
  brta: {
    id: 'brta',
    icon: '🚗',
    gradA: '#022514', gradB: '#064e3b',
    accent: '#10b981',
    nameEn: 'BRTA', nameBn: 'BRTA',
    tagEn: 'Road Transport Authority', tagBn: 'সড়ক পরিবহন কর্তৃপক্ষ',
    bulletEn: ['Check driving license', 'Vehicle registration', 'Fitness certificate', 'Route permit'],
    bulletBn: ['ড্রাইভিং লাইসেন্স', 'গাড়ির রেজিস্ট্রেশন', 'ফিটনেস সার্টিফিকেট', 'রুট পারমিট'],
    links: [
      { en: 'License Check', bn: 'লাইসেন্স যাচাই', url: 'https://bsp.brta.gov.bd/license-check', primary: true },
      { en: 'Vehicle Check', bn: 'গাড়ি যাচাই', url: 'https://bsp.brta.gov.bd/vehicle-check' },
    ],
  },
  railway: {
    id: 'railway',
    icon: '🚂',
    gradA: '#06082e', gradB: '#1e3a8a',
    accent: '#60a5fa',
    nameEn: 'Bangladesh Railway', nameBn: 'বাংলাদেশ রেলওয়ে',
    tagEn: 'Train Tickets & Schedule', tagBn: 'ট্রেন টিকিট ও সময়সূচি',
    bulletEn: ['Online ticket booking', 'Real-time schedule', 'PNR status check', '440+ stations'],
    bulletBn: ['অনলাইন টিকিট বুকিং', 'রিয়েল-টাইম সময়সূচি', 'PNR স্ট্যাটাস', '৪৪০+ স্টেশন'],
    links: [
      { en: 'Buy Tickets', bn: 'টিকিট কিনুন', url: 'https://eticket.railway.gov.bd', primary: true },
      { en: 'Schedule', bn: 'সময়সূচি', url: 'https://railway.gov.bd/pages/train_schedule.php' },
    ],
  },
  biwtc: {
    id: 'biwtc',
    icon: '⛴️',
    gradA: '#031220', gradB: '#075985',
    accent: '#38bdf8',
    nameEn: 'BIWTC', nameBn: 'BIWTC',
    tagEn: 'Inland Water Transport', tagBn: 'অভ্যন্তরীণ নৌ-পরিবহন',
    bulletEn: ['Sadarghat schedules', 'Launch routes & fares', 'Waterway terminals', 'Ticket info'],
    bulletBn: ['সদরঘাট সময়সূচি', 'লঞ্চ রুট ও ভাড়া', 'নৌ-টার্মিনাল', 'টিকিট তথ্য'],
    links: [
      { en: 'View Schedules', bn: 'সময়সূচি দেখুন', url: 'https://biwtc.gov.bd', primary: true },
    ],
  },
  biman: {
    id: 'biman',
    icon: '✈️',
    gradA: '#150404', gradB: '#991b1b',
    accent: '#fca5a5',
    nameEn: 'Biman Bangladesh', nameBn: 'বিমান বাংলাদেশ',
    tagEn: 'National Airline', tagBn: 'জাতীয় বিমান সংস্থা',
    bulletEn: ['Domestic flights', 'International routes', 'Web check-in', 'Flight status'],
    bulletBn: ['অভ্যন্তরীণ ফ্লাইট', 'আন্তর্জাতিক রুট', 'ওয়েব চেক-ইন', 'ফ্লাইট স্ট্যাটাস'],
    links: [
      { en: 'Book Flight', bn: 'ফ্লাইট বুক করুন', url: 'https://www.biman-airlines.com', primary: true },
      { en: 'Flight Status', bn: 'ফ্লাইট স্ট্যাটাস', url: 'https://www.biman-airlines.com/flight-status' },
    ],
  },
  /* ── Citizen services ── */
  mygov: {
    id: 'mygov',
    icon: '🏛️',
    gradA: '#011a0d', gradB: '#065f46',
    accent: '#34d399',
    nameEn: 'MyGov Bangladesh', nameBn: 'মাইগভ বাংলাদেশ',
    tagEn: '500+ Govt. Services', tagBn: '৫০০+ সরকারি সেবা',
    bulletEn: ['Birth certificate', 'NID services', 'Passport application', 'Land records'],
    bulletBn: ['জন্ম নিবন্ধন', 'NID সেবা', 'পাসপোর্ট আবেদন', 'ভূমি তথ্য'],
    links: [
      { en: 'Browse Services', bn: 'সেবা দেখুন', url: 'https://www.mygov.bd', primary: true },
      { en: 'Application Status', bn: 'আবেদনের অবস্থা', url: 'https://www.mygov.bd/en/application-status' },
    ],
  },
  nid: {
    id: 'nid',
    icon: '🪪',
    gradA: '#1a0532', gradB: '#4c1d95',
    accent: '#a78bfa',
    nameEn: 'NID / Smart Card', nameBn: 'NID / স্মার্ট কার্ড',
    tagEn: 'National Identity Service', tagBn: 'জাতীয় পরিচয়পত্র সেবা',
    bulletEn: ['NID verification', 'Smart card status', 'Correction request', 'Download e-NID'],
    bulletBn: ['NID যাচাই', 'স্মার্ট কার্ড স্ট্যাটাস', 'সংশোধন আবেদন', 'e-NID ডাউনলোড'],
    links: [
      { en: 'NID Portal', bn: 'NID পোর্টাল', url: 'https://services.nidw.gov.bd', primary: true },
      { en: 'Verify NID', bn: 'NID যাচাই করুন', url: 'https://everify.bdris.gov.bd' },
    ],
  },
  passport: {
    id: 'passport',
    icon: '🛂',
    gradA: '#0a1628', gradB: '#1e3a5f',
    accent: '#93c5fd',
    nameEn: 'e-Passport / MRP', nameBn: 'ই-পাসপোর্ট / MRP',
    tagEn: 'Passport Services', tagBn: 'পাসপোর্ট সেবা',
    bulletEn: ['New passport apply', 'Renewal application', 'Delivery status', 'Enrollment centers'],
    bulletBn: ['নতুন পাসপোর্ট', 'নবায়ন আবেদন', 'ডেলিভারি স্ট্যাটাস', 'নথিভুক্তি কেন্দ্র'],
    links: [
      { en: 'Apply Online', bn: 'অনলাইনে আবেদন', url: 'https://www.epassport.gov.bd', primary: true },
      { en: 'Check Status', bn: 'স্ট্যাটাস চেক', url: 'https://www.epassport.gov.bd/authorization/application-status' },
    ],
  },
  land: {
    id: 'land',
    icon: '🗺️',
    gradA: '#1a1200', gradB: '#78350f',
    accent: '#fbbf24',
    nameEn: 'Land Services', nameBn: 'ভূমি সেবা',
    tagEn: 'Bangladesh Land Portal', tagBn: 'বাংলাদেশ ভূমি পোর্টাল',
    bulletEn: ['Land ownership check', 'Mutation (Namjari)', 'Plot map (Khatian)', 'Online application'],
    bulletBn: ['জমির মালিকানা', 'নামজারি আবেদন', 'খতিয়ান (মৌজা)', 'অনলাইন আবেদন'],
    links: [
      { en: 'Land Portal', bn: 'ভূমি পোর্টাল', url: 'https://land.gov.bd', primary: true },
      { en: 'Khatian Check', bn: 'খতিয়ান যাচাই', url: 'https://www.land.gov.bd/site/page/eService' },
    ],
  },
  /* ── Health & Education ── */
  dghs: {
    id: 'dghs',
    icon: '🏥',
    gradA: '#031a0f', gradB: '#064e3b',
    accent: '#6ee7b7',
    nameEn: 'DGHS Health Services', nameBn: 'স্বাস্থ্য সেবা DGHS',
    tagEn: 'Directorate General of Health', tagBn: 'স্বাস্থ্য অধিদপ্তর',
    bulletEn: ['Hospital directory', 'Doctor/specialist finder', 'Medicine price check', 'Health hotline: 16000'],
    bulletBn: ['হাসপাতাল ডিরেক্টরি', 'ডাক্তার খোঁজুন', 'ওষুধের দাম চেক', 'স্বাস্থ্য হটলাইন: ১৬০০০'],
    links: [
      { en: 'DGHS Portal', bn: 'DGHS পোর্টাল', url: 'https://www.dghs.gov.bd', primary: true },
      { en: 'Health Hotline', bn: 'স্বাস্থ্য হটলাইন', url: 'tel:16000' },
    ],
  },
  bpsc: {
    id: 'bpsc',
    icon: '📝',
    gradA: '#1a0d00', gradB: '#7c2d12',
    accent: '#fb923c',
    nameEn: 'BPSC', nameBn: 'বাংলাদেশ সরকারি কর্ম কমিশন',
    tagEn: 'Govt. Job Commission', tagBn: 'সরকারি চাকরি কমিশন',
    bulletEn: ['BCS circular & results', 'Job application portal', 'Exam schedule', 'Admit card download'],
    bulletBn: ['BCS বিজ্ঞপ্তি ও ফলাফল', 'চাকরির আবেদন', 'পরীক্ষার সময়সূচি', 'এডমিট কার্ড ডাউনলোড'],
    links: [
      { en: 'BPSC Portal', bn: 'BPSC পোর্টাল', url: 'http://www.bpsc.gov.bd', primary: true },
      { en: 'Apply for Jobs', bn: 'আবেদন করুন', url: 'https://bpsc.teletalk.com.bd' },
    ],
  },
  /* ── Finance & Tax ── */
  nbr: {
    id: 'nbr',
    icon: '💰',
    gradA: '#0a1a2e', gradB: '#1e3a5f',
    accent: '#67e8f9',
    nameEn: 'NBR — Tax & VAT', nameBn: 'জাতীয় রাজস্ব বোর্ড',
    tagEn: 'National Board of Revenue', tagBn: 'ট্যাক্স ও ভ্যাট সেবা',
    bulletEn: ['Income tax e-return', 'TIN certificate', 'VAT registration', 'Custom duty check'],
    bulletBn: ['আয়কর ই-রিটার্ন', 'TIN সার্টিফিকেট', 'ভ্যাট নিবন্ধন', 'কাস্টম শুল্ক'],
    links: [
      { en: 'NBR Portal', bn: 'NBR পোর্টাল', url: 'https://www.nbr.gov.bd', primary: true },
      { en: 'e-Return Filing', bn: 'ই-রিটার্ন দাখিল', url: 'https://etaxnbr.gov.bd' },
    ],
  },
  btcl: {
    id: 'btcl',
    icon: '📞',
    gradA: '#0d1f2d', gradB: '#164e63',
    accent: '#22d3ee',
    nameEn: 'BTCL', nameBn: 'বিটিসিএল',
    tagEn: 'Bangladesh Telecom', tagBn: 'বাংলাদেশ টেলিযোগাযোগ',
    bulletEn: ['Landline bill payment', 'Internet packages', 'Broadband services', 'PSTN directory'],
    bulletBn: ['ল্যান্ডলাইন বিল পেমেন্ট', 'ইন্টারনেট প্যাকেজ', 'ব্রডব্যান্ড সেবা', 'PSTN ডিরেক্টরি'],
    links: [
      { en: 'BTCL Portal', bn: 'BTCL পোর্টাল', url: 'https://www.btcl.gov.bd', primary: true },
    ],
  },
  dmtcl: {
    id: 'dmtcl',
    icon: '🚌',
    gradA: '#0d1f0d', gradB: '#14532d',
    accent: '#4ade80',
    nameEn: 'DMTCL', nameBn: 'ঢাকা মাস ট্রানজিট',
    tagEn: 'Dhaka Mass Transit Co. Ltd.', tagBn: 'ঢাকা ম্যাস ট্রানজিট কোম্পানি',
    bulletEn: ['MRT Line-6 metro info', 'Station guide & fares', 'Smart card (Rapid Pass)', 'Route map & timings'],
    bulletBn: ['MRT লাইন-৬ মেট্রো তথ্য', 'স্টেশন গাইড ও ভাড়া', 'র‍্যাপিড পাস স্মার্ট কার্ড', 'রুট ম্যাপ ও সময়সূচি'],
    links: [
      { en: 'DMTCL Portal', bn: 'DMTCL পোর্টাল', url: 'https://dmtcl.gov.bd', primary: true },
      { en: 'Rapid Pass', bn: 'র‍্যাপিড পাস', url: 'https://dmtcl.gov.bd/rapidpass' },
    ],
  },
};

// Ordered by relevance to transport app users
export const POSTER_IDS_ALL = ['brta', 'railway', 'biwtc', 'biman', 'dmtcl', 'mygov', 'nid', 'passport', 'land', 'dghs', 'bpsc', 'nbr', 'btcl'];

// ── Single poster card ────────────────────────────────────────────────────────

function PosterCard({ def, lang, tk }: { def: PosterDef; lang: Lang; tk: Tokens }) {
  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;

  return (
    <div style={{
      background: `linear-gradient(140deg, ${def.gradA} 0%, ${def.gradB} 100%)`,
      borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 6px 24px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.2)',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: -40, right: -30, width: 120, height: 120,
        borderRadius: '50%', background: def.accent, opacity: 0.1, filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ padding: '16px 16px 10px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: 'rgba(255,255,255,0.1)',
            border: `1.5px solid rgba(255,255,255,0.15)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            {def.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: font, fontWeight: 800, fontSize: 15,
              color: '#fff', lineHeight: 1.1, letterSpacing: -0.3,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {isBn ? def.nameBn : def.nameEn}
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: 0.4,
              color: def.accent, marginTop: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {isBn ? def.tagBn : def.tagEn}
            </div>
          </div>
          {/* GOV badge */}
          <div style={{
            marginLeft: 'auto', flexShrink: 0,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 6, padding: '2px 7px',
            fontFamily: SANS, fontSize: 7.5, fontWeight: 700,
            color: 'rgba(255,255,255,0.5)', letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}>
            GOV
          </div>
        </div>

        {/* Accent rule */}
        <div style={{ width: 28, height: 2, background: def.accent, borderRadius: 1, marginBottom: 10, opacity: 0.85 }} />

        {/* Bullet points */}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {(isBn ? def.bulletBn : def.bulletEn).map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: def.accent, flexShrink: 0, opacity: 0.85 }} />
              <span style={{ fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.78)', lineHeight: 1.3 }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: CTA buttons */}
      <div style={{
        padding: '10px 14px 14px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: 6, flexWrap: 'wrap',
        position: 'relative', zIndex: 1,
      }}>
        {def.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target={link.url.startsWith('tel:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            style={{
              background: link.primary ? def.accent : 'rgba(255,255,255,0.1)',
              color: link.primary ? def.gradB : 'rgba(255,255,255,0.82)',
              border: link.primary ? 'none' : '1px solid rgba(255,255,255,0.18)',
              borderRadius: 999, padding: '6px 14px',
              fontFamily: font, fontWeight: 700, fontSize: 11,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
              whiteSpace: 'nowrap',
              boxShadow: link.primary ? `0 2px 10px ${def.accent}40` : 'none',
            }}
          >
            {isBn ? link.bn : link.en}
            {link.primary && <span style={{ fontSize: 12 }}>→</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

// ── GovAdPoster — fixed grid of poster cards ──────────────────────────────────

export function GovAdPoster({
  tk,
  lang,
  ids = POSTER_IDS_ALL,
  columns = 2,
  label = true,
}: {
  tk: Tokens;
  lang: Lang;
  ids?: string[];
  columns?: 1 | 2 | 3;
  label?: boolean;
}) {
  const defs = ids.map(id => ALL_POSTERS[id]).filter(Boolean);
  if (!defs.length) return null;

  const font = lang === 'bn' ? BEN : SANS;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 18, borderRadius: 2, background: tk.primary, flexShrink: 0 }} />
          <span style={{
            fontFamily: font, fontSize: 12, fontWeight: 700,
            color: tk.textDim, letterSpacing: 0.3, textTransform: 'uppercase',
          }}>
            {T(lang, 'সরকারি সেবা', 'Government Services')}
          </span>
          <div style={{
            marginLeft: 'auto',
            background: `${tk.primary}18`,
            border: `1px solid ${tk.primary}30`,
            borderRadius: 999, padding: '2px 9px',
            fontFamily: SANS, fontSize: 9, fontWeight: 700,
            color: tk.primary, letterSpacing: 0.4, textTransform: 'uppercase',
          }}>
            {lang === 'bn' ? 'অফিসিয়াল' : 'Official'}
          </div>
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 12,
      }}>
        {defs.map(def => (
          <PosterCard key={def.id} def={def} lang={lang} tk={tk} />
        ))}
      </div>
    </div>
  );
}
