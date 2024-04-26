import { Request, Response, NextFunction } from 'express';
import { UserApplication } from "../application/user.application";
import { UserCreateDto } from './dtos/requests/user-create.dto';
import { validate } from 'class-validator';
import { IError } from '../../../core/error/error.interface';
import { UserProperties } from '../domain/roots/user';
import { UserFactory } from '../domain/roots/user.factory';

export class UserController {
  constructor(private readonly application: UserApplication){}

    async insert(req: Request, res: Response, next: NextFunction){
      const { name, lastname, email, password, roles } = req.body;

      const userCreateDto = new UserCreateDto();
      userCreateDto.name = name;
      userCreateDto.lastname = lastname;
      userCreateDto.email = email;
      userCreateDto.password = password;
      userCreateDto.roles = roles;

      const errors = await validate(userCreateDto);

      if (errors.length > 0) {
        const listErrors: string[] = [];
        for (const error of errors) {
          for (const constraint in error.constraints) {
            listErrors.push(error.constraints[constraint]);
          }
        }
  
        const err: IError = new Error();
        err.name = "ValidationError";
        err.message = "Validation Error";
        err.stack = listErrors.join(" || ");
        err.status = 411;
  
        return next(err);
      }

      const userProperties: UserProperties = {
        name,
        lastname,
        email,
        password,
        roles
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
    
    async getAll(req: Request, res: Response, next: NextFunction){
      const usersResult = await this.application.getAll();

      if(usersResult.isErr()){
        return next(usersResult.error);
      }

      return res.status(200).json(usersResult.value);
    }
  
}