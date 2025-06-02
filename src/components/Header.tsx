
import React, { useState } from 'react';
import { Star, Trophy, Zap, Crown, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';
import { UserDropdown } from './UserDropdown';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { user, login, register, isAuthenticated } = useAuth();
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
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400/20 rounded-full"></div>
          <div className="absolute top-8 right-16 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 left-1/3 w-6 h-6 bg-blue-400/20 rounded-full" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo and Stats */}
            <div className="flex items-center space-x-4 animate-slide-in min-w-0 flex-1">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-lg md:text-2xl">🎓</span>
                </div>
                <div className="hidden sm:block min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent truncate">
                    EduGame
                  </h1>
                  <p className="text-xs text-gray-400 truncate">Учись играя</p>
                </div>
              </div>

              {/* User Stats - shown when authenticated */}
              {isAuthenticated && user && (
                <div className="hidden lg:flex items-center space-x-3 ml-6">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-full px-3 py-2 border border-yellow-400/30">
                    <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-white font-semibold text-sm whitespace-nowrap">{user.xp.toLocaleString()} XP</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 backdrop-blur-sm rounded-full px-3 py-2 border border-blue-400/30">
                    <Star className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-white font-semibold text-sm whitespace-nowrap">Уровень {user.level}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 backdrop-blur-sm rounded-full px-3 py-2 border border-purple-400/30">
                    <Trophy className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-white font-semibold text-sm whitespace-nowrap">{user.achievements} наград</span>
                  </div>

                  {user.isAdmin && (
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 backdrop-blur-sm rounded-full px-3 py-2 border border-yellow-500/30">
                      <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-white font-semibold text-sm whitespace-nowrap">Админ</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {isAuthenticated ? (
                <UserDropdown activeTab={activeTab} onTabChange={onTabChange} />
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
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
