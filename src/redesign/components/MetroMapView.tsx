import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { T, SANS, BEN } from '../tokens';
import type { Lang } from '../tokens';

type Status = 'active' | 'under-construction' | 'planned';

interface Station {
  id: string;
  name: string;
  bn: string;
  lat: number;
  lng: number;
  status: Status;
}

interface Line {
  id: string;
  nameBn: string;
  nameEn: string;
  color: string;
  status: Status;
  stations: Station[];
  branches?: Station[][];
}

interface Props {
  tk: Record<string, string>;
  lang: Lang;
  theme: 'dark' | 'light';
  isMobile: boolean;
  fareFromName?: string;
  fareToName?: string;
}

// ── Line data ──────────────────────────────────────────────────────────
const MRT6: Line = {
  id: 'mrt6', nameBn: 'এমআরটি-৬', nameEn: 'MRT-6', color: '#00843D', status: 'active',
  stations: [
    { id: 'u6-un',  name: 'Uttara North',      bn: 'উত্তরা উত্তর',       lat: 23.8694, lng: 90.3675, status: 'active' },
    { id: 'u6-uc',  name: 'Uttara Center',      bn: 'উত্তরা কেন্দ্র',      lat: 23.8598, lng: 90.3651, status: 'active' },
    { id: 'u6-us',  name: 'Uttara South',       bn: 'উত্তরা দক্ষিণ',       lat: 23.8456, lng: 90.3631, status: 'active' },
    { id: 'u6-pb',  name: 'Pallabi',            bn: 'পল্লবী',             lat: 23.8262, lng: 90.3642, status: 'active' },
    { id: 'u6-m11', name: 'Mirpur 11',          bn: 'মিরপুর ১১',           lat: 23.8191, lng: 90.3653, status: 'active' },
    { id: 'u6-m10', name: 'Mirpur 10',          bn: 'মিরপুর ১০',           lat: 23.8084, lng: 90.3682, status: 'active' },
    { id: 'u6-kz',  name: 'Kazipara',           bn: 'কাজীপাড়া',           lat: 23.7992, lng: 90.3720, status: 'active' },
    { id: 'u6-sw',  name: 'Shewrapara',         bn: 'শেওড়াপাড়া',          lat: 23.7909, lng: 90.3755, status: 'active' },
    { id: 'u6-ag',  name: 'Agargaon',           bn: 'আগারগাঁও',            lat: 23.7777, lng: 90.3802, status: 'active' },
    { id: 'u6-bs',  name: 'Bijoy Sarani',       bn: 'বিজয় সরণি',          lat: 23.766569, lng: 90.383082, status: 'active' },
    { id: 'u6-fg',  name: 'Farmgate',           bn: 'ফার্মগেট',            lat: 23.759056, lng: 90.387059, status: 'active' },
    { id: 'u6-kb',  name: 'Karwan Bazar',       bn: 'কারওয়ান বাজার',       lat: 23.7513, lng: 90.3927, status: 'active' },
    { id: 'u6-sh',  name: 'Shahbagh',           bn: 'শাহবাগ',             lat: 23.7395, lng: 90.3960, status: 'active' },
    { id: 'u6-du',  name: 'Dhaka University',   bn: 'ঢাকা বিশ্ববিদ্যালয়', lat: 23.7319, lng: 90.3965, status: 'active' },
    { id: 'u6-sc',  name: 'Secretariat',        bn: 'সচিবালয়',            lat: 23.7300, lng: 90.4075, status: 'active' },
    { id: 'u6-mj',  name: 'Motijheel',          bn: 'মতিঝিল',             lat: 23.7281, lng: 90.4191, status: 'active' },
    { id: 'u6-kp',  name: 'Kamalapur',          bn: 'কমলাপুর',            lat: 23.7330, lng: 90.4255, status: 'under-construction' },
  ],
};

