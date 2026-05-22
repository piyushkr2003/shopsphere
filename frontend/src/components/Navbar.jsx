import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const category = searchParams.get('category');
    if (window.location.pathname !== '/') {
      const params = new URLSearchParams();
      if (val) params.set('keyword', val);
      if (category && category !== 'All') params.set('category', category);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      navigate(`/${queryStr}`);
    } else {
      const nextParams = {};
      if (val) nextParams.keyword = val;
      if (category && category !== 'All') nextParams.category = category;
      setSearchParams(nextParams);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ShopSphere
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile, visible on md and up */}
        <form onSubmit={handleFormSubmit} className="hidden md:flex flex-1 items-center justify-center px-16">
          <div className="w-full max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={handleChange}
              placeholder="Search for products..."
              className="block w-full pl-12 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base transition-colors"
            />
          </div>
        </form>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition-colors focus:outline-none"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Link to="/cart" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative flex items-center" title="Cart">
            <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-indigo-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-slate-950">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/my-orders" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors text-base flex items-center">
                My Orders
              </Link>
              <Link to="/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors text-base flex items-center">
                <svg className="h-5 w-5 mr-1.5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {user.name}
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors text-base"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors text-base">
                Log in
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors text-base shadow-lg shadow-indigo-600/25">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition-colors focus:outline-none"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none p-2"
          >
            <svg className="h-7 w-7 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-8 py-6 space-y-5 shadow-xl absolute w-full left-0 z-45">
          <form onSubmit={handleFormSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={handleChange}
              placeholder="Search for products..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-base"
            />
          </form>
          <div className="flex flex-col space-y-4">
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold py-2 flex items-center text-base">
              <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart ({cartCount})
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold py-2 text-base block">
                  Dashboard ({user.name})
                </Link>
                <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold py-2 text-base block">
                  My Orders
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="bg-slate-100 dark:bg-indigo-600/20 text-slate-700 dark:text-indigo-400 font-bold w-full py-3 rounded-xl hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-indigo-650 dark:hover:text-white transition-colors text-base"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold py-2 text-base block">Log in</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-indigo-600 dark:text-indigo-450 font-bold py-2 text-base block">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
