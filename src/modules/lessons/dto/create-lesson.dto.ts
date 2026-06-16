import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  groupId!: number;

  @IsString()
  @MinLength(1)
  date!: string;

  @IsString()
  @MinLength(1)
  timeStart!: string;

  @IsString()
  @MinLength(1)
  timeEnd!: string;

  @IsNumber()
  topicId!: number;

  @IsNumber()
  lessonTypeId!: number;

  @IsNumber()
  teacherId!: number;

  @IsNumber()
  classroomId!: number;

  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}