const MRT1: Line = {
  id: 'mrt1', nameBn: 'এমআরটি-১', nameEn: 'MRT-1', color: '#DA291C', status: 'under-construction',
  stations: [
    { id: 'u1-ap',  name: 'Airport (HSIA)',      bn: 'বিমানবন্দর',               lat: 23.8430, lng: 90.3979, status: 'under-construction' },
    { id: 'u1-t3',  name: 'Airport Terminal 3',  bn: 'বিমানবন্দর টার্মিনাল ৩',  lat: 23.8560, lng: 90.4020, status: 'under-construction' },
    { id: 'u1-kh',  name: 'Khilkhet',            bn: 'খিলক্ষেত',                 lat: 23.8340, lng: 90.4210, status: 'under-construction' },
    { id: 'u1-nd',  name: 'Nadda',               bn: 'নদ্দা',                    lat: 23.809381, lng: 90.421458, status: 'under-construction' },
    { id: 'u1-nb',  name: 'Notun Bazar',         bn: 'নতুন বাজার',               lat: 23.7978186, lng: 90.4236046, status: 'under-construction' },
    { id: 'u1-nbd', name: 'North Badda',         bn: 'উত্তর বাড্ডা',             lat: 23.7846244, lng: 90.4257302, status: 'under-construction' },
    { id: 'u1-bd',  name: 'Badda',               bn: 'বাড্ডা',                   lat: 23.7780, lng: 90.4260, status: 'under-construction' },
    { id: 'u1-af',  name: 'Aftabnagar',          bn: 'আফতাবনগর',                 lat: 23.7640, lng: 90.4300, status: 'under-construction' },
    { id: 'u1-rp',  name: 'Rampura',             bn: 'রামপুরা',                  lat: 23.7606706, lng: 90.4191967, status: 'under-construction' },
    { id: 'u1-ml',  name: 'Malibagh',            bn: 'মালিবাগ',                  lat: 23.749715, lng: 90.413211, status: 'under-construction' },
    { id: 'u1-rb',  name: 'Rajarbagh',           bn: 'রাজারবাগ',                 lat: 23.739767, lng: 90.420006, status: 'under-construction' },
    { id: 'u1-kp',  name: 'Kamalapur',           bn: 'কমলাপুর',                 lat: 23.7330, lng: 90.4255, status: 'under-construction' },
  ],
  branches: [[
    { id: 'u1-nb2', name: 'Notun Bazar',         bn: 'নতুন বাজার',               lat: 23.7978186, lng: 90.4236046, status: 'under-construction' },
    { id: 'u1-nd2', name: 'Nadda',               bn: 'নদ্দা',                    lat: 23.809381, lng: 90.421458, status: 'under-construction' },
    { id: 'u1-js',  name: 'Joar Shahara',        bn: 'জোয়ার সাহারা',             lat: 23.8177528, lng: 90.4184093, status: 'under-construction' },
    { id: 'u1-bo',  name: 'Boalia',              bn: 'বোয়ালিয়া',                lat: 23.827469, lng: 90.432824, status: 'under-construction' },
    { id: 'u1-ms',  name: 'Mastul',              bn: 'মস্তুল',                   lat: 23.8330073, lng: 90.4565608, status: 'under-construction' },
    { id: 'u1-cs',  name: 'Purbachal National Cricket Ground', bn: 'পূর্বাচল ন্যাশনাল ক্রিকেট গ্রাউন্ড', lat: 23.8358236, lng: 90.4815162, status: 'under-construction' },
    { id: 'u1-pc',  name: 'Purbachal Center',    bn: 'পূর্বাচল মধ্য',            lat: 23.837332, lng: 90.506584, status: 'under-construction' },
    { id: 'u1-pe',  name: 'Purbachal East',      bn: 'পূর্বাচল পূর্ব',           lat: 23.834309, lng: 90.541487, status: 'under-construction' },
    { id: 'u1-pt',  name: 'Purbachal Terminal',  bn: 'পূর্বাচল টার্মিনাল',       lat: 23.8030, lng: 90.5450, status: 'under-construction' },
  ]],
};

