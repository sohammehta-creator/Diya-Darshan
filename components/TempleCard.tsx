
import React from 'react';
import type { Temple } from '../types';
import { CrowdLevel } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { ParkingIcon } from './icons/ParkingIcon';


interface TempleCardProps {
  temple: Temple;
}

const CrowdBadge: React.FC<{ level: CrowdLevel }> = ({ level }) => {
  const levelStyles: Record<CrowdLevel, string> = {
    [CrowdLevel.Low]: 'bg-green-100 text-green-800',
    [CrowdLevel.Moderate]: 'bg-yellow-100 text-yellow-800',
    [CrowdLevel.High]: 'bg-orange-100 text-orange-800',
    [CrowdLevel.Critical]: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${levelStyles[level]}`}>
      {level} Crowd
    </span>
  );
};

const TempleCard: React.FC<TempleCardProps> = ({ temple }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={temple.imageUrl} alt={temple.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <CrowdBadge level={temple.crowdLevel} />
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold font-serif">{temple.name}</h3>
      </div>
      <div className="p-5">
        <div className="flex items-center text-warmGray-500 mb-4">
          <LocationMarkerIcon className="w-5 h-5 mr-2 text-amber-dark"/>
          <span className="text-sm">{temple.location}</span>
        </div>
        <div className="space-y-3 text-sm text-warmGray-700">
            <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-3 text-saffron" />
                <span>Wait Time: <span className="font-bold">{temple.waitTime} mins</span></span>
            </div>
            <div className="flex items-center">
                <ParkingIcon className="w-5 h-5 mr-3 text-saffron" />
                <span>Parking: <span className="font-bold">{temple.parkingSlots} slots available</span></span>
            </div>
        </div>
        <button className="mt-5 w-full bg-amber-light text-amber-dark font-bold py-2 px-4 rounded-lg group-hover:bg-amber-dark group-hover:text-white transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TempleCard;
