/**
 * Course Card Component
 */

import { BookOpen, Users, Clock } from 'lucide-react';

export const CourseCard = ({ 
  course, 
  action,
  isEnrolled = false,
  showProgress = false,
  enrollment = null,
  showStatus = false 
}) => {
  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Completed: 'bg-blue-100 text-blue-700',
    Dropped: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gray-200">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
            <BookOpen className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {showStatus && (
          <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
            course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {course.isPublished ? 'Published' : 'Draft'}
          </span>
        )}
        
        {isEnrolled && enrollment && (
          <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
            statusColors[enrollment.status]
          }`}>
            {enrollment.status}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrollmentCount || 0}</span>
          </div>
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}h</span>
            </div>
          )}
          {course.difficulty && (
            <span className={`text-xs px-2 py-0.5 rounded ${
              course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
              course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {course.difficulty}
            </span>
          )}
        </div>
        
        {/* Teacher Info */}
        {course.teacher && (
          <div className="flex items-center gap-2 mb-4">
            {course.teacher.avatar ? (
              <img 
                src={course.teacher.avatar} 
                alt={course.teacher.firstName}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                {course.teacher.firstName?.[0]}
              </div>
            )}
            <span className="text-sm text-gray-600">
              {course.teacher.firstName} {course.teacher.lastName}
            </span>
          </div>
        )}
        
        {/* Progress Bar */}
        {showProgress && enrollment && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{enrollment.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${enrollment.progress}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Action */}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
};
