
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useProgress } from '@/context/ProgressContext';
import { useAdminOperations } from './AdminOperations';

interface CourseManagementSectionProps {
  onCreateCourse: () => void;
  onEditCourse: (course: any) => void;
  onPreviewCourse: (course: any) => void;
  setAdminModal: (modal: any) => void;
}

export const CourseManagementSection: React.FC<CourseManagementSectionProps> = ({
  onCreateCourse,
  onEditCourse,
  onPreviewCourse,
  setAdminModal
}) => {
  const { currentTheme } = useTheme();
  const { courses, setCourses } = useProgress();
  const { handleStartCourse, showAdminModal } = useAdminOperations();

  const handleDeleteCourse = async (courseId: number) => {
    if (confirm('Удалить этот курс?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      showAdminModal(setAdminModal, 'Управление курсами', 'Удаление курса', 'success', 'Курс успешно удален');
    }
  };

  return (
    <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
      <CardHeader>
        <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
          <BookOpen className="w-5 h-5" />
          Управление курсами
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={onCreateCourse}
            className={`bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 transition-all duration-200`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Создать новый курс
          </Button>
          
          <div className="grid gap-4">
            {courses.length === 0 ? (
              <div className={`text-center py-8 ${currentTheme.cardBg} rounded-lg border ${currentTheme.border}`}>
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className={currentTheme.muted}>Курсы не найдены</p>
                <Button 
                  onClick={onCreateCourse}
                  className={`mt-3 bg-gradient-to-r ${currentTheme.primary} hover:opacity-90`}
                >
                  Создать первый курс
                </Button>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className={`flex items-center justify-between p-4 ${currentTheme.cardBg} rounded-lg ${currentTheme.border} border hover:bg-white/5 transition-colors`}>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-3xl">{course.badge}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`${currentTheme.foreground} font-medium text-lg`}>{course.title}</h4>
                      <p className={`${currentTheme.muted} text-sm`}>Автор: {course.author}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`${currentTheme.muted} text-xs flex items-center gap-1`}>
                          <BookOpen className="w-3 h-3" />
                          {course.lessons} уроков
                        </span>
                        <span className={`${currentTheme.muted} text-xs flex items-center gap-1`}>
                          <Zap className="w-3 h-3" />
                          {course.xp} XP
                        </span>
                        <span className={`text-xs flex items-center gap-1 ${course.progress === 100 ? 'text-green-400' : course.progress > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {course.progress === 100 ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onPreviewCourse(course)}
                      className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 transition-colors`}
                      title="Предварительный просмотр курса"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleStartCourse(setAdminModal, course)}
                      className={`${currentTheme.cardBg} border-green-400/30 text-green-300 hover:bg-green-500/20 transition-colors`}
                      title="Запустить курс"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onEditCourse(course)}
                      className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 transition-colors`}
                      title="Редактировать курс"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 transition-colors"
                      title="Удалить курс"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
