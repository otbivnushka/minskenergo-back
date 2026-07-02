import { Module } from '@nestjs/common';
import { AppealInfoController } from './appeal-info.controller.js';
import { AppealInfoService } from './appeal-info.service.js';

@Module({
  controllers: [AppealInfoController],
  providers: [AppealInfoService],
})
export class AppealInfoModule {}
