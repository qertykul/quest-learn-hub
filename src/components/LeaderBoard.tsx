
import React, { useState } from 'react';
import { Crown, Medal, Award, TrendingUp } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useAuth } from '@/context/AuthContext';

export const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const { courses, getTotalXP, getCompletedCourses, getUserLevel, getStreakDays } = useProgress();
  const { user } = useAuth();

  // Generate real leaderboard data based on actual users and their progress
  const generateLeaderboardData = () => {
    if (!user) return [];

    const currentUserStats = {
      id: user.id,
      name: user.username,
      avatar: '🎯',
      level: getUserLevel(),
      xp: getTotalXP(),
      coursesCompleted: getCompletedCourses(),
      streak: getStreakDays(),
      rank: 1
    };

    // Only show current user if they have any progress
    if (getTotalXP() === 0) {
      return [];
    }

    return [currentUserStats];
  };

  const leaderboardData = generateLeaderboardData();

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

  if (leaderboardData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Рейтинг пуст</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Начните изучать курсы, чтобы появиться в рейтинге и соревноваться с другими студентами
            </p>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Top 3 Podium - only show if user has progress */}
        {leaderboardData.length > 0 && (
          <div className="mb-8">
            <div className="text-center">
              <div className="bg-gradient-to-t from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 mb-2 border border-yellow-400/30 max-w-sm mx-auto">
                <span className="text-4xl">{leaderboardData[0]?.avatar}</span>
                <div className="mt-4">
                  <Crown className="w-8 h-8 text-yellow-400 mx-auto" />
                  <p className="text-white font-semibold mt-2">{leaderboardData[0]?.name}</p>
                  <p className="text-gray-300 text-sm">{leaderboardData[0]?.xp} XP</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Полный рейтинг</h3>
        </div>
        
        <div className="space-y-2 p-4">
          {leaderboardData.map((userData) => {
            const isUser = userData.name === user?.username;
            return (
              <div
                key={userData.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${getRankBg(userData.rank, isUser)}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {getRankIcon(userData.rank)}
                  </div>
                  <span className="text-3xl">{userData.avatar}</span>
                  <div>
                    <p className={`font-semibold ${isUser ? 'text-cyan-300' : 'text-white'}`}>
                      {userData.name}
                    </p>
                    <p className="text-gray-300 text-sm">Уровень {userData.level}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-right">
                  <div>
                    <p className="text-white font-semibold">{userData.xp.toLocaleString()} XP</p>
                    <p className="text-gray-300 text-sm">{userData.coursesCompleted} курсов</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">{userData.streak}</span>
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
