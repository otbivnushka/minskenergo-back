import { PartialType } from '@nestjs/swagger';
import { CreateWarningDto } from './create-warning.dto.js';

export class UpdateWarningDto extends PartialType(CreateWarningDto) {}
