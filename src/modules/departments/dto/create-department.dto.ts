import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  phone!: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
