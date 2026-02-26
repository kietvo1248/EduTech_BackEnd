export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  orderIndex: number;
  durationSeconds: number;
  videoUrl: string;
  quizId?: string; // Thêm để link với quiz
  contentMd: string;
  isPreview: boolean;
  createdAt: Date;
  updatedAt: Date;
}
