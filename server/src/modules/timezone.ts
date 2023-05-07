import express, { Request, Response } from 'express';

// Timezone router
const timezoneRouter = express.Router();

// Controllers
function getTimezoneInfo(req: Request, res: Response) {
  return res.json({
    message: 'timezone endpoint',
  });
}

// Routes
timezoneRouter.get('/', getTimezoneInfo);

export default timezoneRouter;
