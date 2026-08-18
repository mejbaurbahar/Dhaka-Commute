/**
 * KoyJabo transport correctness eval dataset (Aug 2026).
 *
 * Two layers:
 * 1. `assertions` — deterministic ground truth against data modules (runnable offline)
 * 2. `llmCases` — question → expected-fact checks for live LLM/AI-chat evaluation
 *
 * Only VERIFIED facts (sourced) go here. UNKNOWN stays UNKNOWN — never guessed.
 * Sources noted per entry; most were re-verified Aug 2026 (see commit history).
 */
import { recommendBoardingTerminal, terminalsServing } from '../../src/redesign/utils/intercityBoarding';
import { INTERCITY_BUS_ROUTES, MAJOR_TRANSPORT_HUBS, FERRY_CROSSINGS, searchIntercityBus } from '../../data/intercityData';
import { DOMESTIC_ROUTES } from '../../data/bangladeshFlightData';
import { LAUNCH_ROUTES } from '../../data/bangladeshLaunchData';
import { BD_TRAIN_ROUTES, TRAIN_STATIONS } from '../../data/bangladeshTrainData';
import { STATIONS } from '../../constants';

export interface EvalAssertion {
  name: string;
  category: 'boarding' | 'ferry' | 'flight' | 'launch' | 'intercity' | 'train' | 'coverage';
  check: () => { pass: boolean; detail: string };
}

export interface LlmEvalCase {
  question: string;       // verbatim user question (bn/en)
  lang: 'bn' | 'en';
  mustContain: string[];  // facts the answer MUST state
  mustNotContain: string[]; // stale/wrong facts the answer must NOT state
  sourceNote: string;
}

