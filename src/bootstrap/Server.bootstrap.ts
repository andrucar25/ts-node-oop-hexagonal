import http from "http";
import { Application } from "express";
import { Bootstrap } from "./bootstrap";
import logger from "../core/helpers/logger";

export default class implements Bootstrap{
  constructor(private readonly app: Application){}

  initialize(): Promise<boolean | Error>{
    return new Promise((resolve, reject) => {
    const server = http.createServer(this.app);

    server
      .listen(3000)
      .on("listening", () => {
        logger.info(`Server is running on port ${3000}`);
        resolve(true);
      })
      .on("error", (error: Error) => {
        reject(error);
      })
    });

    // promise
    //   .then((messageReturned: string) => {console.log(messageReturned)})
    //   .catch((messageErrorReturned: NodeJS.ErrnoException) => {console.log(messageErrorReturned)})
  }
}