import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateWarningDto {
  @ApiProperty({ description: 'Текст предупреждения', example: 'Внимание!' })
  @IsString()
  @MinLength(1)
  text!: string;
}
