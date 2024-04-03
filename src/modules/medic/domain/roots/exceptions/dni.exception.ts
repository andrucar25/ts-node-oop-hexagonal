import {ExceptionBase, ExceptionCode} from "../../../../../core/exceptions/exception-base";

export class MedicDNIException extends ExceptionBase{
  constructor(){
    super();
    Object.setPrototypeOf(this, MedicDNIException.prototype);
    this.code = ExceptionCode.MedicDNIException
  }
}