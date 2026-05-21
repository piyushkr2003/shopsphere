import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex-grow max-w-7xl mx-auto px-8 py-20 w-full bg-slate-950">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-6">User Dashboard</h1>
        <p className="text-slate-400 text-lg mb-8">This is a protected page. Only authenticated users can access it.</p>
        <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl mb-8 space-y-3">
          <p className="text-slate-300"><span className="font-bold text-white">Name:</span> {user?.name}</p>
          <p className="text-slate-300"><span className="font-bold text-white">Email:</span> {user?.email}</p>
          <p className="text-slate-300"><span className="font-bold text-white">Role:</span> <span className="bg-indigo-600/30 text-indigo-400 font-bold px-2 py-0.5 rounded text-sm">{user?.role}</span></p>
        </div>
        <button 
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-red-600/25"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
