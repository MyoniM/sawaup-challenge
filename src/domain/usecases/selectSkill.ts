import { Skills } from '../models';

export interface SelectSkill {
  selectSkill(id: string): Promise<Skills>;
}