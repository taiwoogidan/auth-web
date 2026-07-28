import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const REDIS_URL = process.env.REDIS_URL;

export const redis = createClient({
  url: REDIS_URL,
});

redis.on("error", (error) => console.log(error));

export async function connectRedis() {
  try {
    await redis.connect();
    console.log("Redis connection successful");
  } catch (error) {
    console.error(error);
  }
}
