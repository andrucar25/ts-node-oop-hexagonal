import { v4 as uuidv4 } from 'uuid';
import { Result, ok, err } from 'neverthrow';
import { User, UserProperties } from "./user";
import { UserNameInvalidLengthException } from '../excepctions/name.exception';
import { UserEmailInvalidException } from '../excepctions/email.exception';

export type UserFactoryResult = Result<User, UserNameInvalidLengthException | UserEmailInvalidException>

export class UserFactory {
  static create(properties: UserProperties): UserFactoryResult{
    const userProperties = {
      ...properties,
      id: properties.id ?? uuidv4(),
      refreshToken: properties.refreshToken ?? uuidv4(),
      isActive: properties.isActive ?? true,
      createdAt: properties.createdAt ?? new Date(), 
    };

    if(properties.name.length <= 3) return err(
        new UserNameInvalidLengthException("El nombre debe tener mas de 3 caracteres"
      ))

    const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!patternEmail.test(properties.email))
      return err(new UserEmailInvalidException("El email no es válido"));

    return ok(new User(userProperties));
  }
}