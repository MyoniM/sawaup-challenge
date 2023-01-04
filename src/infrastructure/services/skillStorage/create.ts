import { Skill } from '@/domain/models';
import { CreateSkill, CreateSkillParams } from '@/domain/usecases';
import { prisma } from '../prisma';

export class CreateSkills implements CreateSkill {
  async create(params: CreateSkillParams): Promise<Skill> {
    const skill = await prisma.skill.create({
      data: {
        name: params.name,
      },
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
        },
      },
    });
    return {
      courses: skill.CoursesAndSkills.map((e) => e.courseId),
      isSelected: skill.UserSelectedSkills.length != 0,
      id: skill.id,
      name: skill.name,
    } as Skill;
  }
}
