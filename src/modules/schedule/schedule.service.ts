import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { renderDocxToBuffer } from '../../utils/docx-renderer.js';
import { getUploadsDir } from '../../config/uploads-dir.js';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const dayNames: Record<number, string> = {
  0: 'Воскресенье',
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
};

const monthNames: Record<number, string> = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
};

function formatDateLong(d: Date): string {
  const day = d.getDate();
  const month = monthNames[d.getMonth() + 1];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatDateShort(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function formatDayName(d: Date): string {
  return dayNames[d.getDay()];
}

function formatTime(d: Date): string {
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}.${mm}`;
}

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async generate(groupId: number) {
    const uploadsDir = getUploadsDir();
    const templatePath = join(uploadsDir, 'schedule-template.docx');

    if (!existsSync(templatePath)) {
      throw new BadRequestException(
        'Template not found. Upload schedule-template.docx first.',
      );
    }

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: { curriculum: true },
    });
    if (!group) throw new NotFoundException('Group not found');

    const lessons = await this.prisma.lesson.findMany({
      where: { groupId },
      orderBy: [{ date: 'asc' }, { timeStart: 'asc' }],
      include: {
        topic: true,
        lessonType: true,
        classroom: true,
      },
    });

    const data = {
      groupName: group.name,
      course: group.curriculum?.name ?? '',
      dateFrom: formatDateLong(group.dateStart),
      dateTo: formatDateLong(group.dateEnd),
      lessons: lessons.map((l) => ({
        day: `${formatDayName(l.date)} ${formatDateShort(l.date)}`,
        time: `${formatTime(l.timeStart)}-${formatTime(l.timeEnd)}`,
        topic: l.topic.name,
        type: l.lessonType.name,
        place: l.classroom.name,
      })),
    };

    return renderDocxToBuffer(templatePath, data);
  }
}
