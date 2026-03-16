import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import toast from 'react-hot-toast'

/**
 * CreateCourse Page
 * 
 * Multi-step form for teachers to create new courses.
 * Includes course details, content, and settings.
 */
const CreateCourse = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
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

  const { createCourse, isCreating } = useCourses()

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

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
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
    }

    if (currentStep === 2) {
      if (!formData.longDescription.trim()) {
        newErrors.longDescription = 'Detailed description is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
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
    if (validateStep(step)) {
      // Filter out empty array items
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter((r) => r.trim()),
        learningOutcomes: formData.learningOutcomes.filter((o) => o.trim()),
      }

      createCourse(cleanedData, {
        onSuccess: () => {
          toast.success('Course created successfully!')
          navigate('/teacher/courses')
        },
      })
    }
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
          <h1 className="text-2xl font-bold text-secondary-900">Create New Course</h1>
          <p className="text-secondary-600">
            Set up your course and start teaching
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card p-4">
        <div className="flex items-center justify-center">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= s
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-200 text-secondary-500'
                }`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {index < 2 && (
                <div
                  className={`w-24 h-1 mx-2 ${
                    step > s ? 'bg-primary-600' : 'bg-secondary-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 mt-2 text-sm">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-secondary-500'}>
            Basic Info
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-secondary-500'}>
            Content
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-secondary-500'}>
            Review
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-secondary-900">Basic Information</h2>
            
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
                  placeholder="e.g., Introduction to Web Development"
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
                  placeholder="e.g., CS101"
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
                placeholder="Brief overview of the course (shown in course cards)"
                rows={3}
                className={`input w-full resize-none ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                placeholder="e.g., 8 weeks or Self-paced"
                className="input w-full"
              />
            </div>
          </div>
        )}

        {/* Step 2: Content */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-secondary-900">Course Content</h2>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                placeholder="Comprehensive description of what students will learn"
                rows={6}
                className={`input w-full resize-none ${errors.longDescription ? 'border-red-500' : ''}`}
              />
              {errors.longDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.longDescription}</p>
              )}
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
                      placeholder={`Requirement ${index + 1}`}
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
                      placeholder={`Outcome ${index + 1}`}
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
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-secondary-900">Review & Publish</h2>

            <div className="bg-secondary-50 rounded-xl p-6 space-y-4">
              <div>
                <p className="text-sm text-secondary-500">Course Title</p>
                <p className="font-medium text-secondary-900">{formData.title}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Course Code</p>
                <p className="font-medium text-secondary-900">{formData.code}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Category</p>
                <p className="font-medium text-secondary-900">{formData.category}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Level</p>
                <p className="font-medium text-secondary-900 capitalize">{formData.level}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Description</p>
                <p className="text-secondary-700">{formData.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  You can save this course as a draft and publish it later from the course management page.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="publish"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
                }
                className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="publish" className="text-secondary-700">
                Publish immediately
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-secondary-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="btn-secondary disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isCreating}
              className="btn-primary disabled:opacity-50"
            >
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Create Course
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateCourse
