import { inHours, trackPushEvent, cancelPushEvent } from '../../services/pushService';

export const BUS_FAVORITES_KEY = 'koyjabo_favorite_buses';

export function getFavoriteBusIds(): string[] {
  try {
    const raw = localStorage.getItem(BUS_FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function setFavoriteBusIds(ids: string[]): void {
  try {
    localStorage.setItem(BUS_FAVORITES_KEY, JSON.stringify(Array.from(new Set(ids))));
    window.dispatchEvent(new Event('koyjabo:favorites-changed'));
  } catch {
    // localStorage can be unavailable in private browsing.
  }
}

export function toggleFavoriteBus(busId: string, name?: string): string[] {
  const current = getFavoriteBusIds();
  const next = current.includes(busId) ? current.filter(id => id !== busId) : [...current, busId];
  setFavoriteBusIds(next);
  // Push reminder: "you saved X — don't forget" (+48h), cancelled on unfavorite.
  const added = next.includes(busId) && !current.includes(busId);
  if (added) {
    trackPushEvent('save', { name: name ?? '' }, inHours(48));
    cancelPushEvent('route-view'); // user saved the route — no need for "planning to travel?" nudge
  } else {
    cancelPushEvent('save');
  }
  return next;
}
