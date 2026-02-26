import { GradeLevel, CourseStatus, CourseType } from '../../enums';

export interface Course {
  id: string;
  subjectId: string;
  gradeLevelId: string;
  gradeLevel: GradeLevel;
  authorId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  status: CourseStatus; // Changed from isPublished to status
  type: CourseType; // Changed from isPro to type
  isDeleted: boolean; // Soft delete support
  deletedAt?: Date | null; // Soft delete timestamp
  createdAt: Date;
  updatedAt: Date;
}
