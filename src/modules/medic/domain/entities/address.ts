import { IsNotEmpty } from 'class-validator';

export class Address {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  department: string;
}
