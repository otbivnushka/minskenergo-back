import { Module } from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service.js';
import { LessonTypesController } from './lesson-types.controller.js';

@Module({
  controllers: [LessonTypesController],
  providers: [LessonTypesService],
  exports: [LessonTypesService],
})
export class LessonTypesModule {}
