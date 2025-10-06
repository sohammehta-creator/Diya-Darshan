import React, { useState } from 'react';
import { TEMPLES_DATA } from '../constants';
import { Temple, CrowdLevel } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ClockIcon } from './icons/ClockIcon';
import { CloseIcon } from './icons/CloseIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { ParkingIcon } from './icons/ParkingIcon';

const crowdLevelColors: Record<CrowdLevel, { base: string; pulse: string; text: string; }> = {
    [CrowdLevel.Low]: { base: 'fill-green-500', pulse: 'stroke-green-400', text: 'text-green-600 dark:text-green-400' },
    [CrowdLevel.Moderate]: { base: 'fill-yellow-500', pulse: 'stroke-yellow-400', text: 'text-yellow-600 dark:text-yellow-400' },
    [CrowdLevel.High]: { base: 'fill-orange-500', pulse: 'stroke-orange-400', text: 'text-orange-600 dark:text-orange-400' },
    [CrowdLevel.Critical]: { base: 'fill-red-500', pulse: 'stroke-red-400', text: 'text-red-600 dark:text-red-400' },
};

const TempleInfoModal: React.FC<{ temple: Temple, onClose: () => void }> = ({ temple, onClose }) => {
    const { t } = useLanguage();
    const colors = crowdLevelColors[temple.crowdLevel];
    
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(temple.location)}`;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${temple.id}`}
        >
            <div
                className="relative w-full max-w-sm bg-white dark:bg-warmGray-800 rounded-lg shadow-xl border border-warmGray-200 dark:border-warmGray-700 overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-white hover:bg-black/70 z-10 transition-colors"
                    aria-label="Close modal"
                >
                    <CloseIcon className="w-5 h-5"/>
                </button>
                <img src={temple.imageUrl} alt={t(temple.id)} className="w-full h-40 object-cover" />
                <div className="p-4">
                    <h4 id={`modal-title-${temple.id}`} className="font-bold font-serif text-xl text-warmGray-900 dark:text-white mb-2 truncate">{t(temple.id)}</h4>
                    <div className="flex items-center text-sm text-warmGray-500 dark:text-warmGray-400 mb-4">
                        <LocationMarkerIcon className="w-4 h-4 mr-2 flex-shrink-0"/>
                        <span>{temple.location}</span>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-warmGray-500 dark:text-warmGray-400">{t('crowdLevel')}:</span>
                            <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${colors.text} ${colors.base.replace('fill','bg')}/20`}>{t(`crowdLevel${temple.crowdLevel}`)}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-warmGray-500 dark:text-warmGray-400 flex items-center"><ClockIcon className="w-4 h-4 mr-1.5"/> {t('waitTime')}:</span>
                            <span className="font-bold text-warmGray-800 dark:text-warmGray-200">{temple.waitTime} {t('minutes')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-warmGray-500 dark:text-warmGray-400 flex items-center"><ParkingIcon className="w-4 h-4 mr-1.5"/> {t('parking')}:</span>
                            <span className="font-bold text-warmGray-800 dark:text-warmGray-200">{temple.parkingSlots}</span>
                        </div>
                    </div>
                     <div className="mt-4">
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-gradient-to-r from-saffron to-orange-light text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
                        >
                            {t('getDirections')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const GujaratMap: React.FC = () => {
    const [activeTemple, setActiveTemple] = useState<Temple | null>(null);

    const handlePinClick = (temple: Temple) => {
        setActiveTemple(temple);
    }
    
    return (
        <>
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
                <svg viewBox="0 0 500 480" className="w-full h-full">
                    {/* Simplified Gujarat Map Path */}
                    <path 
                        d="M233.9,475.5c-8.6-2.5-12.8-10.7-18-17.4c-13-17-31.1-28.9-50-39.7c-21.1-12-44.4-20.7-67.9-27.8 c-16.1-4.8-32.3-9.5-47.5-16.5C31,363,16,350.2,9.3,332.6c-4.1-10.9-2.5-23.2,0.9-34.6c3.2-10.9,7.9-21.2,12.7-31.5 c12.9-27.7,25-55.9,31.7-86.9c3.8-17.5,5.1-35.4,4.2-53.3C57,83.1,62.3,44.7,89.5,21.1c11.1-9.7,24.8-15.6,39.1-17.8 c21.1-3.2,42-1.1,62.4,4.5c19.3,5.3,37.1,14.6,55.2,22.8c16,7.2,32.2,14,48.7,19.6c24.6,8.4,49.2,16.7,73.6,25.3 c13,4.6,26.2,8.8,38.7,14.7c15.1,7.2,29.1,17,35.8,32.2c4.1,9.2,4,19.4-0.1,28.7c-5.7,12.9-15.9,22.2-26.4,30.5 c-15.1,11.8-31.6,21.5-48.4,30.2c-21.1,11-42.8,20.8-63.5,32.8c-12,6.9-23.6,14.4-34.1,23.5c-9.1,7.9-16.8,17.2-22.3,27.9 c-3.9,7.6-6.7,15.7-10,23.6C242.2,472,238,475.5,233.9,475.5z"
                        className="fill-amber-light/20 dark:fill-amber-dark/20 stroke-amber-dark/50 dark:stroke-amber-light/50"
                        strokeWidth="2"
                    />
                     {TEMPLES_DATA.map(temple => {
                         const colors = crowdLevelColors[temple.crowdLevel];
                         return (
                            <g 
                                key={temple.id}
                                transform={`translate(${parseFloat(temple.mapCoords.x)/100 * 500}, ${parseFloat(temple.mapCoords.y)/100 * 480})`}
                                onClick={() => handlePinClick(temple)}
                                className="cursor-pointer group"
                            >
                                <circle r="12" className={`${colors.pulse} opacity-50 animate-pulse`} fill="none" strokeWidth="2" />
                                <circle r="6" className={`${colors.base} transition-all duration-300 group-hover:r-8`} />
                            </g>
                         )
                     })}
                </svg>
            </div>
            {activeTemple && <TempleInfoModal temple={activeTemple} onClose={() => setActiveTemple(null)}/>}
        </>
    )
};

export default GujaratMap;