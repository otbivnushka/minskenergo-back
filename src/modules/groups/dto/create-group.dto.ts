import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupDto {
  @ApiProperty({ description: 'Название группы', example: 'Группа Э-42' })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiPropertyOptional({ description: 'ID учебной программы', example: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  curriculumId?: number;

  @ApiProperty({ description: 'Дата начала', example: '2024-01-15' })
  @IsString()
  @MinLength(1)
  dateStart!: string;

  @ApiProperty({ description: 'Дата окончания', example: '2024-06-30' })
  @IsString()
  @MinLength(1)
  dateEnd!: string;
}
