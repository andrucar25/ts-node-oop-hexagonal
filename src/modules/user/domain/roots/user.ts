import { UserFactory } from "./user.factory";

export interface UserRequired {
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[] | unknown[];
}

export interface UserOptional {
  readonly id: string;
  readonly photo: string;
  readonly isActive: boolean;
  readonly refreshToken: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type UserProperties = UserRequired & Partial<UserOptional>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private photo: string;
  private roles: string[] | unknown[];
  private isActive: boolean;
  private refreshToken: string;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: UserProperties){
    Object.assign(this, properties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      photo: this.photo,
      roles: this.roles,
      isActive: this.isActive,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }

  static reconstitute(properties: UserProperties): User{
    const result = UserFactory.create(properties);

    if(result.isErr()) throw result.error
    return result.value
  }
}