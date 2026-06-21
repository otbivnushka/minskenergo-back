import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateAppealDto {
  @ApiProperty({
    description: 'Текст обращения',
    example: 'Текст обращения...',
  })
  @IsString()
  @MinLength(1)
  text!: string;
}
