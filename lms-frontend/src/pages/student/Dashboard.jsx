import { Link } from 'react-router-dom'
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  ChevronRight,
  FileText,
  Download,
} from 'lucide-react'
import { useEnrollments } from '../../hooks/useEnrollments'
import { useUploads } from '../../hooks/useUploads'
import useAuthStore from '../../stores/authStore'

/**
 * StudentDashboard Page
 */
const StudentDashboard = () => {
  const { user } = useAuthStore()
  const { enrollments, isLoadingEnrollments } = useEnrollments()
  const { downloadHistory, isLoadingDownloadHistory } = useUploads()

  // Calculate statistics
  const totalCourses = enrollments.length
  const completedCourses = enrollments.filter((e) => e.status === 'Completed').length
  const inProgressCourses = enrollments.filter((e) => e.status === 'Active').length
  const totalDownloads = downloadHistory?.length || 0

  // Get recent courses (last 3)
  const recentCourses = enrollments.slice(0, 3)

  // Get recent downloads (last 3)
  const recentDownloads = downloadHistory?.slice(0, 3) || []

  // Generate recent activities from actual data
  const recentActivities = [
    // Recent enrollments
    ...enrollments.slice(0, 2).map(enrollment => ({
      icon: BookOpen,
      iconColor: "bg-blue-100 text-blue-600",
      title: `Enrolled in ${enrollment.course?.title || 'a course'}`,
      time: enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : "Recently",
      date: new Date(enrollment.createdAt || Date.now()),
      type: "enrollment"
    })),
    // Recent downloads
    ...recentDownloads.slice(0, 2).map(download => ({
      icon: Download,
      iconColor: "bg-green-100 text-green-600",
      title: `Downloaded ${download.fileName || 'a file'}`,
      time: download.downloadedAt ? new Date(download.downloadedAt).toLocaleDateString() : "Recently",
      date: new Date(download.downloadedAt || Date.now()),
      type: "download"
    }))
  ]
  .sort((a, b) => b.date - a.date) // Sort by most recent first
  .slice(0, 4) // Limit to 4 activities

  const stats = [
    {
      label: 'Enrolled Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      link: '/student/my-courses',
    },
    {
      label: 'In Progress',
      value: inProgressCourses,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/student/my-courses',
    },
    {
      label: 'Completed',
      value: completedCourses,
      icon: Award,
      color: 'bg-green-100 text-green-600',
      link: '/student/my-courses',
    },
    {
      label: 'Downloads',
      value: totalDownloads,
      icon: Download,
      color: 'bg-purple-100 text-purple-600',
      link: '/student/downloaded-files',
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
              Continue your learning journey. You have {inProgressCourses} courses in progress.
            </p>
          </div>
          <Link
            to="/student/my-courses"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Continue Learning
            <ChevronRight className="w-5 h-5" />
          </Link>
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
          {/* Recent Courses */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary-900">My Courses</h2>
                <Link
                  to="/student/my-courses"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="p-6">
              {isLoadingEnrollments ? (
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
                    Start learning by enrolling in a course
                  </p>
                  <Link to="/courses" className="btn-primary">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCourses.map((enrollment) => (
                    <CourseProgressCard
                      key={enrollment._id}
                      enrollment={enrollment}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-bold text-secondary-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {recentActivities.length === 0 ? (
                <p className="text-center text-secondary-500 py-4">
                  No recent activity yet
                </p>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <ActivityItem
                      key={index}
                      icon={activity.icon}
                      iconColor={activity.iconColor}
                      title={activity.title}
                      time={activity.time}
                    />
                  ))}
                </div>
              )}
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
                to="/courses"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Find Courses</p>
                  <p className="text-sm text-secondary-500">Browse all courses</p>
                </div>
              </Link>
              <Link
                to="/student/download-notes"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Download Notes</p>
                  <p className="text-sm text-secondary-500">Access course materials</p>
                </div>
              </Link>
              <Link
                to="/student/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">Track Progress</p>
                  <p className="text-sm text-secondary-500">View your statistics</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Calendar */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-bold text-secondary-900">Upcoming</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-primary-600 font-medium">MAR</span>
                    <span className="text-lg font-bold text-primary-600">15</span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Assignment Due</p>
                    <p className="text-sm text-secondary-500">Web Engineering</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-green-600 font-medium">MAR</span>
                    <span className="text-lg font-bold text-green-600">18</span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Quiz: Database Systems</p>
                    <p className="text-sm text-secondary-500">10:00 AM - 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-600 font-medium">MAR</span>
                    <span className="text-lg font-bold text-purple-600">22</span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Project Submission</p>
                    <p className="text-sm text-secondary-500">Software Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Downloads */}
          <section className="card">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary-900">Recent Downloads</h2>
                <Link
                  to="/student/downloaded-files"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {isLoadingDownloadHistory ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-secondary-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : recentDownloads.length === 0 ? (
                <p className="text-center text-secondary-500 py-4">
                  No downloads yet
                </p>
              ) : (
                <div className="space-y-3">
                  {recentDownloads.map((download, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-50"
                    >
                      <div className="w-8 h-8 bg-secondary-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-secondary-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {download.fileName}
                        </p>
                        <p className="text-xs text-secondary-500">{download.course?.title || download.course}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/**
 * CourseProgressCard Component
 * 
 * Displays a course with its progress bar.
 */
const CourseProgressCard = ({ enrollment }) => {
  const course = enrollment.course
  const progress = enrollment.progress || 0

  return (
    <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-xl">
      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-secondary-900 truncate">{course.title}</h3>
        <p className="text-sm text-secondary-500 mb-2">
          {course.teacher?.firstName} {course.teacher?.lastName}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-secondary-700">{progress}%</span>
        </div>
      </div>
      <Link
        to={`/courses/${course._id}`}
        className="p-2 hover:bg-secondary-200 rounded-lg transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-secondary-400" />
      </Link>
    </div>
  )
}

/**
 * ActivityItem Component
 * 
 * Displays a single activity item.
 */
const ActivityItem = ({ icon: Icon, iconColor, title, time }) => (
  <div className="flex items-start gap-3">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-secondary-900">{title}</p>
      <p className="text-xs text-secondary-500">{time}</p>
    </div>
  </div>
)

export default StudentDashboard
