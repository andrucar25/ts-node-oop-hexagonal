import {
  ExceptionBase,
  ExceptionCode,
} from '../../../../core/exceptions/exception-base';

export class UserEmailInvalidException extends ExceptionBase {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserEmailInvalidException.prototype);
    this.code = ExceptionCode.UserEmailInvalidException;
  }
}
