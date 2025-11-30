/**
 * Detects if the app is running in an in-app browser (like Facebook, Messenger, Instagram, etc.)
 * These browsers often don't support geolocation properly
 */
export const isInAppBrowser = (): boolean => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Check for common in-app browsers
    const inAppBrowsers = [
        'FBAN',        // Facebook App
        'FBAV',        // Facebook App
        'Instagram',   // Instagram
        'Messenger',   // Facebook Messenger
        'Twitter',     // Twitter
        'LinkedIn',    // LinkedIn
        'Line',        // Line
        'WhatsApp',    // WhatsApp
        'Snapchat',    // Snapchat
        'TikTok',      // TikTok
        'WeChat',      // WeChat
    ];

    return inAppBrowsers.some(browser => userAgent.includes(browser));
};

/**
 * Gets the name of the in-app browser
 */
export const getInAppBrowserName = (): string => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (userAgent.includes('FBAN') || userAgent.includes('FBAV')) return 'Facebook';
    if (userAgent.includes('Instagram')) return 'Instagram';
    if (userAgent.includes('Messenger')) return 'Messenger';
    if (userAgent.includes('Twitter')) return 'Twitter';
    if (userAgent.includes('LinkedIn')) return 'LinkedIn';
    if (userAgent.includes('Line')) return 'Line';
    if (userAgent.includes('WhatsApp')) return 'WhatsApp';
    if (userAgent.includes('Snapchat')) return 'Snapchat';
    if (userAgent.includes('TikTok')) return 'TikTok';
    if (userAgent.includes('WeChat')) return 'WeChat';

    return 'in-app browser';
};

/**
 * Opens the current URL in the device's default browser
 */
export const openInDefaultBrowser = (): void => {
    const currentUrl = window.location.href;

    // Try to open in default browser
    // For iOS, we can use a special URL scheme
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // iOS: Try to open in Safari
        window.location.href = currentUrl;
    } else {
        // Android and others: Just reload (user will need to manually choose "Open in browser")
        window.location.href = currentUrl;
    }
};
