import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Логин пользователя', example: 'admin' })
  @IsString()
  @MinLength(1)
  username!: string;

  @ApiProperty({ description: 'Пароль', example: 'admin123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ description: 'Роль', example: 'admin' })
  @IsString()
  @IsIn(['admin', 'methodist'])
  role!: string;
}
