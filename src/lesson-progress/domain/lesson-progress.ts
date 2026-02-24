export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  lastWatchedSec: number; // seconds
  updatedAt: Date;
  createdAt: Date;
}
