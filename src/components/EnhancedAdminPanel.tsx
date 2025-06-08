
import React, { useState, useCallback } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { AdminStats } from './AdminStats';
import { CourseEditor } from './CourseEditor';
import { AdminToolsModal } from './AdminToolsModal';
import { SystemToolsGrid } from './SystemToolsGrid';
import { CourseManagementSection } from './CourseManagementSection';
import { CoursePreviewDialog } from './CoursePreviewDialog';
import { useAdminOperations } from './AdminOperations';
import type { AdminModalState } from '@/types/admin';

// Use Course type from ProgressContext to ensure consistency
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

export const EnhancedAdminPanel = () => {
  const { courses, setCourses } = useProgress();
  const { currentTheme } = useTheme();
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { showAdminModal } = useAdminOperations();
  
  const [adminModal, setAdminModal] = useState<AdminModalState>({
    isOpen: false,
    title: '',
    operation: '',
    status: 'info',
    message: '',
    details: []
  });

  const closeAdminModal = useCallback(() => {
    setAdminModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleCreateCourse = useCallback(() => {
    setEditingCourse(null);
    setShowCourseEditor(true);
  }, []);

  const handleEditCourse = useCallback((course: Course) => {
    setEditingCourse(course);
    setShowCourseEditor(true);
  }, []);

  const handlePreviewCourse = useCallback((course: Course) => {
    console.log('Opening course preview for:', course.title);
    setPreviewCourse(course);
    setShowPreview(true);
  }, []);

  const handleSaveCourse = useCallback((courseData: Partial<Course>) => {
    try {
      if (editingCourse) {
        setCourses(prev => prev.map(c => 
          c.id === editingCourse.id ? { ...c, ...courseData } : c
        ));
        showAdminModal(setAdminModal, 'Управление курсами', 'Обновление курса', 'success', 'Курс успешно обновлен');
      } else {
        const newCourse: Course = {
          id: Math.max(...courses.map(c => c.id), 0) + 1,
          progress: 0,
          completedLessons: 0,
          title: '',
          author: '',
          badge: '📚',
          lessons: 0,
          xp: 0,
          ...courseData
        } as Course;
        setCourses(prev => [...prev, newCourse]);
        showAdminModal(setAdminModal, 'Управление курсами', 'Создание курса', 'success', 'Курс успешно создан');
      }
      setShowCourseEditor(false);
    } catch (error) {
      console.error('Error saving course:', error);
      showAdminModal(setAdminModal, 'Управление курсами', 'Ошибка сохранения', 'error', 'Не удалось сохранить курс');
    }
  }, [editingCourse, courses, setCourses, showAdminModal]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-light ${currentTheme.foreground} mb-2`}>
            Расширенная панель <span className={`font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>управления</span>
          </h2>
          <p className={currentTheme.muted}>Полное управление платформой LearnHub</p>
        </div>
      </div>

      <AdminStats />

      <CourseManagementSection
        onCreateCourse={handleCreateCourse}
        onEditCourse={handleEditCourse}
        onPreviewCourse={handlePreviewCourse}
        setAdminModal={setAdminModal}
      />

      <SystemToolsGrid setAdminModal={setAdminModal} />

      <CoursePreviewDialog
        course={previewCourse}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onEdit={handleEditCourse}
        setAdminModal={setAdminModal}
      />

      {showCourseEditor && (
        <CourseEditor
          course={editingCourse}
          onSave={handleSaveCourse}
          onClose={() => setShowCourseEditor(false)}
        />
      )}

      <AdminToolsModal
        isOpen={adminModal.isOpen}
        onClose={closeAdminModal}
        title={adminModal.title}
        operation={adminModal.operation}
        status={adminModal.status}
        message={adminModal.message}
        details={adminModal.details}
      />
    </div>
  );
};
