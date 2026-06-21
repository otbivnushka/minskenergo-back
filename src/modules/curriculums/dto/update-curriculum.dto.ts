import { PartialType } from '@nestjs/swagger';
import { CreateCurriculumDto } from './create-curriculum.dto.js';

export class UpdateCurriculumDto extends PartialType(CreateCurriculumDto) {}
