import { DataSource } from "typeorm";
import { Bootstrap } from "./bootstrap";


export default class DatabaseBootstrap implements Bootstrap {
  private static appDataSource: DataSource;
  
  initialize(): Promise<boolean | DataSource> {
    const dbConfig = {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      entities: [
        process.env.DB_ENTITIES || "src/**/infrastructure/persistence/entities/*.entity.ts"
      ],
      username: process.env.DB_USERNAME || "user",
      password: process.env.DB_USERNAME || "12345",
      database: process.env.DB_NAME || "course_nodejs",
      synchronize: process.env.DB_SYNCRHONIZE === 'false' ? false : true,
      logging: process.env.DB_LOGGING === 'false' ? false : true,
      poolSize: Number(process.env.DB_POOL_SIZE) || 10,
      maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 10000,
            
    };

    const AppDataSource = new DataSource({type: "mysql", ...dbConfig});

    DatabaseBootstrap.appDataSource = AppDataSource;

    return AppDataSource.initialize()

  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }

  close(){
    DatabaseBootstrap.appDataSource?.destroy();
  }
}