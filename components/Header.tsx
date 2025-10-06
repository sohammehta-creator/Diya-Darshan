
import React from 'react';
import { Page, Role } from '../types';
import { OmIcon } from './icons/OmIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navLinkClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClasses = "bg-amber-light text-warmGray-900";
  const inactiveLinkClasses = "text-warmGray-700 dark:text-warmGray-300 hover:bg-amber-light/20 hover:text-warmGray-900 dark:hover:text-white";

  const renderNavLinks = (role: Role) => {
    if (role === 'admin') {
      return (
        <button 
          onClick={() => setCurrentPage('admin')}
          className={`${navLinkClasses} ${currentPage === 'admin' ? activeLinkClasses : inactiveLinkClasses}`}
        >
          {t('headerAdminDashboard')}
        </button>
      );
    }
    return (
      <>
        <button 
          onClick={() => setCurrentPage('home')}
          className={`${navLinkClasses} ${currentPage === 'home' ? activeLinkClasses : inactiveLinkClasses}`}
        >
          {t('headerHome')}
        </button>
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`${navLinkClasses} ${currentPage === 'dashboard' ? activeLinkClasses : inactiveLinkClasses}`}
        >
          {t('headerLiveDashboard')}
        </button>
        <button
          onClick={() => setCurrentPage('feedback')}
          className={`${navLinkClasses} ${currentPage === 'feedback' ? activeLinkClasses : inactiveLinkClasses}`}
        >
          {t('headerFeedback')}
        </button>
      </>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/80 dark:bg-warmGray-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-amber-light/20 dark:border-amber-dark/20">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <OmIcon className="h-8 w-8 text-amber" />
            <span className="font-serif text-xl font-bold text-amber-dark dark:text-amber-light">Gujarat Darshan</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {user && renderNavLinks(user.role)}
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {user && (
              <div className="flex items-center space-x-3">
                {user.role === 'user' && (
                   <button 
                    onClick={() => setCurrentPage('scanner')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-light/20 dark:bg-amber-dark/20 text-amber-dark dark:text-amber-light text-sm font-bold hover:bg-amber-light/40 dark:hover:bg-amber-dark/40 transition-colors"
                  >
                     <QrCodeIcon className="w-5 h-5"/>
                     <span className="hidden sm:inline">{t('headerScanQR')}</span>
                   </button>
                )}
                <span className="text-sm text-warmGray-700 dark:text-warmGray-300 hidden lg:block">
                  {t('headerWelcome')}, <span className="font-bold capitalize">{user.role}</span>
                </span>
                <button onClick={logout} className="p-2 rounded-full hover:bg-amber-light/20 dark:hover:bg-amber-dark/20" aria-label="Logout">
                  <LogoutIcon className="w-5 h-5 text-amber-dark dark:text-amber-light" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;