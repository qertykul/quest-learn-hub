
import React, { useState, useCallback, useEffect } from 'react';
import Cropper, { Area as CropperArea } from 'react-easy-crop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider'; // Оставим для зума
import { Button } from '@/components/ui/button'; // Для кнопки "Применить обрезку"
import { ImageUploader } from './ImageUploader';
import getCroppedImg, { Area as CropArea } from '@/utils/cropImage';

interface CourseImageSelectorProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export const CourseImageSelector: React.FC<CourseImageSelectorProps> = ({
  currentImage,
  onImageChange
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(currentImage);

  useEffect(() => {
    // Если currentImage меняется извне (например, выбрали пресет), обновляем imageToCrop
    // и сбрасываем состояние кропа, чтобы не пытаться кропать старое изображение с новыми координатами
    if (currentImage !== imageToCrop) {
        setImageToCrop(currentImage);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
    }
  }, [currentImage]); // Не добавляем imageToCrop в зависимости, чтобы избежать цикла

  const onCropComplete = useCallback((croppedArea: CropperArea, croppedAreaPixelsValue: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  }, []);

  const handleApplyCrop = async () => {
    if (imageToCrop && croppedAreaPixels) {
      try {
        const croppedImageUrl = await getCroppedImg(imageToCrop, croppedAreaPixels);
        if (croppedImageUrl) {
          onImageChange(croppedImageUrl); // Передаем URL обрезанного изображения
        }
      } catch (e) {
        console.error('Ошибка при обрезке изображения:', e);
      }
    }
  };

  const handleImageUploaded = (newImageUrl: string) => {
    setImageToCrop(newImageUrl); // Устанавливаем новое изображение для кроппера
    // Не вызываем onImageChange здесь, ждем применения обрезки
    // onImageChange(newImageUrl); // Старая логика, если не было кропа
  };
  
  const bookCovers = [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop'
  ];



  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Обложка курса</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImageUploader
          currentImage={imageToCrop} // Показываем то, что сейчас в кроппере или было загружено
          onImageChange={handleImageUploaded} // Перехватываем загрузку для кроппера
        />
        
        {/* Cropper and Controls */} 
        {imageToCrop && (
          <div className="space-y-4 mt-4">
            <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3} // Установите желаемые пропорции (например, 4:3, 16:9, 1:1)
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-sm">Приближение</Label>
              <Slider
                value={[zoom]}
                onValueChange={(val) => setZoom(val[0])}
                min={1}
                max={3}
                step={0.05}
                className="w-full"
              />
            </div>
            <Button onClick={handleApplyCrop} className="w-full bg-green-500 hover:bg-green-600">
              Применить обрезку
            </Button>
          </div>
        )}

        {/* Old Size Control - REMOVED */}
        {/* Preview with size adjustment - REMOVED */} 
        {/* The old preview is replaced by the Cropper itself */} 


        
        <div>
          <Label className="text-white text-sm mb-2 block">Или выберите готовую обложку</Label>
          <div className="grid grid-cols-2 gap-2">
            {bookCovers.map((cover, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === cover ? 'border-blue-400 scale-105' : 'border-white/20 hover:border-blue-400/50'
                }`}
                onClick={() => {
                  // При выборе пресета, мы напрямую меняем currentImage через onImageChange.
                  // useEffect выше позаботится об обновлении imageToCrop для кроппера.
                  onImageChange(cover);
                }}
              >
                <img src={cover} alt={`Обложка ${index + 1}`} className="w-full h-16 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
