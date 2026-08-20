/**
 * Community Data Service
 * Handles read/write for all community-driven features:
 * bus ratings, traffic reports, bus location reports, trip reminders, bus photos.
 * All writes go to the private koyjabo data repo via the Cloudflare proxy.
 * All reads require an authenticated user.
 */

const PROXY = (import.meta.env.VITE_API_PROXY as string | undefined)
  || 'https://koyjabo-auth-proxy.fagun115946.workers.dev';

import { BUS_DATA } from '../constants';
import { getDeviceId } from './busLiveService';

// In-memory cache to avoid hammering the proxy with duplicate reads (e.g. 60 concurrent ratings fetches)
const _cache = new Map<string, { data: unknown; expiresAt: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Concurrency limiter — cap simultaneous proxy requests to avoid 429s
const MAX_CONCURRENT = 5;
let _active = 0;
const _queue: Array<() => void> = [];

function _acquire(): Promise<void> {
  if (_active < MAX_CONCURRENT) { _active++; return Promise.resolve(); }
  return new Promise(resolve => _queue.push(resolve));
}

function _release(): void {
  const next = _queue.shift();
  if (next) { next(); } else { _active--; }
}

function _invalidate(path: string): void {
  _cache.delete(path);
}

const COMMUNITY_QUEUE_KEY = 'kj_pending_community_writes';
const communityCacheKey = (path: string) => `kj_community_cache:${path}`;

/** Result of a community write: saved online, queued offline, or failed entirely. */
export type WriteStatus = 'saved' | 'queued' | 'failed';

type PendingCommunityWrite = {
  id: string;
  path: string;
  content: unknown;
  message: string;
  createdAt: number;
  kind?: 'put' | 'delete';
  cfToken?: string;
  needsToken?: boolean;
  /** true = full-file overwrite on flush (delete-style rewrites); false = merge with remote. */
  replace?: boolean;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** No accounts — always null (removed auth remnant kept for call-site compatibility). */
export function getAuthUser(): { id: string; displayName: string; username: string; avatarUrl?: string; email?: string } | null {
  return null;
}

/**
 * getCommunityUser — identity for community features. KoyJabo has no
 * accounts: a stable anonymous per-device identity (same device id as live
 * bus sharing) is always used.
 */
export function getCommunityUser(): { id: string; displayName: string; username: string; avatarUrl?: string; email?: string } | null {
  try {
    const deviceId = getDeviceId();
    return { id: deviceId, displayName: 'Passenger', username: 'anonymous', email: undefined };
  } catch { return null; }
}

function getPendingCommunityWrites(): PendingCommunityWrite[] {
  try {
    const items = JSON.parse(localStorage.getItem(COMMUNITY_QUEUE_KEY) ?? '[]');
    return Array.isArray(items) ? items : [];
  } catch { return []; }
}

function savePendingCommunityWrites(items: PendingCommunityWrite[]) {
  try { localStorage.setItem(COMMUNITY_QUEUE_KEY, JSON.stringify(items)); } catch { /* quota */ }
}

function readCommunityCache<T>(path: string): T | null {
  try {
    const cached = localStorage.getItem(communityCacheKey(path));
    return cached ? JSON.parse(cached) as T : null;
  } catch { return null; }
}

function writeCommunityCache(path: string, content: unknown) {
  try { localStorage.setItem(communityCacheKey(path), JSON.stringify(content)); } catch { /* quota */ }
}

function queueCommunityPut(path: string, content: unknown, message: string, cfToken?: string, replace = false): boolean {
  const next = getPendingCommunityWrites().filter(item => item.path !== path);
  next.push({ id: crypto.randomUUID(), path, content, message, createdAt: Date.now(), kind: 'put', cfToken, replace });
  savePendingCommunityWrites(next.slice(-100));
  writeCommunityCache(path, content);
  return getPendingCommunityWrites().some(item => item.path === path);
}

function queueCommunityDelete(path: string, message: string): boolean {
  const next = getPendingCommunityWrites().filter(item => item.path !== path);
  next.push({ id: crypto.randomUUID(), path, content: null, message, createdAt: Date.now(), kind: 'delete' });
  savePendingCommunityWrites(next.slice(-100));
  return getPendingCommunityWrites().some(item => item.path === path);
}

async function repoGet<T>(path: string, force = false): Promise<T | null> {
  if (!force) {
    const hit = _cache.get(path);
    if (hit && hit.expiresAt > Date.now()) return hit.data as T;
  }

  await _acquire();
  try {
    // User-bound paths are session-gated on the worker — send the token when
    // logged in, or the read comes back as missing.
    const isUserBound = /^data\/(history|devices|reminders|avatars|chat)\//.test(path);
    const sessionToken = isUserBound ? _sessionToken() : '';
    const res = await fetch(
      `${PROXY}/gh?r=d&p=${encodeURIComponent(path)}&_t=${Date.now()}${sessionToken ? `&t=${encodeURIComponent(sessionToken)}` : ''}`,
      { cache: 'no-store' }
    );
    if (res.status === 404) {
      const fallback = readCommunityCache<T>(path);
      _cache.set(path, { data: fallback, expiresAt: Date.now() + CACHE_TTL });
      return fallback;
    }
    if (!res.ok) {
      const fallback = readCommunityCache<T>(path);
      _cache.set(path, { data: fallback, expiresAt: Date.now() + CACHE_TTL });
      return fallback;
    }
    const text = await res.text();
    if (!text || text === 'null') {
      const fallback = readCommunityCache<T>(path);
      _cache.set(path, { data: fallback, expiresAt: Date.now() + CACHE_TTL });
      return fallback;
    }
    const data = JSON.parse(text) as T;
    writeCommunityCache(path, data);
    _cache.set(path, { data, expiresAt: Date.now() + CACHE_TTL });
    return data;
  } catch {
    const fallback = readCommunityCache<T>(path);
    _cache.set(path, { data: fallback, expiresAt: Date.now() + CACHE_TTL });
    return fallback;
  }
  finally { _release(); }
}

function _sessionToken(): string {
  try { return localStorage.getItem('koyjabo_session_token') || ''; } catch { return ''; }
}

async function repoDelete(path: string, message?: string): Promise<boolean> {
  const user = getAuthUser();
  const deviceId = getDeviceId();
  try {
    const res = await fetch(`${PROXY}/gh`, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: crypto.randomUUID(),
        action: 'delete-data',
        userId: user?.id || deviceId,
        sessionToken: _sessionToken(),
        deviceId,
        data: JSON.stringify({ path, message: message || `delete: ${path}` }),
      }),
    });
    if (!res.ok) return false;
    const json = await res.json().catch(() => ({})) as { success?: boolean };
    if (json.success === true) _invalidate(path);
    return json.success === true;
  } catch { return false; }
}

