import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'admin' })
  @IsString()
  @MinLength(1)
  username!: string;

  @ApiProperty({ description: 'Пароль', example: 'admin123' })
  @IsString()
  @MinLength(1)
  password!: string;
}
