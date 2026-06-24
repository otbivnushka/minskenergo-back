import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'ID группы', example: 1, type: Number })
  @IsNumber()
  groupId!: number;

  @ApiProperty({ description: 'Дата занятия', example: '2024-01-15' })
  @IsString()
  @MinLength(1)
  date!: string;

  @ApiProperty({ description: 'Время начала', example: '09:00' })
  @IsString()
  @MinLength(1)
  timeStart!: string;

  @ApiProperty({ description: 'Время окончания', example: '10:30' })
  @IsString()
  @MinLength(1)
  timeEnd!: string;

  @ApiProperty({ description: 'ID темы', example: 1, type: Number })
  @IsNumber()
  topicId!: number;

  @ApiProperty({ description: 'ID вида занятия', example: 1, type: Number })
  @IsNumber()
  lessonTypeId!: number;

  @ApiProperty({ description: 'ID аудитории', example: 1, type: Number })
  @IsNumber()
  classroomId!: number;

  @ApiPropertyOptional({
    description: 'Порядок сортировки',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}
