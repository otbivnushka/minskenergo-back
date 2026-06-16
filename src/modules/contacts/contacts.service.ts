import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async findOne() {
    return this.prisma.contact.findFirst();
  }

  async update(id: number, dto: UpdateContactDto) {
    return this.prisma.contact.update({ where: { id }, data: dto });
  }
}
