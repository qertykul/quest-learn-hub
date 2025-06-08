
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageUploader } from './ImageUploader';

interface CourseImageSelectorProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export const CourseImageSelector: React.FC<CourseImageSelectorProps> = ({
  currentImage,
  onImageChange
}) => {
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
          currentImage={currentImage}
          onImageChange={onImageChange}
        />
        
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
