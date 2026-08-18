import { STATIONS } from '../../../constants';
import { INTERCITY_BUS_ROUTES, MAJOR_TRANSPORT_HUBS } from '../../../data/intercityData';
import { resolveStationId } from './localBusRouting';

/**
 * Nearest-useful-node routing for intercity journeys.
 *
 * When a user asks "Gulshan 1 → Benapole", the old behavior implied a famous
 * terminal (e.g. Gabtoli). Instead we rank the Dhaka intercity boarding
 * points by (a) whether they actually serve the destination, then (b) road
 * distance from the user's area — so the closest useful terminal wins.
 */

export interface BoardingTerminal {
  terminalId: string;
  name: string;
  bnName: string;
  distKm: number;
  serves: string[];
}

// Known Dhaka intercity boarding points that exist in STATIONS
const TERMINALS: { id: string; name: string; bnName: string }[] = [
  { id: 'sayedabad', name: 'Sayedabad', bnName: 'সায়েদাবাদ' },
  { id: 'gabtoli', name: 'Gabtoli', bnName: 'গাবতলী' },
  { id: 'mohakhali', name: 'Mohakhali', bnName: 'মহাখালী' },
  { id: 'kallyanpur', name: 'Kallyanpur', bnName: 'কল্যাণপুর' },
  { id: 'abdullahpur', name: 'Abdullahpur', bnName: 'আবদুল্লাহপুর' },
  { id: 'airport', name: 'Airport', bnName: 'বিমানবন্দর' },
];

function havKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Map terminal names as written in route strings ("Dhaka (Gabtoli/Nabinagar) ⇄ …") to station ids
const TERMINAL_NAME_TO_ID: Record<string, string> = {
  gabtoli: 'gabtoli',
  kallyanpur: 'kallyanpur',
  kalyanpur: 'kallyanpur',
  sayedabad: 'sayedabad',
  mohakhali: 'mohakhali',
  abdullahpur: 'abdullahpur',
  airport: 'airport',
  gulistan: 'gulistan',
  dhanmondi: 'dhanmondi',
};

/** Bangla → English district names for the destinations users actually ask about. */
const BN_DISTRICT: Record<string, string> = {
  'ঢাকা': 'Dhaka', 'গাজীপুর': 'Gazipur', 'নারায়ণগঞ্জ': 'Narayanganj', 'নরসিংদী': 'Narsingdi',
  'মানিকগঞ্জ': 'Manikganj', 'মুন্সিগঞ্জ': 'Munshiganj', 'টাঙ্গাইল': 'Tangail', 'ফরিদপুর': 'Faridpur',
  'গোপালগঞ্জ': 'Gopalganj', 'মাদারীপুর': 'Madaripur', 'রাজবাড়ী': 'Rajbari', 'শরীয়তপুর': 'Shariatpur',
  'কিশোরগঞ্জ': 'Kishoreganj', 'চট্টগ্রাম': 'Chattogram', 'কক্সবাজার': "Cox's Bazar",
  'কুমিল্লা': 'Cumilla', 'ব্রাহ্মণবাড়িয়া': 'Brahmanbaria', 'চাঁদপুর': 'Chandpur', 'ফেনী': 'Feni',
  'নোয়াখালী': 'Noakhali', 'লক্ষ্মীপুর': 'Lakshmipur', 'খাগড়াছড়ি': 'Khagrachhari',
  'রাঙ্গামাটি': 'Rangamati', 'বান্দরবান': 'Bandarban', 'রাজশাহী': 'Rajshahi',
  'চাঁপাইনবাবগঞ্জ': 'Chapai Nawabganj', 'নাটোর': 'Natore', 'নওগাঁ': 'Naogaon', 'পাবনা': 'Pabna',
  'সিরাজগঞ্জ': 'Sirajganj', 'বগুড়া': 'Bogura', 'জয়পুরহাট': 'Joypurhat', 'খুলনা': 'Khulna',
  'বাগেরহাট': 'Bagerhat', 'সাতক্ষীরা': 'Satkhira', 'যশোর': 'Jashore', 'ঝিনাইদহ': 'Jhenaidah',
  'মাগুরা': 'Magura', 'নড়াইল': 'Narail', 'কুষ্টিয়া': 'Kushtia', 'চুয়াডাঙ্গা': 'Chuadanga',
  'মেহেরপুর': 'Meherpur', 'বরিশাল': 'Barishal', 'ভোলা': 'Bhola', 'ঝালকাঠি': 'Jhalokathi',
  'পিরোজপুর': 'Pirojpur', 'পটুয়াখালী': 'Patuakhali', 'বরগুনা': 'Barguna', 'সিলেট': 'Sylhet',
  'মৌলভীবাজার': 'Moulvibazar', 'হবিগঞ্জ': 'Habiganj', 'সুনামগঞ্জ': 'Sunamganj',
  'রংপুর': 'Rangpur', 'দিনাজপুর': 'Dinajpur', 'ঠাকুরগাঁও': 'Thakurgaon', 'পঞ্চগড়': 'Panchagarh',
  'নীলফামারী': 'Nilphamari', 'কুড়িগ্রাম': 'Kurigram', 'লালমনিরহাট': 'Lalmonirhat',
  'গাইবান্ধা': 'Gaibandha', 'ময়মনসিংহ': 'Mymensingh', 'জামালপুর': 'Jamalpur',
  'শেরপুর': 'Sherpur', 'নেত্রকোণা': 'Netrokona', 'বেনাপোল': 'Benapole', 'টেকনাফ': 'Teknaf',
  'কুয়াকাটা': 'Kuakata', 'সাভার': 'Savar',
};

