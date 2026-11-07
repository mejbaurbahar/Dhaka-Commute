/**
 * KoyJabo Transit Intelligence & Multi-Tenant Social Media AI Engine v9.0
 * Cloudflare Worker for Koy Jabo (কই যাবো - https://koyjabo.com)
 * 
 * Features:
 * - 24/7 Enterprise Messenger Auto-Reply Assistant
 * - 24/7 Facebook Post Public Comment Auto-Reply
 * - Comprehensive Dhaka Transit Corridors (Bengali, English & Banglish)
 * - Metro Rail (MRT Line 6) Verified Schedules, Fares & Station Intel
 * - Bangladesh Railway Intercity Train Tracking & Live Status
 * - Launch (Waterways) & Domestic Flight Travel Guides
 * - Smart Emoji & Politeness / Appreciation Engine
 * - Zero Customer Full Name Disclosure Policy (Privacy-first)
 * - KV-backed Webhook Idempotency (Prevents duplicate replies)
 * - Gemini 3.8 / 3.5 Flash Multimodal AI Fallback with Thought Signatures
 * - Multi-Tenant Proxy: Seamlessly proxies MI Agro events to live server
 */

const APP_URL = 'https://koyjabo.com';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.koyjabo.app';
const MI_AGRO_WEBHOOK = 'https://www.miunifyldagroltd.com/api/fb-webhook.php';

// Quick Reply Chips for Messenger
const QUICK_REPLIES = [
  { content_type: 'text', title: '🚌 বাস রুট সন্ধান', payload: 'BUS_ROUTES' },
  { content_type: 'text', title: '🚇 মেট্রোরেল সময় ও ভাড়া', payload: 'METRO' },
  { content_type: 'text', title: '🚆 ট্রেনের লাইভ লোকেশন', payload: 'TRAIN' },
  { content_type: 'text', title: '💰 ভাড়া ক্যালকুলেটর', payload: 'FARE_CALC' },
  { content_type: 'text', title: '📱 অ্যাপ ডাউনলোড', payload: 'APP_DOWNLOAD' },
];

