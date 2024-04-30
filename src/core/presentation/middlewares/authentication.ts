import { NextFunction, Request, Response } from "express";

export class AuthenticationMiddleware {
  
  static canActive(req: Request, res: Response, next: NextFunction) {
    next();
  }
}