import { memo } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import useAuthStore from './stores/authStore'

// Layouts
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'
import StudentLayout from './components/layouts/StudentLayout'
import TeacherLayout from './components/layouts/TeacherLayout'

// Public Pages
import Home from './pages/public/Home'
import Courses from './pages/public/Courses'
import CourseDetails from './pages/public/CourseDetails'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Student Pages
import StudentDashboard from './pages/student/Dashboard'
import MyCourses from './pages/student/MyCourses'
import DownloadNotes from './pages/student/DownloadNotes'
import DownloadedFiles from './pages/student/DownloadedFiles'

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard'
import ManageCourses from './pages/teacher/ManageCourses'
import CreateCourse from './pages/teacher/CreateCourse'
import EditCourse from './pages/teacher/EditCourse'
import UploadNotes from './pages/teacher/UploadNotes'
import ManageMaterials from './pages/teacher/ManageMaterials'

// Shared Pages
import Profile from './pages/shared/Profile'
import Settings from './pages/shared/Settings'
import NotFound from './pages/shared/NotFound'

/**
 * Public Route Component - Memoized to prevent re-renders
 */
const PublicRoute = memo(({ children }) => {
  const { isAuthenticated, user, isInitialized } = useAuthStore()
  
  // Wait for store to initialize before deciding
  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  // Only redirect if definitely authenticated
  if (isAuthenticated && user) {
    const redirectPath = user.role === 'teacher' 
      ? '/teacher/dashboard' 
      : '/student/dashboard'
    return <Navigate to={redirectPath} replace />
  }
  
  return children
})

/**
 * Protected Route Component - Memoized to prevent re-renders
 */
const ProtectedRoute = memo(({ allowedRoles }) => {
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  
  // Wait for store to initialize before deciding
  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    const redirectPath = user?.role === 'teacher' 
      ? '/teacher/dashboard' 
      : '/student/dashboard'
    return <Navigate to={redirectPath} replace />
  }
  
  return <Outlet />
})

/**
 * App Component
 */
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
      </Route>

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']} />
        }
      >
        <Route element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="download-notes" element={<DownloadNotes />} />
          <Route path="downloaded-files" element={<DownloadedFiles />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher']} />
        }
      >
        <Route element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/edit/:courseId" element={<EditCourse />} />
          <Route path="upload-notes" element={<UploadNotes />} />
          <Route path="materials" element={<ManageMaterials />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Shared Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['student', 'teacher']} />
        }
      >
        <Route element={<Profile />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App