async function repoPutDetailed(path: string, content: unknown, message?: string, cfToken?: string): Promise<{ ok: boolean; status: number }> {
  const user = getAuthUser();
  const deviceId = getDeviceId();
  try {
    const res = await fetch(`${PROXY}/gh`, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: crypto.randomUUID(),
        action: 'save-data',
        userId: user?.id || deviceId,
        sessionToken: _sessionToken(),
        deviceId,
        ...(cfToken ? { cfToken } : {}),
        data: JSON.stringify({ path, content, message: message || `community: ${path}` }),
      }),
    });
    if (res.ok) _invalidate(path);
    return { ok: res.ok, status: res.status };
  } catch { return { ok: false, status: 0 }; }
}

async function repoPut(path: string, content: unknown, message?: string, cfToken?: string): Promise<boolean> {
  return (await repoPutDetailed(path, content, message, cfToken)).ok;
}

/**
 * Write-or-queue: online → save now; offline or failed → save to device queue,
 * auto-flushed on reconnect. Returns 'saved' | 'queued' | 'failed'.
 */
async function repoPutOrQueue(path: string, content: unknown, message: string, cfToken?: string, replace = false): Promise<WriteStatus> {
  writeCommunityCache(path, content);
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return queueCommunityPut(path, content, message, cfToken, replace) ? 'queued' : 'failed';
  }
  const res = await repoPutDetailed(path, content, message, cfToken);
  if (res.ok) return 'saved';
  return queueCommunityPut(path, content, message, cfToken, replace) ? 'queued' : 'failed';
}

/** Delete-or-queue: offline deletes are queued and replayed on reconnect. */
async function repoDeleteOrQueue(path: string, message: string): Promise<WriteStatus> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return queueCommunityDelete(path, message) ? 'queued' : 'failed';
  }
  const ok = await repoDelete(path, message);
  if (ok) return 'saved';
  return queueCommunityDelete(path, message) ? 'queued' : 'failed';
}

// ── Offline queue merge / flush ───────────────────────────────────────────────
// Flush is merge-based: each queued write is merged with the freshest remote
// content by item identity, so an offline user's adds never clobber writes that
// landed while they were away. Sequential 2.2s spacing keeps us under the
// worker's 30-writes/min rate limit.

/** Identity key of a single item inside a collection file, per file type. */
function identityOf(item: Record<string, unknown> | null | undefined, path: string): string | undefined {
  if (!item) return undefined;
  if (path.startsWith('data/plate-suggestions/')) return String(item.plate ?? '');
  if (path.startsWith('data/ratings/') || path.startsWith('data/train-ratings/')) return String(item.timestamp ?? item.id ?? '');
  if (path.startsWith('data/photos/') || path.startsWith('data/train-photos/')) return String(item.id ?? '');
  if (path.startsWith('data/traffic/') || path.startsWith('data/bus-locations/')) return String(item.id ?? item.userId ?? '');
  return undefined;
}

