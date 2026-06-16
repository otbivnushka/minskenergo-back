import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ContactsService } from './contacts.service.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('api/v1/contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Get()
  async findOne() {
    const contact = await this.service.findOne();
    if (!contact) throw new NotFoundException('Contact not found');
    return {
      legal_address: contact.legalAddress,
      actual_address: contact.actualAddress,
      email: contact.email,
      work_hours: contact.workHours,
      transport_info: contact.transportInfo,
    };
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Body() dto: UpdateContactDto) {
    const contact = await this.service.findOne();
    if (!contact) throw new NotFoundException('Contact not found');
    return this.service.update(contact.id, dto);
  }
}
