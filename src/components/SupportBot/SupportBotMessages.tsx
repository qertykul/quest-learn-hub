
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types/supportBot';

interface SupportBotMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const SupportBotMessages = ({ messages, isTyping, messagesEndRef }: SupportBotMessagesProps) => {
  return (
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
  );
};
