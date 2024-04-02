import {validate} from 'uuid';

export class UuidVO {
  private readonly value: string;

  private constructor(value: string){
    this.value = value;
  }

  static create(value: string): UuidVO{
    if(!validate(value)){
      throw new Error("INvalid uuid");
    }
    return new UuidVO(value);
  }

  getValue(): string{
    return this.value;
  }
}