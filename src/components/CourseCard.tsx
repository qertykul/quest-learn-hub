
import React from 'react';
import { Play, Star, Users, Clock } from 'lucide-react';

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
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Новичок': return 'bg-green-100 text-green-800';
      case 'Средний': return 'bg-yellow-100 text-yellow-800';
      case 'Продвинутый': return 'bg-orange-100 text-orange-800';
      case 'Эксперт': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:bg-white/15 border border-white/20">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="text-2xl">{course.badge}</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        
        {/* Progress overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
          <div className="flex items-center justify-between text-white text-sm mb-2">
            <span>Прогресс</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{course.description}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.completedLessons}/{course.lessons} уроков</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{course.xp} XP</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
          <Play className="w-5 h-5" />
          <span>Продолжить изучение</span>
        </button>
      </div>
    </div>
  );
};
