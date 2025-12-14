import React from 'react';
import { Info, CheckCircle, AlertTriangle, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { Notification } from '../types/notification';
import { useNotifications } from '../contexts/NotificationContext';
import { getReadNotifications } from '../services/notificationService';

interface NotificationItemProps {
    notification: Notification;
    onClose?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
    const { markAsRead } = useNotifications();
    const isRead = getReadNotifications().includes(notification.id);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    icon: <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />,
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    icon: <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
                };
            case 'error':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    icon: <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />,
                };
            case 'announcement':
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    icon: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
                };
            default: // info
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
                };
        }
    };

    const styles = getTypeStyles(notification.type);

    const handleClick = () => {
        if (!isRead) {
            markAsRead(notification.id);
        }
        if (notification.link) {
            window.location.href = notification.link;
            onClose?.();
        }
    };

    const formatTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } catch {
            return '';
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${!isRead ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                }`}
        >
            <div className="flex items-start gap-3">
                {/* Icon/Emoji and Unread Indicator */}
                <div className="relative shrink-0 mt-0.5">
                    <div className={`p-2 rounded-lg ${styles.bg}`}>
                        {notification.icon ? (
                            <span className="text-lg leading-none">{notification.icon}</span>
                        ) : (
                            styles.icon
                        )}
                    </div>
                    {!isRead && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                            className={`text-sm leading-tight ${isRead
                                    ? 'text-gray-700 dark:text-gray-300'
                                    : 'text-gray-900 dark:text-gray-100 font-bold'
                                }`}
                        >
                            {notification.title}
                        </h4>
                        {notification.link && (
                            <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                        )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-1">
                        {notification.message}
                    </p>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {formatTime(notification.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
