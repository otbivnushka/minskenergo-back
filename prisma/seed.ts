import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

const connectionString = process.env['DATABASE_URL']
  ?? `postgresql://${process.env['DB_USER']}:${process.env['DB_PASSWORD']}@${process.env['DB_HOST']}:${process.env['DB_PORT']}/${process.env['DB_NAME']}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Clear all tables (reverse FK order)
  await prisma.$transaction([
    prisma.curriculumsOnTopics.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.group.deleteMany(),
    prisma.curriculum.deleteMany(),
    prisma.appeal.deleteMany(),
    prisma.aboutSection.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.department.deleteMany(),
    prisma.lessonType.deleteMany(),
    prisma.topic.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.classroom.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // 2. Users
  const adminHash = await bcrypt.hash('admin123', 10);
  const methodistHash = await bcrypt.hash('methodist123', 10);

  await prisma.user.createMany({
    data: [
      { username: 'admin', passwordHash: adminHash, role: 'admin' },
      { username: 'methodist', passwordHash: methodistHash, role: 'methodist' },
    ],
  });

  // 3. Lesson Types
  const lessonTypeNames = ['Лекция', 'Практика', 'Экскурсия', 'Зачёт', 'Лабораторная работа'];
  const lessonTypeRecords: Record<string, number> = {};
  for (const name of lessonTypeNames) {
    const record = await prisma.lessonType.create({ data: { name } });
    lessonTypeRecords[name] = record.id;
  }

  // 4. Topics
  const topicNames = [
    'Документы и задачи Госэнергогазнадзора',
    'Охрана труда в электроустановках',
    'Правила технической эксплуатации',
    'Пожарная безопасность',
    'Первая помощь пострадавшим',
  ];
  const topicRecords: Record<string, number> = {};
  for (const name of topicNames) {
    const record = await prisma.topic.create({ data: { name } });
    topicRecords[name] = record.id;
  }

  // 5. Teachers
  const teachers = [
    { fullName: 'Иванов Иван Иванович', degree: 'к.т.н.' },
    { fullName: 'Петрова Мария Сергеевна', degree: 'д.э.н.' },
    { fullName: 'Сидоров Алексей Петрович', degree: 'к.ф.-м.н.' },
    { fullName: 'Козлова Елена Андреевна', degree: null },
  ];
  const teacherRecords: Record<string, number> = {};
  for (const t of teachers) {
    const record = await prisma.teacher.create({ data: t });
    teacherRecords[t.fullName] = record.id;
  }

  // 6. Classrooms
  const classrooms = [
    { name: 'Учебный центр, ауд. 101', address: null },
    { name: 'Учебный центр, ауд. 205', address: null },
    { name: 'филиал УЦ, ауд. 207', address: 'г. Минск, ул. Энергетиков, 15' },
  ];
  const classroomRecords: Record<string, number> = {};
  for (const c of classrooms) {
    const record = await prisma.classroom.create({ data: c });
    classroomRecords[c.name] = record.id;
  }

  // 7. Curriculums
  const curriculumNames = [
    'Электробезопасность (II группа)',
    'Электробезопасность (III группа)',
    'Пожарно-технический минимум',
  ];
  const curriculumRecords: Record<string, number> = {};
  for (const name of curriculumNames) {
    const record = await prisma.curriculum.create({ data: { name } });
    curriculumRecords[name] = record.id;
  }

  // 8. Curriculums <-> Topics
  const curriculumTopicLinks = [
    { curriculumName: 'Электробезопасность (II группа)', topicNames: ['Документы и задачи Госэнергогазнадзора', 'Охрана труда в электроустановках', 'Первая помощь пострадавшим'] },
    { curriculumName: 'Электробезопасность (III группа)', topicNames: ['Документы и задачи Госэнергогазнадзора', 'Охрана труда в электроустановках', 'Правила технической эксплуатации', 'Первая помощь пострадавшим'] },
    { curriculumName: 'Пожарно-технический минимум', topicNames: ['Пожарная безопасность', 'Первая помощь пострадавшим'] },
  ];
  await prisma.curriculumsOnTopics.createMany({
    data: curriculumTopicLinks.flatMap((link) =>
      link.topicNames.map((topicName) => ({
        curriculumId: curriculumRecords[link.curriculumName],
        topicId: topicRecords[topicName],
      })),
    ),
  });

  // 9. Groups
  const group1 = await prisma.group.create({
    data: {
      name: 'Группа Э-2026-01',
      curriculumId: curriculumRecords['Электробезопасность (II группа)'],
      dateStart: new Date('2026-01-15'),
      dateEnd: new Date('2026-06-30'),
    },
  });
  const group2 = await prisma.group.create({
    data: {
      name: 'Группа Э-2026-02',
      curriculumId: curriculumRecords['Электробезопасность (III группа)'],
      dateStart: new Date('2026-03-01'),
      dateEnd: new Date('2026-08-31'),
    },
  });

  // 10. Lessons
  const lessons = [
    {
      groupId: group1.id,
      date: '2026-05-18',
      timeStart: '12:00',
      timeEnd: '14:00',
      topicName: 'Документы и задачи Госэнергогазнадзора',
      lessonTypeName: 'Лекция',
      teacherName: 'Иванов Иван Иванович',
      classroomName: 'филиал УЦ, ауд. 207',
    },
    {
      groupId: group1.id,
      date: '2026-05-18',
      timeStart: '14:00',
      timeEnd: '16:00',
      topicName: 'Охрана труда в электроустановках',
      lessonTypeName: 'Практика',
      teacherName: 'Петрова Мария Сергеевна',
      classroomName: 'Учебный центр, ауд. 101',
    },
    {
      groupId: group2.id,
      date: '2026-05-19',
      timeStart: '10:00',
      timeEnd: '12:00',
      topicName: 'Правила технической эксплуатации',
      lessonTypeName: 'Лекция',
      teacherName: 'Сидоров Алексей Петрович',
      classroomName: 'Учебный центр, ауд. 205',
    },
  ];
  await prisma.lesson.createMany({
    data: lessons.map((l) => ({
      groupId: l.groupId,
      date: new Date(l.date),
      timeStart: new Date(`2000-01-01T${l.timeStart}:00`),
      timeEnd: new Date(`2000-01-01T${l.timeEnd}:00`),
      topicId: topicRecords[l.topicName],
      lessonTypeId: lessonTypeRecords[l.lessonTypeName],
      teacherId: teacherRecords[l.teacherName],
      classroomId: classroomRecords[l.classroomName],
      sortOrder: 0,
    })),
  });

  // 11. Departments
  const departments = [
    { name: 'Отдел кадров', phone: '123-45-67', note: 'каб. 101' },
    { name: 'Бухгалтерия', phone: '123-45-68', note: 'каб. 205' },
    { name: 'Учебный отдел', phone: '123-45-69', note: 'каб. 302' },
    { name: 'Техническая поддержка', phone: '123-45-70', note: null },
  ];
  await prisma.department.createMany({
    data: departments.map((d, i) => ({ ...d, sortOrder: i })),
  });

  // 12. Contact
  await prisma.contact.create({
    data: {
      legalAddress: 'г. Минск, ул. Энергетиков, 15',
      actualAddress: 'г. Минск, ул. Энергетиков, 15, каб. 301',
      email: 'info@energo-uc.by',
      workHours: 'пн-пт 8:30–17:30, обед 13:00–14:00',
      transportInfo: 'ст.м. «Автозаводская», далее авт. 42 до остановки «Энергетиков»',
      mapImageUrl: null,
    },
  });

  // 13. About Sections
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
  await prisma.aboutSection.createMany({
    data: aboutSections.map((s, i) => ({ ...s, sortOrder: i, isVisible: true })),
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
