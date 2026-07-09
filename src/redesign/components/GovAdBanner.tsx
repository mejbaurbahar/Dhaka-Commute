import React, { useState, useEffect, useRef } from 'react';
import { Lang, SANS, BEN } from '../tokens';

// ── SVG Illustrations ─────────────────────────────────────────────────────────
// All inline — no external images, no CSP issues

function CarSVG({ size = 180 }: { size?: number }) {
  const h = Math.round(size * 0.6);
  return (
    <svg viewBox="0 0 200 120" width={size} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="cbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="cwg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.72" />
        </linearGradient>
        <filter id="cshadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      <ellipse cx="100" cy="115" rx="76" ry="7" fill="rgba(0,0,0,0.2)" />
      <g filter="url(#cshadow)">
        <rect x="14" y="58" width="172" height="46" rx="10" fill="url(#cbg)" />
        <path d="M52 58 Q66 30 92 26 L148 26 Q168 30 172 58Z" fill="url(#cbg)" />
      </g>
      <path d="M60 56 Q70 36 92 32 L128 32 Q146 36 152 56Z" fill="url(#cwg)" />
      <line x1="110" y1="32" x2="110" y2="56" stroke="rgba(56,130,210,0.18)" strokeWidth="1.5" />
      <circle cx="58" cy="104" r="17" fill="#1e293b" /><circle cx="58" cy="104" r="9" fill="#475569" /><circle cx="58" cy="104" r="3.5" fill="#94a3b8" />
      <circle cx="148" cy="104" r="17" fill="#1e293b" /><circle cx="148" cy="104" r="9" fill="#475569" /><circle cx="148" cy="104" r="3.5" fill="#94a3b8" />
      <ellipse cx="182" cy="74" rx="7" ry="5" fill="#fef9c3" opacity="0.9" />
      <rect x="15" y="70" width="6" height="10" rx="2" fill="#fca5a5" opacity="0.9" />
      <line x1="110" y1="60" x2="110" y2="100" stroke="rgba(100,120,140,0.25)" strokeWidth="1.5" />
      <rect x="173" y="76" width="14" height="3" rx="1.5" fill="#cbd5e1" opacity="0.7" />
      <rect x="173" y="81" width="14" height="3" rx="1.5" fill="#cbd5e1" opacity="0.6" />
    </svg>
  );
}

function TrainSVG({ size = 190 }: { size?: number }) {
  const h = Math.round(size * 0.65);
  return (
    <svg viewBox="0 0 210 130" width={size} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="tbg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="tfg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="tshadow"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.3" /></filter>
      </defs>
      <rect x="0" y="110" width="210" height="5" rx="2.5" fill="#475569" opacity="0.5" />
      {[10, 38, 66, 94, 122, 150, 178].map(x => (
        <rect key={x} x={x} y="108" width="13" height="9" rx="2" fill="#64748b" opacity="0.45" />
      ))}
      <g filter="url(#tshadow)">
        <rect x="2" y="60" width="78" height="50" rx="6" fill="url(#tbg)" opacity="0.82" />
        <rect x="84" y="50" width="108" height="60" rx="8" fill="url(#tfg)" />
        <path d="M186 50 Q208 50 210 70 L210 110 L186 110Z" fill="url(#tfg)" />
      </g>
      <rect x="10" y="68" width="22" height="13" rx="3" fill="#bae6fd" opacity="0.78" />
      <rect x="38" y="68" width="22" height="13" rx="3" fill="#bae6fd" opacity="0.78" />
      <rect x="92" y="60" width="24" height="15" rx="3" fill="#bae6fd" opacity="0.72" />
      <rect x="122" y="60" width="24" height="15" rx="3" fill="#bae6fd" opacity="0.72" />
      <rect x="163" y="58" width="34" height="25" rx="5" fill="#e0f2fe" opacity="0.88" />
      <rect x="84" y="104" width="108" height="4" rx="2" fill="#006a4e" opacity="0.65" />
      <circle cx="16" cy="110" r="1.5" fill="#f40" opacity="0.7" />
      {[100, 140, 180].map(cx => [
        <circle key={cx+'a'} cx={cx} cy="110" r="9" fill="#0f172a" />,
        <circle key={cx+'b'} cx={cx} cy="110" r="4.5" fill="#334155" />,
      ])}
      <circle cx="208" cy="78" r="6" fill="#fef08a" opacity="0.9" />
      <circle cx="208" cy="78" r="3.5" fill="#fde047" />
      <circle cx="96" cy="36" r="11" fill="white" opacity="0.12" />
      <circle cx="112" cy="27" r="8" fill="white" opacity="0.09" />
    </svg>
  );
}

