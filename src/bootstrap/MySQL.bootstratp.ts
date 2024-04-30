import { DataSource } from "typeorm";
import { Bootstrap } from "./bootstrap";
import { Parameters } from "../core/helpers/parameters";


export default class DatabaseBootstrap implements Bootstrap {
  private static appDataSource: DataSource;
  
  initialize(): Promise<boolean | DataSource> {
    const dbConfig = Parameters.MYSQL_CONFIG;

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