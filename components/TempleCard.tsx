// Fix: Create full content for TempleCard.tsx
import React, { useState } from 'react';
import { Temple } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ClockIcon } from './icons/ClockIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface TempleCardProps {
  temple: Temple;
}

const TempleCard: React.FC<TempleCardProps> = ({ temple }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-warmGray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
      <div className="relative">
        <img src={temple.imageUrl} alt={t(temple.id)} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-3 left-4 font-serif text-2xl font-bold text-white">
          {t(temple.id)}
        </h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-warmGray-500 dark:text-warmGray-400 h-16 overflow-hidden">
          {t(temple.descriptionKey)}
        </p>
        <div className="mt-4 flex justify-between items-center text-sm">
            <div className="flex items-center text-warmGray-600 dark:text-warmGray-300">
                <LocationMarkerIcon className="w-4 h-4 mr-1.5 text-amber" />
                <span>{temple.location}</span>
            </div>
            <div className="flex items-center text-warmGray-600 dark:text-warmGray-300">
                <ClockIcon className="w-4 h-4 mr-1.5 text-amber" />
                <span>{temple.waitTime} {t('minutes')}</span>
            </div>
        </div>

        {/* Expandable Section */}
        <div 
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: isExpanded ? '500px' : '0' }}
        >
          <div className="mt-4 pt-4 border-t border-warmGray-200 dark:border-warmGray-700">
              <h4 className="font-bold text-sm text-warmGray-800 dark:text-white mb-2">{t('templeSignificance')}</h4>
              <p className="text-sm text-warmGray-500 dark:text-warmGray-400">{t(temple.significance)}</p>

              <h4 className="font-bold text-sm text-warmGray-800 dark:text-white mt-4 mb-2">{t('templeArchitecture')}</h4>
              <p className="text-sm text-warmGray-500 dark:text-warmGray-400">{t(temple.architecture)}</p>
          </div>
        </div>

        <div className="mt-4 text-center">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm font-bold text-amber-dark dark:text-amber-light hover:underline"
            >
                {t(isExpanded ? 'hideDetails' : 'viewDetails')}
            </button>
        </div>

      </div>
    </div>
  );
};

export default TempleCard;