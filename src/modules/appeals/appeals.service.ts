import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class AppealsService {
  constructor(private prisma: PrismaService) {}

  async create(text: string) {
    const appeal = await this.prisma.appeal.create({
      data: { text, isRead: false },
      select: { id: true, createdAt: true },
    });
    return { id: appeal.id, created_at: appeal.createdAt };
  }

  async findAll() {
    return this.prisma.appeal.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markRead(id: number) {
    const appeal = await this.prisma.appeal.findUnique({ where: { id } });
    if (!appeal) throw new NotFoundException('Appeal not found');
    return this.prisma.appeal.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: number) {
    const appeal = await this.prisma.appeal.findUnique({ where: { id } });
    if (!appeal) throw new NotFoundException('Appeal not found');
    return this.prisma.appeal.delete({ where: { id } });
  }
}
