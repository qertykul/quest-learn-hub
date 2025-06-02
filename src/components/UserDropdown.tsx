
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, Trophy, BarChart3, Crown, LogOut, ChevronDown } from 'lucide-react';

interface UserDropdownProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-white hover:bg-white/10"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white/20">
            <span className="text-white font-bold text-sm">{user.avatar}</span>
          </div>
          <span className="hidden sm:inline text-sm font-medium">{user.username}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-white/20 text-white"
      >
        <div className="p-3 border-b border-white/10">
          <p className="font-semibold">{user.username}</p>
          <p className="text-xs text-gray-300">{user.email}</p>
          {user.isAdmin && (
            <div className="flex items-center space-x-1 mt-1">
              <Crown className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">Администратор</span>
            </div>
          )}
        </div>

        <div className="p-2">
          <DropdownMenuItem
            onClick={() => onTabChange('courses')}
            className={`cursor-pointer ${activeTab === 'courses' ? 'bg-cyan-400/20' : 'hover:bg-white/10'}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            📚 Курсы
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => onTabChange('progress')}
            className={`cursor-pointer ${activeTab === 'progress' ? 'bg-cyan-400/20' : 'hover:bg-white/10'}`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            📊 Прогресс
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => onTabChange('achievements')}
            className={`cursor-pointer ${activeTab === 'achievements' ? 'bg-cyan-400/20' : 'hover:bg-white/10'}`}
          >
            <Trophy className="w-4 h-4 mr-2" />
            🏆 Достижения
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => onTabChange('leaderboard')}
            className={`cursor-pointer ${activeTab === 'leaderboard' ? 'bg-cyan-400/20' : 'hover:bg-white/10'}`}
          >
            <Crown className="w-4 h-4 mr-2" />
            👑 Рейтинг
          </DropdownMenuItem>

          {user.isAdmin && (
            <>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem
                onClick={() => onTabChange('admin')}
                className={`cursor-pointer ${activeTab === 'admin' ? 'bg-cyan-400/20' : 'hover:bg-white/10'}`}
              >
                <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                ⚙️ Администрирование
              </DropdownMenuItem>
            </>
          )}
        </div>

        <DropdownMenuSeparator className="bg-white/20" />
        
        <div className="p-2">
          <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-red-500/20 text-red-300">
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
