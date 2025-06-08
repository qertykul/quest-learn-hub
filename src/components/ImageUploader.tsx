
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageChange,
  className = ''
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const removeCustomImage = () => {
    setUploadedImage(null);
    onImageChange(currentImage || '');
  };

  const displayImage = uploadedImage || currentImage;

  return (
    <div className={`space-y-3 ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          isDragOver 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-white/20 hover:border-blue-400/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {displayImage ? (
          <div className="relative">
            <img 
              src={displayImage} 
              alt="Обложка курса" 
              className="w-full h-32 object-cover rounded-lg"
            />
            {uploadedImage && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={removeCustomImage}
                className="absolute top-2 right-2 bg-red-500/80 border-red-400/50 text-white hover:bg-red-600/80"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Image className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-white mb-2">
                Перетащите изображение или нажмите для выбора
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Поддерживаются: JPG, PNG, WebP (до 5MB)
              </p>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {!displayImage && (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Upload className="w-4 h-4 mr-2" />
            Выбрать изображение
          </Button>
        )}
      </div>
      
      {!uploadedImage && displayImage && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Upload className="w-4 h-4 mr-2" />
          Загрузить новое изображение
        </Button>
      )}
    </div>
  );
};
