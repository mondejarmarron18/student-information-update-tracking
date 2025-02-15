import customErrors from "../constants/customErrors";
import { IMiddleware } from "../types/middleware";
import CustomResponse from "../utils/CustomResponse";

export type ApiLimiterOptions = {
  max: number;
  windowMs: number;
};

export type ApiLimitRequest = Record<
  string,
  {
    limitReset: number;
    limitRemaining: number;
  }
>;

//Requests are stored in memory
const requests: ApiLimitRequest = {};

const clearExpiredRequests = () => {
  Object.keys(requests).forEach((key) => {
    if (Date.now() > requests[key].limitReset) {
      delete requests[key];
    }
  });
};

const apiLimiter = ({ max, windowMs }: ApiLimiterOptions): IMiddleware => {
  return (req, res, next) => {
    const ip = req.ip?.replace(/^::ffff:/, "");

    //If no ip, return error
    if (!ip) return CustomResponse.sendError(res, customErrors.unauthorized);

    const currentTime = Date.now();
    let request = requests[ip];

    //Clear expired requests
    clearExpiredRequests();

    //Initialize request or reset if expired
    if (!request || currentTime > request.limitReset) {
      request = {
        limitReset: currentTime + windowMs,
        limitRemaining: max - 1, //Start with max requests minus the current request
      };

      //Set headers for rate limit so front end can use them for UX purposes
      res.set("Rate-Limit", request.limitRemaining.toString());
      res.set("Rate-Limit-Remaining", request.limitRemaining.toString());
      res.set("Rate-Limit-Reset", request.limitReset.toString());

      return next();
    }

    if (request.limitRemaining <= 0) {
      return CustomResponse.sendError(res, customErrors.tooManyRequests);
    }

    //Decrement remaining requests and set headers
    request.limitRemaining -= 1;
    res.set("Rate-Limit-Remaining", request.limitRemaining.toString());

    next();
  };
};

export default apiLimiter;
