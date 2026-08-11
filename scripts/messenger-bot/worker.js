/**
 * KoyJabo Messenger auto-reply bot — Cloudflare Worker.
 *
 * Free tier: 100k requests/day. Deploy:
 *   npm i -g wrangler
 *   cd scripts/messenger-bot
 *   wrangler deploy worker.js --name koyjabo-messenger-bot
 *   wrangler secret put VERIFY_TOKEN   (any random string, e.g. "koyjabo-9f2x")
 *   wrangler secret put PAGE_ACCESS_TOKEN  (from Meta Developer app → Messenger)
 *
 * Then in Meta Developer app: Messenger product → Webhook → callback URL
 *   https://koyjabo-messenger-bot.<your-subdomain>.workers.dev/webhook
 *   Verify token = the VERIFY_TOKEN you set. Subscribe to `messages` + `messaging_postbacks`.
 *
 * Keywords match Bangla + English. No API keys in code — all via secrets.
 */

const APP_URL = 'https://koyjabo.com';

const GREETING = [
  '👋 Hello! Welcome to KoyJabo — Bangladesh\'s free transport guide.',
  '👋 আসসালামু আলাইকুম! কোয়জাবোতে স্বাগতম — বাংলাদেশের ফ্রি ট্রান্সপোর্ট গাইড।',
  '',
  'Ask me about:',
  '🚌 Bus routes  •  🚇 Metro  •  🚆 Train  •  🚢 Launch  •  💰 Fares  •  🕐 Hours',
  '',
  'Or open the app → ' + APP_URL,
].join('\n');

const QUICK_REPLIES = [
  { content_type: 'text', title: '🚌 Bus routes', payload: 'BUS_ROUTES' },
  { content_type: 'text', title: '🚇 Metro', payload: 'METRO' },
  { content_type: 'text', title: '💰 Fares', payload: 'FARES' },
  { content_type: 'text', title: '🕐 Hours', payload: 'HOURS' },
];

function has(text, ...patterns) {
  const t = text.toLowerCase();
  return patterns.some((p) => t.includes(p));
}

