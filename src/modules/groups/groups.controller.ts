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
import { GroupsService } from './groups.service.js';
import { LessonsService } from '../lessons/lessons.service.js';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { UpdateGroupDto } from './dto/update-group.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Группы')
@Controller('api/v1/groups')
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private lessonsService: LessonsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Список групп', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Список групп' })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить группу', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Информация о группе' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Get(':id/lessons')
  @ApiOperation({
    summary: 'Расписание группы',
    description: 'Получить расписание занятий группы по ID',
  })
  @ApiResponse({ status: 200, description: 'Расписание занятий' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  findLessons(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findByGroup(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создать группу',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 201, description: 'Группа создана' })
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить группу',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Группа обновлена' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupDto) {
    return this.groupsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить группу',
    description: 'Доступно администратору и методисту',
  })
  @ApiResponse({ status: 200, description: 'Группа удалена' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }
}