function collectionArrayField(path: string): string | null {
  if (path.startsWith('data/plate-suggestions/')) return 'suggestions';
  if (path.startsWith('data/ratings/') || path.startsWith('data/train-ratings/')) return 'ratings';
  if (path.startsWith('data/photos/') || path.startsWith('data/train-photos/')) return 'photos';
  if (path.startsWith('data/traffic/') || path.startsWith('data/bus-locations/')) return 'reports';
  return null;
}

/** Merge a queued full-file write into fresher remote content. Queued items win on key conflict. */
function mergeCommunityContent(path: string, remote: unknown, queued: unknown): unknown {
  if (!remote) return queued;
  if (!queued) return remote;
  const field = collectionArrayField(path);
  if (!field) return queued; // unknown shape — trust the newest local view
  const remoteArr = (remote as Record<string, unknown>)[field];
  const queuedArr = (queued as Record<string, unknown>)[field];
  if (!Array.isArray(queuedArr) || queuedArr.length === 0) return remote;
  if (!Array.isArray(remoteArr)) return queued;

  const keyOf = (item: unknown) => identityOf(item as Record<string, unknown>, path);
  const merged: unknown[] = [...remoteArr];
  const seen = new Set(remoteArr.map(keyOf));
  for (const item of queuedArr) {
    const key = keyOf(item);
    if (key && seen.has(key)) continue; // remote already has it (or remote's newer version wins)
    merged.push(item);
    if (key) seen.add(key);
  }

  const result: Record<string, unknown> = { ...(remote as Record<string, unknown>), [field]: merged };
  // Recompute derived aggregates for rating files (average/count must match the array).
  if (path.startsWith('data/ratings/') || path.startsWith('data/train-ratings/')) {
    const stars = (merged as { stars: number }[]).map(r => r.stars);
    result.average = stars.length ? Math.round((stars.reduce((s, v) => s + v, 0) / stars.length) * 10) / 10 : 0;
    result.count = stars.length;
  }
  if (path.startsWith('data/bus-locations/')) {
    result.lastUpdated = Math.max(
      (remote as BusLocationData).lastUpdated || 0,
      (queued as BusLocationData).lastUpdated || 0,
    );
  }
  if (path.startsWith('data/traffic/')) {
    result.date = (queued as DailyTrafficReports).date || (remote as DailyTrafficReports).date;
  }
  return result;
}

async function flushPutItem(item: PendingCommunityWrite): Promise<'done' | 'retry' | 'blocked'> {
  if (!item.content) return 'done';
  // Fresh read (bypasses the 5-min mem cache) so we merge against the newest remote state.
  const fresh = await repoGet<unknown>(item.path, true);
  const content = item.replace ? item.content : mergeCommunityContent(item.path, fresh, item.content);
  const isPhoto = item.path.startsWith('data/photos/') || item.path.startsWith('data/train-photos/');
  let res = await repoPutDetailed(item.path, content, item.message, item.cfToken);
  if (res.status === 429) {
    // Rate-limited — wait 10s and retry once.
    await delay(10_000);
    res = await repoPutDetailed(item.path, content, item.message, item.cfToken);
  }
  if (res.ok) return 'done';
  if (res.status === 403 && isPhoto) return 'blocked'; // turnstile reject — needs a fresh token
  return 'retry';
}

async function flushPendingItem(item: PendingCommunityWrite): Promise<boolean> {
  if (item.kind === 'delete') {
    return repoDelete(item.path, item.message);
  }
  const out = await flushPutItem(item);
  if (out === 'blocked') { item.needsToken = true; return false; }
  return out === 'done';
}

/** Push all queued writes to the repo. Keeps failures queued. Spaced 2.2s to respect the 30/min limit. */
export async function flushPendingCommunityWrites(): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;
  const pending = getPendingCommunityWrites();
  if (pending.length === 0) return;

  const remaining: PendingCommunityWrite[] = [];
  for (let i = 0; i < pending.length; i++) {
    const item = pending[i];
    const ok = await flushPendingItem(item);
    if (!ok) remaining.push(item);
    if (i < pending.length - 1) await delay(2200); // 2.2s spacing, not after last item
  }
  savePendingCommunityWrites(remaining);
}

/** Number of queued community writes (any kind). */
export function getPendingWriteCount(): number {
  return getPendingCommunityWrites().length;
}

/** Number of queued photo uploads (bus + train) awaiting a turnstile token or connection. */
export function getPendingPhotoCount(): number {
  return getPendingCommunityWrites().filter(item =>
    item.kind !== 'delete'
    && (item.path.startsWith('data/photos/') || item.path.startsWith('data/train-photos/'))
  ).length;
}

/**
 * Flush only photo items using a freshly verified turnstile token (queued tokens
 * expire ~5 min). Returns number of photos flushed; remaining stay queued.
 */
