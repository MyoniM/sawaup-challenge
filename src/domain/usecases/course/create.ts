import { Course } from '@/domain/models';

export interface CreateCourseParams {
  name: string;
  video_url: string;
  skills: number[];
}

export interface CreateCourse {
  create(params: CreateCourseParams): Promise<Course>;
}
