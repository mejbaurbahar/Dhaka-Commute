/**
 * MULTI-LANGUAGE USAGE EXAMPLES
 * 
 * This file shows how to use translations in different scenarios
 */

import { useLanguage } from '../contexts/LanguageContext';

// ============================================
// EXAMPLE 1: Simple Component with Translations
// ============================================
export const SimpleExample = () => {
    const { t } = useLanguage();

    return (
        <div>
            <h1>{t('common.appName')}</h1>
            <button>{t('common.search')}</button>
            <p>{t('common.loading')}</p>
        </div>
    );
};

// ============================================
// EXAMPLE 2: Navigation Menu
// ============================================
export const NavigationExample = () => {
    const { t } = useLanguage();

    const menuItems = [
        { key: 'home', label: t('nav.home'), icon: '🏠' },
        { key: 'ai', label: t('nav.aiAssistant'), icon: '🤖' },
        { key: 'history', label: t('nav.history'), icon: '📜' },
        { key: 'settings', label: t('nav.settings'), icon: '⚙️' },
    ];

    return (
        <nav>
            {menuItems.map(item => (
                <a key={item.key} href={`#${item.key}`}>
                    {item.icon} {item.label}
                </a>
            ))}
        </nav>
    );
};

// ============================================
// EXAMPLE 3: Form with Placeholders
// ============================================
export const FormExample = () => {
    const { t } = useLanguage();

    return (
        <form>
            <input
                type="text"
                placeholder={t('home.searchPlaceholder')}
            />
            <button type="submit">
                {t('home.findRoute')}
            </button>
        </form>
    );
};

// ============================================
// EXAMPLE 4: Error Messages
// ============================================
export const ErrorExample = ({ hasError }: { hasError: boolean }) => {
    const { t } = useLanguage();

    if (!hasError) return null;

    return (
        <div className="error-message">
            <h3>{t('errors.somethingWentWrong')}</h3>
            <p>{t('errors.tryAgain')}</p>
        </div>
    );
};

// ============================================
// EXAMPLE 5: Conditional Text Based on State
// ============================================
export const StatusExample = ({ isOnline }: { isOnline: boolean }) => {
    const { t } = useLanguage();

    return (
        <div className="status">
            {isOnline ? t('common.online') : t('common.offline')}
        </div>
    );
};

// ============================================
// EXAMPLE 6: List with Translated Items
// ============================================
export const SettingsListExample = () => {
    const { t } = useLanguage();

    const settings = [
        { icon: '🌍', label: t('settings.language') },
        { icon: '🌙', label: t('settings.theme') },
        { icon: 'ℹ️', label: t('settings.appInfo') },
    ];

    return (
        <ul>
            {settings.map((setting, index) => (
                <li key={index}>
                    {setting.icon} {setting.label}
                </li>
            ))}
        </ul>
    );
};

// ============================================
// EXAMPLE 7: Modal with Multiple Translations
// ============================================
export const ModalExample = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="modal">
            <h2>{t('offline.youAreOffline')}</h2>
            <p>{t('offline.someFeaturesMayNotWork')}</p>
            <div className="button-group">
                <button onClick={onClose}>{t('common.cancel')}</button>
                <button>{t('offline.proceedAnyway')}</button>
            </div>
        </div>
    );
};

// ============================================
// EXAMPLE 8: Current Language Selector
// ============================================
export const LanguageSelectorExample = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div>
            <h3>{t('settings.language')}</h3>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'bn' | 'en')}
            >
                <option value="bn">{t('settings.bangla')}</option>
                <option value="en">{t('settings.english')}</option>
            </select>
            <p>
                {t('settings.currentLanguage')}: {language === 'bn' ? 'বাংলা' : 'English'}
            </p>
        </div>
    );
};

// ============================================
// EXAMPLE 9: Dynamic Key Construction (Advanced)
// ============================================
export const DynamicKeyExample = ({ section }: { section: string }) => {
    const { t } = useLanguage();

    // Dynamic key construction (use carefully, prefer static keys)
    const sectionTitle = t(`nav.${section}` as any);

    return <h2>{sectionTitle}</h2>;
};

// ============================================
// EXAMPLE 10: Combining Multiple Translations
// ============================================
export const CombinedExample = ({ userName, itemCount }: { userName: string; itemCount: number }) => {
    const { t, language } = useLanguage();

    // Combine static translations with dynamic data
    return (
        <div>
            <h1>{t('common.appName')}</h1>
            <p>
                {/* In real app, you might want to add user-specific translations */}
                {language === 'bn'
                    ? `স্বাগতম, ${userName}! আপনার ${itemCount} টি আইটেম আছে।`
                    : `Welcome, ${userName}! You have ${itemCount} items.`
                }
            </p>
        </div>
    );
};

// ============================================
// HOW TO ADD NEW TRANSLATIONS
// ============================================

/**
 * Steps to add new translations:
 *
 * 1. Open `i18n/translations.ts`
 *
 * 2. Add your key to BOTH bn and en objects:
 *
 *    bn: {
 *      mySection: {
 *        myKey: 'আমার বাংলা টেক্সট',
 *      }
 *    }
 *
 *    en: {
 *      mySection: {
 *        myKey: 'My English Text',
 *      }
 *    }
 *
 * 3. Use in component:
 *    const { t } = useLanguage();
 *    t('mySection.myKey')
 *
 * 4. Test with both languages!
 */

// ============================================
// COMMON PATTERNS TO REPLACE
// ============================================

/**
 * BEFORE (Hard-coded):
 * <button>Search</button>
 * 
 * AFTER (Translated):
 * <button>{t('common.search')}</button>
 * 
 * ---
 * 
 * BEFORE:
 * <input placeholder="Search for buses..." />
 * 
 * AFTER:
 * <input placeholder={t('home.searchPlaceholder')} />
 * 
 * ---
 * 
 * BEFORE:
 * <h1>Settings</h1>
 * 
 * AFTER:
 * <h1>{t('settings.title')}</h1>
 */
