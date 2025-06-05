
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CoursesSection } from '@/components/CoursesSection';
import { UserProgress } from '@/components/UserProgress';
import { AchievementBoard } from '@/components/AchievementBoard';
import { LeaderBoard } from '@/components/LeaderBoard';
import { AdminPanel } from '@/components/AdminPanel';
import { ProfileSettings } from '@/components/ProfileSettings';
import { SupportBot } from '@/components/SupportBot';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const IndexContent = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const { isAuthenticated, user } = useAuth();
  const { currentTheme } = useTheme();

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="text-center py-16 md:py-28 animate-bounce-in px-4">
          <div className="text-6xl md:text-8xl mb-8">📚</div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide">
            Добро пожаловать в <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>LearnHub Pro</span>
          </h2>
          <p className={`${currentTheme.muted} mb-12 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light`}>
            Профессиональная платформа для развития навыков и карьерного роста
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border ${currentTheme.border} hover:border-white/20 transition-all duration-300`}>
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-medium text-white mb-3">Экспертные курсы</h3>
              <p className={`${currentTheme.muted} leading-relaxed`}>Изучайте проверенные методики от ведущих экспертов</p>
            </div>
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border ${currentTheme.border} hover:border-white/20 transition-all duration-300`}>
              <div className="text-4xl mb-6">📊</div>
              <h3 className="text-xl font-medium text-white mb-3">Отслеживание прогресса</h3>
              <p className={`${currentTheme.muted} leading-relaxed`}>Детальная аналитика вашего профессионального роста</p>
            </div>
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border ${currentTheme.border} hover:border-white/20 transition-all duration-300`}>
              <div className="text-4xl mb-6">🏆</div>
              <h3 className="text-xl font-medium text-white mb-3">Сертификация</h3>
              <p className={`${currentTheme.muted} leading-relaxed`}>Получайте признанные сертификаты достижений</p>
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
      case 'profile':
        return <ProfileSettings />;
      case 'admin':
        return user?.isAdmin ? <AdminPanel /> : <CoursesSection />;
      default:
        return <CoursesSection />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background}`}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div 
          key={activeTab}
          className="animate-fade-in-up"
        >
          {renderContent()}
        </div>
      </div>

      <SupportBot />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProgressProvider>
          <IndexContent />
        </ProgressProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Index;
