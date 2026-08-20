import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tokens, Lang, T, SANS, BEN } from '../tokens';
import { SuggestionDropdown } from './SuggestionDropdown';
import { submitBusPlate, getBusPlatesuggestons, normalizePlate, PLATE_REGEX, type PlateSuggestion } from '../../../services/communityDataService';
import { useNetworkStatus } from '../../../utils/networkStatus';

/**
 * Auto-format plate input:
 * - digits only ("121814") → built `DMB 12-1814` (fast-path for most users)
 * - anything with letters ("DHAKA-BA 12-3814", "ঢাকা মেট্রো-গ ১২-৩৮১৪") is kept
 *   as typed — real plates must survive verbatim.
 */
const formatPlateInput = (raw: string): string => {
  const latin = normalizePlate(raw);
  if (/[A-Zঀ-৿]/.test(latin)) {
    return latin.replace(/[^A-Zঀ-৿0-9\s-]/g, '').slice(0, 24);
  }
  const digits = latin.replace(/\D/g, '').slice(0, 6);
  if (!digits) return '';
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 6);
  return `DMB ${part1}${part2 ? '-' + part2 : ''}`;
};
const digitsOnly = (p: string) => p.replace(/\D/g, '');
const showPlate = (p: string) => {
  const up = p.toUpperCase();
  return /^\d{2}-\d{4}$/.test(up) ? `DMB ${up}` : up;
};

interface Props {
  bus: { id: string; name: string };
  plates: string[];
  tk: Tokens;
  lang: Lang;
}

