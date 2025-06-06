
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CoursesSection } from '@/components/CoursesSection';
import { UserProgress } from '@/components/UserProgress';
import { ExtendedAchievementBoard } from '@/components/ExtendedAchievementBoard';
import { LeaderBoard } from '@/components/LeaderBoard';
import { ProfileSettings } from '@/components/ProfileSettings';
import { EnhancedAdminPanel } from '@/components/EnhancedAdminPanel';
import { SupportBot } from '@/components/SupportBot';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const { user, isAuthenticated } = useAuth();
  const { currentTheme } = useTheme();

  const renderContent = () => {
    if (!isAuthenticated) {
      return <CoursesSection />;
    }

    switch (activeTab) {
      case 'courses':
        return <CoursesSection />;
      case 'progress':
        return <UserProgress />;
      case 'achievements':
        return <ExtendedAchievementBoard />;
      case 'leaderboard':
        return <LeaderBoard />;
      case 'profile':
        return <ProfileSettings />;
      case 'admin':
        return user?.isAdmin ? <EnhancedAdminPanel /> : <CoursesSection />;
      default:
        return <CoursesSection />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} overflow-hidden relative`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8 md:px-6">
          {renderContent()}
        </main>
        
        <SupportBot />
      </div>
    </div>
  );
};

export default Index;
