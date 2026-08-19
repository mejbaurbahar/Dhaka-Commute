import type { Lang } from '../src/redesign/tokens';
// Hybrid rule+AI itinerary engine for "Discover Bangladesh".
// Rule templates + real transport data (fares, durations, boarding points)
// produce offline-ready plans; AI enrichment adds per-day tips when online.

import { INTERCITY_BUS_ROUTES, TRAIN_ROUTES } from '../data/intercityData';
import { DOMESTIC_ROUTES } from '../data/bangladeshFlightData';
import { LAUNCH_ROUTES } from '../data/bangladeshLaunchData';
import { ALL_PLACES, Place } from '../data/bangladeshPlaces';
import { askGitHubModels } from './githubModelsService';

// ── Types ────────────────────────────────────────────────────────────────────

export type ItineraryMode = 'bus' | 'train' | 'flight' | 'launch';

export interface LegOption {
  mode: ItineraryMode;
  labelEn: string;
  labelBn: string;
  durationMin: number;
  fareMin: number;
  fareMax: number;
  fareLabelEn: string;
  fareLabelBn: string;
  boardingEn?: string;
  boardingBn?: string;
  routeName?: string;   // train name / flight no
  depTime?: string;     // train depart / flight depart
}

export interface ItineraryLeg {
  fromHubId: string;
  toHubId: string;
  fromLabelEn: string;
  fromLabelBn: string;
  toLabelEn: string;
  toLabelBn: string;
  options: LegOption[];
}

export interface ItineraryDay {
  day: number;
  hubId: string;
  titleEn: string;
  titleBn: string;
  placeIds: string[];
  legs: ItineraryLeg[];           // legs arriving on this day
  notesEn?: string;
  notesBn?: string;
  aiTipsEn?: string;
  aiTipsBn?: string;
}

export interface Itinerary {
  id: string;
  dayCount: number;
  variantId: string;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  days: ItineraryDay[];
  budgetMin: number;   // ৳ cheapest-mode estimate
  budgetMax: number;   // ৳ max-mode (flight) estimate
}

// ── Curated facts (durations, boarding points) ───────────────────────────────

/** Bus travel time Dhaka → district, [min, max] minutes. Real-world estimates. */
const HUB_DURATION_MIN: Record<string, [number, number]> = {
  Dhaka: [30, 60], "Cox's Bazar": [600, 720], Sylhet: [360, 420], Chattogram: [300, 360],
  Khulna: [360, 420], Rajshahi: [300, 360], Patuakhali: [480, 600], Bandarban: [600, 720],
  Rangamati: [420, 540], Cumilla: [120, 150], Moulvibazar: [240, 300], Bagerhat: [360, 420],
  Naogaon: [360, 420], Bogura: [240, 300], Dinajpur: [480, 600], Noakhali: [360, 420],
  Satkhira: [420, 480], Jashore: [300, 360], Barishal: [300, 360], Mymensingh: [120, 150],
};

/** Typical Dhaka boarding terminals per district (from route strings in intercityData). */
const HUB_BOARDING: Record<string, string> = {
  Sylhet: 'Mohakhali / Sayedabad', "Cox's Bazar": 'Sayedabad', Chattogram: 'Sayedabad / Mohakhali',
  Khulna: 'Sayedabad / Gabtoli', Rajshahi: 'Mohakhali / Gabtoli', Patuakhali: 'Sayedabad',
  Bandarban: 'Sayedabad', Rangamati: 'Sayedabad', Cumilla: 'Sayedabad', Moulvibazar: 'Sayedabad',
  Bagerhat: 'Gabtoli', Naogaon: 'Gabtoli', Bogura: 'Gabtoli / Mohakhali', Dinajpur: 'Gabtoli / Kalyanpur',
  Noakhali: 'Sayedabad', Jashore: 'Gabtoli / Sayedabad', Barishal: 'Sayedabad / Gabtoli',
  Satkhira: 'Gabtoli', Mymensingh: 'Mohakhali',
};

/** district → airport IATA for direct DAC flights. */
const DISTRICT_IATA: Record<string, string> = {
  Sylhet: 'ZYL', "Cox's Bazar": 'CXB', Chattogram: 'CGP', Jashore: 'JSR',
  Saidpur: 'SPD', Rajshahi: 'RJH', Barishal: 'BZL',
};

/** district → launch terminal id for Sadarghat departures. */
const DISTRICT_LAUNCH_TERMINAL: Record<string, string> = {
  Barishal: 'barisal', Patuakhali: 'patuakhali', Khulna: 'khulna', Bhola: 'bhola',
  Chandpur: 'chandpur', Jhalokathi: 'jhalkathi', Pirojpur: 'pirojpur', Barguna: 'borguna',
  Noakhali: 'hatiya', Shariatpur: 'shariatpur',
};

