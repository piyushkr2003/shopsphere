import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartTax, 
    cartTotal, 
    cartCount 
  } = useContext(CartContext);

  const handleDecrement = (item) => {
    const itemId = item._id || item.id;
    if (item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleIncrement = (item) => {
    const itemId = item._id || item.id;
    updateQuantity(itemId, item.quantity + 1);
  };

  if (cart.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="mx-auto w-24 h-24 bg-indigo-600/10 rounded-full flex items-center justify-center border border-indigo-500/20 text-indigo-605 dark:text-indigo-400">
            <svg className="h-12 w-12 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Cart is Empty</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Looks like you haven't added anything to your cart yet. Discover our premium AI-curated products.
            </p>
          </div>
          <div>
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-10 tracking-tight">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div 
                  key={itemId}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl gap-6 hover:border-slate-350 dark:hover:border-slate-700 transition-colors duration-200"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <img 
                      src={item.imageUrl || item.image} 
                      alt={item.name} 
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-slate-200 dark:border-slate-850 flex-shrink-0 bg-slate-100 dark:bg-slate-950"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-white truncate pr-4">
                        {item.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 sm:mt-1.5 font-medium">
                        Unit Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 border-slate-205 dark:border-slate-800/80 pt-4 sm:pt-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-2 py-1">
                      <button 
                        onClick={() => handleDecrement(item)}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 transition-colors focus:outline-none"
                        aria-label="Decrease quantity"
                      >
                        <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-slate-850 dark:text-white font-bold px-4 text-base w-8 text-center select-none">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleIncrement(item)}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 transition-colors focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[90px]">
                      <span className="block text-lg font-extrabold text-slate-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(itemId)}
                      className="text-slate-450 hover:text-red-500 p-2 rounded-xl hover:bg-red-500/10 transition-all focus:outline-none"
                      aria-label="Remove item"
                    >
                      <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl sticky top-28 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">Order Summary</h2>
              
              <div className="space-y-4 text-slate-650 dark:text-slate-300 font-medium">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="text-slate-900 dark:text-white">{cartCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-900 dark:text-white">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-slate-205 dark:border-slate-800/80">
                  <span className="text-slate-900 dark:text-white">Order Total</span>
                  <span className="text-indigo-605 dark:text-indigo-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/checkout"
                  className="w-full flex justify-center py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 text-center"
                >
                  Proceed to Checkout
                </Link>
                <div className="mt-4 text-center">
                  <Link 
                    to="/" 
                    className="text-sm font-semibold text-slate-500 hover:text-indigo-605 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