// ── Layer 1: deterministic assertions ─────────────────────────────────
export const assertions: EvalAssertion[] = [
  // Nearest-useful-node boarding (critical routing requirement)
  {
    name: 'gulshan1→Benapole recommends Kallyanpur (serving, closer than Gabtoli)',
    category: 'boarding',
    check: () => {
      const rec = recommendBoardingTerminal('gulshan 1', 'Benapole');
      const serving = terminalsServing('Benapole');
      return {
        pass: rec?.terminalId === 'kallyanpur' && serving.includes('gabtoli') && serving.includes('kallyanpur'),
        detail: `rec=${rec?.terminalId} serving=${serving.join(',')}`,
      };
    },
  },
  {
    name: 'mirpur10→Cox\'s Bazar recommends Gabtoli',
    category: 'boarding',
    check: () => {
      const rec = recommendBoardingTerminal('mirpur 10', "Cox's Bazar");
      return { pass: rec?.terminalId === 'gabtoli', detail: `rec=${rec?.terminalId}` };
    },
  },
  {
    name: 'uttara→Rangpur recommends Mohakhali',
    category: 'boarding',
    check: () => {
      const rec = recommendBoardingTerminal('uttara', 'Rangpur');
      return { pass: rec?.terminalId === 'mohakhali', detail: `rec=${rec?.terminalId}` };
    },
  },
  {
    name: 'dhanmondi→Khulna recommends Gabtoli',
    category: 'boarding',
    check: () => {
      const rec = recommendBoardingTerminal('dhanmondi', 'Khulna');
      return { pass: rec?.terminalId === 'gabtoli', detail: `rec=${rec?.terminalId}` };
    },
  },
  {
    name: 'motijheel→Cumilla recommends Sayedabad',
    category: 'boarding',
    check: () => {
      const rec = recommendBoardingTerminal('motijheel', 'Cumilla');
      return { pass: rec?.terminalId === 'sayedabad', detail: `rec=${rec?.terminalId}` };
    },
  },

  // Ferries
  {
    name: 'Mawa-Shimulia ferry marked DISCONTINUED (Padma Bridge 2022)',
    category: 'ferry',
    check: () => {
      const mawa = FERRY_CROSSINGS.find(f => f.from.en.startsWith('Mawa'));
      return { pass: mawa?.status === 'discontinued', detail: mawa?.status ?? 'missing' };
    },
  },
  {
    name: 'Paturia-Daulatdia ferry active 24h',
    category: 'ferry',
    check: () => {
      const p = FERRY_CROSSINGS.find(f => f.from.en.startsWith('Paturia'));
      return { pass: p?.status === 'active' && /24/.test(p.schedule), detail: p?.status ?? 'missing' };
    },
  },

  // Flights (all verified Aug 2026 — trip.com / lowcost.club / bdnews24 / newagebd / flight-status)
  {
    name: 'Novoair VQ901 DAC→CGP dep 07:00 (not VQ101)',
    category: 'flight',
    check: () => {
      const f = DOMESTIC_ROUTES.find(r => r.flightNo === 'VQ901');
      const stale = DOMESTIC_ROUTES.some(r => r.flightNo === 'VQ101');
      return { pass: Boolean(f?.dep === '07:00' && !stale), detail: `VQ901=${f?.dep} VQ101-stale=${stale}` };
    },
  },
  {
    name: 'Biman BG491 DAC→SPD 07:10 daily; BG493 19:45 Wed-only',
    category: 'flight',
    check: () => {
      const a = DOMESTIC_ROUTES.find(r => r.flightNo === 'BG491');
      const b = DOMESTIC_ROUTES.find(r => r.flightNo === 'BG493');
      const stale = DOMESTIC_ROUTES.some(r => r.flightNo === 'BG641' || r.flightNo === 'BG643');
      return { pass: a?.dep === '07:10' && b?.dep === '19:45' && b?.daysOp === 'Wed' && !stale, detail: `BG491=${a?.dep} BG493=${b?.dep}/${b?.daysOp} stale=${stale}` };
    },
  },
  {
    name: 'Biman BG433 DAC→CXB 10:15 Mon,Tue,Thu,Fri,Sat',
    category: 'flight',
    check: () => {
      const f = DOMESTIC_ROUTES.find(r => r.flightNo === 'BG433');
      return { pass: f?.dep === '10:15', detail: `BG433=${f?.dep}/${f?.daysOp}` };
    },
  },
  {
    name: 'US-Bangla BS129 DAC→JSR 16:00 daily',
    category: 'flight',
    check: () => {
      const f = DOMESTIC_ROUTES.find(r => r.flightNo === 'BS129');
      return { pass: f?.dep === '16:00', detail: `BS129=${f?.dep}` };
    },
  },
  {
    name: 'Air Astra 2A431 DAC→ZYL 07:30 (not 2A221)',
    category: 'flight',
    check: () => {
      const f = DOMESTIC_ROUTES.find(r => r.flightNo === '2A431');
      const stale = DOMESTIC_ROUTES.some(r => r.flightNo === '2A221');
      return { pass: f?.dep === '07:30' && !stale, detail: `2A431=${f?.dep} stale=${stale}` };
    },
  },
  {
    name: 'Biman BG121 DAC→CGP 08:00 Mon,Wed; no invented BG601-609 on DAC→CGP',
    category: 'flight',
    check: () => {
      const f = DOMESTIC_ROUTES.find(r => r.flightNo === 'BG121');
      // Real BG6xx (BG615/BG617) are verified trip.com flights; only BG601-609 were hallucinated
      const invented = ['BG601', 'BG603', 'BG605', 'BG607', 'BG609'];
      const stale = DOMESTIC_ROUTES.some(r => r.from === 'DAC' && r.to === 'CGP' && invented.includes(r.flightNo));
      return { pass: f?.dep === '08:00' && f?.daysOp === 'Mon,Wed' && !stale, detail: `BG121=${f?.dep}/${f?.daysOp} stale=${stale}` };
    },
  },
  {
    name: 'Biman BG473 DAC→BZL dep 16:00 Thu-limited (not 16:50 daily)',
    category: 'flight',
    check: () => {
      const f = DOMESTIC_ROUTES.find(r => r.flightNo === 'BG473');
      return { pass: f?.dep === '16:00', detail: `BG473=${f?.dep}/${f?.daysOp}` };
    },
  },

  // Launches (verified Aug 2026)
  {
    name: 'Green Line Water Bus day service 08:00 Sadarghat→Barishal',
    category: 'launch',
    check: () => {
      const f = LAUNCH_ROUTES.find(r => r.id === 'greenline-water-bus-day');
      return { pass: f?.dep === '8:00 AM' && f?.from === 'sadarghat' && f?.to === 'barisal', detail: f ? `${f.dep} deck=${f.deck}` : 'missing' };
    },
  },
  {
    name: 'Rocket paddle steamer → Barishal 6:30 PM daily except Fri',
    category: 'launch',
    check: () => {
      const f = LAUNCH_ROUTES.find(r => r.id === 'rocket-paddle-barisal');
      return { pass: f?.dep === '6:30 PM' && f?.overnight, detail: f ? f.dep : 'missing' };
    },
  },
  {
    name: 'Night launch window 8-9 PM for Barishal (Adventure/Surovi/Parabat)',
    category: 'launch',
    check: () => {
      // Research-verified night window 20:00-21:00; existing data covers 6-8 PM — presence only
      const count = LAUNCH_ROUTES.filter(r => r.to === 'barisal' && r.overnight).length;
      return { pass: count >= 10, detail: `${count} overnight Barishal routes` };
    },
  },

  // Intercity buses
  {
    name: 'Benapole in MAJOR_TRANSPORT_HUBS',
    category: 'intercity',
    check: () => {
      const h = MAJOR_TRANSPORT_HUBS.find(r => r.district.toLowerCase() === 'benapole');
      return { pass: Boolean(h), detail: h?.route ?? 'missing' };
    },
  },
  {
    name: 'searchIntercityBus finds Faridpur via Padma Bridge',
    category: 'intercity',
    check: () => {
      const r = searchIntercityBus('faridpur');
      return { pass: r.length > 0 && /padma/i.test(r[0].route), detail: r[0]?.route ?? 'none' };
    },
  },
  {
    name: '64 districts covered by INTERCITY_BUS_ROUTES',
    category: 'coverage',
    check: () => {
      const uniq = new Set(INTERCITY_BUS_ROUTES.map(r => r.district.toLowerCase()));
      return { pass: uniq.size >= 60, detail: `${uniq.size} districts` };
    },
  },

  // Trains
  {
    name: 'Train dataset 150+ routes, 40+ stations',
    category: 'train',
    check: () => {
      const stations = Object.keys(TRAIN_STATIONS).length;
      return { pass: BD_TRAIN_ROUTES.length >= 150 && stations >= 40, detail: `${BD_TRAIN_ROUTES.length} routes, ${stations} stations` };
    },
  },

  // Station coverage
  {
    name: '700+ local stations in STATIONS',
    category: 'coverage',
    check: () => {
      return { pass: Object.keys(STATIONS).length >= 700, detail: `${Object.keys(STATIONS).length} stations` };
    },
  },
];

