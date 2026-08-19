import React, { useState, useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, chipBtn } from '../tokens';
import {
  getDestinationRatings, submitDestinationRating, deleteDestinationRating,
  toggleDestinationRatingUpvote, DestinationRatingSummary, getCommunityUser,
} from '../../../services/communityDataService';
import { trackFeatureUsage } from '../../../services/analyticsService';
import { earnCoins } from '../utils/koyCoinService';

interface Props {
  destId: string;
  destName: string;
  theme: 'dark' | 'light';
  lang: Lang;
  compact?: boolean;
}

function timeAgo(ts: number, lang: Lang): string {
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return T(lang, 'এইমাত্র', 'just now');
  if (diff < 60) return T(lang, `${diff} মিনিট আগে`, `${diff}m ago`);
  if (diff < 1440) return T(lang, `${Math.floor(diff / 60)} ঘণ্টা আগে`, `${Math.floor(diff / 60)}h ago`);
  return T(lang, `${Math.floor(diff / 1440)} দিন আগে`, `${Math.floor(diff / 1440)}d ago`);
}

export function DestinationRating({ destId, destName, theme, lang }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const font = lang === 'bn' ? BEN : SANS;
  const user = getCommunityUser();
  const [summary, setSummary] = useState<DestinationRatingSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const toastTimer = React.useRef<number>(0);

  useEffect(() => { trackFeatureUsage('destination_rating'); }, []);

  useEffect(() => {
    setLoading(true);
    getDestinationRatings(destId)
      .then(setSummary)
      .catch(() => setToast({ msg: T(lang, 'রেটিং লোড হয়নি', 'Failed to load ratings'), ok: false }))
      .finally(() => setLoading(false));
  }, [destId, lang]);

  useEffect(() => {
    if (!toast) return undefined;
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(toastTimer.current);
  }, [toast]);

  const showToast = (msg: string, ok: boolean) => setToast({ msg, ok });

  const myRating = summary?.ratings.find(r => r.userId === user?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const status = await submitDestinationRating(destId, stars, comment);
    if (status !== 'failed') {
      const fresh = await getDestinationRatings(destId);
      setSummary(fresh);
      setShowForm(false);
      setComment('');
      setStars(5);
      earnCoins(5, 'destination_rating');
      showToast(status === 'queued'
        ? T(lang, 'অফলাইনে সংরক্ষিত — ইন্টারনেট পেলে সিঙ্ক হবে', 'Saved offline — will sync when online')
        : T(lang, 'রিভিউ সেভ হয়েছে!', 'Review saved!'), true);
    } else {
      showToast(T(lang, 'সেভ হয়নি। আবার চেষ্টা করুন', 'Failed to save. Try again.'), false);
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    setSubmitting(true);
    const status = await deleteDestinationRating(destId);
    if (status !== 'failed') {
      const fresh = await getDestinationRatings(destId);
      setSummary(fresh);
      setShowForm(false);
      showToast(T(lang, 'রিভিউ মুছে ফেলা হয়েছে', 'Review removed.'), true);
    } else {
      showToast(T(lang, 'মোছা যায়নি', 'Failed to delete.'), false);
    }
    setSubmitting(false);
  };

  const renderStars = (count: number, size = 13) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? '#fbbf24' : tk.textFaint, fontSize: size, opacity: i < count ? 1 : 0.4 }}>
        ★
      </span>
    ));

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', transform: 'translateX(-50%)', top: 76, zIndex: 9400,
          background: toast.ok ? '#065f46' : '#7f1d1d', color: '#fff',
          padding: '10px 18px', borderRadius: 999, fontFamily: font, fontSize: 13, fontWeight: 600,
          boxShadow: '0 10px 30px -8px rgba(0,0,0,.5)',
        }}>
          {toast.msg}
        </div>
      )}

      {loading ? (
        <div style={{ color: tk.textFaint, fontFamily: font, fontSize: 13, padding: '24px 0', textAlign: 'center' }}>
          {T(lang, 'রিভিউ লোড হচ্ছে…', 'Loading reviews…')}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Summary */}
          {summary && summary.count > 0 && (
            <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: tk.text, margin: 0 }}>{summary.average.toFixed(1)}</p>
                <div>{renderStars(Math.round(summary.average), 13)}</div>
                <p style={{ fontFamily: font, fontSize: 11, color: tk.textFaint, margin: '4px 0 0' }}>
                  {T(lang, `${summary.count}টি রিভিউ`, `${summary.count} reviews`)}
                </p>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[5, 4, 3, 2, 1].map(s => {
                  const cnt = summary.ratings.filter(r => r.stars === s).length;
                  const pct = summary.count ? (cnt / summary.count) * 100 : 0;
                  return (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>
                      <span style={{ width: 10 }}>{s}</span>
                      <div style={{ flex: 1, height: 6, borderRadius: 99, background: tk.panelMuted }}>
                        <div style={{ width: `${pct}%`, height: 6, borderRadius: 99, background: '#fbbf24' }} />
                      </div>
                      <span style={{ width: 16, textAlign: 'right' }}>{cnt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form toggle */}
          <button
            onClick={() => setShowForm(v => !v)}
            style={{ ...chipBtn(tk), background: tk.primary, color: tk.primaryInk, border: 'none', padding: '11px 0', borderRadius: 12, fontWeight: 700, fontSize: 14, fontFamily: font, cursor: 'pointer', width: '100%' }}
          >
            {myRating
              ? (showForm ? T(lang, 'বন্ধ করুন', 'Cancel') : T(lang, 'রিভিউ সম্পাদনা', 'Edit review'))
              : (showForm ? T(lang, 'বন্ধ করুন', 'Cancel') : T(lang, 'রিভিউ লিখুন', 'Write a review'))}
          </button>

          {/* Form */}
          {showForm && (
            <form onSubmit={handleSubmit} style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <button key={i} type="button" onClick={() => setStars(i + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 30, padding: 0, color: i < stars ? '#fbbf24' : tk.textFaint, opacity: i < stars ? 1 : 0.35 }}>
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value.slice(0, 500))}
                placeholder={T(lang, 'আপনার অভিজ্ঞতা লিখুন (ঐচ্ছিক)…', 'Share your experience (optional)…')}
                rows={3}
                maxLength={500}
                style={{
                  width: '100%', boxSizing: 'border-box', background: tk.panelMuted, border: `1px solid ${tk.line}`,
                  borderRadius: 12, padding: '10px 12px', color: tk.text, fontFamily: font, fontSize: 14, resize: 'none', outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                {myRating && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={submitting}
                    style={{ ...chipBtn(tk), background: 'transparent', color: '#ef4444', border: `1px solid ${tk.line}`, padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer' }}
                  >
                    {T(lang, 'মুছুন', 'Delete')}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ ...chipBtn(tk), flex: 1, background: tk.primary, color: tk.primaryInk, border: 'none', padding: '11px 0', borderRadius: 12, fontWeight: 700, fontSize: 14, fontFamily: font, cursor: 'pointer' }}
                >
                  {submitting ? T(lang, 'পোস্ট হচ্ছে…', 'Posting…') : T(lang, 'পোস্ট করুন', 'Post review')}
                </button>
              </div>
            </form>
          )}

          {/* List */}
          {!summary?.ratings.length && !showForm && (
            <div style={{ textAlign: 'center', padding: '18px 0 6px', color: tk.textFaint, fontFamily: font, fontSize: 13 }}>
              {T(lang, 'এখনো কোনো রিভিউ নেই — প্রথম রিভিউ দিন!', 'No reviews yet — be the first!')}
            </div>
          )}
          {summary?.ratings.map(r => (
            <div key={r.userId + r.timestamp} style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', background: tk.primary, color: tk.primaryInk,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: 13, fontWeight: 700,
                }}>
                  {(r.displayName || 'U').charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: tk.text, margin: 0 }}>
                    {r.displayName || T(lang, 'ব্যবহারকারী', 'User')}
                    {r.userId === user?.id && (
                      <span style={{ marginLeft: 6, fontSize: 9, background: tk.primarySoft, color: tk.primary, padding: '1px 6px', borderRadius: 99 }}>{T(lang, 'আপনি', 'YOU')}</span>
                    )}
                  </p>
                  <div style={{ marginTop: 2 }}>{renderStars(r.stars, 11)}</div>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>{timeAgo(r.timestamp, lang)}</span>
              </div>
              {r.comment?.trim() && r.comment.trim() !== ' ' && (
                <p style={{ fontFamily: font, fontSize: 13, color: tk.textDim, margin: '10px 0 0 44px', lineHeight: 1.6 }}>{r.comment.trim()}</p>
              )}
              <div style={{ margin: '10px 0 0 44px' }}>
                <button
                  onClick={async () => {
                    if (!user) return;
                    const updated = await toggleDestinationRatingUpvote(destId, r.timestamp);
                    if (updated) {
                      setSummary(s => s ? { ...s, ratings: s.ratings.map(x => x.timestamp === r.timestamp ? updated : x) } : s);
                    }
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: font, fontSize: 11, fontWeight: 600,
                    color: r.upvotes?.includes(user?.id ?? '') ? tk.primary : tk.textFaint,
                  }}
                >
                  {T(lang, '👍 সহায়ক', '👍 Helpful')}{r.upvotes?.length ? ` (${r.upvotes.length})` : ''}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
