
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface SupportBotButtonProps {
  onClick: () => void;
}

export const SupportBotButton = ({ onClick }: SupportBotButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};
