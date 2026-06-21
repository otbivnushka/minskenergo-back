import { PartialType } from '@nestjs/swagger';
import { CreateSlideDto } from './create-slide.dto.js';

export class UpdateSlideDto extends PartialType(CreateSlideDto) {}
