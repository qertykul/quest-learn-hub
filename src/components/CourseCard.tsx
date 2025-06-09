
import React, { useState, useEffect } from 'react';
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
  fullLessons?: {
    id: number;
    title: string;
    description: string;
    duration: number;
    completed: boolean;
  }[];
  imageSize?: number; // Добавляем поддержку размера изображения
}

interface CourseCardProps {
  course: Course;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
  const isInteractiveCourse = course.fullLessons && course.fullLessons.length > 0;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!course.image) {
      // console.error('Image URL is empty for course:', course.title); // Optional: log error
      setImageSrc('/placeholder-course.jpg'); // Use a known placeholder
      setIsImageLoaded(true); // Consider it loaded to hide spinner
      return;
    }
    setImageSrc(course.image);
    // Reset loading state when image URL changes
    setIsImageLoaded(false);
  }, [course.image, course.title]);

  return (
    <div className={`group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:bg-white/10 border border-white/10 hover:border-white/20 relative shadow-xl ${isInteractiveCourse ? 'cursor-pointer' : ''} animate-fade-in-up hover:shadow-2xl`}>
      {/* Course Image */}
      <div className="relative w-full h-[250px] bg-gray-800/50"> // Increased height
        <img 
          src={imageSrc} 
          alt={course.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            console.error('Ошибка загрузки изображения:', {
              url: course.image,
              courseId: course.id,
              courseTitle: course.title,
              error: e
            });
            // Можно установить заглушку в случае ошибки
            e.currentTarget.src = '/placeholder-course.jpg';
          }}
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-700 w-full h-full"></div>
          </div>
        )}
      </div>
      {/* The container below used to hold the duplicate image and overlays. Now only overlays (if any) will be here relative to this container. */}
      {/* The duplicate image itself and its direct wrapper are removed. */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        
        {/* Gradient overlay (and other overlays like admin buttons, progress bar were here) */} 
        {/* These overlays might need repositioning if they were relative to the removed duplicate image. */} 
        {/* For now, only the duplicate image div is removed from here: */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl drop-shadow-2xl">{course.badge}</span>
        </div>
        
        {/* Admin buttons */}
        {(onEdit || onDelete) && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="bg-white/90 hover:bg-white text-gray-800 shadow-lg h-8 w-8 p-0"
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
                className="bg-red-500 hover:bg-red-600 shadow-lg h-8 w-8 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        )}
        
        {/* Completion badge */}
        {course.progress === 100 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-in">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-2xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between text-white text-sm mb-2">
            <span className="font-medium">Прогресс</span>
            <span className="font-bold text-blue-300">{course.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6 relative">
        <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">{course.title}</h3>
        
        {/* Author */}
        <div className="flex items-center space-x-2 mb-3">
          <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-300 text-sm">{course.author}</span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-300 mb-6 gap-3">
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2 flex-1 min-w-0">
            <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="truncate">{course.completedLessons}/{course.lessons} уроков</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{course.xp} XP</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-blue-500/25 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {isInteractiveCourse ? (
            <>
              <BookOpen className="w-5 h-5 relative z-10 flex-shrink-0" />
              <span className="relative z-10">Начать изучение</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 relative z-10 flex-shrink-0" />
              <span className="relative z-10">Продолжить изучение</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
