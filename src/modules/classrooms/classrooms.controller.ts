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
import { ClassroomsService } from './classrooms.service.js';
import { CreateClassroomDto } from './dto/create-classroom.dto.js';
import { UpdateClassroomDto } from './dto/update-classroom.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiBearerAuth()
@ApiTags('Аудитории')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/classrooms')
export class ClassroomsController {
  constructor(private classroomsService: ClassroomsService) {}

  @Get()
  @ApiOperation({
    summary: 'Список аудиторий',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Список аудиторий' })
  findAll() {
    return this.classroomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить аудиторию',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Информация об аудитории' })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classroomsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создать аудиторию',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Аудитория создана' })
  create(@Body() dto: CreateClassroomDto) {
    return this.classroomsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить аудиторию',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Аудитория обновлена' })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClassroomDto,
  ) {
    return this.classroomsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить аудиторию',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Аудитория удалена' })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classroomsService.remove(id);
  }
}
