import { Response } from 'express';
import { ENVIRONMENT } from '../constants';

// Custom errors
export function errorHandler(error: unknown, res: Response, statusCode?: number) {
  res.status(statusCode || 500);

  // Error is object
  if (error instanceof Error) {
    return res.json({
      message: error.message,
      stack: ENVIRONMENT === 'prod' ? null : error.stack,
    });
  }

  return res.json({ message: String(error) });
}
