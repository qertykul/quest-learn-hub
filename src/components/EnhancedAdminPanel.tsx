
import React, { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { AdminStats } from './AdminStats';
import { CourseEditor } from './CourseEditor';
import { AdminToolsModal } from './AdminToolsModal';
import { SystemToolsGrid } from './SystemToolsGrid';
import { CourseManagementSection } from './CourseManagementSection';
import { CoursePreviewDialog } from './CoursePreviewDialog';
import { useAdminOperations } from './AdminOperations';

export const EnhancedAdminPanel = () => {
  const { courses, setCourses } = useProgress();
  const { currentTheme } = useTheme();
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [previewCourse, setPreviewCourse] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { showAdminModal } = useAdminOperations();
  
  // Состояние для модального окна админ-инструментов
  const [adminModal, setAdminModal] = useState({
    isOpen: false,
    title: '',
    operation: '',
    status: 'info' as 'loading' | 'success' | 'error' | 'info',
    message: '',
    details: [] as string[]
  });

  const closeAdminModal = () => {
    setAdminModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setShowCourseEditor(true);
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setShowCourseEditor(true);
  };

  const handlePreviewCourse = (course: any) => {
    console.log('Opening course preview for:', course.title);
    setPreviewCourse(course);
    setShowPreview(true);
  };

  const handleSaveCourse = (courseData: any) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData } : c));
      showAdminModal(setAdminModal, 'Управление курсами', 'Обновление курса', 'success', 'Курс успешно обновлен');
    } else {
      const newCourse = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        progress: 0,
        completedLessons: 0,
        ...courseData
      };
      setCourses(prev => [...prev, newCourse]);
      showAdminModal(setAdminModal, 'Управление курсами', 'Создание курса', 'success', 'Курс успешно создан');
    }
    setShowCourseEditor(false);
  };

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

      {/* Course Editor */}
      {showCourseEditor && (
        <CourseEditor
          course={editingCourse}
          onSave={handleSaveCourse}
          onClose={() => setShowCourseEditor(false)}
        />
      )}

      {/* Admin Tools Modal */}
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
