import { Course } from '@/domain/models';
import { GetCourseParams, GetCourses as IGetCourse } from '@/domain/usecases/course/getAll';

export class RemoteGetCourse implements IGetCourse {
  async getAll(params: GetCourseParams): Promise<Course[]> {
    const res = await fetch('/api/course/getAll', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return await res.json();
  }
}
