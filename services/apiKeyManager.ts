// API Key Manager with Usage Limits and Device Fingerprinting
// This manages multiple API keys, tracks usage, and rotates keys automatically

interface UsageRecord {
    aiChatCount: number;
    intercitySearchCount: number;
    lastResetDate: string;
    deviceId: string;
}

interface KeyUsageStats {
    keyIndex: number;
    usageCount: number;
    lastUsed: string;
}

// API Keys pool - These keys are used automatically for all users
const API_KEYS = [
    'AIzaSyAUATfDS1vbTWWcHjpSQ3_7GR-zB1GNnQU',
    'AIzaSyD_8TTAF5DZtZhwb9qoAsyu0mObWR6arRM',
    'AIzaSyAfmELE0-ExlyIGYAORmvYVlnwDlk0JUQ4',
    'AIzaSyByWBx5dRtb6s-yRx_iUdIkXS5Ii-QiSc0',
    'AIzaSyDM8F8Yi55Ci4LAThxW99TNFQWacWZOJc0'
];


export const USAGE_LIMITS = {
    AI_CHAT_PER_DAY: 2,
    INTERCITY_SEARCH_PER_DAY: 2
};

const STORAGE_KEYS = {
    USAGE_RECORD: 'dhaka_commute_api_usage',
    DEVICE_ID: 'dhaka_commute_device_id',
    KEY_STATS: 'dhaka_commute_key_stats'
};

// Get all API keys
const getApiKeys = (): string[] => {
    return API_KEYS;
};

// Generate a unique device fingerprint
const generateDeviceFingerprint = (): string => {
    const navigator = window.navigator;
    const screen = window.screen;

    const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.colorDepth,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        !!window.sessionStorage,
        !!window.localStorage,
    ].join('|');

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    return 'DEV_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36);
};

// Get or create device ID
export const getDeviceId = (): string => {
    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);

    if (!deviceId) {
        deviceId = generateDeviceFingerprint();
        localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }

    return deviceId;
};

// Get today's date string
const getTodayDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

// Get usage record for current device
export const getUsageRecord = (): UsageRecord => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.USAGE_RECORD);
        const today = getTodayDate();
        const deviceId = getDeviceId();

        if (!stored) {
            return {
                aiChatCount: 0,
                intercitySearchCount: 0,
                lastResetDate: today,
                deviceId
            };
        }

        const record: UsageRecord = JSON.parse(stored);

        // Reset counts if it's a new day
        if (record.lastResetDate !== today) {
            record.aiChatCount = 0;
            record.intercitySearchCount = 0;
            record.lastResetDate = today;
            localStorage.setItem(STORAGE_KEYS.USAGE_RECORD, JSON.stringify(record));
        }

        return record;
    } catch (e) {
        console.error('Error loading usage record:', e);
        return {
            aiChatCount: 0,
            intercitySearchCount: 0,
            lastResetDate: getTodayDate(),
            deviceId: getDeviceId()
        };
    }
};

// Save usage record
const saveUsageRecord = (record: UsageRecord): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.USAGE_RECORD, JSON.stringify(record));
    } catch (e) {
        console.error('Error saving usage record:', e);
    }
};

// Get key statistics
const getKeyStats = (): KeyUsageStats[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.KEY_STATS);
        if (!stored) {
            return API_KEYS.map((_, index) => ({
                keyIndex: index,
                usageCount: 0,
                lastUsed: ''
            }));
        }
        return JSON.parse(stored);
    } catch (e) {
        return API_KEYS.map((_, index) => ({
            keyIndex: index,
            usageCount: 0,
            lastUsed: ''
        }));
    }
};

// Save key statistics
const saveKeyStats = (stats: KeyUsageStats[]): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.KEY_STATS, JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving key stats:', e);
    }
};

// Get the next available API key (with rotation)
const getNextAvailableKey = (): { key: string; index: number } | null => {
    const keys = getApiKeys();
    const stats = getKeyStats();

    // Sort by usage count (ascending) to use least-used keys first
    const sortedStats = [...stats].sort((a, b) => a.usageCount - b.usageCount);

    // Return the least used key
    const selectedStat = sortedStats[0];
    return {
        key: keys[selectedStat.keyIndex],
        index: selectedStat.keyIndex
    };
};

// Update key usage statistics
const updateKeyUsage = (keyIndex: number): void => {
    const stats = getKeyStats();
    const stat = stats.find(s => s.keyIndex === keyIndex);

    if (stat) {
        stat.usageCount += 1;
        stat.lastUsed = new Date().toISOString();
        saveKeyStats(stats);
    }
};

// Check if user can use AI Chat
export const canUseAiChat = (): boolean => {
    const record = getUsageRecord();
    return record.aiChatCount < USAGE_LIMITS.AI_CHAT_PER_DAY;
};

// Check if user can use Intercity Search
export const canUseIntercitySearch = (): boolean => {
    const record = getUsageRecord();
    return record.intercitySearchCount < USAGE_LIMITS.INTERCITY_SEARCH_PER_DAY;
};

// Get API key for AI Chat (automatically manages limits and rotation)
export const getApiKeyForAiChat = (): string | null => {
    if (!canUseAiChat()) {
        return null;
    }

    const keyData = getNextAvailableKey();
    if (!keyData) {
        return null;
    }

    // Increment usage count
    const record = getUsageRecord();
    record.aiChatCount += 1;
    saveUsageRecord(record);

    // Update key statistics
    updateKeyUsage(keyData.index);

    return keyData.key;
};

// Get API key for Intercity Search (automatically manages limits and rotation)
export const getApiKeyForIntercitySearch = (): string | null => {
    if (!canUseIntercitySearch()) {
        return null;
    }

    const keyData = getNextAvailableKey();
    if (!keyData) {
        return null;
    }

    // Increment usage count
    const record = getUsageRecord();
    record.intercitySearchCount += 1;
    saveUsageRecord(record);

    // Update key statistics
    updateKeyUsage(keyData.index);

    return keyData.key;
};

// Get remaining uses for today
export const getRemainingUses = (): { aiChat: number; intercitySearch: number } => {
    const record = getUsageRecord();
    return {
        aiChat: Math.max(0, USAGE_LIMITS.AI_CHAT_PER_DAY - record.aiChatCount),
        intercitySearch: Math.max(0, USAGE_LIMITS.INTERCITY_SEARCH_PER_DAY - record.intercitySearchCount)
    };
};

// Get total usage statistics
export const getTotalUsageStats = (): {
    totalAiChatToday: number;
    totalIntercitySearchToday: number;
    deviceId: string;
} => {
    const record = getUsageRecord();
    return {
        totalAiChatToday: record.aiChatCount,
        totalIntercitySearchToday: record.intercitySearchCount,
        deviceId: record.deviceId
    };
};

// Get time until reset (for UI display)
export const getTimeUntilReset = (): string => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
};
