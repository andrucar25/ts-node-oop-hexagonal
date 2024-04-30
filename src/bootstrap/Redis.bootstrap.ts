import { DataSource } from "typeorm";
import IORedis from "ioredis";
import { Request, Response } from "express";
import { Bootstrap } from "./bootstrap";
import { Parameters } from "../core/helpers/parameters";
import logger from "../core/helpers/logger";

export default class RedisBootstrap implements Bootstrap {
  private static client: IORedis

  initialize(): Promise<boolean | Error | DataSource> {
    return new Promise((resolve, reject) => {
      const redisConfig = Parameters.REDIS_CONFIG;
      const client = new IORedis(redisConfig);

      client
        .on("connect", () =>{
            logger.info(`Redis connected at ${redisConfig.host}:${redisConfig.port}`);
            resolve(true);
        })
        .on("error", (error) => {
            logger.error(`Redis error: ${error}`);
            reject(error);
        });

        RedisBootstrap.client = client;
    });
  }
  close(): void {
    RedisBootstrap.client?.disconnect();
  }

  static get connection(): IORedis {
    return this.client;
  }

  static async set(key: string, value: string) {
    await this.client.set(key, value, "PX", 24 * 60 * 60 * 1000);
  }

  static async get(key: string) {
    return await this.client.get(key)
  }

  static async clear(prefix: string = "") {
    const keys = await this.client.keys(`${prefix}*`);
    if(keys.length > 0){
      await this.client.del(keys);
    }
  }

  static clearCache(req: Request, res: Response){
    RedisBootstrap.clear();
    res.send('Cache cleared')
  }

}