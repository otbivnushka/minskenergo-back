import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class LessonTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.lessonType.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const lessonType = await this.prisma.lessonType.findUnique({
      where: { id },
    });
    if (!lessonType) throw new NotFoundException('LessonType not found');
    return lessonType;
  }

  async create(dto: { name: string }) {
    return this.prisma.lessonType.create({ data: dto });
  }

  async update(id: number, dto: Partial<{ name: string }>) {
    const lessonType = await this.prisma.lessonType.findUnique({
      where: { id },
    });
    if (!lessonType) throw new NotFoundException('LessonType not found');

    return this.prisma.lessonType.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const lessonType = await this.prisma.lessonType.findUnique({
      where: { id },
    });
    if (!lessonType) throw new NotFoundException('LessonType not found');

    await this.prisma.lessonType.delete({ where: { id } });
  }
}
