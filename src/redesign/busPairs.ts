/** From→to bus answer pairs (mirror of scripts/bus-pairs.mjs, mined from GSC queries). */

export interface BusPair {
  from: string;
  fromEn: string;
  fromBn: string;
  to: string;
  toEn: string;
  toBn: string;
}

export const BUS_PAIRS: BusPair[] = [
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'dhanmondi', toEn: 'Dhanmondi', toBn: 'ধানমন্ডি' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'savar', toEn: 'Savar', toBn: 'সাভার' },
  { from: 'mohammadpur', fromEn: 'Mohammadpur', fromBn: 'মোহাম্মদপুর', to: 'gulistan', toEn: 'Gulistan', toBn: 'গুলিস্তান' },
  { from: 'mirpur10', fromEn: 'Mirpur 10', fromBn: 'মিরপুর ১০', to: 'jatrabari', toEn: 'Jatrabari', toBn: 'যাত্রাবাড়ী' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'jatrabari', fromEn: 'Jatrabari', fromBn: 'যাত্রাবাড়ী', to: 'banani', toEn: 'Banani', toBn: 'বনানী' },
  { from: 'mohakhali', fromEn: 'Mohakhali', fromBn: 'মহাখালী', to: 'dhanmondi', toEn: 'Dhanmondi', toBn: 'ধানমন্ডি' },
  { from: 'gazipur', fromEn: 'Gazipur', fromBn: 'গাজীপুর', to: 'shahbag', toEn: 'Shahbag', toBn: 'শাহবাগ' },
  { from: 'kamalapur', fromEn: 'Kamalapur', fromBn: 'কমলাপুর', to: 'mohammadpur', toEn: 'Mohammadpur', toBn: 'মোহাম্মদপুর' },
  { from: 'mohakhali', fromEn: 'Mohakhali', fromBn: 'মহাখালী', to: 'jatrabari', toEn: 'Jatrabari', toBn: 'যাত্রাবাড়ী' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'agargaon', toEn: 'Agargaon', toBn: 'আগারগাঁও' },
  { from: 'gabtoli', fromEn: 'Gabtoli', fromBn: 'গাবতলী', to: 'gulistan', toEn: 'Gulistan', toBn: 'গুলিস্তান' },
  { from: 'jatrabari', fromEn: 'Jatrabari', fromBn: 'যাত্রাবাড়ী', to: 'motijheel', toEn: 'Motijheel', toBn: 'মতিঝিল' },
  { from: 'mohakhali', fromEn: 'Mohakhali', fromBn: 'মহাখালী', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'mirpur10', fromEn: 'Mirpur 10', fromBn: 'মিরপুর ১০', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'mirpur10', toEn: 'Mirpur 10', toBn: 'মিরপুর ১০' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'mirpur1', toEn: 'Mirpur 1', toBn: 'মিরপুর ১' },
  { from: 'keraniganj', fromEn: 'Keraniganj', fromBn: 'কেরানীগঞ্জ', to: 'gulistan', toEn: 'Gulistan', toBn: 'গুলিস্তান' },
  { from: 'mirpur', fromEn: 'Mirpur', fromBn: 'মিরপুর', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'kamalapur', fromEn: 'Kamalapur', fromBn: 'কমলাপুর', to: 'dhanmondi', toEn: 'Dhanmondi', toBn: 'ধানমন্ডি' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'shyamoli', toEn: 'Shyamoli', toBn: 'শ্যামলী' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'mawa', toEn: 'Mawa', toBn: 'মাওয়া' },
  // Round 2 — mined from GSC Performance export (Aug 2026)
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'mohammadpur', toEn: 'Mohammadpur', toBn: 'মোহাম্মদপুর' },
  { from: 'mohakhali', fromEn: 'Mohakhali', fromBn: 'মহাখালী', to: 'gulistan', toEn: 'Gulistan', toBn: 'গুলিস্তান' },
  { from: 'jatrabari', fromEn: 'Jatrabari', fromBn: 'যাত্রাবাড়ী', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'mohakhali', fromEn: 'Mohakhali', fromBn: 'মহাখালী', to: 'shahbag', toEn: 'Shahbag', toBn: 'শাহবাগ' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'gulshan2', toEn: 'Gulshan 2', toBn: 'গুলশান ২' },
  { from: 'mirpur10', fromEn: 'Mirpur 10', fromBn: 'মিরপুর ১০', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'kuril', fromEn: 'Kuril', fromBn: 'কুড়িল', to: 'dhanmondi', toEn: 'Dhanmondi', toBn: 'ধানমন্ডি' },
  { from: 'motijheel', fromEn: 'Motijheel', fromBn: 'মতিঝিল', to: 'sayedabad', toEn: 'Sayedabad', toBn: 'সায়দাবাদ' },
  { from: 'malibag', fromEn: 'Malibag', fromBn: 'মালিবাগ', to: 'farmgate', toEn: 'Farmgate', toBn: 'ফার্মগেট' },
  { from: 'farmgate', fromEn: 'Farmgate', fromBn: 'ফার্মগেট', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'shahbag', fromEn: 'Shahbag', fromBn: 'শাহবাগ', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'mogbazar', toEn: 'Mogbazar', toBn: 'মগবাজার' },
  { from: 'kamalapur', fromEn: 'Kamalapur', fromBn: 'কমলাপুর', to: 'agargaon', toEn: 'Agargaon', toBn: 'আগারগাঁও' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'keraniganj', toEn: 'Keraniganj', toBn: 'কেরানীগঞ্জ' },
  { from: 'banani', fromEn: 'Banani', fromBn: 'বনানী', to: 'jatrabari', toEn: 'Jatrabari', toBn: 'যাত্রাবাড়ী' },
  { from: 'dhanmondi', fromEn: 'Dhanmondi', fromBn: 'ধানমন্ডি', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'gabtoli', fromEn: 'Gabtoli', fromBn: 'গাবতলী', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'mirpur10', fromEn: 'Mirpur 10', fromBn: 'মিরপুর ১০', to: 'kamalapur', toEn: 'Kamalapur', toBn: 'কমলাপুর' },
  { from: 'mirpur', fromEn: 'Mirpur', fromBn: 'মিরপুর', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'sayedabad', fromEn: 'Sayedabad', fromBn: 'সায়দাবাদ', to: 'mohakhali', toEn: 'Mohakhali', toBn: 'মহাখালী' },
  { from: 'farmgate', fromEn: 'Farmgate', fromBn: 'ফার্মগেট', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'sayedabad', fromEn: 'Sayedabad', fromBn: 'সায়দাবাদ', to: 'savar', toEn: 'Savar', toBn: 'সাভার' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'khilgaon', toEn: 'Khilgaon', toBn: 'খিলগাঁও' },
  { from: 'farmgate', fromEn: 'Farmgate', fromBn: 'ফার্মগেট', to: 'banani', toEn: 'Banani', toBn: 'বনানী' },
  { from: 'jatrabari', fromEn: 'Jatrabari', fromBn: 'যাত্রাবাড়ী', to: 'sayedabad', toEn: 'Sayedabad', toBn: 'সায়দাবাদ' },
  { from: 'gulistan', fromEn: 'Gulistan', fromBn: 'গুলিস্তান', to: 'airport', toEn: 'Airport', toBn: 'এয়ারপোর্ট' },
];

