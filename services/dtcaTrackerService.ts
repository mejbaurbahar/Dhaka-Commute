const STORAGE_KEY = 'koyjabo_dtca_tracker_snapshot_v1';
const DTCA_TOKEN_KEY = 'kj_dtca_token_v1';
const REFRESH_MS = 5 * 60 * 1000;
const TARGET_URL = 'https://buskothay.com/dtca-bus-tracking/';
// All DTCA calls go through the CF worker proxy to avoid browser CORS restrictions
const DTCA_PROXY = (import.meta.env.VITE_API_PROXY as string | undefined)?.replace(/\/$/, '')
  || 'https://koyjabo-auth-proxy.fagun115946.workers.dev';

export interface DtcaTrackerSnapshot {
  sourceUrl: string;
  title: string;
  fetchedAt: number;
  fetchedAtLabel: string;
  status: 'ok' | 'offline' | 'unsupported';
  summary: string;
  busHints: string[];
  snippet: string;
}

export interface DtcaStoppage {
  id: string;
  name: string;
  routePlanId?: string;
  [key: string]: unknown;
}

export interface DtcaVehicleLocationPath {
  v_identifier: string;
  time_inserted: string;
  engine_status: boolean;
  lat: number;
  lng: number;
  nearby_l_name: string;
  landmark_distance: number;
  speed_status: number;
  device_status: string;
  sub_ended_at: string;
  [key: string]: unknown;
}

export interface DtcaVehicleLocation {
  id: number;
  v_username: string;
  customer_name: string;
  v_identifier: string;
  landmark_distance: number;
  time_inserted: string;
  device_status: string;
  v_group: string;
  v_vrn: string;
  path: DtcaVehicleLocationPath[];
  last_engine_on: string;
  last_engine_off: string;
  vehicle_name: string | null;
  vehicle_type: string;
  popup_image: string | null;
  marker_image: string | null;
  bst_id: string;
  [key: string]: unknown;
}

// ── Core fetch — all DTCA calls go through CF Worker proxy ──────────────────

async function fetchDtcaProxy<T>(proxyPath: string): Promise<T> {
  const response = await fetch(`${DTCA_PROXY}${proxyPath}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`DTCA proxy request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

// No-op kept for any remaining callers
export async function dtcaLogin(_name: string, _phone: string, _cf: string): Promise<string> {
  return '';
}

// ── Live location ────────────────────────────────────────────────────────────

export interface DtcaLiveLocationData {
  identifier: string;
  latitude: number;
  longitude: number;
  heading: number;
  speedKph: number;
  lastUpdatedAt: string;
  status: string;
  passedStoppageIds: string[];
  nextStoppage: { id: string; name: string; latitude: number; longitude: number } | null;
  upcomingStoppages: Array<{ id: string; name: string }>;
  remainingStoppages: number;
  estimatedArrivalMinutes: number;
  estimatedArrivalTime: string;
  distanceToSelectedStoppageKm: number;
}

export interface DtcaLiveLocationResponse {
  success: boolean;
  data: DtcaLiveLocationData;
}

export async function getDtcaLiveLocation(identifier: string): Promise<DtcaLiveLocationResponse> {
  return fetchDtcaProxy<DtcaLiveLocationResponse>(`/dtca/live-location?id=${encodeURIComponent(identifier)}`);
}

// ── Route details ─────────────────────────────────────────────────────────────

export interface DtcaRouteStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  order: number;
  scheduledArrivalTime: string;
}

export interface DtcaRouteDetailsData {
  routeId: string;
  routeName: string;
  originName: string;
  destinationName: string;
  totalDistanceKm: number;
  vehicle: {
    identifier: string;
    vehicleName: string | null;
    vehicleNumber: string;
    vehicleType: string;
    operatorName: string | null;
    driverName: string | null;
    capacity: number | null;
  };
  stoppages: DtcaRouteStop[];
  path: Array<{ latitude: number; longitude: number }>;
}

export interface DtcaRouteDetailsResponse {
  success: boolean;
  data: DtcaRouteDetailsData;
}

export async function getDtcaRouteDetails(identifier: string): Promise<DtcaRouteDetailsResponse> {
  return fetchDtcaProxy<DtcaRouteDetailsResponse>(`/dtca/route-details?id=${encodeURIComponent(identifier)}`);
}

// ── Vehicle list (with cache) ─────────────────────────────────────────────────

let vehicleCache: { data: DtcaAllVehicleLocationResponse; ts: number } | null = null;
const VEHICLE_CACHE_MS = 5 * 60 * 1000;

export interface DtcaAllVehicleLocationResponse {
  code: number;
  app_message: string;
  user_message: string;
  vehicles: DtcaVehicleLocation[];
}

export async function getDtcaAllVehicleLocation(): Promise<DtcaAllVehicleLocationResponse> {
  return fetchDtcaProxy<DtcaAllVehicleLocationResponse>('/dtca/vehicles');
}

export async function getDtcaAllVehicleLocationCached(): Promise<DtcaAllVehicleLocationResponse> {
  if (vehicleCache && Date.now() - vehicleCache.ts < VEHICLE_CACHE_MS) return vehicleCache.data;
  const data = await getDtcaAllVehicleLocation();
  vehicleCache = { data, ts: Date.now() };
  return data;
}

// ── Stoppage list ─────────────────────────────────────────────────────────────

export interface DtcaStoppageListResponse {
  code: number;
  app_message: string;
  user_message: string;
  stoppages: DtcaStoppage[];
}

export async function getDtcaStoppageList(): Promise<DtcaStoppageListResponse> {
  return fetchDtcaProxy<DtcaStoppageListResponse>('/dtca/stoppages');
}

// ── Snapshot (legacy/snapshot flow) ──────────────────────────────────────────

function formatLabel(ts: number): string {
  const date = new Date(ts);
  return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
}

function readStoredSnapshot(): DtcaTrackerSnapshot | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DtcaTrackerSnapshot;
    return parsed && parsed.sourceUrl ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredSnapshot(snapshot: DtcaTrackerSnapshot): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {}
}

