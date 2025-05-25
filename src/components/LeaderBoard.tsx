
import React, { useState } from 'react';
import { Crown, Medal, Award, TrendingUp } from 'lucide-react';

const leaderboardData = [
  {
    id: 1,
    name: 'Александр Петров',
    avatar: '👨‍💻',
    level: 18,
    xp: 4250,
    coursesCompleted: 12,
    streak: 25,
    rank: 1
  },
  {
    id: 2,
    name: 'Мария Иванова',
    avatar: '👩‍🎓',
    level: 16,
    xp: 3890,
    coursesCompleted: 10,
    streak: 18,
    rank: 2
  },
  {
    id: 3,
    name: 'Дмитрий Смирнов',
    avatar: '👨‍🚀',
    level: 15,
    xp: 3620,
    coursesCompleted: 9,
    streak: 22,
    rank: 3
  },
  {
    id: 4,
    name: 'Елена Козлова',
    avatar: '👩‍💼',
    level: 14,
    xp: 3200,
    coursesCompleted: 8,
    streak: 15,
    rank: 4
  },
  {
    id: 5,
    name: 'Вы',
    avatar: '🎯',
    level: 12,
    xp: 2450,
    coursesCompleted: 7,
    streak: 15,
    rank: 8
  },
  {
    id: 6,
    name: 'Иван Морозов',
    avatar: '👨‍🔬',
    level: 13,
    xp: 2800,
    coursesCompleted: 7,
    streak: 12,
    rank: 5
  },
  {
    id: 7,
    name: 'Анна Волкова',
    avatar: '👩‍🎨',
    level: 11,
    xp: 2200,
    coursesCompleted: 6,
    streak: 10,
    rank: 6
  }
];

export const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isUser: boolean) => {
    if (isUser) return 'bg-cyan-500/20 border-cyan-400';
    
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400';
      case 2: return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-300';
      case 3: return 'bg-gradient-to-r from-orange-400/20 to-orange-600/20 border-orange-400';
      default: return 'bg-white/5 border-white/10';
    }
  };

  const sortedData = [...leaderboardData].sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'weekly'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'monthly'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Месяц
          </button>
          <button
            onClick={() => setActiveTab('alltime')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'alltime'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            За все время
          </button>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center order-1">
            <div className="bg-gradient-to-t from-gray-300/20 to-gray-400/20 rounded-t-2xl p-4 mb-2 border border-gray-300/30">
              <span className="text-4xl">{sortedData[1]?.avatar}</span>
              <div className="mt-2">
                <Medal className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-white font-semibold mt-1">{sortedData[1]?.name}</p>
                <p className="text-gray-300 text-sm">{sortedData[1]?.xp} XP</p>
              </div>
            </div>
            <div className="bg-gray-300/20 h-16 rounded-b-lg"></div>
          </div>

          {/* 1st Place */}
          <div className="text-center order-2">
            <div className="bg-gradient-to-t from-yellow-400/20 to-orange-500/20 rounded-t-2xl p-4 mb-2 border border-yellow-400/30">
              <span className="text-4xl">{sortedData[0]?.avatar}</span>
              <div className="mt-2">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto" />
                <p className="text-white font-semibold mt-1">{sortedData[0]?.name}</p>
                <p className="text-gray-300 text-sm">{sortedData[0]?.xp} XP</p>
              </div>
            </div>
            <div className="bg-yellow-400/20 h-20 rounded-b-lg"></div>
          </div>

          {/* 3rd Place */}
          <div className="text-center order-3">
            <div className="bg-gradient-to-t from-orange-400/20 to-orange-600/20 rounded-t-2xl p-4 mb-2 border border-orange-400/30">
              <span className="text-4xl">{sortedData[2]?.avatar}</span>
              <div className="mt-2">
                <Award className="w-8 h-8 text-orange-400 mx-auto" />
                <p className="text-white font-semibold mt-1">{sortedData[2]?.name}</p>
                <p className="text-gray-300 text-sm">{sortedData[2]?.xp} XP</p>
              </div>
            </div>
            <div className="bg-orange-400/20 h-12 rounded-b-lg"></div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Полный рейтинг</h3>
        </div>
        
        <div className="space-y-2 p-4">
          {sortedData.map((user) => {
            const isUser = user.name === 'Вы';
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${getRankBg(user.rank, isUser)}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {getRankIcon(user.rank)}
                  </div>
                  <span className="text-3xl">{user.avatar}</span>
                  <div>
                    <p className={`font-semibold ${isUser ? 'text-cyan-300' : 'text-white'}`}>
                      {user.name}
                    </p>
                    <p className="text-gray-300 text-sm">Уровень {user.level}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-right">
                  <div>
                    <p className="text-white font-semibold">{user.xp.toLocaleString()} XP</p>
                    <p className="text-gray-300 text-sm">{user.coursesCompleted} курсов</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">{user.streak}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
