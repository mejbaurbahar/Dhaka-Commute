import type { TransportCardData } from '../../../types';
import { METRO_STATIONS, METRO_LINES } from '../../../constants';
import { normalizePlace, planLocalBusTransit } from './localBusRouting';
import { searchTransit } from '../../../services/intercityTransitService';

const MODE_ICON: Record<string, string> = {
  bus: '🚌', train: '🚆', launch: '⛴️', flight: '✈️', metro: '🚇', walk: '🚶',
};

function fmtDuration(min: number, bn: boolean): string {
  const h = Math.floor(min / 60), m = min % 60;
  if (h > 0) return bn ? `${h}ঘ ${m}মি` : `${h}h ${m}m`;
  return bn ? `${m}মি` : `${m}m`;
}

/** MRT-6 fare by station index from Uttara North — same table as MetroPage. */
function metroFareAt(index: number): number {
  return index === 0 ? 0 : Math.min(20 + Math.floor(index / 2) * 10, 100);
}

/**
 * Metro routing — MRT-6 only (the single operating line, matches MetroPage).
 * Both endpoints must resolve to stations on the line; real station data from
 * METRO_STATIONS/METRO_LINES. Returns null when either side is not a metro stop.
 */
function planMetroTransit(fromQ: string, toQ: string): TransportCardData[] | null {
  const line = METRO_LINES['mrt6'];
  if (!line) return null;
  const fromKey = normalizePlace(fromQ);
  const toKey = normalizePlace(toQ);
  let fromIdx = -1, toIdx = -1;
  let fromName = '', toName = '';
  line.stations.forEach((id, i) => {
    const s = METRO_STATIONS[id];
    if (!s) return;
    const nameKey = normalizePlace(s.name.replace(' Metro Station', ''));
    const bnKey = normalizePlace(s.bnName);
    if (fromIdx === -1 && (nameKey === fromKey || bnKey === fromKey)) {
      fromIdx = i;
      fromName = s.name.replace(' Metro Station', '');
    }
    if (toIdx === -1 && (nameKey === toKey || bnKey === toKey)) {
      toIdx = i;
      toName = s.name.replace(' Metro Station', '');
    }
  });
  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return null;
  const lo = Math.min(fromIdx, toIdx), hi = Math.max(fromIdx, toIdx);
  const fare = Math.abs(metroFareAt(fromIdx) - metroFareAt(toIdx));
  const durationMin = (hi - lo) * 3; // ~3 min per station hop
  return [{
    kind: 'transit' as const,
    from: fromQ,
    to: toQ,
    legs: [{
      mode: 'metro' as const,
      nameEn: 'MRT-6 (Metro Rail)',
      nameBn: 'এমআরটি-৬ (মেট্রো রেল)',
      from: fromName,
      to: toName,
      durationMin,
      fare,
      estimated: false,
    }],
    totalMin: durationMin,
    totalFare: fare,
    transfers: 0,
  }];
}

/**
 * Deterministic answer text built from verified engine cards — the ONLY text
 * used when transport cards exist. Never touches the LLM, so it can never
 * invent a bus, stop, or fare. bn/en via lang flag.
 */
