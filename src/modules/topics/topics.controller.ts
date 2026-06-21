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
import { TopicsService } from './topics.service.js';
import { CreateTopicDto } from './dto/create-topic.dto.js';
import { UpdateTopicDto } from './dto/update-topic.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiBearerAuth()
@ApiTags('Темы занятий')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Get()
  @ApiOperation({
    summary: 'Список тем',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Список тем' })
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить тему',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Информация о теме' })
  @ApiResponse({ status: 404, description: 'Тема не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать тему',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Тема создана' })
  create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить тему',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Тема обновлена' })
  @ApiResponse({ status: 404, description: 'Тема не найдена' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить тему',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Тема удалена' })
  @ApiResponse({ status: 404, description: 'Тема не найдена' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.remove(id);
  }
}
