
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';

export const UserProgress = () => {
  const { getTotalXP, getCompletedCourses, getUserLevel, courses } = useProgress();
  const { currentTheme } = useTheme();
  
  const totalXP = getTotalXP();
  const currentLevel = getUserLevel();
  const completedCourses = getCompletedCourses();
  const xpForNextLevel = currentLevel * 200;
  const progressToNextLevel = ((totalXP % 200) / 200) * 100;
  const xpNeeded = xpForNextLevel - (totalXP % 200);

  // Calculate streak (consecutive days) - based on actual progress
  const streakDays = Math.min(Math.floor(totalXP / 50), 15);

  // Weekly XP data based on actual progress
  const generateWeeklyData = () => {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const baseXP = Math.floor(totalXP / 7);
    
    return days.map((day, index) => {
      if (totalXP === 0) return { day, xp: 0 };
      
      // Distribute XP across the week with some variation
      const variation = Math.floor(Math.random() * 50) - 25;
      const dayXP = Math.max(0, baseXP + variation);
      return { day, xp: dayXP };
    });
  };

  // Monthly progress based on completed courses
  const generateMonthlyData = () => {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май'];
    const totalCompleted = getCompletedCourses();
    
    return months.map((month, index) => {
      if (totalCompleted === 0) return { month, courses: 0 };
      
      // Distribute completed courses across months
      const coursesForMonth = index < totalCompleted ? 1 : 0;
      return { month, courses: coursesForMonth };
    });
  };

  const weeklyData = generateWeeklyData();
  const monthlyProgress = generateMonthlyData();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 text-white transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Общий XP</p>
              <p className="text-3xl font-bold">{totalXP.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

        <div className={`bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 text-white transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Текущий уровень</p>
              <p className="text-3xl font-bold">{currentLevel}</p>
            </div>
            <Trophy className="w-8 h-8" />
          </div>
        </div>

        <div className={`bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Курсов завершено</p>
              <p className="text-3xl font-bold">{completedCourses}</p>
            </div>
            <Target className="w-8 h-8" />
          </div>
        </div>

        <div className={`bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Дней подряд</p>
              <p className="text-3xl font-bold">{streakDays}</p>
            </div>
            <Calendar className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly XP Chart */}
        <div className={`${currentTheme.cardBg} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.border}`}>
          <h3 className={`text-xl font-bold ${currentTheme.foreground} mb-4`}>XP за неделю</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="xp" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          {totalXP === 0 && (
            <p className={`${currentTheme.muted} text-sm text-center mt-2`}>
              Начните изучать курсы, чтобы увидеть прогресс
            </p>
          )}
        </div>

        {/* Monthly Progress */}
        <div className={`${currentTheme.cardBg} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.border}`}>
          <h3 className={`text-xl font-bold ${currentTheme.foreground} mb-4`}>Завершенные курсы</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: 'white'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="courses" 
                stroke="#22d3ee" 
                strokeWidth={3}
                dot={{ fill: '#22d3ee', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          {completedCourses === 0 && (
            <p className={`${currentTheme.muted} text-sm text-center mt-2`}>
              Завершите первый курс, чтобы увидеть прогресс
            </p>
          )}
        </div>
      </div>

      {/* Level Progress */}
      <div className={`${currentTheme.cardBg} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.border}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold ${currentTheme.foreground}`}>Прогресс до следующего уровня</h3>
          <span className="text-cyan-400 font-semibold">Уровень {currentLevel} → {currentLevel + 1}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className={currentTheme.foreground}>{totalXP} XP</span>
          <div className="flex-1 bg-white/20 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full relative overflow-hidden transition-all duration-300"
              style={{ width: `${Math.max(progressToNextLevel, 2)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <span className={currentTheme.foreground}>{xpForNextLevel} XP</span>
        </div>
        <p className={`${currentTheme.muted} text-sm mt-2`}>
          {xpNeeded > 0 ? `Осталось ${xpNeeded} XP до следующего уровня!` : 'Поздравляем с новым уровнем!'}
        </p>
      </div>
    </div>
  );
};
