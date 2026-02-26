export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  lastWatchedSec: number; // seconds
  progressPercent: number; // 0-100
  videoWatched: boolean;
  videoCurrentTime: number; // seconds
  videoDuration: number; // seconds  
  quizCompleted: boolean;
  quizScore?: number; // 0-100
  lastWatchedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
}