const DISTRICT_BN: Record<string, string> = {
  Dhaka: 'ঢাকা', Sylhet: 'সিলেট', "Cox's Bazar": 'কক্সবাজার', Chattogram: 'চট্টগ্রাম',
  Khulna: 'খুলনা', Rajshahi: 'রাজশাহী', Patuakhali: 'পটুয়াখালী', Bandarban: 'বান্দরবান',
  Rangamati: 'রাঙ্গামাটি', Cumilla: 'কুমিল্লা', Moulvibazar: 'মৌলভীবাজার', Bagerhat: 'বাগেরহাট',
  Naogaon: 'নওগাঁ', Bogura: 'বগুড়া', Dinajpur: 'দিনাজপুর', Noakhali: 'নোয়াখালী',
  Satkhira: 'সাতক্ষীরা', Jashore: 'যশোর', Barishal: 'বরিশাল', Mymensingh: 'ময়মনসিংহ',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const placeById = (id: string): Place | undefined => ALL_PLACES.find(p => p.id === id);

function parseDurToMin(dur: string): number {
  const m = dur.match(/(\d+)h\s*(\d+)m/);
  if (m) return +m[1] * 60 + +m[2];
  const h = dur.match(/(\d+)h/);
  return h ? +h[1] * 60 : 0;
}

function parseTkRange(s: string): [number, number] | null {
  // "৳1,000-৳1,100" | "৳134" | "৳66-৳97"
  const m = s.match(/৳\s*([\d,]+)(?:\s*-\s*৳?\s*([\d,]+))?/);
  if (!m) return null;
  const a = +m[1].replace(/,/g, '');
  const b = m[2] ? +m[2].replace(/,/g, '') : a;
  return [Math.min(a, b), Math.max(a, b)];
}

function trainDurMin(dep: string, arr: string): number {
  const [dh, dm] = dep.split(':').map(Number);
  const [ah, am] = arr.split(':').map(Number);
  let mins = (ah * 60 + am) - (dh * 60 + dm);
  if (mins < 0) mins += 24 * 60; // overnight wrap
  return mins;
}

const F = (n: number) => `৳${n.toLocaleString('en-US')}`;

// ── Leg builder ──────────────────────────────────────────────────────────────

/** Transport options between two hubs (Dhaka → district for now; non-Dhaka legs get a local fallback). */
export function buildLegOptions(fromHubId: string, toHubId: string): ItineraryLeg {
  const from = placeById(fromHubId);
  const to = placeById(toHubId);
  const fromDistrict = (from?.district ?? '').split('/')[0];
  const district = (to?.district ?? '').split('/')[0];
  const options: LegOption[] = [];

  if (fromDistrict === 'Dhaka') {
    // ── Bus ──
    const bus = INTERCITY_BUS_ROUTES.find(r => r.district === district);
    if (bus && bus.costNonAC !== '-' && bus.costAC !== '-') {
      const [min, max] = parseTkRange(bus.costNonAC) ?? [0, 0];
      const [acMin, acMax] = parseTkRange(bus.costAC) ?? [0, 0];
      const dur = HUB_DURATION_MIN[district] ?? [360, 480];
      const boarding = HUB_BOARDING[district];
      options.push({
        mode: 'bus',
        labelEn: `AC bus (${bus.busOperators.slice(0, 2).join(', ')}${bus.busOperators.length > 2 ? '…' : ''})`,
        labelBn: `এসি বাস (${bus.busOperators.slice(0, 2).join(', ')}${bus.busOperators.length > 2 ? '…' : ''})`,
        durationMin: dur[1],
        fareMin: min || acMin, fareMax: Math.max(max, acMax),
        fareLabelEn: acMax ? `${F(min)}–${F(acMax)}` : F(min),
        fareLabelBn: acMax ? `${F(min)}–${F(acMax)}` : F(min),
        boardingEn: boarding, boardingBn: boarding,
      });
    }
    // ── Train ──
    const trains = TRAIN_ROUTES.filter(r => r.route.includes('⇄') && r.route.includes(district));
    for (const t of trains.slice(0, 2)) {
      const fare = t.fare?.shuvanChair ?? t.fare?.snigdha ?? 0;
      options.push({
        mode: 'train',
        labelEn: `${t.trainName} (${t.trainNo})`,
        labelBn: `${t.trainName} (${t.trainNo})`,
        durationMin: t.destinationArrive ? trainDurMin(t.dhakaDepart, t.destinationArrive) : 360,
        fareMin: fare, fareMax: fare,
        fareLabelEn: fare ? F(fare) : '—',
        fareLabelBn: fare ? F(fare) : '—',
        routeName: t.trainNo,
        depTime: t.dhakaDepart,
      });
    }
    // ── Flight ──
    const iata = DISTRICT_IATA[district];
    if (iata) {
      const flights = DOMESTIC_ROUTES.filter(r => r.from === 'DAC' && r.to === iata);
      const min = flights.length ? Math.min(...flights.map(f => f.fareEco)) : 0;
      const dur = flights.length ? Math.min(...flights.map(f => parseDurToMin(f.dur))) : 60;
      const best = flights.reduce((a, b) => (a.fareEco <= b.fareEco ? a : b), flights[0]);
      if (min) {
        options.push({
          mode: 'flight',
          labelEn: `Flight ${best?.flightNo ?? ''}`,
          labelBn: `ফ্লাইট ${best?.flightNo ?? ''}`,
          durationMin: dur,
          fareMin: min, fareMax: min,
          fareLabelEn: F(min), fareLabelBn: F(min),
          boardingEn: 'Hazrat Shahjalal Intl (DAC)',
          boardingBn: 'হযরত শাহজালাল আন্তর্জাতিক (DAC)',
          routeName: best?.flightNo,
          depTime: best?.dep,
        });
      }
    }
    // ── Launch ──
    const terminalId = DISTRICT_LAUNCH_TERMINAL[district];
    if (terminalId) {
      const launches = LAUNCH_ROUTES.filter(r => r.from === 'sadarghat' && r.to === terminalId);
      const l = launches[0];
      if (l) {
        options.push({
          mode: 'launch',
          labelEn: `${l.name.en} (${l.type})`,
          labelBn: `${l.name.bn} (${l.type === 'express' ? 'এক্সপ্রেস' : l.type})`,
          durationMin: parseDurToMin(l.dur),
          fareMin: l.deck, fareMax: l.cabin,
          fareLabelEn: `${F(l.deck)}–${F(l.cabin)}`,
          fareLabelBn: `${F(l.deck)}–${F(l.cabin)}`,
          boardingEn: 'Sadarghat (Dhaka)',
          boardingBn: 'সদরঘাট (ঢাকা)',
          routeName: l.name.en,
          depTime: l.dep,
        });
      }
    }
  } else {
    // Intra-division hop — local transport fallback (shared CNG / local bus).
    const dur = HUB_DURATION_MIN[district] ?? [120, 180];
    options.push({
      mode: 'bus',
      labelEn: 'Local bus / shared CNG',
      labelBn: 'লোকাল বাস / শেয়ার্ড সিএনজি',
      durationMin: dur[1],
      fareMin: 50, fareMax: 200,
      fareLabelEn: '৳50–৳200',
      fareLabelBn: '৳৫০–৳২০০',
    });
  }

  options.sort((a, b) => a.fareMin - b.fareMin);
  // Dhaka tourist spot stands in for the city origin — label it as the city
  const fromIsDhaka = from?.district === 'Dhaka';
  const fromLabel = fromIsDhaka ? 'Dhaka' : (from ? (from.en.length < 40 ? from.en : from.en.split(' (')[0]) : fromHubId);
  const fromLabelBn = fromIsDhaka ? 'ঢাকা' : (from ? (from.bn || fromLabel) : fromHubId);
  const toLabel = to ? (to.en.length < 40 ? to.en : to.en.split(' (')[0]) : toHubId;
  const toLabelBn = to ? (to.bn || toLabel) : toHubId;
  return { fromHubId, toHubId, fromLabelEn: fromLabel, fromLabelBn, toLabelEn: toLabel, toLabelBn, options };
}

// ── Templates ────────────────────────────────────────────────────────────────

interface PlanTemplate {
  id: string;
  days: number;
  titleEn: string; titleBn: string;
  summaryEn: string; summaryBn: string;
  plan: { hubId: string; placeIds: string[]; notesEn?: string; notesBn?: string }[];
}

const TEMPLATES: PlanTemplate[] = [
  {
    id: 'dhaka-1', days: 1,
    titleEn: 'Dhaka City Day', titleBn: 'ঢাকা শহরের দিন',
    summaryEn: 'Old Dhaka heritage + museums, one day', summaryBn: 'পুরান ঢাকার ঐতিহ্য + জাদুঘর, এক দিনে',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil', 'lalbagh_fort', 'shaheed_minar', 'national_museum_dhaka', 'hatirjheel'],
        notesEn: 'Get around by metro (Uttara–Motijheel) and rickshaw; ~৳50–200 per hop.', notesBn: 'মেট্রো (উত্তরা–মতিঝিল) ও রিকশায় চলাচল; প্রতি যাত্রায় ~৳৫০–২০০।' },
    ],
  },
  {
    id: 'dhaka-cumilla-2', days: 2,
    titleEn: 'Dhaka + Cumilla Heritage', titleBn: 'ঢাকা + কুমিল্লা ঐতিহ্য',
    summaryEn: 'Capital city + 8th-century Buddhist ruins at Mainamati', summaryBn: 'রাজধানী + ময়নামতির ৮ম শতকের বৌদ্ধ ধ্বংসাবশেষ',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil', 'lalbagh_fort', 'hatirjheel'] },
      { hubId: 'mainamati', placeIds: ['mainamati'], notesEn: 'Day trip from Cumilla town (10 km).', notesBn: 'কুমিল্লা শহর থেকে দিনের ভ্রমণ (১০ কিমি)।' },
    ],
  },
  {
    id: 'tea-hills-3', days: 3,
    titleEn: 'Tea & Hills — Sylhet + Srimangal', titleBn: 'চা ও পাহাড় — সিলেট + শ্রীমঙ্গল',
    summaryEn: 'Sylhet shrine, Jaflong stone valley, tea gardens of Srimangal', summaryBn: 'সিলেট দরগা, জাফলং পাথরের উপত্যকা, শ্রীমঙ্গলের চা বাগান',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil', 'national_museum_dhaka'] },
      { hubId: 'sylhet_shrine', placeIds: ['sylhet_shrine', 'jaflong'] },
      { hubId: 'srimangal', placeIds: ['srimangal', 'lawachara'], notesEn: 'Return Dhaka by train or bus from Srimangal (or via Sylhet).', notesBn: 'শ্রীমঙ্গল থেকে ট্রেন বা বাসে ঢাকায় ফেরা (বা সিলেট হয়ে)।' },
    ],
  },
  {
    id: 'sea-3', days: 3,
    titleEn: 'Sea & Sunset — Cox\'s Bazar', titleBn: 'সমুদ্র ও সূর্যাস্ত — কক্সবাজার',
    summaryEn: 'World\'s longest beach + Inani, return by flight or bus', summaryBn: 'বিশ্বের দীর্ঘতম সৈকত + ইনানী, ফ্লাইট বা বাসে ফেরা',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['hatirjheel', 'shaheed_minar'] },
      { hubId: 'coxs_bazar', placeIds: ['coxs_bazar', 'inani_beach'] },
      { hubId: 'coxs_bazar', placeIds: ['inani_beach'], notesEn: 'Sunset at Laboni point; return Dhaka by flight or AC bus.', notesBn: 'লাবণী পয়েন্টে সূর্যাস্ত; ফ্লাইট বা এসি বাসে ঢাকায় ফেরা।' },
    ],
  },
  {
    id: 'sylhet-deep-4', days: 4,
    titleEn: 'Sylhet Deep — Jaflong, Ratargul, Srimangal', titleBn: 'সিলেট ডিপ — জাফলং, রাতারগুল, শ্রীমঙ্গল',
    summaryEn: 'Stone valley, flooded swamp forest, tea capital', summaryBn: 'পাথরের উপত্যকা, ডুবো জলাভূমি বন, চা রাজধানী',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil'] },
      { hubId: 'sylhet_shrine', placeIds: ['sylhet_shrine', 'jaflong'] },
      { hubId: 'sylhet_shrine', placeIds: ['ratargul'], notesEn: 'Ratargul best in monsoon (Jul–Sep).', notesBn: 'বর্ষায় রাতারগুল সবচেয়ে ভালো (জুলাই–সেপ্টেম্বর)।' },
      { hubId: 'srimangal', placeIds: ['srimangal', 'lawachara'], notesEn: 'Return Dhaka from Srimangal.', notesBn: 'শ্রীমঙ্গল থেকে ঢাকায় ফেরা।' },
    ],
  },
  {
    id: 'sea-4', days: 4,
    titleEn: 'Sea Escape — Cox\'s Bazar + Inani', titleBn: 'সমুদ্র এস্কেপ — কক্সবাজার + ইনানী',
    summaryEn: 'Longest beach, Inani, Himchari, return by flight', summaryBn: 'দীর্ঘতম সৈকত, ইনানী, হিমছড়ি, ফ্লাইটে ফেরা',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil'] },
      { hubId: 'coxs_bazar', placeIds: ['coxs_bazar'] },
      { hubId: 'coxs_bazar', placeIds: ['inani_beach'], notesEn: 'Himchari waterfall day trip.', notesBn: 'হিমছড়ি ঝরনা ভ্রমণ।' },
      { hubId: 'coxs_bazar', placeIds: [], notesEn: 'Return Dhaka by flight (CXB–DAC).', notesBn: 'ফ্লাইটে (কক্সবাজার–ঢাকা) ফেরা।' },
    ],
  },
  {
    id: 'sylhet-5', days: 5,
    titleEn: 'Sylhet Grand Tour', titleBn: 'সিলেট গ্র্যান্ড ট্যুর',
    summaryEn: 'Shrine, Jaflong, Ratargul, Lawachara tea trails', summaryBn: 'দরগা, জাফলং, রাতারগুল, লাউয়াছড়া চা পথ',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['lalbagh_fort', 'hatirjheel'] },
      { hubId: 'sylhet_shrine', placeIds: ['sylhet_shrine', 'jaflong'] },
      { hubId: 'sylhet_shrine', placeIds: ['ratargul'] },
      { hubId: 'srimangal', placeIds: ['srimangal', 'lawachara'] },
      { hubId: 'srimangal', placeIds: [], notesEn: 'Return Dhaka by train from Srimangal.', notesBn: 'শ্রীমঙ্গল থেকে ট্রেনে ঢাকায় ফেরা।' },
    ],
  },
  {
    id: 'sea-5', days: 5,
    titleEn: 'Sea & Islands — Cox\'s Bazar + Teknaf', titleBn: 'সমুদ্র ও দ্বীপ — কক্সবাজার + টেকনাফ',
    summaryEn: 'Beach, Inani, Teknaf wildlife, return by flight', summaryBn: 'সৈকত, ইনানী, টেকনাফ বন্যপ্রাণী, ফ্লাইটে ফেরা',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil'] },
      { hubId: 'coxs_bazar', placeIds: ['coxs_bazar'] },
      { hubId: 'coxs_bazar', placeIds: ['inani_beach'] },
      { hubId: 'teknaf', placeIds: ['teknaf'], notesEn: 'Naf river sunset; Saint Martin ferry jetty.', notesBn: 'নাফ নদীর সূর্যাস্ত; সেন্ট মার্টিন ফেরি ঘাট।' },
      { hubId: 'coxs_bazar', placeIds: [], notesEn: 'Return Dhaka by flight.', notesBn: 'ফ্লাইটে ঢাকায় ফেরা।' },
    ],
  },
  {
    id: 'heritage-5', days: 5,
    titleEn: 'Heritage Trail — Sundarbans + Bagerhat', titleBn: 'ঐতিহ্য ট্রেইল — সুন্দরবন + বাগেরহাট',
    summaryEn: 'Mangrove cruise, Sixty Dome Mosque, Khulna region', summaryBn: 'ম্যানগ্রোভ ক্রুজ, ষাট গম্বুজ মসজিদ, খুলনা অঞ্চল',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil', 'national_museum_dhaka'] },
      { hubId: 'sundarbans', placeIds: ['sundarbans'], notesEn: 'Bus to Khulna, then boat into the Sundarbans.', notesBn: 'খুলনা পর্যন্ত বাস, তারপর নৌকায় সুন্দরবন।' },
      { hubId: 'sundarbans', placeIds: ['sundarbans'], notesEn: 'Karamjal deer sanctuary, Hiron Point.', notesBn: 'করমজল হরিণ অভয়ারণ্য, হিরণ পয়েন্ট।' },
      { hubId: 'bagerhat_mosque', placeIds: ['bagerhat_mosque'], notesEn: '60-dome mosque, Ghora Dighi.', notesBn: 'ষাট গম্বুজ মসজিদ, ঘোড়া দিঘি।' },
      { hubId: 'bagerhat_mosque', placeIds: [], notesEn: 'Return Dhaka via Khulna bus.', notesBn: 'খুলনা হয়ে বাসে ঢাকায় ফেরা।' },
    ],
  },
  {
    id: 'grand-7', days: 7,
    titleEn: 'Grand Tour — Sylhet + Cox\'s Bazar', titleBn: 'গ্র্যান্ড ট্যুর — সিলেট + কক্সবাজার',
    summaryEn: 'Tea country then sea country, two flights', summaryBn: 'চা দেশ তারপর সমুদ্র দেশ, দুটি ফ্লাইট',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil', 'lalbagh_fort'] },
      { hubId: 'sylhet_shrine', placeIds: ['sylhet_shrine', 'jaflong'] },
      { hubId: 'sylhet_shrine', placeIds: ['ratargul'] },
      { hubId: 'srimangal', placeIds: ['srimangal', 'lawachara'] },
      { hubId: 'srimangal', placeIds: [], notesEn: 'Return Dhaka (train/bus), evening flight or overnight bus to Cox\'s Bazar.', notesBn: 'ঢাকায় ফেরা (ট্রেন/বাস), সন্ধ্যার ফ্লাইট বা রাতের বাসে কক্সবাজার।' },
      { hubId: 'coxs_bazar', placeIds: ['coxs_bazar', 'inani_beach'] },
      { hubId: 'coxs_bazar', placeIds: ['teknaf'], notesEn: 'Return Dhaka by flight.', notesBn: 'ফ্লাইটে ঢাকায় ফেরা।' },
    ],
  },
  {
    id: 'south-7', days: 7,
    titleEn: 'South Loop — Barishal, Kuakata, Sundarbans', titleBn: 'দক্ষিণ লুপ — বরিশাল, কুয়াকাটা, সুন্দরবন',
    summaryEn: 'Launch to Barishal, Kuakata beach, mangrove cruise', summaryBn: 'বরিশালে লঞ্চ, কুয়াকাটা সৈকত, ম্যানগ্রোভ ক্রুজ',
    plan: [
      { hubId: 'ahsan_manzil', placeIds: ['ahsan_manzil', 'hatirjheel'] },
      { hubId: 'kuakata', placeIds: ['kuakata'], notesEn: 'Overnight launch Dhaka → Barishal → Kuakata bus.', notesBn: 'রাতের লঞ্চ ঢাকা → বরিশাল → কুয়াকাটা বাস।' },
      { hubId: 'kuakata', placeIds: ['kuakata'], notesEn: 'Sunrise & sunset on the Bay.', notesBn: 'বঙ্গোপসাগরে সূর্যোদয় ও সূর্যাস্ত।' },
      { hubId: 'sundarbans', placeIds: ['sundarbans'], notesEn: 'Bus via Khulna.', notesBn: 'খুলনা হয়ে বাস।' },
      { hubId: 'sundarbans', placeIds: ['sundarbans'], notesEn: 'Mangrove boat cruise.', notesBn: 'ম্যানগ্রোভ নৌকা ক্রুজ।' },
      { hubId: 'bagerhat_mosque', placeIds: ['bagerhat_mosque'] },
      { hubId: 'bagerhat_mosque', placeIds: [], notesEn: 'Return Dhaka via Khulna.', notesBn: 'খুলনা হয়ে ঢাকায় ফেরা।' },
    ],
  },
];