function GovtBuildingSVG({ size = 170 }: { size?: number }) {
  const h = Math.round(size * 0.82);
  return (
    <svg viewBox="0 0 180 148" width={size} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <filter id="bshadow"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.2" /></filter>
      <g filter="url(#bshadow)">
        <rect x="40" y="82" width="100" height="60" rx="4" fill="white" opacity="0.92" />
        <ellipse cx="90" cy="82" rx="40" ry="17" fill="white" opacity="0.96" />
        <ellipse cx="90" cy="80" rx="30" ry="11" fill="#d1fae5" opacity="0.8" />
      </g>
      {[52,68,112,128].map(x => <rect key={x} x={x} y="86" width="8" height="56" rx="2" fill="#d1fae5" />)}
      <line x1="90" y1="18" x2="90" y2="82" stroke="#10b981" strokeWidth="2" />
      <rect x="92" y="20" width="28" height="18" rx="2" fill="#006a4e" />
      <circle cx="106" cy="29" r="6" fill="#f40" />
      <rect x="34" y="138" width="112" height="5" rx="2" fill="#a7f3d0" opacity="0.8" />
      <rect x="28" y="141" width="124" height="5" rx="2" fill="#6ee7b7" opacity="0.55" />
      {[64,86,108].map(x => <rect key={x} x={x} y="96" width="12" height="16" rx="2" fill="#bbf7d0" opacity="0.72" />)}
      <rect x="80" y="120" width="20" height="22" rx="3" fill="#065f46" opacity="0.58" />
      <circle cx="97" cy="131" r="2" fill="#a7f3d0" />
      {/* Floating service chips */}
      <rect x="2" y="32" width="44" height="32" rx="7" fill="white" opacity="0.88" />
      <rect x="8" y="38" width="28" height="4" rx="2" fill="#10b981" opacity="0.72" />
      <rect x="8" y="45" width="20" height="3" rx="1.5" fill="#d1d5db" opacity="0.65" />
      <rect x="8" y="51" width="16" height="3" rx="1.5" fill="#d1d5db" opacity="0.5" />
      <rect x="134" y="22" width="44" height="32" rx="7" fill="white" opacity="0.88" />
      <rect x="140" y="28" width="28" height="4" rx="2" fill="#10b981" opacity="0.72" />
      <rect x="140" y="35" width="20" height="3" rx="1.5" fill="#d1d5db" opacity="0.65" />
      <rect x="140" y="41" width="16" height="3" rx="1.5" fill="#d1d5db" opacity="0.5" />
      <line x1="46" y1="48" x2="54" y2="92" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" opacity="0.45" />
      <line x1="134" y1="38" x2="126" y2="92" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" opacity="0.45" />
    </svg>
  );
}

