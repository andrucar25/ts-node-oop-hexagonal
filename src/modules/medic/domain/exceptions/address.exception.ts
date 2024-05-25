import {
  ExceptionBase,
  ExceptionCode,
} from '../../../../core/exceptions/exception-base';

export class MedicAddressEmptyException extends ExceptionBase {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MedicAddressEmptyException.prototype);
    this.code = ExceptionCode.MedicAddressEmptyException;
  }
}

export class MedicAddressMaximumException extends ExceptionBase {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MedicAddressMaximumException.prototype);
    this.code = ExceptionCode.MedicAddressMaximumException;
  }
}