/** Same map, exported for search functions — avoids duplicate copies. */
export const BN_DISTRICT_MAP: Record<string, string> = BN_DISTRICT;

/** Districts/hubs known to KoyJabo intercity data. Accepts English or Bangla. */
export function intercityRouteFor(destination: string) {
  const target = (BN_DISTRICT[destination.trim()] ?? destination).toLowerCase().trim();
  return [...INTERCITY_BUS_ROUTES, ...MAJOR_TRANSPORT_HUBS].find(
    r => r.district.toLowerCase() === target
  );
}

// Default boarding points per division, from route strings that DO list them
// (e.g. Rangpur "Gabtoli/Kalyanpur/Mohakhali", Barishal "Abdullahpur/Sayedabad/Gabtoli").
const DIVISION_TERMINALS: Record<string, string[]> = {
  Dhaka: ['sayedabad', 'gabtoli', 'gulistan'],
  Chattogram: ['sayedabad', 'gabtoli'],
  Rajshahi: ['gabtoli', 'kallyanpur', 'mohakhali'],
  Khulna: ['gabtoli', 'kallyanpur', 'sayedabad'],
  Barishal: ['sayedabad', 'abdullahpur', 'gabtoli'],
  Sylhet: ['sayedabad', 'mohakhali'],
  Rangpur: ['gabtoli', 'kallyanpur', 'mohakhali'],
  Mymensingh: ['mohakhali'],
};

// Hubs whose route string omits boarding points (verified from operator data)
const HUB_TERMINALS: Record<string, string[]> = {
  Benapole: ['gabtoli', 'kallyanpur'],
  Kuakata: ['sayedabad', 'abdullahpur', 'gabtoli'],
  Teknaf: ['sayedabad', 'abdullahpur'],
};

/** Which Dhaka boarding terminals serve a destination, from real route strings. */
export function terminalsServing(destination: string): string[] {
  const hit = intercityRouteFor(destination);
  if (!hit) return [];
  const m = hit.route.match(/Dhaka\s*\(([^)]+)\)/i);
  if (m) {
    const ids = m[1]
      .split(/[/,]/)
      .map(s => TERMINAL_NAME_TO_ID[s.trim().toLowerCase()])
      .filter((id): id is string => Boolean(id));
    if (ids.length) return ids;
  }
  return HUB_TERMINALS[hit.district] ?? DIVISION_TERMINALS[hit.division] ?? [];
}

/** Rank boarding terminals by distance from the user's area. */
export function nearestBoardingTerminals(areaQuery: string): BoardingTerminal[] {
  const areaId = resolveStationId(areaQuery);
  const area = areaId ? STATIONS[areaId] : null;
  if (!area?.lat || !area.lng) return [];

  return TERMINALS.map(t => {
    const s = STATIONS[t.id];
    const distKm = s?.lat ? havKm(area.lat, area.lng, s.lat, s.lng) : Infinity;
    return { terminalId: t.id, name: t.name, bnName: t.bnName, distKm, serves: [] };
  })
    .filter(t => t.distKm < Infinity)
    .sort((a, b) => a.distKm - b.distKm);
}

/** Pick the best terminal for a destination from the user's area: nearest that serves, else nearest overall. */
export function recommendBoardingTerminal(areaQuery: string, destination: string) {
  const ranked = nearestBoardingTerminals(areaQuery);
  if (!ranked.length) return null;
  const serving = terminalsServing(destination);
  const servingIds = new Set(serving);
  ranked.forEach(t => { t.serves = servingIds.has(t.terminalId) ? [destination] : []; });
  return ranked.find(t => servingIds.has(t.terminalId)) ?? ranked[0];
}
