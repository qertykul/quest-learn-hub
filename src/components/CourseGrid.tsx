
import React from 'react';
import { CourseCard } from './CourseCard';

const courses = [
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
  }
];

export const CourseGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
