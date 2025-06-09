
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Play,
  Edit,
  BookOpen,
  BarChart3,
  Activity,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react';
import { useAdminOperations } from './AdminOperations';
import { Lesson } from '@/types/adminOperations';
import { Course } from '@/types/adminOperations';
import { AdminModalSetter } from './AdminOperations';

interface CoursePreviewDialogProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (course: Course) => void;
  setAdminModal: AdminModalSetter;
}

export const CoursePreviewDialog: React.FC<CoursePreviewDialogProps> = ({
  course,
  isOpen,
  onClose,
  onEdit,
  setAdminModal
}) => {
  const { handleStartCourse } = useAdminOperations();

  if (!course) return null;

  const handleEditCourse = () => {
    onClose();
    onEdit(course);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3 text-xl">
            <span className="text-3xl">{course.badge}</span>
            <div>
              <div>{course.title}</div>
              <div className="text-sm font-normal text-gray-400 mt-1">
                Детальный просмотр курса
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main course info */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-48 h-72 object-cover rounded-lg shadow-xl border border-white/10"
              />
              <div className="mt-4 space-y-2">
                <Button 
                  onClick={() => handleStartCourse(setAdminModal, course)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Запустить курс
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleEditCourse}
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">Описание курса</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{course.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Основная информация
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Автор:</span>
                      <span className="text-white font-medium">{course.author}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Уровень:</span>
                      <span className="text-white">{course.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Уроков:</span>
                      <span className="text-white">{course.lessons}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Опыт:</span>
                      <span className="text-yellow-400 font-medium">{course.xp} XP</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Статистика и прогресс
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Прогресс:</span>
                      <span className={`font-medium ${course.progress === 100 ? 'text-green-400' : course.progress > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Завершено уроков:</span>
                      <span className="text-white">{course.completedLessons || 0} / {course.lessons}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Рейтинг:</span>
                      <span className="text-yellow-400">★★★★☆ (4.2)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Студентов:</span>
                      <span className="text-white">{Math.floor(Math.random() * 1000) + 100}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Прогресс изучения
                  </span>
                  <span className="text-gray-300 font-mono">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-4 rounded-full transition-all duration-500 relative"
                    style={{ width: `${course.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Начало</span>
                  <span>Завершение</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lessons preview with enhanced styling */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5" />
              Содержание курса
              <span className="text-sm text-gray-400 ml-2">
                ({course.fullLessons?.length || 0} уроков)
              </span>
            </h4>
            
            {course.fullLessons && course.fullLessons.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {course.fullLessons.map((lesson: Lesson, index: number) => {
                  const isCompleted = index < (course.completedLessons || 0);
                  const isCurrent = index === (course.completedLessons || 0);
                  
                  return (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 border ${
                        isCompleted 
                          ? 'bg-green-500/10 border-green-400/30' 
                          : isCurrent 
                            ? 'bg-blue-500/10 border-blue-400/30' 
                            : 'bg-white/5 border-white/10'
                      } hover:bg-white/10`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          isCompleted 
                            ? 'bg-green-500' 
                            : isCurrent 
                              ? 'bg-blue-500' 
                              : 'bg-white/5'
                        }`}>
                          {isCompleted ? '✓' : isCurrent ? '→' : index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-white font-medium">{lesson.title}</h3>
                          <p className="text-gray-400 text-sm">{lesson.description}</p>
                          <p className="text-gray-400 text-xs">Длительность: {lesson.duration} мин</p>
                          {lesson.description && (
                            <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                              {lesson.description.substring(0, 80)}...
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration} мин
                        </span>
                        {isCompleted && (
                          <span className="text-green-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Завершен
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Уроки для этого курса еще не созданы</p>
                <Button 
                  onClick={handleEditCourse}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить уроки
                </Button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button 
              onClick={() => handleStartCourse(setAdminModal, course)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
            >
              <Play className="w-4 h-4 mr-2" />
              Запустить курс
            </Button>
            <Button 
              onClick={handleEditCourse}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            >
              <Edit className="w-4 h-4 mr-2" />
              Редактировать курс
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