// ── Generator ────────────────────────────────────────────────────────────────

const VARIANTS_FOR_DAYS: Record<number, PlanTemplate[]> = {};
for (const t of TEMPLATES) (VARIANTS_FOR_DAYS[t.days] ??= []).push(t);

/** Templates for a day count — expose variant titles so the UI can let users choose. */
export function itineraryVariants(dayCount: number): { id: string; titleEn: string; titleBn: string; summaryEn: string; summaryBn: string }[] {
  return (VARIANTS_FOR_DAYS[dayCount] ?? []).map(t => ({ id: t.id, titleEn: t.titleEn, titleBn: t.titleBn, summaryEn: t.summaryEn, summaryBn: t.summaryBn }));
}

export function generateItinerary(dayCount: number, variantId?: string): Itinerary | null {
  const variants = VARIANTS_FOR_DAYS[dayCount] ?? [];
  if (!variants.length) return null;
  const t = variants.find(v => v.id === variantId) ?? variants[0];

  const days: ItineraryDay[] = t.plan.map((p, i) => {
    const legs: ItineraryLeg[] = [];
    if (i > 0 && t.plan[i - 1].hubId !== p.hubId) {
      legs.push(buildLegOptions(t.plan[i - 1].hubId, p.hubId));
    }
    const hub = placeById(p.hubId);
    // Dhaka tourist spot stands in for the city origin — show the city name, not the spot
    const isDhaka = hub?.district === 'Dhaka';
    return {
      day: i + 1,
      hubId: p.hubId,
      titleEn: isDhaka ? 'Dhaka' : (hub ? hub.en.split(' (')[0] : p.hubId),
      titleBn: isDhaka ? 'ঢাকা' : (hub?.bn || p.hubId),
      placeIds: p.placeIds,
      legs,
      notesEn: p.notesEn,
      notesBn: p.notesBn,
    };
  });

  // Budget: cheapest-mode fares (budgetMin) → priciest (budgetMax) + lodging + food
  let budgetMin = 0, budgetMax = 0;
  for (const d of days) {
    for (const leg of d.legs) {
      if (!leg.options.length) continue;
      budgetMin += Math.min(...leg.options.map(o => o.fareMin));
      budgetMax += Math.max(...leg.options.map(o => o.fareMax));
    }
  }
  const nights = Math.max(0, days.length - 1);
  budgetMin += nights * 1500 + days.length * 800;
  budgetMax += nights * 4000 + days.length * 800;

  return {
    id: `${t.id}-${Date.now()}`,
    dayCount,
    variantId: t.id,
    titleEn: t.titleEn, titleBn: t.titleBn,
    summaryEn: t.summaryEn, summaryBn: t.summaryBn,
    days,
    budgetMin, budgetMax,
  };
}

