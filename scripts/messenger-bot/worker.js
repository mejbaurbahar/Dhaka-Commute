/**
 * KoyJabo Transit Intelligence & Multi-Tenant Social Media AI
 * Cloudflare Worker for Koy Jabo (কই যাবো - https://koyjabo.com)
 * 
 * Features:
 * - Messenger Transit Assistant AI (Auto-reply 24/7 with Dhaka Bus, Metro Rail, Train intelligence)
 * - Public Comment Auto-Reply AI (Every comment answered on Facebook posts)
 * - Strict Zero Customer Full Name disclosure rule
 * - Multi-Tenant Proxy: Forwards MI Agro events directly to live server
 * - Blog RSS Auto-Poster: Automatically publishes new articles to Facebook page
 * - Native Gemini AI Integration for natural Bengali conversational fallback
 */

const APP_URL = 'https://koyjabo.com';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.koyjabo.app';
const MI_AGRO_WEBHOOK = 'https://www.miunifyldagroltd.com/api/fb-webhook.php';

// Quick Reply Chips for Messenger
const QUICK_REPLIES = [
  { content_type: 'text', title: '🚌 বাস রুট সন্ধান', payload: 'BUS_ROUTES' },
  { content_type: 'text', title: '🚇 মেট্রোরেল সময় ও ভাড়া', payload: 'METRO' },
  { content_type: 'text', title: '🚆 ট্রেনের লাইভ লোকেশন', payload: 'TRAIN' },
  { content_type: 'text', title: '📱 অ্যাপ ডাউনলোড', payload: 'APP_DOWNLOAD' },
];

