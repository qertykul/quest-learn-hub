
import React, { useState, useContext, createContext, useEffect } from 'react';
import { CourseCard } from './CourseCard';
import { CourseForm } from './CourseForm';
import { CourseViewer } from './CourseViewer';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { creativityGeniusCourse } from '@/data/creativityGeniusCourse';
import { richestManInBabylonCourse, thinkAndGrowRichCourse, subtleArtCourse } from '@/data/additionalCourses';
import { useAuth } from '@/context/AuthContext';

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

// Обновляем курс творчества с автором
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

export const CourseGrid = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('userCourses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [viewingCourse, setViewingCourse] = useState<Course | undefined>();

  // Сохраняем прогресс в localStorage
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
    return Math.floor(totalXP / 200) + 1; // Каждые 200 XP = новый уровень
  };

  const progressContextValue = {
    updateCourseProgress,
    getTotalXP,
    getCompletedCourses,
    getUserLevel
  };

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
      <ProgressContext.Provider value={progressContextValue}>
        <CourseViewer
          courseTitle={viewingCourse.title}
          lessons={viewingCourse.fullLessons}
          onBack={handleBackToCourses}
          courseId={viewingCourse.id}
        />
      </ProgressContext.Provider>
    );
  }

  return (
    <ProgressContext.Provider value={progressContextValue}>
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div className="animate-slide-in">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Мои курсы
            </h2>
            <p className="text-gray-300 text-sm md:text-base">Изучайте новое каждый день</p>
          </div>
          
          {/* Show upload button only for admin */}
          {user?.isAdmin && (
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25 animate-fade-in w-full sm:w-auto"
              style={{ animationDelay: '200ms' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Загрузить курс</span>
              <span className="sm:hidden">Курс</span>
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              onClick={() => course.fullLessons && handleCourseView(course)}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
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
          <div className="text-center py-8 md:py-12 animate-bounce-in px-4">
            <div className="text-4xl md:text-6xl mb-4">📚</div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Пока нет курсов</h3>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              {user?.isAdmin ? 'Загрузите свой первый курс, чтобы начать обучение!' : 'Скоро здесь появятся курсы!'}
            </p>
            {user?.isAdmin && (
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Загрузить первый курс
              </Button>
            )}
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
    </ProgressContext.Provider>
  );
};