function LaunchSVG({ size = 190 }: { size?: number }) {
  const h = Math.round(size * 0.65);
  return (
    <svg viewBox="0 0 210 130" width={size} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="waterg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
        </linearGradient>
        <filter id="lshadow"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.25" /></filter>
      </defs>
      <path d="M0 90 Q28 84 55 90 Q82 96 110 90 Q138 84 165 90 Q192 96 210 90 L210 130 L0 130Z" fill="url(#waterg)" />
      <path d="M0 98 Q22 93 44 98 Q66 103 88 98 Q110 93 132 98 Q154 103 176 98 L210 98" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
      <path d="M22 90 Q32 105 100 108 Q168 105 188 90Z" fill="#0c4a6e" />
      <g filter="url(#lshadow)">
        <rect x="32" y="50" width="148" height="42" rx="6" fill="white" opacity="0.92" />
        <rect x="52" y="26" width="94" height="26" rx="5" fill="white" opacity="0.84" />
      </g>
      {[42,66,90,114,138].map(x => <rect key={x} x={x} y="58" width="18" height="12" rx="3" fill="#bae6fd" opacity="0.78" />)}
      {[60,84,108,128].map(x => <rect key={x} x={x} y="32" width="14" height="10" rx="2" fill="#bae6fd" opacity="0.72" />)}
      <rect x="150" y="6" width="10" height="24" rx="5" fill="#334155" />
      <circle cx="155" cy="4" r="5" fill="#94a3b8" opacity="0.28" />
      <line x1="70" y1="2" x2="70" y2="26" stroke="#334155" strokeWidth="2" />
      <path d="M70 2 L94 9 L70 16Z" fill="#006a4e" />
      <line x1="22" y1="90" x2="32" y2="50" stroke="#d97706" strokeWidth="1.5" opacity="0.55" />
      <line x1="188" y1="90" x2="178" y2="50" stroke="#d97706" strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

function PlaneSVG({ size = 190 }: { size?: number }) {
  const h = Math.round(size * 0.6);
  return (
    <svg viewBox="0 0 210 126" width={size} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="plbg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.96" /><stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.9" />
        </linearGradient>
        <filter id="pshadow"><feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000" floodOpacity="0.28" /></filter>
      </defs>
      {/* Clouds */}
      {[[16,22,14],[30,16,18],[50,24,12],[162,88,10],[175,85,14],[190,90,9]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity="0.18" />
      )}
      <g filter="url(#pshadow)">
        <path d="M32 62 Q76 52 158 55 Q194 57 208 65 Q194 73 158 75 Q76 78 32 68Z" fill="url(#plbg)" />
        <path d="M114 63 L136 20 L158 24 L146 63Z" fill="white" opacity="0.78" />
        <path d="M114 67 L136 110 L158 106 L146 67Z" fill="#f1f5f9" opacity="0.68" />
      </g>
      <path d="M194 62 Q210 65 208 65 Q210 65 194 68Z" fill="#e2e8f0" opacity="0.9" />
      <rect x="64" y="59" width="100" height="5" rx="2" fill="#006a4e" opacity="0.58" />
      <circle cx="82" cy="61.5" r="5" fill="#f40" opacity="0.65" />
      {[150,139,128,117,106].map(cx =>
        <circle key={cx} cx={cx} cy="65" r="3.8" fill="#bae6fd" opacity="0.8" />
      )}
      <ellipse cx="124" cy="84" rx="16" ry="7" fill="#cbd5e1" opacity="0.82" />
      <ellipse cx="124" cy="84" rx="10" ry="4" fill="#94a3b8" opacity="0.78" />
      <line x1="24" y1="65" x2="2" y2="65" stroke="white" strokeWidth="2" strokeDasharray="6,4" opacity="0.48" />
      <line x1="24" y1="69" x2="6" y2="73" stroke="white" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.28" />
    </svg>
  );
}

// ── Banner data ───────────────────────────────────────────────────────────────

export interface GovBannerConfig {
  id: string;
  gradA: string;
  gradB: string;
  accent: string;
  accentDark: string;
  icon: string;
  nameEn: string;
  nameBn: string;
  tagEn: string;
  tagBn: string;
  descEn: string;
  descBn: string;
  features: { icon: string; en: string; bn: string }[];
  links: { en: string; bn: string; url: string; primary?: boolean }[];
  Illus: (p: { size: number }) => React.ReactElement;
}

export const GOV_BANNERS: Record<string, GovBannerConfig> = {
  brta: {
    id: 'brta',
    gradA: '#052e16', gradB: '#064e3b',
    accent: '#10b981', accentDark: '#065f46',
    icon: '🚗',
    nameEn: 'BRTA', nameBn: 'BRTA',
    tagEn: 'Road Transport Authority', tagBn: 'সড়ক পরিবহন কর্তৃপক্ষ',
    descEn: 'Check driving license, vehicle registration & fitness certificate online.',
    descBn: 'ড্রাইভিং লাইসেন্স, গাড়ির রেজিস্ট্রেশন ও ফিটনেস সার্টিফিকেট অনলাইনে যাচাই করুন।',
    features: [
      { icon: '🪪', en: 'Driving License', bn: 'ড্রাইভিং লাইসেন্স' },
      { icon: '📋', en: 'Vehicle Reg.', bn: 'গাড়ি রেজিস্ট্রেশন' },
      { icon: '✅', en: 'Fitness Cert.', bn: 'ফিটনেস সার্টি.' },
    ],
    links: [
      { en: 'License check', bn: 'লাইসেন্স যাচাই', url: 'https://bsp.brta.gov.bd/license-check', primary: true },
      { en: 'Vehicle check', bn: 'গাড়ি যাচাই', url: 'https://bsp.brta.gov.bd/vehicle-check' },
    ],
    Illus: CarSVG,
  },
  railway: {
    id: 'railway',
    gradA: '#1e1b4b', gradB: '#1e3a8a',
    accent: '#60a5fa', accentDark: '#1d4ed8',
    icon: '🚂',
    nameEn: 'BD Railway', nameBn: 'বাংলাদেশ রেলওয়ে',
    tagEn: 'Train Tickets & Schedules', tagBn: 'ট্রেন টিকিট ও সময়সূচি',
    descEn: 'Buy tickets online & check train schedules for 440+ stations.',
    descBn: '৪৪০+ স্টেশনের টিকিট অনলাইনে কিনুন এবং সময়সূচি দেখুন।',
    features: [
      { icon: '🎫', en: 'Online Tickets', bn: 'অনলাইন টিকিট' },
      { icon: '📅', en: 'Schedule', bn: 'সময়সূচি' },
      { icon: '🔍', en: 'PNR Status', bn: 'PNR স্ট্যাটাস' },
    ],
    links: [
      { en: 'Buy tickets', bn: 'টিকিট কিনুন', url: 'https://eticket.railway.gov.bd', primary: true },
      { en: 'Schedule', bn: 'সময়সূচি', url: 'https://railway.gov.bd/pages/train_schedule.php' },
    ],
    Illus: TrainSVG,
  },
  mygov: {
    id: 'mygov',
    gradA: '#052e16', gradB: '#065f46',
    accent: '#34d399', accentDark: '#059669',
    icon: '🏛️',
    nameEn: 'MyGov', nameBn: 'মাইগভ',
    tagEn: 'One-stop Government Services', tagBn: 'এক ঠিকানায় সরকারি সেবা',
    descEn: 'Birth certificate, NID, passport, land records & 500+ govt services.',
    descBn: 'জন্ম নিবন্ধন, NID, পাসপোর্ট, ভূমি তথ্য ও ৫০০+ সরকারি সেবা।',
    features: [
      { icon: '📄', en: 'Birth Cert.', bn: 'জন্ম নিবন্ধন' },
      { icon: '🛂', en: 'Passport', bn: 'পাসপোর্ট' },
      { icon: '🗺️', en: 'Land Records', bn: 'ভূমি তথ্য' },
    ],
    links: [
      { en: 'Browse services', bn: 'সেবা দেখুন', url: 'https://www.mygov.bd', primary: true },
      { en: 'App status', bn: 'আবেদনের অবস্থা', url: 'https://www.mygov.bd/en/application-status' },
    ],
    Illus: GovtBuildingSVG,
  },
  biwtc: {
    id: 'biwtc',
    gradA: '#0c4a6e', gradB: '#075985',
    accent: '#38bdf8', accentDark: '#0284c7',
    icon: '⛴️',
    nameEn: 'BIWTC', nameBn: 'BIWTC',
    tagEn: 'Inland Water Transport', tagBn: 'অভ্যন্তরীণ নৌ-পরিবহন',
    descEn: 'Sadarghat launch schedules, tickets & routes across Bangladesh rivers.',
    descBn: 'সদরঘাট থেকে সারাদেশে লঞ্চের সময়সূচি, টিকিট ও রুট।',
    features: [
      { icon: '🗺️', en: 'Routes', bn: 'রুট' },
      { icon: '🕐', en: 'Schedule', bn: 'সময়সূচি' },
      { icon: '🎫', en: 'Tickets', bn: 'টিকিট' },
    ],
    links: [
      { en: 'View schedules', bn: 'সময়সূচি দেখুন', url: 'https://biwtc.gov.bd', primary: true },
    ],
    Illus: LaunchSVG,
  },
  biman: {
    id: 'biman',
    gradA: '#1c1917', gradB: '#7f1d1d',
    accent: '#f87171', accentDark: '#dc2626',
    icon: '✈️',
    nameEn: 'Biman Bangladesh', nameBn: 'বিমান বাংলাদেশ',
    tagEn: 'National Airline of Bangladesh', tagBn: 'জাতীয় বিমান সংস্থা',
    descEn: 'Domestic & international flights — book online with Biman Bangladesh Airlines.',
    descBn: 'দেশ-বিদেশে ফ্লাইট — বিমান বাংলাদেশ এয়ারলাইন্সে অনলাইনে বুক করুন।',
    features: [
      { icon: '🛫', en: 'Domestic', bn: 'অভ্যন্তরীণ' },
      { icon: '🌍', en: 'International', bn: 'আন্তর্জাতিক' },
      { icon: '📱', en: 'Check-in', bn: 'চেক-ইন' },
    ],
    links: [
      { en: 'Book flight', bn: 'ফ্লাইট বুক করুন', url: 'https://www.biman-airlines.com', primary: true },
      { en: 'Flight status', bn: 'ফ্লাইট স্ট্যাটাস', url: 'https://www.biman-airlines.com/flight-status' },
    ],
    Illus: PlaneSVG,
  },
};

// ── Single banner card ─────────────────────────────────────────────────────────

function BannerSlide({ cfg, lang, illustSize }: { cfg: GovBannerConfig; lang: Lang; illustSize: number }) {
  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;
  const { Illus } = cfg;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'row',
      background: `linear-gradient(140deg, ${cfg.gradA} 0%, ${cfg.gradB} 100%)`,
      overflow: 'hidden',
    }}>
      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: -60, right: -30,
        width: 240, height: 240, borderRadius: '50%',
        background: cfg.accent, opacity: 0.1,
        filter: 'blur(48px)', pointerEvents: 'none',
      }} />
      {/* Glow bottom-left */}
      <div style={{
        position: 'absolute', bottom: -40, left: -20,
        width: 160, height: 160, borderRadius: '50%',
        background: cfg.accent, opacity: 0.07,
        filter: 'blur(36px)', pointerEvents: 'none',
      }} />

      {/* LEFT — content */}
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '18px 14px 16px 20px', position: 'relative', zIndex: 1,
      }}>
        {/* Header: icon badge + name + tag */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 13, flexShrink: 0,
              background: `rgba(255,255,255,0.12)`,
              border: `1.5px solid rgba(255,255,255,0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
              boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
            }}>
              {cfg.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: font, fontWeight: 800, fontSize: 20,
                color: '#fff', lineHeight: 1, letterSpacing: -0.3,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {isBn ? cfg.nameBn : cfg.nameEn}
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 9.5, fontWeight: 600,
                color: cfg.accent, marginTop: 2, letterSpacing: 0.3,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {isBn ? cfg.tagBn : cfg.tagEn}
              </div>
            </div>
          </div>

          {/* Accent divider */}
          <div style={{ width: 32, height: 2.5, background: cfg.accent, borderRadius: 2, marginBottom: 8, opacity: 0.85 }} />

          {/* Description */}
          <p style={{
            margin: 0, fontFamily: font, fontSize: 11.5,
            color: 'rgba(255,255,255,0.82)', lineHeight: 1.55,
          }}>
            {isBn ? cfg.descBn : cfg.descEn}
          </p>
        </div>

        {/* Bottom: features + CTAs */}
        <div>
          {/* Feature chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 11, flexWrap: 'wrap' }}>
            {cfg.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, flexShrink: 0,
                }}>{f.icon}</div>
                <span style={{
                  fontFamily: SANS, fontSize: 9.5,
                  color: 'rgba(255,255,255,0.68)', lineHeight: 1.2,
                }}>
                  {isBn ? f.bn : f.en}
                </span>
                {i < cfg.features.length - 1 && (
                  <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.18)', marginLeft: 3 }} />
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {cfg.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  background: link.primary ? cfg.accent : 'rgba(255,255,255,0.12)',
                  color: link.primary ? cfg.accentDark : 'rgba(255,255,255,0.88)',
                  border: link.primary ? 'none' : '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 999, padding: '6px 14px',
                  fontFamily: font, fontSize: 11.5, fontWeight: 700,
                  textDecoration: 'none', display: 'inline-flex',
                  alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                  boxShadow: link.primary ? `0 2px 8px ${cfg.accentDark}55` : 'none',
                  letterSpacing: -0.1,
                }}
              >
                {isBn ? link.bn : link.en}
                {link.primary && <span style={{ fontSize: 13, fontWeight: 400 }}>→</span>}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — illustration */}
      <div style={{
        width: illustSize + 12, flexShrink: 0, position: 'relative',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: 6, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: -20, right: -20,
          width: 180, height: 180, borderRadius: '50%',
          background: cfg.accent, opacity: 0.1, filter: 'blur(28px)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Illus size={illustSize} />
        </div>
      </div>

      {/* "সরকারি সেবা" label top-right */}
      <div style={{
        position: 'absolute', top: 10, right: 12,
        fontFamily: SANS, fontSize: 8.5, fontWeight: 700,
        color: 'rgba(255,255,255,0.4)', letterSpacing: 0.8,
        textTransform: 'uppercase', zIndex: 2,
      }}>
        {lang === 'bn' ? 'সরকারি সেবা' : 'GOV SERVICE'}
      </div>
    </div>
  );
}

// ── GovAdBanner carousel ──────────────────────────────────────────────────────

export function GovAdBanner({
  lang,
  height = 240,
  ids = ['brta', 'railway', 'mygov', 'biwtc', 'biman'],
}: {
  lang: Lang;
  height?: number;
  ids?: string[];
}) {
  const configs = ids.map(id => GOV_BANNERS[id]).filter(Boolean);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<number>(0);

  const illustSize = Math.round(height * 0.82);

  const advance = (next: number) => {
    if (fading) return;
    setPrev(active);
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setPrev(null);
      setFading(false);
    }, 320);
  };

  const goTo = (i: number) => {
    clearInterval(timerRef.current);
    advance(i);
    timerRef.current = window.setInterval(() => {
      setActive(c => {
        const next = (c + 1) % configs.length;
        advance(next);
        return c; // actual update happens inside advance
      });
    }, 5000);
  };

  useEffect(() => {
    if (configs.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setActive(c => {
        const next = (c + 1) % configs.length;
        setPrev(c);
        setFading(true);
        setTimeout(() => { setActive(next); setPrev(null); setFading(false); }, 320);
        return c;
      });
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [configs.length]);

  if (!configs.length) return null;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Banner frame */}
      <div style={{
        width: '100%', height, borderRadius: 18, overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)',
      }}>
        {/* Prev slide fading out */}
        {prev !== null && configs[prev] && (
          <div style={{ position: 'absolute', inset: 0, opacity: fading ? 0 : 1, transition: 'opacity 0.32s ease' }}>
            <BannerSlide cfg={configs[prev]} lang={lang} illustSize={illustSize} />
          </div>
        )}
        {/* Active slide fading in */}
        <div style={{ position: 'absolute', inset: 0, opacity: fading ? 0 : 1, transition: 'opacity 0.32s ease' }}>
          <BannerSlide cfg={configs[active]} lang={lang} illustSize={illustSize} />
        </div>
      </div>

      {/* Dot navigation */}
      {configs.length > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'center', gap: 6, marginTop: 10,
        }}>
          {configs.map((c, i) => (
            <button
              key={c.id}
              aria-label={`Go to ${c.nameEn}`}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 22 : 6,
                height: 6, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer',
                background: i === active ? configs[active].accent : 'rgba(128,128,128,0.3)',
                transition: 'width 0.35s ease, background 0.35s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
