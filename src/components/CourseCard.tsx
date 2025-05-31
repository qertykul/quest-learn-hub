
import React from 'react';
import { Play, Star, Clock, Edit, Trash2, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  level: string;
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
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Новичок': return 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg';
      case 'Средний': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg';
      case 'Продвинутый': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg';
      case 'Эксперт': return 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg';
    }
  };

  const isInteractiveCourse = course.fullLessons && course.fullLessons.length > 0;

  return (
    <div className={`group bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 hover:bg-white/15 border border-white/20 relative shadow-2xl ${isInteractiveCourse ? 'cursor-pointer' : ''} animate-fade-in-up hover:shadow-cyan-500/20`}>
      {/* Course Image with enhanced overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl drop-shadow-lg">{course.badge}</span>
        </div>
        
        {/* Edit/Delete buttons moved to top right corner */}
        {(onEdit || onDelete) && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm transform hover:scale-110 transition-all duration-200"
              >
                <Edit className="w-3 h-3" />
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
                className="bg-red-500 hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        )}
        
        <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        
        {/* Completion badge */}
        {course.progress === 100 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-in">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Enhanced progress overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white text-sm mb-2">
            <span className="font-medium">Прогресс</span>
            <span className="font-bold text-cyan-400">{course.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${course.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Course Info */}
      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{course.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        {/* Enhanced Stats */}
        <div className="flex items-center justify-between text-sm text-gray-300 mb-6">
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-1">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>{course.completedLessons}/{course.lessons} уроков</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{course.xp} XP</span>
          </div>
        </div>

        {/* Enhanced Action Button */}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-cyan-500/25 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {isInteractiveCourse ? (
            <>
              <BookOpen className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Начать изучение</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Продолжить изучение</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
