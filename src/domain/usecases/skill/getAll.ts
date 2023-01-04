import { Skill } from "@/domain/models";

export interface GetSkillParams {
  user_id: string;
}

export interface GetSkills {
  getAll(params: GetSkillParams): Promise<Skill[]>;
}
