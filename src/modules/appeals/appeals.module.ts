import { Module } from '@nestjs/common';
import { AppealsController } from './appeals.controller.js';
import { AppealsService } from './appeals.service.js';

@Module({
  controllers: [AppealsController],
  providers: [AppealsService],
})
export class AppealsModule {}
