import {
  ExceptionBase,
  ExceptionCode,
} from '../../../../core/exceptions/exception-base';

export class UserNameInvalidLengthException extends ExceptionBase {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserNameInvalidLengthException.prototype);
    this.code = ExceptionCode.UserNameInvalidLengthException;
  }
}
