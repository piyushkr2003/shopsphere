import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useContext(AuthContext);
  const location = useLocation();

  if (!token || !user) {
    // Redirect to login page and store the source page in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Redirect non-admin users to homepage
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
