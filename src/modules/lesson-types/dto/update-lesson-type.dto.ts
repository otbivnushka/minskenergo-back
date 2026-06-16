import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonTypeDto } from './create-lesson-type.dto.js';

export class UpdateLessonTypeDto extends PartialType(CreateLessonTypeDto) {}
