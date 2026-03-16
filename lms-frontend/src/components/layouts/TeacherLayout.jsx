import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  FolderOpen,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  Plus,
} from 'lucide-react'
import useAuthStore from '../../stores/authStore'

/**
 * TeacherLayout Component
 * 
 * Dashboard layout for teachers.
 * Includes sidebar navigation and top header with quick actions.
 */
const TeacherLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const isActive = (path) => location.pathname === path

  const sidebarLinks = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/teacher/courses', label: 'My Courses', icon: BookOpen },
    { path: '/teacher/upload-notes', label: 'Upload Notes', icon: Upload },
    { path: '/teacher/materials', label: 'Manage Materials', icon: FolderOpen },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      {/* Sidebar - Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-secondary-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-secondary-900">
              LMS<span className="text-primary-600">Portal</span>
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <Link
            to="/teacher/courses/create"
            className="flex items-center justify-center gap-2 w-full btn-primary"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="px-4 pb-4 space-y-1">
          <div className="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-4 px-4">
            Main Menu
          </div>
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}

          <div className="text-xs font-semibold text-secondary-400 uppercase tracking-wider mt-8 mb-4 px-4">
            Account
          </div>
          <Link
            to="/teacher/profile"
            className={`sidebar-link ${isActive('/teacher/profile') ? 'active' : ''}`}
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
          <Link
            to="/teacher/settings"
            className={`sidebar-link ${isActive('/teacher/settings') ? 'active' : ''}`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-secondary-200 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title - Mobile */}
          <h1 className="lg:hidden text-lg font-semibold text-secondary-900">
            Teacher Portal
          </h1>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Quick Actions */}
            <Link
              to="/teacher/upload-notes"
              className="hidden sm:flex items-center gap-2 btn-primary text-sm"
            >
              <Upload className="w-4 h-4" />
              Upload Notes
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-secondary-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-secondary-500">Teacher</p>
                </div>
                <ChevronDown className="w-4 h-4 text-secondary-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-20 py-1">
                    <Link
                      to="/teacher/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      to="/teacher/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <hr className="my-1 border-secondary-200" />
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        handleLogout()
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default TeacherLayout
