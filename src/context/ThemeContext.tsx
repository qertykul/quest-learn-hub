
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
  buttonHover: string;
  cardBg: string;
}

export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Тёмная',
    primary: 'from-blue-500 to-purple-600',
    secondary: 'from-gray-600 to-gray-700',
    accent: 'from-cyan-400 to-blue-500',
    background: 'from-slate-900 via-gray-900 to-zinc-900',
    foreground: 'text-white',
    muted: 'text-gray-300',
    border: 'border-white/10',
    buttonHover: 'hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105',
    cardBg: 'bg-white/5'
  },
  {
    id: 'light',
    name: 'Светлая',
    primary: 'from-blue-600 to-indigo-700',
    secondary: 'from-gray-300 to-gray-400',
    accent: 'from-blue-400 to-indigo-500',
    background: 'from-gray-50 via-blue-50 to-indigo-50',
    foreground: 'text-gray-900',
    muted: 'text-gray-600',
    border: 'border-gray-200',
    buttonHover: 'hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg hover:scale-105',
    cardBg: 'bg-white/80'
  },
  {
    id: 'neon',
    name: 'Неоновая',
    primary: 'from-pink-500 to-cyan-500',
    secondary: 'from-purple-600 to-pink-600',
    accent: 'from-green-400 to-cyan-400',
    background: 'from-black via-purple-900 to-black',
    foreground: 'text-white',
    muted: 'text-pink-200',
    border: 'border-pink-400/30',
    buttonHover: 'hover:from-pink-600 hover:to-cyan-600 hover:shadow-pink-500/50 hover:shadow-xl hover:scale-105',
    cardBg: 'bg-purple-900/20'
  },
  {
    id: 'ocean',
    name: 'Океанская',
    primary: 'from-teal-500 to-blue-600',
    secondary: 'from-slate-600 to-slate-700',
    accent: 'from-emerald-400 to-teal-500',
    background: 'from-slate-800 via-blue-900 to-indigo-900',
    foreground: 'text-white',
    muted: 'text-blue-100',
    border: 'border-blue-400/20',
    buttonHover: 'hover:from-teal-600 hover:to-blue-700 hover:shadow-teal-500/50 hover:shadow-lg hover:scale-105',
    cardBg: 'bg-blue-900/30'
  },
  {
    id: 'sunset',
    name: 'Закатная',
    primary: 'from-orange-500 to-red-600',
    secondary: 'from-amber-600 to-orange-700',
    accent: 'from-yellow-400 to-orange-500',
    background: 'from-red-900 via-orange-900 to-yellow-900',
    foreground: 'text-white',
    muted: 'text-orange-100',
    border: 'border-orange-400/20',
    buttonHover: 'hover:from-orange-600 hover:to-red-700 hover:shadow-orange-500/50 hover:shadow-lg hover:scale-105',
    cardBg: 'bg-orange-900/30'
  },
  {
    id: 'forest',
    name: 'Лесная',
    primary: 'from-green-500 to-emerald-600',
    secondary: 'from-green-600 to-green-700',
    accent: 'from-lime-400 to-green-500',
    background: 'from-green-900 via-emerald-900 to-teal-900',
    foreground: 'text-white',
    muted: 'text-green-100',
    border: 'border-green-400/20',
    buttonHover: 'hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/50 hover:shadow-lg hover:scale-105',
    cardBg: 'bg-green-900/30'
  },
  {
    id: 'cosmic',
    name: 'Космическая',
    primary: 'from-violet-500 to-purple-600',
    secondary: 'from-indigo-600 to-violet-700',
    accent: 'from-fuchsia-400 to-violet-500',
    background: 'from-black via-violet-900 to-purple-900',
    foreground: 'text-white',
    muted: 'text-violet-100',
    border: 'border-violet-400/20',
    buttonHover: 'hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/50 hover:shadow-xl hover:scale-105',
    cardBg: 'bg-violet-900/30'
  },
  {
    id: 'aurora',
    name: 'Северное сияние',
    primary: 'from-emerald-400 to-blue-500',
    secondary: 'from-teal-500 to-emerald-600',
    accent: 'from-cyan-300 to-emerald-400',
    background: 'from-slate-900 via-emerald-900 to-blue-900',
    foreground: 'text-white',
    muted: 'text-emerald-100',
    border: 'border-emerald-400/20',
    buttonHover: 'hover:from-emerald-500 hover:to-blue-600 hover:shadow-emerald-400/50 hover:shadow-xl hover:scale-105',
    cardBg: 'bg-emerald-900/30'
  }
];

export const emojiAvatars = [
  { id: 'emoji1', emoji: '👨‍💼', name: 'Бизнесмен' },
  { id: 'emoji2', emoji: '👩‍💻', name: 'Программистка' },
  { id: 'emoji3', emoji: '👨‍🎓', name: 'Студент' },
  { id: 'emoji4', emoji: '👩‍🏫', name: 'Учительница' },
  { id: 'emoji5', emoji: '👨‍🔬', name: 'Учёный' },
  { id: 'emoji6', emoji: '👩‍🎨', name: 'Художница' },
  { id: 'emoji7', emoji: '👨‍⚕️', name: 'Врач' },
  { id: 'emoji8', emoji: '👩‍🚀', name: 'Космонавтка' },
  { id: 'emoji9', emoji: '👨‍🏭', name: 'Инженер' },
  { id: 'emoji10', emoji: '👩‍💼', name: 'Менеджерка' },
  { id: 'emoji11', emoji: '🧙‍♂️', name: 'Мудрец' },
  { id: 'emoji12', emoji: '🧙‍♀️', name: 'Волшебница' },
  { id: 'emoji13', emoji: '🤖', name: 'Робот' },
  { id: 'emoji14', emoji: '🦄', name: 'Единорог' },
  { id: 'emoji15', emoji: '🐱‍💻', name: 'Кот-программист' }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  currentAvatar: string;
  setAvatar: (avatarEmoji: string) => void;
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
    return localStorage.getItem('learnhub_avatar') || emojiAvatars[0].emoji;
  });

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('learnhub_theme', themeId);
    }
  };

  const setAvatar = (avatarEmoji: string) => {
    setCurrentAvatar(avatarEmoji);
    localStorage.setItem('learnhub_avatar', avatarEmoji);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, currentAvatar, setAvatar }}>
      {children}
    </ThemeContext.Provider>
  );
};
