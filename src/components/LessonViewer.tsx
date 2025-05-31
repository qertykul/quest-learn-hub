
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';

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

interface LessonViewerProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  onLessonChange: (index: number) => void;
  onLessonComplete: (lessonId: number) => void;
  onExerciseComplete: (lessonId: number, exerciseId: number) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lessons,
  currentLessonIndex,
  onLessonChange,
  onLessonComplete,
  onExerciseComplete
}) => {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  
  const currentLesson = lessons[currentLessonIndex];
  
  const handleExerciseComplete = (exerciseId: number) => {
    const key = `${currentLesson.id}-${exerciseId}`;
    const newCompleted = new Set(completedExercises);
    
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    
    setCompletedExercises(newCompleted);
    onExerciseComplete(currentLesson.id, exerciseId);
  };

  const handleLessonComplete = () => {
    onLessonComplete(currentLesson.id);
  };

  const isExerciseCompleted = (exerciseId: number) => {
    return completedExercises.has(`${currentLesson.id}-${exerciseId}`);
  };

  const allExercisesCompleted = currentLesson.exercises?.every(ex => 
    isExerciseCompleted(ex.id)
  ) ?? true;

  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-8 text-white">
      {/* Lesson Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentLesson.title}</h1>
          <p className="text-gray-300 text-sm md:text-base">
            Урок {currentLessonIndex + 1} из {lessons.length}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {currentLesson.completed ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="prose prose-invert max-w-none mb-6 md:mb-8">
        <div className="text-gray-200 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {currentLesson.content}
        </div>
      </div>

      {/* Exercises */}
      {currentLesson.exercises && currentLesson.exercises.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Упражнения</h3>
          <div className="space-y-4">
            {currentLesson.exercises.map((exercise) => (
              <div key={exercise.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2 gap-4">
                  <h4 className="font-semibold text-sm md:text-base">{exercise.title}</h4>
                  <Button
                    size="sm"
                    variant={isExerciseCompleted(exercise.id) ? "default" : "outline"}
                    onClick={() => handleExerciseComplete(exercise.id)}
                    className="shrink-0"
                  >
                    {isExerciseCompleted(exercise.id) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-gray-300 text-xs md:text-sm">{exercise.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => onLessonChange(currentLessonIndex - 1)}
          disabled={currentLessonIndex === 0}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto order-1 sm:order-none"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Предыдущий урок</span>
          <span className="sm:hidden">Назад</span>
        </Button>

        <Button
          onClick={handleLessonComplete}
          disabled={!allExercisesCompleted}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 w-full sm:w-auto order-2 sm:order-none"
        >
          <span className="hidden sm:inline">Завершить урок</span>
          <span className="sm:hidden">Завершить</span>
          <CheckCircle className="w-4 h-4 ml-2" />
        </Button>

        <Button
          variant="outline"
          onClick={() => onLessonChange(currentLessonIndex + 1)}
          disabled={currentLessonIndex === lessons.length - 1}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto order-3 sm:order-none"
        >
          <span className="hidden sm:inline">Следующий урок</span>
          <span className="sm:hidden">Вперед</span>
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
