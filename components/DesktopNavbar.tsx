import React from 'react';
import { Home, Map, Bot, Heart, Info, Train, Menu, Sparkles, Navigation, Clock, MapPin } from 'lucide-react';
import { AppView } from '../types';
import ThemeToggle from './ThemeToggle';
import { AnimatedLogo } from './AnimatedLogo'; // Assuming we can use this or just text
import NotificationBell from './NotificationBell';

interface DesktopNavbarProps {
    view: AppView;
    setView: (view: AppView) => void;
    primarySearch: 'LOCAL' | 'INTERCITY';
    setPrimarySearch: (mode: 'LOCAL' | 'INTERCITY') => void;
    listFilter: 'ALL' | 'FAVORITES';
    setListFilter: (filter: 'ALL' | 'FAVORITES') => void;
    onOpenMenu: () => void;
    onOpenLiveMap?: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    isInDhaka: boolean;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
    view,
    setView,
    primarySearch,
    setPrimarySearch,
    listFilter,
    setListFilter,
    onOpenMenu,
    onOpenLiveMap,

    isDarkMode,
    toggleTheme,
    isInDhaka
}) => {
    // Navbar should be visible on all views for desktop now
    // if (view === AppView.BUS_DETAILS || view === AppView.LIVE_NAV) {
    //   return null;
    // }

    const navItems = [
        {
            label: isInDhaka ? 'Home' : 'Dhaka City',
            icon: Home,
            isActive: view === AppView.HOME && primarySearch === 'LOCAL' && listFilter !== 'FAVORITES',
            onClick: () => {
                setView(AppView.HOME);
                setPrimarySearch('LOCAL');
                setListFilter('ALL');
            }
        },
        {
            label: 'Intercity',
            icon: Train,
            isActive: false, // Never active on main page since intercity is separate
            onClick: () => {
                window.location.href = '/intercity';
            }
        },
        {
            label: 'AI Chat',
            icon: Sparkles,
            isActive: view === AppView.AI_ASSISTANT,
            onClick: () => setView(AppView.AI_ASSISTANT)
        },
        {
            label: 'History',
            icon: Clock,
            isActive: view === AppView.HISTORY,
            onClick: () => setView(AppView.HISTORY)
        },
        {
            label: 'Journey',
            icon: MapPin,
            isActive: view === AppView.DAILY_JOURNEY,
            onClick: () => setView(AppView.DAILY_JOURNEY)
        },
        {
            label: 'About',
            icon: Info,
            isActive: view === AppView.ABOUT,
            onClick: () => setView(AppView.ABOUT)
        }
    ];

    return (
        <nav className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-[100] px-8 items-center justify-between transition-all duration-300">
            {/* Logo Section */}
            <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => {
                    setView(AppView.HOME);
                    setPrimarySearch('LOCAL');
                }}
            >
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AnimatedLogo size="small" />
                </div>
            </div>


            {/* Navigation Links */}
            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={item.onClick}
                        className={`
              relative px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300
              ${item.isActive
                                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm transform scale-100'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
                            }
            `}
                    >
                        <item.icon className={`w-4 h-4 ${item.isActive ? 'animate-pulse' : ''}`} />
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => onOpenLiveMap && onOpenLiveMap()}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100/50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full font-bold text-sm transition-all animate-pulse"
                >
                    <Map className="w-4 h-4" />
                    <span>Live Map</span>
                </button>
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <NotificationBell />
                <button
                    onClick={onOpenMenu}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav >
    );
};
