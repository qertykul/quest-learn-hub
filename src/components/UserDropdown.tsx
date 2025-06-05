
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  TrendingUp, 
  Trophy, 
  Users, 
  Settings, 
  LogOut, 
  Crown,
  User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface UserDropdownProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const { currentAvatar } = useTheme();

  if (!user) return null;

  const menuItems = [
    { key: 'courses', label: 'Курсы', icon: BookOpen },
    { key: 'progress', label: 'Прогресс', icon: TrendingUp },
    { key: 'achievements', label: 'Достижения', icon: Trophy },
    { key: 'leaderboard', label: 'Рейтинг', icon: Users },
    { key: 'profile', label: 'Профиль', icon: User },
  ];

  if (user.isAdmin) {
    menuItems.push({ key: 'admin', label: 'Администрирование', icon: Crown });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10"
        >
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarImage src={currentAvatar} alt={user.username} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 bg-black/90 backdrop-blur-xl border border-white/10 text-white z-50" 
        align="end"
      >
        <div className="flex items-center space-x-3 p-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={currentAvatar} alt={user.username} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.username}
            </p>
            <div className="flex items-center space-x-3 text-xs text-gray-300">
              <span>XP: {user.xp.toLocaleString()}</span>
              <span>Ур. {user.level}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={item.key}
              className={`flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-white/10 focus:bg-white/10 ${
                activeTab === item.key ? 'bg-blue-500/20 text-blue-300' : 'text-white'
              }`}
              onClick={() => onTabChange(item.key)}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-red-500/20 focus:bg-red-500/20 text-red-300"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
