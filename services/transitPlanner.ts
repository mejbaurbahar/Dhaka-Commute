/**
 * Dhaka Transit Planner — finds multi-bus routes between stops.
 * Uses BFS over the BUS_DATA stop graph to find direct or 1-transfer routes.
 */

import { BUS_DATA, STATIONS } from '../constants';

export interface TransitLeg {
  bus: string;
  busBn: string;
  busType: string;
  from: string;
  fromBn: string;
  to: string;
  toBn: string;
  stopsBetween: number;
}

export interface TransitRoute {
  legs: TransitLeg[];
  transferAt?: string;
  transferAtBn?: string;
}

// ── Build stop → buses index (lazy, built once) ────────────────────────────
let _stopBuses: Map<string, typeof BUS_DATA> | null = null;

function stopBusIndex(): Map<string, typeof BUS_DATA> {
  if (_stopBuses) return _stopBuses;
  _stopBuses = new Map();
  for (const bus of BUS_DATA) {
    if (bus.active === false) continue;
    for (const stop of bus.stops) {
      const list = _stopBuses.get(stop) ?? [];
      list.push(bus);
      _stopBuses.set(stop, list);
    }
  }
  return _stopBuses;
}

function stationLabel(id: string): { en: string; bn: string } {
  const s = (STATIONS as Record<string, { name?: string; bnName?: string }>)[id];
  return { en: s?.name ?? id, bn: s?.bnName ?? id };
}

/** Find buses that serve BOTH stops in order (fromIdx < toIdx). */
function directBuses(fromId: string, toId: string): typeof BUS_DATA {
  return BUS_DATA.filter(b => {
    if (b.active === false) return false;
    const fi = b.stops.indexOf(fromId);
    const ti = b.stops.indexOf(toId);
    return fi !== -1 && ti !== -1 && fi < ti;
  });
}

/** Find buses that serve EITHER stop (both directions included). */
function busesThrough(stopId: string): typeof BUS_DATA {
  return stopBusIndex().get(stopId) ?? [];
}

/**
 * Find a transit plan from `fromId` to `toId`.
 * Returns up to 3 routes (direct preferred, then 1-transfer).
 * Stops must be STATION IDs from constants.ts.
 */
