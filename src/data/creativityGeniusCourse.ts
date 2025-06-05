
import {
  lesson01, lesson02, lesson03, lesson04, lesson05, lesson06,
  lesson07, lesson08, lesson09, lesson10, lesson11, lesson12
} from './lessons';

export const creativityGeniusCourse = {
  id: 1,
  title: "Путь художника",
  description: "12-недельный курс восстановления творческой личности на основе книги Джулии Кэмерон",
  progress: 0,
  author: "Ян Ставшкевич",
  level: "Начинающий",
  xp: 300,
  badge: "🎨",
  image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
  lessons: 12,
  completedLessons: 0,
  fullLessons: [
    lesson01,
    lesson02,
    lesson03,
    lesson04,
    lesson05,
    lesson06,
    lesson07,
    lesson08,
    lesson09,
    lesson10,
    lesson11,
    lesson12
  ]
};
