import React from 'react';
import { TravelOption } from '../types';
import { Plane, Bus, Train, Clock, DollarSign, ChevronRight, ArrowRight, Ship } from 'lucide-react';

interface RouteCardProps {
  option: TravelOption;
  isSelected: boolean;
  onClick: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ option, isSelected, onClick }) => {
  const getIcon = () => {
    switch (option.type) {
      case 'AIR': return <Plane className="w-5 h-5 text-blue-600" />;
      case 'TRAIN': return <Train className="w-5 h-5 text-orange-600" />;
      case 'BUS': return <Bus className="w-5 h-5 text-emerald-600" />;
      case 'FERRY': return <Ship className="w-5 h-5 text-cyan-600" />;
      default: return <Bus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getThemeClass = () => {
    switch (option.type) {
      case 'AIR': return 'group-hover:border-blue-200 group-hover:shadow-blue-500/10';
      case 'TRAIN': return 'group-hover:border-orange-200 group-hover:shadow-orange-500/10';
      case 'BUS': return 'group-hover:border-emerald-200 group-hover:shadow-emerald-500/10';
      case 'FERRY': return 'group-hover:border-cyan-200 group-hover:shadow-cyan-500/10';
      default: return 'group-hover:border-gray-200';
    }
  };

  const getIconBg = () => {
    switch (option.type) {
      case 'AIR': return 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'TRAIN': return 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'BUS': return 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
      case 'FERRY': return 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400';
      default: return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  // Extract origin/dest from summary if possible, purely for visual layout
  const summaryParts = (option.summary || "").split('→').map(s => s.trim());
  const origin = summaryParts[0] || "Start";
  const dest = summaryParts[summaryParts.length - 1] || "End";

  return (
    <div
      onClick={onClick}
      className={`
        relative group rounded-2xl p-4 cursor-pointer transition-all duration-300 border
        ${isSelected
          ? 'bg-white dark:bg-slate-800 ring-2 ring-emerald-500 shadow-xl border-transparent transform scale-[1.02] z-10'
          : `bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${getThemeClass()}`
        }
      `}
    >
      {option.recommended && (
        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30 uppercase tracking-widest border border-white">
          Best Option
        </span>
      )}

      {/* Header: Title and Icon */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${getIconBg()} rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors duration-300`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-tight">{option.title}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md mt-1 inline-block bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300`}>
              {option.type}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Route Flow */}
      <div className="relative py-2 mb-2">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
          <span className="truncate max-w-[40%]">{origin}</span>
          <span className="truncate max-w-[40%] text-right">{dest}</span>
        </div>
        <div className="flex items-center justify-between mt-1 relative">
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex-1 h-[2px] bg-gray-100 dark:bg-gray-700 mx-2 relative">
            {/* Dashed line */}
            <div className="absolute inset-0 border-b border-dashed border-gray-300 dark:border-gray-600 w-full top-[1px]"></div>
            {/* Plane/Icon moving on hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 p-1 rounded-full border border-gray-100 dark:border-gray-600 shadow-sm transform transition-transform duration-500 group-hover:scale-110">
              <ArrowRight size={10} className="text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-200"></div>
        </div>
      </div>

      {/* Footer: Time and Cost */}
      <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-gray-600">
          <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-400" />
          <span className="text-xs font-bold">{option.totalDuration}</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span className="text-sm">{option.totalCostRange}</span>
        </div>
      </div>
    </div>
  );
};