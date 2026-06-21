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
import { LessonTypesService } from './lesson-types.service.js';
import { CreateLessonTypeDto } from './dto/create-lesson-type.dto.js';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiBearerAuth()
@ApiTags('Виды занятий')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/lesson-types')
export class LessonTypesController {
  constructor(private lessonTypesService: LessonTypesService) {}

  @Get()
  @ApiOperation({
    summary: 'Список видов занятий',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Список видов занятий' })
  findAll() {
    return this.lessonTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить вид занятия',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Информация о виде занятия' })
  @ApiResponse({ status: 404, description: 'Вид занятия не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать вид занятия',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Вид занятия создан' })
  create(@Body() dto: CreateLessonTypeDto) {
    return this.lessonTypesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить вид занятия',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Вид занятия обновлен' })
  @ApiResponse({ status: 404, description: 'Вид занятия не найден' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonTypeDto,
  ) {
    return this.lessonTypesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить вид занятия',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Вид занятия удален' })
  @ApiResponse({ status: 404, description: 'Вид занятия не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.remove(id);
  }
}
