
import React from 'react';
import { Star, Trophy, Zap, Users } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 relative overflow-hidden">
      {/* Animated background particles without pulsing */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400/20 rounded-full"></div>
        <div className="absolute top-8 right-16 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-4 left-1/3 w-6 h-6 bg-blue-400/20 rounded-full" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo without bounce */}
          <div className="flex items-center space-x-3 animate-slide-in">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg">
              <span className="text-white font-bold text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                EduGame
              </h1>
              <p className="text-xs text-gray-400">Учись играя</p>
            </div>
          </div>

          {/* Enhanced User Stats without pulsing */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/30 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">2,450 XP</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Star className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Уровень 12</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-400/30 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">15 наград</span>
            </div>
            
            {/* Profile Avatar with enhanced styling */}
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg border-2 border-white/20 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <span className="text-white font-bold text-lg">А</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
