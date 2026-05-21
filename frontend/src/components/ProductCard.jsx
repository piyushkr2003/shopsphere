import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group w-full bg-slate-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-800 flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-slate-850 flex-shrink-0">
        <img
          src={product.imageUrl || product.image}
          alt={product.name}
          className="w-full h-72 object-cover transform group-hover:scale-102 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-5 right-5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold text-white flex items-center shadow border border-slate-800">
          <svg className="h-4 w-4 text-yellow-400 mr-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {product.rating || 4.5}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2.5 flex-shrink-0">
          {product.category}
        </div>
        <h3 className="text-xl font-bold text-white mb-5 line-clamp-2 leading-snug flex-grow">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-800 flex-shrink-0">
          <span className="text-2xl font-extrabold text-white">
            ${product.price.toFixed(2)}
          </span>
          <button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl p-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 shadow flex items-center justify-center"
            aria-label="Add to cart"
          >
            <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
