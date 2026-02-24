import { GradeLevel } from '../../enums';

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  gender?: string | null;
  dateOfBirth?: Date | null;
  schoolName?: string | null;
  gradeLevel?: GradeLevel | null;
  diamondBalance: number;
  xpTotal: number;
  currentStreak: number;
  createdAt: Date;
  updatedAt: Date;
}
