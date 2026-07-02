import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateAppealInfoDto {
  @ApiProperty({ description: 'Содержание статьи', example: '<p>Текст...</p>' })
  @IsString()
  @MinLength(1)
  content!: string;
}
