import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { RouteResponse } from '../types';
import { Zap, Bot, Calendar, Navigation, Clock, Banknote, ChevronRight, ArrowLeft } from 'lucide-react';
import { parseRouteMarkdown } from '../helpers';
import MapComponent from './MapComponent';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultCardProps {
  data: RouteResponse;
}

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const { t } = useLanguage();
  const parsedData = useMemo(() => parseRouteMarkdown(data.result), [data.result]);
  const [selectedModeId, setSelectedModeId] = useState<number>(parsedData.modes.length > 0 ? 1 : 0);

  const selectedMode = useMemo(() => {
    return parsedData.modes.find(m => m.id === selectedModeId);
  }, [parsedData.modes, selectedModeId]);

  // Extract stops for the map
  const currentModeStops = useMemo(() => {
    if (!selectedMode) return [];

    const potentialStops = [
      { name: "Teknaf", lat: 20.8644, lng: 92.2985 },
      { name: "Cox's Bazar", lat: 21.4272, lng: 92.0058 },
      { name: "Chattogram", lat: 22.3569, lng: 91.7832 },
      { name: "Cumilla", lat: 23.4607, lng: 91.1809 },
      { name: "Mawa", lat: 23.4425, lng: 90.2358 },
      { name: "Barishal", lat: 22.7010, lng: 90.3535 },
      { name: "Khulna", lat: 22.8456, lng: 89.5403 },
      { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
      { name: "Bogura", lat: 24.8465, lng: 89.3770 }
    ];

    const content = selectedMode.fullContent;
    return potentialStops
      .filter(stop => content.includes(stop.name))
      .map(s => s.name);
  }, [selectedMode]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">

      {/* 1. Content Section */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Info Panel (4 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar size={14} />
                <span>{new Date(data.date).toLocaleDateString('bn-BD', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <div className="flex items-center gap-1">
                  {data.source === 'memory_cache' ? <Zap size={12} className="text-yellow-500" /> : <Bot size={12} className="text-green-500" />}
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {data.source === 'memory_cache' ? t('intercity.instant') : t('intercity.ai')}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 flex-wrap">
                <span>{data.from}</span>
                <Navigation className="text-blue-500 fill-blue-50 dark:fill-blue-900/20 rotate-90 md:rotate-0" size={24} />
                <span>{data.to}</span>
              </h2>
            </div>

            {/* Mode Selection Chips */}
            {parsedData.modes.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('intercity.suggestedModes')}</p>
                <div className="flex flex-wrap gap-2">
                  {parsedData.modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedModeId(mode.id)}
                      className={`px-4 py-2.5 rounded-xl border-2 transition-all flex items-center gap-2 text-sm font-bold
                        ${selectedModeId === mode.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm'
                          : 'border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-blue-200'
                        }
                      `}
                    >
                      <span className="text-xl">{mode.icon}</span>
                      <span>{mode.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Intro/Summary Text */}
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <ReactMarkdown>{parsedData.intro}</ReactMarkdown>
            </div>
          </div>

          {/* Right Content Panel (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-700">
            {selectedMode ? (
              <div className="space-y-6 animate-fade-in">
                {/* Mode Header with Summary Chips */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedMode.icon}</span>
                    <h3 className="text-xl font-bold dark:text-white">{selectedMode.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMode.summary.split('|').map((part, i) => (
                      <span key={i} className="text-xs font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm">
                        {part.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Markdown Detail */}
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <ReactMarkdown>{selectedMode.fullContent}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center opacity-40">
                <ReactMarkdown>{data.result}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Map Section (Bottom) */}
      <div className="h-[350px] md:h-[450px] relative border-t border-gray-100 dark:border-slate-700">
        <MapComponent
          from={data.from}
          to={data.to}
          via={currentModeStops}
          modeTitle={selectedMode?.title || 'Route Map'}
        />

        {/* Map Label Overlay */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-white/50 dark:border-slate-700/50">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">{t('intercity.routeMap')}</p>
          <p className="font-bold text-slate-800 dark:text-white text-sm">{selectedMode?.title || 'Overview'}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;