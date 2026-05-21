import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        setError(null);
        setQty(1);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        // Fetch current product
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);

        // Fetch related products in same category
        try {
          const relatedRes = await axios.get(`${API_URL}/api/products?category=${res.data.category}`);
          const filteredRelated = relatedRes.data
            .filter((p) => (p._id || p.id) !== id)
            .slice(0, 4);
          setRelatedProducts(filteredRelated);
        } catch (relatedErr) {
          console.error('Error fetching related products:', relatedErr);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (qty < product.countInStock) {
      setQty((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (product && product.countInStock > 0) {
      addToCart(product, qty);
    }
  };

  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="h-5 w-5 text-slate-300 dark:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-24">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Loading product details...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 text-red-500 dark:text-red-400">
            <svg className="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Product Not Found</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{error || "We couldn't retrieve the specified item details."}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.countInStock <= 0;

  return (
    <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back Navigation */}
        <Link 
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-bold mb-10 transition-colors gap-2"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Catalog
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left Column: Image wrapper */}
          <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 sm:p-8 shadow-inner relative overflow-hidden group">
            <img 
              src={product.imageUrl || product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-xl transform group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-full text-sm font-bold text-slate-800 dark:text-white flex items-center shadow border border-slate-200 dark:border-slate-800">
              <svg className="h-4 w-4 text-yellow-400 mr-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.rating || 4.5}
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block text-sm font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-xl border border-indigo-500/20">
                {product.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating stars layout */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {product.rating || 4.5} Rating
                </span>
              </div>

              <div className="text-3xl font-extrabold text-slate-900 dark:text-white pt-2">
                ${product.price.toFixed(2)}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-slate-650 dark:text-slate-350 font-medium text-base sm:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              {/* Stock Status Badge */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Status:</span>
                {isOutOfStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20">
                    Out of Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    In Stock ({product.countInStock} available)
                  </span>
                )}
              </div>

              {/* Quantity Selector & Add to Cart */}
              {!isOutOfStock && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="flex items-center justify-between sm:justify-start bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1 flex-shrink-0">
                    <button 
                      onClick={handleDecrement}
                      className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white p-2.5 transition-colors focus:outline-none"
                      aria-label="Decrease quantity"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-slate-850 dark:text-white font-bold px-6 text-lg w-12 text-center select-none">
                      {qty}
                    </span>
                    <button 
                      onClick={handleIncrement}
                      className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white p-2.5 transition-colors focus:outline-none"
                      aria-label="Increase quantity"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="flex-grow flex items-center justify-center gap-3 py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                  >
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add {qty} {qty === 1 ? 'Item' : 'Items'} to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-10 tracking-tight">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
