
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
  const [isOptimizing, setIsOptimizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new HTMLImageElement();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Cannot get canvas context'));
        return;
      }

      img.onload = () => {
        // Определяем максимальные размеры
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        const MAX_FILE_SIZE = 500 * 1024; // 500KB

        let { width, height } = img;

        // Масштабируем изображение если оно слишком большое
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Рисуем изображение на canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Функция для получения оптимального качества
        const getOptimizedDataUrl = (quality = 0.8): string => {
          return canvas.toDataURL('image/jpeg', quality);
        };

        let dataUrl = getOptimizedDataUrl();
        let quality = 0.8;

        // Уменьшаем качество пока размер файла не станет приемлемым
        while (dataUrl.length > MAX_FILE_SIZE * 1.37 && quality > 0.1) { // 1.37 - коэффициент для base64
          quality -= 0.1;
          dataUrl = getOptimizedDataUrl(quality);
        }

        console.log(`Изображение оптимизировано: ${width}x${height}, качество: ${Math.round(quality * 100)}%`);
        resolve(dataUrl);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsOptimizing(true);
      try {
        const optimizedDataUrl = await optimizeImage(file);
        setUploadedImage(optimizedDataUrl);
        onImageChange(optimizedDataUrl);
      } catch (error) {
        console.error('Ошибка оптимизации изображения:', error);
        // Fallback: используем оригинальное изображение
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setUploadedImage(result);
          onImageChange(result);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsOptimizing(false);
      }
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
        {isOptimizing && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
            <div className="text-white text-sm">
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
              Оптимизация изображения...
            </div>
          </div>
        )}

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
                disabled={isOptimizing}
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
                Поддерживаются: JPG, PNG, WebP (до 5MB)<br/>
                <span className="text-xs text-blue-300">Изображения автоматически оптимизируются</span>
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
            disabled={isOptimizing}
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
          disabled={isOptimizing}
        >
          <Upload className="w-4 h-4 mr-2" />
          Загрузить новое изображение
        </Button>
      )}
    </div>
  );
};