const MRT5N: Line = {
  id: 'mrt5n', nameBn: 'এমআরটি-৫ উত্তর', nameEn: 'MRT-5N', color: '#00B5E2', status: 'under-construction',
  stations: [
    { id: 'u5n-hm',  name: 'Hemayetpur',  bn: 'হেমায়েতপুর', lat: 23.7942811, lng: 90.2756777, status: 'under-construction' },
    { id: 'u5n-bl',  name: 'Baliarpur',   bn: 'বালিয়ারপুর', lat: 23.7951522, lng: 90.2906814, status: 'under-construction' },
    { id: 'u5n-bm',  name: 'Bilamalia',   bn: 'বিলামালিয়া', lat: 23.7919634, lng: 90.3039211, status: 'under-construction' },
    { id: 'u5n-ab',  name: 'Amin Bazar',  bn: 'আমিনবাজার',  lat: 23.7866877, lng: 90.3292764, status: 'under-construction' },
    { id: 'u5n-gb',  name: 'Gabtoli',     bn: 'গাবতলী',      lat: 23.7827, lng: 90.3451, status: 'under-construction' },
    { id: 'u5n-ds',  name: 'Darus Salam', bn: 'দারুস সালাম', lat: 23.7788878, lng: 90.3562098, status: 'under-construction' },
    { id: 'u5n-m1',  name: 'Mirpur 1',    bn: 'মিরপুর ১',    lat: 23.7982724, lng: 90.35344,   status: 'under-construction' },
    { id: 'u5n-m10', name: 'Mirpur 10',   bn: 'মিরপুর ১০',   lat: 23.8084, lng: 90.3682, status: 'under-construction' },
    { id: 'u5n-m14', name: 'Mirpur 14',   bn: 'মিরপুর ১৪',   lat: 23.7982638, lng: 90.3875631, status: 'under-construction' },
    { id: 'u5n-kc',  name: 'Kochukhet',   bn: 'কচুক্ষেত',    lat: 23.791537,  lng: 90.3876237, status: 'under-construction' },
    { id: 'u5n-bn',  name: 'Banani',      bn: 'বনানী',       lat: 23.7940, lng: 90.4020, status: 'under-construction' },
    { id: 'u5n-g2',  name: 'Gulshan 2',   bn: 'গুলশান ২',    lat: 23.7940, lng: 90.4140, status: 'under-construction' },
    { id: 'u5n-nb',  name: 'Notun Bazar', bn: 'নতুন বাজার',  lat: 23.7978186, lng: 90.4236046, status: 'under-construction' },
    { id: 'u5n-vt',  name: 'Vatara',      bn: 'ভাটারা',      lat: 23.7997611, lng: 90.4311383, status: 'under-construction' },
  ],
};

const MRT5S: Line = {
  id: 'mrt5s', nameBn: 'এমআরটি-৫ দক্ষিণ', nameEn: 'MRT-5S', color: '#FF8200', status: 'planned',
  stations: [
    { id: 'u5s-gb', name: 'Gabtoli',          bn: 'গাবতলী',           lat: 23.7827, lng: 90.3451, status: 'planned' },
    { id: 'u5s-tc', name: 'Technical',        bn: 'টেকনিক্যাল',        lat: 23.7730, lng: 90.3600, status: 'planned' },
    { id: 'u5s-kl', name: 'Kallyanpur',       bn: 'কল্যাণপুর',         lat: 23.7720, lng: 90.3660, status: 'planned' },
    { id: 'u5s-sy', name: 'Shyamoli',         bn: 'শ্যামলী',           lat: 23.7690, lng: 90.3720, status: 'planned' },
    { id: 'u5s-cg', name: 'College Gate',     bn: 'কলেজ গেট',          lat: 23.76949, lng: 90.368918, status: 'planned' },
    { id: 'u5s-ag', name: 'Asad Gate',        bn: 'আসাদ গেট',          lat: 23.7600, lng: 90.3700, status: 'planned' },
    { id: 'u5s-rs', name: 'Russel Square',    bn: 'রাসেল স্কয়ার',      lat: 23.7520, lng: 90.3780, status: 'planned' },
    { id: 'u5s-kb', name: 'Karwan Bazar',     bn: 'কারওয়ান বাজার',     lat: 23.7513, lng: 90.3927, status: 'planned' },
    { id: 'u5s-hj', name: 'Hatirjheel',       bn: 'হাতিরঝিল',          lat: 23.7580, lng: 90.4040, status: 'planned' },
    { id: 'u5s-tj', name: 'Tejgaon',          bn: 'তেজগাঁও',           lat: 23.7650, lng: 90.4070, status: 'planned' },
    { id: 'u5s-af', name: 'Aftabnagar',       bn: 'আফতাবনগর',          lat: 23.7640, lng: 90.4300, status: 'planned' },
    { id: 'u5s-ac', name: 'Aftabnagar Center',bn: 'আফতাবনগর সেন্টার',  lat: 23.7620, lng: 90.4380, status: 'planned' },
    { id: 'u5s-ae', name: 'Aftabnagar East',  bn: 'আফতাবনগর পূর্ব',    lat: 23.7600, lng: 90.4460, status: 'planned' },
    { id: 'u5s-ns', name: 'Nasirabad',        bn: 'নাসিরাবাদ',         lat: 23.7515134, lng: 90.4520316, status: 'planned' },
    { id: 'u5s-dk', name: 'Dasherkandi',      bn: 'দাশেরকান্দি',        lat: 23.7617715, lng: 90.4693754, status: 'planned' },
  ],
};

