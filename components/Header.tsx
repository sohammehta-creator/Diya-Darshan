
import React from 'react';
import type { Page } from '../App';
import { OmIcon } from './icons/OmIcon';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navLinkClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClasses = "bg-amber-light text-warmGray-900";
  const inactiveLinkClasses = "text-warmGray-700 hover:bg-amber-light/20 hover:text-warmGray-900";

  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-amber-light/20">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <OmIcon className="h-8 w-8 text-amber" />
            <span className="font-serif text-xl font-bold text-amber-dark">Gujarat Darshan</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`${navLinkClasses} ${currentPage === 'home' ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`${navLinkClasses} ${currentPage === 'dashboard' ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Live Dashboard
            </button>
          </nav>
          <button className="hidden md:block bg-gradient-to-r from-saffron to-orange-light text-white px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300">
            Book Darshan
          </button>
           <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
