import React, { useState, useEffect, useRef } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

// ── Inline SVG illustrations ─────────────────────────────────────────────────

function CarSVG() {
  return (
    <svg viewBox="0 0 220 120" width="220" height="120" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="car-body-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="car-window-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="110" cy="112" rx="80" ry="8" fill="rgba(0,0,0,0.18)" />
      {/* Body */}
      <rect x="20" y="60" width="180" height="46" rx="10" fill="url(#car-body-g)" />
      {/* Roof */}
      <path d="M60 60 Q75 32 100 28 L150 28 Q172 32 178 60Z" fill="url(#car-body-g)" />
      {/* Windows */}
      <path d="M68 58 Q76 38 98 34 L130 34 Q146 38 154 58Z" fill="url(#car-window-g)" />
      <line x1="112" y1="34" x2="112" y2="58" stroke="rgba(0,100,200,0.2)" strokeWidth="1.5" />
      {/* Wheels */}
      <circle cx="65" cy="106" r="18" fill="#1e293b" />
      <circle cx="65" cy="106" r="10" fill="#475569" />
      <circle cx="65" cy="106" r="4" fill="#94a3b8" />
      <circle cx="155" cy="106" r="18" fill="#1e293b" />
      <circle cx="155" cy="106" r="10" fill="#475569" />
      <circle cx="155" cy="106" r="4" fill="#94a3b8" />
      {/* Headlight */}
      <ellipse cx="196" cy="76" rx="7" ry="5" fill="#fef9c3" opacity="0.9" />
      {/* Taillight */}
      <rect x="22" y="72" width="6" height="10" rx="2" fill="#fca5a5" opacity="0.9" />
      {/* Door line */}
      <line x1="112" y1="62" x2="112" y2="104" stroke="rgba(100,120,140,0.3)" strokeWidth="1.5" />
      {/* Grill */}
      <rect x="185" y="78" width="14" height="3" rx="1.5" fill="#cbd5e1" opacity="0.7" />
      <rect x="185" y="83" width="14" height="3" rx="1.5" fill="#cbd5e1" opacity="0.7" />
    </svg>
  );
}

function TrainSVG() {
  return (
    <svg viewBox="0 0 220 130" width="220" height="130" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="train-body-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="train-front-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      {/* Track */}
      <rect x="0" y="112" width="220" height="6" rx="3" fill="#475569" opacity="0.6" />
      <rect x="10" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      <rect x="40" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      <rect x="70" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      <rect x="100" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      <rect x="130" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      <rect x="160" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      <rect x="190" y="110" width="14" height="10" rx="2" fill="#64748b" opacity="0.5" />
      {/* Coach 2 */}
      <rect x="5" y="62" width="80" height="50" rx="6" fill="url(#train-body-g)" opacity="0.85" />
      <rect x="12" y="70" width="22" height="14" rx="3" fill="#bae6fd" opacity="0.8" />
      <rect x="38" y="70" width="22" height="14" rx="3" fill="#bae6fd" opacity="0.8" />
      <rect x="18" y="98" width="16" height="8" rx="4" fill="#1e293b" />
      <rect x="52" y="98" width="16" height="8" rx="4" fill="#1e293b" />
      {/* Engine */}
      <rect x="88" y="52" width="110" height="60" rx="8" fill="url(#train-front-g)" />
      <path d="M193 52 Q215 52 218 72 L218 112 L193 112Z" fill="url(#train-front-g)" />
      {/* Windshield */}
      <rect x="170" y="60" width="34" height="26" rx="5" fill="#e0f2fe" opacity="0.85" />
      {/* Windows on engine */}
      <rect x="96" y="62" width="24" height="16" rx="3" fill="#bae6fd" opacity="0.75" />
      <rect x="126" y="62" width="24" height="16" rx="3" fill="#bae6fd" opacity="0.75" />
      {/* Wheels */}
      <circle cx="108" cy="112" r="10" fill="#0f172a" />
      <circle cx="108" cy="112" r="5" fill="#334155" />
      <circle cx="148" cy="112" r="10" fill="#0f172a" />
      <circle cx="148" cy="112" r="5" fill="#334155" />
      <circle cx="188" cy="112" r="10" fill="#0f172a" />
      <circle cx="188" cy="112" r="5" fill="#334155" />
      {/* Headlight */}
      <circle cx="216" cy="80" r="7" fill="#fef08a" opacity="0.9" />
      <circle cx="216" cy="80" r="4" fill="#fde047" />
      {/* BD flag stripe */}
      <rect x="88" y="107" width="110" height="5" rx="2" fill="#006a4e" opacity="0.7" />
      {/* Steam puff */}
      <circle cx="100" cy="40" r="12" fill="white" opacity="0.15" />
      <circle cx="116" cy="30" r="9" fill="white" opacity="0.1" />
      <circle cx="130" cy="22" r="7" fill="white" opacity="0.08" />
    </svg>
  );
}

