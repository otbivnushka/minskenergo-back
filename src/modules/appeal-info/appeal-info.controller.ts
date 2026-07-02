import {
  Controller,
  Get,
  Put,
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
import { AppealInfoService } from './appeal-info.service.js';
import { UpdateAppealInfoDto } from './dto/update-appeal-info.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Информация об обращениях')
@Controller('api/v1/appeal-info')
export class AppealInfoController {
  constructor(private readonly service: AppealInfoService) {}

  @Get()
  @ApiOperation({ summary: 'Список статей', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Список статей' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить статью', description: 'Публичный доступ' })
  @ApiResponse({ status: 200, description: 'Статья' })
  @ApiResponse({ status: 404, description: 'Статья не найдена' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить статью',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Статья обновлена' })
  @ApiResponse({ status: 404, description: 'Статья не найдена' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppealInfoDto,
  ) {
    return this.service.update(id, dto);
  }
}
