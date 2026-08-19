import React, { useState, useEffect } from 'react';
import { KJ_TOKENS, T, SANS, BEN, Tokens, Lang, chipBtn } from '../tokens';
import {
  getDestinationPhotos, submitDestinationPhoto, deleteDestinationPhoto,
  DestinationPhoto, getCommunityUser, getPendingPhotoCount,
} from '../../../services/communityDataService';
import { Turnstile } from './Turnstile';
import { trackFeatureUsage } from '../../../services/analyticsService';
import { earnCoins } from '../utils/koyCoinService';

interface Props {
  destId: string;
  destName: string;
  theme: 'dark' | 'light';
  lang: Lang;
}

async function compressImage(file: File, maxKB = 280): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1280;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('compress-failed'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let quality = 0.72;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > maxKB * 1024 * 1.37 && quality > 0.3) {
          quality -= 0.12;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('compress-failed'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('compress-failed'));
    reader.readAsDataURL(file);
  });
}

export function DestinationPhotoGallery({ destId, destName, theme, lang }: Props) {
  const tk: Tokens = KJ_TOKENS[theme];
  const font = lang === 'bn' ? BEN : SANS;
  const user = getCommunityUser();
  const [photos, setPhotos] = useState<DestinationPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [cfToken, setCfToken] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const toastTimer = React.useRef<number>(0);

  useEffect(() => { trackFeatureUsage('destination_photos'); }, []);

  useEffect(() => {
    setLoading(true);
    getDestinationPhotos(destId)
      .then(setPhotos)
      .catch(() => setToast({ msg: T(lang, 'ছবি লোড হয়নি', 'Failed to load photos'), ok: false }))
      .finally(() => setLoading(false));
  }, [destId, lang]);

  useEffect(() => {
    if (!toast) return undefined;
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(toastTimer.current);
  }, [toast]);

  useEffect(() => {
    if (lightbox === null) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [lightbox]);

  const handleFile = async (f: File | undefined) => {
    if (!f || !f.type.startsWith('image/')) return;
    try {
      const dataUrl = await compressImage(f);
      setPreviewUrl(dataUrl);
      setUploadOpen(true);
    } catch {
      setToast({ msg: T(lang, 'ছবি ছোট করা যায়নি', 'Could not compress photo'), ok: false });
    }
  };

  const handleUpload = async () => {
    if (!previewUrl || !cfToken) return;
    setUploading(true);
    const status = await submitDestinationPhoto(destId, destName, caption, previewUrl, cfToken);
    if (status !== 'failed') {
      const fresh = await getDestinationPhotos(destId);
      setPhotos(fresh);
      setUploadOpen(false);
      setCaption('');
      setPreviewUrl('');
      setCfToken(undefined);
      earnCoins(5, 'destination_photo');
      setToast({ msg: status === 'queued'
        ? T(lang, 'অফলাইনে সংরক্ষিত — ইন্টারনেট পেলে সিঙ্ক হবে', 'Saved offline — will sync when online')
        : T(lang, 'ছবি আপলোড হয়েছে!', 'Photo uploaded!'), ok: true });
    } else {
      setToast({ msg: T(lang, 'আপলোড হয়নি', 'Upload failed'), ok: false });
    }
    setUploading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
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

      {user && (
        <button
          onClick={() => fileRef.current?.click()}
          style={{ ...chipBtn(tk), background: tk.primary, color: tk.primaryInk, border: 'none', padding: '11px 0', borderRadius: 12, fontWeight: 700, fontSize: 14, fontFamily: font, cursor: 'pointer', width: '100%', marginBottom: 12 }}
        >
          {T(lang, '📷 ছবি যোগ করুন', '📷 Add photo')}
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
      />

      {uploadOpen && (
        <div style={{ background: tk.panel, border: `1px solid ${tk.line}`, borderRadius: 16, padding: 16, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {previewUrl && <img src={previewUrl} alt="preview" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12 }} />}
          <input
            value={caption}
            onChange={e => setCaption(e.target.value.slice(0, 120))}
            placeholder={T(lang, 'ক্যাপশন (ঐচ্ছিক)…', 'Caption (optional)…')}
            maxLength={120}
            style={{
              width: '100%', boxSizing: 'border-box', background: tk.panelMuted, border: `1px solid ${tk.line}`,
              borderRadius: 12, padding: '10px 12px', color: tk.text, fontFamily: font, fontSize: 14, outline: 'none',
            }}
          />
          {!cfToken ? (
            <Turnstile theme={theme} onVerify={setCfToken} onExpire={() => setCfToken(undefined)} />
          ) : (
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{ ...chipBtn(tk), background: tk.primary, color: tk.primaryInk, border: 'none', padding: '11px 0', borderRadius: 12, fontWeight: 700, fontSize: 14, fontFamily: font, cursor: 'pointer' }}
            >
              {uploading ? T(lang, 'আপলোড হচ্ছে…', 'Uploading…') : T(lang, 'আপলোড', 'Upload')}
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div style={{ color: tk.textFaint, fontFamily: font, fontSize: 13, padding: '24px 0', textAlign: 'center' }}>
          {T(lang, 'ছবি লোড হচ্ছে…', 'Loading photos…')}
        </div>
      ) : photos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '18px 0 6px', color: tk.textFaint, fontFamily: font, fontSize: 13 }}>
          {T(lang, 'এখনো কোনো ছবি নেই — প্রথম ছবি যোগ করুন!', 'No photos yet — add the first one!')}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {photos.map((p, i) => (
            <img
              key={p.id}
              src={p.dataUrl}
              alt={p.caption || destName}
              loading="lazy"
              onClick={() => setLightbox(i)}
              style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 10, cursor: 'pointer' }}
            />
          ))}
        </div>
      )}

      {photos.length > 0 && getPendingPhotoCount() > 0 && (
        <p style={{ fontFamily: font, fontSize: 11, color: tk.textFaint, textAlign: 'center', margin: '10px 0 0' }}>
          {T(lang, `⏳ ${getPendingPhotoCount()}টি ছবি সিঙ্কের অপেক্ষায়`, `⏳ ${getPendingPhotoCount()} photo(s) waiting to sync`)}
        </p>
      )}

      {/* Lightbox */}
      {lightbox !== null && photos[lightbox] && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9500, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={() => setLightbox(null)}
        >
          <img src={photos[lightbox].dataUrl} alt={photos[lightbox].caption || destName} style={{ maxWidth: '100%', maxHeight: '78vh', borderRadius: 12, objectFit: 'contain' }} />
          {photos[lightbox].caption && <p style={{ fontFamily: font, color: '#fff', fontSize: 14, margin: '14px 0 0', textAlign: 'center' }}>{photos[lightbox].caption}</p>}
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button
              onClick={e => { e.stopPropagation(); setLightbox(lightbox > 0 ? lightbox - 1 : photos.length - 1); }}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}
            >←</button>
            <button
              onClick={e => { e.stopPropagation(); setLightbox(lightbox < photos.length - 1 ? lightbox + 1 : 0); }}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}
            >→</button>
          </div>
          {photos[lightbox].userId === user?.id && (
            <button
              onClick={async e => {
                e.stopPropagation();
                const status = await deleteDestinationPhoto(destId, photos[lightbox].id);
                if (status !== 'failed') {
                  setPhotos(prev => prev.filter((_, j) => j !== lightbox));
                  setLightbox(null);
                  setToast({ msg: T(lang, 'ছবি মুছে ফেলা হয়েছে', 'Photo deleted.'), ok: true });
                }
              }}
              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 14, cursor: 'pointer', marginTop: 18 }}
            >
              {T(lang, 'মুছুন', 'Delete')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
