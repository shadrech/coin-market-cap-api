import * as redis from "redis";
declare module "redis" {
  export interface RedisClient {
    getAsync(key: string): Promise<string>;
    setAsync(key: string, value: string): Promise<boolean>;
  } 
}