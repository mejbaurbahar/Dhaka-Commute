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
      case 'AIR': return <Plane className="w-5 h-5 text-blue-400" />;
      case 'TRAIN': return <Train className="w-5 h-5 text-[#FF0060]" />; // Pink for Train
      case 'BUS': return <Bus className="w-5 h-5 text-[#249F9C]" />;   // Teal for Bus
      case 'FERRY': return <Ship className="w-5 h-5 text-cyan-400" />;
      default: return <Bus className="w-5 h-5 text-gray-400" />;
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
      case 'AIR': return 'bg-blue-500/10 text-blue-400';
      case 'TRAIN': return 'bg-[#FF0060]/10 text-[#FF0060]';
      case 'BUS': return 'bg-[#249F9C]/10 text-[#249F9C]';
      case 'FERRY': return 'bg-cyan-500/10 text-cyan-400';
      default: return 'bg-gray-700 text-gray-400';
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
          ? 'bg-[#252525] ring-2 ring-[#249F9C] shadow-2xl border-transparent transform scale-[1.02] z-10'
          : `bg-[#1e1e1e] backdrop-blur-sm border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-[#249F9C]/50`
        }
      `}
    >
      {option.recommended && (
        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#249F9C] to-[#FF0060] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-[#249F9C]/30 uppercase tracking-widest border border-[#1e1e1e]">
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
            <h3 className="font-bold text-gray-100 text-sm leading-tight">{option.title}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md mt-1 inline-block bg-gray-800 text-gray-400`}>
              {option.type}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Route Flow */}
      <div className="relative py-2 mb-2">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500">
          <span className="truncate max-w-[40%]">{origin}</span>
          <span className="truncate max-w-[40%] text-right">{dest}</span>
        </div>
        <div className="flex items-center justify-between mt-1 relative">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="flex-1 h-[2px] bg-gray-100 mx-2 relative">
            {/* Dashed line */}
            <div className="absolute inset-0 border-b border-dashed border-gray-300 w-full top-[1px]"></div>
            {/* Plane/Icon moving on hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-100 shadow-sm transform transition-transform duration-500 group-hover:scale-110">
              <ArrowRight size={10} className="text-gray-400" />
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        </div>
      </div>

      {/* Footer: Time and Cost */}
      <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-700">
        <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 px-2.5 py-1.5 rounded-lg border border-gray-700">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs font-bold">{option.totalDuration}</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-[#249F9C] bg-[#249F9C]/10 px-2.5 py-1.5 rounded-lg border border-[#249F9C]/20">
          <DollarSign className="w-3.5 h-3.5 text-[#249F9C]" />
          <span className="text-sm">{option.totalCostRange}</span>
        </div>
      </div>
    </div>
  );
};