import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, FileText, Download, BookOpen } from 'lucide-react'
import { useEnrollments } from '../../hooks/useEnrollment'
import { useCourses } from '../../hooks/useCourses'
import { useUploads } from '../../hooks/useUploads'
import toast from 'react-hot-toast'

const DownloadNotes = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const { enrollments } = useEnrollments()
  const { myCourses } = useCourses()
  const { useCourseMaterials, downloadFile } = useUploads()

  // Combine enrolled courses and taught courses
  const allCourses = [
    ...enrollments.map(e => ({ ...e.course, enrollment: e })),
    ...myCourses?.data?.filter(course => 
      !enrollments.some(e => e.course._id === course._id)
    ) || []
  ]

  // When "all" is selected, we need to fetch materials for all available courses
  const allMaterialsQueries = allCourses.map(course => 
    useCourseMaterials(course._id)
  )

  const isLoadingAll = allMaterialsQueries.some(query => query.isLoading)
  const allMaterialsData = allMaterialsQueries
    .filter(query => query.data?.data)
    .flatMap(query => query.data.data)

  const { data: materialsData, isLoading: isLoadingSingle } = useCourseMaterials(
    selectedCourse !== 'all' ? selectedCourse : null
  )

  const materials = selectedCourse === 'all' 
    ? allMaterialsData 
    : (materialsData?.data || [])
  
  const isLoading = selectedCourse === 'all' ? isLoadingAll : isLoadingSingle

  const filteredMaterials = materials.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDownload = async (material) => {
    try {
      await downloadFile(material)
    } catch (error) {
      toast.error('Failed to download')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Download Notes</h1>
          <p className="text-gray-600">Access your course materials</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Courses</option>
          {allCourses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No materials found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMaterials.map((material) => (
            <div key={material._id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{material.title}</h3>
                <p className="text-sm text-gray-500">{material.course?.title}</p>
              </div>
              <button
                onClick={() => handleDownload(material)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DownloadNotes