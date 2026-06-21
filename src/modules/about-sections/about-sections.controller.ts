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
import { AboutSectionsService } from './about-sections.service.js';
import { CreateAboutSectionDto } from './dto/create-about-section.dto.js';
import { UpdateAboutSectionDto } from './dto/update-about-section.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Об организации')
@Controller('api/v1/about')
export class AboutSectionsController {
  constructor(private readonly service: AboutSectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Список разделов', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Список разделов' })
  async findAllVisible() {
    return this.service.findAllVisible();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создать раздел',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 201, description: 'Раздел создан' })
  async create(@Body() dto: CreateAboutSectionDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить раздел',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Раздел обновлен' })
  @ApiResponse({ status: 404, description: 'Раздел не найден' })
  async update(@Param('id') id: string, @Body() dto: UpdateAboutSectionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить раздел',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Раздел удален' })
  @ApiResponse({ status: 404, description: 'Раздел не найден' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
