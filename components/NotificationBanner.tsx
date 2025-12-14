import React, { useState, useEffect } from 'react';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';
import { Notification } from '../types/notification';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationBanner: React.FC = () => {
    const { notifications, dismissNotification } = useNotifications();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter only high-priority notifications
    const highPriorityNotifications = notifications.filter((n) => n.priority === 'high');

    // Auto-rotate notifications every 10 seconds
    useEffect(() => {
        if (highPriorityNotifications.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % highPriorityNotifications.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [highPriorityNotifications.length]);

    if (highPriorityNotifications.length === 0) return null;

    const notification = highPriorityNotifications[currentIndex];

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100';
            case 'warning':
                return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100';
            case 'error':
                return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100';
            case 'announcement':
                return 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100';
            default: // info
                return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100';
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
            case 'announcement':
                return <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
            default:
                return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
        }
    };

    const handleDismiss = () => {
        dismissNotification(notification.id);
        if (highPriorityNotifications.length > 1) {
            setCurrentIndex((prev) => (prev >= highPriorityNotifications.length - 1 ? 0 : prev));
        }
    };

    const handleClick = () => {
        if (notification.link) {
            window.location.href = notification.link;
        }
    };

    return (
        <div
            className={`sticky top-16 md:top-20 z-[4500] w-full border-b ${getTypeStyles(
                notification.type
            )} animate-in slide-in-from-top duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-start gap-3">
                    {/* Icon or Emoji */}
                    <div className="shrink-0 mt-0.5">
                        {notification.icon ? (
                            <span className="text-2xl">{notification.icon}</span>
                        ) : (
                            getIcon(notification.type)
                        )}
                    </div>

                    {/* Content */}
                    <div
                        className={`flex-1 min-w-0 ${notification.link ? 'cursor-pointer' : ''}`}
                        onClick={handleClick}
                    >
                        <h3 className="font-bold text-sm md:text-base mb-1">{notification.title}</h3>
                        <p className="text-xs md:text-sm opacity-90 leading-relaxed">{notification.message}</p>
                    </div>

                    {/* Dismiss Button */}
                    <button
                        onClick={handleDismiss}
                        className="shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Dismiss notification"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Rotation Indicator */}
                {highPriorityNotifications.length > 1 && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                        {highPriorityNotifications.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-current opacity-100' : 'w-1 bg-current opacity-30'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationBanner;
