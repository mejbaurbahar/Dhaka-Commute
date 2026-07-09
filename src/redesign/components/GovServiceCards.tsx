import React, { useState } from 'react';
import { Tokens, Lang, SANS, BEN, T } from '../tokens';

interface GovCard {
  icon: string;
  nameBn: string;
  nameEn: string;
  tagBn: string;
  tagEn: string;
  descBn: string;
  descEn: string;
  links: { labelBn: string; labelEn: string; url: string }[];
  color: string;
  bgColor: string;
}

const GOV_CARDS: GovCard[] = [
  {
    icon: '🚗',
    nameBn: 'BRTA',
    nameEn: 'BRTA',
    tagBn: 'সড়ক পরিবহন কর্তৃপক্ষ',
    tagEn: 'Road Transport Authority',
    descBn: 'গাড়ির রেজিস্ট্রেশন, ড্রাইভিং লাইসেন্স ও ফিটনেস সার্টিফিকেট চেক করুন।',
    descEn: 'Check vehicle registration, driving license status & fitness certificate.',
    links: [
      { labelBn: 'লাইসেন্স যাচাই', labelEn: 'License check', url: 'https://bsp.brta.gov.bd/license-check' },
      { labelBn: 'গাড়ি যাচাই', labelEn: 'Vehicle check', url: 'https://bsp.brta.gov.bd/vehicle-check' },
      { labelBn: 'BRTA ওয়েবসাইট', labelEn: 'BRTA website', url: 'https://brta.gov.bd' },
    ],
    color: '#2563eb',
    bgColor: 'rgba(37,99,235,0.1)',
  },
  {
    icon: '🚂',
    nameBn: 'বাংলাদেশ রেলওয়ে',
    nameEn: 'BD Railway',
    tagBn: 'ট্রেন টিকিট ও সময়সূচি',
    tagEn: 'Train Tickets & Schedule',
    descBn: 'অনলাইনে ট্রেনের টিকিট কিনুন এবং সময়সূচি দেখুন।',
    descEn: 'Buy train tickets online and view schedules for all routes.',
    links: [
      { labelBn: 'টিকিট কিনুন', labelEn: 'Buy tickets', url: 'https://eticket.railway.gov.bd' },
      { labelBn: 'সময়সূচি', labelEn: 'Schedule', url: 'https://railway.gov.bd/pages/train_schedule.php' },
      { labelBn: 'রেলওয়ে ওয়েবসাইট', labelEn: 'Railway website', url: 'https://railway.gov.bd' },
    ],
    color: '#16a34a',
    bgColor: 'rgba(22,163,74,0.1)',
  },
  {
    icon: '🏛️',
    nameBn: 'মাইগভ',
    nameEn: 'MyGov',
    tagBn: 'এক ঠিকানায় সরকারি সেবা',
    tagEn: 'One-stop Government Services',
    descBn: 'জন্ম নিবন্ধন, পাসপোর্ট, জমির তথ্য ও সব সরকারি সেবা এক জায়গায়।',
    descEn: 'Birth certificate, passport, land records & all govt services in one place.',
    links: [
      { labelBn: 'সেবা খুঁজুন', labelEn: 'Find services', url: 'https://www.mygov.bd' },
      { labelBn: 'আবেদনের অবস্থা', labelEn: 'Application status', url: 'https://www.mygov.bd/en/application-status' },
      { labelBn: 'ই-সেবা', labelEn: 'e-Services', url: 'https://www.mygov.bd/en/category' },
    ],
    color: '#059669',
    bgColor: 'rgba(5,150,105,0.1)',
  },
  {
    icon: '✈️',
    nameBn: 'বিমান বাংলাদেশ',
    nameEn: 'Biman Bangladesh',
    tagBn: 'জাতীয় বিমান সংস্থা',
    tagEn: 'National Airline',
    descBn: 'ফ্লাইট বুকিং, সময়সূচি ও চেক-ইন সুবিধা।',
    descEn: 'Flight booking, schedule, and online check-in.',
    links: [
      { labelBn: 'টিকিট বুকিং', labelEn: 'Book flight', url: 'https://www.biman-airlines.com' },
      { labelBn: 'ফ্লাইট স্ট্যাটাস', labelEn: 'Flight status', url: 'https://www.biman-airlines.com/flight-status' },
    ],
    color: '#dc2626',
    bgColor: 'rgba(220,38,38,0.1)',
  },
  {
    icon: '⛴️',
    nameBn: 'BIWTC',
    nameEn: 'BIWTC',
    tagBn: 'অভ্যন্তরীণ নৌ-পরিবহন',
    tagEn: 'Inland Water Transport',
    descBn: 'লঞ্চ টিকিট, রুট ও সময়সূচি জানুন সদরঘাট থেকে।',
    descEn: 'Launch tickets, routes & schedules from Sadarghat terminal.',
    links: [
      { labelBn: 'সময়সূচি', labelEn: 'Schedule', url: 'https://biwtc.gov.bd' },
      { labelBn: 'BIWTC ওয়েবসাইট', labelEn: 'BIWTC website', url: 'https://biwtc.gov.bd' },
    ],
    color: '#0891b2',
    bgColor: 'rgba(8,145,178,0.1)',
  },
];

