import { NextFunction, Request, Response } from 'express';
import { IError } from '../../error/error.interface';

export class AuthorizationMiddleware {
  static canActive(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const locals: Record<string, any> = res.locals;

      for (let i = 0; i < rolesAllowed.length; i++) {
        if (locals.roles.includes(rolesAllowed[i])) {
          return next();
        }
      }

      const error: IError = new Error();
      error.message = 'Access forbidden';
      error.stack = 'Access forbidden';
      error.status = 409;

      return next(error);
    };
  }
}
