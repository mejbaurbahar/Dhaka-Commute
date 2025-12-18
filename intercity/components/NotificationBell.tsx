import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell: React.FC = () => {
    return (
        <div className="relative">
            <button
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-600 dark:text-gray-300 flex items-center justify-center"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => {
                    // Placeholder - notifications feature not yet implemented for intercity
                    alert('Notification feature coming soon!');
                }}
            >
                <Bell className="w-4 h-4" />
            </button>
        </div>
    );
};

export default NotificationBell;
