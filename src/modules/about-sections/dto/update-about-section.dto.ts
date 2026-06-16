import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutSectionDto } from './create-about-section.dto.js';

export class UpdateAboutSectionDto extends PartialType(CreateAboutSectionDto) {}