// Comprehensive Verified Dhaka Bus Corridors (Supports BN, EN & Banglish)
const BUS_CORRIDORS = [
  {
    keys: ['মিরপুর_মতিঝিল'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ২', 'মিরপুর ১১', 'মিরপুর ১২', 'পল্লবী', 'mirpur', 'mirpur 10', 'mirpur 1', 'mirpur 2', 'pallabi'],
    dest: ['মতিঝিল', 'গুলিস্তান', 'পল্টন', 'দৈনিক বাংলা', 'প্রেসক্লাব', 'motijheel', 'gulistan', 'paltan', 'press club'],
    buses: 'বিহঙ্গ, স্বাধীন, শিখর, তানজিল, বিকল্প অটো সার্ভিস (Bihanga, Swadhin, Shikhor, Tanjil, Bikolpo)',
    metro: '💡 দ্রুততম যাতায়াতে মেট্রোরেল ব্যবহার করতে পারেন! মিরপুর ১০ থেকে মতিঝিল মাত্র ৩০ মিনিটে পৌঁছানো যায়।',
    summary: 'মিরপুর থেকে মতিঝিল/গুলিস্তান যাতায়াতে বিহঙ্গ, স্বাধীন, শিখর, তানজিল ও বিকল্প বাস চলাচল করে।'
  },
  {
    keys: ['মিরপুর_উত্তরা'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ১২', 'পল্লবী', 'কালশী', 'ইসিবি', 'mirpur', 'kalshi', 'ecb', 'pallabi'],
    dest: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'হাউস বিল্ডিং', 'uttara', 'abdullahpur', 'airport'],
    buses: 'প্রজাপতি, নূর-ই-মক্কা, পরিস্থান, বসুমতি, তেঁতুলিয়া (Projapoti, Noor-e-Makkah, Poristhan, Basumati, Tetulia)',
    metro: '💡 উত্তরা উত্তর/সেন্টার/দক্ষিণ যেতে মিরপুর ১০ বা পল্লবী থেকে সরাসরি মেট্রোরেল ব্যবহার করতে পারেন।',
    summary: 'মিরপুর থেকে উত্তরা/আব্দুল্লাহপুর যেতে প্রজাপতি, নূর-ই-মক্কা, পরিস্থান, বসুমতি অথবা তেঁতুলিয়া বাসে সরাসরি যেতে পারবেন।'
  },
  {
    keys: ['মিরপুর_ফার্মগেট'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ২', 'কাজীপাড়া', 'শেওড়াপাড়া', 'mirpur', 'kazipara', 'shewrapara'],
    dest: ['ফার্মগেট', 'ফার্ম গেইট', 'ইন্দিরা রোড', 'খামারবাড়ি', 'farmgate', 'khamarbari'],
    buses: 'বিহঙ্গ, বিকল্প, দিশারী, খাজাবাবা, মিরপুর লিংক (Bihanga, Bikolpo, Dishari, Khajababa)',
    metro: '💡 জ্যাম এড়াতে মিরপুর ১০ থেকে ফার্মগেট মেট্রোরেলে মাত্র ১০-১২ মিনিটে পৌঁছানো যায়।',
    summary: 'মিরপুর থেকে ফার্মগেট যাতায়াতে বিহঙ্গ, বিকল্প, দিশারী ও খাজাবাবা বাস চলাচল করে। সরাসরি মেট্রোরেলেও যেতে পারেন।'
  },
  {
    keys: ['মিরপুর_গুলশান_বাড্ডা'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ২', 'মিরপুর ১৪', 'mirpur'],
    dest: ['গুলশান', 'বনানী', 'বাড্ডা', 'নতুন বাজার', 'নতুনবাজার', 'রামপুরা', 'gulshan', 'banani', 'badda', 'natun bazar', 'notun bazar', 'rampura'],
    buses: 'বৈশাখী পরিবহন, নূর-ই-মক্কা, রব্বানী, আকাশ, আলিফ (Boishakhi, Noor-e-Makkah, Robbani, Akash, Alif)',
    metro: null,
    summary: 'মিরপুর থেকে নতুন বাজার/বাড্ডা/গুলশান রুটে বৈশাখী পরিবহন, নূর-ই-মক্কা, রব্বানী ও আকাশ বাস পাওয়া যায়।'
  },
  {
    keys: ['উত্তরা_মতিঝিল'],
    origin: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'খিলক্ষেত', 'uttara', 'airport', 'khilkhet'],
    dest: ['মতিঝিল', 'গুলিস্তান', 'পল্টন', 'motijheel', 'gulistan', 'paltan'],
    buses: 'ভিআইপি ২৭, আজমেরী গ্লোরি, প্রভাতী বনশ্রী, বলাকা, গাজীপুর পরিবহন (VIP 27, Ajmeri Glory, Provati Banasree, Balaka)',
    metro: '💡 উত্তরা উত্তর/সেন্টার/দক্ষিণ থেকে মতিঝিল সরাসরি মেট্রোরেলে মাত্র ৩৫ মিনিটে কোনো জ্যাম ছাড়াই পৌঁছাতে পারবেন।',
    summary: 'উত্তরা থেকে মতিঝিল/গুলিস্তান যেতে ভিআইপি ২৭, আজমেরী গ্লোরি, প্রভাতী বনশ্রী ও বলাকা বাস চলাচল করে।'
  },
  {
    keys: ['উত্তরা_ধানমন্ডি'],
    origin: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'uttara', 'airport'],
    dest: ['ধানমন্ডি', 'ধানমণ্ডি', 'শুক্রাবাদ', 'কলাবাগান', 'সাইন্সল্যাব', 'সায়েন্সল্যাব', 'নিউমার্কেট', 'dhanmondi', 'kolabagan', 'science lab', 'new market'],
    buses: 'বিকাশ পরিবহন, দেওয়ান পরিবহন, ভিআইপি ২৭ (Bikash, Dewan, VIP 27)',
    metro: '💡 মেট্রোরেলে উত্তরা থেকে ফার্মগেট বা কারওয়ান বাজার নেমে সেখান থেকে সহজে রিকশা/বাসে ধানমন্ডি পৌঁছানো যায়।',
    summary: 'উত্তরা থেকে ধানমন্ডি রুটে সরাসরি বিকাশ পরিবহন ও দেওয়ান পরিবহন বাস চলাচল করে।'
  },
  {
    keys: ['উত্তরা_যাত্রাবাড়ী'],
    origin: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'কুড়িল', 'uttara', 'kuril'],
    dest: ['যাত্রাবাড়ী', 'যাত্রাবাড়ী', 'সায়েদাবাদ', 'সায়েদাবাদ', 'শনির আখড়া', 'চিটাগাং রোড', 'jatrabari', 'sayedabad', 'chittagong road'],
    buses: 'রাইদা পরিবহন, অনাবিল সুপার, তুরাগ, ছালছাবিল, লাব্বাইক (Raida, Anabil, Turag, Chalsabil, Labbaik)',
    metro: null,
    summary: 'উত্তরা/বিমানবন্দর/কুড়িল থেকে যাত্রাবাড়ী/সায়েদাবাদ যেতে রাইদা, অনাবিল সুপার, তুরাগ ও ছালছাবিল বাস রয়েছে।'
  },
  {
    keys: ['মোহাম্মদপুর_মতিঝিল'],
    origin: ['মোহাম্মদপুর', 'শংকর', 'জিগাতলা', 'mohammadpur', 'shankar', 'jigatola'],
    dest: ['মতিঝিল', 'গুলিস্তান', 'পল্টন', 'motijheel', 'gulistan', 'paltan'],
    buses: 'রাজা সিটি, তরঙ্গ প্লাস, এফটিসিএল, নূর-ই-মক্কা, মালঞ্চ (Raja City, Torongo, FTCL, Malancha)',
    metro: null,
    summary: 'মোহাম্মদপুর থেকে মতিঝিল যাতায়াতে রাজা সিটি, তরঙ্গ প্লাস, এফটিসিএল ও মালঞ্চ বাস চলাচল করে।'
  },
  {
    keys: ['মোহাম্মদপুর_উত্তরা'],
    origin: ['মোহাম্মদপুর', 'শিয়া মসজিদ', 'mohammadpur', 'shia mosque'],
    dest: ['উত্তরা', 'আব্দুল্লাহপুর', 'এয়ারপোর্ট', 'uttara', 'abdullahpur', 'airport'],
    buses: 'প্রজাপতি পরিবহন, নূর-ই-মক্কা, পরিস্থান পরিবহন (Projapoti, Noor-e-Makkah, Poristhan)',
    metro: null,
    summary: 'মোহাম্মদপুর থেকে উত্তরা/আব্দুল্লাহপুর রুটে প্রজাপতি ও নূর-ই-মক্কা বাস সরাসরি চলাচল করে।'
  },
  {
    keys: ['গাবতলী_যাত্রাবাড়ী'],
    origin: ['গাবতলী', 'টেকনিক্যাল', 'কল্যাণপুর', 'শ্যামলী', 'gabtoli', 'shyamoli', 'kalyanpur'],
    dest: ['যাত্রাবাড়ী', 'যাত্রাবাড়ী', 'সায়েদাবাদ', 'সায়েদাবাদ', 'jatrabari', 'sayedabad'],
    buses: '৮ নম্বর বাস, বোরাক পরিবহন, লাব্বাইক, ঠিকানা পরিবহন, মিডওয়ে (8 No, Borak, Labbaik, Thikana, Midway)',
    metro: null,
    summary: 'গাবতলী থেকে সায়েদাবাদ/যাত্রাবাড়ী রুটে ৮ নম্বর বাস, বোরাক, লাব্বাইক ও ঠিকানা বাস চলাচল করে।'
  },
  {
    keys: ['বাড্ডা_ধানমন্ডি'],
    origin: ['বাড্ডা', 'রামপুরা', 'মৌচাক', 'মালিবাগ', 'শান্তিনগর', 'badda', 'rampura', 'mouchak', 'malibagh'],
    dest: ['ধানমন্ডি', 'ধানমণ্ডি', 'সাইন্সল্যাব', 'নিউমার্কেট', 'dhanmondi', 'science lab', 'new market'],
    buses: 'তরঙ্গ প্লাস, মিডওয়ে, নূর-ই-মক্কা (Torongo Plus, Midway, Noor-e-Makkah)',
    metro: null,
    summary: 'বাড্ডা/রামপুরা থেকে ধানমন্ডি/নিউমার্কেট যেতে তরঙ্গ প্লাস ও মিডওয়ে বাস পাওয়া যায়।'
  },
  {
    keys: ['ধানমন্ডি_গুলশান'],
    origin: ['ধানমন্ডি', 'ধানমণ্ডি', 'সাইন্সল্যাব', 'কলাবাগান', 'dhanmondi', 'science lab', 'kolabagan'],
    dest: ['গুলশান', 'বনানী', 'মহাখালী', 'নতুন বাজার', 'gulshan', 'banani', 'mohakhali', 'mohakhali'],
    buses: 'তিতাস পরিবহন, এফটিসিএল, বিকাশ পরিবহন (Titas, FTCL, Bikash)',
    metro: null,
    summary: 'ধানমন্ডি থেকে মহাখালী/বনানী/গুলশান রুটে তিতাস ও বিকাশ পরিবহন বাস চলাচল করে।'
  },
  {
    keys: ['গাজীপুর_মতিঝিল'],
    origin: ['গাজীপুর', 'টঙ্গী', 'চৌরাস্তা', 'gazipur', 'tongi', 'chourasta'],
    dest: ['মতিঝিল', 'গুলিস্তান', 'সায়েদাবাদ', 'motijheel', 'gulistan', 'sayedabad'],
    buses: 'গাজীপুর পরিবহন, প্রভাতী বনশ্রী, বলাকা, আজমেরী গ্লোরি, ভিআইপি ২৭',
    metro: '💡 উত্তরা উত্তর পৌঁছে সেখান থেকে সরাসরি মেট্রোরেলে মতিঝিল যেতে পারেন মাত্র ৩৫ মিনিটে।',
    summary: 'গাজীপুর/টঙ্গী থেকে মতিঝিল যেতে গাজীপুর পরিবহন, প্রভাতী বনশ্রী, বলাকা ও আজমেরী বাস রয়েছে।'
  },
  {
    keys: ['সাভার_গুলিস্তান'],
    origin: ['সাভার', 'নবীনগর', 'হেমায়েতপুর', 'savar', 'nobinagar', 'hemayetpur'],
    dest: ['গুলিস্তান', 'মতিঝিল', 'ফার্মগেট', 'gulistan', 'motijheel', 'farmgate'],
    buses: 'ওয়েলকাম পরিবহন, সাভার পরিবহন, দিশারী, লাব্বাইক, ডি-লিংক',
    metro: null,
    summary: 'সাভার থেকে ফার্মগেট/গুলিস্তান যাতায়াতে ওয়েলকাম, সাভার পরিবহন ও দিশারী বাস চলাচল করে।'
  }
];

