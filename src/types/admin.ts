
export interface Course {
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
