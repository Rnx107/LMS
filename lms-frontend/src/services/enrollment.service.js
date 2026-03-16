import api from './api'

const enrollmentService = {
  enroll: async (courseId) => {
    const response = await api.post('/enrollments', { courseId })
    return response.data
  },
  unenroll: async (courseId) => {
    const response = await api.delete(`/enrollments/${courseId}`)
    return response.data
  },
  getMyEnrollments: async () => {
    const response = await api.get('/enrollments/my')
    return response.data
  },
  checkEnrollment: async (courseId) => {
    const response = await api.get(`/enrollments/check/${courseId}`)
    return response.data
  },
  updateProgress: async (courseId, progress) => {
    const response = await api.patch(`/enrollments/${courseId}/progress`, { progress })
    return response.data
  },
}

export default enrollmentService