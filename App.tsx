
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { COMPANIES, POLICIES } from './constants';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sundari_session');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('sundari_session', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sundari_session');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'explore': return <Explore onNavigate={setCurrentPage} policies={POLICIES} companies={COMPANIES} />;
      case 'dashboard': return <Dashboard user={user} onLogin={handleLogin} onLogout={handleLogout} onNavigate={setCurrentPage} />;
      case 'services': return <Services user={user} onNavigate={setCurrentPage} />;
      case 'admin': return <Admin user={user} onNavigate={setCurrentPage} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        user={user} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <Chatbot user={user} />
    </div>
  );
};

export default App;
