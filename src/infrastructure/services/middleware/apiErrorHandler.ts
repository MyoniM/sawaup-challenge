import { NextApiRequest, NextApiResponse } from 'next';
export function apiErrorHandler(err: any, req: NextApiRequest, res: NextApiResponse, message: string) {
  console.error(err);
  res.status(500).json({ error: message });
}
