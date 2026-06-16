import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ClassroomsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.classroom.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const classroom = await this.prisma.classroom.findUnique({ where: { id } });
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  async create(dto: { name: string; address?: string }) {
    return this.prisma.classroom.create({ data: dto });
  }

  async update(id: number, dto: Partial<{ name: string; address?: string }>) {
    const classroom = await this.prisma.classroom.findUnique({ where: { id } });
    if (!classroom) throw new NotFoundException('Classroom not found');

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.address !== undefined) data.address = dto.address;

    return this.prisma.classroom.update({ where: { id }, data });
  }

  async remove(id: number) {
    const classroom = await this.prisma.classroom.findUnique({ where: { id } });
    if (!classroom) throw new NotFoundException('Classroom not found');

    await this.prisma.classroom.delete({ where: { id } });
  }
}
