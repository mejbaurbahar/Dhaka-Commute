import React, { useState, useEffect } from 'react';
import { Bus, Train, Ship, TramFront } from 'lucide-react';

export const AnimatedLogo = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
    const [iconIndex, setIconIndex] = useState(0);
    // Sequence: Bus -> Rail (Train) -> Ship -> Metro (TramFront)
    const icons = [Bus, Train, Ship, TramFront];

    useEffect(() => {
        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % icons.length);
        }, 2000); // Change icon every 2 seconds
        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = icons[iconIndex];

    const containerSizeClass = size === 'large' ? 'w-14 h-14 rounded-2xl' : (size === 'small' ? 'w-11 h-11 rounded-xl' : 'w-12 h-12 rounded-xl');
    const iconSize = size === 'large' ? 28 : (size === 'small' ? 22 : 24);
    const logoSize = size === 'large' ? 'h-14' : (size === 'small' ? 'h-11' : 'h-12');
    const textSize = size === 'large' ? 'text-2xl' : (size === 'small' ? 'text-xl' : 'text-xl md:text-2xl');

    return (
        <div className="flex items-center gap-2 md:gap-3 outline-none cursor-pointer select-none group">
            <div className={`bg-gradient-to-br from-[#006a4e] to-teal-600 dark:from-teal-600 dark:to-emerald-500 text-white flex items-center justify-center shadow-md shadow-green-500/20 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 ${containerSizeClass}`}>
                <CurrentIcon
                    size={iconSize}
                    className="animate-in fade-in zoom-in duration-500"
                    key={iconIndex} // Key ensures animation retriggers on change
                    strokeWidth={2.5}
                />
            </div>
            <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="কই যাবো"
                className={`${logoSize} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
            />
            <h1 className={`${textSize} font-bold text-gray-900 dark:text-white tracking-tight whitespace-nowrap`}>
                কই যাবো
            </h1>
        </div>
    );
};
