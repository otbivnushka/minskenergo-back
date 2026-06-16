import { IsString, MinLength } from 'class-validator';

export class CreateAppealDto {
  @IsString()
  @MinLength(1)
  text!: string;
}
