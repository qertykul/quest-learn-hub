
import React, { useState } from 'react';
import { Star, Trophy, Zap, Crown, LogIn, Target, Calendar, Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useProgress } from '@/context/ProgressContext';
import { AuthModal } from './AuthModal';
import { UserDropdown } from './UserDropdown';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { user, login, register, isAuthenticated } = useAuth();
  const { currentTheme, currentAvatar } = useTheme();
  const { getTotalXP, getCompletedCourses, getUserLevel, getStreakDays } = useProgress();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    const success = await register(username, email, password);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  return (
    <>
      <header className="bg-black/10 backdrop-blur-xl border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 animate-slide-in min-w-0 flex-shrink-0">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${currentTheme.primary} rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0`}>
                  <span className="text-white font-bold text-xl md:text-2xl">L</span>
                </div>
                <div className="hidden sm:block min-w-0">
                  <h1 className={`text-2xl md:text-3xl font-light bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent tracking-wide`}>
                    LearnHub
                  </h1>
                </div>
              </div>
            </div>

            {isAuthenticated && user && (
              <div className="hidden lg:flex items-center justify-center flex-1 space-x-3 mx-6">
                <div className={`flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm rounded-xl px-4 py-3 border ${currentTheme.border} flex-1 justify-center min-w-0 max-w-[180px]`}>
                  <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className={`font-medium text-sm whitespace-nowrap ${currentTheme.foreground}`}>{getTotalXP()}</span>
                </div>
                
                <div className={`flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm rounded-xl px-4 py-3 border ${currentTheme.border} flex-1 justify-center min-w-0 max-w-[180px]`}>
                  <Star className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className={`font-medium text-sm whitespace-nowrap ${currentTheme.foreground}`}>Ур. {getUserLevel()}</span>
                </div>
                
                <div className={`flex items-center space-x-2 bg-green-500/10 backdrop-blur-sm rounded-xl px-4 py-3 border ${currentTheme.border} flex-1 justify-center min-w-0 max-w-[180px]`}>
                  <Trophy className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className={`font-medium text-sm whitespace-nowrap ${currentTheme.foreground}`}>{getCompletedCourses()}</span>
                </div>

                <div className={`flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm rounded-xl px-4 py-3 border ${currentTheme.border} flex-1 justify-center min-w-0 max-w-[180px]`}>
                  <Calendar className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span className={`font-medium text-sm whitespace-nowrap ${currentTheme.foreground}`}>{getStreakDays()}</span>
                </div>

                {user.isAdmin && (
                  <div className={`flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm rounded-xl px-4 py-3 border ${currentTheme.border} flex-1 justify-center min-w-0 max-w-[180px]`}>
                    <Crown className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className={`font-medium text-sm whitespace-nowrap ${currentTheme.foreground}`}>Админ</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center space-x-3 flex-shrink-0">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  {/* Username moved to left */}
                  <span className={`hidden md:block text-sm font-medium ${currentTheme.foreground} max-w-[100px] truncate`}>
                    {user.username}
                  </span>
                  
                  {/* Avatar with XP and Level */}
                  <div className="relative">
                    <div className={`h-12 w-12 rounded-full border-2 ${currentTheme.border} bg-gradient-to-br ${currentTheme.primary} flex items-center justify-center text-lg hover:border-blue-400 transition-colors relative group`}>
                      {currentAvatar && currentAvatar.startsWith('data:') ? (
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={currentAvatar} alt={user.username} />
                          <AvatarFallback className={`bg-gradient-to-br ${currentTheme.primary} text-white text-sm font-medium`}>
                            {user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <span className={`text-lg font-medium text-white`}>
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      )}
                      
                      {/* XP and Level overlay */}
                      <div className={`absolute -bottom-1 -right-1 bg-gradient-to-r ${currentTheme.primary} text-white text-xs px-1 py-0.5 rounded-full border ${currentTheme.border} font-medium`}>
                        {getTotalXP()}
                      </div>
                    </div>
                  </div>
                  
                  <UserDropdown activeTab={activeTab} onTabChange={onTabChange} />
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg border-0 hover:shadow-xl`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Войти</span>
                  <span className="sm:hidden">Вход</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </>
  );
};
