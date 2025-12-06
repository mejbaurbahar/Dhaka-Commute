import React, { useState, useEffect } from 'react';
import { Bus, Train, Plane, Ship, TramFront } from 'lucide-react';

export const AnimatedLogo = () => {
    const [iconIndex, setIconIndex] = useState(0);
    const icons = [Bus, Train, Plane, Ship, TramFront];

    useEffect(() => {
        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % icons.length);
        }, 2000); // Change icon every 2 seconds
        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = icons[iconIndex];

    return (
        <div className="relative flex items-center justify-center select-none group cursor-pointer">
            {/* Text Layer - Enhanced with better gradients/shadows */}
            <h1 className="z-10 text-3xl md:text-4xl font-black tracking-tight font-bengali flex gap-1.5 md:gap-2 leading-none mt-1 transition-transform duration-300 group-hover:scale-105">
                <span className="text-[#249F9C] drop-shadow-sm filter">কই</span>
                <span className="text-[#FF0060] drop-shadow-sm filter">যাবো</span>
            </h1>

            {/* Graphics Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">

                {/* Animated Dashed Trajectory Line */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#249F9C" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#FF0060" stopOpacity="0.8" />
                        </linearGradient>
                        <mask id="dashMask">
                            <path
                                d="M 10 50 Q 80 50 190 10"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeDasharray="8 6"
                                className="animate-dash-flow"
                            />
                        </mask>
                    </defs>

                    {/* Static background line (faint) */}
                    <path
                        d="M 10 50 Q 80 50 190 10"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />

                    {/* Animated Foreground Line */}
                    <path
                        d="M 10 50 Q 80 50 190 10"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                        className="animate-dash-move opacity-80"
                    >
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                </svg>

                {/* Start Icon: Minimalist Hiker (Teal) - Floating Animation */}
                <div className="absolute left-[-5px] bottom-[-2px] md:bottom-1 text-[#249F9C] animate-float-slow">
                    <div className="relative">
                        <svg width="20" height="26" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-sm">
                            <circle cx="12" cy="5" r="4" />
                            <path d="M12 10L4 22H20L12 10Z" />
                        </svg>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#249F9C]/30 rounded-full blur-[1px]"></div>
                    </div>
                </div>

                {/* End Icon: Animated Vehicle (Pink) - Transition Effects */}
                <div className="absolute right-[-15px] top-[-10px] md:top-[-15px] text-[#FF0060] transform -rotate-12 transition-all duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-110">
                    <div className="bg-white p-1.5 rounded-xl shadow-md border border-pink-100 relative z-20">
                        <CurrentIcon size={24} className="md:w-8 md:h-8 animate-in fade-in zoom-in duration-500" strokeWidth={2.5} />
                    </div>
                    {/* Motion Blur / Speed lines behind vehicle */}
                    <div className="absolute top-1/2 right-full mr-1 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-4 h-0.5 bg-[#FF0060]/40 rounded-full"></div>
                        <div className="w-2 h-0.5 bg-[#FF0060]/30 rounded-full"></div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes dash-move {
          to {
            stroke-dashoffset: -32;
          }
        }
        .animate-dash-move {
          animation: dash-move 1.5s linear infinite;
        }
        @keyframes float-slow {
           0%, 100% { transform: translateY(0); }
           50% { transform: translateY(-3px); }
        }
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};
