import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description: 'ФИО преподавателя',
    example: 'Иванов Иван Иванович',
  })
  @IsString()
  @MinLength(1)
  fullName!: string;

  @ApiPropertyOptional({
    description: 'Ученая степень',
    example: 'Кандидат технических наук',
  })
  @IsString()
  @IsOptional()
  degree?: string;
}
