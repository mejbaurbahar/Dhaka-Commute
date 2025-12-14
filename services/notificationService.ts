import { NotificationResponse } from '../types/notification';

const API_BASE_URL = 'https://koyjabo-backend.onrender.com/api';

/**
 * Fetch active notifications from backend
 */
export const fetchActiveNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications/active`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch notifications: ${response.statusText}`);
        }

        const data: NotificationResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        // Return empty array on error
        return { notifications: [] };
    }
};

/**
 * Get dismissed notification IDs from localStorage
 */
export const getDismissedNotifications = (): string[] => {
    try {
        const dismissed = localStorage.getItem('dhaka_commute_dismissed_notifications');
        return dismissed ? JSON.parse(dismissed) : [];
    } catch (e) {
        return [];
    }
};

/**
 * Add notification ID to dismissed list
 */
export const dismissNotification = (id: string): void => {
    try {
        const dismissed = getDismissedNotifications();
        if (!dismissed.includes(id)) {
            dismissed.push(id);
            localStorage.setItem('dhaka_commute_dismissed_notifications', JSON.stringify(dismissed));
        }
    } catch (e) {
        console.error('Error dismissing notification:', e);
    }
};

/**
 * Get read notification IDs from localStorage
 */
export const getReadNotifications = (): string[] => {
    try {
        const read = localStorage.getItem('dhaka_commute_read_notifications');
        return read ? JSON.parse(read) : [];
    } catch (e) {
        return [];
    }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = (id: string): void => {
    try {
        const read = getReadNotifications();
        if (!read.includes(id)) {
            read.push(id);
            localStorage.setItem('dhaka_commute_read_notifications', JSON.stringify(read));
        }
    } catch (e) {
        console.error('Error marking notification as read:', e);
    }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = (notificationIds: string[]): void => {
    try {
        const read = getReadNotifications();
        const allRead = [...new Set([...read, ...notificationIds])];
        localStorage.setItem('dhaka_commute_read_notifications', JSON.stringify(allRead));
    } catch (e) {
        console.error('Error marking all notifications as read:', e);
    }
};

/**
 * Clear old dismissed/read notifications (cleanup)
 */
export const cleanupOldNotifications = (activeIds: string[]): void => {
    try {
        // Remove dismissed notifications that are no longer active
        const dismissed = getDismissedNotifications();
        const validDismissed = dismissed.filter(id => activeIds.includes(id));
        localStorage.setItem('dhaka_commute_dismissed_notifications', JSON.stringify(validDismissed));

        // Remove read notifications that are no longer active
        const read = getReadNotifications();
        const validRead = read.filter(id => activeIds.includes(id));
        localStorage.setItem('dhaka_commute_read_notifications', JSON.stringify(validRead));
    } catch (e) {
        console.error('Error cleaning up notifications:', e);
    }
};
