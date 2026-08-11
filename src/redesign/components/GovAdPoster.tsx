/**
 * GovAdPoster — native-feeling government service hub.
 * Looks like a built-in koyjabo.com feature, not an ad.
 */
import React, { useRef, useState } from 'react';
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
            {isBn ? d.nameBn : d.nameEn}
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
            {isBn ? d.nameBn : d.nameEn}
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
              {isBn ? d.tagBn : d.tagEn}
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <ul style={{ margin: '12px 0 0', padding: '0 16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(isBn ? d.featuresBn : d.featuresEn).map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
              background: d.color, opacity: 0.7, marginTop: 5,
            }} />
            <span style={{
              fontFamily: font, fontSize: 12, color: tk.textDim, lineHeight: 1.4,
            }}>
              {f}
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
          {isBn ? d.ctaBn : d.ctaEn}
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
            {isBn ? d.secondBn : d.secondEn}
          </a>
        )}
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
