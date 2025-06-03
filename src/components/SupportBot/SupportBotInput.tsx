
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface SupportBotInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  messages: any[];
  onQuickReply: (reply: string) => void;
}

export const SupportBotInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  onKeyPress, 
  isTyping, 
  messages, 
  onQuickReply 
}: SupportBotInputProps) => {
  return (
    <>
      {/* Quick replies for first interaction */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {['Помощь с курсами', 'Мой прогресс', 'Проблемы'].map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => onQuickReply(reply)}
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
            onKeyPress={onKeyPress}
            placeholder="Напишите ваш вопрос..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
