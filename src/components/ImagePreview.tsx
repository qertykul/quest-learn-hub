
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  alt: string;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  isOptimizing?: boolean;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  alt,
  onRemove,
  showRemoveButton = false,
  isOptimizing = false,
  className = "w-full h-32 object-cover rounded-lg"
}) => {
  return (
    <div className="relative">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={className}
      />
      {showRemoveButton && onRemove && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500/80 border-red-400/50 text-white hover:bg-red-600/80"
          disabled={isOptimizing}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
