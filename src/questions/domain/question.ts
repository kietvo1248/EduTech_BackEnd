export interface Question {
  id: string;
  lessonId?: string;
  contentHtml: string;
  type: string; // QuestionType: MULTIPLE_CHOICE, FILL_IN_BLANK, TRUE_FALSE
  difficulty: string; // Difficulty: EASY, MEDIUM, HARD
  options: string[]; // JSON array with strings
  correctAnswer: string;
  explanation: string;
  createdAt: Date;
  updatedAt: Date;
}
