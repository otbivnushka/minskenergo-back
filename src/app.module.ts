import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { GroupsModule } from './modules/groups/groups.module.js';
import { LessonsModule } from './modules/lessons/lessons.module.js';
import { CurriculumsModule } from './modules/curriculums/curriculums.module.js';
import { TeachersModule } from './modules/teachers/teachers.module.js';
import { ClassroomsModule } from './modules/classrooms/classrooms.module.js';
import { TopicsModule } from './modules/topics/topics.module.js';
import { LessonTypesModule } from './modules/lesson-types/lesson-types.module.js';
import { DepartmentsModule } from './modules/departments/departments.module.js';
import { ContactsModule } from './modules/contacts/contacts.module.js';
import { AboutSectionsModule } from './modules/about-sections/about-sections.module.js';
import { ImagesModule } from './modules/images/images.module.js';
import { AppealsModule } from './modules/appeals/appeals.module.js';
import { SlidesModule } from './modules/slides/slides.module.js';
import { WarningsModule } from './modules/warnings/warnings.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    GroupsModule,
    LessonsModule,
    CurriculumsModule,
    TeachersModule,
    ClassroomsModule,
    TopicsModule,
    LessonTypesModule,
    DepartmentsModule,
    ContactsModule,
    AboutSectionsModule,
    ImagesModule,
    AppealsModule,
    WarningsModule,
    SlidesModule,
  ],
})
export class AppModule {}
