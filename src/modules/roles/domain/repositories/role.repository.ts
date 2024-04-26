import { GetRolesByIdsResult } from "../../infrastructure/role.infrastructure";

export interface RoleRepository {
  getByIds(roles: number[]): Promise<GetRolesByIdsResult>
}