import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';
import { UpdateDepartmentDto } from './dto/update-department.dto.js';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.department.findMany({
      select: { id: true, name: true, phone: true, note: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.department.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(dto: CreateDepartmentDto) {
    return this.prisma.department.create({ data: dto });
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Department not found');
    return this.prisma.department.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Department not found');
    return this.prisma.department.delete({ where: { id } });
  }
}
