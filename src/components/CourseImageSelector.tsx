
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ImageUploader } from './ImageUploader';

interface CourseImageSelectorProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export const CourseImageSelector: React.FC<CourseImageSelectorProps> = ({
  currentImage,
  onImageChange
}) => {
  const [imageSize, setImageSize] = useState([100]); // Default 100%
  
  const bookCovers = [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop'
  ];

  const getImageStyle = () => {
    const scale = imageSize[0] / 100;
    return {
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      transition: 'transform 0.3s ease'
    };
  };

  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Обложка курса</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImageUploader
          currentImage={currentImage}
          onImageChange={onImageChange}
        />
        
        {/* Size Control */}
        {currentImage && (
          <div className="space-y-3">
            <Label className="text-white text-sm">Размер обложки: {imageSize[0]}%</Label>
            <Slider
              value={imageSize}
              onValueChange={setImageSize}
              max={150}
              min={50}
              step={5}
              className="w-full"
            />
            
            {/* Preview with size adjustment */}
            <div className="border border-white/20 rounded-lg p-4 bg-white/5">
              <Label className="text-white text-xs mb-2 block opacity-70">Предпросмотр размера</Label>
              <div className="flex justify-center overflow-hidden rounded-lg bg-gray-900/20">
                <div style={getImageStyle()}>
                  <img 
                    src={currentImage} 
                    alt="Предпросмотр обложки" 
                    className="w-24 h-16 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div>
          <Label className="text-white text-sm mb-2 block">Или выберите готовую обложку</Label>
          <div className="grid grid-cols-2 gap-2">
            {bookCovers.map((cover, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === cover ? 'border-blue-400 scale-105' : 'border-white/20 hover:border-blue-400/50'
                }`}
                onClick={() => onImageChange(cover)}
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
