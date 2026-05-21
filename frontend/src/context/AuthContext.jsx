import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    const storedToken = localStorage.getItem('userToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      const { token: receivedToken, ...userInfo } = response.data;
      
      setUser(userInfo);
      setToken(receivedToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('userToken', receivedToken);
      return userInfo;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      
      const { token: receivedToken, ...userInfo } = response.data;
      
      setUser(userInfo);
      setToken(receivedToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('userToken', receivedToken);
      return userInfo;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Registration failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