// Major Verified Dhaka Bus Corridors
const BUS_CORRIDORS = [
  {
    keys: ['মিরপুর_মতিঝিল'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ২', 'মিরপুর ১১', 'মিরপুর ১২', 'পল্লবী'],
    dest: ['মতিঝিল', 'গুলিস্তান', 'পল্টন', 'দৈনিক বাংলা', 'প্রেসক্লাব'],
    buses: 'বিহঙ্গ, স্বাধীন, শিখর, তানজিল, বিকল্প অটো সার্ভিস',
    metro: '💡 দ্রুততম যাতায়াতে মেট্রোরেল ব্যবহার করতে পারেন! মিরপুর ১০ থেকে মতিঝিল মাত্র ৩০ মিনিটে পৌঁছানো যায়।',
    summary: 'মিরপুর থেকে মতিঝিল/গুলিস্তান যাতায়াতে বিহঙ্গ, স্বাধীন, শিখর, তানজিল ও বিকল্প বাস চলাচল করে।'
  },
  {
    keys: ['মিরপুর_উত্তরা'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ১২', 'পল্লবী', 'কালশী', 'ইসিবি'],
    dest: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'হাউস বিল্ডিং'],
    buses: 'প্রজাপতি, নূর-ই-মক্কা, পরিস্থান, বসুমতি, তেঁতুলিয়া',
    metro: '💡 উত্তরা উত্তর/সেন্টার/দক্ষিণ যেতে মিরপুর ১০ বা পল্লবী থেকে সরাসরি মেট্রোরেল ব্যবহার করতে পারেন।',
    summary: 'মিরপুর থেকে উত্তরা/আব্দুল্লাহপুর যেতে প্রজাপতি, নূর-ই-মক্কা, পরিস্থান, বসুমতি অথবা তেঁতুলিয়া বাসে সরাসরি যেতে পারবেন।'
  },
  {
    keys: ['মিরপুর_ফার্মগেট'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ২', 'কাজীপাড়া', 'শেওড়াপাড়া'],
    dest: ['ফার্মগেট', 'ফার্ম গেইট', 'ইন্দিরা রোড', 'খামারবাড়ি'],
    buses: 'বিহঙ্গ, বিকল্প, দিশারী, খাজাবাবা, মিরপুর লিংক',
    metro: '💡 জ্যাম এড়াতে মিরপুর ১০ থেকে ফার্মগেট মেট্রোরেলে মাত্র ১০-১২ মিনিটে পৌঁছানো যায়।',
    summary: 'মিরপুর থেকে ফার্মগেট যাতায়াতে বিহঙ্গ, বিকল্প, দিশারী ও খাজাবাবা বাস চলাচল করে। সরাসরি মেট্রোরেলেও যেতে পারেন।'
  },
  {
    keys: ['মিরপুর_গুলশান_বাড্ডা'],
    origin: ['মিরপুর', 'মিরপুর ১০', 'মিরপুর ১', 'মিরপুর ২', 'মিরপুর ১৪'],
    dest: ['গুলশান', 'বনানী', 'বাড্ডা', 'নতুন বাজার', 'নতুনবাজার', 'রামপুরা'],
    buses: 'বৈশাখী পরিবহন, নূর-ই-মক্কা, রব্বানী, আকাশ, আলিফ',
    metro: null,
    summary: 'মিরপুর থেকে নতুন বাজার/বাড্ডা/গুলশান রুটে বৈশাখী পরিবহন, নূর-ই-মক্কা, রব্বানী ও আকাশ বাস পাওয়া যায়।'
  },
  {
    keys: ['উত্তরা_মতিঝিল'],
    origin: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'খিলক্ষেত'],
    dest: ['মতিঝিল', 'গুলিস্তান', 'পল্টন'],
    buses: 'ভিআইপি ২৭, আজমেরী গ্লোরি, প্রভাতী বনশ্রী, বলাকা, গাজীপুর পরিবহন',
    metro: '💡 উত্তরা উত্তর/সেন্টার/দক্ষিণ থেকে মতিঝিল সরাসরি মেট্রোরেলে মাত্র ৩৫ মিনিটে কোনো জ্যাম ছাড়াই পৌঁছাতে পারবেন।',
    summary: 'উত্তরা থেকে মতিঝিল/গুলিস্তান যেতে ভিআইপি ২৭, আজমেরী গ্লোরি, প্রভাতী বনশ্রী ও বলাকা বাস চলাচল করে।'
  },
  {
    keys: ['উত্তরা_ধানমন্ডি'],
    origin: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর'],
    dest: ['ধানমন্ডি', 'ধানমণ্ডি', 'শুক্রাবাদ', 'কলাবাগান', 'সাইন্সল্যাব', 'সায়েন্সল্যাব', 'নিউমার্কেট'],
    buses: 'বিকাশ পরিবহন, দেওয়ান পরিবহন, ভিআইপি ২৭',
    metro: '💡 মেট্রোরেলে উত্তরা থেকে ফার্মগেট নেমে সেখান থেকে সহজে রিকশা/বাসে ধানমন্ডি পৌঁছানো যায়।',
    summary: 'উত্তরা থেকে ধানমন্ডি রুটে সরাসরি বিকাশ পরিবহন ও দেওয়ান পরিবহন বাস চলাচল করে।'
  },
  {
    keys: ['উত্তরা_যাত্রাবাড়ী'],
    origin: ['উত্তরা', 'আব্দুল্লাহপুর', 'আবদুল্লাহপুর', 'এয়ারপোর্ট', 'বিমানবন্দর', 'কুড়িল'],
    dest: ['যাত্রাবাড়ী', 'যাত্রাবাড়ী', 'সায়েদাবাদ', 'সায়েদাবাদ', 'শনির আখড়া', 'চিটাগাং রোড'],
    buses: 'রাইদা পরিবহন, অনাবিল সুপার, তুরাগ, ছালছাবিল, লাব্বাইক',
    metro: null,
    summary: 'উত্তরা/বিমানবন্দর/কুড়িল থেকে যাত্রাবাড়ী/সায়েদাবাদ যেতে রাইদা, অনাবিল সুপার, তুরাগ ও ছালছাবিল বাস রয়েছে।'
  },
  {
    keys: ['গাবতলী_যাত্রাবাড়ী'],
    origin: ['গাবতলী', 'টেকনিক্যাল', 'কল্যাণপুর', 'শ্যামলী'],
    dest: ['যাত্রাবাড়ী', 'যাত্রাবাড়ী', 'সায়েদাবাদ', 'সায়েদাবাদ'],
    buses: '৮ নম্বর বাস, বোরাক পরিবহন, লাব্বাইক, ঠিকানা পরিবহন, মিডওয়ে',
    metro: null,
    summary: 'গাবতলী থেকে সায়েদাবাদ/যাত্রাবাড়ী রুটে ৮ নম্বর বাস, বোরাক, লাব্বাইক ও ঠিকানা বাস চলাচল করে।'
  },
  {
    keys: ['বাড্ডা_ধানমন্ডি'],
    origin: ['বাড্ডা', 'রামপুরা', 'মৌচাক', 'মালিবাগ', 'শান্তিনগর'],
    dest: ['ধানমন্ডি', 'ধানমণ্ডি', 'সাইন্সল্যাব', 'নিউমার্কেট'],
    buses: 'তরঙ্গ প্লাস, মিডওয়ে, নূর-ই-মক্কা',
    metro: null,
    summary: 'বাড্ডা/রামপুরা থেকে ধানমন্ডি/নিউমার্কেট যেতে তরঙ্গ প্লাস ও মিডওয়ে বাস পাওয়া যায়।'
  },
  {
    keys: ['ধানমন্ডি_গুলশান'],
    origin: ['ধানমন্ডি', 'ধানমণ্ডি', 'সাইন্সল্যাব', 'কলাবাগান'],
    dest: ['গুলশান', 'বনানী', 'মহাখালী', 'নতুন বাজার'],
    buses: 'তিতাস পরিবহন, এফটিসিএল, বিকাশ পরিবহন',
    metro: null,
    summary: 'ধানমন্ডি থেকে মহাখালী/বনানী/গুলশান রুটে তিতাস ও বিকাশ পরিবহন বাস চলাচল করে।'
  }
];

/**
 * Deterministic Query Resolver for Transit Q&A
 */
function resolveTransitQuery(text) {
  if (!text) return null;
  const raw = String(text).toLowerCase();
  const clean = raw.replace(/[?!.,।_()\-:;'"’‘]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. App Download / Install Query
  if (/(?:অ্যাপ|app|apk|ডাউনলোড|download|ইনস্টল|install|প্লে\s*স্টোর|play\s*store)/i.test(clean)) {
    return {
      type: 'APP_DOWNLOAD',
      reply: `কই যাবো (Koy Jabo) অ্যান্ড্রয়েড অ্যাপ এখন গুগল প্লে স্টোরে সম্পূর্ণ ফ্রিতে পাওয়া যাচ্ছে! 📱\n\n👉 অ্যাপ ডাউনলোড লিংক:\n${PLAY_STORE_URL}\n\n🌐 ওয়েবসাইট: ${APP_URL}\n\nঅ্যাপে পাবেন ঢাকার সব বাস রুট, মেট্রোরেল শিডিউল এবং ট্রেনের রিয়েল-টাইম লাইভ লোকেশন।`
    };
  }

  // 2. Metro Rail (Timings, Fares, Friday Schedule)
  if (/(?:মেট্রো|মেট্রোরেল|metro|mrt|mrt6|লাইন\s*৬)/i.test(clean)) {
    if (/(?:শুক্রবার|জুমা|friday)/i.test(clean)) {
      return {
        type: 'METRO_FRIDAY',
        reply: `মেট্রোরেল শুক্রবারের সময়সূচী:\nশুক্রবার মেট্রোরেল দুপুর ৩:০০ টা থেকে রাত ৯:৪০ টা পর্যন্ত চলাচল করে (পিক আওয়ারে প্রতি ৮ মিনিট পর ট্রেন ছাড়ে)।\n\nসর্বনিম্ন ভাড়া ২০ টাকা, সর্বোচ্চ ১০০ টাকা (MRT Pass-এ ১০% ছাড়)। বিস্তারিত দেখুন: ${APP_URL}`
      };
    }
    if (/(?:ভাড়া|ভাড়া|fare|cost|দাম)/i.test(clean)) {
      return {
        type: 'METRO_FARE',
        reply: `মেট্রোরেলের ভাড়া তালিকা:\n• সর্বনিম্ন ভাড়া: ২০ টাকা\n• সর্বোচ্চ ভাড়া (উত্তরা উত্তর ↔ মতিঝিল): ১০০ টাকা\n• প্রতি কিলোমিটার ভাড়া: ৫ টাকা\n• বিশেষ সুবিধা: MRT Pass বা Rapid Pass ব্যবহার করলে প্রতি যাত্রায় ১০% ছাড় পাওয়া যায়!\n\nসব স্টেশনের সঠিক ভাড়া ক্যালকুলেট করতে ভিজিট করুন: ${APP_URL}`
      };
    }
    if (/(?:সময়|সময়|schedule|time|timing|কখন|কয়টা|কয়টা)/i.test(clean)) {
      return {
        type: 'METRO_SCHEDULE',
        reply: `মেট্রোরেলের সময়সূচী:\n• শনিবার থেকে বৃহস্পতিবার: সকাল ৭:১০ থেকে রাত ৯:৪০ পর্যন্ত\n• শুক্রবার: দুপুর ৩:০০ থেকে রাত ৯:৪০ পর্যন্ত\n• পিক আওয়ারে প্রতি ৮ মিনিট পরপর ট্রেন ছাড়ে।\n\nউত্তরা উত্তর থেকে মতিঝিল পর্যন্ত ১৬টি স্টেশন সম্পূর্ণ চালু। বিস্তারিত সময়সূচী দেখুন: ${APP_URL}`
      };
    }
    return {
      type: 'METRO_GENERAL',
      reply: `মেট্রোরেল (এমআরটি লাইন ৬) সংক্রান্ত তথ্য:\n• রুট: উত্তরা উত্তর ↔ মতিঝিল (১৬টি স্টেশন চালু)\n• সময়: সকাল ৭:১০ – রাত ৯:৪০ (শুক্রবার দুপুর ৩:০০ – রাত ৯:৪০)\n• ভাড়া: ২০ টাকা থেকে ১০০ টাকা (MRT Pass-এ ১০% ছাড়)\n\nরুট ম্যাপ ও ভাড়া দেখতে ডাউনলোড করুন কই যাবো অ্যাপ: ${PLAY_STORE_URL}`
    };
  }

  // 3. Train Tracking & Intercity
  if (/(?:ট্রেন|train|রেল|railway|রেলওয়ে)/i.test(clean)) {
    return {
      type: 'TRAIN_TRACKING',
      reply: `কই যাবো (Koy Jabo) প্ল্যাটফর্মে এখন সম্পূর্ণ ফ্রিতে বাংলাদেশ রেলওয়ের সব আন্তঃনগর ট্রেনের লাইভ লোকেশন দেখা যাচ্ছে! 🚆🇧🇩\n\nঅফলাইনেও ট্রেনের রুট ও সময়সূচী চেক করতে পারবেন।\n\n👉 ট্রাই করুন এখনই:\n• ওয়েবসাইট: ${APP_URL}\n• অ্যান্ড্রয়েড অ্যাপ: ${PLAY_STORE_URL}`
    };
  }

  // 4. Corridor Matching (From -> To)
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

  // 5. General Transit/Location Search
  if (/(?:বাস|bus|কীভাবে\s*যাব|কিভাবে\s*যাব|যাওয়ার\s*উপায়|কোন\s*বাস|route|রুট|কই\s*যাবো|koyjabo|koy\s*jabo)/i.test(clean)) {
    return {
      type: 'GENERAL_TRANSIT',
      reply: `ঢাকার যেকোনো জায়গা থেকে গন্তব্যে যাওয়ার সঠিক বাস, রুট এবং দ্রুততম মাধ্যম জানতে ভিজিট করুন কই যাবো (Koy Jabo): ${APP_URL}\n\nঅথবা প্লে স্টোর থেকে 'Koy Jabo' অ্যাপটি নামিয়ে নিন: ${PLAY_STORE_URL} 📱\nআপনার যাত্রা শুভ ও সহজ হোক!`
    };
  }

  // 6. Greetings / Politeness
  if (/(?:ধন্যবাদ|thanks|thank\s*you|great|good|অনেক\s*সুন্দর|দারুণ|মাশাআল্লাহ|হায়|হ্যালো|hi|hello|assalamu|সালাম)/i.test(clean)) {
    return {
      type: 'GREETING',
      reply: `কই যাবো (Koy Jabo) এর সাথে থাকার জন্য ধন্যবাদ! 😊\n\nঢাকার সব লোকাল বাস রুট, মেট্রোরেল শিডিউল এবং ট্রেনের লাইভ লোকেশন সহজে জানতে ব্যবহার করুন:\n🌐 ওয়েবসাইট: ${APP_URL}\n📱 অ্যাপ: ${PLAY_STORE_URL}\n\nআপনার যেকোনো যাতায়াত সংক্রান্ত প্রশ্ন থাকলে নির্দ্বিধায় জানান!`
    };
  }

  return null;
}

/**
 * Call Gemini AI for natural Bengali conversational assistance
 */
async function callGeminiAi(prompt, systemInstruction, apiKey) {
  if (!apiKey) return null;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
        }
      })
    });
    if (!res.ok) {
      console.error('Gemini error:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch (err) {
    console.error('Gemini fetch exception:', err);
    return null;
  }
}

