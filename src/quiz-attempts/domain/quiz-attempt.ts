export interface QuizAttempt {
  id: string;
  userId: string;
  questionId: string;
  isCorrect: boolean;
  userAnswer: string;
  timeSpentMs: number; // milliseconds
  createdAt: Date;
}