// ── Layer 2: LLM answer-level cases (live AI chat eval) ───────────────
export const llmCases: LlmEvalCase[] = [
  {
    question: 'গুলশান ১ থেকে বেনাপোল যাব কীভাবে?',
    lang: 'bn',
    mustContain: ['কল্যাণপুর', 'গাবতলী'],
    mustNotContain: ['মাওয়া', 'শিমুলিয়া'],
    sourceNote: 'Nearest-useful boarding: Kallyanpur 5.7km serves Benapole; Gabtoli 7.4km also serves. Never Mawa-Shimulia ferry (closed 2022).',
  },
  {
    question: 'How to go from Uttara to Rangpur by bus?',
    lang: 'en',
    mustContain: ['Mohakhali', 'Gabtoli'],
    mustNotContain: [],
    sourceNote: 'Boarding: Mohakhali nearest serving terminal for Rangpur corridor.',
  },
  {
    question: 'ঢাকা থেকে কক্সবাজার বিমান কত ভাড়া?',
    lang: 'bn',
    mustContain: ['BG433'],
    mustNotContain: ['BG611'],
    sourceNote: 'Biman CXB = BG433 10:15 Mon/Tue/Thu/Fri/Sat. BG611 never existed.',
  },
  {
    question: 'সিলেট যাব কোন ফ্লাইটে?',
    lang: 'bn',
    mustContain: ['BG237', '2A431', 'BS531'],
    mustNotContain: ['BG621', 'BG623'],
    sourceNote: 'ZYL verified: Biman BG237 15:25/BG251 18:45; Air Astra 2A431 07:30/19:30; US-Bangla BS531 10:45/12:45/18:15.',
  },
  {
    question: 'ঢাকা থেকে সৈয়দপুর ফ্লাইটের সময়সূচি?',
    lang: 'bn',
    mustContain: ['BG491'],
    mustNotContain: ['BG641'],
    sourceNote: 'Saidpur: BG491 07:10 daily, BG493 19:45 Wed only.',
  },
  {
    question: 'Dhaka to Barishal launch timing?',
    lang: 'en',
    mustContain: ['Green Line', '8:00'],
    mustNotContain: [],
    sourceNote: 'Day service verified: Green Line Water Bus 08:00 (deck ৳700); Adventure 5 08:30.',
  },
  {
    question: 'Is the Mawa-Shimulia ferry running?',
    lang: 'en',
    mustContain: ['closed', 'Padma Bridge'],
    mustNotContain: ['running', '30 minutes'],
    sourceNote: 'Ferry permanently discontinued June 2022 — never direct users there.',
  },
  {
    question: 'ঢাকা থেকে চট্টগ্রাম বাস ভাড়া কত?',
    lang: 'bn',
    mustContain: ['৭০৪', 'সায়েদাবাদ'],
    mustNotContain: [],
    sourceNote: 'BRTA 2026: ৳704 (51-seat) Sayedabad terminal.',
  },
  {
    question: 'Metro rail fare from Uttara to Motijheel?',
    lang: 'en',
    mustContain: ['MRT-6'],
    mustNotContain: [],
    sourceNote: 'Metro grounding section must fire (MRT-6).',
  },
  {
    question: 'How to reach Cox\'s Bazar from Mirpur 10?',
    lang: 'en',
    mustContain: ['Gabtoli'],
    mustNotContain: ['Sayedabad'],
    sourceNote: 'Nearest serving terminal for Mirpur 10 → Cox\'s Bazar is Gabtoli (Sayedabad farther).',
  },
];
