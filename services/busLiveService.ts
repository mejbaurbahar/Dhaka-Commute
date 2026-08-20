// Community live bus GPS — koyjabo-bus-live Cloudflare Worker + KV.
//
// Module-level state: sharing survives navigation between screens.
// Passenger identity is NEVER exposed — the worker aggregates per-device
// keys server-side; this service only ever sees busNumber + contributor count.
import { STATIONS } from '../constants';

// ── types ─────────────────────────────────────────────────────────

export interface CommunityBus {
  busNumber: string;
  operatorName: string;
  lat: number;
  lng: number;
  speed: number; // m/s (max across contributors)
  heading: number;
  updatedAt: number;
  contributors: number;
  status: 'moving' | 'idle' | 'stale';
}

export interface BusNumberEntry {
  busNumber: string;
  busId: string;
  operatorName: string;
  firstSeen: number;
  lastSeen: number;
  reportCount: number;
}

export interface SharingState {
  busId: string;
  busNumber: string;
  operatorName: string;
  destStopId: string | null;
  startedAt: number;
}

export interface SharingCallbacks {
  /** Approaching selected destination stop (<350 m). Fires once per approach. */
  onApproach?: (stopId: string) => void;
  /** Own GPS near-static while the shared bus keeps moving → suggest get-off. */
  onAutoLeaveSuggestion?: () => void;
}

type Subscriber = (state: SharingState | null) => void;

// ── config ────────────────────────────────────────────────────────

export const CHECKIN_MS = 10_000; // min interval between checkins (KV write cost)
const STALE_BUS_MS = 120_000; // matches worker STALE_AFTER_MS
const APPROACH_M = 350;
const REARM_M = 600;
const AUTO_LEAVE_SPEED_MPS = 1.5;
const AUTO_LEAVE_SPAN_MS = 90_000;
const AUTO_LEAVE_COOLDOWN_MS = 5 * 60_000;

const DEVICE_ID_KEY = 'koyjabo_device_id';
const API = (() => {
  try {
    const base = (import.meta as any).env?.VITE_BUS_LIVE_URL as string | undefined;
    if (base) return base.replace(/\/$/, '');
  } catch { /* dev fallback below */ }
  return 'https://koyjabo-bus-live.fagun115946.workers.dev';
})();

// ── module state ──────────────────────────────────────────────────

let sharing: SharingState | null = null;
let watchId: number | null = null;
let lastCheckinAt = 0;
let lastFix: { lat: number; lng: number; speed: number; accuracy: number; heading: number; ts: number } | null = null;
const subscribers: Subscriber[] = [];
let callbacks: SharingCallbacks = {};

// detector state
let approachArmed = true;
let slowSince: number | null = null;
let busMovedDuringSlow = false;
let slowStartBusPos: { lat: number; lng: number } | null = null;
let autoLeaveCooldownUntil = 0;

// ── helpers ───────────────────────────────────────────────────────

export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return `dev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }
}

export function normalizeBusNumber(raw: string): string {
  // Latinize Bengali digits (১২-৩৮১৪ → 12-3814) so validation + storage are
  // consistent no matter which script the user typed.
  const latin = String(raw || '').replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
  return latin.toUpperCase().replace(/\s+/g, ' ').trim();
}

export function isBusNumberValid(raw: string): boolean {
  // BD plate: optional district (DA/DHA/CHA/DHAKA…) + series (M / METRO-GA) + number.
  // e.g. "DA M 12-0080", "M 12-2467", "12-2467", "DHAKA METRO-GA 12-3814",
  // "DHAKA-BA 12-3814". Trailing junk like "DA M 12-0080NHB HB" fails.
  return /^(([A-Z]{1,10}(-[A-Z]{1,3})?)( ([A-Z]{1,10}(-[A-Z]{1,3})?))? )?\d{1,2}[- ]\d{2,4}$/.test(normalizeBusNumber(raw));
}

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

async function post(path: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(API + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── public API ────────────────────────────────────────────────────

/** All currently-shared buses on a route (aggregated server-side). */
export async function getBuses(busId: string): Promise<CommunityBus[]> {
  try {
    const res = await fetch(`${API}/api/buses?busId=${encodeURIComponent(busId)}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.buses) ? data.buses : [];
  } catch {
    return [];
  }
}

