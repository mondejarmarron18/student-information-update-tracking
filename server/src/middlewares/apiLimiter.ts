import customErrors from "../constants/customErrors";
import { IMiddleware } from "../types/middleware";
import cache from "../utils/cache";
import Response from "../utils/CustomResponse";

export type ApiLimiter = (max: number, windowMs: number) => IMiddleware;

const apiLimiter: ApiLimiter = (max, windowMs) => {
  return async (req, res, next) => {
    const ip = req.ip?.replace(/^::ffff:/, "");

    if (!ip) return Response.sendError(res, customErrors.unauthorized);

    const cacheKey = `request:${ip}`;
    let rateLimit = await cache.get(cacheKey);

    res.set("Rate-Limit", max.toString());
    res.set("Rate-Limit-WindowMs", (windowMs / 1000).toString());

    if (!rateLimit) {
      rateLimit = (max - 1).toString();
      cache.setEx(cacheKey, windowMs, rateLimit);
      res.set("Rate-Limit-Remaining", rateLimit);

      return next();
    }

    if (+rateLimit <= 0) {
      return Response.sendError(res, customErrors.tooManyRequests);
    }

    const newRateLimit = await cache.decr(cacheKey);

    res.set("Rate-Limit-Remaining", newRateLimit.toString());

    next();
  };
};

export default apiLimiter;
