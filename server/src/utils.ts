import express, { Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

import quoteRoutes from './modules/quote';
import timezoneRoutes from './modules/timezone';

// Constants
export const PORT = process.env.PORT || '5000';
export const ENVIRONMENT = process.env.NODE_ENV;

// Custom errors
export function customErrorMessage(error: unknown, res: Response, statusCode: number) {
  res.status(statusCode);

  // Error is object
  if (error instanceof Error) {
    return res.json({
      message: error.message,
      stack: ENVIRONMENT === 'prod' ? null : error.stack,
    });
  }

  return res.json({ message: String(error) });
}

// Create server
export function createServer() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use('/api/quote', quoteRoutes);
  app.use('/api/timezone', timezoneRoutes);

  return app;
}