function normalizeSnapshot(payload: Partial<DtcaTrackerSnapshot> | null | undefined, fallbackStatus: DtcaTrackerSnapshot['status'] = 'unsupported'): DtcaTrackerSnapshot {
  const fetchedAt = payload?.fetchedAt || Date.now();
  return {
    sourceUrl: payload?.sourceUrl || TARGET_URL,
    title: payload?.title || 'DTCA tracker snapshot',
    fetchedAt,
    fetchedAtLabel: formatLabel(fetchedAt),
    status: payload?.status || fallbackStatus,
    summary: payload?.summary || 'The public tracker page was reached, but no structured live bus feed was exposed.',
    busHints: Array.isArray(payload?.busHints) ? payload.busHints.filter(Boolean) : [],
    snippet: payload?.snippet || '',
  };
}

async function fetchSnapshotFromWorker(): Promise<DtcaTrackerSnapshot | null> {
  const proxy = (import.meta.env.VITE_API_PROXY as string | undefined)?.replace(/\/$/, '');
  if (!proxy) return null;
  const url = `${proxy}/dtca-snapshot?_t=${Date.now()}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) return null;
  const payload = await response.json().catch(() => null);
  return normalizeSnapshot(payload as Partial<DtcaTrackerSnapshot> | null, 'ok');
}

async function fetchSnapshotFromStaticFile(): Promise<DtcaTrackerSnapshot | null> {
  try {
    const response = await fetch(`/dtca-tracker-snapshot.json?_t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const payload = await response.json().catch(() => null);
    return normalizeSnapshot(payload as Partial<DtcaTrackerSnapshot> | null, 'ok');
  } catch {
    return null;
  }
}

export async function getDtcaTrackerSnapshot(forceRefresh = false): Promise<DtcaTrackerSnapshot> {
  const cached = readStoredSnapshot();
  if (!forceRefresh && cached && Date.now() - cached.fetchedAt < REFRESH_MS) {
    return cached;
  }

  try {
    const workerSnapshot = await fetchSnapshotFromWorker();
    if (workerSnapshot) {
      writeStoredSnapshot(workerSnapshot);
      return workerSnapshot;
    }
  } catch {}

  try {
    const staticSnapshot = await fetchSnapshotFromStaticFile();
    if (staticSnapshot) {
      writeStoredSnapshot(staticSnapshot);
      return staticSnapshot;
    }
  } catch {}

  const fallback = normalizeSnapshot(cached, 'offline');
  fallback.summary = cached?.summary || 'The tracker snapshot could not be refreshed right now. The last saved snapshot remains available.';
  fallback.status = 'offline';
  writeStoredSnapshot(fallback);
  return fallback;
}