/**
 * Custom plan: user picks places (any district) + day count. Day 1 is Dhaka
 * (origin); remaining places are grouped by district and chained with real
 * transport legs (Dhaka → district 1 → district 2 …). Returns null when no
 * places are picked.
 */
export function buildCustomItinerary(placeIds: string[], dayCount: number): Itinerary | null {
  const picks = placeIds.map(placeById).filter((p): p is Place => !!p);
  if (!picks.length) return null;
  const days = Math.max(1, Math.min(dayCount || 1, 10));

  const dhakaPicks = picks.filter(p => (p.district ?? '').split('/')[0] === 'Dhaka');
  const travelPicks = picks.filter(p => (p.district ?? '').split('/')[0] !== 'Dhaka');
  const travelDays = Math.max(1, days - 1);

  // Cluster travel picks by district, keep the user's pick order.
  const byDistrict = new Map<string, Place[]>();
  for (const p of travelPicks) {
    const d = p.district.split('/')[0];
    if (!byDistrict.has(d)) byDistrict.set(d, []);
    byDistrict.get(d)!.push(p);
  }
  const ordered = [...byDistrict.keys()];

  // Spread districts across travel days — one district per day, or sequential
  // chunks when there are more districts than days.
  const groups: Place[][] = Array.from({ length: travelDays }, () => []);
  if (ordered.length > travelDays) {
    const chunk = Math.ceil(ordered.length / travelDays);
    ordered.forEach((d, i) => groups[Math.min(travelDays - 1, Math.floor(i / chunk))].push(...byDistrict.get(d)!));
  } else {
    ordered.forEach((d, i) => groups[i].push(...byDistrict.get(d)!));
  }

  // Day 1 = Dhaka base; the user's Dhaka picks land here.
  const day1: ItineraryDay = {
    day: 1,
    hubId: 'ahsan_manzil',
    titleEn: 'Dhaka', titleBn: 'ঢাকা',
    placeIds: dhakaPicks.map(p => p.id),
    legs: [],
    notesEn: dhakaPicks.length ? undefined : 'Start your journey in Dhaka — you picked no Dhaka spots.',
    notesBn: dhakaPicks.length ? undefined : 'ঢাকায় যাত্রা শুরু করুন — আপনি কোনো ঢাকার স্থান বাছেননি।',
  };

  const daysArr: ItineraryDay[] = [day1];
  groups.forEach(group => {
    if (!group.length) return; // more days than districts — no empty days
    const prevHub = daysArr[daysArr.length - 1].hubId;
    const legs: ItineraryLeg[] = [];
    if (prevHub !== group[0].id) legs.push(buildLegOptions(prevHub, group[0].id));
    const hub = group[0];
    daysArr.push({
      day: daysArr.length + 1,
      hubId: hub.id,
      titleEn: hub.en.split(' (')[0], titleBn: hub.bn || hub.en,
      placeIds: group.map(p => p.id),
      legs,
    });
  });

  // Budget — same formula as the template plans (fares + lodging + food).
  let budgetMin = 0, budgetMax = 0;
  for (const d of daysArr) {
    for (const leg of d.legs) {
      if (!leg.options.length) continue;
      budgetMin += Math.min(...leg.options.map(o => o.fareMin));
      budgetMax += Math.max(...leg.options.map(o => o.fareMax));
    }
  }
  const nights = Math.max(0, daysArr.length - 1);
  budgetMin += nights * 1500 + daysArr.length * 800;
  budgetMax += nights * 4000 + daysArr.length * 800;

  const titleEn = picks.map(p => p.en.split(' (')[0]).slice(0, 4).join(' + ');
  const titleBn = picks.map(p => p.bn || p.en).slice(0, 4).join(' + ');
  return {
    id: `custom-${Date.now()}`,
    dayCount: daysArr.length,
    variantId: `custom-${placeIds.join('-')}-${days}`,
    titleEn: titleEn || 'Custom plan',
    titleBn: titleBn || 'কাস্টম প্ল্যান',
    summaryEn: `Your custom ${days}-day plan`,
    summaryBn: `আপনার কাস্টম ${days}-দিনের প্ল্যান`,
    days: daysArr,
    budgetMin, budgetMax,
  };
}

