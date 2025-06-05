
import React from 'react';
import { Trophy, Award, Target, Zap, Star, Crown, BookOpen, Calendar, Brain, Rocket, Medal, Flame, Globe, Shield, Heart } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';

export const ExtendedAchievementBoard = () => {
  const { getTotalXP, getCompletedCourses, getUserLevel, getStreakDays } = useProgress();
  const { currentTheme } = useTheme();
  
  const totalXP = getTotalXP();
  const completedCourses = getCompletedCourses();
  const currentLevel = getUserLevel();
  const streakDays = getStreakDays();

  const achievements = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Завершите свой первый урок',
      icon: Trophy,
      earned: totalXP > 0,
      rarity: 'common',
      points: 50,
      date: totalXP > 0 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 2,
      title: 'Постоянство',
      description: 'Учитесь 3 дня подряд',
      icon: Target,
      earned: streakDays >= 3,
      rarity: 'common',
      points: 100,
      date: streakDays >= 3 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 3,
      title: 'Неделя знаний',
      description: 'Учитесь 7 дней подряд',
      icon: Calendar,
      earned: streakDays >= 7,
      rarity: 'uncommon',
      points: 200,
      date: streakDays >= 7 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 4,
      title: 'Читатель',
      description: 'Завершите первый курс',
      icon: BookOpen,
      earned: completedCourses >= 1,
      rarity: 'uncommon',
      points: 300,
      date: completedCourses >= 1 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 5,
      title: 'Энергия знаний',
      description: 'Заработайте 500 XP',
      icon: Zap,
      earned: totalXP >= 500,
      rarity: 'uncommon',
      points: 150,
      date: totalXP >= 500 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 6,
      title: 'Мыслитель',
      description: 'Заработайте 1000 XP',
      icon: Brain,
      earned: totalXP >= 1000,
      rarity: 'rare',
      points: 250,
      date: totalXP >= 1000 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 7,
      title: 'Звезда обучения',
      description: 'Достигните 5 уровня',
      icon: Star,
      earned: currentLevel >= 5,
      rarity: 'rare',
      points: 300,
      date: currentLevel >= 5 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 8,
      title: 'Коллекционер',
      description: 'Завершите 2 курса',
      icon: Medal,
      earned: completedCourses >= 2,
      rarity: 'rare',
      points: 400,
      date: completedCourses >= 2 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 9,
      title: 'Ракета знаний',
      description: 'Заработайте 2000 XP',
      icon: Rocket,
      earned: totalXP >= 2000,
      rarity: 'epic',
      points: 500,
      date: totalXP >= 2000 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 10,
      title: 'Мастер дисциплины',
      description: 'Учитесь 14 дней подряд',
      icon: Shield,
      earned: streakDays >= 14,
      rarity: 'epic',
      points: 600,
      date: streakDays >= 14 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 11,
      title: 'Академик',
      description: 'Достигните 10 уровня',
      icon: Crown,
      earned: currentLevel >= 10,
      rarity: 'epic',
      points: 700,
      date: currentLevel >= 10 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 12,
      title: 'Страстный ученик',
      description: 'Заработайте 3000 XP',
      icon: Heart,
      earned: totalXP >= 3000,
      rarity: 'epic',
      points: 800,
      date: totalXP >= 3000 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 13,
      title: 'Мастер курсов',
      description: 'Завершите 3 курса',
      icon: Award,
      earned: completedCourses >= 3,
      rarity: 'legendary',
      points: 1000,
      date: completedCourses >= 3 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 14,
      title: 'Пламя обучения',
      description: 'Учитесь 21 день подряд',
      icon: Flame,
      earned: streakDays >= 21,
      rarity: 'legendary',
      points: 1200,
      date: streakDays >= 21 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 15,
      title: 'Профессор',
      description: 'Достигните 15 уровня',
      icon: Globe,
      earned: currentLevel >= 15,
      rarity: 'legendary',
      points: 1500,
      date: currentLevel >= 15 ? new Date().toLocaleDateString('ru-RU') : null
    },
    {
      id: 16,
      title: 'Легенда знаний',
      description: 'Заработайте 5000 XP',
      icon: Crown,
      earned: totalXP >= 5000,
      rarity: 'legendary',
      points: 2000,
      date: totalXP >= 5000 ? new Date().toLocaleDateString('ru-RU') : null
    }
  ];

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
    <div className="space-y-6 animate-fade-in">
      {/* Achievement Stats */}
      <div className={`${currentTheme.cardBg} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.border}`}>
        <h2 className={`text-2xl font-bold ${currentTheme.foreground} mb-4`}>Статистика достижений</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">{earnedAchievements.length}</div>
            <div className={currentTheme.muted}>Получено</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{totalPoints}</div>
            <div className={currentTheme.muted}>Очков</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{Math.round((earnedAchievements.length / achievements.length) * 100)}%</div>
            <div className={currentTheme.muted}>Прогресс</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{achievements.length}</div>
            <div className={currentTheme.muted}>Всего</div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
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
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                achievement.earned ? 'bg-white/20' : 'bg-gray-700'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  achievement.earned ? 'text-white' : 'text-gray-500'
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-sm font-bold mb-2 ${
                achievement.earned ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-xs mb-3 ${
                achievement.earned ? 'text-white/80' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {/* Points and Date */}
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-xs ${
                  achievement.earned ? 'text-yellow-300' : 'text-gray-500'
                }`}>
                  +{achievement.points}
                </span>
                {achievement.earned && achievement.date && (
                  <span className="text-white/60 text-xs">
                    {achievement.date}
                  </span>
                )}
              </div>

              {/* Earned Indicator */}
              {achievement.earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
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
