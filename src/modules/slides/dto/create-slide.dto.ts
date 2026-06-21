import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSlideDto {
  @ApiProperty({ description: 'Заголовок слайда', example: 'Заголовок' })
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Подзаголовок слайда', example: 'Подзаголовок' })
  @IsString()
  subtitle!: string;

  @ApiProperty({ description: 'ID изображения', example: 1 })
  @IsNumber()
  imageId!: number;
}
