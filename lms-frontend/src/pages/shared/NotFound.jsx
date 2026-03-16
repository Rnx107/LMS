import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, GraduationCap } from 'lucide-react'
import useAuthStore from '../../stores/authStore'

/**
 * NotFound Page
 * 
 * 404 error page displayed when a route doesn't exist.
 * Provides navigation options to get back on track.
 */
const NotFound = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  const getHomeLink = () => {
    if (!isAuthenticated) return '/'
    return user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-secondary-900">
            LMS<span className="text-primary-600">Portal</span>
          </span>
        </Link>

        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-primary-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-secondary-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link to={getHomeLink()} className="btn-primary">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-500 mb-4">
            Need help? Try these links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Browse Courses
            </Link>
            <span className="text-secondary-300">|</span>
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Dashboard
                </Link>
                <span className="text-secondary-300">|</span>
                <Link
                  to={user?.role === 'teacher' ? '/teacher/profile' : '/student/profile'}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Login
                </Link>
                <span className="text-secondary-300">|</span>
                <Link
                  to="/register"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
