import * as redis from "redis";
import * as bluebird from "bluebird";
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();

client.on("error", err => {
  console.error("REDIS ERROR", err);
  const error: Error = new Error("Error connecting to db");
  throw error;
});

export default client;
