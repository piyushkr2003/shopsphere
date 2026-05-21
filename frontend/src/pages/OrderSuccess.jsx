import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="flex-grow flex items-center justify-center bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 text-green-400">
          <svg className="h-12 w-12 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Order Placed Successfully!</h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg leading-relaxed">
            Thank you for shopping with ShopSphere AI. Your order is now being processed.
          </p>
        </div>

        {order && (
          <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl text-left space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-850 pb-2">
              <span className="text-slate-400 font-semibold">Order ID:</span>
              <span className="text-indigo-400 font-bold font-mono">{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">Payment Method:</span>
              <span className="text-white font-bold">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">Shipping Address:</span>
              <span className="text-white font-medium text-right">
                {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-850 font-bold text-base">
              <span className="text-white">Amount Paid:</span>
              <span className="text-indigo-400">${order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/my-orders"
            className="flex-1 inline-flex items-center justify-center py-4 px-6 border border-slate-800 hover:border-slate-700 text-base font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
