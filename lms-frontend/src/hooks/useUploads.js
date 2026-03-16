import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import uploadService from '../services/upload.service'
import api from '../lib/api'

export const uploadKeys = {
  all: ['uploads'],
  materials: (courseId) => [...uploadKeys.all, 'materials', courseId],
  myUploads: () => [...uploadKeys.all, 'my-uploads'],
  downloadHistory: () => [...uploadKeys.all, 'download-history'],
}

export const useUploads = () => {
  const queryClient = useQueryClient()

  const useCourseMaterials = (courseId) => {
    return useQuery({
      queryKey: uploadKeys.materials(courseId),
      queryFn: () => uploadService.getCourseMaterials(courseId),
      enabled: !!courseId,
    })
  }

  const { data: myUploadsData, isLoading: isLoadingMyUploads } = useQuery({
    queryKey: uploadKeys.myUploads(),
    queryFn: () => uploadService.getMyUploads(),
  })

  const { data: downloadHistoryData, isLoading: isLoadingDownloadHistory } = useQuery({
    queryKey: uploadKeys.downloadHistory(),
    queryFn: () => uploadService.getDownloadHistory(),
  })

  const uploadMaterialMutation = useMutation({
    mutationFn: ({ courseId, file, metadata, onProgress }) =>
      uploadService.uploadMaterial(courseId, file, metadata, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.myUploads() })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to upload material')
    },
  })

  const deleteMaterialMutation = useMutation({
    mutationFn: (materialId) => uploadService.deleteMaterial(materialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.myUploads() })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete material')
    },
  })

  const downloadFile = async (material) => {
    try {
      const token = localStorage.getItem('token')
      const baseUrl = api.defaults.baseURL?.replace(/\/$/, '')
      const downloadUrl = `${baseUrl}/uploads/download/${material._id}`
      const response = await fetch(downloadUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || 'Failed to download file')
      }

      const blob = await response.blob()
      // Prefer the filename from header (Content-Disposition), fall back to stored name
      const disposition = response.headers.get('content-disposition')
      let filename = material.fileName
      if (disposition) {
        const match = /filename="?([^";]+)"?/.exec(disposition)
        if (match) filename = match[1]
      }

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      queryClient.invalidateQueries({ queryKey: uploadKeys.downloadHistory() })
      toast.success('File downloaded successfully!')
    } catch (error) {
      toast.error(error.message || 'Failed to download file')
      throw error
    }
  }

  return {
    myUploads: myUploadsData?.data || [],
    downloadHistory: downloadHistoryData?.data || [],
    isLoadingMyUploads,
    isLoadingDownloadHistory,
    useCourseMaterials,
    uploadMaterial: uploadMaterialMutation.mutate,
    deleteMaterial: deleteMaterialMutation.mutate,
    downloadFile,
    isUploading: uploadMaterialMutation.isPending,
    isDeleting: deleteMaterialMutation.isPending,
  }
}

export default useUploads