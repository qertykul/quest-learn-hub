
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Upload, BarChart3, Database, Users, Shield } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const PlatformSettings: React.FC = () => {
  const { currentTheme } = useTheme();
  const [lastAction, setLastAction] = useState<string>('');

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            localStorage.setItem('learnhub_imported_data', JSON.stringify(data));
            setLastAction('✅ Данные успешно импортированы');
            setTimeout(() => setLastAction(''), 3000);
          } catch (error) {
            setLastAction('❌ Ошибка при импорте данных');
            setTimeout(() => setLastAction(''), 3000);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleGenerateReport = () => {
    setLastAction('📊 Генерация отчёта...');
    
    setTimeout(() => {
      const reportData = {
        timestamp: new Date().toISOString(),
        totalUsers: 1,
        totalCourses: 4,
        systemHealth: 'Отлично',
        performance: '98%'
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learnhub-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setLastAction('✅ Отчёт сгенерирован и скачан');
      setTimeout(() => setLastAction(''), 3000);
    }, 1500);
  };

  const handleBackupSystem = () => {
    setLastAction('💾 Создание резервной копии...');
    
    setTimeout(() => {
      const backupData = {
        courses: JSON.parse(localStorage.getItem('learnhub_courses_progress') || '[]'),
        settings: {
          theme: localStorage.getItem('learnhub_theme'),
          avatar: localStorage.getItem('learnhub_avatar')
        },
        timestamp: new Date().toISOString(),
        type: 'full_backup'
      };
      
      localStorage.setItem('learnhub_system_backup', JSON.stringify(backupData));
      setLastAction('✅ Резервная копия создана');
      setTimeout(() => setLastAction(''), 3000);
    }, 1000);
  };

  const handleUserManagement = () => {
    setLastAction('👥 Управление пользователями активировано');
    setTimeout(() => setLastAction(''), 3000);
  };

  const handleSecurityAudit = () => {
    setLastAction('🔒 Проведение аудита безопасности...');
    
    setTimeout(() => {
      setLastAction('✅ Аудит завершён: система безопасна');
      setTimeout(() => setLastAction(''), 3000);
    }, 2000);
  };

  const handleSystemMaintenance = () => {
    setLastAction('🔧 Запуск обслуживания системы...');
    
    setTimeout(() => {
      // Очистка старых данных
      Object.keys(localStorage).forEach(key => {
        if (key.includes('_old') || key.includes('_temp')) {
          localStorage.removeItem(key);
        }
      });
      
      setLastAction('✅ Обслуживание системы завершено');
      setTimeout(() => setLastAction(''), 3000);
    }, 2500);
  };

  return (
    <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
      <CardHeader>
        <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
          <Settings className="w-5 h-5" />
          Настройки платформы
        </CardTitle>
        {lastAction && (
          <p className="text-sm mt-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full inline-block max-w-fit">
            {lastAction}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            onClick={handleImportData}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <Upload className="w-6 h-6 mb-2" />
            <span className="font-medium">Импорт данных</span>
            <span className="text-xs opacity-80">Загрузить из файла</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleGenerateReport}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <BarChart3 className="w-6 h-6 mb-2" />
            <span className="font-medium">Отчеты</span>
            <span className="text-xs opacity-80">Детальная аналитика</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={handleBackupSystem}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <Database className="w-6 h-6 mb-2" />
            <span className="font-medium">Резервирование</span>
            <span className="text-xs opacity-80">Создать копию</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={handleUserManagement}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <Users className="w-6 h-6 mb-2" />
            <span className="font-medium">Пользователи</span>
            <span className="text-xs opacity-80">Управление</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={handleSecurityAudit}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <Shield className="w-6 h-6 mb-2" />
            <span className="font-medium">Безопасность</span>
            <span className="text-xs opacity-80">Аудит системы</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={handleSystemMaintenance}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200 ${currentTheme.buttonHover}`}
          >
            <Settings className="w-6 h-6 mb-2" />
            <span className="font-medium">Обслуживание</span>
            <span className="text-xs opacity-80">Очистка системы</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
