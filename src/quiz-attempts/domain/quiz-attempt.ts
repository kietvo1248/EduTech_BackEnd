export interface QuizAttempt {
  id: string;
  userId: string;
  questionId: string;
  quizId?: string;
  lessonId?: string;
  isCorrect: boolean;
  userAnswer: string;
  score: number; // 0-100 percentage
  totalQuestions: number;
  correctAnswers: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;
  timeSpentMs: number; // milliseconds
  completedAt?: Date;
  createdAt: Date;
}
