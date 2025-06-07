
import React from 'react';
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

interface SystemToolsGridProps {
  setAdminModal: (modal: any) => void;
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

  const handleResetProgress = () => {
    if (confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) {
      resetAllProgress();
      showAdminModal(setAdminModal, 'Сброс прогресса', 'Полная очистка прогресса пользователей', 'success', 'Прогресс сброшен');
    }
  };

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
          <Button 
            variant="outline" 
            onClick={() => handleExportData(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Download className="w-6 h-6 mb-2" />
            <span className="font-medium">Экспорт</span>
            <span className="text-xs opacity-80">Скачать данные</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleImportData(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Upload className="w-6 h-6 mb-2" />
            <span className="font-medium">Импорт</span>
            <span className="text-xs opacity-80">Загрузить данные</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleUserManagement(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Users className="w-6 h-6 mb-2" />
            <span className="font-medium">Пользователи</span>
            <span className="text-xs opacity-80">Управление</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleSystemMonitoring(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Monitor className="w-6 h-6 mb-2" />
            <span className="font-medium">Мониторинг</span>
            <span className="text-xs opacity-80">Система</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleEmailNotifications(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Mail className="w-6 h-6 mb-2" />
            <span className="font-medium">Уведомления</span>
            <span className="text-xs opacity-80">Email</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handlePerformanceOptimization(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Zap className="w-6 h-6 mb-2" />
            <span className="font-medium">Оптимизация</span>
            <span className="text-xs opacity-80">Производительность</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleDatabaseBackup(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Database className="w-6 h-6 mb-2" />
            <span className="font-medium">Бэкап</span>
            <span className="text-xs opacity-80">База данных</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleSystemMaintenance(setAdminModal)}
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

          <Button 
            variant="outline" 
            onClick={() => handleSecurityAudit(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <Shield className="w-6 h-6 mb-2" />
            <span className="font-medium">Безопасность</span>
            <span className="text-xs opacity-80">Аудит</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => handleGenerateReports(setAdminModal)}
            className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
          >
            <BarChart3 className="w-6 h-6 mb-2" />
            <span className="font-medium">Отчеты</span>
            <span className="text-xs opacity-80">Аналитика</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
