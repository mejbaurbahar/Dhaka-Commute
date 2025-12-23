import React from 'react';
import { getRemainingUses } from '../services/apiKeyManager';
import { Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AIUsageIndicator: React.FC = () => {
    const { t, formatNumber } = useLanguage();
    const remaining = getRemainingUses();

    if (remaining.aiChat === 0) {
        return (
            <div className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full shadow-lg border-2 border-red-300">
                <Clock className="w-4 h-4" />
                <span>{formatNumber(0)}/{formatNumber(2)} {t('ai.queriesRemaining')}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border-2 border-blue-200 shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>{formatNumber(remaining.aiChat)}/{formatNumber(2)} {t('ai.queriesRemaining')}</span>
        </div>
    );
};

export const IntercityUsageIndicator: React.FC = () => {
    const { t, formatNumber } = useLanguage();
    const remaining = getRemainingUses();

    if (remaining.intercitySearch === 0) {
        return (
            <div className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full shadow-lg border-2 border-red-300">
                <Clock className="w-4 h-4" />
                <span>{formatNumber(0)}/{formatNumber(2)} {t('intercity.limitReached')}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm font-bold text-purple-700 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-full border-2 border-purple-200 shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>{formatNumber(remaining.intercitySearch)}/{formatNumber(2)} {t('intercity.searchesLeft')}</span>
        </div>
    );
};
