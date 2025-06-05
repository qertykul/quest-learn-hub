
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Edit, Trash2, Eye } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  author: string;
  lessons: number;
  xp: number;
  badge: string;
}

interface CourseManagementProps {
  courses: Course[];
  onDeleteCourse: (courseId: number) => void;
}

export const CourseManagement: React.FC<CourseManagementProps> = ({ courses, onDeleteCourse }) => {
  return (
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
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
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
  );
};
