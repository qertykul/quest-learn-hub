
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface CourseStatsCardProps {
  xp: number;
  lessonCount: number;
  totalDuration: number;
  level: string;
}

export const CourseStatsCard: React.FC<CourseStatsCardProps> = ({
  xp,
  lessonCount,
  totalDuration,
  level
}) => {
  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Статистика курса
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Опыт (XP):</span>
          <span className="text-white font-medium">{xp} XP</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Уроков:</span>
          <span className="text-white font-medium">{lessonCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Общая длительность:</span>
          <span className="text-white font-medium">{totalDuration} мин</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Уровень:</span>
          <span className="text-white font-medium">{level}</span>
        </div>
      </CardContent>
    </Card>
  );
};
