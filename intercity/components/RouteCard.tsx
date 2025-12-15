import React from 'react';
import { TravelOption } from '../types';
import { Plane, Bus, Train, Clock, Ship, Car } from 'lucide-react';

interface RouteCardProps {
  option: TravelOption;
  isSelected: boolean;
  onClick: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ option, isSelected, onClick }) => {
  const getIcon = () => {
    switch (option.type) {
      case 'AIR': return <Plane className="w-5 h-5" />;
      case 'TRAIN': return <Train className="w-5 h-5" />;
      case 'BUS': return <Bus className="w-5 h-5" />;
      case 'FERRY': return <Ship className="w-5 h-5" />;
      default: return <Car className="w-5 h-5" />;
    }
  };

  const getThemeColor = () => {
    switch (option.type) {
      case 'AIR': return 'blue';
      case 'TRAIN': return 'orange'; // Train is usually orange/yellow
      case 'BUS': return 'emerald';
      case 'FERRY': return 'cyan';
      default: return 'gray';
    }
  };

  const color = getThemeColor();

  return (
    <div
      onClick={onClick}
      className={`
        relative group rounded-xl p-4 cursor-pointer transition-all duration-200 border
        ${isSelected
          ? `bg-slate-800 border-${color}-500 ring-1 ring-${color}-500 shadow-lg`
          : `bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600`
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? `bg-${color}-500 text-white` : `bg-slate-700 text-gray-400 group-hover:text-white group-hover:bg-slate-600`}`}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-bold text-base ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                {option.type === 'BUS' ? 'Bus' : option.type === 'TRAIN' ? 'Train' : option.type === 'AIR' ? 'Flight' : option.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>{option.totalDuration}</span>
              </div>
            </div>

            <div className="text-right">
              <div className={`font-bold text-sm ${isSelected ? `text-${color}-400` : 'text-emerald-400'}`}>
                {option.totalCostRange}
              </div>
              <div className="text-[10px] text-gray-500 uppercase">BDT</div>
            </div>
          </div>

          {/* Description / Summary */}
          <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
            {option.title !== 'Bus' && option.title !== 'Train' && option.title !== 'Flight' ? option.title : option.summary}
            {option.steps[0]?.instruction && ` - ${option.steps[0].instruction}`}
          </p>
        </div>
      </div>
    </div>
  );
};