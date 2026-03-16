import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Clock, CheckCircle } from 'lucide-react'
import { useEnrollments } from '../../hooks/useEnrollment'

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { enrollments, isLoadingEnrollments } = useEnrollments()

  const filteredEnrollments = enrollments.filter((e) =>
    e.course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">Manage your learning journey</p>
        </div>
        <Link to="/courses" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Browse More Courses
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search your courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {isLoadingEnrollments ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <Link to="/courses" className="text-blue-600 hover:underline">Browse Courses</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEnrollments.map((enrollment) => (
            <div key={enrollment._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="p-4">
                  {enrollment.status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      <Clock className="w-3 h-3" /> In Progress
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{enrollment.course.title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${enrollment.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{enrollment.progress || 0}%</span>
                </div>
                <Link
                  to={`/courses/${enrollment.course._id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCourses