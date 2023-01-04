import { Skill as SkillModel } from '@prisma/client';
interface Skill extends SkillModel {
  isSelected: boolean;
  courses: number[];
}

export type { Skill };
