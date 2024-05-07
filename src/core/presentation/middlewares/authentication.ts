import { NextFunction, Request, Response } from "express";
import { IError } from '../../error/error.interface';
import { Token } from '../../helpers/token';

export class AuthenticationMiddleware {
  static canActive(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      const err: IError = new Error("User not authenticated");
      err.status = 401;
      return next(err);
    } else {
      Token.validateAccessToken(authorization)
        .then((payload: any) => {
          res.locals.roles = payload.roles;
          next();
        })
        .catch((error) => {
          next(error);
        });
    }
  }
}