export function BusPlateCard({ bus, plates, tk, lang }: Props) {
  const online = useNetworkStatus();
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [community, setCommunity] = useState<PlateSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Community-suggested plates for THIS bus only — strict scope, never other buses.
  useEffect(() => {
    let alive = true;
    getBusPlatesuggestons(bus.id)
      .then(list => { if (alive) setCommunity(list.filter(s => s.status !== 'rejected')); })
      .catch(() => { /* offline — known plates still work */ });
    return () => { alive = false; };
  }, [bus.id]);

  const allPlates = useMemo(() => {
    const fromConst = plates.map(p => p.toUpperCase());
    const fromCommunity = community
      .map(s => s.plate.toUpperCase())
      .filter(p => !fromConst.includes(p));
    return [...fromConst, ...fromCommunity].filter((p, i, a) => a.indexOf(p) === i);
  }, [plates, community]);

  const known = useMemo(() => allPlates.map(p => ({ id: p, label: showPlate(p) })), [allPlates]);

  const inputDigits = digitsOnly(input);
  const filtered = known.filter(k => !inputDigits || digitsOnly(k.id).includes(inputDigits));
  const addNew = inputDigits.length >= 6 && !known.some(k => digitsOnly(k.id) === inputDigits);
  const dropdown = addNew
    ? [{ id: 'add-new', label: T(lang, 'কোনো বাস নম্বর পাওয়া যায়নি — এখনই যোগ করুন', 'No bus number found — add now') }]
    : filtered;

  const valid = PLATE_REGEX.test(normalizePlate(input));

  const handleSave = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setFeedback(null);
    const result = await submitBusPlate(bus.id, bus.name, input.trim());
    setSubmitting(false);
    if (result.status === 'queued') {
      setFeedback({ ok: true, msg: T(lang, 'অফলাইনে সংরক্ষিত — ইন্টারনেট পেলে স্বয়ংক্রিয়ভাবে সিঙ্ক হবে', 'Saved offline — will sync automatically when online') });
      setInput('');
      setFocused(false);
    } else if (result.ok) {
      setFeedback({ ok: true, msg: T(lang, 'ধন্যবাদ! আপনার প্লেট নম্বর জমা হয়েছে।', 'Thanks! Plate submitted for review.') });
      setInput('');
      setFocused(false);
      // Reflect the new plate in the dropdown immediately (remote sync happens on flush).
      const plate = input.trim().toUpperCase();
      setCommunity(prev => prev.some(s => s.plate.toUpperCase() === plate)
        ? prev
        : [{ id: `local-${Date.now()}`, busId: bus.id, busName: bus.name, plate, userId: 'local', displayName: 'Passenger', timestamp: Date.now(), status: 'pending' }, ...prev]);
    } else {
      setFeedback({ ok: false, msg: result.error ?? T(lang, 'জমা দেওয়া যায়নি। আবার চেষ্টা করুন।', 'Could not submit. Try again.') });
    }
  };

  const handleSelect = (s: { id: string; label: string }) => {
    setFocused(false);
    if (s.id === 'add-new') {
      inputRef.current?.focus();
      return;
    }
    // Preserve the stored plate verbatim — reformatting would rewrite
    // "DHAKA METRO-GA 12-3814" into the wrong "DMB 12-3814".
    setInput(s.id);
    setFeedback(null);
  };

  return (
    <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 16 }}>🚍</span>
        <div style={{ fontFamily: BEN, fontWeight: 700, fontSize: 15, color: tk.text }}>
          {T(lang, 'বাসের প্লেট নম্বর', 'Bus Plate Numbers')}
        </div>
      </div>

      {allPlates.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {allPlates.map(p => (
            <span key={p} style={{ background: `${tk.primary}18`, border: `1px solid ${tk.primary}44`, borderRadius: 8, padding: '4px 10px', fontFamily: SANS, fontWeight: 700, fontSize: 12, color: tk.primary, letterSpacing: 0.5 }}>
              {showPlate(p)}
            </span>
          ))}
        </div>
      ) : (
        <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textFaint, marginBottom: 10 }}>
          {T(lang, 'এই বাসের প্লেট নম্বর এখনো যোগ হয়নি।', 'No plate numbers added yet for this bus.')}
        </div>
      )}

      <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textDim, marginBottom: 8 }}>
        {T(lang, 'আপনার বাসের প্লেট দেখুন এবং যোগ করুন:', 'Spot a bus? Add its plate:')}
      </div>

      <div ref={anchorRef} style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { setInput(formatPlateInput(e.target.value)); setFeedback(null); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={e => { if (e.key === 'Enter') void handleSave(); }}
          placeholder={lang === 'bn' ? 'যেমন: DMB 12-3814 বা DHAKA-BA 12-3814' : 'e.g. DMB 12-3814 or DHAKA-BA 12-3814'}
          maxLength={24}
          style={{ flex: 1, background: tk.panelMuted, border: `1.5px solid ${input && !valid ? '#ef4444' : tk.line}`, borderRadius: 10, padding: '9px 12px', fontFamily: SANS, fontSize: 13, color: tk.text, outline: 'none' }}
        />
        <button
          onClick={() => void handleSave()}
          disabled={!valid || submitting}
          style={{ background: valid && !submitting ? tk.primary : tk.line, color: '#fff', border: 'none', borderRadius: 10, padding: '9px 14px', fontFamily: SANS, fontWeight: 700, fontSize: 13, cursor: valid && !submitting ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'background 0.2s' }}
        >
          {submitting ? '...' : T(lang, 'যোগ করুন', 'Add')}
        </button>
      </div>
      {focused && <SuggestionDropdown suggestions={dropdown} onSelect={handleSelect} onDismiss={() => setFocused(false)} tk={tk} lang={lang} anchorRef={anchorRef} icon="🚍" />}

      {input && !valid && (
        <div style={{ fontFamily: SANS, fontSize: 11, color: '#ef4444', marginTop: 4 }}>
          {T(lang, 'ফরম্যাট: DMB 12-3814 বা DHAKA-BA 12-3814', 'Format: DMB 12-3814 or DHAKA-BA 12-3814')}
        </div>
      )}
      {!online && (
        <div style={{ fontFamily: BEN, fontSize: 11, color: '#f59e0b', marginTop: 6, padding: '6px 10px', background: 'rgba(245,158,11,0.1)', borderRadius: 8 }}>
          {T(lang, 'অফলাইন — প্লেট ডিভাইসে সংরক্ষিত হবে, ইন্টারনেট পেলে সিঙ্ক হবে', 'Offline — plate saves to your device and syncs when online')}
        </div>
      )}
      {feedback && (
        <div style={{ fontFamily: BEN, fontSize: 12, color: feedback.ok ? '#10b981' : '#ef4444', marginTop: 6, padding: '6px 10px', background: feedback.ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
          {feedback.msg}
        </div>
      )}
    </div>
  );
}
