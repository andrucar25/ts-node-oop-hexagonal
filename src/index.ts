import { DataSource } from "typeorm";
import app from "./app";
import ServerBootstrap from "./bootstrap/Server.bootstrap";
import { Bootstrap } from "./bootstrap/bootstrap";
import logger from "./core/helpers/logger";
import MySQLBootstrap from "./bootstrap/MySQL.bootstratp";

const server: Bootstrap = new ServerBootstrap(app);
const mysql: Bootstrap = new MySQLBootstrap();

//esto es una funcion autoinvocada
(async () => {
  try{
    logger.log("info", "Starting server ...")
    const promises : Array<Promise<boolean | Error | DataSource>> = [
      server.initialize(), 
      mysql.initialize(),
    ];
    await Promise.all(promises);
    logger.info("MySQL connected");

  } catch(error){
    logger.error(error);
    mysql.close();
    server.close();
    //el 0 indica que termino de forma natural y el 1 es que hay un error
  }
})()


//20x = success
//30x = redirect
//40x = client error
//50x = server error

