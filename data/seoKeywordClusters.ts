/**
 * KoyJabo SEO/AEO keyword clusters (Aug 2026).
 *
 * Source honesty: this file is derived from (a) public Google/Bing autosuggest
 * patterns for Bangladesh transport queries, (b) KoyJabo's own FB Messenger
 * automation inbound signals (aggregate query categories only — no private
 * message content is stored or mined), and (c) transport domain knowledge.
 * Demand scores are relative estimates for internal prioritization, NOT
 * scraped metrics — they rank clusters against each other, not against
 * external tools. No private content; no access-control bypass.
 *
 * Intent taxonomy: navigational (find a thing) / informational (how, fare,
 * time) / transactional (book, buy) / comparison (vs, which is better).
 */

export type SearchIntent = 'navigational' | 'informational' | 'transactional' | 'comparison';

export interface KeywordCluster {
  id: string;
  intent: SearchIntent;
  /** Head term — what the page/AI chat should rank for. */
  head: string;
  /** Bangla head term (equivalent search weight in BD). */
  headBn: string;
  /** Demand 1-100, relative estimate (internal prioritization only). */
  demand: number;
  /** KoyJabo surface that answers this intent. */
  surfaces: string[];
  /** Example long-tail variants — bilingually. */
  longTail: { en: string; bn: string }[];
  /** Why this cluster matters (evidence note). */
  rationale: string;
}

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    id: 'k_bus_fare_dhaka_chittagong',
    intent: 'informational',
    head: 'Dhaka to Chittagong bus fare',
    headBn: 'ঢাকা থেকে চট্টগ্রাম বাস ভাড়া',
    demand: 95,
    surfaces: ['AI chat', 'bus search', 'bus-fare pages', 'Hub SEO pages'],
    longTail: [
      { en: 'Dhaka to Chittagong bus fare 2026', bn: 'ঢাকা চট্টগ্রাম বাস ভাড়া কত' },
      { en: 'Sayedabad to Chittagong bus price', bn: 'সায়েদাবাদ থেকে চট্টগ্রাম বাস ভাড়া' },
      { en: 'Green Line Dhaka Chittagong ticket price', bn: 'গ্রিন লাইন চট্টগ্রাম বাসের ভাড়া' },
    ],
    rationale: 'Highest-volume BD intercity corridor; BRTA 2026 fare (৳704 51-seat) verified — answer exists in data.',
  },
  {
    id: 'k_bus_fare_dhaka_sylhet',
    intent: 'informational',
    head: 'Dhaka to Sylhet bus fare',
    headBn: 'ঢাকা থেকে সিলেট বাস ভাড়া',
    demand: 90,
    surfaces: ['AI chat', 'bus search', 'Hub SEO pages'],
    longTail: [
      { en: 'Dhaka Sylhet bus time schedule', bn: 'ঢাকা সিলেট বাসের সময়সূচি' },
      { en: 'Sylhet AC bus price from Dhaka', bn: 'সিলেট এসি বাস ভাড়া' },
    ],
    rationale: 'Second-highest volume corridor; Hanif/Green Line/Ena verified in data.',
  },
  {
    id: 'k_train_dhaka_chattogram',
    intent: 'informational',
    head: 'Dhaka to Chittagong train schedule',
    headBn: 'ঢাকা চট্টগ্রাম ট্রেনের সময়সূচি',
    demand: 92,
    surfaces: ['AI chat', 'train search', 'Hub SEO pages'],
    longTail: [
      { en: 'Subarna Express Dhaka Chittagong time', bn: 'সুবর্ণ এক্সপ্রেস সময়সূচি' },
      { en: 'Chittagong train ticket price', bn: 'চট্টগ্রাম ট্রেনের ভাড়া' },
    ],
    rationale: 'Search-alias fix now matches চট্টগ্রাম; train data 150 routes verified.',
  },
  {
    id: 'k_metro_fare',
    intent: 'informational',
    head: 'Metro rail fare Dhaka',
    headBn: 'মেট্রোরেল ভাড়া ঢাকা',
    demand: 88,
    surfaces: ['AI chat', 'metro search', 'MRT-6 page'],
    longTail: [
      { en: 'Uttara to Motijheel metro fare', bn: 'উত্তরা থেকে মতিঝিল মেট্রো ভাড়া' },
      { en: 'MRT-6 last train time', bn: 'মেট্রোরেল শেষ ট্রেন কয়টায়' },
    ],
    rationale: 'MRT-6 fully live; fare table grounded in data (eval case).',
  },
  {
    id: 'k_flight_domestic',
    intent: 'comparison',
    head: 'Dhaka to Cox\'s Bazar flight price',
    headBn: 'ঢাকা কক্সবাজার ফ্লাইটের ভাড়া',
    demand: 85,
    surfaces: ['AI chat', 'flight search', 'flight pages'],
    longTail: [
      { en: 'Biman vs US-Bangla Dhaka Cox\'s Bazar', bn: 'ঢাকা কক্সবাজার কোন ফ্লাইট ভালো' },
      { en: 'Sylhet flight ticket price', bn: 'সিলেট ফ্লাইট ভাড়া' },
    ],
    rationale: '93 flight rows verified with real flight numbers (BG433, 2A431, BS531…).',
  },
  {
    id: 'k_launch_barisal',
    intent: 'informational',
    head: 'Dhaka to Barishal launch schedule',
    headBn: 'ঢাকা বরিশাল লঞ্চের সময়সূচি',
    demand: 78,
    surfaces: ['AI chat', 'launch search'],
    longTail: [
      { en: 'Sadarghat launch time Barishal', bn: 'সদরঘাট লঞ্চের সময়' },
      { en: 'Rocket steamer ticket price', bn: 'রকেট স্টিমার ভাড়া' },
    ],
    rationale: '50 launch routes + verified Green Line day service 08:00.',
  },
  {
    id: 'k_benapole_border',
    intent: 'navigational',
    head: 'How to go to Benapole from Dhaka',
    headBn: 'ঢাকা থেকে বেনাপোল যাওয়ার উপায়',
    demand: 82,
    surfaces: ['AI chat', 'bus search', 'nearest-boarding flow'],
    longTail: [
      { en: 'Dhaka Benapole bus from Kallyanpur', bn: 'কল্যাণপুর থেকে বেনাপোল বাস' },
      { en: 'Benapole border bus fare', bn: 'বেনাপোল বর্ডার বাস ভাড়া' },
    ],
    rationale: 'Border travel = high-intent; nearest-useful-node routing (Kallyanpur) is a differentiated answer.',
  },
  {
    id: 'k_ferry_crossing',
    intent: 'informational',
    head: 'Is Mawa Shimulia ferry running',
    headBn: 'মাওয়া শিমুলিয়া ফেরি কি চলে',
    demand: 70,
    surfaces: ['AI chat'],
    longTail: [
      { en: 'Paturia Daulatdia ferry schedule', bn: 'পাটুরিয়া দৌলতদিয়া ফেরি সময়' },
      { en: 'Padma Bridge bus route', bn: 'পদ্মা সেতু দিয়ে বাস' },
    ],
    rationale: 'Correctness-critical: Mawa-Shimulia discontinued 2022 — AI must say so (eval case).',
  },
  {
    id: 'k_local_bus_route',
    intent: 'navigational',
    head: 'Dhaka local bus route list',
    headBn: 'ঢাকার লোকাল বাস রুট',
    demand: 90,
    surfaces: ['AI chat', 'local bus search', 'station pages'],
    longTail: [
      { en: 'Hemayetpur to Mohammadpur bus', bn: 'হেমায়েতপুর থেকে মোহাম্মদপুর বাস' },
      { en: 'Airport to Gulshan bus number', bn: 'বিমানবন্দর থেকে গুলশান বাস' },
      { en: 'Mirpur 10 to Cox\'s Bazar bus', bn: 'মিরপুর ১০ থেকে কক্সবাজার বাস' },
    ],
    rationale: '774 stations + 458 local routes; nearest-useful-node chaining verified for these exact journeys.',
  },
  {
    id: 'k_transit_routing',
    intent: 'transactional',
    head: 'Best route from A to B in Bangladesh',
    headBn: 'কীভাবে যাব',
    demand: 96,
    surfaces: ['AI chat', 'search', 'multimodal transit groups'],
    longTail: [
      { en: 'Bus or train Dhaka to Khulna', bn: 'ঢাকা খুলনা বাস না ট্রেন' },
      { en: 'Fastest way Dhaka to Cox\'s Bazar', bn: 'ঢাকা থেকে কক্সবাজার দ্রুততম উপায়' },
    ],
    rationale: 'The app\'s core promise — multimodal answer (bus/rail/air/launch) with boarding-point ranking.',
  },
];

const TOKEN_RE = /[^a-z0-9'’`ঀ-৿]+/;

/** Match a query against a cluster's head terms only (en + bn). */
function headTokens(c: KeywordCluster): string[] {
  return [c.head, c.headBn].join(' ').toLowerCase().split(TOKEN_RE).filter(Boolean);
}

/**
 * Demand score for a query: best-matching cluster head, else 0.
 * Requires ≥50% of query tokens to appear in a cluster's head phrase —
 * stops generic words ('time', 'is') from false-positive matching.
 */
export function seoDemandScore(query: string): number {
  const qTokens = query.toLowerCase().split(TOKEN_RE).filter(Boolean);
  if (!qTokens.length) return 0;

  let best = 0;
  for (const c of KEYWORD_CLUSTERS) {
    const heads = headTokens(c);
    const matched = qTokens.filter(t => heads.includes(t)).length;
    const ratio = matched / qTokens.length;
    if (ratio >= 0.5) best = Math.max(best, Math.round(c.demand * ratio));
  }
  return best;
}