function PortalSVG() {
  return (
    <svg viewBox="0 0 200 140" width="200" height="140" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="portal-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#065f46" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Building base */}
      <rect x="50" y="80" width="100" height="60" rx="4" fill="white" opacity="0.9" />
      {/* Pillars */}
      <rect x="60" y="85" width="8" height="55" rx="2" fill="#d1fae5" />
      <rect x="76" y="85" width="8" height="55" rx="2" fill="#d1fae5" />
      <rect x="116" y="85" width="8" height="55" rx="2" fill="#d1fae5" />
      <rect x="132" y="85" width="8" height="55" rx="2" fill="#d1fae5" />
      {/* Dome */}
      <ellipse cx="100" cy="80" rx="40" ry="18" fill="white" opacity="0.95" />
      <ellipse cx="100" cy="78" rx="30" ry="12" fill="#d1fae5" opacity="0.8" />
      {/* Flag pole */}
      <line x1="100" y1="20" x2="100" y2="80" stroke="#10b981" strokeWidth="2" />
      {/* BD Flag */}
      <rect x="102" y="22" width="28" height="18" rx="2" fill="#006a4e" />
      <circle cx="116" cy="31" r="6" fill="#f40" />
      {/* Steps */}
      <rect x="42" y="136" width="116" height="5" rx="2" fill="#a7f3d0" opacity="0.8" />
      <rect x="36" y="139" width="128" height="5" rx="2" fill="#6ee7b7" opacity="0.6" />
      {/* Windows */}
      <rect x="72" y="95" width="12" height="16" rx="2" fill="#bbf7d0" opacity="0.7" />
      <rect x="94" y="95" width="12" height="16" rx="2" fill="#bbf7d0" opacity="0.7" />
      <rect x="116" y="95" width="12" height="16" rx="2" fill="#bbf7d0" opacity="0.7" />
      {/* Door */}
      <rect x="90" y="118" width="20" height="22" rx="3" fill="#065f46" opacity="0.6" />
      <circle cx="107" cy="129" r="2" fill="#a7f3d0" />
      {/* Service cards floating */}
      <rect x="4" y="30" width="44" height="30" rx="6" fill="white" opacity="0.9" />
      <rect x="8" y="35" width="28" height="4" rx="2" fill="#10b981" opacity="0.7" />
      <rect x="8" y="42" width="20" height="3" rx="1.5" fill="#d1d5db" opacity="0.7" />
      <rect x="8" y="48" width="16" height="3" rx="1.5" fill="#d1d5db" opacity="0.5" />
      <rect x="152" y="20" width="44" height="30" rx="6" fill="white" opacity="0.9" />
      <rect x="156" y="25" width="28" height="4" rx="2" fill="#10b981" opacity="0.7" />
      <rect x="156" y="32" width="20" height="3" rx="1.5" fill="#d1d5db" opacity="0.7" />
      <rect x="156" y="38" width="16" height="3" rx="1.5" fill="#d1d5db" opacity="0.5" />
      {/* Connecting lines */}
      <line x1="48" y1="45" x2="60" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
      <line x1="152" y1="35" x2="140" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
    </svg>
  );
}

