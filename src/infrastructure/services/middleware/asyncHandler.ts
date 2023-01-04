import { NextApiRequest, NextApiResponse } from 'next';
import { apiErrorHandler } from './apiErrorHandler';

const asyncMiddleware = (fn: Function) => (req: NextApiRequest, res: NextApiResponse, next: any) =>
  Promise.resolve(fn(req, res, next)).catch((error) => apiErrorHandler(error, req, res, error?.message || 'Internal server error.'));

export { asyncMiddleware };
