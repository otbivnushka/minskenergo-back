import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service.js';
import { ClassroomsController } from './classrooms.controller.js';

@Module({
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
