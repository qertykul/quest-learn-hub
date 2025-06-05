
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Классическая',
    primary: 'from-blue-500 to-purple-600',
    secondary: 'from-gray-600 to-gray-700',
    accent: 'from-cyan-400 to-blue-500',
    background: 'from-slate-900 via-gray-900 to-zinc-900',
    foreground: 'text-white',
    muted: 'text-gray-300',
    border: 'border-white/10'
  },
  {
    id: 'ocean',
    name: 'Океан',
    primary: 'from-teal-500 to-blue-600',
    secondary: 'from-slate-600 to-slate-700',
    accent: 'from-emerald-400 to-teal-500',
    background: 'from-slate-800 via-blue-900 to-indigo-900',
    foreground: 'text-white',
    muted: 'text-blue-100',
    border: 'border-blue-400/20'
  },
  {
    id: 'sunset',
    name: 'Закат',
    primary: 'from-orange-500 to-red-600',
    secondary: 'from-amber-600 to-orange-700',
    accent: 'from-yellow-400 to-orange-500',
    background: 'from-red-900 via-orange-900 to-yellow-900',
    foreground: 'text-white',
    muted: 'text-orange-100',
    border: 'border-orange-400/20'
  },
  {
    id: 'forest',
    name: 'Лес',
    primary: 'from-green-500 to-emerald-600',
    secondary: 'from-green-600 to-green-700',
    accent: 'from-lime-400 to-green-500',
    background: 'from-green-900 via-emerald-900 to-teal-900',
    foreground: 'text-white',
    muted: 'text-green-100',
    border: 'border-green-400/20'
  },
  {
    id: 'lavender',
    name: 'Лаванда',
    primary: 'from-purple-500 to-pink-600',
    secondary: 'from-purple-600 to-purple-700',
    accent: 'from-pink-400 to-purple-500',
    background: 'from-purple-900 via-pink-900 to-rose-900',
    foreground: 'text-white',
    muted: 'text-purple-100',
    border: 'border-purple-400/20'
  }
];

export const avatarLibrary = [
  { id: 'avatar1', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', name: 'Мужчина 1' },
  { id: 'avatar2', src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', name: 'Женщина 1' },
  { id: 'avatar3', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', name: 'Мужчина 2' },
  { id: 'avatar4', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', name: 'Женщина 2' },
  { id: 'avatar5', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', name: 'Мужчина 3' },
  { id: 'avatar6', src: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face', name: 'Женщина 3' }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  currentAvatar: string;
  setAvatar: (avatarSrc: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('learnhub_theme');
    return savedTheme ? themes.find(t => t.id === savedTheme) || themes[0] : themes[0];
  });

  const [currentAvatar, setCurrentAvatar] = useState<string>(() => {
    return localStorage.getItem('learnhub_avatar') || avatarLibrary[0].src;
  });

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('learnhub_theme', themeId);
    }
  };

  const setAvatar = (avatarSrc: string) => {
    setCurrentAvatar(avatarSrc);
    localStorage.setItem('learnhub_avatar', avatarSrc);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, currentAvatar, setAvatar }}>
      {children}
    </ThemeContext.Provider>
  );
};
