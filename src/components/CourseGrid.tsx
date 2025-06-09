
import React, { useState } from 'react';
import { CourseCard } from './CourseCard';
import { CourseForm } from './CourseForm';
import { CourseViewer } from './CourseViewer';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { Lesson } from './CourseEditor';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  author: string;
  level: string;
  xp: number;
  badge: string;
  image: string;
  lessons: number;
  completedLessons: number;
  fullLessons?: Lesson[];
}

export const CourseGrid = () => {
  const { user } = useAuth();
  const { courses, setCourses } = useProgress();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [viewingCourse, setViewingCourse] = useState<Course | undefined>();

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'progress' | 'completedLessons'>) => {
    const newCourse: Course = {
      ...courseData,
      id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      progress: 0,
      completedLessons: 0,
    };
    setCourses([...courses, newCourse]);
  };

  const handleEditCourse = (courseData: Omit<Course, 'id' | 'progress' | 'completedLessons'>) => {
    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...courseData }
          : course
      ));
      setEditingCourse(undefined);
    }
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const openEditForm = (course: Course) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCourse(undefined);
  };

  const handleCourseView = (course: Course) => {
    setViewingCourse(course);
  };

  const handleBackToCourses = () => {
    setViewingCourse(undefined);
  };

  if (viewingCourse?.fullLessons) {
    return (
      <CourseViewer
        courseTitle={viewingCourse.title}
        lessons={viewingCourse.fullLessons}
        onBack={handleBackToCourses}
        courseId={viewingCourse.id}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
        <div className="animate-slide-in">
          <h2 className="text-3xl font-light text-white mb-2">
            Мои <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">курсы</span>
          </h2>
          <p className="text-gray-400 font-light">Развивайте профессиональные навыки</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div 
            key={course.id} 
            onClick={() => course.fullLessons && handleCourseView(course)}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CourseCard 
              course={course} 
              onEdit={user?.isAdmin ? () => openEditForm(course) : undefined}
              onDelete={user?.isAdmin ? () => handleDeleteCourse(course.id) : undefined}
            />
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-16 animate-bounce-in">
          <div className="text-6xl mb-6">📚</div>
          <h3 className="text-2xl font-light text-white mb-3">Курсы не найдены</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            Скоро здесь появятся курсы
          </p>
        </div>
      )}

      {user?.isAdmin && (
        <CourseForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSave={editingCourse ? handleEditCourse : handleAddCourse}
          course={editingCourse}
          isEditing={!!editingCourse}
        />
      )}
    </div>
  );
};
