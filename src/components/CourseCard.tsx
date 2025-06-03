
import React from 'react';
import { Play, Star, Clock, Edit, Trash2, BookOpen, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  author: string;
  xp: number;
  badge: string;
  image: string;
  lessons: number;
  completedLessons: number;
  fullLessons?: any[];
}

interface CourseCardProps {
  course: Course;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
  const isInteractiveCourse = course.fullLessons && course.fullLessons.length > 0;

  return (
    <div className={`group bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 hover:bg-white/15 border border-white/20 relative shadow-2xl ${isInteractiveCourse ? 'cursor-pointer' : ''} animate-fade-in-up hover:shadow-cyan-500/20`}>
      {/* Course Image with enhanced overlay */}
      <div className="relative h-36 md:h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute top-3 left-3 md:top-4 md:left-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl md:text-3xl drop-shadow-lg">{course.badge}</span>
        </div>
        
        {/* Edit/Delete buttons moved to top right corner */}
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm transform hover:scale-110 transition-all duration-200 h-6 w-6 md:h-8 md:w-8 p-0"
              >
                <Edit className="w-2.5 h-2.5 md:w-3 md:h-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Вы уверены, что хотите удалить этот курс?')) {
                    onDelete();
                  }
                }}
                className="bg-red-500 hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all duration-200 h-6 w-6 md:h-8 md:w-8 p-0"
              >
                <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
              </Button>
            )}
          </div>
        )}
        
        {/* Completion badge */}
        {course.progress === 100 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-in">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 md:p-3 shadow-lg">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Enhanced progress overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
          <div className="flex items-center justify-between text-white text-xs md:text-sm mb-2">
            <span className="font-medium truncate">Прогресс</span>
            <span className="font-bold text-cyan-400 flex-shrink-0">{course.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 md:h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 md:h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${course.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Course Info */}
      <div className="p-4 md:p-6 relative">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 break-words">{course.title}</h3>
        
        {/* Author info */}
        <div className="flex items-center space-x-2 mb-2">
          <User className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-300 text-xs md:text-sm truncate">{course.author}</span>
        </div>
        
        <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 break-words">{course.description}</p>
        
        {/* Enhanced Stats */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-4 md:mb-6 gap-2">
          <div className="flex items-center space-x-1 md:space-x-2 bg-white/5 rounded-lg px-2 py-1 md:px-3 md:py-1 min-w-0 flex-1">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{course.completedLessons}/{course.lessons} уроков</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 bg-white/5 rounded-lg px-2 py-1 md:px-3 md:py-1 flex-shrink-0">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
            <span className="whitespace-nowrap">{course.xp} XP</span>
          </div>
        </div>

        {/* Enhanced Action Button */}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 md:py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-cyan-500/25 relative overflow-hidden group text-sm md:text-base">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {isInteractiveCourse ? (
            <>
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 relative z-10 flex-shrink-0" />
              <span className="relative z-10 hidden sm:inline truncate">Начать изучение</span>
              <span className="relative z-10 sm:hidden truncate">Изучать</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 md:w-5 md:h-5 relative z-10 flex-shrink-0" />
              <span className="relative z-10 hidden sm:inline truncate">Продолжить изучение</span>
              <span className="relative z-10 sm:hidden truncate">Продолжить</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
