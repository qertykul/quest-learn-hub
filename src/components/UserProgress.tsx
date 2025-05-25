
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react';

const weeklyData = [
  { day: 'Пн', xp: 120 },
  { day: 'Вт', xp: 80 },
  { day: 'Ср', xp: 200 },
  { day: 'Чт', xp: 150 },
  { day: 'Пт', xp: 300 },
  { day: 'Сб', xp: 250 },
  { day: 'Вс', xp: 180 },
];

const monthlyProgress = [
  { month: 'Янв', courses: 2 },
  { month: 'Фев', courses: 3 },
  { month: 'Мар', courses: 1 },
  { month: 'Апр', courses: 4 },
  { month: 'Май', courses: 2 },
];

export const UserProgress = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Общий XP</p>
              <p className="text-3xl font-bold">2,450</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Текущий уровень</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <Trophy className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Курсов завершено</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            <Target className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Дней подряд</p>
              <p className="text-3xl font-bold">15</p>
            </div>
            <Calendar className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly XP Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">XP за неделю</h3>
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
        </div>

        {/* Monthly Progress */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Завершенные курсы</h3>
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
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Прогресс до следующего уровня</h3>
          <span className="text-cyan-400 font-semibold">Уровень 12 → 13</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">2,450 XP</span>
          <div className="flex-1 bg-white/20 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full relative overflow-hidden"
              style={{ width: '75%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <span className="text-white">3,000 XP</span>
        </div>
        <p className="text-gray-300 text-sm mt-2">Осталось 550 XP до следующего уровня!</p>
      </div>
    </div>
  );
};
