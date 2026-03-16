import api from './api'

const uploadService = {
  uploadMaterial: async (courseId, file, metadata, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', metadata.title)
    formData.append('description', metadata.description || '')
    formData.append('courseId', courseId)

    const response = await api.post('/uploads/materials', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })
    return response.data
  },
  getCourseMaterials: async (courseId) => {
    const response = await api.get(`/uploads/course/${courseId}/materials`)
    return response.data
  },
  getMyUploads: async () => {
    const response = await api.get('/uploads/my-uploads')
    return response.data
  },
  deleteMaterial: async (materialId) => {
    const response = await api.delete(`/uploads/materials/${materialId}`)
    return response.data
  },
  getDownloadHistory: async () => {
    const response = await api.get('/uploads/download-history')
    return response.data
  },
}

export default uploadService