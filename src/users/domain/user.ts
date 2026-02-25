import { UserRole, EmailVerificationStatus } from '../../enums';

export interface User {
  id: string;
  email: string;
  passwordHash?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null;
  emailVerificationStatus: EmailVerificationStatus;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
