import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-gray-900/80 backdrop-blur-lg'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Portfolio Hub
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive('/') 
                  ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">Home</span>
              {isActive('/') && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>
              )}
            </Link>
            <Link
              to="/about"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive('/about') 
                  ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">About</span>
              {isActive('/about') && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>
              )}
            </Link>
            <Link
              to="/templates"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive('/templates') 
                  ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">Templates</span>
              {isActive('/templates') && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to={`/${user?.username}`}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive(`/${user?.username}`) 
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </span>
                  {isActive(`/${user?.username}`) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>
                  )}
                </Link>
                <Link
                  to={`/${user?.username}/edit`}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive(`/${user?.username}/edit`) 
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Profile
                  </span>
                  {isActive(`/${user?.username}/edit`) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl blur-sm"></div>
                  )}
                </Link>
                
                {/* User Info */}
                <div className="flex items-center space-x-3 ml-4 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.username?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-300 hidden lg:block">Welcome, {user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="group relative px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    <span className="flex items-center">
                      <svg className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="flex items-center text-white drop-shadow-lg">
                    Get Started
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10 backdrop-blur-sm"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-3 space-y-2 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </span>
            </Link>
            <Link
              to="/about"
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                isActive('/about') 
                  ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </span>
            </Link>
            <Link
              to="/templates"
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                isActive('/templates') 
                  ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Templates
              </span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to={`/${user?.username}`}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive(`/${user?.username}`) 
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </span>
                </Link>
                <Link
                  to={`/${user?.username}/edit`}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive(`/${user?.username}/edit`) 
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Profile
                  </span>
                </Link>
                
                {/* User Info Mobile */}
                <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm mt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user?.username?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.username}</p>
                      <p className="text-sm text-gray-400">Portfolio User</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </span>
                </Link>
                <div className="px-4 py-2">
                  <Link
                    to="/login"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-white drop-shadow-lg font-semibold">Get Started</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