export function buildCardsAnswer(cards: TransportCardData[], from: string, to: string, lang: string): string {
  const bn = lang === 'bn';
  const lines: string[] = [bn
    ? `🏆 **${from} → ${to}** এর জন্য সেরা বিকল্প:`
    : `🏆 **Best options for ${from} → ${to}:**`];
  cards.forEach((c, i) => {
    const num = `${i + 1}. `;
    if (c.kind === 'bus') {
      const name = bn ? (c.nameBn || c.nameEn) : c.nameEn;
      const direct = bn ? 'সরাসরি বাস, কোনো বদল নেই' : 'direct bus, no transfer';
      lines.push(`${num}🚌 **${name}** — ${direct}`);
      lines.push(`   ${c.from} → ${c.to} · ⏱️ ~${fmtDuration(c.durationMin, bn)} · 💰 ৳${c.fare}`);
      return;
    }
    // transit card — one or more legs (bus/train/launch/flight/metro)
    const firstLeg = c.legs[0];
    const headName = bn ? (firstLeg.nameBn || firstLeg.nameEn) : firstLeg.nameEn;
    lines.push(`${num}${MODE_ICON[firstLeg.mode] ?? '🚌'} **${headName}**`);
    for (const leg of c.legs) {
      const legName = bn ? (leg.nameBn || leg.nameEn) : leg.nameEn;
      lines.push(`   ${MODE_ICON[leg.mode] ?? '🚌'} ${legName} (${leg.from} → ${leg.to})${leg.fare !== undefined ? ` · 💰 ৳${leg.fare}` : ''}`);
    }
    const via = c.transfers > 0
      ? (bn ? `~${fmtDuration(c.totalMin, bn)} · মোট ৳${c.totalFare} · ${c.transfers}টি বদল` : `~${fmtDuration(c.totalMin, bn)} · total ৳${c.totalFare} · ${c.transfers} transfer${c.transfers > 1 ? 's' : ''}`)
      : (bn ? `~${fmtDuration(c.totalMin, bn)} · ৳${c.totalFare} · কোনো বদল নেই` : `~${fmtDuration(c.totalMin, bn)} · ৳${c.totalFare} · no transfer`);
    lines.push(`   ${c.from} → ${c.to} · ${via}`);
  });
  return lines.join('\n');
}

/** Strip trailing travel verbs off a captured place name ("কক্সবাজার যাবো" → "কক্সবাজার"). */
function cutVerb(s: string): string {
  return s
    .replace(/\s+(?:যাবো?|যাব|যাই|যেতে\s+চাই|জেতে\s+চাই|যাওয়ার|যাওয়া|jaite\s+chai|jete\s+chai|jabo|jaite\s+jabo)$/i, '')
    .trim();
}

/**
 * Extract {from, to} from a chat query. Returns null when the query has no
 * explicit origin/destination pair — the caller then shows no cards.
 * Patterns: "from X to Y", "X থেকে Y", "X theke Y", plain "X to Y", "X → Y".
 */