/** Known bus numbers ever reported on this route (registry, display-only). */
export async function getBusNumbers(busId: string): Promise<BusNumberEntry[]> {
  try {
    const res = await fetch(`${API}/api/bus-numbers?busId=${encodeURIComponent(busId)}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.entries) ? data.entries : [];
  } catch {
    return [];
  }
}

/** Remember a bus number for this route (pre-fill suggestions). */
export async function registerBusNumber(busId: string, busNumber: string, operatorName?: string): Promise<boolean> {
  if (!normalizeBusNumber(busNumber)) return false;
  return post('/api/register-bus', {
    busId,
    busNumber: normalizeBusNumber(busNumber),
    operatorName: (operatorName || '').trim().slice(0, 60),
  });
}

/** Start sharing GPS for a bus. Resolves once the first checkin lands. */
export async function startSharing(opts: {
  busId: string;
  busNumber: string;
  operatorName?: string;
  destStopId?: string | null;
}): Promise<boolean> {
  if (sharing) await stopSharing({ leave: true });
  const deviceId = getDeviceId();
  sharing = {
    busId: opts.busId,
    busNumber: normalizeBusNumber(opts.busNumber),
    operatorName: (opts.operatorName || '').trim().slice(0, 60),
    destStopId: opts.destStopId || null,
    startedAt: Date.now(),
  };
  approachArmed = true;
  slowSince = null;
  busMovedDuringSlow = false;
  slowStartBusPos = null;
  emit();

  const first = await checkin(deviceId);
  if (!first && !('geolocation' in navigator)) {
    sharing = null;
    emit();
    return false;
  }
  startWatcher(deviceId);
  return true;
}

/** Stop sharing. leave=true also removes the KV key immediately (user got off). */
export async function stopSharing(opts: { leave?: boolean } = {}): Promise<void> {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  lastFix = null;
  if (sharing && opts.leave) {
    const deviceId = getDeviceId();
    await post('/api/leave', {
      busId: sharing.busId,
      busNumber: sharing.busNumber,
      deviceId,
    }).catch(() => false);
  }
  sharing = null;
  emit();
}

export function isSharing(): boolean {
  return sharing !== null;
}

export function getSharingState(): SharingState | null {
  return sharing;
}

export function setDestinationStop(stopId: string | null): void {
  if (!sharing) return;
  sharing = { ...sharing, destStopId: stopId };
  approachArmed = true;
  emit();
}

export function subscribe(cb: Subscriber): () => void {
  subscribers.push(cb);
  return () => {
    const i = subscribers.indexOf(cb);
    if (i >= 0) subscribers.splice(i, 1);
  };
}

export function setSharingCallbacks(cb: SharingCallbacks): void {
  callbacks = { ...callbacks, ...cb };
}

export function getNearestStopName(lat: number, lng: number, stopIds: string[]): string {
  let best = stopIds[0];
  let bestKm = Infinity;
  for (const id of stopIds) {
    const s = STATIONS[id];
    if (!s) continue;
    const km = haversineKm(lat, lng, s.lat, s.lng);
    if (km < bestKm) {
      bestKm = km;
      best = id;
    }
  }
  return best;
}

// ── internals ─────────────────────────────────────────────────────

function emit(): void {
  for (const cb of subscribers) cb(sharing);
}

async function checkin(deviceId: string): Promise<boolean> {
  if (!sharing || !lastFix) return false;
  const now = Date.now();
  if (now - lastCheckinAt < CHECKIN_MS) return true; // throttled client-side
  lastCheckinAt = now;
  return post('/api/checkin', {
    busId: sharing.busId,
    busNumber: sharing.busNumber,
    deviceId,
    lat: lastFix.lat,
    lng: lastFix.lng,
    speed: Math.round(lastFix.speed * 10) / 10,
    heading: Math.round(lastFix.heading || 0),
    accuracy: Math.round(lastFix.accuracy || 0),
    operatorName: sharing.operatorName,
    destStopId: sharing.destStopId || '',
  });
}

function startWatcher(deviceId: string): void {
  if (!('geolocation' in navigator)) return;
  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      lastFix = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        speed: pos.coords.speed != null && pos.coords.speed > 0 ? pos.coords.speed : 0,
        accuracy: pos.coords.accuracy,
        heading: pos.coords.heading || 0,
        ts: Date.now(),
      };
      checkin(deviceId);
      runDetectors();
    },
    () => { /* location unavailable — keep last fix, retry next event */ },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 }
  );

  const onVisible = (): void => {
    if (document.visibilityState === 'visible') {
      lastCheckinAt = 0; // force immediate checkin — GPS may have been throttled in background
      checkin(deviceId);
    }
  };
  document.addEventListener('visibilitychange', onVisible);

  const onBeforeUnload = (): void => {
    if (sharing) {
      post('/api/leave', {
        busId: sharing.busId,
        busNumber: sharing.busNumber,
        deviceId,
      });
    }
  };
  window.addEventListener('pagehide', onBeforeUnload);
}

function runDetectors(): void {
  if (!sharing || !lastFix) return;
  const state = sharing;

  // ── approach alert: own fix near destination stop ──
  if (state.destStopId && STATIONS[state.destStopId]) {
    const stop = STATIONS[state.destStopId];
    const dist = haversineKm(lastFix.lat, lastFix.lng, stop.lat, stop.lng) * 1000;
    if (dist < APPROACH_M && approachArmed) {
      approachArmed = false;
      if (callbacks.onApproach) callbacks.onApproach(state.destStopId);
    } else if (dist > REARM_M) {
      approachArmed = true;
    }
  }

  // ── auto get-off suggestion: user near-static for 90s while the bus moved ──
  const now = Date.now();
  const moving = lastFix.speed >= AUTO_LEAVE_SPEED_MPS;
  if (moving) {
    slowSince = null;
    busMovedDuringSlow = false;
    slowStartBusPos = null;
    return;
  }
  if (slowSince === null) {
    slowSince = now;
    slowStartBusPos = { lat: lastFix.lat, lng: lastFix.lng };
    return;
  }
  // track whether the *shared bus* moved while we stayed put — approximate with
  // our own last position: if we haven't moved >15 m and 90 s passed, suggest.
  const selfMoved = haversineKm(slowStartBusPos.lat, slowStartBusPos.lng, lastFix.lat, lastFix.lng) * 1000 > 15;
  if (!selfMoved && now - slowSince > AUTO_LEAVE_SPAN_MS && now > autoLeaveCooldownUntil) {
    autoLeaveCooldownUntil = now + AUTO_LEAVE_COOLDOWN_MS;
    if (callbacks.onAutoLeaveSuggestion) callbacks.onAutoLeaveSuggestion();
  }
}
