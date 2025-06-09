import sharp from 'sharp';

interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export const optimizeImage = async (imageBuffer: Buffer, options: ImageOptimizationOptions = {}): Promise<Buffer> => {
  const defaultOptions = {
    width: 800,
    quality: 80,
    format: 'webp' as const
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const optimizedImage = await sharp(imageBuffer)
      .resize(finalOptions.width)
      .toFormat(finalOptions.format, {
        quality: finalOptions.quality
      })
      .toBuffer();

    return optimizedImage;
  } catch (error) {
    console.error('Ошибка при оптимизации изображения:', error);
    return imageBuffer; // Возвращаем оригинальное изображение в случае ошибки
  }
};

export const getImageSize = async (imageBuffer: Buffer): Promise<number> => {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    return metadata.size || 0;
  } catch (error) {
    console.error('Ошибка при получении размера изображения:', error);
    return 0;
  }
};
