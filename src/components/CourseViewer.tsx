
import React, { useState } from 'react';
import { LessonViewer } from './LessonViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Trophy } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  content: string;
  exercises?: Exercise[];
  completed?: boolean;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
  type: 'text' | 'practice' | 'reflection';
  completed?: boolean;
}

interface CourseViewerProps {
  courseTitle: string;
  lessons: Lesson[];
  onBack: () => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  courseTitle,
  lessons: initialLessons,
  onBack
}) => {
  const [lessons, setLessons] = useState(initialLessons);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const handleLessonComplete = (lessonId: number) => {
    setLessons(prevLessons =>
      prevLessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );
  };

  const handleExerciseComplete = (lessonId: number, exerciseId: number) => {
    setLessons(prevLessons =>
      prevLessons.map(lesson =>
        lesson.id === lessonId
          ? {
              ...lesson,
              exercises: lesson.exercises?.map(exercise =>
                exercise.id === exerciseId
                  ? { ...exercise, completed: !exercise.completed }
                  : exercise
              )
            }
          : lesson
      )
    );
  };

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к курсам
          </Button>
          
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{completedLessons}/{lessons.length} уроков</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">{courseTitle}</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Lesson Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {lessons.map((lesson, index) => (
            <Button
              key={lesson.id}
              size="sm"
              variant={index === currentLessonIndex ? "default" : "outline"}
              onClick={() => setCurrentLessonIndex(index)}
              className={`${
                index === currentLessonIndex
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              } ${lesson.completed ? "ring-2 ring-green-400" : ""}`}
            >
              {index + 1}
              {lesson.completed && <span className="ml-1">✓</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Lesson Content */}
      <LessonViewer
        lessons={lessons}
        currentLessonIndex={currentLessonIndex}
        onLessonChange={setCurrentLessonIndex}
        onLessonComplete={handleLessonComplete}
        onExerciseComplete={handleExerciseComplete}
      />
    </div>
  );
};
