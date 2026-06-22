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
import { WarningsService } from './warnings.service.js';
import { CreateWarningDto } from './dto/create-warning.dto.js';
import { UpdateWarningDto } from './dto/update-warning.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Предупреждения')
@Controller('api/v1/warnings')
export class WarningsController {
  constructor(private service: WarningsService) {}

  @Get()
  @ApiOperation({
    summary: 'Список предупреждений',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Список предупреждений' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить предупреждение',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Информация о предупреждении' })
  @ApiResponse({ status: 404, description: 'Предупреждение не найдено' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создать предупреждение',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Предупреждение создано' })
  create(@Body() dto: CreateWarningDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить предупреждение',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Предупреждение обновлено' })
  @ApiResponse({ status: 404, description: 'Предупреждение не найдено' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWarningDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить предупреждение',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Предупреждение удалено' })
  @ApiResponse({ status: 404, description: 'Предупреждение не найдено' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
