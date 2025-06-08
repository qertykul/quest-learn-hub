
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image } from 'lucide-react';

interface ImageDropZoneProps {
  isDragOver: boolean;
  isOptimizing: boolean;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (file: File) => void;
  showUploadButton?: boolean;
  buttonText?: string;
}

export const ImageDropZone: React.FC<ImageDropZoneProps> = ({
  isDragOver,
  isOptimizing,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  showUploadButton = true,
  buttonText = "Выбрать изображение"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
        isDragOver 
          ? 'border-blue-400 bg-blue-400/10' 
          : 'border-white/20 hover:border-blue-400/50'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {isOptimizing && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
          <div className="text-white text-sm">
            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
            Оптимизация изображения...
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Image className="w-12 h-12 text-gray-400 mx-auto" />
        <div>
          <p className="text-white mb-2">
            Перетащите изображение или нажмите для выбора
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Поддерживаются: JPG, PNG, WebP (до 5MB)<br/>
            <span className="text-xs text-blue-300">Изображения автоматически оптимизируются</span>
          </p>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      {showUploadButton && (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          disabled={isOptimizing}
        >
          <Upload className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};
