export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  author: string;
  level: string;
  xp: number;
  badge: string;
  image: string;
  lessons: number;
  progress: number;
  completedLessons: number;
  fullLessons?: Lesson[];
}

export interface ExportData {
  courses: Course[];
  exportDate: string;
  version: string;
  totalCourses: number;
  completedCourses: number;
}

export interface ImportData {
  courses: Course[];
  importDate: string;
  version: string;
  totalCourses: number;
}

export interface AdminModal {
  isOpen: boolean;
  title: string;
  operation: string;
  status: 'loading' | 'success' | 'error' | 'info';
  message: string;
  details?: string[];
}

export interface AdminModalSetter {
  (modal: AdminModal): void;
}

export interface ExportData {
  courses: Course[];
  exportDate: string;
  version: string;
  totalCourses: number;
  completedCourses: number;
}

export interface ImportData {
  courses: Course[];
  version?: string;
}
