
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Download, Settings, RefreshCw, Users, Database, Shield, BarChart3 } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { AdminStats } from './AdminStats';
import { CourseManagement } from './CourseManagement';
import { UserAnalytics } from './UserAnalytics';
import { PlatformSettings } from './PlatformSettings';

export const FunctionalAdminPanel = () => {
  const { courses, setCourses, resetAllProgress } = useProgress();
  const { currentTheme } = useTheme();
  const [isExporting, setIsExporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const users = []; // Реальные пользователи пока отсутствуют

  const handleExportData = async () => {
    setIsExporting(true);
    setLastAction('Экспорт данных...');
    
    try {
      const data = {
        courses: courses,
        users: users,
        exportDate: new Date().toISOString(),
        platform: 'LearnHub Pro',
        version: '2.0'
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learnhub-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setLastAction('✅ Данные успешно экспортированы');
    } catch (error) {
      setLastAction('❌ Ошибка при экспорте данных');
    } finally {
      setIsExporting(false);
      setTimeout(() => setLastAction(''), 3000);
    }
  };

  const handleResetStats = async () => {
    if (!confirm('⚠️ Вы уверены, что хотите сбросить ВСЮ статистику? Это действие нельзя отменить!')) {
      return;
    }
    
    setIsResetting(true);
    setLastAction('Сброс статистики...');
    
    try {
      resetAllProgress();
      localStorage.clear(); // Очищаем все данные localStorage
      setLastAction('✅ Статистика успешно сброшена');
    } catch (error) {
      setLastAction('❌ Ошибка при сбросе статистики');
    } finally {
      setIsResetting(false);
      setTimeout(() => setLastAction(''), 3000);
    }
  };

  const handleDeleteCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    if (confirm(`Удалить курс "${course.title}"? Это действие нельзя отменить.`)) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setLastAction(`✅ Курс "${course.title}" удалён`);
      setTimeout(() => setLastAction(''), 3000);
    }
  };

  const handleAddCourse = () => {
    const title = prompt('Введите название нового курса:');
    if (!title) return;
    
    const newCourse = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      title: title,
      description: 'Новый курс',
      progress: 0,
      author: 'Администратор',
      level: 'Начинающий',
      xp: 500,
      badge: '📚',
      image: '/placeholder.svg',
      lessons: 10,
      completedLessons: 0
    };
    
    setCourses(prev => [...prev, newCourse]);
    setLastAction(`✅ Курс "${title}" добавлен`);
    setTimeout(() => setLastAction(''), 3000);
  };

  const handleBackupData = () => {
    const backup = {
      courses,
      users,
      timestamp: new Date().toISOString(),
      type: 'backup'
    };
    
    localStorage.setItem('learnhub_backup', JSON.stringify(backup));
    setLastAction('✅ Резервная копия создана');
    setTimeout(() => setLastAction(''), 3000);
  };

  const stats = {
    totalCourses: courses.length,
    activeUsers: users.length,
    totalLessons: courses.reduce((sum, course) => sum + course.lessons, 0),
    completedLessons: courses.reduce((sum, course) => sum + course.completedLessons, 0)
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-light ${currentTheme.foreground} mb-2`}>
            Панель <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>управления</span>
          </h2>
          <p className={currentTheme.muted}>Управление платформой LearnHub Pro</p>
          {lastAction && (
            <p className="text-sm mt-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full inline-block">
              {lastAction}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleAddCourse} 
            className={`bg-gradient-to-r ${currentTheme.primary} text-white transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить курс
          </Button>
          
          <Button 
            onClick={handleExportData} 
            variant="outline" 
            disabled={isExporting}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 transition-all duration-200`}
          >
            <Download className={`w-4 h-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} />
            {isExporting ? 'Экспорт...' : 'Экспорт данных'}
          </Button>
          
          <Button 
            onClick={handleBackupData} 
            variant="outline"
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 transition-all duration-200`}
          >
            <Database className="w-4 h-4 mr-2" />
            Резервная копия
          </Button>
          
          <Button 
            onClick={handleResetStats} 
            variant="outline" 
            disabled={isResetting}
            className="bg-red-500/10 border-red-400/20 text-red-300 hover:bg-red-500/20 transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? 'Сброс...' : 'Сбросить всё'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.totalCourses}</div>
            <div className={`text-sm ${currentTheme.muted}`}>Курсов</div>
          </CardContent>
        </Card>
        
        <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.activeUsers}</div>
            <div className={`text-sm ${currentTheme.muted}`}>Пользователей</div>
          </CardContent>
        </Card>
        
        <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.totalLessons}</div>
            <div className={`text-sm ${currentTheme.muted}`}>Всего уроков</div>
          </CardContent>
        </Card>
        
        <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.completedLessons}</div>
            <div className={`text-sm ${currentTheme.muted}`}>Завершено</div>
          </CardContent>
        </Card>
      </div>

      <AdminStats />
      <CourseManagement courses={courses} onDeleteCourse={handleDeleteCourse} />
      <UserAnalytics users={users} />
      <PlatformSettings />
    </div>
  );
};