// Pairs with NO direct bus: answer via a two-leg ride with an interchange stop.
// `via` is a stop-id prefix; legs: from→via and via→to.
export interface InterchangePair extends BusPair {
  via: string;
  viaEn: string;
  viaBn: string;
}

export const INTERCHANGE_PAIRS: InterchangePair[] = [
  { from: 'badda', fromEn: 'Badda', fromBn: 'বাড্ডা', to: 'dhanmondi', toEn: 'Dhanmondi', toBn: 'ধানমন্ডি', via: 'mohakhali', viaEn: 'Mohakhali', viaBn: 'মহাখালী' },
  { from: 'gazipur', fromEn: 'Gazipur', fromBn: 'গাজীপুর', to: 'dhanmondi', toEn: 'Dhanmondi', toBn: 'ধানমন্ডি', via: 'airport', viaEn: 'Airport', viaBn: 'এয়ারপোর্ট' },
];

export function pairPath(pair: BusPair): string {
  return `/bus/${pair.from}-to-${pair.to}/`;
}

export function interchangePath(pair: InterchangePair): string {
  return `/bus/${pair.from}-to-${pair.to}-via-${pair.via}/`;
}

export function findPair(from: string, to: string): BusPair | null {
  return BUS_PAIRS.find(p => p.from === from && p.to === to) ?? null;
}

export function findInterchange(from: string, to: string): InterchangePair | null {
  return INTERCHANGE_PAIRS.find(p => p.from === from && p.to === to) ?? null;
}
