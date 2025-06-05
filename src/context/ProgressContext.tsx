
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
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

// Initial courses setup
const updatedCreativityCourse = {
  ...creativityGeniusCourse,
  author: "Джулия Кэмерон",
  level: "Начинающий"
};

const initialCourses: Course[] = [
  updatedCreativityCourse,
  {
    ...richestManInBabylonCourse,
    level: "Средний"
  },
  {
    ...thinkAndGrowRichCourse,
    level: "Продвинутый"
  },
  {
    ...subtleArtCourse,
    level: "Средний"
  }
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('userCourses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('userCourses', JSON.stringify(courses));
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
    getUserLevel
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
