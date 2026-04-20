
// Fixed API Key Management for Intercity Search
// This file ensures user's API key is properly used

import { getApiKeyForIntercitySearch } from '../../services/apiKeyManager';

export const getIntercityApiKey = (): { key: string; isUserKey: boolean } | null => {
    // PRIORITY 1: Check if user has their own API key saved in settings
    const savedUserApiKey = localStorage.getItem('gemini_api_key');
    const hasValidSavedKey = savedUserApiKey && savedUserApiKey.trim().length > 20;

    // Use user's personal API key if available (NO USAGE LIMITS)
    if (hasValidSavedKey) {
        console.log('✅ Using saved user API key from settings');
        return { key: savedUserApiKey, isUserKey: true };
    }

    // Fall back to managed API keys WITH usage limits
    console.log('ℹ️ No user API key found, checking managed keys...');
    const managedKey = getApiKeyForIntercitySearch();

    if (!managedKey) {
        return null;
    }

    console.log('Using managed API key');
    return { key: managedKey, isUserKey: false };
};