const MRT2: Line = {
  id: 'mrt2', nameBn: 'এমআরটি-২', nameEn: 'MRT-2', color: '#7B2D8B', status: 'planned',
  stations: [
    { id: 'u2-gb',  name: 'Gabtoli',      bn: 'গাবতলী',      lat: 23.7827, lng: 90.3451, status: 'planned' },
    { id: 'u2-mp',  name: 'Mohammadpur',  bn: 'মোহাম্মদপুর', lat: 23.7600, lng: 90.3580, status: 'planned' },
    { id: 'u2-jg',  name: 'Zigatola',     bn: 'জিগাতলা',      lat: 23.7430, lng: 90.3730, status: 'planned' },
    { id: 'u2-sl',  name: 'Science Lab',  bn: 'সায়েন্স ল্যাব',lat: 23.7400, lng: 90.3820, status: 'planned' },
    { id: 'u2-nm',  name: 'New Market',   bn: 'নিউ মার্কেট',  lat: 23.734215, lng: 90.384422, status: 'planned' },
    { id: 'u2-az',  name: 'Azimpur',      bn: 'আজিমপুর',      lat: 23.7230, lng: 90.3890, status: 'planned' },
    { id: 'u2-gl',  name: 'Gulistan',     bn: 'গুলিস্তান',    lat: 23.7240, lng: 90.4090, status: 'planned' },
    { id: 'u2-mj',  name: 'Motijheel',    bn: 'মতিঝিল',       lat: 23.7281, lng: 90.4191, status: 'planned' },
    { id: 'u2-kp',  name: 'Kamalapur',    bn: 'কমলাপুর',      lat: 23.7330, lng: 90.4255, status: 'planned' },
    { id: 'u2-md',  name: 'Manda',        bn: 'মান্ডা',       lat: 23.7180, lng: 90.4350, status: 'planned' },
    { id: 'u2-dg',  name: 'Dakshingaon',  bn: 'দক্ষিণগাঁও',   lat: 23.7100, lng: 90.4490, status: 'planned' },
    { id: 'u2-sb',  name: 'Signboard',    bn: 'সাইনবোর্ড',    lat: 23.6930, lng: 90.4810, status: 'planned' },
    { id: 'u2-bg',  name: 'Bhuigor',      bn: 'ভূইগড়',       lat: 23.6750, lng: 90.4910, status: 'planned' },
    { id: 'u2-nj',  name: 'Narayanganj',  bn: 'নারায়ণগঞ্জ',   lat: 23.6238, lng: 90.4993, status: 'planned' },
  ],
  branches: [[
    { id: 'u2-gl2', name: 'Gulistan',        bn: 'গুলিস্তান',       lat: 23.7240, lng: 90.4090, status: 'planned' },
    { id: 'u2-gs',  name: 'Golap Shah Mazar',bn: 'গোলাপ শাহ মাজার', lat: 23.7230, lng: 90.4050, status: 'planned' },
    { id: 'u2-ny',  name: 'Nayabazar',       bn: 'নয়াবাজার',        lat: 23.7190, lng: 90.4020, status: 'planned' },
    { id: 'u2-sg',  name: 'Sadarghat',       bn: 'সদরঘাট',          lat: 23.7133, lng: 90.4072, status: 'planned' },
  ]],
};

