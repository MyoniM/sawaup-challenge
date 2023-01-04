import { Skill } from '@/domain/models';
import { SelectSkill as ISelectSkill, SelectSkillParams } from '@/domain/usecases';
import { prisma } from '../prisma';

export class SelectSkills implements ISelectSkill {
  async select(params: SelectSkillParams): Promise<Skill> {
    const skill = await prisma.skill.findUniqueOrThrow({
      where: {
        id: params.skill_id,
      },
      include: {
        CoursesAndSkills: {
          select: {
            courseId: true,
          },
        },
        UserSelectedSkills: {
          where: {
            userId: params.user_id,
          },
        },
      },
    });

    let skillData: Skill = {
      id: skill.id,
      courses: skill.CoursesAndSkills.map((e) => e.courseId),
      isSelected: skill.UserSelectedSkills.length != 0,
      name: skill.name,
    } as Skill;
    if (params.select == skillData.isSelected) {
      // Nothing to change here
      return skillData;
    } else if (params.select == false) {
      // Delete the relation between the tables
      await prisma.userSelectedSkills.delete({
        where: {
          userId_skillId: {
            skillId: params.skill_id,
            userId: params.user_id,
          },
        },
      });
      return { ...skillData, isSelected: false };
    } else {
      // Favorite it
      await prisma.userSelectedSkills.create({
        data: {
          skillId: params.skill_id,
          userId: params.user_id,
        },
      });
      return { ...skillData, isSelected: true };
    }
  }
}
