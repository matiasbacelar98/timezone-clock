import express, { Request, Response } from 'express';

// Quote router
const quoteRouter = express.Router();

// Controllers
function getRandomQuote(req: Request, res: Response) {
  return res.json({
    message: 'quote endpoint',
  });
}

// Routes
quoteRouter.get('/', getRandomQuote);

export default quoteRouter;
