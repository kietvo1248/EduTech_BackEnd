import { UserRole } from '../../enums';

export interface User {
  id: string;
  email: string;
  passwordHash?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
