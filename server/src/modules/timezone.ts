import express, { Request, Response } from 'express';
import IPinfoWrapper, { IPinfo, LruCache } from 'node-ipinfo';
import lookup from 'country-code-lookup';

import { errorHandler } from '../utils/errorHandler';

// Timezone router
const timezoneRouter = express.Router();

// Constants
const IPINFO_API_KEY = process.env.IPINFO_API_KEY;
const cache = new LruCache();
const ipinfoWrapper = new IPinfoWrapper(IPINFO_API_KEY, cache);

// Controllers

// @desc   Get timezone information
// @route  GET /api/timezone
// @access Public
async function getTimezoneInfo(req: Request, res: Response) {
  try {
    // Get ip address from user
    const ipAddress = String(req.socket.remoteAddress);

    // Get ip-information
    const data: IPinfo = await ipinfoWrapper.lookupIp(process.env.TEST_IP || ipAddress);

    // Get country abbreviation
    const countryAbbreviations = lookup.byCountry(data.country);

    const timezoneData = {
      region: data.region,
      country: data.country,
      countryAbbreviations, // The one to use is fips
      timezoneName: data.timezone,
      locale: req.headers['accept-language'],
    };

    return res.status(200).json(timezoneData);
  } catch (error) {
    return errorHandler(error, res);
  }
}

// Routes
timezoneRouter.get('/', getTimezoneInfo);

export default timezoneRouter;
