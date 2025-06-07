
export interface Course {
  id: number;
  title: string;
  author: string;
  badge: string;
  lessons: number;
  xp: number;
  progress: number;
  completedLessons: number;
}

export interface AdminModalState {
  isOpen: boolean;
  title: string;
  operation: string;
  status: 'loading' | 'success' | 'error' | 'info';
  message: string;
  details: string[];
}

export type AdminModalSetter = (modal: AdminModalState | ((prev: AdminModalState) => AdminModalState)) => void;

export interface SystemStats {
  memoryUsage: number;
  cpuUsage: number;
  dbStatus: string;
  responseTime: string;
}
