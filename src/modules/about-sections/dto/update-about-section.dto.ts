import { PartialType } from '@nestjs/swagger';
import { CreateAboutSectionDto } from './create-about-section.dto.js';

export class UpdateAboutSectionDto extends PartialType(CreateAboutSectionDto) {}
