import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateAboutSectionDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  content!: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
