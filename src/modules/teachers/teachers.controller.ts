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
import { TeachersService } from './teachers.service.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiBearerAuth()
@ApiTags('Преподаватели')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  @ApiOperation({
    summary: 'Список преподавателей',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Список преподавателей' })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить преподавателя',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Информация о преподавателе' })
  @ApiResponse({ status: 404, description: 'Преподаватель не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать преподавателя',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Преподаватель создан' })
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить преподавателя',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Преподаватель обновлен' })
  @ApiResponse({ status: 404, description: 'Преподаватель не найден' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTeacherDto) {
    return this.teachersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить преподавателя',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Преподаватель удален' })
  @ApiResponse({ status: 404, description: 'Преподаватель не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.remove(id);
  }
}
