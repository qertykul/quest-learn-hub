import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Save } from 'lucide-react';
import { CourseBasicInfoForm } from './CourseBasicInfoForm';
import { LessonManagement } from './LessonManagement';
import { CourseImageSelector } from './CourseImageSelector';
import { CourseStatsCard } from './CourseStatsCard';


export interface Course {
  id: number;
  title: string;
  description: string;
  author: string;
  level: string;
  xp: number;
  badge: string;
  image: string;
  lessons: number;
  progress: number;
  completedLessons: number;
  fullLessons?: {
    id: number;
    title: string;
    content: string;
    duration: number;
    completed: boolean;
  }[];
  imageSize?: number;
}

interface CourseEditorProps {
  course?: Course;
  onSave: (courseData: Course) => void;
  onClose: () => void;
}

export const CourseEditor: React.FC<CourseEditorProps> = ({ course, onSave, onClose }) => {
  const [courseData, setCourseData] = useState<Course>({
    id: course?.id || Date.now(),
    title: course?.title || '',
    description: course?.description || '',
    author: course?.author || '',
    level: course?.level || '',
    xp: course?.xp || 0,
    badge: course?.badge || '',
    image: course?.image || '',
    lessons: course?.lessons || 0,
    progress: course?.progress || 0,
    completedLessons: course?.completedLessons || 0,
    fullLessons: course?.fullLessons || [],
    imageSize: course?.imageSize || 300
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

  const handleLessonAddition = (newLesson: { title: string; content: string; duration: number; }) => {
    const updatedLessons = [...(courseData.fullLessons || []), { ...newLesson, id: Date.now(), content: newLesson.content, completed: false }];
    setCourseData(prev => ({
      ...prev,
      fullLessons: updatedLessons,
      lessons: updatedLessons.length
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
              onAddLesson={handleLessonAddition}
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
