import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { SlidesService } from './slides.services.js';
import { CreateSlideDto } from './dto/create-slide.dto.js';
import { UpdateSlideDto } from './dto/update-slide.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Слайды')
@Controller('api/v1/slides')
export class SlidesController {
  constructor(private service: SlidesService) {}

  @Get()
  @ApiOperation({ summary: 'Список слайдов', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Список слайдов' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить слайд', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Информация о слайде' })
  @ApiResponse({ status: 404, description: 'Слайд не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создать слайд',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 201, description: 'Слайд создан' })
  create(@Body() dto: CreateSlideDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить слайд',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Слайд обновлён' })
  @ApiResponse({ status: 404, description: 'Слайд не найден' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSlideDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить слайд',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Слайд удалён' })
  @ApiResponse({ status: 404, description: 'Слайд не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
