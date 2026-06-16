import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @IsOptional()
  address?: string;
}
