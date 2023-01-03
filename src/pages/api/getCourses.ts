import type { NextApiRequest, NextApiResponse } from 'next';
import { Courses } from '../../interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Invalid request!');
  }

  res.status(200).send([
    {
      name: 'Excel for beginners',
      id: 5,
      url: 'https://www.youtube.com/watch?v=Vl0H-qTclOg',
      isFavorite: true,
      skillSet: ['organization', 'computer', 'office', 'excel'],
    },
  ]);
}
