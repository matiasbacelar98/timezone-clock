import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config';

import quoteRoutes from '../modules/quote';
import timezoneRoutes from '../modules/timezone';

export function createServer() {
  const app = express();

  // Middlewares
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10m
    max: 2, // 50 req
  });
  app.use(limiter);
  app.set('trust proxy', 1);

  // Cors & data parse
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use('/api/quote', quoteRoutes);
  app.use('/api/timezone', timezoneRoutes);

  return app;
}
