
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
  const { currentTheme } = useTheme();
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

  const [editingLesson, setEditingLesson] = useState<number | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', content: '', duration: 15 });

  const handleAddLesson = () => {
    const lesson: Lesson = {
      id: Math.max(...courseData.fullLessons.map(l => l.id), 0) + 1,
      ...newLesson
    };
    setCourseData(prev => ({
      ...prev,
      fullLessons: [...prev.fullLessons, lesson],
      lessons: prev.fullLessons.length + 1
    }));
    setNewLesson({ title: '', content: '', duration: 15 });
  };

  const handleDeleteLesson = (lessonId: number) => {
    setCourseData(prev => ({
      ...prev,
      fullLessons: prev.fullLessons.filter(l => l.id !== lessonId),
      lessons: prev.fullLessons.length - 1
    }));
  };

  const handleUpdateLesson = (lessonId: number, updatedLesson: Partial<Lesson>) => {
    setCourseData(prev => ({
      ...prev,
      fullLessons: prev.fullLessons.map(l => 
        l.id === lessonId ? { ...l, ...updatedLesson } : l
      )
    }));
    setEditingLesson(null);
  };

  const handleSave = () => {
    onSave(courseData);
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            {course ? 'Редактировать курс' : 'Создать курс'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">Название курса</Label>
              <Input
                id="title"
                value={courseData.title}
                onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="author" className="text-white">Автор</Label>
              <Input
                id="author"
                value={courseData.author}
                onChange={(e) => setCourseData(prev => ({ ...prev, author: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="level" className="text-white">Уровень</Label>
              <select
                id="level"
                value={courseData.level}
                onChange={(e) => setCourseData(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white"
              >
                <option value="Начинающий">Начинающий</option>
                <option value="Средний">Средний</option>
                <option value="Продвинутый">Продвинутый</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="xp" className="text-white">Опыт (XP)</Label>
              <Input
                id="xp"
                type="number"
                value={courseData.xp}
                onChange={(e) => setCourseData(prev => ({ ...prev, xp: parseInt(e.target.value) || 0 }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="badge" className="text-white">Эмодзи</Label>
              <Input
                id="badge"
                value={courseData.badge}
                onChange={(e) => setCourseData(prev => ({ ...prev, badge: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-white">Описание</Label>
            <Textarea
              id="description"
              value={courseData.description}
              onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              rows={3}
            />
          </div>

          {/* Book Cover Selection */}
          <div>
            <Label className="text-white">Выберите обложку книги</Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2">
              {bookCovers.map((cover, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    courseData.image === cover ? 'border-blue-400 scale-105' : 'border-white/20'
                  }`}
                  onClick={() => setCourseData(prev => ({ ...prev, image: cover }))}
                >
                  <img src={cover} alt={`Обложка ${index + 1}`} className="w-full h-24 object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Lessons Management */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Уроки курса ({courseData.fullLessons.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Lesson */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-3">Добавить урок</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Название урока"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    placeholder="Длительность (мин)"
                    value={newLesson.duration}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    onClick={handleAddLesson}
                    disabled={!newLesson.title}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить
                  </Button>
                </div>
                <Textarea
                  placeholder="Содержание урока"
                  value={newLesson.content}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, content: e.target.value }))}
                  className="mt-3 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  rows={3}
                />
              </div>

              {/* Existing Lessons */}
              <div className="space-y-3">
                {courseData.fullLessons.map((lesson) => (
                  <div key={lesson.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    {editingLesson === lesson.id ? (
                      <div className="space-y-3">
                        <Input
                          value={lesson.title}
                          onChange={(e) => handleUpdateLesson(lesson.id, { title: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Textarea
                          value={lesson.content}
                          onChange={(e) => handleUpdateLesson(lesson.id, { content: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => setEditingLesson(null)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingLesson(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="text-white font-medium">{lesson.title}</h5>
                          <p className="text-gray-300 text-sm mt-1">{lesson.content.substring(0, 100)}...</p>
                          <span className="text-gray-400 text-xs">{lesson.duration} мин</span>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingLesson(lesson.id)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save/Cancel Buttons */}
          <div className="flex gap-3 pt-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
