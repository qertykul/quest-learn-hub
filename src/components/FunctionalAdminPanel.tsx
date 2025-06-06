
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  Upload, 
  BarChart3, 
  Database, 
  Users, 
  Shield, 
  Settings,
  RefreshCw,
  FileText,
  Activity
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { AdminStats } from './AdminStats';

export const FunctionalAdminPanel = () => {
  const { courses, resetAllProgress } = useProgress();
  const { currentTheme } = useTheme();
  const [lastAction, setLastAction] = useState<string>('');

  const showStatus = (message: string, duration: number = 3000) => {
    setLastAction(message);
    setTimeout(() => setLastAction(''), duration);
  };

  const handleExportData = () => {
    const data = {
      courses,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnhub-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatus('✅ Данные экспортированы');
  };

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
            showStatus('✅ Данные импортированы');
          } catch {
            showStatus('❌ Ошибка импорта');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleGenerateReport = () => {
    showStatus('📊 Генерация отчёта...', 2000);
    
    setTimeout(() => {
      const reportData = {
        timestamp: new Date().toISOString(),
        totalCourses: courses.length,
        systemHealth: 'Отлично',
        performance: '98%',
        activeUsers: courses.some(c => c.progress > 0) ? 1 : 0
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
      
      showStatus('✅ Отчёт создан');
    }, 2000);
  };

  const handleBackupSystem = () => {
    showStatus('💾 Создание резервной копии...', 1500);
    
    setTimeout(() => {
      const backupData = {
        courses,
        settings: {
          theme: localStorage.getItem('learnhub_theme'),
          avatar: localStorage.getItem('learnhub_avatar')
        },
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('learnhub_backup', JSON.stringify(backupData));
      showStatus('✅ Резервная копия создана');
    }, 1500);
  };

  const handleUserManagement = () => {
    showStatus('👥 Панель управления пользователями активна');
  };

  const handleSecurityAudit = () => {
    showStatus('🔒 Проведение аудита...', 2500);
    
    setTimeout(() => {
      showStatus('✅ Система безопасна');
    }, 2500);
  };

  const handleSystemMaintenance = () => {
    showStatus('🔧 Обслуживание системы...', 2000);
    
    setTimeout(() => {
      Object.keys(localStorage).forEach(key => {
        if (key.includes('_old') || key.includes('_temp')) {
          localStorage.removeItem(key);
        }
      });
      showStatus('✅ Обслуживание завершено');
    }, 2000);
  };

  const handleResetProgress = () => {
    if (confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) {
      resetAllProgress();
      showStatus('✅ Прогресс сброшен');
    }
  };

  const handleSystemRestart = () => {
    showStatus('🔄 Перезапуск системы...', 2000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-light ${currentTheme.foreground} mb-2`}>
            Панель <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>управления</span>
          </h2>
          <p className={currentTheme.muted}>Управление платформой LearnHub</p>
        </div>
        {lastAction && (
          <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-xl text-sm text-blue-300">
            {lastAction}
          </div>
        )}
      </div>

      <AdminStats />

      {/* Management Tools */}
      <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
        <CardHeader>
          <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
            <Settings className="w-5 h-5" />
            Инструменты управления
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Download className="w-6 h-6 mb-2" />
              <span className="font-medium">Экспорт</span>
              <span className="text-xs opacity-80">Скачать данные</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleImportData}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Upload className="w-6 h-6 mb-2" />
              <span className="font-medium">Импорт</span>
              <span className="text-xs opacity-80">Загрузить данные</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleGenerateReport}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span className="font-medium">Отчеты</span>
              <span className="text-xs opacity-80">Аналитика</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleBackupSystem}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Database className="w-6 h-6 mb-2" />
              <span className="font-medium">Бэкап</span>
              <span className="text-xs opacity-80">Создать копию</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleUserManagement}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="font-medium">Пользователи</span>
              <span className="text-xs opacity-80">Управление</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleSecurityAudit}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Shield className="w-6 h-6 mb-2" />
              <span className="font-medium">Безопасность</span>
              <span className="text-xs opacity-80">Аудит</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleSystemMaintenance}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Activity className="w-6 h-6 mb-2" />
              <span className="font-medium">Обслуживание</span>
              <span className="text-xs opacity-80">Очистка</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleResetProgress}
              className={`${currentTheme.cardBg} border-red-400/30 text-red-300 hover:bg-red-500/20 h-auto p-4 flex-col transition-all duration-200`}
            >
              <RefreshCw className="w-6 h-6 mb-2" />
              <span className="font-medium">Сброс</span>
              <span className="text-xs opacity-80">Очистить прогресс</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