function detect(text) {
  const t = text.toLowerCase();

  if (has(t, 'hi', 'hello', 'hey', 'salam', 'আসসালাম', 'হাই', 'হ্যালো', 'হেলো', 'ki khabar', 'কেমন')) {
    return { reply: GREETING, quick: true };
  }
  if (has(t, 'metro', 'মেট্রো', 'উত্তরা', 'মতিঝিল', 'আগারগাঁও', 'মিরপুর-১০')) {
    return {
      reply: [
        '🚇 Metro (MRT-6): Uttara → Motijheel, every ~5 min.',
        '⏰ Most days 07:10–21:40 · Friday 2:00PM–8:20PM.',
        '',
        'All 16 stations + live status → ' + APP_URL + '/metro',
        '',
        '🚇 মেট্রো (এমআরটি-৬): উত্তরা → মতিঝিল, প্রতি ~৫ মিনিট।',
        '⏰ সচরাচর সকাল ৭:১০ – রাত ৯:৪০ · শুক্রবার দুপুর ২:০০ – রাত ৮:২০।',
        '',
        'সব ১৬টি স্টেশন + লাইভ অবস্থা → ' + APP_URL + '/metro',
      ].join('\n'),
    };
  }
  if (has(t, 'fare', 'ভাড়া', 'ভারা', 'টাকা', 'price', 'কত')) {
    return {
      reply: [
        '💰 Dhaka bus fares: minimum ৳10 (5km), up to ৳60+ for long routes.',
        'Metro: ৳20–৳100 by distance. Train/launch: route-based.',
        '',
        'Fare calculator → ' + APP_URL + '/fare',
        '',
        '💰 ঢাকা বাস ভাড়া: সর্বনিম্ন ৳১০ (৫কিমি), লম্বা রুটে ৳৬০+ পর্যন্ত।',
        'মেট্রো: ৳২০–৳১০০ দূরত্ব অনুযায়ী।',
        '',
        'ভাড়া ক্যালকুলেটর → ' + APP_URL + '/fare',
      ].join('\n'),
    };
  }
  if (has(t, 'route', 'রুট', 'বাস', 'bus', 'যাব', 'কোন বাস', 'how do i', 'কোনটা')) {
    return {
      reply: [
        '🚌 450+ bus routes — search your route in the app:',
        '1️⃣ Type your start point',
        '2️⃣ Type your destination',
        '3️⃣ Get route, stops & live bus location',
        '',
        'Search now → ' + APP_URL,
        '',
        '🚌 ৪৫০+ বাস রুট — অ্যাপে আপনার রুট খুঁজুন:',
        '1️⃣ যাত্রা শুরু পয়েন্ট লিখুন',
        '2️⃣ গন্তব্য লিখুন',
        '3️⃣ রুট, স্টপ ও লাইভ বাস লোকেশন পান',
        '',
        'এখনই খুঁজুন → ' + APP_URL,
      ].join('\n'),
    };
  }
  if (has(t, 'train', 'ট্রেন', 'রেল')) {
    return {
      reply: [
        '🚆 Train schedules (all routes) → ' + APP_URL + '/train',
        '',
        '🚆 ট্রেনের সময়সূচি (সব রুট) → ' + APP_URL + '/train',
      ].join('\n'),
    };
  }
  if (has(t, 'launch', 'লঞ্চ', 'নৌকা', 'steamer')) {
    return {
      reply: [
        '🚢 Launch schedules → ' + APP_URL + '/launch',
        '',
        '🚢 লঞ্চের সময়সূচি → ' + APP_URL + '/launch',
      ].join('\n'),
    };
  }
  if (has(t, 'hour', 'সময়', 'কখন খোলা', 'কখন', 'open', 'close', 'last')) {
    return {
      reply: [
        '🕐 Metro: 07:10–21:40 most days, Friday 2:00PM–8:20PM. Buses run ~6AM–midnight.',
        'Exact schedule → ' + APP_URL + '/metro',
        '',
        '🕐 মেট্রো: সচরাচর সকাল ৭:১০–রাত ৯:৪০, শুক্রবার দুপুর ২:০০–রাত ৮:২০। বাস ~ভোর ৬টা–রাত ১২টা।',
      ].join('\n'),
    };
  }
  if (has(t, 'app', 'অ্যাপ', 'download', 'ডাউনলোড', 'install', 'android', 'ইনস্টল')) {
    return {
      reply: [
        '📱 KoyJabo is free — works on any phone browser (PWA):',
        APP_URL,
        '',
        '📱 কোয়জাবো সম্পূর্ণ ফ্রি — যেকোনো ফোনের ব্রাউজারে চলে:',
        APP_URL,
      ].join('\n'),
    };
  }
  if (has(t, 'ads', 'বিজ্ঞাপন', 'advertise', 'promote', 'স্পনসর')) {
    return {
      reply: [
        '📢 Advertise with KoyJabo — reach thousands of Dhaka commuters daily.',
        'Contact → ' + APP_URL + '/advertise',
        '',
        '📢 কোয়জাবোতে বিজ্ঞাপন দিন — প্রতিদিন হাজারো ঢাকাবাসী দেখে।',
        'যোগাযোগ → ' + APP_URL + '/advertise',
      ].join('\n'),
    };
  }

  return {
    reply: [
      '🤖 I can help with routes, metro, fares & schedules!',
      'Try the quick buttons below, or search → ' + APP_URL,
      '',
      '🤖 রুট, মেট্রো, ভাড়া ও সময়সূচি নিয়ে জিজ্ঞেস করুন!',
      'নিচের বাটনে চাপুন, অথবা খুঁজুন → ' + APP_URL,
    ].join('\n'),
    quick: true,
  };
}

