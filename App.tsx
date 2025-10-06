import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import AdminDashboard from './components/AdminDashboard';
import FeedbackPage from './components/FeedbackPage';
import Chatbot from './components/Chatbot';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import OfflineBanner from './components/OfflineBanner';
import ScannerPage from './components/ScannerPage';
import { useAuth } from './contexts/AuthContext';
import { Page } from './types';

type AuthPage = 'login' | 'forgot-password';

const App: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('online', handleOnline);
    };
  }, []);


  if (!user) {
    const renderAuthPage = () => {
      switch (authPage) {
        case 'login':
          return <LoginPage onForgotPassword={() => setAuthPage('forgot-password')} />;
        case 'forgot-password':
          return <ForgotPasswordPage onBackToLogin={() => setAuthPage('login')} />;
        default:
          return <LoginPage onForgotPassword={() => setAuthPage('forgot-password')} />;
      }
    };

    return (
       <div className="bg-cream dark:bg-warmGray-900 min-h-screen">
          {isOffline && <OfflineBanner />}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.1),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.1),_transparent_40%)] -z-10"
            style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm59-66c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM28 75c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23D6D3D1" fill-opacity="0.2" fill-rule="evenodd"/%3E%3C/svg%3E')` }}
          ></div>
          {renderAuthPage()}
       </div>
    )
  }

  const renderPage = () => {
    if (user.role === 'admin') {
        switch (currentPage) {
            case 'home': return <AdminDashboard />;
            case 'admin': return <AdminDashboard />;
            default: return <AdminDashboard />;
        }
    }

    switch (currentPage) {
      case 'home': return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'dashboard': return <DashboardPage />;
      case 'feedback': return <FeedbackPage setCurrentPage={setCurrentPage} />;
      case 'scanner': return <ScannerPage setCurrentPage={setCurrentPage} />;
      default: return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div className="bg-cream min-h-screen font-sans text-warmGray-900 dark:bg-warmGray-900 dark:text-warmGray-100">
      {isOffline && <OfflineBanner />}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.1),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.1),_transparent_40%)] -z-10"
        style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm59-66c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM28 75c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23D6D3D1" fill-opacity="0.2" fill-rule="evenodd"/%3E%3C/svg%3E')` }}
      ></div>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className={isOffline ? 'pt-10' : ''}>
        {renderPage()}
      </main>
      {user.role === 'user' && <Chatbot />}
    </div>
  );
};

export default App;