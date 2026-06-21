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
import { CurriculumsService } from './curriculums.service.js';
import { CreateCurriculumDto } from './dto/create-curriculum.dto.js';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Учебные программы')
@Controller('api/v1/curriculums')
export class CurriculumsController {
  constructor(private service: CurriculumsService) {}

  @Get()
  @ApiOperation({
    summary: 'Список учебных программ',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Список учебных программ' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить учебную программу',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Информация о программе' })
  @ApiResponse({ status: 404, description: 'Программа не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get(':id/topics')
  @ApiOperation({
    summary: 'Получить темы учебной программы',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Список тем' })
  @ApiResponse({ status: 404, description: 'Программа не найдена' })
  findTopics(@Param('id', ParseIntPipe) id: number) {
    return this.service.findTopics(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создать учебную программу',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Программа создана' })
  create(@Body() dto: CreateCurriculumDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить учебную программу',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Программа обновлена' })
  @ApiResponse({ status: 404, description: 'Программа не найдена' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCurriculumDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить учебную программу',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Программа удалена' })
  @ApiResponse({ status: 404, description: 'Программа не найдена' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
