import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, User, Users, CheckCircle } from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import { useEnrollments } from '../../hooks/useEnrollment'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const CourseDetails = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { useCourse } = useCourses()
  const { enroll, isEnrolling, useCheckEnrollment } = useEnrollments()

  const { data: courseData, isLoading } = useCourse(courseId)
  const { data: enrollmentData } = useCheckEnrollment(courseId)

  const course = courseData?.data
  const isEnrolled = enrollmentData?.enrolled

  const handleEnroll = () => {
    if (!user) {
      toast.error('Please login to enroll')
      navigate('/login')
      return
    }
    if (user.role !== 'student') {
      toast.error('Only students can enroll')
      return
    }
    enroll(courseId)
  }

  if (isLoading) {
    return <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <Link to="/courses" className="text-blue-600 hover:underline">Browse Courses</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/courses" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-blue-100 mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{course.teacher?.firstName} {course.teacher?.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrollmentCount || 0} students</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-gray-900">
              {isEnrolled ? (
                <>
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">You're enrolled!</span>
                  </div>
                  <Link to="/student/dashboard" className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="block w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Course</h2>
            <p className="text-gray-600">{course.longDescription || course.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails