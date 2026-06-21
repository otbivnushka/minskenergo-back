import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AppealsService } from './appeals.service.js';
import { CreateAppealDto } from './dto/create-appeal.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Обращения граждан')
@Controller('api/v1/appeals')
export class AppealsController {
  constructor(private readonly service: AppealsService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать обращение',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 201, description: 'Обращение создано' })
  async create(@Body() dto: CreateAppealDto) {
    return this.service.create(dto.text);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Список обращений',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Список обращений' })
  async findAll() {
    return this.service.findAll();
  }

  @Put(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Отметить обращение прочитанным',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Обращение отмечено прочитанным' })
  @ApiResponse({ status: 404, description: 'Обращение не найдено' })
  async markRead(@Param('id') id: string) {
    return this.service.markRead(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить обращение',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Обращение удалено' })
  @ApiResponse({ status: 404, description: 'Обращение не найдено' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
