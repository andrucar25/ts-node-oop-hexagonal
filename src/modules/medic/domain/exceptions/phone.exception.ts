import {
  ExceptionBase,
  ExceptionCode,
} from '../../../../core/exceptions/exception-base';

export class MedicPhoneException extends ExceptionBase {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MedicPhoneException.prototype);
    this.code = ExceptionCode.MedicPhoneException;
  }
}
