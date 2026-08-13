import { useRef, useState, useEffect, useCallback } from 'react';
import { STATIONS } from '../../../constants';
import { T } from '../tokens';
import { askGeminiRoute, ChatMessage } from '../../../services/geminiService';
import { askGitHubModels } from '../../../services/githubModelsService';
import { getAllSessions, getSession, saveChatMessage, deleteSession } from '../../../services/chatHistoryManager';
import { getAuthUser } from '../../../services/communityDataService';

export type Msg = { id: number; isUser: boolean; text: string; rich?: string };
export const INIT_MESSAGES: Msg[] = [{ id: 1, isUser: false, text: 'hello', rich: 'greeting' }];
export type RecentSession = { id: string; title: string };

// Find nearest station name from GPS coords using all known STATIONS
export function nearestArea(lat: number, lng: number): string {
  const stationList = Object.values(STATIONS).filter((s: any) => s.lat && s.lng);
  let best: any = stationList[0];
  let bestDist = Infinity;
  for (const s of stationList as any[]) {
    const d = (s.lat - lat) ** 2 + (s.lng - lng) ** 2;
    if (d < bestDist) { bestDist = d; best = s; }
  }
  return best?.name || 'Dhaka';
}

export const SUGGESTIONS = [
  { bn: 'কোন বাস গুলশান থেকে মতিঝিল?', en: 'Bus Gulshan to Motijheel?' },
  { bn: 'বিমানবন্দর → ফার্মগেট', en: 'Airport → Farmgate' },
  { bn: 'সদরঘাট লঞ্চ সময়', en: 'Sadarghat launch times' },
  { bn: 'মেট্রো সময়সূচি', en: 'Metro schedule' },
];

/**
 * Shared AI chat state: used by the full /ai page and by the global chat modal.
 * Owns messages, session persistence, GPS-aware "from" detection and the send
 * pipeline. DOM-only concerns (auto-scroll, input element) live in AIChatBody.
 */