const MRT4: Line = {
  id: 'mrt4', nameBn: 'এমআরটি-৪', nameEn: 'MRT-4', color: '#003DA5', status: 'planned',
  stations: [
    { id: 'u4-kp', name: 'Kamalapur',      bn: 'কমলাপুর',       lat: 23.7330, lng: 90.4255, status: 'planned' },
    { id: 'u4-sd', name: 'Sayedabad',      bn: 'সায়েদাবাদ',      lat: 23.7210, lng: 90.4270, status: 'planned' },
    { id: 'u4-jb', name: 'Jatrabari',      bn: 'যাত্রাবাড়ী',     lat: 23.7090, lng: 90.4280, status: 'planned' },
    { id: 'u4-sa', name: 'Shonir Akhra',   bn: 'শনির আখড়া',      lat: 23.6980, lng: 90.4450, status: 'planned' },
    { id: 'u4-sb', name: 'Signboard',      bn: 'সাইনবোর্ড',       lat: 23.6930, lng: 90.4810, status: 'planned' },
    { id: 'u4-cr', name: 'Chittagong Road',bn: 'চট্টগ্রাম রোড',   lat: 23.697179, lng: 90.5073176, status: 'planned' },
    { id: 'u4-kc', name: 'Kanchpur',       bn: 'কাঁচপুর',        lat: 23.6600, lng: 90.4950, status: 'planned' },
    { id: 'u4-mp', name: 'Madanpur',       bn: 'মদনপুর',         lat: 23.6370, lng: 90.5100, status: 'planned' },
  ],
};

const ALL_LINES: Line[] = [MRT6, MRT1, MRT5N, MRT5S, MRT2, MRT4];

// Official interchange stations (where 2+ lines meet)
const INTERCHANGE_NAMES = new Set([
  'Mirpur 10', 'Karwan Bazar', 'Notun Bazar', 'Aftabnagar',
  'Gabtoli', 'Kamalapur', 'Signboard',
]);

function stationLabel(s: Station, lang: Lang): string {
  return lang === 'bn' ? s.bn : s.name;
}

function makeIcon(color: string, isInterchange: boolean, r: number): L.DivIcon {
  const size = isInterchange ? r + 4 : r;
  const border = isInterchange ? `3px solid ${color}` : `2px solid white`;
  const bg = isInterchange ? 'white' : color;
  const dot = isInterchange
    ? `<div style="width:6px;height:6px;border-radius:50%;background:${color};position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div>`
    : '';
  return L.divIcon({
    className: '',
    iconAnchor: [size, size],
    html: `<div style="width:${size*2}px;height:${size*2}px;border-radius:50%;background:${bg};border:${border};box-shadow:0 1px 4px rgba(0,0,0,.35);position:relative">${dot}</div>`,
  });
}

function makePinIcon(color: string, label: string): L.DivIcon {
  return L.divIcon({
    className: '',
    iconAnchor: [14, 36],
    html: `<div style="position:relative">
      <div style="background:${color};color:white;font-family:sans-serif;font-size:10px;font-weight:700;padding:3px 7px;border-radius:6px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.4);">${label}</div>
      <div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:10px solid ${color};margin:0 auto"></div>
    </div>`,
  });
}

