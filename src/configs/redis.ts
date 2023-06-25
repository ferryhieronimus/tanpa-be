import { createClient } from "redis";
import RedisStore from "connect-redis";

let redis = createClient();

// This could be better located somewhere else.
redis.connect().catch(console.error);

redis.on("error", (err) => console.log("Redis Client Error", err));

let redisStore = new RedisStore({
  client: redis
});

export default redisStore;
