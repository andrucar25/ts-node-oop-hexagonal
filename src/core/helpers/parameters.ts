export interface IRedisConfig {
  host: string;
  port: number;
  password: string;
  maxRetriesPerRequest: number;
}

export interface IMySQLConfig {
  host: string;
  port: number;
  entities: string[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
  maxQueryExecutionTime: number;
}

export class Parameters {
  static get PORT() {
    return process.env.PORT || 3000;
  }

  static get ENVIRONMENT() {
    return process.env.NODE_ENV || "development"
  }

  static get REDIS_CONFIG(): IRedisConfig{
    return {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || "TOP_SECRET",
      maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST) || 3,
    };
  }

  static get MYSQL_CONFIG(): IMySQLConfig {
    return {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      entities: [
        process.env.DB_ENTITIES || "src/**/infrastructure/**/*.entity.ts"
      ],
      username: process.env.DB_USERNAME || "user",
      password: process.env.DB_USERNAME || "12345",
      database: process.env.DB_NAME || "course_nodejs",
      synchronize: process.env.DB_SYNCRHONIZE === 'false' ? false : true,
      logging: process.env.DB_LOGGING === 'false' ? false : true,
      poolSize: Number(process.env.DB_POOL_SIZE) || 10,
      maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 10000,
    }
  }

  static get TOKEN_EXPIRES_TIME() {
    return Number(process.env.TIME_EXPIRES_TIME) || 1
  }

  static get TOKEN_SECRET_KEY() {
    return process.env.TOKEN_SECRET_KEY || "Y1WH>2!OaBqiTXF1+mWfezXp.9hINR_gwDS!:<4Nf~!h"
  }
}