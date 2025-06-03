
import { BotResponse } from '@/types/supportBot';

export const ENHANCED_RESPONSES = {
  greeting: {
    text: "Привет! Я ваш персональный помощник EduGame. Меня зовут Эдди, и я здесь, чтобы помочь вам с любыми вопросами. Как дела с обучением?",
    intent: "greeting",
    followUp: ["Помощь с курсами", "Проблемы с входом", "Вопросы о достижениях"]
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
  technical: {
    text: "Технические проблемы случаются! 🔧\n\nЧасто помогает:\n• Обновить страницу (F5)\n• Проверить интернет-соединение\n• Попробовать другой браузер\n• Очистить кэш\n\nОпишите подробнее, что именно не работает?",
    intent: "technical"
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
  
  // Технические проблемы
  if (lowerMessage.includes('не работает') || lowerMessage.includes('ошибка') || 
      lowerMessage.includes('баг') || lowerMessage.includes('глюк') ||
      lowerMessage.includes('тормозит') || lowerMessage.includes('зависает')) {
    return ENHANCED_RESPONSES.technical;
  }
  
  // Администрирование
  if (lowerMessage.includes('админ') || lowerMessage.includes('администратор') ||
      lowerMessage.includes('права') || lowerMessage.includes('доступ')) {
    return ENHANCED_RESPONSES.admin;
  }
  
  return ENHANCED_RESPONSES.default;
};
