export interface Course {
  id: string;
  subjectId: string;
  gradeLevelId: string;
  authorId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  isPublished: boolean;
  isPro: boolean;
  createdAt: Date;
  updatedAt: Date;
}
