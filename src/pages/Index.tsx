
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CourseGrid } from '@/components/CourseGrid';
import { UserProgress } from '@/components/UserProgress';
import { AchievementBoard } from '@/components/AchievementBoard';
import { LeaderBoard } from '@/components/LeaderBoard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📚 Курсы
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📊 Прогресс
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🏆 Достижения
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            👑 Рейтинг
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="animate-fade-in">
          {activeTab === 'courses' && <CourseGrid />}
          {activeTab === 'progress' && <UserProgress />}
          {activeTab === 'achievements' && <AchievementBoard />}
          {activeTab === 'leaderboard' && <LeaderBoard />}
        </div>
      </div>
    </div>
  );
};

export default Index;
