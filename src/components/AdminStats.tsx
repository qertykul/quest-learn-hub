
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, BarChart3, Activity } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';

export const AdminStats: React.FC = () => {
  const { courses, getActiveUsers, getActiveSessions, getAverageCompletionRate } = useProgress();
  const { currentTheme } = useTheme();

  const stats = {
    totalUsers: getActiveUsers(),
    totalCourses: courses.length,
    activeSessions: getActiveSessions(),
    completionRate: getAverageCompletionRate()
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/20 ${currentTheme.cardBg} backdrop-blur-lg`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${currentTheme.foreground}`}>Активные пользователи</CardTitle>
          <Users className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.totalUsers}</div>
          <p className="text-xs text-blue-300">
            {stats.totalUsers > 0 ? 'Есть активность' : 'Нет активных пользователей'}
          </p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/20 ${currentTheme.cardBg} backdrop-blur-lg`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${currentTheme.foreground}`}>Курсы</CardTitle>
          <BookOpen className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.totalCourses}</div>
          <p className="text-xs text-green-300">Доступных курсов</p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20 ${currentTheme.cardBg} backdrop-blur-lg`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${currentTheme.foreground}`}>Активные сессии</CardTitle>
          <Activity className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.activeSessions}</div>
          <p className="text-xs text-purple-300">
            {stats.activeSessions > 0 ? 'Обучение в процессе' : 'Нет активных сессий'}
          </p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/20 ${currentTheme.cardBg} backdrop-blur-lg`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${currentTheme.foreground}`}>Завершенность</CardTitle>
          <BarChart3 className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${currentTheme.foreground}`}>{stats.completionRate}%</div>
          <p className="text-xs text-orange-300">Средний прогресс</p>
        </CardContent>
      </Card>
    </div>
  );
};
