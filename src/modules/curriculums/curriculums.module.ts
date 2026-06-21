import { Module } from '@nestjs/common';
import { CurriculumsService } from './curriculums.service.js';
import { CurriculumsController } from './curriculums.controller.js';

@Module({
  controllers: [CurriculumsController],
  providers: [CurriculumsService],
  exports: [CurriculumsService],
})
export class CurriculumsModule {}
