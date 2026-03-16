import api from './api'

const courseService = {
  getAllCourses: async (params = {}) => {
    const response = await api.get('/courses', { params })
    return response.data
  },
  getCourseById: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`)
    return response.data
  },
  createCourse: async (courseData) => {
    const response = await api.post('/courses', courseData)
    return response.data
  },
  updateCourse: async (courseId, updates) => {
    const response = await api.patch(`/courses/${courseId}`, updates)
    return response.data
  },
  deleteCourse: async (courseId) => {
    const response = await api.delete(`/courses/${courseId}`)
    return response.data
  },
  getMyCourses: async () => {
    const response = await api.get('/courses/my-courses')
    return response.data
  },
  publishCourse: async (courseId) => {
    const response = await api.patch(`/courses/${courseId}/publish`)
    return response.data
  },
  unpublishCourse: async (courseId) => {
    const response = await api.patch(`/courses/${courseId}/unpublish`)
    return response.data
  },
}

export default courseService