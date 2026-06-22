import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class WarningsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.warning.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const warning = await this.prisma.warning.findUnique({ where: { id } });
    if (!warning) throw new NotFoundException('Warning not found');
    return warning;
  }

  async create(dto: { text: string }) {
    return await this.prisma.warning.create({ data: dto });
  }

  async update(id: number, dto: Partial<{ text: string }>) {
    const warning = await this.prisma.warning.findUnique({ where: { id } });
    if (!warning) throw new NotFoundException('Warning not found');

    return this.prisma.warning.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const warning = await this.prisma.warning.findUnique({ where: { id } });
    if (!warning) throw new NotFoundException('Warning not found');

    await this.prisma.warning.delete({ where: { id } });
  }
}
