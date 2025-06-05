
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Settings } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { AdminStats } from './AdminStats';
import { CourseManagement } from './CourseManagement';
import { UserAnalytics } from './UserAnalytics';
import { PlatformSettings } from './PlatformSettings';

export const AdminPanel = () => {
  const { courses, setCourses } = useProgress();
  const [stats] = useState({
    totalUsers: 0,
    totalCourses: courses.length,
    activeSessions: 0,
    completionRate: courses.length > 0 ? Math.round((courses.filter(c => c.progress === 100).length / courses.length) * 100) : 0
  });

  const [users] = useState([
    // Убираем фейковых пользователей - массив пуст
  ]);

  const handleExportData = () => {
    const data = {
      courses,
      users,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learinhub-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetStats = () => {
    if (confirm('Вы уверены, что хотите сбросить всю статистику? Это действие нельзя отменить.')) {
      setCourses(prevCourses => 
        prevCourses.map(course => ({
          ...course,
          progress: 0,
          completedLessons: 0
        }))
      );
      // Здесь также можно сбросить пользовательские достижения через контекст
    }
  };

  const handleDeleteCourse = (courseId: number) => {
    if (confirm('Удалить этот курс?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  const handleAddCourse = () => {
    // Логика добавления нового курса
    alert('Функция добавления курса будет реализована в следующей версии');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light text-white mb-2">
            Панель <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">управления</span>
          </h2>
          <p className="text-gray-400">Управление платформой LearnHub Pro</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleAddCourse} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Добавить курс
          </Button>
          <Button onClick={handleExportData} variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            Экспорт данных
          </Button>
          <Button onClick={handleResetStats} variant="outline" className="bg-red-500/10 border-red-400/20 text-red-300 hover:bg-red-500/20">
            <Settings className="w-4 h-4 mr-2" />
            Сбросить статистику
          </Button>
        </div>
      </div>

      <AdminStats stats={stats} />
      <CourseManagement courses={courses} onDeleteCourse={handleDeleteCourse} />
      <UserAnalytics users={users} />
      <PlatformSettings />
    </div>
  );
};
