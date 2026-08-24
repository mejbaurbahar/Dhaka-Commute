// PostHog analytics — user journeys, session replay, error detection.
// Write-only project key, safe to ship in public apps (per PostHog docs).
// Init early (main.tsx); every analyticsService event also mirrors into PostHog.
import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_BC4EpeS64x2xp9qxWSW2tAEqe2ywwK8uFnj2YRM9tL6V';
const POSTHOG_HOST = 'https://us.i.posthog.com';

let inited = false;

export function initPostHog(): void {
    if (inited || typeof window === 'undefined') return;
    inited = true;
    try {
        posthog.init(POSTHOG_KEY, {
            api_host: POSTHOG_HOST,
            defaults: '2026-05-30',   // current default settings tier (matches official snippet)
            person_profiles: 'identified_only',
            capture_pageview: true,   // SPA page views (hooks history API + popstate)
            autocapture: true,        // clicks, inputs, submits
            capture_exceptions: true, // window.onerror + unhandledrejection → Error tracking
            session_recording: {},    // Session replay with defaults
        });
    } catch {
        // analytics must never break the app
    }
}

/** Fire an event into PostHog. No-op until init ran; never throws. */
export function phTrack(event: string, props?: Record<string, string | number>): void {
    try { posthog.capture(event, props ?? {}); } catch { /* best-effort */ }
}
