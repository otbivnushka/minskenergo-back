import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @MinLength(1)
  fullName!: string;

  @IsString()
  @IsOptional()
  degree?: string;
}