// ── AI enrichment ────────────────────────────────────────────────────────────

const TIPS_CACHE_PREFIX = 'kj_itinerary_tips:';

interface ItineraryTips {
  tipsEn: string[];
  tipsBn: string[];
}

function cacheKey(days: number, variantId: string, lang: string): string {
  return `${TIPS_CACHE_PREFIX}${days}:${variantId}:${lang}`;
}

function readTipsCache(days: number, variantId: string, lang: string): string | null {
  try {
    const raw = localStorage.getItem(cacheKey(days, variantId, lang));
    if (!raw) return null;
    const { value, ts } = JSON.parse(raw);
    if (Date.now() - ts > 7 * 24 * 3600 * 1000) return null; // 7-day TTL
    return value;
  } catch { return null; }
}

function writeTipsCache(days: number, variantId: string, lang: string, value: string): void {
  try { localStorage.setItem(cacheKey(days, variantId, lang), JSON.stringify({ value, ts: Date.now() })); } catch { /* quota */ }
}

/**
 * Ask the AI for per-day practical tips. Returns per-day tip text arrays, or
 * null when offline / API failure (caller shows an offline note).
 */
export async function enrichItinerary(it: Itinerary, lang: Lang): Promise<ItineraryTips | null> {
  const cached = readTipsCache(it.dayCount, it.variantId, lang);
  if (cached) { try { return JSON.parse(cached); } catch { /* fall through */ } }

  const dayBriefs = it.days.map(d => {
    const places = d.placeIds.map(id => placeById(id)?.en ?? id).join(', ') || 'free day / return travel';
    const leg = d.legs.map(l => `${l.fromLabelEn} → ${l.toLabelEn}`).join('; ') || 'no intercity travel';
    return `Day ${d.day}: ${d.titleEn}. Places: ${places}. Travel: ${leg}.`;
  }).join('\n');

  const prompt = lang === 'bn'
    ? `তুমি বাংলাদেশের ট্যুর প্ল্যানার। এই ভ্রমণসূচি দেখে প্রতিটি দিনের জন্য ২-৩টি বাস্তবিক টিপ দাও (খাবার, সময়, বুকিং, স্থানীয় ভাড়া)। ভাড়া বা সময় কখনো বদলাবে না। শুধু JSON দিন: {"tips": ["Day 1: ...", "Day 2: ..."]} — প্রতিটি স্ট্রিং "Day N:" দিয়ে শুরু।\n\n${dayBriefs}`
    : `You are a Bangladesh travel planner. For this itinerary give 2-3 practical tips per day (food, timing, booking, local fares). NEVER change fares or durations. Respond ONLY with JSON: {"tips": ["Day 1: ...", "Day 2: ..."]} where each string starts with "Day N:".\n\n${dayBriefs}`;

  try {
    const raw = await askGitHubModels(prompt, []);
    // Worker may return the tips object directly ({"tips": [...]}) or as text
    let tips: unknown[] | null = null;
    if (raw && typeof raw === 'object') {
      tips = (raw as { tips?: unknown }).tips as unknown[] | undefined ?? null;
    } else if (typeof raw === 'string') {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) tips = (JSON.parse(match[0]) as { tips?: unknown[] }).tips ?? null;
    }
    if (!Array.isArray(tips) || !tips.length) return null;
    const tipsClean = tips.map(s => String(s).trim());
    writeTipsCache(it.dayCount, it.variantId, lang, JSON.stringify({ tipsEn: lang === 'en' ? tipsClean : [], tipsBn: lang === 'bn' ? tipsClean : [] }));
    return lang === 'en' ? { tipsEn: tipsClean, tipsBn: [] } : { tipsEn: [], tipsBn: tipsClean };
  } catch {
    return null; // offline-first: silent
  }
}

