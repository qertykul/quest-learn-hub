
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface AdminToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  operation: string;
  status: 'loading' | 'success' | 'error' | 'info';
  message: string;
  details?: string[];
}

export const AdminToolsModal: React.FC<AdminToolsModalProps> = ({
  isOpen,
  onClose,
  title,
  operation,
  status,
  message,
  details = []
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-400" />;
      case 'info':
        return <AlertCircle className="w-8 h-8 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-300';
      case 'success':
        return 'text-green-300';
      case 'error':
        return 'text-red-300';
      case 'info':
        return 'text-yellow-300';
      default:
        return 'text-white';
    }
  };

  const handleClose = () => {
    if (status !== 'loading') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-black/95 backdrop-blur-xl border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3">
            {getStatusIcon()}
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {operation}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center">
            <p className={`font-medium ${getStatusColor()}`}>{message}</p>
          </div>

          {details.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">Детали:</h4>
              <ul className="space-y-1">
                {details.map((detail, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {status !== 'loading' && (
            <div className="flex justify-end pt-4">
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
              >
                Закрыть
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
