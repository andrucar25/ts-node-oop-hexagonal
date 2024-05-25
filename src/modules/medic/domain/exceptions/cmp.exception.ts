import {
  ExceptionBase,
  ExceptionCode,
} from '../../../../core/exceptions/exception-base';

export class MedicCMPException extends ExceptionBase {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MedicCMPException.prototype);
    this.code = ExceptionCode.MedicCMPException;
  }
}
