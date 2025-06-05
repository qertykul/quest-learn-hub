
import { BotResponse } from '@/types/supportBot';

export const ENHANCED_RESPONSES = {
  greeting: {
    text: "Привет! 👋 Я Алекс, ваш персональный ассистент в LearnHub Pro. Готов помочь вам максимально эффективно использовать платформу. С чего начнем?",
    intent: "greeting",
    followUp: ["Выбор курса", "Отслеживание прогресса", "Технические вопросы", "Сертификация"]
  },
  login: {
    text: "Понимаю, проблемы с входом могут расстраивать 😔\n\nДавайте решим это пошагово:\n\n✅ Проверьте правильность email и пароля\n✅ Убедитесь, что Caps Lock отключен\n✅ Попробуйте функцию восстановления пароля\n✅ Очистите кэш браузера (Ctrl+Shift+Del)\n\nЕсли проблема сохраняется, опишите подробнее что происходит - я найду решение!",
    intent: "login"
  },
  courses: {
    text: "Отличный вопрос! 🎯 По курсам я могу помочь с:\n\n📚 **Выбором курса** - подберу подходящий по вашим целям\n📈 **Отслеживанием прогресса** - покажу где посмотреть статистику\n💡 **Пониманием материала** - объясню сложные моменты\n🏆 **Получением сертификатов** - расскажу про требования\n\nЧто именно вас интересует?",
    intent: "courses"
  },
  progress: {
    text: "Прогресс - это ваша мотивация! 📊\n\nВ LearnHub Pro мы отслеживаем:\n\n✨ **Завершенные уроки** - каждый шаг засчитывается\n⚡ **Накопленный опыт** - растет с каждым достижением\n🎖️ **Заработанные сертификаты** - подтверждение ваших навыков\n📈 **Статистика обучения** - детальная аналитика вашего роста\n\nВ разделе 'Прогресс' вы найдете всю аналитику. Хотите узнать что-то конкретное?",
    intent: "progress"
  },
  achievements: {
    text: "Достижения - это признание вашего труда! 🏆\n\nВ LearnHub Pro вы можете заработать:\n🎯 **Сертификаты завершения** - за полное прохождение курсов\n💪 **Значки мастерства** - за решение сложных задач\n🔥 **Награды за постоянство** - за ежедневное обучение\n👥 **Признание сообщества** - за помощь другим студентам\n\nКакие достижения вас больше всего мотивируют?",
    intent: "achievements"
  },
  admin: {
    text: "Админ-панель доступна только пользователям с соответствующими правами доступа. Если вы должны иметь административные права, но не видите панель управления, обратитесь к системному администратору для проверки ваших полномочий.",
    intent: "admin"
  },
  motivation: {
    text: "Я понимаю! 💪 Иногда мотивация может ослабевать, это абсолютно нормально.\n\nВот что поможет:\n🎯 **Разбейте большие цели на маленькие** - каждый урок это победа\n🏆 **Отмечайте прогресс** - радуйтесь каждому достижению\n👥 **Найдите единомышленников** - обучение веселее в компании\n🌟 **Вспомните зачем начали** - ваши цели стоят усилий\n\nВы уже на правильном пути, продолжайте! Что поможет вам сегодня?",
    intent: "motivation"
  },
  technical_general: {
    text: "Технические проблемы - мой конек! 🔧\n\nДавайте разберемся по шагам:\n\n🔄 **Быстрое решение:** обновите страницу (F5)\n🌐 **Проверьте интернет** - стабильное ли соединение?\n🔋 **Попробуйте другой браузер** - Chrome или Firefox\n🧹 **Очистите кэш** - иногда помогает 'магически'\n\nОпишите подробнее что не работает, и я дам точный совет!",
    intent: "technical_general",
    followUp: ["Проблемы с загрузкой", "Ошибки браузера", "Проблемы с видео", "Медленная работа"]
  },
  technical_loading: {
    text: "Проблемы с загрузкой? Решаем! ⚡\n\n🌐 **Интернет-соединение:**\n• Проверьте скорость интернета\n• Попробуйте другую Wi-Fi сеть\n• Отключите VPN (если используется)\n\n💻 **Браузер:**\n• Обновите до последней версии\n• Отключите блокировщики рекламы\n• Попробуйте режим инкогнито\n\n📱 **На мобильном устройстве:**\n• Перезапустите приложение браузера\n• Освободите место в памяти\n\nНа каком этапе происходит зависание?",
    intent: "technical_loading"
  },
  technical_video: {
    text: "Проблемы с видео решаются проще чем кажется! 🎥\n\n🎬 **Воспроизведение:**\n• Попробуйте другое качество видео (настройки в плеере)\n• Обновите браузер\n• Проверьте плагины (Flash, HTML5)\n\n🔊 **Звук:**\n• Проверьте громкость системы\n• Убедитесь что звук не отключен на вкладке\n• Попробуйте другие наушники/колонки\n\n⚙️ **Настройки:**\n• Отключите расширения браузера\n• Попробуйте режим инкогнито\n\nВ чем именно проблема с видео?",
    intent: "technical_video"
  },
  technical_performance: {
    text: "Ускоряем работу платформы! 🚀\n\n⚡ **Быстрые решения:**\n• Закройте лишние вкладки (оставьте 5-7)\n• Перезапустите браузер\n• Очистите кэш и файлы cookie\n• Закройте ненужные программы\n\n💾 **Долгосрочные решения:**\n• Обновите браузер до последней версии\n• Проверьте свободное место на диске (минимум 1 ГБ)\n• Перезагрузите компьютер\n• Проверьте на вирусы\n\nСколько вкладок у вас обычно открыто?",
    intent: "technical_performance"
  },
  technical_browser: {
    text: "Разберемся с ошибками браузера! 🔍\n\n📋 **Стандартный алгоритм:**\n• Обновите браузер (версия должна быть свежей)\n• Отключите все расширения\n• Очистите кэш и cookies\n• Попробуйте режим инкогнито\n\n🌐 **Рекомендуемые браузеры:**\n• Google Chrome (актуальная версия)\n• Mozilla Firefox (актуальная версия)\n• Microsoft Edge (для Windows)\n• Safari (для Mac)\n\nКакой у вас браузер и какая именно ошибка появляется?",
    intent: "technical_browser"
  },
  technical_mobile: {
    text: "Мобильные проблемы тоже решаемы! 📱\n\n🔧 **Попробуйте:**\n• Обновить браузер через App Store/Google Play\n• Перезагрузить устройство\n• Очистить кэш приложения браузера\n• Освободить место в памяти (удалить ненужные фото/приложения)\n\n📶 **Интернет:**\n• Переключитесь между Wi-Fi и мобильными данными\n• Проверьте качество сигнала\n• Попробуйте другую точку доступа Wi-Fi\n\nКакое у вас устройство и что именно не работает?",
    intent: "technical_mobile"
  },
  default: {
    text: "Спасибо за интересный вопрос! 🤔 Я постоянно учусь и становлюсь умнее.\n\nЕсли мой ответ не помог:\n💬 **Переформулируйте вопрос** - возможно, я лучше пойму\n🎯 **Будьте конкретнее** - детали помогут дать точный ответ\n👨‍💻 **Обратитесь к техподдержке** - для сложных случаев\n\nЯ всегда рад помочь! Попробуем еще раз?",
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
      response.text = `Привет, ${userName}! 👋 ` + response.text.substring(11);
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
