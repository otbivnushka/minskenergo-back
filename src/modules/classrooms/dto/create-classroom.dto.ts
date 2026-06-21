import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({ description: 'Название аудитории', example: 'Ауд. 201' })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiPropertyOptional({
    description: 'Адрес аудитории',
    example: 'ул. Ленина, 1',
  })
  @IsString()
  @IsOptional()
  address?: string;
}
