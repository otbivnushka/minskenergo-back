import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @ApiPropertyOptional({
    description: 'Юридический адрес',
    example: 'г. Минск, ул. Ленина, 1',
  })
  @IsOptional()
  @IsString()
  legalAddress?: string;

  @ApiPropertyOptional({
    description: 'Фактический адрес',
    example: 'г. Минск, ул. Ленина, 1',
  })
  @IsOptional()
  @IsString()
  actualAddress?: string;

  @ApiPropertyOptional({ description: 'Email', example: 'info@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Режим работы', example: '8:00 - 17:00' })
  @IsOptional()
  @IsString()
  workHours?: string;

  @ApiPropertyOptional({
    description: 'Транспортная информация',
    example: 'ст. м. Площадь Ленина',
  })
  @IsOptional()
  @IsString()
  transportInfo?: string;

  @ApiPropertyOptional({
    description: 'URL карты',
    example: '/uploads/map.jpg',
  })
  @IsOptional()
  @IsString()
  mapImageUrl?: string;
}
