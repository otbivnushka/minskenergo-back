import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({
    description: 'Название темы',
    example: 'Основы электротехники',
  })
  @IsString()
  @MinLength(1)
  name!: string;
}
