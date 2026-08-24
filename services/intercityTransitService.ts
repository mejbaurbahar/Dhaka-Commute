/**
 * Intercity TRANSIT routing — district-level multi-mode journey search.
 *
 * Builds an undirected graph over Bangladesh's 64 districts (+ major hubs)
 * from four real data sources, then searches direct (0), 1-transfer and
 * 2-transfer journeys. Direct-first: rounds run 0 → 1 → 2 and results are
 * grouped/sectioned by transfer count. Scoring does NOT blindly prefer fewer
 * transfers — a fast 1-transfer can outrank a slow direct (transfer+wait
 * penalty ≈ 108 min, real time gaps are hours).
 *
 * Fare policy: real fares only (train calcTrainFare, flight fareEco, launch
 * deck, bus = min of parsed costNonAC range). Prorated via-edge fares and
 * haversine durations are flagged `estimated: true` — the UI tags them.
 */

import type { Lang } from '../src/redesign/tokens';
import { N } from '../src/redesign/tokens';
import {
  INTERCITY_BUS_ROUTES,
  MAJOR_TRANSPORT_HUBS,
  BN_DISTRICT_MAP,
  normalizeSearchQuery,
} from '../data/intercityData';
import {
  BD_TRAIN_ROUTES,
  TRAIN_STATIONS,
  calcTrainFare,
  type BDTrainRoute,
} from '../data/bangladeshTrainData';
import { DOMESTIC_ROUTES, AIRPORTS_DATA } from '../data/bangladeshFlightData';
import { LAUNCH_ROUTES, LAUNCH_TERMINALS } from '../data/bangladeshLaunchData';
import { BUS_OPERATOR_DETAILS } from '../data/intercityOperatorData';

// ── Public types ──────────────────────────────────────────────────────────────

export type TransitMode = 'bus' | 'train' | 'flight' | 'launch';

export type TransitSortKey = 'recommended' | 'fastest' | 'direct' | 'cheapest' | 'fewest';

export interface JourneyLeg {
  mode: TransitMode;
  fromDistrict: string;
  toDistrict: string;
  nameEn: string;
  nameBn: string;
  fromLabelEn: string;
  fromLabelBn: string;
  toLabelEn: string;
  toLabelBn: string;
  durationMin: number;
  fare: number;
  dep: string;
  arr: string;
  estimated: boolean;
}

export interface Journey {
  id: string;
  legs: JourneyLeg[];
  transfers: number;
  totalMin: number;
  waitMin: number;
  totalFare: number;
  score: number;
}

export type TransitSearchResult =
  | { kind: 'ok'; journeys: Journey[]; fromDistrict: string; toDistrict: string }
  | { kind: 'same' }
  | { kind: 'notfound'; which: 'from' | 'to'; query: string };

// ── Constants ─────────────────────────────────────────────────────────────────

export const TRANSFER_WAIT_MIN = 90;
const CAP_PER_BUCKET = 12;
const TOTAL_CAP = 24;

/** Reliability penalty per mode (lower = more reliable). */
const RELIABILITY: Record<TransitMode, number> = { flight: 0, train: 20, launch: 50, bus: 60 };

const MODE_ORDER: TransitMode[] = ['bus', 'train', 'flight', 'launch'];

const AIRLINE_NAMES: Record<string, string> = {
  BG: 'Biman Bangladesh',
  BS: 'US-Bangla Airlines',
  VQ: 'Novoair',
  '2A': 'Air Astra',
};

// ── District resolution ───────────────────────────────────────────────────────

/** Canonical (lowercase) district key → display name. Keys = BN_DISTRICT_MAP values. */
const DISTRICT_DISPLAY: Record<string, string> = {
  'dhaka': 'Dhaka', 'gazipur': 'Gazipur', 'narayanganj': 'Narayanganj', 'narsingdi': 'Narsingdi',
  'manikganj': 'Manikganj', 'munshiganj': 'Munshiganj', 'tangail': 'Tangail', 'faridpur': 'Faridpur',
  'gopalganj': 'Gopalganj', 'madaripur': 'Madaripur', 'rajbari': 'Rajbari', 'shariatpur': 'Shariatpur',
  'kishoreganj': 'Kishoreganj', 'chattogram': 'Chattogram', "cox's bazar": "Cox's Bazar",
  'cumilla': 'Cumilla', 'brahmanbaria': 'Brahmanbaria', 'chandpur': 'Chandpur', 'feni': 'Feni',
  'noakhali': 'Noakhali', 'lakshmipur': 'Lakshmipur', 'khagrachhari': 'Khagrachhari',
  'rangamati': 'Rangamati', 'bandarban': 'Bandarban', 'rajshahi': 'Rajshahi',
  'chapai nawabganj': 'Chapainawabganj', 'natore': 'Natore', 'naogaon': 'Naogaon', 'pabna': 'Pabna',
  'sirajganj': 'Sirajganj', 'bogura': 'Bogura', 'joypurhat': 'Joypurhat', 'khulna': 'Khulna',
  'bagerhat': 'Bagerhat', 'satkhira': 'Satkhira', 'jashore': 'Jashore', 'jhenaidah': 'Jhenaidah',
  'magura': 'Magura', 'narail': 'Narail', 'kushtia': 'Kushtia', 'chuadanga': 'Chuadanga',
  'meherpur': 'Meherpur', 'barishal': 'Barishal', 'bhola': 'Bhola', 'jhalokathi': 'Jhalokathi',
  'pirojpur': 'Pirojpur', 'patuakhali': 'Patuakhali', 'barguna': 'Barguna', 'sylhet': 'Sylhet',
  'moulvibazar': 'Moulvibazar', 'habiganj': 'Habiganj', 'sunamganj': 'Sunamganj',
  'rangpur': 'Rangpur', 'dinajpur': 'Dinajpur', 'thakurgaon': 'Thakurgaon', 'panchagarh': 'Panchagarh',
  'nilphamari': 'Nilphamari', 'kurigram': 'Kurigram', 'lalmonirhat': 'Lalmonirhat',
  'gaibandha': 'Gaibandha', 'mymensingh': 'Mymensingh', 'jamalpur': 'Jamalpur',
  'sherpur': 'Sherpur', 'netrokona': 'Netrokona', 'benapole': 'Benapole', 'teknaf': 'Teknaf',
  'kuakata': 'Kuakata', 'savar': 'Savar',
};

