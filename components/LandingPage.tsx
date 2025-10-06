
import React from 'react';
import { TEMPLES_DATA } from '../constants';
import TempleCard from './TempleCard';
import type { Page } from '../App';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface LandingPageProps {
  setCurrentPage: (page: Page) => void;
}


const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center">
        <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-light to-orange-light rounded-lg blur opacity-25"></div>
            <h1 className="relative font-serif text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-dark to-orange-dark py-2">
            Smart Darshan, Safe Journey
            </h1>
        </div>
        <p className="mt-4 font-serif text-2xl md:text-4xl text-warmGray-700">સ્માર્ટ દર્શન, સુરક્ષિત યાત્રા</p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-warmGray-500">
          Experience Gujarat's sacred temples like never before. Our system provides real-time crowd data and predictive analytics for a peaceful and organized pilgrimage.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-orange-light text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Check Live Status <ArrowRightIcon className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-white text-orange-dark border-2 border-orange-light px-8 py-3 rounded-full font-bold hover:bg-orange-light/10 transition-colors duration-300">
            Book Your Darshan
          </button>
        </div>
      </div>

      {/* Temple Cards Grid */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-warmGray-900 font-serif">Major Pilgrimage Sites</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLES_DATA.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
