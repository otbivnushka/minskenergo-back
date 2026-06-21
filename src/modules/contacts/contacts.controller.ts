import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ContactsService } from './contacts.service.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@ApiTags('Контакты')
@Controller('api/v1/contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить контакты',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Контактная информация' })
  @ApiResponse({ status: 404, description: 'Контакты не найдены' })
  async findOne() {
    return this.service.findOne();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Обновить контакты',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Контакты обновлены' })
  @ApiResponse({ status: 404, description: 'Контакты не найдены' })
  async update(@Body() dto: UpdateContactDto) {
    const contact = await this.service.findOne();
    if (!contact) throw new NotFoundException('Contact not found');
    return this.service.update(contact.id, dto);
  }
}