export async function flushPendingPhotosWithToken(cfToken: string): Promise<number> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return 0;
  const pending = getPendingCommunityWrites();
  const photos = pending.filter(item =>
    item.kind !== 'delete'
    && (item.path.startsWith('data/photos/') || item.path.startsWith('data/train-photos/'))
  );
  if (photos.length === 0) return 0;

  const remaining = pending.filter(item => !photos.includes(item));
  let done = 0;
  for (let i = 0; i < photos.length; i++) {
    const item = { ...photos[i], cfToken: cfToken || photos[i].cfToken, needsToken: false };
    const out = await flushPutItem(item);
    if (out === 'done') { done++; continue; }
    remaining.push(out === 'blocked' ? { ...item, needsToken: true } : { ...item, cfToken: undefined });
    if (i < photos.length - 1) await delay(2200);
  }
  savePendingCommunityWrites(remaining);
  return done;
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => { void flushPendingCommunityWrites(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void flushPendingCommunityWrites();
  });
  void flushPendingCommunityWrites();
}

const today = () => new Date().toISOString().split('T')[0];

// ── Bus Ratings ───────────────────────────────────────────────────────────────

export interface BusRating {
  userId: string;
  displayName: string;
  busId: string;
  stars: number;       // 1–5
  comment: string;
  timestamp: number;
  upvotes?: string[];  // userId[] who marked this review helpful
}

export interface BusRatingSummary {
  busId: string;
  average: number;
  count: number;
  ratings: BusRating[];
}

export async function getBusRatings(busId: string): Promise<BusRatingSummary | null> {
  return repoGet<BusRatingSummary>(`data/ratings/${busId}.json`);
}

export async function submitBusRating(busId: string, stars: number, comment: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const normalizedComment = (comment ?? '').trim();
  // Keep comment optional while ensuring persistence never rejects empty payloads.
  const persistedComment = normalizedComment.length > 0 ? normalizedComment : ' ';
  const existing = await getBusRatings(busId) || { busId, average: 0, count: 0, ratings: [] };
  const filtered = existing.ratings.filter(r => r.userId !== user.id);
  const newRating: BusRating = { userId: user.id, displayName: user.displayName, busId, stars, comment: persistedComment, timestamp: Date.now() };
  const ratings = [...filtered, newRating];
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  return repoPutOrQueue(`data/ratings/${busId}.json`, { busId, average: Math.round(average * 10) / 10, count: ratings.length, ratings }, `rating: ${busId}`);
}

export async function deleteBusRating(busId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await getBusRatings(busId);
  if (!existing) return 'failed';

  const ratings = existing.ratings.filter(r => r.userId !== user.id);
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  return repoPutOrQueue(
    `data/ratings/${busId}.json`,
    { busId, average: Math.round(average * 10) / 10, count: ratings.length, ratings },
    `rating-delete: ${busId}`,
    undefined,
    true // replace: offline delete must win over remote state
  );
}

/** Toggle "Helpful" upvote on a review. Returns updated rating (or null). */
export async function toggleRatingUpvote(busId: string, ratingTimestamp: number): Promise<BusRating | null> {
  const voterId = getDeviceId();
  const existing = await getBusRatings(busId);
  if (!existing) return null;
  const target = existing.ratings.find(r => r.timestamp === ratingTimestamp);
  if (!target) return null;
  const upvotes = target.upvotes ?? [];
  const next = upvotes.includes(voterId) ? upvotes.filter(id => id !== voterId) : [...upvotes, voterId];
  const updated = { ...target, upvotes: next };
  const ratings = existing.ratings.map(r => (r.timestamp === ratingTimestamp ? updated : r));
  const status = await repoPutOrQueue(
    `data/ratings/${busId}.json`,
    { ...existing, ratings },
    `upvote: ${busId}`
  );
  return status === 'failed' ? null : updated;
}

// ── Train Ratings ─────────────────────────────────────────────────────────────

export interface TrainRating {
  userId: string;
  displayName: string;
  trainId: string;
  trainName: string;
  stars: number;       // 1–5
  comment: string;
  timestamp: number;
}

export interface TrainRatingSummary {
  trainId: string;
  trainName: string;
  average: number;
  count: number;
  ratings: TrainRating[];
}

export async function getTrainRatings(trainId: string): Promise<TrainRatingSummary | null> {
  return repoGet<TrainRatingSummary>(`data/train-ratings/${trainId}.json`);
}

export async function submitTrainRating(trainId: string, trainName: string, stars: number, comment: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const normalizedComment = (comment ?? '').trim();
  // Keep comment optional while ensuring persistence never rejects empty payloads.
  const persistedComment = normalizedComment.length > 0 ? normalizedComment : ' ';
  const existing = await getTrainRatings(trainId) || { trainId, trainName, average: 0, count: 0, ratings: [] };
  const filtered = existing.ratings.filter(r => r.userId !== user.id);
  const newRating: TrainRating = { userId: user.id, displayName: user.displayName, trainId, trainName, stars, comment: persistedComment, timestamp: Date.now() };
  const ratings = [...filtered, newRating];
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  return repoPutOrQueue(
    `data/train-ratings/${trainId}.json`,
    { trainId, trainName, average: Math.round(average * 10) / 10, count: ratings.length, ratings },
    `train-rating: ${trainId}`
  );
}

