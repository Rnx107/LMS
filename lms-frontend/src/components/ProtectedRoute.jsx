/**
 * Protected Route Component
 * 
 * Guards routes based on authentication status and user role
 */

import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { LoadingSpinner } from './LoadingSpinner';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === 'teacher' 
      ? '/teacher/dashboard' 
      : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />;
};