async function sendMessage(env, senderId, text, quick = false) {
  const payload = {
    messaging_type: 'RESPONSE',
    recipient: { id: senderId },
    message: { text },
  };
  if (quick) payload.message.quick_replies = QUICK_REPLIES;
  const res = await fetch(
    `https://graph.facebook.com/v21.0/me/messages?access_token=${env.PAGE_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) console.error('send failed', res.status, await res.text());
}

async function handleMessage(env, event) {
  const senderId = event.sender && event.sender.id;
  const text = (event.message && event.message.text) || '';
  if (!senderId || !text.trim()) return;
  const { reply, quick } = detect(text);
  await sendMessage(env, senderId, reply, quick);
}

async function handlePostback(env, event) {
  const senderId = event.sender && event.sender.id;
  const payload = (event.postback && event.postback.payload) || '';
  if (!senderId) return;
  const map = {
    BUS_ROUTES: '🚌 Search any of 450+ routes → ' + APP_URL,
    METRO: '🚇 All 16 stations, live status → ' + APP_URL + '/metro',
    FARES: '💰 Fare calculator → ' + APP_URL + '/fare',
    HOURS: '🕐 Schedules → ' + APP_URL + '/metro',
  };
  await sendMessage(env, senderId, map[payload] || GREETING);
}

// ─────────────────────────────────────────────────────────────
// Auto-poster: cron → newest blog post → Facebook page feed
// Dedupe via KV (POSTED namespace). LinkedIn is covered separately
// by the blog RSS feed already connected to the page.
// ─────────────────────────────────────────────────────────────

const FEED_URL = 'https://koyjabo.com/blog/feed.xml';

function xmlUnescape(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

// Parse RSS <item> blocks (feed.xml generated by scripts/generate-rss.mjs)
function parseLatestItem(xml) {
  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
  if (!itemMatch) return null;
  const body = itemMatch[1];
  const get = (tag) => {
    const m = body.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[|)([\\s\\S]*?)(?:\\]\\]>|)<\\/${tag}>`));
    return m ? xmlUnescape(m[1].trim()) : '';
  };
  return { title: get('title'), link: get('link') };
}

async function postToFacebook(env, post) {
  if (!env.FB_PAGE_ID) return;
  const message = [
    '📝 নতুন গাইড!',
    '',
    post.title,
    '',
    'বিস্তারিত দেখুন → ' + post.link,
  ].join('\n');
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${env.FB_PAGE_ID}/feed`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        link: post.link,
        access_token: env.PAGE_ACCESS_TOKEN,
      }),
    }
  );
  if (!res.ok) {
    console.error('fb post failed', res.status, await res.text());
    return false;
  }
  console.log('fb post published:', post.link);
  return true;
}

async function scheduled(event, env) {
  if (!env.FB_PAGE_ID || !env.PAGE_ACCESS_TOKEN) return;
  const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'KoyJabo-AutoPoster' } });
  if (!res.ok) return;
  const post = parseLatestItem(await res.text());
  if (!post || !post.link) return;

  const last = await env.POSTED.get('last_link');
  if (last === post.link) return; // already posted

  const ok = await postToFacebook(env, post);
  if (ok) await env.POSTED.put('last_link', post.link);
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(scheduled(event, env));
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET') {
      const mode = url.searchParams.get('hub.mode');
      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');
      if (mode === 'subscribe' && token === env.VERIFY_TOKEN) {
        return new Response(challenge);
      }
      return new Response('Verification failed', { status: 403 });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      if (body.object === 'page') {
        const entries = body.entry || [];
        await Promise.all(entries.flatMap((entry) =>
          (entry.messaging || []).map(async (event) => {
            if (event.message) await handleMessage(env, event);
            if (event.postback) await handlePostback(env, event);
          })
        ));
      }
      return new Response('EVENT_RECEIVED', { status: 200 });
    }

    return new Response('Method not allowed', { status: 405 });
  },
};
