import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, isInitialized } = useAuthStore()
  const location = useLocation()
  
  // Wait for store to initialize before deciding
  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  // Only redirect if definitely authenticated
  if (isAuthenticated && user) {
    const from = location.state?.from?.pathname || '/'
    const redirectPath = user.role === 'teacher' 
      ? '/teacher/dashboard' 
      : '/student/dashboard'
    
    // Don't redirect if we're already going to the right place
    if (from === redirectPath) return children
    
    return <Navigate to={redirectPath} replace />
  }
  
  return children
}

export default PublicRoute