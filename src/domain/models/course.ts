import { Course as CourseModel } from '@prisma/client';
interface Course extends CourseModel {
  isFavorite: boolean;
  skills: number[];
}

export type { Course };
