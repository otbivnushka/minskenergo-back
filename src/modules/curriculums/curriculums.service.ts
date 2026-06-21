import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CurriculumsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.curriculum.findMany({
      orderBy: { name: 'asc' },
      include: {
        topics: {
          include: { topic: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id },
      include: {
        topics: {
          include: { topic: true },
        },
      },
    });
    if (!curriculum) throw new NotFoundException('Curriculum not found');
    return curriculum;
  }

  async create(dto: { name: string; topicIds?: number[] }) {
    const { topicIds, ...data } = dto;

    return this.prisma.curriculum.create({
      data: {
        ...data,
        topics: topicIds?.length
          ? { create: topicIds.map((topicId) => ({ topicId })) }
          : undefined,
      },
      include: {
        topics: {
          include: { topic: true },
        },
      },
    });
  }

  async update(id: number, dto: { name?: string; topicIds?: number[] }) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id },
    });
    if (!curriculum) throw new NotFoundException('Curriculum not found');

    const { topicIds, ...data } = dto;

    if (topicIds !== undefined) {
      await this.prisma.curriculumsOnTopics.deleteMany({
        where: { curriculumId: id },
      });
      if (topicIds.length > 0) {
        await this.prisma.curriculumsOnTopics.createMany({
          data: topicIds.map((topicId) => ({ curriculumId: id, topicId })),
        });
      }
    }

    return this.prisma.curriculum.update({
      where: { id },
      data,
      include: {
        topics: {
          include: { topic: true },
        },
      },
    });
  }

  async findTopics(id: number) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id },
    });
    if (!curriculum) throw new NotFoundException('Curriculum not found');

    const links = await this.prisma.curriculumsOnTopics.findMany({
      where: { curriculumId: id },
      include: { topic: true },
      orderBy: { topic: { id: 'asc' } },
    });

    return links.map((link) => ({
      id: link.topic.id,
      name: link.topic.name,
    }));
  }

  async remove(id: number) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id },
    });
    if (!curriculum) throw new NotFoundException('Curriculum not found');

    await this.prisma.curriculum.delete({ where: { id } });
  }
}