export async function deleteTrainRating(trainId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await getTrainRatings(trainId);
  if (!existing) return 'failed';

  const ratings = existing.ratings.filter(r => r.userId !== user.id);
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  return repoPutOrQueue(
    `data/train-ratings/${trainId}.json`,
    { trainId, trainName: existing.trainName, average: Math.round(average * 10) / 10, count: ratings.length, ratings },
    `train-rating-delete: ${trainId}`,
    undefined,
    true
  );
}

// ── Traffic / Delay Reports ───────────────────────────────────────────────────

export interface TrafficReport {
  id: string;
  userId: string;
  displayName: string;
  location: string;
  busId?: string;
  busName?: string;
  type: 'heavy_traffic' | 'accident' | 'road_block' | 'bus_delayed' | 'bus_cancelled';
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: number;
  upvotes: string[]; // userId[]
}

export interface DailyTrafficReports {
  date: string;
  reports: TrafficReport[];
}

const TRAFFIC_CACHE_KEY = 'kj_traffic_cache';

export async function getTodayTrafficReports(): Promise<TrafficReport[]> {
  try {
    const data = await repoGet<DailyTrafficReports>(`data/traffic/${today()}.json`);
    if (data?.reports) {
      localStorage.setItem(TRAFFIC_CACHE_KEY, JSON.stringify({ date: today(), reports: data.reports }));
      return data.reports;
    }
  } catch { /* fall through to cache */ }
  try {
    const cached = localStorage.getItem(TRAFFIC_CACHE_KEY);
    if (cached) {
      const parsed: DailyTrafficReports = JSON.parse(cached);
      if (parsed.date === today()) return parsed.reports;
    }
  } catch { /* ignore */ }
  return [];
}

export async function submitTrafficReport(
  location: string,
  type: TrafficReport['type'],
  severity: TrafficReport['severity'],
  description: string,
  busId?: string,
  busName?: string,
): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<DailyTrafficReports>(`data/traffic/${today()}.json`) || { date: today(), reports: [] };
  const report: TrafficReport = {
    id: crypto.randomUUID(),
    userId: user.id, displayName: user.displayName,
    location, busId, busName, type, severity, description,
    timestamp: Date.now(), upvotes: [],
  };
  existing.reports.unshift(report);
  if (existing.reports.length > 200) existing.reports = existing.reports.slice(0, 200);
  return repoPutOrQueue(`data/traffic/${today()}.json`, existing, `traffic: ${location}`);
}

export async function upvoteTrafficReport(reportId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<DailyTrafficReports>(`data/traffic/${today()}.json`);
  if (!existing) return 'failed';
  const report = existing.reports.find(r => r.id === reportId);
  if (!report) return 'failed';
  if (!report.upvotes.includes(user.id)) report.upvotes.push(user.id);
  return repoPutOrQueue(`data/traffic/${today()}.json`, existing, `upvote: ${reportId}`);
}

// ── Bus Live Location Reports ─────────────────────────────────────────────────

export interface BusLocationReport {
  userId: string;
  busId: string;
  busName: string;
  stopId: string;
  stopName: string;
  timestamp: number;
  heading?: string;
}

export interface BusLocationData {
  busId: string;
  lastUpdated: number;
  reports: BusLocationReport[];
}

export async function getBusLiveLocation(busId: string): Promise<BusLocationData | null> {
  // Try DTCA live-location endpoint first (best-effort). If that fails, fall back to
  // community-reported data stored in the repo.
  try {
    const bus = BUS_DATA.find(b => b.id === busId);
    const candidates: string[] = [];
    if (bus) {
      if (bus.name) candidates.push(bus.name);
      if ((bus as any).bnName) candidates.push((bus as any).bnName);
      candidates.push(busId);
      const digits = (bus.name || '').match(/\d+/g)?.join('');
      if (digits) candidates.push(digits);
    } else {
      candidates.push(busId);
    }

    const tried = new Set<string>();
    for (let candidate of candidates) {
      if (!candidate) continue;
      candidate = candidate.trim();
      if (!candidate || tried.has(candidate)) continue;
      tried.add(candidate);
      const identifier = encodeURIComponent(candidate);
      const url = `${PROXY}/dtca/live-location?id=${identifier}`;
      try {
        const resp = await fetch(url, { cache: 'no-store' });
        if (!resp.ok) continue;
        const payload = await resp.json().catch(() => null);
        if (!payload) continue;

        const lastUpdated = payload.lastUpdatedAt ? Date.parse(payload.lastUpdatedAt) : Date.now();
        const report: BusLocationReport = {
          userId: `dtca:${payload.identifier ?? candidate}`,
          busId,
          busName: payload.vehicleNumber || payload.v_vrn || bus?.name || candidate,
          stopId: payload.nextStoppage?.id || payload.nextStoppage?.stoppageId || '',
          stopName: payload.nextStoppage?.name || payload.nextStoppage || '',
          timestamp: Number.isFinite(lastUpdated) ? lastUpdated : Date.now(),
          heading: payload.heading ? String(payload.heading) : undefined,
        };

        return { busId, lastUpdated: report.timestamp, reports: [report] };
      } catch (err) {
        // ignore and try next candidate
      }
    }
  } catch (err) {
    // swallow any DTCA lookup errors and fall back to repo data
  }

  const data = await repoGet<BusLocationData>(`data/bus-locations/${busId}.json`);
  if (!data) return null;
  const tenMinAgo = Date.now() - 10 * 60 * 1000;
  data.reports = data.reports.filter(r => r.timestamp > tenMinAgo);
  return data;
}

