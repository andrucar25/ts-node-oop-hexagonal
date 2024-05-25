import { Exclude, Expose, Type } from 'class-transformer';

export class RoleResponse {
  // @Exclude()
  // id: number;

  @Expose()
  name: string;
}
export class UserCreatedResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  isActive: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date | null;

  @Exclude()
  deletedAt: Date | null;

  @Expose()
  @Type(() => RoleResponse)
  roles: RoleResponse[];
}
