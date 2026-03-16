/**
 * Course Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import courseService from '../services/course.service'

export const courseKeys = {
  all: ['courses'],
  lists: () => [...courseKeys.all, 'list'],
  list: (filters) => [...courseKeys.lists(), { filters }],
  details: () => [...courseKeys.all, 'detail'],
  detail: (id) => [...courseKeys.details(), id],
  myCourses: () => [...courseKeys.all, 'my-courses'],
}

export const useCourses = (params = {}) => {
  const queryClient = useQueryClient()

  const { data: coursesData, isLoading: isLoadingCourses } = useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => courseService.getAllCourses(params),
    keepPreviousData: true,
  })

  const useCourse = (courseId) => {
    return useQuery({
      queryKey: courseKeys.detail(courseId),
      queryFn: () => courseService.getCourseById(courseId),
      enabled: !!courseId,
    })
  }

  const { data: myCoursesData, isLoading: isLoadingMyCourses } = useQuery({
    queryKey: courseKeys.myCourses(),
    queryFn: () => courseService.getMyCourses(),
  })

  const createCourseMutation = useMutation({
    mutationFn: (courseData) => courseService.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.myCourses() })
      toast.success('Course created successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create course')
    },
  })

  const updateCourseMutation = useMutation({
    mutationFn: ({ courseId, updates }) => courseService.updateCourse(courseId, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) })
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.myCourses() })
      toast.success('Course updated successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update course')
    },
  })

  const deleteCourseMutation = useMutation({
    mutationFn: (courseId) => courseService.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.myCourses() })
      toast.success('Course deleted successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete course')
    },
  })

  const publishCourseMutation = useMutation({
    mutationFn: (courseId) => courseService.publishCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.myCourses() })
      toast.success('Course published successfully')
    },
  })

  const unpublishCourseMutation = useMutation({
    mutationFn: (courseId) => courseService.unpublishCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      queryClient.invalidateQueries({ queryKey: courseKeys.myCourses() })
      toast.success('Course unpublished successfully')
    },
  })

  return {
    courses: coursesData?.data || [],
    pagination: coursesData?.pagination,
    myCourses: myCoursesData?.data || [],
    isLoadingCourses,
    isLoadingMyCourses,
    useCourse,
    createCourse: createCourseMutation.mutate,
    updateCourse: updateCourseMutation.mutate,
    deleteCourse: deleteCourseMutation.mutate,
    publishCourse: publishCourseMutation.mutate,
    unpublishCourse: unpublishCourseMutation.mutate,
    isCreating: createCourseMutation.isPending,
    isUpdating: updateCourseMutation.isPending,
    isDeleting: deleteCourseMutation.isPending,
    isPublishing: publishCourseMutation.isPending,
    isUnpublishing: unpublishCourseMutation.isPending,
  }
}

export default useCourses