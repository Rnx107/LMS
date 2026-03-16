/**
 * Enrollment Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import enrollmentService from '../services/enrollment.service'
import { courseKeys } from './useCourses'

export const enrollmentKeys = {
  all: ['enrollments'],
  myEnrollments: () => [...enrollmentKeys.all, 'my-enrollments'],
  check: (courseId) => [...enrollmentKeys.all, 'check', courseId],
}

export const useEnrollments = () => {
  const queryClient = useQueryClient()

  const { data: enrollmentsData, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: enrollmentKeys.myEnrollments(),
    queryFn: () => enrollmentService.getMyEnrollments(),
  })

  const useCheckEnrollment = (courseId) => {
    return useQuery({
      queryKey: enrollmentKeys.check(courseId),
      queryFn: () => enrollmentService.checkEnrollment(courseId),
      enabled: !!courseId,
    })
  }

  const enrollMutation = useMutation({
    mutationFn: (courseId) => enrollmentService.enroll(courseId),
    onSuccess: (data, courseId) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.myEnrollments() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.check(courseId) })
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      toast.success('Successfully enrolled in course!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to enroll')
    },
  })

  const unenrollMutation = useMutation({
    mutationFn: (courseId) => enrollmentService.unenroll(courseId),
    onSuccess: (data, courseId) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.myEnrollments() })
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.check(courseId) })
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
      toast.success('Successfully unenrolled from course')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to unenroll')
    },
  })

  return {
    enrollments: enrollmentsData?.data || [],
    isLoadingEnrollments,
    useCheckEnrollment,
    enroll: enrollMutation.mutate,
    unenroll: unenrollMutation.mutate,
    isEnrolling: enrollMutation.isPending,
    isUnenrolling: unenrollMutation.isPending,
  }
}

export default useEnrollments