/**
 * Remove customer full name to strictly enforce Zero Full-Name Disclosure Policy
 */
function removeCustomerFullName(text, customerName) {
  if (!text || !customerName) return text || '';
  const cleanName = customerName.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
  if (cleanName.length < 3) return text;
  const escaped = cleanName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(?:ধন্যবাদ\\s+)?${escaped}[:!,.]*\\s*`, 'gi'), '').trim();
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
 * Messenger Event Handler for Koy Jabo
 */
async function handleKoyJaboMessenger(env, event) {
  const senderId = event.sender?.id;
  if (!senderId || String(senderId) === String(env.FB_PAGE_ID)) return;
  if (event.message?.is_echo) return;

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
 * Feed Comment Event Handler for Koy Jabo
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
        system: 'Koy Jabo & MI Agro Multi-Tenant AI Edge Mesh v8.0',
        platform: 'Cloudflare Workers (Edge)',
        koyjabo_page_id: env.FB_PAGE_ID || '857945850742920',
        mi_agro_proxy: MI_AGRO_WEBHOOK,
        auto_reply_messenger: true,
        auto_reply_comments: true,
        zero_name_policy: true,
        gemini_ai_configured: !!env.GEMINI_API_KEY,
        time: new Date().toISOString()
      }, null, 2), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
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

          // If entry is for MI Agro, proxy to live cPanel server
          if (entryId === '1363075996880828' || entryId === '61594281573717') {
            console.log(`[Proxy] Forwarding MI Agro entry ${entryId} to live server...`);
            ctx.waitUntil(
              fetch(MI_AGRO_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
              }).then(r => console.log('[Proxy] MI Agro response:', r.status)).catch(e => console.error('[Proxy] MI Agro error:', e))
            );
            continue;
          }

          // Otherwise, process as Koy Jabo
          // A. Messenger Events
          if (Array.isArray(entry.messaging)) {
            for (const event of entry.messaging) {
              const recipientId = String(event.recipient?.id || '');
              if (recipientId === '1363075996880828') {
                ctx.waitUntil(fetch(MI_AGRO_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }));
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
                if (postId.startsWith('1363075996880828')) {
                  ctx.waitUntil(fetch(MI_AGRO_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }));
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
