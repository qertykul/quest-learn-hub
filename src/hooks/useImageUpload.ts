
import { useState } from 'react';
import { useImageOptimization } from './useImageOptimization';

interface UseImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
}

export const useImageUpload = ({ currentImage, onImageChange }: UseImageUploadProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { isOptimizing, handleImageOptimization } = useImageOptimization();

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const optimizedDataUrl = await handleImageOptimization(file);
      setUploadedImage(optimizedDataUrl);
      onImageChange(optimizedDataUrl);
    }
  };

  const removeCustomImage = () => {
    setUploadedImage(null);
    onImageChange(currentImage || '');
  };

  const displayImage = uploadedImage || currentImage;

  return {
    uploadedImage,
    isDragOver,
    setIsDragOver,
    isOptimizing,
    handleFileSelect,
    removeCustomImage,
    displayImage
  };
};
