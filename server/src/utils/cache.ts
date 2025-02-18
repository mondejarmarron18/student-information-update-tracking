import { createClient } from "redis";
import config from "./config";

const cache = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
});

cache.on("error", (err) => {
  console.error(err);
});

if (!cache.isOpen) {
  cache.connect();
}

export default cache;
