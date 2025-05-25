
import React from 'react';
import { Trophy, Award, Target, Zap, Star, Crown } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Первые шаги',
    description: 'Завершите свой первый урок',
    icon: Trophy,
    earned: true,
    rarity: 'common',
    points: 50,
    date: '15.04.2024'
  },
  {
    id: 2,
    title: 'Марафонец',
    description: 'Учитесь 7 дней подряд',
    icon: Target,
    earned: true,
    rarity: 'uncommon',
    points: 150,
    date: '22.04.2024'
  },
  {
    id: 3,
    title: 'Мастер JavaScript',
    description: 'Завершите курс JavaScript',
    icon: Crown,
    earned: true,
    rarity: 'rare',
    points: 500,
    date: '28.04.2024'
  },
  {
    id: 4,
    title: 'Молния',
    description: 'Заработайте 1000 XP за день',
    icon: Zap,
    earned: false,
    rarity: 'epic',
    points: 300,
    date: null
  },
  {
    id: 5,
    title: 'Звезда',
    description: 'Получите 5 звезд в одном курсе',
    icon: Star,
    earned: true,
    rarity: 'rare',
    points: 250,
    date: '30.04.2024'
  },
  {
    id: 6,
    title: 'Легенда',
    description: 'Достигните 20 уровня',
    icon: Award,
    earned: false,
    rarity: 'legendary',
    points: 1000,
    date: null
  }
];

export const AchievementBoard = () => {
  const getRarityColor = (rarity: string, earned: boolean) => {
    if (!earned) return 'bg-gray-600 border-gray-500';
    
    switch (rarity) {
      case 'common': return 'bg-green-600 border-green-400';
      case 'uncommon': return 'bg-blue-600 border-blue-400';
      case 'rare': return 'bg-purple-600 border-purple-400';
      case 'epic': return 'bg-orange-600 border-orange-400';
      case 'legendary': return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const getRarityText = (rarity: string) => {
    const rarityMap: { [key: string]: string } = {
      common: 'Обычное',
      uncommon: 'Необычное',
      rare: 'Редкое',
      epic: 'Эпическое',
      legendary: 'Легендарное'
    };
    return rarityMap[rarity] || rarity;
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Статистика достижений</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">{earnedAchievements.length}</div>
            <div className="text-gray-300">Получено достижений</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{totalPoints}</div>
            <div className="text-gray-300">Очков за достижения</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{Math.round((earnedAchievements.length / achievements.length) * 100)}%</div>
            <div className="text-gray-300">Прогресс</div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
                achievement.earned 
                  ? `${getRarityColor(achievement.rarity, true)} hover:scale-105 shadow-lg` 
                  : 'bg-gray-800/50 border-gray-600 opacity-60'
              }`}
            >
              {/* Rarity Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  achievement.earned ? 'bg-white/20 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {getRarityText(achievement.rarity)}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                achievement.earned ? 'bg-white/20' : 'bg-gray-700'
              }`}>
                <IconComponent className={`w-8 h-8 ${
                  achievement.earned ? 'text-white' : 'text-gray-500'
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-lg font-bold mb-2 ${
                achievement.earned ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm mb-4 ${
                achievement.earned ? 'text-white/80' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {/* Points and Date */}
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${
                  achievement.earned ? 'text-yellow-300' : 'text-gray-500'
                }`}>
                  +{achievement.points} очков
                </span>
                {achievement.earned && achievement.date && (
                  <span className="text-white/60 text-xs">
                    {achievement.date}
                  </span>
                )}
              </div>

              {/* Earned Indicator */}
              {achievement.earned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
