
import { useState } from 'react';

export const useImageOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

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

  const handleImageOptimization = async (file: File): Promise<string> => {
    setIsOptimizing(true);
    try {
      return await optimizeImage(file);
    } catch (error) {
      console.error('Ошибка оптимизации изображения:', error);
      // Fallback: используем оригинальное изображение
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          resolve(result);
        };
        reader.readAsDataURL(file);
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return {
    isOptimizing,
    handleImageOptimization
  };
};
