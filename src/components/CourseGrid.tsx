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
  {
    id: 1,
    title: 'JavaScript для начинающих',
    description: 'Изучите основы JavaScript с интерактивными заданиями',
    progress: 75,
    level: 'Новичок',
    xp: 500,
    badge: '🟡',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    lessons: 24,
    completedLessons: 18
  },
  {
    id: 2,
    title: 'React Мастер-класс',
    description: 'Создавайте современные веб-приложения с React',
    progress: 40,
    level: 'Продвинутый',
    xp: 800,
    badge: '🟠',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    lessons: 32,
    completedLessons: 13
  },
  {
    id: 3,
    title: 'Python для анализа данных',
    description: 'Анализируйте данные и создавайте визуализации',
    progress: 90,
    level: 'Средний',
    xp: 650,
    badge: '🟢',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    lessons: 28,
    completedLessons: 25
  },
  {
    id: 4,
    title: 'UI/UX Дизайн',
    description: 'Создавайте красивые и функциональные интерфейсы',
    progress: 15,
    level: 'Новичок',
    xp: 300,
    badge: '🔵',
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=300&fit=crop',
    lessons: 20,
    completedLessons: 3
  },
  {
    id: 5,
    title: 'Machine Learning',
    description: 'Погрузитесь в мир искусственного интеллекта',
    progress: 60,
    level: 'Эксперт',
    xp: 1200,
    badge: '🟣',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    lessons: 40,
    completedLessons: 24
  },
  {
    id: 6,
    title: 'Web Development',
    description: 'Полный курс веб-разработки от начала до конца',
    progress: 25,
    level: 'Средний',
    xp: 750,
    badge: '🔴',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    lessons: 50,
    completedLessons: 12
  },
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
