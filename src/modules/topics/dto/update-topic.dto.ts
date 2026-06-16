import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDto } from './create-topic.dto.js';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