// Single compact gov card
function GovCardItem({
  tk,
  lang,
  card,
  compact,
  defaultExpanded,
}: {
  tk: Tokens;
  lang: Lang;
  card: GovCard;
  compact?: boolean;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);
  const font = lang === 'bn' ? BEN : SANS;

  return (
    <div
      style={{
        background: tk.panel,
        border: `1px solid ${tk.line}`,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: tk.shadow,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: compact ? '12px 14px' : '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: compact ? 36 : 42,
            height: compact ? 36 : 42,
            borderRadius: 12,
            background: card.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: compact ? 18 : 22,
            flexShrink: 0,
          }}
        >
          {card.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: font,
                fontWeight: 700,
                fontSize: compact ? 13 : 14,
                color: tk.text,
              }}
            >
              {lang === 'bn' ? card.nameBn : card.nameEn}
            </span>
            <span
              style={{
                background: card.bgColor,
                color: card.color,
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 999,
                border: `1px solid ${card.color}30`,
              }}
            >
              {lang === 'bn' ? card.tagBn : card.tagEn}
            </span>
          </div>
          {!compact && (
            <div
              style={{
                fontFamily: font,
                fontSize: 11,
                color: tk.textDim,
                marginTop: 2,
                lineHeight: 1.4,
              }}
            >
              {lang === 'bn' ? card.descBn : card.descEn}
            </div>
          )}
        </div>
        <span style={{ color: tk.textFaint, fontSize: 12, flexShrink: 0 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Expanded links */}
      {expanded && (
        <div
          style={{
            borderTop: `1px solid ${tk.line}`,
            padding: '10px 14px 14px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {compact && (
            <div
              style={{
                width: '100%',
                fontFamily: font,
                fontSize: 11,
                color: tk.textDim,
                marginBottom: 6,
                lineHeight: 1.4,
              }}
            >
              {lang === 'bn' ? card.descBn : card.descEn}
            </div>
          )}
          {card.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: card.bgColor,
                color: card.color,
                border: `1px solid ${card.color}30`,
                borderRadius: 999,
                padding: '6px 14px',
                fontFamily: font,
                fontSize: 12,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {lang === 'bn' ? link.labelBn : link.labelEn} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── GovServiceCards: renders a section of govt service info cards ─────────────
// Use `variant="grid"` for 2-column layout on wide screens.
// Use `cards` to select specific ones: ['brta','railway','mygov','biman','biwtc']
// Defaults to first 3 (BRTA, Railway, MyGov).
export function GovServiceCards({
  tk,
  lang,
  isMobile,
  cards = ['brta', 'railway', 'mygov'],
  variant = 'list',
  compact,
  defaultExpanded,
}: {
  tk: Tokens;
  lang: Lang;
  isMobile: boolean;
  cards?: Array<'brta' | 'railway' | 'mygov' | 'biman' | 'biwtc'>;
  variant?: 'list' | 'grid';
  compact?: boolean;
  defaultExpanded?: boolean;
}) {
  const keyMap: Record<string, GovCard> = {
    brta: GOV_CARDS[0],
    railway: GOV_CARDS[1],
    mygov: GOV_CARDS[2],
    biman: GOV_CARDS[3],
    biwtc: GOV_CARDS[4],
  };

  const selected = cards.map(k => keyMap[k]).filter(Boolean);
  const font = lang === 'bn' ? BEN : SANS;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Section label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 3,
            height: 18,
            borderRadius: 2,
            background: tk.primary,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: font,
            fontSize: 12,
            fontWeight: 700,
            color: tk.textDim,
            letterSpacing: 0.3,
            textTransform: 'uppercase',
          }}
        >
          {T(lang, 'সরকারি সেবা', 'Government Services')}
        </span>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            variant === 'grid' && !isMobile ? 'repeat(2, 1fr)' : '1fr',
          gap: 10,
        }}
      >
        {selected.map((card, i) => (
          <GovCardItem
            key={i}
            tk={tk}
            lang={lang}
            card={card}
            compact={compact}
            defaultExpanded={defaultExpanded}
          />
        ))}
      </div>
    </div>
  );
}