export function MetroMapView({ tk, lang, theme, isMobile, fareFromName, fareToName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const lineLayersRef = useRef<Map<string, L.LayerGroup>>(new Map());
  const fareLayerRef = useRef<L.LayerGroup | null>(null);
  const [visible, setVisible] = useState<Set<string>>(() => new Set(ALL_LINES.map(l => l.id)));

  const toggleLine = useCallback((id: string) => {
    setVisible(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }, []);

  // Init map + draw all lines + all station markers
  useEffect(() => {
    if (!containerRef.current) return;
    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const map = L.map(containerRef.current, { zoomControl: true, attributionControl: false })
        .setView([23.78, 90.40], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      // Two-finger pan on touch devices
      if ('ontouchstart' in window) {
        map.dragging.disable();
        const el = containerRef.current!;
        const onTouchStart = (e: TouchEvent) => { if (e.touches.length >= 2) map.dragging.enable(); };
        const onTouchEnd = () => map.dragging.disable();
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
      }

      // Inject per-line colored tooltip CSS once
      const style = document.createElement('style');
      const baseRule = `border:none!important;border-radius:4px!important;color:#fff!important;font-size:9px!important;font-weight:700!important;padding:2px 6px!important;box-shadow:0 1px 4px rgba(0,0,0,.4)!important;white-space:nowrap!important;opacity:1!important`;
      const lineRules = ALL_LINES.map(l =>
        `.kj-tip-${l.id}{background:${l.color}!important;${baseRule}}.kj-tip-${l.id}::before{display:none!important}`
      ).join('');
      style.textContent = lineRules;
      document.head.appendChild(style);

      fareLayerRef.current = L.layerGroup().addTo(map);

      ALL_LINES.forEach(line => {
        const group = L.layerGroup().addTo(map);
        lineLayersRef.current.set(line.id, group);

        const dash = line.status === 'active' ? undefined : line.status === 'under-construction' ? '10 5' : '5 5';
        const weight = line.status === 'active' ? 5 : 3;
        const opacity = line.status === 'active' ? 0.9 : line.status === 'under-construction' ? 0.75 : 0.55;

        // Main route
        const coords: [number, number][] = line.stations.map(s => [s.lat, s.lng]);
        L.polyline(coords, { color: line.color, weight, opacity, dashArray: dash }).addTo(group);

        // Branches
        line.branches?.forEach(br => {
          const bc: [number, number][] = br.map(s => [s.lat, s.lng]);
          L.polyline(bc, { color: line.color, weight, opacity, dashArray: dash }).addTo(group);
        });

        // All stations on this line (deduplicated by proximity)
        const allSt = [...line.stations, ...(line.branches?.flat() ?? [])];
        const seen = new Set<string>();
        allSt.forEach(s => {
          const key = `${s.lat.toFixed(3)},${s.lng.toFixed(3)}`;
          if (seen.has(key)) return;
          seen.add(key);

          const isInterchange = INTERCHANGE_NAMES.has(s.name);
          const r = line.status === 'active' ? 6 : 4;
          const icon = makeIcon(line.color, isInterchange, r);

          const label = stationLabel(s, lang);
          const statusText = s.status === 'active' ? T(lang, 'চলমান', 'Active')
            : s.status === 'under-construction' ? T(lang, 'নির্মাণাধীন', 'Under Construction')
            : T(lang, 'পরিকল্পিত', 'Planned');

          L.marker([s.lat, s.lng], { icon })
            .bindTooltip(label, {
              permanent: true,
              direction: 'right',
              offset: [r + 2, 0],
              className: `kj-tip-${line.id}`,
            })
            .bindPopup(
              `<div style="font-family:sans-serif;min-width:150px">
                <div style="font-weight:800;font-size:13px;margin-bottom:4px">${label}</div>
                <div style="font-size:11px;color:#555">${line.nameEn} · <span style="color:${s.status === 'active' ? '#00843D' : s.status === 'under-construction' ? '#FF8200' : '#999'}">${statusText}</span></div>
                ${isInterchange ? '<div style="font-size:11px;color:#6b21a8;margin-top:4px;font-weight:600">🔀 Interchange</div>' : ''}
              </div>`,
              { maxWidth: 220 }
            )
            .addTo(group);
        });
      });

      // Fit to MRT-6 bounds initially
      const mrt6Coords: [number, number][] = MRT6.stations.map(s => [s.lat, s.lng]);
      map.fitBounds(L.latLngBounds(mrt6Coords), { padding: [60, 60] });

      setTimeout(() => map.invalidateSize(), 300);
      mapRef.current = map;

      cleanup = () => {
        map.remove();
        mapRef.current = null;
        lineLayersRef.current.clear();
        fareLayerRef.current = null;
        style.remove();
      };
    }, 150);
    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show/hide lines based on filter
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    lineLayersRef.current.forEach((group, id) => {
      if (visible.has(id)) {
        if (!map.hasLayer(group)) map.addLayer(group);
      } else {
        if (map.hasLayer(group)) map.removeLayer(group);
      }
    });
  }, [visible]);

  // From/To markers for fare calculator
  useEffect(() => {
    const layer = fareLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    if (!fareFromName && !fareToName) return;

    const allStations = ALL_LINES.flatMap(l => [
      ...l.stations,
      ...(l.branches?.flat() ?? []),
    ]);

    const find = (name: string) =>
      allStations.find(s => s.name.toLowerCase() === name.toLowerCase() || s.bn === name);

    const fromSt = fareFromName ? find(fareFromName) : null;
    const toSt = fareToName ? find(fareToName) : null;

    const points: [number, number][] = [];

    if (fromSt) {
      L.marker([fromSt.lat, fromSt.lng], { icon: makePinIcon('#006a4e', stationLabel(fromSt, lang)), zIndexOffset: 500 })
        .bindTooltip(`<b>🚇 ${T(lang, 'থেকে', 'From')}: ${stationLabel(fromSt, lang)}</b>`, { direction: 'top', offset: [0, -40] })
        .addTo(layer);
      points.push([fromSt.lat, fromSt.lng]);
    }

    if (toSt) {
      L.marker([toSt.lat, toSt.lng], { icon: makePinIcon('#b91c1c', stationLabel(toSt, lang)), zIndexOffset: 500 })
        .bindTooltip(`<b>🚇 ${T(lang, 'পর্যন্ত', 'To')}: ${stationLabel(toSt, lang)}</b>`, { direction: 'top', offset: [0, -40] })
        .addTo(layer);
      points.push([toSt.lat, toSt.lng]);
    }

    if (fromSt && toSt) {
      L.polyline([[fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]], {
        color: '#00843D', weight: 3, dashArray: '8 6', opacity: 0.7,
      }).addTo(layer);
      if (mapRef.current) {
        mapRef.current.fitBounds(L.latLngBounds(points), { padding: [80, 80], maxZoom: 15 });
      }
    } else if (points.length === 1 && mapRef.current) {
      mapRef.current.flyTo(points[0], 14, { duration: 0.8 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fareFromName, fareToName, lang]);

  const isDark = theme === 'dark';

  return (
    <div>
      {/* Line filter chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {ALL_LINES.map(line => {
          const on = visible.has(line.id);
          return (
            <button key={line.id} onClick={() => toggleLine(line.id)} style={{
              background: on ? line.color : 'transparent',
              border: `1.5px solid ${line.color}`,
              borderRadius: 999, padding: '3px 10px',
              cursor: 'pointer', fontFamily: SANS, fontSize: 9, fontWeight: 700,
              color: on ? '#fff' : line.color, transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {line.nameEn}
              {line.status !== 'active' && (
                <span style={{ opacity: 0.8 }}>
                  {line.status === 'under-construction' ? '🚧' : '📋'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Leaflet map */}
      <div ref={containerRef} style={{
        height: isMobile ? 380 : 460,
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${tk.line}`,
        background: isDark ? '#0d1117' : '#e8f0eb',
      }}/>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: T(lang, 'চলমান', 'Active'), dash: 'none' },
          { label: T(lang, 'নির্মাণাধীন', 'Under construction'), dash: '10 5' },
          { label: T(lang, 'পরিকল্পিত', 'Planned'), dash: '5 5' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width={24} height={8} style={{ flexShrink: 0 }}>
              <line x1={2} y1={4} x2={22} y2={4}
                stroke={isDark ? '#aaa' : '#555'} strokeWidth={2}
                strokeDasharray={item.dash} strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, color: tk.textFaint }}>{item.label}</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: 'white', border: '2px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 4, height: 4, borderRadius: 999, background: '#555' }}/>
          </div>
          <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, color: tk.textFaint }}>{T(lang, 'ইন্টারচেঞ্জ', 'Interchange')}</span>
        </div>
        {(fareFromName || fareToName) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            {fareFromName && <span style={{ fontFamily: BEN, fontSize: 10, fontWeight: 700, color: '#006a4e' }}>🟢 {fareFromName}</span>}
            {fareToName && <span style={{ fontFamily: BEN, fontSize: 10, fontWeight: 700, color: '#b91c1c' }}>🔴 {fareToName}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
