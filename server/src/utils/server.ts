import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config';

import quoteRoutes from '../modules/quote';
import timezoneRoutes from '../modules/timezone';
import { ALLOWED_DOMAIN } from '../constants';

export function createServer() {
  const app = express();

  // Middlewares
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10m
    max: 50,
  });
  app.use(limiter);
  app.set('trust proxy', 1);

  // Cors & data parse
  app.use(cors({ origin: ALLOWED_DOMAIN }));
  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use('/api/quote', quoteRoutes);
  app.use('/api/timezone', timezoneRoutes);

  return app;
}
