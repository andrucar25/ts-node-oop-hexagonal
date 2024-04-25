import { Exclude, Expose } from "class-transformer";

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
}