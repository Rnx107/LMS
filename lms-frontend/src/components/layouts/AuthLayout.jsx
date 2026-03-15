import { Link } from 'react-router-dom'
import { GraduationCap, ArrowLeft } from 'lucide-react'

/**
 * AuthLayout Component
 * 
 * Layout for authentication pages (login, register).
 * Provides a centered card layout with branding.
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900">
              LMS<span className="text-primary-600">Portal</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-secondary-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-secondary-500">
        <p>&copy; {new Date().getFullYear()} LMS Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AuthLayout
