import express, { Request, Response } from 'express';
import axios from 'axios';
import { errorHandler } from '../utils';

// Quote router
const quoteRouter = express.Router();

// Constants
const QUOTES_API_URL = 'https://api.api-ninjas.com/v1/quotes?category=life';
const QUOTES_API_KEY = process.env.QUOTES_API_KEY;

// Controllers

// @desc   Get random quote
// @route  GET /api/quote
// @access Public
async function getRandomQuote(req: Request, res: Response) {
  try {
    // Fetch quote
    const { data } = await axios.get(QUOTES_API_URL, {
      headers: { 'X-Api-Key': QUOTES_API_KEY, contentType: 'application/json' },
    });

    const quote = data[0];

    return res.status(200).json(quote);
  } catch (error) {
    return errorHandler(error, res);
  }
}

// Routes
quoteRouter.get('/', getRandomQuote);

export default quoteRouter;
