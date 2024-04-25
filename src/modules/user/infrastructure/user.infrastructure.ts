import { Result, err, ok } from "neverthrow";
import { User } from "../domain/roots/user";
import { UserRepository } from "../domain/repositories/user.repository";
import MySQLBootstrap from "../../../bootstrap/MySQL.bootstratp";
import { UserModelDto } from "./dtos/user.model.dto";
import { UserEntity } from "./persistence/entities/user.entity";
import { UserCreatedResponse } from "../application/response/user-created.response";
import { DatabaseException } from "../../../core/exceptions/database.exception";

export type UserSaveResult = Result<UserCreatedResponse, DatabaseException>

export class UserInfrastructure implements UserRepository{
  getAll() {
    throw new Error("Method not implemented.");
  }
  
  async save(user: User): Promise<UserSaveResult>{
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
