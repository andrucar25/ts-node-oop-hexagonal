import { UserSaveResult } from "../../infrastructure/user.infrastructure";
import { User } from "../roots/user";

export interface UserRepository {
  save(user: User): Promise<UserSaveResult>;
  getAll(): any;
}