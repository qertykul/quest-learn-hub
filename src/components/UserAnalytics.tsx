
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Eye, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';

interface User {
  id: number;
  username: string;
  email: string;
  courses: number;
  lastActive: string;
  xp: number;
  level: number;
}

interface UserAnalyticsProps {
  users: User[];
}

export const UserAnalytics: React.FC<UserAnalyticsProps> = ({ users }) => {
  const { user } = useAuth();
  const { getTotalXP, getCompletedCourses, getUserLevel } = useProgress();

  // Generate real user data based on current user if they have progress
  const realUsers = user && getTotalXP() > 0 ? [{
    id: user.id,
    username: user.username,
    email: user.email,
    courses: getCompletedCourses(),
    lastActive: 'Сегодня',
    xp: getTotalXP(),
    level: getUserLevel()
  }] : [];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Аналитика пользователей
        </CardTitle>
      </CardHeader>
      <CardContent>
        {realUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Пользователи не найдены</p>
            <p className="text-gray-500 text-sm">Статистика будет отображаться после регистрации пользователей и начала изучения курсов</p>
          </div>
        ) : (
          <div className="space-y-4">
            {realUsers.map((userData) => (
              <div key={userData.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white font-semibold">{userData.username}</h4>
                  <p className="text-gray-300 text-sm">{userData.email}</p>
                  <p className="text-gray-400 text-xs">
                    {userData.courses} курсов • {userData.xp} XP • Ур.{userData.level} • {userData.lastActive}
                  </p>
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
  );
};
