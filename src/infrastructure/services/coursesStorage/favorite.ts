import { Course } from '@/domain/models';
import { FavoriteCourse, FavoriteParams } from '@/domain/usecases';
import { prisma } from '../prisma';

export class FavoriteCourses implements FavoriteCourse {
  async favorite(params: FavoriteParams): Promise<Course> {
    const course = await prisma.course.findUniqueOrThrow({
      where: {
        id: params.course_id,
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

    let courseData: Course = {
      id: course.id,
      isFavorite: course.UserFavoriteCourses.filter((e) => e.userId == params.user_id).length != 0,
      name: course.name,
      video_url: course.video_url,
      skills: course.CoursesAndSkills.map((skill) => skill.skillId),
    };
    if (params.favorite == courseData.isFavorite) {
      // Nothing to change here
      return courseData;
    } else if (params.favorite == false) {
      // Delete the relation between the tables
      await prisma.userFavoriteCourses.delete({
        where: {
          userId_courseId: {
            userId: params.user_id,
            courseId: params.course_id,
          },
        },
      });
      return { ...courseData, isFavorite: false };
    } else {
      // Favorite it
      await prisma.userFavoriteCourses.create({
        data: {
          courseId: params.course_id,
          userId: params.user_id,
        },
      });
      return { ...courseData, isFavorite: true };
    }
  }
}
