import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserByPageDto {
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
}
