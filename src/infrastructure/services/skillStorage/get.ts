import { Skill } from '@/domain/models';
import { GetSkillParams, GetSkills as IGetSkills } from '@/domain/usecases/skill/getAll';
import { prisma } from '@/infrastructure/services/prisma';

export class GetSkills implements IGetSkills {
  async getAll(params: GetSkillParams): Promise<Skill[]> {
    const skills = await prisma.skill.findMany({
      include: {
        CoursesAndSkills: {
          select: {
            courseId: true,
          },
        },
        UserSelectedSkills: {
          select: {
            userId: true,
          },
          where: {
            userId: params.user_id,
          },
        },
      },
    });
    return skills.map((skill) => {
      return {
        courses: skill.CoursesAndSkills.map((e) => e.courseId),
        id: skill.id,
        isSelected: skill.UserSelectedSkills.length != 0,
        name: skill.name,
      };
    });
  }
}