/** canonical key → Bangla name (inverted BN_DISTRICT_MAP). */
const DISTRICT_BN: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [bn, en] of Object.entries(BN_DISTRICT_MAP)) map[en] = bn;
  return map;
})();

const DISTRICT_KEYS: string[] = Object.keys(DISTRICT_DISPLAY);

/** Non-district place → parent district (city areas, tourist spots, ports).
 *  Includes Bangla keys — Bangla locality names never hit the English
 *  substring scan, so without these "মিরপুর" would resolve to null. */
const NEAREST_DISTRICT: Record<string, string> = {
  gulshan: 'dhaka', banani: 'dhaka', uttara: 'dhaka', mirpur: 'dhaka', dhanmondi: 'dhaka',
  mohammadpur: 'dhaka', farmgate: 'dhaka', motijheel: 'dhaka', 'old dhaka': 'dhaka',
  badda: 'dhaka', khilgaon: 'dhaka', rampura: 'dhaka', mohakhali: 'dhaka', tejgaon: 'dhaka',
  shahbag: 'dhaka', savar: 'dhaka', tongi: 'gazipur', gabtoli: 'dhaka', sadarghat: 'dhaka',
  kamalapur: 'dhaka', 'hazrat shahjalal': 'dhaka', 'hazrat shahjalal international airport': 'dhaka',
  hsia: 'dhaka', 'airport': 'dhaka', teknaf: "cox's bazar", 'saint martin': "cox's bazar",
  'st martin': "cox's bazar", kuakata: 'patuakhali', sreemangal: 'moulvibazar',
  srimangal: 'moulvibazar', sajek: 'rangamati', kaptai: 'rangamati', nilgiri: 'bandarban',
  sundarbans: 'bagerhat', mongla: 'bagerhat', benapole: 'jashore', bhairab: 'kishoreganj',
  jaflong: 'sylhet', ratargul: 'sylhet', 'payra port': 'patuakhali', hatiya: 'noakhali',
  morrelganj: 'bagerhat', chaumuhani: 'noakhali', paksey: 'pabna', santahar: 'bogura',
  'maijdi court': 'noakhali', 'maijdi': 'noakhali', saidpur: 'nilphamari',
  // Bangla keys (localities + spots) — Bangla names never match the English
  // substring scan, so every key here is what makes Bangla queries work.
  // Dhaka metro areas
  মিরপুর: 'dhaka', গুলশান: 'dhaka', বনানী: 'dhaka', উত্তরা: 'dhaka', ধানমন্ডি: 'dhaka',
  মোহাম্মদপুর: 'dhaka', ফার্মগেট: 'dhaka', মতিঝিল: 'dhaka', 'পুরান ঢাকা': 'dhaka', বাড্ডা: 'dhaka',
  খিলগাঁও: 'dhaka', রামপুরা: 'dhaka', মোহাখালী: 'dhaka', তেজগাঁও: 'dhaka', শাহবাগ: 'dhaka',
  পল্লবী: 'dhaka', কলাবাগান: 'dhaka', লালমাটিয়া: 'dhaka', আজিমপুর: 'dhaka', শ্যামলী: 'dhaka',
  আসাদগেট: 'dhaka', বিজয়: 'dhaka', আগারগাঁও: 'dhaka', নাখালপাড়া: 'dhaka', পল্টন: 'dhaka',
  শান্তিনগর: 'dhaka', কাকরাইল: 'dhaka', সেগুনবাগিচা: 'dhaka', বাংলামোটর: 'dhaka', নিকুঞ্জ: 'dhaka',
  বনশ্রী: 'dhaka', সাভার: 'dhaka', টঙ্গী: 'gazipur', গাবতলী: 'dhaka', সদরঘাট: 'dhaka',
  কমলাপুর: 'dhaka', বিমানবন্দর: 'dhaka', এয়ারপোর্ট: 'dhaka', সায়েদাবাদ: 'dhaka',
  // Chattogram city areas
  আগ্রাবাদ: 'chattogram', পাহাড়তলী: 'chattogram', ষোলশহর: 'chattogram', নাসিরাবাদ: 'chattogram',
  চান্দগাঁও: 'chattogram', ঈদগাঁও: "cox's bazar", পেকুয়া: "cox's bazar", মহেশখালী: "cox's bazar",
  // Sylhet / Rajshahi / Khulna city areas
  জিন্দাবাজার: 'sylhet', ছাতক: 'sylhet', গোলাপগঞ্জ: 'sylhet', বিয়ানীবাজার: 'sylhet',
  শাহপরান: 'sylhet', সোনারগাঁও: 'narayanganj', ফতুল্লা: 'narayanganj',
  শিরোইল: 'rajshahi', 'সাহেব বাজার': 'rajshahi', দৌলতপুর: 'khulna', খালিশপুর: 'khulna',
  সোনাডাঙ্গা: 'khulna', চান্দনা: 'gazipur', কালিয়াকৈর: 'gazipur', শ্রীপুর: 'gazipur',
  // Tourist spots + border/port towns
  বেনাপোল: 'jashore', টেকনাফ: "cox's bazar", কুয়াকাটা: 'patuakhali', স্রীমঙ্গল: 'moulvibazar',
  সাজেক: 'rangamati', কাপ্তাই: 'rangamati', সুন্দরবন: 'bagerhat', মংলা: 'bagerhat',
  ভৈরব: 'kishoreganj', জাফলং: 'sylhet', রাতারগুল: 'sylhet', হাতিয়া: 'noakhali',
  চৌমুহনী: 'noakhali', সৈয়দপুর: 'nilphamari', সেন্টমার্টিন: "cox's bazar",
};

