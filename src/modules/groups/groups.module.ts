import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service.js';
import { GroupsController } from './groups.controller.js';
import { LessonsModule } from '../lessons/lessons.module.js';

@Module({
  imports: [LessonsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
