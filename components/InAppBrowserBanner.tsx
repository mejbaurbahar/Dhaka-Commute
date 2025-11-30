import React, { useState, useEffect } from 'react';
import { ExternalLink, X, AlertTriangle } from 'lucide-react';
import { isInAppBrowser, getInAppBrowserName } from '../utils/browserDetection';

const InAppBrowserBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [browserName, setBrowserName] = useState('');
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if running in in-app browser
        if (isInAppBrowser()) {
            setBrowserName(getInAppBrowserName());

            // Check if user has dismissed this before
            const dismissed = sessionStorage.getItem('inAppBrowserBannerDismissed');
            if (!dismissed) {
                setIsVisible(true);
            }
        }
    }, []);

    const handleOpenInBrowser = () => {
        const currentUrl = window.location.href;

        // Copy URL to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl).catch(() => { });
        }

        // Show instructions based on platform
        alert(
            `To use location features:\n\n` +
            `1. Tap the three dots (⋯) menu\n` +
            `2. Select "Open in Browser" or "Open in Chrome/Safari"\n` +
            `3. The app will work properly in your default browser\n\n` +
            `(URL copied to clipboard)`
        );
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
        sessionStorage.setItem('inAppBrowserBannerDismissed', 'true');
    };

    if (!isVisible || isDismissed) return null;

    return (
        <div className="relative z-[100] bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold mb-1">
                            Opened in {browserName}
                        </p>
                        <p className="text-xs opacity-90 mb-2">
                            Location features may not work. Open in your default browser for the best experience.
                        </p>
                        <button
                            onClick={handleOpenInBrowser}
                            className="inline-flex items-center gap-1.5 bg-white text-orange-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-50 transition-colors active:scale-95"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            How to Open in Browser
                        </button>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InAppBrowserBanner;
