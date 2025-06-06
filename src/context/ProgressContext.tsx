
import React, { createContext, useContext, useState, useEffect } from 'react';
import { creativityGeniusCourse } from '@/data/creativityGeniusCourse';
import { richestManInBabylonCourse, thinkAndGrowRichCourse, subtleArtCourse } from '@/data/additionalCourses';

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
  fullLessons?: any[];
}

interface ProgressContextType {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  updateCourseProgress: (courseId: number, lessonsCompleted: number) => void;
  getTotalXP: () => number;
  getCompletedCourses: () => number;
  getUserLevel: () => number;
  resetAllProgress: () => void;
  getActiveUsers: () => number;
  getActiveSessions: () => number;
  getAverageCompletionRate: () => number;
  getStreakDays: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

// Курсы с реальными обложками книг
const initialCourses: Course[] = [
  {
    ...creativityGeniusCourse,
    author: "Ян Ставшкевич",
    level: "Начинающий",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop" // книга с текстом
  },
  {
    ...richestManInBabylonCourse,
    level: "Средний",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop" // книга о финансах
  },
  {
    ...thinkAndGrowRichCourse,
    level: "Продвинутый",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" // бизнес книга
  },
  {
    ...subtleArtCourse,
    level: "Средний",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" // книга по психологии
  }
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('learnhub_courses_progress');
    if (savedCourses) {
      try {
        return JSON.parse(savedCourses);
      } catch {
        return initialCourses;
      }
    }
    return initialCourses;
  });

  useEffect(() => {
    localStorage.setItem('learnhub_courses_progress', JSON.stringify(courses));
  }, [courses]);

  const updateCourseProgress = (courseId: number, lessonsCompleted: number) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const progress = Math.round((lessonsCompleted / course.lessons) * 100);
          return {
            ...course,
            completedLessons: lessonsCompleted,
            progress: progress
          };
        }
        return course;
      })
    );
  };

  const resetAllProgress = () => {
    setCourses(initialCourses);
    localStorage.removeItem('learnhub_courses_progress');
  };

  const getTotalXP = () => {
    return courses.reduce((total, course) => {
      const completionRate = course.progress / 100;
      return total + Math.round(course.xp * completionRate);
    }, 0);
  };

  const getCompletedCourses = () => {
    return courses.filter(course => course.progress === 100).length;
  };

  const getUserLevel = () => {
    const totalXP = getTotalXP();
    return Math.floor(totalXP / 200) + 1;
  };

  const getStreakDays = () => {
    const totalXP = getTotalXP();
    return Math.min(Math.floor(totalXP / 50), 30);
  };

  // Реальная статистика на основе фактического прогресса
  const getActiveUsers = () => {
    const hasAnyProgress = courses.some(course => course.progress > 0);
    return hasAnyProgress ? 1 : 0;
  };

  const getActiveSessions = () => {
    const hasActiveProgress = courses.some(course => course.progress > 0 && course.progress < 100);
    return hasActiveProgress ? 1 : 0;
  };

  const getAverageCompletionRate = () => {
    if (courses.length === 0) return 0;
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / courses.length);
  };

  const value = {
    courses,
    setCourses,
    updateCourseProgress,
    getTotalXP,
    getCompletedCourses,
    getUserLevel,
    resetAllProgress,
    getActiveUsers,
    getActiveSessions,
    getAverageCompletionRate,
    getStreakDays
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
