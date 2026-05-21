import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const { register, loading, error, setError, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear context errors on load
  useEffect(() => {
    if (setError) setError(null);
  }, [setError]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
    } catch (err) {
      // Error is already handled/set in AuthContext
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-md w-full space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-white tracking-tight">
            Create account
          </h2>
          <p className="mt-3 text-center text-base text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {(localError || error) && (
          <div className="bg-red-950/20 border border-red-900/50 text-red-200 px-4 py-3 rounded-xl text-sm" role="alert">
            <span className="font-bold">Error:</span> {localError || error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 placeholder-slate-600 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-semibold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 placeholder-slate-600 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 placeholder-slate-600 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 placeholder-slate-600 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-colors shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Registering...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
