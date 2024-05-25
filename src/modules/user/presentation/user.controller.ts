import { Request, Response, NextFunction } from 'express';
import { UserApplication } from '../application/user.application';
import { UserProperties } from '../domain/roots/user';
import { UserFactory } from '../domain/roots/user.factory';
import RedisBootstrap from '../../../bootstrap/Redis.bootstrap';

export class UserController {
  constructor(private readonly application: UserApplication) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, password, roles } = req.body;
    const userProperties: UserProperties = {
      name,
      lastname,
      email,
      password,
      roles,
    };

    const userFactoryResult = UserFactory.create(userProperties);

    if (userFactoryResult.isErr()) {
      return next(userFactoryResult.error);
    }

    const user = userFactoryResult.value;

    const userCreatedResult = await this.application.create(user);
    if (userCreatedResult.isErr()) {
      return next(userCreatedResult.error);
    }

    return res.status(201).json(userCreatedResult.value);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const usersResult = await this.application.getAll();

    if (usersResult.isErr()) {
      return next(usersResult.error);
    }

    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(usersResult.value));

    return res.status(200).json(usersResult.value);
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const userResult = await this.application.getById(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;
    user.delete();

    const userRemovedResult = await this.application.remove(user);

    if (userRemovedResult.isErr()) {
      return next(userRemovedResult.error);
    }

    return res.status(200).json(userRemovedResult.value);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, lastname, password, roles } = req.body;

    const userResult = await this.application.getById(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;
    user.update({ name, lastname, password, roles });

    const userUpdatedResult = await this.application.update(user);

    if (userUpdatedResult.isErr()) {
      return next(userUpdatedResult.error);
    }

    return res.status(200).json(userUpdatedResult.value);
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const { page, pageSize } = req.params;
    const usersResult = await this.application.getByPage(+page, +pageSize); //colocar el + adelante hace que esos parametros se conviertan en numeros, ya que llegan como string

    if (usersResult.isErr()) {
      return next(usersResult.error);
    }

    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(usersResult.value));

    return res.status(200).json(usersResult.value);
  }
}
