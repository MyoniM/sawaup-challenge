import { Skill } from '@/domain/models';
import { SelectSkillParams } from '@/domain/usecases';
import { asyncMiddleware } from '@/infrastructure/services/middleware/asyncHandler';
import { SelectSkills } from '@/infrastructure/services/skillStorage';
import type { NextApiRequest, NextApiResponse } from 'next';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MyCustomRequest = Override<NextApiRequest, { body: SelectSkillParams }>;
async function handler(req: MyCustomRequest, res: NextApiResponse<Skill | null>) {
  if (req.method == 'PUT') {
    const selectSkills = new SelectSkills();
    return res.status(200).send(await selectSkills.select(req.body));
  }

  return res.status(405).send(null);
}

export default asyncMiddleware(handler);