export function useAIChat(lang: 'bn' | 'en', initialQ?: string) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>(INIT_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const userAreaRef = useRef<string>('');
  const chatUser = getAuthUser();
  const userAvatarUrl = chatUser?.avatarUrl;
  const userInitials = (chatUser?.displayName || chatUser?.username || 'KJ').slice(0, 2).toUpperCase();

  useEffect(() => {
    if (!initialQ) return;
    setInput(initialQ);
    send(initialQ);
  }, [initialQ]);

  useEffect(() => {
    // Warm-up: load cached area and refresh GPS in background
    const consent = localStorage.getItem('kj-location-consent');
    const stored = localStorage.getItem('kj-location-area');
    if (stored) userAreaRef.current = stored;
    if (consent !== 'yes' || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
        userAreaRef.current = area;
        localStorage.setItem('kj-location-area', area);
      },
      () => {},
      { timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  // Returns cached area immediately, or fetches fresh GPS (max 6 s) if cache is empty.
  // Resolves with null when GPS is denied, unavailable, or timed out.
  function getOrFetchArea(): Promise<string | null> {
    if (userAreaRef.current) return Promise.resolve(userAreaRef.current);
    if (!navigator.geolocation) return Promise.resolve(null);
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
          userAreaRef.current = area;
          localStorage.setItem('kj-location-area', area);
          localStorage.setItem('kj-location-consent', 'yes');
          resolve(area);
        },
        () => resolve(null),
        { timeout: 6000, maximumAge: 60000 }
      );
    });
  }

  const [showAllRecents, setShowAllRecents] = useState(false);
  const [allRecents, setAllRecents] = useState<RecentSession[]>(() =>
    getAllSessions().slice().sort((a, b) => b.lastUpdated - a.lastUpdated)
      .map(s => ({ id: s.id, title: s.messages.find(m => m.role === 'user')?.text || T(lang, 'নতুন কথোপকথন', 'New conversation') }))
  );
  const recents = showAllRecents ? allRecents : allRecents.slice(0, 5);

  function refreshRecents() {
    setAllRecents(getAllSessions().slice().sort((a, b) => b.lastUpdated - a.lastUpdated)
      .map(s => ({ id: s.id, title: s.messages.find(m => m.role === 'user')?.text || T(lang, 'নতুন কথোপকথন', 'New conversation') })));
  }

  function loadSession(id: string) {
    const session = getSession(id);
    if (!session) return;
    setSessionId(id);
    const msgs: Msg[] = session.messages.map((m, i) => ({ id: i, isUser: m.role === 'user', text: m.text }));
    setMessages(msgs.length ? msgs : INIT_MESSAGES);
  }

  function handleDeleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    deleteSession(id);
    setAllRecents(prev => prev.filter(r => r.id !== id));
    if (sessionId === id) { setSessionId(null); setMessages(INIT_MESSAGES); }
  }

  function startNew() {
    setSessionId(null);
    setMessages(INIT_MESSAGES);
    setInput('');
  }

  const send = useCallback(async (prefill?: string) => {
    const text = prefill ?? input;
    if (!text.trim() || isLoading) return;
    const userText = text.trim();
    const userMsg = { id: Date.now(), isUser: true, text: userText };
    setMessages(m => [...m, userMsg]);
    const nextSessionId = saveChatMessage({ role: 'user', text: userText, timestamp: Date.now() } as any, sessionId);
    setSessionId(nextSessionId);
    setInput('');
    setIsLoading(true);
    refreshRecents();
    try {
      const currentMessages = [...messages, userMsg];
      const chatHistory: ChatMessage[] = currentMessages
        .filter(m => !(m as any).rich)
        .map(m => ({ role: m.isUser ? 'user' : 'assistant', text: m.text }));

      const hasFrom = /\bfrom\b|থেকে|হতে/i.test(userText);

      // Extract destination from "how to go X", "want to go X", "jeta chai X" etc.
      function extractGoToDest(q: string): string | null {
        const m = q.match(
          /(?:how\s+(?:to\s+)?(?:go|get)\s+(?:to\s+)?|route\s+to\s+|reach\s+|take\s+me\s+to\s+|go\s+to\s+|directions?\s+to\s+|best\s+(?:bus|way)\s+(?:to|for)\s+|nearest\s+way\s+to\s+|how\s+can\s+i\s+(?:get\s+to|reach)\s+|(?:i\s+)?want\s+to\s+go(?:\s+to)?\s+|(?:i\s+)?want\s+to\s+visit\s+|(?:i\s+)?need\s+to\s+go(?:\s+to)?\s+|(?:i\s+)?(?:am|m)\s+going(?:\s+to)?\s+)([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s']{1,40})(?:\?|।|,|$)/i
        ) || q.match(/(?:কিভাবে\s+যাব[োে]?\s+|যেতে\s+চাই\s+|যাবো?\s+কিভাবে\s+|জেতে\s+চাই\s+|jeta\s+chai\s*,?\s*|jabo\s+|jete\s+chai\s+|jaite\s+chai\s+)([a-zA-Zঀ-৿][a-zA-Zঀ-৿\s']{1,40})(?:\?|।|,|$)/i);
        return m ? m[1].trim().replace(/[?।,]$/, '').trim() : null;
      }

      const goToDest = !hasFrom ? extractGoToDest(userText) : null;
      const isNavIntent = !hasFrom && goToDest !== null;

      // When nav-intent is detected and no cached area, proactively fetch GPS now.
      let area = userAreaRef.current;
      if (isNavIntent && !area) {
        area = await getOrFetchArea() ?? '';
      }

      // If still no area after GPS attempt, ask user to specify origin
      if (isNavIntent && !area && goToDest) {
        const noLocMsg = lang === 'bn'
          ? `📍 আপনার বর্তমান অবস্থান জানতে পারছি না।\n\n**${goToDest}** যেতে চান, কিন্তু আপনি কোথা থেকে যাচ্ছেন? একটু বলুন — যেমন: 'মিরপুর থেকে ${goToDest}' বা 'ফার্মগেট থেকে ${goToDest}'।`
          : `📍 I couldn't detect your current location.\n\nYou want to go to **${goToDest}** — where are you starting from? Try: 'Mirpur to ${goToDest}' or 'Farmgate to ${goToDest}'.`;
        saveChatMessage({ role: 'assistant', text: noLocMsg, timestamp: Date.now() } as any, nextSessionId);
        setMessages(m => [...m, { id: Date.now() + 1, isUser: false, text: noLocMsg }]);
        return;
      }

      let queryForOffline: string;
      if (area && goToDest) {
        // Build unambiguous "FROM to DEST" — prevents positional reversal
        queryForOffline = `${area} to ${goToDest} [Context: User is in ${area} area]`;
      } else if (!hasFrom && area) {
        queryForOffline = `${userText} from ${area} [Context: User is in ${area} area]`;
      } else {
        queryForOffline = userText;
      }

      let response: string;
      try {
        response = await askGitHubModels(userText, chatHistory);
      } catch {
        // Greet by the logged-in user's real name — never a hardcoded one
        const chatUserName = chatUser?.displayName || chatUser?.username || undefined;
        response = await askGeminiRoute(queryForOffline, undefined, chatHistory, chatUserName);
        // Prepend "Your current location" when GPS was injected and area not already in response
        if (!hasFrom && area && response && !response.includes(area)) {
          const prefix = lang === 'bn'
            ? `📍 **আপনার বর্তমান অবস্থান:** ${area}\n\n`
            : `📍 **Your current location:** ${area}\n\n`;
          response = prefix + response;
        }
      }
      saveChatMessage({ role: 'assistant', text: response, timestamp: Date.now() } as any, nextSessionId);
      setMessages(m => [...m, { id: Date.now() + 1, isUser: false, text: response }]);
    } catch {
      setMessages(m => [...m, { id: Date.now() + 1, isUser: false, text: T(lang, 'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'Sorry, something went wrong. Please try again.') }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, sessionId, lang, chatUser]);

  return {
    input, setInput, messages, isLoading, send,
    sessionId, setSessionId, setMessages,
    userAvatarUrl, userInitials,
    allRecents, recents, showAllRecents, setShowAllRecents,
    loadSession, handleDeleteSession, startNew,
  };
}
