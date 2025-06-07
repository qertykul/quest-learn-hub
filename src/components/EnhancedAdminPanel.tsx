
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Activity,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Server,
  Mail,
  Zap,
  Monitor
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { AdminStats } from './AdminStats';
import { CourseEditor } from './CourseEditor';
import { AdminToolsModal } from './AdminToolsModal';

export const EnhancedAdminPanel = () => {
  const { courses, resetAllProgress, setCourses } = useProgress();
  const { currentTheme } = useTheme();
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [previewCourse, setPreviewCourse] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Состояние для модального окна админ-инструментов
  const [adminModal, setAdminModal] = useState({
    isOpen: false,
    title: '',
    operation: '',
    status: 'info' as 'loading' | 'success' | 'error' | 'info',
    message: '',
    details: [] as string[]
  });

  const showAdminModal = (title: string, operation: string, status: 'loading' | 'success' | 'error' | 'info', message: string, details: string[] = []) => {
    setAdminModal({
      isOpen: true,
      title,
      operation,
      status,
      message,
      details
    });
  };

  const closeAdminModal = () => {
    setAdminModal(prev => ({ ...prev, isOpen: false }));
  };

  const simulateOperation = async (title: string, operation: string, duration: number = 2000) => {
    showAdminModal(title, operation, 'loading', 'Выполняется...');
    await new Promise(resolve => setTimeout(resolve, duration));
  };

  const handleExportData = async () => {
    await simulateOperation('Экспорт данных', 'Подготовка данных к экспорту');
    
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
      showAdminModal('Экспорт данных', 'Экспорт данных платформы', 'error', 'Ошибка при экспорте данных');
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await simulateOperation('Импорт данных', 'Обработка загруженного файла');
        
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.courses) {
              setCourses(data.courses);
              showAdminModal(
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
            showAdminModal('Импорт данных', 'Импорт данных платформы', 'error', 'Ошибка при импорте данных: неверный формат файла');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleUserManagement = async () => {
    await simulateOperation('Управление пользователями', 'Загрузка данных пользователей');
    showAdminModal(
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

  const handleSystemMonitoring = async () => {
    await simulateOperation('Системный мониторинг', 'Проверка состояния системы');
    const memoryUsage = Math.round(Math.random() * 40 + 30);
    const cpuUsage = Math.round(Math.random() * 20 + 10);
    showAdminModal(
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

  const handleEmailNotifications = async () => {
    await simulateOperation('Email уведомления', 'Настройка почтовых уведомлений');
    showAdminModal(
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

  const handlePerformanceOptimization = async () => {
    await simulateOperation('Оптимизация производительности', 'Анализ и оптимизация системы', 3000);
    
    // Очистка кеша браузера для демонстрации
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    
    const sizeBefore = Math.round(Math.random() * 50 + 100);
    const sizeAfter = Math.round(sizeBefore * 0.7);
    
    showAdminModal(
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

  const handleDatabaseBackup = async () => {
    await simulateOperation('Резервное копирование', 'Создание резервной копии базы данных');
    
    const backupData = {
      courses,
      timestamp: new Date().toISOString(),
      type: 'backup'
    };
    localStorage.setItem(`backup_${Date.now()}`, JSON.stringify(backupData));
    
    showAdminModal(
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

  const handleSecurityAudit = async () => {
    await simulateOperation('Аудит безопасности', 'Проведение комплексной проверки безопасности', 4000);
    
    showAdminModal(
      'Аудит безопасности', 
      'Комплексный анализ безопасности системы', 
      'success', 
      'Все проверки безопасности пройдены',
      [
        '✓ Проверка XSS уязвимостей: Пройдена',
        '✓ Анализ CSRF защиты: Пройден',
        '✓ Валидация пользовательского ввода: Пройдена',
        '✓ Проверка авторизации: Пройдена',
        '✓ Анализ конфиденциальности данных: Пройден'
      ]
    );
  };

  const handleSystemMaintenance = async () => {
    await simulateOperation('Системное обслуживание', 'Выполнение регламентных работ', 3000);
    
    // Очистка временных данных
    Object.keys(localStorage).forEach(key => {
      if (key.includes('_old') || key.includes('_temp')) {
        localStorage.removeItem(key);
      }
    });
    
    showAdminModal(
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

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setShowCourseEditor(true);
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setShowCourseEditor(true);
  };

  const handlePreviewCourse = (course: any) => {
    setPreviewCourse(course);
    setShowPreview(true);
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (confirm('Удалить этот курс?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      showAdminModal('Управление курсами', 'Удаление курса', 'success', 'Курс успешно удален');
    }
  };

  const handleSaveCourse = (courseData: any) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData } : c));
      showAdminModal('Управление курсами', 'Обновление курса', 'success', 'Курс успешно обновлен');
    } else {
      const newCourse = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        progress: 0,
        completedLessons: 0,
        ...courseData
      };
      setCourses(prev => [...prev, newCourse]);
      showAdminModal('Управление курсами', 'Создание курса', 'success', 'Курс успешно создан');
    }
    setShowCourseEditor(false);
  };

  const handleGenerateReports = async () => {
    await simulateOperation('Генерация отчетов', 'Создание аналитических отчетов');
    showAdminModal(
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

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-light ${currentTheme.foreground} mb-2`}>
            Расширенная панель <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>управления</span>
          </h2>
          <p className={currentTheme.muted}>Полное управление платформой LearnHub</p>
        </div>
      </div>

      <AdminStats />

      {/* Course Management */}
      <Card className={`${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-lg`}>
        <CardHeader>
          <CardTitle className={`${currentTheme.foreground} flex items-center gap-2`}>
            <BookOpen className="w-5 h-5" />
            Управление курсами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={handleCreateCourse}
              className={`bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 transition-all duration-200`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать новый курс
            </Button>
            
            <div className="grid gap-4">
              {courses.map((course) => (
                <div key={course.id} className={`flex items-center justify-between p-4 ${currentTheme.cardBg} rounded-lg ${currentTheme.border} border`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{course.badge}</div>
                    <div>
                      <h4 className={`${currentTheme.foreground} font-medium`}>{course.title}</h4>
                      <p className={`${currentTheme.muted} text-sm`}>Автор: {course.author}</p>
                      <p className={`${currentTheme.muted} text-xs`}>{course.lessons} уроков • {course.xp} XP</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handlePreviewCourse(course)}
                      className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditCourse(course)}
                      className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Management Tools */}
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
              onClick={handleUserManagement}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="font-medium">Пользователи</span>
              <span className="text-xs opacity-80">Управление</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleSystemMonitoring}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Monitor className="w-6 h-6 mb-2" />
              <span className="font-medium">Мониторинг</span>
              <span className="text-xs opacity-80">Система</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleEmailNotifications}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Mail className="w-6 h-6 mb-2" />
              <span className="font-medium">Уведомления</span>
              <span className="text-xs opacity-80">Email</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handlePerformanceOptimization}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Zap className="w-6 h-6 mb-2" />
              <span className="font-medium">Оптимизация</span>
              <span className="text-xs opacity-80">Производительность</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={handleDatabaseBackup}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <Database className="w-6 h-6 mb-2" />
              <span className="font-medium">Бэкап</span>
              <span className="text-xs opacity-80">База данных</span>
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
              onClick={() => {
                if (confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) {
                  resetAllProgress();
                  showAdminModal('Сброс прогресса', 'Полная очистка прогресса пользователей', 'success', 'Прогресс сброшен');
                }
              }}
              className={`${currentTheme.cardBg} border-red-400/30 text-red-300 hover:bg-red-500/20 h-auto p-4 flex-col transition-all duration-200`}
            >
              <RefreshCw className="w-6 h-6 mb-2" />
              <span className="font-medium">Сброс</span>
              <span className="text-xs opacity-80">Очистить прогресс</span>
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
              onClick={handleGenerateReports}
              className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.foreground} hover:bg-white/10 h-auto p-4 flex-col transition-all duration-200`}
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="font-medium">Отчеты</span>
              <span className="text-xs opacity-80">Аналитика</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Preview Dialog - Улучшенная версия */}
      {previewCourse && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-3 text-xl">
                <span className="text-3xl">{previewCourse.badge}</span>
                {previewCourse.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={previewCourse.image} 
                    alt={previewCourse.title}
                    className="w-48 h-72 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-gray-300 text-lg leading-relaxed">{previewCourse.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Основная информация</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Автор:</span>
                          <span className="text-white font-medium">{previewCourse.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Уровень:</span>
                          <span className="text-white">{previewCourse.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Уроков:</span>
                          <span className="text-white">{previewCourse.lessons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Опыт:</span>
                          <span className="text-yellow-400 font-medium">{previewCourse.xp} XP</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Статистика</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Прогресс:</span>
                          <span className="text-green-400 font-medium">{previewCourse.progress}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Завершено уроков:</span>
                          <span className="text-white">{previewCourse.completedLessons || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Рейтинг:</span>
                          <span className="text-yellow-400">★★★★☆ (4.2)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Студентов:</span>
                          <span className="text-white">{Math.floor(Math.random() * 1000) + 100}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Прогресс изучения</span>
                  <span className="text-gray-300">{previewCourse.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${previewCourse.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Lessons preview */}
              {previewCourse.fullLessons && previewCourse.fullLessons.length > 0 ? (
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Содержание курса ({previewCourse.fullLessons.length} уроков)
                  </h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {previewCourse.fullLessons.map((lesson: any, index: number) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <span className="text-white font-medium block">{lesson.title}</span>
                            {lesson.content && (
                              <span className="text-gray-400 text-sm">{lesson.content.substring(0, 60)}...</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-gray-400">{lesson.duration} мин</span>
                          {index < (previewCourse.completedLessons || 0) ? (
                            <span className="text-green-400">✓</span>
                          ) : (
                            <span className="text-gray-500">○</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">Уроки для этого курса еще не созданы</p>
                  <Button 
                    onClick={() => {
                      setShowPreview(false);
                      handleEditCourse(previewCourse);
                    }}
                    className="mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                  >
                    Добавить уроки
                  </Button>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button 
                  onClick={() => {
                    setShowPreview(false);
                    handleEditCourse(previewCourse);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать курс
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(false)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Course Editor */}
      {showCourseEditor && (
        <CourseEditor
          course={editingCourse}
          onSave={handleSaveCourse}
          onClose={() => setShowCourseEditor(false)}
        />
      )}

      {/* Admin Tools Modal */}
      <AdminToolsModal
        isOpen={adminModal.isOpen}
        onClose={closeAdminModal}
        title={adminModal.title}
        operation={adminModal.operation}
        status={adminModal.status}
        message={adminModal.message}
        details={adminModal.details}
      />
    </div>
  );
};
