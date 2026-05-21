import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <a href="/" className="text-3xl font-extrabold text-white tracking-tight">
            ShopSphere<span className="text-indigo-500">AI</span>
          </a>
        </div>

        {/* Search Bar - Hidden on mobile, visible on md and up */}
        <div className="hidden md:flex flex-1 items-center justify-center px-16">
          <div className="w-full max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              className="block w-full pl-12 pr-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-950 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base transition-colors"
            />
          </div>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/cart" className="text-slate-300 hover:text-white transition-colors relative flex items-center">
            <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-2 bg-indigo-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-950">
              3
            </span>
          </a>
          <a href="/login" className="text-slate-300 hover:text-white font-semibold transition-colors text-base">
            Log in
          </a>
          <a href="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors text-base shadow-lg shadow-indigo-600/25">
            Sign Up
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-300 hover:text-white focus:outline-none p-2"
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
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-8 py-6 space-y-5 shadow-xl absolute w-full left-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-base"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <a href="/cart" className="text-slate-300 hover:text-white font-semibold py-2 flex items-center text-base">
              <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart (3)
            </a>
            <a href="/login" className="text-slate-300 hover:text-white font-semibold py-2 text-base">Log in</a>
            <a href="/signup" className="text-indigo-400 font-bold py-2 text-base">Sign Up</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
