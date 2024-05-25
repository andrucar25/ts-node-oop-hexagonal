import http from 'http';
import { Application } from 'express';
import { Bootstrap } from './bootstrap';
import logger from '../core/helpers/logger';
import { Parameters } from '../core/helpers/parameters';

export default class implements Bootstrap {
  //esta es una clase anonima
  constructor(private readonly app: Application) {}

  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(Parameters.PORT)
        .on('listening', () => {
          logger.info(`Server is running on port ${Parameters.PORT}`);
          resolve(true);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });

    // promise
    //   .then((messageReturned: string) => {console.log(messageReturned)})
    //   .catch((messageErrorReturned: NodeJS.ErrnoException) => {console.log(messageErrorReturned)})
  }

  close() {
    process.exit(1);
  }
}
