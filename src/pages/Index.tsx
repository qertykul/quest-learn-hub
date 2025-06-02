
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CoursesSection } from '@/components/CoursesSection';
import { UserProgress } from '@/components/UserProgress';
import { AchievementBoard } from '@/components/AchievementBoard';
import { LeaderBoard } from '@/components/LeaderBoard';
import { AdminPanel } from '@/components/AdminPanel';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const IndexContent = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const { isAuthenticated, user } = useAuth();

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="text-center py-12 md:py-24 animate-bounce-in px-4">
          <div className="text-6xl md:text-8xl mb-6">🎓</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Добро пожаловать в EduGame!
          </h2>
          <p className="text-gray-300 mb-8 text-lg md:text-xl max-w-2xl mx-auto">
            Изучайте новое, зарабатывайте очки опыта и открывайте достижения в увлекательной игровой форме
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Интерактивные курсы</h3>
              <p className="text-gray-300">Обучайтесь с помощью интерактивных уроков и практических заданий</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-2">Система достижений</h3>
              <p className="text-gray-300">Зарабатывайте очки опыта и разблокируйте уникальные достижения</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Соревнования</h3>
              <p className="text-gray-300">Соревнуйтесь с другими участниками в рейтинговой таблице</p>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'courses':
        return <CoursesSection />;
      case 'progress':
        return <UserProgress />;
      case 'achievements':
        return <AchievementBoard />;
      case 'leaderboard':
        return <LeaderBoard />;
      case 'admin':
        return user?.isAdmin ? <AdminPanel /> : <CoursesSection />;
      default:
        return <CoursesSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div 
          key={activeTab}
          className="animate-fade-in-up"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
