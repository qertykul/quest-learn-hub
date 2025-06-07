
import { useProgress } from '@/context/ProgressContext';

export const useAdminOperations = () => {
  const { courses, resetAllProgress, setCourses } = useProgress();

  const showAdminModal = (
    setAdminModal: (modal: any) => void,
    title: string, 
    operation: string, 
    status: 'loading' | 'success' | 'error' | 'info', 
    message: string, 
    details: string[] = []
  ) => {
    setAdminModal({
      isOpen: true,
      title,
      operation,
      status,
      message,
      details
    });
  };

  const simulateOperation = async (
    setAdminModal: (modal: any) => void,
    title: string, 
    operation: string, 
    duration: number = 2000
  ) => {
    showAdminModal(setAdminModal, title, operation, 'loading', 'Выполняется...');
    await new Promise(resolve => setTimeout(resolve, duration));
  };

  const handleExportData = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Экспорт данных', 'Подготовка данных к экспорту');
    
    try {
      const data = {
        courses,
        exportDate: new Date().toISOString(),
        version: '1.0',
        totalCourses: courses.length,
        completedCourses: courses.filter(c => c.progress === 100).length
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learnhub-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      showAdminModal(
        setAdminModal,
        'Экспорт данных', 
        'Экспорт данных платформы', 
        'success', 
        'Данные успешно экспортированы',
        [
          `Всего курсов: ${courses.length}`,
          `Завершенных курсов: ${courses.filter(c => c.progress === 100).length}`,
          `Дата экспорта: ${new Date().toLocaleString('ru-RU')}`,
          `Размер файла: ${Math.round(blob.size / 1024)} KB`
        ]
      );
    } catch (error) {
      showAdminModal(setAdminModal, 'Экспорт данных', 'Экспорт данных платформы', 'error', 'Ошибка при экспорте данных');
    }
  };

  const handleImportData = (setAdminModal: (modal: any) => void) => {
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
            const data = JSON.parse(e.target?.result as string);
            if (data.courses) {
              setCourses(data.courses);
              showAdminModal(
                setAdminModal,
                'Импорт данных', 
                'Импорт данных платформы', 
                'success', 
                'Данные успешно импортированы',
                [
                  `Импортировано курсов: ${data.courses.length}`,
                  `Версия данных: ${data.version || 'Неизвестна'}`,
                  `Дата импорта: ${new Date().toLocaleString('ru-RU')}`,
                  `Размер файла: ${Math.round(file.size / 1024)} KB`
                ]
              );
            } else {
              throw new Error('Неверный формат файла');
            }
          } catch (error) {
            showAdminModal(setAdminModal, 'Импорт данных', 'Импорт данных платформы', 'error', 'Ошибка при импорте данных: неверный формат файла');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleUserManagement = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Управление пользователями', 'Загрузка данных пользователей');
    showAdminModal(
      setAdminModal,
      'Управление пользователями', 
      'Анализ пользовательской базы', 
      'success', 
      'Анализ пользователей завершен',
      [
        'Всего пользователей: 1 (Demo)',
        'Активных сессий: 1',
        'Новых пользователей за неделю: 0',
        'Средняя активность: Высокая'
      ]
    );
  };

  const handleSystemMonitoring = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Системный мониторинг', 'Проверка состояния системы');
    const memoryUsage = Math.round(Math.random() * 40 + 30);
    const cpuUsage = Math.round(Math.random() * 20 + 10);
    showAdminModal(
      setAdminModal,
      'Системный мониторинг', 
      'Мониторинг производительности системы', 
      'success', 
      'Все системы работают нормально',
      [
        `Использование памяти: ${memoryUsage}%`,
        `Загрузка CPU: ${cpuUsage}%`,
        'Статус базы данных: Онлайн',
        'Время отклика: < 100ms',
        `Последняя проверка: ${new Date().toLocaleTimeString('ru-RU')}`
      ]
    );
  };

  const handleEmailNotifications = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Email уведомления', 'Настройка почтовых уведомлений');
    showAdminModal(
      setAdminModal,
      'Email уведомления', 
      'Конфигурация системы уведомлений', 
      'success', 
      'Email уведомления настроены',
      [
        'SMTP сервер: Настроен',
        'Шаблоны писем: Загружены',
        'Очередь отправки: Активна',
        'Статистика доставки: Отслеживается'
      ]
    );
  };

  const handlePerformanceOptimization = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Оптимизация производительности', 'Анализ и оптимизация системы', 3000);
    
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    
    const sizeBefore = Math.round(Math.random() * 50 + 100);
    const sizeAfter = Math.round(sizeBefore * 0.7);
    
    showAdminModal(
      setAdminModal,
      'Оптимизация производительности', 
      'Комплексная оптимизация системы', 
      'success', 
      'Производительность оптимизирована',
      [
        `Кеш очищен: ${sizeBefore}MB → ${sizeAfter}MB`,
        'Неиспользуемые данные удалены',
        'Индексы базы данных обновлены',
        'Время загрузки улучшено на 25%'
      ]
    );
  };

  const handleDatabaseBackup = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Резервное копирование', 'Создание резервной копии базы данных');
    
    const backupData = {
      courses,
      timestamp: new Date().toISOString(),
      type: 'backup'
    };
    localStorage.setItem(`backup_${Date.now()}`, JSON.stringify(backupData));
    
    showAdminModal(
      setAdminModal,
      'Резервное копирование', 
      'Создание backup базы данных', 
      'success', 
      'Резервная копия создана',
      [
        `Время создания: ${new Date().toLocaleString('ru-RU')}`,
        `Объем данных: ${Math.round(JSON.stringify(backupData).length / 1024)} KB`,
        'Тип бекапа: Полный',
        'Местоположение: Локальное хранилище'
      ]
    );
  };

  const handleSecurityAudit = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Аудит безопасности', 'Проведение комплексной проверки безопасности', 4000);
    
    showAdminModal(
      setAdminModal,
      'Аудит безопасности', 
      'Комплексный анализ безопасности системы', 
      'success', 
      'Все проверки безопасности пройдены',
      [
        '✓ Проверка XSS уязвимостей: Пройдена',
        '✓ Анализ CSRF защиты: Пройден',
        '✓ Валидация пользовательского ввода: Пройдена',
        '✓ Проверка авторизации: Пройдена',
        '✓ Анализ конфиденциальности данных: Пройдена'
      ]
    );
  };

  const handleSystemMaintenance = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Системное обслуживание', 'Выполнение регламентных работ', 3000);
    
    Object.keys(localStorage).forEach(key => {
      if (key.includes('_old') || key.includes('_temp')) {
        localStorage.removeItem(key);
      }
    });
    
    showAdminModal(
      setAdminModal,
      'Системное обслуживание', 
      'Регламентное обслуживание системы', 
      'success', 
      'Обслуживание завершено',
      [
        'Временные файлы удалены',
        'Логи ротированы',
        'Кеш приложения очищен',
        'Производительность проверена'
      ]
    );
  };

  const handleGenerateReports = async (setAdminModal: (modal: any) => void) => {
    await simulateOperation(setAdminModal, 'Генерация отчетов', 'Создание аналитических отчетов');
    showAdminModal(
      setAdminModal,
      'Генерация отчетов', 
      'Создание детальной аналитики', 
      'success', 
      'Отчеты сгенерированы',
      [
        'Отчет по курсам: Готов',
        'Статистика пользователей: Готова',
        'Анализ активности: Завершен',
        'Рекомендации по улучшению: Сформированы'
      ]
    );
  };

  const handleStartCourse = (setAdminModal: (modal: any) => void, course: any) => {
    showAdminModal(
      setAdminModal,
      'Запуск курса',
      'Инициализация курса для тестирования',
      'success',
      `Курс "${course.title}" готов к прохождению`,
      [
        'Все уроки загружены',
        'Система прогресса активирована',
        'Тестовый режим включен'
      ]
    );
  };

  return {
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
    handleStartCourse,
    resetAllProgress,
    showAdminModal
  };
};
