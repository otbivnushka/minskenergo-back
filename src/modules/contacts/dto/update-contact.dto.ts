import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  legalAddress?: string;

  @IsOptional()
  @IsString()
  actualAddress?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  workHours?: string;

  @IsOptional()
  @IsString()
  transportInfo?: string;
}
