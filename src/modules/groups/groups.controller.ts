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
import { GroupsService } from './groups.service.js';
import { LessonsService } from '../lessons/lessons.service.js';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { UpdateGroupDto } from './dto/update-group.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('api/v1/groups')
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private lessonsService: LessonsService,
  ) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id/lessons')
  findLessons(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findByGroup(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupDto) {
    return this.groupsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }
}
