/**
 * Auth Context
 * 
 * Provides authentication state and methods to the application
 */

import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout: storeLogout } = useAuthStore();

  const logout = () => {
    storeLogout();
    navigate('/login');
  };

  const value = {
    user,
    isLoading: false,
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
