import { BUS_DATA, METRO_STATIONS, STATIONS } from '../constants';
import { canUseAiChat, trackAiChatUsage } from './apiKeyManager';

// Backend API Configuration
const BACKEND_API_URL = 'https://koyjabo-backend.onrender.com';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export const askGeminiRoute = async (userQuery: string, _userApiKey?: string, chatHistory: ChatMessage[] = []): Promise<string> => {
  // Note: userApiKey parameter is now ignored since we use backend API

  // Check usage limit before making API call
  if (!canUseAiChat()) {
    return "⏰ Daily Limit Reached\n\nYou've used your 2 free AI Chat queries for today. The limit resets at midnight. Come back tomorrow!";
  }

  try {
    // Prepare Chat History Context (keep it minimal - only last 3 messages)
    const historyContext = chatHistory.length > 0
      ? chatHistory.slice(-3).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n')
      : '';

    // Build a minimal prompt - backend will add all knowledge bases
    const userPrompt = historyContext
      ? `Previous conversation:\n${historyContext}\n\nCurrent question: ${userQuery}`
      : userQuery;

    console.log('📡 Calling Backend AI Chat API...');

    // Create abort controller for timeout (120 seconds for 8 retries with exponential backoff)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle rate limiting (backend)
      if (response.status === 429) {
        return "⏰ Daily Limit Reached\n\nYou've used your 2 free AI Chat queries for today. The limit resets at midnight. Come back tomorrow!";
      }

      // Handle payload too large
      if (response.status === 413) {
        return "⚠️ Your message is too long. Please try a shorter question.";
      }

      // Handle server errors
      if (response.status === 500) {
        return "⚠️ Service Temporarily Unavailable\n\nOur AI service is experiencing issues. Please try again in a few minutes.";
      }

      // Handle service overload - backend tried 8 times but still failed
      if (response.status === 503) {
        try {
          const errorData = await response.json();
          const retryAfter = errorData.retryAfter || 30;

          return `🔄 Service Overloaded\n\nThe AI service is experiencing very high demand right now. Our system tried 8 times with smart delays but couldn't complete your request.\n\n⏱️ Please wait ${retryAfter} seconds and try again.\n\nTip: Early morning (2-6 AM) usually has better availability.`;
        } catch {
          return "🔄 Service Overloaded\n\nThe AI service is experiencing very high demand right now. Please wait 30-60 seconds and try again.";
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.result || "Sorry, I couldn't process that request.";

      // Track usage after successful response
      trackAiChatUsage();

      console.log('✅ API response received');
      return text;

    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (fetchError.name === 'AbortError') {
        return "⏱️ Request Timeout\n\nThe request took more than 2 minutes to complete. The AI service is likely experiencing extreme load right now.\n\nPlease try again later, preferably during off-peak hours (2-6 AM).";
      }

      throw fetchError;
    }

  } catch (error: any) {
    console.error("❌ API Error:", error);

    const errorMsg = error.message || 'Unknown error';

    // Network errors
    if (errorMsg.includes('fetch') || errorMsg.includes('network') || errorMsg.includes('Failed to fetch')) {
      return "🌐 Connection Error\n\nCouldn't reach the server. Please check your internet connection and try again.";
    }

    return "⚠️ Something went wrong. Please try again in a moment.";
  }
};
