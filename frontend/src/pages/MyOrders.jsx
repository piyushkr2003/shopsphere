import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_URL}/api/orders/myorders`, config);
        // Sort orders by newest first
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
            Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-950 py-24">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-slate-400 text-sm font-semibold">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 text-red-400">
            <svg className="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Failed to Load Orders</h3>
            <p className="text-sm text-slate-400 mt-2">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="mx-auto w-24 h-24 bg-indigo-600/10 rounded-full flex items-center justify-center border border-indigo-500/20 text-indigo-400">
            <svg className="h-12 w-12 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">No Orders Found</h2>
            <p className="mt-3 text-slate-400 text-base leading-relaxed">
              You haven't placed any orders yet. Discover our premium AI-curated selection.
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
    <div className="flex-grow bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden hover:border-slate-750 transition-colors duration-200"
            >
              {/* Order Card Header */}
              <div className="bg-slate-950/60 px-6 py-5 border-b border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</p>
                  <p className="text-indigo-400 font-bold font-mono text-sm sm:text-base">{order._id}</p>
                </div>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Date Placed</p>
                    <p className="text-white font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Payment Method</p>
                    <p className="text-white font-bold">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Order Status</p>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>
                </div>
              </div>

              {/* Order Card Body */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items list */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Items Ordered</h3>
                  <div className="divide-y divide-slate-800/80">
                    {order.orderItems?.map((item) => (
                      <div key={item._id} className="flex justify-between items-center py-3 first:pt-0">
                        <div className="min-w-0 pr-4">
                          <p className="text-sm font-bold text-white truncate w-48 sm:w-80 md:w-96">{item.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5 font-medium">Quantity: {item.qty} @ ${item.price.toFixed(2)}</p>
                        </div>
                        <span className="text-sm font-extrabold text-white">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery details and Total */}
                <div className="lg:col-span-1 bg-slate-950/40 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 mb-3">Shipping Address</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {order.shippingAddress?.address}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
                      {order.shippingAddress?.country}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-400">Total Price</span>
                    <span className="text-2xl font-extrabold text-indigo-400">${order.totalPrice?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
