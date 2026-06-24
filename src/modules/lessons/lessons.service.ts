import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.lesson.findMany({
      orderBy: { id: 'asc' },
      include: {
        group: true,
        topic: true,
        lessonType: true,
        classroom: true,
      },
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        group: true,
        topic: true,
        lessonType: true,
        classroom: true,
      },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async findByGroup(groupId: number) {
    const lessons = await this.prisma.lesson.findMany({
      where: { groupId },
      orderBy: [{ date: 'asc' }, { timeStart: 'asc' }],
      include: {
        topic: true,
        lessonType: true,
        classroom: true,
      },
    });

    return lessons.map((lesson) => ({
      id: lesson.id,
      date: lesson.date.toISOString().slice(0, 10),
      timeStart: lesson.timeStart.toISOString().slice(11, 16),
      timeEnd: lesson.timeEnd.toISOString().slice(11, 16),
      topic: lesson.topic.name,
      lessonType: lesson.lessonType.name,
      classroom: lesson.classroom.name,
    }));
  }

  async create(dto: {
    groupId: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    topicId: number;
    lessonTypeId: number;
    classroomId: number;
    sortOrder?: number;
  }) {
    return this.prisma.lesson.create({
      data: {
        groupId: dto.groupId,
        date: new Date(dto.date),
        timeStart: new Date(`2000-01-01T${dto.timeStart}:00`),
        timeEnd: new Date(`2000-01-01T${dto.timeEnd}:00`),
        topicId: dto.topicId,
        lessonTypeId: dto.lessonTypeId,
        classroomId: dto.classroomId,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
  }

  async update(
    id: number,
    dto: Partial<{
      groupId: number;
      date: string;
      timeStart: string;
      timeEnd: string;
      topicId: number;
      lessonTypeId: number;
      classroomId: number;
      sortOrder: number;
    }>,
  ) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const data: Record<string, unknown> = {};
    if (dto.groupId !== undefined) data.groupId = dto.groupId;
    if (dto.date !== undefined) data.date = new Date(dto.date);
    if (dto.timeStart !== undefined)
      data.timeStart = new Date(`2000-01-01T${dto.timeStart}:00`);
    if (dto.timeEnd !== undefined)
      data.timeEnd = new Date(`2000-01-01T${dto.timeEnd}:00`);
    if (dto.topicId !== undefined) data.topicId = dto.topicId;
    if (dto.lessonTypeId !== undefined) data.lessonTypeId = dto.lessonTypeId;
    if (dto.classroomId !== undefined) data.classroomId = dto.classroomId;
    if (dto.sortOrder !== undefined) data.sortOrder = dto.sortOrder;

    return this.prisma.lesson.update({ where: { id }, data });
  }

  async remove(id: number) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    await this.prisma.lesson.delete({ where: { id } });
  }
}
