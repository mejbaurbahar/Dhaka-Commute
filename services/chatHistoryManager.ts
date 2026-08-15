import { ChatMessage, ChatSession } from '../types';

const STORAGE_KEY = 'dhaka_commute_chat_history';
const MAX_SESSIONS = 50; // Keep last 50 chat sessions

/**
 * Per-user isolation: chat history is keyed by the signed-in user's id so one
 * user can NEVER see another user's conversations. Anonymous users (no
 * account) share the legacy key — a single device holds only its own history.
 */
const keyFor = (uid?: string | null): string => (uid ? `${STORAGE_KEY}_${uid}` : STORAGE_KEY);

/**
 * Generate a unique session ID
 */
const generateSessionId = (): string => {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get all chat sessions from localStorage (scoped to the given user)
 */
export const getAllSessions = (uid?: string | null): ChatSession[] => {
    try {
        const stored = localStorage.getItem(keyFor(uid));
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

/**
 * Get a specific session by ID (scoped to the given user)
 */
export const getSession = (sessionId: string, uid?: string | null): ChatSession | null => {
    const sessions = getAllSessions(uid);
    return sessions.find(s => s.id === sessionId) || null;
};

/**
 * Save a message to a session (scoped to the given user)
 */
export const saveChatMessage = (message: ChatMessage, sessionId?: string | null, uid?: string | null): string => {
    const key = keyFor(uid);
    const sessions = getAllSessions(uid);
    const currentSessionId = sessionId || generateSessionId();

    let session = sessions.find(s => s.id === currentSessionId);

    if (!session) {
        session = {
            id: currentSessionId,
            messages: [],
            createdAt: Date.now(),
            lastUpdated: Date.now()
        };
        sessions.push(session);
    }

    session.messages.push(message);
    session.lastUpdated = Date.now();

    // Keep only last MAX_SESSIONS
    const trimmedSessions = sessions.slice(-MAX_SESSIONS);

    localStorage.setItem(key, JSON.stringify(trimmedSessions));
    return currentSessionId;
};

/**
 * Delete a specific session (scoped to the given user)
 */
export const deleteSession = (sessionId: string, uid?: string | null): void => {
    const key = keyFor(uid);
    const sessions = getAllSessions(uid);
    const filtered = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(key, JSON.stringify(filtered));
};

/**
 * Clear all chat history (scoped to the given user)
 */
export const clearAllHistory = (uid?: string | null): void => {
    localStorage.removeItem(keyFor(uid));
};

/**
 * Format timestamp for display
 */
export const formatChatTimestamp = (timestamp: number, language: string = 'en'): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isBn = language === 'bn';

    const timeStr = date.toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', { hour: '2-digit', minute: '2-digit' });

    if (date.toDateString() === today.toDateString()) {
        return isBn ? `আজ ${timeStr}` : `Today ${timeStr}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return isBn ? `গতকাল ${timeStr}` : `Yesterday ${timeStr}`;
    } else {
        return date.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric' }) + `, ${timeStr}`;
    }
};
