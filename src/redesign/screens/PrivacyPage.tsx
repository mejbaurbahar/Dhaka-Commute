import React from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

interface Section {
  h: string;
  body: string;
  bullets?: string[];
}

export function PrivacyPage(props: Props) {
  const { theme, device, lang } = props;
  useDocumentTitle(lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy');
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (r=16): React.CSSProperties => ({ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:r,padding:16 });
  const lbl = (en: string, bn: string) => lang === 'bn' ? bn : en;

  const sections: Section[] = [
    {
      h: lbl('1. Data we collect', '১. আমরা যে তথ্য সংগ্রহ করি'),
      body: lbl(
        'KoyJabo collects only the minimum data needed to provide transport guidance. We explicitly avoid collecting sensitive personal information unless you actively provide it.',
        'কই যাবো শুধু পরিবহন গাইড দিতে প্রয়োজনীয় ন্যূনতম তথ্য সংগ্রহ করে। সংবেদনশীল ব্যক্তিগত তথ্য আপনি সরাসরি না দিলে আমরা সংগ্রহ করি না।',
      ),
      bullets: [
        lbl('Location (only when you tap "Allow location") — used to suggest nearby stops, never stored on our servers.', 'লোকেশন (শুধু "Allow location" চাপলে) — কাছের স্টপ সুপারিশের জন্য, আমাদের সার্ভারে সংরক্ষিত হয় না।'),
        lbl('Search history (stored locally in your browser only) — to power favorites and recent routes.', 'সার্চ হিস্টরি (শুধু আপনার ব্রাউজারে লোকাল স্টোরেজে) — সেভড ও সাম্প্রতিক রুটের জন্য।'),
        lbl('Device info: browser type, OS, screen size — for compatibility, never linked to identity.', 'ডিভাইস তথ্য: ব্রাউজার, OS, স্ক্রিন সাইজ — কম্প্যাটিবিলিটির জন্য, পরিচয়ের সাথে যুক্ত করা হয় না।'),
        lbl('No account system — KoyJabo works fully without sign-in.', 'কোনো অ্যাকাউন্ট সিস্টেম নেই — কই যাবো লগইন ছাড়াই সম্পূর্ণ কাজ করে।'),
        lbl('Usage analytics: anonymous page views via Google Analytics 4 (G-7L601M5G9R).', 'ব্যবহার অ্যানালিটিক্স: Google Analytics 4 (G-7L601M5G9R) দিয়ে বেনামী পেজ-ভিউ।'),
      ],
    },
    {
      h: lbl('2. How we use your data', '২. আমরা কীভাবে ব্যবহার করি'),
      body: lbl('Your data powers route suggestions, fare estimates, saved favorites, and offline functionality. We never sell data and never share personally identifiable information with third parties.', 'আপনার ডেটা রুট সুপারিশ, ভাড়া অনুমান, সেভড ফেভারিট ও অফলাইন কার্যকারিতার জন্য ব্যবহৃত হয়। আমরা ডেটা বিক্রি করি না এবং ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য তৃতীয় পক্ষের সাথে শেয়ার করি না।'),
      bullets: [
        lbl('Route planning & fare calculations (computed locally on your device when possible).', 'রুট প্ল্যানিং ও ভাড়া হিসাব (সম্ভব হলে ডিভাইসেই গণনা)।'),
        lbl('Personalizing UI language (Bangla/English) and theme (light/dark).', 'UI ভাষা (বাংলা/ইংরেজি) ও থিম (লাইট/ডার্ক) ব্যক্তিগতকরণ।'),
        lbl('Detecting service availability in your district.', 'আপনার জেলায় সেবার উপলভ্যতা শনাক্তকরণ।'),
        lbl('Aggregated analytics to improve our routes data and AI suggestions.', 'রুট ডেটা ও AI সুপারিশ উন্নত করতে সম্মিলিত অ্যানালিটিক্স।'),
      ],
    },
    {
      h: lbl('3. Cookies & local storage', '৩. কুকিজ ও লোকাল স্টোরেজ'),
      body: lbl('We use first-party cookies and browser localStorage to remember your preferences and offline cache. We do not use tracking cookies that profile you across other websites.', 'আমরা প্রথম-পক্ষ কুকিজ ও ব্রাউজার localStorage ব্যবহার করি আপনার পছন্দ ও অফলাইন ক্যাশ মনে রাখতে। অন্য ওয়েবসাইটে আপনাকে প্রোফাইল করার ট্র্যাকিং কুকি ব্যবহার করি না।'),
      bullets: [
        lbl('kj-language: your language preference (bn/en).', 'kj-language: আপনার ভাষা পছন্দ।'),
        lbl('kj-location-consent: yes/no toggle whether you allowed GPS.', 'kj-location-consent: GPS অনুমতি দিয়েছেন কি না।'),
        lbl('kj-favorites, kj-history: locally cached routes and search history.', 'kj-favorites, kj-history: লোকাল ক্যাশড রুট ও সার্চ হিস্টরি।'),
        lbl('Third-party: Google AdSense + Analytics may set their own cookies — see Google\'s policy.', 'তৃতীয়-পক্ষ: Google AdSense + Analytics তাদের নিজস্ব কুকি সেট করতে পারে — Google-এর নীতি দেখুন।'),
        lbl('Clear all KoyJabo data anytime via Settings → Clear cache.', 'যেকোনো সময় Settings → Clear cache দিয়ে সব KoyJabo ডেটা মুছে ফেলুন।'),
      ],
    },
    {
      h: lbl('4. Push notifications', '৪. পুশ নোটিফিকেশন'),
      body: lbl(
        'KoyJabo can send push notifications (browser notifications) so you never miss a saved-route check or commute reminder. Push is ON by default: on your first visit your browser asks once — allow and we can notify you; deny and we never ask again.',
        'কই যাবো পুশ নোটিফিকেশন (ব্রাউজার নোটিফিকেশন) পাঠাতে পারে, যাতে আপনি সেভড রুট চেক বা কমিউট রিমাইন্ডার কখনো মিস না করেন। পুশ ডিফল্টভাবে চালু: প্রথম ভিজিটে ব্রাউজার একবার জিজ্ঞেস করে — অনুমতি দিলে আমরা নোটিফাই করতে পারি; না দিলে আর কখনো জিজ্ঞেস করি না।',
      ),
      bullets: [
        lbl('What we send: your device push endpoint + language preference, the reminder type (e.g. "saved route check") and its scheduled time. We never read or collect any other browser content.', 'কী পাঠাই: ডিভাইসের push endpoint + ভাষা পছন্দ, রিমাইন্ডারের ধরন (যেমন "সেভড রুট চেক") ও নির্ধারিত সময়। ব্রাউজারের অন্য কোনো কনটেন্ট আমরা পড়ি না বা সংগ্রহ করি না।'),
        lbl('Where it is stored: reminders are kept on Cloudflare KV only until they fire (or you turn push off) — then they are deleted.', 'কোথায় সংরক্ষণ: রিমাইন্ডার শুধু পাঠানো পর্যন্ত (বা পুশ বন্ধ করা পর্যন্ত) Cloudflare KV-তে থাকে — তারপর মুছে যায়।'),
        lbl('What you receive: saved-route reminders, next-morning commute info, and rare service updates — never advertising or spam.', 'কী পাবেন: সেভড রুট রিমাইন্ডার, পরদিন সকালের কমিউট তথ্য, ও মাঝে মাঝে সেবা আপডেট — কোনো বিজ্ঞাপন বা স্প্যাম নয়।'),
        lbl('Turn it off anytime: Settings → Notifications toggle, or your browser site settings. This does not affect any other feature.', 'যেকোনো সময় বন্ধ করুন: Settings → নোটিফিকেশন টগল, বা ব্রাউজার সাইট সেটিংস। এতে অন্য কোনো ফিচারে প্রভাব পড়ে না।'),
      ],
    },
    {
      h: lbl('5. Third-party services', '৫. তৃতীয় পক্ষের পরিষেবা'),
      body: lbl('We integrate carefully chosen third-party services. Each has its own privacy policy linked below.', 'আমরা সাবধানে বাছাই করা তৃতীয়-পক্ষ পরিষেবা ব্যবহার করি। প্রত্যেকের নিজস্ব গোপনীয়তা নীতি নিচে লিংক করা।'),
      bullets: [
        'Google Analytics 4 — anonymized traffic analysis · policies.google.com/privacy',
        'Google AdSense — relevant ads · policies.google.com/technologies/ads',
        'Cloudflare — CDN + DDoS protection · cloudflare.com/privacypolicy',
        'Cloudflare Turnstile — bot protection on community photo uploads · cloudflare.com/privacypolicy',
        'Cloudflare Workers AI — AI assistant (Llama 3.3 70B) · cloudflare.com/privacypolicy',
      ],
    },
    {
      h: lbl('6. Your rights', '৬. আপনার অধিকার'),
      body: lbl('Following GDPR-style principles, you have the following rights regardless of where you live:', 'GDPR-ধাঁচের নীতি অনুসরণ করে, আপনি যেখানেই থাকুন এই অধিকারগুলি আছে:'),
      bullets: [
        lbl('Right to access: ask what data we have about you.', 'অ্যাক্সেসের অধিকার: আমরা আপনার সম্পর্কে কী ডেটা রাখি জানতে চাইতে পারেন।'),
        lbl('Right to deletion: clear your local data (favorites, history) or request removal of community contributions tied to your device.', 'মুছে ফেলার অধিকার: লোকাল ডেটা (ফেভারিট, হিস্টরি) মুছুন বা আপনার ডিভাইসের সাথে যুক্ত কমিউনিটি অবদান মুছে ফেলার অনুরোধ করুন।'),
        lbl('Right to portability: export your favorites + history as JSON.', 'পোর্টেবিলিটির অধিকার: ফেভারিট ও হিস্টরি JSON হিসেবে রপ্তানি।'),
        lbl('Right to correction: update or fix any data we hold.', 'সংশোধনের অধিকার: আমাদের কাছে থাকা ডেটা আপডেট বা ঠিক করুন।'),
        lbl('Right to object: opt out of analytics via browser Do-Not-Track.', 'আপত্তির অধিকার: ব্রাউজার Do-Not-Track দিয়ে অ্যানালিটিক্স থেকে অপ্ট-আউট।'),
        lbl('To exercise: email koyjabo.bd@gmail.com — we respond within 30 days.', 'প্রয়োগ করতে: koyjabo.bd@gmail.com-এ ইমেইল — ৩০ দিনে সাড়া দেই।'),
      ],
    },
    {
      h: lbl('7. Data retention', '৭. ডেটা সংরক্ষণ'),
      body: lbl('We keep data only as long as needed:', 'আমরা শুধু প্রয়োজনীয় সময় পর্যন্ত ডেটা রাখি:'),
      bullets: [
        lbl('Search history: locally only — never sent to our servers.', 'সার্চ হিস্টরি: শুধু লোকাল — আমাদের সার্ভারে পাঠানো হয় না।'),
        lbl('Analytics: aggregated for 26 months then deleted automatically (GA4 default).', 'অ্যানালিটিক্স: ২৬ মাস পর্যন্ত সম্মিলিত, পরে স্বয়ংক্রিয়ভাবে মুছে যায় (GA4 ডিফল্ট)।'),
        lbl('Account data: retained until you request deletion.', 'অ্যাকাউন্ট ডেটা: মুছে ফেলার অনুরোধ না করা পর্যন্ত রাখা হয়।'),
        lbl('Server logs: 7 days for security, then purged.', 'সার্ভার লগ: নিরাপত্তার জন্য ৭ দিন, পরে মুছে ফেলা হয়।'),
      ],
    },
    {
      h: lbl('8. Security', '৮. নিরাপত্তা'),
      body: lbl('We protect your data with industry-standard measures:', 'আমরা শিল্প-মান ব্যবস্থা দিয়ে আপনার ডেটা রক্ষা করি:'),
      bullets: [
        lbl('All traffic over HTTPS (TLS 1.3) — no plaintext.', 'সব ট্রাফিক HTTPS-এ (TLS 1.3) — কোনো প্লেইনটেক্সট নেই।'),
        lbl('No passwords or accounts — all data is anonymous or stored locally on your device.', 'কোনো পাসওয়ার্ড বা অ্যাকাউন্ট নেই — সব ডেটা বেনামী বা আপনার ডিভাইসে লোকালি সংরক্ষিত।'),
        lbl('CSP, X-Frame-Options, and other security headers via Cloudflare.', 'CSP, X-Frame-Options ও অন্যান্য সিকিউরিটি হেডার Cloudflare-এর মাধ্যমে।'),
        lbl('Cloudflare Turnstile blocks automated bot uploads on community photos.', 'কমিউনিটি ফটো আপলোডে স্বয়ংক্রিয় বট আক্রমণ Cloudflare Turnstile-এ ব্লক হয়।'),
        lbl('No payment data is collected — we do not process payments.', 'কোনো পেমেন্ট ডেটা সংগ্রহ করা হয় না — আমরা পেমেন্ট প্রসেস করি না।'),
      ],
    },
    {
      h: lbl('8a. Content ownership & protection', '৮ক. কনটেন্ট মালিকানা ও সুরক্ষা'),
      body: lbl('All route data, fare tables, stop locations, schedules, text, design, and code on KoyJabo are the proprietary property of KoyJabo (কই যাবো) and are protected by copyright law. Viewing in a browser for personal use is permitted — nothing else.', 'কই যাবো-র সব রুট ডেটা, ভাড়ার টেবিল, স্টপ লোকেশন, সময়সূচি, লেখা, ডিজাইন ও কোড কই যাবোর মালিকানাধীন সম্পত্তি এবং কপিরাইট আইনে সুরক্ষিত। ব্যক্তিগত ব্যবহারের জন্য ব্রাউজারে দেখা অনুমোদিত — এর বেশি কিছু নয়।'),
      bullets: [
        lbl('You may not republish, mirror, redistribute, resell, or create derivative works from our dataset (including all bus routes, stops, and fares) without prior written permission.', 'আগে লিখিত অনুমতি ছাড়া আমাদের ডেটাসেট (সব বাস রুট, স্টপ ও ভাড়াসহ) পুনঃপ্রকাশ, মিরর, পুনঃবিতরণ, পুনঃবিক্রয়, বা ডেরিভেটিভ কাজ তৈরি করা যাবে না।'),
        lbl('Automated scraping, bulk downloading, or mass extraction of KoyJabo data is prohibited. We monitor for abuse and may block IPs, user agents, or networks engaged in such activity.', 'কই যাবো ডেটার স্বয়ংক্রিয় স্ক্র্যাপিং, বাল্ক ডাউনলোড, বা গণহারে উত্তোলন নিষিদ্ধ। অপব্যবহার আমরা পর্যবেক্ষণ করি এবং এই ধরনের কার্যকলাপে জড়িত IP, ইউজার-এজেন্ট, বা নেটওয়ার্ক ব্লক করতে পারি।'),
        lbl('Questions about reusing KoyJabo content: email koyjabo.bd@gmail.com. Unauthorized use is enforced under applicable copyright law and our Terms of Service.', 'কই যাবো কনটেন্ট পুনঃব্যবহার নিয়ে প্রশ্ন: koyjabo.bd@gmail.com-এ ইমেইল করুন। অননুমোদিত ব্যবহার প্রযোজ্য কপিরাইট আইন ও আমাদের Terms of Service-এর অধীনে ব্যবস্থা নেওয়া হয়।'),
      ],
    },
    {
      h: lbl('9. Children', '৯. শিশুদের গোপনীয়তা'),
      body: lbl('KoyJabo is rated General. We do not knowingly collect data from children under 13. If you are a parent and believe your child has provided us data, email koyjabo.bd@gmail.com and we will delete it promptly.', 'কই যাবো জেনারেল রেটেড। আমরা জেনেশুনে ১৩ বছরের কম বয়সী শিশুদের কাছ থেকে ডেটা সংগ্রহ করি না। অভিভাবক হিসাবে আপনার সন্তান ডেটা দিয়েছে মনে করলে koyjabo.bd@gmail.com-এ ইমেইল করুন, দ্রুত মুছে ফেলব।'),
    },
    {
      h: lbl('10. International transfers', '১০. আন্তর্জাতিক স্থানান্তর'),
      body: lbl('Our servers run on Cloudflare\'s global network. Your data may be processed in any Cloudflare data center, including the EU, US, and Asia. Cloudflare maintains GDPR-compliant data processing agreements.', 'আমাদের সার্ভার Cloudflare-এর বিশ্বব্যাপী নেটওয়ার্কে চলে। আপনার ডেটা EU, US, এশিয়াসহ যেকোনো Cloudflare ডেটা সেন্টারে প্রসেস হতে পারে। Cloudflare GDPR-অনুগত ডেটা প্রসেসিং চুক্তি বজায় রাখে।'),
    },
    {
      h: lbl('11. Truck & freight bookings', '১১. ট্রাক ও পণ্য বুকিং'),
      body: lbl('When you tap "Get Quote" on the Truck & Freight page, we calculate fares locally on your device. We do not transmit your pickup/drop locations or load details to our servers or to third-party logistics providers. Actual booking happens via the partner\'s phone hotline shown on screen.', '"ট্রাক ও পণ্য" পেজে "কোট নিন" চাপলে আমরা ভাড়া আপনার ডিভাইসেই গণনা করি। আপনার পিকআপ/ড্রপ লোকেশন বা লোড বিবরণ আমাদের সার্ভার বা তৃতীয়-পক্ষ লজিস্টিক্স প্রোভাইডারের কাছে পাঠানো হয় না। আসল বুকিং স্ক্রিনে দেখানো পার্টনার ফোন হটলাইনের মাধ্যমে হয়।'),
    },
    {
      h: lbl('12. Changes to this policy', '১২. এই নীতিতে পরিবর্তন'),
      body: lbl('We will update this policy as needed and post the new date at the top. Material changes (those that affect your rights) will be announced via in-app banner. Continued use after a policy update means acceptance of the new terms.', 'প্রয়োজনে আমরা এই নীতি আপডেট করব এবং উপরে নতুন তারিখ পোস্ট করব। বড় পরিবর্তন (যা আপনার অধিকারে প্রভাব ফেলে) ইন-অ্যাপ ব্যানারে ঘোষণা হবে। আপডেটের পরেও ব্যবহার চালিয়ে গেলে নতুন শর্তে সম্মতি ধরা হবে।'),
    },
    {
      h: lbl('13. Contact', '১৩. যোগাযোগ'),
      body: lbl('Privacy questions or requests:', 'গোপনীয়তা সংক্রান্ত প্রশ্ন বা অনুরোধ:'),
      bullets: [
        'Email: koyjabo.bd@gmail.com',
        lbl('Mailing: Dhaka, Bangladesh', 'মেইলিং: ঢাকা, বাংলাদেশ'),
        lbl('Response time: within 30 days.', 'রেসপন্স সময়: ৩০ দিনের মধ্যে।'),
      ],
    },
  ];

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'16px 16px 48px':'28px 40px 48px', maxWidth:760, margin:'0 auto' }}>
        <div style={{ fontFamily:SANS,fontSize:11,fontWeight:700,color:tk.textFaint,letterSpacing:1.4,textTransform:'uppercase',marginBottom:8 }}>
          {T(lang,'আপডেট: ১১ আগস্ট ২০২৬','Updated: August 11, 2026')}
        </div>
        <h1 style={{ fontFamily:BEN,fontWeight:700,fontSize:isMobile?22:28,color:tk.text,marginBottom:8 }}>{T(lang,'গোপনীয়তা নীতি','Privacy Policy')}</h1>
        <p style={{ fontFamily:BEN,fontSize:14,color:tk.textDim,lineHeight:1.7,marginBottom:20 }}>
          {T(lang,'কই যাবো আপনার গোপনীয়তাকে গুরুত্ব দেয়। এই নীতি ব্যাখ্যা করে আমরা কোন তথ্য সংগ্রহ করি, কেন করি, কীভাবে রক্ষা করি, এবং আপনার কী অধিকার আছে।','KoyJabo takes your privacy seriously. This policy explains what we collect, why, how we protect it, and what rights you have.')}
        </p>

        {/* TL;DR */}
        <details open className="kj-summary" style={{ ...card(14), background:tk.primarySoft, border:`1px solid ${tk.primary}55`, marginBottom:20 }}>
          <summary style={{ fontFamily:SANS,fontSize:11,fontWeight:800,color:tk.primary,letterSpacing:1.4,textTransform:'uppercase',cursor:'pointer' }}>
            {T(lang,'সংক্ষেপে','TL;DR')}
          </summary>
          <p style={{ fontFamily:BEN,fontSize:13,color:tk.text,lineHeight:1.7,margin:'8px 0 0' }}>
            {T(lang,'আমরা শুধু প্রয়োজনীয় তথ্য সংগ্রহ করি। ডেটা বিক্রি করি না। লোকেশন আপনার অনুমতিতে। হিস্টরি শুধু আপনার ব্রাউজারে। যেকোনো সময় মুছতে পারেন।','We collect only what we need. We never sell data. Location only with your permission. History stays in your browser only. You can delete everything anytime.')}
          </p>
        </details>

        {/* TOC */}
        <div style={{ ...card(14),marginBottom:20 }}>
          <div style={{ fontFamily:SANS,fontSize:10,fontWeight:700,color:tk.textFaint,letterSpacing:1.4,textTransform:'uppercase',marginBottom:10 }}>{T(lang,'বিষয়সূচি','On this page')}</div>
          {sections.map((s,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',gap:10,padding:'5px 0' }}>
              <span style={{ fontFamily:SANS,fontSize:11,fontWeight:600,color:tk.textFaint }}>{String(i+1).padStart(2,'0')}</span>
              <span style={{ fontFamily:BEN,fontSize:13,color:tk.primary,fontWeight:600 }}>{s.h.replace(/^\d+\.\s*|^[০-৯]+\.\s*/, '')}</span>
            </div>
          ))}
        </div>

        {sections.map((s,i)=>(
          <section key={i} style={{ marginBottom:24 }}>
            <h2 style={{ fontFamily:BEN,fontWeight:700,fontSize:17,color:tk.text,margin:'0 0 10px',display:'flex',alignItems:'center',gap:8 }}>
              <span style={{ width:28,height:28,borderRadius:8,background:tk.primarySoft,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:SANS,fontWeight:700,fontSize:12,color:tk.primary,flexShrink:0 }}>{i+1}</span>
              {s.h.replace(/^\d+\.\s*|^[০-৯]+\.\s*/, '')}
            </h2>
            <p style={{ fontFamily:BEN,fontSize:14,color:tk.textDim,lineHeight:1.7,margin:'0 0 8px' }}>{s.body}</p>
            {s.bullets && (
              <ul style={{ margin:0, padding:'0 0 0 18px', listStyleType:'disc' }}>
                {s.bullets.map((b,k)=>(
                  <li key={k} style={{ fontFamily:BEN, fontSize:13, color:tk.textDim, lineHeight:1.7, marginBottom:4 }}>{b}</li>
                ))}
              </ul>
            )}
            {i === 5 && (
              <NativeAdCard
                tk={tk}
                lang={lang}
                kind="in-article"
                title={T(lang, 'সংশ্লিষ্ট বিষয়বস্তু', 'Related content')}
                icon="📰"
              />
            )}
          </section>
        ))}

        <div style={{ ...card(14),background:tk.primarySoft,borderColor:tk.primary, marginTop:20 }}>
          <div style={{ fontFamily:BEN,fontWeight:700,fontSize:14,color:tk.primary,marginBottom:6 }}>{T(lang,'প্রশ্ন আছে?','Questions?')}</div>
          <div style={{ fontFamily:BEN,fontSize:13,color:tk.textDim,lineHeight:1.6 }}>
            {T(lang,'যেকোনো গোপনীয়তা বা ডেটা সংক্রান্ত প্রশ্ন: koyjabo.bd@gmail.com। আমরা ৩০ দিনের মধ্যে সাড়া দেই।','For any privacy or data-related queries: koyjabo.bd@gmail.com. We respond within 30 days.')}
          </div>
        </div>

        <NativeAdCard
          tk={tk}
          lang={lang}
          kind="multiplex"
          title={T(lang, 'আরও দেখুন', 'More like this')}
          subtitle={T(lang, 'ভ্রমণ ও পরিবহন', 'Travel & transport')}
          icon="🧭"
        />
        <NativeAdCard
          tk={tk}
          lang={lang}
          kind={isMobile?'mob-banner':'leaderboard'}
          title={T(lang, 'পার্টনার অফার', 'Partner offers')}
          icon="🎯"
        />
      </div>
          <AdCluster tk={tk} lang={lang} count={2} isMobile={isMobile}/>
    </PageShell>
  );
}
