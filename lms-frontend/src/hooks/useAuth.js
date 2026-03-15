/**
 * Authentication Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import toast from 'react-hot-toast'
import authService from '../services/auth.service'
import useAuthStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api';

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { login: storeLogin, logout: storeLogout } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await authService.login(email, password)
        return response.data
      } catch (error) {
        // Return error instead of throwing to prevent crash
        return { 
          success: false, 
          error: error.response?.data?.message || error.message,
          _isError: true 
        }
      }
    },

    onSuccess: (data) => {
      // Check if this is actually an error
      if (data._isError) {
        console.log('Login error (returned as success):', data.error)
        return // Don't navigate, don't update store
      }

      // Handle different response formats
      let userData
      if (data.data && data.data.user) {
        userData = data.data
      } else if (data.user) {
        userData = data
      } else {
        console.log('Login error or invalid response:', data)
        return // Don't navigate, don't update store
      }

      console.log('Login success:', data)
      storeLogin(userData.user, userData.accessToken)
      queryClient.setQueryData(['auth', 'me'], userData.user)
      // Remove success toast to prevent double navigation

      setTimeout(() => {
        const targetPath = userData.user.role === 'teacher' 
          ? '/teacher/dashboard' 
          : '/student/dashboard'
        navigate(targetPath, { replace: true })
      }, 100)
    },

    throwOnError: false,
  })

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await authService.register(userData)
        return response.data
      } catch (error) {
        // Return error instead of throwing to prevent crash
        return { 
          success: false, 
          error: error.response?.data?.message || error.message,
          _isError: true 
        }
      }
    },

    onSuccess: (data) => {
      // Check if this is actually an error
      if (data._isError) {
        console.log('Register error (returned as success):', data.error)
        return // Don't navigate, don't update store
      }

      // Handle different response formats
      let userData
      if (data.data && data.data.user) {
        userData = data.data
      } else if (data.user) {
        userData = data
      } else {
        console.log('Register error or invalid response:', data)
        return // Don't navigate, don't update store
      }

      console.log('Register success:', data)
      storeLogin(userData.user, userData.accessToken)
      queryClient.setQueryData(['auth', 'me'], userData.user)

      setTimeout(() => {
        const targetPath = userData.user.role === 'teacher' 
          ? '/teacher/dashboard' 
          : '/student/dashboard'
        navigate(targetPath, { replace: true })
      }, 100)
    },

    throwOnError: false,
  })

  const changePasswordMutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const response = await authService.changePassword(currentPassword, newPassword)
      return response.data
    },
    onSuccess: () => {
      toast.success('Password changed successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to change password')
    },
  })

  // Stable callback reference
  // Use mutateAsync so callers can await and inspect the result
  const login = useCallback((credentials, options) => {
    return loginMutation.mutateAsync(credentials, options)
  }, [loginMutation])

  // Check if last result was an error
  const lastResult = loginMutation.data
  const isLoginError = lastResult?._isError === true
  const loginError = isLoginError ? { message: lastResult.error } : loginMutation.error

  // Stable callback reference for register
  const register = useCallback((userData, options) => {
    return registerMutation.mutateAsync(userData, options)
  }, [registerMutation])

  // Check if last register result was an error
  const lastRegisterResult = registerMutation.data
  const isRegisterError = lastRegisterResult?._isError === true
  const registerError = isRegisterError ? { message: lastRegisterResult.error } : registerMutation.error

  // Stable callback reference for change password
  const changePassword = useCallback((data, options) => {
    return changePasswordMutation.mutateAsync(data, options)
  }, [changePasswordMutation])

  return {
    login,
    register,
    changePassword,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    loginError,
    registerError,
    isLoginError,
    isRegisterError,
  }
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me')
      return data.data
    },
    enabled: !!useAuthStore.getState().token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/logout');
      return data;
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
    },
    throwOnError: false,
  });
};