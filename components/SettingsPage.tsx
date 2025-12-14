import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Monitor } from 'lucide-react';

interface SettingsPageProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, toggleTheme }) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 p-6 md:p-12 pt-24 md:pt-24 overflow-y-auto w-full">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Customize your app experience</p>

                <div className="space-y-6">
                    {/* Theme Settings */}
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Theme Preference
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Choose how কই যাবো looks to you. Select a single theme, or sync with your system.
                        </p>

                        {/* Theme Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Light Mode */}
                            <button
                                onClick={() => {
                                    if (isDarkMode) toggleTheme();
                                }}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${!isDarkMode
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${!isDarkMode ? 'bg-blue-500' : 'bg-gray-200 dark:bg-slate-700'}`}>
                                    <Sun className={`w-5 h-5 ${!isDarkMode ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                                </div>
                                <div className="text-left flex-1">
                                    <div className={`font-bold text-sm ${!isDarkMode ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                                        Light Mode
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Bright theme
                                    </div>
                                </div>
                                {!isDarkMode && (
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </button>

                            {/* Dark Mode */}
                            <button
                                onClick={() => {
                                    if (!isDarkMode) toggleTheme();
                                }}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${isDarkMode
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500' : 'bg-gray-200 dark:bg-slate-700'}`}>
                                    <Moon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                                </div>
                                <div className="text-left flex-1">
                                    <div className={`font-bold text-sm ${isDarkMode ? 'text-purple-700 dark:text-purple-400' : 'text-gray-900 dark:text-gray-100'}`}>
                                        Dark Mode
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Easy on the eyes
                                    </div>
                                </div>
                                {isDarkMode && (
                                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Current Status */}
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                                <Monitor className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    Current theme: <span className="font-bold text-gray-900 dark:text-gray-100">{isDarkMode ? 'Dark' : 'Light'}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* App Info */}
                    <div className="bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark text-gray-100 mb-2">
                            App Information
                        </h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Version</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">1.0.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">December 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
