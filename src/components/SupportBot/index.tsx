
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Message } from '@/types/supportBot';
import { analyzeIntent } from '@/utils/botResponses';
import { SupportBotButton } from './SupportBotButton';
import { SupportBotHeader } from './SupportBotHeader';
import { SupportBotMessages } from './SupportBotMessages';
import { SupportBotInput } from './SupportBotInput';

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
  }, [messages, messages.length]);

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
    return <SupportBotButton onClick={() => setIsOpen(true)} />;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-scale-in">
      <SupportBotHeader onClose={() => setIsOpen(false)} />
      
      <SupportBotMessages 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <SupportBotInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={sendMessage}
        onKeyPress={handleKeyPress}
        isTyping={isTyping}
        messages={messages}
        onQuickReply={handleQuickReply}
      />
    </div>
  );
};
