
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, User, Award } from 'lucide-react';

interface CourseBasicInfoFormProps {
  courseData: {
    title: string;
    description: string;
    author: string;
    level: string;
    badge: string;
  };
  onUpdate: (field: string, value: string) => void;
}

export const CourseBasicInfoForm: React.FC<CourseBasicInfoFormProps> = ({
  courseData,
  onUpdate
}) => {
  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Основная информация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title" className="text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Название курса
            </Label>
            <Input
              id="title"
              value={courseData.title}
              onChange={(e) => onUpdate('title', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Введите название курса"
            />
          </div>
          
          <div>
            <Label htmlFor="author" className="text-white flex items-center gap-2">
              <User className="w-4 h-4" />
              Автор
            </Label>
            <Input
              id="author"
              value={courseData.author}
              onChange={(e) => onUpdate('author', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Имя автора"
            />
          </div>
          
          <div>
            <Label htmlFor="level" className="text-white flex items-center gap-2">
              <Award className="w-4 h-4" />
              Уровень сложности
            </Label>
            <select
              id="level"
              value={courseData.level}
              onChange={(e) => onUpdate('level', e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white"
            >
              <option value="Начинающий">Начинающий</option>
              <option value="Средний">Средний</option>
              <option value="Продвинутый">Продвинутый</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="badge" className="text-white">Эмодзи курса</Label>
            <Input
              id="badge"
              value={courseData.badge}
              onChange={(e) => onUpdate('badge', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="📚"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description" className="text-white">Описание курса</Label>
          <Textarea
            id="description"
            value={courseData.description}
            onChange={(e) => onUpdate('description', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            rows={3}
            placeholder="Подробное описание курса и чему он научит"
          />
        </div>
      </CardContent>
    </Card>
  );
};
