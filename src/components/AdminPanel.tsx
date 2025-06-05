import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, BarChart3, Plus, Edit, Trash2, Download, Upload, Settings, Eye } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Пользователи</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-blue-300">Зарегистрированные</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Курсы</CardTitle>
            <BookOpen className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalCourses}</div>
            <p className="text-xs text-green-300">Активные курсы</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Активность</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeSessions}</div>
            <p className="text-xs text-purple-300">Сейчас онлайн</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Завершенность</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.completionRate}%</div>
            <p className="text-xs text-orange-300">Средний показатель</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Management */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Управление курсами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Курсы не найдены</p>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{course.badge}</div>
                    <div>
                      <h4 className="text-white font-medium">{course.title}</h4>
                      <p className="text-gray-300 text-sm">Автор: {course.author}</p>
                      <p className="text-gray-400 text-xs">{course.lessons} уроков • {course.xp} XP</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
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
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Analytics */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Аналитика пользователей
          </CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Пользователи не найдены</p>
              <p className="text-gray-500 text-sm">Статистика будет отображаться после регистрации пользователей</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">{user.username}</h4>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                    <p className="text-gray-400 text-xs">{user.courses} курсов • {user.lastActive}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Настройки платформы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-auto p-4 flex-col">
              <Upload className="w-6 h-6 mb-2" />
              <span className="font-medium">Импорт данных</span>
              <span className="text-xs opacity-80">Загрузить из файла</span>
            </Button>
            
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-auto p-4 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="font-medium">Отчеты</span>
              <span className="text-xs opacity-80">Детальная аналитика</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
