import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateLessonTypeDto {
  @ApiProperty({ description: 'Название вида занятия', example: 'Лекция' })
  @IsString()
  @MinLength(1)
  name!: string;
}
