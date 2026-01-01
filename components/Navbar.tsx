
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Acervo', path: '/library' },
    { name: 'Missão', path: '/about' },
    { name: 'Doar', path: '/donate' },
    { name: 'Contribuir', path: '/submit' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif tracking-tighter text-white hover:text-neutral-400 transition-colors">
              LUME<span className="font-light italic">CINEMA</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase transition-colors ${
                    location.pathname === link.path 
                    ? 'text-white font-semibold' 
                    : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-neutral-800"></div>

            {/* Member Area */}
            {isAuthenticated && user ? (
              <Link to="/profile" className="flex items-center gap-3 group">
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors text-right hidden lg:block">
                  <span className="block uppercase tracking-widest text-[10px]">Membro</span>
                  {user.name}
                </span>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-9 w-9 rounded-full border border-neutral-700 group-hover:border-white transition-colors"
                />
              </Link>
            ) : (
              <Link 
                to="/login"
                className="text-sm font-bold uppercase tracking-widest text-white border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all rounded-sm"
              >
                Entrar
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
             {isAuthenticated && user && (
                <Link to="/profile">
                  <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full" />
                </Link>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-center text-base font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-center text-base font-bold text-white bg-neutral-800 rounded-md mt-4"
              >
                ENTRAR NA CONTA
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
