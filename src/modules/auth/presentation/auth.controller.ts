import { Request, Response, NextFunction } from 'express';
import { AuthApplication } from '../application/auth.application';
import { IError } from '../../../core/error/error.interface';
import { Token } from '../../../core/helpers/token';

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const userMatchResult = await this.application.existingUser(
      email,
      password,
    );
    if (!userMatchResult) {
      const err: IError = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    const tokens = {
      accessToken: Token.generateAccessToken(userMatchResult),
      refreshToken: userMatchResult.properties().refreshToken,
    };

    return res.status(200).json(tokens);
  }
}