/**
 * Deterministic Query Resolver for Instant, High-Precision Transit Answers
 */
function resolveTransitQuery(text) {
  if (!text) return null;
  const raw = String(text).toLowerCase();
  const clean = raw.replace(/[?!.,।_()\-:;'"’‘]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. Offline Mode / Internet Inquiry (Checked before general app inquiry)
  if (/(?:অফলাইন|offline|ইন্টারনেট\s*ছাড়া|নেট\s*ছাড়া)/i.test(clean)) {
    return {
      type: 'OFFLINE_FEATURE',
      reply: `হ্যাঁ! কই যাবো (Koy Jabo) অ্যাপে একবার তথ্য লোড হওয়ার পর ইন্টারনেট ছাড়াই অফলাইনে ঢাকার লোকাল বাস রুট ও ট্রেনের সময়সূচী দেখতে পারবেন। 📱\n\nঅ্যাপ ডাউনলোড লিংক:\n${PLAY_STORE_URL}`
    };
  }

  // 2. App Download / Install Query
  if (/(?:অ্যাপ|app|apk|ডাউনলোড|download|ইনস্টল|install|প্লে\s*স্টোর|play\s*store)/i.test(clean)) {
    return {
      type: 'APP_DOWNLOAD',
      reply: `কই যাবো (Koy Jabo) অ্যান্ড্রয়েড অ্যাপ এখন গুগল প্লে স্টোরে সম্পূর্ণ ফ্রিতে পাওয়া যাচ্ছে! 📱\n\n👉 অ্যাপ ডাউনলোড লিংক:\n${PLAY_STORE_URL}\n\n🌐 ওয়েবসাইট: ${APP_URL}\n\nঅ্যাপে পাবেন ঢাকার সব বাস রুট, মেট্রোরেল শিডিউল এবং ট্রেনের রিয়েল-টাইম লাইভ লোকেশন।`
    };
  }

  // 2. Metro Rail (Timings, Fares, Friday Schedule, MRT Pass)
  if (/(?:মেট্রো|মেট্রোরেল|metro|mrt|mrt6|লাইন\s*৬|line\s*6)/i.test(clean)) {
    if (/(?:শুক্রবার|জুমা|friday|juma)/i.test(clean)) {
      return {
        type: 'METRO_FRIDAY',
        reply: `মেট্রোরেল শুক্রবারের সময়সূচী:\n• সময়: দুপুর ৩:০০ টা থেকে রাত ৯:৪০ টা পর্যন্ত\n• ট্রেন বিরতি: পিক আওয়ারে প্রতি ৮ মিনিট পরপর\n• সর্বনিম্ন ভাড়া: ২০ টাকা, সর্বোচ্চ ভাড়া: ১০০ টাকা (MRT Pass-এ ১০% ছাড়)\n\nউত্তরা উত্তর থেকে মতিঝিল পর্যন্ত ১৬টি স্টেশন সম্পূর্ণ চালু। বিস্তারিত সময়সূচী দেখুন: ${APP_URL}`
      };
    }
    if (/(?:ভাড়া|ভাড়া|fare|cost|দাম|taka|koto|কত|price)/i.test(clean)) {
      return {
        type: 'METRO_FARE',
        reply: `মেট্রোরেলের ভাড়া সংক্রান্ত তথ্য:\n• সর্বনিম্ন ভাড়া: ২০ টাকা (যেকোনো ১-২ স্টেশন)\n• সর্বোচ্চ ভাড়া (উত্তরা উত্তর ↔ মতিঝিল): ১০০ টাকা\n• প্রতি কিলোমিটার ভাড়া: ৫ টাকা\n• বিশেষ ছাড়: MRT Pass বা Rapid Pass ব্যবহার করলে প্রতি যাত্রায় ১০% ছাড় পাওয়া যায়!\n\nসব স্টেশনের সঠিক ভাড়া ক্যালকুলেট করতে ভিজিট করুন: ${APP_URL}/fare`
      };
    }
    if (/(?:সময়|সময়|schedule|time|timing|কখন|কয়টা|কয়টা|first|last|open|close)/i.test(clean)) {
      return {
        type: 'METRO_SCHEDULE',
        reply: `মেট্রোরেলের সম্পূর্ণ সময়সূচী:\n• শনিবার থেকে বৃহস্পতিবার: সকাল ৭:১০ থেকে রাত ৯:৪০ পর্যন্ত\n• শুক্রবার: দুপুর ৩:০০ থেকে রাত ৯:৪০ পর্যন্ত\n• ট্রেনের বিরতি: পিক আওয়ারে প্রতি ৮ মিনিট পরপর\n• ১৬টি স্টেশন: উত্তরা উত্তর থেকে মতিঝিল পর্যন্ত সবগুলো স্টেশন সম্পূর্ণ কার্যকর।\n\nবিস্তারিত শিডিউল ও লাইভ অবস্থা দেখতে ভিজিট করুন: ${APP_URL}`
      };
    }
    return {
      type: 'METRO_GENERAL',
      reply: `মেট্রোরেল (এমআরটি লাইন ৬) সংক্রান্ত তথ্য:\n• রুট: উত্তরা উত্তর ↔ মতিঝিল (১৬টি স্টেশন সম্পূর্ণ চালু)\n• সময়: সকাল ৭:১০ – রাত ৯:৪০ (শুক্রবার দুপুর ৩:০০ – রাত ৯:৪০)\n• ভাড়া: ২০ টাকা থেকে ১০০ টাকা (MRT Pass-এ ১০% ছাড়)\n\nরুট ম্যাপ, ভাড়া ও সময় দেখতে ডাউনলোড করুন কই যাবো অ্যাপ: ${PLAY_STORE_URL}`
    };
  }

  // 3. Train Tracking & Intercity Inquiry
  if (/(?:ট্রেন|train|রেল|railway|রেলওয়ে|রেলপথ|intercity)/i.test(clean)) {
    if (/(?:শিডিউল|সময়|সময়|schedule|time)/i.test(clean)) {
      return {
        type: 'TRAIN_SCHEDULE',
        reply: `বাংলাদেশ রেলওয়ের সব আন্তঃনগর ট্রেনের সময়সূচী ও রুট দেখতে ভিজিট করুন কই যাবো ট্রেন গাইড:\n👉 ${APP_URL}/train\n\nঅ্যাপে অফলাইনেও ট্রেনের শিডিউল দেখতে পারবেন: ${PLAY_STORE_URL}`
      };
    }
    return {
      type: 'TRAIN_TRACKING',
      reply: `কই যাবো (Koy Jabo) প্ল্যাটফর্মে এখন সম্পূর্ণ ফ্রিতে বাংলাদেশ রেলওয়ের সব আন্তঃনগর ট্রেনের লাইভ লোকেশন দেখা যাচ্ছে! 🚆🇧🇩\n\nকোনো এসএমএস খরচ ছাড়াই অফলাইনেও ট্রেনের রুট ও সময়সূচী চেক করতে পারবেন।\n\n👉 ট্রাই করুন এখনই:\n• ওয়েবসাইট: ${APP_URL}/train\n• অ্যান্ড্রয়েড অ্যাপ: ${PLAY_STORE_URL}`
    };
  }

  // 4. Launch & Waterways Inquiry
  if (/(?:লঞ্চ|launch|সদরঘাট|sadarghat|নৌকা|steamer)/i.test(clean)) {
    return {
      type: 'LAUNCH_SCHEDULE',
      reply: `সদরঘাট থেকে বরিশাল, চাঁদপুর, ভোলা, পটুয়াখালীসহ দক্ষিণাঞ্চলের সব লঞ্চের সময়সূচী ও ভাড়ার তথ্য জানতে ভিজিট করুন:\n👉 ${APP_URL}/launch\n\nকই যাবো অ্যাপ নামিয়ে নিন: ${PLAY_STORE_URL}`
    };
  }

  // 5. Flights & Airport Inquiry
  if (/(?:ফ্লাইট|flight|বিমান|plane|air|এয়ারপোর্ট|airport|শাহজালাল)/i.test(clean)) {
    return {
      type: 'AIR_SCHEDULE',
      reply: `ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরসহ দেশের সব অভ্যন্তরীণ ফ্লাইটের সময়সূচী ও গাইড দেখতে ভিজিট করুন:\n👉 ${APP_URL}/air\n\nকই যাবো অ্যাপ: ${PLAY_STORE_URL}`
    };
  }

  // 6. Fare Calculator
  if (/(?:ভাড়া|ভাড়া)\s*(?:ক্যালকুলেটর|হিসাব|calculator)|(?:fare\s*calc|bus\s*fare)/i.test(clean)) {
    return {
      type: 'FARE_CALC',
      reply: `ঢাকার যেকোনো লোকাল বাস ও মেট্রোরেলের সঠিক ভাড়া বা ভাড়া হিসাব করতে আমাদের স্মার্ট ভাড়া/ভাড়া ক্যালকুলেটর ব্যবহার করুন:\n👉 ${APP_URL}/fare\n\nসর্বনিম্ন বাস ভাড়া ১০ টাকা এবং মেট্রোরেল সর্বনিম্ন ভাড়া ২০ টাকা।`
    };
  }

  // 7. Advertising & Business Partnership
  if (/(?:বিজ্ঞাপন|advertise|ads|স্পনসর|sponsor|partnership|পার্টনারশিপ|যোগাযোগ)/i.test(clean)) {
    return {
      type: 'ADVERTISING',
      reply: `কই যাবো (Koy Jabo) প্ল্যাটফর্মে বিজ্ঞাপন দিতে বা ব্যবসায়িক পার্টনারশিপ করতে আমাদের সাথে যোগাযোগ করুন:\n📧 ইমেইল: koyjabo.bd@gmail.com\n🌐 ওয়েবসাইট: ${APP_URL}/advertise\n\nপ্রতিদিন হাজারো গণপরিবহন যাত্রীর কাছে আপনার ব্র্যান্ড তুলে ধরুন!`
    };
  }

  // 9. Specific Bus Corridor Matching (Origin -> Destination)
  for (const c of BUS_CORRIDORS) {
    const originFound = c.origin.some(o => clean.includes(o.toLowerCase()));
    const destFound = c.dest.some(d => clean.includes(d.toLowerCase()));
    if (originFound && destFound) {
      let r = `বাস রুট সংক্রান্ত তথ্য:\n${c.summary}\n• বাসসমূহ: ${c.buses}`;
      if (c.metro) r += `\n${c.metro}`;
      r += `\n\nলাইভ রুট ও ম্যাপ দেখতে ভিজিট করুন: ${APP_URL} অথবা ডাউনলোড করুন অ্যাপ: ${PLAY_STORE_URL}`;
      return { type: 'ROUTE_MATCH', reply: r };
    }
  }

  // 10. General Location Search / "How to go" Inquiry
  if (/(?:কীভাবে\s*যাব|কিভাবে\s*যাব|যাওয়ার\s*উপায়|কোন\s*বাস|route|রুট|কই\s*যাবো|koyjabo|koy\s*jabo|kivabe\s*jabo|kivhabe|kothay)/i.test(clean)) {
    return {
      type: 'GENERAL_TRANSIT',
      reply: `ঢাকার যেকোনো জায়গা থেকে আপনার গন্তব্যে যাওয়ার সঠিক বাস, রুট এবং দ্রুততম মাধ্যম জানতে ভিজিট করুন কই যাবো (Koy Jabo): ${APP_URL}\n\nঅথবা গুগল প্লে স্টোর থেকে 'Koy Jabo' অ্যাপটি নামিয়ে নিন: ${PLAY_STORE_URL} 📱\nআপনার যাত্রা শুভ ও নিরাপদ হোক!`
    };
  }

  // 11. Greetings & Politeness
  if (/(?:ধন্যবাদ|thanks|thank\s*you|great|good|অনেক\s*সুন্দর|দারুণ|মাশাআল্লাহ|হায়|হ্যালো|hi|hello|assalamu|সালাম)/i.test(clean)) {
    return {
      type: 'GREETING',
      reply: `কই যাবো (Koy Jabo) এর সাথে থাকার জন্য ধন্যবাদ! 😊\n\nঢাকার সব লোকাল বাস রুট, মেট্রোরেল শিডিউল এবং ট্রেনের লাইভ লোকেশন সহজে জানতে ব্যবহার করুন:\n🌐 ওয়েবসাইট: ${APP_URL}\n📱 অ্যাপ: ${PLAY_STORE_URL}\n\nসবসময় কই যাবো এর পাশে থাকুন, আপনার যেকোনো যাতায়াত সংক্রান্ত প্রশ্ন থাকলে নির্দ্বিধায় জানান!`
    };
  }

  return null;
}

/**
 * Call Gemini AI (gemini-3-flash-preview or gemini-3.5-flash-lite) for open-ended transit questions
 */
async function callGeminiAi(prompt, systemInstruction, apiKey) {
  if (!apiKey) return null;
  const models = ['gemini-3-flash-preview', 'gemini-3.5-flash-lite'];

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 600,
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (candidateText) return candidateText;
      } else {
        console.warn(`Gemini model ${model} returned status: ${res.status}`);
      }
    } catch (err) {
      console.error(`Gemini fetch exception on ${model}:`, err);
    }
  }
  return null;
}

