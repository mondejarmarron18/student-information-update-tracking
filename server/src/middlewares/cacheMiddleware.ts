import { x8tAsync } from "x8t";
import { IMiddleware } from "../types/middleware";
import cache from "../utils/cache";

type CacheMiddleware = (key: string, ttl: number, value: string) => IMiddleware;

const cacheMiddleware: CacheMiddleware =
  (key, ttl, value) => async (req, res, next) => {
    const { result: cachedValue } = await x8tAsync(cache.get(key), {
      log: true,
    });

    if (!cachedValue) {
      await x8tAsync(cache.setEx(key, ttl, value), {
        log: true,
      });
    }

    next();
  };

export default cacheMiddleware;
