export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'announcement';
export type NotificationPriority = 'high' | 'medium' | 'low';

export interface Notification {
    id: string;
    title: string;
    bnTitle?: string;
    message: string;
    bnMessage?: string;
    type: NotificationType;
    priority: NotificationPriority;
    isActive: boolean;
    createdAt: string;
    expiresAt?: string;
    icon?: string;
    link?: string;
}

export interface NotificationResponse {
    notifications: Notification[];
}
