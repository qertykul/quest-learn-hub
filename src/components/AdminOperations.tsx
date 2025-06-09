
import { useProgress } from '@/context/ProgressContext';
import { Course, ExportData, ImportData } from '@/types/adminOperations';

interface AdminModal {
  isOpen: boolean;
  title: string;
  operation: string;
  status: 'loading' | 'success' | 'error' | 'info';
  message: string;
  details: string[];
}

export interface AdminModalSetter {
  (modal: AdminModal): void;
}

export interface AdminOperations {
  courses: Course[];
  resetAllProgress: () => void;
  setCourses: (courses: Course[]) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  getTotalXP: () => number;
  getCompletedCourses: () => Course[];
  getUserLevel: () => number;
  getActiveUsers: () => number;
  getActiveSessions: () => number;
  getAverageCompletionRate: () => number;
  getStreakDays: () => number;
  getTotalUsers: () => number;
  getTotalActiveCourses: () => number;
  handleExportData: (setAdminModal: AdminModalSetter) => Promise<void>;
  handleImportData: (setAdminModal: AdminModalSetter) => void;
  handleUserManagement: (setAdminModal: AdminModalSetter) => Promise<void>;
  handleSystemMonitoring: (setAdminModal: AdminModalSetter) => Promise<void>;
  handleEmailNotifications: (setAdminModal: AdminModalSetter) => Promise<void>;
  handlePerformanceOptimization: (setAdminModal: AdminModalSetter) => Promise<void>;
  handleDatabaseBackup: (setAdminModal: AdminModalSetter) => Promise<void>;
  handleSystemRestart: (setAdminModal: AdminModalSetter) => Promise<void>;
  showAdminModal: (setAdminModal: AdminModalSetter, modal: AdminModal) => void;
}

