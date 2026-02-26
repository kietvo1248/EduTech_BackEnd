import { UserRole, EmailVerificationStatus, GradeLevel } from '../../enums';

export interface StudentProfile {
  gradeLevel: GradeLevel;
  currentStreak: number;
  diamondBalance: number;
  xpTotal: number;
}

export interface User {
  id: string;
  email: string;
  passwordHash?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null;
  studentProfile?: StudentProfile | null;
  emailVerificationStatus: EmailVerificationStatus;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
