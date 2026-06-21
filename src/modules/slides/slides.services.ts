import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class SlidesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.slide.findMany({
      orderBy: { id: 'asc' },
      include: { image: true },
    });
  }

  async findOne(id: number) {
    const slide = await this.prisma.slide.findUnique({
      where: { id },
      include: { image: true },
    });
    if (!slide) throw new NotFoundException('Slide not found');
    return slide;
  }

  async create(dto: { title: string; subtitle: string; imageId: number }) {
    return this.prisma.slide.create({
      data: dto,
      include: { image: true },
    });
  }

  async update(
    id: number,
    dto: Partial<{ title: string; subtitle: string; imageId: number }>,
  ) {
    const slide = await this.prisma.slide.findUnique({ where: { id } });
    if (!slide) throw new NotFoundException('Slide not found');

    return this.prisma.slide.update({
      where: { id },
      data: dto,
      include: { image: true },
    });
  }

  async remove(id: number) {
    const slide = await this.prisma.slide.findUnique({ where: { id } });
    if (!slide) throw new NotFoundException('Slide not found');

    await this.prisma.slide.delete({ where: { id } });
  }
}
