
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Palette, User, Check } from 'lucide-react';
import { useTheme, themes, avatarLibrary } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export const ProfileSettings = () => {
  const { currentTheme, setTheme, currentAvatar, setAvatar } = useTheme();
  const { user } = useAuth();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingAvatar(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
        setIsUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-light text-white mb-2">
          Настройки <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">профиля</span>
        </h2>
        <p className="text-gray-400">Персонализируйте свой опыт обучения</p>
      </div>

      {/* Avatar Settings */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Аватар профиля
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={currentAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-white font-medium">{user?.username}</h4>
              <p className="text-gray-400 text-sm">Текущий аватар</p>
            </div>
          </div>

          {/* Avatar Library */}
          <div>
            <h4 className="text-white font-medium mb-3">Выберите из библиотеки</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {avatarLibrary.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`relative cursor-pointer group ${
                    currentAvatar === avatar.src ? 'ring-2 ring-blue-400' : ''
                  }`}
                  onClick={() => setAvatar(avatar.src)}
                >
                  <Avatar className="w-12 h-12 transition-transform group-hover:scale-110">
                    <AvatarImage src={avatar.src} />
                  </Avatar>
                  {currentAvatar === avatar.src && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Custom Avatar */}
          <div>
            <h4 className="text-white font-medium mb-3">Загрузить свой аватар</h4>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={isUploadingAvatar}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploadingAvatar ? 'Загружается...' : 'Загрузить файл'}
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Тема интерфейса
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  currentTheme.id === theme.id 
                    ? 'border-blue-400 ring-2 ring-blue-400/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setTheme(theme.id)}
              >
                <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${theme.background} mb-3`}>
                  <div className="p-2 space-y-2">
                    <div className={`w-8 h-2 rounded bg-gradient-to-r ${theme.primary}`}></div>
                    <div className={`w-6 h-2 rounded bg-gradient-to-r ${theme.accent}`}></div>
                    <div className={`w-10 h-2 rounded bg-gradient-to-r ${theme.secondary}`}></div>
                  </div>
                </div>
                <h4 className="text-white font-medium text-sm">{theme.name}</h4>
                {currentTheme.id === theme.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
