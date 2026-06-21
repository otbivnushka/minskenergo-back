import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { getUploadsDir } from '../../config/uploads-dir.js';

const uploadsDir = getUploadsDir();

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.image.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: { filename: string; originalName: string }) {
    return this.prisma.image.create({ data: dto });
  }

  async remove(id: number) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Image not found');

    const filePath = join(uploadsDir, image.filename);
    await unlink(filePath).catch(() => {});

    await this.prisma.image.delete({ where: { id } });
  }
}
