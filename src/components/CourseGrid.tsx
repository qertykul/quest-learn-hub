import React, { useState } from 'react';
import { CourseCard } from './CourseCard';
import { CourseForm } from './CourseForm';
import { CourseViewer } from './CourseViewer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { creativityCourseData } from '@/data/creativityCourse';

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
  fullLessons?: any[];
}

const initialCourses: Course[] = [
  creativityCourseData
];

export const CourseGrid = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [viewingCourse, setViewingCourse] = useState<Course | undefined>();

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'progress' | 'completedLessons'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Math.max(...courses.map(c => c.id)) + 1,
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
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Мои курсы</h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить курс
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} onClick={() => course.fullLessons && handleCourseView(course)}>
            <CourseCard 
              course={course} 
              onEdit={() => openEditForm(course)}
              onDelete={() => handleDeleteCourse(course.id)}
            />
          </div>
        ))}
      </div>

      <CourseForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSave={editingCourse ? handleEditCourse : handleAddCourse}
        course={editingCourse}
        isEditing={!!editingCourse}
      />
    </div>
  );
};
