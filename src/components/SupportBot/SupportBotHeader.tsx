
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X } from 'lucide-react';

interface SupportBotHeaderProps {
  onClose: () => void;
}

export const SupportBotHeader = ({ onClose }: SupportBotHeaderProps) => {
  return (
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
        onClick={onClose}
        className="text-white hover:bg-white/20 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
