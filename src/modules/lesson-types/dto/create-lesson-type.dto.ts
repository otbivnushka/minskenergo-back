import { IsString, MinLength } from 'class-validator';

export class CreateLessonTypeDto {
  @IsString()
  @MinLength(1)
  name!: string;
}
