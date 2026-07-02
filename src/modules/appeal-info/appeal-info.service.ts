import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UpdateAppealInfoDto } from './dto/update-appeal-info.dto.js';

@Injectable()
export class AppealInfoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.appealInfo.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.appealInfo.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('Appeal info not found');
    return item;
  }

  async update(id: number, dto: UpdateAppealInfoDto) {
    const item = await this.prisma.appealInfo.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('Appeal info not found');
    return this.prisma.appealInfo.update({ where: { id }, data: dto });
  }
}
