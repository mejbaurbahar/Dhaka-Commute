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

    const containerSizeClass = size === 'large' ? 'w-10 h-10 rounded-xl' : (size === 'small' ? 'w-8 h-8 md:w-11 md:h-11 rounded-lg' : 'w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl');
    const iconSize = size === 'large' ? 24 : (size === 'small' ? 16 : 20);

    return (
        <div className="flex items-center gap-0 outline-none cursor-pointer select-none group">
            <div className={`bg-gradient-to-br from-[#006a4e] to-teal-600 text-red-500 flex items-center justify-center shadow-md shadow-green-500/20 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 ${containerSizeClass}`}>
                <CurrentIcon
                    size={iconSize}
                    className="animate-in fade-in zoom-in duration-500"
                    key={iconIndex} // Key ensures animation retriggers on change
                    strokeWidth={2.5}
                />
            </div>
            <img
                src="/logo.png"
                alt="Logo"
                className={`${size === 'large' ? 'h-24 scale-150 ml-4' : (size === 'small' ? 'h-14 md:h-20 scale-110 md:scale-125 -ml-1' : 'h-16 md:h-20 scale-[2] origin-left ml-2 md:ml-2')} w-auto`}
            />
        </div>
    );
};
