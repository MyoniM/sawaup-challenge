import { Course } from '@/domain/models';
import { CreateCourseParams, CreateCourse as ICreateCourse } from '@/domain/usecases';
import { prisma } from '@/infrastructure/services/prisma';

export class CreateCourse implements ICreateCourse {
  async create(params: CreateCourseParams): Promise<Course> {
    const course = await prisma.course.create({
      data: {
        name: params.name,
        video_url: params.video_url,
        CoursesAndSkills: {
          createMany: {
            data: params.skills.map((skillId) => {
              return {
                skillId,
              };
            }),
          },
        },
      },
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
        },
      },
    });
    return {
      id: course.id,
      isFavorite: course.UserFavoriteCourses.length != 0,
      name: course.name,
      video_url: course.video_url,
      skills: course.CoursesAndSkills.map((skill) => skill.skillId),
    };
  }
}
