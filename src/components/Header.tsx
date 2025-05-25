
import React from 'react';
import { Star, Trophy, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold text-white">EduGame</h1>
          </div>

          {/* User Stats */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">2,450 XP</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Уровень 12</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Trophy className="w-5 h-5 text-gold-400" />
              <span className="text-white font-semibold">15 наград</span>
            </div>
            
            {/* Profile Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">А</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
