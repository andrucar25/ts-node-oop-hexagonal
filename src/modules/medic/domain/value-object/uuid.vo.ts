import { Result, err, ok } from 'neverthrow';
import {validate} from 'uuid';
import { UUIDException } from '../exceptions/uuid.exception';

export class UuidVO {
  private readonly value: string;

  private constructor(value: string){
    this.value = value;
  }

  static create(value: string): Result<UuidVO, UUIDException>{
    if(!validate(value)){
      return err(new UUIDException())
    }else{
      return ok(new UuidVO(value));
    }
  }

  getValue(): string{
    return this.value;
  }
}