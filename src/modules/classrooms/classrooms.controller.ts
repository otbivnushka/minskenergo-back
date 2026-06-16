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
import { ClassroomsService } from './classrooms.service.js';
import { CreateClassroomDto } from './dto/create-classroom.dto.js';
import { UpdateClassroomDto } from './dto/update-classroom.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/classrooms')
export class ClassroomsController {
  constructor(private classroomsService: ClassroomsService) {}

  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classroomsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateClassroomDto) {
    return this.classroomsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClassroomDto,
  ) {
    return this.classroomsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classroomsService.remove(id);
  }
}
