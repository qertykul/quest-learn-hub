
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  xp: number;
  level: number;
  achievements: number;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Проверяем сохраненного пользователя при загрузке
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Проверка административного аккаунта
    if (username === 'Therealstrel' && password === 'Strelchenko_VP') {
      const adminUser: User = {
        id: 'admin',
        username: 'Therealstrel',
        email: 'admin@edugame.com',
        isAdmin: true,
        xp: 10000,
        level: 50,
        achievements: 100,
        avatar: '👑'
      };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return true;
    }

    // Симуляция обычного пользователя
    if (username && password) {
      const regularUser: User = {
        id: Date.now().toString(),
        username,
        email: `${username}@example.com`,
        isAdmin: false,
        xp: 2450,
        level: 12,
        achievements: 15,
        avatar: username.charAt(0).toUpperCase()
      };
      setUser(regularUser);
      localStorage.setItem('currentUser', JSON.stringify(regularUser));
      return true;
    }

    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Симуляция регистрации
    if (username && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        isAdmin: false,
        xp: 0,
        level: 1,
        achievements: 0,
        avatar: username.charAt(0).toUpperCase()
      };
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
