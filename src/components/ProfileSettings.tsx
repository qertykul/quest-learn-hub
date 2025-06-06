
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Palette, User } from 'lucide-react';
import { useTheme, themes } from '@/context/ThemeContext';
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
        <h2 className={`text-3xl font-light ${currentTheme.foreground} mb-2`}>
          Настройки <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>профиля</span>
        </h2>
        <p className={currentTheme.muted}>Персонализируйте свой опыт обучения</p>
      </div>

      {/* Avatar Settings */}
      <Card className={`${currentTheme.cardBg} backdrop-blur-lg ${currentTheme.border}`}>
        <CardHeader>
          <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
            <User className="w-5 h-5" />
            Аватар профиля
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${currentTheme.cardBg} border-2 ${currentTheme.border}`}>
              {currentAvatar && currentAvatar.startsWith('data:') ? (
                <Avatar className="w-20 h-20">
                  <AvatarImage src={currentAvatar} />
                  <AvatarFallback className={`bg-gradient-to-br ${currentTheme.primary} text-white text-xl`}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentTheme.primary} text-white text-2xl flex items-center justify-center font-bold`}>
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h4 className={`${currentTheme.foreground} font-medium`}>{user?.username}</h4>
              <p className={`${currentTheme.muted} text-sm`}>
                {currentAvatar && currentAvatar.startsWith('data:') ? 'Пользовательский аватар' : 'Аватар с инициалами'}
              </p>
            </div>
          </div>

          {/* Upload Custom Avatar */}
          <div>
            <h4 className={`${currentTheme.foreground} font-medium mb-3`}>Загрузить свой аватар</h4>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/20 transition-all duration-200 ${currentTheme.buttonHover}`}
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
      <Card className={`${currentTheme.cardBg} backdrop-blur-lg ${currentTheme.border}`}>
        <CardHeader>
          <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
            <Palette className="w-5 h-5" />
            Тема интерфейса
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 hover:scale-105 ${
                  currentTheme.id === theme.id 
                    ? 'border-blue-400 shadow-lg shadow-blue-400/25' 
                    : `${currentTheme.border} hover:border-blue-300`
                }`}
                onClick={() => setTheme(theme.id)}
              >
                <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${theme.background} mb-3 border ${theme.border}`}>
                  <div className="p-2 space-y-2">
                    <div className={`w-8 h-2 rounded bg-gradient-to-r ${theme.primary}`}></div>
                    <div className={`w-6 h-2 rounded bg-gradient-to-r ${theme.accent}`}></div>
                    <div className={`w-10 h-2 rounded bg-gradient-to-r ${theme.secondary}`}></div>
                  </div>
                </div>
                <h4 className={`${currentTheme.foreground} font-medium text-sm`}>{theme.name}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
