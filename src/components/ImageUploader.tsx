
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImagePreview } from './ImagePreview';
import { ImageDropZone } from './ImageDropZone';

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
  const {
    uploadedImage,
    isDragOver,
    setIsDragOver,
    isOptimizing,
    handleFileSelect,
    removeCustomImage,
    displayImage
  } = useImageUpload({ currentImage, onImageChange });

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

  return (
    <div className={`space-y-3 ${className}`}>
      {displayImage ? (
        <ImagePreview
          imageUrl={displayImage}
          alt="Обложка курса"
          onRemove={removeCustomImage}
          showRemoveButton={!!uploadedImage}
          isOptimizing={isOptimizing}
        />
      ) : (
        <ImageDropZone
          isDragOver={isDragOver}
          isOptimizing={isOptimizing}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />
      )}
      
      {!uploadedImage && displayImage && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                handleFileSelect(file);
              }
            };
            input.click();
          }}
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