// ── Text export ──────────────────────────────────────────────────────────────

/** Plain-text itinerary for clipboard/share + AI chat injection. */
export function itineraryToText(it: Itinerary, lang: Lang): string {
  const L = (en: string, bn: string) => (lang === 'bn' ? bn : en);
  const lines: string[] = [];
  lines.push(`${it.titleEn} — ${L('itinerary', 'ভ্রমণসূচি')} ${it.dayCount} ${L('days', 'দিন')}`);
  lines.push(L('Estimated budget', 'আনুমানিক বাজেট') + `: ${F(it.budgetMin)}–${F(it.budgetMax)}`);
  lines.push('');
  for (const d of it.days) {
    lines.push(`${L('Day', 'দিন')} ${d.day} — ${d.titleBn} (${d.titleEn})`);
    for (const leg of d.legs) {
      const best = leg.options[0];
      if (best) {
        const dur = best.durationMin >= 60 ? `${Math.floor(best.durationMin / 60)}h ${best.durationMin % 60}m` : `${best.durationMin}m`;
        lines.push(`  ${L('Travel', 'যাতায়াত')}: ${leg.fromLabelEn} → ${leg.toLabelEn}`);
        lines.push(`    • ${best.mode.toUpperCase()}: ${best.labelEn} · ${dur} · ${best.fareLabelEn}${best.depTime ? ` · ${best.depTime}` : ''}`);
      }
    }
    if (d.placeIds.length) {
      const names = d.placeIds.map(id => placeById(id)?.en ?? id).join(', ');
      lines.push(`  ${L('Visit', 'দেখুন')}: ${names}`);
    }
    if (lang === 'bn' && d.notesBn) lines.push(`  ${d.notesBn}`);
    if (lang === 'en' && d.notesEn) lines.push(`  ${d.notesEn}`);
    lines.push('');
  }
  return lines.join('\n');
}
