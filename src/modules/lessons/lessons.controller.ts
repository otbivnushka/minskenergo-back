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
import { LessonsService } from './lessons.service.js';
import { CreateLessonDto } from './dto/create-lesson.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiBearerAuth()
@ApiTags('Занятия')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({
    summary: 'Список занятий',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Список занятий' })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить занятие',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Информация о занятии' })
  @ApiResponse({ status: 404, description: 'Занятие не найдено' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать занятие',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Занятие создано' })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить занятие',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Занятие обновлено' })
  @ApiResponse({ status: 404, description: 'Занятие не найдено' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить занятие',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Занятие удалено' })
  @ApiResponse({ status: 404, description: 'Занятие не найдено' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }
}
