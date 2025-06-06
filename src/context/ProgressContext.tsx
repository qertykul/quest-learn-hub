
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

// Курсы с обложками книг
const initialCourses: Course[] = [
  {
    ...creativityGeniusCourse,
    author: "Ян Ставшкевич",
    level: "Начинающий",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    ...richestManInBabylonCourse,
    level: "Средний",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop"
  },
  {
    ...thinkAndGrowRichCourse,
    level: "Продвинутый",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop"
  },
  {
    ...subtleArtCourse,
    level: "Средний",
    progress: 0,
    completedLessons: 0,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
  }
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    localStorage.removeItem('learnhub_courses_old');
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

  // Все статистики привязаны к реальному прогрессу
  const getActiveUsers = () => {
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0);
    return totalProgress > 0 ? 1 : 0;
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
