
import { BotResponse } from '@/types/supportBot';

export const ENHANCED_RESPONSES = {
  greeting: {
    text: "Привет! Я ваш персональный помощник EduGame. Меня зовут Эдди, и я здесь, чтобы помочь вам с любыми вопросами. Как дела с обучением?",
    intent: "greeting",
    followUp: ["Помощь с курсами", "Проблемы с входом", "Вопросы о достижениях", "Технические проблемы"]
  },
  login: {
    text: "Понял, проблемы с входом в систему. Вот что можно попробовать:\n\n1. Проверьте правильность email и пароля\n2. Убедитесь, что Caps Lock выключен\n3. Попробуйте сбросить пароль через 'Забыли пароль?'\n4. Очистите кэш браузера\n\nЕсли проблема остается - сообщите мне!",
    intent: "login"
  },
  courses: {
    text: "Отлично! По курсам я могу помочь с:\n\n📚 Поиском подходящего курса\n🎯 Отслеживанием прогресса\n📝 Выполнением заданий\n💡 Пониманием материала\n\nО чем конкретно хотите узнать?",
    intent: "courses"
  },
  progress: {
    text: "Ваш прогресс - это важно! Система автоматически сохраняет все достижения:\n\n✅ Завершенные уроки\n⭐ Заработанный опыт\n🏆 Полученные достижения\n📊 Статистика обучения\n\nВ разделе 'Прогресс' вы найдете детальную аналитику вашего обучения.",
    intent: "progress"
  },
  achievements: {
    text: "Достижения - это ваши награды за успехи! 🏆\n\nВы можете получить их за:\n• Завершение курсов\n• Решение сложных задач\n• Ежедневное обучение\n• Помощь другим студентам\n\nКакие достижения вас больше всего интересуют?",
    intent: "achievements"
  },
  admin: {
    text: "Функции администратора доступны только пользователям с соответствующими правами. Если вы администратор, но не видите панель управления, обратитесь к системному администратору для проверки ваших прав доступа.",
    intent: "admin"
  },
  motivation: {
    text: "Понимаю, что иногда сложно поддерживать мотивацию! 💪\n\nВот несколько советов:\n• Ставьте небольшие ежедневные цели\n• Отмечайте свои успехи\n• Изучайте с друзьями\n• Помните о своих целях\n\nВы уже сделали первый шаг, начав обучение!",
    intent: "motivation"
  },
  technical_general: {
    text: "Технические проблемы случаются! 🔧\n\nДавайте разберемся. Чаще всего помогает:\n• Обновить страницу (F5 или Ctrl+R)\n• Проверить интернет-соединение\n• Попробовать другой браузер\n• Очистить кэш и cookies\n\nОпишите подробнее, что именно не работает?",
    intent: "technical_general",
    followUp: ["Проблемы с загрузкой", "Ошибки в браузере", "Проблемы с видео", "Медленная работа"]
  },
  technical_loading: {
    text: "Проблемы с загрузкой могут быть связаны с:\n\n🌐 **Интернет-соединением:**\n• Проверьте скорость интернета\n• Попробуйте другую сеть Wi-Fi\n\n💻 **Браузером:**\n• Обновите браузер до последней версии\n• Отключите блокировщики рекламы\n• Попробуйте режим инкогнито\n\nЕсли ничего не помогает - опишите, на каком этапе происходит зависание.",
    intent: "technical_loading"
  },
  technical_video: {
    text: "Проблемы с видео часто решаются так:\n\n🎥 **Воспроизведение:**\n• Обновите Adobe Flash или HTML5 плеер\n• Проверьте настройки звука в браузере\n• Попробуйте другое качество видео\n\n🔊 **Звук:**\n• Проверьте громкость системы и браузера\n• Убедитесь, что звук не отключен на вкладке\n\nВ каком именно формате проблема с видео?",
    intent: "technical_video"
  },
  technical_performance: {
    text: "Медленная работа платформы? Давайте ускорим! ⚡\n\n🚀 **Быстрые решения:**\n• Закройте ненужные вкладки браузера\n• Перезапустите браузер\n• Очистите кэш (Ctrl+Shift+Del)\n• Проверьте использование RAM\n\n💾 **Долгосрочные решения:**\n• Обновите браузер\n• Увеличьте объем RAM\n• Проверьте на вирусы\n\nСколько вкладок у вас обычно открыто?",
    intent: "technical_performance"
  },
  technical_browser: {
    text: "Ошибки браузера можно исправить! 🔍\n\n📋 **Стандартные шаги:**\n• Обновите браузер до последней версии\n• Отключите расширения (особенно блокировщики)\n• Очистите кэш и cookies\n• Попробуйте режим инкогнито\n\n🌐 **Рекомендуемые браузеры:**\n• Chrome (последняя версия)\n• Firefox (последняя версия)\n• Safari (для Mac)\n\nКакой у вас браузер и какая ошибка появляется?",
    intent: "technical_browser"
  },
  technical_mobile: {
    text: "Проблемы на мобильном устройстве? 📱\n\n🔧 **Попробуйте:**\n• Обновить приложение браузера\n• Перезагрузить устройство\n• Очистить кэш приложения\n• Проверить свободное место на устройстве\n\n📶 **Интернет:**\n• Переключитесь между Wi-Fi и мобильными данными\n• Проверьте качество сигнала\n\nКакое у вас устройство и что именно не работает?",
    intent: "technical_mobile"
  },
  default: {
    text: "Спасибо за вопрос! Я стараюсь стать умнее каждый день. 🤖\n\nЕсли мой ответ не помог, попробуйте:\n• Переформулировать вопрос\n• Быть более конкретным\n• Обратиться к администратору\n\nЯ здесь, чтобы помочь!",
    intent: "default"
  }
};

