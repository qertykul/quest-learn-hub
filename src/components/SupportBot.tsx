import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  intent?: string;
}

interface BotResponse {
  text: string;
  intent: string;
  followUp?: string[];
}

const ENHANCED_RESPONSES = {
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

const analyzeIntent = (message: string, userName?: string): BotResponse => {
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

export const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Инициализация с персонализированным приветствием
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeResponse = analyzeIntent('привет', user?.username);
      setMessages([{
        id: 1,
        text: welcomeResponse.text,
        isBot: true,
        timestamp: new Date(),
        intent: welcomeResponse.intent
      }]);
    }
  }, [isOpen, user?.username]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Более реалистичная задержка ответа
    setTimeout(() => {
      const botResponse = analyzeIntent(inputMessage, user?.username);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        intent: botResponse.intent
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Добавляем follow-up вопросы если есть
      if (botResponse.followUp && botResponse.followUp.length > 0) {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: Date.now() + 2,
            text: `Вот несколько популярных тем:\n${botResponse.followUp!.map(item => `• ${item}`).join('\n')}\n\nВыберите что интересует или задайте свой вопрос!`,
            isBot: true,
            timestamp: new Date(),
            intent: 'followup'
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 1500);
      }
    }, 800 + Math.random() * 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => sendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <div>
            <span className="font-semibold">Эдди</span>
            <div className="text-xs opacity-90">Умный помощник</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <Bot className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              }`}
            >
              <div className="whitespace-pre-line">{message.text}</div>
              <div className={`text-xs mt-1 opacity-70 ${
                message.isBot ? 'text-gray-500' : 'text-white'
              }`}>
                {message.timestamp.toLocaleTimeString('ru-RU', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
            {!message.isBot && (
              <User className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-2">
            <Bot className="h-6 w-6 text-blue-500 mt-1" />
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies for first interaction */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {['Помощь с курсами', 'Мой прогресс', 'Проблемы'].map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-xs h-7 px-2"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите ваш вопрос..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
