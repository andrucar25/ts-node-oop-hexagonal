import {
  ExceptionBase,
  ExceptionCode,
} from '../../../../core/exceptions/exception-base';

export class MedicAgeException extends ExceptionBase {
  constructor() {
    super();
    Object.setPrototypeOf(this, MedicAgeException.prototype);
    this.code = ExceptionCode.MedicAgeException;
  }
}
