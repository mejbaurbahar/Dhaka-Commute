import type { TransportCardData } from '../../../types';
import { planLocalBusTransit } from './localBusRouting';
import { searchTransit } from '../../../services/intercityTransitService';

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
