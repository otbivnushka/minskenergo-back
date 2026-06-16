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
import { LessonTypesService } from './lesson-types.service.js';
import { CreateLessonTypeDto } from './dto/create-lesson-type.dto.js';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'methodist')
@Controller('api/v1/lesson-types')
export class LessonTypesController {
  constructor(private lessonTypesService: LessonTypesService) {}

  @Get()
  findAll() {
    return this.lessonTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLessonTypeDto) {
    return this.lessonTypesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonTypeDto,
  ) {
    return this.lessonTypesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.remove(id);
  }
}
