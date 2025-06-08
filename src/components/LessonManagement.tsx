
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  content: string;
  duration: number;
}

interface LessonManagementProps {
  lessons: Lesson[];
  onAddLesson: (lesson: Omit<Lesson, 'id'>) => void;
  onUpdateLesson: (lessonId: number, updatedLesson: Partial<Lesson>) => void;
  onDeleteLesson: (lessonId: number) => void;
  getTotalDuration: () => number;
}

export const LessonManagement: React.FC<LessonManagementProps> = ({
  lessons,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  getTotalDuration
}) => {
  const [editingLesson, setEditingLesson] = useState<number | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', content: '', duration: 15 });

  const handleAddLesson = () => {
    if (!newLesson.title.trim()) return;
    
    onAddLesson(newLesson);
    setNewLesson({ title: '', content: '', duration: 15 });
  };

  const handleUpdateLesson = (lessonId: number, updatedLesson: Partial<Lesson>) => {
    onUpdateLesson(lessonId, updatedLesson);
    setEditingLesson(null);
  };

  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Уроки курса
          </div>
          <div className="text-sm text-gray-300">
            {lessons.length} уроков • {getTotalDuration()} мин
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Добавление нового урока */}
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
              disabled={!newLesson.title.trim()}
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

        {/* Список существующих уроков */}
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
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
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-sm font-medium">Урок {index + 1}</span>
                      <span className="text-gray-400 text-xs">{lesson.duration} мин</span>
                    </div>
                    <h5 className="text-white font-medium">{lesson.title}</h5>
                    <p className="text-gray-300 text-sm mt-1">
                      {lesson.content ? lesson.content.substring(0, 100) + '...' : 'Содержание не добавлено'}
                    </p>
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
                      onClick={() => onDeleteLesson(lesson.id)}
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
  );
};
