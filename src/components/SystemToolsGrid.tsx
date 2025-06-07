
import React, { useCallback } from 'react';
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
  Activity,
  Mail,
  Zap,
  Monitor
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAdminOperations } from './AdminOperations';
import type { AdminModalSetter } from '@/types/admin';

interface SystemToolsGridProps {
  setAdminModal: AdminModalSetter;
}

export const SystemToolsGrid: React.FC<SystemToolsGridProps> = ({ setAdminModal }) => {
  const { currentTheme } = useTheme();
  const {
    handleExportData,
    handleImportData,
    handleUserManagement,
    handleSystemMonitoring,
    handleEmailNotifications,
    handlePerformanceOptimization,
    handleDatabaseBackup,
    handleSecurityAudit,
    handleSystemMaintenance,
    handleGenerateReports,
    resetAllProgress,
    showAdminModal
  } = useAdminOperations();

  const handleResetProgress = useCallback(() => {
    const confirmReset = window.confirm('Сбросить весь прогресс? Это действие нельзя отменить.');
    if (confirmReset) {
      try {
        resetAllProgress();
        showAdminModal(setAdminModal, 'Сброс прогресса', 'Полная очистка прогресса пользователей', 'success', 'Прогресс сброшен');
      } catch (error) {
        console.error('Error resetting progress:', error);
        showAdminModal(setAdminModal, 'Сброс прогресса', 'Ошибка сброса', 'error', 'Не удалось сбросить прогресс');
      }
    }
  }, [resetAllProgress, showAdminModal, setAdminModal]);

  const toolButtons = [
    {
      onClick: () => handleExportData(setAdminModal),
      icon: Download,
      title: 'Экспорт',
      subtitle: 'Скачать данные',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleImportData(setAdminModal),
      icon: Upload,
      title: 'Импорт',
      subtitle: 'Загрузить данные',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleUserManagement(setAdminModal),
      icon: Users,
      title: 'Пользователи',
      subtitle: 'Управление',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleSystemMonitoring(setAdminModal),
      icon: Monitor,
      title: 'Мониторинг',
      subtitle: 'Система',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleEmailNotifications(setAdminModal),
      icon: Mail,
      title: 'Уведомления',
      subtitle: 'Email',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handlePerformanceOptimization(setAdminModal),
      icon: Zap,
      title: 'Оптимизация',
      subtitle: 'Производительность',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleDatabaseBackup(setAdminModal),
      icon: Database,
      title: 'Бэкап',
      subtitle: 'База данных',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleSystemMaintenance(setAdminModal),
      icon: Activity,
      title: 'Обслуживание',
      subtitle: 'Очистка',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: handleResetProgress,
      icon: RefreshCw,
      title: 'Сброс',
      subtitle: 'Очистить прогресс',
      className: `${currentTheme.cardBg} border-red-400/30 text-red-300 hover:bg-red-500/20`
    },
    {
      onClick: () => handleSecurityAudit(setAdminModal),
      icon: Shield,
      title: 'Безопасность',
      subtitle: 'Аудит',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    },
    {
      onClick: () => handleGenerateReports(setAdminModal),
      icon: BarChart3,
      title: 'Отчеты',
      subtitle: 'Аналитика',
      className: `${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`
    }
  ];

  return (
    <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
      <CardHeader>
        <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
          <Settings className="w-5 h-5" />
          Системные инструменты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolButtons.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Button 
                key={index}
                variant="outline" 
                onClick={tool.onClick}
                className={`${tool.className} h-auto p-4 flex-col transition-all duration-200`}
              >
                <IconComponent className="w-6 h-6 mb-2" />
                <span className="font-medium">{tool.title}</span>
                <span className="text-xs opacity-80">{tool.subtitle}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
