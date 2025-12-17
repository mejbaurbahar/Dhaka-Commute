import React from 'react';
import { MapPin } from 'lucide-react';
import { LOCATIONS_DATA } from '../constants';

interface DistrictSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  placeholder?: string;
}

const DistrictSelect: React.FC<DistrictSelectProps> = ({ label, value, onChange, name, placeholder }) => {
  return (
    <div className="relative group">
      {/* Hidden label on very small screens if needed, but keeping it small for now */}
      <label className="block text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 md:mb-1 ml-1 transition-colors">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
          <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
        </div>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-8 md:pl-10 pr-8 md:pr-10 py-2 md:py-3 text-sm md:text-base border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm appearance-none outline-none text-gray-700 dark:text-gray-200 font-medium cursor-pointer placeholder-gray-400"
        >
          <option value="">{placeholder || "Select Location"}</option>
          {Object.entries(LOCATIONS_DATA).map(([category, locations]) => (
            <optgroup key={category} label={category} className="font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-slate-800">
              {locations.map((location) => (
                <option key={`${category}-${location}`} value={location} className="text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 py-1">
                  {location}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3 pointer-events-none text-gray-400 dark:text-gray-500">
          <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DistrictSelect;