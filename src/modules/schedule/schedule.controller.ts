import {
  Controller,
  Post,
  Param,
  UseGuards,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { ScheduleService } from './schedule.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Расписание')
@Controller('api/v1/schedule')
export class ScheduleController {
  constructor(private service: ScheduleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'methodist')
  @Post('generate/:groupId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Сгенерировать расписание',
    description:
      'Доступно администратору и методисту. Шаблон schedule-template.docx должен лежать в UPLOADS_DIR.',
  })
  @ApiResponse({ status: 200, description: 'Файл расписания .docx' })
  @ApiResponse({ status: 400, description: 'Шаблон не найден' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  async generate(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Res() res: Response,
  ) {
    const buffer = await this.service.generate(groupId);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="schedule-group-${groupId}.docx"`,
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  }
}