export function extractFromTo(text: string): { from: string; to: string } | null {
  const t = text.trim();
  const pair = (from: string, to: string) => ({ from: from.trim(), to: cutVerb(to) });
  let m = t.match(/\bfrom\s+(.{2,40}?)\s+(?:to|→)\s+(.{2,40}?)(?=[.?।!,]|$)/i);
  if (m) return pair(m[1], m[2]);
  m = t.match(/(.{2,40}?)\s+থেকে\s+(.{2,40}?)(?=[.?।!,]|$)/);
  if (m) return pair(m[1], m[2]);
  m = t.match(/(.{2,40}?)\s+theke\s+(.{2,40}?)(?=[.?।!,]|$)/i);
  if (m) return pair(m[1], m[2]);
  // Verb-phrase pair: "how to go X to Y", "how can i get to X to Y",
  // "want to go X to Y" — the leading verb phrase is consumed, never captured.
  // Single-dest nav ("how to go to Cox's Bazar") has no second " to " → no match.
  m = t.match(/(?:(?:how\s+(?:to\s+)?|how\s+(?:can|do)\s+i\s+|want\s+to\s+|need\s+to\s+|i(?:'m|\s+am)\s+going\s+to\s+)?(?:go|get|reach|travel)\s+(?:to\s+)?)(.{2,40}?)\s+to\s+(.{2,40}?)(?=[.?।!,]|$)/i);
  if (m) return pair(m[1], m[2]);
  // Plain "X to Y" — reject queries that start with a question/verb word so
  // "how to go to Cox's Bazar" never matches with from="how".
  m = t.match(/^(.{2,40}?)\s+to\s+(.{2,40}?)(?=[.?।!,]|$)/i);
  if (m && !/^(how|what|where|when|which|can|do|is|are|i|i'm|tell|give|need|want)\b/i.test(m[1])) {
    return pair(m[1], m[2]);
  }
  m = t.match(/^(.{2,40}?)\s*→\s*(.{2,40}?)(?=[.?।!,]|$)/);
  if (m) return pair(m[1], m[2]);
  return null;
}

/**
 * Build verified transport result cards for a from→to query.
 * 1. Intercity first: district-level pairs (Dhaka → Cox's Bazar) must never be
 *    hijacked by the Dhaka-local engine. Skipped when either side is not a
 *    district, or both sides resolve to the same district (intra-Dhaka).
 * 2. Dhaka-local: planLocalBusTransit → direct bus + transfer cards.
 * Returns null when neither engine resolves the pair (no cards — chat
 * continues normally). All data comes from real engines, never the LLM.
 */
export function buildTransportCards(fromQ: string, toQ: string): TransportCardData[] | null {
  // ── Intercity (district-level multi-mode graph) ───────────────────────────
  const interResult = searchTransit(fromQ, toQ);
  const interValid = interResult.kind === 'ok' && interResult.fromDistrict !== interResult.toDistrict;
  if (interValid && interResult.journeys.length > 0) {
    return interResult.journeys.slice(0, 3).map(j => ({
      kind: 'transit' as const,
      from: interResult.fromDistrict,
      to: interResult.toDistrict,
      legs: j.legs.map(l => ({
        mode: l.mode,
        nameEn: l.nameEn,
        nameBn: l.nameBn,
        from: l.fromLabelEn,
        to: l.toLabelEn,
        durationMin: l.durationMin,
        fare: l.fare,
        estimated: l.estimated,
      })),
      totalMin: j.totalMin,
      totalFare: j.totalFare,
      transfers: j.transfers,
    }));
  }

  // ── Metro (MRT-6 operating line, station-level) ───────────────────────────
  const metro = planMetroTransit(fromQ, toQ);
  if (metro) return metro;

  // ── Dhaka-local (station-level bus graph) ─────────────────────────────────
  const local = planLocalBusTransit(fromQ, toQ, 6);
  if (local.length > 0) {
    // Dedupe: same bus (or same bus pair) with different walk stops → keep fastest.
    const seen = new Map<string, (typeof local)[0]>();
    for (const opt of local) {
      const busIds = opt.legs.filter(l => l.kind === 'bus').map(l => (l as { bus: { id: string } }).bus.id).join('|');
      const prev = seen.get(busIds);
      if (!prev || opt.totalDuration < prev.totalDuration) seen.set(busIds, opt);
    }
    return [...seen.values()].slice(0, 3).map(opt => {
      const busLegs = opt.legs.filter((l): l is Extract<typeof l, { kind: 'bus' }> => l.kind === 'bus');
      if (opt.transfers === 0 && busLegs.length === 1) {
        const b = busLegs[0];
        return {
          kind: 'bus' as const,
          busId: b.bus.id,
          nameEn: b.bus.name,
          nameBn: b.bus.bnName || b.bus.name,
          from: fromQ,
          to: toQ,
          durationMin: opt.totalDuration,
          fare: b.fare,
          transfers: 0,
        };
      }
      return {
        kind: 'transit' as const,
        from: fromQ,
        to: toQ,
        legs: busLegs.map(l => ({
          mode: 'bus' as const,
          nameEn: l.bus.name,
          nameBn: l.bus.bnName || l.bus.name,
          from: l.from,
          to: l.to,
          durationMin: l.durationMin,
          fare: l.fare,
          estimated: false,
        })),
        totalMin: opt.totalDuration,
        totalFare: opt.totalFare,
        transfers: opt.transfers,
      };
    });
  }

  return null;
}