/** Spelling/alias variants → canonical district key. */
const CANONICAL_ALIASES: Record<string, string> = {
  chittagong: 'chattogram', chittagang: 'chattogram', chatogram: 'chattogram', ctg: 'chattogram',
  coxsbazar: "cox's bazar", 'cox bazar': "cox's bazar", 'coxs bazar': "cox's bazar", cox: "cox's bazar",
  jessore: 'jashore', jesore: 'jashore', borishal: 'barishal',
  bogra: 'bogura', 'chapainawabganj': 'chapai nawabganj', 'nawabganj': 'chapai nawabganj',
  comilla: 'cumilla', cumilla: 'cumilla', khagrachari: 'khagrachhari', khagrachori: 'khagrachhari',
  patukhali: 'patuakhali', jhalokati: 'jhalokathi', jhalkathi: 'jhalokathi',
  nilphamari: 'nilphamari', lakshimpur: 'lakshmipur', barisal: 'barishal',
  srimangal: 'moulvibazar', moulavibazar: 'moulvibazar', banurup: 'moulvibazar',
  faridpur: 'faridpur', 'mymensing': 'mymensingh', 'netrakona': 'netrokona',
  'kurigram': 'kurigram', 'gaibanda': 'gaibandha', 'sherpur': 'sherpur',
};

/** Resolve a free-text query to a canonical district key, or null. */
export function resolveDistrict(query: string): string | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const normalized = normalizeSearchQuery(q);
  if (CANONICAL_ALIASES[normalized]) return CANONICAL_ALIASES[normalized];
  if (DISTRICT_DISPLAY[normalized]) return normalized;
  if (NEAREST_DISTRICT[normalized]) return NEAREST_DISTRICT[normalized];
  // Station-style area names carry a stop number ("gulshan 1", "মিরপুর ১০") —
  // strip it (ASCII + Bangla ০-৯ digits) and retry before falling through.
  const stripped = normalized.replace(/[\s০-৯\d]+$/, '');
  if (stripped !== normalized && NEAREST_DISTRICT[stripped]) return NEAREST_DISTRICT[stripped];
  // Token scan: "Post Office (Gulshan)" → "gulshan". Reverse-geocoded area
  // strings and multi-word queries only resolve via a known locality/district
  // token inside — exact known keys only, never substring noise.
  for (const word of normalized.split(/[^\p{L}\p{N}]+/u)) {
    if (!word) continue;
    if (CANONICAL_ALIASES[word]) return CANONICAL_ALIASES[word];
    if (DISTRICT_DISPLAY[word]) return word;
    if (NEAREST_DISTRICT[word]) return NEAREST_DISTRICT[word];
  }
  // substring scan over district keys (min 3 chars to avoid noise)
  if (normalized.length >= 3) {
    for (const key of DISTRICT_KEYS) {
      if (normalized.includes(key) || key.includes(normalized)) return key;
    }
  }
  return null;
}

// ── Small helpers (duplicated locally — kept private, per surgical rule) ─────

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** '1h 30m' | '11h 0m' | '04:20' → minutes. */
function parseDurToMin(dur: string): number | null {
  if (!dur) return null;
  const m = dur.trim().toLowerCase();
  const hms = m.match(/(\d{1,2}):(\d{2})/);
  if (hms) return parseInt(hms[1], 10) * 60 + parseInt(hms[2], 10);
  const hm = m.match(/(\d+)\s*h(?:\s*(\d+)\s*m)?/);
  if (hm) return parseInt(hm[1], 10) * 60 + (hm[2] ? parseInt(hm[2], 10) : 0);
  const mm = m.match(/^(\d+)\s*m$/);
  if (mm) return parseInt(mm[1], 10);
  return null;
}

/** '৳1,000-৳1,100' | '৳134' | '৳500+' → minimum numeric value. */
function parseFareMin(fare: string): number | null {
  if (!fare || fare === '-' || fare === 'UNKNOWN') return null;
  const nums = fare.match(/\d[\d,]*/g);
  if (!nums) return null;
  return Math.min(...nums.map((n) => parseInt(n.replace(/,/g, ''), 10)));
}

