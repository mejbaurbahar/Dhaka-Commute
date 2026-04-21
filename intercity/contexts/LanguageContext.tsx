import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../i18n/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    formatNumber: (num: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default language is Bangla (bn)
    const [language, setLanguageState] = useState<Language>('bn');

    // Load saved language preference on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('app-language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
            setLanguageState(savedLanguage);
        }
    }, []);

    // Save language preference when changed
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);
    };

    // Translation function
    const t = (key: string, params?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                // Fallback to English if key not found in current language
                value = translations['en'];
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object') {
                        value = value[fallbackKey];
                    } else {
                        value = key; // Return key itself if translation not found
                        break;
                    }
                }
                break;
            }
        }

        let result = value || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                result = result.replace(`{${k}}`, v.toString());
            });
        }
        return result;
    };

    // Number formatting function
    const formatNumber = (num: number | string): string => {
        if (num === null || num === undefined) return '';
        const str = num.toString();
        if (language === 'en') return str;

        const map: Record<string, string> = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
            '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
        };

        return str.replace(/[0-9]/g, match => map[match]);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
