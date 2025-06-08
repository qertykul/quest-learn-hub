
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BookOpen, Save } from 'lucide-react';
import { CourseBasicInfoForm } from './CourseBasicInfoForm';
import { LessonManagement } from './LessonManagement';
import { CourseImageSelector } from './CourseImageSelector';
import { CourseStatsCard } from './CourseStatsCard';

interface Lesson {
  id: number;
  title: string;
  content: string;
  duration: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  author: string;
  level: string;
  xp: number;
  badge: string;
  image: string;
  lessons: number;
  fullLessons?: Lesson[];
}

interface CourseEditorProps {
  course?: Course;
  onSave: (courseData: any) => void;
  onClose: () => void;
}

export const CourseEditor: React.FC<CourseEditorProps> = ({ course, onSave, onClose }) => {
  const [courseData, setCourseData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    author: course?.author || '',
    level: course?.level || 'Начинающий',
    xp: course?.xp || 100,
    badge: course?.badge || '📚',
    image: course?.image || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    lessons: course?.lessons || 0,
    fullLessons: course?.fullLessons || []
  });

  // Автоматическое обновление количества уроков при изменении массива уроков
  useEffect(() => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.fullLessons.length
    }));
  }, [courseData.fullLessons]);

  // Автоматическое обновление XP в зависимости от уровня и количества уроков
  useEffect(() => {
    const baseXP = courseData.level === 'Начинающий' ? 50 : 
                   courseData.level === 'Средний' ? 100 : 150;
    const lessonXP = courseData.fullLessons.length * 20;
    setCourseData(prev => ({
      ...prev,
      xp: baseXP + lessonXP
    }));
  }, [courseData.level, courseData.fullLessons.length]);

  const handleUpdateField = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLesson = (newLesson: Omit<Lesson, 'id'>) => {
    const lesson: Lesson = {
      id: Math.max(...courseData.fullLessons.map(l => l.id), 0) + 1,
      ...newLesson
    };
    setCourseData(prev => ({
      ...prev,
      fullLessons: [...prev.fullLessons, lesson]
    }));
  };

  const handleDeleteLesson = (lessonId: number) => {
    setCourseData(prev => ({
      ...prev,
      fullLessons: prev.fullLessons.filter(l => l.id !== lessonId)
    }));
  };

  const handleUpdateLesson = (lessonId: number, updatedLesson: Partial<Lesson>) => {
    setCourseData(prev => ({
      ...prev,
      fullLessons: prev.fullLessons.map(l => 
        l.id === lessonId ? { ...l, ...updatedLesson } : l
      )
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setCourseData(prev => ({ ...prev, image: imageUrl }));
  };

  const getTotalDuration = () => {
    return courseData.fullLessons.reduce((total, lesson) => total + lesson.duration, 0);
  };

  const handleSave = () => {
    onSave(courseData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {course ? 'Редактировать курс' : 'Создать курс'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - основная информация */}
          <div className="lg:col-span-2 space-y-6">
            <CourseBasicInfoForm
              courseData={courseData}
              onUpdate={handleUpdateField}
            />

            <LessonManagement
              lessons={courseData.fullLessons}
              onAddLesson={handleAddLesson}
              onUpdateLesson={handleUpdateLesson}
              onDeleteLesson={handleDeleteLesson}
              getTotalDuration={getTotalDuration}
            />
          </div>

          {/* Правая колонка - визуальные настройки */}
          <div className="space-y-6">
            <CourseImageSelector
              currentImage={courseData.image}
              onImageChange={handleImageChange}
            />

            <CourseStatsCard
              xp={courseData.xp}
              lessonCount={courseData.fullLessons.length}
              totalDuration={getTotalDuration()}
              level={courseData.level}
            />
          </div>
        </div>

        {/* Кнопки сохранения/отмены */}
        <div className="flex gap-3 pt-4 border-t border-white/20">
          <Button 
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            <Save className="w-4 h-4 mr-2" />
            Сохранить курс
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
