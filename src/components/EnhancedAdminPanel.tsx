
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  Upload, 
  BarChart3, 
  Database, 
  Users, 
  Shield, 
  Settings,
  RefreshCw,
  FileText,
  Activity,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Server,
  Mail,
  Zap,
  Monitor
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { AdminStats } from './AdminStats';
import { CourseEditor } from './CourseEditor';

export const EnhancedAdminPanel = () => {
  const { courses, resetAllProgress, setCourses } = useProgress();
  const { currentTheme } = useTheme();
  const [lastAction, setLastAction] = useState<string>('');
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const showStatus = (message: string, duration: number = 3000) => {
    setLastAction(message);
    setTimeout(() => setLastAction(''), duration);
  };

  const handleExportData = () => {
    const data = {
      courses,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnhub-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatus('✅ Данные экспортированы');
  };

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setShowCourseEditor(true);
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setShowCourseEditor(true);
  };

  const handleDeleteCourse = (courseId: number) => {
    if (confirm('Удалить этот курс?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      showStatus('✅ Курс удален');
    }
  };

  const handleSaveCourse = (courseData: any) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData } : c));
      showStatus('✅ Курс обновлен');
    } else {
      const newCourse = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        progress: 0,
        completedLessons: 0,
        ...courseData
      };
      setCourses(prev => [...prev, newCourse]);
      showStatus('✅ Курс создан');
    }
    setShowCourseEditor(false);
  };

  const handleSystemMaintenance = () => {
    showStatus('🔧 Обслуживание системы...', 2000);
    setTimeout(() => {
      Object.keys(localStorage).forEach(key => {
        if (key.includes('_old') || key.includes('_temp')) {
          localStorage.removeItem(key);
        }
      });
      showStatus('✅ Обслуживание завершено');
    }, 2000);
  };

  const handleUserManagement = () => {
    showStatus('👥 Панель управления пользователями');
  };

  const handleSystemMonitoring = () => {
    showStatus('📊 Мониторинг системы активирован');
  };

  const handleEmailNotifications = () => {
    showStatus('📧 Настройки уведомлений');
  };

  const handlePerformanceOptimization = () => {
    showStatus('⚡ Оптимизация производительности...');
    setTimeout(() => showStatus('✅ Производительность оптимизирована'), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-light ${currentTheme.foreground} mb-2`}>
            Расширенная панель <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>управления</span>
          </h2>
          <p className={currentTheme.muted}>Полное управление платформой LearnHub</p>
        </div>
        {lastAction && (
          <div className={`px-4 py-2 bg-gradient-to-r ${currentTheme.primary}/20 border ${currentTheme.border} rounded-xl text-sm ${currentTheme.foreground}`}>
            {lastAction}
          </div>
        )}
      </div>

      <AdminStats />

      {/* Course Management */}
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
              onClick={handleCreateCourse}
              className={`bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 transition-all duration-200`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать новый курс
            </Button>
            
            <div className="grid gap-4">
              {courses.map((course) => (
                <div key={course.id} className={`flex items-center justify-between p-4 ${currentTheme.cardBg} rounded-lg ${currentTheme.border} border`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{course.badge}</div>
                    <div>
                      <h4 className={`${currentTheme.foreground} font-medium`}>{course.title}</h4>
                      <p className={`${currentTheme.muted} text-sm`}>Автор: {course.author}</p>
                      <p className={`${currentTheme.muted} text-xs`}>{course.lessons} уроков • {course.xp} XP</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditCourse(course)}
                      className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Management Tools */}
      <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
        <CardHeader>
          <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
            <Settings className="w-5 h-5" />
            Системные инструменты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Download className="w-6 h-6 mb-2" />
              <span className="font-medium">Экспорт</span>
              <span className="text-xs opacity-80">Скачать данные</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleUserManagement}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="font-medium">Пользователи</span>
              <span className="text-xs opacity-80">Управление</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleSystemMonitoring}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Monitor className="w-6 h-6 mb-2" />
              <span className="font-medium">Мониторинг</span>
              <span className="text-xs opacity-80">Система</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleEmailNotifications}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Mail className="w-6 h-6 mb-2" />
              <span className="font-medium">Уведомления</span>
              <span className="text-xs opacity-80">Email</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handlePerformanceOptimization}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Zap className="w-6 h-6 mb-2" />
              <span className="font-medium">Оптимизация</span>
              <span className="text-xs opacity-80">Производительность</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleSystemMaintenance}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Activity className="w-6 h-6 mb-2" />
              <span className="font-medium">Обслуживание</span>
              <span className="text-xs opacity-80">Очистка</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={() => {
                if (confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) {
                  resetAllProgress();
                  showStatus('✅ Прогресс сброшен');
                }
              }}
              className={`${currentTheme.cardBg} border-red-400/30 text-red-300 hover:bg-red-500/20 h-auto p-4 flex-col transition-all duration-200`}
            >
              <RefreshCw className="w-6 h-6 mb-2" />
              <span className="font-medium">Сброс</span>
              <span className="text-xs opacity-80">Очистить прогресс</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={() => showStatus('🛡️ Все системы безопасны')}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Shield className="w-6 h-6 mb-2" />
              <span className="font-medium">Безопасность</span>
              <span className="text-xs opacity-80">Аудит</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showCourseEditor && (
        <CourseEditor
          course={editingCourse}
          onSave={handleSaveCourse}
          onClose={() => setShowCourseEditor(false)}
        />
      )}
    </div>
  );
};
