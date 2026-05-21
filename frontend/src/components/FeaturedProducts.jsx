import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import CategoryButtons from './CategoryButtons';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const keyword = searchParams.get('keyword') || '';
  const activeCategory = searchParams.get('category') || 'All';

  const setActiveCategory = (category) => {
    const nextParams = {};
    if (keyword) nextParams.keyword = keyword;
    if (category && category !== 'All') nextParams.category = category;
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load products. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refreshTrigger]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || 
      product.category.toLowerCase() === activeCategory.toLowerCase();
      
    const matchesKeyword = !keyword || 
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.category.toLowerCase().includes(keyword.toLowerCase());
      
    return matchesCategory && matchesKeyword;
  });

  return (
    <section id="products" className="w-full bg-slate-950 border-t border-slate-900 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Trending Now
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-400">
              Handpicked products just for you based on our AI recommendations.
            </p>
          </div>
          <div id="categories" className="flex-shrink-0">
            <CategoryButtons 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-slate-400 text-lg font-medium">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16 bg-red-950/20 rounded-2xl border border-red-900/50 mt-8 max-w-xl mx-auto px-6">
            <svg className="h-16 w-16 mx-auto text-red-500 mb-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-400 text-lg font-semibold mb-2">Oops! Something went wrong</p>
            <p className="text-slate-400 text-base">{error}</p>
            <button 
              onClick={() => setRefreshTrigger((prev) => prev + 1)}
              className="mt-6 px-6 py-2.5 bg-red-900/40 text-red-200 font-semibold hover:bg-red-900/60 rounded-xl transition-colors text-base"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 mt-8 max-w-xl mx-auto px-6">
                <svg className="h-16 w-16 mx-auto text-slate-600 mb-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-slate-400 text-lg font-medium">
                  No products found matching "{keyword}" {activeCategory !== 'All' ? `in category "${activeCategory}"` : ''}
                </p>
                <button 
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-md text-base"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
