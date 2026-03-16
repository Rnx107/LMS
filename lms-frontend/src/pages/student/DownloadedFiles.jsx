import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  FileText,
  Download,
  Calendar,
  BookOpen,
  Trash2,
  ExternalLink,
  FolderOpen,
  Clock,
  File,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  ArrowLeft,
} from 'lucide-react'
import { useUploads } from '../../hooks/useUploads'
import toast from 'react-hot-toast'

/**
 * DownloadedFiles Page
 * 
 * Shows the history of files downloaded by the student.
 * Allows re-downloading and managing downloaded files.
 */
const DownloadedFiles = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')

  const { downloadHistory, isLoadingDownloadHistory, downloadFile } = useUploads()

  const downloads = downloadHistory || []

  // Get unique courses from downloads
  const courses = Array.from(
    downloads
      .map((d) => ({
        id: d.course?._id || d.course,
        title: d.course?.title || d.course,
      }))
      .reduce((map, course) => {
        if (course.id) map.set(course.id, course)
        return map
      }, new Map())
      .values()
  )

  // Filter downloads
  const filteredDownloads = downloads.filter((download) => {
    const matchesSearch = download.fileName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    
    if (selectedCourse === 'all') return matchesSearch

    const courseId = download.course?._id || download.course
    return matchesSearch && courseId === selectedCourse
  })

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return FileText
    if (fileType?.includes('spreadsheet') || fileType?.includes('excel')) return FileSpreadsheet
    if (fileType?.includes('image')) return FileImage
    if (fileType?.includes('video')) return FileVideo
    return File
  }

  // Handle re-download
  const handleRedownload = async (download) => {
    try {
      await downloadFile({ _id: download.material._id, fileName: download.fileName })
      toast.success('File downloaded successfully!')
    } catch (error) {
      toast.error('Failed to download file')
    }
  }

  // Calculate stats
  const totalDownloads = downloads.length
  const uniqueFiles = new Set(downloads.map((d) => d.material._id)).size
  const totalSize = downloads.reduce((acc, d) => acc + (d.fileSize || 0), 0)

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/student/download-notes"
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-secondary-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Downloaded Files</h1>
            <p className="text-secondary-600">
              Manage and access your downloaded course materials
            </p>
          </div>
        </div>
        <Link to="/student/download-notes" className="btn-primary">
          <Download className="w-4 h-4" />
          Download More
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900">{totalDownloads}</p>
              <p className="text-sm text-secondary-500">Total Downloads</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900">{uniqueFiles}</p>
              <p className="text-sm text-secondary-500">Unique Files</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900">
                {formatFileSize(totalSize)}
              </p>
              <p className="text-sm text-secondary-500">Total Size</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search downloaded files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>

          {/* Course Filter */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary-400" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="input py-2 min-w-[200px]"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Downloads List */}
      {isLoadingDownloadHistory ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card h-20 animate-pulse">
              <div className="h-full bg-secondary-100" />
            </div>
          ))}
        </div>
      ) : filteredDownloads.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-10 h-10 text-secondary-400" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            {searchQuery || selectedCourse !== 'all'
              ? 'No files found'
              : 'No downloads yet'}
          </h3>
          <p className="text-secondary-600 mb-6 max-w-md mx-auto">
            {searchQuery || selectedCourse !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start downloading course materials to see them here'}
          </p>
          {!searchQuery && selectedCourse === 'all' && (
            <Link to="/student/download-notes" className="btn-primary">
              Browse Materials
            </Link>
          )}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-secondary-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-700">
                    File
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-700">
                    Course
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-700">
                    Downloaded
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-700">
                    Size
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-secondary-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {filteredDownloads.map((download, index) => {
                  const FileIcon = getFileIcon(download.fileType)
                  return (
                    <tr key={index} className="hover:bg-secondary-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <FileIcon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">
                              {download.fileName}
                            </p>
                            {download.fileType && (
                              <p className="text-xs text-secondary-500 uppercase">
                                {download.fileType.split('/')[1]}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-secondary-400" />
                          <span className="text-sm text-secondary-700">
                            {download.course?.title || download.course}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary-400" />
                          <span className="text-sm text-secondary-700">
                            {new Date(download.downloadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-secondary-700">
                          {download.fileSize
                            ? formatFileSize(download.fileSize)
                            : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRedownload(download)}
                            className="p-2 hover:bg-primary-100 rounded-lg text-primary-600 transition-colors"
                            title="Download again"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadFile({ _id: download.material._id, fileName: download.fileName })}
                            className="p-2 hover:bg-secondary-200 rounded-lg text-secondary-600 transition-colors"
                            title="Open file"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Format file size helper
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default DownloadedFiles
