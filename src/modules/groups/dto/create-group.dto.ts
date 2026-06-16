import { IsString, MinLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  dateStart!: string;

  @IsString()
  @MinLength(1)
  dateEnd!: string;
}
