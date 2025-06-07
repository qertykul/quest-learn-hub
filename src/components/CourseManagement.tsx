
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Edit, Trash2, Eye } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  author: string;
  lessons: number;
  xp: number;
  badge: string;
  level: string;
  image: string;
  progress: number;
  fullLessons?: any[];
}

interface CourseManagementProps {
  courses: Course[];
  onDeleteCourse: (courseId: number) => void;
}

export const CourseManagement: React.FC<CourseManagementProps> = ({ courses, onDeleteCourse }) => {
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewCourse = (course: Course) => {
    setPreviewCourse(course);
    setShowPreview(true);
  };

  return (
    <>
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Управление курсами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Курсы не найдены</p>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{course.badge}</div>
                    <div>
                      <h4 className="text-white font-medium">{course.title}</h4>
                      <p className="text-gray-300 text-sm">Автор: {course.author}</p>
                      <p className="text-gray-400 text-xs">{course.lessons} уроков • {course.xp} XP</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handlePreviewCourse(course)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDeleteCourse(course.id)}
                      className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Course Preview Dialog */}
      {previewCourse && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-xl border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-3">
                <span className="text-2xl">{previewCourse.badge}</span>
                {previewCourse.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                  src={previewCourse.image} 
                  alt={previewCourse.title}
                  className="w-32 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-gray-300 mb-3">{previewCourse.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Автор:</span>
                      <span className="text-white">{previewCourse.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Уровень:</span>
                      <span className="text-white">{previewCourse.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Уроков:</span>
                      <span className="text-white">{previewCourse.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Опыт:</span>
                      <span className="text-white">{previewCourse.xp} XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Прогресс:</span>
                      <span className="text-white">{previewCourse.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {previewCourse.fullLessons && previewCourse.fullLessons.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-2">Уроки курса:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {previewCourse.fullLessons.map((lesson: any, index: number) => (
                      <div key={lesson.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <span className="text-white text-sm">
                          {index + 1}. {lesson.title}
                        </span>
                        <span className="text-gray-400 text-xs">{lesson.duration} мин</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
