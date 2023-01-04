import { Skill } from "@/domain/models";

export interface CreateSkillParams {
  name: string;
}

export interface CreateSkill {
  create(params: CreateSkillParams): Promise<Skill>;
}
