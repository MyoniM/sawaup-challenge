import { Course } from '@/domain/models';
import { GetCourses as IGetCourses, GetCourseParams } from '@/domain/usecases/course/getAll';
import { prisma } from '@/infrastructure/services/prisma';

export class GetCourses implements IGetCourses {
  async getAll(params: GetCourseParams): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      include: {
        CoursesAndSkills: {
          select: {
            skillId: true,
          },
        },
        UserFavoriteCourses: {
          select: {
            userId: true,
          },
          where: {
            userId: params.user_id,
          },
        },
      },
    });
    return courses.map((course) => {
      return {
        id: course.id,
        isFavorite: course.UserFavoriteCourses.length != 0,
        name: course.name,
        video_url: course.video_url,
        skills: course.CoursesAndSkills.map((skill) => skill.skillId),
      };
    });
  }
}