/**
 * Enforce Zero Customer Full Name Disclosure Rule for Public Comments
 */
function removeCustomerFullName(text, customerName) {
  if (!text || !customerName) return text || '';
  let cleaned = text;

  // Split name into parts and escape each to match dots, spaces, and punctuation variations
  const parts = customerName.trim().split(/[\s.]+/).filter(Boolean);
  if (parts.length > 0) {
    const pattern = parts.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[.\\s]+');
    const re = new RegExp(`(?:ধন্যবাদ|জনাব|Dear|Hi|Hello|Assalamu\\s*Alaikum|ভাই|আপু)?[\\s,:]*${pattern}[:!,.]*\\s*`, 'gi');
    cleaned = cleaned.replace(re, '');
  }
  return cleaned.trim();
}

/**
 * Send Facebook Messenger Action (mark_seen, typing_on, typing_off)
 */
async function sendMessengerAction(recipientId, action, token) {
  try {
    await fetch(`https://graph.facebook.com/v21.0/me/messages?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        sender_action: action
      })
    });
  } catch (e) {
    console.error('Messenger action failed:', e);
  }
}

/**
 * Send Messenger Text Message with optional Quick Replies
 */
async function sendMessengerMessage(recipientId, text, token, quickReplies = false) {
  const payload = {
    messaging_type: 'RESPONSE',
    recipient: { id: recipientId },
    message: { text }
  };
  if (quickReplies) {
    payload.message.quick_replies = QUICK_REPLIES;
  }
  const res = await fetch(`https://graph.facebook.com/v21.0/me/messages?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    console.error('sendMessengerMessage failed:', res.status, await res.text());
  }
  return res.ok;
}

/**
 * Reply to Facebook Post Comment
 */
async function replyToComment(commentId, text, token) {
  const res = await fetch(`https://graph.facebook.com/v21.0/${commentId}/comments?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });
  if (!res.ok) {
    console.error('replyToComment failed:', res.status, await res.text());
  } else {
    console.log('Successfully replied to comment:', commentId);
  }
  return res.ok;
}

/**
 * Messenger Event Handler for Koy Jabo with KV Idempotency
 */
async function handleKoyJaboMessenger(env, event) {
  const senderId = event.sender?.id;
  if (!senderId || String(senderId) === String(env.FB_PAGE_ID)) return;
  if (event.message?.is_echo) return;

  const messageId = event.message?.mid;
  if (messageId && env.POSTED) {
    const processed = await env.POSTED.get('msg_' + messageId);
    if (processed) {
      console.log(`[Idempotency] Message ${messageId} already processed. Skipping.`);
      return;
    }
    await env.POSTED.put('msg_' + messageId, '1', { expirationTtl: 86400 });
  }

  const userText = (event.message?.text || event.postback?.payload || event.postback?.title || '').trim();
  if (!userText) return;

  console.log(`[KoyJabo Messenger] Received from ${senderId}: "${userText}"`);

  // Quick actions: mark seen & typing indicator
  await sendMessengerAction(senderId, 'mark_seen', env.PAGE_ACCESS_TOKEN);
  await sendMessengerAction(senderId, 'typing_on', env.PAGE_ACCESS_TOKEN);

  // 1. Try Deterministic Transit Engine
  const resolved = resolveTransitQuery(userText);
  let replyText = resolved?.reply;

  // 2. Gemini Fallback
  if (!replyText && env.GEMINI_API_KEY) {
    const sysPrompt = "You are the Senior Transit Assistant for Koy Jabo (কই যাবো - https://koyjabo.com), Bangladesh's public transport guide. Help users with Dhaka bus routes, metro rail schedule/fares, and train tracking in friendly, fluent Bengali. Never hallucinate fake bus names. Always recommend checking https://koyjabo.com or downloading the Android app.";
    replyText = await callGeminiAi(userText, sysPrompt, env.GEMINI_API_KEY);
  }

  if (!replyText) {
    replyText = `আসসালামু আলাইকুম! কই যাবো (Koy Jabo) তে স্বাগতম। 🚌🚆\n\nঢাকার যেকোনো বাস রুট, মেট্রোরেল সময়সূচী ও ভাড়া এবং ট্রেনের লাইভ লোকেশন জানতে ব্যবহার করুন:\n🌐 ওয়েবসাইট: ${APP_URL}\n📱 অ্যাপ: ${PLAY_STORE_URL}\n\nআপনি কোথা থেকে কোথায় যেতে চান জানান, আমি সঠিক রুট ও বাস জানিয়ে দিচ্ছি!`;
  }

  await sendMessengerAction(senderId, 'typing_off', env.PAGE_ACCESS_TOKEN);
  await sendMessengerMessage(senderId, replyText, env.PAGE_ACCESS_TOKEN, true);
}

/**
 * Feed Comment Event Handler for Koy Jabo with KV Idempotency
 */
async function handleKoyJaboComment(env, value) {
  if (value.item !== 'comment' || !['add', 'edit'].includes(value.verb)) return;

  const fromId = String(value.from?.id || '');
  const fromName = String(value.from?.name || 'Transit User');
  const commentId = value.comment_id || value.id;
  const commentText = (value.message || '').trim();

  // Guard against self-replies from page or admin
  if (!commentId || !commentText || fromId === String(env.FB_PAGE_ID)) return;
  if (fromName.toLowerCase().includes('koy jabo') || fromName.includes('কই যাবো')) return;

  // Idempotency: Prevent duplicate replies
  if (env.POSTED) {
    const processed = await env.POSTED.get('cmt_' + commentId);
    if (processed) {
      console.log(`[Idempotency] Comment ${commentId} already replied. Skipping.`);
      return;
    }
    await env.POSTED.put('cmt_' + commentId, '1', { expirationTtl: 86400 });
  }

  console.log(`[KoyJabo Comment] Comment ${commentId} by ${fromName}: "${commentText}"`);

  // 1. Try Deterministic Transit Engine
  const resolved = resolveTransitQuery(commentText);
  let replyText = resolved?.reply;

  // 2. Gemini Fallback
  if (!replyText && env.GEMINI_API_KEY) {
    const sysPrompt = "You are the official Facebook Page Comment AI for Koy Jabo (কই যাবো - https://koyjabo.com). Write a polite, helpful 2-3 sentence reply in Bengali answering their transport query. Do NOT use their full name. Mention checking https://koyjabo.com or downloading the Koy Jabo app from Google Play.";
    replyText = await callGeminiAi(commentText, sysPrompt, env.GEMINI_API_KEY);
  }

  if (!replyText) {
    replyText = `ধন্যবাদ! ঢাকার যেকোনো বাস রুট, মেট্রোরেল শিডিউল ও ট্রেনের লাইভ লোকেশন জানতে ভিজিট করুন: ${APP_URL} অথবা প্লে স্টোর থেকে ডাউনলোড করুন 'কই যাবো' অ্যাপ: ${PLAY_STORE_URL} 😊`;
  }

  // Enforce Zero Full-Name Rule
  const cleanReply = removeCustomerFullName(replyText, fromName);
  await replyToComment(commentId, cleanReply, env.PAGE_ACCESS_TOKEN);
}

// Forward event to MI Agro live cPanel server with browser/FacebookBot user agent
async function forwardToMiAgro(body) {
  try {
    const res = await fetch(MI_AGRO_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; FacebookBot/1.0; +http://developers.facebook.com)'
      },
      body: JSON.stringify(body)
    });
    console.log(`[Proxy] Forwarded to MI Agro. Response status: ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error('[Proxy] Failed to forward to MI Agro:', err);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// Blog RSS Auto-Poster: Reads feed.xml and posts newest article
// ─────────────────────────────────────────────────────────────
const FEED_URL = 'https://koyjabo.com/blog/feed.xml';

function parseLatestItem(xml) {
  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
  if (!itemMatch) return null;
  const body = itemMatch[1];
  const get = (tag) => {
    const m = body.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[|)([\\s\\S]*?)(?:\\]\\]>|)<\\/${tag}>`));
    return m ? m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim() : '';
  };
  return { title: get('title'), link: get('link') };
}

async function postNewestBlogToFacebook(env) {
  if (!env.FB_PAGE_ID || !env.PAGE_ACCESS_TOKEN) return;
  try {
    const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'KoyJabo-AutoPoster' } });
    if (!res.ok) return;
    const post = parseLatestItem(await res.text());
    if (!post?.link) return;

    if (env.POSTED) {
      const last = await env.POSTED.get('last_link');
      if (last === post.link) return;
    }

    const message = `📝 নতুন গাইড!\n\n${post.title}\n\nবিস্তারিত দেখুন → ${post.link}`;
    const fbRes = await fetch(`https://graph.facebook.com/v21.0/${env.FB_PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        link: post.link,
        access_token: env.PAGE_ACCESS_TOKEN,
      }),
    });

    if (fbRes.ok && env.POSTED) {
      await env.POSTED.put('last_link', post.link);
      console.log('Successfully auto-posted blog to Facebook:', post.link);
    }
  } catch (err) {
    console.error('Auto-post error:', err);
  }
}

