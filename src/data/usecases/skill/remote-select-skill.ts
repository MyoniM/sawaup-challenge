import { Skill } from '@/domain/models';
import { SelectSkill as ISelectSkill, SelectSkillParams } from '@/domain/usecases';

export class RemoteSelectSkill implements ISelectSkill {
  async select(params: SelectSkillParams): Promise<Skill> {
    const res = await fetch('/api/skill/select', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return await res.json();
  }
}
