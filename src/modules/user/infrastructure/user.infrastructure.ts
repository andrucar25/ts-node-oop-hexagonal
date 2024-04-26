import { Result, err, ok } from "neverthrow";
import { User } from "../domain/roots/user";
import { UserRepository } from "../domain/repositories/user.repository";
import MySQLBootstrap from "../../../bootstrap/MySQL.bootstratp";
import { UserModelDto } from "./dtos/user.model.dto";
import { UserEntity } from "./persistence/entities/user.entity";
import { UserCreatedResponse } from "../application/response/user-created.response";
import { DatabaseException } from "../../../core/exceptions/database.exception";

export type UserResult = Result<UserCreatedResponse | UserCreatedResponse[], DatabaseException>

export class UserInfrastructure implements UserRepository{

  async getAll(): Promise<UserResult> {
    try{
      const userRepository = MySQLBootstrap.dataSource.getRepository(UserEntity);
      const users = await userRepository.find({where: {isActive: true}, relations: ["roles"]});
      // const users = await userRepository.find({where: {isActive: true}, relations: ["roles"]});  // al colocar el relations ["roles"] funciona como un populate para roles, tambien se puede hacer lo mismo desde la entity user sin usar el relations

      return ok(UserModelDto.fromDataToResponse(users))

    }catch(error){
      return err(new DatabaseException(error.message))

    }
  }
  
  async save(user: User): Promise<UserResult>{
    try{
      const userRepository = MySQLBootstrap.dataSource.getRepository(UserEntity);
      
      const userEntity = UserModelDto.fromDomainToData(user);

      
      await userRepository.save(userEntity);

      return ok(UserModelDto.fromDataToResponse(userEntity))
    }catch(error){
      return err(new DatabaseException(error.message))
    }

  }

}
