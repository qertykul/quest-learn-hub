
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const SUPPORT_RESPONSES = {
  greeting: "Привет! Я бот технической поддержки EduGame. Как я могу вам помочь?",
  login: "Для входа в систему используйте ваш email и пароль. Если забыли пароль, нажмите 'Забыли пароль?' на странице входа.",
  courses: "В разделе 'Мои курсы' вы можете просматривать доступные курсы, отслеживать прогресс и проходить уроки.",
  progress: "Ваш прогресс автоматически сохраняется при прохождении уроков. Проверить статистику можно в разделе 'Прогресс'.",
  achievements: "Достижения открываются за выполнение различных заданий. Посмотреть все достижения можно в соответствующем разделе.",
  admin: "Функции администратора доступны только пользователям с соответствующими правами. Обратитесь к администратору системы.",
  default: "Спасибо за ваш вопрос! Для более подробной помощи обратитесь к администратору или опишите проблему подробнее."
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('привет') || lowerMessage.includes('hello') || lowerMessage.includes('помощь')) {
    return SUPPORT_RESPONSES.greeting;
  }
  if (lowerMessage.includes('вход') || lowerMessage.includes('логин') || lowerMessage.includes('пароль')) {
    return SUPPORT_RESPONSES.login;
  }
  if (lowerMessage.includes('курс') || lowerMessage.includes('урок')) {
    return SUPPORT_RESPONSES.courses;
  }
  if (lowerMessage.includes('прогресс') || lowerMessage.includes('статистика')) {
    return SUPPORT_RESPONSES.progress;
  }
  if (lowerMessage.includes('достижени') || lowerMessage.includes('наград')) {
    return SUPPORT_RESPONSES.achievements;
  }
  if (lowerMessage.includes('админ') || lowerMessage.includes('администратор')) {
    return SUPPORT_RESPONSES.admin;
  }
  
  return SUPPORT_RESPONSES.default;
};

export const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: SUPPORT_RESPONSES.greeting,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
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
          <span className="font-semibold">Тех. поддержка</span>
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
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите ваш вопрос..."
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
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
