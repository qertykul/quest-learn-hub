
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
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

// Initial courses setup with reset progress
const updatedCreativityCourse = {
  ...creativityGeniusCourse,
  author: "Ян Ставшкевич",
  level: "Начинающий",
  progress: 0,
  completedLessons: 0
};

const initialCourses: Course[] = [
  updatedCreativityCourse,
  {
    ...richestManInBabylonCourse,
    level: "Средний",
    progress: 0,
    completedLessons: 0
  },
  {
    ...thinkAndGrowRichCourse,
    level: "Продвинутый",
    progress: 0,
    completedLessons: 0
  },
  {
    ...subtleArtCourse,
    level: "Средний",
    progress: 0,
    completedLessons: 0
  }
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('learnhub_courses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });

  // Save progress to localStorage with new key
  useEffect(() => {
    localStorage.setItem('learnhub_courses', JSON.stringify(courses));
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
    localStorage.removeItem('learnhub_courses');
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
    return Math.floor(totalXP / 200) + 1; // Every 200 XP = new level
  };

  const value = {
    courses,
    setCourses,
    updateCourseProgress,
    getTotalXP,
    getCompletedCourses,
    getUserLevel,
    resetAllProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
