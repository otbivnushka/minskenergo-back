import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AppealsService } from './appeals.service.js';
import { CreateAppealDto } from './dto/create-appeal.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('api/v1/appeals')
export class AppealsController {
  constructor(private readonly service: AppealsService) {}

  @Post()
  async create(@Body() dto: CreateAppealDto) {
    return this.service.create(dto.text);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll() {
    return this.service.findAll();
  }

  @Put(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async markRead(@Param('id') id: string) {
    return this.service.markRead(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
