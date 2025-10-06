import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { WifiOffIcon } from './icons/WifiOffIcon';

const OfflineBanner: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div 
            className="fixed top-0 left-0 right-0 bg-yellow-500 dark:bg-yellow-600 text-white p-2 text-center text-sm z-50 flex items-center justify-center shadow-lg"
            role="alert"
        >
            <WifiOffIcon className="w-5 h-5 mr-2"/>
            <div>
                <span className="font-bold">{t('offlineMessage')}</span>
                <span className="ml-1 hidden sm:inline">{t('offlineSubtext')}</span>
            </div>
        </div>
    );
};

export default OfflineBanner;