export async function reportBusLocation(
  busId: string, busName: string, stopId: string, stopName: string, heading?: string,
): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<BusLocationData>(`data/bus-locations/${busId}.json`) || { busId, lastUpdated: 0, reports: [] };
  const tenMinAgo = Date.now() - 10 * 60 * 1000;
  const filtered = existing.reports.filter(r => r.timestamp > tenMinAgo && r.userId !== user.id);
  const report: BusLocationReport = { userId: user.id, busId, busName, stopId, stopName, timestamp: Date.now(), heading };
  return repoPutOrQueue(`data/bus-locations/${busId}.json`, { busId, lastUpdated: Date.now(), reports: [...filtered, report] }, `location: ${busName}`);
}

// ── Trip Reminders ────────────────────────────────────────────────────────────

export interface TripReminder {
  id: string;
  userId: string;
  label: string;
  busId?: string;
  busName?: string;
  fromStop?: string;
  toStop?: string;
  days: number[];   // 0=Sun..6=Sat
  time: string;     // HH:MM
  minutesBefore: number;
  enabled: boolean;
  createdAt: number;
}

const REMINDERS_KEY = 'kj_trip_reminders';

export function getLocalReminders(): TripReminder[] {
  try { return JSON.parse(localStorage.getItem(REMINDERS_KEY) ?? '[]'); } catch { return []; }
}

export function saveLocalReminders(reminders: TripReminder[]): void {
  try { localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders)); } catch { /* quota */ }
}

export async function syncReminders(): Promise<void> {
  const user = getAuthUser();
  if (!user) return;
  const local = getLocalReminders();
  await repoPut(`data/reminders/${user.id}.json`, { userId: user.id, reminders: local, updatedAt: Date.now() }, 'reminders sync');
}

export async function pullReminders(): Promise<void> {
  const user = getAuthUser();
  if (!user) return;
  const remote = await repoGet<{ reminders: TripReminder[] }>(`data/reminders/${user.id}.json`);
  if (!remote?.reminders?.length) return;
  const local = getLocalReminders();
  const localIds = new Set(local.map(r => r.id));
  const merged = [...local, ...remote.reminders.filter(r => !localIds.has(r.id))];
  saveLocalReminders(merged);
}

// ── Bus Photos ────────────────────────────────────────────────────────────────

export interface BusPhoto {
  id: string;
  userId: string;
  displayName: string;
  busId: string;
  busName: string;
  caption: string;
  dataUrl: string;   // base64 — kept small (max 300KB after compress)
  timestamp: number;
}

export interface BusPhotoCollection {
  busId: string;
  photos: BusPhoto[];
}

export async function getBusPhotos(busId: string): Promise<BusPhoto[]> {
  const data = await repoGet<BusPhotoCollection>(`data/photos/${busId}.json`);
  return data?.photos ?? [];
}

export async function submitBusPhoto(busId: string, busName: string, caption: string, dataUrl: string, cfToken?: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<BusPhotoCollection>(`data/photos/${busId}.json`) || { busId, photos: [] };
  const photo: BusPhoto = { id: crypto.randomUUID(), userId: user.id, displayName: user.displayName, busId, busName, caption, dataUrl, timestamp: Date.now() };
  existing.photos.unshift(photo);
  if (existing.photos.length > 50) existing.photos = existing.photos.slice(0, 50);
  return repoPutOrQueue(`data/photos/${busId}.json`, existing, `photo: ${busName}`, cfToken);
}

export async function deleteBusPhoto(busId: string, photoId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<BusPhotoCollection>(`data/photos/${busId}.json`);
  if (!existing) return 'failed';
  const before = existing.photos.length;
  existing.photos = existing.photos.filter(p => !(p.id === photoId && p.userId === user.id));
  if (existing.photos.length === before) return 'failed'; // photo not found or not owned by user
  return repoPutOrQueue(`data/photos/${busId}.json`, existing, `photo-delete: ${photoId}`, undefined, true);
}

// ── Seat Availability helper (external links) ─────────────────────────────────

