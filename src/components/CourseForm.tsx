
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  level: string;
  xp: number;
  badge: string;
  image: string;
  lessons: number;
  completedLessons: number;
}

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<Course, 'id' | 'progress' | 'completedLessons'>) => void;
  course?: Course;
  isEditing?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  isOpen,
  onClose,
  onSave,
  course,
  isEditing = false,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: course ? {
      title: course.title,
      description: course.description,
      level: course.level,
      xp: course.xp,
      badge: course.badge,
      image: course.image,
      lessons: course.lessons,
    } : {
      title: '',
      description: '',
      level: 'Новичок',
      xp: 100,
      badge: '🟡',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      lessons: 10,
    }
  });

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      xp: Number(data.xp),
      lessons: Number(data.lessons),
    });
    reset();
    onClose();
  };

  const levels = ['Новичок', 'Средний', 'Продвинутый', 'Эксперт'];
  const badges = ['🟡', '🟠', '🟢', '🔵', '🟣', '🔴'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Редактировать курс' : 'Добавить новый курс'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Название курса</Label>
            <Input
              id="title"
              {...register('title', { required: 'Название обязательно' })}
              placeholder="Введите название курса"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Описание обязательно' })}
              placeholder="Введите описание курса"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="level">Уровень сложности</Label>
            <select
              id="level"
              {...register('level')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="badge">Эмодзи курса</Label>
            <select
              id="badge"
              {...register('badge')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              {badges.map((badge) => (
                <option key={badge} value={badge}>{badge}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="xp">Награда XP</Label>
            <Input
              id="xp"
              type="number"
              {...register('xp', { required: 'XP обязательно', min: 1 })}
              placeholder="100"
            />
            {errors.xp && (
              <p className="text-red-500 text-sm mt-1">{errors.xp.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lessons">Количество уроков</Label>
            <Input
              id="lessons"
              type="number"
              {...register('lessons', { required: 'Количество уроков обязательно', min: 1 })}
              placeholder="10"
            />
            {errors.lessons && (
              <p className="text-red-500 text-sm mt-1">{errors.lessons.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="image">URL изображения</Label>
            <Input
              id="image"
              {...register('image', { required: 'URL изображения обязателен' })}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500">
              {isEditing ? 'Сохранить' : 'Добавить курс'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