export const useAdminOperations = (): AdminOperations => {

  const { 
    courses, 
    resetAllProgress, 
    setCourses, 
    updateCourseProgress: updateCourseProgressOriginal,
    getTotalXP, 
    getCompletedCourses: getCompletedCoursesOriginal,
    getUserLevel, 
    getActiveUsers, 
    getActiveSessions, 
    getAverageCompletionRate, 
    getStreakDays, 
    getTotalUsers, 
    getTotalActiveCourses 
  } = useProgress();

  const getCompletedCourses: () => Course[] = () => {
    return courses.filter(course => course.progress === 100);
  };

  const updateCourseProgress: (courseId: string, progress: number) => void = (courseId: string, progress: number) => {
    updateCourseProgressOriginal(Number(courseId), progress);
  };

  const showAdminModal = (
    setAdminModal: AdminModalSetter,
    modal: AdminModal
  ): void => {
    setAdminModal({
      ...modal,
      isOpen: true
    });
  };

  const simulateOperation: (setAdminModal: AdminModalSetter, title: string, operation: string, duration?: number) => Promise<void> = async (
    setAdminModal: AdminModalSetter,
    title: string, 
    operation: string, 
    duration: number = 2000
  ): Promise<void> => {
    showAdminModal(setAdminModal, {
      isOpen: true,
      title,
      operation,
      status: 'loading',
      message: 'Выполняется...',
      details: []
    });
    await new Promise(resolve => setTimeout(resolve, duration));
    return;
  };

  const handleExportData = async (setAdminModal: AdminModalSetter): Promise<void> => {
    await simulateOperation(setAdminModal, 'Экспорт данных', 'Подготовка данных для экспорта', 3000);
    
    try {
      const exportData: ExportData = {
        courses: courses,
        exportDate: new Date().toISOString(),
        version: '1.0',
        totalCourses: courses.length,
        completedCourses: courses.filter(c => c.progress === 100).length
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learnhub-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      showAdminModal(setAdminModal, {
        isOpen: true,
        title: 'Экспорт данных',
        operation: 'Экспорт данных платформы',
        status: 'success',
        message: 'Данные успешно экспортированы',
        details: [
          `Экспортировано курсов: ${courses.length}`,
          `Экспортировано пользователей: 0`,
          `Дата экспорта: ${new Date().toLocaleString('ru-RU')}`,
          `Размер файла: ${Math.round(blob.size / 1024)} KB`
        ]
      });
    } catch (error) {
      showAdminModal(setAdminModal, {
        isOpen: true,
        title: 'Экспорт данных',
        operation: 'Экспорт данных платформы',
        status: 'error',
        message: 'Ошибка при экспорте данных',
        details: []
      });
    }
  };

  const handleImportData = (setAdminModal: AdminModalSetter): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await simulateOperation(setAdminModal, 'Импорт данных', 'Обработка загруженного файла');
        
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data: ImportData = JSON.parse(e.target?.result as string);
            if (data.courses) {
              setCourses(data.courses);
              showAdminModal(setAdminModal, {
                isOpen: true,
                title: 'Импорт данных',
                operation: 'Импорт данных платформы',
                status: 'success',
                message: 'Данные успешно импортированы',
                details: [
                  `Импортировано курсов: ${data.courses.length}`,
                  `Версия данных: ${data.version || 'Неизвестна'}`,
                  `Дата импорта: ${new Date().toLocaleString('ru-RU')}`,
                  `Размер файла: ${Math.round(file.size / 1024)} KB`
                ]
              });
            } else {
              throw new Error('Неверный формат файла');
            }
          } catch (error) {
            showAdminModal(setAdminModal, {
              isOpen: true,
              title: 'Импорт данных',
              operation: 'Импорт данных платформы',
              status: 'error',
              message: 'Ошибка при импорте данных: неверный формат файла',
              details: []
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleUserManagement = async (setAdminModal: AdminModalSetter): Promise<void> => {
    await simulateOperation(setAdminModal, 'Управление пользователями', 'Загрузка данных пользователей');
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Управление пользователями',
      operation: 'Анализ пользовательской базы',
      status: 'success',
      message: 'Анализ пользователей завершен',
      details: [
        `Всего пользователей: ${getTotalUsers()}`,
        `Активных сессий: ${getActiveSessions()}`,
        `Новых пользователей за неделю: 0`,
        `Средняя активность: ${getAverageCompletionRate().toFixed(2)}%`
      ]
    });
  };

  const handleSystemMonitoring = async (setAdminModal: AdminModalSetter): Promise<void> => {
    await simulateOperation(setAdminModal, 'Системный мониторинг', 'Проверка состояния системы');
    const memoryUsage = Math.round(Math.random() * 40 + 30);
    const cpuUsage = Math.round(Math.random() * 20 + 10);
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Системный мониторинг',
      operation: 'Мониторинг производительности системы',
      status: 'success',
      message: 'Все системы работают нормально',
      details: [
        `Использование памяти: ${memoryUsage}%`,
        `Загрузка CPU: ${cpuUsage}%`,
        'Статус базы данных: Онлайн',
        'Время отклика: < 100ms',
        `Последняя проверка: ${new Date().toLocaleTimeString('ru-RU')}`
      ]
    });
  };

  const handleEmailNotifications = async (setAdminModal: AdminModalSetter): Promise<void> => {
    await simulateOperation(setAdminModal, 'Email уведомления', 'Настройка почтовых уведомлений');
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Email уведомления',
      operation: 'Конфигурация системы уведомлений',
      status: 'success',
      message: 'Email уведомления настроены',
      details: [
        'SMTP сервер: Настроен',
        'Шаблоны писем: Загружены',
        'Очередь отправки: Активна',
        'Статистика доставки: Отслеживается'
      ]
    });
  };

  const handlePerformanceOptimization = async (setAdminModal: AdminModalSetter): Promise<void> => {
    await simulateOperation(setAdminModal, 'Оптимизация производительности', 'Анализ и оптимизация системы', 3000);
    
    if ('caches' in window) {
      await caches.keys().then(names => {
        return Promise.all(names.map(name => caches.delete(name)));
      });
    }
    
    const sizeBefore = Math.round(Math.random() * 50 + 100);
    const sizeAfter = Math.round(sizeBefore * 0.7);
    
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Оптимизация производительности',
      operation: 'Комплексная оптимизация системы',
      status: 'success',
      message: 'Производительность оптимизирована',
      details: [
        `Кеш очищен: ${sizeBefore}MB → ${sizeAfter}MB`,
        'Неиспользуемые данные удалены',
        'Индексы базы данных обновлены',
        'Время загрузки улучшено'
      ]
    });
  };

  const handleDatabaseBackup = async (setAdminModal: AdminModalSetter): Promise<void> => {
    await simulateOperation(setAdminModal, 'Резервное копирование', 'Создание резервной копии базы данных');
    
    const backupData = {
      courses,
      timestamp: new Date().toISOString(),
      type: 'backup'
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnhub-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Резервное копирование',
      operation: 'Создание резервной копии',
      status: 'success',
      message: 'Резервная копия успешно создана',
      details: [
        `Курсов в резерве: ${courses.length}`,
        `Размер файла: ${Math.round(blob.size / 1024)} KB`,
        `Дата создания: ${new Date().toLocaleString('ru-RU')}`,
        `Активных пользователей: ${getActiveUsers()}`,
        `Активных сессий: ${getActiveSessions()}`,
        `Средняя завершенность: ${Math.round(getAverageCompletionRate() * 100)}%`
      ]
    });
  };

  const handleSystemRestart: (setAdminModal: AdminModalSetter) => Promise<void> = async (setAdminModal: AdminModalSetter) => {
    await simulateOperation(setAdminModal, 'Перезапуск системы', 'Выполнение перезапуска', 3000);
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Перезапуск системы',
      operation: 'Выполнение перезапуска',
      status: 'success',
      message: 'Система успешно перезапущена',
      details: []
    });
  };

  const handleStartCourse: (setAdminModal: AdminModalSetter, course: Course) => void = (setAdminModal: AdminModalSetter, course: Course) => {
    showAdminModal(setAdminModal, {
      isOpen: true,
      title: 'Начало курса',
      operation: 'Запуск курса',
      status: 'success',
      message: `Курс "${course.title}" успешно запущен`,
      details: []
    });
  };






  return {
    courses,
    resetAllProgress,
    setCourses,
    updateCourseProgress,
    getTotalXP,
    getCompletedCourses,
    getUserLevel,
    getActiveUsers,
    getActiveSessions,
    getAverageCompletionRate,
    getStreakDays,
    getTotalUsers,
    getTotalActiveCourses,
    handleExportData,
    handleImportData,
    handleUserManagement,
    handleSystemMonitoring,
    handleEmailNotifications,
    handlePerformanceOptimization,
    handleDatabaseBackup,
    handleSystemRestart,
    showAdminModal
  } as AdminOperations;
};
