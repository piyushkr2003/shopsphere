import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cart, cartSubtotal, cartTax, cartTotal, clearCart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState(user?.name || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('USA');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  
  // Request states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if cart is empty on mount
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !address || !city || !postalCode || !phone) {
      setError('Please fill in all shipping details');
      return;
    }

    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        product: item._id || item.id,
      }));

      const payload = {
        orderItems,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        totalPrice: cartTotal,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${API_URL}/api/orders`, payload, config);
      
      // Order creation success, clear cart and navigate
      clearCart();
      navigate('/order-success', { state: { order: response.data } });
    } catch (err) {
      console.error('Error placing order:', err);
      const errMsg = err.response?.data?.message || err.message || 'Failed to place order. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-10 tracking-tight">Checkout</h1>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-750 dark:text-red-200 px-4 py-3 rounded-xl text-sm mb-6 max-w-3xl" role="alert">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Shipping Form & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <svg className="h-6 w-6 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Address
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Street Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    placeholder="123 Main St"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Country
                    </label>
                    <input
                      id="country"
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      placeholder="USA"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <svg className="h-6 w-6 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === 'Cash on Delivery' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50 dark:border-slate-800 dark:hover:border-slate-750 dark:bg-slate-950/50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4.5 w-4.5 text-indigo-600 border-slate-300 dark:border-slate-800 focus:ring-indigo-500 bg-white dark:bg-slate-950"
                    />
                    <span className="font-bold text-slate-850 dark:text-white text-base">Cash on Delivery</span>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === 'Demo Payment' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50 dark:border-slate-800 dark:hover:border-slate-750 dark:bg-slate-950/50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Demo Payment"
                      checked={paymentMethod === 'Demo Payment'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4.5 w-4.5 text-indigo-600 border-slate-300 dark:border-slate-800 focus:ring-indigo-500 bg-white dark:bg-slate-950"
                    />
                    <span className="font-bold text-slate-850 dark:text-white text-base">Demo Payment</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl shadow-2xl sticky top-28 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">Review Items</h2>
              
              {/* Mini Cart List */}
              <div className="max-h-60 overflow-y-auto pr-1 space-y-4 divide-y divide-slate-200 dark:divide-slate-800/80">
                {cart.map((item) => (
                  <div key={item._id || item.id} className="flex gap-4 items-center justify-between py-3 first:pt-0">
                    <div className="flex gap-3 items-center min-w-0">
                      <img 
                        src={item.imageUrl || item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-100 dark:bg-slate-950 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate w-32 sm:w-40">{item.name}</h4>
                        <p className="text-xs text-slate-550 dark:text-slate-400 mt-0.5 font-medium">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Totals */}
              <div className="space-y-4 text-slate-650 dark:text-slate-300 font-medium pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-900 dark:text-white">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-900 dark:text-white">Order Total</span>
                  <span className="text-indigo-605 dark:text-indigo-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Placing Order...
                    </div>
                  ) : (
                    `Place Order - $${cartTotal.toFixed(2)}`
                  )}
                </button>
                <div className="mt-4 text-center">
                  <Link 
                    to="/cart" 
                    className="text-sm font-semibold text-slate-550 hover:text-indigo-605 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-block"
                  >
                    Edit Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
