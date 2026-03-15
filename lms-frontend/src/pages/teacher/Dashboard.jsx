import { Link } from 'react-router-dom'
import {
  BookOpen,
  Users,
  Upload,
  TrendingUp,
  Plus,
  Eye,
  ChevronRight,
  FileText,
  Star,
  BarChart3,
} from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import { useUploads } from '../../hooks/useUploads'
import useAuthStore from '../../stores/authStore'

/**
 * TeacherDashboard Page
 */
const TeacherDashboard = () => {
  const { user } = useAuthStore()
  const { myCourses, isLoadingMyCourses } = useCourses()
  const { myUploads, isLoadingMyUploads } = useUploads()

  // Calculate statistics
  const totalCourses = myCourses.length
  const publishedCourses = myCourses.filter((c) => c.isPublished).length
  const draftCourses = myCourses.filter((c) => !c.isPublished).length
  const totalStudents = myCourses.reduce(
    (acc, course) => acc + (course.enrollmentCount || 0),
    0
  )
  const totalMaterials = myUploads.length

  // Get recent courses (last 3)
  const recentCourses = myCourses.slice(0, 3)

  const stats = [
    {
      label: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      link: '/teacher/courses',
    },
    {
      label: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-green-100 text-green-600',
      link: '/teacher/courses',
    },
    {
      label: 'Materials',
      value: totalMaterials,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      link: '/teacher/materials',
    },
    {
      label: 'Avg. Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/teacher/courses',
    },
  ]

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-primary-100">
              You have {totalStudents} students learning from your {totalCourses} courses.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/teacher/courses/create"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-medium hover:bg-primary-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </Link>
            <Link
              to="/teacher/upload-notes"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload Notes
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="card p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary-500 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Courses */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary-900">My Courses</h2>
                <Link
                  to="/teacher/courses"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="p-6">
              {isLoadingMyCourses ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-secondary-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : recentCourses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">
                    No courses yet
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Create your first course to start teaching
                  </p>
                  <Link to="/teacher/courses/create" className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Create Course
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <TeacherCourseCard key={course._id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </section>

          
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-bold text-secondary-900">Performance Overview</h2>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-secondary-900">{totalStudents}</p>
                  <p className="text-sm text-secondary-500">Total Enrollments</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-secondary-900">{publishedCourses}</p>
                  <p className="text-sm text-secondary-500">Published Courses</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-secondary-900">
                    {totalStudents > 0 ? Math.round(totalStudents / totalCourses) : 0}
                  </p>
                  <p className="text-sm text-secondary-500">Avg. Students/Course</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-bold text-secondary-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <Link
                to="/teacher/courses/create"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Create New Course</p>
                  <p className="text-sm text-secondary-500">Add a new course</p>
                </div>
              </Link>
              <Link
                to="/teacher/upload-notes"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Upload Materials</p>
                  <p className="text-sm text-secondary-500">Share course content</p>
                </div>
              </Link>
              <Link
                to="/teacher/materials"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Manage Materials</p>
                  <p className="text-sm text-secondary-500">Organize your uploads</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Recent Uploads */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary-900">Recent Uploads</h2>
                <Link
                  to="/teacher/materials"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {isLoadingMyUploads ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-secondary-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : myUploads.length === 0 ? (
                <p className="text-center text-secondary-500 py-4">
                  No uploads yet
                </p>
              ) : (
                <div className="space-y-3">
                  {myUploads.slice(0, 5).map((upload, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-50"
                    >
                      <div className="w-8 h-8 bg-secondary-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-secondary-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {upload.title}
                        </p>
                        <p className="text-xs text-secondary-500">{upload.course?.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Tips */}
          <section className="card p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">
                  Teaching Tip
                </h3>
                <p className="text-sm text-yellow-700">
                  Regularly updating your course materials helps keep students engaged 
                  and improves course ratings.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/**
 * TeacherCourseCard Component
 * 
 * Displays a teacher's course with stats and actions.
 */
const TeacherCourseCard = ({ course }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-xl">
      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-secondary-900 truncate">{course.title}</h3>
          {course.isPublished ? (
            <span className="badge-success text-xs">Published</span>
          ) : (
            <span className="badge-warning text-xs">Draft</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-secondary-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrollmentCount || 0} students</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{course.materialCount || 0} materials</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{course.rating || '4.5'}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to={`/courses/${course._id}`}
          className="p-2 hover:bg-secondary-200 rounded-lg transition-colors"
          title="Preview"
        >
          <Eye className="w-5 h-5 text-secondary-500" />
        </Link>
        <Link
          to={`/teacher/courses/edit/${course._id}`}
          className="p-2 hover:bg-secondary-200 rounded-lg transition-colors"
          title="Edit"
        >
          <ChevronRight className="w-5 h-5 text-secondary-500" />
        </Link>
      </div>
    </div>
  )
}

export default TeacherDashboard
