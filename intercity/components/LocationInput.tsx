
import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  iconColorClass: string;
  ringColorClass: string;
  disabled?: boolean;
}

export const POPULAR_LOCATIONS = [
  // --- Major Transport Hubs (Dhaka) ---
  "Abdullahpur, Dhaka", "Airport, Dhaka", "Gabtoli, Dhaka", "Gulistan, Dhaka",
  "Jatrabari, Dhaka", "Komlapur, Dhaka", "Mohakhali, Dhaka", "Sayedabad, Dhaka",

  // --- Popular Tourist Destinations ---
  "Bandarban", "Cox's Bazar", "Jaflong, Sylhet", "Khagrachari", "Kuakata",
  "Rangamati", "Saint Martin", "Sajek Valley", "Sreemangal", "Sundarbans",

  // --- Land Ports / Borders ---
  "Akhaura", "Banglabandha", "Benapole", "Bhomra", "Burimari", "Darshana", "Hili", "Tamabil",

  // --- All 64 Districts & Major Cities ---
  "Bagerhat", "Barishal", "Barguna", "Bhairab", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga", "Cumilla",
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
  "Habiganj", "Ishwardi", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat",
  "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Mongla", "Moulvibazar",
  "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
  "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh",
  "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangpur", "Satkhira",
  "Savar", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet",
  "Tangail", "Teknaf", "Thakurgaon", "Tongi"
].sort();

export const LocationInput: React.FC<LocationInputProps> = ({
  label, value, onChange, placeholder, iconColorClass, ringColorClass, disabled = false
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredLocations = POPULAR_LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(value.toLowerCase())
  );

  return (
    // Dynamic z-index: Increase to z-50 when suggestions are showing to overlay siblings
    <div className={`flex-1 relative group ${showSuggestions ? 'z-50' : 'z-20'}`} ref={wrapperRef}>
      <div className="flex justify-between items-center mb-1.5 ml-1">
        <label className={`block text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${isFocused ? 'text-[#249F9C]' : 'text-gray-400'}`}>{label}</label>
      </div>

      <div className="relative">

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (!disabled) {
              onChange(e.target.value);
              setShowSuggestions(true);
            }
          }}
          onFocus={() => {
            if (!disabled) {
              setShowSuggestions(true);
              setIsFocused(true);
            }
          }}
          disabled={disabled}
          className={`
            w-full pl-4 pr-4 py-3 md:py-4
            bg-[#2d2d2d] backdrop-blur-sm
            border border-gray-700 rounded-2xl
            text-base font-bold text-white placeholder:text-gray-500 placeholder:font-normal
            shadow-inner transition-all duration-300
            focus:outline-none focus:ring-2 focus:bg-[#333] focus:shadow-lg focus:border-[#249F9C] ${ringColorClass}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-800' : ''}
          `}
        />
        {showSuggestions && !disabled && (value.length > 0 || filteredLocations.length > 0) && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-[#2d2d2d]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700 max-h-96 overflow-y-auto overflow-x-hidden custom-scrollbar animate-fade-in-up p-2 min-w-[160px] md:min-w-0 z-[60]">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange(loc);
                    setShowSuggestions(false);
                    setIsFocused(false);
                  }}
                  className="px-4 py-3 hover:bg-[#249F9C]/20 hover:text-[#249F9C] cursor-pointer rounded-xl text-sm font-semibold text-gray-300 flex items-center gap-3 transition-colors duration-200"
                >

                  <span className="whitespace-normal leading-tight">{loc}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-gray-400 italic text-center">No locations found...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