export const analyzeIntent = (message: string, userName?: string): BotResponse => {
  const lowerMessage = message.toLowerCase();
  
  // Приветствие и знакомство
  if (lowerMessage.includes('привет') || lowerMessage.includes('hello') || 
      lowerMessage.includes('помощь') || lowerMessage.includes('начать')) {
    const response = { ...ENHANCED_RESPONSES.greeting };
    if (userName) {
      response.text = `Привет, ${userName}! ` + response.text.substring(8);
    }
    return response;
  }
  
  // Детальный анализ технических проблем
  if (lowerMessage.includes('технические проблемы') || lowerMessage.includes('техническ')) {
    return ENHANCED_RESPONSES.technical_general;
  }
  
  // Проблемы с загрузкой
  if (lowerMessage.includes('не загружается') || lowerMessage.includes('загрузка') || 
      lowerMessage.includes('зависает') || lowerMessage.includes('медленно загружается') ||
      lowerMessage.includes('долго загружается') || lowerMessage.includes('не открывается')) {
    return ENHANCED_RESPONSES.technical_loading;
  }
  
  // Проблемы с видео и аудио
  if (lowerMessage.includes('видео') || lowerMessage.includes('звук') || 
      lowerMessage.includes('аудио') || lowerMessage.includes('не воспроизводится') ||
      lowerMessage.includes('нет звука') || lowerMessage.includes('плеер')) {
    return ENHANCED_RESPONSES.technical_video;
  }
  
  // Проблемы с производительностью
  if (lowerMessage.includes('медленно') || lowerMessage.includes('тормозит') || 
      lowerMessage.includes('лагает') || lowerMessage.includes('подвисает') ||
      lowerMessage.includes('производительность') || lowerMessage.includes('быстродействие')) {
    return ENHANCED_RESPONSES.technical_performance;
  }
  
  // Ошибки браузера
  if (lowerMessage.includes('ошибка') || lowerMessage.includes('браузер') || 
      lowerMessage.includes('не работает') || lowerMessage.includes('баг') ||
      lowerMessage.includes('глюк') || lowerMessage.includes('сбой')) {
    return ENHANCED_RESPONSES.technical_browser;
  }
  
  // Мобильные проблемы
  if (lowerMessage.includes('мобильн') || lowerMessage.includes('телефон') || 
      lowerMessage.includes('планшет') || lowerMessage.includes('смартфон') ||
      lowerMessage.includes('андроид') || lowerMessage.includes('iphone') || lowerMessage.includes('ios')) {
    return ENHANCED_RESPONSES.technical_mobile;
  }
  
  // Проблемы с входом
  if (lowerMessage.includes('вход') || lowerMessage.includes('логин') || 
      lowerMessage.includes('пароль') || lowerMessage.includes('авторизац')) {
    return ENHANCED_RESPONSES.login;
  }
  
  // Вопросы о курсах
  if (lowerMessage.includes('курс') || lowerMessage.includes('урок') || 
      lowerMessage.includes('обучени') || lowerMessage.includes('изуча')) {
    return ENHANCED_RESPONSES.courses;
  }
  
  // Прогресс и статистика
  if (lowerMessage.includes('прогресс') || lowerMessage.includes('статистика') || 
      lowerMessage.includes('результат') || lowerMessage.includes('успе')) {
    return ENHANCED_RESPONSES.progress;
  }
  
  // Достижения
  if (lowerMessage.includes('достижени') || lowerMessage.includes('наград') || 
      lowerMessage.includes('очки') || lowerMessage.includes('опыт')) {
    return ENHANCED_RESPONSES.achievements;
  }
  
  // Мотивация и поддержка
  if (lowerMessage.includes('мотивац') || lowerMessage.includes('трудно') || 
      lowerMessage.includes('сложно') || lowerMessage.includes('не получается') ||
      lowerMessage.includes('устал') || lowerMessage.includes('скучно')) {
    return ENHANCED_RESPONSES.motivation;
  }
  
  // Администрирование
  if (lowerMessage.includes('админ') || lowerMessage.includes('администратор') ||
      lowerMessage.includes('права') || lowerMessage.includes('доступ')) {
    return ENHANCED_RESPONSES.admin;
  }
  
  return ENHANCED_RESPONSES.default;
};
