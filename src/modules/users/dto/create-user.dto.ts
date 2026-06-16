import { IsString, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsIn(['admin', 'methodist'])
  role!: string;
}
