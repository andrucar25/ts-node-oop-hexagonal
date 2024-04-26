import { In } from "typeorm";
import { Result, err, ok } from "neverthrow";
import MySQLBootstrap from "../../../bootstrap/MySQL.bootstratp";
import { RoleEntity } from "./persistence/entities/role.entity";
import { DatabaseException } from "../../../core/exceptions/database.exception";

export type GetRolesByIdsResult = Result<RoleEntity[], DatabaseException>

export class RoleInfrastructure implements RoleInfrastructure{
  async getByIds(ids: number[]): Promise<GetRolesByIdsResult>{
    try{
      const roleRepository = MySQLBootstrap.dataSource.getRepository(RoleEntity);
      const roles = await roleRepository.findBy({id: In(ids)})
      
      return ok(roles)
    } catch (error){
      return err(new DatabaseException(error.message))
    }

  }
}