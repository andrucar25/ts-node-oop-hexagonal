export class ExceptionBase extends Error {
  constructor(message?: string){
    super(message);
      Object.setPrototypeOf(this, ExceptionBase.prototype)
  }
}