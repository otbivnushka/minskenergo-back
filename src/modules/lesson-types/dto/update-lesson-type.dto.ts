import { PartialType } from '@nestjs/swagger';
import { CreateLessonTypeDto } from './create-lesson-type.dto.js';

export class UpdateLessonTypeDto extends PartialType(CreateLessonTypeDto) {}