/** '07:40 am BST' → '07:40' (24h). Empty → ''. */
function extractTime(timeStr: string): string {
  if (!timeStr || timeStr === '---') return '';
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
  if (!m) return '';
  let h = parseInt(m[1], 10);
  if (m[3].toLowerCase() === 'pm' && h !== 12) h += 12;
  if (m[3].toLowerCase() === 'am' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

// ── Graph ─────────────────────────────────────────────────────────────────────

interface EdgeOption {
  mode: TransitMode;
  fromDistrict: string;
  toDistrict: string;
  nameEn: string;
  nameBn: string;
  fromLabelEn: string;
  fromLabelBn: string;
  toLabelEn: string;
  toLabelBn: string;
  durationMin: number;
  fare: number;
  dep: string;
  arr: string;
  estimated: boolean;
  /** Train only: km spanned by this edge (route-level chain distance). Private, not a JourneyLeg field. */
  spanKm?: number;
}

type Adjacency = Map<string, Map<string, EdgeOption[]>>;

let cachedGraph: Adjacency | null = null;

function districtDisplay(key: string): string {
  return DISTRICT_DISPLAY[key] ?? key;
}

function addEdge(adj: Adjacency, a: string, b: string, opt: Omit<EdgeOption, 'fromDistrict' | 'toDistrict'>) {
  if (!adj.has(a)) adj.set(a, new Map());
  if (!adj.has(b)) adj.set(b, new Map());
  for (const [from, to] of [[a, b], [b, a]] as const) {
    // Reverse direction: flip labels and drop times so a leg traversed the
    // other way reads from the traveler's viewpoint ("Rangpur → Dhaka", not
    // "Dhaka → Rangpur" with the stored-direction departure time).
    const entry =
      from === a
        ? opt
        : { ...opt, fromLabelEn: opt.toLabelEn, fromLabelBn: opt.toLabelBn, toLabelEn: opt.fromLabelEn, toLabelBn: opt.fromLabelBn, dep: '', arr: '' };
    const toMap = adj.get(from)!;
    if (!toMap.has(to)) toMap.set(to, []);
    const list = toMap.get(to)!;
    const existing = list.find((e) => e.mode === entry.mode);
    if (existing) {
      const spanA = existing.spanKm;
      const spanB = entry.spanKm;
      // Train edges: a much longer span (>1.4×) represents the real corridor better
      // than a short partial span, even if slower; otherwise the faster edge wins.
      const replace =
        spanA !== undefined && spanB !== undefined
          ? spanB > spanA * 1.4 || (spanB >= spanA / 1.4 && entry.durationMin < existing.durationMin)
          : entry.durationMin < existing.durationMin;
      if (replace) {
        const idx = list.indexOf(existing);
        list[idx] = { ...existing, ...entry, fromDistrict: from, toDistrict: to };
      }
    } else {
      list.push({ ...entry, fromDistrict: from, toDistrict: to });
    }
  }
}

/** Station id → district key. Explicit overrides first, then name matching. */
const STATION_OVERRIDES: Record<string, string> = {
  kamalapur: 'dhaka', tejgaon: 'dhaka', cantonment: 'dhaka', airport_r: 'dhaka',
  gobra: 'dhaka', nangalbandha: 'dhaka', soydabad: 'dhaka',
  tongi: 'gazipur', joydebpur: 'gazipur', sreepur: 'gazipur', gafargaon: 'mymensingh', 'hi_tech_city': 'gazipur',
  bhairab: 'kishoreganj', bajitpur: 'kishoreganj', kuliarchar: 'kishoreganj',
  akhaura: 'brahmanbaria', ashuganj: 'brahmanbaria',
  laksam: 'cumilla', gunabati: 'cumilla',
  srimangal: 'moulvibazar', sreemangal: 'moulvibazar', kulaura: 'moulvibazar',
  bhanugach: 'moulvibazar', shamshernagar: 'moulvibazar',
  ishwardi: 'pabna', ishwardi_bypass: 'pabna', dashuria: 'pabna', paksey: 'pabna',
  chatmohar: 'pabna', naliagram: 'kushtia', kashinathpur: 'sirajganj',
  bheramara: 'kushtia', alamdanga: 'kushtia', bhotmari: 'kushtia', mirpur: 'kushtia',
  jamtail: 'kushtia', khoksha: 'kushtia', kumarkhali: 'kushtia',
  santahar: 'bogura', talora: 'bogura', sonatola: 'bogura', bonar_para: 'gaibandha',
  parbatipur: 'dinajpur', birampur: 'dinajpur', manmathapur: 'dinajpur',
  chirirbandar: 'dinajpur', kawgaon: 'dinajpur', kanchan_junction: 'dinajpur',
  mongalpur: 'dinajpur', setabganj: 'dinajpur', sultanpur: 'dinajpur', hili: 'dinajpur',
  birol: 'dinajpur', kholahati: 'dinajpur',
  chilahati: 'nilphamari', saidpur: 'nilphamari', domar: 'nilphamari',
  burimari: 'lalmonirhat', patgram: 'lalmonirhat', aditmari: 'lalmonirhat', hatibandha: 'lalmonirhat',
  baura: 'lalmonirhat',
  rohanpur: 'chapai nawabganj', lolitnagar: 'chapai nawabganj', amnura: 'chapai nawabganj',
  amnura_bypass: 'chapai nawabganj', nachole: 'chapai nawabganj',
  abdulpur: 'natore', lokmanpur: 'natore', gachihata: 'natore',
  azim_nagar: 'rajshahi', nandangachi: 'rajshahi', sardah_road: 'rajshahi',
  kakonhat: 'rajshahi', rajshahi_court: 'rajshahi', amirabad: 'rajshahi',
  padmabila: 'narail',
  bhanga: 'faridpur', boalmari_bazar: 'faridpur', madhukhali: 'rajbari', pangsha: 'rajbari',
  mawa: 'munshiganj', muktarpur: 'munshiganj', sreenagar: 'munshiganj',
  kashiani: 'gopalganj', muksudpur: 'gopalganj', chandradighalia: 'gopalganj',
  fatullah: 'narayanganj', mahendranagar: 'narayanganj',
  chitoshi_road: 'chandpur', hajiganj: 'chandpur', chandpur_court: 'chandpur',
  maijdi_court: 'noakhali', choumuhani: 'noakhali', sonaimuri: 'noakhali', bajra: 'noakhali',
  choto_bahirbag: 'gopalganj', lohagara: 'chattogram', lohagora: 'narail',
  ramu: "cox's bazar", harbang: "cox's bazar", chakaria: "cox's bazar", islamabad: "cox's bazar",
  dohazari: 'chattogram', dulahazara: "cox's bazar", patiya: 'chattogram', satkania: 'chattogram',
  gomdandi: 'chattogram', kumira: 'chattogram', kumira_halt: 'chattogram', bhatiary: 'chattogram',
  sholoshohor: 'chattogram', mirbagh: 'chattogram', janali_hat: 'chattogram',
  teesta_junction: 'rangpur', kaunia: 'rangpur', badarganj: 'rangpur', pirganj: 'rangpur',
  ullapara: 'sirajganj', methikanda: 'sirajganj', sirajganjraipur: 'sirajganj',
  tarakandi: 'jamalpur', melandah_bazar: 'jamalpur', islampur_bazar: 'jamalpur',
  sarishabari: 'jamalpur',
  barhatta: 'netrokona', mohanganj: 'netrokona', kendua_bazar: 'netrokona', thakrokona: 'netrokona',
  gouripur_myn: 'mymensingh', bikrampur: 'munshiganj',
  darshana_halt: 'chuadanga',
  hemnagar: 'satkhira', jhikargacha: 'jashore', noapara: 'jashore',
  shibchar: 'madaripur', muladhuli: 'madaripur',
  jagannathganj: 'sunamganj', jagannathgonj_bazar: 'sunamganj', shyamgonj: 'sunamganj',
  kaoraid: 'tangail', bhuapur: 'tangail', dhalarchar: 'tangail', atharabari: 'tangail',
  akkelpur: 'joypurhat', panchbibi: 'joypurhat',
  basail: 'tangail', azampur: 'tangail', bamondanga: 'gaibandha', boral_bridge: 'tangail',
  khatra: 'dhaka', maijgaon: 'mymensingh', agailjhara: 'khulna', sararchar: 'sirajganj',
};

function stationToDistrict(stationId: string): string | null {
  if (STATION_OVERRIDES[stationId]) return STATION_OVERRIDES[stationId];
  const station = TRAIN_STATIONS[stationId];
  if (!station) return null;
  const normalized = normalizeSearchQuery(station.name);
  if (DISTRICT_DISPLAY[normalized]) return normalized;
  const lower = station.name.toLowerCase();
  let best: string | null = null;
  for (const key of DISTRICT_KEYS) {
    if (key.length < 4) continue;
    if (lower.includes(key) || key.includes(lower)) {
      if (!best || key.length > best.length) best = key;
    }
  }
  return best;
}

/** operator detail routes (from 'Dhaka') → district-key → {durationMin, fare, nameEn, nameBn} */
const DHK_BUS_OVERRIDES: Map<string, { durationMin: number; fare: number; nameEn: string; nameBn: string }> = (() => {
  const map = new Map<string, { durationMin: number; fare: number; nameEn: string; nameBn: string }>();
  for (const op of BUS_OPERATOR_DETAILS) {
    for (const route of op.routes) {
      const toKey = resolveDistrict(route.to);
      if (!toKey) continue;
      const dur = parseDurToMin(route.durationHrs);
      const fare = parseFareMin(route.fareNonAC);
      if (dur === null || fare === null) continue;
      const cur = map.get(toKey);
      if (!cur || dur < cur.durationMin) {
        map.set(toKey, { durationMin: dur, fare, nameEn: op.name, nameBn: op.bnName });
      }
    }
  }
  return map;
})();

const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = (() => {
  // District centroids from TRAIN_STATIONS where the station id IS the district,
  // plus curated centroids for the rest (used only for bus duration estimates).
  const out: Record<string, { lat: number; lng: number }> = {};
  const curated: Record<string, [number, number]> = {
    'dhaka': [23.8103, 90.4125], 'gazipur': [24.0020, 90.4260], 'narayanganj': [23.6238, 90.5013],
    'narsingdi': [23.9247, 90.7153], 'manikganj': [23.8610, 90.0010], 'munshiganj': [23.5422, 90.5300],
    'tangail': [24.2513, 89.9171], 'faridpur': [23.6070, 89.8429], 'gopalganj': [23.0050, 89.8270],
    'madaripur': [23.1618, 90.2016], 'rajbari': [23.7560, 89.6500], 'shariatpur': [23.2133, 90.3850],
    'kishoreganj': [24.4427, 90.7845], 'chattogram': [22.3560, 91.7830], "cox's bazar": [21.4272, 92.0058],
    'cumilla': [23.4607, 91.1809], 'brahmanbaria': [23.9599, 91.1113], 'chandpur': [23.2320, 90.6519],
    'feni': [23.0082, 91.3977], 'noakhali': [22.8696, 91.0991], 'lakshmipur': [22.9440, 90.8250],
    'khagrachhari': [23.1020, 91.9600], 'rangamati': [22.6520, 92.1850], 'bandarban': [22.1910, 92.2230],
    'rajshahi': [24.3786, 88.6003], 'chapai nawabganj': [24.5894, 88.2800], 'natore': [24.4110, 89.0000],
    'naogaon': [24.7856, 88.9302], 'pabna': [24.0060, 89.2330], 'sirajganj': [24.4536, 89.7006],
    'bogura': [24.8524, 89.3648], 'joypurhat': [24.8700, 89.0400], 'khulna': [22.8228, 89.5497],
    'bagerhat': [22.6510, 89.7950], 'satkhira': [22.7180, 89.0720], 'jashore': [23.1673, 89.2081],
    'jhenaidah': [23.5410, 89.1490], 'magura': [23.4877, 89.4194], 'narail': [23.1769, 89.4955],
    'kushtia': [23.9020, 89.1220], 'chuadanga': [23.6480, 88.8600], 'meherpur': [23.7620, 88.6310],
    'barishal': [22.7010, 90.3535], 'bhola': [22.6890, 90.6448], 'jhalokathi': [22.6402, 90.1993],
    'pirojpur': [22.5796, 89.9758], 'patuakhali': [22.3596, 90.3290], 'barguna': [22.1502, 90.1127],
    'sylhet': [24.8949, 91.8687], 'moulvibazar': [24.4824, 91.7774], 'habiganj': [24.3747, 91.4165],
    'sunamganj': [25.0650, 91.4000], 'rangpur': [25.7559, 89.2443], 'dinajpur': [25.6278, 88.6338],
    'thakurgaon': [26.0300, 88.4500], 'panchagarh': [26.3358, 88.5506], 'nilphamari': [25.9310, 88.8560],
    'kurigram': [25.8052, 89.6360], 'lalmonirhat': [25.9185, 89.4488], 'gaibandha': [25.3282, 89.5284],
    'mymensingh': [24.7504, 90.4066], 'jamalpur': [24.8987, 89.9417], 'sherpur': [25.0150, 90.0140],
    'netrokona': [24.8814, 90.7189], 'benapole': [23.0283, 88.9326], 'teknaf': [20.8640, 92.3040],
    'kuakata': [21.8320, 90.1200], 'savar': [23.8590, 90.2570],
  };
  for (const [key, [lat, lng]] of Object.entries(curated)) out[key] = { lat, lng };
  return out;
})();

function busDurMin(fromKey: string, toKey: string, realDur: number | null): number {
  if (realDur !== null) return realDur;
  const a = DISTRICT_COORDS[fromKey];
  const b = DISTRICT_COORDS[toKey];
  if (!a || !b) return 240;
  return Math.round(haversineKm(a.lat, a.lng, b.lat, b.lng) / 55 + 45);
}

function buildGraph(): Adjacency {
  const adj: Adjacency = new Map();
  const viaRegex = /\(via\s+([^)]+)\)/i;

  // ── Bus: Dhaka-radial + MAJOR_TRANSPORT_HUBS + via-hint synthesis ──────────
  for (const entry of [...INTERCITY_BUS_ROUTES, ...MAJOR_TRANSPORT_HUBS]) {
    const toKey = resolveDistrict(entry.district);
    if (!toKey || toKey === 'dhaka') continue;
    const fare = parseFareMin(entry.costNonAC);
    if (fare === null) continue;
    const opName = entry.busOperators[0] ?? entry.district;
    const real = DHK_BUS_OVERRIDES.get(toKey);
    const dur = busDurMin('dhaka', toKey, real?.durationMin ?? null);
    addEdge(adj, 'dhaka', toKey, {
      mode: 'bus', nameEn: real?.nameEn ?? opName, nameBn: real?.nameBn ?? '',
      fromLabelEn: 'Dhaka', fromLabelBn: 'ঢাকা',
      toLabelEn: districtDisplay(toKey), toLabelBn: DISTRICT_BN[toKey] ?? toKey,
      durationMin: dur, fare: real?.fare ?? fare, dep: '', arr: '', estimated: !real,
    });
    // via-hint: Dhaka ⇄ X (via V1/V2) → synthesize X ⇄ V edges
    const viaMatch = entry.route.match(viaRegex);
    if (viaMatch) {
      for (const token of viaMatch[1].split(/[\/,]/)) {
        const viaKey = resolveDistrict(token);
        if (!viaKey || viaKey === 'dhaka' || viaKey === toKey) continue;
        const a = DISTRICT_COORDS['dhaka']!;
        const b = DISTRICT_COORDS[toKey]!;
        const v = DISTRICT_COORDS[viaKey];
        if (!v) continue;
        const viaDur = Math.round(haversineKm(v.lat, v.lng, b.lat, b.lng) / 55 + 45);
        const viaFare = Math.max(60, Math.round(fare * (haversineKm(v.lat, v.lng, b.lat, b.lng) / Math.max(haversineKm(a.lat, a.lng, b.lat, b.lng), 1))));
        addEdge(adj, toKey, viaKey, {
          mode: 'bus', nameEn: opName, nameBn: '',
          fromLabelEn: districtDisplay(toKey), fromLabelBn: DISTRICT_BN[toKey] ?? toKey,
          toLabelEn: districtDisplay(viaKey), toLabelBn: DISTRICT_BN[viaKey] ?? viaKey,
          durationMin: viaDur, fare: viaFare, dep: '', arr: '', estimated: true,
        });
      }
    }
  }

  // ── Train: nationwide Intercity/Express routes, district-pair edges ─────────
  const stopTime = (route: BDTrainRoute, sid: string): { dep: string; arr: string } => {
    for (const rs of route.routeStops) {
      if (rs.city === sid) return { dep: extractTime(rs.departure), arr: extractTime(rs.arrival) };
    }
    return { dep: '', arr: '' };
  };
  const toMin = (t: string): number | null => {
    const m = t.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  };
  const chainKm = (route: BDTrainRoute, aid: string, bid: string): number => {
    const a = TRAIN_STATIONS[aid];
    const b = TRAIN_STATIONS[bid];
    if (!a || !b) return 0;
    return haversineKm(a.lat, a.lng, b.lat, b.lng);
  };

  for (const route of BD_TRAIN_ROUTES) {
    if (route.type !== 'Intercity' && route.type !== 'Express') continue;
    const chain = [route.from, ...route.stops, route.to];
    const totalMin = parseDurToMin(route.totalDuration);
    const nameEn = `${route.name} (${route.number})`;
    const nameBn = `${route.bnName} (${route.number})`;
    // collapse consecutive stations in the same district (keep chain index)
    const segments: { district: string; stationId: string; index: number }[] = [];
    for (let ci = 0; ci < chain.length; ci++) {
      const district = stationToDistrict(chain[ci]);
      if (!district) continue;
      const last = segments[segments.length - 1];
      if (last && last.district === district) continue;
      segments.push({ district, stationId: chain[ci], index: ci });
    }
    const endDist = chainKm(route, route.from, route.to);
    for (let i = 0; i < segments.length - 1; i++) {
      const a = segments[i];
      const b = segments[i + 1];
      if (a.district === b.district) continue;
      // duration: sum of real arrival−departure hops between a and b when all known
      let dur: number | null = null;
      let estimated = true;
      let hopSum = 0;
      let hopsKnown = true;
      for (let ci = a.index; ci < b.index; ci++) {
        const dep = toMin(stopTime(route, chain[ci]).dep);
        const arr = toMin(stopTime(route, chain[ci + 1]).arr);
        if (dep === null || arr === null) { hopsKnown = false; break; }
        let d = arr - dep;
        if (d < 0) d += 1440;
        hopSum += d;
      }
      if (hopsKnown && hopSum > 0) { dur = hopSum; estimated = false; }
      else if (totalMin !== null && endDist > 1) {
        const dAB = chainKm(route, a.stationId, b.stationId);
        dur = Math.round((totalMin * dAB) / endDist);
      }
      if (dur === null) continue;
      const distAB = chainKm(route, a.stationId, b.stationId);
      const fare = calcTrainFare(distAB > 5 ? distAB : 40).shuvanChair;
      const ta = stopTime(route, a.stationId);
      const tb = stopTime(route, b.stationId);
      addEdge(adj, a.district, b.district, {
        mode: 'train', nameEn, nameBn,
        fromLabelEn: districtDisplay(a.district), fromLabelBn: DISTRICT_BN[a.district] ?? a.district,
        toLabelEn: districtDisplay(b.district), toLabelBn: DISTRICT_BN[b.district] ?? b.district,
        durationMin: dur, fare, dep: ta.dep, arr: tb.arr, estimated, spanKm: distAB,
      });
    }
  }

  // ── Flight: DAC-hub + CGP⇄CXB regional ──────────────────────────────────────
  const iataToDistrict: Record<string, string> = {};
  for (const ap of AIRPORTS_DATA) {
    const key = resolveDistrict(ap.city);
    if (key) iataToDistrict[ap.iata] = key;
  }
  for (const f of DOMESTIC_ROUTES) {
    const fromKey = iataToDistrict[f.from];
    const toKey = iataToDistrict[f.to];
    if (!fromKey || !toKey || fromKey === toKey) continue;
    const dur = parseDurToMin(f.dur);
    if (dur === null) continue;
    const airline = AIRLINE_NAMES[f.airline] ?? f.airline;
    addEdge(adj, fromKey, toKey, {
      mode: 'flight', nameEn: `${airline} ${f.flightNo}`, nameBn: `${airline} ${f.flightNo}`,
      fromLabelEn: districtDisplay(fromKey), fromLabelBn: DISTRICT_BN[fromKey] ?? fromKey,
      toLabelEn: districtDisplay(toKey), toLabelBn: DISTRICT_BN[toKey] ?? toKey,
      durationMin: dur, fare: f.fareEco, dep: f.dep, arr: f.arr, estimated: false,
    });
  }

  // ── Launch: Sadarghat-radial + Narayanganj⇄Chandpur ─────────────────────────
  const terminalToDistrict: Record<string, string> = {
    sadarghat: 'dhaka', lalkuthi: 'dhaka', barisal: 'barishal', khulna: 'khulna',
    patuakhali: 'patuakhali', bhola: 'bhola', chandpur: 'chandpur', narayanganj: 'narayanganj',
    madaripur: 'madaripur', hatiya: 'noakhali', borguna: 'barguna', morrelganj: 'bagerhat',
    jhalkathi: 'jhalokathi', pirojpur: 'pirojpur', shariatpur: 'shariatpur',
  };
  for (const lr of LAUNCH_ROUTES) {
    const fromKey = terminalToDistrict[lr.from];
    const toKey = terminalToDistrict[lr.to];
    if (!fromKey || !toKey || fromKey === toKey) continue;
    const dur = parseDurToMin(lr.dur);
    if (dur === null) continue;
    addEdge(adj, fromKey, toKey, {
      mode: 'launch', nameEn: lr.name.en, nameBn: lr.name.bn,
      fromLabelEn: districtDisplay(fromKey), fromLabelBn: DISTRICT_BN[fromKey] ?? fromKey,
      toLabelEn: districtDisplay(toKey), toLabelBn: DISTRICT_BN[toKey] ?? toKey,
      durationMin: dur, fare: lr.deck, dep: lr.dep, arr: lr.arr, estimated: false,
    });
  }

  return adj;
}

function getGraph(): Adjacency {
  if (!cachedGraph) cachedGraph = buildGraph();
  return cachedGraph;
}

// ── Journey building & scoring ────────────────────────────────────────────────

function buildJourney(legs: EdgeOption[]): Journey {
  const transfers = legs.length - 1;
  const waitMin = TRANSFER_WAIT_MIN * transfers;
  const travelMin = legs.reduce((s, l) => s + l.durationMin, 0);
  const totalFare = legs.reduce((s, l) => s + l.fare, 0);
  const totalMin = travelMin + waitMin;
  const score =
    totalMin +
    0.08 * totalFare +
    90 * transfers +
    0.2 * waitMin +
    legs.reduce((s, l) => s + RELIABILITY[l.mode], 0);
  const journeyLegs: JourneyLeg[] = legs.map((l) => ({
    mode: l.mode,
    fromDistrict: l.fromDistrict,
    toDistrict: l.toDistrict,
    nameEn: l.nameEn,
    nameBn: l.nameBn,
    fromLabelEn: l.fromLabelEn,
    fromLabelBn: l.fromLabelBn,
    toLabelEn: l.toLabelEn,
    toLabelBn: l.toLabelBn,
    durationMin: l.durationMin,
    fare: l.fare,
    dep: l.dep,
    arr: l.arr,
    estimated: l.estimated,
  }));
  return {
    id: journeyLegs.map((l) => `${l.mode}:${l.fromDistrict}>${l.toDistrict}`).join('|'),
    legs: journeyLegs,
    transfers,
    totalMin,
    waitMin,
    totalFare,
    score,
  };
}

function edgeList(adj: Adjacency, a: string, b: string): EdgeOption[] {
  const toMap = adj.get(a);
  if (!toMap) return [];
  const list = toMap.get(b);
  return list ?? [];
}

/** Best single edge a→b per mode (min duration), in MODE_ORDER. */
function bestEdges(adj: Adjacency, a: string, b: string): EdgeOption[] {
  const out: EdgeOption[] = [];
  for (const mode of MODE_ORDER) {
    const matches = edgeList(adj, a, b).filter((e) => e.mode === mode);
    if (matches.length) out.push(matches.reduce((min, e) => (e.durationMin < min.durationMin ? e : min)));
  }
  return out;
}

function paretoFilter(journeys: Journey[]): Journey[] {
  const out: Journey[] = [];
  for (const j of journeys) {
    const dominated = journeys.some(
      (o) => o !== j && o.totalMin <= j.totalMin && o.totalFare <= j.totalFare && (o.totalMin < j.totalMin || o.totalFare < j.totalFare)
    );
    if (!dominated) out.push(j);
  }
  return out;
}

// ── Search ────────────────────────────────────────────────────────────────────

export function searchTransit(fromQ: string, toQ: string): TransitSearchResult {
  const fromDistrict = resolveDistrict(fromQ);
  if (!fromDistrict) return { kind: 'notfound', which: 'from', query: fromQ };
  const toDistrict = resolveDistrict(toQ);
  if (!toDistrict) return { kind: 'notfound', which: 'to', query: toQ };
  if (fromDistrict === toDistrict) return { kind: 'same' };

  const adj = getGraph();
  const journeys: Journey[] = [];
  const seen = new Set<string>();

  const push = (j: Journey) => {
    if (seen.has(j.id)) return;
    seen.add(j.id);
    journeys.push(j);
  };

  // Round 0 — direct, one leg per mode
  for (const e of bestEdges(adj, fromDistrict, toDistrict)) {
    push(buildJourney([e]));
  }

  // Round 1 — via one hub
  const hubs1 = [...(adj.get(fromDistrict)?.keys() ?? [])].filter((h) => h !== toDistrict);
  for (const h of hubs1) {
    const legsA = bestEdges(adj, fromDistrict, h);
    const legsB = bestEdges(adj, h, toDistrict);
    if (!legsA.length || !legsB.length) continue;
    let best: Journey | null = null;
    for (const a of legsA) {
      for (const b of legsB) {
        const j = buildJourney([a, b]);
        if (!best || j.score < best.score) best = j;
      }
    }
    if (best) push(best);
  }

  // Round 2 — via two hubs (best per hub pair)
  const hubs2 = new Set<string>();
  for (const h1 of hubs1) {
    for (const h2 of adj.get(h1)?.keys() ?? []) {
      if (h2 === fromDistrict || h2 === toDistrict || h2 === h1) continue;
      if (!edgeList(adj, h2, toDistrict).length) continue;
      hubs2.add(`${h1}|${h2}`);
    }
  }
  for (const pair of hubs2) {
    const [h1, h2] = pair.split('|');
    const legsA = bestEdges(adj, fromDistrict, h1);
    const legsB = bestEdges(adj, h1, h2);
    const legsC = bestEdges(adj, h2, toDistrict);
    let best: Journey | null = null;
    for (const a of legsA) {
      for (const b of legsB) {
        for (const c of legsC) {
          const j = buildJourney([a, b, c]);
          if (!best || j.score < best.score) best = j;
        }
      }
    }
    if (best) push(best);
  }

  // Pareto per transfer bucket (directs never dominated by transfer journeys),
  // then caps. Directs always kept.
  let pooled = [0, 1, 2].flatMap(t => paretoFilter(journeys.filter(j => j.transfers === t)));
  pooled.sort((x, y) => x.score - y.score);
  const kept: Journey[] = [];
  const perBucket: Record<number, number> = { 0: 0, 1: 0, 2: 0 };
  for (const j of pooled) {
    if (j.transfers === 0) { kept.push(j); perBucket[0]++; continue; }
    if (kept.length >= TOTAL_CAP || perBucket[j.transfers] >= CAP_PER_BUCKET) continue;
    kept.push(j);
    perBucket[j.transfers]++;
  }
  // merge directs first (direct-first), then score order within transfers
  const byBucket = (t: number) => kept.filter((j) => j.transfers === t).sort((x, y) => x.score - y.score);
  const finalList = [...byBucket(0), ...byBucket(1), ...byBucket(2)];

  return { kind: 'ok', journeys: finalList, fromDistrict, toDistrict };
}

// ── Sorting ───────────────────────────────────────────────────────────────────

export function sortJourneys(journeys: Journey[], key: TransitSortKey): Journey[] {
  const sorted = [...journeys];
  switch (key) {
    case 'recommended':
      sorted.sort((a, b) => a.score - b.score);
      break;
    case 'fastest':
      sorted.sort((a, b) => a.totalMin - b.totalMin);
      break;
    case 'direct':
      sorted.sort((a, b) => (a.transfers - b.transfers) || (a.score - b.score));
      break;
    case 'cheapest':
      sorted.sort((a, b) => a.totalFare - b.totalFare);
      break;
    case 'fewest':
      sorted.sort((a, b) => (a.transfers - b.transfers) || (a.score - b.score));
      break;
  }
  return sorted;
}

// ── Formatting ────────────────────────────────────────────────────────────────

/** '1h 30m' / '১ঘ. ৩০মি.' — lang-aware. */
export function formatDurMin(min: number, lang: Lang): string {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  if (lang === 'bn') {
    if (h === 0) return `${N(m, lang)}মি.`;
    if (m === 0) return `${N(h, lang)}ঘ.`;
    return `${N(h, lang)}ঘ. ${N(m, lang)}মি.`;
  }
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export const MODE_ICONS: Record<TransitMode, string> = {
  bus: '🚌',
  train: '🚆',
  flight: '✈️',
  launch: '⛴️',
};

export interface JourneyWaypoint {
  lat: number;
  lng: number;
  labelEn: string;
  labelBn: string;
}

/** One waypoint per leg boundary, in travel order, with district coordinates —
 *  the polyline points for the journey map (start → transfers → destination). */
export function getJourneyWaypoints(j: Journey): JourneyWaypoint[] {
  const out: JourneyWaypoint[] = [];
  for (const leg of j.legs) {
    const a = DISTRICT_COORDS[leg.fromDistrict];
    const b = DISTRICT_COORDS[leg.toDistrict];
    if (a) {
      const prev = out[out.length - 1];
      const same = prev && prev.lat === a.lat && prev.lng === a.lng;
      if (same) {
        prev.labelEn = leg.fromLabelEn;
        prev.labelBn = leg.fromLabelBn;
      } else {
        out.push({ lat: a.lat, lng: a.lng, labelEn: leg.fromLabelEn, labelBn: leg.fromLabelBn });
      }
    }
    if (b) out.push({ lat: b.lat, lng: b.lng, labelEn: leg.toLabelEn, labelBn: leg.toLabelBn });
  }
  return out;
}
