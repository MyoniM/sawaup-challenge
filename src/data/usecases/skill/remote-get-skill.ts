import { Skill } from '@/domain/models';
import { GetSkillParams, GetSkills as IGetSkills } from '@/domain/usecases/skill/getAll';

export class RemoteGetSkill implements IGetSkills {
  async getAll(params: GetSkillParams): Promise<Skill[]> {
    const res = await fetch('/api/skill/getAll', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return await res.json();
  }
}
