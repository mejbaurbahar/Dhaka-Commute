import { useRef, useState, useEffect, useCallback } from 'react';
import { STATIONS, BUS_DATA } from '../../../constants';
import { T } from '../tokens';
import { askGeminiRoute, ChatMessage } from '../../../services/geminiService';
import { askGitHubModels } from '../../../services/githubModelsService';
import { getAllSessions, getSession, saveChatMessage, deleteSession } from '../../../services/chatHistoryManager';
import { getAuthUser } from '../../../services/communityDataService';
import { ALL_PLACES } from '../../../data/bangladeshPlaces';
import { findTransitRoutes, fuzzyMatchStop, formatTransitPlan } from '../../../services/transitPlanner';

export type Msg = { id: number; isUser: boolean; text: string; rich?: string };
export const INIT_MESSAGES: Msg[] = [{ id: 1, isUser: false, text: 'hello', rich: 'greeting' }];
export type RecentSession = { id: string; title: string; lastUpdated: number };

/**
 * Grounding: inject real bus routes, tourist/transport place data, and
 * multi-bus transit plans so the model answers from authoritative data.
 */
function buildRealDataContext(userText: string): string {
  const lower = userText.toLowerCase();
  const tokens = (lower.match(/[\p{L}\p{N}]{3,}/gu) || [])
    .filter(t => !['কি', 'কী', 'the', 'and', 'for', 'from', 'how', 'bus', 'what', 'where', 'কোন', 'কোথায়'].includes(t));

  const sections: string[] = [];

  // ── 1. Tourist / transport place lookup ──────────────────────────────────
  const PLACE_KEYWORDS = ['tourist', 'historical', 'museum', 'park', 'beach', 'fort', 'temple',
    'mosque', 'shrine', 'monument', 'airport', 'station', 'terminal', 'ghat', 'launch',
    'যাদুঘর', 'মসজিদ', 'দুর্গ', 'সমুদ্র', 'সৈকত', 'বিমানবন্দর', 'রেলওয়ে', 'লঞ্চ', 'ঘাট',
    'ঐতিহাসিক', 'পর্যটন', 'দর্শনীয়', 'বিখ্যাত', 'কোথায়', 'কীভাবে', 'দেখার', 'visit',
    'place', 'location', 'where', 'gps', 'coordinate', 'map',
  ];
  const isPlaceQuery = PLACE_KEYWORDS.some(kw => lower.includes(kw));

  if (isPlaceQuery || tokens.length > 0) {
    const placeMatches: { place: typeof ALL_PLACES[0]; score: number }[] = [];
    for (const place of ALL_PLACES) {
      let score = 0;
      const searchStr = (place.en + ' ' + place.bn + ' ' + (place.description ?? '') + ' ' + (place.district ?? '') + ' ' + (place.division ?? '')).toLowerCase();
      for (const tok of tokens) {
        if (searchStr.includes(tok)) score += (tok.length > 4 ? 3 : 2);
      }
      if (isPlaceQuery && score === 0) {
        // Even low-score matches for explicit place queries
        if (tokens.some(t => searchStr.includes(t))) score = 1;
      }
      if (score > 0) placeMatches.push({ place, score });
    }
    placeMatches.sort((a, b) => b.score - a.score);
    if (placeMatches.length > 0) {
      const picked = placeMatches.slice(0, 6);
      sections.push('[PLACES & TRANSPORT HUBS]\n' + picked.map(m => {
        const p = m.place;
        const gps = `GPS: ${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
        const iata = p.iata ? ` | IATA: ${p.iata}` : '';
        const fee = p.entryFee ? ` | Entry: ${p.entryFee}` : '';
        return `- ${p.en} (${p.bn}) [${p.type}] ${gps}${iata}${fee}${p.description ? ' — ' + p.description : ''}`;
      }).join('\n'));
    }
  }

  // ── 2. Bus route matches ──────────────────────────────────────────────────
  const busMatches: { bus: typeof BUS_DATA[0]; score: number }[] = [];
  for (const bus of BUS_DATA) {
    if (bus.active === false) continue;
    let score = 0;
    const name = (bus.name + ' ' + (bus.bnName || '')).toLowerCase();
    const route = bus.routeString.toLowerCase();
    const plateStr = ((bus as unknown as { plates?: string[] }).plates ?? []).join(' ').toLowerCase();
    for (const tok of tokens) {
      if (name.includes(tok)) score += 3;
      else if (route.includes(tok)) score += 2;
      else if (bus.stops.some(s => s.toLowerCase().includes(tok))) score += 1;
      else if (plateStr && plateStr.includes(tok)) score += 3; // exact plate match
    }
    if (score >= 3) busMatches.push({ bus, score });
  }
  busMatches.sort((a, b) => b.score - a.score);
  const busLines = busMatches.slice(0, 6);
  if (busLines.length >= 1) {
    sections.push('[BUS ROUTES]\n' + busLines
      .map(m => {
        const plates = (m.bus as unknown as { plates?: string[] }).plates;
        const plateInfo = plates && plates.length > 0 ? ` | Plates: ${plates.join(', ')}` : '';
        return `- ${m.bus.name}${m.bus.bnName ? ` (${m.bus.bnName})` : ''}: ${m.bus.routeString}${m.bus.type ? ` • ${m.bus.type}` : ''}${plateInfo}`;
      })
      .join('\n'));
  }

  // ── 3. Transit plan (multi-bus routing for "A to B" queries) ─────────────
  // Detect "from X to Y" or "X থেকে Y" patterns
  const FROM_TO_RE = /(?:from\s+|থেকে\s*)?([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s]{2,20?})\s+(?:to|→|যাব|যাওয়া|যেতে|to go)\s+([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s]{2,20?})/i;
  const ARROW_RE = /([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s]{2,15?})\s*(?:→|to|থেকে)\s*([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s]{2,15?})/i;

  let fromTok: string | null = null;
  let toTok: string | null = null;
  const m1 = userText.match(FROM_TO_RE);
  const m2 = userText.match(ARROW_RE);
  if (m1) { fromTok = m1[1].trim(); toTok = m1[2].trim(); }
  else if (m2) { fromTok = m2[1].trim(); toTok = m2[2].trim(); }

  if (fromTok && toTok) {
    const fromId = fuzzyMatchStop(fromTok);
    const toId = fuzzyMatchStop(toTok);
    if (fromId && toId && fromId !== toId) {
      const routes = findTransitRoutes(fromId, toId);
      if (routes.length > 0) {
        const plan = formatTransitPlan(fromTok, toTok, routes);
        sections.push(plan);
      }
    }
  }

  // ── 4. Metro context injection ─────────────────────────────────────────────
  const isMetroQuery = lower.includes('metro') || lower.includes('মেট্রো') || lower.includes('mrt') || lower.includes('subway');
  const isJourneyQuery = !!(fromTok && toTok) || lower.includes(' to ') || lower.includes('theke') || lower.includes('থেকে') || lower.includes('jabo') || lower.includes('যাব');
  if (isMetroQuery || isJourneyQuery) {
    sections.push(
      '[MRT-6 METRO — REAL STATIONS ONLY]\n' +
      'Operating line: Uttara North → Uttara Center → Uttara South → Pallabi → Mirpur 11 → Mirpur 10 → Kazipara → Shewrapara → Agargaon → Bijoy Sarani → Farmgate → Kawran Bazar → Shahbag → Dhaka University → Secretariat → Motijheel → Kamalapur\n' +
      'Fare: ৳20–100 | Hours (Mon-Thu, Sat-Sun): First train 6:30 AM, Last 9:50 PM | FRIDAY: starts 2:30 PM (NOT closed, delayed start)\n' +
      'NO metro in: Gulshan, Banani, Dhanmondi, Mohammadpur, Savar, Jatrabari, Tejgaon, Rayer Bazar\n' +
      'Shaheed Minar = 500m walk from Shahbag Metro. Central Shaheed Minar → nearest metro: Shahbag (5 min walk).\n' +
      'RULE: Only suggest metro if origin or destination is within 1km of an MRT-6 station above.'
    );
  }

  // ── 5. Airport / flight grounding ─────────────────────────────────────────
  const isFlightQuery = lower.includes('flight') || lower.includes('fly') || lower.includes('plane') || lower.includes('air') ||
    lower.includes('বিমান') || lower.includes('ফ্লাইট') || lower.includes('উড়োজাহাজ') || lower.includes('এয়ার');
  const isAirportPlace = lower.includes('airport') || lower.includes('বিমানবন্দর');
  const mentionsKhulna = lower.includes('khulna') || lower.includes('খুলনা');
  const mentionsBenapole = lower.includes('benapole') || lower.includes('বেনাপোল');
  const mentionsJashore = lower.includes('jashore') || lower.includes('jessore') || lower.includes('যশোর');

  if (isFlightQuery || isAirportPlace || mentionsKhulna || mentionsBenapole || mentionsJashore) {
    sections.push(
      '[BANGLADESH AIRPORTS — VERIFIED REAL DATA]\n' +
      'AIRPORTS THAT EXIST (domestic flights operate):\n' +
      '1. Dhaka — Hazrat Shahjalal International Airport (DAC/VGHS)\n' +
      '2. Chattogram — Shah Amanat International Airport (CGP)\n' +
      '3. Sylhet — Osmani International Airport (ZYL)\n' +
      "4. Cox's Bazar — Cox's Bazar Airport (CXB)\n" +
      '5. Jashore — Jashore Airport (JSR) — serves Khulna region AND Benapole\n' +
      '6. Saidpur — Saidpur Airport (SPD) — serves Rangpur/Dinajpur\n' +
      '7. Barishal — Barishal Airport (BZL)\n' +
      '8. Rajshahi — Shah Makhdum Airport (RJH)\n' +
      '\n⚠️ CRITICAL FACTS — NEVER CONTRADICT:\n' +
      '• Khulna city has NO airport. ZERO. The nearest airport is Jashore (JSR), ~60km from Khulna city.\n' +
      '• NEVER say "flights to Khulna" — say "fly to Jashore (nearest airport to Khulna), then bus/CNG to Khulna (~1.5 hrs)".\n' +
      '• Benapole has NO airport. Nearest = Jashore Airport (JSR), ~18-20 km by road from Benapole border.\n' +
      '• To reach Benapole by air: fly Dhaka → Jashore (40 min, ৳5000-9000), then CNG/auto to Benapole (~18-20km, ~35-45 min, ৳400-500).\n' +
      '\nDomestic routes from Dhaka:\n' +
      '• Dhaka → Jashore (JSR): US-Bangla, Biman, Air Astra | 40 min | ৳4500-9000\n' +
      '• Dhaka → Chattogram: 45 min | Dhaka → Sylhet: 45 min | Dhaka → Cox\'s Bazar: 55 min\n' +
      '• Dhaka → Saidpur: 45 min | Dhaka → Barishal: 40 min | Dhaka → Rajshahi: 45 min'
    );
  }

  if (mentionsBenapole) {
    sections.push(
      '[BENAPOLE — VERIFIED ROUTE DATA]\n' +
      'Benapole is in Jashore district, SW Bangladesh. Bangladesh-India land border crossing.\n' +
      'WAYS TO REACH BENAPOLE FROM DHAKA:\n' +
      '🚂 Train: Benapole Express 795/796 — Dhaka Kamalapur → Benapole — departs 11:30 PM (overnight), arrives ~7:00 AM, ~8 hrs via Faridpur-Kushtia-Jessore — Shuvan ৳310, Shuvan Chair ৳415, Snigdha ৳617, AC Berth ৳1285\n' +
      '  Also: Ruposhi Bangla Express 827/828 — departs 10:45 AM, arrives ~2:25 PM, via Narail — Shuvan ৳310\n' +
      '🚌 Bus: Shyamoli, Hanif — Dhaka Gabtoli/Kalyanpur → Benapole — ~6-8 hrs via Padma Bridge — ৳500-900\n' +
      '✈️ Via Air: Fly Dhaka → Jashore Airport (40 min, ৳5000-9000) → CNG to Benapole (~18-20km, ~35-45 min, ৳400-500) — fastest but most expensive\n' +
      '🚌 From Jashore town to Benapole: Local bus/tempo/CNG ~30 min, ৳20-50\n' +
      '🛂 Border: Bangladesh Immigration open daily. Indian side: Petrapole. Carry passport/travel docs.'
    );
  }

  // ── 6. Intercity bus fares & terminals (2026 BRTA) ───────────────────────
  const isInterCityQuery = lower.includes('intercity') || lower.includes('inter-city') ||
    lower.includes('how to go') || lower.includes('how to reach') || lower.includes('কিভাবে যাব') ||
    lower.includes('যেতে চাই') || lower.includes('jabo') || lower.includes('যাবো') ||
    lower.includes('bus fare') || lower.includes('ভাড়া') || lower.includes('দূরত্ব');

  const mentionsChittagong = lower.includes('chittagong') || lower.includes('chattogram') || lower.includes('চট্টগ্রাম');
  const mentionsSylhet = lower.includes('sylhet') || lower.includes('সিলেট');
  const mentionsRajshahi = lower.includes('rajshahi') || lower.includes('রাজশাহী');
  const mentionsBarishal = lower.includes('barishal') || lower.includes('barisal') || lower.includes('বরিশাল');
  const mentionsRangpur = lower.includes('rangpur') || lower.includes('রংপুর');
  const mentionsMymensingh = lower.includes('mymensingh') || lower.includes('ময়মনসিংহ');
  const mentionsCoxBazar = lower.includes("cox") || lower.includes('কক্সবাজার');
  const mentionsLaunch = lower.includes('launch') || lower.includes('লঞ্চ') || lower.includes('sadarghat') || lower.includes('সদরঘাট') || lower.includes('ferry') || mentionsBarishal;

  if (isInterCityQuery || mentionsChittagong || mentionsSylhet || mentionsRajshahi ||
      mentionsBarishal || mentionsRangpur || mentionsMymensingh || mentionsCoxBazar) {
    sections.push(
      '[INTERCITY BUS FARES — BRTA 2026 OFFICIAL RATES]\n' +
      'Terminal: Sayedabad (SE), Gabtoli (W/NW), Mohakhali (N)\n' +
      '• Dhaka→Chittagong: ৳704 (51-seat) | Sayedabad | ~5-6 hrs | Shyamoli, Hanif\n' +
      '• Dhaka→Sylhet: ৳580-740 | Sayedabad | ~6-7 hrs | Shyamoli, Hanif\n' +
      '• Dhaka→Rajshahi: ৳777-991 | Gabtoli | ~5-6 hrs | Hanif, National\n' +
      '• Dhaka→Barishal: ৳464-592 | Sayedabad | ~5 hrs via Padma Bridge | Shohagh\n' +
      '• Dhaka→Khulna: ৳700-1200 | Gabtoli or Kalyanpur | ~7-9 hrs | Hanif\n' +
      '• Dhaka→Rangpur: ৳751-911 | Gabtoli | ~7-8 hrs\n' +
      "• Dhaka→Cox's Bazar: ৳900-1147 | Sayedabad | ~10-12 hrs | Green Line, Shyamoli\n" +
      '• Dhaka→Mymensingh: ৳294-375 | Mohakhali | ~2.5-3 hrs\n' +
      '• Dhaka→Panchagarh: ৳1005-1281 | Gabtoli | ~9-10 hrs\n' +
      'Online booking: shohoz.com | Fare increased April 2026 by 11 paisa/km'
    );
  }

  if (mentionsLaunch) {
    sections.push(
      '[SADARGHAT LAUNCH ROUTES — VERIFIED REAL DATA]\n' +
      'Terminal: Sadarghat Launch Ghat, Dhaka (Old Dhaka)\n' +
      '• Dhaka→Barishal: departs 6:00-8:00 PM | 11 hrs overnight | Deck ৳280-350, Cabin ৳900-1500, VIP ৳2000-6000\n' +
      '  Launches: MV Sundarban (various, e.g. MV Sundarban 8, 10, 12), MV Parabat, MV Kirtonkhola\n' +
      '• Dhaka→Patuakhali: departs 6:00/7:30 PM | 11 hrs | Deck ৳280-300, Cabin ৳1100-1300\n' +
      '• Dhaka→Bhola: departs 7:00-8:00 PM | 10 hrs | Deck ৳200-280, Cabin ৳700-1100\n' +
      '• Dhaka→Chandpur: departs 8:00 AM & 2:00 PM | 3-4 hrs (daytime) | Deck ৳120-200, Cabin ৳300-500\n' +
      '  Launches: MV Ostrich, MV Rocket (paddle steamer), MV Meghna-1\n' +
      '• Dhaka→Khulna: overnight ~10-12 hrs\n' +
      'RULE: For Barishal/Bhola/Patuakhali — always mention launch as the scenic overnight option alongside bus.'
    );
  }

  // ── 7. Train route grounding ──────────────────────────────────────────────
  const isTrainQuery = lower.includes('train') || lower.includes('ট্রেন') || lower.includes('railway') ||
    lower.includes('express') || lower.includes('এক্সপ্রেস') || lower.includes('kamalapur') || lower.includes('কমলাপুর') ||
    mentionsCoxBazar;

  if (isTrainQuery) {
    sections.push(
      '[BANGLADESH TRAIN ROUTES — KEY DATA]\n' +
      '• Dhaka→Chittagong: Sonar Bangla Express 788, Turna, Mohanagar Goduli | 5-6 hrs | Shuvan ৳310, AC Berth ৳1890\n' +
      '  (Subarna Express 701 runs Chittagong→Dhaka direction, departs CTG 7:00 AM → Dhaka 11:55 AM)\n' +
      '• Dhaka→Sylhet: Upaban Express, Jayantika, Kalni, Parabat, Surma Mail | 6.5-7.5 hrs | Shuvan ৳265, AC Berth ৳1678\n' +
      "• Dhaka→Cox's Bazar: Cox's Bazar Express, Parjatak | overnight\n" +
      '• Dhaka→Rajshahi: Silk City, Padma Express, Dhumketu, Banalata | Shuvan ৳390, AC Berth ৳1600\n' +
      '• Dhaka→Khulna: Sundarban Express, Chitra Express | 9 hrs | Shuvan ৳390, AC Berth ৳1900\n' +
      '• Dhaka→Mymensingh: Tista Express, Agnibina, Brahmaputra, Jamuna | Shuvan ৳110\n' +
      '• Dhaka→Benapole: Benapole Express 795/796 (departs 11:30 PM overnight, arrives ~7:00 AM, ~8 hrs, via Faridpur-Kushtia-Jessore) | Shuvan ৳310, Shuvan Chair ৳415, Snigdha ৳617, AC Berth ৳1285\n' +
      '  ALSO: Ruposhi Bangla Express 827/828 (departs 10:45 AM, arrives ~2:25 PM, via Narail, Shuvan ৳310) | Book: eticket.railway.gov.bd\n' +
      '• Dhaka→Rangpur: Rangpur Express, Kurigram Express\n' +
      '• Dhaka→Barishal: NO DIRECT TRAIN — use launch or bus\n' +
      'Book: eticket.railway.gov.bd | Opens 10 days ahead | Pay: bKash, Nagad, Rocket | ৳20 service charge'
    );
  }

  // ── 8. Domestic air travel grounding ─────────────────────────────────────
  const isAirQuery = lower.includes('flight') || lower.includes('ফ্লাইট') ||
    lower.includes('বিমান') || lower.includes('plane') || lower.includes('air ticket') ||
    lower.includes('বিমান ভাড়া') || lower.includes('airport') || lower.includes('বিমানবন্দর') ||
    lower.includes('novoair') || lower.includes('us-bangla') || lower.includes('sharetrip') ||
    lower.includes('gozayaan') || lower.includes('domestic') || lower.includes('শাহজালাল') ||
    lower.includes('shahjalal') || lower.includes('biman') || mentionsCoxBazar;

  if (isAirQuery) {
    sections.push(
      '[BANGLADESH DOMESTIC FLIGHTS — 2026 DATA]\n' +
      'All domestic flights depart from Hazrat Shahjalal Airport (DAC), Dhaka\n' +
      '• Dhaka→Cox\'s Bazar (CXB): ~45 min | ৳3000-8000 | 4-6 flights/day | Biman, US-Bangla, Novoair, Air Astra\n' +
      '• Dhaka→Chittagong (CGP): ~40 min | ৳3000-6500 | 8-10 flights/day (busiest route)\n' +
      '• Dhaka→Sylhet Osmani (ZYL): ~40 min | ৳3500-7000 | 3-4 flights/day\n' +
      '• Dhaka→Jessore (JSR): ~40 min | ৳2500-5500 | 2-3 flights/day\n' +
      '• Dhaka→Rajshahi (RJH): ~40 min | ৳3000-6000 | 2-3 flights/day\n' +
      '• Dhaka→Barishal (BZL): limited schedule | ৳3000-5500 | check biman.com.bd\n' +
      'Book via: ShareTrip (sharetrip.net), GoZayaan (gozayaan.com), Shohoz, biman.com.bd\n' +
      'Airport arrival: domestic 90 min early | international 3 hrs early\n' +
      'From airport to city: BRTC AC bus ৳50-80 | CNG ৳200-400 | Uber/Pathao ৳350-600\n' +
      'Best airlines: US-Bangla (most punctual) | Novoair (reliable) | Biman (cheapest)\n' +
      'ALSO: Train to Cox\'s Bazar — Cox\'s Bazar Express (813/814) from Kamalapur ~8h20m, Shuvan Chair ৳535, AC Berth ৳1591'
    );
  }

  // ── 9. Dhaka local city bus grounding ────────────────────────────────────
  const isLocalBusQuery = lower.includes('local bus') || lower.includes('লোকাল বাস') ||
    lower.includes('city bus') || lower.includes('student fare') || lower.includes('স্টুডেন্ট ভাড়া') ||
    lower.includes('brtc') || lower.includes('abdullahpur') || lower.includes('আব্দুল্লাহপুর') ||
    lower.includes('minimum fare') || lower.includes('সর্বনিম্ন ভাড়া') || lower.includes('ঢাকা শহর') ||
    lower.includes('gulistan') || lower.includes('গুলিস্তান');

  if (isLocalBusQuery) {
    sections.push(
      '[DHAKA CITY LOCAL BUS — 2026 FARE GUIDE]\n' +
      'City bus fare (BRTA 2026): Minimum ৳10 (0-2 km), then ৳2/km\n' +
      '• Uttara/Abdullahpur → Gulistan: ৳30-40 | 45-70 min\n' +
      '• Mirpur 10 → Motijheel: ৳25-30 | 40-60 min\n' +
      '• Mohakhali → Sadarghat: ৳20-25 | 30-45 min\n' +
      '• Gazipur → Gulistan: ৳60-80 | 1.5-2 hrs\n' +
      '• BRTC AC buses: ৳50-100 flat | Major corridors\n' +
      'Student discount (50%): ONLY on BRTC government buses with valid student ID card\n' +
      'Payment: Cash only — no card or mobile payment accepted\n' +
      'Bus apps: KoyJabo app shows local bus routes by stop/area\n' +
      'Mymensingh→Dhaka (Mohakhali): ৳150-200 | ~2.5-3 hrs\n' +
      'Kishoreganj→Dhaka (Mohakhali/Sayedabad): ৳200-250 | ~3-4 hrs\n' +
      'Dhaka→Khulna (Gabtoli): Non-AC ৳500-700 | AC ৳800-1200 | ~5-6 hrs'
    );
  }

  if (sections.length === 0) return '';
  return sections.join('\n\n');
}

// Find nearest station name from GPS coords using all known STATIONS
export function nearestArea(lat: number, lng: number): string {
  const stationList = Object.values(STATIONS).filter((s: any) => s.lat && s.lng);
  let best: any = stationList[0];
  let bestDist = Infinity;
  for (const s of stationList as any[]) {
    const d = (s.lat - lat) ** 2 + (s.lng - lng) ** 2;
    if (d < bestDist) { bestDist = d; best = s; }
  }
  return best?.name || 'Dhaka';
}

export const SUGGESTIONS = [
  { bn: 'কোন বাস গুলশান থেকে মতিঝিল?', en: 'Bus Gulshan to Motijheel?' },
  { bn: 'বিমানবন্দর → ফার্মগেট', en: 'Airport → Farmgate' },
  { bn: 'সদরঘাট লঞ্চ সময়', en: 'Sadarghat launch times' },
  { bn: 'মেট্রো সময়সূচি', en: 'Metro schedule' },
];

/**
 * Shared AI chat state: used by the full /ai page and by the global chat modal.
 * Owns messages, session persistence, GPS-aware "from" detection and the send
 * pipeline. DOM-only concerns (auto-scroll, input element) live in AIChatBody.
 */
export function useAIChat(lang: 'bn' | 'en', initialQ?: string) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>(INIT_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  // Sync guard — state isLoading updates async, so rapid double-sends would
  // both pass the check and split one conversation into two sessions.
  const sendingRef = useRef(false);
  const userAreaRef = useRef<string>('');
  const chatUser = getAuthUser();
  // History isolation: every read/write is scoped to the signed-in user's id —
  // a user can never see another user's conversations.
  const historyUid = chatUser?.id ?? null;
  const userAvatarUrl = chatUser?.avatarUrl;
  const userInitials = (chatUser?.displayName || chatUser?.username || 'KJ').slice(0, 2).toUpperCase();

  useEffect(() => {
    if (!initialQ) return;
    setInput(initialQ);
    send(initialQ);
  }, [initialQ]);

  useEffect(() => {
    // Warm-up: load cached area and refresh GPS in background
    const consent = localStorage.getItem('kj-location-consent');
    const stored = localStorage.getItem('kj-location-area');
    if (stored) userAreaRef.current = stored;
    if (consent !== 'yes' || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
        userAreaRef.current = area;
        localStorage.setItem('kj-location-area', area);
      },
      () => {},
      { timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  // Returns cached area immediately, or fetches fresh GPS (max 6 s) if cache is empty.
  // Resolves with null when GPS is denied, unavailable, or timed out.
  function getOrFetchArea(): Promise<string | null> {
    if (userAreaRef.current) return Promise.resolve(userAreaRef.current);
    if (!navigator.geolocation) return Promise.resolve(null);
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
          userAreaRef.current = area;
          localStorage.setItem('kj-location-area', area);
          localStorage.setItem('kj-location-consent', 'yes');
          resolve(area);
        },
        () => resolve(null),
        { timeout: 6000, maximumAge: 60000 }
      );
    });
  }

  const [showAllRecents, setShowAllRecents] = useState(false);
  const [allRecents, setAllRecents] = useState<RecentSession[]>(() =>
    getAllSessions(historyUid).slice().sort((a, b) => b.lastUpdated - a.lastUpdated)
      .map(s => ({ id: s.id, title: s.messages.find(m => m.role === 'user')?.text || T(lang, 'নতুন কথোপকথন', 'New conversation'), lastUpdated: s.lastUpdated }))
  );
  const recents = showAllRecents ? allRecents : allRecents.slice(0, 5);

  function refreshRecents() {
    setAllRecents(getAllSessions(historyUid).slice().sort((a, b) => b.lastUpdated - a.lastUpdated)
      .map(s => ({ id: s.id, title: s.messages.find(m => m.role === 'user')?.text || T(lang, 'নতুন কথোপকথন', 'New conversation'), lastUpdated: s.lastUpdated })));
  }

  function loadSession(id: string) {
    const session = getSession(id, historyUid);
    if (!session) return;
    setSessionId(id);
    const msgs: Msg[] = session.messages.map((m, i) => ({ id: i, isUser: m.role === 'user', text: m.text }));
    setMessages(msgs.length ? msgs : INIT_MESSAGES);
  }

  function handleDeleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    deleteSession(id, historyUid);
    setAllRecents(prev => prev.filter(r => r.id !== id));
    if (sessionId === id) { setSessionId(null); setMessages(INIT_MESSAGES); }
  }

  function startNew() {
    setSessionId(null);
    setMessages(INIT_MESSAGES);
    setInput('');
  }

  const send = useCallback(async (prefill?: string) => {
    const text = prefill ?? input;
    if (!text.trim() || isLoading || sendingRef.current) return;
    sendingRef.current = true;
    const userText = text.trim();
    const userMsg = { id: Date.now(), isUser: true, text: userText };
    setMessages(m => [...m, userMsg]);
    const nextSessionId = saveChatMessage({ role: 'user', text: userText, timestamp: Date.now() } as any, sessionId, historyUid);
    setSessionId(nextSessionId);
    setInput('');
    setIsLoading(true);
    refreshRecents();
    try {
      const currentMessages = [...messages, userMsg];
      const chatHistory: ChatMessage[] = currentMessages
        .filter(m => !(m as any).rich)
        .map(m => ({ role: m.isUser ? 'user' : 'assistant', text: m.text }));

      const hasFrom = /\bfrom\b|থেকে|হতে/i.test(userText);

      // Extract destination from "how to go X", "want to go X", "jeta chai X" etc.
      function extractGoToDest(q: string): string | null {
        const m = q.match(
          /(?:how\s+(?:to\s+)?(?:go|get)\s+(?:to\s+)?|route\s+to\s+|reach\s+|take\s+me\s+to\s+|go\s+to\s+|directions?\s+to\s+|best\s+(?:bus|way)\s+(?:to|for)\s+|nearest\s+way\s+to\s+|how\s+can\s+i\s+(?:get\s+to|reach)\s+|(?:i\s+)?want\s+to\s+go(?:\s+to)?\s+|(?:i\s+)?want\s+to\s+visit\s+|(?:i\s+)?need\s+to\s+go(?:\s+to)?\s+|(?:i\s+)?(?:am|m)\s+going(?:\s+to)?\s+)([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s']{1,40})(?:\?|।|,|$)/i
        ) || q.match(/(?:কিভাবে\s+যাব[োে]?\s+|যেতে\s+চাই\s+|যাবো?\s+কিভাবে\s+|জেতে\s+চাই\s+|jeta\s+chai\s*,?\s*|jabo\s+|jete\s+chai\s+|jaite\s+chai\s+)([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s']{1,40})(?:\?|।|,|$)/i);
        return m ? m[1].trim().replace(/[?।,]$/, '').trim() : null;
      }

      const goToDest = !hasFrom ? extractGoToDest(userText) : null;
      const isNavIntent = !hasFrom && goToDest !== null;

      // When nav-intent is detected and no cached area, proactively fetch GPS now.
      let area = userAreaRef.current;
      if (isNavIntent && !area) {
        area = await getOrFetchArea() ?? '';
      }

      // If still no area after GPS attempt, ask user to specify origin
      if (isNavIntent && !area && goToDest) {
        const noLocMsg = lang === 'bn'
          ? `📍 আপনার বর্তমান অবস্থান জানতে পারছি না।\n\n**${goToDest}** যেতে চান, কিন্তু আপনি কোথা থেকে যাচ্ছেন? একটু বলুন — যেমন: 'মিরপুর থেকে ${goToDest}' বা 'ফার্মগেট থেকে ${goToDest}'।`
          : `📍 I couldn't detect your current location.\n\nYou want to go to **${goToDest}** — where are you starting from? Try: 'Mirpur to ${goToDest}' or 'Farmgate to ${goToDest}'.`;
        saveChatMessage({ role: 'assistant', text: noLocMsg, timestamp: Date.now() } as any, nextSessionId, historyUid);
        setMessages(m => [...m, { id: Date.now() + 1, isUser: false, text: noLocMsg }]);
        return;
      }

      let queryForOffline: string;
      if (area && goToDest) {
        // Build unambiguous "FROM to DEST" — prevents positional reversal
        queryForOffline = `${area} to ${goToDest} [Context: User is in ${area} area]`;
      } else if (!hasFrom && area) {
        queryForOffline = `${userText} from ${area} [Context: User is in ${area} area]`;
      } else {
        queryForOffline = userText;
      }

      // Ground the answer in KoyJabo's real dataset — never let the model
      // invent routes/fares. Injected as authoritative context.
      const realData = buildRealDataContext(userText);
      const groundedMessage = realData
        ? `${userText}\n\n[REAL BUS DATA from koyjabo.com — authoritative. Answer ONLY from this list and the data in your instructions; never invent a bus, stop, or fare not listed here. If nothing in this list matches, say you're not sure.]\n${realData}`
        : userText;

      let response: string;
      try {
        response = await askGitHubModels(groundedMessage, chatHistory);
      } catch {
        // Greet by the logged-in user's real name — never a hardcoded one
        const chatUserName = chatUser?.displayName || chatUser?.username || undefined;
        response = await askGeminiRoute(queryForOffline, undefined, chatHistory, chatUserName);
        // Prepend "Your current location" when GPS was injected and area not already in response
        if (!hasFrom && area && response && !response.includes(area)) {
          const prefix = lang === 'bn'
            ? `📍 **আপনার বর্তমান অবস্থান:** ${area}\n\n`
            : `📍 **Your current location:** ${area}\n\n`;
          response = prefix + response;
        }
      }
      saveChatMessage({ role: 'assistant', text: response, timestamp: Date.now() } as any, nextSessionId, historyUid);
      setMessages(m => [...m, { id: Date.now() + 1, isUser: false, text: response }]);
    } catch {
      setMessages(m => [...m, { id: Date.now() + 1, isUser: false, text: T(lang, 'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'Sorry, something went wrong. Please try again.') }]);
    } finally {
      sendingRef.current = false;
      setIsLoading(false);
    }
  }, [input, isLoading, messages, sessionId, lang, chatUser]);

  return {
    input, setInput, messages, isLoading, send,
    sessionId, setSessionId, setMessages,
    userAvatarUrl, userInitials,
    allRecents, recents, showAllRecents, setShowAllRecents,
    loadSession, handleDeleteSession, startNew,
  };
}
