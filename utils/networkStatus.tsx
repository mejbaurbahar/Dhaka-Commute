import React from 'react';

/**
 * Custom hook to detect network online/offline status
 * Returns true when online, false when offline
 * 
 * Usage:
 * const isOnline = useNetworkStatus();
 */
export const useNetworkStatus = (): boolean => {
    const [isOnline, setIsOnline] = React.useState<boolean>(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );

    React.useEffect(() => {
        const handleOnline = () => {
            console.log('📶 Network: Back online');
            setIsOnline(true);
        };

        const handleOffline = () => {
            console.log('📵 Network: Gone offline');
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};

/**
 * Offline Banner Component
 * Displays a fixed banner at the top when offline
 */
export const OfflineBanner: React.FC = () => {
    const isOnline = useNetworkStatus();

    if (isOnline) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-center text-sm font-semibold shadow-lg animate-pulse"
            role="alert"
            aria-live="polite"
        >
            📵 You are offline. Some features may be limited. Cached data is being used.
        </div>
    );
};

export default useNetworkStatus;
