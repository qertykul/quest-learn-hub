
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CourseGrid } from '@/components/CourseGrid';
import { UserProgress } from '@/components/UserProgress';
import { AchievementBoard } from '@/components/AchievementBoard';
import { LeaderBoard } from '@/components/LeaderBoard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const tabs = [
    { id: 'courses', label: '📚 Курсы', component: CourseGrid },
    { id: 'progress', label: '📊 Прогресс', component: UserProgress },
    { id: 'achievements', label: '🏆 Достижения', component: AchievementBoard },
    { id: 'leaderboard', label: '👑 Рейтинг', component: LeaderBoard }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CourseGrid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Enhanced Navigation Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 justify-center lg:justify-start">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 md:px-6 md:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content with smooth transitions */}
        <div 
          key={activeTab}
          className="animate-fade-in-up"
        >
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default Index;
