import { Module } from '@nestjs/common';
import { WarningsService } from './warnings.service.js';
import { WarningsController } from './warnings.controller.js';

@Module({
  controllers: [WarningsController],
  providers: [WarningsService],
})
export class WarningsModule {}
