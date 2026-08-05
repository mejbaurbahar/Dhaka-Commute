const STORAGE_KEY = 'koyjabo_dtca_tracker_snapshot_v1';
const REFRESH_MS = 5 * 60 * 1000;
const TARGET_URL = 'https://buskothay.com/dtca-bus-tracking/';
const DTCA_BACKEND = 'https://dtca-backend.bondstein.net/api/v1/passenger';
const DTCA_API_TOKEN = import.meta.env.VITE_DTCA_API_TOKEN as string | undefined;

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
  } catch {
    // Ignore storage failures.
  }
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

async function fetchDtcaBackendJson<T>(path: string): Promise<T> {
  const headers = new Headers({ Accept: 'application/json' });
  if (DTCA_API_TOKEN) {
    headers.set('Authorization', `Bearer ${DTCA_API_TOKEN}`);
  }

  const response = await fetch(`${DTCA_BACKEND}/${path}?_t=${Date.now()}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`DTCA backend request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface DtcaLiveLocationResponse {
  code: number;
  vehicle?: {
    v_vrn?: string;
    v_identifier?: string;
    lat?: number;
    lng?: number;
    speed?: number;
    speed_status?: number;
    device_status?: string;
    nearby_l_name?: string;
    time_inserted?: string;
    customer_name?: string;
  };
  route_plan?: {
    id?: string;
    name?: string;
    from_stoppage_name?: string;
    to_stoppage_name?: string;
  };
  next_stoppage?: {
    name?: string;
    eta_minutes?: number;
    distance_km?: number;
    distance?: number;
  };
  remaining_stoppages_count?: number;
  stoppages?: Array<{
    name?: string;
    sequence?: number;
    status?: string;
  }>;
  [key: string]: unknown;
}

export async function getDtcaLiveLocation(identifier: string): Promise<DtcaLiveLocationResponse> {
  return fetchDtcaBackendJson<DtcaLiveLocationResponse>(`route-plans/live-location?identifier=${encodeURIComponent(identifier)}`);
}

let vehicleCache: { data: DtcaAllVehicleLocationResponse; ts: number } | null = null;
const VEHICLE_CACHE_MS = 5 * 60 * 1000;

export async function getDtcaAllVehicleLocationCached(): Promise<DtcaAllVehicleLocationResponse> {
  if (vehicleCache && Date.now() - vehicleCache.ts < VEHICLE_CACHE_MS) return vehicleCache.data;
  const data = await getDtcaAllVehicleLocation();
  vehicleCache = { data, ts: Date.now() };
  return data;
}

export interface DtcaStoppageListResponse {
  code: number;
  app_message: string;
  user_message: string;
  stoppages: DtcaStoppage[];
}

export async function getDtcaStoppageList(): Promise<DtcaStoppageListResponse> {
  return fetchDtcaBackendJson<DtcaStoppageListResponse>('route-plans/stoppage-list');
}

export interface DtcaAllVehicleLocationResponse {
  code: number;
  app_message: string;
  user_message: string;
  vehicles: DtcaVehicleLocation[];
}

export async function getDtcaAllVehicleLocation(): Promise<DtcaAllVehicleLocationResponse> {
  return fetchDtcaBackendJson<DtcaAllVehicleLocationResponse>('all-vehicle-location');
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
  } catch {
    // Fall through to static snapshot.
  }

  try {
    const staticSnapshot = await fetchSnapshotFromStaticFile();
    if (staticSnapshot) {
      writeStoredSnapshot(staticSnapshot);
      return staticSnapshot;
    }
  } catch {
    // Fall through to cached fallback.
  }

  const fallback = normalizeSnapshot(cached, 'offline');
  fallback.summary = cached?.summary || 'The tracker snapshot could not be refreshed right now. The last saved snapshot remains available.';
  fallback.status = 'offline';
  writeStoredSnapshot(fallback);
  return fallback;
}