// ─────────────────────────────────────────────────────────────
// Main Worker Export
// ─────────────────────────────────────────────────────────────
export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(postNewestBlogToFacebook(env));
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Diagnostic Health Check
    if (url.searchParams.get('diag') === (env.VERIFY_TOKEN || 'mi_agro_ai_secret_verify_2026')) {
      return new Response(JSON.stringify({
        status: 'active',
        system: 'Koy Jabo & MI Agro Multi-Tenant AI Edge Mesh v9.2',
        platform: 'Cloudflare Workers (Edge)',
        koyjabo_page_id: env.FB_PAGE_ID || '857945850742920',
        mi_agro_proxy: MI_AGRO_WEBHOOK,
        auto_reply_messenger: true,
        auto_reply_comments: true,
        zero_name_policy: true,
        kv_idempotency_enabled: !!env.POSTED,
        gemini_ai_configured: !!env.GEMINI_API_KEY,
        time: new Date().toISOString()
      }, null, 2), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    // 1b. Test MI Agro Proxy Connection
    if (url.searchParams.get('test_mi') === '1') {
      try {
        const testRes = await fetch(`${MI_AGRO_WEBHOOK}?diag=${env.VERIFY_TOKEN || 'mi_agro_ai_secret_verify_2026'}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FacebookBot/1.0; +http://developers.facebook.com)' }
        });
        const testData = await testRes.text();
        return new Response(JSON.stringify({
          proxy_target: MI_AGRO_WEBHOOK,
          status: testRes.status,
          response: testData
        }, null, 2), { headers: { 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // 2. Meta Webhook Verification Handshake
    if (request.method === 'GET') {
      const mode = url.searchParams.get('hub.mode');
      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');
      const expectedToken = env.VERIFY_TOKEN || 'mi_agro_ai_secret_verify_2026';

      if (mode === 'subscribe' && token === expectedToken) {
        console.log('Meta Webhook Handshake Verified Successfully!');
        return new Response(challenge, { status: 200 });
      }
      return new Response('Verification token mismatch', { status: 403 });
    }

    // 3. Meta Webhook Event Dispatcher (POST)
    if (request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return new Response('Invalid JSON', { status: 400 });
      }

      if (body.object === 'page') {
        const entries = body.entry || [];

        for (const entry of entries) {
          const entryId = String(entry.id || '');

          // Check if this entry belongs to MI Agro
          // Koy Jabo Page ID is 857945850742920. Anything else (or specifically 1363075996880828 / 61594281573717) is MI Agro
          const isKoyJabo = entryId === '857945850742920' || entryId === String(env.FB_PAGE_ID);

          if (!isKoyJabo) {
            console.log(`[Proxy] Routing entry ${entryId} directly to MI Agro server...`);
            await forwardToMiAgro(body);
            continue;
          }

          // If Koy Jabo:
          // A. Messenger Events
          if (Array.isArray(entry.messaging)) {
            for (const event of entry.messaging) {
              const recipientId = String(event.recipient?.id || '');
              if (recipientId !== '857945850742920') {
                await forwardToMiAgro(body);
                continue;
              }
              ctx.waitUntil(handleKoyJaboMessenger(env, event));
            }
          }

          // B. Feed / Comments Events
          if (Array.isArray(entry.changes)) {
            for (const change of entry.changes) {
              if (change.field === 'feed' && change.value) {
                const postId = String(change.value.post_id || change.value.post?.id || change.value.parent_id || '');
                if (!postId.includes('857945850742920')) {
                  await forwardToMiAgro(body);
                  continue;
                }
                ctx.waitUntil(handleKoyJaboComment(env, change.value));
              }
            }
          }
        }
      }

      return new Response('EVENT_RECEIVED', { status: 200 });
    }

    return new Response('Method Not Allowed', { status: 405 });
  }
};
