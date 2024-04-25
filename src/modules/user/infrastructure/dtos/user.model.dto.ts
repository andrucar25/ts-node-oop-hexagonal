import { plainToInstance } from "class-transformer";
import { UserCreatedResponse } from "../../application/response/user-created.response";
import { User } from "../../domain/roots/user";
import { UserEntity } from "../persistence/entities/user.entity";

export class UserModelDto {
  
  static fromDomainToData(user:User): UserEntity{
    const properties = user.properties();

    const userEntity = new UserEntity();
    userEntity.id = properties.id
    userEntity.name = properties.name
    userEntity.lastname = properties.lastname
    userEntity.email = properties.email
    userEntity.password = properties.password
    userEntity.photo = properties.photo
    userEntity.isActive = properties.isActive
    userEntity.refreshToken = properties.refreshToken
    userEntity.createdAt = properties.createdAt
    userEntity.updatedAt = properties.updatedAt
    userEntity.deletedAt = properties.deletedAt
    // userEntity.roles = properties.roles;

    return userEntity
  }

  static fromDataToResponse(userEntity: UserEntity): UserCreatedResponse {
    // if (Array.isArray(userEntity)) {
    //   return userEntity.map((user) => {
    //     return plainToInstance(UserCreatedResponse, user, {
    //       excludeExtraneousValues: true,
    //     });
    //   });
    // } else {
      return plainToInstance(UserCreatedResponse, userEntity);
    // }
  }

}