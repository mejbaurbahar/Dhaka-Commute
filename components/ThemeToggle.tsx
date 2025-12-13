import React from 'react';

interface ThemeToggleProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
    return (
        <>
            <style>
                {`
          @keyframes sway {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
          @keyframes fly {
            0% { transform: translateX(-20px) translateY(5px) scale(0.5); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(120px) translateY(-10px) scale(0.5); opacity: 0; }
          }
          @keyframes moveClouds {
            0% { transform: translateX(0); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(0); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
           @keyframes shootingStar {
            0% { transform: translateX(0) translateY(0) rotate(-45deg) scale(1); opacity: 1; }
            100% { transform: translateX(-50px) translateY(50px) rotate(-45deg) scale(0); opacity: 0; }
          }
        `}
            </style>
            <div
                onClick={toggleTheme}
                className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-700 overflow-hidden shadow-inner border-2 ${isDarkMode ? 'bg-[#2b3270] border-[#202555]' : 'bg-[#82bafd] border-[#5d9cec]'
                    }`}
                role="button"
                aria-label="Toggle Dark Mode"
            >
                {/* =========================================
            SCENERY BACKGROUND (Hills & Ground)
            ========================================= */}

                {/* Light Mode Hills (Green) */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-full w-full transition-transform duration-700 ease-in-out ${isDarkMode ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                        }`}
                >
                    {/* Back Hill */}
                    <div className="absolute bottom-[-5px] left-0 w-full h-[60%] bg-[#a3d9a5] rounded-t-[100%] scale-[1.5] translate-x-2"></div>
                    {/* Front Hill */}
                    <div className="absolute bottom-[-10px] left-0 w-full h-[50%] bg-[#76c879] rounded-t-[50%] scale-[1.2]"></div>

                    {/* Animated Tree */}
                    <div className="absolute bottom-2 right-4 w-1 h-3 bg-[#8d6e63]" style={{ transformOrigin: 'bottom', animation: 'sway 3s ease-in-out infinite' }}>
                        <div className="absolute bottom-2 -left-2.5 w-6 h-6 bg-[#4caf50] rounded-full opacity-90 shadow-sm"></div>
                    </div>

                    {/* Flying Bird */}
                    <div className="absolute top-2 left-0 text-black/50" style={{ animation: 'fly 8s linear infinite' }}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                            <path d="M0 4 Q 3 0 6 4 Q 9 0 12 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>

                    {/* Clouds */}
                    <div className="absolute top-1 right-8 w-6 h-3 bg-white/80 rounded-full" style={{ animation: 'moveClouds 5s ease-in-out infinite alternate' }}></div>
                    <div className="absolute top-3 right-3 w-4 h-2 bg-white/60 rounded-full" style={{ animation: 'moveClouds 7s ease-in-out infinite alternate-reverse' }}></div>
                </div>

                {/* Dark Mode Hills (Dark Green/Blue) */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-full w-full transition-transform duration-700 ease-in-out ${isDarkMode ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                >
                    {/* Back Hill - Darker */}
                    <div className="absolute bottom-[-5px] right-0 w-full h-[60%] bg-[#394a6d] rounded-t-[100%] scale-[1.5] -translate-x-2"></div>
                    {/* Front Hill - Darkest */}
                    <div className="absolute bottom-[-10px] right-0 w-full h-[50%] bg-[#2a304a] rounded-t-[50%] scale-[1.2]"></div>

                    {/* Twinkling Stars */}
                    <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-80" style={{ animation: 'twinkle 2s ease-in-out infinite' }}></div>
                    <div className="absolute top-5 left-8 w-0.5 h-0.5 bg-white rounded-full opacity-60" style={{ animation: 'twinkle 3s ease-in-out infinite 0.5s' }}></div>
                    <div className="absolute top-3 left-10 w-0.5 h-0.5 bg-white rounded-full opacity-70" style={{ animation: 'twinkle 4s ease-in-out infinite 1s' }}></div>
                    <div className="absolute top-1 left-7 w-[2px] h-[2px] bg-white rounded-full opacity-50" style={{ animation: 'twinkle 2.5s ease-in-out infinite 0.2s' }}></div>

                    {/* Shooting Star */}
                    {isDarkMode && (
                        <div className="absolute top-2 right-4 w-6 h-[1px] bg-gradient-to-l from-transparent to-white rounded-full opacity-0" style={{ animation: 'shootingStar 5s linear infinite 3s' }}></div>
                    )}

                    {/* Moon (Stationary in background view) */}
                    <div className="absolute top-2 left-3 text-yellow-100/90 drop-shadow-[0_0_2px_rgba(254,243,199,0.8)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </div>
                </div>


                {/* =========================================
            THE KNOB (White Circle / Sun)
            ========================================= */}
                <div
                    className={`absolute top-1 w-8 h-8 rounded-full shadow-md z-10 transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] flex items-center justify-center ${isDarkMode ? 'left-[calc(100%-2.25rem)] bg-slate-200' : 'left-1 bg-yellow-100'
                        }`}
                >
                    {/* Crater texture for Moon (Optional, simplified) */}
                    {isDarkMode && (
                        <div className="relative w-full h-full rounded-full opacity-20 overflow-hidden">
                            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="absolute bottom-2 right-3 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        </div>
                    )}
                    {/* Shine for sun */}
                    {!isDarkMode && (
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-100 opacity-80"></div>
                    )}
                </div>

            </div>
        </>
    );
};

export default ThemeToggle;
