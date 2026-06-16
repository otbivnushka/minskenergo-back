import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

const connectionString = process.env['DATABASE_URL']
  ?? `postgresql://${process.env['DB_USER']}:${process.env['DB_PASSWORD']}@${process.env['DB_HOST']}:${process.env['DB_PORT']}/${process.env['DB_NAME']}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Users
  const adminHash = await bcrypt.hash('admin123', 10);
  const methodistHash = await bcrypt.hash('methodist123', 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash: adminHash, role: 'admin' },
  });
  await prisma.user.upsert({
    where: { username: 'methodist' },
    update: {},
    create: { username: 'methodist', passwordHash: methodistHash, role: 'methodist' },
  });

  // Lesson Types
  const lessonTypes = ['Лекция', 'Практика', 'Экскурсия', 'Зачёт', 'Лабораторная работа'];
  const lessonTypeRecords: Record<string, number> = {};
  for (const name of lessonTypes) {
    const record = await prisma.lessonType.upsert({
      where: { id: lessonTypes.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
    lessonTypeRecords[name] = record.id;
  }

  // Topics
  const topics = [
    'Документы и задачи Госэнергогазнадзора',
    'Охрана труда в электроустановках',
    'Правила технической эксплуатации',
    'Пожарная безопасность',
    'Первая помощь пострадавшим',
  ];
  const topicRecords: Record<string, number> = {};
  for (const name of topics) {
    const record = await prisma.topic.upsert({
      where: { id: topics.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
    topicRecords[name] = record.id;
  }

  // Teachers
  const teachers = [
    { fullName: 'Иванов Иван Иванович', degree: 'к.т.н.' },
    { fullName: 'Петрова Мария Сергеевна', degree: 'д.э.н.' },
    { fullName: 'Сидоров Алексей Петрович', degree: 'к.ф.-м.н.' },
    { fullName: 'Козлова Елена Андреевна', degree: null },
  ];
  const teacherRecords: Record<string, number> = {};
  for (const t of teachers) {
    const record = await prisma.teacher.upsert({
      where: { id: teachers.indexOf(t) + 1 },
      update: t,
      create: t,
    });
    teacherRecords[t.fullName] = record.id;
  }

  // Classrooms
  const classrooms = [
    { name: 'Учебный центр, ауд. 101', address: null },
    { name: 'Учебный центр, ауд. 205', address: null },
    { name: 'филиал УЦ, ауд. 207', address: 'г. Минск, ул. Энергетиков, 15' },
  ];
  const classroomRecords: Record<string, number> = {};
  for (const c of classrooms) {
    const record = await prisma.classroom.upsert({
      where: { id: classrooms.indexOf(c) + 1 },
      update: c,
      create: c,
    });
    classroomRecords[c.name] = record.id;
  }

  // Groups
  await prisma.group.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Группа Э-2026-01',
      dateStart: new Date('2026-01-15'),
      dateEnd: new Date('2026-06-30'),
    },
  });
  await prisma.group.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Группа Э-2026-02',
      dateStart: new Date('2026-03-01'),
      dateEnd: new Date('2026-08-31'),
    },
  });

  // Lessons
  const lessons = [
    {
      groupId: 1,
      date: '2026-05-18',
      timeStart: '12:00',
      timeEnd: '14:00',
      topicName: 'Документы и задачи Госэнергогазнадзора',
      lessonTypeName: 'Лекция',
      teacherName: 'Иванов Иван Иванович',
      classroomName: 'филиал УЦ, ауд. 207',
    },
    {
      groupId: 1,
      date: '2026-05-18',
      timeStart: '14:00',
      timeEnd: '16:00',
      topicName: 'Охрана труда в электроустановках',
      lessonTypeName: 'Практика',
      teacherName: 'Петрова Мария Сергеевна',
      classroomName: 'Учебный центр, ауд. 101',
    },
    {
      groupId: 2,
      date: '2026-05-19',
      timeStart: '10:00',
      timeEnd: '12:00',
      topicName: 'Правила технической эксплуатации',
      lessonTypeName: 'Лекция',
      teacherName: 'Сидоров Алексей Петрович',
      classroomName: 'Учебный центр, ауд. 205',
    },
  ];
  for (const [i, l] of lessons.entries()) {
    await prisma.lesson.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        groupId: l.groupId,
        date: new Date(l.date),
        timeStart: new Date(`2000-01-01T${l.timeStart}:00`),
        timeEnd: new Date(`2000-01-01T${l.timeEnd}:00`),
        topicId: topicRecords[l.topicName],
        lessonTypeId: lessonTypeRecords[l.lessonTypeName],
        teacherId: teacherRecords[l.teacherName],
        classroomId: classroomRecords[l.classroomName],
        sortOrder: 0,
      },
    });
  }

  // Departments
  const departments = [
    { name: 'Отдел кадров', phone: '123-45-67', note: 'каб. 101' },
    { name: 'Бухгалтерия', phone: '123-45-68', note: 'каб. 205' },
    { name: 'Учебный отдел', phone: '123-45-69', note: 'каб. 302' },
    { name: 'Техническая поддержка', phone: '123-45-70', note: null },
  ];
  for (const [i, d] of departments.entries()) {
    await prisma.department.upsert({
      where: { id: i + 1 },
      update: d,
      create: { ...d, sortOrder: i },
    });
  }

  // Contact
  await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      legalAddress: 'г. Минск, ул. Энергетиков, 15',
      actualAddress: 'г. Минск, ул. Энергетиков, 15, каб. 301',
      email: 'info@energo-uc.by',
      workHours: 'пн-пт 8:30–17:30, обед 13:00–14:00',
      transportInfo: 'ст.м. «Автозаводская», далее авт. 42 до остановки «Энергетиков»',
    },
  });

  // About Sections
  const aboutSections = [
    {
      title: 'История',
      content: '<p>Учебный центр основан в 1975 году и является ведущим учреждением дополнительного образования в области энергетики.</p>',
      icon: 'history',
    },
    {
      title: 'Руководство',
      content: '<p><strong>Директор:</strong> Петров П.П.<br><strong>Заместитель директора:</strong> Иванова И.И.</p>',
      icon: 'users',
    },
    {
      title: 'Лицензии',
      content: '<p>Лицензия Министерства образования № 12345 от 01.01.2020.</p>',
      icon: 'file-text',
    },
  ];
  for (const [i, s] of aboutSections.entries()) {
    await prisma.aboutSection.upsert({
      where: { id: i + 1 },
      update: s,
      create: { ...s, sortOrder: i, isVisible: true },
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
