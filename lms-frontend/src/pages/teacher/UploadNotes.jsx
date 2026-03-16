import { useState, useRef } from 'react'
import { Upload, File, X, UploadCloud  } from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import { useUploads } from '../../hooks/useUploads'
import toast from 'react-hot-toast'

const UploadNotes = () => {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const fileInputRef = useRef(null)

  const { myCourses } = useCourses()
  const { uploadMaterial, isUploading } = useUploads()

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedCourse) {
      toast.error('Please select a course')
      return
    }
    if (!title.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file')
      return
    }

    for (const file of selectedFiles) {
      await uploadMaterial({
        courseId: selectedCourse,
        file,
        metadata: { title, description },
        onProgress: (progress) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: progress }))
        },
      })
    }

    setSelectedCourse('')
    setTitle('')
    setDescription('')
    setSelectedFiles([])
    setUploadProgress({})
    toast.success('Files uploaded successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Notes</h1>
        <p className="text-gray-600">Share materials with your students</p>
      </div>

      <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Choose a course...</option>
            {myCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Week 1 Lecture Notes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files *</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400"
          >
            <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
            <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">Drag and drop files here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <File className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  {uploadProgress[file.name] !== undefined && (
                    <div className="mt-1 h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                  )}
                </div>
                <button type="button" onClick={() => removeFile(index)} className="text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => { setSelectedCourse(''); setTitle(''); setDescription(''); setSelectedFiles([]) }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadNotes