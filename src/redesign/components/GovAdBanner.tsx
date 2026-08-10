/**
 * GovAdBanner — premium image-style government service ad carousel
 * Looks like a real sponsored feature card, not a text widget.
 */
import React, { useState, useEffect, useRef } from 'react';
import { Lang, SANS, BEN } from '../tokens';

// ── Inject keyframes once ────────────────────────────────────────────────────
const STYLE_ID = 'gov-ad-banner-styles';
function injectStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
@keyframes govShimmer {
  0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
  40%  { opacity: 1; }
  100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
}
@keyframes govFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
@keyframes govPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}
.gov-banner-illus { animation: govFloat 4s ease-in-out infinite; }
  `;
  document.head.appendChild(s);
}

// ── SVG Illustrations — large, bleed-style ──────────────────────────────────

function CarSVG() {
  return (
    <svg viewBox="0 0 280 160" width="280" height="160" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" /><stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" /><stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.6" />
        </linearGradient>
        <filter id="car-drop" x="-15%" y="-20%" width="130%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <radialGradient id="car-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="140" cy="148" rx="90" ry="10" fill="rgba(0,0,0,0.22)" />
      <g filter="url(#car-drop)">
        <rect x="18" y="80" width="244" height="62" rx="14" fill="url(#car-body)" />
        <path d="M70 80 Q88 42 118 36 L200 36 Q230 42 244 80Z" fill="url(#car-body)" />
        <path d="M80 78 Q94 50 118 44 L160 44 Q154 78 80 78Z" fill="url(#car-glass)" />
        <path d="M162 44 L200 44 Q210 50 222 78 L162 78Z" fill="url(#car-glass)" />
        <rect x="158" y="44" width="4" height="34" fill="rgba(100,116,139,0.3)" />
        <ellipse cx="258" cy="102" rx="9" ry="6" fill="#fef9c3" opacity="0.95" />
        <ellipse cx="258" cy="102" rx="5" ry="3" fill="#fef08a" />
        <rect x="18" y="90" width="8" height="14" rx="3" fill="#fca5a5" opacity="0.9" />
        <rect x="18" y="90" width="5" height="9" rx="2" fill="#ef4444" opacity="0.8" />
        <line x1="158" y1="82" x2="158" y2="140" stroke="rgba(100,116,139,0.2)" strokeWidth="2" />
        <rect x="118" y="104" width="22" height="5" rx="2.5" fill="#94a3b8" opacity="0.7" />
        <rect x="178" y="104" width="22" height="5" rx="2.5" fill="#94a3b8" opacity="0.7" />
        <rect x="18" y="119" width="244" height="3" rx="1.5" fill="rgba(16,185,129,0.35)" />
        <rect x="248" y="110" width="18" height="8" rx="4" fill="#e2e8f0" opacity="0.9" />
        <rect x="14" y="110" width="18" height="8" rx="4" fill="#e2e8f0" opacity="0.9" />
      </g>
      {[72, 200].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="142" r="22" fill="#1e293b" />
          <circle cx={cx} cy="142" r="16" fill="#334155" />
          <circle cx={cx} cy="142" r="8" fill="#475569" />
          <circle cx={cx} cy="142" r="3" fill="#94a3b8" />
          {[0,60,120,180,240,300].map(a => (
            <line key={a} x1={cx + 10*Math.cos(a*Math.PI/180)} y1={142+10*Math.sin(a*Math.PI/180)} x2={cx+16*Math.cos(a*Math.PI/180)} y2={142+16*Math.sin(a*Math.PI/180)} stroke="#475569" strokeWidth="2" />
          ))}
        </g>
      ))}
      {[0,8,16].map((y,i) => (
        <line key={i} x1={-10} y1={90+y} x2={14} y2={90+y} stroke="#10b981" strokeWidth={2-i*0.5} strokeOpacity="0.5" />
      ))}
    </svg>
  );
}

function TrainSVG() {
  return (
    <svg viewBox="0 0 300 170" width="300" height="170" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="tr-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="tr-nose" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="tr-drop" x="-10%" y="-20%" width="130%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect x="0" y="153" width="300" height="6" rx="3" fill="#475569" opacity="0.6" />
      {[5,30,55,80,105,130,155,180,205,230,255,280].map(x => (
        <rect key={x} x={x} y="151" width="14" height="10" rx="2" fill="#64748b" opacity="0.4" />
      ))}
      <g filter="url(#tr-drop)">
        <rect x="4" y="72" width="90" height="82" rx="8" fill="url(#tr-body)" opacity="0.82" />
        <rect x="98" y="60" width="100" height="94" rx="8" fill="url(#tr-body)" />
        <rect x="200" y="56" width="90" height="98" rx="10" fill="url(#tr-nose)" />
        <path d="M284 56 Q304 62 304 105 L284 154Z" fill="url(#tr-nose)" />
        <rect x="4" y="148" width="300" height="5" rx="2" fill="#006a4e" opacity="0.7" />
        <rect x="14" y="82" width="28" height="18" rx="4" fill="#bae6fd" opacity="0.72" />
        <rect x="50" y="82" width="28" height="18" rx="4" fill="#bae6fd" opacity="0.72" />
        <rect x="108" y="72" width="30" height="20" rx="4" fill="#bae6fd" opacity="0.78" />
        <rect x="146" y="72" width="30" height="20" rx="4" fill="#bae6fd" opacity="0.78" />
        <rect x="212" y="68" width="48" height="34" rx="6" fill="#e0f2fe" opacity="0.88" />
        <ellipse cx="300" cy="110" rx="8" ry="6" fill="#fef08a" opacity="0.95" />
      </g>
      {[30,72,130,172,224,268].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="153" r="12" fill="#0f172a" />
          <circle cx={cx} cy="153" r="6" fill="#334155" />
          <circle cx={cx} cy="153" r="2.5" fill="#94a3b8" />
        </g>
      ))}
      {[0,10,20].map((y,i) => (
        <line key={i} x1={-20} y1={90+y} x2={0} y2={90+y} stroke="#60a5fa" strokeWidth={3-i} strokeOpacity="0.5" />
      ))}
    </svg>
  );
}

function PortalSVG() {
  return (
    <svg viewBox="0 0 260 200" width="260" height="200" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="pg-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#065f46" /><stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="pg-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.92" />
        </linearGradient>
        <filter id="pg-drop"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.2" /></filter>
        <filter id="pg-cd"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.12" /></filter>
      </defs>
      <g filter="url(#pg-drop)">
        <rect x="60" y="90" width="140" height="100" rx="6" fill="url(#pg-bg)" opacity="0.9" />
        <ellipse cx="130" cy="90" rx="58" ry="22" fill="#065f46" opacity="0.95" />
        <ellipse cx="130" cy="86" rx="44" ry="14" fill="#10b981" opacity="0.45" />
      </g>
      {[[76,100],[114,100],[76,126],[114,126],[152,100],[152,126]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} rx="3" width="14" height="14" fill="#bbf7d0" opacity="0.65" />
      ))}
      <rect x="113" y="154" width="24" height="36" rx="4" fill="#065f46" opacity="0.7" />
      <circle cx="132" cy="172" r="2.5" fill="#a7f3d0" />
      <line x1="130" y1="22" x2="130" y2="86" stroke="#065f46" strokeWidth="2.5" />
      <path d="M130 22 L158 33 L130 44Z" fill="#006a4e" />
      <rect x="46" y="188" width="168" height="6" rx="3" fill="#a7f3d0" opacity="0.7" />
      {[
        { x: -10, y: 24, color: '#10b981' },
        { x: 196, y: 14, color: '#3b82f6' },
        { x: -20, y: 108, color: '#f59e0b' },
        { x: 200, y: 98, color: '#8b5cf6' },
      ].map((c, i) => (
        <g key={i} filter="url(#pg-cd)">
          <rect x={c.x} y={c.y} width="68" height="40" rx="9" fill="url(#pg-card)" />
          <rect x={c.x+8} y={c.y+8} width="12" height="12" rx="3" fill={c.color} opacity="0.8" />
          <rect x={c.x+26} y={c.y+9} width="30" height="4" rx="2" fill={c.color} opacity="0.7" />
          <rect x={c.x+26} y={c.y+17} width="22" height="3" rx="1.5" fill="#94a3b8" opacity="0.5" />
          <rect x={c.x+8} y={c.y+26} width="48" height="3" rx="1.5" fill="#e2e8f0" opacity="0.8" />
        </g>
      ))}
      <line x1="58" y1="44" x2="80" y2="92" stroke="#10b981" strokeWidth="1" strokeDasharray="5,3" opacity="0.3" />
      <line x1="196" y1="34" x2="182" y2="92" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,3" opacity="0.3" />
    </svg>
  );
}

function LaunchSVG() {
  return (
    <svg viewBox="0 0 300 170" width="300" height="170" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="lw-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.7" /><stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="lw-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" /><stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="lw-upper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" /><stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <filter id="lw-drop"><feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.28" /></filter>
      </defs>
      <path d="M0 118 Q38 110 75 118 Q112 126 150 118 Q188 110 225 118 Q262 126 300 118 L300 170 L0 170Z" fill="url(#lw-water)" />
      <path d="M0 128 Q30 123 60 128 Q90 133 120 128 Q150 123 180 128" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <g filter="url(#lw-drop)">
        <path d="M22 118 Q44 136 150 140 Q256 136 278 118Z" fill="#0c4a6e" opacity="0.9" />
        <rect x="38" y="68" width="224" height="52" rx="8" fill="url(#lw-hull)" />
        <rect x="62" y="30" width="164" height="40" rx="6" fill="url(#lw-upper)" />
        <rect x="88" y="10" width="112" height="22" rx="4" fill="#e0f2fe" opacity="0.8" />
        <rect x="38" y="116" width="224" height="4" rx="2" fill="#ef4444" opacity="0.75" />
        {[50,80,110,140,170,200,228].map(x => (
          <rect key={x} x={x} y="76" rx="3" width="20" height="13" fill="#bae6fd" opacity="0.8" />
        ))}
        {[72,100,128,156,184,208].map(x => (
          <rect key={x} x={x} y="36" rx="3" width="16" height="12" fill="#bae6fd" opacity="0.72" />
        ))}
        <rect x="144" y="-10" width="6" height="42" rx="3" fill="#334155" />
        <rect x="150" y="-8" width="22" height="14" rx="2" fill="#006a4e" />
        <circle cx="162" cy="-1" r="4" fill="#ef4444" opacity="0.8" />
        <line x1="147" y1="10" x2="38" y2="68" stroke="#94a3b8" strokeWidth="1" opacity="0.35" />
        <line x1="147" y1="10" x2="262" y2="68" stroke="#94a3b8" strokeWidth="1" opacity="0.35" />
        <rect x="108" y="4" width="18" height="28" rx="4" fill="#475569" />
        <ellipse cx="117" cy="3" rx="10" ry="5" fill="#334155" opacity="0.6" />
      </g>
      <path d="M22 120 Q30 115 40 120" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <path d="M260 120 Q270 115 280 120" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
    </svg>
  );
}

function PlaneSVG() {
  return (
    <svg viewBox="0 0 300 160" width="300" height="160" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="pl-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.97" /><stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.93" />
        </linearGradient>
        <linearGradient id="pl-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" /><stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id="pl-drop"><feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.3" /></filter>
      </defs>
      {[[20,18,18],[38,10,24],[64,22,16],[220,100,14],[238,93,18],[258,104,12]].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity="0.13" />
      ))}
      <g filter="url(#pl-drop)">
        <path d="M38 78 Q100 65 208 70 Q262 72 292 82 Q262 92 208 96 Q100 101 38 88Z" fill="url(#pl-body)" />
        <path d="M272 78 Q298 82 296 82 Q298 82 272 86Z" fill="#e2e8f0" opacity="0.9" />
        <path d="M148 76 L178 22 L210 28 L196 76Z" fill="url(#pl-wing)" />
        <path d="M148 90 L178 144 L210 138 L196 90Z" fill="url(#pl-wing)" opacity="0.88" />
        <path d="M50 78 L34 50 L58 52 L66 78Z" fill="url(#pl-wing)" />
        <path d="M50 88 L34 116 L58 114 L66 88Z" fill="url(#pl-wing)" opacity="0.75" />
        <path d="M44 82 L14 75 L16 84 L44 84Z" fill="#e2e8f0" />
        <path d="M44 84 L14 91 L16 82 L44 84Z" fill="#e2e8f0" opacity="0.75" />
        {[220,208,196,184,172,160,148,136,124].map(cx => (
          <ellipse key={cx} cx={cx} cy="83" rx="5.5" ry="4.5" fill="#bae6fd" opacity="0.82" />
        ))}
        <rect x="68" y="78" width="190" height="5" rx="2" fill="#dc2626" opacity="0.55" />
        <rect x="68" y="83" width="190" height="3" rx="1.5" fill="#006a4e" opacity="0.45" />
        <ellipse cx="170" cy="100" rx="20" ry="9" fill="#94a3b8" opacity="0.9" />
        <ellipse cx="170" cy="100" rx="13" ry="6" fill="#64748b" opacity="0.9" />
        <ellipse cx="160" cy="100" rx="6" ry="4" fill="#475569" />
        <ellipse cx="175" cy="66" rx="16" ry="7" fill="#94a3b8" opacity="0.8" />
        <ellipse cx="175" cy="66" rx="10" ry="4.5" fill="#64748b" opacity="0.85" />
      </g>
      <line x1="28" y1="83" x2="0" y2="83" stroke="white" strokeWidth="2" strokeDasharray="8,5" opacity="0.4" />
      <line x1="28" y1="88" x2="4" y2="94" stroke="white" strokeWidth="1.5" strokeDasharray="6,5" opacity="0.2" />
    </svg>
  );
}

// ── Banner configs ───────────────────────────────────────────────────────────

interface BannerCfg {
  id: string;
  gradA: string; gradB: string; gradC: string;
  accent: string; accentText: string;
  icon: string;
  nameEn: string; nameBn: string;
  tagEn: string; tagBn: string;
  descEn: string; descBn: string;
  badgeEn: string; badgeBn: string;
  chips: { icon: string; en: string; bn: string }[];
  ctaEn: string; ctaBn: string;
  ctaUrl: string;
  Illus: () => React.ReactElement;
}

const BANNERS: Record<string, BannerCfg> = {
  brta: {
    id: 'brta',
    gradA: '#020d07', gradB: '#052e16', gradC: '#063d1f',
    accent: '#10b981', accentText: '#052e16',
    icon: '🚗',
    nameEn: 'BRTA', nameBn: 'BRTA',
    tagEn: 'Road Transport Authority', tagBn: 'সড়ক পরিবহন কর্তৃপক্ষ',
    descEn: 'Check driving license validity, vehicle registration & fitness certificates instantly.', descBn: 'ড্রাইভিং লাইসেন্স, গাড়ির রেজিস্ট্রেশন ও ফিটনেস সার্টিফিকেট মুহূর্তেই যাচাই করুন।',
    badgeEn: 'Official Govt. Service', badgeBn: 'সরকারি সেবা',
    chips: [{ icon: '🪪', en: 'Driving License', bn: 'ড্রাইভিং লাইসেন্স' }, { icon: '📋', en: 'Vehicle Reg.', bn: 'গাড়ি রেজিস্ট্রেশন' }, { icon: '✅', en: 'Fitness Cert.', bn: 'ফিটনেস' }],
    ctaEn: 'Check License Now', ctaBn: 'লাইসেন্স যাচাই করুন',
    ctaUrl: 'https://bsp.brta.gov.bd/license-check',
    Illus: CarSVG,
  },
  railway: {
    id: 'railway',
    gradA: '#06082e', gradB: '#1e1b4b', gradC: '#1e3a8a',
    accent: '#60a5fa', accentText: '#172d6b', // 5.09:1 on #60a5fa
    icon: '🚂',
    nameEn: 'Bangladesh Railway', nameBn: 'বাংলাদেশ রেলওয়ে',
    tagEn: 'Train Tickets & Schedules', tagBn: 'ট্রেন টিকিট ও সময়সূচি',
    descEn: 'Book train tickets online & check real-time schedules for 440+ stations.', descBn: '৪৪০+ স্টেশনের রিয়েল-টাইম সময়সূচি দেখুন এবং অনলাইনে টিকিট কিনুন।',
    badgeEn: 'Official Govt. Portal', badgeBn: 'সরকারি পোর্টাল',
    chips: [{ icon: '🎫', en: 'Online Tickets', bn: 'অনলাইন টিকিট' }, { icon: '📅', en: 'Live Schedule', bn: 'লাইভ সময়সূচি' }, { icon: '🔍', en: 'PNR Status', bn: 'PNR স্ট্যাটাস' }],
    ctaEn: 'Book Tickets Online', ctaBn: 'টিকিট বুক করুন',
    ctaUrl: 'https://eticket.railway.gov.bd',
    Illus: TrainSVG,
  },
  mygov: {
    id: 'mygov',
    gradA: '#011a0d', gradB: '#052e16', gradC: '#065f46',
    accent: '#34d399', accentText: '#052e16',
    icon: '🏛️',
    nameEn: 'MyGov Bangladesh', nameBn: 'মাইগভ বাংলাদেশ',
    tagEn: 'One-Stop Govt. Services', tagBn: 'এক ঠিকানায় সরকারি সেবা',
    descEn: 'Access 500+ government services — birth certificate, NID, passport, land records.', descBn: '৫০০+ সরকারি সেবা — জন্ম নিবন্ধন, NID, পাসপোর্ট, ভূমি তথ্য।',
    badgeEn: 'National Digital Platform', badgeBn: 'জাতীয় ডিজিটাল প্ল্যাটফর্ম',
    chips: [{ icon: '📄', en: 'Birth Cert.', bn: 'জন্ম নিবন্ধন' }, { icon: '🛂', en: 'Passport', bn: 'পাসপোর্ট' }, { icon: '🗺️', en: 'Land Records', bn: 'ভূমি তথ্য' }],
    ctaEn: 'Explore 500+ Services', ctaBn: '৫০০+ সেবা দেখুন',
    ctaUrl: 'https://www.mygov.bd',
    Illus: PortalSVG,
  },
  biwtc: {
    id: 'biwtc',
    gradA: '#031220', gradB: '#0c4a6e', gradC: '#075985',
    accent: '#38bdf8', accentText: '#0b4058', // 5.19:1 on #38bdf8
    icon: '⛴️',
    nameEn: 'BIWTC', nameBn: 'BIWTC',
    tagEn: 'Inland Water Transport Corp.', tagBn: 'অভ্যন্তরীণ নৌ-পরিবহন',
    descEn: 'Sadarghat launch schedules, routes & tickets for waterways across Bangladesh.', descBn: 'সদরঘাট থেকে সারাদেশে লঞ্চের সময়সূচি, রুট ও টিকিট।',
    badgeEn: 'Official Govt. Service', badgeBn: 'সরকারি সেবা',
    chips: [{ icon: '🗺️', en: 'Routes', bn: 'রুট' }, { icon: '🕐', en: 'Schedule', bn: 'সময়সূচি' }, { icon: '🎫', en: 'Tickets', bn: 'টিকিট' }],
    ctaEn: 'View Schedules', ctaBn: 'সময়সূচি দেখুন',
    ctaUrl: 'https://biwtc.gov.bd',
    Illus: LaunchSVG,
  },
  biman: {
    id: 'biman',
    gradA: '#150404', gradB: '#7f1d1d', gradC: '#991b1b',
    accent: '#fca5a5', accentText: '#7f1d1d',
    icon: '✈️',
    nameEn: 'Biman Bangladesh Airlines', nameBn: 'বিমান বাংলাদেশ এয়ারলাইন্স',
    tagEn: 'National Airline of Bangladesh', tagBn: 'জাতীয় বিমান সংস্থা',
    descEn: 'Book domestic & international flights with Bangladesh\'s national carrier.', descBn: 'বাংলাদেশের জাতীয় বিমান সংস্থায় দেশ-বিদেশে ফ্লাইট বুক করুন।',
    badgeEn: 'National Carrier', badgeBn: 'জাতীয় বিমান সংস্থা',
    chips: [{ icon: '🛫', en: 'Domestic Flights', bn: 'অভ্যন্তরীণ' }, { icon: '🌍', en: 'International', bn: 'আন্তর্জাতিক' }, { icon: '📱', en: 'Web Check-in', bn: 'চেক-ইন' }],
    ctaEn: 'Book a Flight', ctaBn: 'ফ্লাইট বুক করুন',
    ctaUrl: 'https://www.biman-airlines.com',
    Illus: PlaneSVG,
  },
  nid: {
    id: 'nid',
    gradA: '#1a0532', gradB: '#3b0764', gradC: '#4c1d95',
    accent: '#a78bfa', accentText: '#2e1065',
    icon: '🪪',
    nameEn: 'NID / Smart Card', nameBn: 'NID / স্মার্ট কার্ড',
    tagEn: 'National Identity Services', tagBn: 'জাতীয় পরিচয়পত্র সেবা',
    descEn: 'Verify your NID, check smart card status, and request corrections online.', descBn: 'NID যাচাই, স্মার্ট কার্ড স্ট্যাটাস ও সংশোধন আবেদন করুন।',
    badgeEn: 'Bangladesh EC', badgeBn: 'নির্বাচন কমিশন',
    chips: [{ icon: '🔍', en: 'NID Verify', bn: 'NID যাচাই' }, { icon: '📲', en: 'Smart Card', bn: 'স্মার্ট কার্ড' }, { icon: '✏️', en: 'Correction', bn: 'সংশোধন' }],
    ctaEn: 'NID Services Portal', ctaBn: 'NID পোর্টালে যান',
    ctaUrl: 'https://services.nidw.gov.bd',
    Illus: PortalSVG,
  },
  passport: {
    id: 'passport',
    gradA: '#0a1628', gradB: '#1a2f4e', gradC: '#1e3a5f',
    accent: '#93c5fd', accentText: '#1e3a5f',
    icon: '🛂',
    nameEn: 'e-Passport Services', nameBn: 'ই-পাসপোর্ট সেবা',
    tagEn: 'Apply & Track Passport', tagBn: 'পাসপোর্ট আবেদন ও ট্র্যাক',
    descEn: 'Apply for new passport, renew MRP, and track delivery status online.', descBn: 'নতুন পাসপোর্ট আবেদন, MRP নবায়ন ও ডেলিভারি স্ট্যাটাস ট্র্যাক করুন।',
    badgeEn: 'Official Govt. Service', badgeBn: 'সরকারি সেবা',
    chips: [{ icon: '📋', en: 'New Apply', bn: 'নতুন আবেদন' }, { icon: '🔄', en: 'Renewal', bn: 'নবায়ন' }, { icon: '📦', en: 'Delivery', bn: 'ডেলিভারি' }],
    ctaEn: 'Apply for Passport', ctaBn: 'পাসপোর্টের আবেদন করুন',
    ctaUrl: 'https://www.epassport.gov.bd',
    Illus: PortalSVG,
  },
  dghs: {
    id: 'dghs',
    gradA: '#011a0f', gradB: '#022c18', gradC: '#064e3b',
    accent: '#6ee7b7', accentText: '#052e16',
    icon: '🏥',
    nameEn: 'DGHS Health Portal', nameBn: 'স্বাস্থ্য সেবা পোর্টাল',
    tagEn: 'Directorate General of Health', tagBn: 'স্বাস্থ্য অধিদপ্তর',
    descEn: 'Find hospitals, doctors, check medicine prices & call health hotline 16000.', descBn: 'হাসপাতাল ও ডাক্তার খুঁজুন, ওষুধের দাম চেক করুন, হটলাইন ১৬০০০।',
    badgeEn: 'Ministry of Health', badgeBn: 'স্বাস্থ্য মন্ত্রণালয়',
    chips: [{ icon: '🏨', en: 'Hospitals', bn: 'হাসপাতাল' }, { icon: '👨‍⚕️', en: 'Doctors', bn: 'ডাক্তার' }, { icon: '💊', en: 'Medicine', bn: 'ওষুধ' }],
    ctaEn: 'Health Services', ctaBn: 'স্বাস্থ্য সেবা দেখুন',
    ctaUrl: 'https://www.dghs.gov.bd',
    Illus: PortalSVG,
  },
  dmtcl: {
    id: 'dmtcl',
    gradA: '#0d1f0d', gradB: '#14532d', gradC: '#166534',
    accent: '#4ade80', accentText: '#14532d',
    icon: '🚌',
    nameEn: 'DMTCL Metro Rail', nameBn: 'ঢাকা মেট্রোরেল DMTCL',
    tagEn: 'Dhaka Mass Transit Co. Ltd.', tagBn: 'ঢাকা ম্যাস ট্রানজিট',
    descEn: 'MRT Line-6 metro rail info, station guide, fares & Rapid Pass smart card.', descBn: 'MRT লাইন-৬ মেট্রোরেল তথ্য, স্টেশন গাইড, ভাড়া ও র‍্যাপিড পাস কার্ড।',
    badgeEn: 'Govt. Metro Authority', badgeBn: 'সরকারি মেট্রো কর্তৃপক্ষ',
    chips: [{ icon: '🚇', en: 'MRT Line-6', bn: 'MRT লাইন-৬' }, { icon: '💳', en: 'Rapid Pass', bn: 'র‍্যাপিড পাস' }, { icon: '🗺️', en: 'Route Map', bn: 'রুট ম্যাপ' }],
    ctaEn: 'DMTCL Portal', ctaBn: 'DMTCL পোর্টালে যান',
    ctaUrl: 'https://dmtcl.gov.bd',
    Illus: TrainSVG,
  },
};

const DEFAULT_IDS = ['brta', 'railway', 'dmtcl', 'mygov', 'biwtc', 'biman', 'nid', 'passport', 'dghs'];

// ── Single slide ─────────────────────────────────────────────────────────────

function BannerSlide({ cfg, lang, height }: { cfg: BannerCfg; lang: Lang; height: number }) {
  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;
  const compact = height < 220;
  const illustW = Math.min(Math.round(height * 1.55), 310);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: `linear-gradient(135deg, ${cfg.gradA} 0%, ${cfg.gradB} 55%, ${cfg.gradC} 100%)`,
    }}>
      {/* Dot-grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      {/* Ambient glow orbs */}
      <div style={{ position: 'absolute', top: -80, right: -40, width: 280, height: 280, borderRadius: '50%', background: cfg.accent, opacity: 0.07, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -30, width: 200, height: 200, borderRadius: '50%', background: cfg.accent, opacity: 0.05, filter: 'blur(44px)', pointerEvents: 'none' }} />
      {/* Shimmer */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, width: '45%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          animation: 'govShimmer 7s ease-in-out infinite',
        }} />
      </div>

      {/* Content layout */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'stretch' }}>

        {/* LEFT — text */}
        <div style={{
          flex: 1, minWidth: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: compact ? '14px 10px 14px 18px' : '20px 12px 18px 24px',
          position: 'relative', zIndex: 2,
        }}>
          <div>
            {/* Official badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 999, padding: '3px 10px',
              marginBottom: compact ? 8 : 11,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.accent, animation: 'govPulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: SANS, fontSize: 8.5, fontWeight: 700, color: cfg.accent, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                {isBn ? cfg.badgeBn : cfg.badgeEn}
              </span>
            </div>

            {/* Icon + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
              <div style={{
                width: compact ? 38 : 46, height: compact ? 38 : 46,
                borderRadius: 13, flexShrink: 0,
                background: 'rgba(255,255,255,0.09)',
                border: '1.5px solid rgba(255,255,255,0.16)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: compact ? 18 : 22,
                boxShadow: '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}>
                {cfg.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: font, fontWeight: 900, fontSize: compact ? 17 : 21,
                  color: '#fff', lineHeight: 1.05, letterSpacing: -0.5,
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {isBn ? cfg.nameBn : cfg.nameEn}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: 0.3, color: cfg.accent, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {isBn ? cfg.tagBn : cfg.tagEn}
                </div>
              </div>
            </div>

            {/* Accent rule */}
            <div style={{ width: 32, height: 2.5, background: cfg.accent, borderRadius: 2, marginBottom: compact ? 6 : 9, opacity: 0.9 }} />

            {/* Description */}
            {!compact && (
              <p style={{
                margin: 0, fontFamily: font, fontSize: 11,
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.55,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {isBn ? cfg.descBn : cfg.descEn}
              </p>
            )}
          </div>

          {/* Bottom: chips + CTA */}
          <div>
            {/* Chips */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 10, overflow: 'hidden' }}>
              {cfg.chips.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: 7, padding: '4px 7px', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 10 }}>{c.icon}</span>
                  <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>
                    {isBn ? c.bn : c.en}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={cfg.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: cfg.accent, color: cfg.accentText,
                borderRadius: 999,
                padding: compact ? '7px 16px' : '9px 20px',
                fontFamily: font, fontWeight: 800,
                fontSize: compact ? 11 : 12.5,
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: `0 4px 20px ${cfg.accent}50, 0 1px 4px rgba(0,0,0,0.25)`,
                letterSpacing: -0.2,
              }}
            >
              {isBn ? cfg.ctaBn : cfg.ctaEn}
              <span style={{ fontSize: 13, fontWeight: 400 }}>→</span>
            </a>
          </div>
        </div>

        {/* RIGHT — illustration bleeding off edge */}
        <div style={{
          width: illustW, flexShrink: 0,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          paddingBottom: 4, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', bottom: -30, right: -30,
            width: 240, height: 240, borderRadius: '50%',
            background: cfg.accent, opacity: 0.08, filter: 'blur(40px)', pointerEvents: 'none',
          }} />
          <div className="gov-banner-illus" style={{ position: 'relative', zIndex: 1, marginRight: -24 }}>
            <cfg.Illus />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GovAdBanner carousel ─────────────────────────────────────────────────────

export function GovAdBanner({
  lang,
  height = 240,
  ids = DEFAULT_IDS,
}: {
  lang: Lang;
  height?: number;
  ids?: string[];
}) {
  useEffect(() => { injectStyles(); }, []);

  const cfgs = ids.map(id => BANNERS[id]).filter(Boolean);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const transitioning = useRef(false);
  const timerRef = useRef<number>(0);

  const goTo = (next: number) => {
    if (transitioning.current || next === active) return;
    transitioning.current = true;
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setFading(false);
      transitioning.current = false;
    }, 350);
  };

  useEffect(() => {
    if (cfgs.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setActive(cur => {
        const next = (cur + 1) % cfgs.length;
        if (!transitioning.current) {
          transitioning.current = true;
          setFading(true);
          setTimeout(() => {
            setActive(next);
            setFading(false);
            transitioning.current = false;
          }, 350);
        }
        return cur;
      });
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [cfgs.length]);

  if (!cfgs.length) return null;
  const cfg = cfgs[active];

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Card */}
      <div style={{
        width: '100%', height,
        borderRadius: 20, overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 3px 10px rgba(0,0,0,0.2)',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(0.985)' : 'scale(1)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        <BannerSlide cfg={cfg} lang={lang} height={height} />
        {/* "GOV AD" watermark */}
        <div style={{
          position: 'absolute', top: 10, right: 14, zIndex: 10,
          fontFamily: SANS, fontSize: 8, fontWeight: 700,
          color: 'rgba(255,255,255,0.3)', letterSpacing: 1.2, textTransform: 'uppercase',
        }}>
          {lang === 'bn' ? 'সরকারি' : 'GOV · AD'}
        </div>
      </div>

      {/* Dot nav */}
      {cfgs.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginTop: 10 }}>
          {cfgs.map((c, i) => (
            <button
              key={c.id}
              aria-label={`Show ${c.nameEn}`}
              onClick={() => { clearInterval(timerRef.current); goTo(i); }}
              style={{
                width: 24, height: 24,
                borderRadius: '50%', border: 'none', padding: 9, cursor: 'pointer',
                // Hit area is a full 24px (WCAG 2.5.5) regardless of box-sizing;
                // backgroundClip keeps the visible dot ~6px in the content box.
                background: i === active ? cfg.accent : 'rgba(128,128,128,0.32)',
                backgroundClip: 'content-box',
                transform: i === active ? 'scale(1.25)' : 'scale(1)',
                transition: 'background 0.35s ease, transform 0.35s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
