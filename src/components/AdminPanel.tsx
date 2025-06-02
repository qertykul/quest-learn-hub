
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, BarChart3, Plus, Edit, Trash2 } from 'lucide-react';

export const AdminPanel = () => {
  const [stats] = useState({
    totalUsers: 1247,
    totalCourses: 45,
    activeSessions: 89,
    completionRate: 73
  });

  const [users] = useState([
    { id: 1, username: 'student1', email: 'student1@example.com', courses: 3, lastActive: '2 часа назад' },
    { id: 2, username: 'student2', email: 'student2@example.com', courses: 7, lastActive: '1 день назад' },
    { id: 3, username: 'student3', email: 'student3@example.com', courses: 2, lastActive: '3 дня назад' }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Панель администратора
        </h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Всего пользователей</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-blue-300">+12% за месяц</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Курсы</CardTitle>
            <BookOpen className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalCourses}</div>
            <p className="text-xs text-green-300">+5 новых</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Активные сессии</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeSessions}</div>
            <p className="text-xs text-purple-300">Сейчас онлайн</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/30">
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

      {/* User Management */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Управление пользователями
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Management Actions */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Управление курсами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Добавить курс
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Edit className="w-4 h-4 mr-2" />
              Редактировать курсы
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Статистика курсов
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
