
import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import Chatbot from './components/Chatbot';

export type Page = 'home' | 'dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="bg-cream min-h-screen font-sans text-warmGray-900">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.1),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.1),_transparent_40%)] -z-10"
        style={{
            backgroundImage: `
                radial-gradient(circle at top, rgba(251, 191, 36, 0.05), transparent 30%),
                radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.05), transparent 40%),
                url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm59-66c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM28 75c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23D6D3D1" fill-opacity="0.2" fill-rule="evenodd"/%3E%3C/svg%3E')
        `
        }}>
      </div>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === 'home' && <LandingPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
      <Chatbot />
    </div>
  );
};

export default App;
