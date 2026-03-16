import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Trash2,
} from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import toast from 'react-hot-toast'

/**
 * EditCourse Page
 * 
 * Allows teachers to edit existing courses.
 * Provides the same form as create but with pre-filled data.
 */
const EditCourse = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { useCourse, updateCourse, isUpdating } = useCourses()

  const { data: courseData, isLoading } = useCourse(courseId)
  const course = courseData?.data

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    longDescription: '',
    category: '',
    level: 'beginner',
    duration: '',
    requirements: [''],
    learningOutcomes: [''],
    isPublished: false,
  })
  const [errors, setErrors] = useState({})

  // Populate form when course data loads
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        code: course.code || '',
        description: course.description || '',
        longDescription: course.longDescription || '',
        category: course.category || '',
        level: course.level || 'beginner',
        duration: course.duration || '',
        requirements: course.requirements?.length ? course.requirements : [''],
        learningOutcomes: course.learningOutcomes?.length ? course.learningOutcomes : [''],
        isPublished: course.isPublished || false,
      })
    }
  }, [course])

  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Business',
    'Marketing',
    'Other',
  ]

  const levels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required'
    }
    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter((r) => r.trim()),
        learningOutcomes: formData.learningOutcomes.filter((o) => o.trim()),
      }

      updateCourse(
        { courseId, updates: cleanedData },
        {
          onSuccess: () => {
            toast.success('Course updated successfully!')
            navigate('/teacher/courses')
          },
        }
      )
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-secondary-200 rounded w-1/3" />
        <div className="card h-96 bg-secondary-100" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-secondary-900">Course not found</h2>
        <Link to="/teacher/courses" className="btn-primary mt-4">
          Back to Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/teacher/courses"
          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-secondary-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Edit Course</h1>
          <p className="text-secondary-600">Update your course details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`input w-full ${errors.code ? 'border-red-500' : ''}`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`input w-full resize-none ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Detailed Description
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={6}
            className="input w-full resize-none"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input w-full ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Difficulty Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="input w-full"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Requirements
          </label>
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) =>
                    handleArrayChange('requirements', index, e.target.value)
                  }
                  className="input flex-1"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('requirements', index)}
                    className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem('requirements')}
            className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            + Add Requirement
          </button>
        </div>

        {/* Learning Outcomes */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Learning Outcomes
          </label>
          <div className="space-y-2">
            {formData.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) =>
                    handleArrayChange('learningOutcomes', index, e.target.value)
                  }
                  className="input flex-1"
                />
                {formData.learningOutcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('learningOutcomes', index)}
                    className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem('learningOutcomes')}
            className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            + Add Outcome
          </button>
        </div>

        {/* Publish Status */}
        <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-xl">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
            }
            className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="isPublished" className="text-secondary-700">
            Publish this course (make it visible to students)
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-secondary-200">
          <Link to="/teacher/courses" className="btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isUpdating}
            className="btn-primary disabled:opacity-50"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCourse
