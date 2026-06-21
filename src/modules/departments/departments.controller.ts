import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { DepartmentsService } from './departments.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';
import { UpdateDepartmentDto } from './dto/update-department.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Телефонный справочник')
@Controller('api/v1/departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Список отделов', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Список отделов' })
  async findAllPublic() {
    return this.service.findAllPublic();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создать отдел',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 201, description: 'Отдел создан' })
  async create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить отдел',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Отдел обновлен' })
  @ApiResponse({ status: 404, description: 'Отдел не найден' })
  async update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить отдел',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Отдел удален' })
  @ApiResponse({ status: 404, description: 'Отдел не найден' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
