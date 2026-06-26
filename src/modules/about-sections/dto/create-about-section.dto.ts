import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateAboutSectionDto {
  @ApiProperty({ description: 'Заголовок', example: 'О центре' })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiProperty({
    description: 'Содержание',
    example: 'Описание учебного центра',
  })
  @IsString()
  @MinLength(1)
  content!: string;

  @ApiPropertyOptional({
    description: 'Порядок сортировки',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Видимость', example: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
