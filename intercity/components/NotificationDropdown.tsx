import React from 'react';
import { Clock } from 'lucide-react';

interface NotificationDropdownProps {
    onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
    return (
        <div className="fixed md:absolute right-2 md:right-0 top-[4.5rem] md:top-full mt-0 md:mt-2 w-[calc(100vw-1rem)] max-w-96 md:max-w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-[6000] animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                        Notifications
                    </h3>
                </div>
            </div>

            {/* Empty State */}
            <div className="px-4 py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No notifications</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    You're all caught up!
                </p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onClose}
                    className="w-full text-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;
