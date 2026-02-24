export interface TeacherProfile {
  id: string;
  userId: string;
  fullName: string;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
