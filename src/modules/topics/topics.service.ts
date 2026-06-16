import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.topic.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  async create(dto: { name: string }) {
    return this.prisma.topic.create({ data: dto });
  }

  async update(id: number, dto: Partial<{ name: string }>) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new NotFoundException('Topic not found');

    return this.prisma.topic.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new NotFoundException('Topic not found');

    await this.prisma.topic.delete({ where: { id } });
  }
}
