import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  IsPositive,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCurriculumDto {
  @ApiProperty({
    description: 'Название учебной программы',
    example: 'Электробезопасность',
  })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiPropertyOptional({
    description: 'ID тем, входящих в программу',
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Type(() => Number)
  topicIds?: number[];
}
