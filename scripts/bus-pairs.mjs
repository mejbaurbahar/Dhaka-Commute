/**
 * From→to bus answer pairs, mined from Google Search Console queries
 * (top zero-click "which bus goes X→Y" / "X থেকে Y বাস" queries, May–Aug 2026).
 * Used by generate-sitemap.mjs and generate-static-seo-pages.mjs.
 */

// { from, to, fromEn, fromBn, toEn, toBn }
// `from`/`to` are stop-id prefixes matched against BUS_DATA stop keys.
export const BUS_PAIRS = [
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
];

/** Match buses whose stop list contains both prefixes (any order). */
export function matchBusPairs(routes) {
  return BUS_PAIRS.map(pair => ({
    pair,
    buses: routes.filter(r =>
      r.stops.some(s => s.startsWith(pair.from)) && r.stops.some(s => s.startsWith(pair.to))
    ),
  }));
}

/** Canonical URL path for a pair. */
export function pairPath(pair) {
  return `/bus/${pair.from}-to-${pair.to}/`;
}