export function findTransitRoutes(fromId: string, toId: string): TransitRoute[] {
  const results: TransitRoute[] = [];

  // 1. Direct buses
  const direct = directBuses(fromId, toId);
  for (const b of direct.slice(0, 2)) {
    const fi = b.stops.indexOf(fromId);
    const ti = b.stops.indexOf(toId);
    const fLbl = stationLabel(fromId);
    const tLbl = stationLabel(toId);
    results.push({
      legs: [{
        bus: b.name,
        busBn: b.bnName ?? b.name,
        busType: b.type ?? 'Local',
        from: fLbl.en,
        fromBn: fLbl.bn,
        to: tLbl.en,
        toBn: tLbl.bn,
        stopsBetween: ti - fi - 1,
      }],
    });
  }

  if (results.length >= 2) return results;

  // 2. One-transfer routes via common stop
  const fromBuses = busesThrough(fromId);
  const toBuses = busesThrough(toId);

  // Build set of stops reachable from fromId (downstream on each fromBus)
  const fromReach = new Map<string, typeof BUS_DATA[0]>(); // stopId → bus used to reach it
  for (const b of fromBuses) {
    const fi = b.stops.indexOf(fromId);
    if (fi === -1) continue;
    for (let i = fi + 1; i < b.stops.length; i++) {
      if (!fromReach.has(b.stops[i])) fromReach.set(b.stops[i], b);
    }
    // Also allow upstream (bus goes both ways — user can board reverse direction)
    for (let i = 0; i < fi; i++) {
      if (!fromReach.has(b.stops[i])) fromReach.set(b.stops[i], b);
    }
  }

  // Find transfers: stops reachable from fromId that lead to toId
  const transfers: Array<{ transfer: string; bus1: typeof BUS_DATA[0]; bus2: typeof BUS_DATA[0] }> = [];
  for (const b of toBuses) {
    const ti = b.stops.indexOf(toId);
    if (ti === -1) continue;
    for (let i = 0; i < b.stops.length; i++) {
      const stop = b.stops[i];
      if (stop === fromId || stop === toId) continue;
      if (fromReach.has(stop)) {
        transfers.push({ transfer: stop, bus1: fromReach.get(stop)!, bus2: b });
        break; // one transfer per destination bus is enough
      }
    }
  }

  // Pick best transfers (prefer well-known hubs)
  const HUB_PRIORITY = ['farmgate', 'mohakhali', 'gulistan', 'shahbag', 'bijoy_sarani',
    'gabtoli', 'sayedabad', 'motijheel', 'shyamoli', 'mirpur10', 'uttara', 'badda',
    'rampura', 'jatrabari', 'gulshan1', 'banani', 'pallabi', 'technical', 'kallyanpur'];

  transfers.sort((a, b) => {
    const pa = HUB_PRIORITY.indexOf(a.transfer);
    const pb = HUB_PRIORITY.indexOf(b.transfer);
    if (pa !== -1 && pb !== -1) return pa - pb;
    if (pa !== -1) return -1;
    if (pb !== -1) return 1;
    return 0;
  });

  for (const t of transfers.slice(0, 2)) {
    const xLbl = stationLabel(t.transfer);
    const fLbl = stationLabel(fromId);
    const tLbl = stationLabel(toId);
    results.push({
      legs: [
        {
          bus: t.bus1.name,
          busBn: t.bus1.bnName ?? t.bus1.name,
          busType: t.bus1.type ?? 'Local',
          from: fLbl.en,
          fromBn: fLbl.bn,
          to: xLbl.en,
          toBn: xLbl.bn,
          stopsBetween: 0,
        },
        {
          bus: t.bus2.name,
          busBn: t.bus2.bnName ?? t.bus2.name,
          busType: t.bus2.type ?? 'Local',
          from: xLbl.en,
          fromBn: xLbl.bn,
          to: tLbl.en,
          toBn: tLbl.bn,
          stopsBetween: 0,
        },
      ],
      transferAt: xLbl.en,
      transferAtBn: xLbl.bn,
    });
    if (results.length >= 3) break;
  }

  return results;
}

/**
 * Fuzzy-match a place name token to a STATION id.
 * Returns null when nothing matches well enough.
 */
export function fuzzyMatchStop(token: string): string | null {
  const t = token.toLowerCase().trim();
  if (!t) return null;
  // Direct id match
  if ((STATIONS as Record<string, unknown>)[t]) return t;
  // Search by name/bnName
  for (const [id, s] of Object.entries(STATIONS as Record<string, { name?: string; bnName?: string }>)) {
    const name = (s.name ?? '').toLowerCase();
    const bn = (s.bnName ?? '').toLowerCase();
    if (name === t || bn === t) return id;
    if (name.includes(t) || t.includes(name.replace(/\s+/g, '')) || bn.includes(t)) return id;
  }
  return null;
}

/** Format a transit plan as a compact string for AI context injection. */
export function formatTransitPlan(from: string, to: string, routes: TransitRoute[]): string {
  if (routes.length === 0) return '';
  const lines: string[] = [`[TRANSIT PLAN: ${from} → ${to}]`];
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    if (r.legs.length === 1) {
      const l = r.legs[0];
      lines.push(`Option ${i + 1} (Direct): Take ${l.bus} (${l.busBn}) — ${l.from} directly to ${l.to}`);
    } else {
      const l1 = r.legs[0];
      const l2 = r.legs[1];
      lines.push(`Option ${i + 1} (1 Transfer at ${r.transferAt}): Take ${l1.bus} (${l1.busBn}) from ${l1.from} → ${l1.to}, then transfer to ${l2.bus} (${l2.busBn}) → ${l2.to}`);
    }
  }
  return lines.join('\n');
}
