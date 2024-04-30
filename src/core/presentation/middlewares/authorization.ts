import { NextFunction, Request, Response } from "express";

export class AuthorizationMiddleware {
  
  static canActive(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    }
  }
}