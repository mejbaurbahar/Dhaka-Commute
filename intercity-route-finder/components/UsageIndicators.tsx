import React from 'react';
import { getRemainingUses } from '../services/apiKeyManager';

export const AIUsageIndicator: React.FC = () => {
    const remaining = getRemainingUses();

    return (
        <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {remaining.aiChat}/2 free queries today
        </p>
    );
};

export const IntercityUsageIndicator: React.FC = () => {
    const remaining = getRemainingUses();

    return (
        <p className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            {remaining.intercitySearch}/2 free searches today
        </p>
    );
};