export function buildSeatAvailabilityLinks(trainName: string, trainNumber: string) {
  const encoded = encodeURIComponent(trainName);
  return {
    railwayGov: `https://eticket.railway.gov.bd/`,
    shohoz: `https://www.shohoz.com/booking/train/search?from=Dhaka&to=&date=${today()}`,
    seatplan: `https://seatplan.net/train/${encodeURIComponent(trainNumber || trainName)}`,
    label: trainName,
  };
}

// ── Train Photos ──────────────────────────────────────────────────────────────

export interface TrainPhoto {
  id: string;
  userId: string;
  displayName: string;
  trainId: string;
  trainName: string;
  caption: string;
  dataUrl: string;   // base64 — kept small (max 300KB after compress)
  timestamp: number;
}

export interface TrainPhotoCollection {
  trainId: string;
  photos: TrainPhoto[];
}

export async function getTrainPhotos(trainId: string): Promise<TrainPhoto[]> {
  const data = await repoGet<TrainPhotoCollection>(`data/train-photos/${trainId}.json`);
  return data?.photos ?? [];
}

export async function submitTrainPhoto(trainId: string, trainName: string, caption: string, dataUrl: string, cfToken?: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<TrainPhotoCollection>(`data/train-photos/${trainId}.json`) || { trainId, photos: [] };
  const photo: TrainPhoto = { id: crypto.randomUUID(), userId: user.id, displayName: user.displayName, trainId, trainName, caption, dataUrl, timestamp: Date.now() };
  existing.photos.unshift(photo);
  if (existing.photos.length > 50) existing.photos = existing.photos.slice(0, 50);
  return repoPutOrQueue(`data/train-photos/${trainId}.json`, existing, `train-photo: ${trainName}`, cfToken);
}

export async function deleteTrainPhoto(trainId: string, photoId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<TrainPhotoCollection>(`data/train-photos/${trainId}.json`);
  if (!existing) return 'failed';
  const before = existing.photos.length;
  existing.photos = existing.photos.filter(p => !(p.id === photoId && p.userId === user.id));
  if (existing.photos.length === before) return 'failed';
  return repoPutOrQueue(`data/train-photos/${trainId}.json`, existing, `train-photo-delete: ${photoId}`, undefined, true);
}

// ── Bus Plate Suggestions ─────────────────────────────────────────────────────
// Real-world BD plates: "DMB 12-3814", "DHAKA-BA 12-3814", "DHAKA METRO-GA 12-3814",
// "ঢাকা মেট্রো-গ ১২-৩৮১৪", "চট্টগ্রাম-থ ২৩-৪৫৬৭". Accept any
// [district]-[series] prefix (Latin or Bengali) + NN-NNNN digits (either script).
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const toLatinDigits = (s: string): string => s.replace(/[০-৯]/g, d => String(BN_DIGITS.indexOf(d)));

export const normalizePlate = (plate: string): string =>
  toLatinDigits(plate).toUpperCase().replace(/\s+/g, ' ').trim();

export const PLATE_REGEX = /^(?:DMB|[A-Z][A-Z ]+-[A-Z]{1,3}|[ঀ-৿][ঀ-৿ ]+-[ঀ-৿]{1,2})\s+\d{2}-\d{4}$/;

export type PlateSuggestion = {
  id: string;
  busId: string;
  busName: string;
  plate: string;
  userId: string;
  displayName: string;
  timestamp: number;
  status: 'pending' | 'verified' | 'rejected';
};

type PlateSuggestionCollection = {
  busId: string;
  suggestions: PlateSuggestion[];
};

export async function getBusPlatesuggestons(busId: string): Promise<PlateSuggestion[]> {
  const data = await repoGet<PlateSuggestionCollection>(`data/plate-suggestions/${busId}.json`);
  return data?.suggestions ?? [];
}

export async function submitBusPlate(busId: string, busName: string, plate: string, cfToken?: string): Promise<{ ok: boolean; error?: string; status?: WriteStatus }> {
  const normalised = normalizePlate(plate);
  if (!PLATE_REGEX.test(normalised)) {
    return { ok: false, error: 'Invalid format. Use: DMB 12-3814 or DHAKA-BA 12-3814', status: 'failed' };
  }
  const user = getCommunityUser();
  if (!user) return { ok: false, error: 'Sign in to submit a plate', status: 'failed' };

  const existing = await repoGet<PlateSuggestionCollection>(`data/plate-suggestions/${busId}.json`) || { busId, suggestions: [] };
  const duplicate = existing.suggestions.some(s => s.plate === normalised && s.status !== 'rejected');
  if (duplicate) return { ok: false, error: 'This plate is already submitted', status: 'failed' };

  const entry: PlateSuggestion = {
    id: crypto.randomUUID(),
    busId,
    busName,
    plate: normalised,
    userId: user.id,
    displayName: user.displayName,
    timestamp: Date.now(),
    status: 'pending',
  };
  existing.suggestions.unshift(entry);
  if (existing.suggestions.length > 100) existing.suggestions = existing.suggestions.slice(0, 100);

  const status = await repoPutOrQueue(`data/plate-suggestions/${busId}.json`, existing, `plate-suggest: ${busName} ${normalised}`, cfToken);
  return { ok: status !== 'failed', status };
}

