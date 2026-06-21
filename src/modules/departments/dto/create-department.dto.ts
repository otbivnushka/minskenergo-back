import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Название отдела', example: 'Учебный отдел' })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ description: 'Телефон', example: '+375 17 123-45-67' })
  @IsString()
  @MinLength(1)
  phone!: string;

  @ApiPropertyOptional({ description: 'Примечание', example: 'Кабинет 301' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    description: 'Порядок сортировки',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
