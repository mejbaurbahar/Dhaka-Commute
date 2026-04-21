/**
 * Sync Service - Synchronizes local usage and history data with the backend repository.
 * This ensures that 'data/history' and 'data/stats' in the GitHub repo are updated.
 */

const BACKEND_API_URL = 'https://koyjabo-backend.onrender.com';

export interface SyncData {
    userId: string;
    type: 'history' | 'stats' | 'visit';
    payload: any;
}

/**
 * Sends a synchronization request to the backend.
 * The backend is responsible for committing this data to the GitHub repository.
 */
export const syncWithBackend = async (data: SyncData): Promise<boolean> => {
    try {
        if (!navigator.onLine) return false;

        console.log(`🔄 Syncing ${data.type} with backend...`);
        
        const endpoint = data.type === 'history' ? '/api/history/store' : '/api/stats/update';
        
        const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data.payload,
                userId: data.userId,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            })
        });

        if (!response.ok) {
            console.warn(`⚠️ Backend sync failed for ${data.type}: ${response.statusText}`);
            return false;
        }

        console.log(`✅ ${data.type} synced successfully`);
        return true;
    } catch (error) {
        console.error(`❌ Error during ${data.type} sync:`, error);
        return false;
    }
};

/**
 * Batch sync for usage statistics
 */
export const syncUsageStats = async (stats: any): Promise<void> => {
    const session = localStorage.getItem('koyjabo_auth_session');
    const userId = session ? (JSON.parse(session) as { user: { id: string } }).user?.id : 'anonymous';

    await syncWithBackend({
        userId,
        type: 'stats',
        payload: stats
    });
};

/**
 * Batch sync for search history
 */
export const syncSearchHistory = async (history: any): Promise<void> => {
    const session = localStorage.getItem('koyjabo_auth_session');
    const userId = session ? (JSON.parse(session) as { user: { id: string } }).user?.id : null;

    if (!userId) return; // Only sync history for authenticated users

    await syncWithBackend({
        userId,
        type: 'history',
        payload: history
    });
};
