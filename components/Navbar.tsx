
import React, { useState } from 'react';
import { User } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', icon: 'fa-home' },
    { name: 'Explore', id: 'explore', icon: 'fa-search' },
    { name: 'Services', id: 'services', icon: 'fa-headset' },
    { name: 'Dashboard', id: 'dashboard', icon: 'fa-user-circle' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ name: 'Admin', id: 'admin', icon: 'fa-user-shield' });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-shield-alt text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-slate-800 hidden sm:block">Sundari Insurance</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <i className={`fas ${link.icon} mr-2`}></i>
                {link.name}
              </button>
            ))}
            {user && (
              <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 border border-red-200 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl py-2 px-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors ${
                currentPage === link.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <i className={`fas ${link.icon} mr-3`}></i>
              {link.name}
            </button>
          ))}
          {user && (
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
