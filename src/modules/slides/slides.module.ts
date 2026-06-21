import { Module } from '@nestjs/common';
import { SlidesService } from './slides.services.js';
import { SlidesController } from './slides.controller.js';

@Module({
  controllers: [SlidesController],
  providers: [SlidesService],
})
export class SlidesModule {}
