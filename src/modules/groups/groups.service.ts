import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.group.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async create(dto: { name: string; dateStart: string; dateEnd: string }) {
    return this.prisma.group.create({
      data: {
        name: dto.name,
        dateStart: new Date(dto.dateStart),
        dateEnd: new Date(dto.dateEnd),
      },
    });
  }

  async update(
    id: number,
    dto: Partial<{ name: string; dateStart: string; dateEnd: string }>,
  ) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.dateStart !== undefined) data.dateStart = new Date(dto.dateStart);
    if (dto.dateEnd !== undefined) data.dateEnd = new Date(dto.dateEnd);

    return this.prisma.group.update({ where: { id }, data });
  }

  async remove(id: number) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');

    await this.prisma.group.delete({ where: { id } });
  }
}