// ── Destination Ratings ─────────────────────────────────────────────────────────
// Paths use the `dest-` prefix so they share the worker's existing
// data/ratings + data/photos write rules without colliding with bus ids.

export interface DestinationRating {
  userId: string;
  displayName: string;
  destId: string;
  stars: number;       // 1–5
  comment: string;
  timestamp: number;
  upvotes?: string[];  // userId[] who marked this review helpful
}

export interface DestinationRatingSummary {
  destId: string;
  average: number;
  count: number;
  ratings: DestinationRating[];
}

const destRatingPath = (destId: string) => `data/ratings/dest-${destId}.json`;
const destPhotoPath = (destId: string) => `data/photos/dest-${destId}.json`;

export async function getDestinationRatings(destId: string): Promise<DestinationRatingSummary | null> {
  return repoGet<DestinationRatingSummary>(destRatingPath(destId));
}

export async function submitDestinationRating(destId: string, stars: number, comment: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const normalizedComment = (comment ?? '').trim();
  const persistedComment = normalizedComment.length > 0 ? normalizedComment : ' ';
  const existing = await getDestinationRatings(destId) || { destId, average: 0, count: 0, ratings: [] };
  const filtered = existing.ratings.filter(r => r.userId !== user.id);
  const newRating: DestinationRating = { userId: user.id, displayName: user.displayName, destId, stars, comment: persistedComment, timestamp: Date.now() };
  const ratings = [...filtered, newRating];
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  return repoPutOrQueue(destRatingPath(destId), { destId, average: Math.round(average * 10) / 10, count: ratings.length, ratings }, `dest-rating: ${destId}`);
}

export async function deleteDestinationRating(destId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await getDestinationRatings(destId);
  if (!existing) return 'failed';
  const ratings = existing.ratings.filter(r => r.userId !== user.id);
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  return repoPutOrQueue(
    destRatingPath(destId),
    { destId, average: Math.round(average * 10) / 10, count: ratings.length, ratings },
    `dest-rating-delete: ${destId}`,
    undefined,
    true
  );
}

export async function toggleDestinationRatingUpvote(destId: string, ratingTimestamp: number): Promise<DestinationRating | null> {
  const voterId = getDeviceId();
  const existing = await getDestinationRatings(destId);
  if (!existing) return null;
  const target = existing.ratings.find(r => r.timestamp === ratingTimestamp);
  if (!target) return null;
  const upvotes = target.upvotes ?? [];
  const next = upvotes.includes(voterId) ? upvotes.filter(id => id !== voterId) : [...upvotes, voterId];
  const updated = { ...target, upvotes: next };
  const ratings = existing.ratings.map(r => (r.timestamp === ratingTimestamp ? updated : r));
  const status = await repoPutOrQueue(destRatingPath(destId), { ...existing, ratings }, `dest-upvote: ${destId}`);
  return status === 'failed' ? null : updated;
}

// ── Destination Photos ──────────────────────────────────────────────────────────

export interface DestinationPhoto {
  id: string;
  userId: string;
  displayName: string;
  destId: string;
  destName: string;
  caption: string;
  dataUrl: string;   // base64 — kept small (max 300KB after compress)
  timestamp: number;
}

export interface DestinationPhotoCollection {
  destId: string;
  photos: DestinationPhoto[];
}

export async function getDestinationPhotos(destId: string): Promise<DestinationPhoto[]> {
  const data = await repoGet<DestinationPhotoCollection>(destPhotoPath(destId));
  return data?.photos ?? [];
}

export async function submitDestinationPhoto(destId: string, destName: string, caption: string, dataUrl: string, cfToken?: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<DestinationPhotoCollection>(destPhotoPath(destId)) || { destId, photos: [] };
  const photo: DestinationPhoto = { id: crypto.randomUUID(), userId: user.id, displayName: user.displayName, destId, destName, caption, dataUrl, timestamp: Date.now() };
  existing.photos.unshift(photo);
  if (existing.photos.length > 50) existing.photos = existing.photos.slice(0, 50);
  return repoPutOrQueue(destPhotoPath(destId), existing, `dest-photo: ${destName}`, cfToken);
}

export async function deleteDestinationPhoto(destId: string, photoId: string): Promise<WriteStatus> {
  const user = getCommunityUser();
  if (!user) return 'failed';
  const existing = await repoGet<DestinationPhotoCollection>(destPhotoPath(destId));
  if (!existing) return 'failed';
  const before = existing.photos.length;
  existing.photos = existing.photos.filter(p => !(p.id === photoId && p.userId === user.id));
  if (existing.photos.length === before) return 'failed';
  return repoPutOrQueue(destPhotoPath(destId), existing, `dest-photo-delete: ${photoId}`, undefined, true);
}
