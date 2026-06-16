import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateAboutSectionDto } from './dto/create-about-section.dto.js';
import { UpdateAboutSectionDto } from './dto/update-about-section.dto.js';

@Injectable()
export class AboutSectionsService {
  constructor(private prisma: PrismaService) {}

  async findAllVisible() {
    return this.prisma.aboutSection.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.aboutSection.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(dto: CreateAboutSectionDto) {
    return this.prisma.aboutSection.create({ data: dto });
  }

  async update(id: number, dto: UpdateAboutSectionDto) {
    const section = await this.prisma.aboutSection.findUnique({
      where: { id },
    });
    if (!section) throw new NotFoundException('About section not found');
    return this.prisma.aboutSection.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const section = await this.prisma.aboutSection.findUnique({
      where: { id },
    });
    if (!section) throw new NotFoundException('About section not found');
    return this.prisma.aboutSection.delete({ where: { id } });
  }
}
