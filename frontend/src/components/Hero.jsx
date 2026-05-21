import React from 'react';

const Hero = () => {
  return (
    <div className="w-full bg-slate-950 overflow-hidden flex-shrink-0">
      <div className="max-w-7xl mx-auto px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Smarter shopping with <span className="text-indigo-500">AI-powered picks</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Discover products tailored perfectly to your style and needs. ShopSphere AI uses advanced algorithms to curate the best items just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/25"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 transition-all"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full max-w-xl lg:max-w-none mx-auto z-10 mt-10 lg:mt-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10">
            <img
              className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-700"
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1350&q=80"
              alt="Woman shopping with bags"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
          </div>
          <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl -z-10 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
