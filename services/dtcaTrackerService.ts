const STORAGE_KEY = 'koyjabo_dtca_tracker_snapshot_v1';
const REFRESH_MS = 5 * 60 * 1000;
const TARGET_URL = 'https://buskothay.com/dtca-bus-tracking/';

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
