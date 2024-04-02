import { ExceptionBase } from "../../../../core/exceptions/exception-base";

export class DatabaseException extends ExceptionBase {
  constructor(message: string){
   super(message);
   Object.setPrototypeOf(this, DatabaseException.prototype); 
  }
}