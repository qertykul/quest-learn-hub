
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, BarChart3 } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    totalCourses: number;
    activeSessions: number;
    completionRate: number;
  };
}

export const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  return (
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
  );
};
