import { Result, err, ok } from 'neverthrow';
import { In } from 'typeorm';
import { User } from '../domain/roots/user';
import { UserRepository } from '../domain/repositories/user.repository';
import MySQLBootstrap from '../../../bootstrap/MySQL.bootstratp';
import { UserModelDto } from './dtos/user.model.dto';
import { UserEntity } from './persistence/entities/user.entity';
import { UserCreatedResponse } from '../application/response/user-created.response';
import { DatabaseException } from '../../../core/exceptions/database.exception';
import { RoleEntity } from '../../roles/infrastructure/persistence/entities/role.entity';

export type UserResult = Result<
  UserCreatedResponse | UserCreatedResponse[],
  DatabaseException
>;
export type UserDomainResult = Result<User, DatabaseException>;
export type UserGetByPageResult = Result<
  [entities: UserCreatedResponse[], total: number],
  DatabaseException
>;

export class UserInfrastructure implements UserRepository {
  async getAll(): Promise<UserResult> {
    try {
      const userRepository =
        MySQLBootstrap.dataSource.getRepository(UserEntity);
      const users = await userRepository.find({
        where: { isActive: true },
        relations: ['roles'],
      });
      // const users = await userRepository.find({where: {isActive: true}, relations: ["roles"]});  // al colocar el relations ["roles"] funciona como un populate para roles, tambien se puede hacer lo mismo desde la entity user sin usar el relations

      return ok(UserModelDto.fromDataToResponse(users));
    } catch (error) {
      return err(new DatabaseException(error.message));
    }
  }

  async save(user: User): Promise<UserResult> {
    try {
      const roleRepository =
        MySQLBootstrap.dataSource.getRepository(RoleEntity);
      const rolesUser = await roleRepository.findBy({
        id: In(user.properties().roles.map((role: any) => role.id) as number[]),
      });

      const userRepository =
        MySQLBootstrap.dataSource.getRepository(UserEntity);

      const userEntity = UserModelDto.fromDomainToData(user);
      userEntity.roles = rolesUser;

      await userRepository.save(userEntity);

      return ok(UserModelDto.fromDataToResponse(userEntity));
    } catch (error) {
      return err(new DatabaseException(error.message));
    }
  }

  async getById(id: string): Promise<UserDomainResult> {
    try {
      const userRepository =
        MySQLBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = await userRepository.findOne({
        where: { id, isActive: true },
        relations: ['roles'],
      });

      return ok(UserModelDto.fromDataToDomain(userEntity));
    } catch (error) {
      return err(new DatabaseException(error.message));
    }
  }

  async getByEmail(email: string): Promise<UserDomainResult> {
    try {
      const userRepository =
        MySQLBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = await userRepository.findOne({
        where: { email, isActive: true },
        relations: ['roles'],
      });

      return ok(UserModelDto.fromDataToDomain(userEntity));
    } catch (error) {
      return err(new DatabaseException(error.message));
    }
  }

  async getByPage(
    page: number,
    pageSize: number,
  ): Promise<UserGetByPageResult> {
    try {
      const UserRepository =
        MySQLBootstrap.dataSource.getRepository(UserEntity);
      const [userEntities, total] = await UserRepository.findAndCount({
        where: { isActive: true },
        skip: page * pageSize,
        take: pageSize,
        relations: ['roles'],
      });

      const entities = UserModelDto.fromDataToResponse(
        userEntities,
      ) as UserCreatedResponse[];
      return ok([entities, total]);
    } catch (error) {}
  }
}
