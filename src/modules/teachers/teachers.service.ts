import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teacher.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async create(dto: { fullName: string; degree?: string }) {
    return this.prisma.teacher.create({ data: dto });
  }

  async update(
    id: number,
    dto: Partial<{ fullName: string; degree?: string }>,
  ) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    return this.prisma.teacher.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    await this.prisma.teacher.delete({ where: { id } });
  }
}