function LaunchSVG() {
  return (
    <svg viewBox="0 0 220 130" width="220" height="130" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="water-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Water */}
      <path d="M0 95 Q30 88 60 95 Q90 102 120 95 Q150 88 180 95 Q210 102 220 95 L220 130 L0 130Z" fill="url(#water-g)" />
      {/* Wave detail */}
      <path d="M0 102 Q25 97 50 102 Q75 107 100 102 Q125 97 150 102 Q175 107 200 102 L220 102" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* Hull */}
      <path d="M30 95 Q40 110 100 112 Q160 110 190 95Z" fill="#0c4a6e" />
      {/* Body */}
      <rect x="40" y="52" width="140" height="44" rx="6" fill="white" opacity="0.92" />
      {/* Cabin upper deck */}
      <rect x="60" y="28" width="90" height="26" rx="5" fill="white" opacity="0.85" />
      {/* Windows lower */}
      <rect x="50" y="60" width="18" height="12" rx="3" fill="#bae6fd" opacity="0.8" />
      <rect x="74" y="60" width="18" height="12" rx="3" fill="#bae6fd" opacity="0.8" />
      <rect x="98" y="60" width="18" height="12" rx="3" fill="#bae6fd" opacity="0.8" />
      <rect x="122" y="60" width="18" height="12" rx="3" fill="#bae6fd" opacity="0.8" />
      <rect x="146" y="60" width="18" height="12" rx="3" fill="#bae6fd" opacity="0.8" />
      {/* Windows upper */}
      <rect x="68" y="34" width="14" height="10" rx="2" fill="#bae6fd" opacity="0.75" />
      <rect x="88" y="34" width="14" height="10" rx="2" fill="#bae6fd" opacity="0.75" />
      <rect x="108" y="34" width="14" height="10" rx="2" fill="#bae6fd" opacity="0.75" />
      <rect x="128" y="34" width="14" height="10" rx="2" fill="#bae6fd" opacity="0.75" />
      {/* Smoke stack */}
      <rect x="158" y="8" width="10" height="24" rx="5" fill="#334155" />
      {/* Smoke */}
      <circle cx="163" cy="6" r="6" fill="#94a3b8" opacity="0.3" />
      <circle cx="170" cy="0" r="4" fill="#94a3b8" opacity="0.2" />
      {/* Flag */}
      <line x1="78" y1="4" x2="78" y2="28" stroke="#334155" strokeWidth="2" />
      <path d="M78 4 L100 10 L78 16Z" fill="#006a4e" />
      {/* Rope */}
      <line x1="30" y1="95" x2="40" y2="52" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
      <line x1="190" y1="95" x2="178" y2="52" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function PlaneSVG() {
  return (
    <svg viewBox="0 0 220 130" width="220" height="130" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="plane-body-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Clouds */}
      <circle cx="20" cy="25" r="14" fill="white" opacity="0.2" />
      <circle cx="34" cy="20" r="18" fill="white" opacity="0.18" />
      <circle cx="52" cy="26" r="12" fill="white" opacity="0.2" />
      <circle cx="170" cy="90" r="10" fill="white" opacity="0.15" />
      <circle cx="182" cy="87" r="14" fill="white" opacity="0.13" />
      <circle cx="196" cy="92" r="9" fill="white" opacity="0.15" />
      {/* Plane body */}
      <path d="M40 65 Q80 55 160 58 Q196 60 210 68 Q196 76 160 78 Q80 81 40 71Z" fill="url(#plane-body-g)" />
      {/* Nose */}
      <path d="M200 65 Q218 68 210 68 Q218 68 200 71Z" fill="#e2e8f0" opacity="0.9" />
      {/* Tail fin */}
      <path d="M45 68 L48 48 L70 65Z" fill="white" opacity="0.85" />
      <path d="M45 68 L48 88 L70 71Z" fill="#f1f5f9" opacity="0.85" />
      {/* Main wing */}
      <path d="M120 66 L140 24 L160 28 L150 66Z" fill="white" opacity="0.8" />
      <path d="M120 70 L140 112 L160 108 L150 70Z" fill="#f1f5f9" opacity="0.7" />
      {/* BD flag stripe on body */}
      <rect x="70" y="62" width="100" height="5" rx="2" fill="#006a4e" opacity="0.6" />
      <circle cx="88" cy="64.5" r="5" fill="#f40" opacity="0.7" />
      {/* Windows */}
      <circle cx="155" cy="66" r="4" fill="#bae6fd" opacity="0.8" />
      <circle cx="144" cy="66" r="4" fill="#bae6fd" opacity="0.8" />
      <circle cx="133" cy="66" r="4" fill="#bae6fd" opacity="0.8" />
      <circle cx="122" cy="66" r="4" fill="#bae6fd" opacity="0.8" />
      <circle cx="111" cy="66" r="4" fill="#bae6fd" opacity="0.8" />
      {/* Engine */}
      <ellipse cx="130" cy="86" rx="16" ry="7" fill="#cbd5e1" opacity="0.85" />
      <ellipse cx="130" cy="86" rx="10" ry="4" fill="#94a3b8" opacity="0.8" />
      {/* Contrail */}
      <line x1="30" y1="68" x2="5" y2="68" stroke="white" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
      <line x1="30" y1="72" x2="8" y2="76" stroke="white" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.3" />
    </svg>
  );
}

// ── Banner data ──────────────────────────────────────────────────────────────

interface BannerData {
  id: string;
  gradFrom: string;
  gradTo: string;
  accent: string;
  logoBg: string;
  icon: string;
  nameEn: string;
  nameBn: string;
  subtitleEn: string;
  subtitleBn: string;
  descEn: string;
  descBn: string;
  features: { iconEn: string; labelEn: string; labelBn: string }[];
  links: { labelEn: string; labelBn: string; url: string; primary?: boolean }[];
  Illustration: () => React.ReactElement;
}

const BANNERS: BannerData[] = [
  {
    id: 'brta',
    gradFrom: '#064e3b',
    gradTo: '#065f46',
    accent: '#10b981',
    logoBg: 'rgba(16,185,129,0.2)',
    icon: '🚗',
    nameEn: 'BRTA',
    nameBn: 'BRTA',
    subtitleEn: 'Road Transport Authority',
    subtitleBn: 'বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ',
    descEn: 'Check driving license, vehicle registration & fitness certificate online.',
    descBn: 'ড্রাইভিং লাইসেন্স, গাড়ির রেজিস্ট্রেশন ও ফিটনেস সার্টিফিকেট অনলাইনে যাচাই করুন।',
    features: [
      { iconEn: '🪪', labelEn: 'Driving License', labelBn: 'ড্রাইভিং লাইসেন্স' },
      { iconEn: '📋', labelEn: 'Vehicle Registration', labelBn: 'গাড়ি রেজিস্ট্রেশন' },
      { iconEn: '✅', labelEn: 'Fitness Certificate', labelBn: 'ফিটনেস সার্টিফিকেট' },
    ],
    links: [
      { labelEn: 'License check', labelBn: 'লাইসেন্স যাচাই', url: 'https://bsp.brta.gov.bd/license-check', primary: true },
      { labelEn: 'Vehicle check', labelBn: 'গাড়ি যাচাই', url: 'https://bsp.brta.gov.bd/vehicle-check' },
    ],
    Illustration: CarSVG,
  },
  {
    id: 'railway',
    gradFrom: '#1e1b4b',
    gradTo: '#1e3a8a',
    accent: '#60a5fa',
    logoBg: 'rgba(96,165,250,0.18)',
    icon: '🚂',
    nameEn: 'BD Railway',
    nameBn: 'বাংলাদেশ রেলওয়ে',
    subtitleEn: 'Train Tickets & Schedules',
    subtitleBn: 'ট্রেন টিকিট ও সময়সূচি',
    descEn: 'Buy tickets online & check schedules for all 440+ railway stations.',
    descBn: '৪৪০+ স্টেশনের টিকিট অনলাইনে কিনুন ও সময়সূচি দেখুন।',
    features: [
      { iconEn: '🎫', labelEn: 'Online Tickets', labelBn: 'অনলাইন টিকিট' },
      { iconEn: '📅', labelEn: 'Schedule', labelBn: 'সময়সূচি' },
      { iconEn: '🔍', labelEn: 'PNR Status', labelBn: 'PNR স্ট্যাটাস' },
    ],
    links: [
      { labelEn: 'Buy tickets', labelBn: 'টিকিট কিনুন', url: 'https://eticket.railway.gov.bd', primary: true },
      { labelEn: 'Schedule', labelBn: 'সময়সূচি', url: 'https://railway.gov.bd/pages/train_schedule.php' },
    ],
    Illustration: TrainSVG,
  },
  {
    id: 'mygov',
    gradFrom: '#052e16',
    gradTo: '#064e3b',
    accent: '#34d399',
    logoBg: 'rgba(52,211,153,0.18)',
    icon: '🏛️',
    nameEn: 'MyGov',
    nameBn: 'মাইগভ',
    subtitleEn: 'One-stop Government Services',
    subtitleBn: 'এক ঠিকানায় সরকারি সেবা',
    descEn: 'Birth certificate, NID, passport, land records & 500+ govt services.',
    descBn: 'জন্ম নিবন্ধন, NID, পাসপোর্ট, ভূমি তথ্য ও ৫০০+ সরকারি সেবা।',
    features: [
      { iconEn: '📄', labelEn: 'Birth Certificate', labelBn: 'জন্ম নিবন্ধন' },
      { iconEn: '🛂', labelEn: 'Passport', labelBn: 'পাসপোর্ট' },
      { iconEn: '🗺️', labelEn: 'Land Records', labelBn: 'ভূমি তথ্য' },
    ],
    links: [
      { labelEn: 'Browse services', labelBn: 'সেবা দেখুন', url: 'https://www.mygov.bd', primary: true },
      { labelEn: 'Application status', labelBn: 'আবেদনের অবস্থা', url: 'https://www.mygov.bd/en/application-status' },
    ],
    Illustration: PortalSVG,
  },
  {
    id: 'biwtc',
    gradFrom: '#0c4a6e',
    gradTo: '#075985',
    accent: '#38bdf8',
    logoBg: 'rgba(56,189,248,0.18)',
    icon: '⛴️',
    nameEn: 'BIWTC',
    nameBn: 'BIWTC',
    subtitleEn: 'Inland Water Transport',
    subtitleBn: 'অভ্যন্তরীণ নৌ-পরিবহন',
    descEn: 'Sadarghat launch schedules, tickets & routes across Bangladesh.',
    descBn: 'সদরঘাট থেকে সারাদেশে লঞ্চের সময়সূচি ও টিকিট।',
    features: [
      { iconEn: '🗺️', labelEn: 'Routes', labelBn: 'রুট' },
      { iconEn: '🕐', labelEn: 'Schedule', labelBn: 'সময়সূচি' },
      { iconEn: '🎫', labelEn: 'Tickets', labelBn: 'টিকিট' },
    ],
    links: [
      { labelEn: 'View schedules', labelBn: 'সময়সূচি দেখুন', url: 'https://biwtc.gov.bd', primary: true },
    ],
    Illustration: LaunchSVG,
  },
  {
    id: 'biman',
    gradFrom: '#1c1917',
    gradTo: '#7f1d1d',
    accent: '#f87171',
    logoBg: 'rgba(248,113,113,0.18)',
    icon: '✈️',
    nameEn: 'Biman Bangladesh',
    nameBn: 'বিমান বাংলাদেশ',
    subtitleEn: 'National Airline',
    subtitleBn: 'জাতীয় বিমান সংস্থা',
    descEn: 'Domestic & international flights — book online with Biman Bangladesh Airlines.',
    descBn: 'দেশে ও বিদেশে ফ্লাইট — বিমান বাংলাদেশ এয়ারলাইন্সে অনলাইনে বুক করুন।',
    features: [
      { iconEn: '🛫', labelEn: 'Domestic Flights', labelBn: 'অভ্যন্তরীণ ফ্লাইট' },
      { iconEn: '🌍', labelEn: 'International', labelBn: 'আন্তর্জাতিক' },
      { iconEn: '📱', labelEn: 'Online Check-in', labelBn: 'অনলাইন চেক-ইন' },
    ],
    links: [
      { labelEn: 'Book flight', labelBn: 'ফ্লাইট বুক করুন', url: 'https://www.biman-airlines.com', primary: true },
      { labelEn: 'Flight status', labelBn: 'ফ্লাইট স্ট্যাটাস', url: 'https://www.biman-airlines.com/flight-status' },
    ],
    Illustration: PlaneSVG,
  },
];

// ── Single banner card ───────────────────────────────────────────────────────

function BannerCard({ banner, lang, height }: { banner: BannerData; lang: Lang; height: number }) {
  const isBn = lang === 'bn';
  const font = isBn ? BEN : SANS;
  const { Illustration } = banner;

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(135deg, ${banner.gradFrom} 0%, ${banner.gradTo} 100%)`,
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)`,
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Accent glow top-right */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -20,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: banner.accent,
        opacity: 0.08,
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      {/* LEFT: content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 16px 14px 20px',
        position: 'relative',
        zIndex: 1,
        minWidth: 0,
      }}>
        {/* Top: logo + name */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: banner.logoBg,
              border: `1.5px solid ${banner.accent}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
            }}>
              {banner.icon}
            </div>
            <div>
              <div style={{
                fontFamily: font,
                fontWeight: 800,
                fontSize: 22,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: -0.5,
              }}>
                {isBn ? banner.nameBn : banner.nameEn}
              </div>
              <div style={{
                fontFamily: SANS,
                fontWeight: 500,
                fontSize: 10,
                color: banner.accent,
                marginTop: 1,
                letterSpacing: 0.3,
              }}>
                {isBn ? banner.subtitleBn : banner.subtitleEn}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div style={{ width: 36, height: 2, background: banner.accent, borderRadius: 2, marginBottom: 8, opacity: 0.8 }} />

          {/* Description */}
          <div style={{
            fontFamily: font,
            fontSize: 11,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.5,
            maxWidth: 220,
          }}>
            {isBn ? banner.descBn : banner.descEn}
          </div>
        </div>

        {/* Bottom: features + CTA */}
        <div>
          {/* Feature icons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            {banner.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)',
                  border: `1px solid rgba(255,255,255,0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}>
                  {f.iconEn}
                </div>
                <span style={{
                  fontFamily: SANS,
                  fontSize: 8.5,
                  color: 'rgba(255,255,255,0.65)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  maxWidth: 48,
                }}>
                  {isBn ? f.labelBn : f.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {banner.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: link.primary ? banner.accent : 'rgba(255,255,255,0.1)',
                  color: link.primary ? (banner.gradFrom === '#064e3b' || banner.gradFrom === '#052e16' ? '#052e16' : '#fff') : 'rgba(255,255,255,0.85)',
                  border: link.primary ? 'none' : `1px solid rgba(255,255,255,0.2)`,
                  borderRadius: 999,
                  padding: '5px 12px',
                  fontFamily: font,
                  fontSize: 11,
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                {isBn ? link.labelBn : link.labelEn}
                {link.primary && ' →'}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: illustration */}
      <div style={{
        width: 220,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 4,
      }}>
        {/* Radial glow behind illustration */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: banner.accent,
          opacity: 0.12,
          filter: 'blur(30px)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Illustration />
        </div>
      </div>
    </div>
  );
}

// ── GovAdBanner: rotating banner carousel ────────────────────────────────────
export function GovAdBanner({
  lang,
  height = 240,
  banners = ['brta', 'railway', 'mygov', 'biwtc', 'biman'],
}: {
  lang: Lang;
  height?: number;
  banners?: string[];
}) {
  const selected = banners.map(id => BANNERS.find(b => b.id === id)).filter(Boolean) as BannerData[];
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number>(0);

  const goTo = (i: number) => {
    clearInterval(timerRef.current);
    setIdx(i);
    timerRef.current = window.setInterval(() => setIdx(c => (c + 1) % selected.length), 5000);
  };

  useEffect(() => {
    if (selected.length <= 1) return;
    timerRef.current = window.setInterval(() => setIdx(c => (c + 1) % selected.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [selected.length]);

  if (!selected.length) return null;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <BannerCard banner={selected[idx]} lang={lang} height={height} />

      {/* Dot nav */}
      {selected.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {selected.map((b, i) => (
            <button
              key={b.id}
              onClick={() => goTo(i)}
              style={{
                width: i === idx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: 'none',
                background: i === idx ? selected[idx].accent : 'rgba(255,255,255,0.25)',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
