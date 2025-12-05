import { BUS_DATA } from '../constants';

export const askGeminiRoute = async (userQuery: string, userApiKey?: string): Promise<string> => {
  const apiKey = userApiKey;

  console.log('🔍 AI Chat Debug:');
  console.log('  - API Key provided:', !!apiKey);
  console.log('  - API Key length:', apiKey ? apiKey.length : 0);
  console.log('  - API Key valid format:', apiKey ? apiKey.startsWith('AIzaSy') : false);

  if (!apiKey || apiKey.trim() === '') {
    console.error('❌ No API key provided');
    return `🔑 API Key Required\n\nTo use AI Chat, add your Google Gemini API key in Settings.\n\nIt's FREE and takes 2 minutes!`;
  }

  console.log('✅ API Key found, making API call...');

  try {
    const busContext = JSON.stringify(BUS_DATA.map(b => ({
      name: b.name,
      route: b.routeString,
      stops: b.stops.slice(0, 10)
    })).slice(0, 50));

    const prompt = `You are a Bangladesh Transport Expert.

KNOWLEDGE: Dhaka buses: ${busContext}. Metro: Uttara to Motijheel. Intercity: Green Line, Hanif, Shohagh.

RULES: Be brief (under 150 words). Suggest 2-3 options. Include transport name, time, cost.

User: ${userQuery}`;

    console.log('📡 Calling Gemini API...');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't process that.";

    console.log('✅ API response received');
    return text;

  } catch (error: any) {
    console.error("❌ API Error:", error);

    let errorMsg = '';
    try {
      const errorData = JSON.parse(error.message);
      errorMsg = errorData?.error?.message || error.message;
    } catch (e) {
      errorMsg = error.message || 'Unknown error';
    }

    if (errorMsg.includes('429') || errorMsg.includes('quota')) {
      return `⏰ Rate Limit!\n\nWait 10 seconds and try again.\n\nFree tier: 15 requests/minute.`;
    }

    if (errorMsg.includes('leaked') || errorMsg.includes('PERMISSION_DENIED')) {
      return `🔐 API Key Blocked\n\nYour key was flagged. Create a NEW key in Settings.`;
    }

    if (errorMsg.includes('invalid') || errorMsg.includes('API_KEY_INVALID')) {
      return `❌ Invalid Key\n\nGet a new key from Google AI Studio.`;
    }

    if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
      return `🌐 Connection Error\n\nCheck your internet!`;
    }

    const shortError = errorMsg.substring(0, 100);
    return `⚠️ Error\n\n${shortError}\n\nTry refreshing or check your API key.`;
  }
};
